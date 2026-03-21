'use client'

import { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import type { ScoredArticle } from '@/lib/types'

const CATEGORY_LABELS: Record<string, string> = {
  'market-update': 'Market Update',
  'buying-tips': 'Buying Tips',
  'selling-tips': 'Selling Tips',
  'community-spotlight': 'Community Spotlight',
  investment: 'Investment',
  news: 'News',
}

const CATEGORY_COLORS: Record<string, string> = {
  'market-update': '#C9A84C',
  'buying-tips': '#4CAF50',
  'selling-tips': '#2196F3',
  'community-spotlight': '#9C27B0',
  investment: '#FF9800',
  news: '#607D8B',
}

export default function BlogPickerPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const date = params.date as string
  const secret = searchParams.get('secret') ?? ''

  const [articles, setArticles] = useState<ScoredArticle[]>([])
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(true)
  const [publishing, setPublishing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<{ published: Array<{ title: string; slug: string }> } | null>(null)

  useEffect(() => {
    if (!date || !secret) {
      setError('Missing date or secret in URL')
      setLoading(false)
      return
    }

    fetch(`/api/articles/${date}?secret=${secret}`)
      .then((r) => {
        if (!r.ok) throw new Error(r.status === 401 ? 'Unauthorized' : 'No articles found for this date')
        return r.json()
      })
      .then((data) => setArticles(data.articles ?? []))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [date, secret])

  function toggleArticle(id: string) {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else if (next.size < 3) {
        next.add(id)
      }
      return next
    })
  }

  async function handlePublish() {
    if (selected.size !== 3) return
    setPublishing(true)
    setError(null)

    try {
      const res = await fetch('/api/blog/publish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ secret, date, articleIds: Array.from(selected) }),
      })
      const data = await res.json()
      if (!res.ok || !data.success) throw new Error(data.error ?? data.message ?? 'Publish failed')
      setResult(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setPublishing(false)
    }
  }

  if (loading) {
    return (
      <div style={styles.page}>
        <div style={styles.container}>
          <div style={styles.loading}>Loading today&apos;s articles...</div>
        </div>
      </div>
    )
  }

  if (result) {
    return (
      <div style={styles.page}>
        <div style={styles.container}>
          <div style={styles.successBox}>
            <div style={styles.successIcon}>✓</div>
            <h2 style={styles.successTitle}>{result.published.length} Posts Published</h2>
            <p style={styles.successSub}>They&apos;re live on the blog now.</p>
            <ul style={styles.publishedList}>
              {result.published.map((p) => (
                <li key={p.slug} style={styles.publishedItem}>
                  <a
                    href={`/blog/${p.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={styles.publishedLink}
                  >
                    {p.title} →
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }

  const dateFormatted = new Date(date + 'T12:00:00').toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div style={styles.page}>
      <div style={styles.container}>

        {/* Header */}
        <div style={styles.header}>
          <div style={styles.headerLabel}>Nevada Real Estate Group · Blog Pipeline</div>
          <h1 style={styles.headerTitle}>Pick 3 Articles to Publish</h1>
          <p style={styles.headerSub}>{dateFormatted} · {articles.length} articles found</p>
        </div>

        {error && <div style={styles.errorBox}>{error}</div>}

        {/* Progress bar */}
        <div style={styles.progressBar}>
          <div style={styles.progressLabel}>
            {selected.size}/3 selected
          </div>
          <div style={styles.progressTrack}>
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                style={{
                  ...styles.progressDot,
                  background: i < selected.size ? '#C9A84C' : 'rgba(201,168,76,0.2)',
                }}
              />
            ))}
          </div>
        </div>

        {/* Article grid */}
        <div style={styles.grid}>
          {articles.map((article, index) => {
            const isSelected = selected.has(article.id)
            const color = CATEGORY_COLORS[article.category] ?? '#C9A84C'
            return (
              <div
                key={article.id}
                onClick={() => toggleArticle(article.id)}
                style={{
                  ...styles.card,
                  border: isSelected
                    ? '2px solid #C9A84C'
                    : '2px solid rgba(201,168,76,0.15)',
                  background: isSelected ? 'rgba(201,168,76,0.06)' : '#141414',
                  cursor: selected.size >= 3 && !isSelected ? 'not-allowed' : 'pointer',
                  opacity: selected.size >= 3 && !isSelected ? 0.4 : 1,
                }}
              >
                <div style={styles.cardTop}>
                  <span style={styles.cardNumber}>{index + 1}</span>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <span style={{ ...styles.categoryBadge, background: color + '22', color }}>
                      {CATEGORY_LABELS[article.category] ?? article.category}
                    </span>
                    <span style={styles.score}>{article.relevanceScore}/10</span>
                  </div>
                </div>
                <div style={styles.cardTitle}>{article.title}</div>
                <div style={styles.cardSummary}>{article.whyItMatters}</div>
                <div style={styles.cardMeta}>
                  {article.source}
                  {article.publishedDate
                    ? ` · ${new Date(article.publishedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`
                    : ''}
                </div>
                {isSelected && (
                  <div style={styles.selectedBadge}>✓ Selected</div>
                )}
              </div>
            )
          })}
        </div>

        {/* Publish button */}
        <div style={styles.footer}>
          <button
            onClick={handlePublish}
            disabled={selected.size !== 3 || publishing}
            style={{
              ...styles.publishBtn,
              opacity: selected.size !== 3 || publishing ? 0.4 : 1,
              cursor: selected.size !== 3 || publishing ? 'not-allowed' : 'pointer',
            }}
          >
            {publishing ? 'Publishing...' : selected.size === 3 ? 'Publish 3 Posts →' : `Select ${3 - selected.size} more`}
          </button>
          <p style={styles.footerNote}>
            Claude will write and publish all 3 posts to the site simultaneously. This may take up to 60 seconds.
          </p>
        </div>

      </div>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100vh',
    background: '#0F0F0F',
    fontFamily: 'Inter, -apple-system, sans-serif',
    color: '#ffffff',
  },
  container: {
    maxWidth: 900,
    margin: '0 auto',
    padding: '48px 24px',
  },
  loading: {
    textAlign: 'center',
    color: 'rgba(255,255,255,0.4)',
    padding: '80px 0',
    fontSize: 16,
  },
  header: {
    marginBottom: 32,
    paddingBottom: 24,
    borderBottom: '1px solid rgba(201,168,76,0.2)',
  },
  headerLabel: {
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: '0.14em',
    textTransform: 'uppercase',
    color: '#C9A84C',
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 800,
    margin: '0 0 8px',
    letterSpacing: '-0.02em',
  },
  headerSub: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.45)',
    margin: 0,
  },
  errorBox: {
    background: 'rgba(239,68,68,0.1)',
    border: '1px solid rgba(239,68,68,0.3)',
    color: '#FCA5A5',
    padding: '12px 16px',
    borderRadius: 4,
    fontSize: 14,
    marginBottom: 24,
  },
  progressBar: {
    display: 'flex',
    alignItems: 'center',
    gap: 16,
    marginBottom: 24,
  },
  progressLabel: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.5)',
    fontWeight: 600,
  },
  progressTrack: {
    display: 'flex',
    gap: 8,
  },
  progressDot: {
    width: 12,
    height: 12,
    borderRadius: '50%',
    transition: 'background 0.2s',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))',
    gap: 16,
    marginBottom: 40,
  },
  card: {
    borderRadius: 8,
    padding: 20,
    position: 'relative',
    transition: 'border-color 0.15s, background 0.15s',
  },
  cardTop: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardNumber: {
    fontSize: 20,
    fontWeight: 700,
    color: '#C9A84C',
  },
  categoryBadge: {
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    padding: '2px 8px',
    borderRadius: 3,
  },
  score: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.35)',
    fontWeight: 600,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: 600,
    lineHeight: 1.45,
    marginBottom: 8,
    color: '#ffffff',
  },
  cardSummary: {
    fontSize: 13,
    lineHeight: 1.6,
    color: 'rgba(255,255,255,0.55)',
    marginBottom: 10,
  },
  cardMeta: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.25)',
  },
  selectedBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    background: '#C9A84C',
    color: '#0F0F0F',
    fontSize: 10,
    fontWeight: 700,
    padding: '2px 8px',
    borderRadius: 3,
  },
  footer: {
    textAlign: 'center',
    paddingTop: 24,
    borderTop: '1px solid rgba(201,168,76,0.15)',
  },
  publishBtn: {
    background: '#C9A84C',
    color: '#0F0F0F',
    border: 'none',
    padding: '16px 48px',
    fontSize: 15,
    fontWeight: 700,
    letterSpacing: '0.04em',
    borderRadius: 4,
    transition: 'opacity 0.2s',
  },
  footerNote: {
    marginTop: 12,
    fontSize: 12,
    color: 'rgba(255,255,255,0.25)',
  },
  successBox: {
    textAlign: 'center',
    padding: '80px 0',
  },
  successIcon: {
    fontSize: 48,
    color: '#C9A84C',
    marginBottom: 16,
  },
  successTitle: {
    fontSize: 28,
    fontWeight: 800,
    margin: '0 0 8px',
  },
  successSub: {
    color: 'rgba(255,255,255,0.5)',
    margin: '0 0 32px',
  },
  publishedList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  publishedItem: {
    padding: '8px 0',
    borderBottom: '1px solid rgba(255,255,255,0.05)',
  },
  publishedLink: {
    color: '#C9A84C',
    textDecoration: 'none',
    fontSize: 14,
  },
}
