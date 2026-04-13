import AllureLasVegasFAQ from '@/components/AllureLasVegasFAQ'
import Link from 'next/link'
import type { Metadata } from 'next'
import AllureLasVegasMapWrapper from '@/components/AllureLasVegasMapWrapper'
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
    { '@type': 'ListItem', position: 3, name: 'Allure Las Vegas', item: 'https://www.lasvegashomesearchexperts.com/allure-las-vegas/' },
  ],
}

const FAQ_DATA = [
  {
    "q": "What is the price range at Allure Las Vegas?",
    "a": "Residences range from approximately $250,000 for one-bedroom units on lower floors to over $1 million for penthouses and premium units with Strip views."
  },
  {
    "q": "How many units are in Allure Las Vegas?",
    "a": "Allure Las Vegas contains 428 residences across 41 stories. Unit types include studios, one-bedrooms, two-bedrooms, three-bedrooms, and penthouses."
  },
  {
    "q": "What amenities does Allure offer?",
    "a": "Amenities include a resort-style pool deck with cabanas and Strip views, fitness center, 24-hour concierge and security, valet parking, media room, business center, and resident lounge areas."
  },
  {
    "q": "Is Allure Las Vegas gated?",
    "a": "Yes. Allure has a gated entry with 24-hour security, concierge services, and controlled building access. Valet parking is also available."
  },
  {
    "q": "Can you rent out a unit at Allure?",
    "a": "Yes. Allure allows rentals and the accessible price point combined with the location near the Strip makes it popular with investor-buyers seeking rental income."
  },
  {
    "q": "What views do Allure units have?",
    "a": "South-facing units offer views of the Las Vegas Strip skyline. West-facing units capture the Spring Mountains and Red Rock Canyon. Upper floors provide sweeping panoramic views in all directions."
  },
  {
    "q": "What are HOA fees at Allure?",
    "a": "HOA fees typically range from $300 to $1,200 per month depending on unit size and floor level. Fees cover building operations, concierge, pool, fitness center, security, and common area maintenance."
  },
  {
    "q": "How does Allure compare to Sky Las Vegas?",
    "a": "Both are luxury high-rise towers near the Strip. Sky has true Strip frontage on Las Vegas Boulevard and slightly newer finishes. Allure offers a lower entry price and is located on Sahara Avenue just north of the Strip."
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
  name: 'Allure Las Vegas',
  description: 'Allure Las Vegas is a high-rise · urban · strip-adjacent community in Las Vegas, Nevada.',
  geo: { '@type': 'GeoCoordinates', latitude: 36.151, longitude: -115.171 },
  address: { '@type': 'PostalAddress', addressLocality: 'Las Vegas', addressRegion: 'NV', postalCode: '89102', addressCountry: 'US' },
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
  const cms = await getCommunityPage('allure-las-vegas')
  return {
    title: cms?.metaTitle ?? 'Allure Las Vegas Homes for Sale | Nevada Real Estate Group',
    description: cms?.metaDescription ?? 'Browse Allure Las Vegas homes for sale in Las Vegas, NV. $250K–$1M+. Schools, HOA, market stats. Nevada Real Estate Group.',
  }
}

export default async function AllureLasVegasPage() {
  const cms = await getCommunityPage('allure-las-vegas')
  const market = getMarketStats('allure-las-vegas')
  const ms = market?.stats

  const heroHeadline = cms?.heroHeadline ?? 'Allure Las Vegas'
  const heroSubtitle = 'Homes for Sale in Las Vegas, Nevada'
  const overviewTitle = cms?.overviewTitle ?? 'Allure Las Vegas: High-Rise · Urban · Strip-Adjacent Living in Las Vegas'

  const HARDCODED_STATS: Array<[string, string] | [string, string, string]> = [
    ['Established', '2007'],
    ['Developer', 'Mac Homes / Gary Carlin'],
    ['Total Acreage', '~2 acres'],
    ['Homes', '428'],
    ['Median Home Price', ms?.medianSalePrice ?? '$250K–$1M+'],
    ['ZIP Codes', '89102'],
    ['Guard-Gated', 'Yes'],
    ['HOA', '$300–$1,200/mo'],
  ]
  const displayStats = mergeQuickStats(HARDCODED_STATS, cms?.quickStats)
  const HARDCODED_DRIVE_TIMES = [
    {
        "time": "~5 min",
        "destination": "to the Strip",
        "route": "via Sahara Ave / Las Vegas Blvd"
    },
    {
        "time": "~15 min",
        "destination": "to Harry Reid Airport",
        "route": "via I-15 South"
    },
    {
        "time": "~10 min",
        "destination": "to Downtown / Fremont",
        "route": "via Sahara Ave → Las Vegas Blvd"
    },
    {
        "time": "~20 min",
        "destination": "to Summerlin",
        "route": "via Sahara Ave / US-95"
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
          <span>Allure Las Vegas</span>
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
                <span className="hero-v2-stat-num">{ms?.medianSalePrice ?? qs('Median Home Price', '$250K–$1M+')}</span>
                <span className="hero-v2-stat-lbl">Median Sale Price</span>
              </div>
              <div className="hero-v2-stat">
                <span className="hero-v2-stat-num">{ms?.avgDaysToClose ?? qs('Avg Days on Market', '45')}</span>
                <span className="hero-v2-stat-lbl">Avg Days to Close</span>
              </div>
            </div>
            <a href="#listings" className="hero-v2-cta">Search Homes in Allure Las Vegas</a>
          </div>
        </div>
      </header>

      <div className="hero-v2-qfb">
        <div className="container">
          <div className="hero-v2-qfb-row">
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <span><strong>ZIP:</strong> 89102</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              <span><strong>Type:</strong> High-Rise · Urban · Strip-Adjacent</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
              <span><strong>Price Range:</strong> $250K–$1M+</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
              <span><strong>HOA:</strong> $300–$1,200/mo</span>
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
            <h2>Allure Las Vegas Demographics</h2>
          </div>
          <div className="demo-grid">
            {[
              ['~750', 'Population'],
              ['38', 'Median Age'],
              ['$100,000+', 'Avg Household Income'],
              ['428', 'Total Households'],
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
            <h2>Where is Allure Las Vegas?</h2>
            <p>Las Vegas &mdash; Las Vegas, Nevada.</p>
          </div>
          <div className="map-container">
            <AllureLasVegasMapWrapper />
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
            <h2 className="listings-title">NEW ALLURE LAS VEGAS LISTINGS</h2>
          </div>
          <div className="ylopo-wrap">
            <div className="YLOPO_searchWidget" />
            <div className="YLOPO_resultsWidget" data-search='{"propertyTypes":["house","condo","townhouse"],"minPrice":250000,"locations":[{"city":"Las Vegas","state":"NV"}],"limit":12,"sortBy":"listDate","sortOrder":"desc","keywords":"Allure Las Vegas","zipCodes":["89102"]}' />
          </div>
          <p className="ylopo-note">Listing data sourced from regional MLS. Information deemed reliable but not guaranteed. Updated daily.</p>
          <div className="listings-actions">
            <a href="https://search.nevadarealestategroup.net/search?s[orderBy]=sourceCreationDate%2Cdesc&s[page]=1&s[locations][0][city]=Las%20Vegas&s[locations][0][state]=NV&s[keywords]=Allure%20Las%20Vegas" target="_blank" rel="noopener noreferrer" className="btn-gold">View All Allure Las Vegas Listings &rarr;</a>
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
                  <p>Allure Las Vegas is a 41-story luxury high-rise condominium tower located on West Sahara Avenue, just north of the Las Vegas Strip. Completed in 2007, the tower contains 428 residences and offers one of the most accessible entry points into the Las Vegas luxury high-rise market, with one-bedroom units starting around $250,000 and penthouses reaching over $1 million.</p>
                  <p>The tower features a sleek glass-and-steel design with floor-to-ceiling windows throughout, providing panoramic views of the Strip skyline, the Spring Mountains, and the Las Vegas Valley from virtually every unit. Floor plans range from efficient studios and one-bedrooms to spacious two- and three-bedroom residences and penthouses. Finishes include granite countertops, stainless steel appliances, and hardwood-style flooring.</p>
                  <p>Amenities at Allure include a resort-style pool deck with cabanas and Strip views, a fitness center, 24-hour concierge and security, valet parking, a media room, a business center, and resident lounge areas. The gated entry and controlled building access provide the security and privacy expected of a luxury high-rise community.</p>
                  <p>Allure's location on Sahara Avenue provides convenient access to the Strip, the emerging Arts District and Downtown Las Vegas, and the I-15 and US-95 freeways. For buyers seeking a luxury high-rise lifestyle near the Strip without the premium pricing of CityCenter or Turnberry, Allure Las Vegas offers a compelling combination of quality construction, strong amenities, and value.</p>
                </>
              )}
            </div>
            <div className="overview-aside">
              <div className="quick-facts">
                <h3>Allure Las Vegas At a Glance</h3>
                {displayStats.map(([label, value, cls]: any) => (
                  <div className="fact-row" key={label}>
                    <span className="fact-label">{label}</span>
                    <span className={`fact-value${cls ? ' ' + cls : ''}`}>{value}</span>
                  </div>
                ))}
              </div>
              <div className="cta-card">
                <p>Ready to explore Allure Las Vegas? Schedule a private tour of the community and the current listings that match your goals.</p>
                <a href="tel:+17252399950" className="btn-gold">Call 725.239.9950</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="highlights">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Why Allure Las Vegas</span>
            <h2>What Makes Allure Las Vegas Stand Out</h2>
          </div>
          <div className="highlights-grid">
            {[
              { title: '41-Story Tower', body: 'A 41-story glass tower rising above the Las Vegas skyline with 428 residences and panoramic views from virtually every unit.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><line x1="8" y1="6" x2="8" y2="6.01"/><line x1="12" y1="6" x2="12" y2="6.01"/><line x1="16" y1="6" x2="16" y2="6.01"/><line x1="8" y1="10" x2="8" y2="10.01"/><line x1="12" y1="10" x2="12" y2="10.01"/><line x1="16" y1="10" x2="16" y2="10.01"/><line x1="8" y1="14" x2="8" y2="14.01"/><line x1="12" y1="14" x2="12" y2="14.01"/><line x1="16" y1="14" x2="16" y2="14.01"/></svg> },
              { title: 'Accessible Luxury', body: 'Entry-level one-bedrooms start around $250,000, making Allure one of the most accessible luxury high-rise options in the Las Vegas corridor.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg> },
              { title: 'Strip Views', body: 'South-facing units offer direct views of the Las Vegas Strip skyline, while west-facing units capture the Spring Mountains and Red Rock Canyon.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M8 21l4-11 4 11"/><path d="M2 21l5-14 4 8"/><path d="M14 15l4-8 4 14"/><line x1="2" y1="21" x2="22" y2="21"/></svg> },
              { title: 'Pool Deck & Amenities', body: 'Resort-style pool with cabanas and Strip views, fitness center, media room, business center, and resident lounges.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
              { title: '24-Hour Security', body: 'Gated entry, 24-hour concierge and security, valet parking, and controlled building access for resident privacy.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
              { title: 'Strategic Location', body: 'Minutes from the Strip, the Arts District, and Downtown Las Vegas. Easy freeway access via I-15 and US-95.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
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

      <AllureLasVegasFAQ />

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
              { name: 'Sky Las Vegas', href: '/sky-las-vegas/', price: 'From $300K', compare: '45-story tower directly on the Strip with Las Vegas Boulevard frontage.' },
              { name: 'Panorama Towers', href: '/panorama-towers/', price: 'From $300K', compare: 'Twin 33-story towers on the south side of the Strip corridor.' },
              { name: 'Veer Towers', href: '/veer-towers/', price: 'From $400K', compare: 'CityCenter\'s iconic leaning towers with on-Strip location.' },
              { name: 'The Martin', href: '/the-martin/', price: 'From $400K', compare: '45-story luxury tower on the west side of the Strip corridor.' },
              { name: 'The Ogden', href: '/the-ogden/', price: 'From $200K', compare: 'Downtown Las Vegas high-rise with walkable urban living.' },
              { name: 'Juhl', href: '/juhl/', price: 'From $200K', compare: 'Boutique loft-style condos in the downtown Arts District.' },
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
              <h2>Ready to Find Your Allure Las Vegas Home?</h2>
              <p>Nevada Real Estate Group is the #1 real estate team in Nevada. Whether you&apos;re buying or selling in Allure Las Vegas, let&apos;s talk.</p>
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
                <input type="hidden" name="_subject" value="Allure Las Vegas Inquiry — LasVegasHomeSearchExperts.com" />
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
