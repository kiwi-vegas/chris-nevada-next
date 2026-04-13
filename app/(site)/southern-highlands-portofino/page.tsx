import SouthernHighlandsPortofinoFAQ from '@/components/SouthernHighlandsPortofinoFAQ'
import Link from 'next/link'
import type { Metadata } from 'next'
import SouthernHighlandsPortofinoMapWrapper from '@/components/SouthernHighlandsPortofinoMapWrapper'
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
    { '@type': 'ListItem', position: 3, name: 'Portofino at Southern Highlands', item: 'https://www.lasvegashomesearchexperts.com/southern-highlands-portofino/' },
  ],
}

const FAQ_DATA = [
  {
    "q": "What is the price range for homes in Portofino at Southern Highlands?",
    "a": "Homes in Portofino range from approximately $600,000 for entry-level homes within the enclave to $1.5 million for premium estate-sized homes on view lots."
  },
  {
    "q": "Is Portofino guard-gated?",
    "a": "Yes — Portofino is double guard-gated. Residents pass through the Southern Highlands community guard gate and then a second Portofino-specific gate. Both are staffed 24 hours."
  },
  {
    "q": "What is the architectural style in Portofino?",
    "a": "Portofino features Mediterranean and Tuscan-inspired architecture with stucco exteriors, clay tile roofs, arched entryways, wrought-iron accents, and lush landscaping. The streetscapes are designed to evoke an Italian village character."
  },
  {
    "q": "What ZIP code is Portofino in?",
    "a": "Portofino at Southern Highlands is located in ZIP code 89141 in southwest Las Vegas. Home prices range from $600K–$1.5M."
  },
  {
    "q": "What are HOA fees in Portofino?",
    "a": "HOA fees typically range from $250 to $550 per month, covering the Southern Highlands master association fee plus the Portofino sub-association fee. Fees include guard gate staffing, security, common area maintenance, and landscaping."
  },
  {
    "q": "How does Portofino compare to Tuscan Cliffs?",
    "a": "Both are guard-gated enclaves within Southern Highlands. Tuscan Cliffs features more dramatic hillside lots and higher price points ($800K–$3M), while Portofino offers a more accessible entry point ($600K–$1.5M) with a warm Mediterranean village atmosphere and mature landscaping."
  },
  {
    "q": "Is golf membership required in Portofino?",
    "a": "No. Golf club membership at the Southern Highlands Golf Club is optional and available by application. Many Portofino residents enjoy the club's dining, fitness, and social amenities without being golfers."
  },
  {
    "q": "What schools serve Portofino?",
    "a": "Portofino is served by CCSD schools including John R. Hummel Elementary (8/10) and Del E. Webb Middle School (7/10). Bishop Gorman High School (A+) is the top private option in the area."
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
    "a": "Most guard-gated communities include perimeter walls, security patrols, surveillance cameras at entry points, and emergency response coordination. Some communities also offer interior patrol routes and resident notification systems. Portofino at Southern Highlands features a 24-hour staffed guard gate with controlled vehicle access, security patrols, and perimeter walls."
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
  name: 'Portofino at Southern Highlands',
  description: 'Portofino at Southern Highlands is a guard-gated · luxury community in Las Vegas, Nevada (ZIP 89141), established in 2002 by Olympia Group, spanning ~120 acres. Home prices range from $600K–$1.5M.',
  geo: { '@type': 'GeoCoordinates', latitude: 35.999, longitude: -115.248 },
  address: { '@type': 'PostalAddress', addressLocality: 'Las Vegas', addressRegion: 'NV', postalCode: '89141', addressCountry: 'US' },
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
  const cms = await getCommunityPage('southern-highlands-portofino')
  return {
    title: cms?.metaTitle ?? 'Portofino at Southern Highlands Homes for Sale | Nevada Real Estate Group',
    description: cms?.metaDescription ?? 'Browse Portofino at Southern Highlands homes for sale in Las Vegas, NV. $600K–$1.5M. Schools, HOA, market stats. Nevada Real Estate Group.',
    alternates: { canonical: 'https://www.lasvegashomesearchexperts.com/southern-highlands-portofino' },
  }
}

export default async function SouthernHighlandsPortofinoPage() {
  const cms = await getCommunityPage('southern-highlands-portofino')
  const market = getMarketStats('southern-highlands-portofino')
  const ms = market?.stats

  const heroHeadline = cms?.heroHeadline ?? 'Portofino at Southern Highlands'
  const heroSubtitle = 'Homes for Sale in Las Vegas, Nevada'
  const overviewTitle = cms?.overviewTitle ?? 'Portofino at Southern Highlands: Guard-Gated · Luxury Living in Las Vegas'

  const HARDCODED_STATS: Array<[string, string] | [string, string, string]> = [
    ['Established', '2002'],
    ['Developer', 'Olympia Group'],
    ['Total Acreage', '~120 acres'],
    ['Homes', '400+'],
    ['Median Home Price', ms?.medianSalePrice ?? '$600K–$1.5M'],
    ['ZIP Codes', '89141'],
    ['Guard-Gated', 'Yes'],
    ['HOA', '$250–$550/mo'],
  ]
  const displayStats = mergeQuickStats(HARDCODED_STATS, cms?.quickStats)
  const HARDCODED_DRIVE_TIMES = [
    {
        "time": "~15 min",
        "destination": "to the Strip",
        "route": "via I-15 North"
    },
    {
        "time": "~20 min",
        "destination": "to Harry Reid Airport",
        "route": "via I-15 → I-215"
    },
    {
        "time": "~25 min",
        "destination": "to Summerlin",
        "route": "via I-215 West"
    },
    {
        "time": "~10 min",
        "destination": "to Mountains Edge",
        "route": "via S Las Vegas Blvd"
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
          <span>Portofino at Southern Highlands</span>
        </div>
      </div>

      <header id="hero" className="summerlin-hero hero-v2">
        <img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&h=700&q=80" alt="Portofino at Southern Highlands community aerial view, Las Vegas Nevada" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
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
                <span className="hero-v2-stat-num">{ms?.medianSalePrice ?? qs('Median Home Price', '$600K–$1.5M')}</span>
                <span className="hero-v2-stat-lbl">Median Sale Price</span>
              </div>
              <div className="hero-v2-stat">
                <span className="hero-v2-stat-num">{ms?.avgDaysToClose ?? qs('Avg Days on Market', '45')}</span>
                <span className="hero-v2-stat-lbl">Avg Days to Close</span>
              </div>
            </div>
            <a href="#listings" className="hero-v2-cta">Search Homes in Portofino at Southern Highlands</a>
          </div>
        </div>
      </header>

      <div className="hero-v2-qfb">
        <div className="container">
          <div className="hero-v2-qfb-row">
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <span><strong>ZIP:</strong> 89141</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              <span><strong>Type:</strong> Guard-Gated · Luxury</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
              <span><strong>Price Range:</strong> $600K–$1.5M</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
              <span><strong>HOA:</strong> $250–$550/mo</span>
            </div>
          </div>
          <div className="hero-v2-qfb-est">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            <span>Est. 2002</span>
          </div>
        </div>
      </div>

      <section id="demographics" className="demographics-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Demographics</span>
            <h2>Portofino at Southern Highlands Demographics</h2>
          </div>
          <div className="demo-grid">
            {[
              ['~1,200', 'Population'],
              ['45', 'Median Age'],
              ['$165,000', 'Avg Household Income'],
              ['400+', 'Total Households'],
              ['88%', 'Homeownership Rate'],
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
            <h2>Where is Portofino at Southern Highlands?</h2>
            <p>Southern Highlands, Las Vegas &mdash; Las Vegas, Nevada.</p>
          </div>
          <div className="map-container">
            <SouthernHighlandsPortofinoMapWrapper />
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
            <h2 className="listings-title">NEW PORTOFINO AT SOUTHERN HIGHLANDS LISTINGS</h2>
          </div>
          <div className="ylopo-wrap">
            <div className="YLOPO_searchWidget" />
            <div className="YLOPO_resultsWidget" data-search='{"propertyTypes":["house","condo","townhouse"],"minPrice":600000,"locations":[{"city":"Las Vegas","state":"NV"}],"limit":12,"sortBy":"listDate","sortOrder":"desc","keywords":"Southern Highlands","zipCodes":["89141"]}' />
          </div>
          <p className="ylopo-note">Listing data sourced from regional MLS. Information deemed reliable but not guaranteed. Updated daily.</p>
          <div className="listings-actions">
            <a href="https://search.nevadarealestategroup.net/search?s[orderBy]=sourceCreationDate%2Cdesc&s[page]=1&s[locations][0][city]=Las%20Vegas&s[locations][0][state]=NV&s[keywords]=Southern%20Highlands" target="_blank" rel="noopener noreferrer" className="btn-gold">View All Portofino at Southern Highlands Listings &rarr;</a>
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
                  <p>Portofino at Southern Highlands is a guard-gated · luxury community within Southern Highlands in Las Vegas, Nevada (ZIP 89141), established in 2002, developed by Olympia Group, spanning ~120 acres. Portofino at Southern Highlands is one of the most sought-after guard-gated enclaves within the Southern Highlands master-planned community. Named after the Italian Riviera fishing village, Portofino captures a Mediterranean lifestyle aesthetic with Tuscan-inspired architecture, lush landscaping, and tree-lined streets that create a warm, inviting atmosphere unique among Las Vegas luxury communities.</p>
                  <p>Behind its staffed guard gate within the already-gated Southern Highlands community, Portofino features approximately 400 homes ranging from $600,000 to $1.5 million. Homes typically range from 2,800 to 5,500 square feet, with floor plans featuring grand foyers, formal living and dining rooms, gourmet kitchens, and expansive rear yards with room for resort-style pools. The architectural standards emphasize Mediterranean and Tuscan design elements — stucco exteriors, tile roofs, arched entryways, and wrought-iron details.</p>
                  <p>What distinguishes Portofino from the higher-priced enclaves within Southern Highlands is its balance of luxury and accessibility. Buyers get double guard-gated security, the Mediterranean character, and access to the broader Southern Highlands amenity package — including proximity to the private Jack Nicklaus Golf Club — at price points that are significantly more accessible than The Estates, Olympia Ridge, or Tuscan Cliffs.</p>
                  <p>Portofino residents enjoy all the benefits of the Southern Highlands location: 15 minutes to the Strip via I-15, 20 minutes to Harry Reid Airport, top-rated schools in the CCSD southwest cluster, and the Southern Highlands commercial corridor with grocery, dining, and retail along Southern Highlands Parkway. For buyers seeking guard-gated Mediterranean luxury in one of Las Vegas's most established master-planned communities, Portofino represents outstanding value.</p>
                </>
              )}
            </div>
            <div className="overview-aside">
              <div className="quick-facts">
                <h3>Portofino at Southern Highlands At a Glance</h3>
                {displayStats.map(([label, value, cls]: any) => (
                  <div className="fact-row" key={label}>
                    <span className="fact-label">{label}</span>
                    <span className={`fact-value${cls ? ' ' + cls : ''}`}>{value}</span>
                  </div>
                ))}
              </div>
              <div className="cta-card">
                <p>Ready to explore Portofino at Southern Highlands? Schedule a private tour of the community and the current listings that match your goals.</p>
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
            <h2>Top 7 Facts About Portofino at Southern Highlands</h2>
          </div>
          <ol className="top-facts-list">
            <li key={0}>Portofino at Southern Highlands spans ~120 acres in Las Vegas, Nevada (ZIP 89141).</li>
            <li key={1}>Portofino at Southern Highlands was established in 2002 by Olympia Group.</li>
            <li key={2}>Portofino at Southern Highlands contains 400+ homes with prices ranging from $600K–$1.5M.</li>
            <li key={3}>Portofino at Southern Highlands is a guard-gated community with 24-hour staffed entry and security patrols.</li>
            <li key={4}>HOA fees in Portofino at Southern Highlands range from $250–$550/mo per month.</li>
            <li key={5}>Top-rated schools serving Portofino at Southern Highlands include John R. Hummel Elementary (8/10) and Del E. Webb Middle School (7/10).</li>
            <li key={6}>Portofino at Southern Highlands is located ~15 min to the Strip via I-15 North.</li>
          </ol>
        </div>
      </section>

      <section id="highlights">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Why Portofino at Southern Highlands</span>
            <h2>What Makes Portofino at Southern Highlands Stand Out</h2>
          </div>
          <div className="highlights-grid">
            {[
              { title: 'Double Guard-Gated Security', body: 'Portofino sits behind its own staffed guard gate within the already guard-gated Southern Highlands community. Two layers of 24-hour security provide exceptional privacy.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
              { title: 'Mediterranean Architecture', body: 'Tuscan-inspired homes with stucco exteriors, tile roofs, arched entryways, and wrought-iron details. Tree-lined streets and lush landscaping create an Italian Riviera atmosphere.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
              { title: 'Nicklaus Golf Proximity', body: 'Minutes from the Southern Highlands Golf Club, a private Jack Nicklaus Signature championship course with Mediterranean clubhouse, dining, pools, and fitness. Membership by application.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 2v10l7 4"/></svg> },
              { title: 'Luxury at Accessible Pricing', body: 'Guard-gated luxury from $600K — significantly more accessible than comparable enclaves like The Estates or Tuscan Cliffs, while offering the same Southern Highlands prestige.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg> },
              { title: 'Mountain Views', body: 'Many homes enjoy views of the Spring Mountains to the west and the McCullough Range to the south. Elevated lots on the community\'s perimeter offer panoramic valley views.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M8 21l4-11 4 11"/><path d="M2 21l5-14 4 8"/><path d="M14 15l4-8 4 14"/><line x1="2" y1="21" x2="22" y2="21"/></svg> },
              { title: 'Established Community Feel', body: 'With over 400 homes and mature landscaping, Portofino has developed a warm, tight-knit neighborhood character with strong social connections among residents.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><line x1="8" y1="6" x2="8" y2="6.01"/><line x1="12" y1="6" x2="12" y2="6.01"/><line x1="16" y1="6" x2="16" y2="6.01"/><line x1="8" y1="10" x2="8" y2="10.01"/><line x1="12" y1="10" x2="12" y2="10.01"/><line x1="16" y1="10" x2="16" y2="10.01"/><line x1="8" y1="14" x2="8" y2="14.01"/><line x1="12" y1="14" x2="12" y2="14.01"/><line x1="16" y1="14" x2="16" y2="14.01"/></svg> },
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
            <h2>Parks &amp; Recreation Near Portofino at Southern Highlands</h2>
          </div>
          <div className="parks-grid">
            {[
              { name: 'Southern Highlands Community Park', address: '11701 Southern Highlands Pkwy, Las Vegas, NV 89141', acreage: '~15 acres', amenities: ["Resort-style pool","Playground","Basketball courts","Walking trails","Picnic areas"] },
              { name: 'Olympia Ridge Park', address: 'Olympia Ridge Pkwy, Las Vegas, NV 89141', acreage: '~10 acres', amenities: ["Open turf","Walking paths","Playground","Shade structures","Desert landscape trails"] },
              { name: 'Sloan Canyon National Conservation Area', address: 'Near S Las Vegas Blvd, Henderson, NV', acreage: '48,438 acres', amenities: ["Petroglyph hiking","Desert trails","Wildlife viewing","Photography","Rock art"] },
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
            <h2>The Portofino at Southern Highlands Lifestyle</h2>
          </div>
          <div className="lifestyle-v2-grid">
            <div className="lifestyle-v2-item">
              <div className="lifestyle-v2-icon"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg></div>
              <div className="lifestyle-v2-stat">~15 min</div>
              <div className="lifestyle-v2-label">to the Strip</div>
            </div>
            <div className="lifestyle-v2-item">
              <div className="lifestyle-v2-icon"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22c4-4 8-7.5 8-12a8 8 0 10-16 0c0 4.5 4 8 8 12z"/><circle cx="12" cy="10" r="3"/></svg></div>
              <div className="lifestyle-v2-stat">3+</div>
              <div className="lifestyle-v2-label">Nearby Parks</div>
            </div>
            <div className="lifestyle-v2-item">
              <div className="lifestyle-v2-icon"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg></div>
              <div className="lifestyle-v2-stat">400+</div>
              <div className="lifestyle-v2-label">Homes</div>
            </div>
            <div className="lifestyle-v2-item">
              <div className="lifestyle-v2-icon"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 2v10l7 4"/></svg></div>
              <div className="lifestyle-v2-stat">2002</div>
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
            <h2>HOA Information for Portofino at Southern Highlands</h2>
          </div>
          <div className="hoa-grid">
            <div className="hoa-fees-col">
              <h3>Fees &amp; Management</h3>
              <div className="hoa-fee-row"><span>Monthly HOA Range</span><strong>$250–$550/mo</strong></div>
              <div className="hoa-fee-row"><span>Guard-Gated</span><strong>Yes — staffed gate</strong></div>
              <div className="hoa-fee-row"><span>Community Type</span><strong>Guard-Gated · Luxury</strong></div>
              <div className="hoa-management">
                <p className="hoa-mgmt-label">Management</p>
                <p className="hoa-mgmt-value">Southern Highlands Master Association + Sub-HOA</p>
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
            <h2>Schools Serving Portofino at Southern Highlands</h2>
          </div>
          <div className="schools-v2-table">
            <div className="schools-v2-header">
              <span>School Name</span>
              <span>Grades</span>
              <span>Rating</span>
            </div>
            {[
              ['John R. Hummel Elementary', 'K–5', '8/10'],
              ['Del E. Webb Middle School', '6–8', '7/10'],
              ['Coronado High School', '9–12', '6/10'],
              ['Bishop Gorman High School', '9–12', 'A+'],
              ['Henderson International School', 'PreK–12', 'A'],
              ['Pinecrest Academy of Nevada', 'K–12', 'A'],
              ['Doral Academy Red Rock', 'K–12', '9/10'],
              ['Somerset Academy', 'K–8', '8/10'],
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
            <h2>What Portofino at Southern Highlands Buyers Say</h2>
          </div>
          <div className="testimonials-grid">
            {[
              { quote: 'Portofino gave us everything we wanted — guard-gated security, Mediterranean character, and the Southern Highlands address — at a price point that let us put money into customizing our backyard. Nevada Real Estate Group knew exactly which lots offered the best value.', name: 'Anthony & Lisa M.', detail: 'Bought in Portofino, Southern Highlands · 2024' },
              { quote: 'When we decided to sell in Portofino, Nevada Real Estate Group\'s marketing attracted multiple offers within two weeks. Their knowledge of the Southern Highlands enclaves and what makes each one special was evident in every showing.', name: 'Catherine R.', detail: 'Sold in Portofino, Southern Highlands · 2025' },
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

      <SouthernHighlandsPortofinoFAQ />

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
              { name: 'Southern Highlands', href: '/southern-highlands/', price: 'From $400K', compare: 'The broader master-planned community with Nicklaus golf and multiple guard-gated enclaves at every price point.' },
              { name: 'Tuscan Cliffs', href: '/tuscan-cliffs/', price: 'From $800K', compare: 'Hillside guard-gated enclave within Southern Highlands with dramatic elevation and mountain views.' },
              { name: 'The Estates at SH', href: '/southern-highlands-the-estates/', price: 'From $2M', compare: 'Ultra-luxury custom estate enclave within Southern Highlands on half-acre to full-acre golf course lots.' },
              { name: 'Rhodes Ranch', href: '/rhodes-ranch/', price: 'From $350K', compare: 'Guard-gated golf community to the north with Ted Robinson course and resort amenities.' },
              { name: 'Mountains Edge', href: '/mountains-edge/', price: 'From $350K', compare: 'Adjacent master-planned community with 12,000+ homes and more attainable pricing.' },
              { name: 'Seven Hills', href: '/seven-hills/', price: 'From $500K', compare: 'Guard-gated Henderson community with Rio Secco golf and panoramic Strip views.' },
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
              <h2>Ready to Find Your Portofino at Southern Highlands Home?</h2>
              <p>Nevada Real Estate Group is the #1 real estate team in Nevada. Whether you&apos;re buying or selling in Portofino at Southern Highlands, let&apos;s talk.</p>
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
                <input type="hidden" name="_subject" value="Portofino at Southern Highlands Inquiry — LasVegasHomeSearchExperts.com" />
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
