import SummerlinTheCanyonsFAQ from '@/components/SummerlinTheCanyonsFAQ'
import Link from 'next/link'
import type { Metadata } from 'next'
import SummerlinTheCanyonsMapWrapper from '@/components/SummerlinTheCanyonsMapWrapper'
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
    { '@type': 'ListItem', position: 3, name: 'The Canyons', item: 'https://www.lasvegashomesearchexperts.com/summerlin-the-canyons/' },
  ],
}

const FAQ_DATA = [
  {
    "q": "What guard-gated communities are in The Canyons?",
    "a": "The Canyons contains five guard-gated enclaves: Bellacere ($1.5M–$5M+), Eagle Rock ($1M–$4M+), The Palisades ($1M–$4M), Canyon Fairways ($800K–$3M), and Aventura ($800K–$3M+). Each has its own 24-hour staffed guard gate."
  },
  {
    "q": "What is the price range in The Canyons?",
    "a": "The Canyons spans from approximately $500,000 in non-gated neighborhoods to over $4 million in the guard-gated Bellacere enclave. The average home price in The Canyons is approximately $900K–$1.2M."
  },
  {
    "q": "What is Bellacere?",
    "a": "Bellacere is the most exclusive guard-gated enclave within The Canyons village. It features custom and semi-custom estates on large lots, many with Red Rock Canyon views, at price points typically ranging from $1.5 million to over $5 million."
  },
  {
    "q": "Is The Canyons near TPC Summerlin?",
    "a": "Yes — Canyon Fairways, one of The Canyons' guard-gated communities, sits adjacent to TPC Summerlin, the PGA Tour championship course that hosts the annual Shriners Children's Open."
  },
  {
    "q": "What schools serve The Canyons?",
    "a": "The Canyons is zoned for strong CCSD schools including Sig Rogich Middle (10/10) and Palo Verde High (8/10). Private schools including The Meadows School (A+) and Bishop Gorman (A+) are nearby."
  },
  {
    "q": "What are HOA fees in The Canyons?",
    "a": "HOA fees vary significantly across The Canyons. Non-gated neighborhoods pay approximately $100–$200/month. Guard-gated enclaves range from $400 to $800/month, covering guard gate staffing, enhanced security, and premium common area maintenance."
  },
  {
    "q": "Is The Canyons in Summerlin North or South?",
    "a": "The Canyons is part of the Summerlin North Association, located in the northern portion of the Summerlin master plan."
  },
  {
    "q": "Can I start in a non-gated area and move up?",
    "a": "Yes — The Canyons is one of the few Summerlin villages where you can enter in a non-gated neighborhood (from $500K) and later move up to a guard-gated enclave (from $800K–$1.5M+) without changing school zones, neighborhoods, or community familiarity."
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
  name: 'The Canyons',
  description: 'The Canyons is a master-planned · guard-gated · diverse community in Las Vegas, Nevada.',
  geo: { '@type': 'GeoCoordinates', latitude: 36.2, longitude: -115.295 },
  address: { '@type': 'PostalAddress', addressLocality: 'Las Vegas', addressRegion: 'NV', postalCode: '89134', addressCountry: 'US' },
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
  const cms = await getCommunityPage('summerlin-the-canyons')
  return {
    title: cms?.metaTitle ?? 'The Canyons Homes for Sale | Nevada Real Estate Group',
    description: cms?.metaDescription ?? 'Browse The Canyons homes for sale in Las Vegas, NV. $500K–$4M+. Schools, HOA, market stats. Nevada Real Estate Group.',
    alternates: { canonical: 'https://www.lasvegashomesearchexperts.com/summerlin-the-canyons' },
  }
}

export default async function SummerlinTheCanyonsPage() {
  const cms = await getCommunityPage('summerlin-the-canyons')
  const market = getMarketStats('summerlin-the-canyons')
  const ms = market?.stats

  const heroHeadline = cms?.heroHeadline ?? 'The Canyons'
  const heroSubtitle = 'Homes for Sale in Las Vegas, Nevada'
  const overviewTitle = cms?.overviewTitle ?? 'The Canyons: Master-Planned · Guard-Gated · Diverse Living in Las Vegas'

  const HARDCODED_STATS: Array<[string, string] | [string, string, string]> = [
    ['Established', '1996'],
    ['Developer', 'Howard Hughes Corporation'],
    ['Total Acreage', '750 acres'],
    ['Homes', '3,000+'],
    ['Median Home Price', ms?.medianSalePrice ?? '$500K–$4M+'],
    ['ZIP Codes', '89134, 89144'],
    ['Guard-Gated', 'Yes'],
    ['HOA', '$100–$800/mo'],
  ]
  const displayStats = mergeQuickStats(HARDCODED_STATS, cms?.quickStats)
  const HARDCODED_DRIVE_TIMES = [
    {
        "time": "~20 min",
        "destination": "to the Strip",
        "route": "via Summerlin Pkwy → I-15"
    },
    {
        "time": "~15 min",
        "destination": "to Red Rock Canyon",
        "route": "via W Charleston Blvd"
    },
    {
        "time": "~10 min",
        "destination": "to Downtown Summerlin",
        "route": "via Summerlin Pkwy"
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
          <a href="/communities/">Communities</a>
          <span className="breadcrumb-sep">&rsaquo;</span>
          <span>The Canyons</span>
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
                <span className="hero-v2-stat-num">{ms?.medianSalePrice ?? qs('Median Home Price', '$500K–$4M+')}</span>
                <span className="hero-v2-stat-lbl">Median Sale Price</span>
              </div>
              <div className="hero-v2-stat">
                <span className="hero-v2-stat-num">{ms?.avgDaysToClose ?? qs('Avg Days on Market', '45')}</span>
                <span className="hero-v2-stat-lbl">Avg Days to Close</span>
              </div>
            </div>
            <a href="#listings" className="hero-v2-cta">Search Homes in The Canyons</a>
          </div>
        </div>
      </header>

      <div className="hero-v2-qfb">
        <div className="container">
          <div className="hero-v2-qfb-row">
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <span><strong>ZIP:</strong> 89134, 89144</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              <span><strong>Type:</strong> Master-Planned · Guard-Gated · Diverse</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
              <span><strong>Price Range:</strong> $500K–$4M+</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
              <span><strong>HOA:</strong> $100–$800/mo</span>
            </div>
          </div>
          <div className="hero-v2-qfb-est">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            <span>Est. 1996</span>
          </div>
        </div>
      </div>

      <section id="demographics" className="demographics-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Demographics</span>
            <h2>The Canyons Demographics</h2>
          </div>
          <div className="demo-grid">
            {[
              ['8,500+', 'Population'],
              ['43', 'Median Age'],
              ['$165,000+', 'Avg Household Income'],
              ['3,000+', 'Total Households'],
              ['86%', 'Homeownership Rate'],
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
            <h2>Where is The Canyons?</h2>
            <p>Summerlin North, Las Vegas &mdash; Las Vegas, Nevada.</p>
          </div>
          <div className="map-container">
            <SummerlinTheCanyonsMapWrapper />
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
            <h2 className="listings-title">NEW THE CANYONS LISTINGS</h2>
          </div>
          <div className="ylopo-wrap">
            <div className="YLOPO_searchWidget" />
            <div className="YLOPO_resultsWidget" data-search='{"propertyTypes":["house","condo","townhouse"],"minPrice":500000,"locations":[{"city":"Las Vegas","state":"NV"}],"limit":12,"sortBy":"listDate","sortOrder":"desc","keywords":"The Canyons Summerlin","zipCodes":["89134","89144"]}' />
          </div>
          <p className="ylopo-note">Listing data sourced from regional MLS. Information deemed reliable but not guaranteed. Updated daily.</p>
          <div className="listings-actions">
            <a href="https://search.nevadarealestategroup.net/search?s[orderBy]=sourceCreationDate%2Cdesc&s[page]=1&s[locations][0][city]=Las%20Vegas&s[locations][0][state]=NV&s[keywords]=The%20Canyons%20Summerlin" target="_blank" rel="noopener noreferrer" className="btn-gold">View All The Canyons Listings &rarr;</a>
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
                  <p>The Canyons is one of Summerlin's most diverse and dynamic villages, spanning a broad price range from approximately $500,000 to over $4 million. Located in the Summerlin North Association, The Canyons contains several guard-gated luxury enclaves — including Bellacere, Aventura, Canyon Fairways, Eagle Rock, and The Palisades — alongside more accessible non-gated neighborhoods. This unusual breadth makes The Canyons one of the few Summerlin villages where first-time Summerlin buyers and ultra-luxury estate buyers coexist within the same village boundaries.</p>
                  <p>The guard-gated enclaves within The Canyons are the village's most distinctive feature. Bellacere is the most exclusive, with custom and semi-custom estates ranging from $1.5 million to over $5 million on large lots with Red Rock Canyon views. Eagle Rock and The Palisades offer guard-gated luxury in the $1 million to $4 million range, while Canyon Fairways combines guard-gated living with TPC Summerlin golf course proximity. Aventura rounds out the luxury options with semi-custom homes from $800,000 to $3 million.</p>
                  <p>The non-gated neighborhoods of The Canyons offer excellent value — established homes with mature landscaping and the same strong school zoning as the guard-gated enclaves. For families who want the Summerlin North location and school assignments without the premium of a guard-gated address, these neighborhoods represent some of the best values in Summerlin.</p>
                  <p>The Canyons' location provides excellent freeway access via the 215 Beltway and Summerlin Parkway, putting the Strip approximately 20 minutes away and Downtown Summerlin approximately 10 minutes away. The village is also adjacent to the Summerlin trail network, offering connected hiking and biking access toward Red Rock Canyon. For buyers who want optionality — the ability to start in a non-gated neighborhood and potentially move up to a guard-gated enclave within the same village — The Canyons offers a rare path.</p>
                </>
              )}
            </div>
            <div className="overview-aside">
              <div className="quick-facts">
                <h3>The Canyons At a Glance</h3>
                {displayStats.map(([label, value, cls]: any) => (
                  <div className="fact-row" key={label}>
                    <span className="fact-label">{label}</span>
                    <span className={`fact-value${cls ? ' ' + cls : ''}`}>{value}</span>
                  </div>
                ))}
              </div>
              <div className="cta-card">
                <p>Ready to explore The Canyons? Schedule a private tour of the community and the current listings that match your goals.</p>
                <a href="tel:+17252399950" className="btn-gold">Call 725.239.9950</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="highlights">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Why The Canyons</span>
            <h2>What Makes The Canyons Stand Out</h2>
          </div>
          <div className="highlights-grid">
            {[
              { title: '5 Guard-Gated Enclaves', body: 'Bellacere, Eagle Rock, The Palisades, Canyon Fairways, and Aventura — five distinct guard-gated communities within one village, each with unique character and price range.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
              { title: 'Broadest Price Range', body: 'From $500K in non-gated neighborhoods to $4M+ in Bellacere. One of the only Summerlin villages that serves entry buyers and ultra-luxury buyers in the same community.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg> },
              { title: 'TPC Golf Proximity', body: 'Canyon Fairways offers guard-gated living adjacent to TPC Summerlin, home of the PGA Tour\'s Shriners Children\'s Open.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 2v10l7 4"/></svg> },
              { title: 'Strong School Zoning', body: 'Excellent CCSD school assignments serving all neighborhoods within The Canyons. Top private schools including The Meadows School are nearby.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M4 19.5A2.5 2.5 0 006.5 22H20V2H6.5A2.5 2.5 0 004 4.5v15z"/></svg> },
              { title: 'Trail-Connected Location', body: 'Adjacent to Summerlin\'s 200+ mile trail network with connections to Red Rock Canyon hiking routes. Community parks and green spaces throughout.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22c4-4 8-7.5 8-12a8 8 0 10-16 0c0 4.5 4 8 8 12z"/><circle cx="12" cy="10" r="3"/></svg> },
              { title: 'Move-Up Potential', body: 'Start in a non-gated neighborhood and move up to a guard-gated enclave without leaving the village, the school zone, or the neighborhood you know.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
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

      <SummerlinTheCanyonsFAQ />

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
              { name: 'Summerlin', href: '/summerlin/', price: 'From $450K', compare: 'The broader master-planned community with 20+ villages.' },
              { name: 'The Arbors', href: '/summerlin-the-arbors/', price: 'From $450K', compare: 'Adjacent established Summerlin North village. Similar non-gated pricing with mature character.' },
              { name: 'The Hills', href: '/summerlin-the-hills/', price: 'From $500K', compare: 'Summerlin North village with the guard-gated Mountain Trails enclave.' },
              { name: 'The Ridges', href: '/summerlin-the-ridges/', price: 'From $2M', compare: 'Summerlin\'s ultra-luxury community. A tier above even Bellacere in pricing and exclusivity.' },
              { name: 'Red Rock Country Club', href: '/red-rock-country-club/', price: 'From $1.2M', compare: 'Guard-gated golf community. Two Arnold Palmer courses. Comparable to Canyon Fairways pricing.' },
              { name: 'The Trails', href: '/summerlin-the-trails/', price: 'From $500K', compare: 'Another Summerlin North village with a guard-gated enclave (Country Rose Estates).' },
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
              <h2>Ready to Find Your The Canyons Home?</h2>
              <p>Nevada Real Estate Group is the #1 real estate team in Nevada. Whether you&apos;re buying or selling in The Canyons, let&apos;s talk.</p>
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
                <input type="hidden" name="_subject" value="The Canyons Inquiry — LasVegasHomeSearchExperts.com" />
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
