import EagleRockSummerlinFAQ from '@/components/EagleRockSummerlinFAQ'
import Link from 'next/link'
import type { Metadata } from 'next'
import EagleRockSummerlinMapWrapper from '@/components/EagleRockSummerlinMapWrapper'
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
    { '@type': 'ListItem', position: 3, name: 'Eagle Rock', item: 'https://www.lasvegashomesearchexperts.com/eagle-rock-summerlin/' },
  ],
}

const FAQ_DATA = [
  {
    "q": "What is the price range for homes in Eagle Rock?",
    "a": "Homes in Eagle Rock range from approximately $1 million for semi-custom homes to over $4 million for premium custom estates on elevated lots with panoramic mountain and valley views."
  },
  {
    "q": "Is Eagle Rock guard-gated?",
    "a": "Yes. Eagle Rock is a guard-gated community with a 24-hour staffed guard gate. Approximately 180 homes across 95 acres provide an exclusive, low-density residential environment."
  },
  {
    "q": "What village is Eagle Rock in?",
    "a": "Eagle Rock is located within The Canyons village of the Summerlin North Association. The Canyons is home to several guard-gated luxury enclaves."
  },
  {
    "q": "What ZIP code is Eagle Rock in?",
    "a": "Eagle Rock is located in ZIP code 89144 in the Summerlin North area of Las Vegas."
  },
  {
    "q": "How does Eagle Rock compare to Bellacere?",
    "a": "Both are guard-gated luxury communities in The Canyons. Bellacere starts at $1.5M and reaches $5M+ with the largest custom estates. Eagle Rock starts at $1M and extends to $4M+, offering a slightly more accessible entry point with comparable views and security."
  },
  {
    "q": "What are HOA fees in Eagle Rock?",
    "a": "HOA fees typically range from $400 to $900 per month, covering the Summerlin master association fee plus the Eagle Rock sub-association fee for guard gate staffing, security patrols, and enhanced maintenance."
  },
  {
    "q": "What schools serve Eagle Rock?",
    "a": "Eagle Rock is zoned for CCSD schools including Sig Rogich Middle School (10/10 GreatSchools) and Palo Verde High School (8/10). The Meadows School (A+) and Bishop Gorman High School (A+) are nearby private options."
  },
  {
    "q": "How large are homes in Eagle Rock?",
    "a": "Custom and semi-custom homes in Eagle Rock range from 3,500 to over 8,000 square feet, with 4–6 bedrooms, gourmet kitchens, wine cellars, home theaters, and resort-style outdoor living areas."
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
  name: 'Eagle Rock',
  description: 'Eagle Rock is a guard-gated · luxury community in Las Vegas, Nevada.',
  geo: { '@type': 'GeoCoordinates', latitude: 36.2, longitude: -115.288 },
  address: { '@type': 'PostalAddress', addressLocality: 'Las Vegas', addressRegion: 'NV', postalCode: '89144', addressCountry: 'US' },
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
  const cms = await getCommunityPage('eagle-rock-summerlin')
  return {
    title: cms?.metaTitle ?? 'Eagle Rock Homes for Sale | Nevada Real Estate Group',
    description: cms?.metaDescription ?? 'Browse Eagle Rock homes for sale in Las Vegas, NV. $1M–$4M+. Schools, HOA, market stats. Nevada Real Estate Group.',
    alternates: { canonical: 'https://www.lasvegashomesearchexperts.com/eagle-rock-summerlin' },
  }
}

export default async function EagleRockSummerlinPage() {
  const cms = await getCommunityPage('eagle-rock-summerlin')
  const market = getMarketStats('eagle-rock-summerlin')
  const ms = market?.stats

  const heroHeadline = cms?.heroHeadline ?? 'Eagle Rock'
  const heroSubtitle = 'Homes for Sale in Las Vegas, Nevada'
  const overviewTitle = cms?.overviewTitle ?? 'Eagle Rock: Guard-Gated · Luxury Living in Las Vegas'

  const HARDCODED_STATS: Array<[string, string] | [string, string, string]> = [
    ['Established', '2001'],
    ['Developer', 'Howard Hughes Corporation'],
    ['Total Acreage', '95 acres'],
    ['Homes', '180+'],
    ['Median Home Price', ms?.medianSalePrice ?? '$1M–$4M+'],
    ['ZIP Codes', '89144'],
    ['Guard-Gated', 'Yes'],
    ['HOA', '$400–$900/mo'],
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
        "route": "via W Sahara Ave"
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
          <span>Eagle Rock</span>
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
                <span className="hero-v2-stat-num">{ms?.medianSalePrice ?? qs('Median Home Price', '$1M–$4M+')}</span>
                <span className="hero-v2-stat-lbl">Median Sale Price</span>
              </div>
              <div className="hero-v2-stat">
                <span className="hero-v2-stat-num">{ms?.avgDaysToClose ?? qs('Avg Days on Market', '45')}</span>
                <span className="hero-v2-stat-lbl">Avg Days to Close</span>
              </div>
            </div>
            <a href="#listings" className="hero-v2-cta">Search Homes in Eagle Rock</a>
          </div>
        </div>
      </header>

      <div className="hero-v2-qfb">
        <div className="container">
          <div className="hero-v2-qfb-row">
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <span><strong>ZIP:</strong> 89144</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              <span><strong>Type:</strong> Guard-Gated · Luxury</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
              <span><strong>Price Range:</strong> $1M–$4M+</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
              <span><strong>HOA:</strong> $400–$900/mo</span>
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
            <h2>Eagle Rock Demographics</h2>
          </div>
          <div className="demo-grid">
            {[
              ['550+', 'Population'],
              ['50', 'Median Age'],
              ['$300,000+', 'Avg Household Income'],
              ['180+', 'Total Households'],
              ['94%', 'Homeownership Rate'],
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
            <h2>Where is Eagle Rock?</h2>
            <p>The Canyons, Summerlin &mdash; Las Vegas, Nevada.</p>
          </div>
          <div className="map-container">
            <EagleRockSummerlinMapWrapper />
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
            <h2 className="listings-title">NEW EAGLE ROCK LISTINGS</h2>
          </div>
          <div className="ylopo-wrap">
            <div className="YLOPO_searchWidget" />
            <div className="YLOPO_resultsWidget" data-search='{"propertyTypes":["house","condo","townhouse"],"minPrice":1000000,"locations":[{"city":"Las Vegas","state":"NV"}],"limit":12,"sortBy":"listDate","sortOrder":"desc","keywords":"Eagle Rock Summerlin","zipCodes":["89144"]}' />
          </div>
          <p className="ylopo-note">Listing data sourced from regional MLS. Information deemed reliable but not guaranteed. Updated daily.</p>
          <div className="listings-actions">
            <a href="https://search.nevadarealestategroup.net/search?s[orderBy]=sourceCreationDate%2Cdesc&s[page]=1&s[locations][0][city]=Las%20Vegas&s[locations][0][state]=NV&s[keywords]=Eagle%20Rock%20Summerlin" target="_blank" rel="noopener noreferrer" className="btn-gold">View All Eagle Rock Listings &rarr;</a>
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
                  <p>Eagle Rock is one of The Canyons village's most prestigious guard-gated enclaves, nestled in the upper elevations of Summerlin North with commanding views of Red Rock Canyon, the Spring Mountains, and the Las Vegas Valley. With homes ranging from approximately $1 million to over $4 million, Eagle Rock occupies the luxury tier between Aventura and Bellacere — offering custom and semi-custom estates on generous lots with a level of architectural quality and exclusivity that draws comparisons to The Ridges at a more accessible price point.</p>
                  <p>Custom and semi-custom homes in Eagle Rock range from 3,500 to 8,000+ square feet, featuring high-end finishes including natural stone, hardwood floors, custom ironwork, gourmet kitchens, wine cellars, and home theaters. Many homes were built by prominent Las Vegas luxury builders and architects, resulting in architectural diversity within the community's strict design guidelines. The emphasis on quality over quantity — approximately 180 homes across 95 acres — ensures generous spacing between estates.</p>
                  <p>Eagle Rock's elevated position within The Canyons village provides some of the best views available in Summerlin North. West-facing homes enjoy spectacular sunset views over Red Rock Canyon, while properties on the eastern edge of the community look out over the Las Vegas Valley with Strip views in the distance. The terrain elevation also provides a natural separation from the broader village, enhancing the community's sense of seclusion.</p>
                  <p>For luxury buyers evaluating guard-gated options in Summerlin, Eagle Rock represents an exceptional value. It delivers the custom estate experience, the views, and the guard-gated security that define Summerlin's best communities — at price points significantly below The Ridges. The mature landscaping and established character of the community add a dimension that newer luxury neighborhoods cannot yet offer.</p>
                </>
              )}
            </div>
            <div className="overview-aside">
              <div className="quick-facts">
                <h3>Eagle Rock At a Glance</h3>
                {displayStats.map(([label, value, cls]: any) => (
                  <div className="fact-row" key={label}>
                    <span className="fact-label">{label}</span>
                    <span className={`fact-value${cls ? ' ' + cls : ''}`}>{value}</span>
                  </div>
                ))}
              </div>
              <div className="cta-card">
                <p>Ready to explore Eagle Rock? Schedule a private tour of the community and the current listings that match your goals.</p>
                <a href="tel:+17252399950" className="btn-gold">Call 725.239.9950</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="highlights">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Why Eagle Rock</span>
            <h2>What Makes Eagle Rock Stand Out</h2>
          </div>
          <div className="highlights-grid">
            {[
              { title: 'Custom Estate Living', body: 'Homes from 3,500 to 8,000+ square feet built by prominent Las Vegas luxury builders. Natural stone, hardwood, custom ironwork, wine cellars, and home theaters.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
              { title: 'Guard-Gated Privacy', body: '24-hour staffed guard gate with approximately 180 homes across 95 acres. Generous lot sizes and elevated terrain provide enhanced privacy between estates.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
              { title: 'Commanding Views', body: 'Elevated lots with panoramic views of Red Rock Canyon, the Spring Mountains, and the Las Vegas Valley. Some of the best view corridors available in Summerlin North.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M8 21l4-11 4 11"/><path d="M2 21l5-14 4 8"/><path d="M14 15l4-8 4 14"/><line x1="2" y1="21" x2="22" y2="21"/></svg> },
              { title: 'Mature Community', body: 'Established community with 20+ years of mature landscaping and proven neighborhood stability. A character that new luxury developments cannot replicate.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22c4-4 8-7.5 8-12a8 8 0 10-16 0c0 4.5 4 8 8 12z"/><circle cx="12" cy="10" r="3"/></svg> },
              { title: 'TPC Summerlin Proximity', body: 'Minutes from TPC Summerlin, the PGA Tour championship course. Also close to Downtown Summerlin and Red Rock Canyon.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 2v10l7 4"/></svg> },
              { title: 'Compelling Value', body: 'Guard-gated custom estates in Summerlin from $1M — significantly below The Ridges entry point while delivering comparable quality, views, and lifestyle.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg> },
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
            <h2>Parks &amp; Recreation Near Eagle Rock</h2>
          </div>
          <div className="parks-grid">
            {[
              { name: 'The Canyons Park', address: '9521 W Canyon Run Dr, Las Vegas, NV 89144', acreage: '~10 acres', amenities: ["Playground","Basketball courts","Walking trails","Picnic areas","Open fields"] },
              { name: 'Summerlin Trail System', address: 'Access throughout The Canyons', acreage: 'Connected network', amenities: ["Paved multi-use trails","Desert landscape","Connects to Red Rock Canyon trails","Dog-friendly"] },
              { name: 'Red Rock Canyon NCA', address: '1000 Scenic Loop Dr, Las Vegas, NV 89161', acreage: '195,819 acres', amenities: ["Scenic Loop Drive","Hiking trails","Rock climbing","Visitor center","Wildlife viewing"] },
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
            <h2>The Eagle Rock Lifestyle</h2>
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
              <div className="lifestyle-v2-stat">180+</div>
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
            <h2>HOA Information for Eagle Rock</h2>
          </div>
          <div className="hoa-grid">
            <div className="hoa-fees-col">
              <h3>Fees &amp; Management</h3>
              <div className="hoa-fee-row"><span>Monthly HOA Range</span><strong>$400–$900/mo</strong></div>
              <div className="hoa-fee-row"><span>Guard-Gated</span><strong>Yes — staffed gate</strong></div>
              <div className="hoa-fee-row"><span>Community Type</span><strong>Guard-Gated · Luxury</strong></div>
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
            <h2>Schools Serving Eagle Rock</h2>
          </div>
          <div className="schools-v2-table">
            <div className="schools-v2-header">
              <span>School Name</span>
              <span>Grades</span>
              <span>Rating</span>
            </div>
            {[
              ['John C. Hummel Elementary', 'K–5', '7/10'],
              ['Sig Rogich Middle School', '6–8', '10/10'],
              ['Palo Verde High School', '9–12', '8/10'],
              ['The Meadows School', 'PreK–12', 'A+'],
              ['Bishop Gorman High School', '9–12', 'A+'],
              ['Faith Lutheran Middle & High', '6–12', 'A'],
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
            <h2>What Eagle Rock Buyers Say</h2>
          </div>
          <div className="testimonials-grid">
            {[
              { quote: 'Eagle Rock gave us the custom estate experience we wanted at a price that made sense. The views of Red Rock Canyon from our backyard are breathtaking, and the guard gate gives us real peace of mind. Nevada Real Estate Group showed us every comparable option before we chose Eagle Rock.', name: 'Daniel & Christina R.', detail: 'Bought in Eagle Rock, Summerlin · 2024' },
              { quote: 'We\'d been looking at The Ridges but the entry point was beyond our budget. Eagle Rock delivers 90% of the experience at roughly half the price. The team was honest about the trade-offs and helped us make the right decision.', name: 'Robert M.', detail: 'Bought in Eagle Rock, Summerlin · 2025' },
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

      <EagleRockSummerlinFAQ />

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
              { name: 'The Canyons', href: '/summerlin-the-canyons/', price: 'From $500K', compare: 'The broader village with multiple guard-gated and non-gated neighborhoods.' },
              { name: 'Bellacere', href: '/bellacere/', price: 'From $1.5M', compare: 'Ultra-luxury guard-gated enclave in The Canyons. Higher price ceiling with the largest custom estates.' },
              { name: 'Aventura', href: '/aventura-summerlin/', price: 'From $800K', compare: 'Guard-gated luxury in The Canyons at a more accessible price point.' },
              { name: 'The Ridges', href: '/summerlin-the-ridges/', price: 'From $2M', compare: 'Summerlin\'s ultra-luxury guard-gated community with Bear\'s Best golf.' },
              { name: 'Canyon Fairways', href: '/canyon-fairways/', price: 'From $800K', compare: 'Guard-gated golf community in The Canyons along TPC Summerlin.' },
              { name: 'Summerlin', href: '/summerlin/', price: 'From $450K', compare: 'The broader 22,500-acre master-planned community.' },
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
              <h2>Ready to Find Your Eagle Rock Home?</h2>
              <p>Nevada Real Estate Group is the #1 real estate team in Nevada. Whether you&apos;re buying or selling in Eagle Rock, let&apos;s talk.</p>
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
                <input type="hidden" name="_subject" value="Eagle Rock Inquiry — LasVegasHomeSearchExperts.com" />
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
