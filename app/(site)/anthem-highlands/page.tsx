import AnthemHighlandsFAQ from '@/components/AnthemHighlandsFAQ'
import Link from 'next/link'
import type { Metadata } from 'next'
import AnthemHighlandsMapWrapper from '@/components/AnthemHighlandsMapWrapper'
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
    { '@type': 'ListItem', position: 3, name: 'Anthem Highlands', item: 'https://www.lasvegashomesearchexperts.com/anthem-highlands/' },
  ],
}

const FAQ_DATA = [
  {
    "q": "What is the price range for homes in Anthem Highlands?",
    "a": "Homes in Anthem Highlands range from approximately $500,000 for smaller resale homes to $800,000 for larger updated properties on premium view lots with mountain and valley views."
  },
  {
    "q": "Is Anthem Highlands guard-gated?",
    "a": "No. Anthem Highlands is not guard-gated, though it benefits from the managed access and security patrols of the broader Anthem master-planned community. For guard-gated living within Anthem, see Anthem Country Club."
  },
  {
    "q": "What ZIP code is Anthem Highlands in?",
    "a": "Anthem Highlands is located in ZIP code 89052 in Henderson, Nevada."
  },
  {
    "q": "What schools serve Anthem Highlands?",
    "a": "Anthem Highlands is zoned for Vanderburg Elementary (9/10 GreatSchools), Del E. Webb Middle School (8/10), and Coronado High School (8/10) — one of the top school trifectas in Clark County."
  },
  {
    "q": "How does Anthem Highlands compare to Anthem Coventry?",
    "a": "Both are family-oriented villages within Anthem sharing the same amenities and school zoning. Highlands tends to have slightly newer construction and more elevated terrain with valley views. Coventry has more mature landscaping. Pricing is very similar between the two."
  },
  {
    "q": "What amenities does Anthem Highlands have?",
    "a": "Residents have full access to the Anthem Center with resort-style pools, fitness center, tennis courts, and community gathering spaces. The neighborhood also features its own parks, trails, and greenbelts."
  },
  {
    "q": "What are HOA fees in Anthem Highlands?",
    "a": "HOA fees in Anthem Highlands typically range from $80 to $180 per month, covering the Anthem master association fee. Fees fund the Anthem Center, trail maintenance, common area landscaping, and security patrols."
  },
  {
    "q": "Is Anthem Highlands a good area for families?",
    "a": "Yes. Anthem Highlands is one of the most popular family neighborhoods in Henderson, with top-rated schools, safe cul-de-sac street design, multiple parks, and a community center that serves as a social hub for families."
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
  name: 'Anthem Highlands',
  description: 'Anthem Highlands is a master-planned · family community in Henderson, Nevada.',
  geo: { '@type': 'GeoCoordinates', latitude: 36.008, longitude: -115.058 },
  address: { '@type': 'PostalAddress', addressLocality: 'Henderson', addressRegion: 'NV', postalCode: '89052', addressCountry: 'US' },
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
  const cms = await getCommunityPage('anthem-highlands')
  return {
    title: cms?.metaTitle ?? 'Anthem Highlands Homes for Sale | Nevada Real Estate Group',
    description: cms?.metaDescription ?? 'Browse Anthem Highlands homes for sale in Henderson, NV. $500K–$800K. Schools, HOA, market stats. Nevada Real Estate Group.',
  }
}

export default async function AnthemHighlandsPage() {
  const cms = await getCommunityPage('anthem-highlands')
  const market = getMarketStats('anthem-highlands')
  const ms = market?.stats

  const heroHeadline = cms?.heroHeadline ?? 'Anthem Highlands'
  const heroSubtitle = 'Homes for Sale in Henderson, Nevada'
  const overviewTitle = cms?.overviewTitle ?? 'Anthem Highlands: Master-Planned · Family Living in Henderson'

  const HARDCODED_STATS: Array<[string, string] | [string, string, string]> = [
    ['Established', '2000'],
    ['Developer', 'Del Webb / Pulte Group'],
    ['Total Acreage', '300 acres'],
    ['Homes', '1,000+'],
    ['Median Home Price', ms?.medianSalePrice ?? '$500K–$800K'],
    ['ZIP Codes', '89052'],
    ['Guard-Gated', 'No'],
    ['HOA', '$80–$180/mo'],
  ]
  const displayStats = mergeQuickStats(HARDCODED_STATS, cms?.quickStats)
  const HARDCODED_DRIVE_TIMES = [
    {
        "time": "~20 min",
        "destination": "to the Strip",
        "route": "via I-215 W → I-15 N"
    },
    {
        "time": "~20 min",
        "destination": "to Harry Reid Airport",
        "route": "via I-215 W → I-15 N"
    },
    {
        "time": "~10 min",
        "destination": "to Henderson Downtown",
        "route": "via Eastern Ave"
    },
    {
        "time": "~30 min",
        "destination": "to Summerlin",
        "route": "via I-215 W"
    },
    {
        "time": "~4.5 hrs",
        "destination": "to Los Angeles",
        "route": "via I-15 S"
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
          <span>Anthem Highlands</span>
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
                <span className="hero-v2-stat-num">{ms?.medianSalePrice ?? qs('Median Home Price', '$500K–$800K')}</span>
                <span className="hero-v2-stat-lbl">Median Sale Price</span>
              </div>
              <div className="hero-v2-stat">
                <span className="hero-v2-stat-num">{ms?.avgDaysToClose ?? qs('Avg Days on Market', '45')}</span>
                <span className="hero-v2-stat-lbl">Avg Days to Close</span>
              </div>
            </div>
            <a href="#listings" className="hero-v2-cta">Search Homes in Anthem Highlands</a>
          </div>
        </div>
      </header>

      <div className="hero-v2-qfb">
        <div className="container">
          <div className="hero-v2-qfb-row">
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <span><strong>ZIP:</strong> 89052</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              <span><strong>Type:</strong> Master-Planned · Family</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
              <span><strong>Price Range:</strong> $500K–$800K</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
              <span><strong>HOA:</strong> $80–$180/mo</span>
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
            <h2>Anthem Highlands Demographics</h2>
          </div>
          <div className="demo-grid">
            {[
              ['3,200+', 'Population'],
              ['40', 'Median Age'],
              ['$115,000+', 'Avg Household Income'],
              ['1,000+', 'Total Households'],
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
            <h2>Where is Anthem Highlands?</h2>
            <p>Anthem, Henderson &mdash; Henderson, Nevada.</p>
          </div>
          <div className="map-container">
            <AnthemHighlandsMapWrapper />
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
            <h2 className="listings-title">NEW ANTHEM HIGHLANDS LISTINGS</h2>
          </div>
          <div className="ylopo-wrap">
            <div className="YLOPO_searchWidget" />
            <div className="YLOPO_resultsWidget" data-search='{"propertyTypes":["house","condo","townhouse"],"minPrice":500000,"locations":[{"city":"Henderson","state":"NV"}],"limit":12,"sortBy":"listDate","sortOrder":"desc","keywords":"Anthem Highlands","zipCodes":["89052"]}' />
          </div>
          <p className="ylopo-note">Listing data sourced from regional MLS. Information deemed reliable but not guaranteed. Updated daily.</p>
          <div className="listings-actions">
            <a href="https://search.nevadarealestategroup.net/search?s[orderBy]=sourceCreationDate%2Cdesc&s[page]=1&s[locations][0][city]=Henderson&s[locations][0][state]=NV&s[keywords]=Anthem%20Highlands" target="_blank" rel="noopener noreferrer" className="btn-gold">View All Anthem Highlands Listings &rarr;</a>
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
                  <p>Anthem Highlands is one of the most popular residential villages within the Anthem master-planned community in Henderson. Built primarily between 2000 and 2006 by national builders including Pulte, KB Home, and Richmond American, the neighborhood features a wide range of single-family homes from approximately 1,400 to 3,200 square feet. The community sits on elevated terrain along the eastern slopes of Anthem, offering many homes panoramic views of the Las Vegas Valley and the surrounding mountain ranges.</p>
                  <p>Homes in Anthem Highlands range from approximately $500,000 for smaller, well-maintained resales to $800,000 for larger homes on premium view lots that have been fully updated. The architectural style follows the Southwest and Mediterranean palette that characterizes much of Anthem — stucco exteriors, tile roofs, and earth-tone color schemes. Many homeowners have invested significantly in renovations, adding modern kitchens, outdoor living spaces, and energy-efficient upgrades.</p>
                  <p>Like all Anthem villages, Highlands residents enjoy full access to the Anthem Center with resort-style pools, fitness facilities, tennis courts, and community gathering spaces. The neighborhood also has its own parks, pocket greenbelts, and connections to Anthem's extensive trail network that winds through the community's natural desert washes and up into the surrounding foothills.</p>
                  <p>Anthem Highlands is a proven family neighborhood with reliable resale performance. The school zoning — including Vanderburg Elementary, Webb Middle, and Coronado High — is among the most desirable in Henderson. The combination of Anthem's brand-name recognition, top-tier schools, family-friendly amenities, and easy access to Henderson's retail and employment corridors makes Highlands one of the steadiest performers in the Henderson resale market.</p>
                </>
              )}
            </div>
            <div className="overview-aside">
              <div className="quick-facts">
                <h3>Anthem Highlands At a Glance</h3>
                {displayStats.map(([label, value, cls]: any) => (
                  <div className="fact-row" key={label}>
                    <span className="fact-label">{label}</span>
                    <span className={`fact-value${cls ? ' ' + cls : ''}`}>{value}</span>
                  </div>
                ))}
              </div>
              <div className="cta-card">
                <p>Ready to explore Anthem Highlands? Schedule a private tour of the community and the current listings that match your goals.</p>
                <a href="tel:+17252399950" className="btn-gold">Call 725.239.9950</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="highlights">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Why Anthem Highlands</span>
            <h2>What Makes Anthem Highlands Stand Out</h2>
          </div>
          <div className="highlights-grid">
            {[
              { title: 'Elevated Valley Views', body: 'Anthem Highlands sits on higher terrain within the Anthem master plan, offering many homes sweeping views of the Las Vegas Valley, the Strip skyline, and the surrounding McCullough Range.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M8 21l4-11 4 11"/><path d="M2 21l5-14 4 8"/><path d="M14 15l4-8 4 14"/><line x1="2" y1="21" x2="22" y2="21"/></svg> },
              { title: 'Top Henderson Schools', body: 'Zoned for Vanderburg Elementary (9/10), Del E. Webb Middle (8/10), and Coronado High School (8/10) — one of the strongest school trifectas in Clark County.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M4 19.5A2.5 2.5 0 006.5 22H20V2H6.5A2.5 2.5 0 004 4.5v15z"/></svg> },
              { title: 'Anthem Center Access', body: 'Full access to the Anthem Center, which includes resort-style pools, a fitness center, tennis and basketball courts, and community gathering spaces for residents.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><line x1="8" y1="6" x2="8" y2="6.01"/><line x1="12" y1="6" x2="12" y2="6.01"/><line x1="16" y1="6" x2="16" y2="6.01"/><line x1="8" y1="10" x2="8" y2="10.01"/><line x1="12" y1="10" x2="12" y2="10.01"/><line x1="16" y1="10" x2="16" y2="10.01"/><line x1="8" y1="14" x2="8" y2="14.01"/><line x1="12" y1="14" x2="12" y2="14.01"/><line x1="16" y1="14" x2="16" y2="14.01"/></svg> },
              { title: 'Connected Trail System', body: 'Walking and biking trails throughout Anthem Highlands connect to the broader Anthem trail network, desert washes, and surrounding open space and foothills.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22c4-4 8-7.5 8-12a8 8 0 10-16 0c0 4.5 4 8 8 12z"/><circle cx="12" cy="10" r="3"/></svg> },
              { title: 'Consistent Appreciation', body: 'Anthem Highlands has demonstrated reliable appreciation across market cycles, supported by strong school zoning, master-plan amenities, and the Henderson address.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg> },
              { title: 'Family-Friendly Design', body: 'Wide streets, cul-de-sacs, neighborhood parks, and a low-traffic layout create a safe, walkable environment for families with children.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
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

      <AnthemHighlandsFAQ />

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
              { name: 'Anthem', href: '/anthem/', price: 'From $400K', compare: 'The broader master-planned community. Multiple villages, top schools, resort amenities.' },
              { name: 'Anthem Coventry', href: '/anthem-coventry/', price: 'From $500K', compare: 'Neighboring Anthem village with similar pricing and shared amenities.' },
              { name: 'Anthem Country Club', href: '/anthem-country-club/', price: 'From $1.2M', compare: 'Guard-gated luxury golf community within Anthem with Hale Irwin course.' },
              { name: 'Sun City Anthem', href: '/sun-city-anthem/', price: 'From $350K', compare: '55+ active adult community within Anthem with its own golf course.' },
              { name: 'Inspirada', href: '/inspirada/', price: 'From $400K', compare: 'Newer Henderson master plan just south of Anthem with parks and modern homes.' },
              { name: 'Seven Hills', href: '/seven-hills/', price: 'From $500K', compare: 'Established Henderson community with Rio Secco golf and 25 neighborhoods.' },
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
              <h2>Ready to Find Your Anthem Highlands Home?</h2>
              <p>Nevada Real Estate Group is the #1 real estate team in Nevada. Whether you&apos;re buying or selling in Anthem Highlands, let&apos;s talk.</p>
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
                <input type="hidden" name="_subject" value="Anthem Highlands Inquiry — LasVegasHomeSearchExperts.com" />
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
