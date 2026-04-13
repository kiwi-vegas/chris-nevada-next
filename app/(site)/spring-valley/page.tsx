import SpringValleyFAQ from '@/components/SpringValleyFAQ'
import Link from 'next/link'
import type { Metadata } from 'next'
import SpringValleyMapWrapper from '@/components/SpringValleyMapWrapper'
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
    { '@type': 'ListItem', position: 3, name: 'Spring Valley', item: 'https://www.lasvegashomesearchexperts.com/spring-valley/' },
  ],
}

const FAQ_DATA = [
  {
    "q": "What is the price range for homes in Spring Valley?",
    "a": "Homes in Spring Valley range from approximately $300,000 for condos and townhomes to $700,000 or more for larger single-family homes in premium sections. The median home price is typically in the $400K–$500K range."
  },
  {
    "q": "Is Spring Valley a city?",
    "a": "No. Spring Valley is an unincorporated community in Clark County, not a separately incorporated city. It is commonly referred to as a neighborhood or community of Las Vegas, though it has its own distinct identity and ZIP codes."
  },
  {
    "q": "What ZIP codes are in Spring Valley?",
    "a": "Spring Valley spans multiple ZIP codes including 89117, 89147, 89148, and 89113. The exact boundaries are fluid as Spring Valley is an unincorporated census-designated place."
  },
  {
    "q": "What schools serve Spring Valley?",
    "a": "Spring Valley is served by numerous CCSD schools including Spring Valley High School, Becker Middle School, and several elementary schools. Private options include The Meadows School (A+) and Bishop Gorman High School (A+). Doral Academy (9/10) is the top charter."
  },
  {
    "q": "Is Spring Valley a good area to live?",
    "a": "Spring Valley is one of the most popular residential areas in Las Vegas due to its central location, mature neighborhoods, strong commercial infrastructure, and relative affordability. It appeals to professionals, families, and investors alike."
  },
  {
    "q": "How close is Spring Valley to the Strip?",
    "a": "Spring Valley is approximately 10 minutes from the Las Vegas Strip via Flamingo Road or Spring Mountain Road. The central location provides easy access to the Strip, downtown, Summerlin, and Henderson."
  },
  {
    "q": "Are there guard-gated communities in Spring Valley?",
    "a": "Several guard-gated communities border or overlap with Spring Valley, including Canyon Gate Country Club, Spanish Trail, and The Lakes. These offer luxury living within the broader Spring Valley area."
  },
  {
    "q": "Is Spring Valley good for investment?",
    "a": "Spring Valley offers strong investment potential due to its central location, diverse tenant pool, and mature housing stock with renovation opportunities. Rental demand is consistently high given the proximity to the Strip and major employers."
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
  name: 'Spring Valley',
  description: 'Spring Valley is a established suburban · unincorporated community in Las Vegas, Nevada.',
  geo: { '@type': 'GeoCoordinates', latitude: 36.106, longitude: -115.244 },
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
  const cms = await getCommunityPage('spring-valley')
  return {
    title: cms?.metaTitle ?? 'Spring Valley Homes for Sale | Nevada Real Estate Group',
    description: cms?.metaDescription ?? 'Browse Spring Valley homes for sale in Las Vegas, NV. $300K–$700K. Schools, HOA, market stats. Nevada Real Estate Group.',
  }
}

export default async function SpringValleyPage() {
  const cms = await getCommunityPage('spring-valley')
  const market = getMarketStats('spring-valley')
  const ms = market?.stats

  const heroHeadline = cms?.heroHeadline ?? 'Spring Valley'
  const heroSubtitle = 'Homes for Sale in Las Vegas, Nevada'
  const overviewTitle = cms?.overviewTitle ?? 'Spring Valley: Established Suburban · Unincorporated Living in Las Vegas'

  const HARDCODED_STATS: Array<[string, string] | [string, string, string]> = [
    ['Established', '1981'],
    ['Developer', 'Various'],
    ['Total Acreage', '~33 sq mi'],
    ['Homes', '60,000+'],
    ['Median Home Price', ms?.medianSalePrice ?? '$300K–$700K'],
    ['ZIP Codes', '89117, 89147, 89148, 89113'],
    ['Guard-Gated', 'No'],
    ['HOA', '$25–$200/mo'],
  ]
  const displayStats = mergeQuickStats(HARDCODED_STATS, cms?.quickStats)
  const HARDCODED_DRIVE_TIMES = [
    {
        "time": "~10 min",
        "destination": "to the Strip",
        "route": "via Flamingo Rd / Spring Mountain Rd"
    },
    {
        "time": "~15 min",
        "destination": "to Downtown Summerlin",
        "route": "via W Charleston Blvd"
    },
    {
        "time": "~20 min",
        "destination": "to Harry Reid Airport",
        "route": "via I-215 South → I-15"
    },
    {
        "time": "~10 min",
        "destination": "to The Lakes / Desert Shores",
        "route": "via W Sahara Ave"
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
          <span>Spring Valley</span>
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
                <span className="hero-v2-stat-num">{ms?.medianSalePrice ?? qs('Median Home Price', '$300K–$700K')}</span>
                <span className="hero-v2-stat-lbl">Median Sale Price</span>
              </div>
              <div className="hero-v2-stat">
                <span className="hero-v2-stat-num">{ms?.avgDaysToClose ?? qs('Avg Days on Market', '45')}</span>
                <span className="hero-v2-stat-lbl">Avg Days to Close</span>
              </div>
            </div>
            <a href="#listings" className="hero-v2-cta">Search Homes in Spring Valley</a>
          </div>
        </div>
      </header>

      <div className="hero-v2-qfb">
        <div className="container">
          <div className="hero-v2-qfb-row">
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <span><strong>ZIP:</strong> 89117, 89147, 89148, 89113</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              <span><strong>Type:</strong> Established Suburban · Unincorporated</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
              <span><strong>Price Range:</strong> $300K–$700K</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
              <span><strong>HOA:</strong> $25–$200/mo</span>
            </div>
          </div>
          <div className="hero-v2-qfb-est">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            <span>Est. 1981</span>
          </div>
        </div>
      </div>

      <section id="demographics" className="demographics-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Demographics</span>
            <h2>Spring Valley Demographics</h2>
          </div>
          <div className="demo-grid">
            {[
              ['180,000+', 'Population'],
              ['38', 'Median Age'],
              ['$60,000', 'Avg Household Income'],
              ['60,000+', 'Total Households'],
              ['52%', 'Homeownership Rate'],
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
            <h2>Where is Spring Valley?</h2>
            <p>Las Vegas, Nevada &mdash; Las Vegas, Nevada.</p>
          </div>
          <div className="map-container">
            <SpringValleyMapWrapper />
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
            <h2 className="listings-title">NEW SPRING VALLEY LISTINGS</h2>
          </div>
          <div className="ylopo-wrap">
            <div className="YLOPO_searchWidget" />
            <div className="YLOPO_resultsWidget" data-search='{"propertyTypes":["house","condo","townhouse"],"minPrice":250000,"locations":[{"city":"Las Vegas","state":"NV"}],"limit":12,"sortBy":"listDate","sortOrder":"desc","keywords":"Spring Valley","zipCodes":["89117","89147","89148","89113"]}' />
          </div>
          <p className="ylopo-note">Listing data sourced from regional MLS. Information deemed reliable but not guaranteed. Updated daily.</p>
          <div className="listings-actions">
            <a href="https://search.nevadarealestategroup.net/search?s[orderBy]=sourceCreationDate%2Cdesc&s[page]=1&s[locations][0][city]=Las%20Vegas&s[locations][0][state]=NV&s[keywords]=Spring%20Valley" target="_blank" rel="noopener noreferrer" className="btn-gold">View All Spring Valley Listings &rarr;</a>
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
                  <p>Spring Valley is one of the most established and centrally located residential areas in the Las Vegas Valley. This large unincorporated community in Clark County stretches from the western edge of the Strip corridor west toward the foothills near Summerlin, encompassing approximately 33 square miles and over 180,000 residents. Developed primarily from the 1980s through the early 2000s, Spring Valley offers mature neighborhoods, a diverse housing stock, and some of the most convenient access to employment, shopping, and entertainment in the entire valley.</p>
                  <p>The appeal of Spring Valley is its combination of central location, established infrastructure, and relative affordability. Homes range from modest townhomes and condominiums starting around $300,000 to larger single-family homes reaching $700,000 or more in premium sections. Communities like Canyon Gate Country Club, Spanish Trail, and The Lakes border or overlap with Spring Valley, adding guard-gated luxury options to the area's inventory. The neighborhood-by-neighborhood character varies widely, from mature tract homes to custom estates.</p>
                  <p>Spring Valley's commercial infrastructure is among the most robust in the valley. The intersection of Flamingo Road and Fort Apache has become a de facto downtown for the west side of Las Vegas, with major grocery, medical, fitness, dining, and retail options within minutes of virtually every home. The area is also home to several large parks, the Desert Breeze Community Center, and multiple CCSD schools that draw families seeking quality education without the premium pricing of newer master-planned communities.</p>
                  <p>For investors and first-time buyers, Spring Valley presents one of the strongest value propositions in the Las Vegas metro. Its central location means short commutes to the Strip, downtown, Summerlin, and Henderson. The mature tree canopy, established HOAs, and proven infrastructure provide a level of neighborhood stability that newer developments cannot yet match. Renovation and value-add opportunities are particularly strong in Spring Valley's 1990s-era housing stock.</p>
                </>
              )}
            </div>
            <div className="overview-aside">
              <div className="quick-facts">
                <h3>Spring Valley At a Glance</h3>
                {displayStats.map(([label, value, cls]: any) => (
                  <div className="fact-row" key={label}>
                    <span className="fact-label">{label}</span>
                    <span className={`fact-value${cls ? ' ' + cls : ''}`}>{value}</span>
                  </div>
                ))}
              </div>
              <div className="cta-card">
                <p>Ready to explore Spring Valley? Schedule a private tour of the community and the current listings that match your goals.</p>
                <a href="tel:+17252399950" className="btn-gold">Call 725.239.9950</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="highlights">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Why Spring Valley</span>
            <h2>What Makes Spring Valley Stand Out</h2>
          </div>
          <div className="highlights-grid">
            {[
              { title: 'Central Valley Location', body: 'Minutes from the Strip, downtown, Summerlin, and I-15/I-215 corridors. One of the most conveniently located residential areas in the entire Las Vegas Valley.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><line x1="8" y1="6" x2="8" y2="6.01"/><line x1="12" y1="6" x2="12" y2="6.01"/><line x1="16" y1="6" x2="16" y2="6.01"/><line x1="8" y1="10" x2="8" y2="10.01"/><line x1="12" y1="10" x2="12" y2="10.01"/><line x1="16" y1="10" x2="16" y2="10.01"/><line x1="8" y1="14" x2="8" y2="14.01"/><line x1="12" y1="14" x2="12" y2="14.01"/><line x1="16" y1="14" x2="16" y2="14.01"/></svg> },
              { title: 'Mature Neighborhoods', body: 'Developed from the 1980s through 2000s, Spring Valley features mature tree canopies, established landscaping, and proven neighborhood infrastructure that newer communities lack.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
              { title: 'Diverse Housing Stock', body: 'From $300K condos to $700K+ single-family homes, plus adjacent guard-gated communities like Canyon Gate and Spanish Trail. Something for every buyer profile.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M8 21l4-11 4 11"/><path d="M2 21l5-14 4 8"/><path d="M14 15l4-8 4 14"/><line x1="2" y1="21" x2="22" y2="21"/></svg> },
              { title: 'Strong Retail & Dining', body: 'The Flamingo/Fort Apache corridor and Rainbow/Spring Mountain corridors offer exceptional shopping, dining, and services. Major commercial infrastructure throughout.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22c4-4 8-7.5 8-12a8 8 0 10-16 0c0 4.5 4 8 8 12z"/><circle cx="12" cy="10" r="3"/></svg> },
              { title: 'Desert Breeze Park', body: 'One of the best park facilities in the valley. 20+ acres with a community center, wave pool, sports fields, skate park, and the Southern Nevada Railroad Museum.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
              { title: 'Investment Potential', body: 'Spring Valley\'s central location and mature housing stock create strong rental demand and value-add renovation opportunities. Consistent appreciation in an established market.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg> },
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

      <SpringValleyFAQ />

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
              { name: 'The Lakes', href: '/the-lakes/', price: 'From $400K', compare: 'Waterfront community with man-made lakes, resort-style amenities, and mature landscaping.' },
              { name: 'Desert Shores', href: '/desert-shores/', price: 'From $350K', compare: 'Lakefront community with four man-made lakes, beaches, and a community center.' },
              { name: 'Summerlin', href: '/summerlin/', price: 'From $450K', compare: 'Premier master-planned community to the west with guard-gated enclaves and premium amenities.' },
              { name: 'Enterprise', href: '/enterprise/', price: 'From $350K', compare: 'Newer development south of Spring Valley with growing commercial infrastructure.' },
              { name: 'Rhodes Ranch', href: '/rhodes-ranch/', price: 'From $350K', compare: 'Guard-gated golf community to the south with Ted Robinson course and resort amenities.' },
              { name: 'Downtown Las Vegas', href: '/downtown-las-vegas/', price: 'From $200K', compare: 'The urban core with Arts District, high-rises, and walkable entertainment. 10 minutes east.' },
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
              <h2>Ready to Find Your Spring Valley Home?</h2>
              <p>Nevada Real Estate Group is the #1 real estate team in Nevada. Whether you&apos;re buying or selling in Spring Valley, let&apos;s talk.</p>
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
                <input type="hidden" name="_subject" value="Spring Valley Inquiry — LasVegasHomeSearchExperts.com" />
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
