import SummerlinStonebridgeFAQ from '@/components/SummerlinStonebridgeFAQ'
import Link from 'next/link'
import type { Metadata } from 'next'
import SummerlinStonebridgeMapWrapper from '@/components/SummerlinStonebridgeMapWrapper'
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
    { '@type': 'ListItem', position: 3, name: 'Stonebridge', item: 'https://www.lasvegashomesearchexperts.com/summerlin-stonebridge/' },
  ],
}

const FAQ_DATA = [
  {
    "q": "Is Stonebridge new construction?",
    "a": "Yes — Stonebridge is Summerlin's most actively developing village with multiple national builders (Toll Brothers, Taylor Morrison, Lennar, Shea Homes) currently building new homes. Development began in 2017 and continues actively."
  },
  {
    "q": "What is Heritage at Stonebridge?",
    "a": "Heritage at Stonebridge is a Toll Brothers guard-gated 55+ active adult community within the Stonebridge village. It features single-story homes, a private clubhouse with resort pool, and organized social activities."
  },
  {
    "q": "What is the price range in Stonebridge?",
    "a": "Homes in Stonebridge range from approximately $550,000 for entry-level floor plans and Heritage at Stonebridge homes to over $1 million for Toll Brothers' premium collections with mountain views."
  },
  {
    "q": "Is Stonebridge guard-gated?",
    "a": "The broader Stonebridge village is gated (key-fob access) but not guard-gated. Heritage at Stonebridge, the 55+ section, is guard-gated with a 24-hour staffed guard gate."
  },
  {
    "q": "What views are available in Stonebridge?",
    "a": "Stonebridge offers dramatic Spring Mountain and Red Rock Canyon views from many homes, particularly those on the western edge of the village. Sunset views from Stonebridge are widely considered the best residential views in Las Vegas."
  },
  {
    "q": "How close is Stonebridge to Red Rock Canyon?",
    "a": "Red Rock Canyon National Conservation Area is approximately 5 minutes from Stonebridge. The Summerlin trail system connects Stonebridge directly to Red Rock Canyon hiking and biking routes."
  },
  {
    "q": "What are HOA fees in Stonebridge?",
    "a": "HOA fees in Stonebridge range from approximately $100 to $350 per month depending on the specific builder and neighborhood. Heritage at Stonebridge 55+ fees are higher due to guard gate staffing and enhanced amenities."
  },
  {
    "q": "What schools serve Stonebridge?",
    "a": "Stonebridge is zoned for strong CCSD schools including Bonner Elementary (9/10), Sig Rogich Middle School (10/10), and Palo Verde High School (8/10)."
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
  name: 'Stonebridge',
  description: 'Stonebridge is a master-planned · new construction · 55+ community in Las Vegas, Nevada.',
  geo: { '@type': 'GeoCoordinates', latitude: 36.185, longitude: -115.325 },
  address: { '@type': 'PostalAddress', addressLocality: 'Las Vegas', addressRegion: 'NV', postalCode: '89138', addressCountry: 'US' },
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
  const cms = await getCommunityPage('summerlin-stonebridge')
  return {
    title: cms?.metaTitle ?? 'Stonebridge Homes for Sale | Nevada Real Estate Group',
    description: cms?.metaDescription ?? 'Browse Stonebridge homes for sale in Las Vegas, NV. $550K–$1M. Schools, HOA, market stats. Nevada Real Estate Group.',
  }
}

export default async function SummerlinStonebridgePage() {
  const cms = await getCommunityPage('summerlin-stonebridge')
  const market = getMarketStats('summerlin-stonebridge')
  const ms = market?.stats

  const heroHeadline = cms?.heroHeadline ?? 'Stonebridge'
  const heroSubtitle = 'Homes for Sale in Las Vegas, Nevada'
  const overviewTitle = cms?.overviewTitle ?? 'Stonebridge: Master-Planned · New Construction · 55+ Living in Las Vegas'

  const HARDCODED_STATS: Array<[string, string] | [string, string, string]> = [
    ['Established', '2017'],
    ['Developer', 'Howard Hughes Corporation'],
    ['Total Acreage', '500 acres'],
    ['Homes', '3,000+'],
    ['Median Home Price', ms?.medianSalePrice ?? '$550K–$1M'],
    ['ZIP Codes', '89138'],
    ['Guard-Gated', 'No'],
    ['HOA', '$100–$350/mo'],
  ]
  const displayStats = mergeQuickStats(HARDCODED_STATS, cms?.quickStats)
  const HARDCODED_DRIVE_TIMES = [
    {
        "time": "~25 min",
        "destination": "to the Strip",
        "route": "via Summerlin Pkwy → I-15"
    },
    {
        "time": "~5 min",
        "destination": "to Red Rock Canyon",
        "route": "via W Charleston Blvd"
    },
    {
        "time": "~10 min",
        "destination": "to Downtown Summerlin",
        "route": "via Summerlin Pkwy"
    },
    {
        "time": "~35 min",
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
          <a href="/#communities">Communities</a>
          <span className="breadcrumb-sep">&rsaquo;</span>
          <span>Stonebridge</span>
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
                <span className="hero-v2-stat-num">{ms?.medianSalePrice ?? qs('Median Home Price', '$550K–$1M')}</span>
                <span className="hero-v2-stat-lbl">Median Sale Price</span>
              </div>
              <div className="hero-v2-stat">
                <span className="hero-v2-stat-num">{ms?.avgDaysToClose ?? qs('Avg Days on Market', '45')}</span>
                <span className="hero-v2-stat-lbl">Avg Days to Close</span>
              </div>
            </div>
            <a href="#listings" className="hero-v2-cta">Search Homes in Stonebridge</a>
          </div>
        </div>
      </header>

      <div className="hero-v2-qfb">
        <div className="container">
          <div className="hero-v2-qfb-row">
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <span><strong>ZIP:</strong> 89138</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              <span><strong>Type:</strong> Master-Planned · New Construction · 55+</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
              <span><strong>Price Range:</strong> $550K–$1M</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
              <span><strong>HOA:</strong> $100–$350/mo</span>
            </div>
          </div>
          <div className="hero-v2-qfb-est">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            <span>Est. 2017</span>
          </div>
        </div>
      </div>

      <section id="demographics" className="demographics-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Demographics</span>
            <h2>Stonebridge Demographics</h2>
          </div>
          <div className="demo-grid">
            {[
              ['8,000+', 'Population'],
              ['38', 'Median Age'],
              ['$150,000+', 'Avg Household Income'],
              ['3,000+', 'Total Households'],
              ['85%', 'Homeownership Rate'],
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
            <h2>Where is Stonebridge?</h2>
            <p>Summerlin West, Las Vegas &mdash; Las Vegas, Nevada.</p>
          </div>
          <div className="map-container">
            <SummerlinStonebridgeMapWrapper />
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
            <h2 className="listings-title">NEW STONEBRIDGE LISTINGS</h2>
          </div>
          <div className="ylopo-wrap">
            <div className="YLOPO_searchWidget" />
            <div className="YLOPO_resultsWidget" data-search='{"propertyTypes":["house","condo","townhouse"],"minPrice":550000,"locations":[{"city":"Las Vegas","state":"NV"}],"limit":12,"sortBy":"listDate","sortOrder":"desc","keywords":"Stonebridge Summerlin","zipCodes":["89138"]}' />
          </div>
          <p className="ylopo-note">Listing data sourced from regional MLS. Information deemed reliable but not guaranteed. Updated daily.</p>
          <div className="listings-actions">
            <a href="https://search.nevadarealestategroup.net/search?s[orderBy]=sourceCreationDate%2Cdesc&s[page]=1&s[locations][0][city]=Las%20Vegas&s[locations][0][state]=NV&s[keywords]=Stonebridge%20Summerlin" target="_blank" rel="noopener noreferrer" className="btn-gold">View All Stonebridge Listings &rarr;</a>
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
                  <p>Stonebridge is Summerlin's newest and most actively developing major village, located in the Summerlin West Association at the western edge of the master plan. Launched in 2017, Stonebridge has quickly become one of the most popular neighborhoods in the entire Las Vegas Valley, attracting families, move-up buyers, and active adults with contemporary architecture, dramatic Spring Mountain views, and direct connectivity to Red Rock Canyon through the Summerlin trail system.</p>
                  <p>Homes in Stonebridge range from approximately $550,000 to over $1 million, with most falling in the $650K–$850K range. Multiple national builders — including Toll Brothers, Taylor Morrison, Lennar, and Shea Homes — are actively building in Stonebridge, offering floor plans from 2,000 to 5,000+ square feet. The architectural style is distinctly contemporary — clean lines, neutral palettes, open floor plans, and large windows designed to frame the mountain views that define the village's character.</p>
                  <p>Stonebridge also includes Heritage at Stonebridge, a Toll Brothers age-qualified (55+) guard-gated community that adds a distinct active adult component to the village. Heritage at Stonebridge features single-story homes, a private clubhouse, and resort-style amenities — giving active adult buyers an option within the newest part of Summerlin.</p>
                  <p>The defining feature of Stonebridge is its position at the base of the Spring Mountains. The western edge of the village provides some of the most dramatic residential mountain views in the Las Vegas Valley, with sunset vistas that are widely considered the best in the region. The Summerlin trail system runs through and around Stonebridge, connecting residents to hiking and biking routes that extend into Red Rock Canyon — a genuine outdoor lifestyle amenity that sets Stonebridge apart from every other major village in Summerlin.</p>
                </>
              )}
            </div>
            <div className="overview-aside">
              <div className="quick-facts">
                <h3>Stonebridge At a Glance</h3>
                {displayStats.map(([label, value, cls]: any) => (
                  <div className="fact-row" key={label}>
                    <span className="fact-label">{label}</span>
                    <span className={`fact-value${cls ? ' ' + cls : ''}`}>{value}</span>
                  </div>
                ))}
              </div>
              <div className="cta-card">
                <p>Ready to explore Stonebridge? Schedule a private tour of the community and the current listings that match your goals.</p>
                <a href="tel:+17252399950" className="btn-gold">Call 725.239.9950</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="highlights">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Why Stonebridge</span>
            <h2>What Makes Stonebridge Stand Out</h2>
          </div>
          <div className="highlights-grid">
            {[
              { title: 'Dramatic Mountain Views', body: 'Positioned at the base of the Spring Mountains, Stonebridge offers some of the most spectacular residential mountain and sunset views in the Las Vegas Valley.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M8 21l4-11 4 11"/><path d="M2 21l5-14 4 8"/><path d="M14 15l4-8 4 14"/><line x1="2" y1="21" x2="22" y2="21"/></svg> },
              { title: 'Active New Construction', body: 'Multiple national builders — Toll Brothers, Taylor Morrison, Lennar, Shea Homes — are actively building with the newest designs and smart home technology available in Summerlin.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
              { title: 'Red Rock Canyon Trails', body: 'The Summerlin trail system connects Stonebridge directly to Red Rock Canyon hiking and biking routes. Outdoor access is a daily reality, not a weekend activity.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22c4-4 8-7.5 8-12a8 8 0 10-16 0c0 4.5 4 8 8 12z"/><circle cx="12" cy="10" r="3"/></svg> },
              { title: 'Heritage at Stonebridge (55+)', body: 'A Toll Brothers guard-gated 55+ community within the village. Private clubhouse, resort pool, and single-story homes for active adult buyers.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><line x1="8" y1="6" x2="8" y2="6.01"/><line x1="12" y1="6" x2="12" y2="6.01"/><line x1="16" y1="6" x2="16" y2="6.01"/><line x1="8" y1="10" x2="8" y2="10.01"/><line x1="12" y1="10" x2="12" y2="10.01"/><line x1="16" y1="10" x2="16" y2="10.01"/><line x1="8" y1="14" x2="8" y2="14.01"/><line x1="12" y1="14" x2="12" y2="14.01"/><line x1="16" y1="14" x2="16" y2="14.01"/></svg> },
              { title: 'Contemporary Architecture', body: 'The newest architectural style in Summerlin — clean lines, neutral palettes, open floor plans, and oversized windows designed to capture mountain views.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
              { title: 'Built-In Scarcity', body: 'Stonebridge is part of Summerlin\'s final westward expansion. Red Rock Canyon to the west means no more land — once built out, new Summerlin construction ends.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg> },
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

      <SummerlinStonebridgeFAQ />

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
              { name: 'Summerlin', href: '/summerlin/', price: 'From $450K', compare: 'The broader master-planned community. 22,500 acres, 20+ villages.' },
              { name: 'Summerlin West', href: '/summerlin-west/', price: 'From $500K', compare: 'The broader Summerlin West area including Stonebridge, Reverence, and Redpoint.' },
              { name: 'La Madre Peaks', href: '/summerlin-la-madre-peaks/', price: 'From $800K', compare: 'Summerlin West\'s luxury village. Higher price points, custom lots, dramatic canyon views.' },
              { name: 'Carlisle Peak', href: '/carlisle-peak/', price: 'From $1.55M', compare: 'Guard-gated luxury new construction in Grand Park village. Significantly higher price points.' },
              { name: 'The Paseos', href: '/summerlin-the-paseos/', price: 'From $550K', compare: 'Summerlin\'s family-focused village with Fox Hill Park. More established, similar price range.' },
              { name: 'Siena', href: '/summerlin-siena/', price: 'From $400K', compare: 'Guard-gated 55+ community in Summerlin South. Heritage at Stonebridge offers a newer 55+ alternative.' },
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
              <h2>Ready to Find Your Stonebridge Home?</h2>
              <p>Nevada Real Estate Group is the #1 real estate team in Nevada. Whether you&apos;re buying or selling in Stonebridge, let&apos;s talk.</p>
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
                <input type="hidden" name="_subject" value="Stonebridge Inquiry — LasVegasHomeSearchExperts.com" />
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
