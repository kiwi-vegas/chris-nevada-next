import MountainsEdgeSierraMadreFAQ from '@/components/MountainsEdgeSierraMadreFAQ'
import Link from 'next/link'
import type { Metadata } from 'next'
import MountainsEdgeSierraMadreMapWrapper from '@/components/MountainsEdgeSierraMadreMapWrapper'
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
    { '@type': 'ListItem', position: 3, name: 'Sierra Madre at Mountains Edge', item: 'https://www.lasvegashomesearchexperts.com/mountains-edge-sierra-madre/' },
  ],
}

const FAQ_DATA = [
  {
    "q": "What is the price range for homes in Sierra Madre at Mountains Edge?",
    "a": "Homes in Sierra Madre range from approximately $450,000 for entry-level homes to $700,000 for premium homes on elevated view lots with mountain panoramas."
  },
  {
    "q": "Who built homes in Sierra Madre?",
    "a": "Sierra Madre was built primarily by Pulte Homes, known for Energy Star-rated construction, thoughtful floor plans, and quality finishes."
  },
  {
    "q": "What views do Sierra Madre homes have?",
    "a": "Sierra Madre's western-edge position provides many homes with views of Red Rock Canyon's sandstone formations and the Spring Mountains. The elevated lots on the community's west side have the most dramatic views."
  },
  {
    "q": "What ZIP code is Sierra Madre in?",
    "a": "Sierra Madre at Mountains Edge is located in ZIP code 89178 in southwest Las Vegas."
  },
  {
    "q": "What are HOA fees in Sierra Madre?",
    "a": "HOA fees are low, typically $65 to $150 per month, covering common area maintenance, trails, and community parks."
  },
  {
    "q": "Is Sierra Madre near hiking?",
    "a": "Yes — Exploration Peak Park, a 98-acre natural desert park with hiking trails and a mountain summit, is adjacent to Sierra Madre. Red Rock Canyon National Conservation Area is about 8 minutes away via Blue Diamond Road."
  },
  {
    "q": "What schools serve Sierra Madre?",
    "a": "Sierra Madre is served by CCSD schools including Carolyn S. Reedom Elementary (8/10) and Lawrence & Heidi Canarelli Middle School (7/10). Doral Academy (9/10) is a popular charter option."
  },
  {
    "q": "How does Sierra Madre compare to Summerlin?",
    "a": "Sierra Madre offers mountain views comparable to many Summerlin neighborhoods at price points typically 20–30% lower. The trade-off is that Mountains Edge doesn't have the same breadth of commercial amenities as Downtown Summerlin, though the Blue Diamond Road corridor is growing rapidly."
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
  name: 'Sierra Madre at Mountains Edge',
  description: 'Sierra Madre at Mountains Edge is a master-planned · family community in Las Vegas, Nevada.',
  geo: { '@type': 'GeoCoordinates', latitude: 36.01, longitude: -115.285 },
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
  const cms = await getCommunityPage('mountains-edge-sierra-madre')
  return {
    title: cms?.metaTitle ?? 'Sierra Madre at Mountains Edge Homes for Sale | Nevada Real Estate Group',
    description: cms?.metaDescription ?? 'Browse Sierra Madre at Mountains Edge homes for sale in Las Vegas, NV. $450K–$700K. Schools, HOA, market stats. Nevada Real Estate Group.',
  }
}

export default async function MountainsEdgeSierraMadrePage() {
  const cms = await getCommunityPage('mountains-edge-sierra-madre')
  const market = getMarketStats('mountains-edge-sierra-madre')
  const ms = market?.stats

  const heroHeadline = cms?.heroHeadline ?? 'Sierra Madre at Mountains Edge'
  const heroSubtitle = 'Homes for Sale in Las Vegas, Nevada'
  const overviewTitle = cms?.overviewTitle ?? 'Sierra Madre at Mountains Edge: Master-Planned · Family Living in Las Vegas'

  const HARDCODED_STATS: Array<[string, string] | [string, string, string]> = [
    ['Established', '2008'],
    ['Developer', 'Focus Property Group / Pulte Homes'],
    ['Total Acreage', '~130 acres'],
    ['Homes', '600+'],
    ['Median Home Price', ms?.medianSalePrice ?? '$450K–$700K'],
    ['ZIP Codes', '89178'],
    ['Guard-Gated', 'No'],
    ['HOA', '$65–$150/mo'],
  ]
  const displayStats = mergeQuickStats(HARDCODED_STATS, cms?.quickStats)
  const HARDCODED_DRIVE_TIMES = [
    {
        "time": "~8 min",
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
          <a href="/#communities">Communities</a>
          <span className="breadcrumb-sep">&rsaquo;</span>
          <span>Sierra Madre at Mountains Edge</span>
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
                <span className="hero-v2-stat-num">{ms?.medianSalePrice ?? qs('Median Home Price', '$450K–$700K')}</span>
                <span className="hero-v2-stat-lbl">Median Sale Price</span>
              </div>
              <div className="hero-v2-stat">
                <span className="hero-v2-stat-num">{ms?.avgDaysToClose ?? qs('Avg Days on Market', '45')}</span>
                <span className="hero-v2-stat-lbl">Avg Days to Close</span>
              </div>
            </div>
            <a href="#listings" className="hero-v2-cta">Search Homes in Sierra Madre at Mountains Edge</a>
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
              <span><strong>Price Range:</strong> $450K–$700K</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
              <span><strong>HOA:</strong> $65–$150/mo</span>
            </div>
          </div>
          <div className="hero-v2-qfb-est">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            <span>Est. 2008</span>
          </div>
        </div>
      </div>

      <section id="demographics" className="demographics-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Demographics</span>
            <h2>Sierra Madre at Mountains Edge Demographics</h2>
          </div>
          <div className="demo-grid">
            {[
              ['~1,800', 'Population'],
              ['36', 'Median Age'],
              ['$85,000', 'Avg Household Income'],
              ['600+', 'Total Households'],
              ['76%', 'Homeownership Rate'],
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
            <h2>Where is Sierra Madre at Mountains Edge?</h2>
            <p>Mountains Edge, Las Vegas &mdash; Las Vegas, Nevada.</p>
          </div>
          <div className="map-container">
            <MountainsEdgeSierraMadreMapWrapper />
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
            <h2 className="listings-title">NEW SIERRA MADRE AT MOUNTAINS EDGE LISTINGS</h2>
          </div>
          <div className="ylopo-wrap">
            <div className="YLOPO_searchWidget" />
            <div className="YLOPO_resultsWidget" data-search='{"propertyTypes":["house","condo","townhouse"],"minPrice":400000,"locations":[{"city":"Las Vegas","state":"NV"}],"limit":12,"sortBy":"listDate","sortOrder":"desc","keywords":"Mountains Edge","zipCodes":["89178"]}' />
          </div>
          <p className="ylopo-note">Listing data sourced from regional MLS. Information deemed reliable but not guaranteed. Updated daily.</p>
          <div className="listings-actions">
            <a href="https://search.nevadarealestategroup.net/search?s[orderBy]=sourceCreationDate%2Cdesc&s[page]=1&s[locations][0][city]=Las%20Vegas&s[locations][0][state]=NV&s[keywords]=Mountains%20Edge" target="_blank" rel="noopener noreferrer" className="btn-gold">View All Sierra Madre at Mountains Edge Listings &rarr;</a>
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
                  <p>Sierra Madre at Mountains Edge is a premium neighborhood within the Mountains Edge master-planned community, situated on the community's western edge where the desert terrain begins to rise toward the Spring Mountains. This elevated position gives Sierra Madre homes some of the best mountain views within the broader master plan, with many homesites offering sweeping vistas of Red Rock Canyon's sandstone formations to the northwest.</p>
                  <p>Homes in Sierra Madre range from approximately $450,000 to $700,000, with floor plans spanning 2,200 to 3,800 square feet. Built primarily by Pulte Homes beginning around 2008, the neighborhood features thoughtful floor plans with open-concept living areas, gourmet kitchens, and generous master suites. Construction quality reflects Pulte's Energy Star-rated building practices, with many homes featuring upgraded insulation, high-efficiency HVAC systems, and smart-home wiring.</p>
                  <p>What sets Sierra Madre apart from other Mountains Edge neighborhoods is its position and views. The western edge location provides direct mountain views that most of the master plan's interior neighborhoods cannot match. The proximity to Exploration Peak Park — a 98-acre natural desert park with hiking trails, a mountain summit, and panoramic valley views — adds a recreational dimension that resonates with outdoor-oriented buyers.</p>
                  <p>Sierra Madre offers the Mountains Edge lifestyle — excellent schools, trail connectivity, community parks, and attainable pricing — with a premium position and mountain proximity that buyers typically only find in more expensive communities like Summerlin. For families and move-up buyers seeking value with views, Sierra Madre is one of the best-kept secrets in the southwest valley.</p>
                </>
              )}
            </div>
            <div className="overview-aside">
              <div className="quick-facts">
                <h3>Sierra Madre at Mountains Edge At a Glance</h3>
                {displayStats.map(([label, value, cls]: any) => (
                  <div className="fact-row" key={label}>
                    <span className="fact-label">{label}</span>
                    <span className={`fact-value${cls ? ' ' + cls : ''}`}>{value}</span>
                  </div>
                ))}
              </div>
              <div className="cta-card">
                <p>Ready to explore Sierra Madre at Mountains Edge? Schedule a private tour of the community and the current listings that match your goals.</p>
                <a href="tel:+17252399950" className="btn-gold">Call 725.239.9950</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="highlights">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Why Sierra Madre at Mountains Edge</span>
            <h2>What Makes Sierra Madre at Mountains Edge Stand Out</h2>
          </div>
          <div className="highlights-grid">
            {[
              { title: 'Mountain Views', body: 'Elevated western-edge position provides sweeping views of Red Rock Canyon, the Spring Mountains, and the surrounding desert. Views that rival communities priced well above Sierra Madre.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M8 21l4-11 4 11"/><path d="M2 21l5-14 4 8"/><path d="M14 15l4-8 4 14"/><line x1="2" y1="21" x2="22" y2="21"/></svg> },
              { title: 'Pulte Homes Quality', body: 'Energy Star-rated construction by Pulte Homes with upgraded insulation, high-efficiency HVAC, and thoughtful floor plans. 2,200 to 3,800 square feet with modern open-concept living.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
              { title: 'Exploration Peak Park', body: 'Adjacent to the 98-acre natural desert park with hiking trails, a mountain summit, and panoramic valley views. An outdoor recreation anchor for the neighborhood.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22c4-4 8-7.5 8-12a8 8 0 10-16 0c0 4.5 4 8 8 12z"/><circle cx="12" cy="10" r="3"/></svg> },
              { title: 'Trail Connectivity', body: 'Connected to the Mountains Edge trail network linking neighborhoods to parks, schools, and commercial areas. Walk or bike throughout the master plan on dedicated paths.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><line x1="8" y1="6" x2="8" y2="6.01"/><line x1="12" y1="6" x2="12" y2="6.01"/><line x1="16" y1="6" x2="16" y2="6.01"/><line x1="8" y1="10" x2="8" y2="10.01"/><line x1="12" y1="10" x2="12" y2="10.01"/><line x1="16" y1="10" x2="16" y2="10.01"/><line x1="8" y1="14" x2="8" y2="14.01"/><line x1="12" y1="14" x2="12" y2="14.01"/><line x1="16" y1="14" x2="16" y2="14.01"/></svg> },
              { title: 'Top-Rated Schools', body: 'Served by highly rated CCSD schools with strong academic programs. Quality charter options including Doral Academy (9/10) provide school choice for families.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
              { title: 'Premium Value', body: 'Mountain views and premium positioning at Mountains Edge pricing — well below comparable view homes in Summerlin or Southern Highlands. Strong appreciation track record.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg> },
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

      <MountainsEdgeSierraMadreFAQ />

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
              { name: 'Mountains Edge', href: '/mountains-edge/', price: 'From $350K', compare: 'The broader 3,500-acre master plan with 12,000+ homes, Regional Park, and extensive trail network.' },
              { name: 'Southern Highlands', href: '/southern-highlands/', price: 'From $400K', compare: 'Guard-gated golf community to the south with Nicklaus course and luxury enclaves.' },
              { name: 'Rhodes Ranch', href: '/rhodes-ranch/', price: 'From $350K', compare: 'Guard-gated golf community to the north with resort-style amenities.' },
              { name: 'Enterprise', href: '/enterprise/', price: 'From $350K', compare: 'Growing area surrounding Mountains Edge with diverse housing options.' },
              { name: 'Summerlin', href: '/summerlin/', price: 'From $450K', compare: 'Premier west-side master plan with 20+ villages and extensive commercial amenities.' },
              { name: 'Inspirada', href: '/inspirada/', price: 'From $420K', compare: 'Henderson\'s design-forward master plan with award-winning gathering spaces.' },
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
              <h2>Ready to Find Your Sierra Madre at Mountains Edge Home?</h2>
              <p>Nevada Real Estate Group is the #1 real estate team in Nevada. Whether you&apos;re buying or selling in Sierra Madre at Mountains Edge, let&apos;s talk.</p>
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
                <input type="hidden" name="_subject" value="Sierra Madre at Mountains Edge Inquiry — LasVegasHomeSearchExperts.com" />
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
