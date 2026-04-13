import NeoMacdonaldHighlandsFAQ from '@/components/NeoMacdonaldHighlandsFAQ'
import Link from 'next/link'
import type { Metadata } from 'next'
import NeoMacdonaldHighlandsMapWrapper from '@/components/NeoMacdonaldHighlandsMapWrapper'
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
    { '@type': 'ListItem', position: 3, name: 'Neo', item: 'https://www.lasvegashomesearchexperts.com/neo-macdonald-highlands/' },
  ],
}

const FAQ_DATA = [
  {
    "q": "What is the price range for homes in Neo at MacDonald Highlands?",
    "a": "Homes in Neo range from approximately $2.34 million to $4.97 million. These are brand-new contemporary desert residences with 3,500 to 6,000+ square feet, premium finishes, and panoramic Strip and valley views."
  },
  {
    "q": "Is Neo at MacDonald Highlands guard-gated?",
    "a": "Yes. Neo benefits from double-gated security — residents pass through the main MacDonald Highlands guard gate and then Neo's own controlled access point. Security is 24 hours with full staffing."
  },
  {
    "q": "What ZIP code is Neo in?",
    "a": "Neo is located in ZIP code 89012 in Henderson, Nevada, within the MacDonald Highlands master plan."
  },
  {
    "q": "Do Neo homeowners have access to DragonRidge Country Club?",
    "a": "Yes. As MacDonald Highlands residents, Neo homeowners are eligible for membership at DragonRidge Country Club, which includes the Tom Fazio-designed 18-hole championship course, fine dining, resort pool, tennis, and fitness center. Club membership is separate from homeownership."
  },
  {
    "q": "What are HOA fees in Neo?",
    "a": "HOA fees in Neo typically range from $400 to $900 per month, which includes the MacDonald Highlands master association fee and the Neo sub-association fee. Fees cover guard gate staffing, security, common area maintenance, and community landscaping."
  },
  {
    "q": "What schools serve Neo at MacDonald Highlands?",
    "a": "Neo is served by CCSD schools including John C. Vanderburg Elementary (8/10), Del E. Webb Middle School (7/10), and Coronado High School (6/10). Private options include Henderson International School (A) and Bishop Gorman High School (A+)."
  },
  {
    "q": "When were homes in Neo built?",
    "a": "Neo is one of the newest neighborhoods in MacDonald Highlands, with homes delivered beginning in 2023. Construction continues with new phases. All homes feature contemporary desert architecture with the latest building standards and technology."
  },
  {
    "q": "How does Neo compare to other MacDonald Highlands neighborhoods?",
    "a": "Neo is among the newest luxury enclaves in MacDonald Highlands, offering brand-new construction at the $2.34M–$4.97M price point. It sits between the entry-level SkyVu homes ($800K–$2M+) and the ultra-luxury Dragon Rock enclave ($5M–$15M+) in both price and elevation."
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
  name: 'Neo',
  description: 'Neo is a luxury · new construction community in Henderson, Nevada.',
  geo: { '@type': 'GeoCoordinates', latitude: 36.013, longitude: -114.993 },
  address: { '@type': 'PostalAddress', addressLocality: 'Henderson', addressRegion: 'NV', postalCode: '89012', addressCountry: 'US' },
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
  const cms = await getCommunityPage('neo-macdonald-highlands')
  return {
    title: cms?.metaTitle ?? 'Neo Homes for Sale | Nevada Real Estate Group',
    description: cms?.metaDescription ?? 'Browse Neo homes for sale in Henderson, NV. $2.34M–$4.97M. Schools, HOA, market stats. Nevada Real Estate Group.',
  }
}

export default async function NeoMacdonaldHighlandsPage() {
  const cms = await getCommunityPage('neo-macdonald-highlands')
  const market = getMarketStats('neo-macdonald-highlands')
  const ms = market?.stats

  const heroHeadline = cms?.heroHeadline ?? 'Neo'
  const heroSubtitle = 'Homes for Sale in Henderson, Nevada'
  const overviewTitle = cms?.overviewTitle ?? 'Neo: Luxury · New Construction Living in Henderson'

  const HARDCODED_STATS: Array<[string, string] | [string, string, string]> = [
    ['Established', '2023'],
    ['Developer', 'William Lyon Homes / Taylor Morrison'],
    ['Total Acreage', '~40 acres'],
    ['Homes', '~80'],
    ['Median Home Price', ms?.medianSalePrice ?? '$2.34M–$4.97M'],
    ['ZIP Codes', '89012'],
    ['Guard-Gated', 'Yes'],
    ['HOA', '$400–$900/mo'],
  ]
  const displayStats = mergeQuickStats(HARDCODED_STATS, cms?.quickStats)
  const HARDCODED_DRIVE_TIMES = [
    {
        "time": "~20 min",
        "destination": "to the Strip",
        "route": "via I-215 → I-15"
    },
    {
        "time": "~15 min",
        "destination": "to Henderson Executive Airport",
        "route": "via Bicentennial Pkwy"
    },
    {
        "time": "~10 min",
        "destination": "to The District at GVR",
        "route": "via Horizon Ridge Pkwy"
    },
    {
        "time": "~25 min",
        "destination": "to Harry Reid Airport",
        "route": "via I-215 West → I-15"
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
          <span>Neo</span>
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
                <span className="hero-v2-stat-num">{ms?.medianSalePrice ?? qs('Median Home Price', '$2.34M–$4.97M')}</span>
                <span className="hero-v2-stat-lbl">Median Sale Price</span>
              </div>
              <div className="hero-v2-stat">
                <span className="hero-v2-stat-num">{ms?.avgDaysToClose ?? qs('Avg Days on Market', '45')}</span>
                <span className="hero-v2-stat-lbl">Avg Days to Close</span>
              </div>
            </div>
            <a href="#listings" className="hero-v2-cta">Search Homes in Neo</a>
          </div>
        </div>
      </header>

      <div className="hero-v2-qfb">
        <div className="container">
          <div className="hero-v2-qfb-row">
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <span><strong>ZIP:</strong> 89012</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              <span><strong>Type:</strong> Luxury · New Construction</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
              <span><strong>Price Range:</strong> $2.34M–$4.97M</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
              <span><strong>HOA:</strong> $400–$900/mo</span>
            </div>
          </div>
          <div className="hero-v2-qfb-est">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            <span>Est. 2023</span>
          </div>
        </div>
      </div>

      <section id="demographics" className="demographics-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Demographics</span>
            <h2>Neo Demographics</h2>
          </div>
          <div className="demo-grid">
            {[
              ['~200', 'Population'],
              ['48', 'Median Age'],
              ['$400,000+', 'Avg Household Income'],
              ['~80', 'Total Households'],
              ['95%', 'Homeownership Rate'],
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
            <h2>Where is Neo?</h2>
            <p>MacDonald Highlands, Henderson &mdash; Henderson, Nevada.</p>
          </div>
          <div className="map-container">
            <NeoMacdonaldHighlandsMapWrapper />
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
            <h2 className="listings-title">NEW NEO LISTINGS</h2>
          </div>
          <div className="ylopo-wrap">
            <div className="YLOPO_searchWidget" />
            <div className="YLOPO_resultsWidget" data-search='{"propertyTypes":["house","condo","townhouse"],"minPrice":2000000,"locations":[{"city":"Henderson","state":"NV"}],"limit":12,"sortBy":"listDate","sortOrder":"desc","keywords":"MacDonald Highlands Neo","zipCodes":["89012"]}' />
          </div>
          <p className="ylopo-note">Listing data sourced from regional MLS. Information deemed reliable but not guaranteed. Updated daily.</p>
          <div className="listings-actions">
            <a href="https://search.nevadarealestategroup.net/search?s[orderBy]=sourceCreationDate%2Cdesc&s[page]=1&s[locations][0][city]=Henderson&s[locations][0][state]=NV&s[keywords]=MacDonald%20Highlands%20Neo" target="_blank" rel="noopener noreferrer" className="btn-gold">View All Neo Listings &rarr;</a>
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
                  <p>Neo is one of the newest luxury enclaves within MacDonald Highlands, Henderson's most prestigious mountainside community. Positioned along the ridgeline of the McCullough Range, Neo delivers the panoramic Las Vegas Strip and valley views that MacDonald Highlands is famous for, paired with brand-new construction and contemporary desert architecture that appeals to today's luxury buyer.</p>
                  <p>Homes in Neo range from approximately $2.34 million to $4.97 million, featuring open floor plans with 3,500 to 6,000+ square feet of living space. The residences showcase modern desert-contemporary design with clean lines, floor-to-ceiling glass walls, soaring ceilings, and seamless indoor-outdoor living. Premium finishes include imported stone, custom cabinetry, Wolf and Sub-Zero appliance packages, and smart-home automation throughout.</p>
                  <p>As part of the MacDonald Highlands master plan, Neo residents enjoy full access to DragonRidge Country Club — an 18-hole Tom Fazio-designed championship course that is widely regarded as one of the best private clubs in Nevada. The clubhouse offers fine dining, resort-style pools, tennis and pickleball courts, a fitness center, and a robust social calendar. Club membership is available but not required for homeownership.</p>
                  <p>The community benefits from MacDonald Highlands' guard-gated security with 24-hour staffed entry, creating an enclave of privacy within an already exclusive community. Henderson's infrastructure is minutes away via Horizon Ridge Parkway, with the I-215 beltway providing a direct corridor to the Strip, Harry Reid International Airport, and the valley's best shopping and dining destinations.</p>
                </>
              )}
            </div>
            <div className="overview-aside">
              <div className="quick-facts">
                <h3>Neo At a Glance</h3>
                {displayStats.map(([label, value, cls]: any) => (
                  <div className="fact-row" key={label}>
                    <span className="fact-label">{label}</span>
                    <span className={`fact-value${cls ? ' ' + cls : ''}`}>{value}</span>
                  </div>
                ))}
              </div>
              <div className="cta-card">
                <p>Ready to explore Neo? Schedule a private tour of the community and the current listings that match your goals.</p>
                <a href="tel:+17252399950" className="btn-gold">Call 725.239.9950</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="highlights">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Why Neo</span>
            <h2>What Makes Neo Stand Out</h2>
          </div>
          <div className="highlights-grid">
            {[
              { title: 'Brand-New Construction', body: 'Neo offers the rare opportunity to purchase new luxury construction within the established MacDonald Highlands community. Contemporary desert homes delivered from 2023 onward.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
              { title: 'DragonRidge Country Club', body: 'Access to the Tom Fazio-designed 18-hole championship course, fine dining clubhouse, resort pools, tennis, fitness center, and a full social calendar.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 2v10l7 4"/></svg> },
              { title: 'Guard-Gated Security', body: 'Double-gated entry — MacDonald Highlands\' main guard gate plus Neo\'s own controlled access provide an extraordinary level of privacy and security.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
              { title: 'Panoramic Strip Views', body: 'Elevated ridgeline lots deliver unobstructed panoramic views of the Las Vegas Strip, the entire valley, and the Spring Mountains from nearly every home.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M8 21l4-11 4 11"/><path d="M2 21l5-14 4 8"/><path d="M14 15l4-8 4 14"/><line x1="2" y1="21" x2="22" y2="21"/></svg> },
              { title: 'Contemporary Desert Design', body: 'Floor-to-ceiling glass, disappearing wall systems, flat rooflines, and premium finishes define Neo\'s architectural character. Smart-home technology comes standard.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><line x1="8" y1="6" x2="8" y2="6.01"/><line x1="12" y1="6" x2="12" y2="6.01"/><line x1="16" y1="6" x2="16" y2="6.01"/><line x1="8" y1="10" x2="8" y2="10.01"/><line x1="12" y1="10" x2="12" y2="10.01"/><line x1="16" y1="10" x2="16" y2="10.01"/><line x1="8" y1="14" x2="8" y2="14.01"/><line x1="12" y1="14" x2="12" y2="14.01"/><line x1="16" y1="14" x2="16" y2="14.01"/></svg> },
              { title: 'Henderson Premium Location', body: 'Minutes to I-215, The District at Green Valley Ranch, and top-rated Henderson schools. Henderson is consistently ranked among the safest large cities in America.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg> },
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

      <NeoMacdonaldHighlandsFAQ />

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
              { name: 'MacDonald Highlands', href: '/macdonald-highlands/', price: 'From $800K', compare: 'The broader MacDonald Highlands master plan with DragonRidge Country Club and multiple luxury enclaves.' },
              { name: 'Dragon Rock', href: '/dragon-rock/', price: 'From $5M', compare: 'Ultra-luxury double guard-gated Blue Heron enclave within MacDonald Highlands.' },
              { name: 'Ascaya', href: '/ascaya/', price: 'From $3M', compare: 'Henderson\'s other ultra-luxury custom lot community on the McCullough Range ridgeline.' },
              { name: 'Seven Hills', href: '/seven-hills/', price: 'From $500K', compare: 'Guard-gated Henderson community with Rio Secco golf and Strip views at a broader price range.' },
              { name: 'Anthem Country Club', href: '/anthem-country-club/', price: 'From $1.2M', compare: 'Guard-gated golf community in the Henderson foothills with Hale Irwin course.' },
              { name: 'The Ridges', href: '/summerlin-the-ridges/', price: 'From $2M', compare: 'Summerlin\'s ultra-luxury guard-gated enclave with Bear\'s Best golf and Red Rock views.' },
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
              <h2>Ready to Find Your Neo Home?</h2>
              <p>Nevada Real Estate Group is the #1 real estate team in Nevada. Whether you&apos;re buying or selling in Neo, let&apos;s talk.</p>
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
                <input type="hidden" name="_subject" value="Neo Inquiry — LasVegasHomeSearchExperts.com" />
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
