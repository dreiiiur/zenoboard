import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FiSend, FiMessageCircle, FiAlertTriangle, FiX } from 'react-icons/fi'

const n8nWebhook = import.meta.env.VITE_N8N_WEBHOOK_URL

const initialMessages = [
  {
    id: 'assistant-0',
    role: 'assistant',
    text: 'Hi! I’m your Zeno. Ask me about finishes, products, project ideas, or anything else related to Zenoboard. I’m here to help with your marine plywood questions!',
  },
]

export default function ChatbotWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState(initialMessages)
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (event) => {
    event.preventDefault()
    const trimmed = input.trim()
    if (!trimmed) return

    const userMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: trimmed,
    }

    const nextMessages = [...messages, userMessage]
    setMessages(nextMessages)
    setInput('')
    setError(null)
    setLoading(true)

    try {
      const response = await fetch(n8nWebhook || '/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: trimmed,
          history: nextMessages.map(({ role, text }) => ({ role, text })),
        }),
      })

      if (!response.ok) {
        const body = await response.text()
        throw new Error(`${response.status} ${response.statusText}${body ? `: ${body}` : ''}`)
      }

      const data = await response.json()
      const assistantText = data?.reply || data?.answer || data?.message || 'Sorry, I did not receive a response.'
      setMessages([...nextMessages, { id: `assistant-${Date.now()}`, role: 'assistant', text: assistantText }])
    } catch (err) {
      console.error('Chatbot request failed:', err)
      setError(err.message || 'Unable to connect to the chatbot endpoint.')
      setMessages(nextMessages)
    } finally {
      setLoading(false)
    }
  }

  const resetChat = () => {
    setMessages(initialMessages)
    setError(null)
  }

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            className="fixed bottom-24 right-6 z-50 w-[360px] max-h-[75vh] rounded-[26px] border border-stone-200 bg-white shadow-2xl"
          >
            <div className="flex items-center justify-between gap-3 rounded-t-[26px] bg-primary px-5 py-4 text-white">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] font-semibold">Zenoboard Chat</p>
                <p className="text-xs text-primary/90">Gemini-ready assistant</p>
              </div>
              <button onClick={() => setOpen(false)} className="rounded-full bg-white/15 p-2 hover:bg-white/25 transition">
                <FiX className="h-4 w-4" />
              </button>
            </div>

            <div className="flex h-[420px] flex-col overflow-hidden border-b border-stone-200 bg-stone-50">
              <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`rounded-3xl p-4 text-sm leading-6 ${
                      message.role === 'assistant'
                        ? 'bg-white text-stone-700 border border-stone-200'
                        : 'self-end bg-primary/10 text-stone-900 border border-primary/20'
                    }`}
                  >
                    <p className="font-semibold text-[11px] uppercase tracking-[0.25em] mb-2">
                      {message.role === 'assistant' ? 'Assistant' : 'You'}
                    </p>
                    <p className="whitespace-pre-line">{message.text}</p>
                  </div>
                ))}
              </div>

              <div className="px-4 py-3">
                {error && (
                  <div className="mb-3 rounded-2xl bg-red-50 px-3 py-2 text-xs text-red-700">
                    <FiAlertTriangle className="inline mr-2 align-text-bottom" />
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="flex items-center gap-3">
                  <input
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    placeholder="Ask anything..."
                    className="flex-1 rounded-3xl border border-stone-200 bg-white px-4 py-3 text-sm text-stone-900 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    disabled={loading}
                  />
                  <button
                    type="submit"
                    disabled={loading || !input.trim()}
                    className="inline-flex h-12 items-center justify-center rounded-3xl bg-primary px-4 text-sm font-semibold text-white transition hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <FiSend className="h-4 w-4" />
                  </button>
                </form>
                {!n8nWebhook && (
                  <p className="mt-3 text-xs text-stone-500">
                    Set <code className="rounded bg-stone-100 px-1.5 py-0.5">VITE_N8N_WEBHOOK_URL</code> to point at your n8n webhook.
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 rounded-b-[26px] bg-stone-100 px-4 py-3 text-xs text-stone-500">
              <button type="button" onClick={resetChat} className="font-semibold text-stone-700 hover:text-stone-900">
                Reset chat
              </button>
              <span>Zenoboard Philippines</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-2xl shadow-primary/25 transition hover:scale-105"
        aria-label="Open chat"
      >
        <FiMessageCircle className="h-6 w-6" />
      </button>
    </>
  )
}
