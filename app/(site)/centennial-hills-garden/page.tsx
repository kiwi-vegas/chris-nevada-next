import CentennialHillsGardenFAQ from '@/components/CentennialHillsGardenFAQ'
import Link from 'next/link'
import type { Metadata } from 'next'
import CentennialHillsGardenMapWrapper from '@/components/CentennialHillsGardenMapWrapper'
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
    { '@type': 'ListItem', position: 3, name: 'Garden at Centennial Hills', item: 'https://www.lasvegashomesearchexperts.com/centennial-hills-garden/' },
  ],
}

const FAQ_DATA = [
  {
    "q": "What is the price range for homes in the Garden at Centennial Hills?",
    "a": "Homes range from approximately $400,000 for smaller residences to $650,000 or more for premium homes with upgraded finishes and larger lots."
  },
  {
    "q": "What makes the Garden area different from other Centennial Hills sections?",
    "a": "The Garden area is distinguished by its mature tree-lined streets, community garden spaces, and settled suburban character. It occupies the central, most established section of Centennial Hills with the best infrastructure access."
  },
  {
    "q": "What ZIP codes is the Garden area in?",
    "a": "The Garden at Centennial Hills spans portions of ZIP codes 89131 and 89149 in northwest Las Vegas."
  },
  {
    "q": "What schools serve the Garden at Centennial Hills?",
    "a": "The area is zoned for above-average CCSD schools including Myrtle Tate Elementary (7/10) and Arbor View High School (7/10). Charter options include Doral Academy (9/10) and Coral Academy (8/10)."
  },
  {
    "q": "What are HOA fees in the Garden area?",
    "a": "HOA fees typically range from $50 to $140 per month — lower than most newer master-planned communities while maintaining clean, well-kept common areas."
  },
  {
    "q": "Is the Garden area good for families?",
    "a": "Yes. The combination of mature landscaping, above-average schools, proximity to Centennial Hills Park, and established community character makes it one of the most popular family areas in northwest Las Vegas."
  },
  {
    "q": "How close is the Garden area to shopping?",
    "a": "The Garden area has excellent commercial access. The Centennial Parkway and Ann Road corridors, both within 5 minutes, offer comprehensive grocery, dining, medical, and retail services."
  },
  {
    "q": "When were homes in the Garden area built?",
    "a": "Most homes were built between 2003 and 2010 by national builders. The established construction era provides mature landscaping and proven neighborhood infrastructure."
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
  name: 'Garden at Centennial Hills',
  description: 'Garden at Centennial Hills is a suburban · established community in Las Vegas, Nevada.',
  geo: { '@type': 'GeoCoordinates', latitude: 36.27, longitude: -115.26 },
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
  const cms = await getCommunityPage('centennial-hills-garden')
  return {
    title: cms?.metaTitle ?? 'Garden at Centennial Hills Homes for Sale | Nevada Real Estate Group',
    description: cms?.metaDescription ?? 'Browse Garden at Centennial Hills homes for sale in Las Vegas, NV. $400K–$650K. Schools, HOA, market stats. Nevada Real Estate Group.',
  }
}

export default async function CentennialHillsGardenPage() {
  const cms = await getCommunityPage('centennial-hills-garden')
  const market = getMarketStats('centennial-hills-garden')
  const ms = market?.stats

  const heroHeadline = cms?.heroHeadline ?? 'Garden at Centennial Hills'
  const heroSubtitle = 'Homes for Sale in Las Vegas, Nevada'
  const overviewTitle = cms?.overviewTitle ?? 'Garden at Centennial Hills: Suburban · Established Living in Las Vegas'

  const HARDCODED_STATS: Array<[string, string] | [string, string, string]> = [
    ['Established', '2003'],
    ['Developer', 'Various Builders'],
    ['Total Acreage', '~300 acres'],
    ['Homes', '~2,500'],
    ['Median Home Price', ms?.medianSalePrice ?? '$400K–$650K'],
    ['ZIP Codes', '89131, 89149'],
    ['Guard-Gated', 'No'],
    ['HOA', '$50–$140/mo'],
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
        "route": "via I-215 West"
    },
    {
        "time": "~5 min",
        "destination": "to Centennial Hills Park",
        "route": "via Buffalo Dr"
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
          <span>Garden at Centennial Hills</span>
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
                <span className="hero-v2-stat-num">{ms?.medianSalePrice ?? qs('Median Home Price', '$400K–$650K')}</span>
                <span className="hero-v2-stat-lbl">Median Sale Price</span>
              </div>
              <div className="hero-v2-stat">
                <span className="hero-v2-stat-num">{ms?.avgDaysToClose ?? qs('Avg Days on Market', '45')}</span>
                <span className="hero-v2-stat-lbl">Avg Days to Close</span>
              </div>
            </div>
            <a href="#listings" className="hero-v2-cta">Search Homes in Garden at Centennial Hills</a>
          </div>
        </div>
      </header>

      <div className="hero-v2-qfb">
        <div className="container">
          <div className="hero-v2-qfb-row">
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <span><strong>ZIP:</strong> 89131, 89149</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              <span><strong>Type:</strong> Suburban · Established</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
              <span><strong>Price Range:</strong> $400K–$650K</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
              <span><strong>HOA:</strong> $50–$140/mo</span>
            </div>
          </div>
          <div className="hero-v2-qfb-est">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            <span>Est. 2003</span>
          </div>
        </div>
      </div>

      <section id="demographics" className="demographics-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Demographics</span>
            <h2>Garden at Centennial Hills Demographics</h2>
          </div>
          <div className="demo-grid">
            {[
              ['~7,500', 'Population'],
              ['37', 'Median Age'],
              ['$85,000', 'Avg Household Income'],
              ['~2,500', 'Total Households'],
              ['68%', 'Homeownership Rate'],
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
            <h2>Where is Garden at Centennial Hills?</h2>
            <p>Centennial Hills, Las Vegas &mdash; Las Vegas, Nevada.</p>
          </div>
          <div className="map-container">
            <CentennialHillsGardenMapWrapper />
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
            <h2 className="listings-title">NEW GARDEN AT CENTENNIAL HILLS LISTINGS</h2>
          </div>
          <div className="ylopo-wrap">
            <div className="YLOPO_searchWidget" />
            <div className="YLOPO_resultsWidget" data-search='{"propertyTypes":["house","condo","townhouse"],"minPrice":350000,"locations":[{"city":"Las Vegas","state":"NV"}],"limit":12,"sortBy":"listDate","sortOrder":"desc","keywords":"Centennial Hills Garden","zipCodes":["89131","89149"]}' />
          </div>
          <p className="ylopo-note">Listing data sourced from regional MLS. Information deemed reliable but not guaranteed. Updated daily.</p>
          <div className="listings-actions">
            <a href="https://search.nevadarealestategroup.net/search?s[orderBy]=sourceCreationDate%2Cdesc&s[page]=1&s[locations][0][city]=Las%20Vegas&s[locations][0][state]=NV&s[keywords]=Centennial%20Hills%20Garden" target="_blank" rel="noopener noreferrer" className="btn-gold">View All Garden at Centennial Hills Listings &rarr;</a>
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
                  <p>The Garden area at Centennial Hills is one of the most desirable family residential sections within the broader Centennial Hills community in northwest Las Vegas. Named for its tree-lined streets, community garden spaces, and an abundance of neighborhood greenery, the Garden area occupies a central position within Centennial Hills between the Buffalo Drive and Durango Drive corridors, offering a settled suburban character with mature landscaping and established HOA standards.</p>
                  <p>Homes in the Garden area range from approximately $400,000 for smaller single-family residences to $650,000 or more for premium homes with upgraded finishes, larger lots, and mountain views. Most homes were built between 2003 and 2010 by national builders including Pardee Homes, Richmond American, and DR Horton, offering 1,600 to 3,200 square foot floor plans. The established construction era means the community benefits from mature trees, settled landscaping, and proven neighborhood infrastructure.</p>
                  <p>The central Centennial Hills location provides excellent access to the area's best amenities. Centennial Hills Park — a 120-acre regional park with sports fields, playgrounds, and walking trails — is within minutes. The Centennial Hills Library, YMCA, and commercial corridors along Centennial Parkway and Ann Road provide comprehensive services. Multiple CCSD schools in the area rate above the district average, making this section particularly popular with families.</p>
                  <p>The Garden area represents the sweet spot in Centennial Hills: more established than the newer northern sections, more affordable than Lone Mountain custom homes to the west, and benefiting from the most complete commercial infrastructure in the northwest corridor. For families who value mature neighborhoods with proven school access and easy suburban convenience, the Garden area at Centennial Hills is one of the strongest options in northwest Las Vegas.</p>
                </>
              )}
            </div>
            <div className="overview-aside">
              <div className="quick-facts">
                <h3>Garden at Centennial Hills At a Glance</h3>
                {displayStats.map(([label, value, cls]: any) => (
                  <div className="fact-row" key={label}>
                    <span className="fact-label">{label}</span>
                    <span className={`fact-value${cls ? ' ' + cls : ''}`}>{value}</span>
                  </div>
                ))}
              </div>
              <div className="cta-card">
                <p>Ready to explore Garden at Centennial Hills? Schedule a private tour of the community and the current listings that match your goals.</p>
                <a href="tel:+17252399950" className="btn-gold">Call 725.239.9950</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="highlights">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Why Garden at Centennial Hills</span>
            <h2>What Makes Garden at Centennial Hills Stand Out</h2>
          </div>
          <div className="highlights-grid">
            {[
              { title: 'Mature Tree-Lined Streets', body: '20+ years of growth have produced tree-lined streets and established landscaping that give the Garden area a settled, green character uncommon in desert communities.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22c4-4 8-7.5 8-12a8 8 0 10-16 0c0 4.5 4 8 8 12z"/><circle cx="12" cy="10" r="3"/></svg> },
              { title: 'Centennial Hills Park', body: 'Minutes from the 120-acre Centennial Hills Park with sports fields, playgrounds, skate park, and walking trails. One of the best regional parks in northwest Las Vegas.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M8 21l4-11 4 11"/><path d="M2 21l5-14 4 8"/><path d="M14 15l4-8 4 14"/><line x1="2" y1="21" x2="22" y2="21"/></svg> },
              { title: 'Above-Average Schools', body: 'Zoned for CCSD schools that rate above the district average. Multiple charter and private options complement public campuses for comprehensive education access.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M4 19.5A2.5 2.5 0 006.5 22H20V2H6.5A2.5 2.5 0 004 4.5v15z"/></svg> },
              { title: 'Complete Commercial Infrastructure', body: 'The most established retail, dining, medical, and service corridors in northwest Las Vegas line Centennial Parkway and Ann Road, all within minutes.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><line x1="8" y1="6" x2="8" y2="6.01"/><line x1="12" y1="6" x2="12" y2="6.01"/><line x1="16" y1="6" x2="16" y2="6.01"/><line x1="8" y1="10" x2="8" y2="10.01"/><line x1="12" y1="10" x2="12" y2="10.01"/><line x1="16" y1="10" x2="16" y2="10.01"/><line x1="8" y1="14" x2="8" y2="14.01"/><line x1="12" y1="14" x2="12" y2="14.01"/><line x1="16" y1="14" x2="16" y2="14.01"/></svg> },
              { title: 'Established HOA Standards', body: 'Proven HOAs with a track record of maintaining neighborhood standards, common areas, and community amenities. Modest monthly fees relative to newer master plans.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
              { title: 'Central Centennial Hills Position', body: 'The sweet spot of Centennial Hills: more established than the newer north, more affordable than Lone Mountain, with the best overall access to infrastructure.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
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

      <CentennialHillsGardenFAQ />

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
              { name: 'Centennial Hills', href: '/centennial-hills/', price: 'From $400K', compare: 'The broader Centennial Hills area including newer northern sections and established southern neighborhoods.' },
              { name: 'Centennial Hills North', href: '/centennial-hills-north/', price: 'From $400K', compare: 'Newer construction section of Centennial Hills with active builders and modern floor plans.' },
              { name: 'Providence', href: '/providence/', price: 'From $450K', compare: 'Family-oriented master plan nearby with community center and programmed amenities.' },
              { name: 'Lone Mountain', href: '/lone-mountain/', price: 'From $500K', compare: 'Semi-rural custom homes west of Centennial Hills with larger lots and mountain views.' },
              { name: 'Skye Canyon', href: '/skye-canyon/', price: 'From $450K', compare: 'Newer master plan northwest with Skye Center amenities and trail lifestyle.' },
              { name: 'Summerlin West', href: '/summerlin-west/', price: 'From $400K', compare: 'Summerlin\'s newest section with Red Rock views and the Summerlin brand.' },
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
              <h2>Ready to Find Your Garden at Centennial Hills Home?</h2>
              <p>Nevada Real Estate Group is the #1 real estate team in Nevada. Whether you&apos;re buying or selling in Garden at Centennial Hills, let&apos;s talk.</p>
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
                <input type="hidden" name="_subject" value="Garden at Centennial Hills Inquiry — LasVegasHomeSearchExperts.com" />
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
