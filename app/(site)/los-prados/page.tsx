import LosPradosFAQ from '@/components/LosPradosFAQ'
import Link from 'next/link'
import type { Metadata } from 'next'
import LosPradosMapWrapper from '@/components/LosPradosMapWrapper'
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
    { '@type': 'ListItem', position: 3, name: 'Los Prados', item: 'https://www.lasvegashomesearchexperts.com/los-prados/' },
  ],
}

const FAQ_DATA = [
  {
    "q": "What is the price range for homes in Los Prados?",
    "a": "Homes in Los Prados range from approximately $300,000 for townhomes and patio homes to $600,000 for larger single-family homes on golf course lots. The most active price range is $350,000 to $500,000."
  },
  {
    "q": "Is Los Prados guard-gated?",
    "a": "Yes. Los Prados is a guard-gated community with controlled access. It provides security at one of the most affordable price points of any gated golf community in the Las Vegas Valley."
  },
  {
    "q": "What golf course is in Los Prados?",
    "a": "Los Prados features an 18-hole, par-70 golf course that winds through the community. The course has mature trees, water features, and a walkable layout. Affordable golf memberships are available to residents and the public."
  },
  {
    "q": "What are HOA fees at Los Prados?",
    "a": "HOA fees at Los Prados typically range from $150 to $350 per month, making it one of the most affordable guard-gated golf communities in the valley. Fees cover guard gate staffing, common area maintenance, and community infrastructure."
  },
  {
    "q": "Is Los Prados a 55+ community?",
    "a": "No. Los Prados is an all-ages community, though it does attract a significant number of active retirees due to the affordable golf course lifestyle. There are no age restrictions for residency."
  },
  {
    "q": "What ZIP code is Los Prados in?",
    "a": "Los Prados is located in ZIP code 89130 in northwest Las Vegas."
  },
  {
    "q": "How does Los Prados compare to Painted Desert?",
    "a": "Both are affordable guard-gated golf communities in northwest Las Vegas. Los Prados is slightly older (1983 vs. 1988) and has a lower entry price. Painted Desert has a Jay Morrish-designed course and slightly higher price points. Both offer excellent value for guard-gated golf living."
  },
  {
    "q": "What schools serve Los Prados?",
    "a": "Los Prados is served by CCSD schools including Zel & Mary Lowman Elementary, Lied Middle School, and Legacy High School. Private options include Bishop Gorman (A+) and Faith Lutheran (A)."
  },
  {
    "q": "How does the guard gate entry process work?",
    "a": "Residents receive transponders or access codes for automatic entry. Guests must be called in by the homeowner or added to a pre-approved list. Delivery drivers and service providers follow the community's vendor access policy. Most guard-gated communities staff the gate 24 hours a day, 7 days a week."
  },
  {
    "q": "Can non-residents access the community for viewings?",
    "a": "Yes. Prospective buyers can access the community with a licensed real estate agent who coordinates entry with the guard gate in advance. Nevada Real Estate Group handles all gate access arrangements for property showings."
  },
  {
    "q": "What security features are included beyond the guard gate?",
    "a": "Most guard-gated communities include perimeter walls, security patrols, surveillance cameras at entry points, and emergency response coordination. Some communities also offer interior patrol routes and resident notification systems."
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
  name: 'Los Prados',
  description: 'Los Prados is a guard-gated · golf community in Las Vegas, Nevada (ZIP 89130), established in 1983 by Los Prados Development, spanning ~260 acres. Home prices range from $300K–$600K.',
  geo: { '@type': 'GeoCoordinates', latitude: 36.247, longitude: -115.214 },
  address: { '@type': 'PostalAddress', addressLocality: 'Las Vegas', addressRegion: 'NV', postalCode: '89130', addressCountry: 'US' },
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
  const cms = await getCommunityPage('los-prados')
  return {
    title: cms?.metaTitle ?? 'Los Prados Homes for Sale | Nevada Real Estate Group',
    description: cms?.metaDescription ?? 'Browse Los Prados homes for sale in Las Vegas, NV. $300K–$600K. Schools, HOA, market stats. Nevada Real Estate Group.',
    alternates: { canonical: 'https://www.lasvegashomesearchexperts.com/los-prados' },
  }
}

export default async function LosPradosPage() {
  const cms = await getCommunityPage('los-prados')
  const market = getMarketStats('los-prados')
  const ms = market?.stats

  const heroHeadline = cms?.heroHeadline ?? 'Los Prados'
  const heroSubtitle = 'Homes for Sale in Las Vegas, Nevada'
  const overviewTitle = cms?.overviewTitle ?? 'Los Prados: Guard-Gated · Golf Living in Las Vegas'

  const HARDCODED_STATS: Array<[string, string] | [string, string, string]> = [
    ['Established', '1983'],
    ['Developer', 'Los Prados Development'],
    ['Total Acreage', '~260 acres'],
    ['Homes', '~1,100'],
    ['Median Home Price', ms?.medianSalePrice ?? '$300K–$600K'],
    ['ZIP Codes', '89130'],
    ['Guard-Gated', 'Yes'],
    ['HOA', '$150–$350/mo'],
  ]
  const displayStats = mergeQuickStats(HARDCODED_STATS, cms?.quickStats)
  const HARDCODED_DRIVE_TIMES = [
    {
        "time": "~25 min",
        "destination": "to the Strip",
        "route": "via US-95 → I-15"
    },
    {
        "time": "~25 min",
        "destination": "to Harry Reid Airport",
        "route": "via US-95 → I-15"
    },
    {
        "time": "~10 min",
        "destination": "to Centennial Hills Shopping",
        "route": "via N Decatur Blvd"
    },
    {
        "time": "~20 min",
        "destination": "to Downtown Summerlin",
        "route": "via US-95 → Summerlin Pkwy"
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
          <span>Los Prados</span>
        </div>
      </div>

      <header id="hero" className="summerlin-hero hero-v2">
        <img src="https://images.unsplash.com/photo-1581351721010-8cf859cb14a4?auto=format&fit=crop&w=1600&h=700&q=80" alt="Los Prados community aerial view, Las Vegas Nevada" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
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
            <a href="#listings" className="hero-v2-cta">Search Homes in Los Prados</a>
          </div>
        </div>
      </header>

      <div className="hero-v2-qfb">
        <div className="container">
          <div className="hero-v2-qfb-row">
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <span><strong>ZIP:</strong> 89130</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              <span><strong>Type:</strong> Guard-Gated · Golf</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
              <span><strong>Price Range:</strong> $300K–$600K</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
              <span><strong>HOA:</strong> $150–$350/mo</span>
            </div>
          </div>
          <div className="hero-v2-qfb-est">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            <span>Est. 1983</span>
          </div>
        </div>
      </div>

      <section id="demographics" className="demographics-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Demographics</span>
            <h2>Los Prados Demographics</h2>
          </div>
          <div className="demo-grid">
            {[
              ['~2,800', 'Population'],
              ['55', 'Median Age'],
              ['$85,000', 'Avg Household Income'],
              ['~1,100', 'Total Households'],
              ['82%', 'Homeownership Rate'],
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
            <h2>Where is Los Prados?</h2>
            <p>Northwest Las Vegas, Nevada &mdash; Las Vegas, Nevada.</p>
          </div>
          <div className="map-container">
            <LosPradosMapWrapper />
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
            <h2 className="listings-title">NEW LOS PRADOS LISTINGS</h2>
          </div>
          <div className="ylopo-wrap">
            <div className="YLOPO_searchWidget" />
            <div className="YLOPO_resultsWidget" data-search='{"propertyTypes":["house","condo","townhouse"],"minPrice":250000,"locations":[{"city":"Las Vegas","state":"NV"}],"limit":12,"sortBy":"listDate","sortOrder":"desc","keywords":"Los Prados","zipCodes":["89130"]}' />
          </div>
          <p className="ylopo-note">Listing data sourced from regional MLS. Information deemed reliable but not guaranteed. Updated daily.</p>
          <div className="listings-actions">
            <a href="https://search.nevadarealestategroup.net/search?s[orderBy]=sourceCreationDate%2Cdesc&s[page]=1&s[locations][0][city]=Las%20Vegas&s[locations][0][state]=NV&s[keywords]=Los%20Prados" target="_blank" rel="noopener noreferrer" className="btn-gold">View All Los Prados Listings &rarr;</a>
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
                  <p>Los Prados is a guard-gated · golf community in Las Vegas, Nevada (ZIP 89130), developed by Los Prados Development, spanning ~260 acres, with ~1,100 homes. Los Prados is one of the most affordable guard-gated golf communities in the Las Vegas Valley. Developed beginning in 1983, this approximately 260-acre community in northwest Las Vegas features an 18-hole golf course, guard-gated security, and approximately 1,100 homes in a mature, well-established setting. With homes ranging from approximately $300,000 to $600,000, Los Prados provides country club living at a price point that makes it accessible to a wider range of buyers.</p>
                  <p>The Los Prados Golf Course is a par-70 layout that winds through the community, providing golf course frontage and views for many homes. The course features mature trees, water features, and a comfortable walking layout that appeals to golfers of all skill levels. The community clubhouse offers dining, social events, and a gathering space for residents. Golf membership is available and affordable compared to the valley's private clubs.</p>
                  <p>Homes in Los Prados include a mix of single-family homes, townhomes, and patio homes built across several development phases from the mid-1980s through the 1990s. Many homes have been updated and renovated with modern kitchens, bathrooms, and flooring. The community has an established, park-like feel with mature trees and landscaping that creates shade and visual appeal uncommon in newer Las Vegas communities.</p>
                  <p>Los Prados sits in the northwest valley near the intersection of Lone Mountain Road and N Decatur Boulevard, providing good access to the US-95 freeway, the Centennial Hills shopping corridor, and the amenities along N Rancho Drive. The community attracts a diverse buyer pool including active retirees, young professionals, and families seeking guard-gated security and golf course living at a value price point.</p>
                </>
              )}
            </div>
            <div className="overview-aside">
              <div className="quick-facts">
                <h3>Los Prados At a Glance</h3>
                {displayStats.map(([label, value, cls]: any) => (
                  <div className="fact-row" key={label}>
                    <span className="fact-label">{label}</span>
                    <span className={`fact-value${cls ? ' ' + cls : ''}`}>{value}</span>
                  </div>
                ))}
              </div>
              <div className="cta-card">
                <p>Ready to explore Los Prados? Schedule a private tour of the community and the current listings that match your goals.</p>
                <a href="tel:+17252399950" className="btn-gold">Call 725.239.9950</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="highlights">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Why Los Prados</span>
            <h2>What Makes Los Prados Stand Out</h2>
          </div>
          <div className="highlights-grid">
            {[
              { title: 'Affordable Golf Living', body: 'One of the most affordable guard-gated golf communities in Las Vegas. Golf course homes from approximately $300,000 — a fraction of what comparable communities charge.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 2v10l7 4"/></svg> },
              { title: 'Guard-Gated Security', body: '24-hour guard-gated access provides security and peace of mind at a fraction of the cost of the valley\'s luxury gated communities.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
              { title: 'Mature Landscaping', body: '40+ years of growth have created a lush, tree-lined community with mature shade trees, green common areas, and a park-like atmosphere rare in Las Vegas.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22c4-4 8-7.5 8-12a8 8 0 10-16 0c0 4.5 4 8 8 12z"/><circle cx="12" cy="10" r="3"/></svg> },
              { title: 'Low HOA Fees', body: 'HOA fees of $150–$350/month are among the lowest of any guard-gated golf community in the valley. Excellent value for the amenities and security provided.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg> },
              { title: '18-Hole Golf Course', body: 'Par-70 championship layout with water features, mature fairways, and a comfortable walking design. Affordable golf memberships available to residents.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
              { title: 'Northwest Location', body: 'Easy access to US-95, Centennial Hills shopping, and the growing northwest corridor. Close to Lone Mountain and outdoor recreation.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M8 21l4-11 4 11"/><path d="M2 21l5-14 4 8"/><path d="M14 15l4-8 4 14"/><line x1="2" y1="21" x2="22" y2="21"/></svg> },
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
            <h2>Parks &amp; Recreation Near Los Prados</h2>
          </div>
          <div className="parks-grid">
            {[
              { name: 'Los Prados Golf Course & Clubhouse', address: '5150 Los Prados Cir, Las Vegas, NV 89130', acreage: '~120 acres', amenities: ["18-hole golf course","Clubhouse dining","Community pool","Social events","Practice facilities"] },
              { name: 'Lone Mountain Park', address: '4445 N Jensen St, Las Vegas, NV 89130', acreage: '~10 acres', amenities: ["Walking trails","Playground","Basketball courts","Picnic areas","Open space"] },
              { name: 'Centennial Hills Park', address: '7101 N Buffalo Dr, Las Vegas, NV 89131', acreage: '~120 acres', amenities: ["Water play area","Dog park","Walking trails","Athletic fields","Amphitheater"] },
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
            <h2>The Los Prados Lifestyle</h2>
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
              <div className="lifestyle-v2-stat">~1,100</div>
              <div className="lifestyle-v2-label">Homes</div>
            </div>
            <div className="lifestyle-v2-item">
              <div className="lifestyle-v2-icon"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 2v10l7 4"/></svg></div>
              <div className="lifestyle-v2-stat">1983</div>
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
            <h2>HOA Information for Los Prados</h2>
          </div>
          <div className="hoa-grid">
            <div className="hoa-fees-col">
              <h3>Fees &amp; Management</h3>
              <div className="hoa-fee-row"><span>Monthly HOA Range</span><strong>$150–$350/mo</strong></div>
              <div className="hoa-fee-row"><span>Guard-Gated</span><strong>Yes — staffed gate</strong></div>
              <div className="hoa-fee-row"><span>Community Type</span><strong>Guard-Gated · Golf</strong></div>
              <div className="hoa-management">
                <p className="hoa-mgmt-label">Management</p>
                <p className="hoa-mgmt-value">Community Association</p>
              </div>
              <p style={{ marginTop: '16px', fontSize: '11px', color: 'var(--text-faint)', fontStyle: 'italic' }}>HOA fees are subject to change. Verify current fees with the management company before purchase.</p>
            </div>
            <div className="hoa-amenities-col">
              <h3>What HOA Typically Covers</h3>
              <ul className="hoa-amenity-list">
                {['24-hour guard gate staffing and security patrols','Common area landscaping and maintenance','Community parks and trail maintenance','Neighborhood street maintenance','Perimeter wall and gate maintenance','Exterior architectural standards enforcement','Reserve fund contributions','Golf course common area adjacency'].map((a: string) => <li key={a}>{a}</li>)}
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
            <h2>Schools Serving Los Prados</h2>
          </div>
          <div className="schools-v2-table">
            <div className="schools-v2-header">
              <span>School Name</span>
              <span>Grades</span>
              <span>Rating</span>
            </div>
            {[
              ['Zel & Mary Lowman Elementary', 'K–5', '6/10'],
              ['Lied Middle School', '6–8', '5/10'],
              ['Legacy High School', '9–12', '5/10'],
              ['Bishop Gorman High School', '9–12', 'A+'],
              ['Faith Lutheran Middle & High', '6–12', 'A'],
              ['Mountain View Christian School', 'PreK–8', 'B+'],
              ['Doral Academy Red Rock', 'K–12', '9/10'],
              ['Somerset Academy NW', 'K–8', '8/10'],
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
            <h2>What Los Prados Buyers Say</h2>
          </div>
          <div className="testimonials-grid">
            {[
              { quote: 'Los Prados was the best-kept secret in Las Vegas — guard-gated, golf course, mature trees, and we paid less than half of what we\'d pay in Summerlin. Nevada Real Estate Group showed us this community when others overlooked it.', name: 'Robert & Nancy K.', detail: 'Bought in Los Prados · 2024' },
              { quote: 'We retired to Las Vegas and wanted golf course living without the country club price tag. Los Prados delivered exactly that. Nevada Real Estate Group found us a renovated home on the 7th fairway for under $500,000.', name: 'George P.', detail: 'Bought in Los Prados · 2025' },
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

      <LosPradosFAQ />

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
              { name: 'Painted Desert', href: '/painted-desert/', price: 'From $400K', compare: 'Guard-gated Jay Morrish golf community nearby with slightly higher price points.' },
              { name: 'Centennial Hills', href: '/centennial-hills/', price: 'From $400K', compare: 'Adjacent master-planned area with newer homes, parks, and top-rated schools.' },
              { name: 'Lone Mountain', href: '/lone-mountain/', price: 'From $500K', compare: 'Nearby northwest community with custom homes and luxury horse properties.' },
              { name: 'Desert Shores', href: '/desert-shores/', price: 'From $350K', compare: 'Lakefront community nearby with recreational lakes and waterfront homes.' },
              { name: 'Sun City Summerlin', href: '/sun-city-summerlin/', price: 'From $300K', compare: 'Del Webb 55+ community with three golf courses and world-class recreation centers.' },
              { name: 'Aliante', href: '/aliante/', price: 'From $350K', compare: 'North Las Vegas master plan with golf, parks, and family-friendly neighborhoods.' },
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
              <h2>Ready to Find Your Los Prados Home?</h2>
              <p>Nevada Real Estate Group is the #1 real estate team in Nevada. Whether you&apos;re buying or selling in Los Prados, let&apos;s talk.</p>
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
                <input type="hidden" name="_subject" value="Los Prados Inquiry — LasVegasHomeSearchExperts.com" />
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
