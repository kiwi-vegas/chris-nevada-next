import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Las Vegas Communities & Neighborhoods | Nevada Real Estate Group',
  description: 'Explore 200+ Las Vegas communities and neighborhoods. From Summerlin luxury to Henderson family homes. Find your perfect Las Vegas community. Nevada Real Estate Group.',
}

const COMMUNITY_GROUPS = [
  {
    label: 'Summerlin',
    communities: [
      { name: 'Summerlin', href: '/summerlin/', price: 'From $450K' },
      { name: 'The Ridges', href: '/summerlin-the-ridges/', price: 'From $2M' },
      { name: 'The Paseos', href: '/the-paseos/', price: 'From $550K' },
      { name: 'The Peaks', href: '/the-peaks/', price: 'From $1M' },
      { name: 'Grand Park', href: '/summerlin-grand-park/', price: 'From $400K' },
      { name: 'Sun City Summerlin', href: '/sun-city-summerlin/', price: 'From $300K' },
      { name: 'The Summit Club', href: '/the-summit-club/', price: 'From $5M' },
      { name: 'Red Rock Country Club', href: '/red-rock-country-club/', price: 'From $800K' },
      { name: 'Stonebridge', href: '/summerlin-stonebridge/', price: 'From $550K' },
      { name: 'Siena', href: '/summerlin-siena/', price: 'From $400K' },
    ],
  },
  {
    label: 'Henderson',
    communities: [
      { name: 'Henderson', href: '/henderson/', price: 'From $300K' },
      { name: 'Anthem', href: '/anthem/', price: 'From $400K' },
      { name: 'Green Valley', href: '/green-valley/', price: 'From $350K' },
      { name: 'Seven Hills', href: '/seven-hills/', price: 'From $500K' },
      { name: 'MacDonald Highlands', href: '/macdonald-highlands/', price: 'From $800K' },
      { name: 'Lake Las Vegas', href: '/lake-las-vegas/', price: 'From $400K' },
      { name: 'Ascaya', href: '/ascaya/', price: 'From $3M' },
      { name: 'Inspirada', href: '/inspirada/', price: 'From $420K' },
      { name: 'Cadence', href: '/cadence/', price: 'From $350K' },
      { name: 'Dragon Rock', href: '/dragon-rock/', price: 'From $5M' },
    ],
  },
  {
    label: 'Las Vegas',
    communities: [
      { name: 'Southern Highlands', href: '/southern-highlands/', price: 'From $400K' },
      { name: 'Mountains Edge', href: '/mountains-edge/', price: 'From $350K' },
      { name: 'Enterprise', href: '/enterprise/', price: 'From $350K' },
      { name: 'Spring Valley', href: '/spring-valley/', price: 'From $300K' },
      { name: 'Rhodes Ranch', href: '/rhodes-ranch/', price: 'From $350K' },
      { name: 'The Lakes', href: '/the-lakes/', price: 'From $400K' },
      { name: 'Desert Shores', href: '/desert-shores/', price: 'From $350K' },
      { name: 'Peccole Ranch', href: '/peccole-ranch/', price: 'From $400K' },
      { name: 'Queensridge', href: '/queensridge/', price: 'From $800K' },
      { name: 'Scotch 80s', href: '/scotch-80s/', price: 'From $800K' },
    ],
  },
  {
    label: 'North Las Vegas',
    communities: [
      { name: 'North Las Vegas', href: '/north-las-vegas/', price: 'From $250K' },
      { name: 'Aliante', href: '/aliante/', price: 'From $300K' },
      { name: 'Skye Canyon', href: '/skye-canyon/', price: 'From $400K' },
      { name: 'Centennial Hills', href: '/centennial-hills/', price: 'From $350K' },
      { name: 'Providence', href: '/providence/', price: 'From $350K' },
      { name: 'Heartland at Tule Springs', href: '/heartland-tule-springs/', price: 'From $350K' },
      { name: 'Sunstone', href: '/sunstone/', price: 'From $380K' },
    ],
  },
  {
    label: 'Luxury & High-Rise',
    communities: [
      { name: 'Waldorf Astoria', href: '/waldorf-astoria-las-vegas/', price: 'From $500K' },
      { name: 'Veer Towers', href: '/veer-towers/', price: 'From $400K' },
      { name: 'Four Seasons Residences', href: '/four-seasons-private-residences/', price: 'From $3.67M' },
      { name: 'Cello Tower', href: '/cello-tower/', price: 'From $700K' },
      { name: 'Turnberry Place', href: '/turnberry-place/', price: 'From $500K' },
      { name: 'The Martin', href: '/the-martin/', price: 'From $400K' },
      { name: 'One Queensridge Place', href: '/one-queensridge-place/', price: 'From $500K' },
    ],
  },
]

export default function CommunitiesPage() {
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
            <p>200+ communities across Las Vegas, Henderson, Summerlin, and North Las Vegas. From luxury guard-gated estates to family-friendly master plans.</p>
          </div>

          {COMMUNITY_GROUPS.map(group => (
            <div key={group.label} style={{ marginBottom: '56px' }}>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-xl)', color: 'var(--navy)', marginBottom: '24px', paddingBottom: '12px', borderBottom: '2px solid var(--gold)' }}>{group.label}</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '12px' }}>
                {group.communities.map(c => (
                  <Link key={c.name} href={c.href} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 18px', background: 'var(--white)', border: '1px solid var(--border-light)', borderRadius: '8px', textDecoration: 'none', transition: 'border-color 0.2s, transform 0.2s' }}>
                    <span style={{ fontFamily: 'var(--font-serif)', fontSize: '16px', color: 'var(--navy)' }}>{c.name}</span>
                    <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--gold-hover)' }}>{c.price}</span>
                  </Link>
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
    </main>
  )
}
