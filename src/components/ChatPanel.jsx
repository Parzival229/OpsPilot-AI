/**
 * ChatPanel – The main conversation area.
 *
 * Manages the message list, typing state, scrolling, and delegates
 * API calls to services/watsonxApi.js.
 *
 * Message schema:
 *   { id: string, type: 'user'|'ai'|'typing'|'error', content?: string,
 *     response?: StructuredResponse, timestamp: Date }
 */

import { useRef, useEffect, useReducer, useCallback } from 'react'
import MessageBubble from './MessageBubble.jsx'
import SuggestedScenarios from './SuggestedScenarios.jsx'
import ChatInput from './ChatInput.jsx'
import { fetchGuidance } from '../services/watsonxApi.js'

/* ── State management ────────────────────────────────────────────────────── */

const TYPING_ID = '__typing__'

function messagesReducer(state, action) {
  switch (action.type) {
    case 'ADD_USER':
      return [...state, {
        id: crypto.randomUUID(),
        type: 'user',
        content: action.payload,
        timestamp: new Date(),
      }]
    case 'ADD_TYPING':
      return [...state, { id: TYPING_ID, type: 'typing' }]
    case 'REMOVE_TYPING':
      return state.filter((m) => m.id !== TYPING_ID)
    case 'ADD_AI':
      return [...state, {
        id: crypto.randomUUID(),
        type: 'ai',
        response: action.payload,
        timestamp: new Date(),
      }]
    case 'ADD_ERROR':
      return [...state, {
        id: crypto.randomUUID(),
        type: 'error',
        content: action.payload,
        timestamp: new Date(),
      }]
    default:
      return state
  }
}

/* ── Component ───────────────────────────────────────────────────────────── */

export default function ChatPanel() {
  const [messages, dispatch] = useReducer(messagesReducer, [])
  const isLoading = messages.some((m) => m.id === TYPING_ID)
  const scrollAnchorRef = useRef(null)
  const messageAreaRef = useRef(null)

  /* Auto-scroll to bottom on new messages */
  useEffect(() => {
    scrollAnchorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [messages])

  /* Core submit handler */
  const handleSubmit = useCallback(
    async (query) => {
      if (isLoading) return

      dispatch({ type: 'ADD_USER', payload: query })
      dispatch({ type: 'ADD_TYPING' })

      try {
        const response = await fetchGuidance(query)
        dispatch({ type: 'REMOVE_TYPING' })
        dispatch({ type: 'ADD_AI', payload: response })
      } catch (err) {
        dispatch({ type: 'REMOVE_TYPING' })
        dispatch({
          type: 'ADD_ERROR',
          payload: err?.message ?? 'An unexpected error occurred. Please try again.',
        })
      }
    },
    [isLoading],
  )

  const isEmpty = messages.length === 0

  return (
    <div className="flex flex-col h-full">
      {/* ── Message area ── */}
      <div
        ref={messageAreaRef}
        className="flex-1 overflow-y-auto px-4 sm:px-6"
      >
        <div className="max-w-3xl mx-auto py-6">
          {isEmpty ? (
            /* Welcome / scenario selector */
            <div className="py-4">
              <SuggestedScenarios onSelect={handleSubmit} />
            </div>
          ) : (
            /* Message list */
            <div className="space-y-5">
              {messages.map((msg) => (
                <MessageBubble
                  key={msg.id}
                  type={msg.type}
                  content={msg.content}
                  response={msg.response}
                  timestamp={msg.timestamp}
                />
              ))}
              {/* Scroll anchor */}
              <div ref={scrollAnchorRef} className="h-1" aria-hidden="true" />
            </div>
          )}
        </div>
      </div>

      {/* ── Input area ── */}
      <div className="flex-shrink-0 border-t border-ibm-gray-20 bg-ibm-gray-10 px-4 sm:px-6 py-4">
        <div className="max-w-3xl mx-auto">
          <ChatInput onSubmit={handleSubmit} isLoading={isLoading} />
          <p className="text-center text-[0.7rem] text-ibm-gray-50 mt-2.5">
            OpsPilot AI provides operational guidance only. Always verify against your institution&apos;s current policies and consult a qualified clinician for patient care decisions.
          </p>
        </div>
      </div>
    </div>
  )
}
