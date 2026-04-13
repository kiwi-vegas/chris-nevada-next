import LasVegasSpringValleySouthFAQ from '@/components/LasVegasSpringValleySouthFAQ'
import Link from 'next/link'
import type { Metadata } from 'next'
import LasVegasSpringValleySouthMapWrapper from '@/components/LasVegasSpringValleySouthMapWrapper'
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
    { '@type': 'ListItem', position: 3, name: 'Spring Valley South', item: 'https://www.lasvegashomesearchexperts.com/las-vegas-spring-valley-south/' },
  ],
}

const FAQ_DATA = [
  {
    "q": "What is the price range in Spring Valley South?",
    "a": "Homes in Spring Valley South range from approximately $350,000 for townhomes and smaller homes to $700,000 for larger family estates. The most common price range is $400K–$550K."
  },
  {
    "q": "What ZIP codes are in Spring Valley South?",
    "a": "Spring Valley South spans ZIP codes 89147 and 89148 in Las Vegas, Nevada."
  },
  {
    "q": "How far is Spring Valley South from the Strip?",
    "a": "Spring Valley South is approximately 12-15 minutes from the Las Vegas Strip via Flamingo Road East or I-215 to I-15. It is one of the closest affordable residential areas to the resort corridor."
  },
  {
    "q": "What is Desert Breeze Park?",
    "a": "Desert Breeze Park is a 20-acre community park within Spring Valley South featuring a lake, playground, tennis courts, walking trails, skate park, and community center. It is one of Las Vegas' most beloved parks."
  },
  {
    "q": "What schools serve Spring Valley South?",
    "a": "The area is served by CCSD schools including Mabel W. Hoggard Elementary (7/10) and Spring Valley High School. Doral Academy (9/10) is a strong charter option. Bishop Gorman (A+) is the premier private school."
  },
  {
    "q": "Is Spring Valley South a good investment?",
    "a": "Yes. Spring Valley South's central location, affordable pricing, and strong rental demand create solid investment fundamentals. The proximity to the Strip makes it attractive to hospitality workers seeking rentals."
  },
  {
    "q": "What are HOA fees in Spring Valley South?",
    "a": "HOA fees range from $50 to $175 per month depending on the neighborhood. Some standalone homes have no HOA. Townhome and condo communities have slightly higher fees."
  },
  {
    "q": "Is Spring Valley South a master-planned community?",
    "a": "No. Spring Valley South is a collection of individual neighborhoods and subdivisions, not a single master-planned community. Each neighborhood may have its own HOA with varying rules."
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
  name: 'Spring Valley South',
  description: 'Spring Valley South is a established · family · central community in Las Vegas, Nevada.',
  geo: { '@type': 'GeoCoordinates', latitude: 36.085, longitude: -115.23 },
  address: { '@type': 'PostalAddress', addressLocality: 'Las Vegas', addressRegion: 'NV', postalCode: '89147', addressCountry: 'US' },
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
  const cms = await getCommunityPage('las-vegas-spring-valley-south')
  return {
    title: cms?.metaTitle ?? 'Spring Valley South Homes for Sale | Nevada Real Estate Group',
    description: cms?.metaDescription ?? 'Browse Spring Valley South homes for sale in Las Vegas, NV. $350K–$700K. Schools, HOA, market stats. Nevada Real Estate Group.',
  }
}

export default async function LasVegasSpringValleySouthPage() {
  const cms = await getCommunityPage('las-vegas-spring-valley-south')
  const market = getMarketStats('las-vegas-spring-valley-south')
  const ms = market?.stats

  const heroHeadline = cms?.heroHeadline ?? 'Spring Valley South'
  const heroSubtitle = 'Homes for Sale in Las Vegas, Nevada'
  const overviewTitle = cms?.overviewTitle ?? 'Spring Valley South: Established · Family · Central Living in Las Vegas'

  const HARDCODED_STATS: Array<[string, string] | [string, string, string]> = [
    ['Established', '1992'],
    ['Developer', 'Various Builders'],
    ['Total Acreage', '~800 acres'],
    ['Homes', '6,000+'],
    ['Median Home Price', ms?.medianSalePrice ?? '$350K–$700K'],
    ['ZIP Codes', '89147, 89148'],
    ['Guard-Gated', 'No'],
    ['HOA', '$50–$175/mo'],
  ]
  const displayStats = mergeQuickStats(HARDCODED_STATS, cms?.quickStats)
  const HARDCODED_DRIVE_TIMES = [
    {
        "time": "~12 min",
        "destination": "to the Strip",
        "route": "via Flamingo Rd East"
    },
    {
        "time": "~15 min",
        "destination": "to Harry Reid Airport",
        "route": "via I-215 → I-15"
    },
    {
        "time": "~15 min",
        "destination": "to Summerlin",
        "route": "via I-215 West"
    },
    {
        "time": "~15 min",
        "destination": "to Henderson",
        "route": "via I-215 East"
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
          <span>Spring Valley South</span>
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
                <span className="hero-v2-stat-num">{ms?.medianSalePrice ?? qs('Median Home Price', '$350K–$700K')}</span>
                <span className="hero-v2-stat-lbl">Median Sale Price</span>
              </div>
              <div className="hero-v2-stat">
                <span className="hero-v2-stat-num">{ms?.avgDaysToClose ?? qs('Avg Days on Market', '45')}</span>
                <span className="hero-v2-stat-lbl">Avg Days to Close</span>
              </div>
            </div>
            <a href="#listings" className="hero-v2-cta">Search Homes in Spring Valley South</a>
          </div>
        </div>
      </header>

      <div className="hero-v2-qfb">
        <div className="container">
          <div className="hero-v2-qfb-row">
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <span><strong>ZIP:</strong> 89147, 89148</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              <span><strong>Type:</strong> Established · Family · Central</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
              <span><strong>Price Range:</strong> $350K–$700K</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
              <span><strong>HOA:</strong> $50–$175/mo</span>
            </div>
          </div>
          <div className="hero-v2-qfb-est">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            <span>Est. 1992</span>
          </div>
        </div>
      </div>

      <section id="demographics" className="demographics-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Demographics</span>
            <h2>Spring Valley South Demographics</h2>
          </div>
          <div className="demo-grid">
            {[
              ['22,000+', 'Population'],
              ['37', 'Median Age'],
              ['$68,000', 'Avg Household Income'],
              ['6,000+', 'Total Households'],
              ['58%', 'Homeownership Rate'],
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
            <h2>Where is Spring Valley South?</h2>
            <p>Spring Valley, Las Vegas &mdash; Las Vegas, Nevada.</p>
          </div>
          <div className="map-container">
            <LasVegasSpringValleySouthMapWrapper />
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
            <h2 className="listings-title">NEW SPRING VALLEY SOUTH LISTINGS</h2>
          </div>
          <div className="ylopo-wrap">
            <div className="YLOPO_searchWidget" />
            <div className="YLOPO_resultsWidget" data-search='{"propertyTypes":["house","condo","townhouse"],"minPrice":350000,"locations":[{"city":"Las Vegas","state":"NV"}],"limit":12,"sortBy":"listDate","sortOrder":"desc","keywords":"Spring Valley South Las Vegas","zipCodes":["89147","89148"]}' />
          </div>
          <p className="ylopo-note">Listing data sourced from regional MLS. Information deemed reliable but not guaranteed. Updated daily.</p>
          <div className="listings-actions">
            <a href="https://search.nevadarealestategroup.net/search?s[orderBy]=sourceCreationDate%2Cdesc&s[page]=1&s[locations][0][city]=Las%20Vegas&s[locations][0][state]=NV&s[keywords]=Spring%20Valley%20South%20Las%20Vegas" target="_blank" rel="noopener noreferrer" className="btn-gold">View All Spring Valley South Listings &rarr;</a>
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
                  <p>Spring Valley South is the southern portion of the Spring Valley census-designated place in Las Vegas, encompassing the residential neighborhoods south of Flamingo Road between Rainbow Boulevard and Durango Drive. This well-established area offers a diverse mix of single-family homes, townhomes, and condominiums at price points between $350,000 and $700,000, making it one of the most practical residential areas in the central-southwest Las Vegas Valley.</p>
                  <p>Developed primarily between 1992 and 2008, Spring Valley South features housing stock that ranges from compact 1,400-square-foot starter homes to spacious 3,500-square-foot family estates. The area is characterized by wide, well-maintained streets, established desert landscaping, mature trees, and a mix of builder styles that give each pocket neighborhood its own identity. Many neighborhoods feature community pools, pocket parks, and HOA-maintained common areas.</p>
                  <p>The area's central-southwest location is a major draw for buyers. Spring Valley South provides quick access to multiple freeways including I-215 and I-15, placing the Strip approximately 12-15 minutes away. The surrounding commercial corridors along Rainbow Boulevard, Durango Drive, and Flamingo Road offer abundant grocery, dining, medical, and retail options. Desert Breeze Park, one of Las Vegas' best community parks, sits within the area.</p>
                  <p>For buyers seeking central Las Vegas living with moderate pricing, diverse housing options, and excellent access to everything the valley offers, Spring Valley South delivers strong fundamentals. The area attracts families, professionals, hospitality workers, and investors who value a proven neighborhood with convenient commutes, established community character, and room to grow.</p>
                </>
              )}
            </div>
            <div className="overview-aside">
              <div className="quick-facts">
                <h3>Spring Valley South At a Glance</h3>
                {displayStats.map(([label, value, cls]: any) => (
                  <div className="fact-row" key={label}>
                    <span className="fact-label">{label}</span>
                    <span className={`fact-value${cls ? ' ' + cls : ''}`}>{value}</span>
                  </div>
                ))}
              </div>
              <div className="cta-card">
                <p>Ready to explore Spring Valley South? Schedule a private tour of the community and the current listings that match your goals.</p>
                <a href="tel:+17252399950" className="btn-gold">Call 725.239.9950</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="highlights">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Why Spring Valley South</span>
            <h2>What Makes Spring Valley South Stand Out</h2>
          </div>
          <div className="highlights-grid">
            {[
              { title: 'Central Southwest Location', body: 'Strategic positioning between Rainbow and Durango with I-215 and I-15 access. 12-15 minutes to the Strip, equidistant to Summerlin and Henderson.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><line x1="8" y1="6" x2="8" y2="6.01"/><line x1="12" y1="6" x2="12" y2="6.01"/><line x1="16" y1="6" x2="16" y2="6.01"/><line x1="8" y1="10" x2="8" y2="10.01"/><line x1="12" y1="10" x2="12" y2="10.01"/><line x1="16" y1="10" x2="16" y2="10.01"/><line x1="8" y1="14" x2="8" y2="14.01"/><line x1="12" y1="14" x2="12" y2="14.01"/><line x1="16" y1="14" x2="16" y2="14.01"/></svg> },
              { title: 'Desert Breeze Park', body: 'One of Las Vegas\' best community parks with a lake, playground, tennis courts, walking trails, skate park, and sports facilities. A neighborhood treasure.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22c4-4 8-7.5 8-12a8 8 0 10-16 0c0 4.5 4 8 8 12z"/><circle cx="12" cy="10" r="3"/></svg> },
              { title: 'Diverse Housing Stock', body: 'From starter condos to family estates, Spring Valley South offers housing for every buyer profile. Entry-level to move-up options in a single area.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
              { title: 'Established Community', body: '20+ years of proven community character with mature landscaping, established neighborhoods, and stable property values.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
              { title: 'Abundant Services', body: 'Commercial corridors on every border with grocery, dining, medical, and retail within minutes. One of the most service-rich residential areas in Las Vegas.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><line x1="8" y1="6" x2="8" y2="6.01"/><line x1="12" y1="6" x2="12" y2="6.01"/><line x1="16" y1="6" x2="16" y2="6.01"/><line x1="8" y1="10" x2="8" y2="10.01"/><line x1="12" y1="10" x2="12" y2="10.01"/><line x1="16" y1="10" x2="16" y2="10.01"/><line x1="8" y1="14" x2="8" y2="14.01"/><line x1="12" y1="14" x2="12" y2="14.01"/><line x1="16" y1="14" x2="16" y2="14.01"/></svg> },
              { title: 'Practical Value', body: 'Quality homes from $350K in a central location without master-planned community premiums. Strong rental demand and consistent appreciation.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg> },
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

      <LasVegasSpringValleySouthFAQ />

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
              { name: 'Spring Valley', href: '/spring-valley/', price: 'From $300K', compare: 'The broader Spring Valley area including north and south sections.' },
              { name: 'Enterprise', href: '/enterprise/', price: 'From $350K', compare: 'Growing southwest area to the south with newer commercial development.' },
              { name: 'Rhodes Ranch', href: '/rhodes-ranch/', price: 'From $350K', compare: 'Guard-gated golf community to the south with Ted Robinson course.' },
              { name: 'Chinatown', href: '/las-vegas-chinatown/', price: 'From $250K', compare: 'Cultural dining district to the north with walkable restaurants and nightlife.' },
              { name: 'Peccole Ranch', href: '/peccole-ranch/', price: 'From $250K', compare: 'Established community to the northwest with guard-gated sections.' },
              { name: 'Southern Highlands', href: '/southern-highlands/', price: 'From $400K', compare: 'Guard-gated master plan to the south with Jack Nicklaus golf.' },
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
              <h2>Ready to Find Your Spring Valley South Home?</h2>
              <p>Nevada Real Estate Group is the #1 real estate team in Nevada. Whether you&apos;re buying or selling in Spring Valley South, let&apos;s talk.</p>
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
                <input type="hidden" name="_subject" value="Spring Valley South Inquiry — LasVegasHomeSearchExperts.com" />
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
