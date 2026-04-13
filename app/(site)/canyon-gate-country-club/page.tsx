import CanyonGateCountryClubFAQ from '@/components/CanyonGateCountryClubFAQ'
import Link from 'next/link'
import type { Metadata } from 'next'
import CanyonGateCountryClubMapWrapper from '@/components/CanyonGateCountryClubMapWrapper'
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
    { '@type': 'ListItem', position: 3, name: 'Canyon Gate Country Club', item: 'https://www.lasvegashomesearchexperts.com/canyon-gate-country-club/' },
  ],
}

const FAQ_DATA = [
  {
    "q": "What is the price range for homes at Canyon Gate Country Club?",
    "a": "Homes at Canyon Gate range from approximately $700,000 for attached patio homes and well-maintained resale properties to over $2 million for premium golf course-front estates with updated interiors."
  },
  {
    "q": "Is Canyon Gate Country Club guard-gated?",
    "a": "Yes. Canyon Gate is a fully guard-gated community with a 24-hour staffed guard gate, controlled vehicular access, and security patrols throughout the 350-acre property."
  },
  {
    "q": "Who designed the golf course at Canyon Gate?",
    "a": "The 18-hole championship course at Canyon Gate was designed by Ted Robinson, known for his creative use of water features and strategic course layouts. The course features mature tree-lined fairways and multiple water hazards."
  },
  {
    "q": "Do I have to join the country club to live at Canyon Gate?",
    "a": "No. Country club membership is available but not required for homeownership. Canyon Gate Country Club offers golf membership, social membership, and dining membership tiers to accommodate different lifestyles and budgets."
  },
  {
    "q": "What are HOA fees at Canyon Gate Country Club?",
    "a": "HOA fees at Canyon Gate typically range from $250 to $600 per month depending on property type. Fees cover guard gate staffing, security, common area maintenance, and community infrastructure."
  },
  {
    "q": "What ZIP code is Canyon Gate Country Club in?",
    "a": "Canyon Gate Country Club is located in ZIP code 89117 in west Las Vegas."
  },
  {
    "q": "How does Canyon Gate compare to Spanish Trail?",
    "a": "Both are established guard-gated golf communities in west Las Vegas. Canyon Gate has an 18-hole course (vs. Spanish Trail's 27 holes), a slightly newer development era (1989 vs. 1984), and a comparable price range. Spanish Trail is larger (640 acres vs. 350 acres) with more homes."
  },
  {
    "q": "What schools serve Canyon Gate Country Club?",
    "a": "Canyon Gate is served by CCSD schools including Red Rock Elementary, Becker Middle School, and Cimarron-Memorial High School. Many families opt for highly rated private schools like The Meadows School (A+) and Bishop Gorman (A+)."
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
  name: 'Canyon Gate Country Club',
  description: 'Canyon Gate Country Club is a guard-gated · golf community in Las Vegas, Nevada.',
  geo: { '@type': 'GeoCoordinates', latitude: 36.146, longitude: -115.252 },
  address: { '@type': 'PostalAddress', addressLocality: 'Las Vegas', addressRegion: 'NV', postalCode: '89117', addressCountry: 'US' },
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
  const cms = await getCommunityPage('canyon-gate-country-club')
  return {
    title: cms?.metaTitle ?? 'Canyon Gate Country Club Homes for Sale | Nevada Real Estate Group',
    description: cms?.metaDescription ?? 'Browse Canyon Gate Country Club homes for sale in Las Vegas, NV. $700K–$2M+. Schools, HOA, market stats. Nevada Real Estate Group.',
  }
}

export default async function CanyonGateCountryClubPage() {
  const cms = await getCommunityPage('canyon-gate-country-club')
  const market = getMarketStats('canyon-gate-country-club')
  const ms = market?.stats

  const heroHeadline = cms?.heroHeadline ?? 'Canyon Gate Country Club'
  const heroSubtitle = 'Homes for Sale in Las Vegas, Nevada'
  const overviewTitle = cms?.overviewTitle ?? 'Canyon Gate Country Club: Guard-Gated · Golf Living in Las Vegas'

  const HARDCODED_STATS: Array<[string, string] | [string, string, string]> = [
    ['Established', '1989'],
    ['Developer', 'Canyon Gate Development'],
    ['Total Acreage', '350 acres'],
    ['Homes', '~900'],
    ['Median Home Price', ms?.medianSalePrice ?? '$700K–$2M+'],
    ['ZIP Codes', '89117'],
    ['Guard-Gated', 'Yes'],
    ['HOA', '$250–$600/mo'],
  ]
  const displayStats = mergeQuickStats(HARDCODED_STATS, cms?.quickStats)
  const HARDCODED_DRIVE_TIMES = [
    {
        "time": "~15 min",
        "destination": "to the Strip",
        "route": "via W Sahara Ave / I-15"
    },
    {
        "time": "~15 min",
        "destination": "to Downtown Summerlin",
        "route": "via W Sahara Ave / Town Center Dr"
    },
    {
        "time": "~20 min",
        "destination": "to Harry Reid Airport",
        "route": "via I-215 → I-15"
    },
    {
        "time": "~20 min",
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
          <span>Canyon Gate Country Club</span>
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
                <span className="hero-v2-stat-num">{ms?.medianSalePrice ?? qs('Median Home Price', '$700K–$2M+')}</span>
                <span className="hero-v2-stat-lbl">Median Sale Price</span>
              </div>
              <div className="hero-v2-stat">
                <span className="hero-v2-stat-num">{ms?.avgDaysToClose ?? qs('Avg Days on Market', '45')}</span>
                <span className="hero-v2-stat-lbl">Avg Days to Close</span>
              </div>
            </div>
            <a href="#listings" className="hero-v2-cta">Search Homes in Canyon Gate Country Club</a>
          </div>
        </div>
      </header>

      <div className="hero-v2-qfb">
        <div className="container">
          <div className="hero-v2-qfb-row">
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <span><strong>ZIP:</strong> 89117</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              <span><strong>Type:</strong> Guard-Gated · Golf</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
              <span><strong>Price Range:</strong> $700K–$2M+</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
              <span><strong>HOA:</strong> $250–$600/mo</span>
            </div>
          </div>
          <div className="hero-v2-qfb-est">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            <span>Est. 1989</span>
          </div>
        </div>
      </div>

      <section id="demographics" className="demographics-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Demographics</span>
            <h2>Canyon Gate Country Club Demographics</h2>
          </div>
          <div className="demo-grid">
            {[
              ['~2,500', 'Population'],
              ['50', 'Median Age'],
              ['$150,000', 'Avg Household Income'],
              ['~900', 'Total Households'],
              ['88%', 'Homeownership Rate'],
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
            <h2>Where is Canyon Gate Country Club?</h2>
            <p>West Las Vegas, Nevada &mdash; Las Vegas, Nevada.</p>
          </div>
          <div className="map-container">
            <CanyonGateCountryClubMapWrapper />
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
            <h2 className="listings-title">NEW CANYON GATE COUNTRY CLUB LISTINGS</h2>
          </div>
          <div className="ylopo-wrap">
            <div className="YLOPO_searchWidget" />
            <div className="YLOPO_resultsWidget" data-search='{"propertyTypes":["house","condo","townhouse"],"minPrice":600000,"locations":[{"city":"Las Vegas","state":"NV"}],"limit":12,"sortBy":"listDate","sortOrder":"desc","keywords":"Canyon Gate","zipCodes":["89117"]}' />
          </div>
          <p className="ylopo-note">Listing data sourced from regional MLS. Information deemed reliable but not guaranteed. Updated daily.</p>
          <div className="listings-actions">
            <a href="https://search.nevadarealestategroup.net/search?s[orderBy]=sourceCreationDate%2Cdesc&s[page]=1&s[locations][0][city]=Las%20Vegas&s[locations][0][state]=NV&s[keywords]=Canyon%20Gate" target="_blank" rel="noopener noreferrer" className="btn-gold">View All Canyon Gate Country Club Listings &rarr;</a>
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
                  <p>Canyon Gate Country Club is a distinguished guard-gated golf community located in the heart of west Las Vegas. Developed beginning in 1989, this 350-acre community features an 18-hole Ted Robinson-designed championship golf course, approximately 900 homes, and a private country club that has served as one of Las Vegas' premier social and recreational destinations for over three decades.</p>
                  <p>The Ted Robinson-designed golf course at Canyon Gate is known for its strategic use of water features, mature tree-lined fairways, and challenging layout that rewards accurate shot-making. The course winds through the community, providing golf course frontage and views for many homes. The Canyon Gate Country Club offers full golf membership, social membership, and dining membership tiers, with amenities including the clubhouse restaurant, resort-style pool, tennis courts, and fitness center.</p>
                  <p>Homes in Canyon Gate range from approximately $700,000 for well-maintained resale homes to over $2 million for premium golf course-front estates. Architectural styles include Mediterranean, contemporary, and transitional designs, with many homes featuring updated interiors, pools, and outdoor living spaces. Lot sizes are generous by Las Vegas standards, and the community's mature landscaping creates a park-like atmosphere that distinguishes it from newer developments.</p>
                  <p>Canyon Gate's central west Las Vegas location is one of its strongest advantages. The community sits minutes from Summerlin's shopping and dining, the I-215 beltway, and the Strip corridor. W Sahara Avenue and S Hualapai Way provide multiple ingress and egress points. For buyers seeking guard-gated golf living in a central location with a proven track record, Canyon Gate Country Club delivers exceptional value and lifestyle.</p>
                </>
              )}
            </div>
            <div className="overview-aside">
              <div className="quick-facts">
                <h3>Canyon Gate Country Club At a Glance</h3>
                {displayStats.map(([label, value, cls]: any) => (
                  <div className="fact-row" key={label}>
                    <span className="fact-label">{label}</span>
                    <span className={`fact-value${cls ? ' ' + cls : ''}`}>{value}</span>
                  </div>
                ))}
              </div>
              <div className="cta-card">
                <p>Ready to explore Canyon Gate Country Club? Schedule a private tour of the community and the current listings that match your goals.</p>
                <a href="tel:+17252399950" className="btn-gold">Call 725.239.9950</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="highlights">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Why Canyon Gate Country Club</span>
            <h2>What Makes Canyon Gate Country Club Stand Out</h2>
          </div>
          <div className="highlights-grid">
            {[
              { title: 'Ted Robinson Golf Course', body: '18-hole championship course designed by Ted Robinson, featuring water features, mature tree-lined fairways, and a challenging layout that has hosted numerous regional tournaments.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 2v10l7 4"/></svg> },
              { title: 'Guard-Gated Security', body: '24-hour staffed guard gate with controlled access, visitor management, and security patrols throughout the 350-acre community.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
              { title: 'Private Country Club', body: 'Canyon Gate Country Club offers golf, social, and dining memberships with a clubhouse restaurant, resort pool, tennis courts, and fitness center.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><line x1="8" y1="6" x2="8" y2="6.01"/><line x1="12" y1="6" x2="12" y2="6.01"/><line x1="16" y1="6" x2="16" y2="6.01"/><line x1="8" y1="10" x2="8" y2="10.01"/><line x1="12" y1="10" x2="12" y2="10.01"/><line x1="16" y1="10" x2="16" y2="10.01"/><line x1="8" y1="14" x2="8" y2="14.01"/><line x1="12" y1="14" x2="12" y2="14.01"/><line x1="16" y1="14" x2="16" y2="14.01"/></svg> },
              { title: 'Central West Location', body: 'Minutes from Summerlin, the I-215 beltway, and the Strip. One of the most centrally located guard-gated golf communities in the valley.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M8 21l4-11 4 11"/><path d="M2 21l5-14 4 8"/><path d="M14 15l4-8 4 14"/><line x1="2" y1="21" x2="22" y2="21"/></svg> },
              { title: 'Mature Community', body: '35+ years of established infrastructure, mature landscaping, proven HOA governance, and a stable, engaged resident community.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22c4-4 8-7.5 8-12a8 8 0 10-16 0c0 4.5 4 8 8 12z"/><circle cx="12" cy="10" r="3"/></svg> },
              { title: 'Value Proposition', body: 'Guard-gated golf living at a lower entry price than Summerlin and Henderson luxury communities. Strong resale values with room for appreciation.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg> },
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

      <CanyonGateCountryClubFAQ />

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
              { name: 'Spanish Trail', href: '/spanish-trail/', price: 'From $600K', compare: 'Guard-gated 27-hole golf community in southwest Las Vegas with similar pricing and established character.' },
              { name: 'Peccole Ranch', href: '/peccole-ranch/', price: 'From $250K', compare: 'Adjacent master-planned community with guard-gated and non-gated sections and excellent Summerlin-area schools.' },
              { name: 'Queensridge', href: '/queensridge/', price: 'From $600K', compare: 'Guard-gated luxury community nearby with One Queensridge Place high-rise towers.' },
              { name: 'Red Rock Country Club', href: '/red-rock-country-club/', price: 'From $800K', compare: 'Summerlin guard-gated golf with two Arnold Palmer courses and higher ceiling prices.' },
              { name: 'The Lakes', href: '/the-lakes/', price: 'From $350K', compare: 'Established lakefront community minutes away with recreational lakes and a more accessible entry price.' },
              { name: 'Summerlin', href: '/summerlin/', price: 'From $400K', compare: 'Nevada\'s premier master-planned community immediately west with every price point and amenity.' },
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
              <h2>Ready to Find Your Canyon Gate Country Club Home?</h2>
              <p>Nevada Real Estate Group is the #1 real estate team in Nevada. Whether you&apos;re buying or selling in Canyon Gate Country Club, let&apos;s talk.</p>
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
                <input type="hidden" name="_subject" value="Canyon Gate Country Club Inquiry — LasVegasHomeSearchExperts.com" />
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
