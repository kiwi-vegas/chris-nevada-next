import SpanishTrailFAQ from '@/components/SpanishTrailFAQ'
import Link from 'next/link'
import type { Metadata } from 'next'
import SpanishTrailMapWrapper from '@/components/SpanishTrailMapWrapper'
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
    { '@type': 'ListItem', position: 3, name: 'Spanish Trail', item: 'https://www.lasvegashomesearchexperts.com/spanish-trail/' },
  ],
}

const FAQ_DATA = [
  {
    "q": "What is the price range for homes in Spanish Trail?",
    "a": "Homes in Spanish Trail range from approximately $600,000 for updated condominiums and townhomes to over $3 million for custom estate homes on premium golf course lots. The most active price range is $800,000 to $1.5 million."
  },
  {
    "q": "Is Spanish Trail guard-gated?",
    "a": "Yes. Spanish Trail is a fully guard-gated community with a 24-hour staffed guard gate, controlled vehicular access, visitor management, and security patrols throughout the 640-acre property."
  },
  {
    "q": "What golf courses are in Spanish Trail?",
    "a": "Spanish Trail features 27 holes of championship golf across three 9-hole courses — Canyon, Sunrise, and Lakes — designed by Robert Trent Jones Jr. The courses play in rotating 18-hole combinations through the Spanish Trail Country Club."
  },
  {
    "q": "Do I have to join the country club to live in Spanish Trail?",
    "a": "No. Golf and country club membership is available but not required for homeownership. Many residents enjoy the guard-gated security and community without club membership. Social and dining memberships are also available."
  },
  {
    "q": "What are HOA fees in Spanish Trail?",
    "a": "HOA fees at Spanish Trail typically range from $350 to $800 per month depending on the property type (condo vs. single-family) and specific neighborhood. Fees cover guard gate staffing, security, common area maintenance, and community infrastructure."
  },
  {
    "q": "What ZIP code is Spanish Trail in?",
    "a": "Spanish Trail spans ZIP codes 89113 and 89148 in southwest Las Vegas."
  },
  {
    "q": "How does Spanish Trail compare to Southern Highlands?",
    "a": "Both are guard-gated golf communities in southwest Las Vegas. Spanish Trail is more established (1984 vs. 1999), has more mature landscaping, and offers a lower entry price. Southern Highlands is newer, has a Jack Nicklaus Signature course, and includes ultra-luxury estate sections with higher ceiling prices."
  },
  {
    "q": "What schools serve Spanish Trail?",
    "a": "Spanish Trail is served by CCSD schools including Helen Jydstrup Elementary, Walter Johnson Middle School, and Durango High School. Top private options include Bishop Gorman (A+), The Meadows School (A+), and Faith Lutheran (A)."
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
  name: 'Spanish Trail',
  description: 'Spanish Trail is a guard-gated · golf community in Las Vegas, Nevada.',
  geo: { '@type': 'GeoCoordinates', latitude: 36.088, longitude: -115.263 },
  address: { '@type': 'PostalAddress', addressLocality: 'Las Vegas', addressRegion: 'NV', postalCode: '89113', addressCountry: 'US' },
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
  const cms = await getCommunityPage('spanish-trail')
  return {
    title: cms?.metaTitle ?? 'Spanish Trail Homes for Sale | Nevada Real Estate Group',
    description: cms?.metaDescription ?? 'Browse Spanish Trail homes for sale in Las Vegas, NV. $600K–$3M+. Schools, HOA, market stats. Nevada Real Estate Group.',
    alternates: { canonical: 'https://www.lasvegashomesearchexperts.com/spanish-trail' },
  }
}

export default async function SpanishTrailPage() {
  const cms = await getCommunityPage('spanish-trail')
  const market = getMarketStats('spanish-trail')
  const ms = market?.stats

  const heroHeadline = cms?.heroHeadline ?? 'Spanish Trail'
  const heroSubtitle = 'Homes for Sale in Las Vegas, Nevada'
  const overviewTitle = cms?.overviewTitle ?? 'Spanish Trail: Guard-Gated · Golf Living in Las Vegas'

  const HARDCODED_STATS: Array<[string, string] | [string, string, string]> = [
    ['Established', '1984'],
    ['Developer', 'Spanish Trail Development'],
    ['Total Acreage', '640 acres'],
    ['Homes', '~1,500'],
    ['Median Home Price', ms?.medianSalePrice ?? '$600K–$3M+'],
    ['ZIP Codes', '89113, 89148'],
    ['Guard-Gated', 'Yes'],
    ['HOA', '$350–$800/mo'],
  ]
  const displayStats = mergeQuickStats(HARDCODED_STATS, cms?.quickStats)
  const HARDCODED_DRIVE_TIMES = [
    {
        "time": "~15 min",
        "destination": "to the Strip",
        "route": "via W Tropicana Ave / I-15"
    },
    {
        "time": "~15 min",
        "destination": "to Harry Reid Airport",
        "route": "via I-215 South"
    },
    {
        "time": "~20 min",
        "destination": "to Downtown Summerlin",
        "route": "via W Flamingo Rd / Rampart Blvd"
    },
    {
        "time": "~25 min",
        "destination": "to Red Rock Canyon",
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
          <span>Spanish Trail</span>
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
                <span className="hero-v2-stat-num">{ms?.medianSalePrice ?? qs('Median Home Price', '$600K–$3M+')}</span>
                <span className="hero-v2-stat-lbl">Median Sale Price</span>
              </div>
              <div className="hero-v2-stat">
                <span className="hero-v2-stat-num">{ms?.avgDaysToClose ?? qs('Avg Days on Market', '45')}</span>
                <span className="hero-v2-stat-lbl">Avg Days to Close</span>
              </div>
            </div>
            <a href="#listings" className="hero-v2-cta">Search Homes in Spanish Trail</a>
          </div>
        </div>
      </header>

      <div className="hero-v2-qfb">
        <div className="container">
          <div className="hero-v2-qfb-row">
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <span><strong>ZIP:</strong> 89113, 89148</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              <span><strong>Type:</strong> Guard-Gated · Golf</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
              <span><strong>Price Range:</strong> $600K–$3M+</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
              <span><strong>HOA:</strong> $350–$800/mo</span>
            </div>
          </div>
          <div className="hero-v2-qfb-est">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            <span>Est. 1984</span>
          </div>
        </div>
      </div>

      <section id="demographics" className="demographics-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Demographics</span>
            <h2>Spanish Trail Demographics</h2>
          </div>
          <div className="demo-grid">
            {[
              ['~4,000', 'Population'],
              ['52', 'Median Age'],
              ['$175,000', 'Avg Household Income'],
              ['~1,500', 'Total Households'],
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
            <h2>Where is Spanish Trail?</h2>
            <p>Southwest Las Vegas, Nevada &mdash; Las Vegas, Nevada.</p>
          </div>
          <div className="map-container">
            <SpanishTrailMapWrapper />
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
            <h2 className="listings-title">NEW SPANISH TRAIL LISTINGS</h2>
          </div>
          <div className="ylopo-wrap">
            <div className="YLOPO_searchWidget" />
            <div className="YLOPO_resultsWidget" data-search='{"propertyTypes":["house","condo","townhouse"],"minPrice":500000,"locations":[{"city":"Las Vegas","state":"NV"}],"limit":12,"sortBy":"listDate","sortOrder":"desc","keywords":"Spanish Trail","zipCodes":["89113","89148"]}' />
          </div>
          <p className="ylopo-note">Listing data sourced from regional MLS. Information deemed reliable but not guaranteed. Updated daily.</p>
          <div className="listings-actions">
            <a href="https://search.nevadarealestategroup.net/search?s[orderBy]=sourceCreationDate%2Cdesc&s[page]=1&s[locations][0][city]=Las%20Vegas&s[locations][0][state]=NV&s[keywords]=Spanish%20Trail" target="_blank" rel="noopener noreferrer" className="btn-gold">View All Spanish Trail Listings &rarr;</a>
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
                  <p>Spanish Trail is one of the most established and prestigious guard-gated golf communities in Las Vegas. Developed beginning in 1984, this 640-acre enclave in southwest Las Vegas features 27 holes of championship golf across three distinct 9-hole courses — Canyon, Sunrise, and Lakes — designed by Robert Trent Jones Jr. With approximately 1,500 homes ranging from luxury condos to custom estates, Spanish Trail offers a mature, tree-lined community with a lifestyle that blends country club living with convenient urban access.</p>
                  <p>The community is anchored by the Spanish Trail Country Club, a private club offering golf membership, fine dining, resort-style pools, tennis courts, a fitness center, and a robust social calendar. The three rotating 9-hole courses provide variety and challenge, with the Canyon course known for its dramatic elevation changes, the Sunrise course for its tight fairways and water features, and the Lakes course for its scenic lake views. Club membership is available but not required for homeownership.</p>
                  <p>Homes in Spanish Trail range from approximately $600,000 for updated condominiums and townhomes to over $3 million for custom estate homes on premium golf course lots. The community features a variety of architectural styles, from Mediterranean and Tuscan to transitional and contemporary, reflecting four decades of development. Many homes have been extensively renovated with modern finishes while maintaining the community's established, park-like setting with mature trees and lush landscaping.</p>
                  <p>Located minutes from the I-215 beltway and W Tropicana Avenue, Spanish Trail provides easy access to the Strip (15 minutes), Harry Reid Airport (15 minutes), and the shopping and dining destinations along W Flamingo Road and S Rainbow Boulevard. The community's central southwest location, established infrastructure, and country club lifestyle make it a perennial favorite among buyers seeking guard-gated golf living without the price tag of the valley's ultra-luxury communities.</p>
                </>
              )}
            </div>
            <div className="overview-aside">
              <div className="quick-facts">
                <h3>Spanish Trail At a Glance</h3>
                {displayStats.map(([label, value, cls]: any) => (
                  <div className="fact-row" key={label}>
                    <span className="fact-label">{label}</span>
                    <span className={`fact-value${cls ? ' ' + cls : ''}`}>{value}</span>
                  </div>
                ))}
              </div>
              <div className="cta-card">
                <p>Ready to explore Spanish Trail? Schedule a private tour of the community and the current listings that match your goals.</p>
                <a href="tel:+17252399950" className="btn-gold">Call 725.239.9950</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="highlights">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Why Spanish Trail</span>
            <h2>What Makes Spanish Trail Stand Out</h2>
          </div>
          <div className="highlights-grid">
            {[
              { title: '27 Holes of Championship Golf', body: 'Three 9-hole courses — Canyon, Sunrise, and Lakes — designed by Robert Trent Jones Jr. play in rotating 18-hole combinations for variety and challenge.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 2v10l7 4"/></svg> },
              { title: 'Guard-Gated Security', body: '24-hour staffed guard gate with controlled vehicular access, visitor management, and security patrols throughout the 640-acre community.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
              { title: 'Private Country Club', body: 'Spanish Trail Country Club offers golf, fine dining, resort pools, tennis, fitness, and a full social calendar. Membership available but not required for homeownership.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><line x1="8" y1="6" x2="8" y2="6.01"/><line x1="12" y1="6" x2="12" y2="6.01"/><line x1="16" y1="6" x2="16" y2="6.01"/><line x1="8" y1="10" x2="8" y2="10.01"/><line x1="12" y1="10" x2="12" y2="10.01"/><line x1="16" y1="10" x2="16" y2="10.01"/><line x1="8" y1="14" x2="8" y2="14.01"/><line x1="12" y1="14" x2="12" y2="14.01"/><line x1="16" y1="14" x2="16" y2="14.01"/></svg> },
              { title: 'Mature Landscaping', body: 'Four decades of growth have created a park-like setting with mature trees, lush landscaping, and tree-lined streets rare in the Las Vegas desert environment.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22c4-4 8-7.5 8-12a8 8 0 10-16 0c0 4.5 4 8 8 12z"/><circle cx="12" cy="10" r="3"/></svg> },
              { title: 'Central Location', body: '15 minutes to the Strip and airport, easy I-215 access, and proximity to shopping and dining along Tropicana, Flamingo, and Rainbow corridors.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M8 21l4-11 4 11"/><path d="M2 21l5-14 4 8"/><path d="M14 15l4-8 4 14"/><line x1="2" y1="21" x2="22" y2="21"/></svg> },
              { title: 'Established Value', body: 'As one of the original luxury guard-gated communities in Las Vegas, Spanish Trail offers established infrastructure, proven HOA governance, and strong long-term appreciation.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg> },
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

      <SpanishTrailFAQ />

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
              { name: 'Southern Highlands', href: '/southern-highlands/', price: 'From $400K', compare: 'Newer guard-gated golf community in the south valley with Jack Nicklaus course and ultra-luxury estate sections.' },
              { name: 'Rhodes Ranch', href: '/rhodes-ranch/', price: 'From $350K', compare: 'Guard-gated golf community in southwest Las Vegas with more affordable entry point.' },
              { name: 'Canyon Gate Country Club', href: '/canyon-gate-country-club/', price: 'From $700K', compare: 'Guard-gated Ted Robinson golf community in central Las Vegas with similar price range.' },
              { name: 'Red Rock Country Club', href: '/red-rock-country-club/', price: 'From $800K', compare: 'Summerlin guard-gated golf with two Arnold Palmer courses and Red Rock Canyon views.' },
              { name: 'Mountains Edge', href: '/mountains-edge/', price: 'From $350K', compare: 'Adjacent master-planned community in southwest Las Vegas with family-friendly amenities.' },
              { name: 'The Lakes', href: '/the-lakes/', price: 'From $350K', compare: 'Established lakefront community in west Las Vegas with waterfront homes and recreational lakes.' },
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
              <h2>Ready to Find Your Spanish Trail Home?</h2>
              <p>Nevada Real Estate Group is the #1 real estate team in Nevada. Whether you&apos;re buying or selling in Spanish Trail, let&apos;s talk.</p>
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
                <input type="hidden" name="_subject" value="Spanish Trail Inquiry — LasVegasHomeSearchExperts.com" />
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
