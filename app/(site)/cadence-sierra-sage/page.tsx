import CadenceSierraSageFAQ from '@/components/CadenceSierraSageFAQ'
import Link from 'next/link'
import type { Metadata } from 'next'
import CadenceSierraSageMapWrapper from '@/components/CadenceSierraSageMapWrapper'
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
    { '@type': 'ListItem', position: 3, name: 'Sierra Sage', item: 'https://www.lasvegashomesearchexperts.com/cadence-sierra-sage/' },
  ],
}

const FAQ_DATA = [
  {
    "q": "What is the price range for homes in Sierra Sage at Cadence?",
    "a": "Homes in Sierra Sage range from approximately $450,000 to $700,000, depending on builder, floor plan, lot position, and selected upgrades."
  },
  {
    "q": "What builders are in Sierra Sage?",
    "a": "Sierra Sage features homes by Toll Brothers and Woodside Homes. Toll Brothers is known for premium finishes and attention to detail; Woodside Homes offers thoughtfully designed, family-oriented floor plans."
  },
  {
    "q": "How does Sierra Sage differ from Village Park?",
    "a": "Sierra Sage is positioned as Cadence's move-up neighborhood with larger floor plans (2,200–4,000 sq ft vs 1,600–3,200), premium builders, and higher standard finishes. Pricing is correspondingly higher than Village Park."
  },
  {
    "q": "Is Sierra Sage part of Cadence?",
    "a": "Yes. Sierra Sage is a neighborhood within the Cadence master-planned community. Residents have full access to all Cadence amenities including Central Park, the Clubhouse, pools, and trails."
  },
  {
    "q": "What ZIP code is Sierra Sage in?",
    "a": "Sierra Sage is in ZIP code 89011 in Henderson, Nevada, within the Cadence master-planned community."
  },
  {
    "q": "What are HOA fees in Sierra Sage?",
    "a": "HOA fees typically range from $120 to $220 per month, covering access to all Cadence amenities, parks, pools, the Clubhouse, and common area maintenance."
  },
  {
    "q": "What schools serve Sierra Sage?",
    "a": "Sierra Sage is served by CCSD schools including John C. Vanderburg Elementary (8/10) and Foothill High School. Charter options include Doral Academy (9/10) and Somerset Academy."
  },
  {
    "q": "What size are homes in Sierra Sage?",
    "a": "Floor plans in Sierra Sage range from approximately 2,200 to 4,000 square feet, with most offering 3 to 6 bedrooms, open-concept living areas, and two-car or three-car garages."
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
  name: 'Sierra Sage',
  description: 'Sierra Sage is a new construction · move-up community in Henderson, Nevada.',
  geo: { '@type': 'GeoCoordinates', latitude: 36.02, longitude: -115 },
  address: { '@type': 'PostalAddress', addressLocality: 'Henderson', addressRegion: 'NV', postalCode: '89011', addressCountry: 'US' },
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
  const cms = await getCommunityPage('cadence-sierra-sage')
  return {
    title: cms?.metaTitle ?? 'Sierra Sage Homes for Sale | Nevada Real Estate Group',
    description: cms?.metaDescription ?? 'Browse Sierra Sage homes for sale in Henderson, NV. $450K–$700K. Schools, HOA, market stats. Nevada Real Estate Group.',
  }
}

export default async function CadenceSierraSagePage() {
  const cms = await getCommunityPage('cadence-sierra-sage')
  const market = getMarketStats('cadence-sierra-sage')
  const ms = market?.stats

  const heroHeadline = cms?.heroHeadline ?? 'Sierra Sage'
  const heroSubtitle = 'Homes for Sale in Henderson, Nevada'
  const overviewTitle = cms?.overviewTitle ?? 'Sierra Sage: New Construction · Move-Up Living in Henderson'

  const HARDCODED_STATS: Array<[string, string] | [string, string, string]> = [
    ['Established', '2018'],
    ['Developer', 'Toll Brothers / Woodside Homes'],
    ['Total Acreage', '~90 acres'],
    ['Homes', '~400'],
    ['Median Home Price', ms?.medianSalePrice ?? '$450K–$700K'],
    ['ZIP Codes', '89011'],
    ['Guard-Gated', 'No'],
    ['HOA', '$120–$220/mo'],
  ]
  const displayStats = mergeQuickStats(HARDCODED_STATS, cms?.quickStats)
  const HARDCODED_DRIVE_TIMES = [
    {
        "time": "~25 min",
        "destination": "to the Strip",
        "route": "via I-215 → I-15"
    },
    {
        "time": "~25 min",
        "destination": "to Harry Reid Airport",
        "route": "via I-215 → I-15"
    },
    {
        "time": "~15 min",
        "destination": "to Galleria at Sunset",
        "route": "via Lake Mead Pkwy"
    },
    {
        "time": "~20 min",
        "destination": "to Lake Mead",
        "route": "via Lake Mead Pkwy East"
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
          <span>Sierra Sage</span>
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
            <a href="#listings" className="hero-v2-cta">Search Homes in Sierra Sage</a>
          </div>
        </div>
      </header>

      <div className="hero-v2-qfb">
        <div className="container">
          <div className="hero-v2-qfb-row">
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <span><strong>ZIP:</strong> 89011</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              <span><strong>Type:</strong> New Construction · Move-Up</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
              <span><strong>Price Range:</strong> $450K–$700K</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
              <span><strong>HOA:</strong> $120–$220/mo</span>
            </div>
          </div>
          <div className="hero-v2-qfb-est">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            <span>Est. 2018</span>
          </div>
        </div>
      </div>

      <section id="demographics" className="demographics-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Demographics</span>
            <h2>Sierra Sage Demographics</h2>
          </div>
          <div className="demo-grid">
            {[
              ['~1,200', 'Population'],
              ['37', 'Median Age'],
              ['$110,000', 'Avg Household Income'],
              ['~400', 'Total Households'],
              ['72%', 'Homeownership Rate'],
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
            <h2>Where is Sierra Sage?</h2>
            <p>Cadence, Henderson &mdash; Henderson, Nevada.</p>
          </div>
          <div className="map-container">
            <CadenceSierraSageMapWrapper />
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
            <h2 className="listings-title">NEW SIERRA SAGE LISTINGS</h2>
          </div>
          <div className="ylopo-wrap">
            <div className="YLOPO_searchWidget" />
            <div className="YLOPO_resultsWidget" data-search='{"propertyTypes":["house","condo","townhouse"],"minPrice":450000,"locations":[{"city":"Henderson","state":"NV"}],"limit":12,"sortBy":"listDate","sortOrder":"desc","keywords":"Sierra Sage Cadence","zipCodes":["89011"]}' />
          </div>
          <p className="ylopo-note">Listing data sourced from regional MLS. Information deemed reliable but not guaranteed. Updated daily.</p>
          <div className="listings-actions">
            <a href="https://search.nevadarealestategroup.net/search?s[orderBy]=sourceCreationDate%2Cdesc&s[page]=1&s[locations][0][city]=Henderson&s[locations][0][state]=NV&s[keywords]=Sierra%20Sage%20Cadence" target="_blank" rel="noopener noreferrer" className="btn-gold">View All Sierra Sage Listings &rarr;</a>
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
                  <p>Sierra Sage is a premium neighborhood within the Cadence master-planned community in Henderson, offering move-up caliber new-construction homes with larger floor plans, enhanced finishes, and a step above the standard Cadence neighborhoods in terms of quality and pricing. Built by Toll Brothers and Woodside Homes, Sierra Sage targets buyers seeking more space, upgraded features, and a premium position within one of Henderson's fastest-growing master plans.</p>
                  <p>Homes in Sierra Sage range from approximately 2,200 to 4,000 square feet with 3 to 6 bedrooms. Toll Brothers brings its signature attention to detail with premium standard finishes, gourmet kitchens, spa-inspired bathrooms, and flexible room configurations. Woodside Homes offers thoughtfully designed floor plans with open-concept living, dedicated home offices, and multi-generational suite options. Both builders emphasize energy efficiency, smart-home technology, and indoor-outdoor living suited to the Las Vegas climate.</p>
                  <p>As part of the Cadence master plan, Sierra Sage residents have full access to all community amenities: the 50-acre Central Park, the Cadence Clubhouse with resort-style pool and fitness center, miles of trails, sports courts, playgrounds, and community programming. Sierra Sage's position within Cadence typically provides slightly larger lots and more premium views compared to other Cadence neighborhoods.</p>
                  <p>Sierra Sage appeals to move-up buyers, growing families, and professionals relocating to Henderson who want newer construction with premium features at a price point below Henderson's guard-gated luxury communities. The I-215 beltway provides efficient commutes, and Henderson's growing commercial corridor along Lake Mead Parkway and Eastern Avenue continues to add retail, dining, and services.</p>
                </>
              )}
            </div>
            <div className="overview-aside">
              <div className="quick-facts">
                <h3>Sierra Sage At a Glance</h3>
                {displayStats.map(([label, value, cls]: any) => (
                  <div className="fact-row" key={label}>
                    <span className="fact-label">{label}</span>
                    <span className={`fact-value${cls ? ' ' + cls : ''}`}>{value}</span>
                  </div>
                ))}
              </div>
              <div className="cta-card">
                <p>Ready to explore Sierra Sage? Schedule a private tour of the community and the current listings that match your goals.</p>
                <a href="tel:+17252399950" className="btn-gold">Call 725.239.9950</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="highlights">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Why Sierra Sage</span>
            <h2>What Makes Sierra Sage Stand Out</h2>
          </div>
          <div className="highlights-grid">
            {[
              { title: 'Premium Builders', body: 'Toll Brothers and Woodside Homes deliver move-up quality with premium standard finishes, gourmet kitchens, spa bathrooms, and flexible floor plans from 2,200 to 4,000 sq ft.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
              { title: 'Cadence Amenities', body: 'Full access to the 50-acre Central Park, Cadence Clubhouse with resort pool, fitness center, miles of trails, sports courts, and community programming.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22c4-4 8-7.5 8-12a8 8 0 10-16 0c0 4.5 4 8 8 12z"/><circle cx="12" cy="10" r="3"/></svg> },
              { title: 'Move-Up Value', body: 'Sierra Sage fills the gap between entry-level Cadence neighborhoods and Henderson\'s luxury communities, delivering premium finishes and larger floor plans at an accessible price.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg> },
              { title: 'Energy Efficient Design', body: 'Both builders emphasize energy-efficient construction with modern insulation, high-efficiency HVAC, low-E windows, and smart-home technology standard.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><line x1="8" y1="6" x2="8" y2="6.01"/><line x1="12" y1="6" x2="12" y2="6.01"/><line x1="16" y1="6" x2="16" y2="6.01"/><line x1="8" y1="10" x2="8" y2="10.01"/><line x1="12" y1="10" x2="12" y2="10.01"/><line x1="16" y1="10" x2="16" y2="10.01"/><line x1="8" y1="14" x2="8" y2="14.01"/><line x1="12" y1="14" x2="12" y2="14.01"/><line x1="16" y1="14" x2="16" y2="14.01"/></svg> },
              { title: 'Henderson Safety', body: 'Henderson consistently ranks among the top 10 safest large cities in America. Sierra Sage benefits from excellent city services and responsive public safety.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
              { title: 'Indoor-Outdoor Living', body: 'Floor plans emphasize seamless indoor-outdoor transitions with covered patios, optional outdoor kitchens, and multi-slide glass doors designed for the Las Vegas climate.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22c4-4 8-7.5 8-12a8 8 0 10-16 0c0 4.5 4 8 8 12z"/><circle cx="12" cy="10" r="3"/></svg> },
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

      <CadenceSierraSageFAQ />

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
              { name: 'Cadence', href: '/cadence/', price: 'From $350K', compare: 'The broader Cadence master plan with diverse neighborhoods and Henderson\'s newest amenities.' },
              { name: 'Village Park', href: '/cadence-village-park/', price: 'From $400K', compare: 'Cadence\'s more accessible neighborhood with Lennar and Richmond American homes.' },
              { name: 'Inspirada', href: '/inspirada/', price: 'From $400K', compare: 'Henderson\'s other major new-construction master plan with extensive parks and trails.' },
              { name: 'Seven Hills', href: '/seven-hills/', price: 'From $500K', compare: 'Established Henderson community with golf and guard-gated luxury options.' },
              { name: 'Lake Las Vegas', href: '/lake-las-vegas/', price: 'From $400K', compare: 'Resort-style lakefront living in eastern Henderson with championship golf.' },
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
              <h2>Ready to Find Your Sierra Sage Home?</h2>
              <p>Nevada Real Estate Group is the #1 real estate team in Nevada. Whether you&apos;re buying or selling in Sierra Sage, let&apos;s talk.</p>
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
                <input type="hidden" name="_subject" value="Sierra Sage Inquiry — LasVegasHomeSearchExperts.com" />
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
