import CentennialHillsFAQ from '@/components/CentennialHillsFAQ'
import Link from 'next/link'
import type { Metadata } from 'next'
import CentennialHillsMapWrapper from '@/components/CentennialHillsMapWrapper'
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
    { '@type': 'ListItem', position: 3, name: 'Centennial Hills', item: 'https://www.lasvegashomesearchexperts.com/centennial-hills/' },
  ],
}

const FAQ_DATA = [
  {
    "q": "What is the price range for homes in Centennial Hills?",
    "a": "Homes in Centennial Hills range from approximately $350,000 for established single-family homes to $700,000 for premium properties in newer sections. Most homes fall in the $400K to $550K range."
  },
  {
    "q": "Is Centennial Hills a master-planned community?",
    "a": "Centennial Hills is not a single master-planned community but rather a broad geographic area in northwest Las Vegas that encompasses multiple planned developments and standalone neighborhoods. It includes communities like Providence and portions of the Tule Springs development."
  },
  {
    "q": "What ZIP codes are in Centennial Hills?",
    "a": "Centennial Hills spans ZIP codes 89131, 89149, and 89143 in northwest Las Vegas."
  },
  {
    "q": "What is Floyd Lamb Park?",
    "a": "Floyd Lamb Park at Tule Springs is a 680-acre historic park within the Centennial Hills area. It features fishing ponds, walking trails, peacock gardens, historic ranch buildings, and wildlife viewing. It is one of the most unique outdoor attractions in the Las Vegas Valley."
  },
  {
    "q": "What schools serve Centennial Hills?",
    "a": "Centennial Hills is served by CCSD schools including Lowman Elementary (8/10), Escobedo Middle (7/10), and Centennial High School (6/10). Private options include Bishop Gorman (A+) and Faith Lutheran (A)."
  },
  {
    "q": "Is Centennial Hills safe?",
    "a": "Centennial Hills is generally considered one of the safer areas in the northwest Las Vegas Valley. The newer neighborhoods, active HOAs, and family-oriented community character contribute to a positive safety profile."
  },
  {
    "q": "How far is Centennial Hills from the Strip?",
    "a": "Centennial Hills is approximately 20 minutes from the Las Vegas Strip via US-95 South to I-15. Downtown Summerlin is about 15 minutes away."
  },
  {
    "q": "Is there new construction in Centennial Hills?",
    "a": "Yes. Several areas within Centennial Hills have active new construction, particularly in the Tule Springs area and the western sections. National builders are developing new subdivisions with contemporary floor plans."
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
  name: 'Centennial Hills',
  description: 'Centennial Hills is a suburban · growth corridor community in Las Vegas, Nevada.',
  geo: { '@type': 'GeoCoordinates', latitude: 36.268, longitude: -115.268 },
  address: { '@type': 'PostalAddress', addressLocality: 'Las Vegas', addressRegion: 'NV', postalCode: '89131', addressCountry: 'US' },
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
  const cms = await getCommunityPage('centennial-hills')
  return {
    title: cms?.metaTitle ?? 'Centennial Hills Homes for Sale | Nevada Real Estate Group',
    description: cms?.metaDescription ?? 'Browse Centennial Hills homes for sale in Las Vegas, NV. $350K–$700K. Schools, HOA, market stats. Nevada Real Estate Group.',
  }
}

export default async function CentennialHillsPage() {
  const cms = await getCommunityPage('centennial-hills')
  const market = getMarketStats('centennial-hills')
  const ms = market?.stats

  const heroHeadline = cms?.heroHeadline ?? 'Centennial Hills'
  const heroSubtitle = 'Homes for Sale in Las Vegas, Nevada'
  const overviewTitle = cms?.overviewTitle ?? 'Centennial Hills: Suburban · Growth Corridor Living in Las Vegas'

  const HARDCODED_STATS: Array<[string, string] | [string, string, string]> = [
    ['Established', '1998'],
    ['Developer', 'Various'],
    ['Total Acreage', '~20 sq mi'],
    ['Homes', '30,000+'],
    ['Median Home Price', ms?.medianSalePrice ?? '$350K–$700K'],
    ['ZIP Codes', '89131, 89149, 89143'],
    ['Guard-Gated', 'No'],
    ['HOA', '$25–$200/mo'],
  ]
  const displayStats = mergeQuickStats(HARDCODED_STATS, cms?.quickStats)
  const HARDCODED_DRIVE_TIMES = [
    {
        "time": "~20 min",
        "destination": "to the Strip",
        "route": "via US-95 South → I-15"
    },
    {
        "time": "~30 min",
        "destination": "to Harry Reid Airport",
        "route": "via US-95 → I-15 South"
    },
    {
        "time": "~15 min",
        "destination": "to Downtown Summerlin",
        "route": "via US-95 South → Summerlin Pkwy"
    },
    {
        "time": "~10 min",
        "destination": "to Skye Canyon",
        "route": "via US-95 North"
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
          <span>Centennial Hills</span>
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
                <span className="hero-v2-stat-num">{ms?.medianSalePrice ?? qs('Median Home Price', '$350K–$700K')}</span>
                <span className="hero-v2-stat-lbl">Median Sale Price</span>
              </div>
              <div className="hero-v2-stat">
                <span className="hero-v2-stat-num">{ms?.avgDaysToClose ?? qs('Avg Days on Market', '45')}</span>
                <span className="hero-v2-stat-lbl">Avg Days to Close</span>
              </div>
            </div>
            <a href="#listings" className="hero-v2-cta">Search Homes in Centennial Hills</a>
          </div>
        </div>
      </header>

      <div className="hero-v2-qfb">
        <div className="container">
          <div className="hero-v2-qfb-row">
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <span><strong>ZIP:</strong> 89131, 89149, 89143</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              <span><strong>Type:</strong> Suburban · Growth Corridor</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
              <span><strong>Price Range:</strong> $350K–$700K</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
              <span><strong>HOA:</strong> $25–$200/mo</span>
            </div>
          </div>
          <div className="hero-v2-qfb-est">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            <span>Est. 1998</span>
          </div>
        </div>
      </div>

      <section id="demographics" className="demographics-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Demographics</span>
            <h2>Centennial Hills Demographics</h2>
          </div>
          <div className="demo-grid">
            {[
              ['90,000+', 'Population'],
              ['35', 'Median Age'],
              ['$70,000', 'Avg Household Income'],
              ['30,000+', 'Total Households'],
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
            <h2>Where is Centennial Hills?</h2>
            <p>Northwest Las Vegas, Nevada &mdash; Las Vegas, Nevada.</p>
          </div>
          <div className="map-container">
            <CentennialHillsMapWrapper />
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
            <h2 className="listings-title">NEW CENTENNIAL HILLS LISTINGS</h2>
          </div>
          <div className="ylopo-wrap">
            <div className="YLOPO_searchWidget" />
            <div className="YLOPO_resultsWidget" data-search='{"propertyTypes":["house","condo","townhouse"],"minPrice":300000,"locations":[{"city":"Las Vegas","state":"NV"}],"limit":12,"sortBy":"listDate","sortOrder":"desc","keywords":"Centennial Hills","zipCodes":["89131","89149","89143"]}' />
          </div>
          <p className="ylopo-note">Listing data sourced from regional MLS. Information deemed reliable but not guaranteed. Updated daily.</p>
          <div className="listings-actions">
            <a href="https://search.nevadarealestategroup.net/search?s[orderBy]=sourceCreationDate%2Cdesc&s[page]=1&s[locations][0][city]=Las%20Vegas&s[locations][0][state]=NV&s[keywords]=Centennial%20Hills" target="_blank" rel="noopener noreferrer" className="btn-gold">View All Centennial Hills Listings &rarr;</a>
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
                  <p>Centennial Hills is a large and rapidly growing residential area in northwest Las Vegas that has evolved from open desert to one of the most popular family-oriented communities in the valley. Spanning approximately 20 square miles between the 95 freeway and the western mountains, Centennial Hills encompasses numerous subdivisions, master-planned communities, commercial corridors, and community parks that collectively serve as the residential anchor of northwest Las Vegas.</p>
                  <p>Unlike Summerlin or Southern Highlands, Centennial Hills is not a single master-planned community but rather a broad geographic area that includes multiple planned developments and standalone neighborhoods. This creates a diverse housing stock ranging from affordable single-family homes starting around $350,000 to premium lots and custom homes reaching $700,000 or more. The area's newer construction — much of it built from the mid-2000s through the present — means modern floor plans, energy-efficient features, and contemporary design.</p>
                  <p>The commercial infrastructure in Centennial Hills has matured significantly. The Centennial Hills area along the 95 freeway corridor features major shopping centers, grocery stores, restaurants, medical facilities, and entertainment options. The Centennial Hills YMCA and Centennial Hills Park provide outstanding recreation facilities. Floyd Lamb Park at Tule Springs, a 680-acre historic park with fishing ponds and walking trails, is one of the valley's hidden gems and sits within the Centennial Hills area.</p>
                  <p>For families, Centennial Hills offers a compelling combination of newer schools, abundant parks, safe neighborhoods, and attainable pricing. The area serves as a stepping stone between the more affordable North Las Vegas communities to the east and the premium Summerlin communities to the south. Freeway access via the 95 provides a direct corridor to downtown Las Vegas and the Strip, with commute times of 20–25 minutes depending on traffic.</p>
                </>
              )}
            </div>
            <div className="overview-aside">
              <div className="quick-facts">
                <h3>Centennial Hills At a Glance</h3>
                {displayStats.map(([label, value, cls]: any) => (
                  <div className="fact-row" key={label}>
                    <span className="fact-label">{label}</span>
                    <span className={`fact-value${cls ? ' ' + cls : ''}`}>{value}</span>
                  </div>
                ))}
              </div>
              <div className="cta-card">
                <p>Ready to explore Centennial Hills? Schedule a private tour of the community and the current listings that match your goals.</p>
                <a href="tel:+17252399950" className="btn-gold">Call 725.239.9950</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="highlights">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Why Centennial Hills</span>
            <h2>What Makes Centennial Hills Stand Out</h2>
          </div>
          <div className="highlights-grid">
            {[
              { title: 'Family-Friendly Growth', body: 'One of the fastest-growing family areas in Las Vegas. Newer schools, abundant parks, safe neighborhoods, and attainable pricing attract young families in large numbers.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
              { title: 'Floyd Lamb Park at Tule Springs', body: '680-acre historic park with fishing ponds, walking trails, peacock gardens, and historic ranch buildings. One of the Las Vegas Valley\'s most unique outdoor attractions.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22c4-4 8-7.5 8-12a8 8 0 10-16 0c0 4.5 4 8 8 12z"/><circle cx="12" cy="10" r="3"/></svg> },
              { title: 'Modern Construction', body: 'Much of Centennial Hills was built from the mid-2000s forward. Modern floor plans, energy-efficient construction, and contemporary finishes at competitive prices.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><line x1="8" y1="6" x2="8" y2="6.01"/><line x1="12" y1="6" x2="12" y2="6.01"/><line x1="16" y1="6" x2="16" y2="6.01"/><line x1="8" y1="10" x2="8" y2="10.01"/><line x1="12" y1="10" x2="12" y2="10.01"/><line x1="16" y1="10" x2="16" y2="10.01"/><line x1="8" y1="14" x2="8" y2="14.01"/><line x1="12" y1="14" x2="12" y2="14.01"/><line x1="16" y1="14" x2="16" y2="14.01"/></svg> },
              { title: 'Centennial Hills YMCA', body: 'Full-service YMCA with indoor pool, fitness center, gymnasium, youth programs, and community events. A major recreational anchor for the northwest valley.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
              { title: 'US-95 Freeway Corridor', body: 'Direct freeway access to downtown Las Vegas and the Strip via US-95. The commercial corridor along the freeway provides extensive shopping, dining, and services.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M8 21l4-11 4 11"/><path d="M2 21l5-14 4 8"/><path d="M14 15l4-8 4 14"/><line x1="2" y1="21" x2="22" y2="21"/></svg> },
              { title: 'Diverse Price Points', body: 'From $350K starter homes to $700K premium properties. Centennial Hills bridges the gap between affordable North Las Vegas and premium Summerlin, offering something for every budget.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg> },
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

      <CentennialHillsFAQ />

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
              { name: 'Skye Canyon', href: '/skye-canyon/', price: 'From $400K', compare: 'New master-planned community 10 minutes northwest with mountain access and Skye Center amenities.' },
              { name: 'Providence', href: '/providence/', price: 'From $350K', compare: 'Master-planned community within the Centennial Hills area. Organized neighborhood with community amenities.' },
              { name: 'Aliante', href: '/aliante/', price: 'From $300K', compare: 'Premier North Las Vegas master plan with golf and casino. More affordable pricing tier.' },
              { name: 'Lone Mountain', href: '/lone-mountain/', price: 'From $400K', compare: 'Semi-rural enclave to the west with large lots, equestrian properties, and mountain views.' },
              { name: 'Summerlin', href: '/summerlin/', price: 'From $450K', compare: 'Premier master-planned community to the south. Higher prices but more extensive guard-gated options.' },
              { name: 'Desert Shores', href: '/desert-shores/', price: 'From $350K', compare: 'Waterfront community to the south with four man-made lakes and resort-style amenities.' },
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
              <h2>Ready to Find Your Centennial Hills Home?</h2>
              <p>Nevada Real Estate Group is the #1 real estate team in Nevada. Whether you&apos;re buying or selling in Centennial Hills, let&apos;s talk.</p>
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
                <input type="hidden" name="_subject" value="Centennial Hills Inquiry — LasVegasHomeSearchExperts.com" />
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
