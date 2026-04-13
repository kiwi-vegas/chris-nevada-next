import TheDistrictFAQ from '@/components/TheDistrictFAQ'
import Link from 'next/link'
import type { Metadata } from 'next'
import TheDistrictMapWrapper from '@/components/TheDistrictMapWrapper'
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
    { '@type': 'ListItem', position: 3, name: 'The District at Green Valley Ranch', item: 'https://www.lasvegashomesearchexperts.com/the-district/' },
  ],
}

const FAQ_DATA = [
  {
    "q": "What is the price range for homes at The District?",
    "a": "Condominiums and townhomes at The District range from approximately $300,000 for entry-level condos to $600,000 for premium top-floor penthouses and larger townhomes with upgraded finishes."
  },
  {
    "q": "Is The District guard-gated?",
    "a": "No. The District is not guard-gated. It is an open mixed-use community with walkable streets, ground-floor retail, and residential units above. The community benefits from Henderson's consistently low crime rates."
  },
  {
    "q": "What shopping and dining is at The District?",
    "a": "The District features a curated mix of boutiques, national retailers (REI, Williams-Sonoma, Pottery Barn), specialty food shops, and restaurants. The central green space hosts seasonal markets, live music, and community events."
  },
  {
    "q": "What ZIP code is The District in?",
    "a": "The District at Green Valley Ranch is located in ZIP code 89052 in Henderson, Nevada."
  },
  {
    "q": "What are HOA fees at The District?",
    "a": "HOA fees at The District typically range from $150 to $350 per month, depending on the unit type and size. Fees cover exterior maintenance, landscaping, common area upkeep, and community amenities."
  },
  {
    "q": "Is The District a good investment?",
    "a": "The District offers a unique walkable lifestyle in Henderson that commands consistent rental demand and appreciation. The combination of mixed-use amenities, I-215 access, and Henderson's safety rankings make it attractive to both owner-occupants and investors."
  },
  {
    "q": "Can you walk to restaurants from The District?",
    "a": "Yes. The District was designed as a walkable urban village. Restaurants, shops, and entertainment are at ground level and within walking distance of all residential units. It is one of the few truly walkable communities in the Las Vegas Valley."
  },
  {
    "q": "How close is The District to Green Valley Ranch Resort?",
    "a": "The District is approximately 5 minutes from Green Valley Ranch Resort & Spa, which offers casino gaming, dining, a spa, movie theater, and entertainment — all easily accessible via Green Valley Parkway."
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
  name: 'The District at Green Valley Ranch',
  description: 'The District at Green Valley Ranch is a mixed-use · urban village community in Henderson, Nevada.',
  geo: { '@type': 'GeoCoordinates', latitude: 36.042, longitude: -115.082 },
  address: { '@type': 'PostalAddress', addressLocality: 'Henderson', addressRegion: 'NV', postalCode: '89052', addressCountry: 'US' },
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
  const cms = await getCommunityPage('the-district')
  return {
    title: cms?.metaTitle ?? 'The District at Green Valley Ranch Homes for Sale | Nevada Real Estate Group',
    description: cms?.metaDescription ?? 'Browse The District at Green Valley Ranch homes for sale in Henderson, NV. $300K–$600K. Schools, HOA, market stats. Nevada Real Estate Group.',
  }
}

export default async function TheDistrictPage() {
  const cms = await getCommunityPage('the-district')
  const market = getMarketStats('the-district')
  const ms = market?.stats

  const heroHeadline = cms?.heroHeadline ?? 'The District at Green Valley Ranch'
  const heroSubtitle = 'Homes for Sale in Henderson, Nevada'
  const overviewTitle = cms?.overviewTitle ?? 'The District at Green Valley Ranch: Mixed-Use · Urban Village Living in Henderson'

  const HARDCODED_STATS: Array<[string, string] | [string, string, string]> = [
    ['Established', '2004'],
    ['Developer', 'American Nevada Corporation'],
    ['Total Acreage', '~40 acres'],
    ['Homes', '600+'],
    ['Median Home Price', ms?.medianSalePrice ?? '$300K–$600K'],
    ['ZIP Codes', '89052'],
    ['Guard-Gated', 'No'],
    ['HOA', '$150–$350/mo'],
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
        "destination": "to Harry Reid Airport",
        "route": "via I-215 West"
    },
    {
        "time": "~5 min",
        "destination": "to GVR Resort",
        "route": "via Green Valley Pkwy"
    },
    {
        "time": "~10 min",
        "destination": "to Water Street District",
        "route": "via Lake Mead Pkwy"
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
          <span>The District at Green Valley Ranch</span>
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
                <span className="hero-v2-stat-num">{ms?.medianSalePrice ?? qs('Median Home Price', '$300K–$600K')}</span>
                <span className="hero-v2-stat-lbl">Median Sale Price</span>
              </div>
              <div className="hero-v2-stat">
                <span className="hero-v2-stat-num">{ms?.avgDaysToClose ?? qs('Avg Days on Market', '45')}</span>
                <span className="hero-v2-stat-lbl">Avg Days to Close</span>
              </div>
            </div>
            <a href="#listings" className="hero-v2-cta">Search Homes in The District at Green Valley Ranch</a>
          </div>
        </div>
      </header>

      <div className="hero-v2-qfb">
        <div className="container">
          <div className="hero-v2-qfb-row">
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <span><strong>ZIP:</strong> 89052</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              <span><strong>Type:</strong> Mixed-Use · Urban Village</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
              <span><strong>Price Range:</strong> $300K–$600K</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
              <span><strong>HOA:</strong> $150–$350/mo</span>
            </div>
          </div>
          <div className="hero-v2-qfb-est">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            <span>Est. 2004</span>
          </div>
        </div>
      </div>

      <section id="demographics" className="demographics-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Demographics</span>
            <h2>The District at Green Valley Ranch Demographics</h2>
          </div>
          <div className="demo-grid">
            {[
              ['~1,800', 'Population'],
              ['38', 'Median Age'],
              ['$80,000', 'Avg Household Income'],
              ['~700', 'Total Households'],
              ['55%', 'Homeownership Rate'],
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
            <h2>Where is The District at Green Valley Ranch?</h2>
            <p>Henderson, Nevada &mdash; Henderson, Nevada.</p>
          </div>
          <div className="map-container">
            <TheDistrictMapWrapper />
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
            <h2 className="listings-title">NEW THE DISTRICT AT GREEN VALLEY RANCH LISTINGS</h2>
          </div>
          <div className="ylopo-wrap">
            <div className="YLOPO_searchWidget" />
            <div className="YLOPO_resultsWidget" data-search='{"propertyTypes":["house","condo","townhouse"],"minPrice":250000,"locations":[{"city":"Henderson","state":"NV"}],"limit":12,"sortBy":"listDate","sortOrder":"desc","keywords":"The District Green Valley","zipCodes":["89052"]}' />
          </div>
          <p className="ylopo-note">Listing data sourced from regional MLS. Information deemed reliable but not guaranteed. Updated daily.</p>
          <div className="listings-actions">
            <a href="https://search.nevadarealestategroup.net/search?s[orderBy]=sourceCreationDate%2Cdesc&s[page]=1&s[locations][0][city]=Henderson&s[locations][0][state]=NV&s[keywords]=The%20District%20Green%20Valley" target="_blank" rel="noopener noreferrer" className="btn-gold">View All The District at Green Valley Ranch Listings &rarr;</a>
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
                  <p>The District at Green Valley Ranch is Henderson's premier mixed-use urban village, blending residential living with walkable shopping, dining, and entertainment in a cohesive open-air setting. Developed by American Nevada Corporation beginning in 2004, The District occupies approximately 40 acres at the intersection of Green Valley Parkway and I-215, anchoring the Green Valley Ranch master-planned community with a lifestyle-centered destination.</p>
                  <p>Residential options at The District include luxury condominiums and townhomes ranging from approximately $300,000 for well-maintained resale units to $600,000 for premium top-floor condos and larger townhomes with upgraded finishes. The development features walkable streetscape design with ground-floor retail and restaurant space topped by residential units, creating a true live-work-play environment that is rare in the Las Vegas Valley.</p>
                  <p>The shopping and dining at The District is among the best in Henderson, with a curated mix of boutiques, national retailers, specialty food shops, and restaurants anchored by REI, Williams-Sonoma, Pottery Barn, and a variety of locally owned eateries. The central green space hosts community events, live music, seasonal markets, and outdoor gatherings year-round, creating an active village atmosphere.</p>
                  <p>For buyers seeking a walkable urban lifestyle within the safety and family-friendly character of Henderson, The District offers something unique in the Las Vegas metro. The community is minutes from Green Valley Ranch Resort, the I-215 beltway, and the extensive trail and park system of the broader Green Valley community. Young professionals, empty-nesters, and anyone who values the ability to walk to restaurants, shops, and entertainment will find The District to be one of the best-planned urban communities in Southern Nevada.</p>
                </>
              )}
            </div>
            <div className="overview-aside">
              <div className="quick-facts">
                <h3>The District at Green Valley Ranch At a Glance</h3>
                {displayStats.map(([label, value, cls]: any) => (
                  <div className="fact-row" key={label}>
                    <span className="fact-label">{label}</span>
                    <span className={`fact-value${cls ? ' ' + cls : ''}`}>{value}</span>
                  </div>
                ))}
              </div>
              <div className="cta-card">
                <p>Ready to explore The District at Green Valley Ranch? Schedule a private tour of the community and the current listings that match your goals.</p>
                <a href="tel:+17252399950" className="btn-gold">Call 725.239.9950</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="highlights">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Why The District at Green Valley Ranch</span>
            <h2>What Makes The District at Green Valley Ranch Stand Out</h2>
          </div>
          <div className="highlights-grid">
            {[
              { title: 'Walkable Urban Village', body: 'True live-work-play community with ground-floor retail and dining beneath residential units. Walk to restaurants, shops, and entertainment from your front door.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><line x1="8" y1="6" x2="8" y2="6.01"/><line x1="12" y1="6" x2="12" y2="6.01"/><line x1="16" y1="6" x2="16" y2="6.01"/><line x1="8" y1="10" x2="8" y2="10.01"/><line x1="12" y1="10" x2="12" y2="10.01"/><line x1="16" y1="10" x2="16" y2="10.01"/><line x1="8" y1="14" x2="8" y2="14.01"/><line x1="12" y1="14" x2="12" y2="14.01"/><line x1="16" y1="14" x2="16" y2="14.01"/></svg> },
              { title: 'Premier Dining & Shopping', body: 'Curated mix of boutiques, national retailers, specialty food shops, and restaurants. REI, Williams-Sonoma, Pottery Barn, and local favorites all within walking distance.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
              { title: 'Community Green Space', body: 'Central park and gathering area hosting live music, seasonal markets, community events, and outdoor dining. The social heart of Green Valley Ranch.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22c4-4 8-7.5 8-12a8 8 0 10-16 0c0 4.5 4 8 8 12z"/><circle cx="12" cy="10" r="3"/></svg> },
              { title: 'Henderson\'s Safest City', body: 'Henderson consistently ranks among the top 10 safest large cities in America. The District benefits from low crime rates and the city\'s excellent public services.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
              { title: 'I-215 Freeway Access', body: 'Direct access to the I-215 beltway for quick commutes to the Strip, Harry Reid Airport, Henderson executive offices, and every quadrant of the valley.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M8 21l4-11 4 11"/><path d="M2 21l5-14 4 8"/><path d="M14 15l4-8 4 14"/><line x1="2" y1="21" x2="22" y2="21"/></svg> },
              { title: 'Low-Maintenance Living', body: 'Condo and townhome living with HOA-covered exterior maintenance, landscaping, and community amenities. Ideal for buyers seeking a lock-and-leave lifestyle.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg> },
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

      <TheDistrictFAQ />

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
              { name: 'Green Valley Ranch', href: '/green-valley-ranch/', price: 'From $400K', compare: 'The broader master-planned community surrounding The District. Single-family homes and established neighborhoods.' },
              { name: 'Green Valley South', href: '/green-valley-south/', price: 'From $375K', compare: 'Southern section of Green Valley with newer construction and family-friendly amenities.' },
              { name: 'Whitney Ranch', href: '/whitney-ranch/', price: 'From $350K', compare: 'Established Henderson community with central location and accessible pricing.' },
              { name: 'Cadence', href: '/cadence/', price: 'From $350K', compare: 'Henderson\'s newest master-planned community with new construction and modern amenities.' },
              { name: 'Seven Hills', href: '/seven-hills/', price: 'From $500K', compare: 'Guard-gated Henderson community with Rio Secco golf and Strip views.' },
              { name: 'Inspirada', href: '/inspirada/', price: 'From $420K', compare: 'Newer Henderson master plan with parks, trails, and community gathering spaces.' },
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
              <h2>Ready to Find Your The District at Green Valley Ranch Home?</h2>
              <p>Nevada Real Estate Group is the #1 real estate team in Nevada. Whether you&apos;re buying or selling in The District at Green Valley Ranch, let&apos;s talk.</p>
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
                <input type="hidden" name="_subject" value="The District at Green Valley Ranch Inquiry — LasVegasHomeSearchExperts.com" />
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
