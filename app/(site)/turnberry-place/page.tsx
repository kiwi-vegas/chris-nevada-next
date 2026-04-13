import TurnberryPlaceFAQ from '@/components/TurnberryPlaceFAQ'
import Link from 'next/link'
import type { Metadata } from 'next'
import TurnberryPlaceMapWrapper from '@/components/TurnberryPlaceMapWrapper'
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
    { '@type': 'ListItem', position: 3, name: 'Turnberry Place', item: 'https://www.lasvegashomesearchexperts.com/turnberry-place/' },
  ],
}

const FAQ_DATA = [
  {
    "q": "What is the price range at Turnberry Place?",
    "a": "Residences range from approximately $500,000 for one- and two-bedroom units to well over $5 million for expansive penthouses and combined units with panoramic views."
  },
  {
    "q": "How many towers are at Turnberry Place?",
    "a": "Turnberry Place consists of four 36-story towers containing approximately 720 total residences. The towers were completed in phases between 2001 and 2006."
  },
  {
    "q": "How large are the units at Turnberry Place?",
    "a": "Floor plans at Turnberry Place are among the most spacious in any Las Vegas high-rise. Two-bedroom units typically exceed 2,000 square feet, and penthouses can surpass 5,000 square feet. All units include private balconies."
  },
  {
    "q": "What amenities does Turnberry Place offer?",
    "a": "The 16-acre campus includes a 3-acre pool complex with waterfalls and cabanas, championship tennis courts, a 10,000 sq ft fitness center, full-service spa, putting green, dog parks, 24-hour concierge, valet parking, and private wine storage."
  },
  {
    "q": "What is the difference between Turnberry Place and Turnberry Towers?",
    "a": "Both were developed by Turnberry Associates. Turnberry Place (2001-2006) is a four-tower complex on Paradise Road with 720 units and a 16-acre resort campus. Turnberry Towers (2007-2008) is a twin-tower complex on Karen Avenue with 636 units. Both are luxury communities with distinct characters."
  },
  {
    "q": "Is Turnberry Place gated?",
    "a": "Yes. Turnberry Place is a gated community with 24-hour security, concierge services, valet parking, and controlled building access."
  },
  {
    "q": "What are HOA fees at Turnberry Place?",
    "a": "HOA fees typically range from $500 to $2,500 per month depending on unit size and tower. Fees cover building maintenance, the 16-acre resort campus, pool complex, spa, fitness center, concierge, security, and all common area operations."
  },
  {
    "q": "Can you rent out a unit at Turnberry Place?",
    "a": "Yes. Turnberry Place allows rentals. The spacious floor plans, resort amenities, and Strip-adjacent location make it one of the stronger rental performers among Las Vegas luxury high-rises."
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
    "a": "Most guard-gated communities include perimeter walls, security patrols, surveillance cameras at entry points, and emergency response coordination. Some communities also offer interior patrol routes and resident notification systems. Turnberry Place features a 24-hour staffed guard gate with controlled vehicle access, security patrols, and perimeter walls."
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
  name: 'Turnberry Place',
  description: 'Turnberry Place is a high-rise · luxury · four towers community in Las Vegas, Nevada (ZIP 89109), established in 2001 by Turnberry Associates / Jeffrey Soffer, spanning ~16 acres. Home prices range from $500K–$5M+.',
  geo: { '@type': 'GeoCoordinates', latitude: 36.121, longitude: -115.149 },
  address: { '@type': 'PostalAddress', addressLocality: 'Las Vegas', addressRegion: 'NV', postalCode: '89109', addressCountry: 'US' },
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
  const cms = await getCommunityPage('turnberry-place')
  return {
    title: cms?.metaTitle ?? 'Turnberry Place Homes for Sale | Nevada Real Estate Group',
    description: cms?.metaDescription ?? 'Browse Turnberry Place homes for sale in Las Vegas, NV. $500K–$5M+. Schools, HOA, market stats. Nevada Real Estate Group.',
    alternates: { canonical: 'https://www.lasvegashomesearchexperts.com/turnberry-place' },
  }
}

export default async function TurnberryPlacePage() {
  const cms = await getCommunityPage('turnberry-place')
  const market = getMarketStats('turnberry-place')
  const ms = market?.stats

  const heroHeadline = cms?.heroHeadline ?? 'Turnberry Place'
  const heroSubtitle = 'Homes for Sale in Las Vegas, Nevada'
  const overviewTitle = cms?.overviewTitle ?? 'Turnberry Place: High-Rise · Luxury · Four Towers Living in Las Vegas'

  const HARDCODED_STATS: Array<[string, string] | [string, string, string]> = [
    ['Established', '2001'],
    ['Developer', 'Turnberry Associates / Jeffrey Soffer'],
    ['Total Acreage', '~16 acres'],
    ['Homes', '~720'],
    ['Median Home Price', ms?.medianSalePrice ?? '$500K–$5M+'],
    ['ZIP Codes', '89109'],
    ['Guard-Gated', 'Yes'],
    ['HOA', '$500–$2,500/mo'],
  ]
  const displayStats = mergeQuickStats(HARDCODED_STATS, cms?.quickStats)
  const HARDCODED_DRIVE_TIMES = [
    {
        "time": "~5 min",
        "destination": "to the Strip",
        "route": "via Paradise Rd"
    },
    {
        "time": "~10 min",
        "destination": "to Harry Reid Airport",
        "route": "via Paradise Rd South"
    },
    {
        "time": "~3 min",
        "destination": "to Convention Center",
        "route": "via Paradise Rd"
    },
    {
        "time": "~20 min",
        "destination": "to Summerlin",
        "route": "via I-15 → Summerlin Pkwy"
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
          <span>Turnberry Place</span>
        </div>
      </div>

      <header id="hero" className="summerlin-hero hero-v2">
        <img src="https://images.unsplash.com/photo-1605833556294-ea5c7a74f57d?auto=format&fit=crop&w=1600&h=700&q=80" alt="Turnberry Place community aerial view, Las Vegas Nevada" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
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
                <span className="hero-v2-stat-num">{ms?.medianSalePrice ?? qs('Median Home Price', '$500K–$5M+')}</span>
                <span className="hero-v2-stat-lbl">Median Sale Price</span>
              </div>
              <div className="hero-v2-stat">
                <span className="hero-v2-stat-num">{ms?.avgDaysToClose ?? qs('Avg Days on Market', '45')}</span>
                <span className="hero-v2-stat-lbl">Avg Days to Close</span>
              </div>
            </div>
            <a href="#listings" className="hero-v2-cta">Search Homes in Turnberry Place</a>
          </div>
        </div>
      </header>

      <div className="hero-v2-qfb">
        <div className="container">
          <div className="hero-v2-qfb-row">
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <span><strong>ZIP:</strong> 89109</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              <span><strong>Type:</strong> High-Rise · Luxury · Four Towers</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
              <span><strong>Price Range:</strong> $500K–$5M+</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
              <span><strong>HOA:</strong> $500–$2,500/mo</span>
            </div>
          </div>
          <div className="hero-v2-qfb-est">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            <span>Est. 2001</span>
          </div>
        </div>
      </div>

      <section id="demographics" className="demographics-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Demographics</span>
            <h2>Turnberry Place Demographics</h2>
          </div>
          <div className="demo-grid">
            {[
              ['~1,300', 'Population'],
              ['50', 'Median Age'],
              ['$200,000+', 'Avg Household Income'],
              ['~720', 'Total Households'],
              ['60%', 'Homeownership Rate'],
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
            <h2>Where is Turnberry Place?</h2>
            <p>Paradise, Las Vegas &mdash; Las Vegas, Nevada.</p>
          </div>
          <div className="map-container">
            <TurnberryPlaceMapWrapper />
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
            <h2 className="listings-title">NEW TURNBERRY PLACE LISTINGS</h2>
          </div>
          <div className="ylopo-wrap">
            <div className="YLOPO_searchWidget" />
            <div className="YLOPO_resultsWidget" data-search='{"propertyTypes":["house","condo","townhouse"],"minPrice":500000,"locations":[{"city":"Las Vegas","state":"NV"}],"limit":12,"sortBy":"listDate","sortOrder":"desc","keywords":"Turnberry Place","zipCodes":["89109"]}' />
          </div>
          <p className="ylopo-note">Listing data sourced from regional MLS. Information deemed reliable but not guaranteed. Updated daily.</p>
          <div className="listings-actions">
            <a href="https://search.nevadarealestategroup.net/search?s[orderBy]=sourceCreationDate%2Cdesc&s[page]=1&s[locations][0][city]=Las%20Vegas&s[locations][0][state]=NV&s[keywords]=Turnberry%20Place" target="_blank" rel="noopener noreferrer" className="btn-gold">View All Turnberry Place Listings &rarr;</a>
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
                  <p>Turnberry Place is a high-rise · luxury · four towers community in Las Vegas, Nevada (ZIP 89109), developed by Turnberry Associates / Jeffrey Soffer, spanning ~16 acres, with ~720 homes. Turnberry Place is a four-tower luxury high-rise condominium community located on Paradise Road, just east of the Las Vegas Strip. Developed by Turnberry Associates between 2001 and 2006, the complex was the development that proved Las Vegas could sustain a premier luxury residential high-rise market. Its four 36-story towers contain approximately 720 residences spread across 16 resort-style acres, making it one of the largest and most established luxury high-rise communities in the valley.</p>
                  <p>Residences at Turnberry Place range from approximately $500,000 for one- and two-bedroom units to well over $5 million for the community's most expansive penthouses and combined units. Floor plans are exceptionally generous — many two-bedroom units exceed 2,000 square feet and three-bedroom penthouses can surpass 5,000 square feet. Every unit features private balconies, floor-to-ceiling windows, marble and granite finishes, and Sub-Zero/Wolf kitchen appliances.</p>
                  <p>The community's 16-acre campus is the most resort-like of any Las Vegas high-rise. Amenities include a 3-acre pool deck with waterfalls and private cabanas, a championship tennis court complex, a 10,000-square-foot fitness center, a full-service spa, a putting green, 24-hour concierge and valet, private wine storage, and dedicated dog parks. The lush landscaping and resort grounds are maintained to five-star standards.</p>
                  <p>Turnberry Place occupies a unique position in the Las Vegas high-rise market — it offers the spacious floor plans and resort grounds that newer glass towers cannot match, combined with a location that puts residents minutes from the Strip, the Convention Center, and Harry Reid Airport. For buyers who prioritize space, amenities, and a resort lifestyle over the newest construction, Turnberry Place remains one of the most compelling options in the valley.</p>
                </>
              )}
            </div>
            <div className="overview-aside">
              <div className="quick-facts">
                <h3>Turnberry Place At a Glance</h3>
                {displayStats.map(([label, value, cls]: any) => (
                  <div className="fact-row" key={label}>
                    <span className="fact-label">{label}</span>
                    <span className={`fact-value${cls ? ' ' + cls : ''}`}>{value}</span>
                  </div>
                ))}
              </div>
              <div className="cta-card">
                <p>Ready to explore Turnberry Place? Schedule a private tour of the community and the current listings that match your goals.</p>
                <a href="tel:+17252399950" className="btn-gold">Call 725.239.9950</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="top-facts" className="top-facts-section">
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center' }}>
            <span className="section-label">Quick Facts</span>
            <h2>Top 7 Facts About Turnberry Place</h2>
          </div>
          <ol className="top-facts-list">
            <li key={0}>Turnberry Place spans ~16 acres in Las Vegas, Nevada (ZIP 89109).</li>
            <li key={1}>Turnberry Place was established in 2001 by Turnberry Associates / Jeffrey Soffer.</li>
            <li key={2}>Turnberry Place contains ~720 homes with prices ranging from $500K–$5M+.</li>
            <li key={3}>Turnberry Place is a guard-gated community with 24-hour staffed entry and security patrols.</li>
            <li key={4}>HOA fees in Turnberry Place range from $500–$2,500/mo per month.</li>
            <li key={5}>Top-rated schools serving Turnberry Place include Las Vegas Academy of the Arts (9/10) and John C. Fremont Middle School (5/10).</li>
            <li key={6}>Turnberry Place is located ~5 min to the Strip via Paradise Rd.</li>
          </ol>
        </div>
      </section>

      <section id="highlights">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Why Turnberry Place</span>
            <h2>What Makes Turnberry Place Stand Out</h2>
          </div>
          <div className="highlights-grid">
            {[
              { title: 'Four 36-Story Towers', body: 'Four residential towers containing approximately 720 residences on 16 resort-style acres. The largest luxury high-rise community in Las Vegas.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><line x1="8" y1="6" x2="8" y2="6.01"/><line x1="12" y1="6" x2="12" y2="6.01"/><line x1="16" y1="6" x2="16" y2="6.01"/><line x1="8" y1="10" x2="8" y2="10.01"/><line x1="12" y1="10" x2="12" y2="10.01"/><line x1="16" y1="10" x2="16" y2="10.01"/><line x1="8" y1="14" x2="8" y2="14.01"/><line x1="12" y1="14" x2="12" y2="14.01"/><line x1="16" y1="14" x2="16" y2="14.01"/></svg> },
              { title: '3-Acre Pool Complex', body: 'Resort-style pool deck with waterfalls, private cabanas, lounge areas, and lush tropical landscaping. The most expansive pool complex of any Las Vegas high-rise.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
              { title: 'Largest Floor Plans', body: 'Among the most spacious residences in any Las Vegas high-rise. Two-bedrooms exceed 2,000 sq ft; penthouses can surpass 5,000 sq ft. All units have private balconies.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
              { title: 'Tennis & Fitness', body: 'Championship tennis courts, 10,000-square-foot fitness center with personal training, putting green, and dedicated dog parks.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22c4-4 8-7.5 8-12a8 8 0 10-16 0c0 4.5 4 8 8 12z"/><circle cx="12" cy="10" r="3"/></svg> },
              { title: 'Full-Service Spa', body: 'On-site spa with treatment rooms, sauna, steam room, and relaxation areas. One of the premier residential spa experiences in Las Vegas.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
              { title: 'Turnberry Legacy', body: 'The pioneer of luxury high-rise living in Las Vegas. Turnberry Place proved the market and set the standard that every subsequent tower has tried to match.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg> },
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
            <h2>Parks &amp; Recreation Near Turnberry Place</h2>
          </div>
          <div className="parks-grid">
            {[
              { name: 'Turnberry Place Pool & Tennis Complex', address: '2777 Paradise Rd, Las Vegas, NV 89109', acreage: '~5 acres', amenities: ["3-acre pool with waterfalls","Private cabanas","Championship tennis courts","Putting green","Dog parks"] },
              { name: 'Las Vegas Convention Center District', address: '3150 Paradise Rd, Las Vegas, NV 89109', acreage: '~200 acres', amenities: ["Convention center","Monorail station","Restaurants","Hotels"] },
              { name: 'Wynn Golf Club', address: '3131 Las Vegas Blvd S, Las Vegas, NV 89109', acreage: '~130 acres', amenities: ["18-hole golf course","Pro shop","Dining","Caddie service"] },
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
            <h2>The Turnberry Place Lifestyle</h2>
          </div>
          <div className="lifestyle-v2-grid">
            <div className="lifestyle-v2-item">
              <div className="lifestyle-v2-icon"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg></div>
              <div className="lifestyle-v2-stat">~5 min</div>
              <div className="lifestyle-v2-label">to the Strip</div>
            </div>
            <div className="lifestyle-v2-item">
              <div className="lifestyle-v2-icon"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22c4-4 8-7.5 8-12a8 8 0 10-16 0c0 4.5 4 8 8 12z"/><circle cx="12" cy="10" r="3"/></svg></div>
              <div className="lifestyle-v2-stat">3+</div>
              <div className="lifestyle-v2-label">Nearby Parks</div>
            </div>
            <div className="lifestyle-v2-item">
              <div className="lifestyle-v2-icon"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg></div>
              <div className="lifestyle-v2-stat">~720</div>
              <div className="lifestyle-v2-label">Homes</div>
            </div>
            <div className="lifestyle-v2-item">
              <div className="lifestyle-v2-icon"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 2v10l7 4"/></svg></div>
              <div className="lifestyle-v2-stat">2001</div>
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
            <h2>HOA Information for Turnberry Place</h2>
          </div>
          <div className="hoa-grid">
            <div className="hoa-fees-col">
              <h3>Fees &amp; Management</h3>
              <div className="hoa-fee-row"><span>Monthly HOA Range</span><strong>$500–$2,500/mo</strong></div>
              <div className="hoa-fee-row"><span>Guard-Gated</span><strong>Yes — staffed gate</strong></div>
              <div className="hoa-fee-row"><span>Community Type</span><strong>High-Rise · Luxury · Four Towers</strong></div>
              <div className="hoa-management">
                <p className="hoa-mgmt-label">Management</p>
                <p className="hoa-mgmt-value">Community Association</p>
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
            <h2>Schools Serving Turnberry Place</h2>
          </div>
          <div className="schools-v2-table">
            <div className="schools-v2-header">
              <span>School Name</span>
              <span>Grades</span>
              <span>Rating</span>
            </div>
            {[
              ['Las Vegas Academy of the Arts', '9–12', '9/10'],
              ['John C. Fremont Middle School', '6–8', '5/10'],
              ['Valley High School', '9–12', '5/10'],
              ['Bishop Gorman High School', '9–12', 'A+'],
              ['The Meadows School', 'PreK–12', 'A+'],
              ['Las Vegas Day School', 'PreK–8', 'A'],
              ['Explore Academy', '6–12', '7/10'],
              ['Coral Academy of Science', 'K–12', '8/10'],
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
            <h2>What Turnberry Place Buyers Say</h2>
          </div>
          <div className="testimonials-grid">
            {[
              { quote: 'We toured every luxury high-rise in Las Vegas and nothing matched Turnberry Place for space, amenities, and resort-style living. Nevada Real Estate Group found us a three-bedroom penthouse that exceeded our expectations.', name: 'Richard & Diana F.', detail: 'Bought at Turnberry Place · 2024' },
              { quote: 'The floor plans at Turnberry Place are unmatched. Our two-bedroom is larger than most three-bedrooms at other towers. Nevada Real Estate Group\'s high-rise expertise made all the difference.', name: 'Jennifer L.', detail: 'Bought at Turnberry Place · 2025' },
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

      <TurnberryPlaceFAQ />

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
              { name: 'Turnberry Towers', href: '/turnberry-towers/', price: 'From $400K', compare: 'The twin-tower Turnberry sibling on Karen Avenue. Newer construction, similar luxury standard.' },
              { name: 'Veer Towers', href: '/veer-towers/', price: 'From $400K', compare: 'CityCenter\'s iconic leaning towers with direct on-Strip location.' },
              { name: 'Panorama Towers', href: '/panorama-towers/', price: 'From $300K', compare: 'Strip-adjacent twin 33-story towers with a more accessible entry point.' },
              { name: 'The Martin', href: '/the-martin/', price: 'From $400K', compare: '45-story luxury tower on the west side of the Strip corridor.' },
              { name: 'Waldorf Astoria Las Vegas', href: '/waldorf-astoria-las-vegas/', price: 'From $500K', compare: 'Five-star branded residences at CityCenter with full hotel services.' },
              { name: 'Las Vegas Country Club', href: '/las-vegas-country-club/', price: 'From $400K', compare: 'Established golf community just south of Turnberry Place. Single-family and estates.' },
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
              <h2>Ready to Find Your Turnberry Place Home?</h2>
              <p>Nevada Real Estate Group is the #1 real estate team in Nevada. Whether you&apos;re buying or selling in Turnberry Place, let&apos;s talk.</p>
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
                <input type="hidden" name="_subject" value="Turnberry Place Inquiry — LasVegasHomeSearchExperts.com" />
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
