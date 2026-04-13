import MiraVillaFAQ from '@/components/MiraVillaFAQ'
import Link from 'next/link'
import type { Metadata } from 'next'
import MiraVillaMapWrapper from '@/components/MiraVillaMapWrapper'
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
    { '@type': 'ListItem', position: 3, name: 'Mira Villa', item: 'https://www.lasvegashomesearchexperts.com/mira-villa/' },
  ],
}

const FAQ_DATA = [
  {
    "q": "What is the price range for homes in Mira Villa?",
    "a": "Homes in Mira Villa range from approximately $1 million for the Signature Collection to $2.2 million or more for Grand Estate Collection homes on premium view lots."
  },
  {
    "q": "Is Mira Villa guard-gated?",
    "a": "Yes. Mira Villa is a guard-gated community with a 24-hour staffed gate and private streets within the Summerlin master plan."
  },
  {
    "q": "Who builds homes in Mira Villa?",
    "a": "Homes in Mira Villa are built by Taylor Morrison (which acquired William Lyon Homes). Taylor Morrison is a nationally recognized luxury homebuilder offering semi-custom options."
  },
  {
    "q": "What ZIP code is Mira Villa in?",
    "a": "Mira Villa is located in ZIP code 89135 in the Summerlin South area of Las Vegas."
  },
  {
    "q": "What are HOA fees in Mira Villa?",
    "a": "HOA fees typically range from $350 to $650 per month, covering guard gate staffing, security patrols, common area maintenance, and the Summerlin master association fee."
  },
  {
    "q": "How does Mira Villa compare to Mesa Ridge?",
    "a": "Both are guard-gated luxury communities in Summerlin. Mira Villa offers newer construction by Taylor Morrison in a similar price range ($1M–$2.2M). Mesa Ridge was built by Toll Brothers at $1M–$3M+ with slightly larger estate options."
  },
  {
    "q": "Do Mira Villa homes have casitas?",
    "a": "Yes. Many Mira Villa floor plans offer optional casitas, providing flexible space for guests, extended family, home offices, or creative studios."
  },
  {
    "q": "What schools serve Mira Villa?",
    "a": "Mira Villa is served by CCSD schools including Bonner Elementary (9/10), Sig Rogich Middle School (10/10), and Palo Verde High School (8/10). Private options include The Meadows School (A+) and Bishop Gorman High School (A+)."
  },
  {
    "q": "How does the guard gate entry process work?",
    "a": "Residents receive transponders or access codes for automatic entry. Guests must be called in by the homeowner or added to a pre-approved list. Delivery drivers and service providers follow the community's vendor access policy. Most guard-gated communities staff the gate 24 hours a day, 7 days a week."
  },
  {
    "q": "Can non-residents access the community for viewings?",
    "a": "Yes. Prospective buyers can access the community with a licensed real estate agent who coordinates entry with the guard gate in advance. Nevada Real Estate Group handles all gate access arrangements for property showings."
  },
  {
    "q": "What security features are included beyond the guard gate?",
    "a": "Most guard-gated communities include perimeter walls, security patrols, surveillance cameras at entry points, and emergency response coordination. Some communities also offer interior patrol routes and resident notification systems."
  },
  {
    "q": "Are there custom home lot opportunities?",
    "a": "Some luxury communities offer vacant lots for custom home construction. Lot sizes, architectural guidelines, and approved builders vary by community. Nevada Real Estate Group can help identify available custom lot inventory and connect you with approved builders."
  },
  {
    "q": "What is the resale value trend for luxury homes in this area?",
    "a": "Luxury properties in guard-gated and premium communities have historically outperformed the broader market in terms of value retention during downturns and appreciation during growth periods. Limited supply in guard-gated communities creates structural price support."
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
  name: 'Mira Villa',
  description: 'Mira Villa is a guard-gated · luxury · new construction community in Las Vegas, Nevada (ZIP 89135), established in 2023 by William Lyon Homes / Taylor Morrison, spanning ~60 acres. Home prices range from $1M–$2.2M.',
  geo: { '@type': 'GeoCoordinates', latitude: 36.15, longitude: -115.322 },
  address: { '@type': 'PostalAddress', addressLocality: 'Las Vegas', addressRegion: 'NV', postalCode: '89135', addressCountry: 'US' },
  containedInPlace: { '@type': 'City', name: 'Las Vegas' },
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
  const cms = await getCommunityPage('mira-villa')
  return {
    title: cms?.metaTitle ?? 'Mira Villa Homes for Sale | Nevada Real Estate Group',
    description: cms?.metaDescription ?? 'Browse Mira Villa homes for sale in Las Vegas, NV. $1M–$2.2M. Schools, HOA, market stats. Nevada Real Estate Group.',
    alternates: { canonical: 'https://www.lasvegashomesearchexperts.com/mira-villa' },
  }
}

export default async function MiraVillaPage() {
  const cms = await getCommunityPage('mira-villa')
  const market = getMarketStats('mira-villa')
  const ms = market?.stats

  const heroHeadline = cms?.heroHeadline ?? 'Mira Villa'
  const heroSubtitle = 'Homes for Sale in Las Vegas, Nevada'
  const overviewTitle = cms?.overviewTitle ?? 'Mira Villa: Guard-Gated · Luxury · New Construction Living in Las Vegas'

  const HARDCODED_STATS: Array<[string, string] | [string, string, string]> = [
    ['Established', '2023'],
    ['Developer', 'William Lyon Homes / Taylor Morrison'],
    ['Total Acreage', '~60 acres'],
    ['Homes', '200+ at buildout'],
    ['Median Home Price', ms?.medianSalePrice ?? '$1M–$2.2M'],
    ['ZIP Codes', '89135'],
    ['Guard-Gated', 'Yes'],
    ['HOA', '$350–$650/mo'],
  ]
  const displayStats = mergeQuickStats(HARDCODED_STATS, cms?.quickStats)
  const HARDCODED_DRIVE_TIMES = [
    {
        "time": "~20 min",
        "destination": "to the Strip",
        "route": "via Summerlin Pkwy → I-15"
    },
    {
        "time": "~10 min",
        "destination": "to Red Rock Canyon",
        "route": "via W Charleston Blvd"
    },
    {
        "time": "~5 min",
        "destination": "to Downtown Summerlin",
        "route": "via W Charleston Blvd"
    },
    {
        "time": "~30 min",
        "destination": "to Harry Reid Airport",
        "route": "via I-215 South"
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
          <span>Mira Villa</span>
        </div>
      </div>

      <header id="hero" className="summerlin-hero hero-v2">
        <img src="https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1600&h=700&q=80" alt="Mira Villa community aerial view, Las Vegas Nevada" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
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
                <span className="hero-v2-stat-num">{ms?.medianSalePrice ?? qs('Median Home Price', '$1M–$2.2M')}</span>
                <span className="hero-v2-stat-lbl">Median Sale Price</span>
              </div>
              <div className="hero-v2-stat">
                <span className="hero-v2-stat-num">{ms?.avgDaysToClose ?? qs('Avg Days on Market', '45')}</span>
                <span className="hero-v2-stat-lbl">Avg Days to Close</span>
              </div>
            </div>
            <a href="#listings" className="hero-v2-cta">Search Homes in Mira Villa</a>
          </div>
        </div>
      </header>

      <div className="hero-v2-qfb">
        <div className="container">
          <div className="hero-v2-qfb-row">
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <span><strong>ZIP:</strong> 89135</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              <span><strong>Type:</strong> Guard-Gated · Luxury · New Construction</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
              <span><strong>Price Range:</strong> $1M–$2.2M</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
              <span><strong>HOA:</strong> $350–$650/mo</span>
            </div>
          </div>
          <div className="hero-v2-qfb-est">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            <span>Est. 2023</span>
          </div>
        </div>
      </div>

      <section id="demographics" className="demographics-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Demographics</span>
            <h2>Mira Villa Demographics</h2>
          </div>
          <div className="demo-grid">
            {[
              ['~500', 'Population'],
              ['46', 'Median Age'],
              ['$280,000+', 'Avg Household Income'],
              ['~200', 'Total Households'],
              ['92%', 'Homeownership Rate'],
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
            <h2>Where is Mira Villa?</h2>
            <p>Summerlin, Las Vegas &mdash; Las Vegas, Nevada.</p>
          </div>
          <div className="map-container">
            <MiraVillaMapWrapper />
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
            <h2 className="listings-title">NEW MIRA VILLA LISTINGS</h2>
          </div>
          <div className="ylopo-wrap">
            <div className="YLOPO_searchWidget" />
            <div className="YLOPO_resultsWidget" data-search='{"propertyTypes":["house","condo","townhouse"],"minPrice":1000000,"locations":[{"city":"Las Vegas","state":"NV"}],"limit":12,"sortBy":"listDate","sortOrder":"desc","keywords":"Mira Villa Summerlin","zipCodes":["89135"]}' />
          </div>
          <p className="ylopo-note">Listing data sourced from regional MLS. Information deemed reliable but not guaranteed. Updated daily.</p>
          <div className="listings-actions">
            <a href="https://search.nevadarealestategroup.net/search?s[orderBy]=sourceCreationDate%2Cdesc&s[page]=1&s[locations][0][city]=Las%20Vegas&s[locations][0][state]=NV&s[keywords]=Mira%20Villa%20Summerlin" target="_blank" rel="noopener noreferrer" className="btn-gold">View All Mira Villa Listings &rarr;</a>
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
                  <p>Mira Villa is a guard-gated · luxury · new construction community within Summerlin in Las Vegas, Nevada (ZIP 89135), established in 2023, developed by William Lyon Homes / Taylor Morrison, spanning ~60 acres. Mira Villa is a guard-gated luxury new-construction community in Summerlin delivering resort-caliber homes in a secure, private setting. Developed by Taylor Morrison (formerly William Lyon Homes), Mira Villa offers spacious floor plans from approximately 2,800 to 4,800 square feet with the contemporary desert architecture, premium finishes, and elevated indoor-outdoor living that define Summerlin's newest luxury neighborhoods.</p>
                  <p>The community's guard-gated entry ensures privacy and exclusivity, while the landscaped streets, pocket parks, and walking paths within the gates create a polished residential environment. Mira Villa homes feature open floor plans with multi-slide glass doors, gourmet kitchen islands with quartz countertops, spa-inspired master suites, and covered outdoor living spaces designed for year-round entertaining.</p>
                  <p>Many Mira Villa floor plans offer optional casitas, home offices, wine rooms, and multi-generational suites, providing the flexibility that today's luxury buyers demand. The architectural standards enforce a cohesive desert-contemporary aesthetic with flat rooflines, natural stone and stucco exteriors, and contemporary landscape design that complements the desert environment.</p>
                  <p>Mira Villa's location in the Summerlin foothills places residents just minutes from Red Rock Canyon, Downtown Summerlin, and the 215 Beltway. For buyers seeking new-construction luxury with guard-gated security in the $1M to $2.2M range, Mira Villa fills the gap between Summerlin's upper-middle-market communities and the ultra-luxury pricing of The Ridges.</p>
                </>
              )}
            </div>
            <div className="overview-aside">
              <div className="quick-facts">
                <h3>Mira Villa At a Glance</h3>
                {displayStats.map(([label, value, cls]: any) => (
                  <div className="fact-row" key={label}>
                    <span className="fact-label">{label}</span>
                    <span className={`fact-value${cls ? ' ' + cls : ''}`}>{value}</span>
                  </div>
                ))}
              </div>
              <div className="cta-card">
                <p>Ready to explore Mira Villa? Schedule a private tour of the community and the current listings that match your goals.</p>
                <a href="tel:+17252399950" className="btn-gold">Call 725.239.9950</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="highlights">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Why Mira Villa</span>
            <h2>What Makes Mira Villa Stand Out</h2>
          </div>
          <div className="highlights-grid">
            {[
              { title: 'Guard-Gated New Construction', body: 'Brand-new luxury homes within a 24-hour guard-gated community. Every home features current building codes, smart-home technology, and energy-efficient systems.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
              { title: 'Resort-Style Homes', body: 'Spacious floor plans from 2,800 to 4,800 square feet with multi-slide glass doors, gourmet kitchens, and seamless indoor-outdoor living spaces.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
              { title: 'Desert-Contemporary Design', body: 'Cohesive architectural standards with flat rooflines, natural stone, contemporary stucco, and desert-forward landscape design throughout the community.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><line x1="8" y1="6" x2="8" y2="6.01"/><line x1="12" y1="6" x2="12" y2="6.01"/><line x1="16" y1="6" x2="16" y2="6.01"/><line x1="8" y1="10" x2="8" y2="10.01"/><line x1="12" y1="10" x2="12" y2="10.01"/><line x1="16" y1="10" x2="16" y2="10.01"/><line x1="8" y1="14" x2="8" y2="14.01"/><line x1="12" y1="14" x2="12" y2="14.01"/><line x1="16" y1="14" x2="16" y2="14.01"/></svg> },
              { title: 'Flexible Floor Plans', body: 'Optional casitas, home offices, wine rooms, and multi-generational suites provide the flexibility that modern luxury buyers require.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
              { title: 'Red Rock Proximity', body: 'Minutes from Red Rock Canyon National Conservation Area, with mountain views from many homesites and the community\'s internal pathways.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M8 21l4-11 4 11"/><path d="M2 21l5-14 4 8"/><path d="M14 15l4-8 4 14"/><line x1="2" y1="21" x2="22" y2="21"/></svg> },
              { title: 'Sweet-Spot Pricing', body: 'Guard-gated luxury from $1M to $2.2M fills the gap between Summerlin\'s upper-middle market and ultra-luxury communities like The Ridges ($2M+).', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg> },
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
            <h2>Parks &amp; Recreation Near Mira Villa</h2>
          </div>
          <div className="parks-grid">
            {[
              { name: 'Mira Villa Community Park', address: 'Mira Villa, Las Vegas, NV 89135', acreage: '~3 acres', amenities: ["Walking paths","Pocket parks","Desert landscaping","Seating areas"] },
              { name: 'Red Rock Canyon NCA', address: '1000 Scenic Loop Dr, Las Vegas, NV 89161', acreage: '195,819 acres', amenities: ["Scenic Loop Drive","Hiking trails","Rock climbing","Visitor center","Wildlife viewing"] },
              { name: 'The Paseos Linear Park', address: 'Paseo Hills Dr, Las Vegas, NV 89138', acreage: '~12 acres', amenities: ["Walking trails","Desert gardens","Open space","Dog-friendly areas"] },
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
            <h2>The Mira Villa Lifestyle</h2>
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
              <div className="lifestyle-v2-stat">200+ at buildout</div>
              <div className="lifestyle-v2-label">Homes</div>
            </div>
            <div className="lifestyle-v2-item">
              <div className="lifestyle-v2-icon"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 2v10l7 4"/></svg></div>
              <div className="lifestyle-v2-stat">2023</div>
              <div className="lifestyle-v2-label">Established</div>
            </div>
            <div className="lifestyle-v2-item">
              <div className="lifestyle-v2-icon"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg></div>
              <div className="lifestyle-v2-stat">Yes</div>
              <div className="lifestyle-v2-label">Guard-Gated</div>
            </div>
          </div>
        </div>
      </section>

      <section id="hoa" className="hoa-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">HOA</span>
            <h2>HOA Information for Mira Villa</h2>
          </div>
          <div className="hoa-grid">
            <div className="hoa-fees-col">
              <h3>Fees &amp; Management</h3>
              <div className="hoa-fee-row"><span>Monthly HOA Range</span><strong>$350–$650/mo</strong></div>
              <div className="hoa-fee-row"><span>Guard-Gated</span><strong>Yes — staffed gate</strong></div>
              <div className="hoa-fee-row"><span>Community Type</span><strong>Guard-Gated · Luxury · New Construction</strong></div>
              <div className="hoa-management">
                <p className="hoa-mgmt-label">Management</p>
                <p className="hoa-mgmt-value">Summerlin Master Association + Sub-HOA</p>
              </div>
              <p style={{ marginTop: '16px', fontSize: '11px', color: 'var(--text-faint)', fontStyle: 'italic' }}>HOA fees are subject to change. Verify current fees with the management company before purchase.</p>
            </div>
            <div className="hoa-amenities-col">
              <h3>What HOA Typically Covers</h3>
              <ul className="hoa-amenity-list">
                {['24-hour guard gate staffing and security patrols','Common area landscaping and maintenance','Community parks and trail maintenance','Neighborhood street maintenance','Perimeter wall and gate maintenance','Exterior architectural standards enforcement','Reserve fund contributions'].map((a: string) => <li key={a}>{a}</li>)}
              </ul>
              <div className="hoa-gated-badge"><span>Guard-Gated Community</span></div>
            </div>
          </div>
        </div>
      </section>

      <section id="schools" className="schools-v2">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Education</span>
            <h2>Schools Serving Mira Villa</h2>
          </div>
          <div className="schools-v2-table">
            <div className="schools-v2-header">
              <span>School Name</span>
              <span>Grades</span>
              <span>Rating</span>
            </div>
            {[
              ['John W. Bonner Elementary', 'K–5', '9/10'],
              ['Sig Rogich Middle School', '6–8', '10/10'],
              ['Palo Verde High School', '9–12', '8/10'],
              ['The Meadows School', 'PreK–12', 'A+'],
              ['Bishop Gorman High School', '9–12', 'A+'],
              ['Doral Academy Red Rock', 'K–12', '9/10'],
              ['Alexander Dawson School', 'K–8', 'A+'],
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
            <h2>What Mira Villa Buyers Say</h2>
          </div>
          <div className="testimonials-grid">
            {[
              { quote: 'Mira Villa was the perfect sweet spot — guard-gated luxury in Summerlin without the ultra-luxury price tag. Nevada Real Estate Group helped us navigate the new-construction process and select the right lot.', name: 'Andrew & Michelle F.', detail: 'Bought in Mira Villa, Summerlin · 2025' },
              { quote: 'We wanted new construction with guard-gated security and Summerlin schools. Nevada Real Estate Group showed us Mira Villa and it checked every box. The Taylor Morrison quality exceeded our expectations.', name: 'Daniel H.', detail: 'Bought in Mira Villa, Summerlin · 2025' },
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

      <MiraVillaFAQ />

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
              { name: 'The Ridges', href: '/summerlin-the-ridges/', price: 'From $2M', compare: 'Summerlin\'s ultra-luxury guard-gated enclave with Bear\'s Best golf for buyers with a higher budget.' },
              { name: 'Mesa Ridge', href: '/mesa-ridge/', price: 'From $1M', compare: 'Toll Brothers guard-gated community in Summerlin in a similar price range.' },
              { name: 'Red Rock Country Club', href: '/red-rock-country-club/', price: 'From $1.2M', compare: 'Guard-gated golf community within Summerlin with two Arnold Palmer courses.' },
              { name: 'Summerlin', href: '/summerlin/', price: 'From $450K', compare: 'The broader master-planned community with 20+ villages and every price point.' },
              { name: 'Southern Highlands', href: '/southern-highlands/', price: 'From $550K', compare: 'Guard-gated golf community in the south valley with Jack Nicklaus course.' },
              { name: 'MacDonald Highlands', href: '/macdonald-highlands/', price: 'From $800K', compare: 'Henderson\'s premier luxury community with DragonRidge Country Club.' },
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
              <h2>Ready to Find Your Mira Villa Home?</h2>
              <p>Nevada Real Estate Group is the #1 real estate team in Nevada. Whether you&apos;re buying or selling in Mira Villa, let&apos;s talk.</p>
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
                <input type="hidden" name="_subject" value="Mira Villa Inquiry — LasVegasHomeSearchExperts.com" />
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
