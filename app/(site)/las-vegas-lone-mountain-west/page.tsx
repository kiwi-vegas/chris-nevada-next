import LasVegasLoneMountainWestFAQ from '@/components/LasVegasLoneMountainWestFAQ'
import Link from 'next/link'
import type { Metadata } from 'next'
import LasVegasLoneMountainWestMapWrapper from '@/components/LasVegasLoneMountainWestMapWrapper'
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
    { '@type': 'ListItem', position: 3, name: 'Lone Mountain West', item: 'https://www.lasvegashomesearchexperts.com/las-vegas-lone-mountain-west/' },
  ],
}

const FAQ_DATA = [
  {
    "q": "What is the price range for homes in Lone Mountain West?",
    "a": "Homes in Lone Mountain West range from approximately $500,000 for newer production homes to $1 million or more for semi-custom and custom homes on larger lots with mountain views."
  },
  {
    "q": "Is Lone Mountain West a good area for families?",
    "a": "Yes. Lone Mountain West is one of the best family-oriented areas in Las Vegas, with newer schools, modern parks, safe neighborhoods, and a growing retail corridor. The newer construction also means lower maintenance costs."
  },
  {
    "q": "What ZIP codes cover Lone Mountain West?",
    "a": "Lone Mountain West spans ZIP codes 89166 and 89149 in the northwest Las Vegas Valley."
  },
  {
    "q": "How far is Lone Mountain West from the Strip?",
    "a": "Lone Mountain West is approximately 25 minutes from the Las Vegas Strip via US-95 South to I-15. The 215 Beltway also provides access to Summerlin and the western valley."
  },
  {
    "q": "Is Lone Mountain West still growing?",
    "a": "Yes. Lone Mountain West remains one of the most active new construction corridors in the Las Vegas Valley. New communities, schools, and retail centers continue to be developed throughout the area."
  },
  {
    "q": "What schools serve Lone Mountain West?",
    "a": "Lone Mountain West is served by CCSD schools including Shadow Ridge High School (6/10) and several newer elementary and middle schools. Private and charter options include Doral Academy (9/10) and Pinecrest Academy (8/10)."
  },
  {
    "q": "Are there HOA fees in Lone Mountain West?",
    "a": "Most communities in Lone Mountain West have HOA fees ranging from $50 to $200 per month, covering common area maintenance, community amenities, and neighborhood landscaping."
  },
  {
    "q": "What is the elevation of Lone Mountain West?",
    "a": "Lone Mountain West sits at approximately 3,000 to 3,400 feet elevation, noticeably higher than the valley floor. This provides slightly cooler temperatures in summer and dramatic views of the surrounding mountain ranges."
  },
  {
    "q": "What are the best sub-neighborhoods within Lone Mountain West?",
    "a": "The best sub-neighborhood depends on your priorities — school zones, lot size, home age, and proximity to amenities all vary within the community. Nevada Real Estate Group agents who specialize in Lone Mountain West can walk you through the specific blocks and streets that match your criteria."
  },
  {
    "q": "How is new construction availability in Lone Mountain West?",
    "a": "New construction availability varies by season and builder phase. Some sections of Lone Mountain West have active new home sales while others are fully built out with resale-only inventory. Contact Nevada Real Estate Group for the most current new construction options."
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
  name: 'Lone Mountain West',
  description: 'Lone Mountain West is a suburban · master-planned community in Las Vegas, Nevada (ZIP 89166), established in 2015, spanning ~3,500 acres. Home prices range from $500K–$1M.',
  geo: { '@type': 'GeoCoordinates', latitude: 36.278, longitude: -115.328 },
  address: { '@type': 'PostalAddress', addressLocality: 'Las Vegas', addressRegion: 'NV', postalCode: '89166', addressCountry: 'US' },
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
  const cms = await getCommunityPage('las-vegas-lone-mountain-west')
  return {
    title: cms?.metaTitle ?? 'Lone Mountain West Homes for Sale | Nevada Real Estate Group',
    description: cms?.metaDescription ?? 'Browse Lone Mountain West homes for sale in Las Vegas, NV. $500K–$1M. Schools, HOA, market stats. Nevada Real Estate Group.',
    alternates: { canonical: 'https://www.lasvegashomesearchexperts.com/las-vegas-lone-mountain-west' },
  }
}

export default async function LasVegasLoneMountainWestPage() {
  const cms = await getCommunityPage('las-vegas-lone-mountain-west')
  const market = getMarketStats('las-vegas-lone-mountain-west')
  const ms = market?.stats

  const heroHeadline = cms?.heroHeadline ?? 'Lone Mountain West'
  const heroSubtitle = 'Homes for Sale in Las Vegas, Nevada'
  const overviewTitle = cms?.overviewTitle ?? 'Lone Mountain West: Suburban · Master-Planned Living in Las Vegas'

  const HARDCODED_STATS: Array<[string, string] | [string, string, string]> = [
    ['Established', '2015'],
    ['Developer', 'Various'],
    ['Total Acreage', '~3,500 acres'],
    ['Homes', '5,000+'],
    ['Median Home Price', ms?.medianSalePrice ?? '$500K–$1M'],
    ['ZIP Codes', '89166, 89149'],
    ['Guard-Gated', 'No'],
    ['HOA', '$50–$200/mo'],
  ]
  const displayStats = mergeQuickStats(HARDCODED_STATS, cms?.quickStats)
  const HARDCODED_DRIVE_TIMES = [
    {
        "time": "~25 min",
        "destination": "to the Strip",
        "route": "via US-95 South → I-15"
    },
    {
        "time": "~15 min",
        "destination": "to Downtown Summerlin",
        "route": "via I-215 West"
    },
    {
        "time": "~30 min",
        "destination": "to Harry Reid Airport",
        "route": "via US-95 → I-15 South"
    },
    {
        "time": "~10 min",
        "destination": "to Centennial Hills",
        "route": "via Durango Dr / US-95"
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
          <span>Lone Mountain West</span>
        </div>
      </div>

      <header id="hero" className="summerlin-hero hero-v2">
        <img src="https://images.unsplash.com/photo-1581351721010-8cf859cb14a4?auto=format&fit=crop&w=1600&h=700&q=80" alt="Lone Mountain West community aerial view, Las Vegas Nevada" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
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
                <span className="hero-v2-stat-num">{ms?.medianSalePrice ?? qs('Median Home Price', '$500K–$1M')}</span>
                <span className="hero-v2-stat-lbl">Median Sale Price</span>
              </div>
              <div className="hero-v2-stat">
                <span className="hero-v2-stat-num">{ms?.avgDaysToClose ?? qs('Avg Days on Market', '45')}</span>
                <span className="hero-v2-stat-lbl">Avg Days to Close</span>
              </div>
            </div>
            <a href="#listings" className="hero-v2-cta">Search Homes in Lone Mountain West</a>
          </div>
        </div>
      </header>

      <div className="hero-v2-qfb">
        <div className="container">
          <div className="hero-v2-qfb-row">
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <span><strong>ZIP:</strong> 89166, 89149</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              <span><strong>Type:</strong> Suburban · Master-Planned</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
              <span><strong>Price Range:</strong> $500K–$1M</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
              <span><strong>HOA:</strong> $50–$200/mo</span>
            </div>
          </div>
          <div className="hero-v2-qfb-est">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            <span>Est. 2015</span>
          </div>
        </div>
      </div>

      <section id="demographics" className="demographics-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Demographics</span>
            <h2>Lone Mountain West Demographics</h2>
          </div>
          <div className="demo-grid">
            {[
              ['25,000+', 'Population'],
              ['36', 'Median Age'],
              ['$95,000', 'Avg Household Income'],
              ['8,000+', 'Total Households'],
              ['78%', 'Homeownership Rate'],
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
            <h2>Where is Lone Mountain West?</h2>
            <p>Las Vegas, Nevada &mdash; Las Vegas, Nevada.</p>
          </div>
          <div className="map-container">
            <LasVegasLoneMountainWestMapWrapper />
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
            <h2 className="listings-title">NEW LONE MOUNTAIN WEST LISTINGS</h2>
          </div>
          <div className="ylopo-wrap">
            <div className="YLOPO_searchWidget" />
            <div className="YLOPO_resultsWidget" data-search='{"propertyTypes":["house","condo","townhouse"],"minPrice":450000,"locations":[{"city":"Las Vegas","state":"NV"}],"limit":12,"sortBy":"listDate","sortOrder":"desc","keywords":"Lone Mountain","zipCodes":["89166","89149"]}' />
          </div>
          <p className="ylopo-note">Listing data sourced from regional MLS. Information deemed reliable but not guaranteed. Updated daily.</p>
          <div className="listings-actions">
            <a href="https://search.nevadarealestategroup.net/search?s[orderBy]=sourceCreationDate%2Cdesc&s[page]=1&s[locations][0][city]=Las%20Vegas&s[locations][0][state]=NV&s[keywords]=Lone%20Mountain" target="_blank" rel="noopener noreferrer" className="btn-gold">View All Lone Mountain West Listings &rarr;</a>
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
                  <p>Lone Mountain West is a suburban · master-planned community in Las Vegas, Nevada (ZIP 89166/89149), established in 2015, spanning ~3,500 acres, with 5,000+ homes. Lone Mountain West is one of the fastest-growing residential corridors in the northwest Las Vegas Valley. Situated west of the landmark Lone Mountain peak and north of the 215 Beltway, this area has transformed from open desert into a thriving collection of newer master-planned neighborhoods with modern floor plans, energy-efficient construction, and dramatic mountain views in every direction.</p>
                  <p>Development in Lone Mountain West accelerated significantly after 2015, with national builders like Toll Brothers, Lennar, KB Home, and Richmond American acquiring large parcels for new communities. The result is a landscape dominated by contemporary two-story and single-story homes built to the latest building codes, featuring open floor plans, gourmet kitchens, and generous lot sizes compared to older parts of the valley.</p>
                  <p>The area's appeal centers on its balance of relative newness and accessibility. Homes in the $500K to $1M range offer square footage and lot sizes that would cost significantly more in Summerlin or Henderson. The 215 Beltway provides a direct corridor to Summerlin, the Strip, and the airport, while the US-95 interchange at Durango connects north to Centennial Hills and south to downtown. Retail and dining options along Deer Springs Way and Farm Road continue to expand rapidly.</p>
                  <p>For families, Lone Mountain West offers access to some of the newer CCSD schools in the district, with several campuses built within the last decade. The area's elevation provides cooler summer temperatures than the valley floor, and the proximity to Floyd Lamb Park at Tule Springs and the desert foothills gives outdoor enthusiasts hiking and cycling access that rivals any community in Las Vegas.</p>
                </>
              )}
            </div>
            <div className="overview-aside">
              <div className="quick-facts">
                <h3>Lone Mountain West At a Glance</h3>
                {displayStats.map(([label, value, cls]: any) => (
                  <div className="fact-row" key={label}>
                    <span className="fact-label">{label}</span>
                    <span className={`fact-value${cls ? ' ' + cls : ''}`}>{value}</span>
                  </div>
                ))}
              </div>
              <div className="cta-card">
                <p>Ready to explore Lone Mountain West? Schedule a private tour of the community and the current listings that match your goals.</p>
                <a href="tel:+17252399950" className="btn-gold">Call 725.239.9950</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="highlights">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Why Lone Mountain West</span>
            <h2>What Makes Lone Mountain West Stand Out</h2>
          </div>
          <div className="highlights-grid">
            {[
              { title: 'New Construction', body: 'Predominantly built after 2015, Lone Mountain West features modern energy-efficient homes with open floor plans, smart home technology, and contemporary finishes throughout.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
              { title: 'Mountain Views', body: 'Dramatic views of Lone Mountain, the Spring Mountains, and the Sheep Range from elevated lots. Many homes enjoy unobstructed desert panoramas in multiple directions.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M8 21l4-11 4 11"/><path d="M2 21l5-14 4 8"/><path d="M14 15l4-8 4 14"/><line x1="2" y1="21" x2="22" y2="21"/></svg> },
              { title: '215 Beltway Access', body: 'Direct access to the I-215 Beltway at multiple interchanges provides fast commutes to Summerlin, the Strip, Henderson, and Harry Reid International Airport.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><line x1="8" y1="6" x2="8" y2="6.01"/><line x1="12" y1="6" x2="12" y2="6.01"/><line x1="16" y1="6" x2="16" y2="6.01"/><line x1="8" y1="10" x2="8" y2="10.01"/><line x1="12" y1="10" x2="12" y2="10.01"/><line x1="16" y1="10" x2="16" y2="10.01"/><line x1="8" y1="14" x2="8" y2="14.01"/><line x1="12" y1="14" x2="12" y2="14.01"/><line x1="16" y1="14" x2="16" y2="14.01"/></svg> },
              { title: 'Growing Retail Corridor', body: 'New shopping centers along Deer Springs Way and Farm Road feature grocery, dining, medical, and fitness options. Commercial development is keeping pace with residential growth.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22c4-4 8-7.5 8-12a8 8 0 10-16 0c0 4.5 4 8 8 12z"/><circle cx="12" cy="10" r="3"/></svg> },
              { title: 'Newer Schools', body: 'Several CCSD schools built within the last decade serve the area, with lower student-to-teacher ratios and modern facilities compared to older parts of the valley.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
              { title: 'Strong Appreciation', body: 'As one of the valley\'s newest growth corridors, Lone Mountain West has seen consistent home value appreciation driven by limited inventory and high demand from families and professionals.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg> },
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
            <h2>Parks &amp; Recreation Near Lone Mountain West</h2>
          </div>
          <div className="parks-grid">
            {[
              { name: 'Floyd Lamb Park at Tule Springs', address: '9200 Tule Springs Rd, Las Vegas, NV 89131', acreage: '680 acres', amenities: ["Fishing ponds","Picnic areas","Walking trails","Historic ranch buildings","Wildlife viewing"] },
              { name: 'Lone Mountain Regional Park', address: '4445 N Jensen St, Las Vegas, NV 89129', acreage: '~38 acres', amenities: ["Sports fields","Playground","Walking paths","Picnic shelters","Basketball courts"] },
              { name: 'Tule Springs Fossil Beds NM', address: 'Tule Springs Rd, Las Vegas, NV 89131', acreage: '22,650 acres', amenities: ["Hiking trails","Fossil sites","Desert exploration","Educational programs"] },
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
            <h2>The Lone Mountain West Lifestyle</h2>
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
              <div className="lifestyle-v2-stat">5,000+</div>
              <div className="lifestyle-v2-label">Homes</div>
            </div>
            <div className="lifestyle-v2-item">
              <div className="lifestyle-v2-icon"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 2v10l7 4"/></svg></div>
              <div className="lifestyle-v2-stat">2015</div>
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
            <h2>HOA Information for Lone Mountain West</h2>
          </div>
          <div className="hoa-grid">
            <div className="hoa-fees-col">
              <h3>Fees &amp; Management</h3>
              <div className="hoa-fee-row"><span>Monthly HOA Range</span><strong>$50–$200/mo</strong></div>
              <div className="hoa-fee-row"><span>Guard-Gated</span><strong>No</strong></div>
              <div className="hoa-fee-row"><span>Community Type</span><strong>Suburban · Master-Planned</strong></div>
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
            <h2>Schools Serving Lone Mountain West</h2>
          </div>
          <div className="schools-v2-table">
            <div className="schools-v2-header">
              <span>School Name</span>
              <span>Grades</span>
              <span>Rating</span>
            </div>
            {[
              ['Divich Elementary', 'K–5', '7/10'],
              ['Rogich Middle School', '6–8', '7/10'],
              ['Shadow Ridge High School', '9–12', '6/10'],
              ['Mountain View Christian School', 'PreK–8', 'A'],
              ['Bishop Gorman High School', '9–12', 'A+'],
              ['Doral Academy of Nevada', 'K–8', '9/10'],
              ['Pinecrest Academy of Nevada', 'K–12', '8/10'],
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
            <h2>What Lone Mountain West Buyers Say</h2>
          </div>
          <div className="testimonials-grid">
            {[
              { quote: 'Nevada Real Estate Group helped us find a brand-new home in Lone Mountain West with incredible mountain views. They knew exactly which builders offered the best value and negotiated upgrades we didn\'t think were possible.', name: 'Ryan & Megan P.', detail: 'Bought in Lone Mountain West · 2025' },
              { quote: 'We sold our Summerlin townhome and bought a much larger home in Lone Mountain West for the same price. Nevada Real Estate Group handled both transactions flawlessly.', name: 'David T.', detail: 'Bought in Lone Mountain West · 2024' },
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

      <LasVegasLoneMountainWestFAQ />

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
              { name: 'Lone Mountain', href: '/lone-mountain/', price: 'From $400K', compare: 'The broader Lone Mountain area east of US-95 with a mix of established and newer homes.' },
              { name: 'Skye Canyon', href: '/skye-canyon/', price: 'From $450K', compare: 'Major master-planned community to the north with resort-style amenities and newer construction.' },
              { name: 'Centennial Hills', href: '/centennial-hills/', price: 'From $400K', compare: 'Established northwest community with strong schools, parks, and commercial infrastructure.' },
              { name: 'Providence', href: '/providence/', price: 'From $400K', compare: 'Master-planned community in the northwest with family-friendly amenities and newer homes.' },
              { name: 'Summerlin West', href: '/summerlin-west/', price: 'From $500K', compare: 'The newest expansion of Summerlin with premium builders, Red Rock Canyon views, and top-tier amenities.' },
              { name: 'Aliante', href: '/aliante/', price: 'From $350K', compare: 'Master-planned community in North Las Vegas with golf course, casino, and family amenities.' },
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
              <h2>Ready to Find Your Lone Mountain West Home?</h2>
              <p>Nevada Real Estate Group is the #1 real estate team in Nevada. Whether you&apos;re buying or selling in Lone Mountain West, let&apos;s talk.</p>
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
                <input type="hidden" name="_subject" value="Lone Mountain West Inquiry — LasVegasHomeSearchExperts.com" />
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
