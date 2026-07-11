/**
 * ResponseCard – Renders a structured AI guidance response.
 *
 * Accepts a `response` object matching the StructuredResponse schema defined
 * in services/watsonxApi.js and renders each section as a labelled card panel.
 */

import { useState } from 'react'
import clsx from 'clsx'
import BrandSymbol from './BrandSymbol.jsx'

/* ── Section helpers ─────────────────────────────────────────────────────── */

function SectionLabel({ children, accent }) {
  return (
    <h3
      className={clsx(
        'text-[0.68rem] font-semibold uppercase tracking-[0.08em] mb-2',
        accent ? 'text-ibm-blue' : 'text-ibm-gray-50',
      )}
    >
      {children}
    </h3>
  )
}

function SectionDivider() {
  return <hr className="border-ibm-gray-20 my-4" />
}

/** Numbered step list */
function WorkflowList({ steps }) {
  return (
    <ol className="space-y-2">
      {steps.map((step, i) => (
        <li key={i} className="flex gap-2.5 text-[0.82rem] text-ibm-gray-90 leading-relaxed">
          <span className="flex-shrink-0 w-5 h-5 rounded-full bg-ibm-blue-10 text-ibm-blue font-semibold text-[0.72rem] flex items-center justify-center mt-0.5">
            {i + 1}
          </span>
          <span>{step}</span>
        </li>
      ))}
    </ol>
  )
}

