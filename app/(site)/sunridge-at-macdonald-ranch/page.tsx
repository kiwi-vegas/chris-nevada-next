import SunridgeAtMacdonaldRanchFAQ from '@/components/SunridgeAtMacdonaldRanchFAQ'
import Link from 'next/link'
import type { Metadata } from 'next'
import SunridgeAtMacdonaldRanchMapWrapper from '@/components/SunridgeAtMacdonaldRanchMapWrapper'
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
    { '@type': 'ListItem', position: 3, name: 'Sunridge at MacDonald Ranch', item: 'https://www.lasvegashomesearchexperts.com/sunridge-at-macdonald-ranch/' },
  ],
}

const FAQ_DATA = [
  {
    "q": "What is the price range for homes in Sunridge at MacDonald Ranch?",
    "a": "Homes in Sunridge range from approximately $600,000 for updated resales to $1.5 million for larger homes on golf course or premium view lots."
  },
  {
    "q": "Is Sunridge at MacDonald Ranch guard-gated?",
    "a": "No. Sunridge is not guard-gated. For guard-gated living in the MacDonald Ranch area, see Foothills at MacDonald Ranch or MacDonald Highlands."
  },
  {
    "q": "What golf courses are near Sunridge?",
    "a": "The Revere Golf Club borders several Sunridge neighborhoods, featuring two championship 18-hole courses — the Lexington and the Concord. DragonRidge Country Club (private) is also nearby in MacDonald Highlands."
  },
  {
    "q": "What ZIP code is Sunridge in?",
    "a": "Sunridge at MacDonald Ranch is located in ZIP code 89012 in Henderson, Nevada."
  },
  {
    "q": "How does Sunridge compare to Foothills at MacDonald Ranch?",
    "a": "The Foothills is guard-gated with higher prices ($1M–$4M) and more dramatic elevated views. Sunridge offers similar golf and mountain views at more accessible prices ($600K–$1.5M) without a guard gate."
  },
  {
    "q": "What are HOA fees in Sunridge?",
    "a": "HOA fees in Sunridge typically range from $100 to $250 per month, covering common area maintenance, landscaping of shared spaces, and community infrastructure."
  },
  {
    "q": "What schools serve Sunridge?",
    "a": "Sunridge is served by CCSD schools including Coronado High School (8/10), Bob Miller Middle School (7/10), and Fay Herron Elementary (7/10). Private and charter options are nearby."
  },
  {
    "q": "Is Sunridge a good area for families?",
    "a": "Yes. Sunridge attracts families with its safe neighborhoods, parks, Henderson school zoning, and proximity to community amenities. The golf course setting and mountain views add a lifestyle dimension that most family-priced communities lack."
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
  name: 'Sunridge at MacDonald Ranch',
  description: 'Sunridge at MacDonald Ranch is a golf · family · established community in Henderson, Nevada.',
  geo: { '@type': 'GeoCoordinates', latitude: 36.035, longitude: -114.995 },
  address: { '@type': 'PostalAddress', addressLocality: 'Henderson', addressRegion: 'NV', postalCode: '89012', addressCountry: 'US' },
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
  const cms = await getCommunityPage('sunridge-at-macdonald-ranch')
  return {
    title: cms?.metaTitle ?? 'Sunridge at MacDonald Ranch Homes for Sale | Nevada Real Estate Group',
    description: cms?.metaDescription ?? 'Browse Sunridge at MacDonald Ranch homes for sale in Henderson, NV. $600K–$1.5M. Schools, HOA, market stats. Nevada Real Estate Group.',
  }
}

export default async function SunridgeAtMacdonaldRanchPage() {
  const cms = await getCommunityPage('sunridge-at-macdonald-ranch')
  const market = getMarketStats('sunridge-at-macdonald-ranch')
  const ms = market?.stats

  const heroHeadline = cms?.heroHeadline ?? 'Sunridge at MacDonald Ranch'
  const heroSubtitle = 'Homes for Sale in Henderson, Nevada'
  const overviewTitle = cms?.overviewTitle ?? 'Sunridge at MacDonald Ranch: Golf · Family · Established Living in Henderson'

  const HARDCODED_STATS: Array<[string, string] | [string, string, string]> = [
    ['Established', '1999'],
    ['Developer', 'MacDonald Development Company'],
    ['Total Acreage', '300 acres'],
    ['Homes', '800+'],
    ['Median Home Price', ms?.medianSalePrice ?? '$600K–$1.5M'],
    ['ZIP Codes', '89012'],
    ['Guard-Gated', 'No'],
    ['HOA', '$100–$250/mo'],
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
        "route": "via I-215 W"
    },
    {
        "time": "~10 min",
        "destination": "to Henderson Downtown",
        "route": "via Horizon Ridge Pkwy"
    },
    {
        "time": "~35 min",
        "destination": "to Summerlin",
        "route": "via I-215 W"
    },
    {
        "time": "~25 min",
        "destination": "to Lake Mead",
        "route": "via US-93 / I-11"
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
          <span>Sunridge at MacDonald Ranch</span>
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
                <span className="hero-v2-stat-num">{ms?.medianSalePrice ?? qs('Median Home Price', '$600K–$1.5M')}</span>
                <span className="hero-v2-stat-lbl">Median Sale Price</span>
              </div>
              <div className="hero-v2-stat">
                <span className="hero-v2-stat-num">{ms?.avgDaysToClose ?? qs('Avg Days on Market', '45')}</span>
                <span className="hero-v2-stat-lbl">Avg Days to Close</span>
              </div>
            </div>
            <a href="#listings" className="hero-v2-cta">Search Homes in Sunridge at MacDonald Ranch</a>
          </div>
        </div>
      </header>

      <div className="hero-v2-qfb">
        <div className="container">
          <div className="hero-v2-qfb-row">
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <span><strong>ZIP:</strong> 89012</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              <span><strong>Type:</strong> Golf · Family · Established</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
              <span><strong>Price Range:</strong> $600K–$1.5M</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
              <span><strong>HOA:</strong> $100–$250/mo</span>
            </div>
          </div>
          <div className="hero-v2-qfb-est">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            <span>Est. 1999</span>
          </div>
        </div>
      </div>

      <section id="demographics" className="demographics-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Demographics</span>
            <h2>Sunridge at MacDonald Ranch Demographics</h2>
          </div>
          <div className="demo-grid">
            {[
              ['2,400+', 'Population'],
              ['46', 'Median Age'],
              ['$130,000+', 'Avg Household Income'],
              ['800+', 'Total Households'],
              ['83%', 'Homeownership Rate'],
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
            <h2>Where is Sunridge at MacDonald Ranch?</h2>
            <p>MacDonald Ranch, Henderson &mdash; Henderson, Nevada.</p>
          </div>
          <div className="map-container">
            <SunridgeAtMacdonaldRanchMapWrapper />
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
            <h2 className="listings-title">NEW SUNRIDGE AT MACDONALD RANCH LISTINGS</h2>
          </div>
          <div className="ylopo-wrap">
            <div className="YLOPO_searchWidget" />
            <div className="YLOPO_resultsWidget" data-search='{"propertyTypes":["house","condo","townhouse"],"minPrice":600000,"locations":[{"city":"Henderson","state":"NV"}],"limit":12,"sortBy":"listDate","sortOrder":"desc","keywords":"Sunridge MacDonald Ranch","zipCodes":["89012"]}' />
          </div>
          <p className="ylopo-note">Listing data sourced from regional MLS. Information deemed reliable but not guaranteed. Updated daily.</p>
          <div className="listings-actions">
            <a href="https://search.nevadarealestategroup.net/search?s[orderBy]=sourceCreationDate%2Cdesc&s[page]=1&s[locations][0][city]=Henderson&s[locations][0][state]=NV&s[keywords]=Sunridge%20MacDonald%20Ranch" target="_blank" rel="noopener noreferrer" className="btn-gold">View All Sunridge at MacDonald Ranch Listings &rarr;</a>
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
                  <p>Sunridge at MacDonald Ranch is a golf-oriented residential community in the foothills of Henderson, positioned along the periphery of the MacDonald Ranch master plan. The community offers a blend of golf course living, mountain views, and family-friendly neighborhoods at price points below the guard-gated luxury enclaves higher up the mountain. For buyers who want the MacDonald Ranch address and proximity to DragonRidge Country Club without the ultra-luxury price tags, Sunridge represents one of Henderson's best values.</p>
                  <p>Homes in Sunridge range from approximately $600,000 for updated resales to $1.5 million for larger homes on golf course or premium view lots. The housing stock primarily consists of single-family homes ranging from 2,000 to 4,500 square feet, built by quality national and regional builders during the late 1990s and early 2000s. Architectural styles include Southwest, Mediterranean, and transitional, with many homeowners having invested in significant interior and exterior upgrades over the years.</p>
                  <p>The community's defining feature is its relationship to golf. Several Sunridge neighborhoods border the Revere Golf Club (formerly the DragonRidge public courses), providing residents with golf course frontage and views. The Revere features two 18-hole championship courses — the Lexington and the Concord — with panoramic views of the Las Vegas Valley. While membership is not required, the courses offer convenient daily-fee play for residents.</p>
                  <p>Sunridge at MacDonald Ranch appeals to families, professionals, and semi-retirees who want an elevated Henderson location with golf course views and mountain backdrop without the guard-gated premium. The community is within the Henderson school district and close to shopping, dining, and medical facilities along Eastern Avenue and Horizon Ridge Parkway. For the MacDonald Ranch lifestyle at an accessible price point, Sunridge delivers genuine value.</p>
                </>
              )}
            </div>
            <div className="overview-aside">
              <div className="quick-facts">
                <h3>Sunridge at MacDonald Ranch At a Glance</h3>
                {displayStats.map(([label, value, cls]: any) => (
                  <div className="fact-row" key={label}>
                    <span className="fact-label">{label}</span>
                    <span className={`fact-value${cls ? ' ' + cls : ''}`}>{value}</span>
                  </div>
                ))}
              </div>
              <div className="cta-card">
                <p>Ready to explore Sunridge at MacDonald Ranch? Schedule a private tour of the community and the current listings that match your goals.</p>
                <a href="tel:+17252399950" className="btn-gold">Call 725.239.9950</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="highlights">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Why Sunridge at MacDonald Ranch</span>
            <h2>What Makes Sunridge at MacDonald Ranch Stand Out</h2>
          </div>
          <div className="highlights-grid">
            {[
              { title: 'Golf Course Living', body: 'Multiple neighborhoods border the Revere Golf Club (Lexington and Concord courses), providing golf course frontage, fairway views, and convenient public play without mandatory membership.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 2v10l7 4"/></svg> },
              { title: 'Mountain & Valley Views', body: 'Elevated foothills position provides many homes with views of the Las Vegas Valley, the Strip skyline, and the McCullough Range. Views improve with elevation.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M8 21l4-11 4 11"/><path d="M2 21l5-14 4 8"/><path d="M14 15l4-8 4 14"/><line x1="2" y1="21" x2="22" y2="21"/></svg> },
              { title: 'MacDonald Ranch Address', body: 'The prestige of the MacDonald Ranch location at price points significantly below the guard-gated luxury communities higher on the mountain.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
              { title: 'Family-Friendly Neighborhoods', body: 'Wide streets, parks, and safe neighborhoods make Sunridge popular with families. Close to Henderson schools, medical facilities, and youth recreation.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
              { title: 'Value Proposition', body: 'Golf course living with mountain views in the MacDonald Ranch area starting at $600K — a fraction of the $1M+ required for guard-gated alternatives nearby.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg> },
              { title: 'Revere Golf Club', body: 'Two championship 18-hole courses with panoramic Las Vegas Valley views. Public play available — among the most scenic courses in Henderson.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 2v10l7 4"/></svg> },
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

      <SunridgeAtMacdonaldRanchFAQ />

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
              { name: 'Foothills at MacDonald Ranch', href: '/foothills-at-macdonald-ranch/', price: 'From $1M', compare: 'Guard-gated luxury community adjacent with higher elevation, better views, and premium pricing.' },
              { name: 'MacDonald Highlands', href: '/macdonald-highlands/', price: 'From $800K', compare: 'Henderson\'s premier luxury community with DragonRidge Country Club and panoramic views.' },
              { name: 'Sun City MacDonald Ranch', href: '/sun-city-macdonald-ranch/', price: 'From $300K', compare: '55+ Del Webb community in MacDonald Ranch with its own golf course.' },
              { name: 'Seven Hills', href: '/seven-hills/', price: 'From $500K', compare: 'Established Henderson community with Rio Secco golf and 25 neighborhoods.' },
              { name: 'Green Valley Ranch', href: '/green-valley-ranch/', price: 'From $400K', compare: 'Adjacent community with resort casino and The District shopping center.' },
              { name: 'Anthem', href: '/anthem/', price: 'From $400K', compare: 'Henderson master plan with top-rated schools and resort-style amenities.' },
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
              <h2>Ready to Find Your Sunridge at MacDonald Ranch Home?</h2>
              <p>Nevada Real Estate Group is the #1 real estate team in Nevada. Whether you&apos;re buying or selling in Sunridge at MacDonald Ranch, let&apos;s talk.</p>
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
                <input type="hidden" name="_subject" value="Sunridge at MacDonald Ranch Inquiry — LasVegasHomeSearchExperts.com" />
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
