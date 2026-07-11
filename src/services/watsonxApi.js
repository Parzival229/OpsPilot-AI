/**
 * watsonxApi.js – IBM watsonx AI Agent integration service
 *
 * Standard IBM WML deployment authentication flow:
 *
 *   1. Exchange VITE_WATSONX_API_KEY for an IAM access token (iamToken.js)
 *   2. POST { messages: [{ role: "user", content: query }] } to the deployment
 *      with   Authorization: Bearer <iam-access-token>
 *   3. Consume streaming (SSE / NDJSON) or standard JSON response
 *   4. Parse raw text into the 7-section StructuredResponse for the UI
 *
 * This is the only module that communicates with IBM watsonx.
 * The UI layer never manages auth, request construction, or response parsing.
 *
 * Environment variables (set in .env — never hardcode):
 *   VITE_WATSONX_API_KEY   IBM Cloud API key
 *   VITE_WATSONX_ENDPOINT  Full deployment URL
 */

import { getIAMToken, invalidateIAMToken } from './iamToken.js'
import { SCENARIO_RESPONSES, getGenericResponse } from '../data/scenarioResponses.js'

/** @typedef {Object} StructuredResponse
 *  @property {string}   scenario
 *  @property {string}   summary
 *  @property {string[]} workflow
 *  @property {{ role: string, responsibility: string }[]} responsibleStaff
 *  @property {string[]} requiredDocumentation
 *  @property {string[]} safetyCompliance
 *  @property {string[]} relatedProcedures
 *  @property {string[]} operationalChecklist
 */

// ── Endpoint resolution ───────────────────────────────────────────────────

// Full deployment URL from .env:
// https://us-south.ml.cloud.ibm.com/ml/v4/deployments/<id>/ai_service?version=...
const ENDPOINT_FULL = import.meta.env.VITE_WATSONX_ENDPOINT

/**
 * Converts the full HTTPS endpoint URL to a Vite-proxy-relative path so the
 * dev server forwards the request server-side (avoiding browser CORS).
 *
 *   https://us-south.ml.cloud.ibm.com/ml/v4/deployments/.../ai_service?version=...
 *   → /api/wx/ml/v4/deployments/.../ai_service?version=...
 */
function getProxiedEndpoint() {
  if (!ENDPOINT_FULL) return null
  try {
    const url = new URL(ENDPOINT_FULL)
    return `/api/wx${url.pathname}${url.search}`
  } catch {
    return ENDPOINT_FULL
  }
}

const ENDPOINT = getProxiedEndpoint()

// ── Request builder ───────────────────────────────────────────────────────

/** @param {string} query */
function buildRequestBody(query) {
  return JSON.stringify({
    messages: [{ role: 'user', content: query }],
  })
}

// ── Streaming response consumer ───────────────────────────────────────────

/**
 * Reads a streaming response (NDJSON / SSE) and returns the full generated
 * text as a single string.
 *
 * Handles:
 *   • NDJSON lines:  {"results":[{"generated_text":"..."}]}
 *   • SSE lines:     data: {"choices":[{"delta":{"content":"..."}}]}
 *
 * @param {Response} res
 * @returns {Promise<string>}
 */
async function consumeStream(res) {
  const reader  = res.body.getReader()
  const decoder = new TextDecoder('utf-8')
  let accumulated = ''
  let buffer      = ''

  while (true) {
    const { done, value } = await reader.read()
    if (done) break

    buffer += decoder.decode(value, { stream: true })
    const lines = buffer.split('\n')
    buffer = lines.pop() ?? ''

    for (const line of lines) {
      const trimmed = line.trim()
      if (!trimmed || trimmed === 'data: [DONE]') continue

      const jsonStr = trimmed.startsWith('data: ') ? trimmed.slice(6) : trimmed

      try {
        const parsed = JSON.parse(jsonStr)
        const chunk =
          parsed?.results?.[0]?.generated_text ??
          parsed?.choices?.[0]?.delta?.content  ??
          parsed?.generated_text                ??
          parsed?.output ?? parsed?.content ?? parsed?.text ?? ''
        accumulated += chunk
      } catch {
        // Non-JSON line (SSE comment etc.) — skip
      }
    }
  }

  return accumulated.trim()
}

// ── Non-streaming response extractor ──────────────────────────────────────

/**
 * Extracts generated text from a standard JSON response body.
 * Tries all common watsonx / OpenAI-compatible response shapes.
 *
 * @param {object} json
 * @returns {string}
 */
function extractTextFromJson(json) {
  return (
    json?.results?.[0]?.generated_text    ??
    json?.choices?.[0]?.message?.content  ??
    json?.choices?.[0]?.text              ??
    json?.generated_text                  ??
    json?.output ?? json?.content ?? json?.text ??
    JSON.stringify(json)
  )
}

// ── Response parser: raw text → StructuredResponse ────────────────────────

/**
 * Maps the AI's raw text output to the 7-section StructuredResponse schema.
 * Handles three cases in priority order:
 *   1. AI returned valid JSON matching the schema — use directly
 *   2. AI returned markdown/text with section headings — parse by heading
 *   3. Nothing structured found — put full text in summary
 *
 * @param {string} rawText
 * @param {string} query
 * @returns {StructuredResponse}
 */
