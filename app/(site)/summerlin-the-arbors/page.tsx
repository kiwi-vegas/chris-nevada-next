import SummerlinTheArborsFAQ from '@/components/SummerlinTheArborsFAQ'
import Link from 'next/link'
import type { Metadata } from 'next'
import SummerlinTheArborsMapWrapper from '@/components/SummerlinTheArborsMapWrapper'
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
    { '@type': 'ListItem', position: 3, name: 'The Arbors', item: 'https://www.lasvegashomesearchexperts.com/summerlin-the-arbors/' },
  ],
}

const FAQ_DATA = [
  {
    "q": "What is the price range in The Arbors?",
    "a": "Homes in The Arbors range from approximately $450,000 for smaller homes and townhomes to over $800,000 for larger, renovated properties on premium lots."
  },
  {
    "q": "Is The Arbors guard-gated?",
    "a": "No — The Arbors is not guard-gated. Most neighborhoods within The Arbors are gated with key-fob or access code entry but do not have a staffed guard gate."
  },
  {
    "q": "When was The Arbors built?",
    "a": "The Arbors was one of Summerlin's original villages, with development beginning in 1993. Most homes were built between 1993 and the early 2000s."
  },
  {
    "q": "What schools serve The Arbors?",
    "a": "The Arbors is served by CCSD schools including Jydstrup Elementary (7/10), Mannion Middle (7/10), and Palo Verde High School (8/10). Top private schools including The Meadows School (A+) are nearby."
  },
  {
    "q": "How does The Arbors compare to Stonebridge?",
    "a": "Stonebridge offers new construction with modern architecture and mountain views. The Arbors offers established neighborhoods with mature landscaping and lower price points. Both are excellent Summerlin villages — the choice depends on whether you prefer new construction or established character."
  },
  {
    "q": "What are HOA fees in The Arbors?",
    "a": "HOA fees in The Arbors are among the most affordable in Summerlin, ranging from approximately $75 to $200 per month. This includes the Summerlin master association fee plus the village sub-association fee."
  },
  {
    "q": "Is The Arbors a good value in Summerlin?",
    "a": "Yes — The Arbors is one of the most affordable villages in Summerlin while delivering the full Summerlin lifestyle: trail access, community amenities, strong schools, and proximity to Downtown Summerlin. It represents excellent value for buyers who prefer established neighborhoods."
  },
  {
    "q": "What ZIP code is The Arbors in?",
    "a": "The Arbors is located primarily in ZIP codes 89134 and 89144 in the Summerlin North area of Las Vegas."
  },
  {
    "q": "What are the best sub-neighborhoods within The Arbors?",
    "a": "The best sub-neighborhood depends on your priorities — school zones, lot size, home age, and proximity to amenities all vary within the community. Nevada Real Estate Group agents who specialize in The Arbors can walk you through the specific blocks and streets that match your criteria."
  },
  {
    "q": "How is new construction availability in The Arbors?",
    "a": "New construction availability varies by season and builder phase. Some sections of The Arbors have active new home sales while others are fully built out with resale-only inventory. Contact Nevada Real Estate Group for the most current new construction options."
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
  name: 'The Arbors',
  description: 'The Arbors is a master-planned · family community in Las Vegas, Nevada (ZIP 89134), established in 1993 by Howard Hughes Corporation, spanning 600 acres. Home prices range from $450K–$800K.',
  geo: { '@type': 'GeoCoordinates', latitude: 36.2, longitude: -115.28 },
  address: { '@type': 'PostalAddress', addressLocality: 'Las Vegas', addressRegion: 'NV', postalCode: '89134', addressCountry: 'US' },
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
  const cms = await getCommunityPage('summerlin-the-arbors')
  return {
    title: cms?.metaTitle ?? 'The Arbors Homes for Sale | Nevada Real Estate Group',
    description: cms?.metaDescription ?? 'Browse The Arbors homes for sale in Las Vegas, NV. $450K–$800K. Schools, HOA, market stats. Nevada Real Estate Group.',
    alternates: { canonical: 'https://www.lasvegashomesearchexperts.com/summerlin-the-arbors' },
  }
}

export default async function SummerlinTheArborsPage() {
  const cms = await getCommunityPage('summerlin-the-arbors')
  const market = getMarketStats('summerlin-the-arbors')
  const ms = market?.stats

  const heroHeadline = cms?.heroHeadline ?? 'The Arbors'
  const heroSubtitle = 'Homes for Sale in Las Vegas, Nevada'
  const overviewTitle = cms?.overviewTitle ?? 'The Arbors: Master-Planned · Family Living in Las Vegas'

  const HARDCODED_STATS: Array<[string, string] | [string, string, string]> = [
    ['Established', '1993'],
    ['Developer', 'Howard Hughes Corporation'],
    ['Total Acreage', '600 acres'],
    ['Homes', '3,500+'],
    ['Median Home Price', ms?.medianSalePrice ?? '$450K–$800K'],
    ['ZIP Codes', '89134, 89144'],
    ['Guard-Gated', 'No'],
    ['HOA', '$75–$200/mo'],
  ]
  const displayStats = mergeQuickStats(HARDCODED_STATS, cms?.quickStats)
  const HARDCODED_DRIVE_TIMES = [
    {
        "time": "~20 min",
        "destination": "to the Strip",
        "route": "via Summerlin Pkwy → I-15"
    },
    {
        "time": "~15 min",
        "destination": "to Red Rock Canyon",
        "route": "via W Charleston Blvd"
    },
    {
        "time": "~10 min",
        "destination": "to Downtown Summerlin",
        "route": "via Summerlin Pkwy"
    },
    {
        "time": "~30 min",
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
          <span>The Arbors</span>
        </div>
      </div>

      <header id="hero" className="summerlin-hero hero-v2">
        <img src="https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1600&h=700&q=80" alt="The Arbors community aerial view, Las Vegas Nevada" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
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
            <a href="#listings" className="hero-v2-cta">Search Homes in The Arbors</a>
          </div>
        </div>
      </header>

      <div className="hero-v2-qfb">
        <div className="container">
          <div className="hero-v2-qfb-row">
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <span><strong>ZIP:</strong> 89134, 89144</span>
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
              <span><strong>HOA:</strong> $75–$200/mo</span>
            </div>
          </div>
          <div className="hero-v2-qfb-est">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            <span>Est. 1993</span>
          </div>
        </div>
      </div>

      <section id="demographics" className="demographics-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Demographics</span>
            <h2>The Arbors Demographics</h2>
          </div>
          <div className="demo-grid">
            {[
              ['9,500+', 'Population'],
              ['40', 'Median Age'],
              ['$125,000+', 'Avg Household Income'],
              ['3,500+', 'Total Households'],
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
            <h2>Where is The Arbors?</h2>
            <p>Summerlin North, Las Vegas &mdash; Las Vegas, Nevada.</p>
          </div>
          <div className="map-container">
            <SummerlinTheArborsMapWrapper />
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
            <h2 className="listings-title">NEW THE ARBORS LISTINGS</h2>
          </div>
          <div className="ylopo-wrap">
            <div className="YLOPO_searchWidget" />
            <div className="YLOPO_resultsWidget" data-search='{"propertyTypes":["house","condo","townhouse"],"minPrice":400000,"locations":[{"city":"Las Vegas","state":"NV"}],"limit":12,"sortBy":"listDate","sortOrder":"desc","keywords":"The Arbors Summerlin","zipCodes":["89134","89144"]}' />
          </div>
          <p className="ylopo-note">Listing data sourced from regional MLS. Information deemed reliable but not guaranteed. Updated daily.</p>
          <div className="listings-actions">
            <a href="https://search.nevadarealestategroup.net/search?s[orderBy]=sourceCreationDate%2Cdesc&s[page]=1&s[locations][0][city]=Las%20Vegas&s[locations][0][state]=NV&s[keywords]=The%20Arbors%20Summerlin" target="_blank" rel="noopener noreferrer" className="btn-gold">View All The Arbors Listings &rarr;</a>
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
                  <p>The Arbors is a master-planned · family community within Summerlin in Las Vegas, Nevada (ZIP 89134/89144), developed by Howard Hughes Corporation, spanning 600 acres, with 3,500+ homes. The Arbors is one of Summerlin's original and most established villages, located in the Summerlin North Association. Developed beginning in 1993, The Arbors was among the first residential villages built within the Summerlin master plan and has matured into one of the most desirable family neighborhoods in the Las Vegas Valley. The village benefits from mature landscaping, tree-lined streets, and the established community character that only comes with three decades of residential continuity.</p>
                  <p>Homes in The Arbors range from approximately $450,000 for smaller single-family homes and townhomes to over $800,000 for larger, renovated estate-style properties on premium lots. The architectural character is classic Summerlin — Mediterranean and transitional styles built by a mix of national and regional builders during the 1990s and early 2000s. Many homes have been significantly updated over the years, with modern kitchens, pools, and desert landscaping.</p>
                  <p>The Arbors' location in Summerlin North puts it within easy reach of Downtown Summerlin (approximately 10 minutes), Red Rock Canyon (approximately 15 minutes), and the 215 Beltway for quick access to the rest of the valley. The village is served by strong CCSD schools and is proximate to private options including The Meadows School and Faith Lutheran. For families with school-age children, The Arbors offers a combination of neighborhood stability and school quality that few Las Vegas communities can match.</p>
                  <p>The value proposition of The Arbors is straightforward: it delivers the Summerlin address, mature neighborhood character, strong schools, and convenient location at price points significantly below the newer and more premium villages. For buyers who prioritize established neighborhoods over new construction, The Arbors is one of the best values in Summerlin.</p>
                </>
              )}
            </div>
            <div className="overview-aside">
              <div className="quick-facts">
                <h3>The Arbors At a Glance</h3>
                {displayStats.map(([label, value, cls]: any) => (
                  <div className="fact-row" key={label}>
                    <span className="fact-label">{label}</span>
                    <span className={`fact-value${cls ? ' ' + cls : ''}`}>{value}</span>
                  </div>
                ))}
              </div>
              <div className="cta-card">
                <p>Ready to explore The Arbors? Schedule a private tour of the community and the current listings that match your goals.</p>
                <a href="tel:+17252399950" className="btn-gold">Call 725.239.9950</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="highlights">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Why The Arbors</span>
            <h2>What Makes The Arbors Stand Out</h2>
          </div>
          <div className="highlights-grid">
            {[
              { title: 'Mature, Established Neighborhood', body: 'Over 30 years of mature landscaping, tree-lined streets, and residential continuity create a neighborhood character that newer communities cannot replicate.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22c4-4 8-7.5 8-12a8 8 0 10-16 0c0 4.5 4 8 8 12z"/><circle cx="12" cy="10" r="3"/></svg> },
              { title: 'Strong School Zoning', body: 'Served by well-regarded CCSD schools. Close to top private options including The Meadows School (A+) and Faith Lutheran. A top choice for school-focused families.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M4 19.5A2.5 2.5 0 006.5 22H20V2H6.5A2.5 2.5 0 004 4.5v15z"/></svg> },
              { title: 'Accessible Summerlin Pricing', body: 'Entry into the Summerlin address from approximately $450K — one of the most affordable villages in the master plan while still delivering the full Summerlin lifestyle.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg> },
              { title: 'Central Summerlin North Location', body: 'Minutes from Downtown Summerlin\'s 125+ shops and restaurants, Las Vegas Ballpark, and City National Arena. Easy 215 Beltway access for valley-wide commuting.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><line x1="8" y1="6" x2="8" y2="6.01"/><line x1="12" y1="6" x2="12" y2="6.01"/><line x1="16" y1="6" x2="16" y2="6.01"/><line x1="8" y1="10" x2="8" y2="10.01"/><line x1="12" y1="10" x2="12" y2="10.01"/><line x1="16" y1="10" x2="16" y2="10.01"/><line x1="8" y1="14" x2="8" y2="14.01"/><line x1="12" y1="14" x2="12" y2="14.01"/><line x1="16" y1="14" x2="16" y2="14.01"/></svg> },
              { title: 'Community Parks & Trails', body: 'Connected to Summerlin\'s 200+ mile trail network with multiple neighborhood parks, playgrounds, and green spaces throughout the village.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22c4-4 8-7.5 8-12a8 8 0 10-16 0c0 4.5 4 8 8 12z"/><circle cx="12" cy="10" r="3"/></svg> },
              { title: 'Strong Resale Value', body: 'As one of Summerlin\'s original villages, The Arbors has demonstrated consistent appreciation over three decades. Established neighborhoods with mature trees consistently outperform newer communities on a per-square-foot basis.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg> },
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
            <h2>Parks &amp; Recreation Near The Arbors</h2>
          </div>
          <div className="parks-grid">
            {[
              { name: 'Gardens Park', address: '10401 Garden Park Dr, Las Vegas, NV 89134', acreage: '~15 acres', amenities: ["Playground","Basketball courts","Walking trails","Picnic areas","Open fields","Dog park"] },
              { name: 'Arbors Community Pool', address: 'Within The Arbors HOA, Las Vegas, NV 89134', acreage: '~3 acres', amenities: ["Community swimming pool","Sun deck","Restrooms","Seasonal access"] },
              { name: 'Summerlin Trail System', address: 'Access points throughout The Arbors', acreage: 'Connected network', amenities: ["Paved multi-use trails","Desert landscape","Connects to Red Rock trails","Dog-friendly"] },
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
            <h2>The The Arbors Lifestyle</h2>
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
              <div className="lifestyle-v2-stat">3,500+</div>
              <div className="lifestyle-v2-label">Homes</div>
            </div>
            <div className="lifestyle-v2-item">
              <div className="lifestyle-v2-icon"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 2v10l7 4"/></svg></div>
              <div className="lifestyle-v2-stat">1993</div>
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
            <h2>HOA Information for The Arbors</h2>
          </div>
          <div className="hoa-grid">
            <div className="hoa-fees-col">
              <h3>Fees &amp; Management</h3>
              <div className="hoa-fee-row"><span>Monthly HOA Range</span><strong>$75–$200/mo</strong></div>
              <div className="hoa-fee-row"><span>Guard-Gated</span><strong>No</strong></div>
              <div className="hoa-fee-row"><span>Community Type</span><strong>Master-Planned · Family</strong></div>
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
            <h2>Schools Serving The Arbors</h2>
          </div>
          <div className="schools-v2-table">
            <div className="schools-v2-header">
              <span>School Name</span>
              <span>Grades</span>
              <span>Rating</span>
            </div>
            {[
              ['Helen Jydstrup Elementary', 'K–5', '7/10'],
              ['Jack & Terry Mannion Middle', '6–8', '7/10'],
              ['Palo Verde High School', '9–12', '8/10'],
              ['The Meadows School', 'PreK–12', 'A+'],
              ['Faith Lutheran Middle & High', '6–12', 'A'],
              ['Bishop Gorman High School', '9–12', 'A+'],
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
            <h2>What The Arbors Buyers Say</h2>
          </div>
          <div className="testimonials-grid">
            {[
              { quote: 'The Arbors was exactly right for us — established neighborhood, great schools, and a Summerlin address at a price that let us buy what we actually wanted. Nevada Real Estate Group helped us find a fully updated home with a pool and mature backyard.', name: 'Chris & Amanda N.', detail: 'Bought in The Arbors, Summerlin · 2024' },
              { quote: 'We\'ve lived in The Arbors for 18 years. When it came time to sell, the team priced it perfectly and had three offers in the first weekend. The mature trees and established character of the neighborhood are what buyers love about this village.', name: 'Tom & Nancy B.', detail: 'Sold in The Arbors, Summerlin · 2025' },
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

      <SummerlinTheArborsFAQ />

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
              { name: 'The Hills', href: '/summerlin-the-hills/', price: 'From $500K', compare: 'Adjacent Summerlin North village with guard-gated Mountain Trails enclave.' },
              { name: 'The Canyons', href: '/summerlin-the-canyons/', price: 'From $500K', compare: 'Summerlin North village with guard-gated enclaves and a broader price range.' },
              { name: 'Stonebridge', href: '/summerlin-stonebridge/', price: 'From $550K', compare: 'Summerlin\'s newest village. New construction with mountain views at slightly higher price points.' },
              { name: 'Sun City Summerlin', href: '/sun-city-summerlin/', price: 'From $300K', compare: 'Adjacent 55+ community with golf courses and extensive social programming.' },
              { name: 'The Trails', href: '/summerlin-the-trails/', price: 'From $500K', compare: 'Another established Summerlin North village with guard-gated Country Rose Estates.' },
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
              <h2>Ready to Find Your The Arbors Home?</h2>
              <p>Nevada Real Estate Group is the #1 real estate team in Nevada. Whether you&apos;re buying or selling in The Arbors, let&apos;s talk.</p>
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
                <input type="hidden" name="_subject" value="The Arbors Inquiry — LasVegasHomeSearchExperts.com" />
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
