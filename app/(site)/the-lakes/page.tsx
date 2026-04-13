import TheLakesFAQ from '@/components/TheLakesFAQ'
import Link from 'next/link'
import type { Metadata } from 'next'
import TheLakesMapWrapper from '@/components/TheLakesMapWrapper'
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
    { '@type': 'ListItem', position: 3, name: 'The Lakes', item: 'https://www.lasvegashomesearchexperts.com/the-lakes/' },
  ],
}

const FAQ_DATA = [
  {
    "q": "What is the price range for homes in The Lakes?",
    "a": "Homes in The Lakes range from approximately $400,000 for townhomes and interior-lot single-family homes to $1.2 million or more for premium lakefront properties. Canyon Gate Country Club homes within the area can exceed this range."
  },
  {
    "q": "Does The Lakes have a real lake?",
    "a": "Yes. The Lakes features an approximately 30-acre man-made lake that serves as the community centerpiece. Residents enjoy waterfront walking trails, fishing, and scenic lake views — a rare amenity in the Las Vegas desert."
  },
  {
    "q": "What ZIP codes are in The Lakes?",
    "a": "The Lakes is located in ZIP codes 89117 and 89128 in central-west Las Vegas."
  },
  {
    "q": "What is Canyon Gate Country Club?",
    "a": "Canyon Gate is a guard-gated golf community within The Lakes area. It features a Ted Robinson-designed golf course, resort-style amenities, and luxury homes. It adds a premium tier to The Lakes' housing inventory."
  },
  {
    "q": "What are HOA fees in The Lakes?",
    "a": "HOA fees in The Lakes typically range from $75 to $250 per month, depending on the specific section. Canyon Gate Country Club homes have higher fees that include guard gate staffing and golf amenities."
  },
  {
    "q": "How far is The Lakes from the Strip?",
    "a": "The Lakes is approximately 15 minutes from the Las Vegas Strip via Flamingo Road or Sahara Avenue. Downtown Summerlin is just 10 minutes away."
  },
  {
    "q": "What schools serve The Lakes?",
    "a": "The Lakes is served by CCSD schools including Helen Jydstrup Elementary (7/10) and Palo Verde High School (7/10). Private options include The Meadows School (A+) and Bishop Gorman (A+). Doral Academy Red Rock (9/10) is a top charter."
  },
  {
    "q": "When was The Lakes built?",
    "a": "The Lakes was developed beginning in the late 1980s by the Collins Brothers. Most homes were built from the late 1980s through the early 2000s, giving the community mature landscaping and established neighborhood character."
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
  name: 'The Lakes',
  description: 'The Lakes is a waterfront · master-planned community in Las Vegas, Nevada.',
  geo: { '@type': 'GeoCoordinates', latitude: 36.16, longitude: -115.267 },
  address: { '@type': 'PostalAddress', addressLocality: 'Las Vegas', addressRegion: 'NV', postalCode: '89117', addressCountry: 'US' },
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
  const cms = await getCommunityPage('the-lakes')
  return {
    title: cms?.metaTitle ?? 'The Lakes Homes for Sale | Nevada Real Estate Group',
    description: cms?.metaDescription ?? 'Browse The Lakes homes for sale in Las Vegas, NV. $400K–$1.2M. Schools, HOA, market stats. Nevada Real Estate Group.',
  }
}

export default async function TheLakesPage() {
  const cms = await getCommunityPage('the-lakes')
  const market = getMarketStats('the-lakes')
  const ms = market?.stats

  const heroHeadline = cms?.heroHeadline ?? 'The Lakes'
  const heroSubtitle = 'Homes for Sale in Las Vegas, Nevada'
  const overviewTitle = cms?.overviewTitle ?? 'The Lakes: Waterfront · Master-Planned Living in Las Vegas'

  const HARDCODED_STATS: Array<[string, string] | [string, string, string]> = [
    ['Established', '1989'],
    ['Developer', 'The Collins Brothers'],
    ['Total Acreage', '~1,000 acres'],
    ['Homes', '3,500+'],
    ['Median Home Price', ms?.medianSalePrice ?? '$400K–$1.2M'],
    ['ZIP Codes', '89117, 89128'],
    ['Guard-Gated', 'No'],
    ['HOA', '$75–$250/mo'],
  ]
  const displayStats = mergeQuickStats(HARDCODED_STATS, cms?.quickStats)
  const HARDCODED_DRIVE_TIMES = [
    {
        "time": "~10 min",
        "destination": "to Downtown Summerlin",
        "route": "via W Sahara Ave"
    },
    {
        "time": "~15 min",
        "destination": "to the Strip",
        "route": "via Flamingo Rd / W Sahara Ave"
    },
    {
        "time": "~15 min",
        "destination": "to Red Rock Canyon",
        "route": "via W Charleston Blvd"
    },
    {
        "time": "~25 min",
        "destination": "to Harry Reid Airport",
        "route": "via I-215 South → I-15"
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
          <span>The Lakes</span>
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
                <span className="hero-v2-stat-num">{ms?.medianSalePrice ?? qs('Median Home Price', '$400K–$1.2M')}</span>
                <span className="hero-v2-stat-lbl">Median Sale Price</span>
              </div>
              <div className="hero-v2-stat">
                <span className="hero-v2-stat-num">{ms?.avgDaysToClose ?? qs('Avg Days on Market', '45')}</span>
                <span className="hero-v2-stat-lbl">Avg Days to Close</span>
              </div>
            </div>
            <a href="#listings" className="hero-v2-cta">Search Homes in The Lakes</a>
          </div>
        </div>
      </header>

      <div className="hero-v2-qfb">
        <div className="container">
          <div className="hero-v2-qfb-row">
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <span><strong>ZIP:</strong> 89117, 89128</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              <span><strong>Type:</strong> Waterfront · Master-Planned</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
              <span><strong>Price Range:</strong> $400K–$1.2M</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
              <span><strong>HOA:</strong> $75–$250/mo</span>
            </div>
          </div>
          <div className="hero-v2-qfb-est">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            <span>Est. 1989</span>
          </div>
        </div>
      </div>

      <section id="demographics" className="demographics-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Demographics</span>
            <h2>The Lakes Demographics</h2>
          </div>
          <div className="demo-grid">
            {[
              ['12,000+', 'Population'],
              ['42', 'Median Age'],
              ['$80,000', 'Avg Household Income'],
              ['3,500+', 'Total Households'],
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
            <h2>Where is The Lakes?</h2>
            <p>Las Vegas, Nevada &mdash; Las Vegas, Nevada.</p>
          </div>
          <div className="map-container">
            <TheLakesMapWrapper />
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
            <h2 className="listings-title">NEW THE LAKES LISTINGS</h2>
          </div>
          <div className="ylopo-wrap">
            <div className="YLOPO_searchWidget" />
            <div className="YLOPO_resultsWidget" data-search='{"propertyTypes":["house","condo","townhouse"],"minPrice":350000,"locations":[{"city":"Las Vegas","state":"NV"}],"limit":12,"sortBy":"listDate","sortOrder":"desc","keywords":"The Lakes","zipCodes":["89117","89128"]}' />
          </div>
          <p className="ylopo-note">Listing data sourced from regional MLS. Information deemed reliable but not guaranteed. Updated daily.</p>
          <div className="listings-actions">
            <a href="https://search.nevadarealestategroup.net/search?s[orderBy]=sourceCreationDate%2Cdesc&s[page]=1&s[locations][0][city]=Las%20Vegas&s[locations][0][state]=NV&s[keywords]=The%20Lakes" target="_blank" rel="noopener noreferrer" className="btn-gold">View All The Lakes Listings &rarr;</a>
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
                  <p>The Lakes is a master-planned waterfront community in central-west Las Vegas, built around a large man-made lake that serves as the community's centerpiece and a rare amenity in the desert. Developed by the Collins Brothers beginning in the late 1980s, The Lakes spans approximately 1,000 acres and features over 3,500 homes ranging from townhomes to lakefront estates. The community's central location near the intersection of Sahara Avenue and Durango Drive makes it one of the most conveniently positioned waterfront communities in the valley.</p>
                  <p>The defining feature of The Lakes is its approximately 30-acre man-made lake, surrounded by walking paths, parks, and waterfront homes. Residents enjoy waterfront jogging and walking trails, fishing, and scenic views that feel more like a lakeside resort than a typical Las Vegas neighborhood. Several community parks with playgrounds, sports courts, and picnic areas dot the master plan, and the mature landscaping throughout gives The Lakes a lush, established character.</p>
                  <p>Homes in The Lakes range from approximately $400,000 for well-maintained townhomes and interior-lot single-family homes to $1.2 million or more for premium lakefront properties with water views and private access. The housing stock includes a mix of single-family homes, townhomes, and custom homes, most built from the late 1980s through the early 2000s. Several guard-gated sections within or adjacent to The Lakes — including Canyon Gate Country Club — add luxury inventory to the area.</p>
                  <p>The Lakes' central location is a major advantage. Downtown Summerlin is 10 minutes away, the Strip is 15 minutes via Flamingo Road, and Sahara Avenue provides direct access to both the west side and downtown Las Vegas. The area is well-served by commercial corridors on Sahara, Flamingo, and Durango, with grocery, dining, medical, and retail within minutes. For buyers seeking waterfront living, established neighborhood character, and a central valley location, The Lakes is hard to beat.</p>
                </>
              )}
            </div>
            <div className="overview-aside">
              <div className="quick-facts">
                <h3>The Lakes At a Glance</h3>
                {displayStats.map(([label, value, cls]: any) => (
                  <div className="fact-row" key={label}>
                    <span className="fact-label">{label}</span>
                    <span className={`fact-value${cls ? ' ' + cls : ''}`}>{value}</span>
                  </div>
                ))}
              </div>
              <div className="cta-card">
                <p>Ready to explore The Lakes? Schedule a private tour of the community and the current listings that match your goals.</p>
                <a href="tel:+17252399950" className="btn-gold">Call 725.239.9950</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="highlights">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Why The Lakes</span>
            <h2>What Makes The Lakes Stand Out</h2>
          </div>
          <div className="highlights-grid">
            {[
              { title: '30-Acre Man-Made Lake', body: 'The community\'s centerpiece lake provides waterfront living, walking trails, fishing, and scenic views. One of the largest private lakes in the Las Vegas Valley.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22c4-4 8-7.5 8-12a8 8 0 10-16 0c0 4.5 4 8 8 12z"/><circle cx="12" cy="10" r="3"/></svg> },
              { title: 'Central Valley Location', body: 'Near the intersection of Sahara and Durango, The Lakes is 10 minutes to Downtown Summerlin, 15 minutes to the Strip, and centrally located for valley-wide commutes.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><line x1="8" y1="6" x2="8" y2="6.01"/><line x1="12" y1="6" x2="12" y2="6.01"/><line x1="16" y1="6" x2="16" y2="6.01"/><line x1="8" y1="10" x2="8" y2="10.01"/><line x1="12" y1="10" x2="12" y2="10.01"/><line x1="16" y1="10" x2="16" y2="10.01"/><line x1="8" y1="14" x2="8" y2="14.01"/><line x1="12" y1="14" x2="12" y2="14.01"/><line x1="16" y1="14" x2="16" y2="14.01"/></svg> },
              { title: 'Mature Landscaping', body: 'Developed from the late 1980s, The Lakes features mature trees, lush landscaping, and an established neighborhood character that newer communities can\'t replicate.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
              { title: 'Guard-Gated Options', body: 'Canyon Gate Country Club and other gated sections within The Lakes add luxury inventory with golf course living and enhanced security.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
              { title: 'Waterfront Trail System', body: 'Miles of lakeside walking and jogging paths connect neighborhoods, parks, and community amenities. Perfect for active residents and families.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M8 21l4-11 4 11"/><path d="M2 21l5-14 4 8"/><path d="M14 15l4-8 4 14"/><line x1="2" y1="21" x2="22" y2="21"/></svg> },
              { title: 'Established Value', body: 'The Lakes has demonstrated consistent long-term appreciation. Waterfront properties in the valley are inherently limited, supporting premium pricing and strong resale.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg> },
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

      <TheLakesFAQ />

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
              { name: 'Desert Shores', href: '/desert-shores/', price: 'From $350K', compare: 'Adjacent lakefront community with four man-made lakes and resort-style amenities.' },
              { name: 'Spring Valley', href: '/spring-valley/', price: 'From $300K', compare: 'Large established community to the south with diverse housing and central location.' },
              { name: 'Summerlin', href: '/summerlin/', price: 'From $450K', compare: 'Premier master-planned community to the west. 20+ villages with guard-gated enclaves.' },
              { name: 'Centennial Hills', href: '/centennial-hills/', price: 'From $350K', compare: 'Growing northwest community with newer construction and family neighborhoods.' },
              { name: 'Downtown Las Vegas', href: '/downtown-las-vegas/', price: 'From $200K', compare: 'The urban core 15 minutes east with Arts District, high-rises, and walkable entertainment.' },
              { name: 'Lone Mountain', href: '/lone-mountain/', price: 'From $400K', compare: 'Semi-rural enclave to the north with large lots, equestrian properties, and mountain views.' },
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
              <h2>Ready to Find Your The Lakes Home?</h2>
              <p>Nevada Real Estate Group is the #1 real estate team in Nevada. Whether you&apos;re buying or selling in The Lakes, let&apos;s talk.</p>
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
                <input type="hidden" name="_subject" value="The Lakes Inquiry — LasVegasHomeSearchExperts.com" />
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
