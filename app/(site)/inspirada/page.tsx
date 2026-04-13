import InspiradaFAQ from '@/components/InspiradaFAQ'
import Link from 'next/link'
import type { Metadata } from 'next'
import InspiradaMapWrapper from '@/components/InspiradaMapWrapper'
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
    { '@type': 'ListItem', position: 3, name: 'Inspirada', item: 'https://www.lasvegashomesearchexperts.com/inspirada/' },
  ],
}

const FAQ_DATA = [
  {
    "q": "What is the price range for homes in Inspirada?",
    "a": "Homes in Inspirada range from approximately $420,000 for entry-level new construction to over $1.1 million for premium luxury homes by Toll Brothers and other top builders."
  },
  {
    "q": "Is Inspirada guard-gated?",
    "a": "No. Inspirada is not a guard-gated community. It is an open master-planned community with HOA governance, maintained common areas, and the safety benefits of Henderson — one of America's safest large cities."
  },
  {
    "q": "Is Inspirada still building new homes?",
    "a": "Yes. Inspirada continues to offer new construction from multiple national builders including Toll Brothers, Lennar, and Century Communities across several active neighborhoods."
  },
  {
    "q": "What ZIP code is Inspirada in?",
    "a": "Inspirada is located in ZIP code 89044 in Henderson, Nevada."
  },
  {
    "q": "What are HOA fees in Inspirada?",
    "a": "HOA fees in Inspirada typically range from $100 to $250 per month, covering access to community parks, pools, trails, gathering spaces, and common area maintenance."
  },
  {
    "q": "What schools serve Inspirada?",
    "a": "Inspirada is served by CCSD schools including Elise L. Wolff Elementary (6/10), Del E. Webb Middle School (7/10), and Liberty High School (6/10). Charter options include Doral Academy (9/10) and Somerset Academy (8/10)."
  },
  {
    "q": "What amenities does Inspirada offer?",
    "a": "Inspirada features over 600 acres of open space, resort-style pools, splash pads, landscaped plazas with fire features, sports courts, playgrounds, and miles of interconnected walking and biking trails connecting every neighborhood."
  },
  {
    "q": "How does Inspirada compare to Cadence?",
    "a": "Both are newer Henderson master plans with new construction. Inspirada emphasizes community design, gathering spaces, and open space (600+ acres). Cadence is newer and more centrally located with fiber internet and a sports complex. Inspirada's price range starts slightly higher ($420K vs $350K)."
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
  name: 'Inspirada',
  description: 'Inspirada is a master-planned · new construction community in Henderson, Nevada.',
  geo: { '@type': 'GeoCoordinates', latitude: 35.975, longitude: -115.076 },
  address: { '@type': 'PostalAddress', addressLocality: 'Henderson', addressRegion: 'NV', postalCode: '89044', addressCountry: 'US' },
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
  const cms = await getCommunityPage('inspirada')
  return {
    title: cms?.metaTitle ?? 'Inspirada Homes for Sale | Nevada Real Estate Group',
    description: cms?.metaDescription ?? 'Browse Inspirada homes for sale in Henderson, NV. $420K–$1.1M+. Schools, HOA, market stats. Nevada Real Estate Group.',
  }
}

export default async function InspiradaPage() {
  const cms = await getCommunityPage('inspirada')
  const market = getMarketStats('inspirada')
  const ms = market?.stats

  const heroHeadline = cms?.heroHeadline ?? 'Inspirada'
  const heroSubtitle = 'Homes for Sale in Henderson, Nevada'
  const overviewTitle = cms?.overviewTitle ?? 'Inspirada: Master-Planned · New Construction Living in Henderson'

  const HARDCODED_STATS: Array<[string, string] | [string, string, string]> = [
    ['Established', '2007'],
    ['Developer', 'Focus Property Group / Multiple builders'],
    ['Total Acreage', '1,700 acres'],
    ['Homes', '5,000+'],
    ['Median Home Price', ms?.medianSalePrice ?? '$420K–$1.1M+'],
    ['ZIP Codes', '89044'],
    ['Guard-Gated', 'No'],
    ['HOA', '$100–$250/mo'],
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
        "destination": "to Henderson Pavilion",
        "route": "via St. Rose Pkwy"
    },
    {
        "time": "~20 min",
        "destination": "to Harry Reid Airport",
        "route": "via I-215 → I-15"
    },
    {
        "time": "~10 min",
        "destination": "to Galleria at Sunset",
        "route": "via Eastern Ave"
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
          <span>Inspirada</span>
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
                <span className="hero-v2-stat-num">{ms?.medianSalePrice ?? qs('Median Home Price', '$420K–$1.1M+')}</span>
                <span className="hero-v2-stat-lbl">Median Sale Price</span>
              </div>
              <div className="hero-v2-stat">
                <span className="hero-v2-stat-num">{ms?.avgDaysToClose ?? qs('Avg Days on Market', '45')}</span>
                <span className="hero-v2-stat-lbl">Avg Days to Close</span>
              </div>
            </div>
            <a href="#listings" className="hero-v2-cta">Search Homes in Inspirada</a>
          </div>
        </div>
      </header>

      <div className="hero-v2-qfb">
        <div className="container">
          <div className="hero-v2-qfb-row">
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <span><strong>ZIP:</strong> 89044</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              <span><strong>Type:</strong> Master-Planned · New Construction</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
              <span><strong>Price Range:</strong> $420K–$1.1M+</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
              <span><strong>HOA:</strong> $100–$250/mo</span>
            </div>
          </div>
          <div className="hero-v2-qfb-est">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            <span>Est. 2007</span>
          </div>
        </div>
      </div>

      <section id="demographics" className="demographics-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Demographics</span>
            <h2>Inspirada Demographics</h2>
          </div>
          <div className="demo-grid">
            {[
              ['~14,000', 'Population'],
              ['37', 'Median Age'],
              ['$95,000', 'Avg Household Income'],
              ['~5,000', 'Total Households'],
              ['75%', 'Homeownership Rate'],
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
            <h2>Where is Inspirada?</h2>
            <p>Henderson, Nevada &mdash; Henderson, Nevada.</p>
          </div>
          <div className="map-container">
            <InspiradaMapWrapper />
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
            <h2 className="listings-title">NEW INSPIRADA LISTINGS</h2>
          </div>
          <div className="ylopo-wrap">
            <div className="YLOPO_searchWidget" />
            <div className="YLOPO_resultsWidget" data-search='{"propertyTypes":["house","condo","townhouse"],"minPrice":400000,"locations":[{"city":"Henderson","state":"NV"}],"limit":12,"sortBy":"listDate","sortOrder":"desc","keywords":"Inspirada","zipCodes":["89044"]}' />
          </div>
          <p className="ylopo-note">Listing data sourced from regional MLS. Information deemed reliable but not guaranteed. Updated daily.</p>
          <div className="listings-actions">
            <a href="https://search.nevadarealestategroup.net/search?s[orderBy]=sourceCreationDate%2Cdesc&s[page]=1&s[locations][0][city]=Henderson&s[locations][0][state]=NV&s[keywords]=Inspirada" target="_blank" rel="noopener noreferrer" className="btn-gold">View All Inspirada Listings &rarr;</a>
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
                  <p>Inspirada is a premier master-planned community in southern Henderson that has set a new standard for community design in the Las Vegas Valley. Spanning 1,700 acres with over 5,000 homes, Inspirada was built around the idea that great neighborhoods need great gathering spaces — and the community delivers with over 600 acres of open space, interconnected parks, tree-lined pathways, and a series of community plazas that encourage neighbors to connect.</p>
                  <p>The community features a thoughtful mix of architectural styles — from Mediterranean and Spanish Colonial to contemporary desert modern — that gives each neighborhood a distinct character while maintaining a cohesive, visually appealing streetscape. Homes range from approximately $420,000 for entry-level production homes to over $1.1 million for premium homes in the community's luxury enclaves. Builders including Toll Brothers, Lennar, Century Communities, and Beazer have delivered a wide variety of floor plans from 1,400 to 4,500+ square feet.</p>
                  <p>Inspirada's parks and amenities set it apart from other Henderson communities. The community's signature gathering spaces include landscaped plazas with fire features, resort-style pools, splash pads, sports courts, playgrounds, and a network of trails that connect every neighborhood to the community's green spaces. The planned commercial district along St. Rose Parkway brings dining and retail within walking or biking distance of most neighborhoods.</p>
                  <p>Located along the I-215 beltway corridor in southern Henderson, Inspirada provides direct access to the Strip and Harry Reid Airport in approximately 20 minutes. The community is near top-rated Henderson schools, the Henderson Pavilion amphitheater, and the emerging commercial corridor along St. Rose Parkway. For families and professionals seeking a walkable, design-forward community with new construction options, Inspirada is one of the best choices in Henderson.</p>
                </>
              )}
            </div>
            <div className="overview-aside">
              <div className="quick-facts">
                <h3>Inspirada At a Glance</h3>
                {displayStats.map(([label, value, cls]: any) => (
                  <div className="fact-row" key={label}>
                    <span className="fact-label">{label}</span>
                    <span className={`fact-value${cls ? ' ' + cls : ''}`}>{value}</span>
                  </div>
                ))}
              </div>
              <div className="cta-card">
                <p>Ready to explore Inspirada? Schedule a private tour of the community and the current listings that match your goals.</p>
                <a href="tel:+17252399950" className="btn-gold">Call 725.239.9950</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="highlights">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Why Inspirada</span>
            <h2>What Makes Inspirada Stand Out</h2>
          </div>
          <div className="highlights-grid">
            {[
              { title: 'Award-Winning Community Design', body: 'Over 600 acres of open space, landscaped plazas, tree-lined pathways, and signature gathering places. Inspirada has won multiple planning and design awards.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22c4-4 8-7.5 8-12a8 8 0 10-16 0c0 4.5 4 8 8 12z"/><circle cx="12" cy="10" r="3"/></svg> },
              { title: 'New Construction Available', body: 'Active new-home construction from Toll Brothers, Lennar, Century Communities, and other national builders. Floor plans from 1,400 to 4,500+ square feet.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
              { title: 'Connected Trail Network', body: 'Miles of interconnected walking and biking trails link every neighborhood to parks, plazas, schools, and the commercial district. A walkable, active-lifestyle community.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M8 21l4-11 4 11"/><path d="M2 21l5-14 4 8"/><path d="M14 15l4-8 4 14"/><line x1="2" y1="21" x2="22" y2="21"/></svg> },
              { title: 'Community Gathering Spaces', body: 'Landscaped plazas with fire features, resort-style pools, splash pads, and amphitheater-style seating create natural gathering points throughout the community.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><line x1="8" y1="6" x2="8" y2="6.01"/><line x1="12" y1="6" x2="12" y2="6.01"/><line x1="16" y1="6" x2="16" y2="6.01"/><line x1="8" y1="10" x2="8" y2="10.01"/><line x1="12" y1="10" x2="12" y2="10.01"/><line x1="16" y1="10" x2="16" y2="10.01"/><line x1="8" y1="14" x2="8" y2="14.01"/><line x1="12" y1="14" x2="12" y2="14.01"/><line x1="16" y1="14" x2="16" y2="14.01"/></svg> },
              { title: 'I-215 Beltway Access', body: 'Direct access to the I-215 beltway for a clean 20-minute commute to the Strip and Harry Reid Airport. Southern Henderson\'s premier commuter corridor.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg> },
              { title: 'Henderson Safety', body: 'Henderson consistently ranks among the top 10 safest large cities in America. Inspirada benefits from low crime rates and responsive city services.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
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

      <InspiradaFAQ />

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
              { name: 'Anthem', href: '/anthem/', price: 'From $400K', compare: 'Henderson\'s largest master plan with guard-gated golf, 55+, and family neighborhoods. Adjacent to Inspirada.' },
              { name: 'Cadence', href: '/cadence/', price: 'From $350K', compare: 'Henderson\'s other new master-planned community with modern new construction and Central Park.' },
              { name: 'Seven Hills', href: '/seven-hills/', price: 'From $500K', compare: 'Guard-gated Henderson community with Rio Secco golf and Strip views.' },
              { name: 'Green Valley Ranch', href: '/green-valley-ranch/', price: 'From $400K', compare: 'Henderson\'s premier established master plan with parks, top schools, and retail.' },
              { name: 'MacDonald Highlands', href: '/macdonald-highlands/', price: 'From $800K', compare: 'Henderson\'s premier luxury mountainside community with DragonRidge Country Club.' },
              { name: 'Silverado Ranch', href: '/silverado-ranch/', price: 'From $350K', compare: 'Established community with accessible pricing straddling Henderson and Las Vegas.' },
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
              <h2>Ready to Find Your Inspirada Home?</h2>
              <p>Nevada Real Estate Group is the #1 real estate team in Nevada. Whether you&apos;re buying or selling in Inspirada, let&apos;s talk.</p>
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
                <input type="hidden" name="_subject" value="Inspirada Inquiry — LasVegasHomeSearchExperts.com" />
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
