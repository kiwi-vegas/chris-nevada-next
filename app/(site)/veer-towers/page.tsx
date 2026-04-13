import VeerTowersFAQ from '@/components/VeerTowersFAQ'
import Link from 'next/link'
import type { Metadata } from 'next'
import VeerTowersMapWrapper from '@/components/VeerTowersMapWrapper'
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
    { '@type': 'ListItem', position: 3, name: 'Veer Towers', item: 'https://www.lasvegashomesearchexperts.com/veer-towers/' },
  ],
}

const FAQ_DATA = [
  {
    "q": "What is the price range for Veer Towers?",
    "a": "Residences in Veer Towers range from approximately $400,000 for entry-level studios and one-bedrooms on lower floors to over $5 million for penthouses and combined units with premium Strip views."
  },
  {
    "q": "How many units are in Veer Towers?",
    "a": "Veer Towers contains approximately 670 residences across twin 37-story towers. Unit types range from studios to three-bedroom penthouses."
  },
  {
    "q": "What is the architecture of Veer Towers?",
    "a": "Veer Towers was designed by Helmut Jahn. The twin towers are famous for their five-degree lean away from each other, creating a dramatic architectural statement. The buildings feature all-glass curtain walls."
  },
  {
    "q": "What amenities does Veer Towers offer?",
    "a": "Residents enjoy a resort-style pool deck, fitness center, 24-hour concierge, valet parking, private residential lobbies, and direct access to CityCenter's amenities including ARIA, Crystals shopping, and world-class dining."
  },
  {
    "q": "Can you rent out a unit at Veer Towers?",
    "a": "Yes. Veer Towers allows owners to rent their units, making it a popular choice for investor-buyers. The CityCenter location and luxury amenities drive strong rental demand, particularly for short-term and furnished rentals."
  },
  {
    "q": "What is CityCenter?",
    "a": "CityCenter is a 67-acre mixed-use urban complex on the Las Vegas Strip that includes ARIA Resort & Casino, Crystals luxury shopping, Waldorf Astoria Las Vegas, Park MGM, and Veer Towers. It was developed by MGM Resorts International."
  },
  {
    "q": "What views do Veer Towers units have?",
    "a": "Depending on unit location and floor, views include the Bellagio Fountains, the Las Vegas Strip, the Spring Mountains, the Las Vegas Valley, and CityCenter's resort campus."
  },
  {
    "q": "What are HOA fees at Veer Towers?",
    "a": "HOA fees at Veer Towers typically range from $400 to $2,000 per month depending on unit size and floor level. Fees cover building maintenance, concierge services, pool, fitness center, security, and common area upkeep."
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
  name: 'Veer Towers',
  description: 'Veer Towers is a high-rise · luxury · strip community in Las Vegas, Nevada.',
  geo: { '@type': 'GeoCoordinates', latitude: 36.108, longitude: -115.176 },
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
  const cms = await getCommunityPage('veer-towers')
  return {
    title: cms?.metaTitle ?? 'Veer Towers Homes for Sale | Nevada Real Estate Group',
    description: cms?.metaDescription ?? 'Browse Veer Towers homes for sale in Las Vegas, NV. $400K–$5M+. Schools, HOA, market stats. Nevada Real Estate Group.',
  }
}

export default async function VeerTowersPage() {
  const cms = await getCommunityPage('veer-towers')
  const market = getMarketStats('veer-towers')
  const ms = market?.stats

  const heroHeadline = cms?.heroHeadline ?? 'Veer Towers'
  const heroSubtitle = 'Homes for Sale in Las Vegas, Nevada'
  const overviewTitle = cms?.overviewTitle ?? 'Veer Towers: High-Rise · Luxury · Strip Living in Las Vegas'

  const HARDCODED_STATS: Array<[string, string] | [string, string, string]> = [
    ['Established', '2010'],
    ['Developer', 'MGM Resorts International / Infinity World Development'],
    ['Total Acreage', '~2 acres'],
    ['Homes', '670'],
    ['Median Home Price', ms?.medianSalePrice ?? '$400K–$5M+'],
    ['ZIP Codes', '89158'],
    ['Guard-Gated', 'Yes'],
    ['HOA', '$400–$2,000/mo'],
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
          <a href="/#communities">Communities</a>
          <span className="breadcrumb-sep">&rsaquo;</span>
          <span>Veer Towers</span>
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
                <span className="hero-v2-stat-num">{ms?.medianSalePrice ?? qs('Median Home Price', '$400K–$5M+')}</span>
                <span className="hero-v2-stat-lbl">Median Sale Price</span>
              </div>
              <div className="hero-v2-stat">
                <span className="hero-v2-stat-num">{ms?.avgDaysToClose ?? qs('Avg Days on Market', '45')}</span>
                <span className="hero-v2-stat-lbl">Avg Days to Close</span>
              </div>
            </div>
            <a href="#listings" className="hero-v2-cta">Search Homes in Veer Towers</a>
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
              <span><strong>Type:</strong> High-Rise · Luxury · Strip</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
              <span><strong>Price Range:</strong> $400K–$5M+</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
              <span><strong>HOA:</strong> $400–$2,000/mo</span>
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
            <h2>Veer Towers Demographics</h2>
          </div>
          <div className="demo-grid">
            {[
              ['~1,200', 'Population'],
              ['42', 'Median Age'],
              ['$200,000+', 'Avg Household Income'],
              ['670', 'Total Households'],
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
            <h2>Where is Veer Towers?</h2>
            <p>CityCenter, Las Vegas Strip &mdash; Las Vegas, Nevada.</p>
          </div>
          <div className="map-container">
            <VeerTowersMapWrapper />
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
            <h2 className="listings-title">NEW VEER TOWERS LISTINGS</h2>
          </div>
          <div className="ylopo-wrap">
            <div className="YLOPO_searchWidget" />
            <div className="YLOPO_resultsWidget" data-search='{"propertyTypes":["house","condo","townhouse"],"minPrice":400000,"locations":[{"city":"Las Vegas","state":"NV"}],"limit":12,"sortBy":"listDate","sortOrder":"desc","keywords":"Veer Towers CityCenter","zipCodes":["89158"]}' />
          </div>
          <p className="ylopo-note">Listing data sourced from regional MLS. Information deemed reliable but not guaranteed. Updated daily.</p>
          <div className="listings-actions">
            <a href="https://search.nevadarealestategroup.net/search?s[orderBy]=sourceCreationDate%2Cdesc&s[page]=1&s[locations][0][city]=Las%20Vegas&s[locations][0][state]=NV&s[keywords]=Veer%20Towers%20CityCenter" target="_blank" rel="noopener noreferrer" className="btn-gold">View All Veer Towers Listings &rarr;</a>
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
                  <p>Veer Towers is a pair of striking 37-story residential towers located at the heart of CityCenter on the Las Vegas Strip. Designed by the Pritzker Prize-winning firm Helmut Jahn, the twin towers are iconic for their five-degree lean away from each other, creating one of the most visually dramatic architectural statements on the Strip. Completed in 2010, Veer remains one of the premier luxury high-rise condominium addresses in Las Vegas.</p>
                  <p>The towers contain approximately 670 residences ranging from efficient studios and one-bedroom units starting around $400,000 to expansive penthouses and combined units exceeding $5 million. Every residence features floor-to-ceiling glass curtain walls, high-end finishes, European-style kitchens with premium appliances, and sweeping views of the Strip, the Bellagio Fountains, the Spring Mountains, or the Las Vegas Valley skyline.</p>
                  <p>Veer Towers offers residents a fully amenitized luxury lifestyle including a resort-style pool deck, state-of-the-art fitness center, 24-hour concierge, valet parking, private residential lobbies, and direct access to CityCenter's world-class shopping at ARIA, Crystals, and the Waldorf Astoria Las Vegas. The building's location at the geographic center of the Strip places residents within walking distance of virtually every major resort and entertainment venue.</p>
                  <p>For buyers seeking the ultimate Strip-adjacent lifestyle — where you can walk to a Michelin-starred dinner, catch a world-class show, and return home to a private luxury residence — Veer Towers represents one of the strongest value propositions in the Las Vegas high-rise market. The combination of iconic architecture, CityCenter amenities, and an unbeatable location makes Veer one of the most sought-after addresses in the valley.</p>
                </>
              )}
            </div>
            <div className="overview-aside">
              <div className="quick-facts">
                <h3>Veer Towers At a Glance</h3>
                {displayStats.map(([label, value, cls]: any) => (
                  <div className="fact-row" key={label}>
                    <span className="fact-label">{label}</span>
                    <span className={`fact-value${cls ? ' ' + cls : ''}`}>{value}</span>
                  </div>
                ))}
              </div>
              <div className="cta-card">
                <p>Ready to explore Veer Towers? Schedule a private tour of the community and the current listings that match your goals.</p>
                <a href="tel:+17252399950" className="btn-gold">Call 725.239.9950</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="highlights">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Why Veer Towers</span>
            <h2>What Makes Veer Towers Stand Out</h2>
          </div>
          <div className="highlights-grid">
            {[
              { title: 'Iconic Architecture', body: 'Twin 37-story towers designed by Helmut Jahn with a distinctive five-degree lean. One of the most recognized residential buildings on the Las Vegas Strip.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><line x1="8" y1="6" x2="8" y2="6.01"/><line x1="12" y1="6" x2="12" y2="6.01"/><line x1="16" y1="6" x2="16" y2="6.01"/><line x1="8" y1="10" x2="8" y2="10.01"/><line x1="12" y1="10" x2="12" y2="10.01"/><line x1="16" y1="10" x2="16" y2="10.01"/><line x1="8" y1="14" x2="8" y2="14.01"/><line x1="12" y1="14" x2="12" y2="14.01"/><line x1="16" y1="14" x2="16" y2="14.01"/></svg> },
              { title: 'CityCenter Location', body: 'Located at the heart of CityCenter with direct access to ARIA Resort, Crystals luxury shopping, and Waldorf Astoria Las Vegas. The geographic center of the Strip.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
              { title: 'Floor-to-Ceiling Glass', body: 'Every residence features glass curtain walls with panoramic views of the Strip, Bellagio Fountains, Spring Mountains, or the Las Vegas Valley.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
              { title: 'Resort Amenities', body: 'Pool deck, fitness center, 24-hour concierge, valet parking, and private residential lobbies. Full-service luxury living.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
              { title: '24-Hour Security', body: 'Controlled access residential lobbies, 24-hour concierge and security, and dedicated residential parking garage separate from CityCenter guests.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
              { title: 'Strong Rental Demand', body: 'Veer Towers is one of the most desirable high-rise rental addresses in Las Vegas, offering strong income potential for investor-buyers.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg> },
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

      <VeerTowersFAQ />

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
              { name: 'Waldorf Astoria Las Vegas', href: '/waldorf-astoria-las-vegas/', price: 'From $500K', compare: 'The most prestigious residential address in CityCenter with five-star Waldorf Astoria services.' },
              { name: 'Panorama Towers', href: '/panorama-towers/', price: 'From $300K', compare: 'Strip-adjacent twin towers with larger floor plans and more accessible pricing.' },
              { name: 'The Martin', href: '/the-martin/', price: 'From $400K', compare: '45-story luxury high-rise adjacent to the Strip with spacious residences.' },
              { name: 'Sky Las Vegas', href: '/sky-las-vegas/', price: 'From $300K', compare: '45-story Strip-view tower with direct Las Vegas Boulevard frontage.' },
              { name: 'Turnberry Place', href: '/turnberry-place/', price: 'From $500K', compare: 'Four-tower luxury complex on Paradise Road with resort amenities.' },
              { name: 'Allure Las Vegas', href: '/allure-las-vegas/', price: 'From $250K', compare: '41-story tower near the north end of the Strip with competitive pricing.' },
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
              <h2>Ready to Find Your Veer Towers Home?</h2>
              <p>Nevada Real Estate Group is the #1 real estate team in Nevada. Whether you&apos;re buying or selling in Veer Towers, let&apos;s talk.</p>
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
                <input type="hidden" name="_subject" value="Veer Towers Inquiry — LasVegasHomeSearchExperts.com" />
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
