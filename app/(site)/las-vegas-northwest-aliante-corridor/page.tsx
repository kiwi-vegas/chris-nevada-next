import LasVegasNorthwestAlianteCorridorFAQ from '@/components/LasVegasNorthwestAlianteCorridorFAQ'
import Link from 'next/link'
import type { Metadata } from 'next'
import LasVegasNorthwestAlianteCorridorMapWrapper from '@/components/LasVegasNorthwestAlianteCorridorMapWrapper'
import PortableText from '@/components/PortableText'
import { getCommunityPage } from '@/sanity/queries'
import { mergeQuickStats, mergeDriveTimes, getSectionImageUrl } from '@/lib/community-utils'
import { getMarketStats } from '@/lib/market-stats'

export const revalidate = 60

const BREADCRUMB_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.lasvegashomesearchexperts.com/' },
    { '@type': 'ListItem', position: 2, name: 'Communities', item: 'https://www.lasvegashomesearchexperts.com/communities' },
    { '@type': 'ListItem', position: 3, name: 'Aliante Corridor', item: 'https://www.lasvegashomesearchexperts.com/las-vegas-northwest-aliante-corridor/' },
  ],
}

const FAQ_DATA = [
  {
    "q": "What is the price range in the Aliante Corridor?",
    "a": "Homes in the Aliante Corridor range from approximately $300,000 to $500,000. The average single-family home sells between $350K and $425K, offering outstanding value for the Las Vegas metro."
  },
  {
    "q": "What ZIP codes are in the Aliante Corridor?",
    "a": "The Aliante Corridor spans ZIP codes 89084 and 89085 in North Las Vegas, Nevada."
  },
  {
    "q": "Is the Aliante Corridor part of the Aliante master plan?",
    "a": "The Aliante Corridor encompasses neighborhoods surrounding the Aliante master plan. Some homes are within the master plan's HOA, while others are in adjacent independent subdivisions that benefit from proximity to Aliante's amenities."
  },
  {
    "q": "What schools serve the Aliante Corridor?",
    "a": "The area is served by CCSD schools including Legacy High School. Somerset Academy NLV (8/10) and Doral Academy Fire Mesa (8/10) are strong charter alternatives. Faith Lutheran (A) is the top private option in the area."
  },
  {
    "q": "How far is the Aliante Corridor from the Strip?",
    "a": "The Aliante Corridor is approximately 20 minutes from the Las Vegas Strip via I-15 South."
  },
  {
    "q": "Is North Las Vegas growing?",
    "a": "Yes. North Las Vegas is the fastest-growing city in Nevada, with significant investment in infrastructure, commercial development, and new housing. The Aliante Corridor is one of the primary beneficiaries of this growth."
  },
  {
    "q": "What are HOA fees in the Aliante Corridor?",
    "a": "HOA fees range from $50 to $150 per month in most neighborhoods. Some standalone homes have no HOA. Neighborhoods within the Aliante master plan may have slightly higher fees."
  },
  {
    "q": "Is the Aliante Corridor good for investment?",
    "a": "Yes. The Aliante Corridor offers affordable entry points with strong rental demand and appreciation potential driven by North Las Vegas' growth. The proximity to the Aliante master plan's amenities adds value."
  }
]

const FAQ_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_DATA.map((faq: any) => ({
    '@type': 'Question',
    name: faq.q,
    acceptedAnswer: { '@type': 'Answer', text: faq.a },
  })),
}

const PLACE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Place',
  name: 'Aliante Corridor',
  description: 'Aliante Corridor is a growth corridor · mixed residential community in North Las Vegas, Nevada.',
  geo: { '@type': 'GeoCoordinates', latitude: 36.275, longitude: -115.2 },
  address: { '@type': 'PostalAddress', addressLocality: 'North Las Vegas', addressRegion: 'NV', postalCode: '89084', addressCountry: 'US' },
  containedInPlace: { '@type': 'City', name: 'North Las Vegas' },
}

const AGENT_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'RealEstateAgent',
  name: 'Nevada Real Estate Group',
  url: 'https://www.nevadarealestategroup.com',
  telephone: '+17252399950',
  email: 'info@nevadagroup.com',
  address: { '@type': 'PostalAddress', streetAddress: '8945 W Russell Rd #170', addressLocality: 'Las Vegas', addressRegion: 'NV', postalCode: '89148', addressCountry: 'US' },
  priceRange: '$$$',
  aggregateRating: { '@type': 'AggregateRating', ratingValue: '5.0', bestRating: '5', worstRating: '1', ratingCount: '2560', reviewCount: '2560' },
}

