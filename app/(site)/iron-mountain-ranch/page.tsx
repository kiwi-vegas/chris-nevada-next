import IronMountainRanchFAQ from '@/components/IronMountainRanchFAQ'
import Link from 'next/link'
import type { Metadata } from 'next'
import IronMountainRanchMapWrapper from '@/components/IronMountainRanchMapWrapper'
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
    { '@type': 'ListItem', position: 3, name: 'Iron Mountain Ranch', item: 'https://www.lasvegashomesearchexperts.com/iron-mountain-ranch/' },
  ],
}

const FAQ_DATA = [
  {
    "q": "What is the price range for homes in Iron Mountain Ranch?",
    "a": "Homes in Iron Mountain Ranch range from approximately $350,000 for smaller homes to $600,000 for premium homes on the best lots with mountain views."
  },
  {
    "q": "Is Iron Mountain Ranch guard-gated?",
    "a": "No — Iron Mountain Ranch is not guard-gated. It is an open community with HOA governance and well-maintained common areas."
  },
  {
    "q": "What ZIP code is Iron Mountain Ranch in?",
    "a": "Iron Mountain Ranch is located in ZIP code 89131 in northwest Las Vegas."
  },
  {
    "q": "What schools serve Iron Mountain Ranch?",
    "a": "Iron Mountain Ranch is served by CCSD schools including Shadow Ridge High School. Charter options like Doral Academy (9/10) provide school choice. Bishop Gorman (A+) is the top private option."
  },
  {
    "q": "What are HOA fees in Iron Mountain Ranch?",
    "a": "HOA fees are low, typically $50 to $150 per month, covering common area maintenance and community landscaping."
  },
  {
    "q": "How does Iron Mountain Ranch compare to Skye Canyon?",
    "a": "Iron Mountain Ranch offers more established neighborhoods with mature landscaping at lower price points. Skye Canyon is newer with more current architecture and the Skye Center amenity hub, but at higher prices."
  },
  {
    "q": "Who built homes in Iron Mountain Ranch?",
    "a": "Major builders include Richmond American, KB Home, and Beazer Homes. The variety of builders provides diverse floor plan options throughout the community."
  },
  {
    "q": "Is Iron Mountain Ranch a good investment?",
    "a": "Iron Mountain Ranch has shown strong long-term appreciation and the affordable price points create strong rental demand. The northwest valley's continued growth supports ongoing value."
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
  name: 'Iron Mountain Ranch',
  description: 'Iron Mountain Ranch is a master-planned · family community in Las Vegas, Nevada.',
  geo: { '@type': 'GeoCoordinates', latitude: 36.282, longitude: -115.28 },
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
  const cms = await getCommunityPage('iron-mountain-ranch')
  return {
    title: cms?.metaTitle ?? 'Iron Mountain Ranch Homes for Sale | Nevada Real Estate Group',
    description: cms?.metaDescription ?? 'Browse Iron Mountain Ranch homes for sale in Las Vegas, NV. $350K–$600K. Schools, HOA, market stats. Nevada Real Estate Group.',
  }
}

export default async function IronMountainRanchPage() {
  const cms = await getCommunityPage('iron-mountain-ranch')
  const market = getMarketStats('iron-mountain-ranch')
  const ms = market?.stats

  const heroHeadline = cms?.heroHeadline ?? 'Iron Mountain Ranch'
  const heroSubtitle = 'Homes for Sale in Las Vegas, Nevada'
  const overviewTitle = cms?.overviewTitle ?? 'Iron Mountain Ranch: Master-Planned · Family Living in Las Vegas'

  const HARDCODED_STATS: Array<[string, string] | [string, string, string]> = [
    ['Established', '2004'],
    ['Developer', 'Richmond American / KB Home'],
    ['Total Acreage', '~500 acres'],
    ['Homes', '2,800+'],
    ['Median Home Price', ms?.medianSalePrice ?? '$350K–$600K'],
    ['ZIP Codes', '89131'],
    ['Guard-Gated', 'No'],
    ['HOA', '$50–$150/mo'],
  ]
  const displayStats = mergeQuickStats(HARDCODED_STATS, cms?.quickStats)
  const HARDCODED_DRIVE_TIMES = [
    {
        "time": "~25 min",
        "destination": "to the Strip",
        "route": "via US-95 → I-15"
    },
    {
        "time": "~30 min",
        "destination": "to Harry Reid Airport",
        "route": "via US-95 → I-15 → I-215"
    },
    {
        "time": "~15 min",
        "destination": "to Centennial Hills",
        "route": "via N Durango Dr"
    },
    {
        "time": "~20 min",
        "destination": "to Summerlin",
        "route": "via US-95 West"
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
          <span>Iron Mountain Ranch</span>
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
                <span className="hero-v2-stat-num">{ms?.medianSalePrice ?? qs('Median Home Price', '$350K–$600K')}</span>
                <span className="hero-v2-stat-lbl">Median Sale Price</span>
              </div>
              <div className="hero-v2-stat">
                <span className="hero-v2-stat-num">{ms?.avgDaysToClose ?? qs('Avg Days on Market', '45')}</span>
                <span className="hero-v2-stat-lbl">Avg Days to Close</span>
              </div>
            </div>
            <a href="#listings" className="hero-v2-cta">Search Homes in Iron Mountain Ranch</a>
          </div>
        </div>
      </header>

      <div className="hero-v2-qfb">
        <div className="container">
          <div className="hero-v2-qfb-row">
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <span><strong>ZIP:</strong> 89131</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              <span><strong>Type:</strong> Master-Planned · Family</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
              <span><strong>Price Range:</strong> $350K–$600K</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
              <span><strong>HOA:</strong> $50–$150/mo</span>
            </div>
          </div>
          <div className="hero-v2-qfb-est">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            <span>Est. 2004</span>
          </div>
        </div>
      </div>

      <section id="demographics" className="demographics-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Demographics</span>
            <h2>Iron Mountain Ranch Demographics</h2>
          </div>
          <div className="demo-grid">
            {[
              ['~8,500', 'Population'],
              ['36', 'Median Age'],
              ['$72,000', 'Avg Household Income'],
              ['2,800+', 'Total Households'],
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
            <h2>Where is Iron Mountain Ranch?</h2>
            <p>Northwest Las Vegas, Nevada &mdash; Las Vegas, Nevada.</p>
          </div>
          <div className="map-container">
            <IronMountainRanchMapWrapper />
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
            <h2 className="listings-title">NEW IRON MOUNTAIN RANCH LISTINGS</h2>
          </div>
          <div className="ylopo-wrap">
            <div className="YLOPO_searchWidget" />
            <div className="YLOPO_resultsWidget" data-search='{"propertyTypes":["house","condo","townhouse"],"minPrice":300000,"locations":[{"city":"Las Vegas","state":"NV"}],"limit":12,"sortBy":"listDate","sortOrder":"desc","keywords":"Iron Mountain Ranch","zipCodes":["89131"]}' />
          </div>
          <p className="ylopo-note">Listing data sourced from regional MLS. Information deemed reliable but not guaranteed. Updated daily.</p>
          <div className="listings-actions">
            <a href="https://search.nevadarealestategroup.net/search?s[orderBy]=sourceCreationDate%2Cdesc&s[page]=1&s[locations][0][city]=Las%20Vegas&s[locations][0][state]=NV&s[keywords]=Iron%20Mountain%20Ranch" target="_blank" rel="noopener noreferrer" className="btn-gold">View All Iron Mountain Ranch Listings &rarr;</a>
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
                  <p>Iron Mountain Ranch is a well-established family-friendly community in northwest Las Vegas that has quietly become one of the best values in the valley. Located near the intersection of Iron Mountain Road and Farm Road, the community encompasses approximately 2,800+ homes spread across ~500 acres of the northwest valley's gently sloping terrain. The elevated position provides many homes with views of the Spring Mountains, Sheep Range, and the Las Vegas Valley.</p>
                  <p>Homes in Iron Mountain Ranch range from approximately $350,000 to $600,000, with floor plans spanning 1,500 to 3,200 square feet. The majority of homes were built between 2004 and 2012 by builders including Richmond American, KB Home, and Beazer Homes. Architecture follows the desert contemporary and Mediterranean styles common to Las Vegas neighborhoods of that era, with stucco exteriors, tile roofs, and functional floor plans designed for family living.</p>
                  <p>The community is centered around Iron Mountain Ranch Park, which provides sports fields, playgrounds, walking paths, and picnic areas. Several smaller pocket parks are distributed throughout the neighborhoods, creating green spaces within walking distance of most homes. The community's HOA maintains common areas, landscaping, and community standards that keep Iron Mountain Ranch looking well-cared-for.</p>
                  <p>Iron Mountain Ranch's northwest location provides convenient access to the growing Centennial Hills commercial corridor, the US-95 freeway, and the northwest valley's expanding retail and dining options. Skye Canyon and Providence are nearby newer communities, but Iron Mountain Ranch offers the advantage of mature landscaping, established schools, and proven long-term value at more accessible price points.</p>
                </>
              )}
            </div>
            <div className="overview-aside">
              <div className="quick-facts">
                <h3>Iron Mountain Ranch At a Glance</h3>
                {displayStats.map(([label, value, cls]: any) => (
                  <div className="fact-row" key={label}>
                    <span className="fact-label">{label}</span>
                    <span className={`fact-value${cls ? ' ' + cls : ''}`}>{value}</span>
                  </div>
                ))}
              </div>
              <div className="cta-card">
                <p>Ready to explore Iron Mountain Ranch? Schedule a private tour of the community and the current listings that match your goals.</p>
                <a href="tel:+17252399950" className="btn-gold">Call 725.239.9950</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="highlights">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Why Iron Mountain Ranch</span>
            <h2>What Makes Iron Mountain Ranch Stand Out</h2>
          </div>
          <div className="highlights-grid">
            {[
              { title: 'Exceptional Value', body: 'Family homes from the $350s in a well-maintained community. One of the strongest values for single-family homes in northwest Las Vegas.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg> },
              { title: 'Mountain Views', body: 'Elevated northwest valley position with views of the Spring Mountains, Sheep Range, and the broader Las Vegas Valley from many homesites.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M8 21l4-11 4 11"/><path d="M2 21l5-14 4 8"/><path d="M14 15l4-8 4 14"/><line x1="2" y1="21" x2="22" y2="21"/></svg> },
              { title: 'Community Parks', body: 'Iron Mountain Ranch Park anchors the community with sports fields, playgrounds, and walking paths. Several pocket parks provide green space throughout the neighborhoods.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22c4-4 8-7.5 8-12a8 8 0 10-16 0c0 4.5 4 8 8 12z"/><circle cx="12" cy="10" r="3"/></svg> },
              { title: 'Established Character', body: 'Mature landscaping, grown-in trees, and a settled neighborhood character. Iron Mountain Ranch has the warmth that newer communities are still building.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
              { title: 'Northwest Growth Corridor', body: 'Near the growing Centennial Hills commercial corridor with new retail, dining, and medical facilities. US-95 provides quick access to the valley.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><line x1="8" y1="6" x2="8" y2="6.01"/><line x1="12" y1="6" x2="12" y2="6.01"/><line x1="16" y1="6" x2="16" y2="6.01"/><line x1="8" y1="10" x2="8" y2="10.01"/><line x1="12" y1="10" x2="12" y2="10.01"/><line x1="16" y1="10" x2="16" y2="10.01"/><line x1="8" y1="14" x2="8" y2="14.01"/><line x1="12" y1="14" x2="12" y2="14.01"/><line x1="16" y1="14" x2="16" y2="14.01"/></svg> },
              { title: 'Family-Friendly Schools', body: 'Served by established CCSD schools with strong community ties. Charter options including Doral Academy provide school choice for families.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
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

      <IronMountainRanchFAQ />

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
              { name: 'Centennial Hills', href: '/centennial-hills/', price: 'From $350K', compare: 'Growing northwest Las Vegas community with expanding commercial corridor.' },
              { name: 'Skye Canyon', href: '/skye-canyon/', price: 'From $400K', compare: 'Newer master-planned community with Skye Center amenities and mountain access.' },
              { name: 'Providence', href: '/providence/', price: 'From $450K', compare: 'Family-friendly master plan with newer construction and community parks.' },
              { name: 'Silverstone Ranch', href: '/silverstone-ranch/', price: 'From $400K', compare: 'Guard-gated golf community in the northwest with 18-hole championship course.' },
              { name: 'Lone Mountain', href: '/lone-mountain/', price: 'From $400K', compare: 'Semi-rural enclave with large lots and mountain views.' },
              { name: 'Aliante', href: '/aliante/', price: 'From $300K', compare: 'North Las Vegas master plan with golf, casino, and nature park.' },
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
              <h2>Ready to Find Your Iron Mountain Ranch Home?</h2>
              <p>Nevada Real Estate Group is the #1 real estate team in Nevada. Whether you&apos;re buying or selling in Iron Mountain Ranch, let&apos;s talk.</p>
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
                <input type="hidden" name="_subject" value="Iron Mountain Ranch Inquiry — LasVegasHomeSearchExperts.com" />
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
