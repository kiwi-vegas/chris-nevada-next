import GreenValleyNorthFAQ from '@/components/GreenValleyNorthFAQ'
import Link from 'next/link'
import type { Metadata } from 'next'
import GreenValleyNorthMapWrapper from '@/components/GreenValleyNorthMapWrapper'
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
    { '@type': 'ListItem', position: 3, name: 'Green Valley North', item: 'https://www.lasvegashomesearchexperts.com/green-valley-north/' },
  ],
}

const FAQ_DATA = [
  {
    "q": "What is the price range for homes in Green Valley North?",
    "a": "Homes in Green Valley North range from approximately $400,000 for condos and townhomes to $1.5 million for custom homes along the Legacy Golf Course."
  },
  {
    "q": "Is Green Valley North guard-gated?",
    "a": "No. Green Valley North is an open community, though some individual neighborhoods within it may have gated entries. For guard-gated living in Green Valley, see Legacy at Green Valley or The Fountains."
  },
  {
    "q": "What ZIP codes cover Green Valley North?",
    "a": "Green Valley North spans ZIP codes 89014 and 89074 in Henderson, Nevada. Home prices range from $400K–$1.5M."
  },
  {
    "q": "What golf course is in Green Valley North?",
    "a": "The Legacy Golf Course is the primary course in Green Valley North, winding through the community with many homes enjoying direct fairway frontage. It is a public course with membership options."
  },
  {
    "q": "What schools serve Green Valley North?",
    "a": "Green Valley North is served by CCSD schools including Green Valley High School (8/10), Greenspun Junior High (7/10), and C.T. Sewell Elementary (8/10). Private options include Henderson International School and Bishop Gorman."
  },
  {
    "q": "How does Green Valley North compare to Green Valley South?",
    "a": "Green Valley North is the original community with more mature trees, established character, and generally lower prices. Green Valley South includes newer construction, more guard-gated enclaves, and a wider luxury range reaching $3M+."
  },
  {
    "q": "What are HOA fees in Green Valley North?",
    "a": "HOA fees vary widely by sub-community, from approximately $50 per month in single-family neighborhoods to $200 per month in condo and townhome communities with pools and fitness centers."
  },
  {
    "q": "Is Green Valley North a good investment?",
    "a": "Green Valley North benefits from its central Henderson location, mature character, and broad buyer appeal. The community has shown steady appreciation and consistently strong rental demand thanks to its proximity to employment, schools, and amenities."
  },
  {
    "q": "What are the best sub-neighborhoods within Green Valley North?",
    "a": "The best sub-neighborhood depends on your priorities — school zones, lot size, home age, and proximity to amenities all vary within the community. Nevada Real Estate Group agents who specialize in Green Valley North can walk you through the specific blocks and streets that match your criteria."
  },
  {
    "q": "How is new construction availability in Green Valley North?",
    "a": "New construction availability varies by season and builder phase. Some sections of Green Valley North have active new home sales while others are fully built out with resale-only inventory. Contact Nevada Real Estate Group for the most current new construction options."
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
  name: 'Green Valley North',
  description: 'Green Valley North is a master-planned · golf · established community in Henderson, Nevada (ZIP 89014), established in 1978 by American Nevada Corporation, spanning 2,500 acres. Home prices range from $400K–$1.5M.',
  geo: { '@type': 'GeoCoordinates', latitude: 36.06, longitude: -115.075 },
  address: { '@type': 'PostalAddress', addressLocality: 'Henderson', addressRegion: 'NV', postalCode: '89014', addressCountry: 'US' },
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
  const cms = await getCommunityPage('green-valley-north')
  return {
    title: cms?.metaTitle ?? 'Green Valley North Homes for Sale | Nevada Real Estate Group',
    description: cms?.metaDescription ?? 'Browse Green Valley North homes for sale in Henderson, NV. $400K–$1.5M. Schools, HOA, market stats. Nevada Real Estate Group.',
    alternates: { canonical: 'https://www.lasvegashomesearchexperts.com/green-valley-north' },
  }
}

export default async function GreenValleyNorthPage() {
  const cms = await getCommunityPage('green-valley-north')
  const market = getMarketStats('green-valley-north')
  const ms = market?.stats

  const heroHeadline = cms?.heroHeadline ?? 'Green Valley North'
  const heroSubtitle = 'Homes for Sale in Henderson, Nevada'
  const overviewTitle = cms?.overviewTitle ?? 'Green Valley North: Master-Planned · Golf · Established Living in Henderson'

  const HARDCODED_STATS: Array<[string, string] | [string, string, string]> = [
    ['Established', '1978'],
    ['Developer', 'American Nevada Corporation'],
    ['Total Acreage', '2,500 acres'],
    ['Homes', '8,000+'],
    ['Median Home Price', ms?.medianSalePrice ?? '$400K–$1.5M'],
    ['ZIP Codes', '89014, 89074'],
    ['Guard-Gated', 'No'],
    ['HOA', '$50–$200/mo'],
  ]
  const displayStats = mergeQuickStats(HARDCODED_STATS, cms?.quickStats)
  const HARDCODED_DRIVE_TIMES = [
    {
        "time": "~15 min",
        "destination": "to the Strip",
        "route": "via I-215 W → I-15 N"
    },
    {
        "time": "~15 min",
        "destination": "to Harry Reid Airport",
        "route": "via I-215 W → Airport Connector"
    },
    {
        "time": "~5 min",
        "destination": "to Henderson Downtown",
        "route": "via Lake Mead Pkwy"
    },
    {
        "time": "~30 min",
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
          <span>Green Valley North</span>
        </div>
      </div>

      <header id="hero" className="summerlin-hero hero-v2">
        <img src="https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1600&h=700&q=80" alt="Green Valley North community aerial view, Henderson Nevada" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
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
                <span className="hero-v2-stat-num">{ms?.medianSalePrice ?? qs('Median Home Price', '$400K–$1.5M')}</span>
                <span className="hero-v2-stat-lbl">Median Sale Price</span>
              </div>
              <div className="hero-v2-stat">
                <span className="hero-v2-stat-num">{ms?.avgDaysToClose ?? qs('Avg Days on Market', '45')}</span>
                <span className="hero-v2-stat-lbl">Avg Days to Close</span>
              </div>
            </div>
            <a href="#listings" className="hero-v2-cta">Search Homes in Green Valley North</a>
          </div>
        </div>
      </header>

      <div className="hero-v2-qfb">
        <div className="container">
          <div className="hero-v2-qfb-row">
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <span><strong>ZIP:</strong> 89014, 89074</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              <span><strong>Type:</strong> Master-Planned · Golf · Established</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
              <span><strong>Price Range:</strong> $400K–$1.5M</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
              <span><strong>HOA:</strong> $50–$200/mo</span>
            </div>
          </div>
          <div className="hero-v2-qfb-est">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            <span>Est. 1978</span>
          </div>
        </div>
      </div>

      <section id="demographics" className="demographics-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Demographics</span>
            <h2>Green Valley North Demographics</h2>
          </div>
          <div className="demo-grid">
            {[
              ['22,000+', 'Population'],
              ['44', 'Median Age'],
              ['$95,000+', 'Avg Household Income'],
              ['8,000+', 'Total Households'],
              ['72%', 'Homeownership Rate'],
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
            <h2>Where is Green Valley North?</h2>
            <p>Green Valley, Henderson &mdash; Henderson, Nevada.</p>
          </div>
          <div className="map-container">
            <GreenValleyNorthMapWrapper />
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
            <h2 className="listings-title">NEW GREEN VALLEY NORTH LISTINGS</h2>
          </div>
          <div className="ylopo-wrap">
            <div className="YLOPO_searchWidget" />
            <div className="YLOPO_resultsWidget" data-search='{"propertyTypes":["house","condo","townhouse"],"minPrice":400000,"locations":[{"city":"Henderson","state":"NV"}],"limit":12,"sortBy":"listDate","sortOrder":"desc","keywords":"Green Valley North","zipCodes":["89014","89074"]}' />
          </div>
          <p className="ylopo-note">Listing data sourced from regional MLS. Information deemed reliable but not guaranteed. Updated daily.</p>
          <div className="listings-actions">
            <a href="https://search.nevadarealestategroup.net/search?s[orderBy]=sourceCreationDate%2Cdesc&s[page]=1&s[locations][0][city]=Henderson&s[locations][0][state]=NV&s[keywords]=Green%20Valley%20North" target="_blank" rel="noopener noreferrer" className="btn-gold">View All Green Valley North Listings &rarr;</a>
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
                  <p>Green Valley North is a master-planned · golf · established community within Green Valley in Henderson, Nevada (ZIP 89014/89074), established in 1978, spanning 2,500 acres, with 8,000+ homes. Green Valley North represents the original heart of Henderson's first master-planned community. Developed by American Nevada Corporation beginning in the late 1970s, this is where the Green Valley story began — a pioneering master-planned development that transformed Henderson from a small industrial town into one of America's most desirable cities. Today, Green Valley North is a mature, tree-lined community with a broad mix of housing types, from charming single-story starter homes to expansive custom estates along the Legacy Golf Course.</p>
                  <p>Homes in Green Valley North range from approximately $400,000 for smaller condominiums and townhomes to $1.5 million for custom homes on the golf course or in the community's most established luxury pockets. The breadth of inventory is one of Green Valley North's defining characteristics — buyers at nearly every price point can find a home here, from first-time buyers to empty nesters to luxury buyers seeking a Legacy Golf Course address.</p>
                  <p>The neighborhood is anchored by legacy amenities that have matured beautifully over four decades. The Green Valley Athletic Club, one of Henderson's premier fitness facilities, serves as a social and fitness hub. The Legacy Golf Course winds through the community, providing green fairway views and a recreational anchor. Mature trees, established parks, and wide boulevards create a neighborhood character that newer Henderson developments simply cannot replicate.</p>
                  <p>Location is arguably Green Valley North's greatest asset. The community sits at the geographic center of Henderson, with direct access to Green Valley Parkway, Sunset Road, and Warm Springs Road. The District at Green Valley Ranch — Henderson's premier outdoor shopping, dining, and entertainment destination — is minutes away. Downtown Henderson, Harry Reid International Airport, and the Las Vegas Strip are all within a 15-to-20-minute drive. For buyers who value established character, central location, and a diverse housing stock, Green Valley North remains one of Henderson's most compelling addresses.</p>
                </>
              )}
            </div>
            <div className="overview-aside">
              <div className="quick-facts">
                <h3>Green Valley North At a Glance</h3>
                {displayStats.map(([label, value, cls]: any) => (
                  <div className="fact-row" key={label}>
                    <span className="fact-label">{label}</span>
                    <span className={`fact-value${cls ? ' ' + cls : ''}`}>{value}</span>
                  </div>
                ))}
              </div>
              <div className="cta-card">
                <p>Ready to explore Green Valley North? Schedule a private tour of the community and the current listings that match your goals.</p>
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
            <h2>Top 7 Facts About Green Valley North</h2>
          </div>
          <ol className="top-facts-list">
            <li key={0}>Green Valley North spans 2,500 acres in Henderson, Nevada (ZIP 89014, 89074).</li>
            <li key={1}>Green Valley North was established in 1978 by American Nevada Corporation.</li>
            <li key={2}>Green Valley North contains 8,000+ homes with prices ranging from $400K–$1.5M.</li>
            <li key={3}>Green Valley North is a master-planned · golf · established community within Green Valley.</li>
            <li key={4}>HOA fees in Green Valley North range from $50–$200/mo per month.</li>
            <li key={5}>Top-rated schools serving Green Valley North include Green Valley High School (8/10) and Greenspun Junior High School (7/10).</li>
            <li key={6}>Green Valley North is located ~15 min to the Strip via I-215 W → I-15 N.</li>
          </ol>
        </div>
      </section>

      <section id="highlights">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Why Green Valley North</span>
            <h2>What Makes Green Valley North Stand Out</h2>
          </div>
          <div className="highlights-grid">
            {[
              { title: 'Legacy Golf Course', body: 'The Legacy Golf Course winds through Green Valley North, offering residents golf course views and proximity to one of Henderson\'s most established courses. Public play with membership options available.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 2v10l7 4"/></svg> },
              { title: 'Mature, Tree-Lined Streets', body: 'Four decades of growth have given Green Valley North a canopy of mature trees, established landscaping, and a neighborhood character that newer communities cannot replicate.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22c4-4 8-7.5 8-12a8 8 0 10-16 0c0 4.5 4 8 8 12z"/><circle cx="12" cy="10" r="3"/></svg> },
              { title: 'Central Henderson Location', body: 'Positioned at the geographic center of Henderson with direct access to Green Valley Parkway, Sunset Road, and Warm Springs Road. Everything in Henderson is close.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><line x1="8" y1="6" x2="8" y2="6.01"/><line x1="12" y1="6" x2="12" y2="6.01"/><line x1="16" y1="6" x2="16" y2="6.01"/><line x1="8" y1="10" x2="8" y2="10.01"/><line x1="12" y1="10" x2="12" y2="10.01"/><line x1="16" y1="10" x2="16" y2="10.01"/><line x1="8" y1="14" x2="8" y2="14.01"/><line x1="12" y1="14" x2="12" y2="14.01"/><line x1="16" y1="14" x2="16" y2="14.01"/></svg> },
              { title: 'The District at Green Valley Ranch', body: 'Henderson\'s premier outdoor shopping, dining, and entertainment center is minutes from Green Valley North. Over 50 shops, restaurants, and entertainment venues.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><line x1="8" y1="6" x2="8" y2="6.01"/><line x1="12" y1="6" x2="12" y2="6.01"/><line x1="16" y1="6" x2="16" y2="6.01"/><line x1="8" y1="10" x2="8" y2="10.01"/><line x1="12" y1="10" x2="12" y2="10.01"/><line x1="16" y1="10" x2="16" y2="10.01"/><line x1="8" y1="14" x2="8" y2="14.01"/><line x1="12" y1="14" x2="12" y2="14.01"/><line x1="16" y1="14" x2="16" y2="14.01"/></svg> },
              { title: 'Green Valley Athletic Club', body: 'One of Henderson\'s premier fitness and social clubs, offering indoor and outdoor pools, tennis, group fitness, spa services, and youth programs.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><line x1="8" y1="6" x2="8" y2="6.01"/><line x1="12" y1="6" x2="12" y2="6.01"/><line x1="16" y1="6" x2="16" y2="6.01"/><line x1="8" y1="10" x2="8" y2="10.01"/><line x1="12" y1="10" x2="12" y2="10.01"/><line x1="16" y1="10" x2="16" y2="10.01"/><line x1="8" y1="14" x2="8" y2="14.01"/><line x1="12" y1="14" x2="12" y2="14.01"/><line x1="16" y1="14" x2="16" y2="14.01"/></svg> },
              { title: 'Broad Price Range', body: 'From $400K condos to $1.5M golf course estates, Green Valley North serves first-time buyers, families, empty nesters, and luxury buyers — one of the widest ranges in Henderson.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg> },
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
            <h2>Parks &amp; Recreation Near Green Valley North</h2>
          </div>
          <div className="parks-grid">
            {[
              { name: 'Paseo Verde Park', address: 'Paseo Verde Pkwy, Henderson, NV 89012', acreage: '~26 acres', amenities: ["Walking trails","Sports fields","Playground","Picnic shelters","Dog park","Skate park"] },
              { name: 'Silver Springs Park', address: '1951 Silver Springs Pkwy, Henderson, NV 89074', acreage: '~15 acres', amenities: ["Swimming pool","Playground","Tennis courts","Walking trails","Picnic areas"] },
              { name: 'Discovery Park', address: '2011 Paseo Verde Pkwy, Henderson, NV 89012', acreage: '~10 acres', amenities: ["Playground","Sports fields","Walking paths","Open space"] },
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
            <h2>The Green Valley North Lifestyle</h2>
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
              <div className="lifestyle-v2-stat">8,000+</div>
              <div className="lifestyle-v2-label">Homes</div>
            </div>
            <div className="lifestyle-v2-item">
              <div className="lifestyle-v2-icon"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 2v10l7 4"/></svg></div>
              <div className="lifestyle-v2-stat">1978</div>
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

      <section id="hoa" className="hoa-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">HOA</span>
            <h2>HOA Information for Green Valley North</h2>
          </div>
          <div className="hoa-grid">
            <div className="hoa-fees-col">
              <h3>Fees &amp; Management</h3>
              <div className="hoa-fee-row"><span>Monthly HOA Range</span><strong>$50–$200/mo</strong></div>
              <div className="hoa-fee-row"><span>Guard-Gated</span><strong>No</strong></div>
              <div className="hoa-fee-row"><span>Community Type</span><strong>Master-Planned · Golf · Established</strong></div>
              <div className="hoa-management">
                <p className="hoa-mgmt-label">Management</p>
                <p className="hoa-mgmt-value">Green Valley Master Association + Sub-HOA</p>
              </div>
              <p style={{ marginTop: '16px', fontSize: '11px', color: 'var(--text-faint)', fontStyle: 'italic' }}>HOA fees are subject to change. Verify current fees with the management company before purchase.</p>
            </div>
            <div className="hoa-amenities-col">
              <h3>What HOA Typically Covers</h3>
              <ul className="hoa-amenity-list">
                {['Common area landscaping and maintenance','Community parks and trail maintenance','Neighborhood street maintenance','Exterior architectural standards enforcement','Reserve fund contributions','Golf course common area adjacency'].map((a: string) => <li key={a}>{a}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="schools" className="schools-v2">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Education</span>
            <h2>Schools Serving Green Valley North</h2>
          </div>
          <div className="schools-v2-table">
            <div className="schools-v2-header">
              <span>School Name</span>
              <span>Grades</span>
              <span>Rating</span>
            </div>
            {[
              ['Green Valley High School', '9–12', '8/10'],
              ['Greenspun Junior High School', '6–8', '7/10'],
              ['C.T. Sewell Elementary', 'K–5', '8/10'],
              ['Henderson International School', 'PreK–12', 'A'],
              ['Bishop Gorman High School', '9–12', 'A+'],
              ['St. Peter the Apostle School', 'PreK–8', 'A'],
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
            <h2>What Green Valley North Buyers Say</h2>
          </div>
          <div className="testimonials-grid">
            {[
              { quote: 'We love the mature trees, the walkability, and being five minutes from everything in Henderson. Nevada Real Estate Group found us a remodeled home near the Legacy course at a price we didn\'t think was possible.', name: 'Steven & Julie R.', detail: 'Bought in Green Valley North · 2024' },
              { quote: 'Our Green Valley North home sold fast. The location sells itself, but the marketing and pricing strategy from Nevada Real Estate Group brought in competitive offers in the first weekend.', name: 'Mark T.', detail: 'Sold in Green Valley North · 2025' },
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

      <GreenValleyNorthFAQ />

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
              { name: 'Green Valley South', href: '/green-valley-south/', price: 'From $350K', compare: 'The newer, southern expansion of Green Valley with more luxury options and guard-gated enclaves.' },
              { name: 'Green Valley Ranch', href: '/green-valley-ranch/', price: 'From $400K', compare: 'Adjacent community with resort casino, The District shopping, and established family neighborhoods.' },
              { name: 'Legacy at Green Valley', href: '/legacy-green-valley/', price: 'From $700K', compare: 'Guard-gated luxury golf community with custom homes along the Legacy Golf Course.' },
              { name: 'Henderson', href: '/henderson/', price: 'From $300K', compare: 'The broader city of Henderson — Nevada\'s second-largest city and one of America\'s safest.' },
              { name: 'Seven Hills', href: '/seven-hills/', price: 'From $500K', compare: 'Established Henderson community with Rio Secco golf and 25 distinct neighborhoods.' },
              { name: 'The Fountains', href: '/the-fountains/', price: 'From $800K', compare: 'Guard-gated luxury enclave in the Green Valley area with custom estate homes.' },
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
              <h2>Ready to Find Your Green Valley North Home?</h2>
              <p>Nevada Real Estate Group is the #1 real estate team in Nevada. Whether you&apos;re buying or selling in Green Valley North, let&apos;s talk.</p>
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
                <input type="hidden" name="_subject" value="Green Valley North Inquiry — LasVegasHomeSearchExperts.com" />
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