function parseToStructuredResponse(rawText, query) {
  // Case 1 — JSON response
  try {
    const json = JSON.parse(rawText)
    if (json.summary && json.workflow) {
      return {
        scenario:              json.scenario              ?? query,
        summary:               json.summary               ?? '',
        workflow:              toArray(json.workflow),
        responsibleStaff:      Array.isArray(json.responsibleStaff) ? json.responsibleStaff : [],
        requiredDocumentation: toArray(json.requiredDocumentation),
        safetyCompliance:      toArray(json.safetyCompliance),
        relatedProcedures:     toArray(json.relatedProcedures),
        operationalChecklist:  toArray(json.operationalChecklist),
      }
    }
  } catch { /* not JSON */ }

  // Case 2 — Section-heading text
  const extractSection = (patterns) => {
    for (const pattern of patterns) {
      const re = new RegExp(
        `(?:^|\\n)(?:#{1,3}\\s*)?${pattern}[:\\-–]?\\s*\\n([\\s\\S]*?)` +
        `(?=\\n(?:#{1,3}\\s*)?(?:Summary|Workflow|Responsible Staff|` +
        `Required Documentation|Safety|Related Procedures|Operational Checklist)|$)`,
        'im',
      )
      const m = rawText.match(re)
      if (m?.[1]) return m[1].trim()
    }
    return ''
  }

  const toLines = (block) =>
    block.split('\n').map((l) => l.replace(/^[-•*›\d.)\s]+/, '').trim()).filter(Boolean)

  const staffLines = toLines(extractSection(['Responsible Staff', 'Staff', 'Personnel', 'Roles']))
  const responsibleStaff = staffLines.map((line) => {
    const sep = line.match(/[–\-:]/)
    if (sep) {
      const idx = line.indexOf(sep[0])
      return { role: line.slice(0, idx).trim(), responsibility: line.slice(idx + 1).trim() }
    }
    return { role: line, responsibility: '' }
  })

  return {
    scenario:              query,
    summary:               extractSection(['Summary', 'Overview']) || rawText,
    workflow:              toLines(extractSection(['Workflow', 'Steps', 'Process'])),
    responsibleStaff,
    requiredDocumentation: toLines(extractSection(['Required Documentation', 'Documentation'])),
    safetyCompliance:      toLines(extractSection(['Safety.*Compliance', 'Safety', 'Compliance'])),
    relatedProcedures:     toLines(extractSection(['Related Procedures', 'Procedures'])),
    operationalChecklist:  toLines(extractSection(['Operational Checklist', 'Checklist'])),
  }
}

function toArray(v) {
  return Array.isArray(v) ? v : (v ? [v] : [])
}

// ── Core public function ──────────────────────────────────────────────────

/**
 * Fetches operational guidance from the IBM watsonx AI agent deployment.
 *
 * Authentication: standard IBM WML flow
 *   API key → IAM token exchange → Bearer token → deployment request
 *
 * @param {string} query
 * @returns {Promise<StructuredResponse>}
 */
export async function fetchGuidance(query) {
  if (!ENDPOINT) {
    console.warn('[OpsPilot] VITE_WATSONX_ENDPOINT not set — using mock data.')
    return _mockFallback(query)
  }

  // ── Step 1: Obtain IAM access token ───────────────────────────────────
  let token
  try {
    token = await getIAMToken()
  } catch (err) {
    throw new Error(`Authentication failed: ${err.message}`)
  }

  // ── Debug log 4: Deployment URL ───────────────────────────────────────
  console.debug('[OpsPilot:API] Deployment URL:', ENDPOINT)

  // ── Debug log 5: Request headers (masked) ────────────────────────────
  const maskedAuth = `Bearer ${token.slice(0, 15)}...`
  console.debug('[OpsPilot:API] Request headers:', {
    'Content-Type': 'application/json',
    Accept: 'text/event-stream, application/json',
    Authorization: maskedAuth,
  })

  // ── Step 2: Call deployment endpoint ──────────────────────────────────
  let res
  try {
    res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'text/event-stream, application/json',
        Authorization: `Bearer ${token}`,
      },
      body: buildRequestBody(query),
    })
  } catch (networkErr) {
    throw new Error(`Network error reaching watsonx endpoint: ${networkErr.message}`)
  }

  // ── Debug log 6: Response status ─────────────────────────────────────
  console.debug('[OpsPilot:API] Response status:', res.status, res.statusText)

  // ── Step 3: Handle errors ──────────────────────────────────────────────
  if (res.status === 401) {
    invalidateIAMToken()
    const body = await res.text().catch(() => '')
    throw new Error(
      `Authentication rejected (401).${body ? ` IBM response: ${body}` : ' Please reload and try again.'}`,
    )
  }

  if (!res.ok) {
    const errText = await res.text().catch(() => '')
    throw new Error(`watsonx API error (${res.status}): ${errText || res.statusText}`)
  }

  // ── Step 4: Consume response ───────────────────────────────────────────
  const contentType = res.headers.get('content-type') ?? ''
  const isStreaming  =
    contentType.includes('text/event-stream')    ||
    contentType.includes('application/x-ndjson') ||
    contentType.includes('application/stream')

  let rawText = ''
  if (isStreaming && res.body) {
    rawText = await consumeStream(res)
  } else {
    const json = await res.json()
    rawText = extractTextFromJson(json)
  }

  if (!rawText) {
    throw new Error('The AI agent returned an empty response. Please try again.')
  }

  // ── Step 5: Parse and return ───────────────────────────────────────────
  return parseToStructuredResponse(rawText, query)
}

// ── Mock fallback ─────────────────────────────────────────────────────────

function _mockFallback(query) {
  const exactMatch = SCENARIO_RESPONSES[query]
  if (exactMatch) return Promise.resolve(exactMatch)

  const key = Object.keys(SCENARIO_RESPONSES).find(
    (k) =>
      k.toLowerCase().includes(query.toLowerCase()) ||
      query.toLowerCase().includes(k.toLowerCase()),
  )
  return Promise.resolve(key ? SCENARIO_RESPONSES[key] : getGenericResponse(query))
}
