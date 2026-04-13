import Link from 'next/link'
import type { Metadata } from 'next'
import { readFileSync } from 'fs'
import { join } from 'path'

export const metadata: Metadata = {
  title: 'Las Vegas Communities & Neighborhoods | 250+ Communities | Nevada Real Estate Group',
  description: 'Explore 250+ Las Vegas communities and neighborhoods. Summerlin, Henderson, North Las Vegas, guard-gated, 55+, luxury, high-rise. Find your perfect Las Vegas community.',
  alternates: { canonical: 'https://www.lasvegashomesearchexperts.com/communities' },
}

interface CommunityEntry {
  slug: string
  name: string
  parentCommunity?: string
  city: string
  priceRange: string
  type: string
  guardGated: boolean
  pageType?: string
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

function groupCommunities(communities: CommunityEntry[]) {
  // Primary groupings by area
  const summerlin: CommunityEntry[] = []
  const henderson: CommunityEntry[] = []
  const lasVegas: CommunityEntry[] = []
  const northLV: CommunityEntry[] = []
  const highRise: CommunityEntry[] = []

  communities.forEach(c => {
    const type = c.type?.toLowerCase() || ''
    if (type.includes('high-rise') || type.includes('high rise') || type.includes('tower') || type.includes('condo') && c.city === 'Las Vegas' && ['veer-towers','waldorf-astoria-las-vegas','panorama-towers','turnberry-towers','turnberry-place','sky-las-vegas','allure-las-vegas','juhl','the-ogden','soho-lofts','newport-lofts','the-martin','one-queensridge-place','cello-tower','four-seasons-private-residences'].includes(c.slug)) {
      highRise.push(c)
    } else if (c.parentCommunity === 'Summerlin' || c.parentCommunity === 'Summerlin West' || c.parentCommunity === 'Sun City Summerlin' || c.slug.startsWith('summerlin') || ['the-summit-club','mesa-ridge','regency-at-summerlin','heritage-at-stonebridge','trilogy-at-summerlin','sun-colony-at-siena','mira-villa','shawood-at-arcadia','the-loughton','sun-city-summerlin','red-rock-country-club','aventura-summerlin','bellacere','canyon-fairways','eagle-rock-summerlin','the-palisades-summerlin','mountain-trails-summerlin','corte-bella-summerlin','country-club-hills-summerlin','eagle-hills-summerlin','tournament-hills','the-pointe-summerlin','country-rose-estates','the-vineyards-summerlin','glenrock','carlisle-peak','astra-at-la-madre-peaks','ascension-at-the-peaks','the-paseos','the-peaks','eagle-crest'].includes(c.slug)) {
      summerlin.push(c)
    } else if (c.city === 'Henderson' || c.parentCommunity === 'Henderson' || c.parentCommunity === 'Anthem' || c.parentCommunity === 'Green Valley' || c.parentCommunity === 'MacDonald Ranch' || c.parentCommunity === 'MacDonald Highlands' || c.parentCommunity === 'Seven Hills' || c.parentCommunity === 'Lake Las Vegas' || c.parentCommunity === 'Cadence' || c.parentCommunity === 'Inspirada' || c.parentCommunity === 'Sun City Anthem') {
      henderson.push(c)
    } else if (c.city === 'North Las Vegas' || c.parentCommunity === 'Aliante') {
      northLV.push(c)
    } else {
      lasVegas.push(c)
    }
  })

  return [
    { label: 'Summerlin', count: summerlin.length, communities: summerlin.sort((a, b) => a.name.localeCompare(b.name)) },
    { label: 'Henderson', count: henderson.length, communities: henderson.sort((a, b) => a.name.localeCompare(b.name)) },
    { label: 'Las Vegas', count: lasVegas.length, communities: lasVegas.sort((a, b) => a.name.localeCompare(b.name)) },
    { label: 'North Las Vegas', count: northLV.length, communities: northLV.sort((a, b) => a.name.localeCompare(b.name)) },
    { label: 'High-Rise & Condos', count: highRise.length, communities: highRise.sort((a, b) => a.name.localeCompare(b.name)) },
  ]
}

export default function CommunitiesPage() {
  const communities = loadCommunities()
  const groups = groupCommunities(communities)

  return (
    <main>
      <div className="breadcrumb">
        <div className="breadcrumb-inner">
          <Link href="/">Home</Link>
          <span className="breadcrumb-sep">&rsaquo;</span>
          <span>Communities</span>
        </div>
      </div>

      <section className="communities-hub">
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center' }}>
            <span className="section-label">Explore Las Vegas</span>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-2xl)', fontWeight: 400, color: 'var(--navy)', marginBottom: '16px' }}>Las Vegas Communities &amp; Neighborhoods</h1>
            <p style={{ maxWidth: '640px', margin: '0 auto', textAlign: 'center' }}>{communities.length} communities across Las Vegas, Henderson, Summerlin, and North Las Vegas. From luxury guard-gated estates to family-friendly master plans.</p>
          </div>

          <div className="comm-hub-nav">
            {groups.map(g => (
              <a key={g.label} href={`#${g.label.toLowerCase().replace(/\s+/g, '-')}`} className="comm-hub-nav-item">
                {g.label} <span className="comm-hub-nav-count">{g.count}</span>
              </a>
            ))}
          </div>

          <div className="comm-hub-nav" style={{ marginTop: '-40px', marginBottom: '56px' }}>
            {[
              { label: 'Guard-Gated', href: '/guard-gated-communities/' },
              { label: '55+ Active Adult', href: '/55-plus-communities/' },
              { label: 'Luxury', href: '/luxury-communities/' },
              { label: 'High-Rise & Condos', href: '/high-rise-condos/' },
              { label: 'New Construction', href: '/new-construction/' },
              { label: 'Golf Communities', href: '/golf-communities/' },
              { label: 'Vintage & Historic', href: '/vintage-historic-neighborhoods/' },
            ].map(item => (
              <a key={item.label} href={item.href} className="comm-hub-nav-item">
                {item.label}
              </a>
            ))}
          </div>

          {groups.map(group => (
            <div key={group.label} id={group.label.toLowerCase().replace(/\s+/g, '-')} className="comm-hub-section">
              <h2 className="comm-hub-section-title">{group.label} <span className="comm-hub-section-count">{group.count} communities</span></h2>
              <div className="comm-hub-grid">
                {group.communities.map(c => (
                  <a key={c.slug} href={`/${c.slug}/`} className="comm-hub-card">
                    <span className="comm-hub-card-name">{c.name}</span>
                    <span className="comm-hub-card-price">{c.priceRange.split('\u2013')[0]}</span>
                  </a>
                ))}
              </div>
            </div>
          ))}

          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <p style={{ fontSize: '14px', color: 'var(--text-faint)', marginBottom: '24px' }}>Can&apos;t find your community? Contact us for a personalized search.</p>
            <a href="tel:+17252399950" className="btn-gold">Call 725.239.9950</a>
          </div>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'Las Vegas Communities and Neighborhoods',
        description: `${communities.length} communities across Las Vegas, Henderson, Summerlin, and North Las Vegas.`,
        numberOfItems: communities.length,
        itemListElement: communities.slice(0, 100).map((c, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: c.name,
          url: `https://www.lasvegashomesearchexperts.com/${c.slug}/`,
        })),
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.lasvegashomesearchexperts.com/' },
          { '@type': 'ListItem', position: 2, name: 'Communities', item: 'https://www.lasvegashomesearchexperts.com/communities' },
        ],
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Las Vegas Communities & Neighborhoods',
        description: `Explore ${communities.length} communities across Las Vegas, Henderson, Summerlin, and North Las Vegas. From luxury guard-gated estates to family-friendly master plans.`,
        url: 'https://www.lasvegashomesearchexperts.com/communities',
        isPartOf: { '@type': 'WebSite', name: 'Las Vegas Home Search Experts', url: 'https://www.lasvegashomesearchexperts.com' },
        about: { '@type': 'City', name: 'Las Vegas', sameAs: 'https://en.wikipedia.org/wiki/Las_Vegas' },
        publisher: { '@type': 'RealEstateAgent', name: 'Nevada Real Estate Group', telephone: '+17252399950', email: 'info@nevadagroup.com' },
      }) }} />
    </main>
  )
}
