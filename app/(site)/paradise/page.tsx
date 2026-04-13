import ParadiseFAQ from '@/components/ParadiseFAQ'
import Link from 'next/link'
import type { Metadata } from 'next'
import ParadiseMapWrapper from '@/components/ParadiseMapWrapper'
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
    { '@type': 'ListItem', position: 2, name: 'Communities', item: 'https://www.lasvegashomesearchexperts.com/#communities' },
    { '@type': 'ListItem', position: 3, name: 'Paradise', item: 'https://www.lasvegashomesearchexperts.com/paradise/' },
  ],
}

const FAQ_DATA = [
  {
    "q": "What is Paradise, Las Vegas?",
    "a": "Paradise is the largest unincorporated town in Clark County, covering approximately 46 square miles. It encompasses the Las Vegas Strip, UNLV, Harry Reid Airport, and Allegiant Stadium. Most of what visitors call 'Las Vegas' is technically within Paradise."
  },
  {
    "q": "What is the price range for homes in Paradise?",
    "a": "Paradise offers the widest price range of any Las Vegas community: from approximately $250,000 for modest single-family homes on the east side to over $2 million for luxury high-rise penthouses along the Strip corridor."
  },
  {
    "q": "Is Paradise a good area for real estate investment?",
    "a": "Paradise is one of the strongest investment markets in the valley. Proximity to the Strip, UNLV, the airport, and the convention center creates consistent rental demand. Short-term vacation rentals, student housing, and corporate rentals all perform well in various Paradise sub-markets."
  },
  {
    "q": "What ZIP codes are in Paradise?",
    "a": "Paradise includes ZIP codes 89109, 89119, 89120, 89121, and 89169, among others. The area is geographically large and spans many postal zones."
  },
  {
    "q": "What high-rise condos are in Paradise?",
    "a": "Major high-rises in Paradise include Turnberry Place (4 towers), Turnberry Towers (twin towers), Panorama Towers (twin towers), Park Towers, The Martin, Veer Towers, Sky Las Vegas, and Waldorf Astoria Las Vegas. Prices range from $300K to $10M+."
  },
  {
    "q": "Is Paradise safe?",
    "a": "Safety in Paradise varies significantly by neighborhood. The gated high-rise developments and western sections near the Strip are well-secured. Eastern neighborhoods vary. As with any large urban area, research specific blocks and subdivisions before buying."
  },
  {
    "q": "What is Paradise Palms?",
    "a": "Paradise Palms is one of Las Vegas' most architecturally significant vintage neighborhoods. Built in the 1960s with Palm Springs-inspired mid-century modern design, it has become highly sought after by design-conscious buyers. Homes range from $500K to $1.5M."
  },
  {
    "q": "How close is Paradise to the airport?",
    "a": "Paradise contains Harry Reid International Airport within its boundaries. Depending on the neighborhood, residents can be at the airport terminal in 5–15 minutes — the shortest airport commute of any community in the valley."
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
  name: 'Paradise',
  description: 'Paradise is a unincorporated · urban/suburban community in Las Vegas, Nevada.',
  geo: { '@type': 'GeoCoordinates', latitude: 36.097, longitude: -115.136 },
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
  const cms = await getCommunityPage('paradise')
  return {
    title: cms?.metaTitle ?? 'Paradise Homes for Sale | Nevada Real Estate Group',
    description: cms?.metaDescription ?? 'Browse Paradise homes for sale in Las Vegas, NV. $250K–$2M+. Schools, HOA, market stats. Nevada Real Estate Group.',
  }
}

export default async function ParadisePage() {
  const cms = await getCommunityPage('paradise')
  const market = getMarketStats('paradise')
  const ms = market?.stats

  const heroHeadline = cms?.heroHeadline ?? 'Paradise'
  const heroSubtitle = 'Homes for Sale in Las Vegas, Nevada'
  const overviewTitle = cms?.overviewTitle ?? 'Paradise: Unincorporated · Urban/Suburban Living in Las Vegas'

  const HARDCODED_STATS: Array<[string, string] | [string, string, string]> = [
    ['Established', '1950'],
    ['Developer', 'Various'],
    ['Total Acreage', '~46 sq mi'],
    ['Homes', '80,000+'],
    ['Median Home Price', ms?.medianSalePrice ?? '$250K–$2M+'],
    ['ZIP Codes', '89109, 89119, 89120, 89121, 89169'],
    ['Guard-Gated', 'No'],
    ['HOA', '$50–$500/mo'],
  ]
  const displayStats = mergeQuickStats(HARDCODED_STATS, cms?.quickStats)
  const HARDCODED_DRIVE_TIMES = [
    {
        "time": "~5 min",
        "destination": "to the Strip",
        "route": "via Las Vegas Blvd"
    },
    {
        "time": "~10 min",
        "destination": "to Harry Reid Airport",
        "route": "via Paradise Rd"
    },
    {
        "time": "~15 min",
        "destination": "to Henderson",
        "route": "via I-215 East"
    },
    {
        "time": "~20 min",
        "destination": "to Summerlin",
        "route": "via I-15 → Summerlin Pkwy"
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
          <a href="/#communities">Communities</a>
          <span className="breadcrumb-sep">&rsaquo;</span>
          <span>Paradise</span>
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
                <span className="hero-v2-stat-num">{ms?.medianSalePrice ?? qs('Median Home Price', '$250K–$2M+')}</span>
                <span className="hero-v2-stat-lbl">Median Sale Price</span>
              </div>
              <div className="hero-v2-stat">
                <span className="hero-v2-stat-num">{ms?.avgDaysToClose ?? qs('Avg Days on Market', '45')}</span>
                <span className="hero-v2-stat-lbl">Avg Days to Close</span>
              </div>
            </div>
            <a href="#listings" className="hero-v2-cta">Search Homes in Paradise</a>
          </div>
        </div>
      </header>

      <div className="hero-v2-qfb">
        <div className="container">
          <div className="hero-v2-qfb-row">
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <span><strong>ZIP:</strong> 89109, 89119, 89120, 89121, 89169</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              <span><strong>Type:</strong> Unincorporated · Urban/Suburban</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
              <span><strong>Price Range:</strong> $250K–$2M+</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
              <span><strong>HOA:</strong> $50–$500/mo</span>
            </div>
          </div>
          <div className="hero-v2-qfb-est">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            <span>Est. 1950</span>
          </div>
        </div>
      </div>

      <section id="demographics" className="demographics-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Demographics</span>
            <h2>Paradise Demographics</h2>
          </div>
          <div className="demo-grid">
            {[
              ['230,000+', 'Population'],
              ['36', 'Median Age'],
              ['$50,000', 'Avg Household Income'],
              ['80,000+', 'Total Households'],
              ['38%', 'Homeownership Rate'],
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
            <h2>Where is Paradise?</h2>
            <p>Las Vegas, Nevada &mdash; Las Vegas, Nevada.</p>
          </div>
          <div className="map-container">
            <ParadiseMapWrapper />
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
            <h2 className="listings-title">NEW PARADISE LISTINGS</h2>
          </div>
          <div className="ylopo-wrap">
            <div className="YLOPO_searchWidget" />
            <div className="YLOPO_resultsWidget" data-search='{"propertyTypes":["house","condo","townhouse"],"minPrice":null,"locations":[{"city":"Las Vegas","state":"NV"}],"limit":12,"sortBy":"listDate","sortOrder":"desc","keywords":"Paradise","zipCodes":["89109","89119","89120","89121","89169"]}' />
          </div>
          <p className="ylopo-note">Listing data sourced from regional MLS. Information deemed reliable but not guaranteed. Updated daily.</p>
          <div className="listings-actions">
            <a href="https://search.nevadarealestategroup.net/search?s[orderBy]=sourceCreationDate%2Cdesc&s[page]=1&s[locations][0][city]=Las%20Vegas&s[locations][0][state]=NV&s[keywords]=Paradise" target="_blank" rel="noopener noreferrer" className="btn-gold">View All Paradise Listings &rarr;</a>
            <Link href="/#communities" className="btn-outline">&larr; Back to All Communities</Link>
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
                  <p>Paradise is the largest unincorporated town in Clark County and arguably the most diverse residential area in the Las Vegas Valley. Covering approximately 46 square miles, Paradise encompasses the Las Vegas Strip, the UNLV campus, Harry Reid International Airport, and a wide array of residential neighborhoods ranging from modest starter homes to multi-million-dollar high-rise condos. Despite its name being less recognized than Las Vegas itself, Paradise is technically where most of the Strip's famous resorts, the convention center, and the Allegiant Stadium are located.</p>
                  <p>The residential appeal of Paradise lies in its extraordinary variety. East of the Strip, neighborhoods like Sunrise Manor and Whitney border Paradise with affordable single-family homes starting around $250,000. Central Paradise near UNLV offers a mix of condos, townhomes, and single-family homes popular with students, professionals, and investors. The Tropicana and Flamingo corridors feature mid-century neighborhoods with renovation potential, while the high-rise condos at Turnberry Place, Turnberry Towers, Panorama Towers, and Park Towers offer luxury living with Strip views.</p>
                  <p>Paradise is home to the University of Nevada, Las Vegas, one of the valley's largest employers and a driver of consistent rental demand. The Thomas & Mack Center, Sam Boyd Stadium, and Allegiant Stadium bring major sporting and entertainment events year-round. The commercial infrastructure is among the most extensive in the valley, with virtually every major retailer, restaurant chain, and service provider represented within the community's boundaries.</p>
                  <p>For real estate investors, Paradise offers one of the strongest rental markets in the Las Vegas metro. Proximity to the Strip, UNLV, the airport, and the convention center creates consistent demand from short-term vacation renters, long-term tenants, and corporate relocations. The area's diversity means investors can find properties at nearly any price point, from studio condos to luxury penthouses, each with a different return profile.</p>
                </>
              )}
            </div>
            <div className="overview-aside">
              <div className="quick-facts">
                <h3>Paradise At a Glance</h3>
                {displayStats.map(([label, value, cls]: any) => (
                  <div className="fact-row" key={label}>
                    <span className="fact-label">{label}</span>
                    <span className={`fact-value${cls ? ' ' + cls : ''}`}>{value}</span>
                  </div>
                ))}
              </div>
              <div className="cta-card">
                <p>Ready to explore Paradise? Schedule a private tour of the community and the current listings that match your goals.</p>
                <a href="tel:+17252399950" className="btn-gold">Call 725.239.9950</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="highlights">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Why Paradise</span>
            <h2>What Makes Paradise Stand Out</h2>
          </div>
          <div className="highlights-grid">
            {[
              { title: 'Strip & High-Rise Living', body: 'Home to the Las Vegas Strip and luxury high-rises like Turnberry Place, Panorama Towers, and Park Towers. Penthouse living with world-class views and walkable entertainment.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><line x1="8" y1="6" x2="8" y2="6.01"/><line x1="12" y1="6" x2="12" y2="6.01"/><line x1="16" y1="6" x2="16" y2="6.01"/><line x1="8" y1="10" x2="8" y2="10.01"/><line x1="12" y1="10" x2="12" y2="10.01"/><line x1="16" y1="10" x2="16" y2="10.01"/><line x1="8" y1="14" x2="8" y2="14.01"/><line x1="12" y1="14" x2="12" y2="14.01"/><line x1="16" y1="14" x2="16" y2="14.01"/></svg> },
              { title: 'UNLV Campus Community', body: 'The University of Nevada, Las Vegas brings 30,000+ students and consistent rental demand. The campus area is a major employer and cultural anchor for the community.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
              { title: 'Harry Reid Airport Access', body: 'Paradise is home to Harry Reid International Airport, providing residents with the shortest commute to air travel in the entire Las Vegas Valley.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
              { title: 'Extraordinary Variety', body: 'From $250K starter homes to $2M+ high-rise penthouses, Paradise offers the widest range of housing types and price points of any community in the valley.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M8 21l4-11 4 11"/><path d="M2 21l5-14 4 8"/><path d="M14 15l4-8 4 14"/><line x1="2" y1="21" x2="22" y2="21"/></svg> },
              { title: 'Entertainment Capital', body: 'Allegiant Stadium, T-Mobile Arena, Thomas & Mack Center, and the entire Strip entertainment corridor are within Paradise. Unmatched live entertainment access.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22c4-4 8-7.5 8-12a8 8 0 10-16 0c0 4.5 4 8 8 12z"/><circle cx="12" cy="10" r="3"/></svg> },
              { title: 'Investor Magnet', body: 'Consistently one of the strongest rental markets in the valley. Short-term, mid-term, and long-term rental demand driven by tourism, UNLV, and the airport.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg> },
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

      <ParadiseFAQ />

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
              { name: 'Downtown Las Vegas', href: '/downtown-las-vegas/', price: 'From $200K', compare: 'The original urban core with Arts District, Fremont East, and historic neighborhoods.' },
              { name: 'Spring Valley', href: '/spring-valley/', price: 'From $300K', compare: 'Established suburban community to the west with mature neighborhoods and strong commercial.' },
              { name: 'Henderson', href: '/henderson/', price: 'From $350K', compare: 'Incorporated city to the southeast. Master-planned communities, top schools, and safety rankings.' },
              { name: 'Enterprise', href: '/enterprise/', price: 'From $350K', compare: 'Growing southwest area with newer construction and master-planned communities.' },
              { name: 'Summerlin', href: '/summerlin/', price: 'From $450K', compare: 'Premier master-planned community 20 minutes west. Suburban luxury alternative to urban Paradise living.' },
              { name: 'Seven Hills', href: '/seven-hills/', price: 'From $500K', compare: 'Guard-gated Henderson community with golf, Strip views, and family-oriented living.' },
            ].map((n: any) => (
              <Link href={n.href} key={n.name} className="nearby-v2-row">
                <span className="nearby-v2-name">{n.name}</span>
                <span className="nearby-v2-price">{n.price}</span>
                <span className="nearby-v2-compare">{n.compare}</span>
                <span className="nearby-v2-arrow">&rarr;</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="cta" className="cta-v2">
        <div className="container">
          <div className="cta-v2-inner">
            <div className="cta-v2-content">
              <h2>Ready to Find Your Paradise Home?</h2>
              <p>Nevada Real Estate Group is the #1 real estate team in Nevada. Whether you&apos;re buying or selling in Paradise, let&apos;s talk.</p>
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
                <input type="hidden" name="_subject" value="Paradise Inquiry — LasVegasHomeSearchExperts.com" />
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
