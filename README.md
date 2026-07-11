# OpsPilot AI

**Hospital Operations Knowledge Copilot** — an enterprise-grade React + Vite application powered by IBM watsonx AI.

---

## Getting started

```bash
# 1. Install dependencies
npm install

# 2. (Optional) Configure the watsonx API
cp .env.example .env
# Edit .env with your VITE_WATSONX_API_KEY and VITE_WATSONX_ENDPOINT

# 3. Start the dev server
npm run dev
```

The app runs at **http://localhost:5173** by default.

---

## Project structure

```
src/
├── App.jsx                       # Root component (Header + ChatPanel)
├── main.jsx                      # React DOM entry point
├── index.css                     # Global styles, Tailwind directives, animations
│
├── components/
│   ├── Header.jsx                # IBM-style top navigation bar
│   ├── ChatPanel.jsx             # Message area + scroll + state management
│   ├── ChatInput.jsx             # Multiline input + "Ask OpsPilot" button
│   ├── MessageBubble.jsx         # User / AI / typing / error message variants
│   ├── ResponseCard.jsx          # Structured 7-section AI guidance card
│   └── SuggestedScenarios.jsx    # Four clickable scenario prompt cards
│
├── services/
│   └── watsonxApi.js             # IBM watsonx AI Agent integration point
│
└── data/
    └── scenarioResponses.js      # Mock structured responses (dev/demo)
```

---

## Connecting to IBM watsonx

Open [`src/services/watsonxApi.js`](src/services/watsonxApi.js) and follow the comments:

1. Set `VITE_WATSONX_API_KEY` and `VITE_WATSONX_ENDPOINT` in `.env`.
2. Uncomment the `fetch()` block inside `fetchGuidance()`.
3. Map your API's response shape to the `StructuredResponse` schema used by `<ResponseCard />`.

---

## Response schema (`StructuredResponse`)

```ts
{
  scenario:              string        // Scenario / topic title
  summary:               string        // One-paragraph overview
  workflow:              string[]      // Ordered step list
  responsibleStaff:      { role: string, responsibility: string }[]
  requiredDocumentation: string[]
  safetyCompliance:      string[]      // Rendered as warning banners
  relatedProcedures:     string[]      // Rendered as link chips
  operationalChecklist:  string[]      // Interactive checkboxes with progress bar
}
```

---

## Build for production

```bash
npm run build
# Output: dist/
```

---

## Tech stack

| Layer | Technology |
|---|---|
| Framework | React 18 |
| Build tool | Vite 5 |
| Styling | Tailwind CSS 3 |
| Font | IBM Plex Sans |
| AI backend | IBM watsonx (stubbed) |
| Utilities | clsx |
