import InspiradaNevadaTrailsFAQ from '@/components/InspiradaNevadaTrailsFAQ'
import Link from 'next/link'
import type { Metadata } from 'next'
import InspiradaNevadaTrailsMapWrapper from '@/components/InspiradaNevadaTrailsMapWrapper'
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
    { '@type': 'ListItem', position: 3, name: 'Nevada Trails at Inspirada', item: 'https://www.lasvegashomesearchexperts.com/inspirada-nevada-trails/' },
  ],
}

const FAQ_DATA = [
  {
    "q": "What is the price range for homes in Nevada Trails at Inspirada?",
    "a": "Homes in Nevada Trails range from approximately $450,000 for smaller resale homes to $700,000 for larger trail-adjacent and plaza-walk properties."
  },
  {
    "q": "What makes Nevada Trails different from other Inspirada neighborhoods?",
    "a": "Nevada Trails is defined by its extensive trail connectivity — homes along dedicated walking and biking paths with direct connections to Inspirada's plazas, parks, and gathering spaces. It is also one of the most established sections with mature landscaping."
  },
  {
    "q": "Is Nevada Trails guard-gated?",
    "a": "No — Nevada Trails is part of the open Inspirada master plan with HOA governance. There are no guard gates."
  },
  {
    "q": "What ZIP code is Nevada Trails in?",
    "a": "Nevada Trails at Inspirada is located in ZIP code 89044 in southern Henderson."
  },
  {
    "q": "What are HOA fees in Nevada Trails?",
    "a": "HOA fees typically range from $100 to $225 per month, covering access to Inspirada's parks, pools, plazas, trail maintenance, and community programming."
  },
  {
    "q": "What schools serve Nevada Trails?",
    "a": "Nevada Trails is served by CCSD schools including Dean Allen Elementary (7/10) and Del E. Webb Middle School (7/10). Pinecrest Academy Inspirada (9/10) is a popular charter option within the community."
  },
  {
    "q": "Is Nevada Trails walkable?",
    "a": "Yes — the trail network connects Nevada Trails to parks, plazas, schools, and the commercial district along St. Rose Parkway. Many residents walk or bike to community amenities and events."
  },
  {
    "q": "How does Nevada Trails compare to Cadence?",
    "a": "Nevada Trails offers a more established neighborhood with mature landscaping, while Cadence has more active new construction. Both are excellent Henderson master-planned communities with strong amenity packages."
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
  name: 'Nevada Trails at Inspirada',
  description: 'Nevada Trails at Inspirada is a master-planned · family community in Henderson, Nevada.',
  geo: { '@type': 'GeoCoordinates', latitude: 35.97, longitude: -115.09 },
  address: { '@type': 'PostalAddress', addressLocality: 'Henderson', addressRegion: 'NV', postalCode: '89044', addressCountry: 'US' },
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
  const cms = await getCommunityPage('inspirada-nevada-trails')
  return {
    title: cms?.metaTitle ?? 'Nevada Trails at Inspirada Homes for Sale | Nevada Real Estate Group',
    description: cms?.metaDescription ?? 'Browse Nevada Trails at Inspirada homes for sale in Henderson, NV. $450K–$700K. Schools, HOA, market stats. Nevada Real Estate Group.',
  }
}

export default async function InspiradaNevadaTrailsPage() {
  const cms = await getCommunityPage('inspirada-nevada-trails')
  const market = getMarketStats('inspirada-nevada-trails')
  const ms = market?.stats

  const heroHeadline = cms?.heroHeadline ?? 'Nevada Trails at Inspirada'
  const heroSubtitle = 'Homes for Sale in Henderson, Nevada'
  const overviewTitle = cms?.overviewTitle ?? 'Nevada Trails at Inspirada: Master-Planned · Family Living in Henderson'

  const HARDCODED_STATS: Array<[string, string] | [string, string, string]> = [
    ['Established', '2010'],
    ['Developer', 'Focus Property Group / Multiple Builders'],
    ['Total Acreage', '~200 acres'],
    ['Homes', '1,200+'],
    ['Median Home Price', ms?.medianSalePrice ?? '$450K–$700K'],
    ['ZIP Codes', '89044'],
    ['Guard-Gated', 'No'],
    ['HOA', '$100–$225/mo'],
  ]
  const displayStats = mergeQuickStats(HARDCODED_STATS, cms?.quickStats)
  const HARDCODED_DRIVE_TIMES = [
    {
        "time": "~20 min",
        "destination": "to the Strip",
        "route": "via I-215 → I-15"
    },
    {
        "time": "~20 min",
        "destination": "to Harry Reid Airport",
        "route": "via I-215"
    },
    {
        "time": "~10 min",
        "destination": "to Henderson Green Valley",
        "route": "via St. Rose Pkwy"
    },
    {
        "time": "~25 min",
        "destination": "to Summerlin",
        "route": "via I-215 West"
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
          <span>Nevada Trails at Inspirada</span>
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
                <span className="hero-v2-stat-num">{ms?.medianSalePrice ?? qs('Median Home Price', '$450K–$700K')}</span>
                <span className="hero-v2-stat-lbl">Median Sale Price</span>
              </div>
              <div className="hero-v2-stat">
                <span className="hero-v2-stat-num">{ms?.avgDaysToClose ?? qs('Avg Days on Market', '45')}</span>
                <span className="hero-v2-stat-lbl">Avg Days to Close</span>
              </div>
            </div>
            <a href="#listings" className="hero-v2-cta">Search Homes in Nevada Trails at Inspirada</a>
          </div>
        </div>
      </header>

      <div className="hero-v2-qfb">
        <div className="container">
          <div className="hero-v2-qfb-row">
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <span><strong>ZIP:</strong> 89044</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              <span><strong>Type:</strong> Master-Planned · Family</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
              <span><strong>Price Range:</strong> $450K–$700K</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
              <span><strong>HOA:</strong> $100–$225/mo</span>
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
            <h2>Nevada Trails at Inspirada Demographics</h2>
          </div>
          <div className="demo-grid">
            {[
              ['~3,800', 'Population'],
              ['36', 'Median Age'],
              ['$85,000', 'Avg Household Income'],
              ['1,200+', 'Total Households'],
              ['74%', 'Homeownership Rate'],
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
            <h2>Where is Nevada Trails at Inspirada?</h2>
            <p>Inspirada, Henderson &mdash; Henderson, Nevada.</p>
          </div>
          <div className="map-container">
            <InspiradaNevadaTrailsMapWrapper />
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
            <h2 className="listings-title">NEW NEVADA TRAILS AT INSPIRADA LISTINGS</h2>
          </div>
          <div className="ylopo-wrap">
            <div className="YLOPO_searchWidget" />
            <div className="YLOPO_resultsWidget" data-search='{"propertyTypes":["house","condo","townhouse"],"minPrice":400000,"locations":[{"city":"Henderson","state":"NV"}],"limit":12,"sortBy":"listDate","sortOrder":"desc","keywords":"Inspirada","zipCodes":["89044"]}' />
          </div>
          <p className="ylopo-note">Listing data sourced from regional MLS. Information deemed reliable but not guaranteed. Updated daily.</p>
          <div className="listings-actions">
            <a href="https://search.nevadarealestategroup.net/search?s[orderBy]=sourceCreationDate%2Cdesc&s[page]=1&s[locations][0][city]=Henderson&s[locations][0][state]=NV&s[keywords]=Inspirada" target="_blank" rel="noopener noreferrer" className="btn-gold">View All Nevada Trails at Inspirada Listings &rarr;</a>
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
                  <p>Nevada Trails at Inspirada is one of the most established and sought-after neighborhoods within the Inspirada master-planned community in southern Henderson. The neighborhood takes its name from the extensive trail network that defines its character — miles of interconnected walking and biking paths that link homes to parks, schools, plazas, and the broader Inspirada gathering spaces. For buyers who want an active, connected lifestyle within a thoughtfully designed community, Nevada Trails delivers.</p>
                  <p>Homes in Nevada Trails range from approximately $450,000 to $700,000, with a mix of well-maintained resale properties and newer construction. Floor plans span 1,800 to 3,500 square feet, with multiple builders having contributed to the neighborhood's diverse housing stock. Architectural styles include Mediterranean, Spanish Colonial, and contemporary desert designs, all governed by Inspirada's design standards that maintain visual cohesion while allowing individual character.</p>
                  <p>The trail system is the defining feature. Dedicated walking and biking paths connect Nevada Trails to Inspirada's signature gathering spaces — landscaped plazas with fire features, resort-style pools, splash pads, playgrounds, and an amphitheater. The trails also connect to Henderson's broader public trail system, giving residents access to miles of outdoor recreation without leaving their neighborhood. Many homes in Nevada Trails are positioned directly along trail corridors with open-space views.</p>
                  <p>Nevada Trails benefits from Inspirada's thoughtful master planning and Henderson's reputation for safety and quality city services. The I-215 beltway is minutes away, providing a 20-minute corridor to the Strip and Harry Reid Airport. For families, active adults, and professionals seeking a walkable, design-forward neighborhood with strong community character, Nevada Trails at Inspirada is one of Henderson's best choices.</p>
                </>
              )}
            </div>
            <div className="overview-aside">
              <div className="quick-facts">
                <h3>Nevada Trails at Inspirada At a Glance</h3>
                {displayStats.map(([label, value, cls]: any) => (
                  <div className="fact-row" key={label}>
                    <span className="fact-label">{label}</span>
                    <span className={`fact-value${cls ? ' ' + cls : ''}`}>{value}</span>
                  </div>
                ))}
              </div>
              <div className="cta-card">
                <p>Ready to explore Nevada Trails at Inspirada? Schedule a private tour of the community and the current listings that match your goals.</p>
                <a href="tel:+17252399950" className="btn-gold">Call 725.239.9950</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="highlights">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Why Nevada Trails at Inspirada</span>
            <h2>What Makes Nevada Trails at Inspirada Stand Out</h2>
          </div>
          <div className="highlights-grid">
            {[
              { title: 'Extensive Trail Network', body: 'Miles of dedicated walking and biking trails connect homes to parks, plazas, schools, and gathering spaces. Many homes sit directly along trail corridors with open-space views.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22c4-4 8-7.5 8-12a8 8 0 10-16 0c0 4.5 4 8 8 12z"/><circle cx="12" cy="10" r="3"/></svg> },
              { title: 'Inspirada Gathering Spaces', body: 'Connected to Inspirada\'s signature plazas with fire features, resort pools, splash pads, and community events. Walkable access to the social heart of the community.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><line x1="8" y1="6" x2="8" y2="6.01"/><line x1="12" y1="6" x2="12" y2="6.01"/><line x1="16" y1="6" x2="16" y2="6.01"/><line x1="8" y1="10" x2="8" y2="10.01"/><line x1="12" y1="10" x2="12" y2="10.01"/><line x1="16" y1="10" x2="16" y2="10.01"/><line x1="8" y1="14" x2="8" y2="14.01"/><line x1="12" y1="14" x2="12" y2="14.01"/><line x1="16" y1="14" x2="16" y2="14.01"/></svg> },
              { title: 'Diverse Housing Options', body: 'Multiple builders and architectural styles from 1,800 to 3,500 square feet. Mediterranean, Spanish Colonial, and contemporary desert designs within Inspirada\'s cohesive standards.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
              { title: 'Henderson Safety', body: 'Henderson consistently ranks among the safest large cities in America. Nevada Trails benefits from responsive city services and well-maintained public spaces.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
              { title: 'Established Community Feel', body: 'As one of Inspirada\'s earliest neighborhoods, Nevada Trails has mature landscaping, established trees, and a settled community character with strong neighbor connections.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M8 21l4-11 4 11"/><path d="M2 21l5-14 4 8"/><path d="M14 15l4-8 4 14"/><line x1="2" y1="21" x2="22" y2="21"/></svg> },
              { title: 'I-215 Commute Corridor', body: 'Minutes from the I-215 beltway for a clean 20-minute commute to the Strip and Harry Reid Airport. Convenient access to Henderson\'s shopping and dining corridors.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg> },
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

      <InspiradaNevadaTrailsFAQ />

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
              { name: 'Inspirada', href: '/inspirada/', price: 'From $420K', compare: 'The broader master-planned community with award-winning gathering spaces and multiple neighborhoods.' },
              { name: 'Cadence', href: '/cadence/', price: 'From $380K', compare: 'Henderson\'s fastest-growing community with 50-acre Central Park and active new construction.' },
              { name: 'Anthem', href: '/anthem/', price: 'From $400K', compare: 'Henderson\'s largest master-planned community with guard-gated options and mountain views.' },
              { name: 'Seven Hills', href: '/seven-hills/', price: 'From $500K', compare: 'Guard-gated Henderson community with Rio Secco golf and Strip views.' },
              { name: 'Sun City Anthem', href: '/sun-city-anthem/', price: 'From $350K', compare: 'Premier 55+ community adjacent to Inspirada with three recreation centers.' },
              { name: 'Southern Highlands', href: '/southern-highlands/', price: 'From $400K', compare: 'Southwest Las Vegas guard-gated golf community with Nicklaus course.' },
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
              <h2>Ready to Find Your Nevada Trails at Inspirada Home?</h2>
              <p>Nevada Real Estate Group is the #1 real estate team in Nevada. Whether you&apos;re buying or selling in Nevada Trails at Inspirada, let&apos;s talk.</p>
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
                <input type="hidden" name="_subject" value="Nevada Trails at Inspirada Inquiry — LasVegasHomeSearchExperts.com" />
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
