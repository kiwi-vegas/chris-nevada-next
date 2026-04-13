import AnthemWestFAQ from '@/components/AnthemWestFAQ'
import Link from 'next/link'
import type { Metadata } from 'next'
import AnthemWestMapWrapper from '@/components/AnthemWestMapWrapper'
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
    { '@type': 'ListItem', position: 3, name: 'Anthem West', item: 'https://www.lasvegashomesearchexperts.com/anthem-west/' },
  ],
}

const FAQ_DATA = [
  {
    "q": "What is the price range for homes in Anthem West?",
    "a": "Homes in Anthem West range from approximately $450,000 for townhomes and smaller homes to $800,000 or more for premium single-family homes with mountain views and upgraded finishes."
  },
  {
    "q": "Is Anthem West guard-gated?",
    "a": "No. Anthem West is not guard-gated. It is the non-gated family section of the Anthem master plan. For guard-gated Anthem living, see Anthem Country Club and Anthem Highlands."
  },
  {
    "q": "What ZIP code is Anthem West in?",
    "a": "Anthem West is located in ZIP code 89052 in Henderson. Home prices range from $450K–$800K."
  },
  {
    "q": "What amenities does Anthem West have?",
    "a": "Anthem West residents enjoy community pools, parks, walking trails, the Anthem Community Center, and the Anthem Hills trail system. All standard Anthem master-plan amenities are included."
  },
  {
    "q": "What are HOA fees in Anthem West?",
    "a": "HOA fees typically range from $70 to $200 per month, depending on the specific neighborhood and its amenities. This covers the Anthem master association plus any sub-association fees."
  },
  {
    "q": "What schools serve Anthem West?",
    "a": "Anthem West is zoned for above-average CCSD schools including Fremont Elementary (8/10) and Coronado High School (7/10). Charter options include Pinecrest Academy and Somerset Academy."
  },
  {
    "q": "Is there a 55+ community in Anthem West?",
    "a": "Yes. Solera at Anthem is a Del Webb age-restricted (55+) community within Anthem West featuring a clubhouse, fitness center, pools, and active lifestyle programming."
  },
  {
    "q": "How does Anthem West compare to Anthem Country Club?",
    "a": "Anthem West offers Anthem's lifestyle and reputation at 30–50% below Anthem Country Club prices. The tradeoff is no guard gate and no golf course access, but the location, schools, and community amenities are shared."
  },
  {
    "q": "What are the best sub-neighborhoods within Anthem West?",
    "a": "The best sub-neighborhood depends on your priorities — school zones, lot size, home age, and proximity to amenities all vary within the community. Nevada Real Estate Group agents who specialize in Anthem West can walk you through the specific blocks and streets that match your criteria."
  },
  {
    "q": "How is new construction availability in Anthem West?",
    "a": "New construction availability varies by season and builder phase. Some sections of Anthem West have active new home sales while others are fully built out with resale-only inventory. Contact Nevada Real Estate Group for the most current new construction options."
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
  name: 'Anthem West',
  description: 'Anthem West is a master-planned · family community in Henderson, Nevada (ZIP 89052), established in 2000 by Del Webb / Various, spanning ~600 acres. Home prices range from $450K–$800K.',
  geo: { '@type': 'GeoCoordinates', latitude: 35.99, longitude: -115.12 },
  address: { '@type': 'PostalAddress', addressLocality: 'Henderson', addressRegion: 'NV', postalCode: '89052', addressCountry: 'US' },
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
  const cms = await getCommunityPage('anthem-west')
  return {
    title: cms?.metaTitle ?? 'Anthem West Homes for Sale | Nevada Real Estate Group',
    description: cms?.metaDescription ?? 'Browse Anthem West homes for sale in Henderson, NV. $450K–$800K. Schools, HOA, market stats. Nevada Real Estate Group.',
    alternates: { canonical: 'https://www.lasvegashomesearchexperts.com/anthem-west' },
  }
}

export default async function AnthemWestPage() {
  const cms = await getCommunityPage('anthem-west')
  const market = getMarketStats('anthem-west')
  const ms = market?.stats

  const heroHeadline = cms?.heroHeadline ?? 'Anthem West'
  const heroSubtitle = 'Homes for Sale in Henderson, Nevada'
  const overviewTitle = cms?.overviewTitle ?? 'Anthem West: Master-Planned · Family Living in Henderson'

  const HARDCODED_STATS: Array<[string, string] | [string, string, string]> = [
    ['Established', '2000'],
    ['Developer', 'Del Webb / Various'],
    ['Total Acreage', '~600 acres'],
    ['Homes', '~4,000'],
    ['Median Home Price', ms?.medianSalePrice ?? '$450K–$800K'],
    ['ZIP Codes', '89052'],
    ['Guard-Gated', 'No'],
    ['HOA', '$70–$200/mo'],
  ]
  const displayStats = mergeQuickStats(HARDCODED_STATS, cms?.quickStats)
  const HARDCODED_DRIVE_TIMES = [
    {
        "time": "~20 min",
        "destination": "to the Strip",
        "route": "via I-215 West → I-15 North"
    },
    {
        "time": "~15 min",
        "destination": "to Harry Reid Airport",
        "route": "via I-215 → I-15"
    },
    {
        "time": "~10 min",
        "destination": "to Henderson Downtown",
        "route": "via Eastern Ave North"
    },
    {
        "time": "~15 min",
        "destination": "to Seven Hills",
        "route": "via Eastern Ave South"
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
          <span>Anthem West</span>
        </div>
      </div>

      <header id="hero" className="summerlin-hero hero-v2">
        <img src="https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1600&h=700&q=80" alt="Anthem West community aerial view, Henderson Nevada" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
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
                <span className="hero-v2-stat-num">{ms?.medianSalePrice ?? qs('Median Home Price', '$450K–$800K')}</span>
                <span className="hero-v2-stat-lbl">Median Sale Price</span>
              </div>
              <div className="hero-v2-stat">
                <span className="hero-v2-stat-num">{ms?.avgDaysToClose ?? qs('Avg Days on Market', '45')}</span>
                <span className="hero-v2-stat-lbl">Avg Days to Close</span>
              </div>
            </div>
            <a href="#listings" className="hero-v2-cta">Search Homes in Anthem West</a>
          </div>
        </div>
      </header>

      <div className="hero-v2-qfb">
        <div className="container">
          <div className="hero-v2-qfb-row">
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <span><strong>ZIP:</strong> 89052</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              <span><strong>Type:</strong> Master-Planned · Family</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
              <span><strong>Price Range:</strong> $450K–$800K</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
              <span><strong>HOA:</strong> $70–$200/mo</span>
            </div>
          </div>
          <div className="hero-v2-qfb-est">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            <span>Est. 2000</span>
          </div>
        </div>
      </div>

      <section id="demographics" className="demographics-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Demographics</span>
            <h2>Anthem West Demographics</h2>
          </div>
          <div className="demo-grid">
            {[
              ['~12,000', 'Population'],
              ['42', 'Median Age'],
              ['$105,000', 'Avg Household Income'],
              ['~4,000', 'Total Households'],
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
            <h2>Where is Anthem West?</h2>
            <p>Anthem, Henderson &mdash; Henderson, Nevada.</p>
          </div>
          <div className="map-container">
            <AnthemWestMapWrapper />
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
            <h2 className="listings-title">NEW ANTHEM WEST LISTINGS</h2>
          </div>
          <div className="ylopo-wrap">
            <div className="YLOPO_searchWidget" />
            <div className="YLOPO_resultsWidget" data-search='{"propertyTypes":["house","condo","townhouse"],"minPrice":400000,"locations":[{"city":"Henderson","state":"NV"}],"limit":12,"sortBy":"listDate","sortOrder":"desc","keywords":"Anthem West Henderson","zipCodes":["89052"]}' />
          </div>
          <p className="ylopo-note">Listing data sourced from regional MLS. Information deemed reliable but not guaranteed. Updated daily.</p>
          <div className="listings-actions">
            <a href="https://search.nevadarealestategroup.net/search?s[orderBy]=sourceCreationDate%2Cdesc&s[page]=1&s[locations][0][city]=Henderson&s[locations][0][state]=NV&s[keywords]=Anthem%20West%20Henderson" target="_blank" rel="noopener noreferrer" className="btn-gold">View All Anthem West Listings &rarr;</a>
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
                  <p>Anthem West is a master-planned · family community within Anthem in Henderson, Nevada (ZIP 89052), established in 2000, developed by Del Webb / Various, spanning ~600 acres. Anthem West encompasses the western neighborhoods of Henderson's expansive Anthem master-planned community, stretching from Eastern Avenue west to the community's boundary near the Seven Hills border. This family-focused section of Anthem offers a diverse collection of single-family homes, townhomes, and age-restricted properties organized around community parks, trail connections, and the shared amenities that make Anthem one of Henderson's most desirable addresses.</p>
                  <p>Homes in Anthem West range from approximately $450,000 for smaller single-family homes and townhomes to $800,000 or more for premium single-family residences with mountain views, upgraded finishes, and three-car garages. Floor plans span 1,400 to 3,800 square feet, with the majority built between 2000 and 2010 by national builders including Del Webb, Pulte Homes, KB Home, and Richmond American. The mature construction era provides established landscaping and proven infrastructure.</p>
                  <p>Anthem West benefits from the full Anthem amenity package while offering a more accessible price point than the community's guard-gated sections like Anthem Country Club. Parks, walking trails, community pools, and the Anthem Community Center provide recreation and gathering spaces. The Anthem Hills trail system connects to regional trail networks that extend into the McCullough Mountains, offering hiking and mountain biking opportunities within the community.</p>
                  <p>The area's schools are among Henderson's best, with above-average CCSD campuses and access to top-rated charter and private options. The St. Rose Parkway commercial corridor provides a growing base of shopping, dining, and medical services. For families seeking Anthem's reputation, Henderson's quality of life, and a property at a price below the guard-gated sections, Anthem West delivers outstanding value.</p>
                </>
              )}
            </div>
            <div className="overview-aside">
              <div className="quick-facts">
                <h3>Anthem West At a Glance</h3>
                {displayStats.map(([label, value, cls]: any) => (
                  <div className="fact-row" key={label}>
                    <span className="fact-label">{label}</span>
                    <span className={`fact-value${cls ? ' ' + cls : ''}`}>{value}</span>
                  </div>
                ))}
              </div>
              <div className="cta-card">
                <p>Ready to explore Anthem West? Schedule a private tour of the community and the current listings that match your goals.</p>
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
            <h2>Top 7 Facts About Anthem West</h2>
          </div>
          <ol className="top-facts-list">
            <li key={0}>Anthem West spans ~600 acres in Henderson, Nevada (ZIP 89052).</li>
            <li key={1}>Anthem West was established in 2000 by Del Webb / Various.</li>
            <li key={2}>Anthem West contains ~4,000 homes with prices ranging from $450K–$800K.</li>
            <li key={3}>Anthem West is a master-planned · family community within Anthem.</li>
            <li key={4}>HOA fees in Anthem West range from $70–$200/mo per month.</li>
            <li key={5}>Top-rated schools serving Anthem West include John C. Fremont Elementary (8/10) and Del E. Webb Middle School (7/10).</li>
            <li key={6}>Anthem West is located ~20 min to the Strip via I-215 West → I-15 North.</li>
          </ol>
        </div>
      </section>

      <section id="highlights">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Why Anthem West</span>
            <h2>What Makes Anthem West Stand Out</h2>
          </div>
          <div className="highlights-grid">
            {[
              { title: 'Anthem Master Plan', body: 'Part of the prestigious Anthem master-planned community — one of Henderson\'s most desirable addresses with a proven track record of appreciation and community quality.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
              { title: 'Trail System', body: 'The Anthem Hills trail system provides miles of hiking and mountain biking trails connecting neighborhoods to regional trail networks and the McCullough Mountains foothills.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M8 21l4-11 4 11"/><path d="M2 21l5-14 4 8"/><path d="M14 15l4-8 4 14"/><line x1="2" y1="21" x2="22" y2="21"/></svg> },
              { title: 'Henderson Safety', body: 'Located in Henderson — consistently ranked among America\'s safest cities. Anthem\'s low crime rates and community-oriented culture make it ideal for families.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
              { title: 'Community Amenities', body: 'Access to Anthem community pools, parks, the Anthem Community Center, and organized community events. Family-friendly programming throughout the year.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22c4-4 8-7.5 8-12a8 8 0 10-16 0c0 4.5 4 8 8 12z"/><circle cx="12" cy="10" r="3"/></svg> },
              { title: 'Strong Schools', body: 'Zoned for above-average CCSD schools including some of Henderson\'s top-rated campuses. Multiple charter and private options within a short drive.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M4 19.5A2.5 2.5 0 006.5 22H20V2H6.5A2.5 2.5 0 004 4.5v15z"/></svg> },
              { title: 'Below Guard-Gate Pricing', body: 'Anthem\'s lifestyle and reputation at 30–50% below the guard-gated sections like Anthem Country Club. The best value for an Anthem address in Henderson.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg> },
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
            <h2>Parks &amp; Recreation Near Anthem West</h2>
          </div>
          <div className="parks-grid">
            {[
              { name: 'Anthem Hills Park', address: '2816 Botticelli Dr, Henderson, NV 89052', acreage: '~15 acres', amenities: ["Walking trails","Playground","Picnic areas","Sports courts","Open space"] },
              { name: 'Anthem Community Park', address: '2256 N Reunion Dr, Henderson, NV 89052', acreage: '~20 acres', amenities: ["Community pools","Playground","Basketball courts","Picnic shelters","Dog park"] },
              { name: 'McCullough Hills Trail', address: 'McCullough Hills Trailhead, Henderson, NV 89052', acreage: 'Open space', amenities: ["Hiking trails","Mountain biking","Wildlife viewing","Desert flora","Scenic views"] },
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
            <h2>The Anthem West Lifestyle</h2>
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
              <div className="lifestyle-v2-stat">~4,000</div>
              <div className="lifestyle-v2-label">Homes</div>
            </div>
            <div className="lifestyle-v2-item">
              <div className="lifestyle-v2-icon"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 2v10l7 4"/></svg></div>
              <div className="lifestyle-v2-stat">2000</div>
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
            <h2>HOA Information for Anthem West</h2>
          </div>
          <div className="hoa-grid">
            <div className="hoa-fees-col">
              <h3>Fees &amp; Management</h3>
              <div className="hoa-fee-row"><span>Monthly HOA Range</span><strong>$70–$200/mo</strong></div>
              <div className="hoa-fee-row"><span>Guard-Gated</span><strong>No</strong></div>
              <div className="hoa-fee-row"><span>Community Type</span><strong>Master-Planned · Family</strong></div>
              <div className="hoa-management">
                <p className="hoa-mgmt-label">Management</p>
                <p className="hoa-mgmt-value">Anthem Master Association + Sub-HOA</p>
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
            <h2>Schools Serving Anthem West</h2>
          </div>
          <div className="schools-v2-table">
            <div className="schools-v2-header">
              <span>School Name</span>
              <span>Grades</span>
              <span>Rating</span>
            </div>
            {[
              ['John C. Fremont Elementary', 'K–5', '8/10'],
              ['Del E. Webb Middle School', '6–8', '7/10'],
              ['Coronado High School', '9–12', '7/10'],
              ['Henderson International School', 'PreK–12', 'A'],
              ['Bishop Gorman High School', '9–12', 'A+'],
              ['Pinecrest Academy of Nevada — St. Rose', 'K–8', '8/10'],
              ['Somerset Academy', 'K–12', '8/10'],
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
            <h2>What Anthem West Buyers Say</h2>
          </div>
          <div className="testimonials-grid">
            {[
              { quote: 'Nevada Real Estate Group helped us find the right neighborhood within Anthem West. They knew which sections had the best views, the best school access, and the strongest appreciation potential. We got an Anthem address at a price we could afford.', name: 'Kevin & Amy L.', detail: 'Bought in Anthem West, Henderson · 2024' },
              { quote: 'We wanted the Anthem lifestyle without the guard-gate pricing. Nevada Real Estate Group showed us Anthem West and we found a beautiful home with mountain views and trail access for half what we\'d pay in Anthem Country Club.', name: 'Robert & Christine K.', detail: 'Bought in Anthem West, Henderson · 2025' },
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

      <AnthemWestFAQ />

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
              { name: 'Anthem', href: '/anthem/', price: 'From $450K', compare: 'The broader Anthem master plan including guard-gated sections and Sun City active adult.' },
              { name: 'Anthem Country Club', href: '/anthem-country-club/', price: 'From $700K', compare: 'Guard-gated golf community within Anthem with Hale Irwin-designed course.' },
              { name: 'Seven Hills', href: '/seven-hills/', price: 'From $500K', compare: 'Adjacent Henderson master plan with guard-gated sections and Rio Secco Golf Club.' },
              { name: 'Sun City Anthem', href: '/sun-city-anthem/', price: 'From $350K', compare: 'Del Webb\'s premier 55+ community in Anthem with multiple golf courses and resort amenities.' },
              { name: 'Inspirada', href: '/inspirada/', price: 'From $400K', compare: 'Newer Henderson master plan with modern amenities and active new construction.' },
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
              <h2>Ready to Find Your Anthem West Home?</h2>
              <p>Nevada Real Estate Group is the #1 real estate team in Nevada. Whether you&apos;re buying or selling in Anthem West, let&apos;s talk.</p>
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
                <input type="hidden" name="_subject" value="Anthem West Inquiry — LasVegasHomeSearchExperts.com" />
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
