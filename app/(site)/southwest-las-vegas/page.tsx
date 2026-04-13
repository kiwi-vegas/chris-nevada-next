import SouthwestLasVegasFAQ from '@/components/SouthwestLasVegasFAQ'
import Link from 'next/link'
import type { Metadata } from 'next'
import SouthwestLasVegasMapWrapper from '@/components/SouthwestLasVegasMapWrapper'
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
    { '@type': 'ListItem', position: 3, name: 'Southwest Las Vegas', item: 'https://www.lasvegashomesearchexperts.com/southwest-las-vegas/' },
  ],
}

const FAQ_DATA = [
  {
    "q": "What is the price range for homes in Southwest Las Vegas?",
    "a": "Homes in Southwest Las Vegas range from approximately $300,000 for entry-level condos and townhomes to over $1 million for luxury homes in guard-gated communities like Southern Highlands and Spanish Trail."
  },
  {
    "q": "What ZIP codes are in Southwest Las Vegas?",
    "a": "Southwest Las Vegas spans several ZIP codes including 89113, 89139, 89141, 89148, 89178, and 89179. The area is large and covers multiple unincorporated Clark County census tracts."
  },
  {
    "q": "Is Southwest Las Vegas a good area to live?",
    "a": "Southwest Las Vegas is one of the fastest-growing and most desirable residential areas in the valley. Newer construction, above-average schools, strong retail infrastructure, and proximity to both the Strip and Red Rock Canyon make it popular with families and professionals."
  },
  {
    "q": "What schools serve Southwest Las Vegas?",
    "a": "The area is served by newer CCSD schools including Sierra Vista High School and Del E. Webb Middle School. Charter options like Pinecrest Academy and Doral Academy rate highly. Bishop Gorman High School (A+) is the top private option."
  },
  {
    "q": "How close is Southwest Las Vegas to the Strip?",
    "a": "Most of Southwest Las Vegas is 15–20 minutes from the Strip via I-15 North or Las Vegas Boulevard. The I-215 Beltway provides an alternate fast route."
  },
  {
    "q": "What communities are in Southwest Las Vegas?",
    "a": "Major communities include Southern Highlands (guard-gated golf), Mountains Edge (master-planned family), Rhodes Ranch (guard-gated golf), Coronado Ranch, Enterprise, and Silverado Ranch, among others."
  },
  {
    "q": "Is Southwest Las Vegas still growing?",
    "a": "Yes. Active new construction continues throughout Southwest Las Vegas with builders releasing new phases in Mountains Edge, Enterprise, and surrounding areas. Retail and commercial development follows the residential growth."
  },
  {
    "q": "Is Southwest Las Vegas good for investment?",
    "a": "Southwest Las Vegas offers strong investment fundamentals: newer construction, growing population, strong rental demand, and limited remaining developable land. Appreciation has been consistent across market cycles."
  },
  {
    "q": "What are the best neighborhoods for families?",
    "a": "Family-oriented neighborhoods with top-rated schools, parks, and community amenities are found throughout the area. The best fit depends on budget, school preferences, and commute needs. Nevada Real Estate Group can provide neighborhood-specific guidance based on your family's priorities."
  },
  {
    "q": "How do property taxes compare to other areas?",
    "a": "Nevada has no state income tax, and property tax rates are among the lowest in the country. Clark County property taxes are typically 0.5-0.7% of assessed value (not market value). A ,000 home might pay ,500-,500 per year in property taxes."
  },
  {
    "q": "What is the rental market like for investors?",
    "a": "The Las Vegas metro area has a strong rental market driven by population growth, tourism industry employment, and relocation from higher-cost states. Rental yields vary by area and property type but typically range from 4-7% gross depending on location and price point."
  },
  {
    "q": "How has the market performed over the past year?",
    "a": "The Las Vegas housing market has shown steady appreciation with moderate inventory growth. Prices have increased year-over-year while days on market have normalized from pandemic-era lows. Contact Nevada Real Estate Group for the most current market data specific to this area."
  },
  {
    "q": "What should I know about buying in Nevada as an out-of-state buyer?",
    "a": "Nevada offers significant tax advantages including no state income tax, no inheritance tax, and relatively low property taxes. The buying process is similar to most states. Out-of-state buyers can complete most of the process remotely with the help of a local agent. Nevada Real Estate Group works with relocation buyers regularly."
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
  name: 'Southwest Las Vegas',
  description: 'Southwest Las Vegas is a suburban · area hub community in Las Vegas, Nevada (ZIP 89113), established in 1996, spanning ~45 sq mi. Home prices range from $300K–$1M+.',
  geo: { '@type': 'GeoCoordinates', latitude: 36.03, longitude: -115.26 },
  address: { '@type': 'PostalAddress', addressLocality: 'Las Vegas', addressRegion: 'NV', postalCode: '89113', addressCountry: 'US' },
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
  const cms = await getCommunityPage('southwest-las-vegas')
  return {
    title: cms?.metaTitle ?? 'Southwest Las Vegas Homes for Sale | Nevada Real Estate Group',
    description: cms?.metaDescription ?? 'Browse Southwest Las Vegas homes for sale in Las Vegas, NV. $300K–$1M+. Schools, HOA, market stats. Nevada Real Estate Group.',
    alternates: { canonical: 'https://www.lasvegashomesearchexperts.com/southwest-las-vegas' },
  }
}

export default async function SouthwestLasVegasPage() {
  const cms = await getCommunityPage('southwest-las-vegas')
  const market = getMarketStats('southwest-las-vegas')
  const ms = market?.stats

  const heroHeadline = cms?.heroHeadline ?? 'Southwest Las Vegas'
  const heroSubtitle = 'Homes for Sale in Las Vegas, Nevada'
  const overviewTitle = cms?.overviewTitle ?? 'Southwest Las Vegas: Suburban · Area Hub Living in Las Vegas'

  const HARDCODED_STATS: Array<[string, string] | [string, string, string]> = [
    ['Established', '1996'],
    ['Developer', 'Various'],
    ['Total Acreage', '~45 sq mi'],
    ['Homes', '75,000+'],
    ['Median Home Price', ms?.medianSalePrice ?? '$300K–$1M+'],
    ['ZIP Codes', '89113, 89139, 89141, 89148, 89178, 89179'],
    ['Guard-Gated', 'No'],
    ['HOA', '$25–$300/mo'],
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
        "route": "via I-215 East → I-15 North"
    },
    {
        "time": "~15 min",
        "destination": "to Red Rock Canyon",
        "route": "via Blue Diamond Rd West"
    },
    {
        "time": "~20 min",
        "destination": "to Henderson",
        "route": "via I-215 East"
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
          <a href="/communities">Communities</a>
          <span className="breadcrumb-sep">&rsaquo;</span>
          <span>Southwest Las Vegas</span>
        </div>
      </div>

      <header id="hero" className="summerlin-hero hero-v2">
        <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1600&h=700&q=80" alt="Southwest Las Vegas community aerial view, Las Vegas Nevada" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
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
                <span className="hero-v2-stat-num">{ms?.medianSalePrice ?? qs('Median Home Price', '$300K–$1M+')}</span>
                <span className="hero-v2-stat-lbl">Median Sale Price</span>
              </div>
              <div className="hero-v2-stat">
                <span className="hero-v2-stat-num">{ms?.avgDaysToClose ?? qs('Avg Days on Market', '45')}</span>
                <span className="hero-v2-stat-lbl">Avg Days to Close</span>
              </div>
            </div>
            <a href="#listings" className="hero-v2-cta">Search Homes in Southwest Las Vegas</a>
          </div>
        </div>
      </header>

      <div className="hero-v2-qfb">
        <div className="container">
          <div className="hero-v2-qfb-row">
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <span><strong>ZIP:</strong> 89113, 89139, 89141, 89148, 89178, 89179</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              <span><strong>Type:</strong> Suburban · Area Hub</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
              <span><strong>Price Range:</strong> $300K–$1M+</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
              <span><strong>HOA:</strong> $25–$300/mo</span>
            </div>
          </div>
          <div className="hero-v2-qfb-est">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            <span>Est. 1996</span>
          </div>
        </div>
      </div>

      <section id="demographics" className="demographics-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Demographics</span>
            <h2>Southwest Las Vegas Demographics</h2>
          </div>
          <div className="demo-grid">
            {[
              ['200,000+', 'Population'],
              ['36', 'Median Age'],
              ['$75,000', 'Avg Household Income'],
              ['75,000+', 'Total Households'],
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
            <h2>Where is Southwest Las Vegas?</h2>
            <p>Las Vegas, Nevada &mdash; Las Vegas, Nevada.</p>
          </div>
          <div className="map-container">
            <SouthwestLasVegasMapWrapper />
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
            <h2 className="listings-title">NEW SOUTHWEST LAS VEGAS LISTINGS</h2>
          </div>
          <div className="ylopo-wrap">
            <div className="YLOPO_searchWidget" />
            <div className="YLOPO_resultsWidget" data-search='{"propertyTypes":["house","condo","townhouse"],"minPrice":300000,"locations":[{"city":"Las Vegas","state":"NV"}],"limit":12,"sortBy":"listDate","sortOrder":"desc","keywords":"Southwest Las Vegas","zipCodes":["89113","89139","89141","89148","89178","89179"]}' />
          </div>
          <p className="ylopo-note">Listing data sourced from regional MLS. Information deemed reliable but not guaranteed. Updated daily.</p>
          <div className="listings-actions">
            <a href="https://search.nevadarealestategroup.net/search?s[orderBy]=sourceCreationDate%2Cdesc&s[page]=1&s[locations][0][city]=Las%20Vegas&s[locations][0][state]=NV&s[keywords]=Southwest%20Las%20Vegas" target="_blank" rel="noopener noreferrer" className="btn-gold">View All Southwest Las Vegas Listings &rarr;</a>
            <Link href="/communities" className="btn-outline">&larr; Back to All Communities</Link>
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
                  <p>Southwest Las Vegas is a suburban · area hub community in Las Vegas, Nevada (ZIP 89113/89139), established in 1996, spanning ~45 sq mi, with 75,000+ homes. Southwest Las Vegas has evolved from empty desert into one of the most sought-after residential corridors in the entire Las Vegas Valley. Stretching from Blue Diamond Road south to the edge of the valley floor and from I-15 west toward the Spring Mountains, this expansive area encompasses dozens of master-planned communities, established neighborhoods, and brand-new developments. Communities like Southern Highlands, Mountains Edge, Rhodes Ranch, and Enterprise all fall within the broader Southwest Las Vegas zone, making it the single largest concentration of newer suburban housing in Clark County.</p>
                  <p>The appeal of Southwest Las Vegas is straightforward: newer construction, strong schools, growing commercial infrastructure, and proximity to both the Strip and Red Rock Canyon. Homes range from entry-level townhomes in the low $300,000s to guard-gated estates exceeding $1 million in communities like Southern Highlands and Spanish Trail. The I-215 Beltway provides a fast commute loop connecting the southwest to Henderson, Summerlin, and the airport, while Blue Diamond Road offers direct access to Red Rock Canyon's scenic loop.</p>
                  <p>Retail, dining, and medical services have expanded dramatically in the southwest corridor over the past decade. The intersection of Durango and Blue Diamond has become a major commercial hub, with new shopping centers, grocery anchors, medical offices, and restaurant clusters opening annually. Mountain's Edge Marketplace and the growing Town Center Drive corridor near Southern Highlands provide additional lifestyle infrastructure that reduces the need to commute for daily errands.</p>
                  <p>Southwest Las Vegas continues to attract families relocating from California, first-time move-up buyers seeking newer construction, and investors drawn by strong rental demand and consistent appreciation. The area's combination of value pricing relative to Summerlin, proximity to employment corridors along the Strip and I-15, and a growing base of schools rated above the CCSD average make it one of the strongest long-term residential investments in the valley.</p>
                </>
              )}
            </div>
            <div className="overview-aside">
              <div className="quick-facts">
                <h3>Southwest Las Vegas At a Glance</h3>
                {displayStats.map(([label, value, cls]: any) => (
                  <div className="fact-row" key={label}>
                    <span className="fact-label">{label}</span>
                    <span className={`fact-value${cls ? ' ' + cls : ''}`}>{value}</span>
                  </div>
                ))}
              </div>
              <div className="cta-card">
                <p>Ready to explore Southwest Las Vegas? Schedule a private tour of the community and the current listings that match your goals.</p>
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
            <h2>Top 7 Facts About Southwest Las Vegas</h2>
          </div>
          <ol className="top-facts-list">
            <li key={0}>Southwest Las Vegas spans ~45 sq mi in Las Vegas, Nevada (ZIP 89113, 89139).</li>
            <li key={1}>Southwest Las Vegas was established in 1996.</li>
            <li key={2}>Southwest Las Vegas contains 75,000+ homes with prices ranging from $300K–$1M+.</li>
            <li key={3}>Southwest Las Vegas is a suburban · area hub community.</li>
            <li key={4}>HOA fees in Southwest Las Vegas range from $25–$300/mo per month.</li>
            <li key={5}>Top-rated schools serving Southwest Las Vegas include Pinecrest Academy of Nevada — Inspirada (8/10) and Del E. Webb Middle School (7/10).</li>
            <li key={6}>Southwest Las Vegas is located ~15 min to the Strip via I-15 North.</li>
          </ol>
        </div>
      </section>

      <section id="highlights">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Why Southwest Las Vegas</span>
            <h2>What Makes Southwest Las Vegas Stand Out</h2>
          </div>
          <div className="highlights-grid">
            {[
              { title: 'Newer Construction', body: 'The majority of homes in Southwest Las Vegas were built from the mid-2000s onward, offering modern floor plans, energy-efficient construction, and contemporary finishes throughout.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
              { title: 'Red Rock Canyon Access', body: 'Blue Diamond Road provides direct access to Red Rock Canyon National Conservation Area\'s 13-mile scenic loop drive, hiking trails, and climbing areas — all within 15–20 minutes.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M8 21l4-11 4 11"/><path d="M2 21l5-14 4 8"/><path d="M14 15l4-8 4 14"/><line x1="2" y1="21" x2="22" y2="21"/></svg> },
              { title: 'I-215 Beltway Connectivity', body: 'The I-215 Beltway runs through the heart of Southwest Las Vegas, connecting residents to Henderson, Summerlin, and Harry Reid Airport without touching the Strip traffic.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><line x1="8" y1="6" x2="8" y2="6.01"/><line x1="12" y1="6" x2="12" y2="6.01"/><line x1="16" y1="6" x2="16" y2="6.01"/><line x1="8" y1="10" x2="8" y2="10.01"/><line x1="12" y1="10" x2="12" y2="10.01"/><line x1="16" y1="10" x2="16" y2="10.01"/><line x1="8" y1="14" x2="8" y2="14.01"/><line x1="12" y1="14" x2="12" y2="14.01"/><line x1="16" y1="14" x2="16" y2="14.01"/></svg> },
              { title: 'Growing Commercial Hub', body: 'Major retail centers along Durango, Blue Diamond, and Town Center Drive provide comprehensive shopping, dining, medical, and professional services close to home.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22c4-4 8-7.5 8-12a8 8 0 10-16 0c0 4.5 4 8 8 12z"/><circle cx="12" cy="10" r="3"/></svg> },
              { title: 'Above-Average Schools', body: 'Newer CCSD schools in the southwest corridor consistently rate above the district average. Multiple charter and private school options complement public campuses.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M4 19.5A2.5 2.5 0 006.5 22H20V2H6.5A2.5 2.5 0 004 4.5v15z"/></svg> },
              { title: 'Strong Appreciation', body: 'Southwest Las Vegas has posted some of the most consistent appreciation rates in the valley, driven by new construction demand, population growth, and limited remaining developable land.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg> },
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
            <h2>Parks &amp; Recreation Near Southwest Las Vegas</h2>
          </div>
          <div className="parks-grid">
            {[
              { name: 'Mountain\'s Edge Regional Park', address: '6101 Mountain\'s Edge Pkwy, Las Vegas, NV 89141', acreage: '~100 acres', amenities: ["Exploration peak trail","Amphitheater","Playground","Sports fields","Splash pad","Dog park"] },
              { name: 'Arroyo Grande Sports Complex', address: '298 Arroyo Grande Blvd, Henderson, NV 89012', acreage: '~60 acres', amenities: ["Baseball fields","Soccer fields","Playground","Walking trails","Shade pavilions"] },
              { name: 'Cornerstone Park', address: '1600 Wigwam Pkwy, Henderson, NV 89074', acreage: '~100 acres', amenities: ["Fishing lake","Walking trails","Playground","Picnic areas","Wildlife viewing"] },
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
            <h2>The Southwest Las Vegas Lifestyle</h2>
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
              <div className="lifestyle-v2-stat">75,000+</div>
              <div className="lifestyle-v2-label">Homes</div>
            </div>
            <div className="lifestyle-v2-item">
              <div className="lifestyle-v2-icon"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 2v10l7 4"/></svg></div>
              <div className="lifestyle-v2-stat">1996</div>
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
            <h2>HOA Information for Southwest Las Vegas</h2>
          </div>
          <div className="hoa-grid">
            <div className="hoa-fees-col">
              <h3>Fees &amp; Management</h3>
              <div className="hoa-fee-row"><span>Monthly HOA Range</span><strong>$25–$300/mo</strong></div>
              <div className="hoa-fee-row"><span>Guard-Gated</span><strong>No</strong></div>
              <div className="hoa-fee-row"><span>Community Type</span><strong>Suburban · Area Hub</strong></div>
              <div className="hoa-management">
                <p className="hoa-mgmt-label">Management</p>
                <p className="hoa-mgmt-value">Community Association</p>
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
            <h2>Schools Serving Southwest Las Vegas</h2>
          </div>
          <div className="schools-v2-table">
            <div className="schools-v2-header">
              <span>School Name</span>
              <span>Grades</span>
              <span>Rating</span>
            </div>
            {[
              ['Pinecrest Academy of Nevada — Inspirada', 'K–12', '8/10'],
              ['Del E. Webb Middle School', '6–8', '7/10'],
              ['Sierra Vista High School', '9–12', '6/10'],
              ['Bishop Gorman High School', '9–12', 'A+'],
              ['Henderson International School', 'PreK–12', 'A'],
              ['Challenger School — Silverado', 'PreK–8', 'A'],
              ['Pinecrest Academy of Nevada', 'K–12', '8/10'],
              ['Doral Academy of Nevada — Saddle', 'K–8', '9/10'],
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
            <h2>What Southwest Las Vegas Buyers Say</h2>
          </div>
          <div className="testimonials-grid">
            {[
              { quote: 'Nevada Real Estate Group helped us navigate the Southwest Las Vegas market when we relocated from California. They knew exactly which neighborhoods offered the best schools and value. We found our dream home in Mountains Edge within two weeks.', name: 'Carlos & Maria F.', detail: 'Bought in Southwest Las Vegas · 2024' },
              { quote: 'We had been renting near the Strip for years and wanted to buy our first home. Nevada Real Estate Group showed us the southwest corridor and we couldn\'t believe the quality of newer construction we could afford. Best decision we ever made.', name: 'Sarah K.', detail: 'Bought in Southwest Las Vegas · 2025' },
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

      <SouthwestLasVegasFAQ />

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
              { name: 'Southern Highlands', href: '/southern-highlands/', price: 'From $550K', compare: 'Guard-gated golf community with Jack Nicklaus course and luxury homes.' },
              { name: 'Mountains Edge', href: '/mountains-edge/', price: 'From $375K', compare: 'Master-planned community with parks, trails, and mountain views.' },
              { name: 'Rhodes Ranch', href: '/rhodes-ranch/', price: 'From $350K', compare: 'Guard-gated golf community with Ted Robinson course and resort amenities.' },
              { name: 'Enterprise', href: '/enterprise/', price: 'From $350K', compare: 'Rapidly growing area with newer construction and expanding commercial infrastructure.' },
              { name: 'Spring Valley', href: '/spring-valley/', price: 'From $300K', compare: 'Established central community with mature neighborhoods and strong retail access.' },
              { name: 'Summerlin', href: '/summerlin/', price: 'From $450K', compare: 'Premier master-planned community in the west valley with guard-gated enclaves.' },
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
              <h2>Ready to Find Your Southwest Las Vegas Home?</h2>
              <p>Nevada Real Estate Group is the #1 real estate team in Nevada. Whether you&apos;re buying or selling in Southwest Las Vegas, let&apos;s talk.</p>
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
                <input type="hidden" name="_subject" value="Southwest Las Vegas Inquiry — LasVegasHomeSearchExperts.com" />
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
