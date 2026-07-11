# OpsPilot AI – Brand Symbol Setup

## One-step setup

Save the uploaded brand image as:

```
OpsPilot AI/
└── public/
    └── opspilot-symbol.png   ← place the file here
```

That's it. No code changes needed.

---

## Where the symbol appears

| Location | Component | Size |
|---|---|---|
| Header logo | `Header.jsx` → `<BrandSymbol size="lg" />` | 38 px container / 30 px image |
| Chat agent badge | `MessageBubble.jsx` → `AgentBadge()` → `<BrandSymbol size="sm" />` | 28 px container / 22 px image |
| Response card header | `ResponseCard.jsx` → `<BrandSymbol size="md" />` | 22 px container / 18 px image |
| Browser favicon | `index.html` + `public/opspilot.svg` | native |

All four locations are driven by a single [`src/components/BrandSymbol.jsx`](src/components/BrandSymbol.jsx) component.

---

## Changing the asset path

Open `src/components/BrandSymbol.jsx` and update `SYMBOL_SRC`:

```js
// Current (PNG in /public)
export const SYMBOL_SRC = '/opspilot-symbol.png'

// To use a different format or CDN URL:
export const SYMBOL_SRC = 'https://cdn.example.com/opspilot-symbol.webp'
```
