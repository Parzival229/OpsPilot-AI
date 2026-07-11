/**
 * iamToken.js – IBM Cloud IAM token manager
 *
 * Standard IBM WML authentication flow:
 *
 *   Step 1 — Exchange API key for IAM access token:
 *     POST https://iam.cloud.ibm.com/identity/token
 *     Content-Type: application/x-www-form-urlencoded
 *     body: grant_type=urn:ibm:params:oauth:grant-type:apikey&apikey=<VITE_WATSONX_API_KEY>
 *     → { access_token: "eyJ...", expiration: <unix-seconds> }
 *
 *   Step 2 — Use the access token as a Bearer token on every deployment call:
 *     Authorization: Bearer eyJ...
 *
 * This module handles Step 1 only. It caches the token in memory and
 * auto-refreshes 60 s before expiry so no request ever uses a stale token.
 *
 * Dev requests route through the Vite proxy (/api/iam) to avoid CORS —
 * browsers cannot call iam.cloud.ibm.com directly.
 *
 * Environment variable:
 *   VITE_WATSONX_API_KEY   IBM Cloud API key (from your IBM Cloud account)
 */

// Routed through the Vite dev proxy → https://iam.cloud.ibm.com/identity/token
const IAM_TOKEN_URL = '/api/iam/identity/token'

// ── In-memory token cache ─────────────────────────────────────────────────
let _cachedToken = null   // string  – the eyJ... access token
let _expiresAtMs = 0      // number  – Unix millisecond timestamp

// Refresh 60 s before actual expiry to avoid edge-case clock skew failures
const REFRESH_BUFFER_MS = 60_000

/**
 * Returns a valid IAM Bearer access token.
 * Fetches a new one only when the cache is empty or near-expiry.
 *
 * @returns {Promise<string>}  The access token — pass as `Bearer <token>`
 */
export async function getIAMToken() {
  const now    = Date.now()
  const apiKey = import.meta.env.VITE_WATSONX_API_KEY

  // ── Debug log 1 – API key presence ──────────────────────────────────
  console.debug('[OpsPilot:IAM] API key found in environment:', !!apiKey)

  if (!apiKey) {
    throw new Error(
      'VITE_WATSONX_API_KEY is not set. Add it to your .env file.',
    )
  }

  // ── Return cached token if still valid ────────────────────────────────
  if (_cachedToken && now < _expiresAtMs - REFRESH_BUFFER_MS) {
    console.debug('[OpsPilot:IAM] Using cached token (expires in',
      Math.round((_expiresAtMs - now) / 1000), 's)')
    return _cachedToken
  }

  // ── Exchange API key for IAM access token ─────────────────────────────
  console.debug('[OpsPilot:IAM] Requesting new IAM token…')

  const body = new URLSearchParams({
    grant_type: 'urn:ibm:params:oauth:grant-type:apikey',
    apikey: apiKey,
  })

  let res
  try {
    res = await fetch(IAM_TOKEN_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body.toString(),
    })
  } catch (networkErr) {
    throw new Error(`IAM token network error: ${networkErr.message}`)
  }

  // ── Debug log 2 – IAM request outcome ────────────────────────────────
  console.debug('[OpsPilot:IAM] Token request status:', res.status, res.ok ? '✓' : '✗')

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`IAM token request failed (${res.status}): ${text}`)
  }

  const json = await res.json()

  _cachedToken = json.access_token
  // IBM returns `expiration` as a Unix timestamp in seconds
  _expiresAtMs = (json.expiration ?? Math.floor(Date.now() / 1000) + 3600) * 1000

  // ── Debug log 3 – First 15 chars of token (masked) ───────────────────
  console.debug(
    '[OpsPilot:IAM] Token received:',
    _cachedToken ? `${_cachedToken.slice(0, 15)}...` : '(empty)',
    '| expires at:', new Date(_expiresAtMs).toISOString(),
  )

  return _cachedToken
}

/**
 * Force-clears the cached IAM token.
 * Called automatically when the deployment endpoint returns 401.
 */
export function invalidateIAMToken() {
  console.debug('[OpsPilot:IAM] Token cache invalidated.')
  _cachedToken = null
  _expiresAtMs = 0
}
