import LakeLasVegasSouthShoreFAQ from '@/components/LakeLasVegasSouthShoreFAQ'
import Link from 'next/link'
import type { Metadata } from 'next'
import LakeLasVegasSouthShoreMapWrapper from '@/components/LakeLasVegasSouthShoreMapWrapper'
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
    { '@type': 'ListItem', position: 3, name: 'South Shore', item: 'https://www.lasvegashomesearchexperts.com/lake-las-vegas-south-shore/' },
  ],
}

const FAQ_DATA = [
  {
    "q": "What is the price range for homes at South Shore Lake Las Vegas?",
    "a": "Homes at South Shore range from approximately $800,000 for Mediterranean villas to over $5 million for waterfront custom estates with private docks and direct lake access."
  },
  {
    "q": "Is South Shore guard-gated?",
    "a": "Yes. South Shore is the guard-gated luxury section of Lake Las Vegas with 24-hour staffed gate and comprehensive security. It is the most exclusive residential enclave within the Lake Las Vegas resort community."
  },
  {
    "q": "What golf course is at South Shore?",
    "a": "SouthShore Golf Club features a Jack Nicklaus-designed 18-hole championship course that wraps along the lake's southern shoreline. The club offers fine dining, spa, fitness, pool, and tennis amenities."
  },
  {
    "q": "Can you boat on Lake Las Vegas?",
    "a": "Yes. Lake Las Vegas is a 320-acre private lake open to residents and resort guests for kayaking, paddleboarding, sailing, and electric boat use. No motorized watercraft beyond electric boats are permitted."
  },
  {
    "q": "What ZIP code is South Shore in?",
    "a": "South Shore is in ZIP code 89011 in Henderson, Nevada, within the Lake Las Vegas resort community."
  },
  {
    "q": "What are HOA fees at South Shore?",
    "a": "HOA fees at South Shore typically range from $400 to $1,000 per month, covering the guard gate, security patrols, Lake Las Vegas master association, and sub-association fees. Golf club membership is separate."
  },
  {
    "q": "Is South Shore a good full-time residence?",
    "a": "Absolutely. While South Shore has a resort feel, it is fully functional for year-round living. The Strip, airport, and Henderson's commercial corridor are all within 30 minutes. Many residents live at South Shore full-time."
  },
  {
    "q": "How far is South Shore from Lake Mead?",
    "a": "Lake Mead National Recreation Area is approximately 15 minutes east of South Shore. Residents enjoy easy access to boating, fishing, hiking, and scenic drives at one of America's largest reservoirs."
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
  name: 'South Shore',
  description: 'South Shore is a guard-gated · luxury resort community in Henderson, Nevada.',
  geo: { '@type': 'GeoCoordinates', latitude: 36.082, longitude: -114.935 },
  address: { '@type': 'PostalAddress', addressLocality: 'Henderson', addressRegion: 'NV', postalCode: '89011', addressCountry: 'US' },
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
  const cms = await getCommunityPage('lake-las-vegas-south-shore')
  return {
    title: cms?.metaTitle ?? 'South Shore Homes for Sale | Nevada Real Estate Group',
    description: cms?.metaDescription ?? 'Browse South Shore homes for sale in Henderson, NV. $800K–$5M+. Schools, HOA, market stats. Nevada Real Estate Group.',
  }
}

export default async function LakeLasVegasSouthShorePage() {
  const cms = await getCommunityPage('lake-las-vegas-south-shore')
  const market = getMarketStats('lake-las-vegas-south-shore')
  const ms = market?.stats

  const heroHeadline = cms?.heroHeadline ?? 'South Shore'
  const heroSubtitle = 'Homes for Sale in Henderson, Nevada'
  const overviewTitle = cms?.overviewTitle ?? 'South Shore: Guard-Gated · Luxury Resort Living in Henderson'

  const HARDCODED_STATS: Array<[string, string] | [string, string, string]> = [
    ['Established', '2003'],
    ['Developer', 'Lake Las Vegas Resort'],
    ['Total Acreage', '~350 acres'],
    ['Homes', '~400'],
    ['Median Home Price', ms?.medianSalePrice ?? '$800K–$5M+'],
    ['ZIP Codes', '89011'],
    ['Guard-Gated', 'Yes'],
    ['HOA', '$400–$1,000/mo'],
  ]
  const displayStats = mergeQuickStats(HARDCODED_STATS, cms?.quickStats)
  const HARDCODED_DRIVE_TIMES = [
    {
        "time": "~30 min",
        "destination": "to the Strip",
        "route": "via Lake Mead Pkwy → I-215 → I-15"
    },
    {
        "time": "~30 min",
        "destination": "to Harry Reid Airport",
        "route": "via Lake Mead Pkwy → I-215"
    },
    {
        "time": "~15 min",
        "destination": "to Lake Mead Marina",
        "route": "via Lake Mead Dr East"
    },
    {
        "time": "~20 min",
        "destination": "to Henderson City Center",
        "route": "via Lake Mead Pkwy West"
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
          <span>South Shore</span>
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
                <span className="hero-v2-stat-num">{ms?.medianSalePrice ?? qs('Median Home Price', '$800K–$5M+')}</span>
                <span className="hero-v2-stat-lbl">Median Sale Price</span>
              </div>
              <div className="hero-v2-stat">
                <span className="hero-v2-stat-num">{ms?.avgDaysToClose ?? qs('Avg Days on Market', '45')}</span>
                <span className="hero-v2-stat-lbl">Avg Days to Close</span>
              </div>
            </div>
            <a href="#listings" className="hero-v2-cta">Search Homes in South Shore</a>
          </div>
        </div>
      </header>

      <div className="hero-v2-qfb">
        <div className="container">
          <div className="hero-v2-qfb-row">
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <span><strong>ZIP:</strong> 89011</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              <span><strong>Type:</strong> Guard-Gated · Luxury Resort</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
              <span><strong>Price Range:</strong> $800K–$5M+</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
              <span><strong>HOA:</strong> $400–$1,000/mo</span>
            </div>
          </div>
          <div className="hero-v2-qfb-est">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            <span>Est. 2003</span>
          </div>
        </div>
      </div>

      <section id="demographics" className="demographics-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Demographics</span>
            <h2>South Shore Demographics</h2>
          </div>
          <div className="demo-grid">
            {[
              ['~1,000', 'Population'],
              ['55', 'Median Age'],
              ['$250,000+', 'Avg Household Income'],
              ['~400', 'Total Households'],
              ['85%', 'Homeownership Rate'],
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
            <h2>Where is South Shore?</h2>
            <p>Lake Las Vegas, Henderson &mdash; Henderson, Nevada.</p>
          </div>
          <div className="map-container">
            <LakeLasVegasSouthShoreMapWrapper />
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
            <h2 className="listings-title">NEW SOUTH SHORE LISTINGS</h2>
          </div>
          <div className="ylopo-wrap">
            <div className="YLOPO_searchWidget" />
            <div className="YLOPO_resultsWidget" data-search='{"propertyTypes":["house","condo","townhouse"],"minPrice":800000,"locations":[{"city":"Henderson","state":"NV"}],"limit":12,"sortBy":"listDate","sortOrder":"desc","keywords":"South Shore Lake Las Vegas","zipCodes":["89011"]}' />
          </div>
          <p className="ylopo-note">Listing data sourced from regional MLS. Information deemed reliable but not guaranteed. Updated daily.</p>
          <div className="listings-actions">
            <a href="https://search.nevadarealestategroup.net/search?s[orderBy]=sourceCreationDate%2Cdesc&s[page]=1&s[locations][0][city]=Henderson&s[locations][0][state]=NV&s[keywords]=South%20Shore%20Lake%20Las%20Vegas" target="_blank" rel="noopener noreferrer" className="btn-gold">View All South Shore Listings &rarr;</a>
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
                  <p>South Shore at Lake Las Vegas is the premier guard-gated luxury enclave within the Lake Las Vegas resort community in Henderson. Occupying the southern bank of the 320-acre private lake, South Shore offers waterfront estates, custom hilltop homes, and Mediterranean-inspired villas with direct lake, mountain, and golf course views — a lifestyle experience unlike anything else in the Las Vegas Valley.</p>
                  <p>Behind South Shore's 24-hour staffed guard gate, approximately 400 homes range from lakefront villas starting around $800,000 to waterfront custom estates exceeding $5 million. Architectural standards favor Mediterranean, Tuscan, and Italian-inspired design — consistent with the Lake Las Vegas vision of a European-style resort village transplanted to the Nevada desert. Many homes feature private docks, infinity pools, outdoor living pavilions, and direct water access.</p>
                  <p>The SouthShore Golf Club, a Jack Nicklaus-designed championship course, is the community's anchor amenity. The course wraps along the lake's southern shoreline with dramatic water and mountain views on virtually every hole. Club amenities include fine dining, a resort-style pool, fitness center, spa, tennis courts, and social event spaces. Golf and social memberships are available to residents.</p>
                  <p>South Shore residents enjoy the full Lake Las Vegas lifestyle: kayaking and paddleboarding on the lake, lakefront dining at the Village, the Westin and Hilton resort properties, and proximity to Lake Mead National Recreation Area. Despite its resort-like setting, South Shore is only 25-30 minutes from the Strip, Harry Reid Airport, and Henderson's commercial corridor — making it viable for full-time luxury living, not just a vacation retreat.</p>
                </>
              )}
            </div>
            <div className="overview-aside">
              <div className="quick-facts">
                <h3>South Shore At a Glance</h3>
                {displayStats.map(([label, value, cls]: any) => (
                  <div className="fact-row" key={label}>
                    <span className="fact-label">{label}</span>
                    <span className={`fact-value${cls ? ' ' + cls : ''}`}>{value}</span>
                  </div>
                ))}
              </div>
              <div className="cta-card">
                <p>Ready to explore South Shore? Schedule a private tour of the community and the current listings that match your goals.</p>
                <a href="tel:+17252399950" className="btn-gold">Call 725.239.9950</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="highlights">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Why South Shore</span>
            <h2>What Makes South Shore Stand Out</h2>
          </div>
          <div className="highlights-grid">
            {[
              { title: 'SouthShore Golf Club', body: 'Jack Nicklaus-designed 18-hole championship course wrapping along the lake\'s southern shoreline. Dramatic water and mountain views on every hole. Full club amenities including dining and spa.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 2v10l7 4"/></svg> },
              { title: 'Guard-Gated Lakefront', body: '24-hour staffed guard gate protects the most exclusive section of Lake Las Vegas. Waterfront homes with private docks and direct lake access.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
              { title: '320-Acre Private Lake', body: 'Lake Las Vegas\' private 320-acre lake offers kayaking, paddleboarding, sailing, and waterfront living in the middle of the Nevada desert — a truly unique luxury amenity.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22c4-4 8-7.5 8-12a8 8 0 10-16 0c0 4.5 4 8 8 12z"/><circle cx="12" cy="10" r="3"/></svg> },
              { title: 'Custom Estate Architecture', body: 'Mediterranean, Tuscan, and Italian-inspired custom homes from 3,000 to 10,000+ square feet. Many feature private docks, infinity pools, and resort-style outdoor living.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
              { title: 'Resort Lifestyle', body: 'Live within a resort community featuring the Westin and Hilton hotels, lakefront dining at the Village, spa services, and organized community events year-round.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><line x1="8" y1="6" x2="8" y2="6.01"/><line x1="12" y1="6" x2="12" y2="6.01"/><line x1="16" y1="6" x2="16" y2="6.01"/><line x1="8" y1="10" x2="8" y2="10.01"/><line x1="12" y1="10" x2="12" y2="10.01"/><line x1="16" y1="10" x2="16" y2="10.01"/><line x1="8" y1="14" x2="8" y2="14.01"/><line x1="12" y1="14" x2="12" y2="14.01"/><line x1="16" y1="14" x2="16" y2="14.01"/></svg> },
              { title: 'Irreplaceable Location', body: 'There is no other private lakefront luxury community in the Las Vegas Valley. South Shore\'s limited inventory and irreplaceable setting support exceptional long-term value.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg> },
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

      <LakeLasVegasSouthShoreFAQ />

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
              { name: 'Lake Las Vegas', href: '/lake-las-vegas/', price: 'From $400K', compare: 'The broader Lake Las Vegas resort community with diverse neighborhoods and price points.' },
              { name: 'MacDonald Highlands', href: '/macdonald-highlands/', price: 'From $800K', compare: 'Henderson\'s premier hilltop luxury community with DragonRidge Country Club.' },
              { name: 'Ascaya', href: '/ascaya/', price: 'From $3M', compare: 'Ultra-luxury custom lot community on the McCullough Range ridgeline.' },
              { name: 'The Ridges', href: '/summerlin-the-ridges/', price: 'From $2M', compare: 'Summerlin\'s ultra-luxury guard-gated enclave with Red Rock Canyon views.' },
              { name: 'Seven Hills Country Club', href: '/seven-hills-country-club/', price: 'From $1.2M', compare: 'Guard-gated golf community in Henderson with Rio Secco championship course.' },
              { name: 'Southern Highlands', href: '/southern-highlands/', price: 'From $550K', compare: 'Guard-gated golf community in south Las Vegas with Jack Nicklaus course.' },
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
              <h2>Ready to Find Your South Shore Home?</h2>
              <p>Nevada Real Estate Group is the #1 real estate team in Nevada. Whether you&apos;re buying or selling in South Shore, let&apos;s talk.</p>
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
                <input type="hidden" name="_subject" value="South Shore Inquiry — LasVegasHomeSearchExperts.com" />
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
