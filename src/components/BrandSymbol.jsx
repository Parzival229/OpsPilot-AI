/**
 * BrandSymbol – Official OpsPilot AI brand mark.
 *
 * Wraps the uploaded brand image in a neutral circular container so it
 * remains visible on all surface colours (dark header, white cards, light
 * chat area) without modifying the symbol itself.
 *
 * Usage:
 *   <BrandSymbol size="lg" />    → header (36 px)
 *   <BrandSymbol size="md" />    → response card header (22 px)
 *   <BrandSymbol size="sm" />    → agent badge (26 px container)
 *
 * To swap to a real file: change SYMBOL_SRC below to '/opspilot-symbol.png'
 * (after placing the file in /public) and remove the base64 constant.
 */

// ─── Asset source ────────────────────────────────────────────────────────────
// Replace this with '/opspilot-symbol.png' once the file is placed in /public
export const SYMBOL_SRC = '/opspilot-symbol.png'

// ─── Size presets ─────────────────────────────────────────────────────────────
const SIZE = {
  // [container px, image px, container style]
  lg: { container: 38, img: 30, ring: 'bg-[#f0f2f5] border border-[#e0e2e6]' },   // header
  md: { container: 22, img: 18, ring: 'bg-[#f0f2f5] border border-[#e0e2e6]' },   // response card header
  sm: { container: 28, img: 22, ring: 'bg-[#f0f2f5] border border-[#e0e2e6]' },   // agent badge
}

/**
 * @param {{
 *   size?: 'lg' | 'md' | 'sm',
 *   className?: string,
 *   alt?: string,
 * }} props
 */
export default function BrandSymbol({ size = 'sm', className = '', alt = 'OpsPilot AI' }) {
  const { container, img, ring } = SIZE[size]

  return (
    <span
      className={`inline-flex items-center justify-center rounded-full flex-shrink-0 ${ring} ${className}`}
      style={{ width: container, height: container }}
      aria-label={alt}
      role="img"
    >
      <img
        src={SYMBOL_SRC}
        alt={alt}
        width={img}
        height={img}
        style={{ width: img, height: img, objectFit: 'contain', display: 'block' }}
        draggable={false}
      />
    </span>
  )
}
