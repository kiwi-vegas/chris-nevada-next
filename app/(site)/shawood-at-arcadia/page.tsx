import ShawoodAtArcadiaFAQ from '@/components/ShawoodAtArcadiaFAQ'
import Link from 'next/link'
import type { Metadata } from 'next'
import ShawoodAtArcadiaMapWrapper from '@/components/ShawoodAtArcadiaMapWrapper'
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
    { '@type': 'ListItem', position: 3, name: 'SHAWOOD at Arcadia', item: 'https://www.lasvegashomesearchexperts.com/shawood-at-arcadia/' },
  ],
}

const FAQ_DATA = [
  {
    "q": "What is SHAWOOD construction?",
    "a": "SHAWOOD is Sekisui House's proprietary precision-engineered steel-frame construction system. Panels are manufactured in controlled facilities and assembled on-site with millimeter-level tolerances, resulting in superior structural integrity and fit-and-finish compared to conventional stick-frame construction."
  },
  {
    "q": "What is the price range for homes at SHAWOOD at Arcadia?",
    "a": "Homes at SHAWOOD at Arcadia start from $1.56 million and can exceed $2.5 million or more for the largest estate-style homes on premium view lots."
  },
  {
    "q": "Who is Sekisui House?",
    "a": "Sekisui House is Japan's largest homebuilder and one of the most respected construction companies in the world. SHAWOOD at Arcadia represents their first U.S. residential community, bringing decades of precision engineering expertise to the Las Vegas market."
  },
  {
    "q": "Is SHAWOOD at Arcadia guard-gated?",
    "a": "Yes. SHAWOOD at Arcadia is a guard-gated community within Summerlin with 24-hour security and controlled access. The community is limited to approximately 75 homes."
  },
  {
    "q": "What ZIP code is SHAWOOD at Arcadia in?",
    "a": "SHAWOOD at Arcadia is located in ZIP code 89135 in the Summerlin South area of Las Vegas."
  },
  {
    "q": "What makes SHAWOOD homes different from other luxury homes?",
    "a": "SHAWOOD homes use precision-engineered steel frames with millimeter tolerances (vs. typical construction tolerances of 1/4 inch or more), Japanese 'slow living' design philosophy, integrated smart-home systems, and premium imported fixtures as standard features."
  },
  {
    "q": "What are HOA fees at SHAWOOD at Arcadia?",
    "a": "HOA fees typically range from $400 to $800 per month, covering guard gate staffing, security, community garden maintenance, and the Summerlin master association fee."
  },
  {
    "q": "How many homes will be in SHAWOOD at Arcadia?",
    "a": "SHAWOOD at Arcadia is a small, exclusive community planned for approximately 75 homes at full buildout, making it one of the most limited luxury enclaves in Summerlin."
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
  name: 'SHAWOOD at Arcadia',
  description: 'SHAWOOD at Arcadia is a guard-gated · luxury · new construction community in Las Vegas, Nevada.',
  geo: { '@type': 'GeoCoordinates', latitude: 36.148, longitude: -115.33 },
  address: { '@type': 'PostalAddress', addressLocality: 'Las Vegas', addressRegion: 'NV', postalCode: '89135', addressCountry: 'US' },
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
  const cms = await getCommunityPage('shawood-at-arcadia')
  return {
    title: cms?.metaTitle ?? 'SHAWOOD at Arcadia Homes for Sale | Nevada Real Estate Group',
    description: cms?.metaDescription ?? 'Browse SHAWOOD at Arcadia homes for sale in Las Vegas, NV. $1.56M+. Schools, HOA, market stats. Nevada Real Estate Group.',
  }
}

export default async function ShawoodAtArcadiaPage() {
  const cms = await getCommunityPage('shawood-at-arcadia')
  const market = getMarketStats('shawood-at-arcadia')
  const ms = market?.stats

  const heroHeadline = cms?.heroHeadline ?? 'SHAWOOD at Arcadia'
  const heroSubtitle = 'Homes for Sale in Las Vegas, Nevada'
  const overviewTitle = cms?.overviewTitle ?? 'SHAWOOD at Arcadia: Guard-Gated · Luxury · New Construction Living in Las Vegas'

  const HARDCODED_STATS: Array<[string, string] | [string, string, string]> = [
    ['Established', '2024'],
    ['Developer', 'Sekisui House'],
    ['Total Acreage', '~30 acres'],
    ['Homes', '75+ at buildout'],
    ['Median Home Price', ms?.medianSalePrice ?? '$1.56M+'],
    ['ZIP Codes', '89135'],
    ['Guard-Gated', 'Yes'],
    ['HOA', '$400–$800/mo'],
  ]
  const displayStats = mergeQuickStats(HARDCODED_STATS, cms?.quickStats)
  const HARDCODED_DRIVE_TIMES = [
    {
        "time": "~20 min",
        "destination": "to the Strip",
        "route": "via Summerlin Pkwy → I-15"
    },
    {
        "time": "~10 min",
        "destination": "to Red Rock Canyon",
        "route": "via W Charleston Blvd"
    },
    {
        "time": "~5 min",
        "destination": "to Downtown Summerlin",
        "route": "via W Charleston Blvd"
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
          <a href="/#communities">Communities</a>
          <span className="breadcrumb-sep">&rsaquo;</span>
          <span>SHAWOOD at Arcadia</span>
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
                <span className="hero-v2-stat-num">{ms?.medianSalePrice ?? qs('Median Home Price', '$1.56M+')}</span>
                <span className="hero-v2-stat-lbl">Median Sale Price</span>
              </div>
              <div className="hero-v2-stat">
                <span className="hero-v2-stat-num">{ms?.avgDaysToClose ?? qs('Avg Days on Market', '45')}</span>
                <span className="hero-v2-stat-lbl">Avg Days to Close</span>
              </div>
            </div>
            <a href="#listings" className="hero-v2-cta">Search Homes in SHAWOOD at Arcadia</a>
          </div>
        </div>
      </header>

      <div className="hero-v2-qfb">
        <div className="container">
          <div className="hero-v2-qfb-row">
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <span><strong>ZIP:</strong> 89135</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              <span><strong>Type:</strong> Guard-Gated · Luxury · New Construction</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
              <span><strong>Price Range:</strong> $1.56M+</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
              <span><strong>HOA:</strong> $400–$800/mo</span>
            </div>
          </div>
          <div className="hero-v2-qfb-est">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            <span>Est. 2024</span>
          </div>
        </div>
      </div>

      <section id="demographics" className="demographics-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Demographics</span>
            <h2>SHAWOOD at Arcadia Demographics</h2>
          </div>
          <div className="demo-grid">
            {[
              ['~150', 'Population'],
              ['48', 'Median Age'],
              ['$350,000+', 'Avg Household Income'],
              ['~75', 'Total Households'],
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
            <h2>Where is SHAWOOD at Arcadia?</h2>
            <p>Summerlin, Las Vegas &mdash; Las Vegas, Nevada.</p>
          </div>
          <div className="map-container">
            <ShawoodAtArcadiaMapWrapper />
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
            <h2 className="listings-title">NEW SHAWOOD AT ARCADIA LISTINGS</h2>
          </div>
          <div className="ylopo-wrap">
            <div className="YLOPO_searchWidget" />
            <div className="YLOPO_resultsWidget" data-search='{"propertyTypes":["house","condo","townhouse"],"minPrice":1560000,"locations":[{"city":"Las Vegas","state":"NV"}],"limit":12,"sortBy":"listDate","sortOrder":"desc","keywords":"SHAWOOD Arcadia Summerlin","zipCodes":["89135"]}' />
          </div>
          <p className="ylopo-note">Listing data sourced from regional MLS. Information deemed reliable but not guaranteed. Updated daily.</p>
          <div className="listings-actions">
            <a href="https://search.nevadarealestategroup.net/search?s[orderBy]=sourceCreationDate%2Cdesc&s[page]=1&s[locations][0][city]=Las%20Vegas&s[locations][0][state]=NV&s[keywords]=SHAWOOD%20Arcadia%20Summerlin" target="_blank" rel="noopener noreferrer" className="btn-gold">View All SHAWOOD at Arcadia Listings &rarr;</a>
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
                  <p>SHAWOOD at Arcadia is one of the most distinctive luxury communities in Las Vegas, representing the first U.S. residential development by Sekisui House — Japan's largest homebuilder and a global leader in precision-engineered, sustainable luxury construction. Located within the guard-gated Summerlin master plan, SHAWOOD brings an entirely new level of build quality to the Las Vegas market with homes starting from $1.56 million.</p>
                  <p>The SHAWOOD construction system uses precision-milled steel-framed panels manufactured in Sekisui House's facilities and assembled on-site, resulting in homes with tolerances measured in millimeters rather than inches. The result is a level of fit, finish, and structural integrity that surpasses conventional American stick-frame construction. Each home undergoes rigorous quality inspections at multiple stages of the build process.</p>
                  <p>Homes in SHAWOOD at Arcadia range from approximately 3,200 to 5,000+ square feet with floor plans designed around the Japanese concept of 'slow living' — seamless indoor-outdoor flow, natural light optimization, courtyard gardens, and spaces designed for contemplation and comfort. Premium standard features include multi-slide glass walls, floating cabinetry, integrated smart-home systems, and imported fixtures and materials.</p>
                  <p>The guard-gated setting provides security and exclusivity, while the Summerlin address gives residents access to the master plan's 150+ miles of trails, Downtown Summerlin shopping, Red Rock Canyon, and championship golf courses. SHAWOOD at Arcadia appeals to discerning buyers who value world-class construction quality, architectural innovation, and a fundamentally different approach to luxury homebuilding.</p>
                </>
              )}
            </div>
            <div className="overview-aside">
              <div className="quick-facts">
                <h3>SHAWOOD at Arcadia At a Glance</h3>
                {displayStats.map(([label, value, cls]: any) => (
                  <div className="fact-row" key={label}>
                    <span className="fact-label">{label}</span>
                    <span className={`fact-value${cls ? ' ' + cls : ''}`}>{value}</span>
                  </div>
                ))}
              </div>
              <div className="cta-card">
                <p>Ready to explore SHAWOOD at Arcadia? Schedule a private tour of the community and the current listings that match your goals.</p>
                <a href="tel:+17252399950" className="btn-gold">Call 725.239.9950</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="highlights">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Why SHAWOOD at Arcadia</span>
            <h2>What Makes SHAWOOD at Arcadia Stand Out</h2>
          </div>
          <div className="highlights-grid">
            {[
              { title: 'Sekisui House Quality', body: 'Built by Japan\'s largest homebuilder using the precision-engineered SHAWOOD steel-frame system. Millimeter-level tolerances and rigorous multi-stage quality inspections.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
              { title: 'Guard-Gated Exclusivity', body: 'A private guard-gated enclave within Summerlin limited to approximately 75 homes. 24-hour security ensures privacy for an exclusive residential experience.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
              { title: 'Japanese Design Philosophy', body: 'Homes designed around \'slow living\' principles: seamless indoor-outdoor flow, natural light optimization, courtyard gardens, and contemplative spaces.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><line x1="8" y1="6" x2="8" y2="6.01"/><line x1="12" y1="6" x2="12" y2="6.01"/><line x1="16" y1="6" x2="16" y2="6.01"/><line x1="8" y1="10" x2="8" y2="10.01"/><line x1="12" y1="10" x2="12" y2="10.01"/><line x1="16" y1="10" x2="16" y2="10.01"/><line x1="8" y1="14" x2="8" y2="14.01"/><line x1="12" y1="14" x2="12" y2="14.01"/><line x1="16" y1="14" x2="16" y2="14.01"/></svg> },
              { title: 'Premium Standard Features', body: 'Multi-slide glass walls, floating cabinetry, integrated smart-home systems, and imported fixtures come standard — not as expensive upgrades.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
              { title: 'Sustainable Construction', body: 'Sekisui House is a global leader in sustainable building. SHAWOOD homes feature advanced energy efficiency, reduced waste construction, and environmentally responsible materials.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22c4-4 8-7.5 8-12a8 8 0 10-16 0c0 4.5 4 8 8 12z"/><circle cx="12" cy="10" r="3"/></svg> },
              { title: 'Rare Investment', body: 'The first Sekisui House community in the U.S. residential market. Limited inventory and a construction method unavailable anywhere else in Las Vegas.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg> },
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

      <ShawoodAtArcadiaFAQ />

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
              { name: 'The Ridges', href: '/summerlin-the-ridges/', price: 'From $2M', compare: 'Summerlin\'s ultra-luxury guard-gated enclave with Bear\'s Best golf and custom estates.' },
              { name: 'Mira Villa', href: '/mira-villa/', price: 'From $1M', compare: 'Guard-gated luxury new construction in Summerlin at a more accessible price point.' },
              { name: 'Mesa Ridge', href: '/mesa-ridge/', price: 'From $1M', compare: 'Toll Brothers guard-gated community in Summerlin with semi-custom luxury homes.' },
              { name: 'The Summit Club', href: '/the-summit-club/', price: 'From $5M', compare: 'The most exclusive private community in Las Vegas with Tom Fazio golf.' },
              { name: 'Red Rock Country Club', href: '/red-rock-country-club/', price: 'From $1.2M', compare: 'Guard-gated golf community within Summerlin with two Arnold Palmer courses.' },
              { name: 'Summerlin', href: '/summerlin/', price: 'From $450K', compare: 'The broader master-planned community with 20+ villages and every price point.' },
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
              <h2>Ready to Find Your SHAWOOD at Arcadia Home?</h2>
              <p>Nevada Real Estate Group is the #1 real estate team in Nevada. Whether you&apos;re buying or selling in SHAWOOD at Arcadia, let&apos;s talk.</p>
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
                <input type="hidden" name="_subject" value="SHAWOOD at Arcadia Inquiry — LasVegasHomeSearchExperts.com" />
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
