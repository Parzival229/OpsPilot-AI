/**
 * Header – Top navigation bar for OpsPilot AI
 *
 * Renders the IBM-style top bar with product name, subtitle, and a
 * subtle environment badge. No sidebars, avatars, or nav items — purely
 * functional enterprise header.
 */

import BrandSymbol from './BrandSymbol.jsx'

export default function Header() {
  return (
    <header className="sticky top-0 z-30 bg-ibm-gray-100 border-b border-ibm-gray-90 shadow-none">
      <div className="max-w-[1120px] mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
        {/* Left: Product identity */}
        <div className="flex items-center gap-3 min-w-0">
          {/* Official OpsPilot AI brand symbol — 36 px, circular neutral container */}
          <BrandSymbol size="lg" alt="OpsPilot AI brand symbol" />

          <div className="min-w-0">
            <div className="flex items-baseline gap-2 flex-wrap">
              <span className="text-white font-semibold text-[0.95rem] leading-tight tracking-tight truncate">
                OpsPilot AI
              </span>
              <span className="hidden sm:inline text-ibm-gray-30 text-[0.75rem] font-normal leading-tight">
                Hospital Operations Knowledge Copilot
              </span>
            </div>
          </div>
        </div>

        {/* Right: Environment badge + IBM badge */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <span className="ibm-tag bg-ibm-blue-70 text-white border border-ibm-blue-50/30">
            Beta
          </span>
          <span className="hidden md:inline text-ibm-gray-50 text-[0.72rem] font-medium tracking-widest uppercase select-none">
            IBM
          </span>
        </div>
      </div>
    </header>
  )
}
