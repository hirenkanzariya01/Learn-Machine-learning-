import { useState, useRef, useEffect } from 'react'
import { Brain, Send, Loader, X, Sparkles } from 'lucide-react'

const SUGGESTIONS = [
  'Explain this topic simply',
  'Give me a real-world example',
  'What should I learn next?',
  'Quiz me on this topic',
  'Summarize key concepts',
]

export default function AIAssistant({ topic }) {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const bottomRef = useRef(null)

  useEffect(() => {
    setMessages([])
    setError(null)
  }, [topic.id])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const systemPrompt = `You are an expert AI/ML tutor helping a student learn about "${topic.title}". 
Be concise, clear, and encouraging. Use simple language and examples. 
The topic content is: ${topic.content.slice(0, 800)}...
Keep responses under 150 words. Use bullet points and code snippets when helpful.`

  const sendMessage = async (text) => {
    const userText = text || input.trim()
    if (!userText || loading) return

    const newMessages = [...messages, { role: 'user', content: userText }]
    setMessages(newMessages)
    setInput('')
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          system: systemPrompt,
          messages: newMessages,
        }),
      })

      const data = await response.json()

      if (data.error) {
        setError(data.error.message || 'API error')
        setLoading(false)
        return
      }

      const assistantText = data.content?.[0]?.text || 'Sorry, I could not generate a response.'
      setMessages(prev => [...prev, { role: 'assistant', content: assistantText }])
    } catch (err) {
      setError('Failed to connect to AI. Please check your connection.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="h-full flex flex-col bg-white dark:bg-gray-900">
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-200 dark:border-gray-800 flex-shrink-0">
        <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center">
          <Brain size={16} className="text-purple-600 dark:text-purple-400" />
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">AI Tutor</p>
          <p className="text-xs text-gray-400">Ask anything about this topic</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.length === 0 && (
          <div className="space-y-3">
            <div className="p-3 bg-purple-50 dark:bg-purple-900/10 rounded-xl border border-purple-100 dark:border-purple-800/30">
              <p className="text-xs text-purple-700 dark:text-purple-300 font-medium flex items-center gap-1">
                <Sparkles size={12} />
                Topic: {topic.title}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                I can explain concepts, give examples, quiz you, and help you understand this material.
              </p>
            </div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Quick questions</p>
            {SUGGESTIONS.map((s, i) => (
              <button
                key={i}
                onClick={() => sendMessage(s)}
                className="w-full text-left text-xs p-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 transition-colors"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.role === 'assistant' && (
              <div className="w-6 h-6 bg-purple-100 dark:bg-purple-900/30 rounded-full flex-shrink-0 flex items-center justify-center mt-1">
                <Brain size={12} className="text-purple-600 dark:text-purple-400" />
              </div>
            )}
            <div
              className={`max-w-[85%] px-3 py-2 rounded-xl text-xs leading-relaxed ${msg.role === 'user'
                  ? 'bg-sky-500 text-white rounded-tr-sm'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-tl-sm'
                }`}
              style={{ whiteSpace: 'pre-wrap' }}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex gap-2 justify-start">
            <div className="w-6 h-6 bg-purple-100 dark:bg-purple-900/30 rounded-full flex-shrink-0 flex items-center justify-center">
              <Brain size={12} className="text-purple-600 dark:text-purple-400" />
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 rounded-xl rounded-tl-sm px-3 py-2">
              <Loader size={14} className="animate-spin text-gray-400" />
            </div>
          </div>
        )}

        {error && (
          <div className="p-3 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-xl">
            <p className="text-xs text-red-600 dark:text-red-400">{error}</p>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="p-3 border-t border-gray-200 dark:border-gray-800 flex-shrink-0">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendMessage()}
            placeholder="Ask the AI tutor..."
            disabled={loading}
            className="flex-1 px-3 py-2 text-xs bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400/30 focus:border-purple-400 dark:text-gray-100 placeholder-gray-400"
          />
          <button
            onClick={() => sendMessage()}
            disabled={!input.trim() || loading}
            className="p-2 bg-purple-500 hover:bg-purple-600 text-white rounded-xl disabled:opacity-50 transition-colors"
          >
            <Send size={14} />
          </button>
        </div>
      </div>
    </div>
  )
}
