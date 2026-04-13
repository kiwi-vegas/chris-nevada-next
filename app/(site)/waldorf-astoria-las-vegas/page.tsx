import WaldorfAstoriaLasVegasFAQ from '@/components/WaldorfAstoriaLasVegasFAQ'
import Link from 'next/link'
import type { Metadata } from 'next'
import WaldorfAstoriaLasVegasMapWrapper from '@/components/WaldorfAstoriaLasVegasMapWrapper'
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
    { '@type': 'ListItem', position: 3, name: 'Waldorf Astoria Las Vegas', item: 'https://www.lasvegashomesearchexperts.com/waldorf-astoria-las-vegas/' },
  ],
}

const FAQ_DATA = [
  {
    "q": "What is the price range at Waldorf Astoria Las Vegas?",
    "a": "Residences range from approximately $500,000 for entry-level studios and one-bedrooms to over $10 million for penthouses and combined units with premium Strip views. Per-square-foot prices are among the highest on the Strip."
  },
  {
    "q": "What hotel services do residents receive?",
    "a": "Residential owners have access to full Waldorf Astoria hotel services including daily housekeeping, 24-hour concierge, room service, valet parking, spa and fitness center access, and priority dining reservations at the hotel's restaurants."
  },
  {
    "q": "Can you rent out a Waldorf Astoria residence?",
    "a": "Yes. Many owners participate in the hotel's rental program, which allows their unit to be rented as a hotel room when not in personal use. This generates income and offsets ownership costs. Contact our team for current program details."
  },
  {
    "q": "What is the history of the building?",
    "a": "The tower opened in 2010 as the Mandarin Oriental Las Vegas and was rebranded to Waldorf Astoria in 2018, elevating the property's brand prestige. The building retains its original refined design while benefiting from the Waldorf Astoria brand recognition."
  },
  {
    "q": "How many units are in the Waldorf Astoria?",
    "a": "The Waldorf Astoria Las Vegas contains approximately 225 privately owned residences across 47 stories. The relatively small unit count ensures exclusivity and personalized service."
  },
  {
    "q": "What are HOA fees at the Waldorf Astoria?",
    "a": "HOA fees at the Waldorf Astoria typically range from $800 to $5,000+ per month depending on unit size, floor, and services used. Fees cover building operations, hotel services, concierge, pool, spa, fitness center, and common area maintenance."
  },
  {
    "q": "What dining is available in the building?",
    "a": "The Waldorf Astoria Las Vegas features acclaimed dining venues within the hotel. Residents also enjoy in-residence dining from the hotel's culinary team and priority reservations."
  },
  {
    "q": "How does the Waldorf compare to Veer Towers?",
    "a": "The Waldorf Astoria offers five-star hotel services, branded prestige, and typically higher per-square-foot pricing. Veer Towers is a standalone residential building without hotel services but offers more unit diversity and a lower entry point. Both are located within CityCenter."
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
  name: 'Waldorf Astoria Las Vegas',
  description: 'Waldorf Astoria Las Vegas is a ultra-luxury high-rise · five-star community in Las Vegas, Nevada.',
  geo: { '@type': 'GeoCoordinates', latitude: 36.107, longitude: -115.178 },
  address: { '@type': 'PostalAddress', addressLocality: 'Las Vegas', addressRegion: 'NV', postalCode: '89158', addressCountry: 'US' },
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
  const cms = await getCommunityPage('waldorf-astoria-las-vegas')
  return {
    title: cms?.metaTitle ?? 'Waldorf Astoria Las Vegas Homes for Sale | Nevada Real Estate Group',
    description: cms?.metaDescription ?? 'Browse Waldorf Astoria Las Vegas homes for sale in Las Vegas, NV. $500K–$10M+. Schools, HOA, market stats. Nevada Real Estate Group.',
    alternates: { canonical: 'https://www.lasvegashomesearchexperts.com/waldorf-astoria-las-vegas' },
  }
}

export default async function WaldorfAstoriaLasVegasPage() {
  const cms = await getCommunityPage('waldorf-astoria-las-vegas')
  const market = getMarketStats('waldorf-astoria-las-vegas')
  const ms = market?.stats

  const heroHeadline = cms?.heroHeadline ?? 'Waldorf Astoria Las Vegas'
  const heroSubtitle = 'Homes for Sale in Las Vegas, Nevada'
  const overviewTitle = cms?.overviewTitle ?? 'Waldorf Astoria Las Vegas: Ultra-Luxury High-Rise · Five-Star Living in Las Vegas'

  const HARDCODED_STATS: Array<[string, string] | [string, string, string]> = [
    ['Established', '2010'],
    ['Developer', 'MGM Resorts International / Infinity World Development'],
    ['Total Acreage', '~1.5 acres'],
    ['Homes', '~225'],
    ['Median Home Price', ms?.medianSalePrice ?? '$500K–$10M+'],
    ['ZIP Codes', '89158'],
    ['Guard-Gated', 'Yes'],
    ['HOA', '$800–$5,000/mo'],
  ]
  const displayStats = mergeQuickStats(HARDCODED_STATS, cms?.quickStats)
  const HARDCODED_DRIVE_TIMES = [
    {
        "time": "~0 min",
        "destination": "to the Strip",
        "route": "on-site at CityCenter"
    },
    {
        "time": "~10 min",
        "destination": "to Harry Reid Airport",
        "route": "via I-15 South"
    },
    {
        "time": "~5 min",
        "destination": "to T-Mobile Arena",
        "route": "via The Park walkway"
    },
    {
        "time": "~20 min",
        "destination": "to Summerlin",
        "route": "via I-15 → Summerlin Pkwy"
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
          <span>Waldorf Astoria Las Vegas</span>
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
                <span className="hero-v2-stat-num">{ms?.medianSalePrice ?? qs('Median Home Price', '$500K–$10M+')}</span>
                <span className="hero-v2-stat-lbl">Median Sale Price</span>
              </div>
              <div className="hero-v2-stat">
                <span className="hero-v2-stat-num">{ms?.avgDaysToClose ?? qs('Avg Days on Market', '45')}</span>
                <span className="hero-v2-stat-lbl">Avg Days to Close</span>
              </div>
            </div>
            <a href="#listings" className="hero-v2-cta">Search Homes in Waldorf Astoria Las Vegas</a>
          </div>
        </div>
      </header>

      <div className="hero-v2-qfb">
        <div className="container">
          <div className="hero-v2-qfb-row">
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <span><strong>ZIP:</strong> 89158</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              <span><strong>Type:</strong> Ultra-Luxury High-Rise · Five-Star</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
              <span><strong>Price Range:</strong> $500K–$10M+</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
              <span><strong>HOA:</strong> $800–$5,000/mo</span>
            </div>
          </div>
          <div className="hero-v2-qfb-est">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            <span>Est. 2010</span>
          </div>
        </div>
      </div>

      <section id="demographics" className="demographics-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Demographics</span>
            <h2>Waldorf Astoria Las Vegas Demographics</h2>
          </div>
          <div className="demo-grid">
            {[
              ['~400', 'Population'],
              ['50', 'Median Age'],
              ['$400,000+', 'Avg Household Income'],
              ['~225', 'Total Households'],
              ['60%', 'Homeownership Rate'],
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
            <h2>Where is Waldorf Astoria Las Vegas?</h2>
            <p>CityCenter, Las Vegas Strip &mdash; Las Vegas, Nevada.</p>
          </div>
          <div className="map-container">
            <WaldorfAstoriaLasVegasMapWrapper />
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
            <h2 className="listings-title">NEW WALDORF ASTORIA LAS VEGAS LISTINGS</h2>
          </div>
          <div className="ylopo-wrap">
            <div className="YLOPO_searchWidget" />
            <div className="YLOPO_resultsWidget" data-search='{"propertyTypes":["house","condo","townhouse"],"minPrice":500000,"locations":[{"city":"Las Vegas","state":"NV"}],"limit":12,"sortBy":"listDate","sortOrder":"desc","keywords":"Waldorf Astoria CityCenter","zipCodes":["89158"]}' />
          </div>
          <p className="ylopo-note">Listing data sourced from regional MLS. Information deemed reliable but not guaranteed. Updated daily.</p>
          <div className="listings-actions">
            <a href="https://search.nevadarealestategroup.net/search?s[orderBy]=sourceCreationDate%2Cdesc&s[page]=1&s[locations][0][city]=Las%20Vegas&s[locations][0][state]=NV&s[keywords]=Waldorf%20Astoria%20CityCenter" target="_blank" rel="noopener noreferrer" className="btn-gold">View All Waldorf Astoria Las Vegas Listings &rarr;</a>
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
                  <p>The Waldorf Astoria Las Vegas is the most prestigious residential high-rise address on the Las Vegas Strip. Rising 47 stories within the CityCenter complex, this five-star branded residence offers approximately 225 privately owned condominiums that come with the full suite of Waldorf Astoria hotel services — including housekeeping, room service, concierge, valet, spa access, and priority dining reservations at the hotel's acclaimed restaurants.</p>
                  <p>Originally opened as the Mandarin Oriental Las Vegas in 2010, the property was rebranded to Waldorf Astoria in 2018, elevating the brand prestige while maintaining the building's refined Asian-inspired design aesthetic. Residences range from approximately $500,000 for entry-level studios to well over $10 million for the tower's most exclusive penthouses and combined units with direct Strip views.</p>
                  <p>Every residence features floor-to-ceiling windows, Italian marble bathrooms, Sub-Zero and Wolf kitchens, smart home technology, and the kind of finish quality that defines five-star hospitality. The building amenities include a 27th-floor sky pool and lounge, a world-class spa and fitness center, the celebrated Twist by Pierre Gagnaire restaurant (Michelin-starred), and 24-hour Waldorf Astoria concierge services available to all residential owners.</p>
                  <p>For buyers seeking the pinnacle of luxury living in Las Vegas — where your home comes with the services of a five-star hotel and you can walk to any destination on the Strip — the Waldorf Astoria Las Vegas is in a class by itself. It is the only Waldorf Astoria branded residential property in Nevada and one of only a handful in the world, making it a globally recognized address for discerning buyers.</p>
                </>
              )}
            </div>
            <div className="overview-aside">
              <div className="quick-facts">
                <h3>Waldorf Astoria Las Vegas At a Glance</h3>
                {displayStats.map(([label, value, cls]: any) => (
                  <div className="fact-row" key={label}>
                    <span className="fact-label">{label}</span>
                    <span className={`fact-value${cls ? ' ' + cls : ''}`}>{value}</span>
                  </div>
                ))}
              </div>
              <div className="cta-card">
                <p>Ready to explore Waldorf Astoria Las Vegas? Schedule a private tour of the community and the current listings that match your goals.</p>
                <a href="tel:+17252399950" className="btn-gold">Call 725.239.9950</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="highlights">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Why Waldorf Astoria Las Vegas</span>
            <h2>What Makes Waldorf Astoria Las Vegas Stand Out</h2>
          </div>
          <div className="highlights-grid">
            {[
              { title: 'Five-Star Hotel Services', body: 'Full Waldorf Astoria hotel services including housekeeping, room service, 24-hour concierge, valet parking, spa privileges, and priority dining reservations.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
              { title: 'Sky Pool & Spa', body: '27th-floor infinity pool and lounge with panoramic Strip views, plus a world-class spa and fitness center available to residential owners.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
              { title: 'Michelin-Caliber Dining', body: 'Home to acclaimed dining venues within the hotel. Residents enjoy priority reservations and in-residence dining from the hotel\'s culinary team.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
              { title: 'CityCenter Address', body: 'Located within the 67-acre CityCenter complex with direct access to ARIA Resort, Crystals luxury shopping, and the Las Vegas Strip.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><line x1="8" y1="6" x2="8" y2="6.01"/><line x1="12" y1="6" x2="12" y2="6.01"/><line x1="16" y1="6" x2="16" y2="6.01"/><line x1="8" y1="10" x2="8" y2="10.01"/><line x1="12" y1="10" x2="12" y2="10.01"/><line x1="16" y1="10" x2="16" y2="10.01"/><line x1="8" y1="14" x2="8" y2="14.01"/><line x1="12" y1="14" x2="12" y2="14.01"/><line x1="16" y1="14" x2="16" y2="14.01"/></svg> },
              { title: 'Globally Recognized Brand', body: 'One of only a handful of Waldorf Astoria branded residences worldwide. A globally recognized address that carries inherent prestige and value.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
              { title: 'Exceptional Appreciation', body: 'Waldorf Astoria residences command the highest per-square-foot prices on the Strip. The branded residence model supports long-term value retention and appreciation.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg> },
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

      <WaldorfAstoriaLasVegasFAQ />

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
              { name: 'Veer Towers', href: '/veer-towers/', price: 'From $400K', compare: 'Twin 37-story residential towers within CityCenter. Contemporary design without hotel services.' },
              { name: 'Panorama Towers', href: '/panorama-towers/', price: 'From $300K', compare: 'Strip-adjacent twin towers with larger floor plans and more competitive pricing.' },
              { name: 'Turnberry Place', href: '/turnberry-place/', price: 'From $500K', compare: 'Four-tower luxury complex with resort amenities and spacious residences.' },
              { name: 'The Martin', href: '/the-martin/', price: 'From $400K', compare: '45-story luxury tower with Strip views and a lower price point than Waldorf.' },
              { name: 'Sky Las Vegas', href: '/sky-las-vegas/', price: 'From $300K', compare: '45-story Strip-front tower with direct Las Vegas Boulevard views.' },
              { name: 'Turnberry Towers', href: '/turnberry-towers/', price: 'From $400K', compare: 'Twin 45-story luxury towers near the Convention Center with full amenities.' },
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
              <h2>Ready to Find Your Waldorf Astoria Las Vegas Home?</h2>
              <p>Nevada Real Estate Group is the #1 real estate team in Nevada. Whether you&apos;re buying or selling in Waldorf Astoria Las Vegas, let&apos;s talk.</p>
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
                <input type="hidden" name="_subject" value="Waldorf Astoria Las Vegas Inquiry — LasVegasHomeSearchExperts.com" />
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
