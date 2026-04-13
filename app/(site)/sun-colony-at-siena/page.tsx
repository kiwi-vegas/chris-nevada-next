import SunColonyAtSienaFAQ from '@/components/SunColonyAtSienaFAQ'
import Link from 'next/link'
import type { Metadata } from 'next'
import SunColonyAtSienaMapWrapper from '@/components/SunColonyAtSienaMapWrapper'
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
    { '@type': 'ListItem', position: 3, name: 'Sun Colony at Siena', item: 'https://www.lasvegashomesearchexperts.com/sun-colony-at-siena/' },
  ],
}

const FAQ_DATA = [
  {
    "q": "What is the age requirement for Sun Colony at Siena?",
    "a": "Sun Colony at Siena is a 55+ community within the guard-gated Siena neighborhood. At least one resident in each home must be 55 or older, per HUD guidelines."
  },
  {
    "q": "What is the price range for homes in Sun Colony at Siena?",
    "a": "Homes in Sun Colony at Siena range from approximately $700,000 for established interior homes to over $1.3 million for golf course or mountain-view estate homes."
  },
  {
    "q": "Is Sun Colony at Siena guard-gated?",
    "a": "Yes. Sun Colony is within the guard-gated Siena community, which has a 24-hour staffed guard gate and security patrols covering the entire Siena neighborhood."
  },
  {
    "q": "Does Sun Colony have golf?",
    "a": "Sun Colony residents have access to the Siena Golf Club, an 18-hole Schmidt-Curley championship course with mountain views, a pro shop, driving range, and restaurant."
  },
  {
    "q": "What are HOA fees in Sun Colony at Siena?",
    "a": "HOA fees typically range from $300 to $600 per month, covering guard gate staffing, community center operations, pool maintenance, landscaping, and the Summerlin master association fee."
  },
  {
    "q": "How does Sun Colony compare to other 55+ communities in Summerlin?",
    "a": "Sun Colony at Siena is the most upscale 55+ community in Summerlin, with larger homes ($700K–$1.3M+) and golf course access. Regency, Trilogy, and Heritage at Stonebridge offer newer construction at lower price points but without golf."
  },
  {
    "q": "What ZIP code is Sun Colony at Siena in?",
    "a": "Sun Colony at Siena is located in ZIP code 89135 in the Summerlin South area of Las Vegas."
  },
  {
    "q": "What is Siena Golf Club?",
    "a": "Siena Golf Club is an 18-hole championship golf course designed by Schmidt-Curley Design, located within the guard-gated Siena community. The course features dramatic mountain views and is available to Siena residents."
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
  name: 'Sun Colony at Siena',
  description: 'Sun Colony at Siena is a 55+ · guard-gated · luxury community in Las Vegas, Nevada.',
  geo: { '@type': 'GeoCoordinates', latitude: 36.158, longitude: -115.308 },
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
  const cms = await getCommunityPage('sun-colony-at-siena')
  return {
    title: cms?.metaTitle ?? 'Sun Colony at Siena Homes for Sale | Nevada Real Estate Group',
    description: cms?.metaDescription ?? 'Browse Sun Colony at Siena homes for sale in Las Vegas, NV. $700K–$1.3M+. Schools, HOA, market stats. Nevada Real Estate Group.',
  }
}

export default async function SunColonyAtSienaPage() {
  const cms = await getCommunityPage('sun-colony-at-siena')
  const market = getMarketStats('sun-colony-at-siena')
  const ms = market?.stats

  const heroHeadline = cms?.heroHeadline ?? 'Sun Colony at Siena'
  const heroSubtitle = 'Homes for Sale in Las Vegas, Nevada'
  const overviewTitle = cms?.overviewTitle ?? 'Sun Colony at Siena: 55+ · Guard-Gated · Luxury Living in Las Vegas'

  const HARDCODED_STATS: Array<[string, string] | [string, string, string]> = [
    ['Established', '2004'],
    ['Developer', 'William Lyon Homes / Taylor Morrison'],
    ['Total Acreage', '~100 acres'],
    ['Homes', '275+'],
    ['Median Home Price', ms?.medianSalePrice ?? '$700K–$1.3M+'],
    ['ZIP Codes', '89135'],
    ['Guard-Gated', 'Yes'],
    ['HOA', '$300–$600/mo'],
  ]
  const displayStats = mergeQuickStats(HARDCODED_STATS, cms?.quickStats)
  const HARDCODED_DRIVE_TIMES = [
    {
        "time": "~20 min",
        "destination": "to the Strip",
        "route": "via Summerlin Pkwy → I-15"
    },
    {
        "time": "~10 min",
        "destination": "to Red Rock Canyon",
        "route": "via W Charleston Blvd"
    },
    {
        "time": "~5 min",
        "destination": "to Downtown Summerlin",
        "route": "via W Charleston Blvd"
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
          <a href="/#communities">Communities</a>
          <span className="breadcrumb-sep">&rsaquo;</span>
          <span>Sun Colony at Siena</span>
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
                <span className="hero-v2-stat-num">{ms?.medianSalePrice ?? qs('Median Home Price', '$700K–$1.3M+')}</span>
                <span className="hero-v2-stat-lbl">Median Sale Price</span>
              </div>
              <div className="hero-v2-stat">
                <span className="hero-v2-stat-num">{ms?.avgDaysToClose ?? qs('Avg Days on Market', '45')}</span>
                <span className="hero-v2-stat-lbl">Avg Days to Close</span>
              </div>
            </div>
            <a href="#listings" className="hero-v2-cta">Search Homes in Sun Colony at Siena</a>
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
              <span><strong>Type:</strong> 55+ · Guard-Gated · Luxury</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
              <span><strong>Price Range:</strong> $700K–$1.3M+</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
              <span><strong>HOA:</strong> $300–$600/mo</span>
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
            <h2>Sun Colony at Siena Demographics</h2>
          </div>
          <div className="demo-grid">
            {[
              ['~550', 'Population'],
              ['67', 'Median Age'],
              ['$175,000+', 'Avg Household Income'],
              ['~275', 'Total Households'],
              ['93%', 'Homeownership Rate'],
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
            <h2>Where is Sun Colony at Siena?</h2>
            <p>Summerlin, Las Vegas &mdash; Las Vegas, Nevada.</p>
          </div>
          <div className="map-container">
            <SunColonyAtSienaMapWrapper />
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
            <h2 className="listings-title">NEW SUN COLONY AT SIENA LISTINGS</h2>
          </div>
          <div className="ylopo-wrap">
            <div className="YLOPO_searchWidget" />
            <div className="YLOPO_resultsWidget" data-search='{"propertyTypes":["house","condo","townhouse"],"minPrice":700000,"locations":[{"city":"Las Vegas","state":"NV"}],"limit":12,"sortBy":"listDate","sortOrder":"desc","keywords":"Sun Colony Siena Summerlin","zipCodes":["89135"]}' />
          </div>
          <p className="ylopo-note">Listing data sourced from regional MLS. Information deemed reliable but not guaranteed. Updated daily.</p>
          <div className="listings-actions">
            <a href="https://search.nevadarealestategroup.net/search?s[orderBy]=sourceCreationDate%2Cdesc&s[page]=1&s[locations][0][city]=Las%20Vegas&s[locations][0][state]=NV&s[keywords]=Sun%20Colony%20Siena%20Summerlin" target="_blank" rel="noopener noreferrer" className="btn-gold">View All Sun Colony at Siena Listings &rarr;</a>
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
                  <p>Sun Colony at Siena is the luxury tier of 55+ guard-gated living within Summerlin's Siena village. Nestled within the guard-gated Siena community in the southern foothills, Sun Colony offers larger homes, premium lots, and an elevated lifestyle compared to the broader Siena neighborhood. With prices ranging from approximately $700,000 to over $1.3 million, it is the most upscale 55+ community in the Summerlin master plan.</p>
                  <p>The community shares access to the Siena Golf Club, an 18-hole championship course designed by Schmidt-Curley that winds through the master plan with dramatic mountain backdrops. Residents also enjoy the Siena Community Center, which features a pool and spa, fitness center, tennis courts, and community gathering spaces. Sun Colony's position within the guard-gated perimeter provides an additional layer of security and exclusivity.</p>
                  <p>Homes in Sun Colony at Siena are predominantly single-story, ranging from approximately 2,200 to 3,800 square feet. The architecture reflects Tuscan and Mediterranean influences with upgraded natural stone exteriors, tile roofing, and mature landscaping. Interior features include gourmet kitchens, formal living and dining rooms, home offices, and spacious master suites with luxury bath fixtures.</p>
                  <p>Sun Colony's location within Siena places residents minutes from Downtown Summerlin, Red Rock Canyon, and the broader Summerlin amenity package. For active adults seeking a premium 55+ lifestyle with golf course access, guard-gated security, and larger luxury homes, Sun Colony at Siena occupies a unique position in the Las Vegas market — it is the only upscale golf-community 55+ option within Summerlin.</p>
                </>
              )}
            </div>
            <div className="overview-aside">
              <div className="quick-facts">
                <h3>Sun Colony at Siena At a Glance</h3>
                {displayStats.map(([label, value, cls]: any) => (
                  <div className="fact-row" key={label}>
                    <span className="fact-label">{label}</span>
                    <span className={`fact-value${cls ? ' ' + cls : ''}`}>{value}</span>
                  </div>
                ))}
              </div>
              <div className="cta-card">
                <p>Ready to explore Sun Colony at Siena? Schedule a private tour of the community and the current listings that match your goals.</p>
                <a href="tel:+17252399950" className="btn-gold">Call 725.239.9950</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="highlights">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Why Sun Colony at Siena</span>
            <h2>What Makes Sun Colony at Siena Stand Out</h2>
          </div>
          <div className="highlights-grid">
            {[
              { title: 'Siena Golf Club', body: 'Access to Siena\'s 18-hole Schmidt-Curley championship golf course with mountain views. Preferred tee times and membership options for residents.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 2v10l7 4"/></svg> },
              { title: 'Guard-Gated Security', body: 'Sun Colony sits within the guard-gated Siena community, providing 24-hour security, controlled access, and enhanced privacy for residents.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
              { title: 'Luxury 55+ Homes', body: 'Larger homes from 2,200 to 3,800 square feet with gourmet kitchens, premium finishes, and the most spacious floor plans of any 55+ community in Summerlin.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
              { title: 'Community Center', body: 'The Siena Community Center offers resort pool and spa, fitness center, tennis courts, and event spaces shared with the broader Siena community.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><line x1="8" y1="6" x2="8" y2="6.01"/><line x1="12" y1="6" x2="12" y2="6.01"/><line x1="16" y1="6" x2="16" y2="6.01"/><line x1="8" y1="10" x2="8" y2="10.01"/><line x1="12" y1="10" x2="12" y2="10.01"/><line x1="16" y1="10" x2="16" y2="10.01"/><line x1="8" y1="14" x2="8" y2="14.01"/><line x1="12" y1="14" x2="12" y2="14.01"/><line x1="16" y1="14" x2="16" y2="14.01"/></svg> },
              { title: 'Tuscan Architecture', body: 'Tuscan and Mediterranean architectural styles with natural stone, tile roofing, and mature landscaping that create a timeless, established aesthetic.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><line x1="8" y1="6" x2="8" y2="6.01"/><line x1="12" y1="6" x2="12" y2="6.01"/><line x1="16" y1="6" x2="16" y2="6.01"/><line x1="8" y1="10" x2="8" y2="10.01"/><line x1="12" y1="10" x2="12" y2="10.01"/><line x1="16" y1="10" x2="16" y2="10.01"/><line x1="8" y1="14" x2="8" y2="14.01"/><line x1="12" y1="14" x2="12" y2="14.01"/><line x1="16" y1="14" x2="16" y2="14.01"/></svg> },
              { title: 'Premium Resale Value', body: 'Sun Colony commands the highest prices among Summerlin\'s 55+ communities. The combination of golf, guard gate, and larger homes drives consistent luxury resale demand.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg> },
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

      <SunColonyAtSienaFAQ />

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
              { name: 'Regency at Summerlin', href: '/regency-at-summerlin/', price: 'From $500K', compare: 'Toll Brothers guard-gated 55+ community at a more accessible price point.' },
              { name: 'Trilogy at Summerlin', href: '/trilogy-at-summerlin/', price: 'From $500K', compare: 'Shea Homes 55+ community with resort clubhouse and restaurant.' },
              { name: 'Sun City Summerlin', href: '/sun-city-summerlin/', price: 'From $300K', compare: 'Del Webb\'s large-scale 55+ community with three golf courses and 7,200+ homes.' },
              { name: 'Heritage at Stonebridge', href: '/heritage-at-stonebridge/', price: 'From $500K', compare: 'Newest 55+ guard-gated community in Summerlin with new construction.' },
              { name: 'Red Rock Country Club', href: '/red-rock-country-club/', price: 'From $1.2M', compare: 'Guard-gated golf community without age restrictions. Two Arnold Palmer courses.' },
              { name: 'The Ridges', href: '/summerlin-the-ridges/', price: 'From $2M', compare: 'Summerlin\'s ultra-luxury guard-gated enclave for buyers without age restrictions.' },
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
              <h2>Ready to Find Your Sun Colony at Siena Home?</h2>
              <p>Nevada Real Estate Group is the #1 real estate team in Nevada. Whether you&apos;re buying or selling in Sun Colony at Siena, let&apos;s talk.</p>
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
                <input type="hidden" name="_subject" value="Sun Colony at Siena Inquiry — LasVegasHomeSearchExperts.com" />
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
