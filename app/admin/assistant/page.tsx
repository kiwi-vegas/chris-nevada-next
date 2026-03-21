'use client'
import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'

type DisplayMessage = { role: 'user' | 'assistant'; text: string; imagePreview?: string }

export default function AssistantPage() {
  const [displayMessages, setDisplayMessages] = useState<DisplayMessage[]>([
    { role: 'assistant', text: "Hi Chris! I'm here to help you update your website. You can tell me things like:\n\n• \"Change the drive time to the Strip in Summerlin to 22 minutes\"\n• \"Update the Reno median home price to $520,000\"\n• \"The hero image for Henderson needs to change\" (attach an image)\n\nWhat would you like to update?" }
  ])
  const [apiMessages, setApiMessages] = useState<any[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [pendingImage, setPendingImage] = useState<{ base64: string; mimeType: string; preview: string } | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [displayMessages, loading])

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      const dataUrl = reader.result as string
      const base64 = dataUrl.split(',')[1]
      setPendingImage({ base64, mimeType: file.type, preview: dataUrl })
    }
    reader.readAsDataURL(file)
    e.target.value = ''
  }

  async function handleSend() {
    if (!input.trim() && !pendingImage) return
    const userText = input.trim()
    setInput('')

    // Build display message
    const displayMsg: DisplayMessage = {
      role: 'user',
      text: userText || '(image attached)',
      imagePreview: pendingImage?.preview,
    }
    setDisplayMessages((prev) => [...prev, displayMsg])

    // Build API message
    let newApiMessage: any
    if (pendingImage) {
      newApiMessage = {
        role: 'user',
        content: [
          { type: 'image', source: { type: 'base64', media_type: pendingImage.mimeType, data: pendingImage.base64 } },
          ...(userText ? [{ type: 'text', text: userText }] : []),
        ],
      }
    } else {
      newApiMessage = { role: 'user', content: userText }
    }

    const newApiMessages = [...apiMessages, newApiMessage]
    setPendingImage(null)
    setLoading(true)

    try {
      const res = await fetch('/api/assistant/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newApiMessages }),
      })
      const data = await res.json()
      if (data.reply) {
        setDisplayMessages((prev) => [...prev, { role: 'assistant', text: data.reply }])
        setApiMessages(data.messages ?? newApiMessages)
      } else {
        setDisplayMessages((prev) => [...prev, { role: 'assistant', text: 'Something went wrong. Please try again.' }])
      }
    } catch {
      setDisplayMessages((prev) => [...prev, { role: 'assistant', text: 'Connection error. Please try again.' }])
    } finally {
      setLoading(false)
    }
  }

  async function handleLogout() {
    await fetch('/api/assistant/auth', { method: 'DELETE' })
    router.push('/admin/assistant/login')
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#0a0a0a', fontFamily: 'system-ui, sans-serif' }}>
      {/* Header */}
      <div style={{ padding: '16px 24px', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#111' }}>
        <div>
          <div style={{ color: '#c9a84c', fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase' }}>Nevada Real Estate Group</div>
          <div style={{ color: '#fff', fontSize: '16px', fontWeight: '600' }}>Content Assistant</div>
        </div>
        <button onClick={handleLogout} style={{ background: 'none', border: '1px solid rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.5)', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontSize: '13px' }}>
          Sign Out
        </button>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {displayMessages.map((msg, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
            <div style={{
              maxWidth: '75%', padding: '14px 18px', borderRadius: msg.role === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
              background: msg.role === 'user' ? '#c9a84c' : '#1a1a1a',
              color: msg.role === 'user' ? '#000' : '#fff',
              border: msg.role === 'assistant' ? '1px solid rgba(255,255,255,0.08)' : 'none',
              fontSize: '14px', lineHeight: '1.6', whiteSpace: 'pre-wrap',
            }}>
              {msg.imagePreview && <img src={msg.imagePreview} alt="uploaded" style={{ maxWidth: '200px', borderRadius: '8px', marginBottom: '8px', display: 'block' }} />}
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <div style={{ padding: '14px 18px', borderRadius: '18px 18px 18px 4px', background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.4)', fontSize: '14px' }}>
              Working on it…
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Image preview */}
      {pendingImage && (
        <div style={{ padding: '12px 24px', borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', gap: '12px', background: '#111' }}>
          <img src={pendingImage.preview} alt="pending" style={{ height: '48px', borderRadius: '6px' }} />
          <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px' }}>Image attached</span>
          <button onClick={() => setPendingImage(null)} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.3)', cursor: 'pointer', fontSize: '18px', marginLeft: 'auto' }}>×</button>
        </div>
      )}

      {/* Input */}
      <div style={{ padding: '16px 24px', borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', gap: '12px', alignItems: 'flex-end', background: '#111' }}>
        <input type="file" ref={fileRef} accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} />
        <button onClick={() => fileRef.current?.click()} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.6)', width: '44px', height: '44px', borderRadius: '8px', cursor: 'pointer', fontSize: '18px', flexShrink: 0 }}>
          📎
        </button>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend() } }}
          placeholder="Tell me what to update…"
          rows={1}
          style={{
            flex: 1, padding: '12px 16px', background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.12)', borderRadius: '8px',
            color: '#fff', fontSize: '14px', resize: 'none', outline: 'none',
            lineHeight: '1.5', maxHeight: '120px', overflowY: 'auto',
          }}
        />
        <button
          onClick={handleSend}
          disabled={loading || (!input.trim() && !pendingImage)}
          style={{
            background: '#c9a84c', border: 'none', borderRadius: '8px',
            color: '#000', padding: '12px 20px', fontWeight: '600', fontSize: '14px',
            cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.6 : 1, flexShrink: 0,
          }}
        >
          Send
        </button>
      </div>
    </div>
  )
}
