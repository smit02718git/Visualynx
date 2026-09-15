'use client'

import { FormEvent, useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import rehypeKatex from 'rehype-katex'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'

type ChatMessage = {
  role: 'user' | 'ai'
  content: string
}

type ChatSectionProps = {
  subject: string
}

export default function ChatSection({ subject }: ChatSectionProps) {
  const storageKey = `visualynx-chat:${subject}`
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    if (typeof window === 'undefined') return []
    const saved = window.sessionStorage.getItem(storageKey)
    if (!saved) return []
    try {
      return JSON.parse(saved) as ChatMessage[]
    } catch {
      return []
    }
  })
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    window.sessionStorage.setItem(storageKey, JSON.stringify(messages))
  }, [messages, storageKey])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const content = input.trim()

    if (!content || isLoading) return

    const nextMessages = [...messages, { role: 'user' as const, content }]
    setMessages(nextMessages)
    setInput('')
    setError(null)
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subject, history: { messages: nextMessages } }),
      })

      if (!response.ok) {
        const message = await response.text()
        throw new Error(message || 'The tutor could not respond right now.')
      }

      const data: { messages: ChatMessage[] } = await response.json()
      setMessages(data.messages)
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Something went wrong.')
      setMessages(messages)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="zoom-[1.1] h-screen flex min-h-96 flex-col p-4 text-zinc-900 sm:p-6">
      <div className="mb-5 border-b border-zinc-100 pb-4">
        <h2 className="mt-2 text-2xl font-bold">Your {subject === 'maths' ? 'mathematics' : subject} tutor</h2>
        <p className="mt-1 text-sm text-zinc-500">Ask a question and keep the conversation focused.</p>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto pb-4" aria-live="polite">
        {messages.length === 0 && !isLoading && (
          <p className="rounded-xl bg-indigo-50 p-4 text-sm leading-relaxed text-indigo-900">
            What would you like to understand about {subject}?
          </p>
        )}

        {messages.map((message, index) => (
          <div
            key={`${message.role}-${index}`}
            className={`max-w-[90%] rounded-xl px-4 py-3 text-sm leading-relaxed ${
              message.role === 'user'
                ? `ml-auto ${subject === 'maths' ? 'bg-[#b1fcbf]' : subject === 'physics' ? 'bg-[#b4f3fa]' : subject === 'chemistry' ? 'bg-[#fac5a0]' : ''} text-black`
                : 'bg-indigo-50 text-indigo-950 [&_a]:font-medium [&_a]:text-indigo-700 [&_a]:underline [&_code]:rounded [&_code]:bg-indigo-100 [&_code]:px-1 [&_code]:py-0.5 [&_h1]:mb-2 [&_h1]:text-lg [&_h1]:font-bold [&_h2]:mb-2 [&_h2]:text-base [&_h2]:font-bold [&_h3]:mb-1 [&_h3]:font-semibold [&_li]:ml-4 [&_li]:list-disc [&_ol]:mb-2 [&_ol]:space-y-1 [&_p]:mb-2 [&_p:last-child]:mb-0 [&_pre]:my-2 [&_pre]:overflow-x-auto [&_pre]:rounded-lg [&_pre]:bg-indigo-950 [&_pre]:p-3 [&_pre]:text-indigo-50 [&_strong]:font-bold [&_ul]:mb-2 [&_ul]:space-y-1'
            }`}
          >
            {message.role === 'ai' ? (
              <ReactMarkdown
                remarkPlugins={[remarkGfm, remarkMath]}
                rehypePlugins={[rehypeKatex]}
              >
                {message.content}
              </ReactMarkdown>
            ) : (
              message.content
            )}
          </div>
        ))}

        {isLoading && <p className="text-sm text-zinc-500">Thinking...</p>}
        {error && <p className="text-sm text-red-600" role="alert">{error}</p>}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2 border-t border-zinc-100 pt-4">
        <label htmlFor="chat-question" className="sr-only">Ask a question</label>
        <input
          id="chat-question"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder={`Ask about ${subject}`}
          disabled={isLoading}
          className="min-w-0 flex-1 rounded-xl border border-zinc-200 px-4 py-3 text-sm outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 disabled:bg-zinc-50"
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Send
        </button>
      </form>
    </div>
  )
}