import HendersonSilverstoneFAQ from '@/components/HendersonSilverstoneFAQ'
import Link from 'next/link'
import type { Metadata } from 'next'
import HendersonSilverstoneMapWrapper from '@/components/HendersonSilverstoneMapWrapper'
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
    { '@type': 'ListItem', position: 3, name: 'Silverstone', item: 'https://www.lasvegashomesearchexperts.com/henderson-silverstone/' },
  ],
}

const FAQ_DATA = [
  {
    "q": "What is the price range for homes in Silverstone?",
    "a": "Homes in Silverstone range from approximately $400,000 for smaller single-family homes to $700,000 for larger residences on premium lots."
  },
  {
    "q": "What ZIP codes cover Silverstone?",
    "a": "Silverstone spans portions of ZIP codes 89074 and 89052 in Henderson, Nevada."
  },
  {
    "q": "What schools serve Silverstone?",
    "a": "Silverstone is served by well-regarded CCSD Henderson schools including Elise L. Wolff Elementary (8/10), Del E. Webb Middle School (8/10), and Coronado High School (7/10)."
  },
  {
    "q": "How far is Silverstone from the Strip?",
    "a": "Silverstone is approximately 20 minutes from the Las Vegas Strip via I-215 and I-15 North."
  },
  {
    "q": "Is Silverstone a good area for families?",
    "a": "Yes. Silverstone offers top-rated schools, community parks, safe neighborhoods, and Henderson's excellent municipal services — all at moderate pricing."
  },
  {
    "q": "What are HOA fees in Silverstone?",
    "a": "HOA fees in Silverstone typically range from $60 to $150 per month, covering common area maintenance, parks, and community amenities."
  },
  {
    "q": "Is there a golf course at Silverstone?",
    "a": "The original Silverstone Golf Club has been redeveloped. The area still benefits from proximity to multiple Henderson golf courses including Anthem and Revere."
  },
  {
    "q": "How does Silverstone compare to Seven Hills?",
    "a": "Silverstone offers similar Henderson quality at a lower price point. Seven Hills has a golf course and slightly more premium positioning, but Silverstone delivers excellent value."
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
  name: 'Silverstone',
  description: 'Silverstone is a suburban · established community in Henderson, Nevada.',
  geo: { '@type': 'GeoCoordinates', latitude: 36.052, longitude: -115.08 },
  address: { '@type': 'PostalAddress', addressLocality: 'Henderson', addressRegion: 'NV', postalCode: '89074', addressCountry: 'US' },
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
  const cms = await getCommunityPage('henderson-silverstone')
  return {
    title: cms?.metaTitle ?? 'Silverstone Homes for Sale | Nevada Real Estate Group',
    description: cms?.metaDescription ?? 'Browse Silverstone homes for sale in Henderson, NV. $400K–$700K. Schools, HOA, market stats. Nevada Real Estate Group.',
  }
}

export default async function HendersonSilverstonePage() {
  const cms = await getCommunityPage('henderson-silverstone')
  const market = getMarketStats('henderson-silverstone')
  const ms = market?.stats

  const heroHeadline = cms?.heroHeadline ?? 'Silverstone'
  const heroSubtitle = 'Homes for Sale in Henderson, Nevada'
  const overviewTitle = cms?.overviewTitle ?? 'Silverstone: Suburban · Established Living in Henderson'

  const HARDCODED_STATS: Array<[string, string] | [string, string, string]> = [
    ['Established', '2000'],
    ['Developer', 'Various'],
    ['Total Acreage', '~700 acres'],
    ['Homes', '3,500+'],
    ['Median Home Price', ms?.medianSalePrice ?? '$400K–$700K'],
    ['ZIP Codes', '89074, 89052'],
    ['Guard-Gated', 'No'],
    ['HOA', '$60–$150/mo'],
  ]
  const displayStats = mergeQuickStats(HARDCODED_STATS, cms?.quickStats)
  const HARDCODED_DRIVE_TIMES = [
    {
        "time": "~20 min",
        "destination": "to the Strip",
        "route": "via I-215 → I-15 North"
    },
    {
        "time": "~20 min",
        "destination": "to Harry Reid Airport",
        "route": "via I-215 → I-15"
    },
    {
        "time": "~5 min",
        "destination": "to Galleria at Sunset",
        "route": "via Stephanie St / Sunset Rd"
    },
    {
        "time": "~10 min",
        "destination": "to Green Valley Ranch Resort",
        "route": "via Eastern Ave north"
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
          <span>Silverstone</span>
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
                <span className="hero-v2-stat-num">{ms?.medianSalePrice ?? qs('Median Home Price', '$400K–$700K')}</span>
                <span className="hero-v2-stat-lbl">Median Sale Price</span>
              </div>
              <div className="hero-v2-stat">
                <span className="hero-v2-stat-num">{ms?.avgDaysToClose ?? qs('Avg Days on Market', '45')}</span>
                <span className="hero-v2-stat-lbl">Avg Days to Close</span>
              </div>
            </div>
            <a href="#listings" className="hero-v2-cta">Search Homes in Silverstone</a>
          </div>
        </div>
      </header>

      <div className="hero-v2-qfb">
        <div className="container">
          <div className="hero-v2-qfb-row">
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <span><strong>ZIP:</strong> 89074, 89052</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              <span><strong>Type:</strong> Suburban · Established</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
              <span><strong>Price Range:</strong> $400K–$700K</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
              <span><strong>HOA:</strong> $60–$150/mo</span>
            </div>
          </div>
          <div className="hero-v2-qfb-est">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            <span>Est. 2000</span>
          </div>
        </div>
      </div>

      <section id="demographics" className="demographics-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Demographics</span>
            <h2>Silverstone Demographics</h2>
          </div>
          <div className="demo-grid">
            {[
              ['14,000+', 'Population'],
              ['40', 'Median Age'],
              ['$82,000', 'Avg Household Income'],
              ['4,500+', 'Total Households'],
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
            <h2>Where is Silverstone?</h2>
            <p>Henderson, Nevada &mdash; Henderson, Nevada.</p>
          </div>
          <div className="map-container">
            <HendersonSilverstoneMapWrapper />
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
            <h2 className="listings-title">NEW SILVERSTONE LISTINGS</h2>
          </div>
          <div className="ylopo-wrap">
            <div className="YLOPO_searchWidget" />
            <div className="YLOPO_resultsWidget" data-search='{"propertyTypes":["house","condo","townhouse"],"minPrice":350000,"locations":[{"city":"Henderson","state":"NV"}],"limit":12,"sortBy":"listDate","sortOrder":"desc","keywords":"Silverstone","zipCodes":["89074","89052"]}' />
          </div>
          <p className="ylopo-note">Listing data sourced from regional MLS. Information deemed reliable but not guaranteed. Updated daily.</p>
          <div className="listings-actions">
            <a href="https://search.nevadarealestategroup.net/search?s[orderBy]=sourceCreationDate%2Cdesc&s[page]=1&s[locations][0][city]=Henderson&s[locations][0][state]=NV&s[keywords]=Silverstone" target="_blank" rel="noopener noreferrer" className="btn-gold">View All Silverstone Listings &rarr;</a>
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
                  <p>Silverstone is a well-established residential community in central Henderson, located along the Eastern Avenue and Stephanie Street corridors between Green Valley Ranch and Anthem. The community was developed primarily in the early 2000s and features quality single-family homes, community parks, and a convenient location that provides access to some of Henderson's best shopping, dining, and medical facilities.</p>
                  <p>The community's name derives from the Silverstone Ranch and Silverstone Golf Club that once anchored the area. Today the residential neighborhoods feature a mix of single-family homes ranging from approximately $400,000 for smaller floor plans to $700,000 for larger homes on premium lots. The construction quality is typical of early 2000s Henderson development — solid block and stucco with tile roofing, open floor plans, and well-designed community spaces.</p>
                  <p>Silverstone's central Henderson location is arguably its greatest asset. The community is equidistant from Green Valley Ranch Resort to the north and the Anthem Marketplace to the south, with the Galleria at Sunset mall, Henderson Hospital, and numerous professional offices within a five-to-ten minute drive. The I-215 beltway and I-515/US-95 are both accessible, providing connectivity to every part of the Las Vegas Valley.</p>
                  <p>For families, Silverstone offers a combination of good schools, safe neighborhoods, and community amenities at price points that are more moderate than the premium guard-gated communities nearby. The area's mature landscaping, established HOAs, and proven infrastructure give it a settled, well-maintained character that newer communities in the eastern valley cannot yet match.</p>
                </>
              )}
            </div>
            <div className="overview-aside">
              <div className="quick-facts">
                <h3>Silverstone At a Glance</h3>
                {displayStats.map(([label, value, cls]: any) => (
                  <div className="fact-row" key={label}>
                    <span className="fact-label">{label}</span>
                    <span className={`fact-value${cls ? ' ' + cls : ''}`}>{value}</span>
                  </div>
                ))}
              </div>
              <div className="cta-card">
                <p>Ready to explore Silverstone? Schedule a private tour of the community and the current listings that match your goals.</p>
                <a href="tel:+17252399950" className="btn-gold">Call 725.239.9950</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="highlights">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Why Silverstone</span>
            <h2>What Makes Silverstone Stand Out</h2>
          </div>
          <div className="highlights-grid">
            {[
              { title: 'Central Henderson Location', body: 'Equidistant from Green Valley Ranch and Anthem with access to Henderson\'s best shopping, dining, medical, and entertainment within minutes.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><line x1="8" y1="6" x2="8" y2="6.01"/><line x1="12" y1="6" x2="12" y2="6.01"/><line x1="16" y1="6" x2="16" y2="6.01"/><line x1="8" y1="10" x2="8" y2="10.01"/><line x1="12" y1="10" x2="12" y2="10.01"/><line x1="16" y1="10" x2="16" y2="10.01"/><line x1="8" y1="14" x2="8" y2="14.01"/><line x1="12" y1="14" x2="12" y2="14.01"/><line x1="16" y1="14" x2="16" y2="14.01"/></svg> },
              { title: 'Quality Construction', body: 'Early 2000s Henderson construction with solid building quality, modern floor plans, and desert-adapted design throughout the community.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
              { title: 'Henderson Schools', body: 'Served by well-regarded CCSD Henderson schools. Strong academic performance and active parent engagement support educational excellence.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
              { title: 'Community Parks', body: 'Well-maintained parks with walking trails, playgrounds, sports courts, and green spaces provide outdoor recreation throughout the community.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22c4-4 8-7.5 8-12a8 8 0 10-16 0c0 4.5 4 8 8 12z"/><circle cx="12" cy="10" r="3"/></svg> },
              { title: 'Beltway Access', body: 'Quick access to I-215 and I-515/US-95 for commuting to the Strip, downtown, and the airport. One of the best-connected communities in Henderson.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M8 21l4-11 4 11"/><path d="M2 21l5-14 4 8"/><path d="M14 15l4-8 4 14"/><line x1="2" y1="21" x2="22" y2="21"/></svg> },
              { title: 'Moderate Premium', body: 'Henderson quality at moderate pricing — similar construction and amenities to nearby Anthem and Seven Hills at a lower per-square-foot cost.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg> },
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

      <HendersonSilverstoneFAQ />

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
              { name: 'Green Valley Ranch', href: '/green-valley-ranch/', price: 'From $400K', compare: 'Master-planned community to the north with golf, resort, and extensive amenities.' },
              { name: 'Anthem', href: '/anthem/', price: 'From $400K', compare: 'Large master-planned community to the south with mountain views and extensive trails.' },
              { name: 'Seven Hills', href: '/seven-hills/', price: 'From $500K', compare: 'Premium community to the west with golf course, parks, and elevated views.' },
              { name: 'Coronado Ranch', href: '/coronado-ranch/', price: 'From $475K', compare: 'Guard-gated community nearby with controlled access and family-oriented amenities.' },
              { name: 'Henderson', href: '/henderson/', price: 'From $350K', compare: 'The broader city with diverse neighborhoods and top-quality municipal services.' },
              { name: 'Cadence', href: '/cadence/', price: 'From $375K', compare: 'Newer master-planned community to the east with modern amenities and contemporary design.' },
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
              <h2>Ready to Find Your Silverstone Home?</h2>
              <p>Nevada Real Estate Group is the #1 real estate team in Nevada. Whether you&apos;re buying or selling in Silverstone, let&apos;s talk.</p>
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
                <input type="hidden" name="_subject" value="Silverstone Inquiry — LasVegasHomeSearchExperts.com" />
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
