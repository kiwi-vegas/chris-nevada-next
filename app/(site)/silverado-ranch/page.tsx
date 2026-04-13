import SilveradoRanchFAQ from '@/components/SilveradoRanchFAQ'
import Link from 'next/link'
import type { Metadata } from 'next'
import SilveradoRanchMapWrapper from '@/components/SilveradoRanchMapWrapper'
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
    { '@type': 'ListItem', position: 3, name: 'Silverado Ranch', item: 'https://www.lasvegashomesearchexperts.com/silverado-ranch/' },
  ],
}

const FAQ_DATA = [
  {
    "q": "What is the price range for homes in Silverado Ranch?",
    "a": "Homes in Silverado Ranch range from approximately $350,000 for smaller single-story homes to $600,000 for larger upgraded properties on premium lots. The community offers some of the best values in the southern Las Vegas Valley."
  },
  {
    "q": "Is Silverado Ranch in Henderson or Las Vegas?",
    "a": "Silverado Ranch straddles the border of Henderson and unincorporated Clark County (Las Vegas mailing address). Some homes have Henderson addresses while others have Las Vegas addresses, though the community is contiguous."
  },
  {
    "q": "Is Silverado Ranch guard-gated?",
    "a": "No. Silverado Ranch is not a guard-gated community. It is an open community with HOA governance and the convenience of being near both Henderson and Las Vegas police services."
  },
  {
    "q": "What ZIP codes is Silverado Ranch in?",
    "a": "Silverado Ranch spans ZIP codes 89123 and 89183 in the Henderson/Las Vegas area. Home prices range from $350K–$600K."
  },
  {
    "q": "What are HOA fees in Silverado Ranch?",
    "a": "HOA fees in Silverado Ranch are among the lowest in the valley, typically ranging from $40 to $120 per month. Fees cover common area maintenance and community landscaping."
  },
  {
    "q": "What schools serve Silverado Ranch?",
    "a": "Silverado Ranch is served by CCSD schools including Elise L. Wolff Elementary (6/10), Silvestri Junior High (5/10), and Silverado High School (5/10). Charter options include Doral Academy (9/10) and Somerset Academy (8/10)."
  },
  {
    "q": "Is there a hospital near Silverado Ranch?",
    "a": "Yes. St. Rose Dominican Hospital — Siena Campus is located within the Silverado Ranch community, providing immediate access to emergency care, surgery, and specialty medical services."
  },
  {
    "q": "How far is Silverado Ranch from the Strip?",
    "a": "Silverado Ranch is approximately 15 minutes from the Las Vegas Strip via I-15. Harry Reid International Airport is also about 15 minutes away. The community's central location makes it one of the most convenient in the valley."
  },
  {
    "q": "What are the best sub-neighborhoods within Silverado Ranch?",
    "a": "The best sub-neighborhood depends on your priorities — school zones, lot size, home age, and proximity to amenities all vary within the community. Nevada Real Estate Group agents who specialize in Silverado Ranch can walk you through the specific blocks and streets that match your criteria."
  },
  {
    "q": "How is new construction availability in Silverado Ranch?",
    "a": "New construction availability varies by season and builder phase. Some sections of Silverado Ranch have active new home sales while others are fully built out with resale-only inventory. Contact Nevada Real Estate Group for the most current new construction options."
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
  name: 'Silverado Ranch',
  description: 'Silverado Ranch is a master-planned · established community in Henderson, Nevada (ZIP 89123), established in 1996 by Various builders, spanning ~2,000 acres. Home prices range from $350K–$600K.',
  geo: { '@type': 'GeoCoordinates', latitude: 36.02, longitude: -115.118 },
  address: { '@type': 'PostalAddress', addressLocality: 'Henderson', addressRegion: 'NV', postalCode: '89123', addressCountry: 'US' },
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
  const cms = await getCommunityPage('silverado-ranch')
  return {
    title: cms?.metaTitle ?? 'Silverado Ranch Homes for Sale | Nevada Real Estate Group',
    description: cms?.metaDescription ?? 'Browse Silverado Ranch homes for sale in Henderson, NV. $350K–$600K. Schools, HOA, market stats. Nevada Real Estate Group.',
    alternates: { canonical: 'https://www.lasvegashomesearchexperts.com/silverado-ranch' },
  }
}

export default async function SilveradoRanchPage() {
  const cms = await getCommunityPage('silverado-ranch')
  const market = getMarketStats('silverado-ranch')
  const ms = market?.stats

  const heroHeadline = cms?.heroHeadline ?? 'Silverado Ranch'
  const heroSubtitle = 'Homes for Sale in Henderson, Nevada'
  const overviewTitle = cms?.overviewTitle ?? 'Silverado Ranch: Master-Planned · Established Living in Henderson'

  const HARDCODED_STATS: Array<[string, string] | [string, string, string]> = [
    ['Established', '1996'],
    ['Developer', 'Various builders'],
    ['Total Acreage', '~2,000 acres'],
    ['Homes', '8,000+'],
    ['Median Home Price', ms?.medianSalePrice ?? '$350K–$600K'],
    ['ZIP Codes', '89123, 89183'],
    ['Guard-Gated', 'No'],
    ['HOA', '$40–$120/mo'],
  ]
  const displayStats = mergeQuickStats(HARDCODED_STATS, cms?.quickStats)
  const HARDCODED_DRIVE_TIMES = [
    {
        "time": "~15 min",
        "destination": "to the Strip",
        "route": "via I-15"
    },
    {
        "time": "~15 min",
        "destination": "to Harry Reid Airport",
        "route": "via I-215 → I-15"
    },
    {
        "time": "~10 min",
        "destination": "to Galleria at Sunset",
        "route": "via Eastern Ave"
    },
    {
        "time": "~5 min",
        "destination": "to St. Rose Hospital",
        "route": "via Silverado Ranch Blvd"
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
          <span>Silverado Ranch</span>
        </div>
      </div>

      <header id="hero" className="summerlin-hero hero-v2">
        <img src="https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1600&h=700&q=80" alt="Silverado Ranch community aerial view, Henderson Nevada" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
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
                <span className="hero-v2-stat-num">{ms?.medianSalePrice ?? qs('Median Home Price', '$350K–$600K')}</span>
                <span className="hero-v2-stat-lbl">Median Sale Price</span>
              </div>
              <div className="hero-v2-stat">
                <span className="hero-v2-stat-num">{ms?.avgDaysToClose ?? qs('Avg Days on Market', '45')}</span>
                <span className="hero-v2-stat-lbl">Avg Days to Close</span>
              </div>
            </div>
            <a href="#listings" className="hero-v2-cta">Search Homes in Silverado Ranch</a>
          </div>
        </div>
      </header>

      <div className="hero-v2-qfb">
        <div className="container">
          <div className="hero-v2-qfb-row">
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <span><strong>ZIP:</strong> 89123, 89183</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              <span><strong>Type:</strong> Master-Planned · Established</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
              <span><strong>Price Range:</strong> $350K–$600K</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
              <span><strong>HOA:</strong> $40–$120/mo</span>
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
            <h2>Silverado Ranch Demographics</h2>
          </div>
          <div className="demo-grid">
            {[
              ['~22,000', 'Population'],
              ['38', 'Median Age'],
              ['$75,000', 'Avg Household Income'],
              ['~8,000', 'Total Households'],
              ['65%', 'Homeownership Rate'],
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
            <h2>Where is Silverado Ranch?</h2>
            <p>Henderson / Las Vegas, Nevada &mdash; Henderson, Nevada.</p>
          </div>
          <div className="map-container">
            <SilveradoRanchMapWrapper />
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
            <h2 className="listings-title">NEW SILVERADO RANCH LISTINGS</h2>
          </div>
          <div className="ylopo-wrap">
            <div className="YLOPO_searchWidget" />
            <div className="YLOPO_resultsWidget" data-search='{"propertyTypes":["house","condo","townhouse"],"minPrice":300000,"locations":[{"city":"Las Vegas","state":"NV"}],"limit":12,"sortBy":"listDate","sortOrder":"desc","keywords":"Silverado Ranch","zipCodes":["89123","89183"]}' />
          </div>
          <p className="ylopo-note">Listing data sourced from regional MLS. Information deemed reliable but not guaranteed. Updated daily.</p>
          <div className="listings-actions">
            <a href="https://search.nevadarealestategroup.net/search?s[orderBy]=sourceCreationDate%2Cdesc&s[page]=1&s[locations][0][city]=Las%20Vegas&s[locations][0][state]=NV&s[keywords]=Silverado%20Ranch" target="_blank" rel="noopener noreferrer" className="btn-gold">View All Silverado Ranch Listings &rarr;</a>
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
                  <p>Silverado Ranch is a master-planned · established community in Henderson, Nevada (ZIP 89123/89183), established in 1996, developed by Various builders, spanning ~2,000 acres. Silverado Ranch is one of the most accessible and centrally located residential communities in the Las Vegas Valley. Straddling the border of Henderson and unincorporated Clark County (Las Vegas address), the community spans approximately 2,000 acres and over 8,000 homes, making it one of the largest residential areas in the southern valley corridor. Its central position between the Strip, Henderson, and the I-15/I-215 interchange makes it exceptionally convenient for commuters.</p>
                  <p>Developed primarily from the mid-1990s through the early 2000s by a variety of national and regional builders, Silverado Ranch features homes ranging from approximately $350,000 for smaller single-story homes to $600,000 for larger upgraded properties on premium lots. The community offers a straightforward, no-frills approach to suburban living — quality single-family homes with yards, parks, and easy access to shopping, schools, and major highways.</p>
                  <p>Silverado Ranch's location along Silverado Ranch Boulevard and Eastern Avenue puts residents within minutes of multiple shopping centers, grocery stores, restaurants, and medical facilities. The Galleria at Sunset mall is a short drive north, and the premium outlets at Las Vegas South are nearby. St. Rose Dominican Hospital's Siena Campus is within the community's boundaries, providing immediate access to emergency and specialty care.</p>
                  <p>For buyers seeking an established, centrally located community with honest price points and excellent commute access, Silverado Ranch delivers outstanding value. The community's proximity to the I-215 beltway and I-15 means the Strip, Harry Reid Airport, Henderson, and Summerlin are all reachable in 15–25 minutes. Low HOA fees, solid infrastructure, and a stable resale market round out the appeal.</p>
                </>
              )}
            </div>
            <div className="overview-aside">
              <div className="quick-facts">
                <h3>Silverado Ranch At a Glance</h3>
                {displayStats.map(([label, value, cls]: any) => (
                  <div className="fact-row" key={label}>
                    <span className="fact-label">{label}</span>
                    <span className={`fact-value${cls ? ' ' + cls : ''}`}>{value}</span>
                  </div>
                ))}
              </div>
              <div className="cta-card">
                <p>Ready to explore Silverado Ranch? Schedule a private tour of the community and the current listings that match your goals.</p>
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
            <h2>Top 7 Facts About Silverado Ranch</h2>
          </div>
          <ol className="top-facts-list">
            <li key={0}>Silverado Ranch spans ~2,000 acres in Henderson, Nevada (ZIP 89123, 89183).</li>
            <li key={1}>Silverado Ranch was established in 1996 by Various builders.</li>
            <li key={2}>Silverado Ranch contains 8,000+ homes with prices ranging from $350K–$600K.</li>
            <li key={3}>Silverado Ranch is a master-planned · established community.</li>
            <li key={4}>HOA fees in Silverado Ranch range from $40–$120/mo per month.</li>
            <li key={5}>Top-rated schools serving Silverado Ranch include Elise L. Wolff Elementary (6/10) and Silvestri Junior High School (5/10).</li>
            <li key={6}>Silverado Ranch is located ~15 min to the Strip via I-15.</li>
          </ol>
        </div>
      </section>

      <section id="highlights">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Why Silverado Ranch</span>
            <h2>What Makes Silverado Ranch Stand Out</h2>
          </div>
          <div className="highlights-grid">
            {[
              { title: 'Central Valley Location', body: 'Straddling Henderson and Las Vegas with direct access to I-215 and I-15. 15–20 minutes to the Strip, Harry Reid Airport, and Henderson\'s infrastructure.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><line x1="8" y1="6" x2="8" y2="6.01"/><line x1="12" y1="6" x2="12" y2="6.01"/><line x1="16" y1="6" x2="16" y2="6.01"/><line x1="8" y1="10" x2="8" y2="10.01"/><line x1="12" y1="10" x2="12" y2="10.01"/><line x1="16" y1="10" x2="16" y2="10.01"/><line x1="8" y1="14" x2="8" y2="14.01"/><line x1="12" y1="14" x2="12" y2="14.01"/><line x1="16" y1="14" x2="16" y2="14.01"/></svg> },
              { title: 'Accessible Price Points', body: 'Homes from $350K to $600K offer some of the best value in the southern Las Vegas Valley. Established single-family homes with yards at honest prices.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg> },
              { title: 'Everyday Convenience', body: 'Multiple shopping centers, grocery stores, restaurants, and medical facilities within minutes. St. Rose Dominican Hospital is within the community\'s boundaries.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
              { title: 'Low HOA Fees', body: 'HOA fees from $40 to $120 per month — significantly lower than guard-gated and newer master-planned communities. More value in your pocket.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M8 21l4-11 4 11"/><path d="M2 21l5-14 4 8"/><path d="M14 15l4-8 4 14"/><line x1="2" y1="21" x2="22" y2="21"/></svg> },
              { title: 'Family-Friendly Parks', body: 'Silverado Ranch Park, Desert Breeze Park, and multiple neighborhood parks provide playgrounds, sports fields, pools, and walking paths throughout the community.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22c4-4 8-7.5 8-12a8 8 0 10-16 0c0 4.5 4 8 8 12z"/><circle cx="12" cy="10" r="3"/></svg> },
              { title: 'Commuter\'s Dream', body: 'The I-215/I-15 interchange is minutes away, providing direct corridors to the Strip, Harry Reid Airport, Henderson, Summerlin, and every quadrant of the valley.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
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
            <h2>Parks &amp; Recreation Near Silverado Ranch</h2>
          </div>
          <div className="parks-grid">
            {[
              { name: 'Silverado Ranch Park', address: '9855 Gilespie St, Las Vegas, NV 89183', acreage: '~20 acres', amenities: ["Sports fields","Playground","Walking paths","Basketball courts","Picnic shelters"] },
              { name: 'Desert Breeze Park', address: '8275 Spring Mountain Rd, Las Vegas, NV 89147', acreage: '~20 acres', amenities: ["Swimming pool","Skate park","Soccer fields","Playground","Walking trails"] },
              { name: 'Cornerstone Park', address: '1600 Wigwam Pkwy, Henderson, NV 89074', acreage: '~25 acres', amenities: ["Lake with fishing","Walking trails","Playground","Picnic areas","Dog park"] },
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
            <h2>The Silverado Ranch Lifestyle</h2>
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
            <h2>HOA Information for Silverado Ranch</h2>
          </div>
          <div className="hoa-grid">
            <div className="hoa-fees-col">
              <h3>Fees &amp; Management</h3>
              <div className="hoa-fee-row"><span>Monthly HOA Range</span><strong>$40–$120/mo</strong></div>
              <div className="hoa-fee-row"><span>Guard-Gated</span><strong>No</strong></div>
              <div className="hoa-fee-row"><span>Community Type</span><strong>Master-Planned · Established</strong></div>
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
            <h2>Schools Serving Silverado Ranch</h2>
          </div>
          <div className="schools-v2-table">
            <div className="schools-v2-header">
              <span>School Name</span>
              <span>Grades</span>
              <span>Rating</span>
            </div>
            {[
              ['Elise L. Wolff Elementary', 'K–5', '6/10'],
              ['Silvestri Junior High School', '6–8', '5/10'],
              ['Silverado High School', '9–12', '5/10'],
              ['Henderson International School', 'PreK–12', 'A'],
              ['Pinecrest Academy of Nevada', 'K–12', 'A'],
              ['Doral Academy of Nevada', 'K–8', '9/10'],
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
            <h2>What Silverado Ranch Buyers Say</h2>
          </div>
          <div className="testimonials-grid">
            {[
              { quote: 'Silverado Ranch was exactly what we needed — an honest home at an honest price with a 15-minute commute to the Strip. Nevada Real Estate Group helped us find a great home in a great location without breaking the budget.', name: 'Jason & Michelle K.', detail: 'Bought in Silverado Ranch · 2024' },
              { quote: 'We sold our Silverado Ranch home quickly with Nevada Real Estate Group. They positioned the central location, low HOA, and commute access perfectly. We had multiple offers within the first weekend.', name: 'Laura V.', detail: 'Sold in Silverado Ranch · 2025' },
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

      <SilveradoRanchFAQ />

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
              { name: 'Seven Hills', href: '/seven-hills/', price: 'From $500K', compare: 'Guard-gated Henderson community with golf and Strip views. Higher price range.' },
              { name: 'Green Valley Ranch', href: '/green-valley-ranch/', price: 'From $400K', compare: 'Henderson\'s premier established master plan with top schools and the GVR resort.' },
              { name: 'Whitney Ranch', href: '/whitney-ranch/', price: 'From $350K', compare: 'Central Henderson community with similar pricing and established character.' },
              { name: 'Inspirada', href: '/inspirada/', price: 'From $420K', compare: 'Newer Henderson master plan with parks, trails, and new construction.' },
              { name: 'Enterprise', href: '/enterprise/', price: 'From $350K', compare: 'Growing area south of the Strip with new-construction communities.' },
              { name: 'Mountains Edge', href: '/mountains-edge/', price: 'From $350K', compare: 'Master-planned community in southwest Las Vegas with similar price points.' },
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
              <h2>Ready to Find Your Silverado Ranch Home?</h2>
              <p>Nevada Real Estate Group is the #1 real estate team in Nevada. Whether you&apos;re buying or selling in Silverado Ranch, let&apos;s talk.</p>
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
                <input type="hidden" name="_subject" value="Silverado Ranch Inquiry — LasVegasHomeSearchExperts.com" />
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
