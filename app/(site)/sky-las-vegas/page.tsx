import SkyLasVegasFAQ from '@/components/SkyLasVegasFAQ'
import Link from 'next/link'
import type { Metadata } from 'next'
import SkyLasVegasMapWrapper from '@/components/SkyLasVegasMapWrapper'
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
    { '@type': 'ListItem', position: 3, name: 'Sky Las Vegas', item: 'https://www.lasvegashomesearchexperts.com/sky-las-vegas/' },
  ],
}

const FAQ_DATA = [
  {
    "q": "What is the price range at Sky Las Vegas?",
    "a": "Residences range from approximately $300,000 for studios and one-bedrooms on lower floors to over $2 million for penthouses and combined units with premium Strip views."
  },
  {
    "q": "Is Sky Las Vegas on the Strip?",
    "a": "Yes. Sky Las Vegas is located directly on Las Vegas Boulevard, making it one of the few residential towers with true Strip frontage. East-facing units look directly down the Strip corridor."
  },
  {
    "q": "How many units are in Sky Las Vegas?",
    "a": "Sky Las Vegas contains 409 residences across 45 stories. Unit types include studios, one-bedrooms, two-bedrooms, and penthouses."
  },
  {
    "q": "What amenities does Sky Las Vegas offer?",
    "a": "Amenities include a rooftop pool deck with Strip views, fitness center, 24-hour concierge and security, valet parking, business center, and resident lounges."
  },
  {
    "q": "Can you rent out a unit at Sky Las Vegas?",
    "a": "Yes. Sky Las Vegas allows rentals and the Strip-front location drives strong demand. The accessible price point makes it popular with investor-buyers seeking rental income."
  },
  {
    "q": "What views do Sky Las Vegas units have?",
    "a": "East-facing units look directly down the Las Vegas Strip — one of the most iconic residential views in the world. West-facing units offer Spring Mountain and Red Rock Canyon sunset views. Upper floors provide 360-degree panoramas."
  },
  {
    "q": "What are HOA fees at Sky Las Vegas?",
    "a": "HOA fees typically range from $350 to $1,500 per month depending on unit size and floor level. Fees cover building operations, concierge, pool, fitness center, security, and common area maintenance."
  },
  {
    "q": "How does Sky Las Vegas compare to Veer Towers?",
    "a": "Sky is directly on the Strip with true boulevard frontage and a lower entry price. Veer is at CityCenter with newer construction and access to ARIA and Crystals amenities. Both offer excellent Strip lifestyle options."
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
  name: 'Sky Las Vegas',
  description: 'Sky Las Vegas is a high-rise · strip-front community in Las Vegas, Nevada.',
  geo: { '@type': 'GeoCoordinates', latitude: 36.131, longitude: -115.163 },
  address: { '@type': 'PostalAddress', addressLocality: 'Las Vegas', addressRegion: 'NV', postalCode: '89109', addressCountry: 'US' },
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
  const cms = await getCommunityPage('sky-las-vegas')
  return {
    title: cms?.metaTitle ?? 'Sky Las Vegas Homes for Sale | Nevada Real Estate Group',
    description: cms?.metaDescription ?? 'Browse Sky Las Vegas homes for sale in Las Vegas, NV. $300K–$2M+. Schools, HOA, market stats. Nevada Real Estate Group.',
  }
}

export default async function SkyLasVegasPage() {
  const cms = await getCommunityPage('sky-las-vegas')
  const market = getMarketStats('sky-las-vegas')
  const ms = market?.stats

  const heroHeadline = cms?.heroHeadline ?? 'Sky Las Vegas'
  const heroSubtitle = 'Homes for Sale in Las Vegas, Nevada'
  const overviewTitle = cms?.overviewTitle ?? 'Sky Las Vegas: High-Rise · Strip-Front Living in Las Vegas'

  const HARDCODED_STATS: Array<[string, string] | [string, string, string]> = [
    ['Established', '2007'],
    ['Developer', 'Molasky Group of Companies'],
    ['Total Acreage', '~2 acres'],
    ['Homes', '409'],
    ['Median Home Price', ms?.medianSalePrice ?? '$300K–$2M+'],
    ['ZIP Codes', '89109'],
    ['Guard-Gated', 'Yes'],
    ['HOA', '$350–$1,500/mo'],
  ]
  const displayStats = mergeQuickStats(HARDCODED_STATS, cms?.quickStats)
  const HARDCODED_DRIVE_TIMES = [
    {
        "time": "~0 min",
        "destination": "to the Strip",
        "route": "on Las Vegas Boulevard"
    },
    {
        "time": "~12 min",
        "destination": "to Harry Reid Airport",
        "route": "via Las Vegas Blvd → I-15"
    },
    {
        "time": "~5 min",
        "destination": "to Wynn/Encore",
        "route": "via Las Vegas Blvd"
    },
    {
        "time": "~20 min",
        "destination": "to Summerlin",
        "route": "via Sahara Ave → I-15 → Summerlin Pkwy"
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
          <span>Sky Las Vegas</span>
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
                <span className="hero-v2-stat-num">{ms?.medianSalePrice ?? qs('Median Home Price', '$300K–$2M+')}</span>
                <span className="hero-v2-stat-lbl">Median Sale Price</span>
              </div>
              <div className="hero-v2-stat">
                <span className="hero-v2-stat-num">{ms?.avgDaysToClose ?? qs('Avg Days on Market', '45')}</span>
                <span className="hero-v2-stat-lbl">Avg Days to Close</span>
              </div>
            </div>
            <a href="#listings" className="hero-v2-cta">Search Homes in Sky Las Vegas</a>
          </div>
        </div>
      </header>

      <div className="hero-v2-qfb">
        <div className="container">
          <div className="hero-v2-qfb-row">
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <span><strong>ZIP:</strong> 89109</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              <span><strong>Type:</strong> High-Rise · Strip-Front</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
              <span><strong>Price Range:</strong> $300K–$2M+</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
              <span><strong>HOA:</strong> $350–$1,500/mo</span>
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
            <h2>Sky Las Vegas Demographics</h2>
          </div>
          <div className="demo-grid">
            {[
              ['~700', 'Population'],
              ['40', 'Median Age'],
              ['$120,000+', 'Avg Household Income'],
              ['409', 'Total Households'],
              ['50%', 'Homeownership Rate'],
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
            <h2>Where is Sky Las Vegas?</h2>
            <p>Las Vegas Strip &mdash; Las Vegas, Nevada.</p>
          </div>
          <div className="map-container">
            <SkyLasVegasMapWrapper />
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
            <h2 className="listings-title">NEW SKY LAS VEGAS LISTINGS</h2>
          </div>
          <div className="ylopo-wrap">
            <div className="YLOPO_searchWidget" />
            <div className="YLOPO_resultsWidget" data-search='{"propertyTypes":["house","condo","townhouse"],"minPrice":300000,"locations":[{"city":"Las Vegas","state":"NV"}],"limit":12,"sortBy":"listDate","sortOrder":"desc","keywords":"Sky Las Vegas","zipCodes":["89109"]}' />
          </div>
          <p className="ylopo-note">Listing data sourced from regional MLS. Information deemed reliable but not guaranteed. Updated daily.</p>
          <div className="listings-actions">
            <a href="https://search.nevadarealestategroup.net/search?s[orderBy]=sourceCreationDate%2Cdesc&s[page]=1&s[locations][0][city]=Las%20Vegas&s[locations][0][state]=NV&s[keywords]=Sky%20Las%20Vegas" target="_blank" rel="noopener noreferrer" className="btn-gold">View All Sky Las Vegas Listings &rarr;</a>
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
                  <p>Sky Las Vegas is a 45-story luxury high-rise condominium tower located directly on Las Vegas Boulevard, offering one of the purest Strip-front living experiences in the city. Completed in 2007 by the Molasky Group of Companies, the tower contains 409 residences and stands on the west side of the Strip near the intersection with Sahara Avenue, providing direct views of the Strip corridor, the Wynn and Encore resorts, and the Spring Mountains.</p>
                  <p>Residences at Sky Las Vegas range from approximately $300,000 for studio and one-bedroom units to over $2 million for penthouses and larger combined units with premium Strip views. Every unit features floor-to-ceiling glass, high-end finishes, and modern open floor plans. The tower's position on Las Vegas Boulevard means that east-facing units look directly down the Strip, offering one of the most iconic residential views in the world.</p>
                  <p>The building amenities include a rooftop pool deck with Strip views, a fitness center, 24-hour concierge and security, valet parking, a business center, and resident lounges. Sky's location at the north end of the Strip provides easy access to both the Strip's entertainment corridor and the emerging Sahara Avenue redevelopment zone, which is driving new investment and energy into the area.</p>
                  <p>For buyers who want to live directly on the Las Vegas Strip — with the lights, energy, and excitement of the boulevard as their front yard — Sky Las Vegas delivers that experience at a price point that is significantly more accessible than CityCenter or the Waldorf Astoria. The combination of Strip-front location, 45-story height, and a sub-$300K entry point makes Sky one of the strongest value propositions in the Las Vegas high-rise market.</p>
                </>
              )}
            </div>
            <div className="overview-aside">
              <div className="quick-facts">
                <h3>Sky Las Vegas At a Glance</h3>
                {displayStats.map(([label, value, cls]: any) => (
                  <div className="fact-row" key={label}>
                    <span className="fact-label">{label}</span>
                    <span className={`fact-value${cls ? ' ' + cls : ''}`}>{value}</span>
                  </div>
                ))}
              </div>
              <div className="cta-card">
                <p>Ready to explore Sky Las Vegas? Schedule a private tour of the community and the current listings that match your goals.</p>
                <a href="tel:+17252399950" className="btn-gold">Call 725.239.9950</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="highlights">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Why Sky Las Vegas</span>
            <h2>What Makes Sky Las Vegas Stand Out</h2>
          </div>
          <div className="highlights-grid">
            {[
              { title: 'Direct Strip Frontage', body: 'Located directly on Las Vegas Boulevard with east-facing units looking straight down the Strip. One of the purest Strip-front residential experiences available.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><line x1="8" y1="6" x2="8" y2="6.01"/><line x1="12" y1="6" x2="12" y2="6.01"/><line x1="16" y1="6" x2="16" y2="6.01"/><line x1="8" y1="10" x2="8" y2="10.01"/><line x1="12" y1="10" x2="12" y2="10.01"/><line x1="16" y1="10" x2="16" y2="10.01"/><line x1="8" y1="14" x2="8" y2="14.01"/><line x1="12" y1="14" x2="12" y2="14.01"/><line x1="16" y1="14" x2="16" y2="14.01"/></svg> },
              { title: '45 Stories', body: 'Rising 45 stories, Sky Las Vegas commands panoramic views of the Strip corridor, Wynn/Encore, and the Spring Mountains from its elevated position.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M8 21l4-11 4 11"/><path d="M2 21l5-14 4 8"/><path d="M14 15l4-8 4 14"/><line x1="2" y1="21" x2="22" y2="21"/></svg> },
              { title: 'Rooftop Pool Deck', body: 'Elevated pool deck with Strip views, lounge areas, and panoramic vistas. One of the most photographed residential pool experiences in Las Vegas.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
              { title: 'Accessible Entry Price', body: 'Entry-level studios and one-bedrooms start around $300,000, making Sky one of the most accessible luxury high-rise options directly on the Strip.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg> },
              { title: 'Floor-to-Ceiling Glass', body: 'Every residence features floor-to-ceiling glass walls maximizing views and natural light. Modern open floor plans throughout.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
              { title: '24-Hour Concierge', body: 'Full-service concierge, valet parking, fitness center, and 24-hour security. Controlled building access and dedicated residential parking.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
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

      <SkyLasVegasFAQ />

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
              { name: 'Veer Towers', href: '/veer-towers/', price: 'From $400K', compare: 'CityCenter\'s iconic leaning towers. Newer construction, on-Strip but within a resort campus.' },
              { name: 'Allure Las Vegas', href: '/allure-las-vegas/', price: 'From $250K', compare: '41-story tower north of the Strip with the most accessible pricing in the luxury high-rise market.' },
              { name: 'Panorama Towers', href: '/panorama-towers/', price: 'From $300K', compare: 'Strip-adjacent twin towers with spacious floor plans and resort-style amenities.' },
              { name: 'The Martin', href: '/the-martin/', price: 'From $400K', compare: '45-story luxury tower on the west side of the Strip corridor.' },
              { name: 'Turnberry Towers', href: '/turnberry-towers/', price: 'From $400K', compare: 'Twin 45-story towers near the Convention Center with full spa and tennis.' },
              { name: 'Waldorf Astoria Las Vegas', href: '/waldorf-astoria-las-vegas/', price: 'From $500K', compare: 'Five-star branded residences at CityCenter with full hotel services.' },
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
              <h2>Ready to Find Your Sky Las Vegas Home?</h2>
              <p>Nevada Real Estate Group is the #1 real estate team in Nevada. Whether you&apos;re buying or selling in Sky Las Vegas, let&apos;s talk.</p>
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
                <input type="hidden" name="_subject" value="Sky Las Vegas Inquiry — LasVegasHomeSearchExperts.com" />
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
