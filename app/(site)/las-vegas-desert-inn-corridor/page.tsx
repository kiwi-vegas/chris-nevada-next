import LasVegasDesertInnCorridorFAQ from '@/components/LasVegasDesertInnCorridorFAQ'
import Link from 'next/link'
import type { Metadata } from 'next'
import LasVegasDesertInnCorridorMapWrapper from '@/components/LasVegasDesertInnCorridorMapWrapper'
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
    { '@type': 'ListItem', position: 3, name: 'Desert Inn Corridor', item: 'https://www.lasvegashomesearchexperts.com/las-vegas-desert-inn-corridor/' },
  ],
}

const FAQ_DATA = [
  {
    "q": "What is the price range along the Desert Inn Corridor?",
    "a": "Prices vary dramatically by location. Mid-corridor single-family homes start around $300,000, western sections near Summerlin range from $500K to $800K, and luxury condos near the Strip can exceed $1 million."
  },
  {
    "q": "What ZIP codes does the Desert Inn Corridor cover?",
    "a": "The corridor spans multiple ZIP codes including 89109, 89169, 89119, and 89146, stretching from eastern Summerlin through central Las Vegas to the Strip."
  },
  {
    "q": "Is the Desert Inn Corridor good for investment?",
    "a": "Yes. The corridor offers strong investment opportunities at multiple price points. Properties near the Strip benefit from short-term rental demand, while mid-corridor homes offer value-add renovation potential with central location appeal."
  },
  {
    "q": "What is the Wynn Golf Club?",
    "a": "The Wynn Golf Club occupies the former Desert Inn golf course, now a private course associated with the Wynn Resort. It provides a rare green corridor near the Strip and enhances property values in the surrounding area."
  },
  {
    "q": "How walkable is the Desert Inn Corridor?",
    "a": "Walkability varies by section. The eastern end near the Strip and Convention Center is highly walkable with transit options. Western sections are more car-dependent but benefit from extensive commercial corridors."
  },
  {
    "q": "What schools serve the Desert Inn Corridor?",
    "a": "Public schools along the corridor vary in rating. Top private options include Bishop Gorman High School (A+) and The Meadows School (A+). Charter schools like Coral Academy of Science (8/10) provide additional choices."
  },
  {
    "q": "Are there mid-century modern homes on the Desert Inn Corridor?",
    "a": "Yes. The Paradise Palms neighborhood near the corridor features some of the best preserved mid-century modern architecture in Las Vegas, attracting design enthusiasts and renovation buyers."
  },
  {
    "q": "How far is the Desert Inn Corridor from the airport?",
    "a": "The eastern end of the corridor is approximately 15 minutes from Harry Reid International Airport via I-15 South. Western sections are 20-25 minutes depending on traffic."
  },
  {
    "q": "What are the best sub-neighborhoods within Desert Inn Corridor?",
    "a": "The best sub-neighborhood depends on your priorities — school zones, lot size, home age, and proximity to amenities all vary within the community. Nevada Real Estate Group agents who specialize in Desert Inn Corridor can walk you through the specific blocks and streets that match your criteria."
  },
  {
    "q": "How is new construction availability in Desert Inn Corridor?",
    "a": "New construction availability varies by season and builder phase. Some sections of Desert Inn Corridor have active new home sales while others are fully built out with resale-only inventory. Contact Nevada Real Estate Group for the most current new construction options."
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
  name: 'Desert Inn Corridor',
  description: 'Desert Inn Corridor is a urban · mixed-use corridor community in Las Vegas, Nevada (ZIP 89109), established in 1950s, spanning ~8 sq mi. Home prices range from $300K–$1M+.',
  geo: { '@type': 'GeoCoordinates', latitude: 36.128, longitude: -115.175 },
  address: { '@type': 'PostalAddress', addressLocality: 'Las Vegas', addressRegion: 'NV', postalCode: '89109', addressCountry: 'US' },
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
  const cms = await getCommunityPage('las-vegas-desert-inn-corridor')
  return {
    title: cms?.metaTitle ?? 'Desert Inn Corridor Homes for Sale | Nevada Real Estate Group',
    description: cms?.metaDescription ?? 'Browse Desert Inn Corridor homes for sale in Las Vegas, NV. $300K–$1M+. Schools, HOA, market stats. Nevada Real Estate Group.',
    alternates: { canonical: 'https://www.lasvegashomesearchexperts.com/las-vegas-desert-inn-corridor' },
  }
}

export default async function LasVegasDesertInnCorridorPage() {
  const cms = await getCommunityPage('las-vegas-desert-inn-corridor')
  const market = getMarketStats('las-vegas-desert-inn-corridor')
  const ms = market?.stats

  const heroHeadline = cms?.heroHeadline ?? 'Desert Inn Corridor'
  const heroSubtitle = 'Homes for Sale in Las Vegas, Nevada'
  const overviewTitle = cms?.overviewTitle ?? 'Desert Inn Corridor: Urban · Mixed-Use Corridor Living in Las Vegas'

  const HARDCODED_STATS: Array<[string, string] | [string, string, string]> = [
    ['Established', '1950s'],
    ['Developer', 'Various'],
    ['Total Acreage', '~8 sq mi'],
    ['Homes', '12,000+'],
    ['Median Home Price', ms?.medianSalePrice ?? '$300K–$1M+'],
    ['ZIP Codes', '89109, 89169, 89119, 89146'],
    ['Guard-Gated', 'No'],
    ['HOA', '$0–$500/mo'],
  ]
  const displayStats = mergeQuickStats(HARDCODED_STATS, cms?.quickStats)
  const HARDCODED_DRIVE_TIMES = [
    {
        "time": "~5 min",
        "destination": "to the Strip",
        "route": "via Desert Inn Rd east"
    },
    {
        "time": "~15 min",
        "destination": "to Downtown Summerlin",
        "route": "via Desert Inn Rd west"
    },
    {
        "time": "~15 min",
        "destination": "to Harry Reid Airport",
        "route": "via I-15 South"
    },
    {
        "time": "~10 min",
        "destination": "to UNLV",
        "route": "via Maryland Pkwy"
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
          <span>Desert Inn Corridor</span>
        </div>
      </div>

      <header id="hero" className="summerlin-hero hero-v2">
        <img src="https://images.unsplash.com/photo-1581351721010-8cf859cb14a4?auto=format&fit=crop&w=1600&h=700&q=80" alt="Desert Inn Corridor community aerial view, Las Vegas Nevada" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
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
            <a href="#listings" className="hero-v2-cta">Search Homes in Desert Inn Corridor</a>
          </div>
        </div>
      </header>

      <div className="hero-v2-qfb">
        <div className="container">
          <div className="hero-v2-qfb-row">
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <span><strong>ZIP:</strong> 89109, 89169, 89119, 89146</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              <span><strong>Type:</strong> Urban · Mixed-Use Corridor</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
              <span><strong>Price Range:</strong> $300K–$1M+</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
              <span><strong>HOA:</strong> $0–$500/mo</span>
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
            <h2>Desert Inn Corridor Demographics</h2>
          </div>
          <div className="demo-grid">
            {[
              ['45,000+', 'Population'],
              ['40', 'Median Age'],
              ['$55,000', 'Avg Household Income'],
              ['18,000+', 'Total Households'],
              ['42%', 'Homeownership Rate'],
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
            <h2>Where is Desert Inn Corridor?</h2>
            <p>Las Vegas, Nevada &mdash; Las Vegas, Nevada.</p>
          </div>
          <div className="map-container">
            <LasVegasDesertInnCorridorMapWrapper />
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
            <h2 className="listings-title">NEW DESERT INN CORRIDOR LISTINGS</h2>
          </div>
          <div className="ylopo-wrap">
            <div className="YLOPO_searchWidget" />
            <div className="YLOPO_resultsWidget" data-search='{"propertyTypes":["house","condo","townhouse"],"minPrice":250000,"locations":[{"city":"Las Vegas","state":"NV"}],"limit":12,"sortBy":"listDate","sortOrder":"desc","keywords":"Desert Inn","zipCodes":["89109","89169","89119","89146"]}' />
          </div>
          <p className="ylopo-note">Listing data sourced from regional MLS. Information deemed reliable but not guaranteed. Updated daily.</p>
          <div className="listings-actions">
            <a href="https://search.nevadarealestategroup.net/search?s[orderBy]=sourceCreationDate%2Cdesc&s[page]=1&s[locations][0][city]=Las%20Vegas&s[locations][0][state]=NV&s[keywords]=Desert%20Inn" target="_blank" rel="noopener noreferrer" className="btn-gold">View All Desert Inn Corridor Listings &rarr;</a>
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
                  <p>Desert Inn Corridor is a urban · mixed-use corridor community in Las Vegas, Nevada (ZIP 89109/89169), established in 1950s, spanning ~8 sq mi, with 12,000+ homes. The Desert Inn Corridor is one of the most dynamic and diverse residential corridors in the Las Vegas Valley, stretching along Desert Inn Road from the eastern edge of Summerlin through the heart of the city to the areas east of the Strip. This east-west arterial connects some of the valley's most iconic neighborhoods, from the legacy estates of the Las Vegas Country Club and Scotch 80s to the mid-century modern pockets near the Convention Center and the growing condo market near the Strip.</p>
                  <p>The corridor's western end intersects with some of the most desirable addresses in Las Vegas, including sections of Spring Valley, Peccole Ranch, and the transition zone into Summerlin. Moving east, the corridor passes through established single-family neighborhoods built in the 1960s through 1990s, many of which offer mature landscaping, larger lots, and architectural character that newer tract developments cannot replicate. The eastern section near the Strip features high-rise condos, resort-adjacent residences, and walkable urban living.</p>
                  <p>Pricing along the Desert Inn Corridor varies dramatically by location. Western sections near Summerlin command $500K to $800K for single-family homes, while mid-corridor neighborhoods offer strong value in the $300K to $500K range. East of I-15 near the Strip, luxury condos and high-rise units range from $400K to well over $1 million. This diversity makes the corridor appealing to a wide spectrum of buyers, from first-timers to luxury investors.</p>
                  <p>The corridor's commercial infrastructure is exceptional. Desert Inn Road provides direct access to major shopping centers, medical facilities, the Las Vegas Convention Center, and the Strip itself. The Las Vegas Country Club, the Desert Inn golf course site (now Wynn Golf Club), and several parks line the route, providing green space and recreation in an otherwise urban environment.</p>
                </>
              )}
            </div>
            <div className="overview-aside">
              <div className="quick-facts">
                <h3>Desert Inn Corridor At a Glance</h3>
                {displayStats.map(([label, value, cls]: any) => (
                  <div className="fact-row" key={label}>
                    <span className="fact-label">{label}</span>
                    <span className={`fact-value${cls ? ' ' + cls : ''}`}>{value}</span>
                  </div>
                ))}
              </div>
              <div className="cta-card">
                <p>Ready to explore Desert Inn Corridor? Schedule a private tour of the community and the current listings that match your goals.</p>
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
            <h2>Top 7 Facts About Desert Inn Corridor</h2>
          </div>
          <ol className="top-facts-list">
            <li key={0}>Desert Inn Corridor spans ~8 sq mi in Las Vegas, Nevada (ZIP 89109, 89169).</li>
            <li key={1}>Desert Inn Corridor was established in 1950s.</li>
            <li key={2}>Desert Inn Corridor contains 12,000+ homes with prices ranging from $300K–$1M+.</li>
            <li key={3}>Desert Inn Corridor is a urban · mixed-use corridor community.</li>
            <li key={4}>HOA fees in Desert Inn Corridor range from $0–$500/mo per month.</li>
            <li key={5}>Top-rated schools serving Desert Inn Corridor include Lois Craig Elementary (5/10) and Roy Martin Middle School (5/10).</li>
            <li key={6}>Desert Inn Corridor is located ~5 min to the Strip via Desert Inn Rd east.</li>
          </ol>
        </div>
      </section>

      <section id="highlights">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Why Desert Inn Corridor</span>
            <h2>What Makes Desert Inn Corridor Stand Out</h2>
          </div>
          <div className="highlights-grid">
            {[
              { title: 'East-West Connectivity', body: 'Desert Inn Road provides one of the most efficient east-west corridors in the valley, connecting Summerlin to the Strip with minimal traffic signals and direct freeway access.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><line x1="8" y1="6" x2="8" y2="6.01"/><line x1="12" y1="6" x2="12" y2="6.01"/><line x1="16" y1="6" x2="16" y2="6.01"/><line x1="8" y1="10" x2="8" y2="10.01"/><line x1="12" y1="10" x2="12" y2="10.01"/><line x1="16" y1="10" x2="16" y2="10.01"/><line x1="8" y1="14" x2="8" y2="14.01"/><line x1="12" y1="14" x2="12" y2="14.01"/><line x1="16" y1="14" x2="16" y2="14.01"/></svg> },
              { title: 'Diverse Housing Options', body: 'From $300K single-family homes to $1M+ luxury condos, the Desert Inn Corridor offers housing at every price point and style — single-family, townhome, condo, and high-rise.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
              { title: 'Legacy Neighborhoods', body: 'Adjacent to iconic Las Vegas neighborhoods including the Scotch 80s, Las Vegas Country Club, and Rancho Circle — some of the most storied addresses in Nevada.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M8 21l4-11 4 11"/><path d="M2 21l5-14 4 8"/><path d="M14 15l4-8 4 14"/><line x1="2" y1="21" x2="22" y2="21"/></svg> },
              { title: 'Strip Proximity', body: 'The eastern end of the corridor is minutes from the Las Vegas Strip, Convention Center, and major entertainment venues. Ideal for hospitality professionals and investors.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22c4-4 8-7.5 8-12a8 8 0 10-16 0c0 4.5 4 8 8 12z"/><circle cx="12" cy="10" r="3"/></svg> },
              { title: 'Wynn Golf Club', body: 'The former Desert Inn golf course, now the Wynn Golf Club, provides a rare green corridor near the Strip and adds premium value to adjacent residential properties.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 2v10l7 4"/></svg> },
              { title: 'Value Opportunity', body: 'Mid-corridor neighborhoods offer some of the best value in central Las Vegas — established homes at below-market prices with exceptional location and appreciation potential.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg> },
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
            <h2>Parks &amp; Recreation Near Desert Inn Corridor</h2>
          </div>
          <div className="parks-grid">
            {[
              { name: 'Desert Inn Park', address: '3570 Vista Del Monte Ave, Las Vegas, NV 89121', acreage: '~5 acres', amenities: ["Sports fields","Playground","Picnic areas","Walking paths"] },
              { name: 'Paul Meyer Park', address: '4525 New Forest Dr, Las Vegas, NV 89147', acreage: '~12 acres', amenities: ["Ball fields","Soccer fields","Playground","Walking trails","Picnic shelters"] },
              { name: 'Jaycee Park', address: '3035 E St Louis Ave, Las Vegas, NV 89104', acreage: '~8 acres', amenities: ["Tennis courts","Basketball courts","Playground","Community pool"] },
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
            <h2>The Desert Inn Corridor Lifestyle</h2>
          </div>
          <div className="lifestyle-v2-grid">
            <div className="lifestyle-v2-item">
              <div className="lifestyle-v2-icon"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg></div>
              <div className="lifestyle-v2-stat">~5 min</div>
              <div className="lifestyle-v2-label">to the Strip</div>
            </div>
            <div className="lifestyle-v2-item">
              <div className="lifestyle-v2-icon"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22c4-4 8-7.5 8-12a8 8 0 10-16 0c0 4.5 4 8 8 12z"/><circle cx="12" cy="10" r="3"/></svg></div>
              <div className="lifestyle-v2-stat">3+</div>
              <div className="lifestyle-v2-label">Nearby Parks</div>
            </div>
            <div className="lifestyle-v2-item">
              <div className="lifestyle-v2-icon"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg></div>
              <div className="lifestyle-v2-stat">12,000+</div>
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
            <h2>HOA Information for Desert Inn Corridor</h2>
          </div>
          <div className="hoa-grid">
            <div className="hoa-fees-col">
              <h3>Fees &amp; Management</h3>
              <div className="hoa-fee-row"><span>Monthly HOA Range</span><strong>$0–$500/mo</strong></div>
              <div className="hoa-fee-row"><span>Guard-Gated</span><strong>No</strong></div>
              <div className="hoa-fee-row"><span>Community Type</span><strong>Urban · Mixed-Use Corridor</strong></div>
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
            <h2>Schools Serving Desert Inn Corridor</h2>
          </div>
          <div className="schools-v2-table">
            <div className="schools-v2-header">
              <span>School Name</span>
              <span>Grades</span>
              <span>Rating</span>
            </div>
            {[
              ['Lois Craig Elementary', 'K–5', '5/10'],
              ['Roy Martin Middle School', '6–8', '5/10'],
              ['Valley High School', '9–12', '4/10'],
              ['Bishop Gorman High School', '9–12', 'A+'],
              ['The Meadows School', 'PreK–12', 'A+'],
              ['Coral Academy of Science', 'K–12', '8/10'],
              ['SLAM Academy', '6–12', '7/10'],
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
            <h2>What Desert Inn Corridor Buyers Say</h2>
          </div>
          <div className="testimonials-grid">
            {[
              { quote: 'Nevada Real Estate Group found us a mid-century gem on the Desert Inn Corridor that we completely renovated. Their knowledge of which blocks offer the best value and appreciation potential was spot-on.', name: 'Marcus & Sarah J.', detail: 'Bought on Desert Inn Corridor · 2024' },
              { quote: 'We invested in a condo near the Convention Center and Nevada Real Estate Group handled everything from purchase to rental setup. The location drives consistent income year-round.', name: 'Kevin R.', detail: 'Invested on Desert Inn Corridor · 2025' },
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

      <LasVegasDesertInnCorridorFAQ />

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
              { name: 'Las Vegas Country Club', href: '/las-vegas-country-club/', price: 'From $500K', compare: 'Historic country club community with golf course homes and legacy Las Vegas prestige.' },
              { name: 'Scotch 80s', href: '/scotch-80s/', price: 'From $800K', compare: 'Iconic Las Vegas legacy neighborhood with ranch estates and celebrity history.' },
              { name: 'Spring Valley', href: '/spring-valley/', price: 'From $300K', compare: 'Large established community to the west with diverse housing and central location.' },
              { name: 'Paradise', href: '/paradise/', price: 'From $250K', compare: 'Unincorporated area adjacent to the Strip with diverse housing and strong rental demand.' },
              { name: 'Peccole Ranch', href: '/peccole-ranch/', price: 'From $450K', compare: 'Established family community near the western end of the corridor with mature landscaping.' },
              { name: 'Downtown Las Vegas', href: '/downtown-las-vegas/', price: 'From $200K', compare: 'The urban core with Arts District, Fremont Street, and growing residential development.' },
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
              <h2>Ready to Find Your Desert Inn Corridor Home?</h2>
              <p>Nevada Real Estate Group is the #1 real estate team in Nevada. Whether you&apos;re buying or selling in Desert Inn Corridor, let&apos;s talk.</p>
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
                <input type="hidden" name="_subject" value="Desert Inn Corridor Inquiry — LasVegasHomeSearchExperts.com" />
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
