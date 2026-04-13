import HendersonWatermarkFAQ from '@/components/HendersonWatermarkFAQ'
import Link from 'next/link'
import type { Metadata } from 'next'
import HendersonWatermarkMapWrapper from '@/components/HendersonWatermarkMapWrapper'
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
    { '@type': 'ListItem', position: 3, name: 'Watermark', item: 'https://www.lasvegashomesearchexperts.com/henderson-watermark/' },
  ],
}

const FAQ_DATA = [
  {
    "q": "What is the price range for homes in Watermark?",
    "a": "Homes in Watermark range from approximately $400,000 for attached townhomes to $700,000 or more for larger single-family homes with premium lot positions and upgraded finishes."
  },
  {
    "q": "Is Watermark in Henderson or Las Vegas?",
    "a": "Watermark is located in the City of Henderson, Nevada — consistently ranked among America's safest cities. Henderson is a separately incorporated city southeast of Las Vegas."
  },
  {
    "q": "What ZIP code is Watermark in?",
    "a": "Watermark is located in ZIP code 89011 in eastern Henderson."
  },
  {
    "q": "What schools serve Watermark?",
    "a": "Watermark is zoned for CCSD schools including Vanderburg Elementary (8/10), Del E. Webb Middle (7/10), and Coronado High School (7/10). Charter and private options include Pinecrest Academy and Bishop Gorman."
  },
  {
    "q": "Is Watermark guard-gated?",
    "a": "No. Watermark is not guard-gated. It is a managed HOA community with maintained common areas, community pools, and walking paths. Guard-gated options nearby include Seven Hills and Anthem."
  },
  {
    "q": "What are HOA fees in Watermark?",
    "a": "HOA fees in Watermark typically range from $60 to $150 per month, covering common area maintenance, community pools, and amenity center upkeep."
  },
  {
    "q": "Who built homes in Watermark?",
    "a": "Watermark was primarily developed by Pulte Homes and other national builders starting in 2005. Homes feature modern floor plans with open layouts and energy-efficient construction."
  },
  {
    "q": "How does Watermark compare to other Henderson communities?",
    "a": "Watermark offers Henderson's quality of life at a lower price point than Seven Hills, Anthem, and MacDonald Highlands. It's ideal for families seeking modern construction and strong schools without guard-gate pricing."
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
  name: 'Watermark',
  description: 'Watermark is a master-planned · family community in Henderson, Nevada.',
  geo: { '@type': 'GeoCoordinates', latitude: 36.04, longitude: -115.03 },
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
  const cms = await getCommunityPage('henderson-watermark')
  return {
    title: cms?.metaTitle ?? 'Watermark Homes for Sale | Nevada Real Estate Group',
    description: cms?.metaDescription ?? 'Browse Watermark homes for sale in Henderson, NV. $400K–$700K. Schools, HOA, market stats. Nevada Real Estate Group.',
  }
}

export default async function HendersonWatermarkPage() {
  const cms = await getCommunityPage('henderson-watermark')
  const market = getMarketStats('henderson-watermark')
  const ms = market?.stats

  const heroHeadline = cms?.heroHeadline ?? 'Watermark'
  const heroSubtitle = 'Homes for Sale in Henderson, Nevada'
  const overviewTitle = cms?.overviewTitle ?? 'Watermark: Master-Planned · Family Living in Henderson'

  const HARDCODED_STATS: Array<[string, string] | [string, string, string]> = [
    ['Established', '2005'],
    ['Developer', 'Pulte Homes / Various'],
    ['Total Acreage', '~350 acres'],
    ['Homes', '~2,500'],
    ['Median Home Price', ms?.medianSalePrice ?? '$400K–$700K'],
    ['ZIP Codes', '89011'],
    ['Guard-Gated', 'No'],
    ['HOA', '$60–$150/mo'],
  ]
  const displayStats = mergeQuickStats(HARDCODED_STATS, cms?.quickStats)
  const HARDCODED_DRIVE_TIMES = [
    {
        "time": "~20 min",
        "destination": "to the Strip",
        "route": "via I-215 West → I-15 North"
    },
    {
        "time": "~15 min",
        "destination": "to Harry Reid Airport",
        "route": "via I-215 West → I-15"
    },
    {
        "time": "~10 min",
        "destination": "to Henderson Downtown",
        "route": "via Horizon Ridge Pkwy"
    },
    {
        "time": "~15 min",
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
          <span>Watermark</span>
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
            <a href="#listings" className="hero-v2-cta">Search Homes in Watermark</a>
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
              <span><strong>Type:</strong> Master-Planned · Family</span>
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
            <span>Est. 2005</span>
          </div>
        </div>
      </div>

      <section id="demographics" className="demographics-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Demographics</span>
            <h2>Watermark Demographics</h2>
          </div>
          <div className="demo-grid">
            {[
              ['~7,500', 'Population'],
              ['36', 'Median Age'],
              ['$85,000', 'Avg Household Income'],
              ['~2,500', 'Total Households'],
              ['65%', 'Homeownership Rate'],
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
            <h2>Where is Watermark?</h2>
            <p>Henderson, Nevada &mdash; Henderson, Nevada.</p>
          </div>
          <div className="map-container">
            <HendersonWatermarkMapWrapper />
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
            <h2 className="listings-title">NEW WATERMARK LISTINGS</h2>
          </div>
          <div className="ylopo-wrap">
            <div className="YLOPO_searchWidget" />
            <div className="YLOPO_resultsWidget" data-search='{"propertyTypes":["house","condo","townhouse"],"minPrice":400000,"locations":[{"city":"Henderson","state":"NV"}],"limit":12,"sortBy":"listDate","sortOrder":"desc","keywords":"Watermark Henderson","zipCodes":["89011"]}' />
          </div>
          <p className="ylopo-note">Listing data sourced from regional MLS. Information deemed reliable but not guaranteed. Updated daily.</p>
          <div className="listings-actions">
            <a href="https://search.nevadarealestategroup.net/search?s[orderBy]=sourceCreationDate%2Cdesc&s[page]=1&s[locations][0][city]=Henderson&s[locations][0][state]=NV&s[keywords]=Watermark%20Henderson" target="_blank" rel="noopener noreferrer" className="btn-gold">View All Watermark Listings &rarr;</a>
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
                  <p>Watermark is a well-designed master-planned community in the eastern Henderson corridor, situated along the Horizon Ridge Parkway corridor between Stephanie Street and Gibson Road. Developed starting in 2005 primarily by Pulte Homes and other national builders, Watermark features a cohesive collection of single-family homes, attached homes, and townhomes organized around community parks, walking paths, and a neighborhood amenity center. The community sits at the intersection of suburban convenience and Henderson's signature family-friendly character.</p>
                  <p>Homes in Watermark range from approximately $400,000 for attached townhome-style residences to $700,000 or more for larger single-family homes with three-car garages, premium lot positions, and upgraded interior finishes. Floor plans range from 1,400 to 3,200 square feet with a strong emphasis on open layouts, covered patios, and desert-adapted architecture. The community's construction era (mid-2000s through 2010s) means homes incorporate more modern building standards and energy efficiency than older Henderson neighborhoods.</p>
                  <p>The community's location along the Horizon Ridge corridor provides immediate access to Henderson's robust commercial infrastructure. The Horizon Ridge intersection at Stephanie Street and nearby Green Valley Parkway offer comprehensive grocery, dining, medical, and retail options. Henderson's award-winning parks system includes the nearby Whitney Ranch Recreation Center, and multiple CCSD schools rated above the district average serve the Watermark attendance zones.</p>
                  <p>Watermark appeals to families and professionals seeking Henderson's quality of life — consistently ranked among the safest cities in America — at a price point below the city's premium communities like Seven Hills, Anthem, and MacDonald Highlands. The established HOA maintains clean, well-kept common areas without the premium fees associated with guard-gated or golf-course communities.</p>
                </>
              )}
            </div>
            <div className="overview-aside">
              <div className="quick-facts">
                <h3>Watermark At a Glance</h3>
                {displayStats.map(([label, value, cls]: any) => (
                  <div className="fact-row" key={label}>
                    <span className="fact-label">{label}</span>
                    <span className={`fact-value${cls ? ' ' + cls : ''}`}>{value}</span>
                  </div>
                ))}
              </div>
              <div className="cta-card">
                <p>Ready to explore Watermark? Schedule a private tour of the community and the current listings that match your goals.</p>
                <a href="tel:+17252399950" className="btn-gold">Call 725.239.9950</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="highlights">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Why Watermark</span>
            <h2>What Makes Watermark Stand Out</h2>
          </div>
          <div className="highlights-grid">
            {[
              { title: 'Henderson Quality of Life', body: 'Located in Henderson, consistently ranked among America\'s safest cities. Access to award-winning parks, above-average schools, and a family-friendly civic culture.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
              { title: 'Modern Construction', body: 'Homes built from 2005 onward with modern floor plans, energy-efficient systems, and contemporary finishes. More modern building standards than older Henderson communities.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
              { title: 'Community Amenities', body: 'Neighborhood amenity center, community pools, walking paths, tot lots, and pocket parks throughout. Well-maintained common areas create a cohesive community feel.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22c4-4 8-7.5 8-12a8 8 0 10-16 0c0 4.5 4 8 8 12z"/><circle cx="12" cy="10" r="3"/></svg> },
              { title: 'Horizon Ridge Corridor', body: 'Immediate access to Henderson\'s Horizon Ridge commercial corridor with comprehensive grocery, dining, medical, fitness, and professional services within minutes.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><line x1="8" y1="6" x2="8" y2="6.01"/><line x1="12" y1="6" x2="12" y2="6.01"/><line x1="16" y1="6" x2="16" y2="6.01"/><line x1="8" y1="10" x2="8" y2="10.01"/><line x1="12" y1="10" x2="12" y2="10.01"/><line x1="16" y1="10" x2="16" y2="10.01"/><line x1="8" y1="14" x2="8" y2="14.01"/><line x1="12" y1="14" x2="12" y2="14.01"/><line x1="16" y1="14" x2="16" y2="14.01"/></svg> },
              { title: 'Strong Schools', body: 'Zoned for above-average CCSD schools and close to Henderson\'s top-rated charter and private school options. Education quality is a key draw for Watermark families.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M4 19.5A2.5 2.5 0 006.5 22H20V2H6.5A2.5 2.5 0 004 4.5v15z"/></svg> },
              { title: 'Value in Henderson', body: 'Henderson\'s quality of life at a price point below Seven Hills, Anthem, and MacDonald Highlands. An excellent entry point into the Henderson real estate market.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg> },
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

      <HendersonWatermarkFAQ />

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
              { name: 'Whitney Ranch', href: '/whitney-ranch/', price: 'From $350K', compare: 'Established Henderson community with parks, pools, and strong family amenities. More affordable entry point.' },
              { name: 'Seven Hills', href: '/seven-hills/', price: 'From $500K', compare: 'Premium Henderson community with guard-gated sections, country club, and elevated views.' },
              { name: 'Cadence', href: '/cadence/', price: 'From $350K', compare: 'Newer master-planned community with modern amenities, parks, and active new construction.' },
              { name: 'Inspirada', href: '/inspirada/', price: 'From $400K', compare: 'Master-planned community in Henderson with parks, pools, and newer construction.' },
              { name: 'Henderson', href: '/henderson/', price: 'From $350K', compare: 'The broader Henderson market with dozens of communities across every price point.' },
              { name: 'Lake Las Vegas', href: '/lake-las-vegas/', price: 'From $400K', compare: 'Resort-style lakefront living in Henderson with a Mediterranean village and water sports.' },
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
              <h2>Ready to Find Your Watermark Home?</h2>
              <p>Nevada Real Estate Group is the #1 real estate team in Nevada. Whether you&apos;re buying or selling in Watermark, let&apos;s talk.</p>
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
                <input type="hidden" name="_subject" value="Watermark Inquiry — LasVegasHomeSearchExperts.com" />
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
