import LasVegasSunriseManorFAQ from '@/components/LasVegasSunriseManorFAQ'
import Link from 'next/link'
import type { Metadata } from 'next'
import LasVegasSunriseManorMapWrapper from '@/components/LasVegasSunriseManorMapWrapper'
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
    { '@type': 'ListItem', position: 3, name: 'Sunrise Manor', item: 'https://www.lasvegashomesearchexperts.com/las-vegas-sunrise-manor/' },
  ],
}

const FAQ_DATA = [
  {
    "q": "What is the price range for homes in Sunrise Manor?",
    "a": "Homes in Sunrise Manor range from approximately $200,000 for older homes in the western sections to $400,000 or more for newer construction near Sunrise Mountain."
  },
  {
    "q": "Is Sunrise Manor part of Las Vegas?",
    "a": "Sunrise Manor is an unincorporated community in Clark County. While it uses Las Vegas mailing addresses, it is not part of the City of Las Vegas. County services are provided by Clark County."
  },
  {
    "q": "What ZIP codes are in Sunrise Manor?",
    "a": "Sunrise Manor spans multiple ZIP codes including 89110, 89115, 89156, and 89142 in the eastern Las Vegas Valley."
  },
  {
    "q": "Is Sunrise Manor near Nellis Air Force Base?",
    "a": "Yes. Sunrise Manor is adjacent to Nellis Air Force Base, which provides a steady demand for housing from military families and personnel."
  },
  {
    "q": "Is Sunrise Manor a good investment?",
    "a": "Sunrise Manor offers some of the highest cap rates in the Las Vegas Valley for rental investors. Affordable entry prices, steady military rental demand, and improving infrastructure create a compelling investment case."
  },
  {
    "q": "What schools serve Sunrise Manor?",
    "a": "Sunrise Manor is served by CCSD schools including Chaparral High School and several elementary and middle schools. Charter schools like Mater Academy (7/10) provide additional options."
  },
  {
    "q": "How far is Sunrise Manor from the Strip?",
    "a": "Sunrise Manor is approximately 15 minutes from the Las Vegas Strip via Lake Mead Boulevard and I-15, depending on which part of the community you're in."
  },
  {
    "q": "Is Sunrise Manor growing?",
    "a": "Yes. Clark County continues to invest in infrastructure improvements throughout Sunrise Manor, and newer developments in the eastern sections are attracting families and professionals seeking affordable housing."
  },
  {
    "q": "What are the best sub-neighborhoods within Sunrise Manor?",
    "a": "The best sub-neighborhood depends on your priorities — school zones, lot size, home age, and proximity to amenities all vary within the community. Nevada Real Estate Group agents who specialize in Sunrise Manor can walk you through the specific blocks and streets that match your criteria."
  },
  {
    "q": "How is new construction availability in Sunrise Manor?",
    "a": "New construction availability varies by season and builder phase. Some sections of Sunrise Manor have active new home sales while others are fully built out with resale-only inventory. Contact Nevada Real Estate Group for the most current new construction options."
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
  name: 'Sunrise Manor',
  description: 'Sunrise Manor is a established · unincorporated community in Las Vegas, Nevada (ZIP 89110), established in 1950s, spanning ~33 sq mi. Home prices range from $200K–$400K.',
  geo: { '@type': 'GeoCoordinates', latitude: 36.18, longitude: -115.075 },
  address: { '@type': 'PostalAddress', addressLocality: 'Las Vegas', addressRegion: 'NV', postalCode: '89110', addressCountry: 'US' },
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
  const cms = await getCommunityPage('las-vegas-sunrise-manor')
  return {
    title: cms?.metaTitle ?? 'Sunrise Manor Homes for Sale | Nevada Real Estate Group',
    description: cms?.metaDescription ?? 'Browse Sunrise Manor homes for sale in Las Vegas, NV. $200K–$400K. Schools, HOA, market stats. Nevada Real Estate Group.',
    alternates: { canonical: 'https://www.lasvegashomesearchexperts.com/las-vegas-sunrise-manor' },
  }
}

export default async function LasVegasSunriseManorPage() {
  const cms = await getCommunityPage('las-vegas-sunrise-manor')
  const market = getMarketStats('las-vegas-sunrise-manor')
  const ms = market?.stats

  const heroHeadline = cms?.heroHeadline ?? 'Sunrise Manor'
  const heroSubtitle = 'Homes for Sale in Las Vegas, Nevada'
  const overviewTitle = cms?.overviewTitle ?? 'Sunrise Manor: Established · Unincorporated Living in Las Vegas'

  const HARDCODED_STATS: Array<[string, string] | [string, string, string]> = [
    ['Established', '1950s'],
    ['Developer', 'Various'],
    ['Total Acreage', '~33 sq mi'],
    ['Homes', '50,000+'],
    ['Median Home Price', ms?.medianSalePrice ?? '$200K–$400K'],
    ['ZIP Codes', '89110, 89115, 89156, 89142'],
    ['Guard-Gated', 'No'],
    ['HOA', '$0–$50/mo'],
  ]
  const displayStats = mergeQuickStats(HARDCODED_STATS, cms?.quickStats)
  const HARDCODED_DRIVE_TIMES = [
    {
        "time": "~15 min",
        "destination": "to the Strip",
        "route": "via Lake Mead Blvd → I-15"
    },
    {
        "time": "~10 min",
        "destination": "to Downtown Las Vegas",
        "route": "via Las Vegas Blvd / Fremont St"
    },
    {
        "time": "~20 min",
        "destination": "to Harry Reid Airport",
        "route": "via I-515 South"
    },
    {
        "time": "~5 min",
        "destination": "to Nellis AFB",
        "route": "via Nellis Blvd"
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
          <span>Sunrise Manor</span>
        </div>
      </div>

      <header id="hero" className="summerlin-hero hero-v2">
        <img src="https://images.unsplash.com/photo-1581351721010-8cf859cb14a4?auto=format&fit=crop&w=1600&h=700&q=80" alt="Sunrise Manor community aerial view, Las Vegas Nevada" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
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
                <span className="hero-v2-stat-num">{ms?.medianSalePrice ?? qs('Median Home Price', '$200K–$400K')}</span>
                <span className="hero-v2-stat-lbl">Median Sale Price</span>
              </div>
              <div className="hero-v2-stat">
                <span className="hero-v2-stat-num">{ms?.avgDaysToClose ?? qs('Avg Days on Market', '45')}</span>
                <span className="hero-v2-stat-lbl">Avg Days to Close</span>
              </div>
            </div>
            <a href="#listings" className="hero-v2-cta">Search Homes in Sunrise Manor</a>
          </div>
        </div>
      </header>

      <div className="hero-v2-qfb">
        <div className="container">
          <div className="hero-v2-qfb-row">
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <span><strong>ZIP:</strong> 89110, 89115, 89156, 89142</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              <span><strong>Type:</strong> Established · Unincorporated</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
              <span><strong>Price Range:</strong> $200K–$400K</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
              <span><strong>HOA:</strong> $0–$50/mo</span>
            </div>
          </div>
          <div className="hero-v2-qfb-est">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            <span>Est. 1950s</span>
          </div>
        </div>
      </div>

      <section id="demographics" className="demographics-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Demographics</span>
            <h2>Sunrise Manor Demographics</h2>
          </div>
          <div className="demo-grid">
            {[
              ['190,000+', 'Population'],
              ['34', 'Median Age'],
              ['$40,000', 'Avg Household Income'],
              ['55,000+', 'Total Households'],
              ['48%', 'Homeownership Rate'],
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
            <h2>Where is Sunrise Manor?</h2>
            <p>Las Vegas, Nevada &mdash; Las Vegas, Nevada.</p>
          </div>
          <div className="map-container">
            <LasVegasSunriseManorMapWrapper />
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
            <h2 className="listings-title">NEW SUNRISE MANOR LISTINGS</h2>
          </div>
          <div className="ylopo-wrap">
            <div className="YLOPO_searchWidget" />
            <div className="YLOPO_resultsWidget" data-search='{"propertyTypes":["house","condo","townhouse"],"minPrice":150000,"locations":[{"city":"Las Vegas","state":"NV"}],"limit":12,"sortBy":"listDate","sortOrder":"desc","keywords":"Sunrise Manor","zipCodes":["89110","89115","89156","89142"]}' />
          </div>
          <p className="ylopo-note">Listing data sourced from regional MLS. Information deemed reliable but not guaranteed. Updated daily.</p>
          <div className="listings-actions">
            <a href="https://search.nevadarealestategroup.net/search?s[orderBy]=sourceCreationDate%2Cdesc&s[page]=1&s[locations][0][city]=Las%20Vegas&s[locations][0][state]=NV&s[keywords]=Sunrise%20Manor" target="_blank" rel="noopener noreferrer" className="btn-gold">View All Sunrise Manor Listings &rarr;</a>
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
                  <p>Sunrise Manor is a established · unincorporated community in Las Vegas, Nevada (ZIP 89110/89115), established in 1950s, spanning ~33 sq mi, with 50,000+ homes. Sunrise Manor is one of the largest unincorporated communities in Clark County, covering approximately 33 square miles in the eastern Las Vegas Valley. With a population exceeding 190,000, it is home to more residents than many independently incorporated Nevada cities. The community stretches from east of downtown Las Vegas toward the foothills of Frenchman Mountain and Sunrise Mountain, offering vast panoramic views of the desert landscape and surrounding mountain ranges.</p>
                  <p>Development in Sunrise Manor began in the 1950s and has continued through every subsequent decade, resulting in a remarkably diverse housing stock. The western sections near downtown feature older ranch homes and modest bungalows, while the eastern areas toward Nellis Air Force Base and the foothill communities include newer construction from the 2000s and 2010s. This diversity is reflected in the pricing, which ranges from approximately $200,000 for older homes in need of updating to $400,000 or more for newer or renovated properties in desirable sections.</p>
                  <p>Sunrise Manor's proximity to Nellis Air Force Base is a defining characteristic. The base provides a steady stream of military families seeking housing in the surrounding neighborhoods, supporting consistent rental demand and a built-in tenant pool. The Sunrise Marketplace, Nellis Boulevard corridor, and the growing retail infrastructure along Lake Mead Boulevard provide essential commercial services to the community.</p>
                  <p>For investors and budget-conscious buyers, Sunrise Manor offers some of the lowest entry prices in the Las Vegas metro with meaningful upside potential. The community's eastern sections near Sunrise Mountain provide scenic desert views and newer construction, while western sections closer to downtown benefit from urban revitalization and improving infrastructure. The area is served by multiple CCSD schools and charter options, and ongoing Clark County improvements continue to enhance livability.</p>
                </>
              )}
            </div>
            <div className="overview-aside">
              <div className="quick-facts">
                <h3>Sunrise Manor At a Glance</h3>
                {displayStats.map(([label, value, cls]: any) => (
                  <div className="fact-row" key={label}>
                    <span className="fact-label">{label}</span>
                    <span className={`fact-value${cls ? ' ' + cls : ''}`}>{value}</span>
                  </div>
                ))}
              </div>
              <div className="cta-card">
                <p>Ready to explore Sunrise Manor? Schedule a private tour of the community and the current listings that match your goals.</p>
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
            <h2>Top 7 Facts About Sunrise Manor</h2>
          </div>
          <ol className="top-facts-list">
            <li key={0}>Sunrise Manor spans ~33 sq mi in Las Vegas, Nevada (ZIP 89110, 89115).</li>
            <li key={1}>Sunrise Manor was established in 1950s.</li>
            <li key={2}>Sunrise Manor contains 50,000+ homes with prices ranging from $200K–$400K.</li>
            <li key={3}>Sunrise Manor is a established · unincorporated community.</li>
            <li key={4}>HOA fees in Sunrise Manor range from $0–$50/mo per month.</li>
            <li key={5}>Top-rated schools serving Sunrise Manor include Elise L. Wolff Elementary (5/10) and Brinley Middle School (4/10).</li>
            <li key={6}>Sunrise Manor is located ~15 min to the Strip via Lake Mead Blvd → I-15.</li>
          </ol>
        </div>
      </section>

      <section id="highlights">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Why Sunrise Manor</span>
            <h2>What Makes Sunrise Manor Stand Out</h2>
          </div>
          <div className="highlights-grid">
            {[
              { title: 'Most Affordable in Las Vegas', body: 'Entry prices starting around $200,000 make Sunrise Manor one of the most accessible communities in the Las Vegas Valley for first-time buyers and investors alike.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
              { title: 'Nellis AFB Proximity', body: 'Adjacent to Nellis Air Force Base, providing steady demand from military families. Consistent rental income potential from the base\'s large active-duty population.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
              { title: 'Mountain Views', body: 'Eastern sections offer dramatic views of Sunrise Mountain, Frenchman Mountain, and the desert landscape. Higher-elevation lots command premium views.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M8 21l4-11 4 11"/><path d="M2 21l5-14 4 8"/><path d="M14 15l4-8 4 14"/><line x1="2" y1="21" x2="22" y2="21"/></svg> },
              { title: 'Diverse Housing Stock', body: 'From 1950s ranch homes to 2010s new construction, Sunrise Manor offers the widest variety of home styles and price points in the east valley.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><line x1="8" y1="6" x2="8" y2="6.01"/><line x1="12" y1="6" x2="12" y2="6.01"/><line x1="16" y1="6" x2="16" y2="6.01"/><line x1="8" y1="10" x2="8" y2="10.01"/><line x1="12" y1="10" x2="12" y2="10.01"/><line x1="16" y1="10" x2="16" y2="10.01"/><line x1="8" y1="14" x2="8" y2="14.01"/><line x1="12" y1="14" x2="12" y2="14.01"/><line x1="16" y1="14" x2="16" y2="14.01"/></svg> },
              { title: 'Growing Infrastructure', body: 'Clark County continues to invest in road improvements, park upgrades, and commercial development throughout Sunrise Manor. The infrastructure gap is closing.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22c4-4 8-7.5 8-12a8 8 0 10-16 0c0 4.5 4 8 8 12z"/><circle cx="12" cy="10" r="3"/></svg> },
              { title: 'Investment Upside', body: 'Among the highest cap rates in the Las Vegas Valley for rental investors. Affordable entry with strong appreciation potential as the east valley continues to develop.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg> },
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
            <h2>Parks &amp; Recreation Near Sunrise Manor</h2>
          </div>
          <div className="parks-grid">
            {[
              { name: 'Sunrise Park', address: '2240 Linn Ln, Las Vegas, NV 89115', acreage: '~12 acres', amenities: ["Swimming pool","Sports fields","Playground","Community center","Picnic areas"] },
              { name: 'Shadow Rock Park', address: '2650 Los Feliz St, Las Vegas, NV 89156', acreage: '~10 acres', amenities: ["Walking trails","Playground","Sports courts","Picnic shelters"] },
              { name: 'Gary Reese Freedom Park', address: '850 N Mojave Rd, Las Vegas, NV 89101', acreage: '~30 acres', amenities: ["Sports fields","Swimming pool","Playground","Tennis courts","Community center"] },
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
            <h2>The Sunrise Manor Lifestyle</h2>
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
              <div className="lifestyle-v2-stat">50,000+</div>
              <div className="lifestyle-v2-label">Homes</div>
            </div>
            <div className="lifestyle-v2-item">
              <div className="lifestyle-v2-icon"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 2v10l7 4"/></svg></div>
              <div className="lifestyle-v2-stat">1950s</div>
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
            <h2>HOA Information for Sunrise Manor</h2>
          </div>
          <div className="hoa-grid">
            <div className="hoa-fees-col">
              <h3>Fees &amp; Management</h3>
              <div className="hoa-fee-row"><span>Monthly HOA Range</span><strong>$0–$50/mo</strong></div>
              <div className="hoa-fee-row"><span>Guard-Gated</span><strong>No</strong></div>
              <div className="hoa-fee-row"><span>Community Type</span><strong>Established · Unincorporated</strong></div>
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
            <h2>Schools Serving Sunrise Manor</h2>
          </div>
          <div className="schools-v2-table">
            <div className="schools-v2-header">
              <span>School Name</span>
              <span>Grades</span>
              <span>Rating</span>
            </div>
            {[
              ['Elise L. Wolff Elementary', 'K–5', '5/10'],
              ['Brinley Middle School', '6–8', '4/10'],
              ['Chaparral High School', '9–12', '4/10'],
              ['Mountain View Christian Academy', 'K–12', 'B+'],
              ['Bishop Gorman High School', '9–12', 'A+'],
              ['Explore Knowledge Academy', 'K–12', '6/10'],
              ['Mater Academy of Nevada', 'K–8', '7/10'],
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
            <h2>What Sunrise Manor Buyers Say</h2>
          </div>
          <div className="testimonials-grid">
            {[
              { quote: 'Nevada Real Estate Group helped us buy our first home in Sunrise Manor on a budget we never thought possible. They found a newer home near Sunrise Mountain with views we love.', name: 'Sgt. Michael & Tanya R.', detail: 'Bought in Sunrise Manor · 2024' },
              { quote: 'We own three rental properties in Sunrise Manor now, all sourced through Nevada Real Estate Group. The military tenant base is reliable and the cash flow is excellent.', name: 'Carlos D.', detail: 'Invested in Sunrise Manor · 2025' },
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

      <LasVegasSunriseManorFAQ />

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
              { name: 'East Las Vegas', href: '/east-las-vegas/', price: 'From $200K', compare: 'The broader east valley corridor with diverse neighborhoods and affordable housing options.' },
              { name: 'Downtown Las Vegas', href: '/downtown-las-vegas/', price: 'From $200K', compare: 'The urban core with Arts District, Fremont Street, and growing residential development.' },
              { name: 'North Las Vegas', href: '/north-las-vegas/', price: 'From $300K', compare: 'Growing city to the north with new construction, master-planned communities, and affordable housing.' },
              { name: 'Henderson', href: '/henderson/', price: 'From $350K', compare: 'The premium southeast valley city with top-rated schools and master-planned communities.' },
              { name: 'Whitney Ranch', href: '/whitney-ranch/', price: 'From $350K', compare: 'Established Henderson community with family amenities and good schools.' },
              { name: 'Boulder City', href: '/boulder-city/', price: 'From $400K', compare: 'Small-town atmosphere near Lake Mead with no gaming and a historic downtown.' },
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
              <h2>Ready to Find Your Sunrise Manor Home?</h2>
              <p>Nevada Real Estate Group is the #1 real estate team in Nevada. Whether you&apos;re buying or selling in Sunrise Manor, let&apos;s talk.</p>
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
                <input type="hidden" name="_subject" value="Sunrise Manor Inquiry — LasVegasHomeSearchExperts.com" />
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
