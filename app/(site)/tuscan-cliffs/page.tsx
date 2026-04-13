import TuscanCliffsFAQ from '@/components/TuscanCliffsFAQ'
import Link from 'next/link'
import type { Metadata } from 'next'
import TuscanCliffsMapWrapper from '@/components/TuscanCliffsMapWrapper'
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
    { '@type': 'ListItem', position: 3, name: 'Tuscan Cliffs', item: 'https://www.lasvegashomesearchexperts.com/tuscan-cliffs/' },
  ],
}

const FAQ_DATA = [
  {
    "q": "What is the price range for homes in Tuscan Cliffs?",
    "a": "Homes in Tuscan Cliffs range from approximately $800,000 for resale homes to over $3 million for premium golf course and ridgeline properties with panoramic views."
  },
  {
    "q": "Is Tuscan Cliffs guard-gated?",
    "a": "Yes — Tuscan Cliffs is double guard-gated within the Southern Highlands master plan. The community has its own staffed guard gate, and the broader Southern Highlands community also has guard-gated entry points."
  },
  {
    "q": "What style of homes are in Tuscan Cliffs?",
    "a": "Tuscan Cliffs features predominantly Mediterranean and Tuscan-inspired architecture — stucco exteriors, clay tile roofs, arched entryways, stone accents, and courtyard entries. Homes typically range from 3,000 to 7,000 square feet."
  },
  {
    "q": "What ZIP code is Tuscan Cliffs in?",
    "a": "Tuscan Cliffs is located in ZIP code 89141 in the Southern Highlands area of Las Vegas, Nevada."
  },
  {
    "q": "How does Tuscan Cliffs compare to Olympia Ridge?",
    "a": "Both are guard-gated enclaves within Southern Highlands. Olympia Ridge is more exclusive with higher price points ($1.5M–$5M+) and more direct golf course frontage. Tuscan Cliffs offers a more accessible entry at $800K with the same double guard-gated security and proximity to the golf club."
  },
  {
    "q": "What are HOA fees in Tuscan Cliffs?",
    "a": "HOA fees in Tuscan Cliffs typically range from $250 to $600 per month, which includes the Southern Highlands master association fee plus the Tuscan Cliffs sub-association fee covering guard gate staffing, security, and common area maintenance."
  },
  {
    "q": "Is there a golf course in Tuscan Cliffs?",
    "a": "Tuscan Cliffs is adjacent to the Southern Highlands Golf Club, a private championship course redesigned by Jack Nicklaus. Several Tuscan Cliffs homes have direct golf course views. Membership is available by application."
  },
  {
    "q": "Are there views from Tuscan Cliffs homes?",
    "a": "Yes — Tuscan Cliffs sits on elevated terrain within Southern Highlands. Many homes feature panoramic views of the Las Vegas Valley, the Strip skyline, the Spring Mountains, and the Southern Highlands Golf Club fairways."
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
  name: 'Tuscan Cliffs',
  description: 'Tuscan Cliffs is a guard-gated · luxury community in Las Vegas, Nevada.',
  geo: { '@type': 'GeoCoordinates', latitude: 35.978, longitude: -115.188 },
  address: { '@type': 'PostalAddress', addressLocality: 'Las Vegas', addressRegion: 'NV', postalCode: '89141', addressCountry: 'US' },
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
  const cms = await getCommunityPage('tuscan-cliffs')
  return {
    title: cms?.metaTitle ?? 'Tuscan Cliffs Homes for Sale | Nevada Real Estate Group',
    description: cms?.metaDescription ?? 'Browse Tuscan Cliffs homes for sale in Las Vegas, NV. $800K–$3M. Schools, HOA, market stats. Nevada Real Estate Group.',
  }
}

export default async function TuscanCliffsPage() {
  const cms = await getCommunityPage('tuscan-cliffs')
  const market = getMarketStats('tuscan-cliffs')
  const ms = market?.stats

  const heroHeadline = cms?.heroHeadline ?? 'Tuscan Cliffs'
  const heroSubtitle = 'Homes for Sale in Las Vegas, Nevada'
  const overviewTitle = cms?.overviewTitle ?? 'Tuscan Cliffs: Guard-Gated · Luxury Living in Las Vegas'

  const HARDCODED_STATS: Array<[string, string] | [string, string, string]> = [
    ['Established', '2005'],
    ['Developer', 'Olympia Group'],
    ['Total Acreage', '160 acres'],
    ['Homes', '400+'],
    ['Median Home Price', ms?.medianSalePrice ?? '$800K–$3M'],
    ['ZIP Codes', '89141'],
    ['Guard-Gated', 'Yes'],
    ['HOA', '$250–$600/mo'],
  ]
  const displayStats = mergeQuickStats(HARDCODED_STATS, cms?.quickStats)
  const HARDCODED_DRIVE_TIMES = [
    {
        "time": "~20 min",
        "destination": "to the Strip",
        "route": "via I-15 N"
    },
    {
        "time": "~15 min",
        "destination": "to Harry Reid Airport",
        "route": "via I-15 N → I-215 W"
    },
    {
        "time": "~15 min",
        "destination": "to Henderson",
        "route": "via I-215 E"
    },
    {
        "time": "~35 min",
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
          <a href="/#communities">Communities</a>
          <span className="breadcrumb-sep">&rsaquo;</span>
          <span>Tuscan Cliffs</span>
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
            <a href="#listings" className="hero-v2-cta">Search Homes in Tuscan Cliffs</a>
          </div>
        </div>
      </header>

      <div className="hero-v2-qfb">
        <div className="container">
          <div className="hero-v2-qfb-row">
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <span><strong>ZIP:</strong> 89141</span>
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
            <span>Est. 2005</span>
          </div>
        </div>
      </div>

      <section id="demographics" className="demographics-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Demographics</span>
            <h2>Tuscan Cliffs Demographics</h2>
          </div>
          <div className="demo-grid">
            {[
              ['1,200+', 'Population'],
              ['46', 'Median Age'],
              ['$225,000+', 'Avg Household Income'],
              ['400+', 'Total Households'],
              ['91%', 'Homeownership Rate'],
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
            <h2>Where is Tuscan Cliffs?</h2>
            <p>Southern Highlands, Las Vegas &mdash; Las Vegas, Nevada.</p>
          </div>
          <div className="map-container">
            <TuscanCliffsMapWrapper />
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
            <h2 className="listings-title">NEW TUSCAN CLIFFS LISTINGS</h2>
          </div>
          <div className="ylopo-wrap">
            <div className="YLOPO_searchWidget" />
            <div className="YLOPO_resultsWidget" data-search='{"propertyTypes":["house","condo","townhouse"],"minPrice":800000,"locations":[{"city":"Las Vegas","state":"NV"}],"limit":12,"sortBy":"listDate","sortOrder":"desc","keywords":"Tuscan Cliffs","zipCodes":["89141"]}' />
          </div>
          <p className="ylopo-note">Listing data sourced from regional MLS. Information deemed reliable but not guaranteed. Updated daily.</p>
          <div className="listings-actions">
            <a href="https://search.nevadarealestategroup.net/search?s[orderBy]=sourceCreationDate%2Cdesc&s[page]=1&s[locations][0][city]=Las%20Vegas&s[locations][0][state]=NV&s[keywords]=Tuscan%20Cliffs" target="_blank" rel="noopener noreferrer" className="btn-gold">View All Tuscan Cliffs Listings &rarr;</a>
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
                  <p>Tuscan Cliffs is one of the most popular guard-gated enclaves within Southern Highlands, offering Mediterranean and Tuscan-inspired luxury homes at price points more accessible than the community's ultra-luxury addresses. The community sits on elevated terrain within Southern Highlands, providing many homes with panoramic views of the Las Vegas Valley, the Spring Mountains, and the fairways of the adjacent Southern Highlands Golf Club.</p>
                  <p>Homes in Tuscan Cliffs range from approximately $800,000 for resale homes to over $3 million for premium golf course and ridgeline properties. The architectural character is distinctly Mediterranean — stucco exteriors, clay tile roofs, arched entryways, and stone accents create a cohesive Tuscan aesthetic throughout the community. Homes typically range from 3,000 to 7,000 square feet, with many featuring courtyard entries, wine rooms, and expansive covered patios.</p>
                  <p>The guard gate at Tuscan Cliffs provides an additional layer of security within the already guard-gated Southern Highlands master plan. This double-gated configuration, combined with the community's elevated position and manicured streetscapes, creates a sense of exclusivity that attracts professionals, executives, and families relocating from coastal California markets where comparable quality would command significantly higher prices.</p>
                  <p>Tuscan Cliffs occupies a strategic position in the Southern Highlands pricing hierarchy — more attainable than The Estates or Olympia Ridge, but with the same double guard-gated security, golf club proximity, and airport convenience that define Southern Highlands' premium enclaves. For buyers seeking guard-gated luxury in the south valley without the $2M+ entry point of the top-tier communities, Tuscan Cliffs represents one of the strongest value propositions in Las Vegas.</p>
                </>
              )}
            </div>
            <div className="overview-aside">
              <div className="quick-facts">
                <h3>Tuscan Cliffs At a Glance</h3>
                {displayStats.map(([label, value, cls]: any) => (
                  <div className="fact-row" key={label}>
                    <span className="fact-label">{label}</span>
                    <span className={`fact-value${cls ? ' ' + cls : ''}`}>{value}</span>
                  </div>
                ))}
              </div>
              <div className="cta-card">
                <p>Ready to explore Tuscan Cliffs? Schedule a private tour of the community and the current listings that match your goals.</p>
                <a href="tel:+17252399950" className="btn-gold">Call 725.239.9950</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="highlights">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Why Tuscan Cliffs</span>
            <h2>What Makes Tuscan Cliffs Stand Out</h2>
          </div>
          <div className="highlights-grid">
            {[
              { title: 'Mediterranean Architecture', body: 'Cohesive Tuscan-inspired design throughout — stucco facades, clay tile roofs, stone accents, and courtyard entries create a distinguished Mediterranean village aesthetic.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
              { title: 'Double Guard-Gated', body: 'Protected by its own 24-hour staffed guard gate within the already guard-gated Southern Highlands. Two layers of security for genuine privacy and peace of mind.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
              { title: 'Elevated Valley Views', body: 'Positioned on elevated terrain within Southern Highlands. Many homes enjoy panoramic views of the Las Vegas Valley, Strip skyline, and the Spring Mountains.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M8 21l4-11 4 11"/><path d="M2 21l5-14 4 8"/><path d="M14 15l4-8 4 14"/><line x1="2" y1="21" x2="22" y2="21"/></svg> },
              { title: 'Golf Club Proximity', body: 'Adjacent to the Southern Highlands Golf Club (Jack Nicklaus redesign). Several homes have direct golf course views. Club membership available to residents.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 2v10l7 4"/></svg> },
              { title: 'Top-Rated Schools Nearby', body: 'Zoned for strong CCSD schools including Liberty High School. Private options including Faith Lutheran and Bishop Gorman are within 15 minutes.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M4 19.5A2.5 2.5 0 006.5 22H20V2H6.5A2.5 2.5 0 004 4.5v15z"/></svg> },
              { title: 'Accessible Luxury Pricing', body: 'Guard-gated luxury living starting around $800K — approximately 40-60% less than comparable quality in Summerlin\'s ultra-luxury communities like The Ridges.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg> },
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

      <TuscanCliffsFAQ />

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
              { name: 'Southern Highlands', href: '/southern-highlands/', price: 'From $500K', compare: 'The broader master-planned community. Guard-gated with private golf club and multiple enclaves.' },
              { name: 'The Estates at Southern Highlands', href: '/southern-highlands-the-estates/', price: 'From $2M', compare: 'Southern Highlands\' premier custom estate enclave with the largest lots.' },
              { name: 'Olympia Ridge', href: '/olympia-ridge/', price: 'From $1.5M', compare: 'Ultra-luxury guard-gated enclave with direct Nicklaus golf frontage.' },
              { name: 'Mountains Edge', href: '/mountains-edge/', price: 'From $400K', compare: 'Large master-planned community nearby with more accessible pricing and family focus.' },
              { name: 'Rhodes Ranch', href: '/rhodes-ranch/', price: 'From $400K', compare: 'Guard-gated golf community with a broader price range in southwest Las Vegas.' },
              { name: 'Seven Hills', href: '/seven-hills/', price: 'From $500K', compare: 'Henderson\'s elevated luxury community with Rio Secco Golf Club and city views.' },
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
              <h2>Ready to Find Your Tuscan Cliffs Home?</h2>
              <p>Nevada Real Estate Group is the #1 real estate team in Nevada. Whether you&apos;re buying or selling in Tuscan Cliffs, let&apos;s talk.</p>
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
                <input type="hidden" name="_subject" value="Tuscan Cliffs Inquiry — LasVegasHomeSearchExperts.com" />
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
