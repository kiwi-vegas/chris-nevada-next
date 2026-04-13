import TheFountainsFAQ from '@/components/TheFountainsFAQ'
import Link from 'next/link'
import type { Metadata } from 'next'
import TheFountainsMapWrapper from '@/components/TheFountainsMapWrapper'
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
    { '@type': 'ListItem', position: 3, name: 'The Fountains', item: 'https://www.lasvegashomesearchexperts.com/the-fountains/' },
  ],
}

const FAQ_DATA = [
  {
    "q": "What is the price range for homes in The Fountains?",
    "a": "Homes in The Fountains range from approximately $800,000 for smaller semi-custom resales to $3 million for expansive custom estates on premium lots with resort-style outdoor living."
  },
  {
    "q": "Is The Fountains guard-gated?",
    "a": "Yes. The Fountains is a fully guard-gated community with a 24-hour staffed guard gate and security patrols. It has been one of Henderson's most prestigious guard-gated addresses for over 25 years."
  },
  {
    "q": "What ZIP code is The Fountains in?",
    "a": "The Fountains is located in ZIP code 89074 in Henderson, Nevada, within the Green Valley corridor."
  },
  {
    "q": "How large are lots in The Fountains?",
    "a": "The Fountains has some of the most generous lot sizes in Henderson's guard-gated communities, ranging from quarter-acre to half-acre parcels. This allows for resort-style pools, motor courts, guest casitas, and expansive outdoor living spaces."
  },
  {
    "q": "What are HOA fees in The Fountains?",
    "a": "HOA fees in The Fountains typically range from $250 to $600 per month, covering 24-hour guard gate staffing, security patrols, common area maintenance, and the community's signature landscaped entrance."
  },
  {
    "q": "How does The Fountains compare to Legacy at Green Valley?",
    "a": "Both are guard-gated luxury communities in Green Valley. Legacy at Green Valley is centered on the Legacy Golf Course and has a slightly lower price floor ($700K). The Fountains has larger lots, no golf course but more estate-style living, and a higher price ceiling reaching $3M."
  },
  {
    "q": "What schools serve The Fountains?",
    "a": "The Fountains is served by CCSD schools including Coronado High School (8/10), Del E. Webb Middle School (8/10), and Vanderburg Elementary (9/10). Private options include Henderson International School and Bishop Gorman."
  },
  {
    "q": "Is The Fountains a good investment?",
    "a": "The Fountains has been one of Henderson's most stable luxury addresses for over 25 years. Limited inventory (400+ homes), large lots, guard-gated prestige, and consistent executive-buyer demand support strong appreciation and resale values."
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
  name: 'The Fountains',
  description: 'The Fountains is a guard-gated · luxury community in Henderson, Nevada.',
  geo: { '@type': 'GeoCoordinates', latitude: 36.05, longitude: -115.072 },
  address: { '@type': 'PostalAddress', addressLocality: 'Henderson', addressRegion: 'NV', postalCode: '89074', addressCountry: 'US' },
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
  const cms = await getCommunityPage('the-fountains')
  return {
    title: cms?.metaTitle ?? 'The Fountains Homes for Sale | Nevada Real Estate Group',
    description: cms?.metaDescription ?? 'Browse The Fountains homes for sale in Henderson, NV. $800K–$3M. Schools, HOA, market stats. Nevada Real Estate Group.',
  }
}

export default async function TheFountainsPage() {
  const cms = await getCommunityPage('the-fountains')
  const market = getMarketStats('the-fountains')
  const ms = market?.stats

  const heroHeadline = cms?.heroHeadline ?? 'The Fountains'
  const heroSubtitle = 'Homes for Sale in Henderson, Nevada'
  const overviewTitle = cms?.overviewTitle ?? 'The Fountains: Guard-Gated · Luxury Living in Henderson'

  const HARDCODED_STATS: Array<[string, string] | [string, string, string]> = [
    ['Established', '1995'],
    ['Developer', 'American Nevada Corporation'],
    ['Total Acreage', '250 acres'],
    ['Homes', '400+'],
    ['Median Home Price', ms?.medianSalePrice ?? '$800K–$3M'],
    ['ZIP Codes', '89074'],
    ['Guard-Gated', 'Yes'],
    ['HOA', '$250–$600/mo'],
  ]
  const displayStats = mergeQuickStats(HARDCODED_STATS, cms?.quickStats)
  const HARDCODED_DRIVE_TIMES = [
    {
        "time": "~15 min",
        "destination": "to the Strip",
        "route": "via I-215 W → I-15 N"
    },
    {
        "time": "~15 min",
        "destination": "to Harry Reid Airport",
        "route": "via I-215 W"
    },
    {
        "time": "~10 min",
        "destination": "to Henderson Downtown",
        "route": "via Eastern Ave"
    },
    {
        "time": "~30 min",
        "destination": "to Summerlin",
        "route": "via I-215 W"
    },
    {
        "time": "~4.5 hrs",
        "destination": "to Los Angeles",
        "route": "via I-15 S"
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
          <span>The Fountains</span>
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
                <span className="hero-v2-stat-num">{ms?.medianSalePrice ?? qs('Median Home Price', '$800K–$3M')}</span>
                <span className="hero-v2-stat-lbl">Median Sale Price</span>
              </div>
              <div className="hero-v2-stat">
                <span className="hero-v2-stat-num">{ms?.avgDaysToClose ?? qs('Avg Days on Market', '45')}</span>
                <span className="hero-v2-stat-lbl">Avg Days to Close</span>
              </div>
            </div>
            <a href="#listings" className="hero-v2-cta">Search Homes in The Fountains</a>
          </div>
        </div>
      </header>

      <div className="hero-v2-qfb">
        <div className="container">
          <div className="hero-v2-qfb-row">
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <span><strong>ZIP:</strong> 89074</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              <span><strong>Type:</strong> Guard-Gated · Luxury</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
              <span><strong>Price Range:</strong> $800K–$3M</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
              <span><strong>HOA:</strong> $250–$600/mo</span>
            </div>
          </div>
          <div className="hero-v2-qfb-est">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            <span>Est. 1995</span>
          </div>
        </div>
      </div>

      <section id="demographics" className="demographics-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Demographics</span>
            <h2>The Fountains Demographics</h2>
          </div>
          <div className="demo-grid">
            {[
              ['1,200+', 'Population'],
              ['48', 'Median Age'],
              ['$225,000+', 'Avg Household Income'],
              ['400+', 'Total Households'],
              ['90%', 'Homeownership Rate'],
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
            <h2>Where is The Fountains?</h2>
            <p>Green Valley, Henderson &mdash; Henderson, Nevada.</p>
          </div>
          <div className="map-container">
            <TheFountainsMapWrapper />
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
            <h2 className="listings-title">NEW THE FOUNTAINS LISTINGS</h2>
          </div>
          <div className="ylopo-wrap">
            <div className="YLOPO_searchWidget" />
            <div className="YLOPO_resultsWidget" data-search='{"propertyTypes":["house","condo","townhouse"],"minPrice":800000,"locations":[{"city":"Henderson","state":"NV"}],"limit":12,"sortBy":"listDate","sortOrder":"desc","keywords":"The Fountains Henderson","zipCodes":["89074"]}' />
          </div>
          <p className="ylopo-note">Listing data sourced from regional MLS. Information deemed reliable but not guaranteed. Updated daily.</p>
          <div className="listings-actions">
            <a href="https://search.nevadarealestategroup.net/search?s[orderBy]=sourceCreationDate%2Cdesc&s[page]=1&s[locations][0][city]=Henderson&s[locations][0][state]=NV&s[keywords]=The%20Fountains%20Henderson" target="_blank" rel="noopener noreferrer" className="btn-gold">View All The Fountains Listings &rarr;</a>
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
                  <p>The Fountains is a guard-gated luxury community in Henderson's Green Valley, known for its spacious custom and semi-custom homes, mature landscaping, and one of the most prestigious residential addresses in the Green Valley corridor. Developed in the mid-1990s, The Fountains was conceived as a premier residential enclave for affluent families, executives, and professionals seeking guard-gated privacy and large-lot estate living within a convenient Henderson location.</p>
                  <p>Homes in The Fountains range from approximately $800,000 for smaller semi-custom resales to $3 million for expansive custom estates on premium corner or cul-de-sac lots. The community's lot sizes are among the most generous in Henderson's guard-gated communities — many homes sit on quarter-acre to half-acre parcels, allowing for resort-style pools, outdoor living rooms, motor courts, and guest casitas. Homes typically range from 3,000 to 7,000+ square feet.</p>
                  <p>The architectural character of The Fountains blends Mediterranean, Tuscan, and desert contemporary styles, with the newer custom builds trending toward modern clean-line design with floor-to-ceiling glass and indoor-outdoor living. The community's namesake fountains, manicured entrance boulevard, and mature landscape create a resort-like atmosphere that begins the moment you pass through the guard gate.</p>
                  <p>The Fountains benefits from a central Henderson location near the intersection of Eastern Avenue and Paseo Verde Parkway. The District at Green Valley Ranch, Paseo Verde Park, Henderson Hospital, and multiple dining and retail options are all within a short drive. Harry Reid International Airport and the Las Vegas Strip are approximately 15 minutes away. For luxury buyers who want large-lot estate living with guard-gated security in a proven, established Henderson location, The Fountains is one of the Green Valley area's premier choices.</p>
                </>
              )}
            </div>
            <div className="overview-aside">
              <div className="quick-facts">
                <h3>The Fountains At a Glance</h3>
                {displayStats.map(([label, value, cls]: any) => (
                  <div className="fact-row" key={label}>
                    <span className="fact-label">{label}</span>
                    <span className={`fact-value${cls ? ' ' + cls : ''}`}>{value}</span>
                  </div>
                ))}
              </div>
              <div className="cta-card">
                <p>Ready to explore The Fountains? Schedule a private tour of the community and the current listings that match your goals.</p>
                <a href="tel:+17252399950" className="btn-gold">Call 725.239.9950</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="highlights">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Why The Fountains</span>
            <h2>What Makes The Fountains Stand Out</h2>
          </div>
          <div className="highlights-grid">
            {[
              { title: 'Guard-Gated Estate Living', body: '24-hour staffed guard gate with security patrols. One of Henderson\'s premier guard-gated addresses with over 25 years of established luxury residential history.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
              { title: 'Large Custom Lots', body: 'Among the most generous lot sizes in Henderson\'s guard-gated communities — quarter-acre to half-acre parcels supporting resort-style pools, motor courts, and guest casitas.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
              { title: 'Mature Resort Landscaping', body: 'Over 25 years of growth have created a lush, resort-like environment with mature trees, manicured common areas, and the community\'s signature fountain boulevard.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22c4-4 8-7.5 8-12a8 8 0 10-16 0c0 4.5 4 8 8 12z"/><circle cx="12" cy="10" r="3"/></svg> },
              { title: 'Central Henderson Location', body: 'Near Eastern Avenue and Paseo Verde Parkway with direct access to The District at Green Valley Ranch, Henderson Hospital, and major dining and retail.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><line x1="8" y1="6" x2="8" y2="6.01"/><line x1="12" y1="6" x2="12" y2="6.01"/><line x1="16" y1="6" x2="16" y2="6.01"/><line x1="8" y1="10" x2="8" y2="10.01"/><line x1="12" y1="10" x2="12" y2="10.01"/><line x1="16" y1="10" x2="16" y2="10.01"/><line x1="8" y1="14" x2="8" y2="14.01"/><line x1="12" y1="14" x2="12" y2="14.01"/><line x1="16" y1="14" x2="16" y2="14.01"/></svg> },
              { title: 'Diverse Architecture', body: 'Mediterranean, Tuscan, and modern desert contemporary homes create an architecturally diverse streetscape. Newer custom builds feature floor-to-ceiling glass and indoor-outdoor living.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
              { title: 'Strong Appreciation', body: 'The Fountains has demonstrated consistent appreciation thanks to limited inventory, large lots, guard-gated prestige, and strong demand from executives and high-net-worth families.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg> },
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

      <TheFountainsFAQ />

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
              { name: 'Green Valley South', href: '/green-valley-south/', price: 'From $350K', compare: 'The broader Green Valley area surrounding The Fountains with options at every price point.' },
              { name: 'Legacy at Green Valley', href: '/legacy-green-valley/', price: 'From $700K', compare: 'Guard-gated golf community nearby with Legacy Golf Course frontage at slightly lower entry.' },
              { name: 'Quail Ridge Estates', href: '/quail-ridge-estates/', price: 'From $1M', compare: 'Nearby guard-gated luxury community with even higher price points and custom estate lots.' },
              { name: 'Seven Hills', href: '/seven-hills/', price: 'From $500K', compare: 'Established Henderson community with Rio Secco golf and 25 distinct neighborhoods.' },
              { name: 'Anthem Country Club', href: '/anthem-country-club/', price: 'From $1.2M', compare: 'Guard-gated private golf community in Anthem. Newer with private Hale Irwin course.' },
              { name: 'MacDonald Highlands', href: '/macdonald-highlands/', price: 'From $800K', compare: 'Henderson\'s premier elevated luxury community with DragonRidge Country Club and panoramic views.' },
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
              <h2>Ready to Find Your The Fountains Home?</h2>
              <p>Nevada Real Estate Group is the #1 real estate team in Nevada. Whether you&apos;re buying or selling in The Fountains, let&apos;s talk.</p>
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
                <input type="hidden" name="_subject" value="The Fountains Inquiry — LasVegasHomeSearchExperts.com" />
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
