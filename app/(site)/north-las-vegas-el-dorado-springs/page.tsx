import NorthLasVegasElDoradoSpringsFAQ from '@/components/NorthLasVegasElDoradoSpringsFAQ'
import Link from 'next/link'
import type { Metadata } from 'next'
import NorthLasVegasElDoradoSpringsMapWrapper from '@/components/NorthLasVegasElDoradoSpringsMapWrapper'
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
    { '@type': 'ListItem', position: 3, name: 'El Dorado Springs', item: 'https://www.lasvegashomesearchexperts.com/north-las-vegas-el-dorado-springs/' },
  ],
}

const FAQ_DATA = [
  {
    "q": "What is the price range in El Dorado Springs?",
    "a": "Homes in El Dorado Springs range from approximately $300,000 for townhomes and smaller single-family homes to $500,000 for larger properties. The average single-family home sells between $350K and $425K."
  },
  {
    "q": "What ZIP codes are in El Dorado Springs?",
    "a": "El Dorado Springs spans ZIP codes 89031 and 89032 in North Las Vegas, Nevada."
  },
  {
    "q": "Is El Dorado Springs a good investment area?",
    "a": "Yes. El Dorado Springs offers some of the best rental yields in the Las Vegas metro due to affordable purchase prices and strong rental demand. North Las Vegas' growth and infrastructure improvements are driving appreciation."
  },
  {
    "q": "How far is El Dorado Springs from the Strip?",
    "a": "El Dorado Springs is approximately 20 minutes from the Las Vegas Strip via I-15 South. Downtown Las Vegas is about 15 minutes away."
  },
  {
    "q": "What schools serve El Dorado Springs?",
    "a": "The area is served by CCSD schools including Cheyenne High School. Charter options like Somerset Academy NLV (8/10) and Doral Academy Fire Mesa (8/10) provide higher-rated alternatives. Private schools include Faith Lutheran (A)."
  },
  {
    "q": "Is North Las Vegas safe?",
    "a": "North Las Vegas has invested significantly in public safety in recent years. The Aliante, El Dorado Springs, and Heartland at Tule Springs areas have lower crime rates than the city average. As with any metro area, neighborhood selection matters."
  },
  {
    "q": "What are HOA fees in El Dorado Springs?",
    "a": "HOA fees in El Dorado Springs are among the lowest in the valley, ranging from $40 to $120 per month. Some standalone homes have no HOA."
  },
  {
    "q": "Is El Dorado Springs near Nellis Air Force Base?",
    "a": "Yes. El Dorado Springs is approximately 10 minutes from Nellis Air Force Base via Craig Road East, making it a popular choice for military families and civilian employees."
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
  name: 'El Dorado Springs',
  description: 'El Dorado Springs is a established · affordable · family community in North Las Vegas, Nevada.',
  geo: { '@type': 'GeoCoordinates', latitude: 36.228, longitude: -115.152 },
  address: { '@type': 'PostalAddress', addressLocality: 'North Las Vegas', addressRegion: 'NV', postalCode: '89031', addressCountry: 'US' },
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
  const cms = await getCommunityPage('north-las-vegas-el-dorado-springs')
  return {
    title: cms?.metaTitle ?? 'El Dorado Springs Homes for Sale | Nevada Real Estate Group',
    description: cms?.metaDescription ?? 'Browse El Dorado Springs homes for sale in North Las Vegas, NV. $300K–$500K. Schools, HOA, market stats. Nevada Real Estate Group.',
  }
}

export default async function NorthLasVegasElDoradoSpringsPage() {
  const cms = await getCommunityPage('north-las-vegas-el-dorado-springs')
  const market = getMarketStats('north-las-vegas-el-dorado-springs')
  const ms = market?.stats

  const heroHeadline = cms?.heroHeadline ?? 'El Dorado Springs'
  const heroSubtitle = 'Homes for Sale in North Las Vegas, Nevada'
  const overviewTitle = cms?.overviewTitle ?? 'El Dorado Springs: Established · Affordable · Family Living in North Las Vegas'

  const HARDCODED_STATS: Array<[string, string] | [string, string, string]> = [
    ['Established', '1995'],
    ['Developer', 'Various Builders'],
    ['Total Acreage', '~600 acres'],
    ['Homes', '4,000+'],
    ['Median Home Price', ms?.medianSalePrice ?? '$300K–$500K'],
    ['ZIP Codes', '89031, 89032'],
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
        "route": "via Las Vegas Blvd South"
    },
    {
        "time": "~10 min",
        "destination": "to Nellis AFB",
        "route": "via Craig Rd East"
    },
    {
        "time": "~30 min",
        "destination": "to Harry Reid Airport",
        "route": "via I-15 South"
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
          <span>El Dorado Springs</span>
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
            <a href="#listings" className="hero-v2-cta">Search Homes in El Dorado Springs</a>
          </div>
        </div>
      </header>

      <div className="hero-v2-qfb">
        <div className="container">
          <div className="hero-v2-qfb-row">
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <span><strong>ZIP:</strong> 89031, 89032</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              <span><strong>Type:</strong> Established · Affordable · Family</span>
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
            <span>Est. 1995</span>
          </div>
        </div>
      </div>

      <section id="demographics" className="demographics-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Demographics</span>
            <h2>El Dorado Springs Demographics</h2>
          </div>
          <div className="demo-grid">
            {[
              ['14,000+', 'Population'],
              ['33', 'Median Age'],
              ['$58,000', 'Avg Household Income'],
              ['4,000+', 'Total Households'],
              ['58%', 'Homeownership Rate'],
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
            <h2>Where is El Dorado Springs?</h2>
            <p>North Las Vegas, Nevada &mdash; North Las Vegas, Nevada.</p>
          </div>
          <div className="map-container">
            <NorthLasVegasElDoradoSpringsMapWrapper />
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
            <h2 className="listings-title">NEW EL DORADO SPRINGS LISTINGS</h2>
          </div>
          <div className="ylopo-wrap">
            <div className="YLOPO_searchWidget" />
            <div className="YLOPO_resultsWidget" data-search='{"propertyTypes":["house","condo","townhouse"],"minPrice":300000,"locations":[{"city":"North Las Vegas","state":"NV"}],"limit":12,"sortBy":"listDate","sortOrder":"desc","keywords":"North Las Vegas","zipCodes":["89031","89032"]}' />
          </div>
          <p className="ylopo-note">Listing data sourced from regional MLS. Information deemed reliable but not guaranteed. Updated daily.</p>
          <div className="listings-actions">
            <a href="https://search.nevadarealestategroup.net/search?s[orderBy]=sourceCreationDate%2Cdesc&s[page]=1&s[locations][0][city]=North%20Las%20Vegas&s[locations][0][state]=NV&s[keywords]=North%20Las%20Vegas" target="_blank" rel="noopener noreferrer" className="btn-gold">View All El Dorado Springs Listings &rarr;</a>
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
                  <p>El Dorado Springs is an established residential area in central North Las Vegas, encompassing neighborhoods along and near the Carey Avenue and Cheyenne Avenue corridors between Losee Road and the I-15 freeway. Developed primarily between 1995 and 2008, the area offers some of the most affordable single-family housing in the Las Vegas metro, with homes ranging from approximately $300,000 to $500,000.</p>
                  <p>The El Dorado Springs area features a mix of single-family homes, townhomes, and some multi-family development. Single-family homes typically range from 1,200 to 2,600 square feet, with both single-story and two-story floor plans available. Construction quality varies by builder and era, with homes from the early 2000s generally featuring the best construction standards. Desert landscaping, tile roofs, and stucco exteriors are standard throughout.</p>
                  <p>What makes El Dorado Springs compelling for buyers is the combination of affordability and improving infrastructure. North Las Vegas has invested heavily in community parks, public safety, and commercial development in recent years. The Eldorado neighborhood park system, Craig Ranch Regional Park (one of the best parks in the metro), and expanding retail corridors along Craig Road and Las Vegas Boulevard North have significantly improved the area's livability.</p>
                  <p>El Dorado Springs attracts first-time buyers, working families, military personnel from nearby Nellis Air Force Base, and investors seeking positive cash flow rental properties. The area's affordability premium over comparable Las Vegas and Henderson neighborhoods — often $100K–$200K less for similar square footage — makes it an important entry point for buyers who want homeownership in the Las Vegas Valley at today's pricing.</p>
                </>
              )}
            </div>
            <div className="overview-aside">
              <div className="quick-facts">
                <h3>El Dorado Springs At a Glance</h3>
                {displayStats.map(([label, value, cls]: any) => (
                  <div className="fact-row" key={label}>
                    <span className="fact-label">{label}</span>
                    <span className={`fact-value${cls ? ' ' + cls : ''}`}>{value}</span>
                  </div>
                ))}
              </div>
              <div className="cta-card">
                <p>Ready to explore El Dorado Springs? Schedule a private tour of the community and the current listings that match your goals.</p>
                <a href="tel:+17252399950" className="btn-gold">Call 725.239.9950</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="highlights">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Why El Dorado Springs</span>
            <h2>What Makes El Dorado Springs Stand Out</h2>
          </div>
          <div className="highlights-grid">
            {[
              { title: 'Most Affordable Entry Point', body: 'Single-family homes from $300K in the Las Vegas metro. $100K–$200K less than comparable square footage in Las Vegas or Henderson for similar construction quality.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
              { title: 'Improving Infrastructure', body: 'North Las Vegas has invested heavily in parks, public safety, and commercial corridors. New retail and restaurants continue to open along Craig Road and Las Vegas Boulevard North.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><line x1="8" y1="6" x2="8" y2="6.01"/><line x1="12" y1="6" x2="12" y2="6.01"/><line x1="16" y1="6" x2="16" y2="6.01"/><line x1="8" y1="10" x2="8" y2="10.01"/><line x1="12" y1="10" x2="12" y2="10.01"/><line x1="16" y1="10" x2="16" y2="10.01"/><line x1="8" y1="14" x2="8" y2="14.01"/><line x1="12" y1="14" x2="12" y2="14.01"/><line x1="16" y1="14" x2="16" y2="14.01"/></svg> },
              { title: 'Craig Ranch Regional Park', body: 'One of the best parks in the Las Vegas metro is just minutes away. 170 acres with sports facilities, skate park, water play area, dog park, and walking trails.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22c4-4 8-7.5 8-12a8 8 0 10-16 0c0 4.5 4 8 8 12z"/><circle cx="12" cy="10" r="3"/></svg> },
              { title: 'Nellis AFB Proximity', body: 'Convenient to Nellis Air Force Base for military families. Short commute to one of the largest employers in the north Las Vegas Valley.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><line x1="8" y1="6" x2="8" y2="6.01"/><line x1="12" y1="6" x2="12" y2="6.01"/><line x1="16" y1="6" x2="16" y2="6.01"/><line x1="8" y1="10" x2="8" y2="10.01"/><line x1="12" y1="10" x2="12" y2="10.01"/><line x1="16" y1="10" x2="16" y2="10.01"/><line x1="8" y1="14" x2="8" y2="14.01"/><line x1="12" y1="14" x2="12" y2="14.01"/><line x1="16" y1="14" x2="16" y2="14.01"/></svg> },
              { title: 'Freeway Access', body: 'I-15 and the 215 Northern Beltway provide convenient access to the Strip (20 min), Downtown (15 min), and Henderson (25 min).', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><line x1="8" y1="6" x2="8" y2="6.01"/><line x1="12" y1="6" x2="12" y2="6.01"/><line x1="16" y1="6" x2="16" y2="6.01"/><line x1="8" y1="10" x2="8" y2="10.01"/><line x1="12" y1="10" x2="12" y2="10.01"/><line x1="16" y1="10" x2="16" y2="10.01"/><line x1="8" y1="14" x2="8" y2="14.01"/><line x1="12" y1="14" x2="12" y2="14.01"/><line x1="16" y1="14" x2="16" y2="14.01"/></svg> },
              { title: 'Investment Fundamentals', body: 'Strong rental demand, low vacancy rates, and North Las Vegas\' growth trajectory create solid investment returns. Affordable entry with positive cash flow potential.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg> },
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

      <NorthLasVegasElDoradoSpringsFAQ />

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
              { name: 'Aliante', href: '/aliante/', price: 'From $350K', compare: 'Master-planned community in NLV with golf, casino, and nature park. Slightly higher price point.' },
              { name: 'North Las Vegas', href: '/north-las-vegas/', price: 'From $300K', compare: 'The broader NLV area with diverse housing options at the valley\'s most accessible pricing.' },
              { name: 'Craig Ranch', href: '/craig-ranch/', price: 'From $350K', compare: 'Adjacent area near Craig Ranch Regional Park with newer construction and improving amenities.' },
              { name: 'Heartland at Tule Springs', href: '/heartland-tule-springs/', price: 'From $350K', compare: 'Newer master plan in NLV with new construction and modern community design.' },
              { name: 'Centennial Hills', href: '/centennial-hills/', price: 'From $400K', compare: 'Las Vegas community to the west with higher price points and more retail options.' },
              { name: 'Valley Vista', href: '/valley-vista/', price: 'From $300K', compare: 'Another affordable NLV neighborhood with similar pricing and commute times.' },
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
              <h2>Ready to Find Your El Dorado Springs Home?</h2>
              <p>Nevada Real Estate Group is the #1 real estate team in Nevada. Whether you&apos;re buying or selling in El Dorado Springs, let&apos;s talk.</p>
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
                <input type="hidden" name="_subject" value="El Dorado Springs Inquiry — LasVegasHomeSearchExperts.com" />
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
