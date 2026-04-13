import SevenHillsCountryClubFAQ from '@/components/SevenHillsCountryClubFAQ'
import Link from 'next/link'
import type { Metadata } from 'next'
import SevenHillsCountryClubMapWrapper from '@/components/SevenHillsCountryClubMapWrapper'
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
    { '@type': 'ListItem', position: 3, name: 'Seven Hills Country Club', item: 'https://www.lasvegashomesearchexperts.com/seven-hills-country-club/' },
  ],
}

const FAQ_DATA = [
  {
    "q": "What is the price range for homes in Seven Hills Country Club?",
    "a": "Homes in Seven Hills Country Club range from approximately $1.2 million for golf-course residences to over $7 million for custom estates on premium lots with panoramic Strip and mountain views."
  },
  {
    "q": "Is Seven Hills Country Club guard-gated?",
    "a": "Yes. Seven Hills Country Club is fully guard-gated with 24-hour staffed gate and comprehensive security patrols. It is the premier guard-gated community within the Seven Hills master plan."
  },
  {
    "q": "What golf course is at Seven Hills Country Club?",
    "a": "Rio Secco Golf Club, a Rees Jones-designed 18-hole championship course, is the anchor of Seven Hills Country Club. The course features dramatic desert canyon terrain and is home to the world-renowned Butch Harmon School of Golf."
  },
  {
    "q": "What amenities does Rio Secco offer?",
    "a": "Rio Secco Golf Club offers championship golf, fine dining, a full-service spa, fitness center, resort-style pool complex, tennis and pickleball courts, and social event spaces. Both golf and social memberships are available."
  },
  {
    "q": "What ZIP code is Seven Hills Country Club in?",
    "a": "Seven Hills Country Club is in ZIP code 89052 in Henderson, Nevada."
  },
  {
    "q": "What are HOA fees at Seven Hills Country Club?",
    "a": "HOA fees typically range from $400 to $900 per month, covering guard gate staffing, security patrols, the Seven Hills master association fee, and sub-association common area maintenance. Golf club membership is separate."
  },
  {
    "q": "Is golf membership required at Seven Hills Country Club?",
    "a": "Golf membership at Rio Secco is not required for homeownership. Both golf and social memberships are available, allowing residents to choose their level of club participation."
  },
  {
    "q": "How does Seven Hills Country Club compare to MacDonald Highlands?",
    "a": "Seven Hills Country Club offers guard-gated golf living at a generally lower price point than MacDonald Highlands. MacDonald Highlands offers higher elevation, DragonRidge Country Club, and a broader range of ultra-luxury options. Both are premier Henderson golf communities."
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
  name: 'Seven Hills Country Club',
  description: 'Seven Hills Country Club is a guard-gated · golf · luxury community in Henderson, Nevada.',
  geo: { '@type': 'GeoCoordinates', latitude: 36.007, longitude: -115.108 },
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
  const cms = await getCommunityPage('seven-hills-country-club')
  return {
    title: cms?.metaTitle ?? 'Seven Hills Country Club Homes for Sale | Nevada Real Estate Group',
    description: cms?.metaDescription ?? 'Browse Seven Hills Country Club homes for sale in Henderson, NV. $1.2M–$7M+. Schools, HOA, market stats. Nevada Real Estate Group.',
  }
}

export default async function SevenHillsCountryClubPage() {
  const cms = await getCommunityPage('seven-hills-country-club')
  const market = getMarketStats('seven-hills-country-club')
  const ms = market?.stats

  const heroHeadline = cms?.heroHeadline ?? 'Seven Hills Country Club'
  const heroSubtitle = 'Homes for Sale in Henderson, Nevada'
  const overviewTitle = cms?.overviewTitle ?? 'Seven Hills Country Club: Guard-Gated · Golf · Luxury Living in Henderson'

  const HARDCODED_STATS: Array<[string, string] | [string, string, string]> = [
    ['Established', '1999'],
    ['Developer', 'Seven Hills Development'],
    ['Total Acreage', '~250 acres'],
    ['Homes', '~350'],
    ['Median Home Price', ms?.medianSalePrice ?? '$1.2M–$7M+'],
    ['ZIP Codes', '89052'],
    ['Guard-Gated', 'Yes'],
    ['HOA', '$400–$900/mo'],
  ]
  const displayStats = mergeQuickStats(HARDCODED_STATS, cms?.quickStats)
  const HARDCODED_DRIVE_TIMES = [
    {
        "time": "~20 min",
        "destination": "to the Strip",
        "route": "via I-215 → I-15"
    },
    {
        "time": "~20 min",
        "destination": "to Harry Reid Airport",
        "route": "via I-215 West → I-15"
    },
    {
        "time": "~10 min",
        "destination": "to Galleria at Sunset",
        "route": "via Eastern Ave"
    },
    {
        "time": "~10 min",
        "destination": "to St. Rose Pkwy Shopping",
        "route": "via St. Rose Pkwy"
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
          <span>Seven Hills Country Club</span>
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
                <span className="hero-v2-stat-num">{ms?.medianSalePrice ?? qs('Median Home Price', '$1.2M–$7M+')}</span>
                <span className="hero-v2-stat-lbl">Median Sale Price</span>
              </div>
              <div className="hero-v2-stat">
                <span className="hero-v2-stat-num">{ms?.avgDaysToClose ?? qs('Avg Days on Market', '45')}</span>
                <span className="hero-v2-stat-lbl">Avg Days to Close</span>
              </div>
            </div>
            <a href="#listings" className="hero-v2-cta">Search Homes in Seven Hills Country Club</a>
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
              <span><strong>Type:</strong> Guard-Gated · Golf · Luxury</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
              <span><strong>Price Range:</strong> $1.2M–$7M+</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
              <span><strong>HOA:</strong> $400–$900/mo</span>
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
            <h2>Seven Hills Country Club Demographics</h2>
          </div>
          <div className="demo-grid">
            {[
              ['~900', 'Population'],
              ['54', 'Median Age'],
              ['$300,000+', 'Avg Household Income'],
              ['~350', 'Total Households'],
              ['90%', 'Homeownership Rate'],
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
            <h2>Where is Seven Hills Country Club?</h2>
            <p>Seven Hills, Henderson &mdash; Henderson, Nevada.</p>
          </div>
          <div className="map-container">
            <SevenHillsCountryClubMapWrapper />
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
            <h2 className="listings-title">NEW SEVEN HILLS COUNTRY CLUB LISTINGS</h2>
          </div>
          <div className="ylopo-wrap">
            <div className="YLOPO_searchWidget" />
            <div className="YLOPO_resultsWidget" data-search='{"propertyTypes":["house","condo","townhouse"],"minPrice":1200000,"locations":[{"city":"Henderson","state":"NV"}],"limit":12,"sortBy":"listDate","sortOrder":"desc","keywords":"Seven Hills Country Club","zipCodes":["89052"]}' />
          </div>
          <p className="ylopo-note">Listing data sourced from regional MLS. Information deemed reliable but not guaranteed. Updated daily.</p>
          <div className="listings-actions">
            <a href="https://search.nevadarealestategroup.net/search?s[orderBy]=sourceCreationDate%2Cdesc&s[page]=1&s[locations][0][city]=Henderson&s[locations][0][state]=NV&s[keywords]=Seven%20Hills%20Country%20Club" target="_blank" rel="noopener noreferrer" className="btn-gold">View All Seven Hills Country Club Listings &rarr;</a>
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
                  <p>Seven Hills Country Club is the guard-gated golf community at the heart of the Seven Hills master plan in Henderson. Anchored by the acclaimed Rio Secco Golf Club — a Rees Jones-designed championship course that hosted PGA Tour events and serves as home to the Butch Harmon School of Golf — the Country Club area represents the pinnacle of living within Seven Hills.</p>
                  <p>Behind the community's 24-hour staffed guard gate, approximately 350 homes range from elegant golf-course residences to sprawling custom estates. Home sizes span from approximately 3,500 to 10,000+ square feet on lots that rank among the largest in Seven Hills. Architectural styles include Mediterranean, Tuscan, transitional, and contemporary desert-modern, with many original homes having undergone extensive renovations to meet current luxury standards.</p>
                  <p>The golf lifestyle is central to Seven Hills Country Club. Rio Secco's 18-hole championship course winds through dramatic desert canyon terrain with views of the Las Vegas Strip and the surrounding mountains. The club offers fine dining, a full-service spa, fitness facilities, tennis and pickleball courts, and a resort-style pool complex. Social memberships are also available for residents who prefer the club lifestyle without golf.</p>
                  <p>Prices in Seven Hills Country Club range from approximately $1.2 million for golf-course homes to over $7 million for custom estates on premium lots with panoramic Strip and mountain views. The community's combination of guard-gated security, championship golf, custom-home architecture, and Henderson's consistently high safety rankings makes it one of the most sought-after luxury addresses in the Las Vegas Valley.</p>
                </>
              )}
            </div>
            <div className="overview-aside">
              <div className="quick-facts">
                <h3>Seven Hills Country Club At a Glance</h3>
                {displayStats.map(([label, value, cls]: any) => (
                  <div className="fact-row" key={label}>
                    <span className="fact-label">{label}</span>
                    <span className={`fact-value${cls ? ' ' + cls : ''}`}>{value}</span>
                  </div>
                ))}
              </div>
              <div className="cta-card">
                <p>Ready to explore Seven Hills Country Club? Schedule a private tour of the community and the current listings that match your goals.</p>
                <a href="tel:+17252399950" className="btn-gold">Call 725.239.9950</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="highlights">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Why Seven Hills Country Club</span>
            <h2>What Makes Seven Hills Country Club Stand Out</h2>
          </div>
          <div className="highlights-grid">
            {[
              { title: 'Rio Secco Golf Club', body: 'Rees Jones-designed 18-hole championship course with dramatic desert canyon terrain. Home to the Butch Harmon School of Golf. Fine dining, spa, and full club amenities.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 2v10l7 4"/></svg> },
              { title: 'Guard-Gated Security', body: '24-hour staffed guard gate with comprehensive security patrols. One of the most secure luxury golf communities in the Las Vegas Valley.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
              { title: 'Custom Estate Architecture', body: 'Approximately 350 custom and semi-custom homes from 3,500 to 10,000+ square feet. Mediterranean, Tuscan, and contemporary styles with museum-quality finishes.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
              { title: 'Strip & Mountain Views', body: 'Elevated terrain within Seven Hills provides panoramic views of the Las Vegas Strip, the McCullough Range, and Sloan Canyon from many home positions.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M8 21l4-11 4 11"/><path d="M2 21l5-14 4 8"/><path d="M14 15l4-8 4 14"/><line x1="2" y1="21" x2="22" y2="21"/></svg> },
              { title: 'Butch Harmon School of Golf', body: 'The world-renowned Butch Harmon School of Golf operates at Rio Secco, offering instruction that has served PGA Tour professionals and amateurs alike.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><line x1="8" y1="6" x2="8" y2="6.01"/><line x1="12" y1="6" x2="12" y2="6.01"/><line x1="16" y1="6" x2="16" y2="6.01"/><line x1="8" y1="10" x2="8" y2="10.01"/><line x1="12" y1="10" x2="12" y2="10.01"/><line x1="16" y1="10" x2="16" y2="10.01"/><line x1="8" y1="14" x2="8" y2="14.01"/><line x1="12" y1="14" x2="12" y2="14.01"/><line x1="16" y1="14" x2="16" y2="14.01"/></svg> },
              { title: 'Henderson\'s Premier Golf Address', body: 'Seven Hills Country Club is arguably Henderson\'s top golf-community address, combining championship golf, guard-gated security, and custom estates in one package.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg> },
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

      <SevenHillsCountryClubFAQ />

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
              { name: 'Seven Hills', href: '/seven-hills/', price: 'From $500K', compare: 'The broader Seven Hills master plan with diverse neighborhoods at every price point.' },
              { name: 'Terracina', href: '/seven-hills-terracina/', price: 'From $1M', compare: 'Guard-gated luxury enclave within Seven Hills, no golf but premium views.' },
              { name: 'MacDonald Highlands', href: '/macdonald-highlands/', price: 'From $800K', compare: 'Henderson\'s premier luxury community with DragonRidge Country Club and valley views.' },
              { name: 'Anthem Country Club', href: '/anthem-country-club/', price: 'From $1.2M', compare: 'Guard-gated golf community in the Anthem foothills with Hale Irwin course.' },
              { name: 'Southern Highlands', href: '/southern-highlands/', price: 'From $550K', compare: 'Guard-gated golf community in the south valley with Jack Nicklaus course.' },
              { name: 'Red Rock Country Club', href: '/red-rock-country-club/', price: 'From $1.2M', compare: 'Guard-gated golf community in Summerlin with two Arnold Palmer courses.' },
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
              <h2>Ready to Find Your Seven Hills Country Club Home?</h2>
              <p>Nevada Real Estate Group is the #1 real estate team in Nevada. Whether you&apos;re buying or selling in Seven Hills Country Club, let&apos;s talk.</p>
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
                <input type="hidden" name="_subject" value="Seven Hills Country Club Inquiry — LasVegasHomeSearchExperts.com" />
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
