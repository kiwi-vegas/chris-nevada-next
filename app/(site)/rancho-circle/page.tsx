import RanchoCircleFAQ from '@/components/RanchoCircleFAQ'
import Link from 'next/link'
import type { Metadata } from 'next'
import RanchoCircleMapWrapper from '@/components/RanchoCircleMapWrapper'
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
    { '@type': 'ListItem', position: 3, name: 'Rancho Circle', item: 'https://www.lasvegashomesearchexperts.com/rancho-circle/' },
  ],
}

const FAQ_DATA = [
  {
    "q": "What is the price range for homes in Rancho Circle?",
    "a": "Homes in Rancho Circle range from approximately $1 million for original mid-century properties requiring renovation to over $8 million for fully updated or rebuilt contemporary estates on premium multi-acre lots."
  },
  {
    "q": "Is Rancho Circle guard-gated?",
    "a": "Yes. Rancho Circle has been a guard-gated community since the 1950s, making it one of the oldest guard-gated residential enclaves in the American West. A 24-hour staffed guard gate controls entry."
  },
  {
    "q": "How big are the lots in Rancho Circle?",
    "a": "Lots in Rancho Circle range from approximately one acre to over five acres, making them the largest residential parcels in central Las Vegas. Many estates include guest houses, equestrian facilities, and resort-style grounds."
  },
  {
    "q": "What is the history of Rancho Circle?",
    "a": "Rancho Circle was established in the 1950s and has been home to Las Vegas casino pioneers, entertainers, business leaders, and prominent families for over seven decades. It is the most historically significant residential community in the city."
  },
  {
    "q": "Can you build a new home in Rancho Circle?",
    "a": "Yes. Many buyers purchase existing properties and do complete ground-up rebuilds on the original multi-acre lots. The community has seen impressive contemporary desert-modern estates built alongside preserved vintage homes."
  },
  {
    "q": "What are HOA fees in Rancho Circle?",
    "a": "HOA fees in Rancho Circle typically range from $250 to $600 per month. Fees cover guard gate staffing, 24-hour security, common area maintenance, and community infrastructure."
  },
  {
    "q": "What ZIP code is Rancho Circle in?",
    "a": "Rancho Circle is located in ZIP code 89107 in central-west Las Vegas, near the intersection of Rancho Drive and Alta Drive."
  },
  {
    "q": "How does Rancho Circle compare to The Ridges?",
    "a": "Rancho Circle offers multi-acre estate lots in a central Las Vegas location with seven decades of history, while The Ridges in Summerlin offers newer construction with Red Rock Canyon views. Rancho Circle provides larger lots and a more established, pastoral character; The Ridges offers a more cohesive contemporary design aesthetic."
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
  name: 'Rancho Circle',
  description: 'Rancho Circle is a guard-gated · historic luxury estates community in Las Vegas, Nevada.',
  geo: { '@type': 'GeoCoordinates', latitude: 36.168, longitude: -115.219 },
  address: { '@type': 'PostalAddress', addressLocality: 'Las Vegas', addressRegion: 'NV', postalCode: '89107', addressCountry: 'US' },
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
  const cms = await getCommunityPage('rancho-circle')
  return {
    title: cms?.metaTitle ?? 'Rancho Circle Homes for Sale | Nevada Real Estate Group',
    description: cms?.metaDescription ?? 'Browse Rancho Circle homes for sale in Las Vegas, NV. $1M–$8M+. Schools, HOA, market stats. Nevada Real Estate Group.',
  }
}

export default async function RanchoCirclePage() {
  const cms = await getCommunityPage('rancho-circle')
  const market = getMarketStats('rancho-circle')
  const ms = market?.stats

  const heroHeadline = cms?.heroHeadline ?? 'Rancho Circle'
  const heroSubtitle = 'Homes for Sale in Las Vegas, Nevada'
  const overviewTitle = cms?.overviewTitle ?? 'Rancho Circle: Guard-Gated · Historic Luxury Estates Living in Las Vegas'

  const HARDCODED_STATS: Array<[string, string] | [string, string, string]> = [
    ['Established', '1950s'],
    ['Developer', 'Various Private Developers'],
    ['Total Acreage', '~400 acres'],
    ['Homes', '~200'],
    ['Median Home Price', ms?.medianSalePrice ?? '$1M–$8M+'],
    ['ZIP Codes', '89107'],
    ['Guard-Gated', 'Yes'],
    ['HOA', '$250–$600/mo'],
  ]
  const displayStats = mergeQuickStats(HARDCODED_STATS, cms?.quickStats)
  const HARDCODED_DRIVE_TIMES = [
    {
        "time": "~10 min",
        "destination": "to the Strip",
        "route": "via Rancho Dr → I-15"
    },
    {
        "time": "~5 min",
        "destination": "to Downtown Las Vegas",
        "route": "via Alta Dr → I-15"
    },
    {
        "time": "~20 min",
        "destination": "to Harry Reid Airport",
        "route": "via I-15 South"
    },
    {
        "time": "~10 min",
        "destination": "to Downtown Summerlin",
        "route": "via W Charleston Blvd"
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
          <span>Rancho Circle</span>
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
                <span className="hero-v2-stat-num">{ms?.medianSalePrice ?? qs('Median Home Price', '$1M–$8M+')}</span>
                <span className="hero-v2-stat-lbl">Median Sale Price</span>
              </div>
              <div className="hero-v2-stat">
                <span className="hero-v2-stat-num">{ms?.avgDaysToClose ?? qs('Avg Days on Market', '45')}</span>
                <span className="hero-v2-stat-lbl">Avg Days to Close</span>
              </div>
            </div>
            <a href="#listings" className="hero-v2-cta">Search Homes in Rancho Circle</a>
          </div>
        </div>
      </header>

      <div className="hero-v2-qfb">
        <div className="container">
          <div className="hero-v2-qfb-row">
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <span><strong>ZIP:</strong> 89107</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              <span><strong>Type:</strong> Guard-Gated · Historic Luxury Estates</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
              <span><strong>Price Range:</strong> $1M–$8M+</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
              <span><strong>HOA:</strong> $250–$600/mo</span>
            </div>
          </div>
          <div className="hero-v2-qfb-est">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            <span>Est. 1950s</span>
          </div>
        </div>
      </div>

      <section id="demographics" className="demographics-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Demographics</span>
            <h2>Rancho Circle Demographics</h2>
          </div>
          <div className="demo-grid">
            {[
              ['~600', 'Population'],
              ['58', 'Median Age'],
              ['$400,000+', 'Avg Household Income'],
              ['~200', 'Total Households'],
              ['92%', 'Homeownership Rate'],
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
            <h2>Where is Rancho Circle?</h2>
            <p>Las Vegas, Nevada &mdash; Las Vegas, Nevada.</p>
          </div>
          <div className="map-container">
            <RanchoCircleMapWrapper />
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
            <h2 className="listings-title">NEW RANCHO CIRCLE LISTINGS</h2>
          </div>
          <div className="ylopo-wrap">
            <div className="YLOPO_searchWidget" />
            <div className="YLOPO_resultsWidget" data-search='{"propertyTypes":["house","condo","townhouse"],"minPrice":900000,"locations":[{"city":"Las Vegas","state":"NV"}],"limit":12,"sortBy":"listDate","sortOrder":"desc","keywords":"Rancho Circle","zipCodes":["89107"]}' />
          </div>
          <p className="ylopo-note">Listing data sourced from regional MLS. Information deemed reliable but not guaranteed. Updated daily.</p>
          <div className="listings-actions">
            <a href="https://search.nevadarealestategroup.net/search?s[orderBy]=sourceCreationDate%2Cdesc&s[page]=1&s[locations][0][city]=Las%20Vegas&s[locations][0][state]=NV&s[keywords]=Rancho%20Circle" target="_blank" rel="noopener noreferrer" className="btn-gold">View All Rancho Circle Listings &rarr;</a>
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
                  <p>Rancho Circle is the most storied and exclusive estate community in Las Vegas. Established in the 1950s, this guard-gated enclave of approximately 200 homes on sprawling multi-acre lots has been home to Las Vegas legends, casino executives, entertainers, and business titans for over seven decades. The community occupies roughly 400 acres near Rancho Drive and Alta Drive, placing it remarkably close to the Las Vegas Strip while maintaining an atmosphere of total seclusion.</p>
                  <p>Lots in Rancho Circle are among the largest in the Las Vegas Valley, with many parcels ranging from one to three acres and some exceeding five acres. The mature landscaping — towering elms, pines, fruit orchards, and manicured lawns — creates an almost pastoral setting that feels worlds removed from the surrounding desert city. Many estates feature guest houses, equestrian facilities, tennis courts, and resort-style pools.</p>
                  <p>Homes range from approximately $1 million for original mid-century properties requiring renovation to well over $8 million for fully updated or rebuilt contemporary estates on premium acreage. The architectural spectrum is wide: original 1950s ranch homes sit alongside Spanish colonial revival estates, French provincial manors, and sleek desert-modern new construction. The community's relaxed architectural guidelines — relative to newer luxury communities — allow considerable creative freedom.</p>
                  <p>Rancho Circle's irreplaceable combination of multi-acre lots, guard-gated privacy, mature estate landscaping, and a location just minutes from the Strip makes it one of the most coveted addresses in Nevada. As available land in central Las Vegas becomes increasingly scarce, the value proposition of a multi-acre estate lot inside a guard-gated community this close to the city's core continues to strengthen. For buyers seeking legacy estate living with deep Las Vegas roots, there is simply nothing else like Rancho Circle.</p>
                </>
              )}
            </div>
            <div className="overview-aside">
              <div className="quick-facts">
                <h3>Rancho Circle At a Glance</h3>
                {displayStats.map(([label, value, cls]: any) => (
                  <div className="fact-row" key={label}>
                    <span className="fact-label">{label}</span>
                    <span className={`fact-value${cls ? ' ' + cls : ''}`}>{value}</span>
                  </div>
                ))}
              </div>
              <div className="cta-card">
                <p>Ready to explore Rancho Circle? Schedule a private tour of the community and the current listings that match your goals.</p>
                <a href="tel:+17252399950" className="btn-gold">Call 725.239.9950</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="highlights">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Why Rancho Circle</span>
            <h2>What Makes Rancho Circle Stand Out</h2>
          </div>
          <div className="highlights-grid">
            {[
              { title: 'Multi-Acre Estate Lots', body: 'Lots ranging from one to five+ acres — the largest residential parcels in central Las Vegas. Room for guest houses, equestrian facilities, orchards, and resort-style grounds.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
              { title: 'Guard-Gated Since the 1950s', body: 'One of the oldest guard-gated communities in the American West. 24-hour staffed entry with a legacy of security and exclusivity spanning seven decades.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
              { title: 'Las Vegas Heritage Address', body: 'Home to casino pioneers, entertainers, and business leaders since the 1950s. Rancho Circle is the most historically significant residential community in Las Vegas.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><line x1="8" y1="6" x2="8" y2="6.01"/><line x1="12" y1="6" x2="12" y2="6.01"/><line x1="16" y1="6" x2="16" y2="6.01"/><line x1="8" y1="10" x2="8" y2="10.01"/><line x1="12" y1="10" x2="12" y2="10.01"/><line x1="16" y1="10" x2="16" y2="10.01"/><line x1="8" y1="14" x2="8" y2="14.01"/><line x1="12" y1="14" x2="12" y2="14.01"/><line x1="16" y1="14" x2="16" y2="14.01"/></svg> },
              { title: 'Minutes from the Strip', body: 'Just 10 minutes from the Las Vegas Strip and Downtown. One of the only multi-acre estate communities with such proximity to world-class entertainment and dining.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M8 21l4-11 4 11"/><path d="M2 21l5-14 4 8"/><path d="M14 15l4-8 4 14"/><line x1="2" y1="21" x2="22" y2="21"/></svg> },
              { title: 'Pastoral Estate Landscaping', body: 'Towering elms, pines, fruit orchards, and manicured lawns create a lush pastoral setting. Decades of mature growth that cannot be replicated in new construction.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22c4-4 8-7.5 8-12a8 8 0 10-16 0c0 4.5 4 8 8 12z"/><circle cx="12" cy="10" r="3"/></svg> },
              { title: 'Irreplaceable Land Value', body: 'Multi-acre guard-gated lots in central Las Vegas are a finite resource. As infill development intensifies, Rancho Circle\'s land value proposition only strengthens.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg> },
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

      <RanchoCircleFAQ />

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
              { name: 'Rancho Bel Air', href: '/rancho-bel-air/', price: 'From $1M', compare: 'Adjacent guard-gated estate community with slightly smaller lots and more accessible price points.' },
              { name: 'Scotch 80s', href: '/scotch-80s/', price: 'From $800K', compare: 'Historic non-gated estate neighborhood near the Strip. Similar vintage character on smaller lots.' },
              { name: 'The Ridges', href: '/summerlin-the-ridges/', price: 'From $2M', compare: 'Summerlin\'s ultra-luxury guard-gated community with Red Rock views. Newer construction, different character.' },
              { name: 'Queensridge', href: '/queensridge/', price: 'From $700K', compare: 'Guard-gated Summerlin-adjacent community with golf course views. More contemporary homes.' },
              { name: 'The Summit Club', href: '/the-summit-club/', price: 'From $5M', compare: 'Las Vegas\' most exclusive private community. Newer construction with Tom Fazio golf.' },
              { name: 'Las Vegas Country Club', href: '/las-vegas-country-club/', price: 'From $500K', compare: 'Historic golf community near the Strip. Similar vintage Las Vegas character.' },
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
              <h2>Ready to Find Your Rancho Circle Home?</h2>
              <p>Nevada Real Estate Group is the #1 real estate team in Nevada. Whether you&apos;re buying or selling in Rancho Circle, let&apos;s talk.</p>
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
                <input type="hidden" name="_subject" value="Rancho Circle Inquiry — LasVegasHomeSearchExperts.com" />
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
