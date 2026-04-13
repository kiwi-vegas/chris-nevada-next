import SpringMountainRanchFAQ from '@/components/SpringMountainRanchFAQ'
import Link from 'next/link'
import type { Metadata } from 'next'
import SpringMountainRanchMapWrapper from '@/components/SpringMountainRanchMapWrapper'
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
    { '@type': 'ListItem', position: 3, name: 'Spring Mountain Ranch', item: 'https://www.lasvegashomesearchexperts.com/spring-mountain-ranch/' },
  ],
}

const FAQ_DATA = [
  {
    "q": "What is the price range for homes in Spring Mountain Ranch?",
    "a": "Homes in Spring Mountain Ranch range from approximately $500,000 for entry-level homes to $1.2 million for premium executive estates on mountain-view lots."
  },
  {
    "q": "Is Spring Mountain Ranch guard-gated?",
    "a": "No — Spring Mountain Ranch is not guard-gated. It is a well-maintained suburban community with HOA governance."
  },
  {
    "q": "What ZIP codes are in Spring Mountain Ranch?",
    "a": "Spring Mountain Ranch is located in ZIP codes 89148 and 89113 in southwest Las Vegas."
  },
  {
    "q": "Is Spring Mountain Ranch near hiking?",
    "a": "Yes — Spring Mountain Ranch State Park is a short drive away with hiking trails and scenic desert landscapes. Red Rock Canyon is approximately 10 minutes west via Blue Diamond Road."
  },
  {
    "q": "What are HOA fees in Spring Mountain Ranch?",
    "a": "HOA fees typically range from $75 to $200 per month, covering common area maintenance and community landscaping."
  },
  {
    "q": "What schools serve Spring Mountain Ranch?",
    "a": "The community is served by CCSD schools and quality charter options including Doral Academy (9/10). Bishop Gorman High School (A+) is a nearby private option."
  },
  {
    "q": "How does Spring Mountain Ranch compare to Southern Highlands?",
    "a": "Spring Mountain Ranch offers quality homes with mountain views at price points below Southern Highlands. The trade-off is that Spring Mountain Ranch doesn't have guard-gated enclaves or a private golf club."
  },
  {
    "q": "Who built homes in Spring Mountain Ranch?",
    "a": "Various respected builders contributed to Spring Mountain Ranch over the 2003–2015 build period. The diversity of builders means a wide range of floor plans and architectural styles."
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
  name: 'Spring Mountain Ranch',
  description: 'Spring Mountain Ranch is a suburban · family community in Las Vegas, Nevada.',
  geo: { '@type': 'GeoCoordinates', latitude: 36.055, longitude: -115.28 },
  address: { '@type': 'PostalAddress', addressLocality: 'Las Vegas', addressRegion: 'NV', postalCode: '89148', addressCountry: 'US' },
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
  const cms = await getCommunityPage('spring-mountain-ranch')
  return {
    title: cms?.metaTitle ?? 'Spring Mountain Ranch Homes for Sale | Nevada Real Estate Group',
    description: cms?.metaDescription ?? 'Browse Spring Mountain Ranch homes for sale in Las Vegas, NV. $500K–$1.2M. Schools, HOA, market stats. Nevada Real Estate Group.',
  }
}

export default async function SpringMountainRanchPage() {
  const cms = await getCommunityPage('spring-mountain-ranch')
  const market = getMarketStats('spring-mountain-ranch')
  const ms = market?.stats

  const heroHeadline = cms?.heroHeadline ?? 'Spring Mountain Ranch'
  const heroSubtitle = 'Homes for Sale in Las Vegas, Nevada'
  const overviewTitle = cms?.overviewTitle ?? 'Spring Mountain Ranch: Suburban · Family Living in Las Vegas'

  const HARDCODED_STATS: Array<[string, string] | [string, string, string]> = [
    ['Established', '2003'],
    ['Developer', 'Various Builders'],
    ['Total Acreage', '~600 acres'],
    ['Homes', '2,000+'],
    ['Median Home Price', ms?.medianSalePrice ?? '$500K–$1.2M'],
    ['ZIP Codes', '89148, 89113'],
    ['Guard-Gated', 'No'],
    ['HOA', '$75–$200/mo'],
  ]
  const displayStats = mergeQuickStats(HARDCODED_STATS, cms?.quickStats)
  const HARDCODED_DRIVE_TIMES = [
    {
        "time": "~20 min",
        "destination": "to the Strip",
        "route": "via I-15 North"
    },
    {
        "time": "~25 min",
        "destination": "to Harry Reid Airport",
        "route": "via I-215 → I-15"
    },
    {
        "time": "~10 min",
        "destination": "to Red Rock Canyon",
        "route": "via Blue Diamond Rd"
    },
    {
        "time": "~15 min",
        "destination": "to Southern Highlands",
        "route": "via S Las Vegas Blvd"
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
          <span>Spring Mountain Ranch</span>
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
                <span className="hero-v2-stat-num">{ms?.medianSalePrice ?? qs('Median Home Price', '$500K–$1.2M')}</span>
                <span className="hero-v2-stat-lbl">Median Sale Price</span>
              </div>
              <div className="hero-v2-stat">
                <span className="hero-v2-stat-num">{ms?.avgDaysToClose ?? qs('Avg Days on Market', '45')}</span>
                <span className="hero-v2-stat-lbl">Avg Days to Close</span>
              </div>
            </div>
            <a href="#listings" className="hero-v2-cta">Search Homes in Spring Mountain Ranch</a>
          </div>
        </div>
      </header>

      <div className="hero-v2-qfb">
        <div className="container">
          <div className="hero-v2-qfb-row">
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <span><strong>ZIP:</strong> 89148, 89113</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              <span><strong>Type:</strong> Suburban · Family</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
              <span><strong>Price Range:</strong> $500K–$1.2M</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
              <span><strong>HOA:</strong> $75–$200/mo</span>
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
            <h2>Spring Mountain Ranch Demographics</h2>
          </div>
          <div className="demo-grid">
            {[
              ['~6,000', 'Population'],
              ['40', 'Median Age'],
              ['$95,000', 'Avg Household Income'],
              ['2,000+', 'Total Households'],
              ['80%', 'Homeownership Rate'],
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
            <h2>Where is Spring Mountain Ranch?</h2>
            <p>Southwest Las Vegas, Nevada &mdash; Las Vegas, Nevada.</p>
          </div>
          <div className="map-container">
            <SpringMountainRanchMapWrapper />
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
            <h2 className="listings-title">NEW SPRING MOUNTAIN RANCH LISTINGS</h2>
          </div>
          <div className="ylopo-wrap">
            <div className="YLOPO_searchWidget" />
            <div className="YLOPO_resultsWidget" data-search='{"propertyTypes":["house","condo","townhouse"],"minPrice":450000,"locations":[{"city":"Las Vegas","state":"NV"}],"limit":12,"sortBy":"listDate","sortOrder":"desc","keywords":"Spring Mountain Ranch","zipCodes":["89148","89113"]}' />
          </div>
          <p className="ylopo-note">Listing data sourced from regional MLS. Information deemed reliable but not guaranteed. Updated daily.</p>
          <div className="listings-actions">
            <a href="https://search.nevadarealestategroup.net/search?s[orderBy]=sourceCreationDate%2Cdesc&s[page]=1&s[locations][0][city]=Las%20Vegas&s[locations][0][state]=NV&s[keywords]=Spring%20Mountain%20Ranch" target="_blank" rel="noopener noreferrer" className="btn-gold">View All Spring Mountain Ranch Listings &rarr;</a>
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
                  <p>Spring Mountain Ranch is a well-established residential community in southwest Las Vegas that offers a compelling blend of quality construction, mountain views, and accessibility at price points between the more affordable Mountains Edge and the premium Southern Highlands. Named for the nearby Spring Mountain Ranch State Park, the community captures the spirit of desert living with homes that range from upscale family residences to executive-caliber estates.</p>
                  <p>Homes in Spring Mountain Ranch range from approximately $500,000 to $1.2 million, with most properties built between 2003 and 2015 by a variety of respected builders. Floor plans typically range from 2,200 to 4,500 square feet, with architecture spanning Mediterranean, Tuscan, and transitional desert styles. Many homes feature upgraded finishes including granite or quartz countertops, travertine or hardwood flooring, and resort-style backyards with pools, spas, and outdoor kitchens.</p>
                  <p>The community's southwest valley location provides excellent mountain views toward the Spring Mountains and Red Rock Canyon to the west and northwest. The elevated terrain on the community's western side offers premium view lots that command a significant premium. Spring Mountain Ranch State Park is a short drive away, offering hiking, picnicking, and scenic desert landscapes within a state-managed preserve.</p>
                  <p>Spring Mountain Ranch sits near the intersection of several major corridors including Durango Drive and Blue Diamond Road, providing quick access to retail, dining, and medical services. The I-215 beltway and I-15 are both within a 10-minute drive, making commutes to the Strip, airport, and other valley destinations convenient. For buyers seeking quality homes with mountain views in the southwest valley at a price point below the guard-gated communities, Spring Mountain Ranch is an outstanding option.</p>
                </>
              )}
            </div>
            <div className="overview-aside">
              <div className="quick-facts">
                <h3>Spring Mountain Ranch At a Glance</h3>
                {displayStats.map(([label, value, cls]: any) => (
                  <div className="fact-row" key={label}>
                    <span className="fact-label">{label}</span>
                    <span className={`fact-value${cls ? ' ' + cls : ''}`}>{value}</span>
                  </div>
                ))}
              </div>
              <div className="cta-card">
                <p>Ready to explore Spring Mountain Ranch? Schedule a private tour of the community and the current listings that match your goals.</p>
                <a href="tel:+17252399950" className="btn-gold">Call 725.239.9950</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="highlights">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Why Spring Mountain Ranch</span>
            <h2>What Makes Spring Mountain Ranch Stand Out</h2>
          </div>
          <div className="highlights-grid">
            {[
              { title: 'Mountain Views', body: 'Southwest valley position with sweeping views of the Spring Mountains and Red Rock Canyon from many homes. Premium view lots on the western edge command a significant premium.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M8 21l4-11 4 11"/><path d="M2 21l5-14 4 8"/><path d="M14 15l4-8 4 14"/><line x1="2" y1="21" x2="22" y2="21"/></svg> },
              { title: 'Quality Construction', body: 'Built by respected national and regional builders with homes from 2,200 to 4,500 square feet. Mediterranean, Tuscan, and transitional architecture with quality finishes throughout.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
              { title: 'State Park Access', body: 'Minutes from Spring Mountain Ranch State Park with hiking trails, historic ranch buildings, and scenic desert landscapes. Outdoor recreation without leaving the neighborhood.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22c4-4 8-7.5 8-12a8 8 0 10-16 0c0 4.5 4 8 8 12z"/><circle cx="12" cy="10" r="3"/></svg> },
              { title: 'Corridor Convenience', body: 'Near the Durango and Blue Diamond commercial corridors with major retail, restaurants, and medical facilities. I-215 and I-15 within 10 minutes.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><line x1="8" y1="6" x2="8" y2="6.01"/><line x1="12" y1="6" x2="12" y2="6.01"/><line x1="16" y1="6" x2="16" y2="6.01"/><line x1="8" y1="10" x2="8" y2="10.01"/><line x1="12" y1="10" x2="12" y2="10.01"/><line x1="16" y1="10" x2="16" y2="10.01"/><line x1="8" y1="14" x2="8" y2="14.01"/><line x1="12" y1="14" x2="12" y2="14.01"/><line x1="16" y1="14" x2="16" y2="14.01"/></svg> },
              { title: 'Mid-Tier Value', body: 'Positioned between Mountains Edge pricing and Southern Highlands premiums. Quality homes with views at price points that represent strong value for the southwest valley.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg> },
              { title: 'Family-Friendly', body: 'Well-maintained neighborhood with quality schools, parks, and a suburban character that attracts families seeking space, quality, and a strong community feel.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
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

      <SpringMountainRanchFAQ />

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
              { name: 'Mountains Edge', href: '/mountains-edge/', price: 'From $350K', compare: 'Adjacent master-planned community with more accessible pricing and extensive trail networks.' },
              { name: 'Southern Highlands', href: '/southern-highlands/', price: 'From $400K', compare: 'Guard-gated golf community with Nicklaus course and luxury enclaves to the south.' },
              { name: 'Rhodes Ranch', href: '/rhodes-ranch/', price: 'From $350K', compare: 'Guard-gated golf community with Ted Robinson course and resort amenities.' },
              { name: 'Enterprise', href: '/enterprise/', price: 'From $350K', compare: 'Growing unincorporated area with diverse housing and new commercial development.' },
              { name: 'Spring Valley', href: '/spring-valley/', price: 'From $300K', compare: 'Established suburban community to the north with strong retail corridors.' },
              { name: 'Summerlin', href: '/summerlin/', price: 'From $450K', compare: 'Premier west-side master plan with 20+ villages and Downtown Summerlin.' },
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
              <h2>Ready to Find Your Spring Mountain Ranch Home?</h2>
              <p>Nevada Real Estate Group is the #1 real estate team in Nevada. Whether you&apos;re buying or selling in Spring Mountain Ranch, let&apos;s talk.</p>
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
                <input type="hidden" name="_subject" value="Spring Mountain Ranch Inquiry — LasVegasHomeSearchExperts.com" />
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
