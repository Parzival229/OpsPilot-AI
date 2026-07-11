/**
 * SuggestedScenarios – Four clickable scenario prompt cards.
 *
 * Rendered when the message list is empty (welcome state).
 * Each card fires onSelect(label) which the parent wires to the chat flow.
 */

const SCENARIOS = [
  {
    id: 'emergency',
    label: 'Emergency Patient Admission',
    description: 'Triage, bed assignment, and rapid admission workflow for ED patients.',
    icon: (
      <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5" aria-hidden="true">
        <circle cx="10" cy="10" r="8.5" stroke="currentColor" strokeWidth="1.4" />
        <path d="M10 6v4m0 0v4m0-4h4m-4 0H6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
    accentClass: 'text-ibm-red border-ibm-red/20 bg-ibm-red-10',
    dotClass: 'bg-ibm-red',
  },
  {
    id: 'icu-transfer',
    label: 'ICU to Ward Transfer',
    description: 'Step-by-step transfer protocol from intensive care to general ward.',
    icon: (
      <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5" aria-hidden="true">
        <rect x="1.5" y="4.5" width="8" height="11" rx="1.2" stroke="currentColor" strokeWidth="1.4" />
        <rect x="10.5" y="4.5" width="8" height="11" rx="1.2" stroke="currentColor" strokeWidth="1.4" />
        <path d="M9.5 10h5m-2-2 2 2-2 2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    accentClass: 'text-ibm-teal border-ibm-teal/20 bg-[#e6f8f8]',
    dotClass: 'bg-ibm-teal',
  },
  {
    id: 'med-error',
    label: 'Medication Error Workflow',
    description: 'Escalation, reporting, and root-cause analysis for medication events.',
    icon: (
      <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5" aria-hidden="true">
        <path d="M10 2.5L17.5 15.5H2.5L10 2.5z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
        <path d="M10 8.5v3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <circle cx="10" cy="13.75" r="0.75" fill="currentColor" />
      </svg>
    ),
    accentClass: 'text-[#b45309] border-yellow-200 bg-ibm-yellow-10',
    dotClass: 'bg-ibm-yellow',
  },
  {
    id: 'fire',
    label: 'Fire Emergency Response',
    description: 'RACE/PASS protocol, patient evacuation tiers, and ICS activation.',
    icon: (
      <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5" aria-hidden="true">
        <path d="M10 17C6.134 17 3 13.866 3 10c0-2.5 1.5-4.5 3-6 0 2 1 3 2 3-.5-2 1-4.5 4-5.5-.5 2 .5 3.5 1.5 4.5 1-1 1-2.5 1-2.5C15.5 5.5 17 7.5 17 10c0 3.866-3.134 7-7 7z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
        <path d="M10 17v-3m0 0c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    ),
    accentClass: 'text-ibm-blue border-ibm-blue-20 bg-ibm-blue-10',
    dotClass: 'bg-ibm-blue',
  },
]

/**
 * @param {{ onSelect: (label: string) => void }} props
 */
export default function SuggestedScenarios({ onSelect }) {
  return (
    <section className="w-full max-w-3xl mx-auto px-0">
      {/* Welcome message */}
      <div className="mb-6 text-center">
        <h2 className="text-[1.05rem] font-semibold text-ibm-gray-100 mb-1">
          How can OpsPilot help today?
        </h2>
        <p className="text-[0.85rem] text-ibm-gray-70 max-w-lg mx-auto">
          Select a common hospital operations scenario below, or type your question in the field at the bottom.
        </p>
      </div>

      {/* Scenario cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {SCENARIOS.map((s) => (
          <button
            key={s.id}
            onClick={() => onSelect(s.label)}
            className="group text-left bg-white border border-ibm-gray-20 rounded-lg px-4 py-4 
                       hover:border-ibm-blue hover:shadow-card transition-all duration-150
                       focus-visible:ring-0 focus-visible:outline-2 focus-visible:outline-ibm-blue"
          >
            <div className="flex items-start gap-3">
              <span className={`mt-0.5 p-1.5 rounded-md ${s.accentClass} flex-shrink-0`}>
                {s.icon}
              </span>
              <div className="min-w-0">
                <p className="text-[0.88rem] font-semibold text-ibm-gray-100 leading-snug mb-1 group-hover:text-ibm-blue transition-colors">
                  {s.label}
                </p>
                <p className="text-[0.78rem] text-ibm-gray-70 leading-snug">
                  {s.description}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </section>
  )
}