/** Staff responsibility table */
function StaffTable({ staff }) {
  return (
    <div className="overflow-x-auto -mx-1">
      <table className="w-full text-[0.8rem] border-collapse">
        <thead>
          <tr className="border-b border-ibm-gray-20">
            <th className="text-left py-1.5 px-2 font-semibold text-ibm-gray-70 w-[36%]">Role</th>
            <th className="text-left py-1.5 px-2 font-semibold text-ibm-gray-70">Responsibility</th>
          </tr>
        </thead>
        <tbody>
          {staff.map((s, i) => (
            <tr
              key={i}
              className={clsx('border-b border-ibm-gray-20 last:border-0', i % 2 === 0 ? 'bg-white' : 'bg-ibm-gray-10')}
            >
              <td className="py-2 px-2 font-medium text-ibm-gray-100 align-top">{s.role}</td>
              <td className="py-2 px-2 text-ibm-gray-70 align-top">{s.responsibility}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/** Bullet list */
function BulletList({ items, icon }) {
  return (
    <ul className="space-y-1.5">
      {items.map((item, i) => (
        <li key={i} className="flex gap-2 text-[0.82rem] text-ibm-gray-90 leading-relaxed">
          <span className="flex-shrink-0 mt-1.5 text-ibm-gray-30">{icon || '–'}</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

/** Interactive checklist */
function Checklist({ items }) {
  const [checked, setChecked] = useState(() => new Array(items.length).fill(false))

  const toggle = (i) =>
    setChecked((prev) => prev.map((v, idx) => (idx === i ? !v : v)))

  const doneCount = checked.filter(Boolean).length

  return (
    <div>
      <div className="flex items-center justify-between mb-2.5">
        <span className="text-[0.72rem] text-ibm-gray-50">
          {doneCount} / {items.length} complete
        </span>
        {/* Progress bar */}
        <div className="flex-1 mx-3 h-1.5 bg-ibm-gray-20 rounded-full overflow-hidden">
          <div
            className="h-full bg-ibm-green rounded-full transition-all duration-300"
            style={{ width: `${(doneCount / items.length) * 100}%` }}
          />
        </div>
      </div>
      <ul className="space-y-1.5">
        {items.map((item, i) => (
          <li key={i} className="checklist-item flex items-start gap-2.5 cursor-pointer select-none">
            <input
              type="checkbox"
              id={`chk-${i}`}
              checked={checked[i]}
              onChange={() => toggle(i)}
              className="mt-[3px]"
            />
            <label
              htmlFor={`chk-${i}`}
              className={clsx(
                'text-[0.82rem] leading-relaxed cursor-pointer transition-colors',
                checked[i] ? 'text-ibm-gray-50 line-through' : 'text-ibm-gray-90',
              )}
            >
              {item}
            </label>
          </li>
        ))}
      </ul>
    </div>
  )
}

/* ── Main component ─────────────────────────────────────────────────────── */

/**
 * @param {{ response: import('../services/watsonxApi.js').StructuredResponse }} props
 */
export default function ResponseCard({ response }) {
  return (
    <div className="animate-fade-in-up bg-white border border-ibm-gray-20 rounded-xl shadow-card overflow-hidden w-full">
      {/* Card header */}
      <div className="bg-ibm-gray-100 px-5 py-3.5 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          {/* Brand symbol — compact circular container on dark surface */}
          <BrandSymbol size="md" alt="OpsPilot AI" />
          <h2 className="text-white font-semibold text-[0.88rem] tracking-tight leading-tight">
            {response.scenario}
          </h2>
        </div>
        <span className="ibm-tag bg-ibm-blue text-white flex-shrink-0">
          AI Guidance
        </span>
      </div>

      {/* Card body */}
      <div className="px-5 py-5 space-y-0">

        {/* ── Summary ── */}
        <section>
          <SectionLabel accent>Summary</SectionLabel>
          <p className="text-[0.85rem] text-ibm-gray-90 leading-relaxed">
            {response.summary}
          </p>
        </section>

        <SectionDivider />

        {/* ── Workflow ── */}
        <section>
          <SectionLabel>Workflow</SectionLabel>
          <WorkflowList steps={response.workflow} />
        </section>

        <SectionDivider />

        {/* ── Responsible Staff ── */}
        <section>
          <SectionLabel>Responsible Staff</SectionLabel>
          <StaffTable staff={response.responsibleStaff} />
        </section>

        <SectionDivider />

        {/* ── Required Documentation ── */}
        <section>
          <SectionLabel>Required Documentation</SectionLabel>
          <BulletList items={response.requiredDocumentation} icon="›" />
        </section>

        <SectionDivider />

        {/* ── Safety & Compliance ── */}
        <section>
          <SectionLabel>Safety &amp; Compliance</SectionLabel>
          <div className="space-y-1.5">
            {response.safetyCompliance.map((item, i) => (
              <div
                key={i}
                className="flex gap-2 items-start bg-ibm-yellow-10 border border-yellow-200 rounded px-3 py-2"
              >
                <svg className="w-3.5 h-3.5 text-[#b45309] flex-shrink-0 mt-0.5" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M8 1.5L14.5 13H1.5L8 1.5z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
                  <path d="M8 6v3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                  <circle cx="8" cy="11.25" r="0.75" fill="currentColor" />
                </svg>
                <span className="text-[0.8rem] text-ibm-gray-90 leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </section>

        <SectionDivider />

        {/* ── Related Procedures ── */}
        <section>
          <SectionLabel>Related Procedures</SectionLabel>
          <div className="flex flex-wrap gap-2">
            {response.relatedProcedures.map((proc, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1.5 bg-ibm-blue-10 border border-ibm-blue-20 text-ibm-blue rounded px-2.5 py-1 text-[0.76rem] font-medium"
              >
                <svg className="w-3 h-3 flex-shrink-0" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path d="M1 6h10M7 2l4 4-4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {proc}
              </span>
            ))}
          </div>
        </section>

        <SectionDivider />

        {/* ── Operational Checklist ── */}
        <section>
          <SectionLabel>Operational Checklist</SectionLabel>
          <Checklist items={response.operationalChecklist} />
        </section>

      </div>

      {/* Card footer */}
      <div className="border-t border-ibm-gray-20 px-5 py-2.5 bg-ibm-gray-10 flex items-center justify-between gap-2">
        <span className="text-[0.72rem] text-ibm-gray-50">
          Generated by OpsPilot AI · Powered by IBM watsonx
        </span>
        <span className="text-[0.72rem] text-ibm-gray-50">
          {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
        </span>
      </div>
    </div>
  )
}
