/**
 * ChatInput – Multiline query input with "Ask OpsPilot" submit button.
 *
 * Features:
 *  - Grows vertically up to ~5 rows before scrolling
 *  - Cmd/Ctrl+Enter submits
 *  - Enter (without Shift) submits on desktop
 *  - Shift+Enter inserts a newline
 *  - Disabled while AI is loading
 *  - Character count hint for long inputs
 */

import { useRef, useState } from 'react'
import clsx from 'clsx'

const MAX_CHARS = 1000

/**
 * @param {{
 *   onSubmit: (text: string) => void,
 *   isLoading: boolean,
 * }} props
 */
export default function ChatInput({ onSubmit, isLoading }) {
  const [value, setValue] = useState('')
  const textareaRef = useRef(null)

  const canSubmit = value.trim().length > 0 && !isLoading && value.length <= MAX_CHARS

  const handleSubmit = () => {
    if (!canSubmit) return
    onSubmit(value.trim())
    setValue('')
    textareaRef.current?.focus()
  }

  const handleKeyDown = (e) => {
    // Enter (without Shift) → submit
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  const remaining = MAX_CHARS - value.length
  const nearLimit = remaining <= 100

  return (
    <div className="w-full bg-white border border-ibm-gray-20 rounded-xl shadow-panel overflow-hidden">
      {/* Textarea */}
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Describe a hospital operations scenario or ask a workflow question…"
        disabled={isLoading}
        rows={3}
        maxLength={MAX_CHARS}
        aria-label="Query input"
        className={clsx(
          'w-full resize-none px-4 pt-3.5 pb-2 text-[0.88rem] leading-relaxed',
          'text-ibm-gray-100 placeholder-ibm-gray-50',
          'bg-transparent border-0 outline-none focus:outline-none',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          'font-[\'IBM_Plex_Sans\',Inter,sans-serif]',
        )}
        style={{ minHeight: '80px', maxHeight: '160px' }}
      />

      {/* Bottom bar: hint + submit */}
      <div className="flex items-center justify-between gap-3 px-4 py-2.5 border-t border-ibm-gray-20 bg-ibm-gray-10">
        {/* Left: keyboard hint */}
        <div className="flex items-center gap-1.5 text-[0.72rem] text-ibm-gray-50">
          <span>Press</span>
          <kbd className="px-1.5 py-0.5 bg-white border border-ibm-gray-20 rounded text-[0.68rem] font-mono leading-none">
            Enter
          </kbd>
          <span>to submit ·</span>
          <kbd className="px-1.5 py-0.5 bg-white border border-ibm-gray-20 rounded text-[0.68rem] font-mono leading-none">
            Shift↵
          </kbd>
          <span>for new line</span>
          {nearLimit && (
            <span className={clsx('ml-2', remaining <= 20 ? 'text-ibm-red font-semibold' : 'text-[#b45309]')}>
              · {remaining} chars remaining
            </span>
          )}
        </div>

        {/* Right: submit button */}
        <button
          onClick={handleSubmit}
          disabled={!canSubmit}
          aria-label="Ask OpsPilot"
          className={clsx(
            'flex items-center gap-2 px-4 py-2 rounded text-[0.82rem] font-semibold leading-none',
            'transition-all duration-150 select-none',
            canSubmit
              ? 'bg-ibm-blue text-white hover:bg-ibm-blue-70 active:scale-[0.97]'
              : 'bg-ibm-gray-20 text-ibm-gray-50 cursor-not-allowed',
          )}
        >
          {isLoading ? (
            <>
              <LoadingSpinner />
              Thinking…
            </>
          ) : (
            <>
              Ask OpsPilot
              <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5" aria-hidden="true">
                <path d="M2 8h12M9 3l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </>
          )}
        </button>
      </div>
    </div>
  )
}

/* ── Spinner ─────────────────────────────────────────────────────────────── */

function LoadingSpinner() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      className="w-3.5 h-3.5 animate-spin"
      aria-hidden="true"
    >
      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="2" strokeOpacity="0.3" />
      <path
        d="M8 2a6 6 0 0 1 6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}
