import MountainsEdgeTuscanoFAQ from '@/components/MountainsEdgeTuscanoFAQ'
import Link from 'next/link'
import type { Metadata } from 'next'
import MountainsEdgeTuscanoMapWrapper from '@/components/MountainsEdgeTuscanoMapWrapper'
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
    { '@type': 'ListItem', position: 3, name: 'Tuscano at Mountains Edge', item: 'https://www.lasvegashomesearchexperts.com/mountains-edge-tuscano/' },
  ],
}

const FAQ_DATA = [
  {
    "q": "What is the price range for homes in Tuscano at Mountains Edge?",
    "a": "Homes in Tuscano range from approximately $400,000 for smaller homes to $600,000 for larger premium homes on the best lots. The sweet spot for most buyers is $450K to $550K."
  },
  {
    "q": "Who built homes in Tuscano?",
    "a": "Tuscano was built primarily by Pardee Homes, one of Las Vegas's most respected builders known for quality construction and thoughtful floor plan design."
  },
  {
    "q": "Is Tuscano guard-gated?",
    "a": "No — Tuscano is not guard-gated. It is part of the broader Mountains Edge master-planned community, which is an open community with HOA governance and well-maintained common areas."
  },
  {
    "q": "What ZIP code is Tuscano in?",
    "a": "Tuscano at Mountains Edge is located in ZIP code 89178 in southwest Las Vegas."
  },
  {
    "q": "What are HOA fees in Tuscano?",
    "a": "HOA fees are relatively low, typically ranging from $60 to $140 per month. Fees cover common area maintenance, trails, parks, and landscaping of shared spaces."
  },
  {
    "q": "What schools serve Tuscano?",
    "a": "Tuscano is served by CCSD schools including Carolyn S. Reedom Elementary (8/10), Lawrence & Heidi Canarelli Middle School (7/10), and Sierra Vista High School. Doral Academy (9/10) is a popular charter option."
  },
  {
    "q": "Is Tuscano good for families?",
    "a": "Tuscano is one of the most family-friendly neighborhoods in Mountains Edge. The combination of quality Pardee construction, mature landscaping, trail connectivity, top-rated schools, and proximity to the Regional Park makes it ideal for families with children."
  },
  {
    "q": "How does Tuscano compare to other Mountains Edge neighborhoods?",
    "a": "Tuscano is one of the most established neighborhoods within Mountains Edge, offering mature landscaping and a settled community character that newer sections are still developing. Pricing is competitive with the broader community, with the added appeal of Pardee's build quality."
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
  name: 'Tuscano at Mountains Edge',
  description: 'Tuscano at Mountains Edge is a master-planned · family community in Las Vegas, Nevada.',
  geo: { '@type': 'GeoCoordinates', latitude: 36.018, longitude: -115.27 },
  address: { '@type': 'PostalAddress', addressLocality: 'Las Vegas', addressRegion: 'NV', postalCode: '89178', addressCountry: 'US' },
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
  const cms = await getCommunityPage('mountains-edge-tuscano')
  return {
    title: cms?.metaTitle ?? 'Tuscano at Mountains Edge Homes for Sale | Nevada Real Estate Group',
    description: cms?.metaDescription ?? 'Browse Tuscano at Mountains Edge homes for sale in Las Vegas, NV. $400K–$600K. Schools, HOA, market stats. Nevada Real Estate Group.',
    alternates: { canonical: 'https://www.lasvegashomesearchexperts.com/mountains-edge-tuscano' },
  }
}

export default async function MountainsEdgeTuscanoPage() {
  const cms = await getCommunityPage('mountains-edge-tuscano')
  const market = getMarketStats('mountains-edge-tuscano')
  const ms = market?.stats

  const heroHeadline = cms?.heroHeadline ?? 'Tuscano at Mountains Edge'
  const heroSubtitle = 'Homes for Sale in Las Vegas, Nevada'
  const overviewTitle = cms?.overviewTitle ?? 'Tuscano at Mountains Edge: Master-Planned · Family Living in Las Vegas'

  const HARDCODED_STATS: Array<[string, string] | [string, string, string]> = [
    ['Established', '2006'],
    ['Developer', 'Focus Property Group / Pardee Homes'],
    ['Total Acreage', '~150 acres'],
    ['Homes', '800+'],
    ['Median Home Price', ms?.medianSalePrice ?? '$400K–$600K'],
    ['ZIP Codes', '89178'],
    ['Guard-Gated', 'No'],
    ['HOA', '$60–$140/mo'],
  ]
  const displayStats = mergeQuickStats(HARDCODED_STATS, cms?.quickStats)
  const HARDCODED_DRIVE_TIMES = [
    {
        "time": "~10 min",
        "destination": "to Red Rock Canyon",
        "route": "via Blue Diamond Rd"
    },
    {
        "time": "~20 min",
        "destination": "to the Strip",
        "route": "via I-15 North"
    },
    {
        "time": "~25 min",
        "destination": "to Harry Reid Airport",
        "route": "via I-15 → I-215"
    },
    {
        "time": "~15 min",
        "destination": "to Southern Highlands",
        "route": "via S Las Vegas Blvd"
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
          <span>Tuscano at Mountains Edge</span>
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
                <span className="hero-v2-stat-num">{ms?.medianSalePrice ?? qs('Median Home Price', '$400K–$600K')}</span>
                <span className="hero-v2-stat-lbl">Median Sale Price</span>
              </div>
              <div className="hero-v2-stat">
                <span className="hero-v2-stat-num">{ms?.avgDaysToClose ?? qs('Avg Days on Market', '45')}</span>
                <span className="hero-v2-stat-lbl">Avg Days to Close</span>
              </div>
            </div>
            <a href="#listings" className="hero-v2-cta">Search Homes in Tuscano at Mountains Edge</a>
          </div>
        </div>
      </header>

      <div className="hero-v2-qfb">
        <div className="container">
          <div className="hero-v2-qfb-row">
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <span><strong>ZIP:</strong> 89178</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              <span><strong>Type:</strong> Master-Planned · Family</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
              <span><strong>Price Range:</strong> $400K–$600K</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
              <span><strong>HOA:</strong> $60–$140/mo</span>
            </div>
          </div>
          <div className="hero-v2-qfb-est">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            <span>Est. 2006</span>
          </div>
        </div>
      </div>

      <section id="demographics" className="demographics-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Demographics</span>
            <h2>Tuscano at Mountains Edge Demographics</h2>
          </div>
          <div className="demo-grid">
            {[
              ['~2,500', 'Population'],
              ['37', 'Median Age'],
              ['$80,000', 'Avg Household Income'],
              ['800+', 'Total Households'],
              ['75%', 'Homeownership Rate'],
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
            <h2>Where is Tuscano at Mountains Edge?</h2>
            <p>Mountains Edge, Las Vegas &mdash; Las Vegas, Nevada.</p>
          </div>
          <div className="map-container">
            <MountainsEdgeTuscanoMapWrapper />
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
            <h2 className="listings-title">NEW TUSCANO AT MOUNTAINS EDGE LISTINGS</h2>
          </div>
          <div className="ylopo-wrap">
            <div className="YLOPO_searchWidget" />
            <div className="YLOPO_resultsWidget" data-search='{"propertyTypes":["house","condo","townhouse"],"minPrice":350000,"locations":[{"city":"Las Vegas","state":"NV"}],"limit":12,"sortBy":"listDate","sortOrder":"desc","keywords":"Mountains Edge","zipCodes":["89178"]}' />
          </div>
          <p className="ylopo-note">Listing data sourced from regional MLS. Information deemed reliable but not guaranteed. Updated daily.</p>
          <div className="listings-actions">
            <a href="https://search.nevadarealestategroup.net/search?s[orderBy]=sourceCreationDate%2Cdesc&s[page]=1&s[locations][0][city]=Las%20Vegas&s[locations][0][state]=NV&s[keywords]=Mountains%20Edge" target="_blank" rel="noopener noreferrer" className="btn-gold">View All Tuscano at Mountains Edge Listings &rarr;</a>
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
                  <p>Tuscano at Mountains Edge is one of the most established and desirable neighborhoods within the larger Mountains Edge master-planned community. Developed primarily by Pardee Homes beginning around 2006, Tuscano features well-built single-family homes with Tuscan-inspired architectural elements — warm stucco tones, clay tile accents, and stone veneer details — that give the neighborhood a distinctive character within the broader community.</p>
                  <p>Homes in Tuscano range from approximately $400,000 to $600,000, with floor plans spanning 1,800 to 3,200 square feet. Most homes feature three to five bedrooms, two-car garages, open-concept living areas, and rear yards large enough for pools and outdoor entertaining. The neighborhood's mature landscaping and established trees give it a settled, comfortable feel that newer sections of Mountains Edge are still developing.</p>
                  <p>Tuscano benefits from its location near the heart of the Mountains Edge master plan, with easy access to Mountains Edge Regional Park — a 100-acre facility with athletic fields, playgrounds, splash pads, and walking trails. The community's extensive trail network connects Tuscano to parks, schools, and the commercial corridor along Blue Diamond Road. Exploration Peak Park, with its hiking trails and mountain summit views, is a short drive away.</p>
                  <p>The neighborhood is served by well-regarded CCSD schools and is within the attendance boundaries for some of the highest-rated elementary schools in the southwest valley. For families seeking a well-built, well-located home in one of Las Vegas's most successful master-planned communities at price points well below Summerlin, Tuscano delivers outstanding value.</p>
                </>
              )}
            </div>
            <div className="overview-aside">
              <div className="quick-facts">
                <h3>Tuscano at Mountains Edge At a Glance</h3>
                {displayStats.map(([label, value, cls]: any) => (
                  <div className="fact-row" key={label}>
                    <span className="fact-label">{label}</span>
                    <span className={`fact-value${cls ? ' ' + cls : ''}`}>{value}</span>
                  </div>
                ))}
              </div>
              <div className="cta-card">
                <p>Ready to explore Tuscano at Mountains Edge? Schedule a private tour of the community and the current listings that match your goals.</p>
                <a href="tel:+17252399950" className="btn-gold">Call 725.239.9950</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="highlights">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Why Tuscano at Mountains Edge</span>
            <h2>What Makes Tuscano at Mountains Edge Stand Out</h2>
          </div>
          <div className="highlights-grid">
            {[
              { title: 'Pardee Homes Quality', body: 'Built primarily by Pardee Homes, one of Las Vegas\'s most respected builders. Solid construction with Tuscan-inspired architecture and mature landscaping throughout.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
              { title: 'Mountains Edge Regional Park', body: 'Minutes from the 100-acre Regional Park with athletic fields, playgrounds, splash pads, and walking trails. One of the premier park facilities in the southwest valley.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22c4-4 8-7.5 8-12a8 8 0 10-16 0c0 4.5 4 8 8 12z"/><circle cx="12" cy="10" r="3"/></svg> },
              { title: 'Extensive Trail Network', body: 'Connected multi-use trails link Tuscano to parks, schools, and commercial areas throughout the Mountains Edge master plan. Walk or bike from your front door.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M8 21l4-11 4 11"/><path d="M2 21l5-14 4 8"/><path d="M14 15l4-8 4 14"/><line x1="2" y1="21" x2="22" y2="21"/></svg> },
              { title: 'Top-Rated Schools', body: 'Within attendance boundaries for highly rated CCSD schools. Carolyn S. Reedom Elementary (8/10) and quality charter options including Doral Academy are nearby.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><line x1="8" y1="6" x2="8" y2="6.01"/><line x1="12" y1="6" x2="12" y2="6.01"/><line x1="16" y1="6" x2="16" y2="6.01"/><line x1="8" y1="10" x2="8" y2="10.01"/><line x1="12" y1="10" x2="12" y2="10.01"/><line x1="16" y1="10" x2="16" y2="10.01"/><line x1="8" y1="14" x2="8" y2="14.01"/><line x1="12" y1="14" x2="12" y2="14.01"/><line x1="16" y1="14" x2="16" y2="14.01"/></svg> },
              { title: 'Established Neighborhood', body: 'Mature landscaping, established trees, and a settled community feel. Tuscano has the character that newer sections of Mountains Edge are still building toward.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
              { title: 'Exceptional Value', body: 'Master-planned community living from $400K in one of Las Vegas\'s most successful developments. Strong resale performance and consistent family buyer demand.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg> },
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
            <h2>Parks &amp; Recreation Near Tuscano at Mountains Edge</h2>
          </div>
          <div className="parks-grid">
            {[
              { name: 'Mountains Edge Regional Park', address: '7701 Mountains Edge Pkwy, Las Vegas, NV 89178', acreage: '~100 acres', amenities: ["Baseball/softball fields","Soccer fields","Basketball courts","Playground","Splash pad","Walking trails"] },
              { name: 'Exploration Peak Park', address: '9600 S Buffalo Dr, Las Vegas, NV 89178', acreage: '~98 acres', amenities: ["Hiking trails","Mountain summit views","Nature exploration","Picnic areas","Desert landscape trails"] },
              { name: 'Mountains Edge Park (Central)', address: '8101 W Mountains Edge Pkwy, Las Vegas, NV 89178', acreage: '~15 acres', amenities: ["Playground","Walking paths","Picnic shelters","Open turf","Dog-friendly areas"] },
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
            <h2>The Tuscano at Mountains Edge Lifestyle</h2>
          </div>
          <div className="lifestyle-v2-grid">
            <div className="lifestyle-v2-item">
              <div className="lifestyle-v2-icon"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg></div>
              <div className="lifestyle-v2-stat">~10 min</div>
              <div className="lifestyle-v2-label">to Red Rock Canyon</div>
            </div>
            <div className="lifestyle-v2-item">
              <div className="lifestyle-v2-icon"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22c4-4 8-7.5 8-12a8 8 0 10-16 0c0 4.5 4 8 8 12z"/><circle cx="12" cy="10" r="3"/></svg></div>
              <div className="lifestyle-v2-stat">3+</div>
              <div className="lifestyle-v2-label">Nearby Parks</div>
            </div>
            <div className="lifestyle-v2-item">
              <div className="lifestyle-v2-icon"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg></div>
              <div className="lifestyle-v2-stat">800+</div>
              <div className="lifestyle-v2-label">Homes</div>
            </div>
            <div className="lifestyle-v2-item">
              <div className="lifestyle-v2-icon"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 2v10l7 4"/></svg></div>
              <div className="lifestyle-v2-stat">2006</div>
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

      <section id="schools" className="schools-v2">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Education</span>
            <h2>Schools Serving Tuscano at Mountains Edge</h2>
          </div>
          <div className="schools-v2-table">
            <div className="schools-v2-header">
              <span>School Name</span>
              <span>Grades</span>
              <span>Rating</span>
            </div>
            {[
              ['Carolyn S. Reedom Elementary', 'K–5', '8/10'],
              ['Lawrence & Heidi Canarelli Middle', '6–8', '7/10'],
              ['Sierra Vista High School', '9–12', '6/10'],
              ['Mountain View Christian School', 'PreK–8', 'A'],
              ['Bishop Gorman High School', '9–12', 'A+'],
              ['Henderson International School', 'PreK–12', 'A'],
              ['Doral Academy of Nevada', 'K–8', '9/10'],
              ['Somerset Academy Sky Pointe', 'K–8', '8/10'],
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
            <h2>What Tuscano at Mountains Edge Buyers Say</h2>
          </div>
          <div className="testimonials-grid">
            {[
              { quote: 'Nevada Real Estate Group helped us find the perfect Pardee-built home in Tuscano. They knew which floor plans had the best layouts and which lots backed to the trails. Our family loves the neighborhood and the parks are amazing.', name: 'Steven & Amanda B.', detail: 'Bought in Tuscano, Mountains Edge · 2024' },
              { quote: 'We sold our Tuscano home quickly and at a great price thanks to Nevada Real Estate Group. They marketed the home\'s proximity to the Regional Park and trails beautifully. Three offers in the first week.', name: 'Jennifer L.', detail: 'Sold in Tuscano, Mountains Edge · 2025' },
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

      <MountainsEdgeTuscanoFAQ />

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
              { name: 'Mountains Edge', href: '/mountains-edge/', price: 'From $350K', compare: 'The broader 3,500-acre master plan encompassing Tuscano and 12,000+ homes with extensive trails and parks.' },
              { name: 'Southern Highlands', href: '/southern-highlands/', price: 'From $400K', compare: 'Guard-gated golf community to the south with Jack Nicklaus course and luxury estates.' },
              { name: 'Rhodes Ranch', href: '/rhodes-ranch/', price: 'From $350K', compare: 'Guard-gated golf community to the north with Ted Robinson course and resort amenities.' },
              { name: 'Enterprise', href: '/enterprise/', price: 'From $350K', compare: 'Growing unincorporated area surrounding Mountains Edge with diverse housing options.' },
              { name: 'Spring Valley', href: '/spring-valley/', price: 'From $300K', compare: 'Established suburban community to the north with strong retail and dining corridors.' },
              { name: 'Inspirada', href: '/inspirada/', price: 'From $420K', compare: 'Henderson\'s newest master-planned community with design-forward gathering spaces.' },
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
              <h2>Ready to Find Your Tuscano at Mountains Edge Home?</h2>
              <p>Nevada Real Estate Group is the #1 real estate team in Nevada. Whether you&apos;re buying or selling in Tuscano at Mountains Edge, let&apos;s talk.</p>
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
                <input type="hidden" name="_subject" value="Tuscano at Mountains Edge Inquiry — LasVegasHomeSearchExperts.com" />
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
