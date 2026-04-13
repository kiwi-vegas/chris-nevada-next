import LasVegasMeadowsVillageFAQ from '@/components/LasVegasMeadowsVillageFAQ'
import Link from 'next/link'
import type { Metadata } from 'next'
import LasVegasMeadowsVillageMapWrapper from '@/components/LasVegasMeadowsVillageMapWrapper'
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
    { '@type': 'ListItem', position: 3, name: 'Meadows Village', item: 'https://www.lasvegashomesearchexperts.com/las-vegas-meadows-village/' },
  ],
}

const FAQ_DATA = [
  {
    "q": "What is the price range for homes in Meadows Village?",
    "a": "Homes in Meadows Village range from approximately $300,000 for smaller homes to $600,000 for larger or renovated properties. The median is typically in the $350K–$400K range."
  },
  {
    "q": "What ZIP codes cover Meadows Village?",
    "a": "Meadows Village spans portions of ZIP codes 89107 and 89146 in the City of Las Vegas."
  },
  {
    "q": "Is Meadows Village near The Meadows School?",
    "a": "Yes. The Meadows School, one of Nevada's most prestigious private schools (PreK-12, A+ rating), is located adjacent to the Meadows Village neighborhood."
  },
  {
    "q": "Is the Meadows Mall still open?",
    "a": "Yes. The Meadows Mall continues to operate as a retail center, though its tenant mix has evolved over the years. It remains a commercial anchor for the surrounding neighborhood."
  },
  {
    "q": "Is Meadows Village good for investment?",
    "a": "Yes. Meadows Village offers affordable entry prices in a central location with strong rental demand. The older housing stock provides renovation opportunities with good ROI potential."
  },
  {
    "q": "How close is Meadows Village to the Strip?",
    "a": "Meadows Village is approximately 10 minutes from the Las Vegas Strip via Flamingo Road or Spring Mountain Road. The central location provides easy access to all major corridors."
  },
  {
    "q": "Are there HOAs in Meadows Village?",
    "a": "Most homes in Meadows Village have no HOA or minimal association dues under $100 per month. Some newer townhome and condo developments have higher HOA fees."
  },
  {
    "q": "What schools serve Meadows Village?",
    "a": "Public schools include Bracken Elementary, Johnson Middle School, and Valley High School. The top private option is The Meadows School (A+), located within the neighborhood."
  },
  {
    "q": "What are the best sub-neighborhoods within Meadows Village?",
    "a": "The best sub-neighborhood depends on your priorities — school zones, lot size, home age, and proximity to amenities all vary within the community. Nevada Real Estate Group agents who specialize in Meadows Village can walk you through the specific blocks and streets that match your criteria."
  },
  {
    "q": "How is new construction availability in Meadows Village?",
    "a": "New construction availability varies by season and builder phase. Some sections of Meadows Village have active new home sales while others are fully built out with resale-only inventory. Contact Nevada Real Estate Group for the most current new construction options."
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
  name: 'Meadows Village',
  description: 'Meadows Village is a established suburban · family community in Las Vegas, Nevada (ZIP 89107), established in 1970s, spanning ~4 sq mi. Home prices range from $300K–$600K.',
  geo: { '@type': 'GeoCoordinates', latitude: 36.158, longitude: -115.226 },
  address: { '@type': 'PostalAddress', addressLocality: 'Las Vegas', addressRegion: 'NV', postalCode: '89107', addressCountry: 'US' },
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
  const cms = await getCommunityPage('las-vegas-meadows-village')
  return {
    title: cms?.metaTitle ?? 'Meadows Village Homes for Sale | Nevada Real Estate Group',
    description: cms?.metaDescription ?? 'Browse Meadows Village homes for sale in Las Vegas, NV. $300K–$600K. Schools, HOA, market stats. Nevada Real Estate Group.',
    alternates: { canonical: 'https://www.lasvegashomesearchexperts.com/las-vegas-meadows-village' },
  }
}

export default async function LasVegasMeadowsVillagePage() {
  const cms = await getCommunityPage('las-vegas-meadows-village')
  const market = getMarketStats('las-vegas-meadows-village')
  const ms = market?.stats

  const heroHeadline = cms?.heroHeadline ?? 'Meadows Village'
  const heroSubtitle = 'Homes for Sale in Las Vegas, Nevada'
  const overviewTitle = cms?.overviewTitle ?? 'Meadows Village: Established Suburban · Family Living in Las Vegas'

  const HARDCODED_STATS: Array<[string, string] | [string, string, string]> = [
    ['Established', '1970s'],
    ['Developer', 'Various'],
    ['Total Acreage', '~4 sq mi'],
    ['Homes', '8,000+'],
    ['Median Home Price', ms?.medianSalePrice ?? '$300K–$600K'],
    ['ZIP Codes', '89107, 89146'],
    ['Guard-Gated', 'No'],
    ['HOA', '$0–$100/mo'],
  ]
  const displayStats = mergeQuickStats(HARDCODED_STATS, cms?.quickStats)
  const HARDCODED_DRIVE_TIMES = [
    {
        "time": "~10 min",
        "destination": "to the Strip",
        "route": "via Flamingo Rd / Spring Mountain Rd"
    },
    {
        "time": "~10 min",
        "destination": "to Downtown Las Vegas",
        "route": "via Charleston Blvd east"
    },
    {
        "time": "~20 min",
        "destination": "to Harry Reid Airport",
        "route": "via I-15 South"
    },
    {
        "time": "~15 min",
        "destination": "to Summerlin",
        "route": "via W Charleston Blvd"
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
          <span>Meadows Village</span>
        </div>
      </div>

      <header id="hero" className="summerlin-hero hero-v2">
        <img src="https://images.unsplash.com/photo-1581351721010-8cf859cb14a4?auto=format&fit=crop&w=1600&h=700&q=80" alt="Meadows Village community aerial view, Las Vegas Nevada" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
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
                <span className="hero-v2-stat-num">{ms?.medianSalePrice ?? qs('Median Home Price', '$300K–$600K')}</span>
                <span className="hero-v2-stat-lbl">Median Sale Price</span>
              </div>
              <div className="hero-v2-stat">
                <span className="hero-v2-stat-num">{ms?.avgDaysToClose ?? qs('Avg Days on Market', '45')}</span>
                <span className="hero-v2-stat-lbl">Avg Days to Close</span>
              </div>
            </div>
            <a href="#listings" className="hero-v2-cta">Search Homes in Meadows Village</a>
          </div>
        </div>
      </header>

      <div className="hero-v2-qfb">
        <div className="container">
          <div className="hero-v2-qfb-row">
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <span><strong>ZIP:</strong> 89107, 89146</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              <span><strong>Type:</strong> Established Suburban · Family</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
              <span><strong>Price Range:</strong> $300K–$600K</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
              <span><strong>HOA:</strong> $0–$100/mo</span>
            </div>
          </div>
          <div className="hero-v2-qfb-est">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            <span>Est. 1970s</span>
          </div>
        </div>
      </div>

      <section id="demographics" className="demographics-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Demographics</span>
            <h2>Meadows Village Demographics</h2>
          </div>
          <div className="demo-grid">
            {[
              ['30,000+', 'Population'],
              ['37', 'Median Age'],
              ['$45,000', 'Avg Household Income'],
              ['10,000+', 'Total Households'],
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
            <h2>Where is Meadows Village?</h2>
            <p>Las Vegas, Nevada &mdash; Las Vegas, Nevada.</p>
          </div>
          <div className="map-container">
            <LasVegasMeadowsVillageMapWrapper />
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
            <h2 className="listings-title">NEW MEADOWS VILLAGE LISTINGS</h2>
          </div>
          <div className="ylopo-wrap">
            <div className="YLOPO_searchWidget" />
            <div className="YLOPO_resultsWidget" data-search='{"propertyTypes":["house","condo","townhouse"],"minPrice":250000,"locations":[{"city":"Las Vegas","state":"NV"}],"limit":12,"sortBy":"listDate","sortOrder":"desc","keywords":"Meadows Village","zipCodes":["89107","89146"]}' />
          </div>
          <p className="ylopo-note">Listing data sourced from regional MLS. Information deemed reliable but not guaranteed. Updated daily.</p>
          <div className="listings-actions">
            <a href="https://search.nevadarealestategroup.net/search?s[orderBy]=sourceCreationDate%2Cdesc&s[page]=1&s[locations][0][city]=Las%20Vegas&s[locations][0][state]=NV&s[keywords]=Meadows%20Village" target="_blank" rel="noopener noreferrer" className="btn-gold">View All Meadows Village Listings &rarr;</a>
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
                  <p>Meadows Village is a established suburban · family community in Las Vegas, Nevada (ZIP 89107/89146), established in 1970s, spanning ~4 sq mi, with 8,000+ homes. Meadows Village is a well-established residential neighborhood in the west-central Las Vegas Valley, situated between Charleston Boulevard and Sahara Avenue and centered roughly along Valley View Boulevard and Decatur. The area takes its name from The Meadows Mall, the valley's first major indoor shopping center, which has served as a commercial anchor since 1978 and continues to draw retail activity to the corridor.</p>
                  <p>Homes in Meadows Village were built primarily in the 1970s through 1990s, offering a mix of single-story ranch homes, two-story residences, and scattered condo and townhome developments. The neighborhood's appeal lies in its central location, mature landscaping, and price point that remains accessible to first-time buyers, young families, and investors. Properties range from approximately $300,000 for smaller homes to $600,000 for larger renovated residences.</p>
                  <p>The area's greatest asset is arguably its connectivity. Meadows Village sits at the intersection of several major arterials and is minutes from both I-15 and US-95, providing fast commutes to the Strip, downtown, Summerlin, and the northwest valley. The commercial infrastructure along Valley View, Decatur, and Charleston is robust, with grocery stores, medical offices, restaurants, and fitness facilities within walking or short driving distance of most homes.</p>
                  <p>For buyers seeking value in a proven location, Meadows Village delivers. The mature trees, quiet interior streets, and neighborhood character provide a residential feel despite the urban context. The nearby Meadows School, one of Nevada's most prestigious private schools, adds educational prestige to the area. Renovation activity has increased significantly in recent years as buyers recognize the long-term upside of a central Las Vegas location at below-market prices.</p>
                </>
              )}
            </div>
            <div className="overview-aside">
              <div className="quick-facts">
                <h3>Meadows Village At a Glance</h3>
                {displayStats.map(([label, value, cls]: any) => (
                  <div className="fact-row" key={label}>
                    <span className="fact-label">{label}</span>
                    <span className={`fact-value${cls ? ' ' + cls : ''}`}>{value}</span>
                  </div>
                ))}
              </div>
              <div className="cta-card">
                <p>Ready to explore Meadows Village? Schedule a private tour of the community and the current listings that match your goals.</p>
                <a href="tel:+17252399950" className="btn-gold">Call 725.239.9950</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="highlights">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Why Meadows Village</span>
            <h2>What Makes Meadows Village Stand Out</h2>
          </div>
          <div className="highlights-grid">
            {[
              { title: 'Central Location', body: 'At the crossroads of the Las Vegas Valley with fast access to the Strip, downtown, Summerlin, and every major freeway. Commute times are among the shortest in the city.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><line x1="8" y1="6" x2="8" y2="6.01"/><line x1="12" y1="6" x2="12" y2="6.01"/><line x1="16" y1="6" x2="16" y2="6.01"/><line x1="8" y1="10" x2="8" y2="10.01"/><line x1="12" y1="10" x2="12" y2="10.01"/><line x1="16" y1="10" x2="16" y2="10.01"/><line x1="8" y1="14" x2="8" y2="14.01"/><line x1="12" y1="14" x2="12" y2="14.01"/><line x1="16" y1="14" x2="16" y2="14.01"/></svg> },
              { title: 'The Meadows School Proximity', body: 'Adjacent to The Meadows School, one of Nevada\'s top-rated private schools (PreK-12, A+ rating). A significant draw for families seeking elite education.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
              { title: 'Affordable Entry Point', body: 'Homes from $300K offer an accessible entry into a centrally located Las Vegas neighborhood. Significantly below pricing in nearby Summerlin and Spring Valley premium sections.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
              { title: 'Mature Landscaping', body: '1970s-1990s construction with established trees, lawns, and landscaping. Quiet interior streets with a residential character that newer tract homes cannot replicate.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22c4-4 8-7.5 8-12a8 8 0 10-16 0c0 4.5 4 8 8 12z"/><circle cx="12" cy="10" r="3"/></svg> },
              { title: 'Strong Commercial Corridor', body: 'Meadows Mall, major grocery chains, medical offices, restaurants, and retail along Valley View, Decatur, and Charleston. Everything is close.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M8 21l4-11 4 11"/><path d="M2 21l5-14 4 8"/><path d="M14 15l4-8 4 14"/><line x1="2" y1="21" x2="22" y2="21"/></svg> },
              { title: 'Renovation Upside', body: 'Older housing stock on generous lots creates strong renovation ROI potential. The central location ensures demand from both homeowners and renters.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg> },
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
            <h2>Parks &amp; Recreation Near Meadows Village</h2>
          </div>
          <div className="parks-grid">
            {[
              { name: 'Meadows Park', address: '400 N Torrey Pines Dr, Las Vegas, NV 89107', acreage: '~8 acres', amenities: ["Sports fields","Playground","Picnic areas","Walking paths"] },
              { name: 'Valley View Park', address: '2340 Valley View Blvd, Las Vegas, NV 89102', acreage: '~5 acres', amenities: ["Basketball courts","Playground","Picnic tables","Open space"] },
              { name: 'Bob Baskin Park', address: '2601 E St Louis Ave, Las Vegas, NV 89104', acreage: '~20 acres', amenities: ["Sports fields","Swimming pool","Playground","Community center"] },
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
            <h2>The Meadows Village Lifestyle</h2>
          </div>
          <div className="lifestyle-v2-grid">
            <div className="lifestyle-v2-item">
              <div className="lifestyle-v2-icon"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg></div>
              <div className="lifestyle-v2-stat">~10 min</div>
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
              <div className="lifestyle-v2-stat">1970s</div>
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
            <h2>HOA Information for Meadows Village</h2>
          </div>
          <div className="hoa-grid">
            <div className="hoa-fees-col">
              <h3>Fees &amp; Management</h3>
              <div className="hoa-fee-row"><span>Monthly HOA Range</span><strong>$0–$100/mo</strong></div>
              <div className="hoa-fee-row"><span>Guard-Gated</span><strong>No</strong></div>
              <div className="hoa-fee-row"><span>Community Type</span><strong>Established Suburban · Family</strong></div>
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
            <h2>Schools Serving Meadows Village</h2>
          </div>
          <div className="schools-v2-table">
            <div className="schools-v2-header">
              <span>School Name</span>
              <span>Grades</span>
              <span>Rating</span>
            </div>
            {[
              ['Bracken Elementary', 'K–5', '5/10'],
              ['Johnson Middle School', '6–8', '4/10'],
              ['Valley High School', '9–12', '4/10'],
              ['The Meadows School', 'PreK–12', 'A+'],
              ['Bishop Gorman High School', '9–12', 'A+'],
              ['Doral Academy of Nevada', 'K–8', '9/10'],
              ['Explore Knowledge Academy', 'K–12', '6/10'],
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
            <h2>What Meadows Village Buyers Say</h2>
          </div>
          <div className="testimonials-grid">
            {[
              { quote: 'Nevada Real Estate Group helped us find a renovated ranch home in Meadows Village at a fraction of what we would have paid in Summerlin. The central location cuts our commute in half.', name: 'Alex & Michelle S.', detail: 'Bought in Meadows Village · 2024' },
              { quote: 'We bought a fixer-upper in Meadows Village on Nevada Real Estate Group\'s advice and after renovations our equity has nearly doubled. They saw the value before anyone else.', name: 'James T.', detail: 'Invested in Meadows Village · 2025' },
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

      <LasVegasMeadowsVillageFAQ />

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
              { name: 'Spring Valley', href: '/spring-valley/', price: 'From $300K', compare: 'Large established community to the west with diverse housing and strong commercial infrastructure.' },
              { name: 'The Lakes', href: '/the-lakes/', price: 'From $400K', compare: 'Waterfront community with man-made lakes and resort-style amenities to the west.' },
              { name: 'Downtown Las Vegas', href: '/downtown-las-vegas/', price: 'From $200K', compare: 'The urban core with Arts District, Fremont Street, and walkable entertainment.' },
              { name: 'Charleston Heights', href: '/las-vegas-charleston-heights/', price: 'From $250K', compare: 'Adjacent established neighborhood with vintage homes and renovation potential.' },
              { name: 'Peccole Ranch', href: '/peccole-ranch/', price: 'From $450K', compare: 'Established family community to the west with mature landscaping and community parks.' },
              { name: 'Paradise', href: '/paradise/', price: 'From $250K', compare: 'Unincorporated area east of the Strip with diverse housing and strong rental demand.' },
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
              <h2>Ready to Find Your Meadows Village Home?</h2>
              <p>Nevada Real Estate Group is the #1 real estate team in Nevada. Whether you&apos;re buying or selling in Meadows Village, let&apos;s talk.</p>
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
                <input type="hidden" name="_subject" value="Meadows Village Inquiry — LasVegasHomeSearchExperts.com" />
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
