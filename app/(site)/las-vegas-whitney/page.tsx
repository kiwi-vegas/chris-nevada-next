import LasVegasWhitneyFAQ from '@/components/LasVegasWhitneyFAQ'
import Link from 'next/link'
import type { Metadata } from 'next'
import LasVegasWhitneyMapWrapper from '@/components/LasVegasWhitneyMapWrapper'
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
    { '@type': 'ListItem', position: 3, name: 'Whitney', item: 'https://www.lasvegashomesearchexperts.com/las-vegas-whitney/' },
  ],
}

const FAQ_DATA = [
  {
    "q": "What is the price range for homes in Whitney?",
    "a": "Homes in Whitney range from approximately $200,000 for older properties to $400,000 or more for newer or renovated homes in desirable sections near Whitney Ranch Park."
  },
  {
    "q": "Is Whitney part of Las Vegas or Henderson?",
    "a": "Whitney is an unincorporated community in Clark County. It uses Las Vegas mailing addresses but is not part of the City of Las Vegas. It borders Henderson to the south."
  },
  {
    "q": "What ZIP codes are in Whitney?",
    "a": "Whitney spans ZIP codes 89122, 89121, and 89142 in the east-central Las Vegas Valley."
  },
  {
    "q": "Is Whitney a good area for investment?",
    "a": "Whitney offers affordable entry prices with proximity to Henderson, making it attractive for investors seeking positive cash flow and long-term appreciation. Rental demand is consistent."
  },
  {
    "q": "How far is Whitney from the Strip?",
    "a": "Whitney is approximately 15 minutes from the Las Vegas Strip via Tropicana Avenue or Flamingo Road heading west."
  },
  {
    "q": "What schools serve Whitney?",
    "a": "Whitney is served by CCSD schools including Silverado High School (5/10). Charter options include Mater Academy of Nevada (7/10). Private schools in Henderson are also accessible."
  },
  {
    "q": "What is near Whitney?",
    "a": "Whitney is near Sam's Town Casino, Sunset Park, Henderson, and the Boulder Highway corridor leading to Boulder City and Lake Mead. Major shopping is available along Tropicana and Flamingo."
  },
  {
    "q": "Are there HOAs in Whitney?",
    "a": "Many older homes in Whitney have no HOA. Newer subdivisions typically have modest HOA fees ranging from $25 to $75 per month covering basic common area maintenance."
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
  name: 'Whitney',
  description: 'Whitney is a established · unincorporated community in Las Vegas, Nevada.',
  geo: { '@type': 'GeoCoordinates', latitude: 36.1, longitude: -115.075 },
  address: { '@type': 'PostalAddress', addressLocality: 'Las Vegas', addressRegion: 'NV', postalCode: '89122', addressCountry: 'US' },
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
  const cms = await getCommunityPage('las-vegas-whitney')
  return {
    title: cms?.metaTitle ?? 'Whitney Homes for Sale | Nevada Real Estate Group',
    description: cms?.metaDescription ?? 'Browse Whitney homes for sale in Las Vegas, NV. $200K–$400K. Schools, HOA, market stats. Nevada Real Estate Group.',
  }
}

export default async function LasVegasWhitneyPage() {
  const cms = await getCommunityPage('las-vegas-whitney')
  const market = getMarketStats('las-vegas-whitney')
  const ms = market?.stats

  const heroHeadline = cms?.heroHeadline ?? 'Whitney'
  const heroSubtitle = 'Homes for Sale in Las Vegas, Nevada'
  const overviewTitle = cms?.overviewTitle ?? 'Whitney: Established · Unincorporated Living in Las Vegas'

  const HARDCODED_STATS: Array<[string, string] | [string, string, string]> = [
    ['Established', '1960s'],
    ['Developer', 'Various'],
    ['Total Acreage', '~12 sq mi'],
    ['Homes', '25,000+'],
    ['Median Home Price', ms?.medianSalePrice ?? '$200K–$400K'],
    ['ZIP Codes', '89122, 89121, 89142'],
    ['Guard-Gated', 'No'],
    ['HOA', '$0–$75/mo'],
  ]
  const displayStats = mergeQuickStats(HARDCODED_STATS, cms?.quickStats)
  const HARDCODED_DRIVE_TIMES = [
    {
        "time": "~15 min",
        "destination": "to the Strip",
        "route": "via Tropicana Ave / Flamingo Rd"
    },
    {
        "time": "~10 min",
        "destination": "to Henderson",
        "route": "via Boulder Hwy south"
    },
    {
        "time": "~15 min",
        "destination": "to Harry Reid Airport",
        "route": "via I-515 West"
    },
    {
        "time": "~30 min",
        "destination": "to Lake Mead",
        "route": "via Boulder Hwy / US-93"
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
          <span>Whitney</span>
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
                <span className="hero-v2-stat-num">{ms?.medianSalePrice ?? qs('Median Home Price', '$200K–$400K')}</span>
                <span className="hero-v2-stat-lbl">Median Sale Price</span>
              </div>
              <div className="hero-v2-stat">
                <span className="hero-v2-stat-num">{ms?.avgDaysToClose ?? qs('Avg Days on Market', '45')}</span>
                <span className="hero-v2-stat-lbl">Avg Days to Close</span>
              </div>
            </div>
            <a href="#listings" className="hero-v2-cta">Search Homes in Whitney</a>
          </div>
        </div>
      </header>

      <div className="hero-v2-qfb">
        <div className="container">
          <div className="hero-v2-qfb-row">
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <span><strong>ZIP:</strong> 89122, 89121, 89142</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              <span><strong>Type:</strong> Established · Unincorporated</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
              <span><strong>Price Range:</strong> $200K–$400K</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
              <span><strong>HOA:</strong> $0–$75/mo</span>
            </div>
          </div>
          <div className="hero-v2-qfb-est">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            <span>Est. 1960s</span>
          </div>
        </div>
      </div>

      <section id="demographics" className="demographics-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Demographics</span>
            <h2>Whitney Demographics</h2>
          </div>
          <div className="demo-grid">
            {[
              ['38,000+', 'Population'],
              ['35', 'Median Age'],
              ['$42,000', 'Avg Household Income'],
              ['14,000+', 'Total Households'],
              ['50%', 'Homeownership Rate'],
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
            <h2>Where is Whitney?</h2>
            <p>Las Vegas, Nevada &mdash; Las Vegas, Nevada.</p>
          </div>
          <div className="map-container">
            <LasVegasWhitneyMapWrapper />
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
            <h2 className="listings-title">NEW WHITNEY LISTINGS</h2>
          </div>
          <div className="ylopo-wrap">
            <div className="YLOPO_searchWidget" />
            <div className="YLOPO_resultsWidget" data-search='{"propertyTypes":["house","condo","townhouse"],"minPrice":150000,"locations":[{"city":"Las Vegas","state":"NV"}],"limit":12,"sortBy":"listDate","sortOrder":"desc","keywords":"Whitney","zipCodes":["89122","89121","89142"]}' />
          </div>
          <p className="ylopo-note">Listing data sourced from regional MLS. Information deemed reliable but not guaranteed. Updated daily.</p>
          <div className="listings-actions">
            <a href="https://search.nevadarealestategroup.net/search?s[orderBy]=sourceCreationDate%2Cdesc&s[page]=1&s[locations][0][city]=Las%20Vegas&s[locations][0][state]=NV&s[keywords]=Whitney" target="_blank" rel="noopener noreferrer" className="btn-gold">View All Whitney Listings &rarr;</a>
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
                  <p>Whitney is an unincorporated community in Clark County situated in the east-central Las Vegas Valley between Paradise to the west, Henderson to the south, and Sunrise Manor to the north. Named after the Whitney neighborhood that developed in the mid-20th century, the area has grown into a substantial residential community serving over 38,000 residents with a diverse mix of housing styles and price points.</p>
                  <p>The community's housing stock spans multiple decades, from 1960s ranch homes in the western sections to 2000s-era tract homes in the eastern areas near Whitney Ranch Park. This variety creates a wide pricing spectrum, with homes starting around $200,000 for older properties and reaching $400,000 or more for newer or renovated residences. The predominant architecture is single-story and two-story single-family homes, with scattered condo and townhome developments near major arterials.</p>
                  <p>Whitney's location provides solid access to multiple employment centers. The community sits along the Boulder Highway corridor, providing a direct route to Henderson, Boulder City, and Lake Mead. Tropicana Avenue and Flamingo Road connect west to the Strip and I-15, while the I-515/US-95 interchange serves commuters heading north or south. Sam's Town and the Eastside Cannery add local entertainment options.</p>
                  <p>For budget-conscious buyers and investors, Whitney offers entry-level pricing in a location that benefits from proximity to Henderson's superior services and amenities without Henderson's premium pricing. The community's ongoing infrastructure improvements, including road upgrades and park renovations, continue to enhance livability and support property value appreciation.</p>
                </>
              )}
            </div>
            <div className="overview-aside">
              <div className="quick-facts">
                <h3>Whitney At a Glance</h3>
                {displayStats.map(([label, value, cls]: any) => (
                  <div className="fact-row" key={label}>
                    <span className="fact-label">{label}</span>
                    <span className={`fact-value${cls ? ' ' + cls : ''}`}>{value}</span>
                  </div>
                ))}
              </div>
              <div className="cta-card">
                <p>Ready to explore Whitney? Schedule a private tour of the community and the current listings that match your goals.</p>
                <a href="tel:+17252399950" className="btn-gold">Call 725.239.9950</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="highlights">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Why Whitney</span>
            <h2>What Makes Whitney Stand Out</h2>
          </div>
          <div className="highlights-grid">
            {[
              { title: 'Affordable East Valley', body: 'Entry prices starting around $200,000 make Whitney one of the most accessible communities in the east Las Vegas Valley. Strong value for the location and proximity to Henderson.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
              { title: 'Henderson Adjacent', body: 'Borders the City of Henderson to the south, providing access to Henderson\'s superior amenities, services, and infrastructure without Henderson tax rates.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><line x1="8" y1="6" x2="8" y2="6.01"/><line x1="12" y1="6" x2="12" y2="6.01"/><line x1="16" y1="6" x2="16" y2="6.01"/><line x1="8" y1="10" x2="8" y2="10.01"/><line x1="12" y1="10" x2="12" y2="10.01"/><line x1="16" y1="10" x2="16" y2="10.01"/><line x1="8" y1="14" x2="8" y2="14.01"/><line x1="12" y1="14" x2="12" y2="14.01"/><line x1="16" y1="14" x2="16" y2="14.01"/></svg> },
              { title: 'Boulder Highway Corridor', body: 'Direct access via Boulder Highway to Henderson, Boulder City, and Lake Mead. A growing commercial corridor with improving retail and dining options.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M8 21l4-11 4 11"/><path d="M2 21l5-14 4 8"/><path d="M14 15l4-8 4 14"/><line x1="2" y1="21" x2="22" y2="21"/></svg> },
              { title: 'Diverse Housing Mix', body: 'From 1960s ranches to 2000s new construction. The widest variety of home styles and price points in the east-central valley.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22c4-4 8-7.5 8-12a8 8 0 10-16 0c0 4.5 4 8 8 12z"/><circle cx="12" cy="10" r="3"/></svg> },
              { title: 'Sam\'s Town & Entertainment', body: 'Sam\'s Town Hotel & Casino and Eastside Cannery provide local entertainment, dining, and event venues. A community anchor for the east valley.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
              { title: 'Investment Potential', body: 'Affordable entry with proximity to Henderson\'s growth creates strong appreciation potential. Rental demand is consistent from east valley workers and families.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg> },
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

      <LasVegasWhitneyFAQ />

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
              { name: 'Henderson', href: '/henderson/', price: 'From $350K', compare: 'Premium southeast valley city with top-rated schools and master-planned communities.' },
              { name: 'Paradise', href: '/paradise/', price: 'From $250K', compare: 'Unincorporated area west of Whitney with diverse housing and Strip proximity.' },
              { name: 'Sunrise Manor', href: '/las-vegas-sunrise-manor/', price: 'From $200K', compare: 'Large unincorporated community to the north with affordable housing and military rental demand.' },
              { name: 'Whitney Ranch', href: '/whitney-ranch/', price: 'From $350K', compare: 'Established Henderson community nearby with family amenities and good schools.' },
              { name: 'Silverado Ranch', href: '/silverado-ranch/', price: 'From $350K', compare: 'Newer community to the south with modern homes and growing commercial infrastructure.' },
              { name: 'East Las Vegas', href: '/east-las-vegas/', price: 'From $200K', compare: 'The broader east valley corridor with diverse neighborhoods and affordable options.' },
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
              <h2>Ready to Find Your Whitney Home?</h2>
              <p>Nevada Real Estate Group is the #1 real estate team in Nevada. Whether you&apos;re buying or selling in Whitney, let&apos;s talk.</p>
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
                <input type="hidden" name="_subject" value="Whitney Inquiry — LasVegasHomeSearchExperts.com" />
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
