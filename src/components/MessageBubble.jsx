/**
 * MessageBubble – Renders a single message in the chat history.
 *
 * Supports three types:
 *   - 'user'    → Right-aligned query pill
 *   - 'ai'      → Left-aligned response wrapper (contains <ResponseCard />)
 *   - 'typing'  → Animated three-dot indicator while AI is thinking
 */

import clsx from 'clsx'
import ResponseCard from './ResponseCard.jsx'
import BrandSymbol from './BrandSymbol.jsx'

/**
 * @param {{
 *   type: 'user' | 'ai' | 'typing',
 *   content?: string,
 *   response?: import('../services/watsonxApi.js').StructuredResponse,
 *   timestamp?: Date,
 * }} props
 */
export default function MessageBubble({ type, content, response, timestamp }) {
  /* ── Typing indicator ── */
  if (type === 'typing') {
    return (
      <div className="flex items-start gap-3 animate-fade-in-up">
        <AgentBadge />
        <div className="bg-white border border-ibm-gray-20 rounded-xl px-4 py-3 shadow-card">
          <span className="typing-dot" />
          <span className="typing-dot" />
          <span className="typing-dot" />
        </div>
      </div>
    )
  }

  /* ── User message ── */
  if (type === 'user') {
    return (
      <div className="flex justify-end animate-fade-in-up">
        <div className="max-w-[72%] sm:max-w-[60%]">
          <div className="bg-ibm-gray-100 text-white rounded-xl rounded-br-sm px-4 py-2.5 text-[0.85rem] leading-relaxed">
            {content}
          </div>
          {timestamp && (
            <p className="text-right text-[0.68rem] text-ibm-gray-50 mt-1 pr-1">
              {formatTime(timestamp)}
            </p>
          )}
        </div>
      </div>
    )
  }

  /* ── AI response ── */
  if (type === 'ai' && response) {
    return (
      <div className="flex items-start gap-3 animate-fade-in-up">
        <AgentBadge />
        <div className="flex-1 min-w-0">
          <ResponseCard response={response} />
          {timestamp && (
            <p className="text-[0.68rem] text-ibm-gray-50 mt-1 pl-1">
              {formatTime(timestamp)}
            </p>
          )}
        </div>
      </div>
    )
  }

  /* ── AI error message ── */
  if (type === 'error') {
    return (
      <div className="flex items-start gap-3 animate-fade-in-up">
        <AgentBadge />
        <div className="bg-ibm-red-10 border border-red-200 rounded-xl px-4 py-3 text-[0.82rem] text-ibm-red shadow-card">
          <strong className="block mb-0.5 font-semibold">Unable to retrieve guidance</strong>
          <span className="text-ibm-gray-70">{content || 'An unexpected error occurred. Please try again or contact your IT administrator.'}</span>
        </div>
      </div>
    )
  }

  return null
}

/* ── Sub-components ─────────────────────────────────────────────────────── */

/** Small OpsPilot agent badge shown next to every AI message */
function AgentBadge() {
  return (
    <BrandSymbol
      size="sm"
      className="mt-0.5"
      alt="OpsPilot AI"
    />
  )
}

/** Format a Date as "10:32 AM" */
function formatTime(date) {
  return date instanceof Date
    ? date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
    : ''
}
