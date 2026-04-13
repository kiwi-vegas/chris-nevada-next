import SkyvuFAQ from '@/components/SkyvuFAQ'
import Link from 'next/link'
import type { Metadata } from 'next'
import SkyvuMapWrapper from '@/components/SkyvuMapWrapper'
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
    { '@type': 'ListItem', position: 3, name: 'SkyVu', item: 'https://www.lasvegashomesearchexperts.com/skyvu/' },
  ],
}

const FAQ_DATA = [
  {
    "q": "What is the price range for homes in SkyVu?",
    "a": "Homes in SkyVu range from approximately $800,000 for smaller floor plans to over $2 million for premium view lots with extensive upgrades and rooftop decks."
  },
  {
    "q": "Is SkyVu guard-gated?",
    "a": "SkyVu is located within the MacDonald Highlands community, which has guard-gated access. SkyVu itself does not have a separate gate — it benefits from MacDonald Highlands' broader security infrastructure."
  },
  {
    "q": "What makes SkyVu different from other MacDonald Highlands communities?",
    "a": "SkyVu is the most accessible entry point into MacDonald Highlands, with production luxury homes starting at $800K versus the $2M–$15M+ required for custom communities like Dragon Rock. SkyVu is also architecturally distinct with its modern desert contemporary design and rooftop decks."
  },
  {
    "q": "What ZIP code is SkyVu in?",
    "a": "SkyVu is located in ZIP code 89012 in Henderson, Nevada, within the MacDonald Highlands community."
  },
  {
    "q": "Can SkyVu residents join DragonRidge Country Club?",
    "a": "Yes. As MacDonald Highlands residents, SkyVu homeowners can apply for membership at DragonRidge Country Club, which offers championship golf, dining, fitness, and social programming. Membership is not mandatory."
  },
  {
    "q": "What are HOA fees in SkyVu?",
    "a": "HOA fees in SkyVu typically range from $200 to $400 per month, covering the MacDonald Highlands master community association fees, common area maintenance, and community infrastructure."
  },
  {
    "q": "Do SkyVu homes have rooftop decks?",
    "a": "Many SkyVu homes feature rooftop decks as an optional or included amenity, offering 360-degree panoramic views of the Las Vegas Valley, the Strip, and the surrounding mountains. It's one of the community's signature features."
  },
  {
    "q": "Is SkyVu a good investment?",
    "a": "SkyVu benefits from the MacDonald Highlands address, modern architecture that appeals to today's luxury buyers, and an accessible price point relative to the broader community. The combination of views, design, and location has driven strong appreciation since the community's 2016 debut."
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
  name: 'SkyVu',
  description: 'SkyVu is a luxury · contemporary · views community in Henderson, Nevada.',
  geo: { '@type': 'GeoCoordinates', latitude: 36.015, longitude: -114.975 },
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
  const cms = await getCommunityPage('skyvu')
  return {
    title: cms?.metaTitle ?? 'SkyVu Homes for Sale | Nevada Real Estate Group',
    description: cms?.metaDescription ?? 'Browse SkyVu homes for sale in Henderson, NV. $800K–$2M+. Schools, HOA, market stats. Nevada Real Estate Group.',
  }
}

export default async function SkyvuPage() {
  const cms = await getCommunityPage('skyvu')
  const market = getMarketStats('skyvu')
  const ms = market?.stats

  const heroHeadline = cms?.heroHeadline ?? 'SkyVu'
  const heroSubtitle = 'Homes for Sale in Henderson, Nevada'
  const overviewTitle = cms?.overviewTitle ?? 'SkyVu: Luxury · Contemporary · Views Living in Henderson'

  const HARDCODED_STATS: Array<[string, string] | [string, string, string]> = [
    ['Established', '2016'],
    ['Developer', 'William Lyon Homes / Taylor Morrison'],
    ['Total Acreage', '80 acres'],
    ['Homes', '200+'],
    ['Median Home Price', ms?.medianSalePrice ?? '$800K–$2M+'],
    ['ZIP Codes', '89012'],
    ['Guard-Gated', 'No'],
    ['HOA', '$200–$400/mo'],
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
          <span>SkyVu</span>
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
                <span className="hero-v2-stat-num">{ms?.medianSalePrice ?? qs('Median Home Price', '$800K–$2M+')}</span>
                <span className="hero-v2-stat-lbl">Median Sale Price</span>
              </div>
              <div className="hero-v2-stat">
                <span className="hero-v2-stat-num">{ms?.avgDaysToClose ?? qs('Avg Days on Market', '45')}</span>
                <span className="hero-v2-stat-lbl">Avg Days to Close</span>
              </div>
            </div>
            <a href="#listings" className="hero-v2-cta">Search Homes in SkyVu</a>
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
              <span><strong>Type:</strong> Luxury · Contemporary · Views</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
              <span><strong>Price Range:</strong> $800K–$2M+</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
              <span><strong>HOA:</strong> $200–$400/mo</span>
            </div>
          </div>
          <div className="hero-v2-qfb-est">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            <span>Est. 2016</span>
          </div>
        </div>
      </div>

      <section id="demographics" className="demographics-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Demographics</span>
            <h2>SkyVu Demographics</h2>
          </div>
          <div className="demo-grid">
            {[
              ['600+', 'Population'],
              ['45', 'Median Age'],
              ['$200,000+', 'Avg Household Income'],
              ['200+', 'Total Households'],
              ['85%', 'Homeownership Rate'],
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
            <h2>Where is SkyVu?</h2>
            <p>MacDonald Highlands, Henderson &mdash; Henderson, Nevada.</p>
          </div>
          <div className="map-container">
            <SkyvuMapWrapper />
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
            <h2 className="listings-title">NEW SKYVU LISTINGS</h2>
          </div>
          <div className="ylopo-wrap">
            <div className="YLOPO_searchWidget" />
            <div className="YLOPO_resultsWidget" data-search='{"propertyTypes":["house","condo","townhouse"],"minPrice":800000,"locations":[{"city":"Henderson","state":"NV"}],"limit":12,"sortBy":"listDate","sortOrder":"desc","keywords":"SkyVu MacDonald Highlands","zipCodes":["89012"]}' />
          </div>
          <p className="ylopo-note">Listing data sourced from regional MLS. Information deemed reliable but not guaranteed. Updated daily.</p>
          <div className="listings-actions">
            <a href="https://search.nevadarealestategroup.net/search?s[orderBy]=sourceCreationDate%2Cdesc&s[page]=1&s[locations][0][city]=Henderson&s[locations][0][state]=NV&s[keywords]=SkyVu%20MacDonald%20Highlands" target="_blank" rel="noopener noreferrer" className="btn-gold">View All SkyVu Listings &rarr;</a>
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
                  <p>SkyVu is a luxury residential community within MacDonald Highlands in Henderson, known for its modern desert contemporary architecture and panoramic views of the Las Vegas Valley. Developed by William Lyon Homes (now Taylor Morrison) beginning in 2016, SkyVu introduced a new generation of production luxury homes to MacDonald Highlands — offering the elevated views and prestige of the MacDonald Highlands address at price points significantly below the custom estates in Dragon Rock and the community's other ultra-luxury enclaves.</p>
                  <p>Homes in SkyVu range from approximately $800,000 for smaller floor plans to over $2 million for premium view lots with upgrades. The community features several distinct floor plans ranging from approximately 2,500 to 5,000 square feet, all designed with contemporary desert aesthetics — clean lines, flat rooflines, floor-to-ceiling windows, and expansive great rooms that open to covered outdoor living spaces framing the valley and Strip views.</p>
                  <p>SkyVu's architectural character is decisively modern, distinguishing it from the more traditional Mediterranean and Tuscan styles found in older Henderson luxury communities. The homes were designed to maximize natural light and capitalize on the dramatic views that MacDonald Highlands' elevated terrain provides. Many homes feature rooftop decks, a relatively rare amenity in Las Vegas that SkyVu helped popularize, offering 360-degree views for entertaining.</p>
                  <p>As a community within MacDonald Highlands, SkyVu residents benefit from the broader community's guard-gated security perimeter and can apply for membership at DragonRidge Country Club. The community offers a more accessible entry point into MacDonald Highlands than custom-lot communities like Dragon Rock, Cresta Rosa, or the Vu Residences, making it attractive to executives, young professionals, and luxury-minded families who want the MacDonald Highlands lifestyle without a multi-million-dollar commitment.</p>
                </>
              )}
            </div>
            <div className="overview-aside">
              <div className="quick-facts">
                <h3>SkyVu At a Glance</h3>
                {displayStats.map(([label, value, cls]: any) => (
                  <div className="fact-row" key={label}>
                    <span className="fact-label">{label}</span>
                    <span className={`fact-value${cls ? ' ' + cls : ''}`}>{value}</span>
                  </div>
                ))}
              </div>
              <div className="cta-card">
                <p>Ready to explore SkyVu? Schedule a private tour of the community and the current listings that match your goals.</p>
                <a href="tel:+17252399950" className="btn-gold">Call 725.239.9950</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="highlights">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Why SkyVu</span>
            <h2>What Makes SkyVu Stand Out</h2>
          </div>
          <div className="highlights-grid">
            {[
              { title: 'Modern Desert Architecture', body: 'Contemporary design throughout — clean lines, flat rooflines, floor-to-ceiling glass, and open great rooms. One of the most architecturally modern communities in Henderson.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
              { title: 'Panoramic Strip & Valley Views', body: 'MacDonald Highlands\' elevated terrain provides panoramic views of the Las Vegas Valley and Strip skyline from most homesites. Views are the defining feature.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M8 21l4-11 4 11"/><path d="M2 21l5-14 4 8"/><path d="M14 15l4-8 4 14"/><line x1="2" y1="21" x2="22" y2="21"/></svg> },
              { title: 'MacDonald Highlands Address', body: 'Located within the MacDonald Highlands guard-gated community, benefiting from the broader community\'s security infrastructure and prestige.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
              { title: 'Rooftop Decks', body: 'Many SkyVu homes feature rooftop decks — a distinctive amenity offering 360-degree panoramic views for entertaining. Relatively rare in Las Vegas.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
              { title: 'DragonRidge Club Access', body: 'MacDonald Highlands residents can apply for membership at DragonRidge Country Club — championship golf, fine dining, fitness, and an active social calendar.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 2v10l7 4"/></svg> },
              { title: 'Accessible Luxury Entry Point', body: 'Starting from $800K, SkyVu offers the most accessible entry point into MacDonald Highlands — well below the $2M+ required for custom-lot communities.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg> },
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

      <SkyvuFAQ />

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
              { name: 'MacDonald Highlands', href: '/macdonald-highlands/', price: 'From $800K', compare: 'The broader luxury community surrounding SkyVu with DragonRidge Country Club.' },
              { name: 'Vu Residences', href: '/vu-residences/', price: 'From $1M', compare: 'Another MacDonald Highlands community with larger homes and higher price points.' },
              { name: 'Dragon Rock', href: '/dragon-rock/', price: 'From $5M', compare: 'MacDonald Highlands\' ultra-luxury custom enclave. The highest tier of Henderson luxury.' },
              { name: 'Foothills at MacDonald Ranch', href: '/foothills-at-macdonald-ranch/', price: 'From $1M', compare: 'Guard-gated luxury community adjacent with golf views and larger lots.' },
              { name: 'Ascaya', href: '/ascaya/', price: 'From $3M', compare: 'Ultra-luxury custom lot community on the adjacent ridgeline.' },
              { name: 'Seven Hills', href: '/seven-hills/', price: 'From $500K', compare: 'Established Henderson community with Rio Secco golf and 25 neighborhoods.' },
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
              <h2>Ready to Find Your SkyVu Home?</h2>
              <p>Nevada Real Estate Group is the #1 real estate team in Nevada. Whether you&apos;re buying or selling in SkyVu, let&apos;s talk.</p>
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
                <input type="hidden" name="_subject" value="SkyVu Inquiry — LasVegasHomeSearchExperts.com" />
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