export async function generateMetadata(): Promise<Metadata> {
  const cms = await getCommunityPage('las-vegas-northwest-aliante-corridor')
  return {
    title: cms?.metaTitle ?? 'Aliante Corridor Homes for Sale | Nevada Real Estate Group',
    description: cms?.metaDescription ?? 'Browse Aliante Corridor homes for sale in North Las Vegas, NV. $300K–$500K. Schools, HOA, market stats. Nevada Real Estate Group.',
    alternates: { canonical: 'https://www.lasvegashomesearchexperts.com/las-vegas-northwest-aliante-corridor' },
  }
}

export default async function LasVegasNorthwestAlianteCorridorPage() {
  const cms = await getCommunityPage('las-vegas-northwest-aliante-corridor')
  const market = getMarketStats('las-vegas-northwest-aliante-corridor')
  const ms = market?.stats

  const heroHeadline = cms?.heroHeadline ?? 'Aliante Corridor'
  const heroSubtitle = 'Homes for Sale in North Las Vegas, Nevada'
  const overviewTitle = cms?.overviewTitle ?? 'Aliante Corridor: Growth Corridor · Mixed Residential Living in North Las Vegas'

  const HARDCODED_STATS: Array<[string, string] | [string, string, string]> = [
    ['Established', '2000'],
    ['Developer', 'Various Builders'],
    ['Total Acreage', '~800 acres'],
    ['Homes', '5,000+'],
    ['Median Home Price', ms?.medianSalePrice ?? '$300K–$500K'],
    ['ZIP Codes', '89084, 89085'],
    ['Guard-Gated', 'No'],
    ['HOA', '$50–$150/mo'],
  ]
  const displayStats = mergeQuickStats(HARDCODED_STATS, cms?.quickStats)
  const HARDCODED_DRIVE_TIMES = [
    {
        "time": "~20 min",
        "destination": "to the Strip",
        "route": "via I-15 South"
    },
    {
        "time": "~18 min",
        "destination": "to Summerlin",
        "route": "via 215 Beltway West"
    },
    {
        "time": "~30 min",
        "destination": "to Harry Reid Airport",
        "route": "via I-15 South"
    },
    {
        "time": "~15 min",
        "destination": "to Centennial Hills",
        "route": "via 215 Beltway West"
    }
]
  const displayDriveTimes = mergeDriveTimes(HARDCODED_DRIVE_TIMES, cms?.quickStats)

  const qs = (key: string, fallback: string) =>
    cms?.quickStats?.find((s) => s.key.toLowerCase() === key.toLowerCase())?.value ?? fallback

  return (
    <main>
      <div className="breadcrumb">
        <div className="breadcrumb-inner">
          <Link href="/">Home</Link>
          <span className="breadcrumb-sep">&rsaquo;</span>
          <a href="/communities/">Communities</a>
          <span className="breadcrumb-sep">&rsaquo;</span>
          <span>Aliante Corridor</span>
        </div>
      </div>

      <header id="hero" className="summerlin-hero hero-v2">
        <div className="hero-bg" />
        <div className="hero-overlay" />
        <div className="hero-v2-content">
          <div className="container">
            <h1 className="hero-v2-h1">
              <span className="hero-v2-community">{heroHeadline}</span>
              <span className="hero-v2-subtitle">{heroSubtitle}</span>
            </h1>
            <div className="hero-v2-stats">
              <div className="hero-v2-stat">
                <span className="hero-v2-stat-num">{ms?.newListings ?? qs('Active Listings', '100+')}</span>
                <span className="hero-v2-stat-lbl">New Listings</span>
              </div>
              <div className="hero-v2-stat">
                <span className="hero-v2-stat-num">{ms?.medianSalePrice ?? qs('Median Home Price', '$300K–$500K')}</span>
                <span className="hero-v2-stat-lbl">Median Sale Price</span>
              </div>
              <div className="hero-v2-stat">
                <span className="hero-v2-stat-num">{ms?.avgDaysToClose ?? qs('Avg Days on Market', '45')}</span>
                <span className="hero-v2-stat-lbl">Avg Days to Close</span>
              </div>
            </div>
            <a href="#listings" className="hero-v2-cta">Search Homes in Aliante Corridor</a>
          </div>
        </div>
      </header>

      <div className="hero-v2-qfb">
        <div className="container">
          <div className="hero-v2-qfb-row">
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <span><strong>ZIP:</strong> 89084, 89085</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              <span><strong>Type:</strong> Growth Corridor · Mixed Residential</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
              <span><strong>Price Range:</strong> $300K–$500K</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
              <span><strong>HOA:</strong> $50–$150/mo</span>
            </div>
          </div>
          <div className="hero-v2-qfb-est">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            <span>Est. 2000</span>
          </div>
        </div>
      </div>

      <section id="demographics" className="demographics-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Demographics</span>
            <h2>Aliante Corridor Demographics</h2>
          </div>
          <div className="demo-grid">
            {[
              ['16,000+', 'Population'],
              ['34', 'Median Age'],
              ['$65,000', 'Avg Household Income'],
              ['5,000+', 'Total Households'],
              ['62%', 'Homeownership Rate'],
            ].map(([value, label]) => (
              <div className="demo-stat" key={label}>
                <div className="demo-value">{value}</div>
                <div className="demo-label">{label}</div>
              </div>
            ))}
          </div>
          <p className="demo-citation">Source: U.S. Census Bureau, American Community Survey 2022 5-Year Estimates.</p>
        </div>
      </section>

      <section id="map" style={{ padding: '64px 0 0', background: 'var(--white)' }}>
        <div className="container">
          <div className="section-header" style={{ marginBottom: '32px' }}>
            <span className="section-label">Location</span>
            <h2>Where is Aliante Corridor?</h2>
            <p>North Las Vegas, Nevada &mdash; North Las Vegas, Nevada.</p>
          </div>
          <div className="map-container">
            <LasVegasNorthwestAlianteCorridorMapWrapper />
          </div>
          <div className="drive-time-grid">
            {displayDriveTimes.map(({ time, destination, route }: any) => (
              <div key={destination} className="drive-time-card">
                <div className="drive-time-time">{time}</div>
                <div className="drive-time-label">{destination}</div>
                <div className="drive-time-route">{route}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="listings">
        <div className="container">
          <div className="section-header">
            <h2 className="listings-title">NEW ALIANTE CORRIDOR LISTINGS</h2>
          </div>
          <div className="ylopo-wrap">
            <div className="YLOPO_searchWidget" />
            <div className="YLOPO_resultsWidget" data-search='{"propertyTypes":["house","condo","townhouse"],"minPrice":300000,"locations":[{"city":"North Las Vegas","state":"NV"}],"limit":12,"sortBy":"listDate","sortOrder":"desc","keywords":"Aliante North Las Vegas","zipCodes":["89084","89085"]}' />
          </div>
          <p className="ylopo-note">Listing data sourced from regional MLS. Information deemed reliable but not guaranteed. Updated daily.</p>
          <div className="listings-actions">
            <a href="https://search.nevadarealestategroup.net/search?s[orderBy]=sourceCreationDate%2Cdesc&s[page]=1&s[locations][0][city]=North%20Las%20Vegas&s[locations][0][state]=NV&s[keywords]=Aliante%20North%20Las%20Vegas" target="_blank" rel="noopener noreferrer" className="btn-gold">View All Aliante Corridor Listings &rarr;</a>
            <Link href="/communities/" className="btn-outline">&larr; Back to All Communities</Link>
          </div>
        </div>
      </section>

      <section id="overview">
        <div className="container">
          <div className="overview-grid">
            <div className="overview-text">
              <span className="section-label">Community Overview</span>
              <div className="gold-rule" />
              <h2>{overviewTitle}</h2>
              {cms?.overviewBody?.length ? (
                <PortableText value={cms.overviewBody} />
              ) : (
                <>
                  <p>The Aliante Corridor encompasses the residential neighborhoods along and surrounding Aliante Parkway in North Las Vegas, extending from the Aliante master plan's perimeter outward through adjacent subdivisions and newer development. This growth corridor represents one of the most active areas of residential development in the north Las Vegas Valley, with new homes, commercial projects, and infrastructure improvements reshaping the area.</p>
                  <p>Homes in the Aliante Corridor range from approximately $300,000 to $500,000, offering some of the best value per square foot in the Las Vegas metro. Housing stock includes a mix of 1990s-2000s established subdivisions and newer infill construction from the 2010s-2020s. Floor plans range from 1,200 to 2,800 square feet in both single-story and two-story configurations, with desert landscaping and tile roofs standard throughout.</p>
                  <p>The corridor benefits from its proximity to the Aliante master plan's amenities — the Aliante Casino + Hotel + Spa, Aliante Golf Club, Aliante Nature Discovery Park, and the Aliante Library — without the higher HOA fees of the master plan itself. The 215 Northern Beltway and I-15 provide freeway access for commuters, while the Aliante Parkway commercial corridor offers grocery, dining, and essential services.</p>
                  <p>For buyers seeking affordable homeownership in a growth corridor with improving amenities and infrastructure, the Aliante Corridor delivers strong fundamentals. North Las Vegas is the fastest-growing city in Nevada, and the areas surrounding the Aliante master plan are benefiting directly from that growth. New schools, parks, and commercial development continue to enhance the area's livability and investment potential.</p>
                </>
              )}
            </div>
            <div className="overview-aside">
              <div className="quick-facts">
                <h3>Aliante Corridor At a Glance</h3>
                {displayStats.map(([label, value, cls]: any) => (
                  <div className="fact-row" key={label}>
                    <span className="fact-label">{label}</span>
                    <span className={`fact-value${cls ? ' ' + cls : ''}`}>{value}</span>
                  </div>
                ))}
              </div>
              <div className="cta-card">
                <p>Ready to explore Aliante Corridor? Schedule a private tour of the community and the current listings that match your goals.</p>
                <a href="tel:+17252399950" className="btn-gold">Call 725.239.9950</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="highlights">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Why Aliante Corridor</span>
            <h2>What Makes Aliante Corridor Stand Out</h2>
          </div>
          <div className="highlights-grid">
            {[
              { title: 'Growth Corridor Value', body: 'One of North Las Vegas\' fastest-developing corridors with new homes, commercial projects, and infrastructure. Buy-in during the growth phase for maximum appreciation potential.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg> },
              { title: 'Affordable Entry Point', body: 'Quality single-family homes from $300K in a growing corridor with improving amenities. Some of the best square footage per dollar in the Las Vegas metro.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
              { title: 'Aliante Amenity Access', body: 'Adjacent to the Aliante master plan with access to the casino, golf club, nature park, and library without the higher master-plan HOA fees.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><line x1="8" y1="6" x2="8" y2="6.01"/><line x1="12" y1="6" x2="12" y2="6.01"/><line x1="16" y1="6" x2="16" y2="6.01"/><line x1="8" y1="10" x2="8" y2="10.01"/><line x1="12" y1="10" x2="12" y2="10.01"/><line x1="16" y1="10" x2="16" y2="10.01"/><line x1="8" y1="14" x2="8" y2="14.01"/><line x1="12" y1="14" x2="12" y2="14.01"/><line x1="16" y1="14" x2="16" y2="14.01"/></svg> },
              { title: 'Freeway Access', body: '215 Northern Beltway and I-15 provide commuter access to the Strip (20 min), Summerlin (18 min), and Henderson (25 min).', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><line x1="8" y1="6" x2="8" y2="6.01"/><line x1="12" y1="6" x2="12" y2="6.01"/><line x1="16" y1="6" x2="16" y2="6.01"/><line x1="8" y1="10" x2="8" y2="10.01"/><line x1="12" y1="10" x2="12" y2="10.01"/><line x1="16" y1="10" x2="16" y2="10.01"/><line x1="8" y1="14" x2="8" y2="14.01"/><line x1="12" y1="14" x2="12" y2="14.01"/><line x1="16" y1="14" x2="16" y2="14.01"/></svg> },
              { title: 'New Commercial Development', body: 'Expanding retail, restaurants, and services along Aliante Parkway and the 215 corridor. Daily conveniences improving annually.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><line x1="8" y1="6" x2="8" y2="6.01"/><line x1="12" y1="6" x2="12" y2="6.01"/><line x1="16" y1="6" x2="16" y2="6.01"/><line x1="8" y1="10" x2="8" y2="10.01"/><line x1="12" y1="10" x2="12" y2="10.01"/><line x1="16" y1="10" x2="16" y2="10.01"/><line x1="8" y1="14" x2="8" y2="14.01"/><line x1="12" y1="14" x2="12" y2="14.01"/><line x1="16" y1="14" x2="16" y2="14.01"/></svg> },
              { title: 'Investment Fundamentals', body: 'North Las Vegas\' population growth, job creation, and infrastructure investment drive strong rental demand and appreciation across the Aliante Corridor.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg> },
            ].map((h: any) => (
              <div className="highlight-card" key={h.title}>
                <div className="highlight-icon">{h.icon}</div>
                <h3>{h.title}</h3>
                <p>{h.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="parks" className="parks-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Outdoor Amenities</span>
            <h2>Parks &amp; Recreation Near Aliante Corridor</h2>
          </div>
          <div className="parks-grid">
            {[
              { name: 'Aliante Nature Discovery Park', address: '2627 Nature Park Dr, North Las Vegas, NV 89084', acreage: '~20 acres', amenities: ["Walking trails","Wetland areas","Playgrounds","Picnic areas","Wildlife viewing"] },
              { name: 'Deer Springs Park', address: 'Deer Springs Way, North Las Vegas, NV 89084', acreage: '~10 acres', amenities: ["Sports fields","Playground","Basketball courts","Walking paths","Picnic areas"] },
              { name: 'Craig Ranch Regional Park', address: '628 W Craig Rd, North Las Vegas, NV 89032', acreage: '~170 acres', amenities: ["Sports fields","Skate park","Water play area","Dog park","Walking trails"] },
            ].map((park: any) => (
              <div className="park-card" key={park.name}>
                <h3 className="park-name">{park.name}</h3>
                <p className="park-address">{park.address}</p>
                <span className="park-acreage">{park.acreage}</span>
                <ul className="park-amenities">
                  {park.amenities.map((a: string) => <li key={a}>{a}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="lifestyle" className="lifestyle-v2">
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center' }}>
            <span className="section-label">Outdoor Living</span>
            <h2>The Aliante Corridor Lifestyle</h2>
          </div>
          <div className="lifestyle-v2-grid">
            <div className="lifestyle-v2-item">
              <div className="lifestyle-v2-icon"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg></div>
              <div className="lifestyle-v2-stat">~20 min</div>
              <div className="lifestyle-v2-label">to the Strip</div>
            </div>
            <div className="lifestyle-v2-item">
              <div className="lifestyle-v2-icon"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22c4-4 8-7.5 8-12a8 8 0 10-16 0c0 4.5 4 8 8 12z"/><circle cx="12" cy="10" r="3"/></svg></div>
              <div className="lifestyle-v2-stat">3+</div>
              <div className="lifestyle-v2-label">Nearby Parks</div>
            </div>
            <div className="lifestyle-v2-item">
              <div className="lifestyle-v2-icon"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg></div>
              <div className="lifestyle-v2-stat">5,000+</div>
              <div className="lifestyle-v2-label">Homes</div>
            </div>
            <div className="lifestyle-v2-item">
              <div className="lifestyle-v2-icon"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 2v10l7 4"/></svg></div>
              <div className="lifestyle-v2-stat">2000</div>
              <div className="lifestyle-v2-label">Established</div>
            </div>
            <div className="lifestyle-v2-item">
              <div className="lifestyle-v2-icon"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg></div>
              <div className="lifestyle-v2-stat">No</div>
              <div className="lifestyle-v2-label">Guard-Gated</div>
            </div>
          </div>
        </div>
      </section>

      <section id="schools" className="schools-v2">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Education</span>
            <h2>Schools Serving Aliante Corridor</h2>
          </div>
          <div className="schools-v2-table">
            <div className="schools-v2-header">
              <span>School Name</span>
              <span>Grades</span>
              <span>Rating</span>
            </div>
            {[
              ['Sandra L. Thompson Elementary', 'K–5', '6/10'],
              ['William E. Orr Middle School', '6–8', '5/10'],
              ['Legacy High School', '9–12', '5/10'],
              ['Faith Lutheran Middle & High', '6–12', 'A'],
              ['Bishop Gorman High School', '9–12', 'A+'],
              ['Somerset Academy NLV', 'K–8', '8/10'],
              ['Doral Academy Fire Mesa', 'K–8', '8/10'],
            ].map(([name, grades, rating]: any) => (
              <div className="schools-v2-row" key={name}>
                <span className="schools-v2-name">{name}</span>
                <span className="schools-v2-grades">{grades}</span>
                <span className={`schools-v2-rating${rating.includes('10') || rating === 'A+' ? ' top-rated' : ''}`}>{rating}</span>
              </div>
            ))}
          </div>
          <p className="schools-v2-note">School assignments are address-specific. Verify with CCSD before purchasing.</p>
        </div>
      </section>

      <section id="testimonials" className="testimonials-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Client Stories</span>
            <h2>What Aliante Corridor Buyers Say</h2>
          </div>
          <div className="testimonials-grid">
            {[
              { quote: 'The Aliante Corridor gave us a beautiful home near the golf course and casino for $100K less than anything comparable in Las Vegas. Nevada Real Estate Group opened our eyes to the value in North Las Vegas.', name: 'Anthony & Nicole G.', detail: 'Bought in Aliante Corridor · 2024' },
              { quote: 'We were skeptical about NLV at first, but the Aliante area changed our minds completely. Beautiful parks, great amenities, and our home has already appreciated 15%. Nevada Real Estate Group was right about the growth.', name: 'Keith & Amanda J.', detail: 'Bought in Aliante Corridor · 2025' },
            ].map((t: any, i: number) => (
              <div className="testimonial-card" key={i}>
                <div className="testimonial-stars">{'★★★★★'}</div>
                <blockquote className="testimonial-quote">&ldquo;{t.quote}&rdquo;</blockquote>
                <div className="testimonial-meta">
                  <span className="testimonial-name">{t.name}</span>
                  <span className="testimonial-detail">{t.detail}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <LasVegasNorthwestAlianteCorridorFAQ />

      <section id="nearby" className="nearby-v2">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Comparisons</span>
            <h2>Nearby Communities to Consider</h2>
          </div>
          <div className="nearby-v2-table">
            <div className="nearby-v2-header">
              <span>Community</span>
              <span>Starting Price</span>
              <span>Why Consider</span>
              <span></span>
            </div>
            {[
              { name: 'Aliante', href: '/aliante/', price: 'From $350K', compare: 'The master-planned community at the corridor\'s core with golf, casino, and nature park.' },
              { name: 'Sun City Aliante', href: '/sun-city-aliante/', price: 'From $300K', compare: '55+ community within the Aliante master plan. Age-restricted with dedicated amenities.' },
              { name: 'Centennial Hills', href: '/centennial-hills/', price: 'From $400K', compare: 'Las Vegas community to the west with more retail and slightly higher pricing.' },
              { name: 'North Las Vegas', href: '/north-las-vegas/', price: 'From $300K', compare: 'The broader NLV area with diverse housing across every price point.' },
              { name: 'Heartland at Tule Springs', href: '/heartland-tule-springs/', price: 'From $350K', compare: 'Newer NLV master plan with active new construction and modern amenities.' },
              { name: 'Providence', href: '/providence/', price: 'From $450K', compare: 'Family master plan in northwest Las Vegas with newer homes and community focus.' },
            ].map((n: any) => (
              <a href={n.href} key={n.name} className="nearby-v2-row">
                <span className="nearby-v2-name">{n.name}</span>
                <span className="nearby-v2-price">{n.price}</span>
                <span className="nearby-v2-compare">{n.compare}</span>
                <span className="nearby-v2-arrow">&rarr;</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="cta" className="cta-v2">
        <div className="container">
          <div className="cta-v2-inner">
            <div className="cta-v2-content">
              <h2>Ready to Find Your Aliante Corridor Home?</h2>
              <p>Nevada Real Estate Group is the #1 real estate team in Nevada. Whether you&apos;re buying or selling in Aliante Corridor, let&apos;s talk.</p>
              <div className="cta-v2-agent">
                Chris Nevada &middot; S.181401<br />
                Owner, Nevada Real Estate Group - LPT Realty<br />
                8945 W Russell Rd, Suite 170, Las Vegas, NV 89148<br />
                <a href="mailto:Info@NevadaGroup.com" className="cta-v2-agent-email">Info@NevadaGroup.com</a>
              </div>
              <div className="cta-v2-actions">
                <a href="tel:+17252399950" className="btn-gold">Call 725.239.9950</a>
              </div>
            </div>
            <div className="cta-v2-form">
              <h3>Or Send Us a Message</h3>
              <form action="https://formsubmit.co/info@nevadagroup.com" method="POST">
                <input type="hidden" name="_subject" value="Aliante Corridor Inquiry — LasVegasHomeSearchExperts.com" />
                <input type="hidden" name="_captcha" value="false" />
                <input type="text" name="name" placeholder="Your Name" required className="cta-v2-input" />
                <input type="email" name="email" placeholder="Email Address" required className="cta-v2-input" />
                <input type="tel" name="phone" placeholder="Phone Number" className="cta-v2-input" />
                <textarea name="message" placeholder="Tell us what you&apos;re looking for" rows={3} className="cta-v2-input cta-v2-textarea" />
                <button type="submit" className="btn-gold cta-v2-submit">Get in Touch</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(PLACE_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(AGENT_SCHEMA) }} />
    </main>
  )
}
