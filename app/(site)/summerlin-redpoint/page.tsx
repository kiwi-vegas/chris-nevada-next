import SummerlinRedpointFAQ from '@/components/SummerlinRedpointFAQ'
import Link from 'next/link'
import type { Metadata } from 'next'
import SummerlinRedpointMapWrapper from '@/components/SummerlinRedpointMapWrapper'
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
    { '@type': 'ListItem', position: 3, name: 'Redpoint', item: 'https://www.lasvegashomesearchexperts.com/summerlin-redpoint/' },
  ],
}

const FAQ_DATA = [
  {
    "q": "What is the price range in Redpoint?",
    "a": "Homes in Redpoint range from approximately $650,000 for production homes to over $2 million for larger semi-custom and custom homes on premium lots with mountain views."
  },
  {
    "q": "Is Redpoint new construction?",
    "a": "Yes — Redpoint is actively building with new homes available from premium national builders. Construction began in 2020 and the village continues to expand."
  },
  {
    "q": "Is Redpoint guard-gated?",
    "a": "No — Redpoint is not guard-gated. It delivers premium new construction and mountain views without the guard-gate premium. For guard-gated options nearby, Grand Park is within the Summerlin West Association."
  },
  {
    "q": "What ZIP code is Redpoint in?",
    "a": "Redpoint is located in ZIP code 89138 in the Summerlin West area of Las Vegas. Home prices range from $650K–$2M+."
  },
  {
    "q": "How close is Redpoint to Red Rock Canyon?",
    "a": "Redpoint is approximately 7 minutes from Red Rock Canyon NCA — one of the closest residential communities to Red Rock in all of Las Vegas. Many homes enjoy direct views of the canyon."
  },
  {
    "q": "What schools serve Redpoint?",
    "a": "Redpoint is served by CCSD schools including Kesterson Elementary (8/10), Rogich Middle (10/10), and Arbor View High School (7/10). Private options including The Meadows School (A+) and Bishop Gorman (A+) are nearby."
  },
  {
    "q": "What are HOA fees in Redpoint?",
    "a": "HOA fees in Redpoint range from approximately $175 to $400 per month, including the Summerlin master association fee plus the village sub-association fee."
  },
  {
    "q": "How does Redpoint compare to La Madre Peaks?",
    "a": "Both are premium Summerlin West villages. La Madre Peaks offers luxury and ultra-luxury homes from $800K to $5M+. Redpoint offers premium new construction from $650K to $2M+. Redpoint provides exceptional value at the premium-but-not-ultra-luxury tier."
  },
  {
    "q": "What are the best sub-neighborhoods within Redpoint?",
    "a": "The best sub-neighborhood depends on your priorities — school zones, lot size, home age, and proximity to amenities all vary within the community. Nevada Real Estate Group agents who specialize in Redpoint can walk you through the specific blocks and streets that match your criteria."
  },
  {
    "q": "How is new construction availability in Redpoint?",
    "a": "New construction availability varies by season and builder phase. Some sections of Redpoint have active new home sales while others are fully built out with resale-only inventory. Contact Nevada Real Estate Group for the most current new construction options."
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
  name: 'Redpoint',
  description: 'Redpoint is a master-planned · new construction · premium community in Las Vegas, Nevada (ZIP 89138), established in 2020 by Howard Hughes Corporation, spanning 400 acres. Home prices range from $650K–$2M+.',
  geo: { '@type': 'GeoCoordinates', latitude: 36.185, longitude: -115.34 },
  address: { '@type': 'PostalAddress', addressLocality: 'Las Vegas', addressRegion: 'NV', postalCode: '89138', addressCountry: 'US' },
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
  const cms = await getCommunityPage('summerlin-redpoint')
  return {
    title: cms?.metaTitle ?? 'Redpoint Homes for Sale | Nevada Real Estate Group',
    description: cms?.metaDescription ?? 'Browse Redpoint homes for sale in Las Vegas, NV. $650K–$2M+. Schools, HOA, market stats. Nevada Real Estate Group.',
    alternates: { canonical: 'https://www.lasvegashomesearchexperts.com/summerlin-redpoint' },
  }
}

export default async function SummerlinRedpointPage() {
  const cms = await getCommunityPage('summerlin-redpoint')
  const market = getMarketStats('summerlin-redpoint')
  const ms = market?.stats

  const heroHeadline = cms?.heroHeadline ?? 'Redpoint'
  const heroSubtitle = 'Homes for Sale in Las Vegas, Nevada'
  const overviewTitle = cms?.overviewTitle ?? 'Redpoint: Master-Planned · New Construction · Premium Living in Las Vegas'

  const HARDCODED_STATS: Array<[string, string] | [string, string, string]> = [
    ['Established', '2020'],
    ['Developer', 'Howard Hughes Corporation'],
    ['Total Acreage', '400 acres'],
    ['Homes', '1,400+'],
    ['Median Home Price', ms?.medianSalePrice ?? '$650K–$2M+'],
    ['ZIP Codes', '89138'],
    ['Guard-Gated', 'No'],
    ['HOA', '$175–$400/mo'],
  ]
  const displayStats = mergeQuickStats(HARDCODED_STATS, cms?.quickStats)
  const HARDCODED_DRIVE_TIMES = [
    {
        "time": "~25 min",
        "destination": "to the Strip",
        "route": "via Summerlin Pkwy → I-15"
    },
    {
        "time": "~7 min",
        "destination": "to Red Rock Canyon",
        "route": "via W Charleston Blvd"
    },
    {
        "time": "~15 min",
        "destination": "to Downtown Summerlin",
        "route": "via W Lake Mead Blvd"
    },
    {
        "time": "~35 min",
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
          <span>Redpoint</span>
        </div>
      </div>

      <header id="hero" className="summerlin-hero hero-v2">
        <img src="https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1600&h=700&q=80" alt="Redpoint community aerial view, Las Vegas Nevada" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
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
                <span className="hero-v2-stat-num">{ms?.medianSalePrice ?? qs('Median Home Price', '$650K–$2M+')}</span>
                <span className="hero-v2-stat-lbl">Median Sale Price</span>
              </div>
              <div className="hero-v2-stat">
                <span className="hero-v2-stat-num">{ms?.avgDaysToClose ?? qs('Avg Days on Market', '45')}</span>
                <span className="hero-v2-stat-lbl">Avg Days to Close</span>
              </div>
            </div>
            <a href="#listings" className="hero-v2-cta">Search Homes in Redpoint</a>
          </div>
        </div>
      </header>

      <div className="hero-v2-qfb">
        <div className="container">
          <div className="hero-v2-qfb-row">
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <span><strong>ZIP:</strong> 89138</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              <span><strong>Type:</strong> Master-Planned · New Construction · Premium</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
              <span><strong>Price Range:</strong> $650K–$2M+</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
              <span><strong>HOA:</strong> $175–$400/mo</span>
            </div>
          </div>
          <div className="hero-v2-qfb-est">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            <span>Est. 2020</span>
          </div>
        </div>
      </div>

      <section id="demographics" className="demographics-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Demographics</span>
            <h2>Redpoint Demographics</h2>
          </div>
          <div className="demo-grid">
            {[
              ['4,000+', 'Population'],
              ['38', 'Median Age'],
              ['$180,000+', 'Avg Household Income'],
              ['1,400+', 'Total Households'],
              ['87%', 'Homeownership Rate'],
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
            <h2>Where is Redpoint?</h2>
            <p>Summerlin, Las Vegas &mdash; Las Vegas, Nevada.</p>
          </div>
          <div className="map-container">
            <SummerlinRedpointMapWrapper />
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
            <h2 className="listings-title">NEW REDPOINT LISTINGS</h2>
          </div>
          <div className="ylopo-wrap">
            <div className="YLOPO_searchWidget" />
            <div className="YLOPO_resultsWidget" data-search='{"propertyTypes":["house","condo","townhouse"],"minPrice":600000,"locations":[{"city":"Las Vegas","state":"NV"}],"limit":12,"sortBy":"listDate","sortOrder":"desc","keywords":"Redpoint Summerlin","zipCodes":["89138"]}' />
          </div>
          <p className="ylopo-note">Listing data sourced from regional MLS. Information deemed reliable but not guaranteed. Updated daily.</p>
          <div className="listings-actions">
            <a href="https://search.nevadarealestategroup.net/search?s[orderBy]=sourceCreationDate%2Cdesc&s[page]=1&s[locations][0][city]=Las%20Vegas&s[locations][0][state]=NV&s[keywords]=Redpoint%20Summerlin" target="_blank" rel="noopener noreferrer" className="btn-gold">View All Redpoint Listings &rarr;</a>
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
                  <p>Redpoint is a master-planned · new construction · premium community within Summerlin in Las Vegas, Nevada (ZIP 89138), spanning 400 acres, with 1,400+ homes, where home prices range from $650K–$2M+. Redpoint is one of the premier new-construction villages in the Summerlin West Association, positioned along the western edge of the master plan where the valley floor meets the foothills of the Spring Mountains. Launched in 2020 by the Howard Hughes Corporation, Redpoint was conceived as a premium village — offering larger homes, more refined architecture, and a location that places residents at the doorstep of Red Rock Canyon and the outdoor lifestyle that defines western Las Vegas.</p>
                  <p>Homes in Redpoint range from approximately $650,000 for production homes to over $2 million for semi-custom and custom homes on premium lots with mountain views. The village attracts a caliber of builders that matches its premium positioning — Toll Brothers, Taylor Morrison, and other builders known for luxury-leaning new construction. Floor plans range from approximately 2,200 to 5,000+ square feet, with architectural standards that emphasize desert contemporary design: natural stone, metal accents, expansive glass, and indoor-outdoor living.</p>
                  <p>Redpoint's western position makes it one of the closest Summerlin villages to Red Rock Canyon — approximately 7 minutes by car. Many homes enjoy direct views of the canyon's sandstone formations and the Spring Mountains beyond. The village is elevated compared to the valley floor, enhancing both views and the sense of living at the edge of the desert wilderness. Downtown Summerlin is approximately 15 minutes east.</p>
                  <p>For buyers seeking premium new construction in the most desirable position in Summerlin West — mountain views, Red Rock proximity, contemporary architecture — Redpoint delivers at price points that remain accessible compared to the ultra-luxury guard-gated communities. It represents the highest-quality non-guard-gated new construction available in Summerlin, with a location and lifestyle that rival communities at twice the price.</p>
                </>
              )}
            </div>
            <div className="overview-aside">
              <div className="quick-facts">
                <h3>Redpoint At a Glance</h3>
                {displayStats.map(([label, value, cls]: any) => (
                  <div className="fact-row" key={label}>
                    <span className="fact-label">{label}</span>
                    <span className={`fact-value${cls ? ' ' + cls : ''}`}>{value}</span>
                  </div>
                ))}
              </div>
              <div className="cta-card">
                <p>Ready to explore Redpoint? Schedule a private tour of the community and the current listings that match your goals.</p>
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
            <h2>Top 7 Facts About Redpoint</h2>
          </div>
          <ol className="top-facts-list">
            <li key={0}>Redpoint spans 400 acres in Las Vegas, Nevada (ZIP 89138).</li>
            <li key={1}>Redpoint was established in 2020 by Howard Hughes Corporation.</li>
            <li key={2}>Redpoint contains 1,400+ homes with prices ranging from $650K–$2M+.</li>
            <li key={3}>Redpoint is a master-planned · new construction · premium community within Summerlin.</li>
            <li key={4}>HOA fees in Redpoint range from $175–$400/mo per month.</li>
            <li key={5}>Top-rated schools serving Redpoint include Lorna J. Kesterson Elementary (8/10) and Sig Rogich Middle School (10/10).</li>
            <li key={6}>Redpoint is located ~25 min to the Strip via Summerlin Pkwy → I-15.</li>
          </ol>
        </div>
      </section>

      <section id="highlights">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Why Redpoint</span>
            <h2>What Makes Redpoint Stand Out</h2>
          </div>
          <div className="highlights-grid">
            {[
              { title: 'Premium Western Location', body: 'Positioned at the western edge of Summerlin where the valley meets the Spring Mountains. Approximately 7 minutes to Red Rock Canyon — one of the closest communities in Las Vegas.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M8 21l4-11 4 11"/><path d="M2 21l5-14 4 8"/><path d="M14 15l4-8 4 14"/><line x1="2" y1="21" x2="22" y2="21"/></svg> },
              { title: 'Mountain & Canyon Views', body: 'Many homes enjoy direct views of Red Rock Canyon\'s sandstone formations and the Spring Mountains. Elevated position enhances views across the Las Vegas Valley.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M8 21l4-11 4 11"/><path d="M2 21l5-14 4 8"/><path d="M14 15l4-8 4 14"/><line x1="2" y1="21" x2="22" y2="21"/></svg> },
              { title: 'Premium New Construction', body: 'Larger floor plans and higher-quality construction compared to standard Summerlin villages. Semi-custom and custom options available up to 5,000+ square feet.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
              { title: 'Desert Contemporary Architecture', body: 'Premium architectural standards — natural stone, metal accents, expansive glass, and seamless indoor-outdoor living. A distinctly elevated aesthetic.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><line x1="8" y1="6" x2="8" y2="6.01"/><line x1="12" y1="6" x2="12" y2="6.01"/><line x1="16" y1="6" x2="16" y2="6.01"/><line x1="8" y1="10" x2="8" y2="10.01"/><line x1="12" y1="10" x2="12" y2="10.01"/><line x1="16" y1="10" x2="16" y2="10.01"/><line x1="8" y1="14" x2="8" y2="14.01"/><line x1="12" y1="14" x2="12" y2="14.01"/><line x1="16" y1="14" x2="16" y2="14.01"/></svg> },
              { title: 'Premium Builder Selection', body: 'Builders include Toll Brothers, Taylor Morrison, and others known for luxury-leaning production and semi-custom homes. Design center customization available.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><line x1="8" y1="6" x2="8" y2="6.01"/><line x1="12" y1="6" x2="12" y2="6.01"/><line x1="16" y1="6" x2="16" y2="6.01"/><line x1="8" y1="10" x2="8" y2="10.01"/><line x1="12" y1="10" x2="12" y2="10.01"/><line x1="16" y1="10" x2="16" y2="10.01"/><line x1="8" y1="14" x2="8" y2="14.01"/><line x1="12" y1="14" x2="12" y2="14.01"/><line x1="16" y1="14" x2="16" y2="14.01"/></svg> },
              { title: 'Outdoor Lifestyle Hub', body: 'Red Rock Canyon, the Summerlin trail system, and the outdoor recreation network of western Las Vegas are essentially at the doorstep. A true outdoor lifestyle community.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22c4-4 8-7.5 8-12a8 8 0 10-16 0c0 4.5 4 8 8 12z"/><circle cx="12" cy="10" r="3"/></svg> },
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
            <h2>Parks &amp; Recreation Near Redpoint</h2>
          </div>
          <div className="parks-grid">
            {[
              { name: 'Redpoint Community Park', address: 'Within Redpoint Village, Las Vegas, NV 89138', acreage: '~10 acres', amenities: ["Modern playground","Open fields","Walking paths","Shade structures","Picnic areas","Fitness stations"] },
              { name: 'Red Rock Canyon NCA', address: '1000 Scenic Loop Dr, Las Vegas, NV 89161', acreage: '195,819 acres', amenities: ["Scenic Loop Drive","Hiking trails","Rock climbing","Visitor center","Wildlife viewing"] },
              { name: 'Summerlin Trail System', address: 'Access points throughout Redpoint', acreage: 'Connected network', amenities: ["Paved multi-use trails","Desert landscape","Connects to Red Rock trails","Dog-friendly"] },
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
            <h2>The Redpoint Lifestyle</h2>
          </div>
          <div className="lifestyle-v2-grid">
            <div className="lifestyle-v2-item">
              <div className="lifestyle-v2-icon"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg></div>
              <div className="lifestyle-v2-stat">~25 min</div>
              <div className="lifestyle-v2-label">to the Strip</div>
            </div>
            <div className="lifestyle-v2-item">
              <div className="lifestyle-v2-icon"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22c4-4 8-7.5 8-12a8 8 0 10-16 0c0 4.5 4 8 8 12z"/><circle cx="12" cy="10" r="3"/></svg></div>
              <div className="lifestyle-v2-stat">3+</div>
              <div className="lifestyle-v2-label">Nearby Parks</div>
            </div>
            <div className="lifestyle-v2-item">
              <div className="lifestyle-v2-icon"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg></div>
              <div className="lifestyle-v2-stat">1,400+</div>
              <div className="lifestyle-v2-label">Homes</div>
            </div>
            <div className="lifestyle-v2-item">
              <div className="lifestyle-v2-icon"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 2v10l7 4"/></svg></div>
              <div className="lifestyle-v2-stat">2020</div>
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
            <h2>HOA Information for Redpoint</h2>
          </div>
          <div className="hoa-grid">
            <div className="hoa-fees-col">
              <h3>Fees &amp; Management</h3>
              <div className="hoa-fee-row"><span>Monthly HOA Range</span><strong>$175–$400/mo</strong></div>
              <div className="hoa-fee-row"><span>Guard-Gated</span><strong>No</strong></div>
              <div className="hoa-fee-row"><span>Community Type</span><strong>Master-Planned · New Construction · Premium</strong></div>
              <div className="hoa-management">
                <p className="hoa-mgmt-label">Management</p>
                <p className="hoa-mgmt-value">Summerlin Master Association + Sub-HOA</p>
              </div>
              <p style={{ marginTop: '16px', fontSize: '11px', color: 'var(--text-faint)', fontStyle: 'italic' }}>HOA fees are subject to change. Verify current fees with the management company before purchase.</p>
            </div>
            <div className="hoa-amenities-col">
              <h3>What HOA Typically Covers</h3>
              <ul className="hoa-amenity-list">
                {['Common area landscaping and maintenance','Community parks and trail maintenance','Neighborhood street maintenance','Exterior architectural standards enforcement','Reserve fund contributions'].map((a: string) => <li key={a}>{a}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="schools" className="schools-v2">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Education</span>
            <h2>Schools Serving Redpoint</h2>
          </div>
          <div className="schools-v2-table">
            <div className="schools-v2-header">
              <span>School Name</span>
              <span>Grades</span>
              <span>Rating</span>
            </div>
            {[
              ['Lorna J. Kesterson Elementary', 'K–5', '8/10'],
              ['Sig Rogich Middle School', '6–8', '10/10'],
              ['Arbor View High School', '9–12', '7/10'],
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
            <h2>What Redpoint Buyers Say</h2>
          </div>
          <div className="testimonials-grid">
            {[
              { quote: 'Redpoint gave us everything — new construction, mountain views, contemporary design, and Red Rock Canyon seven minutes away. Nevada Real Estate Group helped us secure a premium lot that we would have missed without their market knowledge.', name: 'Scott & Vanessa R.', detail: 'Bought in Redpoint, Summerlin · 2024' },
              { quote: 'We looked at guard-gated communities but Redpoint\'s views and quality rivaled homes at twice the price. Nevada Real Estate Group showed us that the best value in western Summerlin isn\'t always behind a gate.', name: 'Brian & Kathleen F.', detail: 'Bought in Redpoint, Summerlin · 2025' },
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

      <SummerlinRedpointFAQ />

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
              { name: 'Summerlin', href: '/summerlin/', price: 'From $450K', compare: 'The broader master-planned community with 20+ villages.' },
              { name: 'La Madre Peaks', href: '/summerlin-la-madre-peaks/', price: 'From $800K', compare: 'Luxury Summerlin West village at higher price points with mountain-adjacent positioning.' },
              { name: 'Grand Park', href: '/summerlin-grand-park/', price: 'From $400K', compare: 'Summerlin West village with guard-gated options and the broadest price range.' },
              { name: 'Kestrel', href: '/summerlin-kestrel/', price: 'From $500K', compare: 'Adjacent Summerlin West village with more accessible new-construction pricing.' },
              { name: 'The Ridges', href: '/summerlin-the-ridges/', price: 'From $2M', compare: 'Summerlin South ultra-luxury guard-gated community with similar Red Rock proximity.' },
              { name: 'Kestrel Commons', href: '/summerlin-kestrel-commons/', price: 'From $450K', compare: 'Summerlin West village with townhomes and single-family homes at lower entry pricing.' },
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
              <h2>Ready to Find Your Redpoint Home?</h2>
              <p>Nevada Real Estate Group is the #1 real estate team in Nevada. Whether you&apos;re buying or selling in Redpoint, let&apos;s talk.</p>
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
                <input type="hidden" name="_subject" value="Redpoint Inquiry — LasVegasHomeSearchExperts.com" />
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
