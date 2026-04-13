import TurnberryTowersFAQ from '@/components/TurnberryTowersFAQ'
import Link from 'next/link'
import type { Metadata } from 'next'
import TurnberryTowersMapWrapper from '@/components/TurnberryTowersMapWrapper'
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
    { '@type': 'ListItem', position: 3, name: 'Turnberry Towers', item: 'https://www.lasvegashomesearchexperts.com/turnberry-towers/' },
  ],
}

const FAQ_DATA = [
  {
    "q": "What is the price range at Turnberry Towers?",
    "a": "Residences range from approximately $400,000 for one-bedroom units on lower floors to over $2.5 million for penthouses and combined units with premium Strip views on upper floors."
  },
  {
    "q": "Do units at Turnberry Towers have balconies?",
    "a": "Yes. Most residences at Turnberry Towers include private balconies, which is a distinguishing feature compared to many other Las Vegas high-rise towers that do not offer outdoor living space."
  },
  {
    "q": "What amenities does Turnberry Towers offer?",
    "a": "Amenities include two resort-style pool decks with cabanas, a full-service spa, tennis courts, a state-of-the-art fitness center, 24-hour concierge and valet, a business center, private dining rooms, and lushly landscaped grounds."
  },
  {
    "q": "Is Turnberry Towers gated?",
    "a": "Yes. Turnberry Towers has a gated entry with 24-hour security, concierge services, and controlled building access for resident privacy."
  },
  {
    "q": "What is the difference between Turnberry Towers and Turnberry Place?",
    "a": "Turnberry Towers (2007-2008) and Turnberry Place (2001-2006) are separate high-rise communities developed by the same Turnberry Associates team. Turnberry Place is a four-tower complex located nearby on Paradise Road, while Turnberry Towers is a twin-tower complex on Karen Avenue. Both are luxury communities."
  },
  {
    "q": "Can you rent out a unit at Turnberry Towers?",
    "a": "Yes. Turnberry Towers allows owners to rent their units. The location near the Convention Center and the Strip drives consistent demand from both long-term tenants and corporate housing clients."
  },
  {
    "q": "What are HOA fees at Turnberry Towers?",
    "a": "HOA fees at Turnberry Towers typically range from $400 to $1,800 per month depending on unit size and floor level. Fees cover building maintenance, concierge, security, pool, spa, fitness center, and common area upkeep."
  },
  {
    "q": "How tall is Turnberry Towers?",
    "a": "Each of the twin towers rises 45 stories, making Turnberry Towers one of the tallest residential high-rise communities in the Las Vegas area."
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
  name: 'Turnberry Towers',
  description: 'Turnberry Towers is a high-rise · luxury · strip-adjacent community in Las Vegas, Nevada.',
  geo: { '@type': 'GeoCoordinates', latitude: 36.125, longitude: -115.152 },
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
  const cms = await getCommunityPage('turnberry-towers')
  return {
    title: cms?.metaTitle ?? 'Turnberry Towers Homes for Sale | Nevada Real Estate Group',
    description: cms?.metaDescription ?? 'Browse Turnberry Towers homes for sale in Las Vegas, NV. $400K–$2.5M+. Schools, HOA, market stats. Nevada Real Estate Group.',
    alternates: { canonical: 'https://www.lasvegashomesearchexperts.com/turnberry-towers' },
  }
}

export default async function TurnberryTowersPage() {
  const cms = await getCommunityPage('turnberry-towers')
  const market = getMarketStats('turnberry-towers')
  const ms = market?.stats

  const heroHeadline = cms?.heroHeadline ?? 'Turnberry Towers'
  const heroSubtitle = 'Homes for Sale in Las Vegas, Nevada'
  const overviewTitle = cms?.overviewTitle ?? 'Turnberry Towers: High-Rise · Luxury · Strip-Adjacent Living in Las Vegas'

  const HARDCODED_STATS: Array<[string, string] | [string, string, string]> = [
    ['Established', '2007'],
    ['Developer', 'Turnberry Associates / Jeffrey Soffer'],
    ['Total Acreage', '~8 acres'],
    ['Homes', '~636'],
    ['Median Home Price', ms?.medianSalePrice ?? '$400K–$2.5M+'],
    ['ZIP Codes', '89109'],
    ['Guard-Gated', 'Yes'],
    ['HOA', '$400–$1,800/mo'],
  ]
  const displayStats = mergeQuickStats(HARDCODED_STATS, cms?.quickStats)
  const HARDCODED_DRIVE_TIMES = [
    {
        "time": "~5 min",
        "destination": "to the Strip",
        "route": "via Karen Ave"
    },
    {
        "time": "~12 min",
        "destination": "to Harry Reid Airport",
        "route": "via Paradise Rd → I-15"
    },
    {
        "time": "~3 min",
        "destination": "to Convention Center",
        "route": "via Karen Ave"
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
          <span>Turnberry Towers</span>
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
                <span className="hero-v2-stat-num">{ms?.medianSalePrice ?? qs('Median Home Price', '$400K–$2.5M+')}</span>
                <span className="hero-v2-stat-lbl">Median Sale Price</span>
              </div>
              <div className="hero-v2-stat">
                <span className="hero-v2-stat-num">{ms?.avgDaysToClose ?? qs('Avg Days on Market', '45')}</span>
                <span className="hero-v2-stat-lbl">Avg Days to Close</span>
              </div>
            </div>
            <a href="#listings" className="hero-v2-cta">Search Homes in Turnberry Towers</a>
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
              <span><strong>Type:</strong> High-Rise · Luxury · Strip-Adjacent</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
              <span><strong>Price Range:</strong> $400K–$2.5M+</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
              <span><strong>HOA:</strong> $400–$1,800/mo</span>
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
            <h2>Turnberry Towers Demographics</h2>
          </div>
          <div className="demo-grid">
            {[
              ['~1,100', 'Population'],
              ['48', 'Median Age'],
              ['$175,000+', 'Avg Household Income'],
              ['~636', 'Total Households'],
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
            <h2>Where is Turnberry Towers?</h2>
            <p>Paradise, Las Vegas &mdash; Las Vegas, Nevada.</p>
          </div>
          <div className="map-container">
            <TurnberryTowersMapWrapper />
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
            <h2 className="listings-title">NEW TURNBERRY TOWERS LISTINGS</h2>
          </div>
          <div className="ylopo-wrap">
            <div className="YLOPO_searchWidget" />
            <div className="YLOPO_resultsWidget" data-search='{"propertyTypes":["house","condo","townhouse"],"minPrice":400000,"locations":[{"city":"Las Vegas","state":"NV"}],"limit":12,"sortBy":"listDate","sortOrder":"desc","keywords":"Turnberry Towers","zipCodes":["89109"]}' />
          </div>
          <p className="ylopo-note">Listing data sourced from regional MLS. Information deemed reliable but not guaranteed. Updated daily.</p>
          <div className="listings-actions">
            <a href="https://search.nevadarealestategroup.net/search?s[orderBy]=sourceCreationDate%2Cdesc&s[page]=1&s[locations][0][city]=Las%20Vegas&s[locations][0][state]=NV&s[keywords]=Turnberry%20Towers" target="_blank" rel="noopener noreferrer" className="btn-gold">View All Turnberry Towers Listings &rarr;</a>
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
                  <p>Turnberry Towers is a twin-tower luxury high-rise condominium community located on Karen Avenue, just east of the Las Vegas Strip and adjacent to the Las Vegas Convention Center. Developed by Turnberry Associates and completed in 2007 and 2008, the two 45-story towers contain approximately 636 residences and offer a resort-caliber living experience that has established Turnberry as one of the most recognizable luxury high-rise brands in Las Vegas.</p>
                  <p>Residences at Turnberry Towers range from approximately $400,000 for one-bedroom units to over $2.5 million for penthouses and combined units with premium Strip views. Floor plans are generous and well-designed, with one-, two-, and three-bedroom configurations featuring high-end finishes, floor-to-ceiling windows, European-style kitchens, and private balconies — a feature that many competing Strip towers do not offer.</p>
                  <p>The community's amenity package is among the most comprehensive of any Las Vegas high-rise. Residents enjoy two resort-style pool decks with private cabanas, a state-of-the-art fitness center with personal training, a full-service spa, tennis courts, a business center, private dining and entertainment rooms, 24-hour concierge and valet, and lushly landscaped grounds that provide a genuine resort atmosphere despite the tower's urban location.</p>
                  <p>Turnberry Towers' location near the Convention Center, the Wynn/Encore resorts, and the Las Vegas Monorail makes it an ideal choice for both primary residents and those who want easy access to Strip entertainment while maintaining a residential feel. The gated entry, mature landscaping, and resort-style grounds create a sense of escape that distinguishes Turnberry Towers from glass-and-steel competitors.</p>
                </>
              )}
            </div>
            <div className="overview-aside">
              <div className="quick-facts">
                <h3>Turnberry Towers At a Glance</h3>
                {displayStats.map(([label, value, cls]: any) => (
                  <div className="fact-row" key={label}>
                    <span className="fact-label">{label}</span>
                    <span className={`fact-value${cls ? ' ' + cls : ''}`}>{value}</span>
                  </div>
                ))}
              </div>
              <div className="cta-card">
                <p>Ready to explore Turnberry Towers? Schedule a private tour of the community and the current listings that match your goals.</p>
                <a href="tel:+17252399950" className="btn-gold">Call 725.239.9950</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="highlights">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Why Turnberry Towers</span>
            <h2>What Makes Turnberry Towers Stand Out</h2>
          </div>
          <div className="highlights-grid">
            {[
              { title: 'Twin 45-Story Towers', body: 'Two 45-story luxury residential towers with approximately 636 residences. One of the tallest and most prominent high-rise communities in the Las Vegas corridor.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><line x1="8" y1="6" x2="8" y2="6.01"/><line x1="12" y1="6" x2="12" y2="6.01"/><line x1="16" y1="6" x2="16" y2="6.01"/><line x1="8" y1="10" x2="8" y2="10.01"/><line x1="12" y1="10" x2="12" y2="10.01"/><line x1="16" y1="10" x2="16" y2="10.01"/><line x1="8" y1="14" x2="8" y2="14.01"/><line x1="12" y1="14" x2="12" y2="14.01"/><line x1="16" y1="14" x2="16" y2="14.01"/></svg> },
              { title: 'Private Balconies', body: 'Most residences include private balconies — a distinguishing feature that many competing Las Vegas high-rise towers do not offer.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
              { title: 'Resort-Style Grounds', body: 'Two pool decks with cabanas, tennis courts, spa, lush landscaping, and expansive outdoor recreation areas create a genuine resort atmosphere.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
              { title: 'Full-Service Spa', body: 'On-site spa with treatment rooms, sauna, and relaxation areas. One of the few Las Vegas residential high-rises with a dedicated full-service spa.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22c4-4 8-7.5 8-12a8 8 0 10-16 0c0 4.5 4 8 8 12z"/><circle cx="12" cy="10" r="3"/></svg> },
              { title: 'Convention Center Adjacent', body: 'Steps from the Las Vegas Convention Center, Wynn/Encore, and the Las Vegas Monorail. Ideal for business professionals and frequent visitors.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
              { title: 'Turnberry Brand Legacy', body: 'Developed by Turnberry Associates, a nationally recognized luxury developer. The Turnberry name carries significant brand recognition in the Las Vegas market.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg> },
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

      <TurnberryTowersFAQ />

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
              { name: 'Turnberry Place', href: '/turnberry-place/', price: 'From $500K', compare: 'The four-tower Turnberry sibling community on Paradise Road with equally luxurious amenities.' },
              { name: 'Veer Towers', href: '/veer-towers/', price: 'From $400K', compare: 'CityCenter\'s iconic leaning towers with on-Strip location.' },
              { name: 'Panorama Towers', href: '/panorama-towers/', price: 'From $300K', compare: 'Strip-adjacent twin towers with a more accessible entry price.' },
              { name: 'The Martin', href: '/the-martin/', price: 'From $400K', compare: '45-story luxury tower on the west side of the Strip corridor.' },
              { name: 'Waldorf Astoria Las Vegas', href: '/waldorf-astoria-las-vegas/', price: 'From $500K', compare: 'Five-star branded residences with hotel services at CityCenter.' },
              { name: 'Sky Las Vegas', href: '/sky-las-vegas/', price: 'From $300K', compare: '45-story tower directly on Las Vegas Boulevard with Strip frontage.' },
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
              <h2>Ready to Find Your Turnberry Towers Home?</h2>
              <p>Nevada Real Estate Group is the #1 real estate team in Nevada. Whether you&apos;re buying or selling in Turnberry Towers, let&apos;s talk.</p>
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
                <input type="hidden" name="_subject" value="Turnberry Towers Inquiry — LasVegasHomeSearchExperts.com" />
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
