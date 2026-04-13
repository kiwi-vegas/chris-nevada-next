import Link from 'next/link'
import { readFileSync } from 'fs'
import { join } from 'path'

interface CommunityEntry {
  slug: string
  name: string
  parentCommunity?: string
  city: string
  priceRange: string
  type: string
  guardGated: boolean
  pageType?: string
  overview?: string[]
}

function loadCommunities(): CommunityEntry[] {
  try {
    const filePath = join(process.cwd(), 'scripts', 'community-data.json')
    const raw = readFileSync(filePath, 'utf-8')
    return JSON.parse(raw).filter((c: any) => !c.pageType)
  } catch {
    return []
  }
}

interface Props {
  title: string
  description: string
  filterFn: (c: CommunityEntry) => boolean
  seoLabel: string
}

export default function LifestyleCollectionPage({ title, description, filterFn, seoLabel }: Props) {
  const all = loadCommunities()
  const filtered = all.filter(filterFn).sort((a, b) => a.name.localeCompare(b.name))

  // Group by city
  const groups: Record<string, CommunityEntry[]> = {}
  filtered.forEach(c => {
    const area = c.city
    if (!groups[area]) groups[area] = []
    groups[area].push(c)
  })

  const sortedGroups = Object.entries(groups).sort((a, b) => b[1].length - a[1].length)

  return (
    <main>
      <div className="breadcrumb">
        <div className="breadcrumb-inner">
          <Link href="/">Home</Link>
          <span className="breadcrumb-sep">&rsaquo;</span>
          <Link href="/communities/">Communities</Link>
          <span className="breadcrumb-sep">&rsaquo;</span>
          <span>{seoLabel}</span>
        </div>
      </div>

      <section className="communities-hub">
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center' }}>
            <span className="section-label">{seoLabel}</span>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-2xl)', fontWeight: 400, color: 'var(--navy)', marginBottom: '16px' }}>{title}</h1>
            <p style={{ maxWidth: '640px', margin: '0 auto', textAlign: 'center' }}>{description}</p>
            <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--gold)', marginTop: '12px' }}>{filtered.length} communities</p>
          </div>

          {sortedGroups.map(([city, communities]) => (
            <div key={city} className="comm-hub-section">
              <h2 className="comm-hub-section-title">{city} <span className="comm-hub-section-count">{communities.length} communities</span></h2>
              <div className="comm-hub-grid">
                {communities.map(c => (
                  <a key={c.slug} href={`/${c.slug}/`} className="comm-hub-card">
                    <div>
                      <span className="comm-hub-card-name">{c.name}</span>
                      {c.parentCommunity && <span style={{ display: 'block', fontSize: '11px', color: 'var(--text-faint)', marginTop: '2px' }}>{c.parentCommunity}</span>}
                    </div>
                    <span className="comm-hub-card-price">{c.priceRange}</span>
                  </a>
                ))}
              </div>
            </div>
          ))}

          <div style={{ textAlign: 'center', marginTop: '48px', padding: '40px', background: 'var(--navy)', borderRadius: '12px' }}>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-xl)', color: 'var(--white)', marginBottom: '12px' }}>Find Your Perfect {seoLabel} Home</h2>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', marginBottom: '24px' }}>Nevada Real Estate Group specializes in {seoLabel.toLowerCase()} across the Las Vegas metro. Let us help you find the right fit.</p>
            <a href="tel:+17252399950" className="btn-gold">Call 725.239.9950</a>
          </div>
        </div>
      </section>
    </main>
  )
}
