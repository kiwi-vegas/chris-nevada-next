import OlympiaRidgeFAQ from '@/components/OlympiaRidgeFAQ'
import Link from 'next/link'
import type { Metadata } from 'next'
import OlympiaRidgeMapWrapper from '@/components/OlympiaRidgeMapWrapper'
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
    { '@type': 'ListItem', position: 3, name: 'Olympia Ridge', item: 'https://www.lasvegashomesearchexperts.com/olympia-ridge/' },
  ],
}

const FAQ_DATA = [
  {
    "q": "What is the price range for homes in Olympia Ridge?",
    "a": "Homes in Olympia Ridge range from approximately $1.5 million for resale semi-custom residences to over $5 million for newer custom estates on premium golf course lots with panoramic mountain and fairway views."
  },
  {
    "q": "Is Olympia Ridge guard-gated?",
    "a": "Yes — Olympia Ridge is double guard-gated. The community has its own 24-hour staffed guard gate within the larger Southern Highlands guard-gated master plan, providing two layers of security."
  },
  {
    "q": "What golf course is in Olympia Ridge?",
    "a": "Olympia Ridge sits along the Southern Highlands Golf Club, a private championship course redesigned by Jack Nicklaus. Many homes have direct fairway frontage. Membership is by application and not included with home purchase."
  },
  {
    "q": "How does Olympia Ridge compare to The Ridges?",
    "a": "Both are ultra-luxury guard-gated golf communities. The Ridges (Summerlin) backs against Red Rock Canyon and commands higher per-square-foot prices. Olympia Ridge offers comparable quality with larger lots and lower prices per square foot, plus a 15-minute airport commute versus 30+ minutes from The Ridges."
  },
  {
    "q": "What are HOA fees in Olympia Ridge?",
    "a": "HOA fees in Olympia Ridge typically range from $300 to $800 per month, which includes the Southern Highlands master association fee plus the Olympia Ridge sub-association fee. Fees cover guard gate staffing, security patrols, and common area maintenance."
  },
  {
    "q": "What ZIP code is Olympia Ridge in?",
    "a": "Olympia Ridge is located in ZIP code 89141 in the Southern Highlands area of Las Vegas, Nevada."
  },
  {
    "q": "Is Olympia Ridge a good investment?",
    "a": "Olympia Ridge benefits from the same fundamentals that make all of Southern Highlands attractive — guard-gated prestige, private golf club anchoring, limited lot inventory, and consistent demand from executives and high-net-worth buyers. The community has demonstrated strong appreciation and holds value well through market cycles."
  },
  {
    "q": "What is Olympia Ridge Estates?",
    "a": "Olympia Ridge Estates is the most exclusive section within Olympia Ridge, featuring the largest custom lots (half-acre+) with the most direct golf course views and the highest price points, typically starting above $3 million."
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
  name: 'Olympia Ridge',
  description: 'Olympia Ridge is a guard-gated · ultra-luxury · golf community in Las Vegas, Nevada.',
  geo: { '@type': 'GeoCoordinates', latitude: 35.98, longitude: -115.2 },
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
  const cms = await getCommunityPage('olympia-ridge')
  return {
    title: cms?.metaTitle ?? 'Olympia Ridge Homes for Sale | Nevada Real Estate Group',
    description: cms?.metaDescription ?? 'Browse Olympia Ridge homes for sale in Las Vegas, NV. $1.5M–$5M+. Schools, HOA, market stats. Nevada Real Estate Group.',
    alternates: { canonical: 'https://www.lasvegashomesearchexperts.com/olympia-ridge' },
  }
}

export default async function OlympiaRidgePage() {
  const cms = await getCommunityPage('olympia-ridge')
  const market = getMarketStats('olympia-ridge')
  const ms = market?.stats

  const heroHeadline = cms?.heroHeadline ?? 'Olympia Ridge'
  const heroSubtitle = 'Homes for Sale in Las Vegas, Nevada'
  const overviewTitle = cms?.overviewTitle ?? 'Olympia Ridge: Guard-Gated · Ultra-Luxury · Golf Living in Las Vegas'

  const HARDCODED_STATS: Array<[string, string] | [string, string, string]> = [
    ['Established', '2003'],
    ['Developer', 'Olympia Group'],
    ['Total Acreage', '180 acres'],
    ['Homes', '250+'],
    ['Median Home Price', ms?.medianSalePrice ?? '$1.5M–$5M+'],
    ['ZIP Codes', '89141'],
    ['Guard-Gated', 'Yes'],
    ['HOA', '$300–$800/mo'],
  ]
  const displayStats = mergeQuickStats(HARDCODED_STATS, cms?.quickStats)
  const HARDCODED_DRIVE_TIMES = [
    {
        "time": "~20 min",
        "destination": "to the Strip",
        "route": "via I-15 N"
    },
    {
        "time": "~15 min",
        "destination": "to Harry Reid Airport",
        "route": "via I-15 N → I-215 W"
    },
    {
        "time": "~15 min",
        "destination": "to Henderson",
        "route": "via I-215 E"
    },
    {
        "time": "~35 min",
        "destination": "to Summerlin",
        "route": "via I-215 W"
    },
    {
        "time": "~4.5 hrs",
        "destination": "to Los Angeles",
        "route": "via I-15 S"
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
          <span>Olympia Ridge</span>
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
                <span className="hero-v2-stat-num">{ms?.medianSalePrice ?? qs('Median Home Price', '$1.5M–$5M+')}</span>
                <span className="hero-v2-stat-lbl">Median Sale Price</span>
              </div>
              <div className="hero-v2-stat">
                <span className="hero-v2-stat-num">{ms?.avgDaysToClose ?? qs('Avg Days on Market', '45')}</span>
                <span className="hero-v2-stat-lbl">Avg Days to Close</span>
              </div>
            </div>
            <a href="#listings" className="hero-v2-cta">Search Homes in Olympia Ridge</a>
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
              <span><strong>Type:</strong> Guard-Gated · Ultra-Luxury · Golf</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
              <span><strong>Price Range:</strong> $1.5M–$5M+</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
              <span><strong>HOA:</strong> $300–$800/mo</span>
            </div>
          </div>
          <div className="hero-v2-qfb-est">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            <span>Est. 2003</span>
          </div>
        </div>
      </div>

      <section id="demographics" className="demographics-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Demographics</span>
            <h2>Olympia Ridge Demographics</h2>
          </div>
          <div className="demo-grid">
            {[
              ['700+', 'Population'],
              ['48', 'Median Age'],
              ['$275,000+', 'Avg Household Income'],
              ['250+', 'Total Households'],
              ['93%', 'Homeownership Rate'],
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
            <h2>Where is Olympia Ridge?</h2>
            <p>Southern Highlands, Las Vegas &mdash; Las Vegas, Nevada.</p>
          </div>
          <div className="map-container">
            <OlympiaRidgeMapWrapper />
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
            <h2 className="listings-title">NEW OLYMPIA RIDGE LISTINGS</h2>
          </div>
          <div className="ylopo-wrap">
            <div className="YLOPO_searchWidget" />
            <div className="YLOPO_resultsWidget" data-search='{"propertyTypes":["house","condo","townhouse"],"minPrice":1500000,"locations":[{"city":"Las Vegas","state":"NV"}],"limit":12,"sortBy":"listDate","sortOrder":"desc","keywords":"Olympia Ridge","zipCodes":["89141"]}' />
          </div>
          <p className="ylopo-note">Listing data sourced from regional MLS. Information deemed reliable but not guaranteed. Updated daily.</p>
          <div className="listings-actions">
            <a href="https://search.nevadarealestategroup.net/search?s[orderBy]=sourceCreationDate%2Cdesc&s[page]=1&s[locations][0][city]=Las%20Vegas&s[locations][0][state]=NV&s[keywords]=Olympia%20Ridge" target="_blank" rel="noopener noreferrer" className="btn-gold">View All Olympia Ridge Listings &rarr;</a>
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
                  <p>Olympia Ridge is an ultra-luxury guard-gated enclave within Southern Highlands, positioned along the most coveted fairways of the Southern Highlands Golf Club. Developed by the Olympia Group, the community was conceived as a premier residential address for buyers who demand golf course living, privacy, and architectural distinction — without the Summerlin price premium that communities like The Ridges command.</p>
                  <p>Homes in Olympia Ridge range from approximately $1.5 million for resale semi-custom residences to over $5 million for newer custom estates on premium golf course lots. The architectural character is predominantly Mediterranean and Tuscan-inspired, though newer builds have introduced contemporary desert and transitional styles. Homes typically range from 4,000 to 10,000+ square feet, with many featuring expansive outdoor living spaces, infinity pools, and covered loggias overlooking the Jack Nicklaus-redesigned championship course.</p>
                  <p>The community's guard gate provides an additional layer of security beyond the Southern Highlands master community gates, creating a double-gated environment that appeals to executives, entertainers, and high-net-worth families. The proximity to the Southern Highlands Golf Club is Olympia Ridge's defining advantage — many homes have direct fairway views, and the clubhouse, dining facilities, and practice areas are within a short cart ride or walk.</p>
                  <p>Location is another significant draw. Harry Reid International Airport is approximately 15 minutes away, the Las Vegas Strip is 20 minutes north via I-15, and Henderson's retail and dining corridor along St. Rose Parkway is 15 minutes east. For luxury buyers who want private golf community living with genuine convenience, Olympia Ridge delivers at price points that represent strong value relative to comparable Summerlin guard-gated addresses.</p>
                </>
              )}
            </div>
            <div className="overview-aside">
              <div className="quick-facts">
                <h3>Olympia Ridge At a Glance</h3>
                {displayStats.map(([label, value, cls]: any) => (
                  <div className="fact-row" key={label}>
                    <span className="fact-label">{label}</span>
                    <span className={`fact-value${cls ? ' ' + cls : ''}`}>{value}</span>
                  </div>
                ))}
              </div>
              <div className="cta-card">
                <p>Ready to explore Olympia Ridge? Schedule a private tour of the community and the current listings that match your goals.</p>
                <a href="tel:+17252399950" className="btn-gold">Call 725.239.9950</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="highlights">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Why Olympia Ridge</span>
            <h2>What Makes Olympia Ridge Stand Out</h2>
          </div>
          <div className="highlights-grid">
            {[
              { title: 'Nicklaus Golf Club Frontage', body: 'Direct frontage along the Southern Highlands Golf Club, a private championship course redesigned by Jack Nicklaus. Fairway and mountain views from nearly every estate.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 2v10l7 4"/></svg> },
              { title: 'Double Guard-Gated Privacy', body: 'Protected by its own guard gate within the already guard-gated Southern Highlands community. Two layers of 24-hour staffed security for maximum privacy.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
              { title: 'Semi-Custom & Custom Estates', body: 'Homes range from 4,000 to 10,000+ square feet with premium finishes, resort-style pools, and expansive outdoor living. Both resale and custom build opportunities.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
              { title: '15-Minute Airport Commute', body: 'One of the closest luxury communities to Harry Reid International Airport — a critical advantage for executives and frequent business travelers.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><line x1="8" y1="6" x2="8" y2="6.01"/><line x1="12" y1="6" x2="12" y2="6.01"/><line x1="16" y1="6" x2="16" y2="6.01"/><line x1="8" y1="10" x2="8" y2="10.01"/><line x1="12" y1="10" x2="12" y2="10.01"/><line x1="16" y1="10" x2="16" y2="10.01"/><line x1="8" y1="14" x2="8" y2="14.01"/><line x1="12" y1="14" x2="12" y2="14.01"/><line x1="16" y1="14" x2="16" y2="14.01"/></svg> },
              { title: 'Mountain & Valley Views', body: 'Elevated positions within Olympia Ridge offer panoramic views of the Spring Mountains, the Las Vegas Strip skyline, and the manicured fairways of the golf course.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M8 21l4-11 4 11"/><path d="M2 21l5-14 4 8"/><path d="M14 15l4-8 4 14"/><line x1="2" y1="21" x2="22" y2="21"/></svg> },
              { title: 'Strong Value Proposition', body: 'Comparable quality to Summerlin\'s ultra-luxury communities at notably lower per-square-foot prices. One of the best value plays in Las Vegas luxury real estate.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg> },
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
            <h2>Parks &amp; Recreation Near Olympia Ridge</h2>
          </div>
          <div className="parks-grid">
            {[
              { name: 'Southern Highlands Golf Club', address: '1 Robert Trent Jones Ln, Las Vegas, NV 89141', acreage: '250+ acres', amenities: ["Championship golf course","Clubhouse dining","Practice facilities","Fitness center","Swimming pool","Tennis courts"] },
              { name: 'Southern Highlands Community Park', address: '11701 Southern Highlands Pkwy, Las Vegas, NV 89141', acreage: '~15 acres', amenities: ["Walking trails","Playground","Picnic areas","Basketball courts","Open space"] },
              { name: 'Olympia Ridge Private Green Space', address: 'Within Olympia Ridge gates, Las Vegas, NV 89141', acreage: '~8 acres', amenities: ["Walking paths","Manicured landscaping","Pocket parks","Open space"] },
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
            <h2>The Olympia Ridge Lifestyle</h2>
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
              <div className="lifestyle-v2-stat">250+</div>
              <div className="lifestyle-v2-label">Homes</div>
            </div>
            <div className="lifestyle-v2-item">
              <div className="lifestyle-v2-icon"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 2v10l7 4"/></svg></div>
              <div className="lifestyle-v2-stat">2003</div>
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
            <h2>HOA Information for Olympia Ridge</h2>
          </div>
          <div className="hoa-grid">
            <div className="hoa-fees-col">
              <h3>Fees &amp; Management</h3>
              <div className="hoa-fee-row"><span>Monthly HOA Range</span><strong>$300–$800/mo</strong></div>
              <div className="hoa-fee-row"><span>Guard-Gated</span><strong>Yes — staffed gate</strong></div>
              <div className="hoa-fee-row"><span>Community Type</span><strong>Guard-Gated · Ultra-Luxury · Golf</strong></div>
              <div className="hoa-management">
                <p className="hoa-mgmt-label">Management</p>
                <p className="hoa-mgmt-value">Southern Highlands Master Association + Sub-HOA</p>
              </div>
              <p style={{ marginTop: '16px', fontSize: '11px', color: 'var(--text-faint)', fontStyle: 'italic' }}>HOA fees are subject to change. Verify current fees with the management company before purchase.</p>
            </div>
            <div className="hoa-amenities-col">
              <h3>What HOA Typically Covers</h3>
              <ul className="hoa-amenity-list">
                {['24-hour guard gate staffing and security patrols','Common area landscaping and maintenance','Community parks and trail maintenance','Neighborhood street maintenance','Perimeter wall and gate maintenance','Exterior architectural standards enforcement','Reserve fund contributions','Golf course common area adjacency'].map((a: string) => <li key={a}>{a}</li>)}
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
            <h2>Schools Serving Olympia Ridge</h2>
          </div>
          <div className="schools-v2-table">
            <div className="schools-v2-header">
              <span>School Name</span>
              <span>Grades</span>
              <span>Rating</span>
            </div>
            {[
              ['Liberty High School', '9–12', '7/10'],
              ['Del E. Webb Middle School', '6–8', '8/10'],
              ['Elise L. Wolff Elementary', 'K–5', '8/10'],
              ['Faith Lutheran Middle & High', '6–12', 'A'],
              ['Bishop Gorman High School', '9–12', 'A+'],
              ['Desert Christian Academy', 'K–12', 'B+'],
              ['Pinecrest Academy of Nevada', 'PreK–12', '9/10'],
              ['Doral Academy', 'K–8', '8/10'],
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
            <h2>What Olympia Ridge Buyers Say</h2>
          </div>
          <div className="testimonials-grid">
            {[
              { quote: 'We compared Olympia Ridge to The Ridges and several Henderson luxury communities. Dollar for dollar, Olympia Ridge gave us the best combination of golf frontage, lot size, and privacy. The team at Nevada Real Estate Group helped us see the value clearly.', name: 'Michael & Susan T.', detail: 'Bought in Olympia Ridge · 2024' },
              { quote: 'Sold our Olympia Ridge estate in 45 days at 97% of asking. The marketing was exceptional — professional photography, drone video, and targeted outreach to luxury buyers. They understand how to position a high-end property.', name: 'Patricia D.', detail: 'Sold in Olympia Ridge · 2025' },
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

      <OlympiaRidgeFAQ />

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
              { name: 'Southern Highlands', href: '/southern-highlands/', price: 'From $500K', compare: 'The broader master-planned community. Guard-gated with Arnold Palmer private golf club.' },
              { name: 'The Estates at Southern Highlands', href: '/southern-highlands-the-estates/', price: 'From $2M', compare: 'Southern Highlands\' other premier enclave with the largest custom estate lots.' },
              { name: 'Tuscan Cliffs', href: '/tuscan-cliffs/', price: 'From $800K', compare: 'Guard-gated Southern Highlands enclave with Mediterranean architecture at more accessible prices.' },
              { name: 'The Ridges', href: '/summerlin-the-ridges/', price: 'From $2M', compare: 'Summerlin\'s ultra-luxury guard-gated community with Bear\'s Best golf and Red Rock Canyon views.' },
              { name: 'Spanish Trail', href: '/spanish-trail/', price: 'From $500K', compare: 'Nearby guard-gated golf community with a broader price range and established character.' },
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
              <h2>Ready to Find Your Olympia Ridge Home?</h2>
              <p>Nevada Real Estate Group is the #1 real estate team in Nevada. Whether you&apos;re buying or selling in Olympia Ridge, let&apos;s talk.</p>
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
                <input type="hidden" name="_subject" value="Olympia Ridge Inquiry — LasVegasHomeSearchExperts.com" />
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
