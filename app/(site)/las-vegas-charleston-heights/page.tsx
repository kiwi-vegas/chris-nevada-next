import LasVegasCharlestonHeightsFAQ from '@/components/LasVegasCharlestonHeightsFAQ'
import Link from 'next/link'
import type { Metadata } from 'next'
import LasVegasCharlestonHeightsMapWrapper from '@/components/LasVegasCharlestonHeightsMapWrapper'
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
    { '@type': 'ListItem', position: 3, name: 'Charleston Heights', item: 'https://www.lasvegashomesearchexperts.com/las-vegas-charleston-heights/' },
  ],
}

const FAQ_DATA = [
  {
    "q": "What is the price range for homes in Charleston Heights?",
    "a": "Homes in Charleston Heights range from approximately $250,000 for smaller fixer-uppers to $500,000 for fully renovated or larger properties. The median home price is typically in the $300K–$350K range."
  },
  {
    "q": "Is Charleston Heights safe?",
    "a": "Charleston Heights is an urban neighborhood with typical city considerations. Crime statistics vary by block. Working with a knowledgeable agent helps identify the safest and most desirable sections of the community."
  },
  {
    "q": "What ZIP codes are in Charleston Heights?",
    "a": "Charleston Heights primarily spans ZIP codes 89107 and 89106 in the City of Las Vegas."
  },
  {
    "q": "Is Charleston Heights good for investment?",
    "a": "Yes. Charleston Heights offers strong investment potential due to affordable entry prices, central location, larger lots, and the ongoing revitalization of Las Vegas's urban core. Renovation ROI is among the highest in the valley."
  },
  {
    "q": "What is the Charleston Heights Arts Center?",
    "a": "The Charleston Heights Arts Center is a City of Las Vegas cultural facility that hosts visual art exhibitions, performances, classes, and community events. It serves as a cultural anchor for the neighborhood."
  },
  {
    "q": "How old are homes in Charleston Heights?",
    "a": "Most homes in Charleston Heights were built between the 1950s and 1970s. The predominant style is single-story ranch with block construction, detached garages, and generous lot sizes."
  },
  {
    "q": "How close is Charleston Heights to downtown?",
    "a": "Charleston Heights is approximately 10 minutes from downtown Las Vegas via Charleston Boulevard or Rancho Drive. The proximity to downtown is one of the neighborhood's strongest assets."
  },
  {
    "q": "Are there HOAs in Charleston Heights?",
    "a": "Most homes in Charleston Heights do not have HOA fees or have minimal association dues under $50 per month. This is a significant cost advantage compared to newer master-planned communities."
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
  name: 'Charleston Heights',
  description: 'Charleston Heights is a established · urban residential community in Las Vegas, Nevada.',
  geo: { '@type': 'GeoCoordinates', latitude: 36.183, longitude: -115.196 },
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
  const cms = await getCommunityPage('las-vegas-charleston-heights')
  return {
    title: cms?.metaTitle ?? 'Charleston Heights Homes for Sale | Nevada Real Estate Group',
    description: cms?.metaDescription ?? 'Browse Charleston Heights homes for sale in Las Vegas, NV. $250K–$500K. Schools, HOA, market stats. Nevada Real Estate Group.',
    alternates: { canonical: 'https://www.lasvegashomesearchexperts.com/las-vegas-charleston-heights' },
  }
}

export default async function LasVegasCharlestonHeightsPage() {
  const cms = await getCommunityPage('las-vegas-charleston-heights')
  const market = getMarketStats('las-vegas-charleston-heights')
  const ms = market?.stats

  const heroHeadline = cms?.heroHeadline ?? 'Charleston Heights'
  const heroSubtitle = 'Homes for Sale in Las Vegas, Nevada'
  const overviewTitle = cms?.overviewTitle ?? 'Charleston Heights: Established · Urban Residential Living in Las Vegas'

  const HARDCODED_STATS: Array<[string, string] | [string, string, string]> = [
    ['Established', '1950s'],
    ['Developer', 'Various'],
    ['Total Acreage', '~6 sq mi'],
    ['Homes', '15,000+'],
    ['Median Home Price', ms?.medianSalePrice ?? '$250K–$500K'],
    ['ZIP Codes', '89107, 89106'],
    ['Guard-Gated', 'No'],
    ['HOA', '$0–$50/mo'],
  ]
  const displayStats = mergeQuickStats(HARDCODED_STATS, cms?.quickStats)
  const HARDCODED_DRIVE_TIMES = [
    {
        "time": "~10 min",
        "destination": "to Downtown Las Vegas",
        "route": "via Charleston Blvd / Rancho Dr"
    },
    {
        "time": "~10 min",
        "destination": "to the Strip",
        "route": "via I-15 South"
    },
    {
        "time": "~20 min",
        "destination": "to Harry Reid Airport",
        "route": "via I-15 South"
    },
    {
        "time": "~15 min",
        "destination": "to Summerlin",
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
          <a href="/communities/">Communities</a>
          <span className="breadcrumb-sep">&rsaquo;</span>
          <span>Charleston Heights</span>
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
                <span className="hero-v2-stat-num">{ms?.medianSalePrice ?? qs('Median Home Price', '$250K–$500K')}</span>
                <span className="hero-v2-stat-lbl">Median Sale Price</span>
              </div>
              <div className="hero-v2-stat">
                <span className="hero-v2-stat-num">{ms?.avgDaysToClose ?? qs('Avg Days on Market', '45')}</span>
                <span className="hero-v2-stat-lbl">Avg Days to Close</span>
              </div>
            </div>
            <a href="#listings" className="hero-v2-cta">Search Homes in Charleston Heights</a>
          </div>
        </div>
      </header>

      <div className="hero-v2-qfb">
        <div className="container">
          <div className="hero-v2-qfb-row">
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <span><strong>ZIP:</strong> 89107, 89106</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              <span><strong>Type:</strong> Established · Urban Residential</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
              <span><strong>Price Range:</strong> $250K–$500K</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
              <span><strong>HOA:</strong> $0–$50/mo</span>
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
            <h2>Charleston Heights Demographics</h2>
          </div>
          <div className="demo-grid">
            {[
              ['40,000+', 'Population'],
              ['36', 'Median Age'],
              ['$40,000', 'Avg Household Income'],
              ['14,000+', 'Total Households'],
              ['45%', 'Homeownership Rate'],
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
            <h2>Where is Charleston Heights?</h2>
            <p>Las Vegas, Nevada &mdash; Las Vegas, Nevada.</p>
          </div>
          <div className="map-container">
            <LasVegasCharlestonHeightsMapWrapper />
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
            <h2 className="listings-title">NEW CHARLESTON HEIGHTS LISTINGS</h2>
          </div>
          <div className="ylopo-wrap">
            <div className="YLOPO_searchWidget" />
            <div className="YLOPO_resultsWidget" data-search='{"propertyTypes":["house","condo","townhouse"],"minPrice":200000,"locations":[{"city":"Las Vegas","state":"NV"}],"limit":12,"sortBy":"listDate","sortOrder":"desc","keywords":"Charleston Heights","zipCodes":["89107","89106"]}' />
          </div>
          <p className="ylopo-note">Listing data sourced from regional MLS. Information deemed reliable but not guaranteed. Updated daily.</p>
          <div className="listings-actions">
            <a href="https://search.nevadarealestategroup.net/search?s[orderBy]=sourceCreationDate%2Cdesc&s[page]=1&s[locations][0][city]=Las%20Vegas&s[locations][0][state]=NV&s[keywords]=Charleston%20Heights" target="_blank" rel="noopener noreferrer" className="btn-gold">View All Charleston Heights Listings &rarr;</a>
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
                  <p>Charleston Heights is one of the oldest and most established residential neighborhoods in the City of Las Vegas, located just west of downtown along the Charleston Boulevard corridor. Developed primarily in the 1950s through 1970s, the neighborhood represents a significant chapter in Las Vegas's residential history and today offers some of the most affordable housing in a centrally located part of the valley.</p>
                  <p>The neighborhood is anchored by the Charleston Heights Arts Center, one of the city's premier visual and performing arts venues, and several large community parks. Homes in Charleston Heights are predominantly single-story ranch-style residences on standard city lots, with block construction typical of the era. Many homes feature detached garages, mature shade trees, and the spacious lot layouts that were standard before the compact tract developments of the 1990s and beyond.</p>
                  <p>Pricing in Charleston Heights remains among the most affordable in central Las Vegas, with homes ranging from approximately $250,000 for smaller fixer-uppers to $500,000 for fully renovated or larger properties. The neighborhood has attracted significant renovation interest in recent years as buyers priced out of trendier areas like the Arts District and Downtown discover the value of Charleston Heights' central location, larger lots, and vintage character.</p>
                  <p>The area's appeal for investors and value-conscious buyers is straightforward: central location, established infrastructure, and entry-level pricing with significant upside. Charleston Boulevard provides a direct corridor to both downtown Las Vegas and the western suburbs, while the neighborhood's proximity to I-15 and US-95 enables fast commutes in any direction. As Las Vegas continues to grow outward, infill neighborhoods like Charleston Heights stand to benefit from the urban revitalization trend.</p>
                </>
              )}
            </div>
            <div className="overview-aside">
              <div className="quick-facts">
                <h3>Charleston Heights At a Glance</h3>
                {displayStats.map(([label, value, cls]: any) => (
                  <div className="fact-row" key={label}>
                    <span className="fact-label">{label}</span>
                    <span className={`fact-value${cls ? ' ' + cls : ''}`}>{value}</span>
                  </div>
                ))}
              </div>
              <div className="cta-card">
                <p>Ready to explore Charleston Heights? Schedule a private tour of the community and the current listings that match your goals.</p>
                <a href="tel:+17252399950" className="btn-gold">Call 725.239.9950</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="highlights">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Why Charleston Heights</span>
            <h2>What Makes Charleston Heights Stand Out</h2>
          </div>
          <div className="highlights-grid">
            {[
              { title: 'Affordable Central Location', body: 'One of the most affordable neighborhoods in central Las Vegas. Minutes from downtown, the Strip, and major freeway interchanges. Exceptional value for the location.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><line x1="8" y1="6" x2="8" y2="6.01"/><line x1="12" y1="6" x2="12" y2="6.01"/><line x1="16" y1="6" x2="16" y2="6.01"/><line x1="8" y1="10" x2="8" y2="10.01"/><line x1="12" y1="10" x2="12" y2="10.01"/><line x1="16" y1="10" x2="16" y2="10.01"/><line x1="8" y1="14" x2="8" y2="14.01"/><line x1="12" y1="14" x2="12" y2="14.01"/><line x1="16" y1="14" x2="16" y2="14.01"/></svg> },
              { title: 'Renovation Potential', body: '1950s-1970s ranch homes on generous lots offer significant renovation and value-add potential. Many homes can be modernized while retaining vintage character.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
              { title: 'Arts Center & Culture', body: 'The Charleston Heights Arts Center hosts visual art exhibitions, performances, and community events. A cultural anchor for the west-of-downtown corridor.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22c4-4 8-7.5 8-12a8 8 0 10-16 0c0 4.5 4 8 8 12z"/><circle cx="12" cy="10" r="3"/></svg> },
              { title: 'Larger Lot Sizes', body: 'Pre-tract-era lot sizes are noticeably larger than modern subdivisions. Many properties offer 6,000 to 10,000+ square foot lots with room for pools, workshops, or ADUs.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M8 21l4-11 4 11"/><path d="M2 21l5-14 4 8"/><path d="M14 15l4-8 4 14"/><line x1="2" y1="21" x2="22" y2="21"/></svg> },
              { title: 'Freeway Access', body: 'Quick access to I-15, US-95, and the 215 Beltway via Charleston Boulevard and Rancho Drive. Central positioning reduces commute times valley-wide.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
              { title: 'Upside Potential', body: 'As Las Vegas\'s urban core continues to revitalize, infill neighborhoods like Charleston Heights are positioned for significant appreciation. Early adopters are already seeing returns.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg> },
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

      <LasVegasCharlestonHeightsFAQ />

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
              { name: 'Downtown Las Vegas', href: '/downtown-las-vegas/', price: 'From $200K', compare: 'The urban core with Arts District, Fremont Street, and growing residential development.' },
              { name: 'Spring Valley', href: '/spring-valley/', price: 'From $300K', compare: 'Large established community to the west with diverse housing and central location.' },
              { name: 'The Lakes', href: '/the-lakes/', price: 'From $400K', compare: 'Waterfront community with man-made lakes and resort-style amenities.' },
              { name: 'Peccole Ranch', href: '/peccole-ranch/', price: 'From $450K', compare: 'Established family community to the west with mature landscaping and community parks.' },
              { name: 'Scotch 80s', href: '/scotch-80s/', price: 'From $800K', compare: 'Iconic legacy neighborhood to the south with ranch estates and historic character.' },
              { name: 'Rancho Circle', href: '/rancho-circle/', price: 'From $1M', compare: 'Las Vegas\'s most historic luxury enclave with estate properties on Rancho Drive.' },
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
              <h2>Ready to Find Your Charleston Heights Home?</h2>
              <p>Nevada Real Estate Group is the #1 real estate team in Nevada. Whether you&apos;re buying or selling in Charleston Heights, let&apos;s talk.</p>
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
                <input type="hidden" name="_subject" value="Charleston Heights Inquiry — LasVegasHomeSearchExperts.com" />
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
