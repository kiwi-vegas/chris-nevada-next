'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AssistantLoginPage() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/assistant/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      if (res.ok) {
        const hasAvatar = localStorage.getItem('assistant_avatar')
        router.push(hasAvatar ? '/admin/assistant' : '/admin/assistant/setup')
      } else {
        setError('Incorrect password. Please try again.')
      }
    } catch {
      setError('Connection error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: '#0a0a0a', fontFamily: 'system-ui, sans-serif',
    }}>
      <div style={{
        width: '100%', maxWidth: '400px', padding: '48px 40px',
        background: '#141414', border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '12px',
      }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ color: '#c9a84c', fontSize: '13px', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '12px' }}>
            Nevada Real Estate Group
          </div>
          <h1 style={{ color: '#fff', fontSize: '22px', fontWeight: '600', margin: 0 }}>
            Content Assistant
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px', marginTop: '8px' }}>
            Sign in to manage your site content
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: '100%', padding: '14px 16px', marginBottom: '16px',
              background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: '8px', color: '#fff', fontSize: '15px',
              outline: 'none', boxSizing: 'border-box',
            }}
          />
          {error && (
            <p style={{ color: '#ff6b6b', fontSize: '13px', marginBottom: '16px', marginTop: '-8px' }}>
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%', padding: '14px', background: '#c9a84c',
              border: 'none', borderRadius: '8px', color: '#000',
              fontSize: '15px', fontWeight: '600', cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  )
}
