import NorthLasVegasNorthValleyFAQ from '@/components/NorthLasVegasNorthValleyFAQ'
import Link from 'next/link'
import type { Metadata } from 'next'
import NorthLasVegasNorthValleyMapWrapper from '@/components/NorthLasVegasNorthValleyMapWrapper'
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
    { '@type': 'ListItem', position: 3, name: 'North Valley', item: 'https://www.lasvegashomesearchexperts.com/north-las-vegas-north-valley/' },
  ],
}

const FAQ_DATA = [
  {
    "q": "What is the price range for homes in North Valley?",
    "a": "Homes in North Valley range from approximately $300,000 for production homes to $500,000 for larger residences on premium lots. It is one of the most affordable new-construction markets in the valley."
  },
  {
    "q": "Is North Valley in North Las Vegas?",
    "a": "Yes. North Valley is part of the City of North Las Vegas and the surrounding unincorporated Clark County areas in the northern Las Vegas Valley."
  },
  {
    "q": "What ZIP codes are in North Valley?",
    "a": "North Valley spans ZIP codes 89084, 89085, and 89086 in the northern Las Vegas Valley."
  },
  {
    "q": "Is North Valley safe?",
    "a": "North Valley's newer subdivisions are generally safe residential communities. As with any area, conditions vary by neighborhood. Working with a local expert helps identify the most desirable sections."
  },
  {
    "q": "How far is North Valley from the Strip?",
    "a": "North Valley is approximately 20 minutes from the Las Vegas Strip via I-15 South."
  },
  {
    "q": "Is there new construction in North Valley?",
    "a": "Yes. North Valley has several active new-construction communities with national builders offering modern homes at competitive prices. It remains one of the most active building areas in the valley."
  },
  {
    "q": "What schools serve North Valley?",
    "a": "North Valley is served by CCSD schools including Legacy High School (5/10). Charter options like Somerset Academy Sky Pointe (8/10) and Doral Academy (9/10) provide alternatives."
  },
  {
    "q": "Is North Valley good for investment?",
    "a": "Yes. North Valley offers affordable entry prices, newer construction, and strong rental demand. It is one of the fastest-appreciating areas in the valley."
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
  name: 'North Valley',
  description: 'North Valley is a suburban · growing community in North Las Vegas, Nevada.',
  geo: { '@type': 'GeoCoordinates', latitude: 36.28, longitude: -115.158 },
  address: { '@type': 'PostalAddress', addressLocality: 'North Las Vegas', addressRegion: 'NV', postalCode: '89084', addressCountry: 'US' },
  containedInPlace: { '@type': 'City', name: 'North Las Vegas' },
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
  const cms = await getCommunityPage('north-las-vegas-north-valley')
  return {
    title: cms?.metaTitle ?? 'North Valley Homes for Sale | Nevada Real Estate Group',
    description: cms?.metaDescription ?? 'Browse North Valley homes for sale in North Las Vegas, NV. $300K–$500K. Schools, HOA, market stats. Nevada Real Estate Group.',
  }
}

export default async function NorthLasVegasNorthValleyPage() {
  const cms = await getCommunityPage('north-las-vegas-north-valley')
  const market = getMarketStats('north-las-vegas-north-valley')
  const ms = market?.stats

  const heroHeadline = cms?.heroHeadline ?? 'North Valley'
  const heroSubtitle = 'Homes for Sale in North Las Vegas, Nevada'
  const overviewTitle = cms?.overviewTitle ?? 'North Valley: Suburban · Growing Living in North Las Vegas'

  const HARDCODED_STATS: Array<[string, string] | [string, string, string]> = [
    ['Established', '2005'],
    ['Developer', 'Various'],
    ['Total Acreage', '~10 sq mi'],
    ['Homes', '15,000+'],
    ['Median Home Price', ms?.medianSalePrice ?? '$300K–$500K'],
    ['ZIP Codes', '89084, 89085, 89086'],
    ['Guard-Gated', 'No'],
    ['HOA', '$40–$120/mo'],
  ]
  const displayStats = mergeQuickStats(HARDCODED_STATS, cms?.quickStats)
  const HARDCODED_DRIVE_TIMES = [
    {
        "time": "~20 min",
        "destination": "to the Strip",
        "route": "via I-15 South"
    },
    {
        "time": "~15 min",
        "destination": "to Downtown Las Vegas",
        "route": "via I-15 South / Las Vegas Blvd"
    },
    {
        "time": "~25 min",
        "destination": "to Harry Reid Airport",
        "route": "via I-15 South"
    },
    {
        "time": "~10 min",
        "destination": "to Aliante",
        "route": "via Aliante Pkwy / Centennial Pkwy"
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
          <span>North Valley</span>
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
                <span className="hero-v2-stat-num">{ms?.medianSalePrice ?? qs('Median Home Price', '$300K–$500K')}</span>
                <span className="hero-v2-stat-lbl">Median Sale Price</span>
              </div>
              <div className="hero-v2-stat">
                <span className="hero-v2-stat-num">{ms?.avgDaysToClose ?? qs('Avg Days on Market', '45')}</span>
                <span className="hero-v2-stat-lbl">Avg Days to Close</span>
              </div>
            </div>
            <a href="#listings" className="hero-v2-cta">Search Homes in North Valley</a>
          </div>
        </div>
      </header>

      <div className="hero-v2-qfb">
        <div className="container">
          <div className="hero-v2-qfb-row">
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <span><strong>ZIP:</strong> 89084, 89085, 89086</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              <span><strong>Type:</strong> Suburban · Growing</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
              <span><strong>Price Range:</strong> $300K–$500K</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
              <span><strong>HOA:</strong> $40–$120/mo</span>
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
            <h2>North Valley Demographics</h2>
          </div>
          <div className="demo-grid">
            {[
              ['50,000+', 'Population'],
              ['33', 'Median Age'],
              ['$55,000', 'Avg Household Income'],
              ['16,000+', 'Total Households'],
              ['62%', 'Homeownership Rate'],
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
            <h2>Where is North Valley?</h2>
            <p>North Las Vegas, Nevada &mdash; North Las Vegas, Nevada.</p>
          </div>
          <div className="map-container">
            <NorthLasVegasNorthValleyMapWrapper />
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
            <h2 className="listings-title">NEW NORTH VALLEY LISTINGS</h2>
          </div>
          <div className="ylopo-wrap">
            <div className="YLOPO_searchWidget" />
            <div className="YLOPO_resultsWidget" data-search='{"propertyTypes":["house","condo","townhouse"],"minPrice":250000,"locations":[{"city":"North Las Vegas","state":"NV"}],"limit":12,"sortBy":"listDate","sortOrder":"desc","keywords":"North Valley","zipCodes":["89084","89085","89086"]}' />
          </div>
          <p className="ylopo-note">Listing data sourced from regional MLS. Information deemed reliable but not guaranteed. Updated daily.</p>
          <div className="listings-actions">
            <a href="https://search.nevadarealestategroup.net/search?s[orderBy]=sourceCreationDate%2Cdesc&s[page]=1&s[locations][0][city]=North%20Las%20Vegas&s[locations][0][state]=NV&s[keywords]=North%20Valley" target="_blank" rel="noopener noreferrer" className="btn-gold">View All North Valley Listings &rarr;</a>
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
                  <p>North Valley is a rapidly growing residential area in the northern section of North Las Vegas, spanning the corridor between Aliante to the west and the I-15 corridor to the east. The area has experienced explosive growth since the mid-2000s, transforming from open desert into a thriving suburban community with newer homes, improving schools, and expanding commercial infrastructure.</p>
                  <p>The majority of homes in North Valley were built between 2005 and the present, with several active new-construction communities still expanding. National builders including Lennar, KB Home, DR Horton, and Century Communities have been active in the area, delivering modern single-family homes with open floor plans, energy-efficient features, and community amenities. The newer vintage of the housing stock means lower maintenance costs and more contemporary design compared to older parts of the valley.</p>
                  <p>Pricing in North Valley ranges from approximately $300,000 for production homes to $500,000 for larger residences on premium lots. This represents one of the most affordable new-construction markets in the Las Vegas metro, attracting families, first-time buyers, and investors seeking modern homes at below-market prices. The value proposition is straightforward: comparable construction quality to Summerlin or Henderson at 20-30% lower prices.</p>
                  <p>North Valley's infrastructure continues to expand. The VA Hospital complex, growing retail along Craig Road and Centennial Parkway, and the planned northern extension of city services are bringing amenities closer to residents. The I-15 corridor provides direct commuting access to the Strip, downtown, and Henderson, while the 215 Beltway connects to the northwest valley. As North Las Vegas continues to mature, North Valley stands to benefit from appreciation driven by improving amenities and limited new land supply.</p>
                </>
              )}
            </div>
            <div className="overview-aside">
              <div className="quick-facts">
                <h3>North Valley At a Glance</h3>
                {displayStats.map(([label, value, cls]: any) => (
                  <div className="fact-row" key={label}>
                    <span className="fact-label">{label}</span>
                    <span className={`fact-value${cls ? ' ' + cls : ''}`}>{value}</span>
                  </div>
                ))}
              </div>
              <div className="cta-card">
                <p>Ready to explore North Valley? Schedule a private tour of the community and the current listings that match your goals.</p>
                <a href="tel:+17252399950" className="btn-gold">Call 725.239.9950</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="highlights">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Why North Valley</span>
            <h2>What Makes North Valley Stand Out</h2>
          </div>
          <div className="highlights-grid">
            {[
              { title: 'Affordable New Construction', body: 'Modern homes starting around $300K — one of the most affordable new-construction markets in the Las Vegas Valley. Comparable quality to Summerlin at significantly lower prices.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
              { title: 'Modern Floor Plans', body: 'Predominantly built after 2005 with open floor plans, energy-efficient construction, smart home features, and contemporary finishes.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><line x1="8" y1="6" x2="8" y2="6.01"/><line x1="12" y1="6" x2="12" y2="6.01"/><line x1="16" y1="6" x2="16" y2="6.01"/><line x1="8" y1="10" x2="8" y2="10.01"/><line x1="12" y1="10" x2="12" y2="10.01"/><line x1="16" y1="10" x2="16" y2="10.01"/><line x1="8" y1="14" x2="8" y2="14.01"/><line x1="12" y1="14" x2="12" y2="14.01"/><line x1="16" y1="14" x2="16" y2="14.01"/></svg> },
              { title: 'VA Hospital Complex', body: 'The VA Southern Nevada Healthcare System campus provides world-class medical services to veterans and adds institutional stability to the area.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
              { title: 'Growing Commercial Corridor', body: 'Retail, dining, and services expanding rapidly along Craig Road, Centennial Parkway, and the I-15 corridor. Commercial growth is keeping pace with residential demand.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22c4-4 8-7.5 8-12a8 8 0 10-16 0c0 4.5 4 8 8 12z"/><circle cx="12" cy="10" r="3"/></svg> },
              { title: 'I-15 Commuter Access', body: 'Direct I-15 access for commuting to the Strip (20 min), downtown (15 min), and Henderson. The Beltway connects to the northwest valley.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M8 21l4-11 4 11"/><path d="M2 21l5-14 4 8"/><path d="M14 15l4-8 4 14"/><line x1="2" y1="21" x2="22" y2="21"/></svg> },
              { title: 'Appreciation Potential', body: 'One of the fastest-appreciating areas in the Las Vegas Valley. Improving infrastructure and limited new land supply support continued upward price movement.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg> },
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

      <NorthLasVegasNorthValleyFAQ />

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
              { name: 'North Las Vegas', href: '/north-las-vegas/', price: 'From $300K', compare: 'The broader city with diverse neighborhoods, new construction, and growing infrastructure.' },
              { name: 'Aliante', href: '/aliante/', price: 'From $350K', compare: 'Master-planned community to the west with golf, casino, and family-friendly amenities.' },
              { name: 'Centennial Hills', href: '/centennial-hills/', price: 'From $400K', compare: 'Established northwest community with strong schools and extensive commercial infrastructure.' },
              { name: 'Tule Springs', href: '/tule-springs/', price: 'From $350K', compare: 'Newer community to the northwest with parks, trails, and family amenities.' },
              { name: 'Skye Canyon', href: '/skye-canyon/', price: 'From $450K', compare: 'Premier master-planned community in the far northwest with resort-style amenities.' },
              { name: 'Craig Ranch', href: '/craig-ranch/', price: 'From $350K', compare: 'Community centered around Craig Ranch Regional Park with sports and recreation amenities.' },
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
              <h2>Ready to Find Your North Valley Home?</h2>
              <p>Nevada Real Estate Group is the #1 real estate team in Nevada. Whether you&apos;re buying or selling in North Valley, let&apos;s talk.</p>
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
                <input type="hidden" name="_subject" value="North Valley Inquiry — LasVegasHomeSearchExperts.com" />
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
