import SummerlinTheHillsSouthFAQ from '@/components/SummerlinTheHillsSouthFAQ'
import Link from 'next/link'
import type { Metadata } from 'next'
import SummerlinTheHillsSouthMapWrapper from '@/components/SummerlinTheHillsSouthMapWrapper'
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
    { '@type': 'ListItem', position: 3, name: 'The Hills South', item: 'https://www.lasvegashomesearchexperts.com/summerlin-the-hills-south/' },
  ],
}

const FAQ_DATA = [
  {
    "q": "What guard-gated communities are in The Hills South?",
    "a": "The Hills South contains four separate guard-gated enclaves: Country Club Hills, Eagle Hills, Corte Bella, and Tournament Hills. Each has its own 24-hour staffed guard gate and distinct architectural character."
  },
  {
    "q": "What is the price range in The Hills South?",
    "a": "Homes in The Hills South range from approximately $600,000 in non-gated neighborhoods and Corte Bella to over $3 million in Country Club Hills and Tournament Hills for premium golf course and estate properties."
  },
  {
    "q": "Is Tournament Hills near TPC Summerlin?",
    "a": "Yes — Tournament Hills is guard-gated and sits directly adjacent to TPC Summerlin, the PGA Tour championship course that hosts the annual Shriners Children's Open. Several homes have direct course frontage."
  },
  {
    "q": "What ZIP code is The Hills South in?",
    "a": "The Hills South is located primarily in ZIP code 89135 in the Summerlin South area of Las Vegas."
  },
  {
    "q": "How does The Hills South compare to The Ridges?",
    "a": "The Ridges is Summerlin's most exclusive community with prices from $2M to $20M+. The Hills South offers guard-gated luxury at significantly lower entry points (from $600K) while still providing excellent security, school zoning, and central Summerlin location."
  },
  {
    "q": "What schools serve The Hills South?",
    "a": "The Hills South is zoned for top-performing CCSD schools including Sig Rogich Middle (10/10 GreatSchools) and Palo Verde High School (8/10). Private options include The Meadows School (A+) and Bishop Gorman High School (A+) nearby."
  },
  {
    "q": "What are HOA fees in The Hills South?",
    "a": "HOA fees vary by neighborhood. Non-gated areas typically pay $200–$350/month. Guard-gated enclaves range from $400 to $800/month, which includes the master Summerlin association fee plus sub-association fees for guard gate staffing and enhanced maintenance."
  },
  {
    "q": "Is The Hills South in Summerlin North or South?",
    "a": "The Hills South is part of the Summerlin South Association, located in the central-southern portion of the Summerlin master plan. It is distinct from The Hills (Summerlin North) village."
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
  name: 'The Hills South',
  description: 'The Hills South is a master-planned · guard-gated · luxury community in Las Vegas, Nevada.',
  geo: { '@type': 'GeoCoordinates', latitude: 36.16, longitude: -115.31 },
  address: { '@type': 'PostalAddress', addressLocality: 'Las Vegas', addressRegion: 'NV', postalCode: '89135', addressCountry: 'US' },
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
  const cms = await getCommunityPage('summerlin-the-hills-south')
  return {
    title: cms?.metaTitle ?? 'The Hills South Homes for Sale | Nevada Real Estate Group',
    description: cms?.metaDescription ?? 'Browse The Hills South homes for sale in Las Vegas, NV. $600K–$3M+. Schools, HOA, market stats. Nevada Real Estate Group.',
  }
}

export default async function SummerlinTheHillsSouthPage() {
  const cms = await getCommunityPage('summerlin-the-hills-south')
  const market = getMarketStats('summerlin-the-hills-south')
  const ms = market?.stats

  const heroHeadline = cms?.heroHeadline ?? 'The Hills South'
  const heroSubtitle = 'Homes for Sale in Las Vegas, Nevada'
  const overviewTitle = cms?.overviewTitle ?? 'The Hills South: Master-Planned · Guard-Gated · Luxury Living in Las Vegas'

  const HARDCODED_STATS: Array<[string, string] | [string, string, string]> = [
    ['Established', '1998'],
    ['Developer', 'Howard Hughes Corporation'],
    ['Total Acreage', '850 acres'],
    ['Homes', '2,500+'],
    ['Median Home Price', ms?.medianSalePrice ?? '$600K–$3M+'],
    ['ZIP Codes', '89135'],
    ['Guard-Gated', 'Yes'],
    ['HOA', '$200–$800/mo'],
  ]
  const displayStats = mergeQuickStats(HARDCODED_STATS, cms?.quickStats)
  const HARDCODED_DRIVE_TIMES = [
    {
        "time": "~20 min",
        "destination": "to the Strip",
        "route": "via Summerlin Pkwy → I-15"
    },
    {
        "time": "~12 min",
        "destination": "to Red Rock Canyon",
        "route": "via W Charleston Blvd"
    },
    {
        "time": "~5 min",
        "destination": "to Downtown Summerlin",
        "route": "via Village Center Dr"
    },
    {
        "time": "~30 min",
        "destination": "to Harry Reid Airport",
        "route": "via I-215 South"
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
          <span>The Hills South</span>
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
                <span className="hero-v2-stat-num">{ms?.medianSalePrice ?? qs('Median Home Price', '$600K–$3M+')}</span>
                <span className="hero-v2-stat-lbl">Median Sale Price</span>
              </div>
              <div className="hero-v2-stat">
                <span className="hero-v2-stat-num">{ms?.avgDaysToClose ?? qs('Avg Days on Market', '45')}</span>
                <span className="hero-v2-stat-lbl">Avg Days to Close</span>
              </div>
            </div>
            <a href="#listings" className="hero-v2-cta">Search Homes in The Hills South</a>
          </div>
        </div>
      </header>

      <div className="hero-v2-qfb">
        <div className="container">
          <div className="hero-v2-qfb-row">
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <span><strong>ZIP:</strong> 89135</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              <span><strong>Type:</strong> Master-Planned · Guard-Gated · Luxury</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
              <span><strong>Price Range:</strong> $600K–$3M+</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
              <span><strong>HOA:</strong> $200–$800/mo</span>
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
            <h2>The Hills South Demographics</h2>
          </div>
          <div className="demo-grid">
            {[
              ['7,000+', 'Population'],
              ['45', 'Median Age'],
              ['$175,000+', 'Avg Household Income'],
              ['2,500+', 'Total Households'],
              ['88%', 'Homeownership Rate'],
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
            <h2>Where is The Hills South?</h2>
            <p>Summerlin, Las Vegas &mdash; Las Vegas, Nevada.</p>
          </div>
          <div className="map-container">
            <SummerlinTheHillsSouthMapWrapper />
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
            <h2 className="listings-title">NEW THE HILLS SOUTH LISTINGS</h2>
          </div>
          <div className="ylopo-wrap">
            <div className="YLOPO_searchWidget" />
            <div className="YLOPO_resultsWidget" data-search='{"propertyTypes":["house","condo","townhouse"],"minPrice":600000,"locations":[{"city":"Las Vegas","state":"NV"}],"limit":12,"sortBy":"listDate","sortOrder":"desc","keywords":"The Hills South Summerlin","zipCodes":["89135"]}' />
          </div>
          <p className="ylopo-note">Listing data sourced from regional MLS. Information deemed reliable but not guaranteed. Updated daily.</p>
          <div className="listings-actions">
            <a href="https://search.nevadarealestategroup.net/search?s[orderBy]=sourceCreationDate%2Cdesc&s[page]=1&s[locations][0][city]=Las%20Vegas&s[locations][0][state]=NV&s[keywords]=The%20Hills%20South%20Summerlin" target="_blank" rel="noopener noreferrer" className="btn-gold">View All The Hills South Listings &rarr;</a>
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
                  <p>The Hills South is one of Summerlin's most prestigious villages, distinguished by the concentration of guard-gated enclaves within its borders. Located in the Summerlin South Association, The Hills South encompasses four separate guard-gated communities — Country Club Hills, Eagle Hills, Corte Bella, and Tournament Hills — each with its own character, price range, and security infrastructure. This makes The Hills South one of the most desirable villages in all of Summerlin for buyers who prioritize privacy and exclusivity.</p>
                  <p>Homes in The Hills South range from approximately $600,000 in the non-gated neighborhoods to over $3 million in the guard-gated enclaves, with Country Club Hills and Tournament Hills commanding the highest premiums due to their golf course proximity and larger estate lots. The village benefits from its central Summerlin South location — close to Downtown Summerlin, TPC Summerlin, and the Red Rock Country Club, while remaining a short drive from Red Rock Canyon and the western mountain trails.</p>
                  <p>The architectural character in The Hills South evolved over multiple development phases beginning in the late 1990s. The non-gated neighborhoods feature the classic Summerlin aesthetic — Mediterranean and transitional styles with mature landscaping. The guard-gated enclaves are more varied, with Country Club Hills featuring larger custom and semi-custom estates, and Tournament Hills offering golf course frontage along the TPC Summerlin Championship Course.</p>
                  <p>For buyers evaluating Summerlin villages, The Hills South represents a sweet spot — it offers genuine guard-gated luxury at price points below The Ridges or The Peaks, while providing the mature landscaping, established neighborhood character, and central location that newer villages like Grand Park and Stonebridge cannot yet match. The presence of four separate guard-gated options within one village also gives buyers unusual flexibility in finding the right fit.</p>
                </>
              )}
            </div>
            <div className="overview-aside">
              <div className="quick-facts">
                <h3>The Hills South At a Glance</h3>
                {displayStats.map(([label, value, cls]: any) => (
                  <div className="fact-row" key={label}>
                    <span className="fact-label">{label}</span>
                    <span className={`fact-value${cls ? ' ' + cls : ''}`}>{value}</span>
                  </div>
                ))}
              </div>
              <div className="cta-card">
                <p>Ready to explore The Hills South? Schedule a private tour of the community and the current listings that match your goals.</p>
                <a href="tel:+17252399950" className="btn-gold">Call 725.239.9950</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="highlights">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Why The Hills South</span>
            <h2>What Makes The Hills South Stand Out</h2>
          </div>
          <div className="highlights-grid">
            {[
              { title: '4 Guard-Gated Enclaves', body: 'Country Club Hills, Eagle Hills, Corte Bella, and Tournament Hills — four distinct guard-gated communities within one village, each with its own character and price range.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
              { title: 'TPC Summerlin Proximity', body: 'Tournament Hills and Country Club Hills sit adjacent to TPC Summerlin, the PGA Tour championship course that hosts the annual Shriners Children\'s Open.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 2v10l7 4"/></svg> },
              { title: 'Central Summerlin Location', body: 'Ideal central positioning within Summerlin South — close to Downtown Summerlin, Red Rock Country Club, and major trail access without being on the outer perimeter.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><line x1="8" y1="6" x2="8" y2="6.01"/><line x1="12" y1="6" x2="12" y2="6.01"/><line x1="16" y1="6" x2="16" y2="6.01"/><line x1="8" y1="10" x2="8" y2="10.01"/><line x1="12" y1="10" x2="12" y2="10.01"/><line x1="16" y1="10" x2="16" y2="10.01"/><line x1="8" y1="14" x2="8" y2="14.01"/><line x1="12" y1="14" x2="12" y2="14.01"/><line x1="16" y1="14" x2="16" y2="14.01"/></svg> },
              { title: 'Mature Landscaping', body: 'Established neighborhoods with 20+ years of mature landscaping. Tree-lined streets and established desert gardens create a neighborhood character that newer communities cannot replicate.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22c4-4 8-7.5 8-12a8 8 0 10-16 0c0 4.5 4 8 8 12z"/><circle cx="12" cy="10" r="3"/></svg> },
              { title: 'Excellent School Zoning', body: 'Zoned for top-performing CCSD schools including Sig Rogich Middle and Palo Verde High School. Private schools like The Meadows School are minutes away.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M4 19.5A2.5 2.5 0 006.5 22H20V2H6.5A2.5 2.5 0 004 4.5v15z"/></svg> },
              { title: 'Broad Price Range', body: 'From $600K in non-gated neighborhoods to $3M+ in the guard-gated enclaves. One of the few Summerlin villages that serves both the move-up and luxury buyer.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg> },
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

      <SummerlinTheHillsSouthFAQ />

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
              { name: 'Summerlin', href: '/summerlin/', price: 'From $450K', compare: 'The broader master-planned community with 20+ villages and every price point.' },
              { name: 'The Ridges', href: '/summerlin-the-ridges/', price: 'From $2M', compare: 'Summerlin\'s ultra-luxury guard-gated community with Bear\'s Best golf. A tier above The Hills South.' },
              { name: 'The Hills', href: '/summerlin-the-hills/', price: 'From $500K', compare: 'The sister village in Summerlin North. Similar character with its own guard-gated enclave (Mountain Trails).' },
              { name: 'Red Rock Country Club', href: '/red-rock-country-club/', price: 'From $1.2M', compare: 'Guard-gated golf community with two Arnold Palmer courses. Adjacent to The Hills South.' },
              { name: 'The Paseos', href: '/summerlin-the-paseos/', price: 'From $550K', compare: 'Summerlin\'s family-focused village with Fox Hill Park and 29 neighborhoods.' },
              { name: 'Siena', href: '/summerlin-siena/', price: 'From $400K', compare: 'Guard-gated 55+ village in Summerlin South. Different lifestyle focus, lower price points.' },
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
              <h2>Ready to Find Your The Hills South Home?</h2>
              <p>Nevada Real Estate Group is the #1 real estate team in Nevada. Whether you&apos;re buying or selling in The Hills South, let&apos;s talk.</p>
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
                <input type="hidden" name="_subject" value="The Hills South Inquiry — LasVegasHomeSearchExperts.com" />
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
