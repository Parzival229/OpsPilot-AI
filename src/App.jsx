/**
 * App – Root application component.
 *
 * Composes: <Header /> + <ChatPanel />
 * The app fills the full viewport height and never scrolls at the root level —
 * all scrolling happens within the <ChatPanel /> message area.
 */

import Header from './components/Header.jsx'
import ChatPanel from './components/ChatPanel.jsx'

export default function App() {
  return (
    <div className="flex flex-col h-screen bg-ibm-gray-10 overflow-hidden">
      {/* Sticky top navigation bar */}
      <Header />

      {/* Main chat workspace */}
      <main className="flex-1 min-h-0">
        <ChatPanel />
      </main>
    </div>
  )
}
