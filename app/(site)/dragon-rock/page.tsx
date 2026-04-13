import DragonRockFAQ from '@/components/DragonRockFAQ'
import Link from 'next/link'
import type { Metadata } from 'next'
import DragonRockMapWrapper from '@/components/DragonRockMapWrapper'
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
    { '@type': 'ListItem', position: 3, name: 'Dragon Rock', item: 'https://www.lasvegashomesearchexperts.com/dragon-rock/' },
  ],
}

const FAQ_DATA = [
  {
    "q": "What is the price range for homes in Dragon Rock?",
    "a": "Homes in Dragon Rock range from approximately $5 million to over $15 million. These are fully custom Blue Heron-designed estates ranging from 6,000 to 12,000+ square feet."
  },
  {
    "q": "What does 'double guard-gated' mean?",
    "a": "Dragon Rock is located within MacDonald Highlands, which has its own guard gate. Dragon Rock then has a second, private guard gate. Residents pass through two layers of controlled access — the MacDonald Highlands gate and the Dragon Rock gate — for maximum security and privacy. Dragon Rock features a 24-hour staffed guard gate with controlled vehicle access, security patrols, and perimeter walls."
  },
  {
    "q": "Who builds the homes in Dragon Rock?",
    "a": "Blue Heron is the sole developer and builder at Dragon Rock. Every home is a fully custom Blue Heron design featuring the company's signature desert-contemporary aesthetic with disappearing glass walls, negative-edge pools, and museum-quality finishes."
  },
  {
    "q": "How many homes are in Dragon Rock?",
    "a": "Dragon Rock has approximately 30 homesites. This extreme exclusivity is by design — each lot was positioned for maximum views and privacy with minimal visual intrusion from neighboring properties."
  },
  {
    "q": "What is DragonRidge Country Club?",
    "a": "DragonRidge Country Club is a private club within MacDonald Highlands featuring a Jay Morrish and David Druzisky-designed 18-hole championship course, full-service clubhouse with dining and events, resort-style pools, tennis courts, and a fitness center."
  },
  {
    "q": "What ZIP code is Dragon Rock in?",
    "a": "Dragon Rock is located in ZIP code 89012 within MacDonald Highlands in Henderson, Nevada. Home prices range from $5M–$15M+."
  },
  {
    "q": "What are HOA fees at Dragon Rock?",
    "a": "HOA fees at Dragon Rock typically range from $800 to $2,000+ per month, covering both the MacDonald Highlands master association and the Dragon Rock sub-association. Fees cover dual guard gate staffing, security, common area maintenance, and community infrastructure."
  },
  {
    "q": "What views do Dragon Rock homes have?",
    "a": "Dragon Rock's elevated position within MacDonald Highlands provides panoramic views of the Las Vegas Strip, the entire valley floor, the Spring Mountains to the west, and the McCullough Range to the south. The views are among the most dramatic of any residential community in Las Vegas."
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
    "a": "Most guard-gated communities include perimeter walls, security patrols, surveillance cameras at entry points, and emergency response coordination. Some communities also offer interior patrol routes and resident notification systems. Dragon Rock features a 24-hour staffed guard gate with controlled vehicle access, security patrols, and perimeter walls."
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
  name: 'Dragon Rock',
  description: 'Dragon Rock is a double guard-gated · ultra-luxury community in Henderson, Nevada (ZIP 89012), established in 2016 by Blue Heron, spanning ~45 acres. Home prices range from $5M–$15M+.',
  geo: { '@type': 'GeoCoordinates', latitude: 36.01, longitude: -114.99 },
  address: { '@type': 'PostalAddress', addressLocality: 'Henderson', addressRegion: 'NV', postalCode: '89012', addressCountry: 'US' },
  containedInPlace: { '@type': 'City', name: 'Henderson' },
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
  const cms = await getCommunityPage('dragon-rock')
  return {
    title: cms?.metaTitle ?? 'Dragon Rock Homes for Sale | Nevada Real Estate Group',
    description: cms?.metaDescription ?? 'Browse Dragon Rock homes for sale in Henderson, NV. $5M–$15M+. Schools, HOA, market stats. Nevada Real Estate Group.',
    alternates: { canonical: 'https://www.lasvegashomesearchexperts.com/dragon-rock' },
  }
}

export default async function DragonRockPage() {
  const cms = await getCommunityPage('dragon-rock')
  const market = getMarketStats('dragon-rock')
  const ms = market?.stats

  const heroHeadline = cms?.heroHeadline ?? 'Dragon Rock'
  const heroSubtitle = 'Homes for Sale in Henderson, Nevada'
  const overviewTitle = cms?.overviewTitle ?? 'Dragon Rock: Double Guard-Gated · Ultra-Luxury Living in Henderson'

  const HARDCODED_STATS: Array<[string, string] | [string, string, string]> = [
    ['Established', '2016'],
    ['Developer', 'Blue Heron'],
    ['Total Acreage', '~45 acres'],
    ['Homes', '30 homesites'],
    ['Median Home Price', ms?.medianSalePrice ?? '$5M–$15M+'],
    ['ZIP Codes', '89012'],
    ['Guard-Gated', 'Yes'],
    ['HOA', '$800–$2,000/mo'],
  ]
  const displayStats = mergeQuickStats(HARDCODED_STATS, cms?.quickStats)
  const HARDCODED_DRIVE_TIMES = [
    {
        "time": "~20 min",
        "destination": "to the Strip",
        "route": "via I-215 → I-15"
    },
    {
        "time": "~15 min",
        "destination": "to Henderson Executive Airport",
        "route": "via Bicentennial Pkwy"
    },
    {
        "time": "~10 min",
        "destination": "to The District at GVR",
        "route": "via Stephanie St"
    },
    {
        "time": "~25 min",
        "destination": "to Harry Reid Airport",
        "route": "via I-215 West → I-15"
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
          <span>Dragon Rock</span>
        </div>
      </div>

      <header id="hero" className="summerlin-hero hero-v2">
        <img src="https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1600&h=700&q=80" alt="Dragon Rock community aerial view, Henderson Nevada" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
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
                <span className="hero-v2-stat-num">{ms?.medianSalePrice ?? qs('Median Home Price', '$5M–$15M+')}</span>
                <span className="hero-v2-stat-lbl">Median Sale Price</span>
              </div>
              <div className="hero-v2-stat">
                <span className="hero-v2-stat-num">{ms?.avgDaysToClose ?? qs('Avg Days on Market', '45')}</span>
                <span className="hero-v2-stat-lbl">Avg Days to Close</span>
              </div>
            </div>
            <a href="#listings" className="hero-v2-cta">Search Homes in Dragon Rock</a>
          </div>
        </div>
      </header>

      <div className="hero-v2-qfb">
        <div className="container">
          <div className="hero-v2-qfb-row">
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <span><strong>ZIP:</strong> 89012</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              <span><strong>Type:</strong> Double Guard-Gated · Ultra-Luxury</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
              <span><strong>Price Range:</strong> $5M–$15M+</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
              <span><strong>HOA:</strong> $800–$2,000/mo</span>
            </div>
          </div>
          <div className="hero-v2-qfb-est">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            <span>Est. 2016</span>
          </div>
        </div>
      </div>

      <section id="demographics" className="demographics-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Demographics</span>
            <h2>Dragon Rock Demographics</h2>
          </div>
          <div className="demo-grid">
            {[
              ['~60', 'Population'],
              ['52', 'Median Age'],
              ['$750,000+', 'Avg Household Income'],
              ['~25', 'Total Households'],
              ['96%', 'Homeownership Rate'],
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
            <h2>Where is Dragon Rock?</h2>
            <p>MacDonald Highlands, Henderson &mdash; Henderson, Nevada.</p>
          </div>
          <div className="map-container">
            <DragonRockMapWrapper />
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
            <h2 className="listings-title">NEW DRAGON ROCK LISTINGS</h2>
          </div>
          <div className="ylopo-wrap">
            <div className="YLOPO_searchWidget" />
            <div className="YLOPO_resultsWidget" data-search='{"propertyTypes":["house","condo","townhouse"],"minPrice":5000000,"locations":[{"city":"Henderson","state":"NV"}],"limit":12,"sortBy":"listDate","sortOrder":"desc","keywords":"Dragon Rock MacDonald Highlands","zipCodes":["89012"]}' />
          </div>
          <p className="ylopo-note">Listing data sourced from regional MLS. Information deemed reliable but not guaranteed. Updated daily.</p>
          <div className="listings-actions">
            <a href="https://search.nevadarealestategroup.net/search?s[orderBy]=sourceCreationDate%2Cdesc&s[page]=1&s[locations][0][city]=Henderson&s[locations][0][state]=NV&s[keywords]=Dragon%20Rock%20MacDonald%20Highlands" target="_blank" rel="noopener noreferrer" className="btn-gold">View All Dragon Rock Listings &rarr;</a>
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
                  <p>Dragon Rock is a double guard-gated · ultra-luxury community within MacDonald Highlands in Henderson, Nevada (ZIP 89012), established in 2016, spanning ~45 acres, with 30 homesites homes. Dragon Rock is the most exclusive enclave within MacDonald Highlands, a double guard-gated collection of approximately 30 custom homesites developed by Blue Heron on some of the most dramatic terrain in the Las Vegas Valley. Named for the dramatic rock formations visible from the community, Dragon Rock occupies a premium elevated position within the already-elevated MacDonald Highlands master plan, delivering panoramic views of the Strip, the valley, and the surrounding mountain ranges.</p>
                  <p>Blue Heron is the sole builder and developer of Dragon Rock, bringing their signature desert-contemporary aesthetic to every home. Blue Heron's design philosophy emphasizes disappearing glass walls, negative-edge pools, natural stone, and seamless indoor-outdoor living. Homes range from approximately $5 million to over $15 million, with finished residences typically spanning 6,000 to 12,000+ square feet.</p>
                  <p>The double guard-gated security means residents pass through the MacDonald Highlands guard gate first, then through the private Dragon Rock gate — creating two layers of controlled access. This arrangement delivers an exceptional level of privacy and exclusivity, attracting high-net-worth individuals, executives, and celebrities who value discretion above all else.</p>
                  <p>Dragon Rock residents have access to the DragonRidge Country Club, which features a Jay Morrish and David Druzisky-designed 18-hole championship course, a full-service clubhouse with dining and events, resort-style pools, tennis courts, and a fitness center. Membership is separate from homeownership. The community's location in Henderson provides access to I-215 for a direct corridor to the Strip, the airport, and Lake Mead.</p>
                </>
              )}
            </div>
            <div className="overview-aside">
              <div className="quick-facts">
                <h3>Dragon Rock At a Glance</h3>
                {displayStats.map(([label, value, cls]: any) => (
                  <div className="fact-row" key={label}>
                    <span className="fact-label">{label}</span>
                    <span className={`fact-value${cls ? ' ' + cls : ''}`}>{value}</span>
                  </div>
                ))}
              </div>
              <div className="cta-card">
                <p>Ready to explore Dragon Rock? Schedule a private tour of the community and the current listings that match your goals.</p>
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
            <h2>Top 7 Facts About Dragon Rock</h2>
          </div>
          <ol className="top-facts-list">
            <li key={0}>Dragon Rock spans ~45 acres in Henderson, Nevada (ZIP 89012).</li>
            <li key={1}>Dragon Rock was established in 2016 by Blue Heron.</li>
            <li key={2}>Dragon Rock contains 30 homesites homes with prices ranging from $5M–$15M+.</li>
            <li key={3}>Dragon Rock is a guard-gated community with 24-hour staffed entry and security patrols.</li>
            <li key={4}>HOA fees in Dragon Rock range from $800–$2,000/mo per month.</li>
            <li key={5}>Top-rated schools serving Dragon Rock include John C. Vanderburg Elementary (8/10) and Del E. Webb Middle School (7/10).</li>
            <li key={6}>Dragon Rock is located ~20 min to the Strip via I-215 → I-15.</li>
          </ol>
        </div>
      </section>

      <section id="highlights">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Why Dragon Rock</span>
            <h2>What Makes Dragon Rock Stand Out</h2>
          </div>
          <div className="highlights-grid">
            {[
              { title: 'Double Guard-Gated', body: 'Two layers of guard-gated security: the MacDonald Highlands gate followed by the private Dragon Rock gate. One of the most secure residential enclaves in the American West.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
              { title: 'Blue Heron Custom Homes', body: 'Blue Heron is the sole developer and builder, creating award-winning desert-contemporary estates with disappearing glass walls, negative-edge pools, and museum-quality finishes.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
              { title: 'DragonRidge Country Club', body: 'Access to a Jay Morrish-designed 18-hole championship course, full-service clubhouse, resort pools, tennis, and fitness. One of Henderson\'s premier private clubs.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 2v10l7 4"/></svg> },
              { title: 'Panoramic Strip Views', body: 'The elevated position within MacDonald Highlands provides 180-degree panoramic views of the Las Vegas Strip, the valley, and surrounding mountain ranges.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M8 21l4-11 4 11"/><path d="M2 21l5-14 4 8"/><path d="M14 15l4-8 4 14"/><line x1="2" y1="21" x2="22" y2="21"/></svg> },
              { title: '30 Ultra-Exclusive Lots', body: 'Only 30 homesites in the entire community, creating extreme exclusivity and privacy. Each lot was positioned for maximum views and minimum visual intrusion from neighbors.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
              { title: 'Award-Winning Design', body: 'Blue Heron homes at Dragon Rock have won multiple architecture and design awards. The Desert Contemporary aesthetic has become a defining style of Las Vegas luxury.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><line x1="8" y1="6" x2="8" y2="6.01"/><line x1="12" y1="6" x2="12" y2="6.01"/><line x1="16" y1="6" x2="16" y2="6.01"/><line x1="8" y1="10" x2="8" y2="10.01"/><line x1="12" y1="10" x2="12" y2="10.01"/><line x1="16" y1="10" x2="16" y2="10.01"/><line x1="8" y1="14" x2="8" y2="14.01"/><line x1="12" y1="14" x2="12" y2="14.01"/><line x1="16" y1="14" x2="16" y2="14.01"/></svg> },
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
            <h2>Parks &amp; Recreation Near Dragon Rock</h2>
          </div>
          <div className="parks-grid">
            {[
              { name: 'DragonRidge Country Club', address: '552 S Stephanie St, Henderson, NV 89012', acreage: '~200 acres', amenities: ["18-hole championship course","Full-service clubhouse","Resort-style pools","Tennis courts","Fitness center"] },
              { name: 'McCullough Hills Trail', address: 'McCullough Hills Trailhead, Henderson, NV 89012', acreage: '~1,500 acres', amenities: ["Desert hiking","Mountain biking","Panoramic overlooks","Wildlife viewing"] },
              { name: 'Anthem Hills Park', address: '2811 Reunion Dr, Henderson, NV 89052', acreage: '~8 acres', amenities: ["Walking paths","Playground","Basketball courts","Picnic shelters","Open turf"] },
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
            <h2>The Dragon Rock Lifestyle</h2>
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
              <div className="lifestyle-v2-stat">30 homesites</div>
              <div className="lifestyle-v2-label">Homes</div>
            </div>
            <div className="lifestyle-v2-item">
              <div className="lifestyle-v2-icon"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 2v10l7 4"/></svg></div>
              <div className="lifestyle-v2-stat">2016</div>
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
            <h2>HOA Information for Dragon Rock</h2>
          </div>
          <div className="hoa-grid">
            <div className="hoa-fees-col">
              <h3>Fees &amp; Management</h3>
              <div className="hoa-fee-row"><span>Monthly HOA Range</span><strong>$800–$2,000/mo</strong></div>
              <div className="hoa-fee-row"><span>Guard-Gated</span><strong>Yes — staffed gate</strong></div>
              <div className="hoa-fee-row"><span>Community Type</span><strong>Double Guard-Gated · Ultra-Luxury</strong></div>
              <div className="hoa-management">
                <p className="hoa-mgmt-label">Management</p>
                <p className="hoa-mgmt-value">MacDonald Highlands Master Association + Sub-HOA</p>
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
            <h2>Schools Serving Dragon Rock</h2>
          </div>
          <div className="schools-v2-table">
            <div className="schools-v2-header">
              <span>School Name</span>
              <span>Grades</span>
              <span>Rating</span>
            </div>
            {[
              ['John C. Vanderburg Elementary', 'K–5', '8/10'],
              ['Del E. Webb Middle School', '6–8', '7/10'],
              ['Coronado High School', '9–12', '6/10'],
              ['Henderson International School', 'PreK–12', 'A'],
              ['Bishop Gorman High School', '9–12', 'A+'],
              ['The Meadows School', 'PreK–12', 'A+'],
              ['Doral Academy of Nevada', 'K–8', '9/10'],
              ['Pinecrest Academy of Nevada', 'K–12', 'A'],
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
            <h2>What Dragon Rock Buyers Say</h2>
          </div>
          <div className="testimonials-grid">
            {[
              { quote: 'Nevada Real Estate Group is the team you want when buying at the Dragon Rock level. They understood the Blue Heron design process, knew every lot position, and handled the transaction with the discretion our family requires. Exceptional.', name: 'William & Catherine P.', detail: 'Bought in Dragon Rock · 2024' },
              { quote: 'Our Dragon Rock estate is a work of art, and Nevada Real Estate Group helped us find it. They had access to off-market opportunities and negotiated terms that saved us significantly. True luxury real estate professionals.', name: 'Alexander M.', detail: 'Bought in Dragon Rock · 2025' },
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

      <DragonRockFAQ />

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
              { name: 'MacDonald Highlands', href: '/macdonald-highlands/', price: 'From $800K', compare: 'The broader luxury community where Dragon Rock is located, with DragonRidge Country Club.' },
              { name: 'Ascaya', href: '/ascaya/', price: 'From $3M', compare: 'Ultra-luxury custom lot community on the McCullough Range ridgeline.' },
              { name: 'Anthem Country Club', href: '/anthem-country-club/', price: 'From $1.2M', compare: 'Guard-gated golf community in Henderson with Hale Irwin course.' },
              { name: 'The Ridges', href: '/summerlin-the-ridges/', price: 'From $2M', compare: 'Summerlin\'s ultra-luxury guard-gated enclave with Bear\'s Best golf.' },
              { name: 'The Summit Club', href: '/the-summit-club/', price: 'From $5M', compare: 'Las Vegas\' most exclusive private community with Tom Fazio golf.' },
              { name: 'Seven Hills', href: '/seven-hills/', price: 'From $500K', compare: 'Guard-gated Henderson community with Rio Secco golf nearby.' },
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
              <h2>Ready to Find Your Dragon Rock Home?</h2>
              <p>Nevada Real Estate Group is the #1 real estate team in Nevada. Whether you&apos;re buying or selling in Dragon Rock, let&apos;s talk.</p>
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
                <input type="hidden" name="_subject" value="Dragon Rock Inquiry — LasVegasHomeSearchExperts.com" />
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
