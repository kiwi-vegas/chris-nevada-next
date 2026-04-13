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
  editorial?: string[]
  faqs?: Array<{ q: string; a: string }>
  filterFn: (c: CommunityEntry) => boolean
  seoLabel: string
  slug: string
}

export default function LifestyleCollectionPage({ title, description, editorial, faqs, filterFn, seoLabel, slug }: Props) {
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

  const BASE = 'https://www.lasvegashomesearchexperts.com'

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE}/` },
      { '@type': 'ListItem', position: 2, name: 'Communities', item: `${BASE}/communities` },
      { '@type': 'ListItem', position: 3, name: seoLabel, item: `${BASE}/${slug}` },
    ],
  }

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: title,
    description: `${filtered.length} ${seoLabel.toLowerCase()} in Las Vegas, Henderson, Summerlin, and North Las Vegas.`,
    numberOfItems: filtered.length,
    itemListElement: filtered.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      url: `${BASE}/${c.slug}/`,
    })),
  }

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: title,
    description: description,
    url: `${BASE}/${slug}`,
    isPartOf: { '@type': 'WebSite', name: 'Las Vegas Home Search Experts', url: BASE },
    about: { '@type': 'Thing', name: seoLabel },
  }

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

        </div>
      </section>

      {editorial && editorial.length > 0 && (
        <section style={{ padding: '80px 0', background: 'var(--white)' }}>
          <div className="container">
            <div style={{ maxWidth: '780px' }}>
              <span className="section-label">Expert Guide</span>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-xl)', fontWeight: 400, color: 'var(--navy)', marginBottom: '24px' }}>Understanding {seoLabel} in Las Vegas</h2>
              {editorial.map((p, i) => (
                <p key={i} style={{ fontSize: 'var(--text-base)', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '20px' }}>{p}</p>
              ))}
            </div>
          </div>
        </section>
      )}

      {faqs && faqs.length > 0 && (
        <section id="faq" style={{ padding: '80px 0', background: 'var(--cream)' }}>
          <div className="container">
            <div className="section-header" style={{ textAlign: 'center' }}>
              <span className="section-label">Common Questions</span>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-xl)', fontWeight: 400, color: 'var(--navy)' }}>Frequently Asked Questions About {seoLabel}</h2>
            </div>
            <div className="faq-list" style={{ maxWidth: '780px', margin: '48px auto 0' }}>
              {faqs.map((faq, i) => (
                <div key={i} className="faq-item" style={{ borderBottom: '1px solid var(--border)' }}>
                  <div style={{ padding: '22px 0' }}>
                    <h3 style={{ fontSize: 'var(--text-base)', fontWeight: 500, color: 'var(--navy)', lineHeight: 1.4, marginBottom: '10px' }}>{faq.q}</h3>
                    <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 1.75 }}>{faq.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section style={{ padding: '80px 0', background: 'var(--navy)', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-xl)', color: 'var(--white)', marginBottom: '12px' }}>Find Your Perfect {seoLabel} Home</h2>
          <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', marginBottom: '24px', maxWidth: '520px', margin: '0 auto 24px' }}>Nevada Real Estate Group specializes in {seoLabel.toLowerCase()} across the Las Vegas metro. Let us help you find the right fit.</p>
          <a href="tel:+17252399950" className="btn-gold">Call 725.239.9950</a>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
      {faqs && faqs.length > 0 && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqs.map(f => ({
            '@type': 'Question',
            name: f.q,
            acceptedAnswer: { '@type': 'Answer', text: f.a },
          })),
        }) }} />
      )}
    </main>
  )
}
