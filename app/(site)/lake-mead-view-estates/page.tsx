import LakeMeadViewEstatesFAQ from '@/components/LakeMeadViewEstatesFAQ'
import Link from 'next/link'
import type { Metadata } from 'next'
import LakeMeadViewEstatesMapWrapper from '@/components/LakeMeadViewEstatesMapWrapper'
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
    { '@type': 'ListItem', position: 3, name: 'Lake Mead View Estates', item: 'https://www.lasvegashomesearchexperts.com/lake-mead-view-estates/' },
  ],
}

const FAQ_DATA = [
  {
    "q": "What is the price range for homes in Lake Mead View Estates?",
    "a": "Homes in Lake Mead View Estates range from approximately $600,000 for updated resale homes to over $2 million for larger custom estates on premium lots with direct Lake Mead and mountain views."
  },
  {
    "q": "What views do Lake Mead View Estates homes have?",
    "a": "Many homes enjoy panoramic views of Lake Mead, the River Mountains, and the surrounding desert terrain. East-facing lots provide dramatic sunrise views over the lake."
  },
  {
    "q": "What ZIP code is Lake Mead View Estates in?",
    "a": "Lake Mead View Estates is located in ZIP code 89011 in Henderson, Nevada, in the Lake Las Vegas corridor."
  },
  {
    "q": "Is Lake Mead View Estates guard-gated?",
    "a": "Lake Mead View Estates is not a guard-gated community, though some individual neighborhoods or sections within the area may have controlled access. The nearby Lake Las Vegas community does have gated sections."
  },
  {
    "q": "How far is Lake Mead View Estates from the Strip?",
    "a": "Lake Mead View Estates is approximately 30 minutes from the Las Vegas Strip via Lake Mead Parkway and I-215/I-15. Henderson's shops and restaurants are closer at 15-20 minutes."
  },
  {
    "q": "What recreation is nearby?",
    "a": "Lake Mead National Recreation Area is minutes away for boating, fishing, and hiking. Lake Las Vegas provides kayaking, paddleboarding, lakefront dining, and two championship golf courses. Boulder City's historic downtown is a short drive south."
  },
  {
    "q": "What are HOA fees in Lake Mead View Estates?",
    "a": "HOA fees typically range from $150 to $350 per month, covering common area maintenance, landscaping of shared spaces, and community infrastructure."
  },
  {
    "q": "What schools serve Lake Mead View Estates?",
    "a": "The area is served by CCSD schools including Elise L. Wolff Elementary (8/10), Jack Lund Schofield Middle School, and Basic High School. Private options include Henderson International School."
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
  name: 'Lake Mead View Estates',
  description: 'Lake Mead View Estates is a luxury · lake views community in Henderson, Nevada.',
  geo: { '@type': 'GeoCoordinates', latitude: 36.1, longitude: -114.93 },
  address: { '@type': 'PostalAddress', addressLocality: 'Henderson', addressRegion: 'NV', postalCode: '89011', addressCountry: 'US' },
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
  const cms = await getCommunityPage('lake-mead-view-estates')
  return {
    title: cms?.metaTitle ?? 'Lake Mead View Estates Homes for Sale | Nevada Real Estate Group',
    description: cms?.metaDescription ?? 'Browse Lake Mead View Estates homes for sale in Henderson, NV. $600K–$2M+. Schools, HOA, market stats. Nevada Real Estate Group.',
  }
}

export default async function LakeMeadViewEstatesPage() {
  const cms = await getCommunityPage('lake-mead-view-estates')
  const market = getMarketStats('lake-mead-view-estates')
  const ms = market?.stats

  const heroHeadline = cms?.heroHeadline ?? 'Lake Mead View Estates'
  const heroSubtitle = 'Homes for Sale in Henderson, Nevada'
  const overviewTitle = cms?.overviewTitle ?? 'Lake Mead View Estates: Luxury · Lake Views Living in Henderson'

  const HARDCODED_STATS: Array<[string, string] | [string, string, string]> = [
    ['Established', '2004'],
    ['Developer', 'Various Builders'],
    ['Total Acreage', '~200 acres'],
    ['Homes', '~300'],
    ['Median Home Price', ms?.medianSalePrice ?? '$600K–$2M+'],
    ['ZIP Codes', '89011'],
    ['Guard-Gated', 'No'],
    ['HOA', '$150–$350/mo'],
  ]
  const displayStats = mergeQuickStats(HARDCODED_STATS, cms?.quickStats)
  const HARDCODED_DRIVE_TIMES = [
    {
        "time": "~30 min",
        "destination": "to the Strip",
        "route": "via Lake Mead Pkwy → I-215 → I-15"
    },
    {
        "time": "~10 min",
        "destination": "to Lake Las Vegas Village",
        "route": "via Lake Las Vegas Pkwy"
    },
    {
        "time": "~15 min",
        "destination": "to Lake Mead Marina",
        "route": "via Lake Mead Dr East"
    },
    {
        "time": "~30 min",
        "destination": "to Harry Reid Airport",
        "route": "via Lake Mead Pkwy → I-215"
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
          <span>Lake Mead View Estates</span>
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
                <span className="hero-v2-stat-num">{ms?.medianSalePrice ?? qs('Median Home Price', '$600K–$2M+')}</span>
                <span className="hero-v2-stat-lbl">Median Sale Price</span>
              </div>
              <div className="hero-v2-stat">
                <span className="hero-v2-stat-num">{ms?.avgDaysToClose ?? qs('Avg Days on Market', '45')}</span>
                <span className="hero-v2-stat-lbl">Avg Days to Close</span>
              </div>
            </div>
            <a href="#listings" className="hero-v2-cta">Search Homes in Lake Mead View Estates</a>
          </div>
        </div>
      </header>

      <div className="hero-v2-qfb">
        <div className="container">
          <div className="hero-v2-qfb-row">
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <span><strong>ZIP:</strong> 89011</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              <span><strong>Type:</strong> Luxury · Lake Views</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
              <span><strong>Price Range:</strong> $600K–$2M+</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
              <span><strong>HOA:</strong> $150–$350/mo</span>
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
            <h2>Lake Mead View Estates Demographics</h2>
          </div>
          <div className="demo-grid">
            {[
              ['~800', 'Population'],
              ['50', 'Median Age'],
              ['$140,000', 'Avg Household Income'],
              ['~300', 'Total Households'],
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
            <h2>Where is Lake Mead View Estates?</h2>
            <p>Henderson / Lake Las Vegas, Nevada &mdash; Henderson, Nevada.</p>
          </div>
          <div className="map-container">
            <LakeMeadViewEstatesMapWrapper />
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
            <h2 className="listings-title">NEW LAKE MEAD VIEW ESTATES LISTINGS</h2>
          </div>
          <div className="ylopo-wrap">
            <div className="YLOPO_searchWidget" />
            <div className="YLOPO_resultsWidget" data-search='{"propertyTypes":["house","condo","townhouse"],"minPrice":600000,"locations":[{"city":"Henderson","state":"NV"}],"limit":12,"sortBy":"listDate","sortOrder":"desc","keywords":"Lake Mead View Estates","zipCodes":["89011"]}' />
          </div>
          <p className="ylopo-note">Listing data sourced from regional MLS. Information deemed reliable but not guaranteed. Updated daily.</p>
          <div className="listings-actions">
            <a href="https://search.nevadarealestategroup.net/search?s[orderBy]=sourceCreationDate%2Cdesc&s[page]=1&s[locations][0][city]=Henderson&s[locations][0][state]=NV&s[keywords]=Lake%20Mead%20View%20Estates" target="_blank" rel="noopener noreferrer" className="btn-gold">View All Lake Mead View Estates Listings &rarr;</a>
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
                  <p>Lake Mead View Estates occupies one of the most visually striking positions in the Henderson foothills, offering panoramic views of Lake Mead, the River Mountains, and the surrounding desert terrain. Located in the greater Lake Las Vegas corridor east of Henderson, this residential enclave provides a quieter, more spacious alternative to the denser communities closer to the Las Vegas Valley core.</p>
                  <p>Developed primarily in the mid-2000s, Lake Mead View Estates features custom and semi-custom homes on larger-than-average lots, many exceeding a quarter acre. The elevated terrain means most homes enjoy unobstructed sightlines — sunrise views over Lake Mead to the east and mountain panoramas in every direction. Architecture ranges from Mediterranean and Tuscan-inspired designs to contemporary desert-modern styles.</p>
                  <p>The community benefits from its proximity to the Lake Las Vegas resort community, which offers residents access to lakefront dining, the Westin Lake Las Vegas resort, the Village at Lake Las Vegas shopping area, kayaking and paddleboarding on the private lake, and two championship golf courses. Lake Mead National Recreation Area is just minutes away, providing boating, fishing, hiking, and scenic drives.</p>
                  <p>Homes in Lake Mead View Estates range from approximately $600,000 for updated resale homes to well over $2 million for larger custom estates on premium view lots. The area attracts buyers seeking space, privacy, and natural beauty while remaining within a 30-minute drive of the Strip, Harry Reid International Airport, and Henderson's full complement of shopping, dining, and medical services.</p>
                </>
              )}
            </div>
            <div className="overview-aside">
              <div className="quick-facts">
                <h3>Lake Mead View Estates At a Glance</h3>
                {displayStats.map(([label, value, cls]: any) => (
                  <div className="fact-row" key={label}>
                    <span className="fact-label">{label}</span>
                    <span className={`fact-value${cls ? ' ' + cls : ''}`}>{value}</span>
                  </div>
                ))}
              </div>
              <div className="cta-card">
                <p>Ready to explore Lake Mead View Estates? Schedule a private tour of the community and the current listings that match your goals.</p>
                <a href="tel:+17252399950" className="btn-gold">Call 725.239.9950</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="highlights">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Why Lake Mead View Estates</span>
            <h2>What Makes Lake Mead View Estates Stand Out</h2>
          </div>
          <div className="highlights-grid">
            {[
              { title: 'Lake Mead Panoramas', body: 'Elevated terrain provides sweeping views of Lake Mead, the River Mountains, and surrounding desert. Many homes enjoy sunrise views over the lake that are among the most dramatic in the valley.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M8 21l4-11 4 11"/><path d="M2 21l5-14 4 8"/><path d="M14 15l4-8 4 14"/><line x1="2" y1="21" x2="22" y2="21"/></svg> },
              { title: 'Larger Lot Sizes', body: 'Lots in Lake Mead View Estates are larger than typical Las Vegas subdivisions, with many exceeding a quarter acre. This provides more privacy, space, and room for pools, outdoor kitchens, and landscaping.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
              { title: 'Lake Las Vegas Access', body: 'Minutes from the Lake Las Vegas resort community with lakefront dining, resort amenities, championship golf, kayaking, paddleboarding, and the Village at Lake Las Vegas shopping area.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22c4-4 8-7.5 8-12a8 8 0 10-16 0c0 4.5 4 8 8 12z"/><circle cx="12" cy="10" r="3"/></svg> },
              { title: 'Lake Mead Recreation', body: 'Lake Mead National Recreation Area is just minutes east, offering boating, fishing, hiking, scenic drives, and access to one of the largest man-made lakes in North America.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><line x1="8" y1="6" x2="8" y2="6.01"/><line x1="12" y1="6" x2="12" y2="6.01"/><line x1="16" y1="6" x2="16" y2="6.01"/><line x1="8" y1="10" x2="8" y2="10.01"/><line x1="12" y1="10" x2="12" y2="10.01"/><line x1="16" y1="10" x2="16" y2="10.01"/><line x1="8" y1="14" x2="8" y2="14.01"/><line x1="12" y1="14" x2="12" y2="14.01"/><line x1="16" y1="14" x2="16" y2="14.01"/></svg> },
              { title: 'Custom Home Opportunities', body: 'A mix of custom and semi-custom homes with diverse architectural styles. Some vacant lots remain for buyers seeking to build a fully custom home on a premium view lot.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
              { title: 'Value Relative to Luxury', body: 'Lake Mead View Estates offers luxury-caliber views and lot sizes at a fraction of the cost of comparable properties in Summerlin or MacDonald Highlands.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg> },
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

      <LakeMeadViewEstatesFAQ />

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
              { name: 'Lake Las Vegas', href: '/lake-las-vegas/', price: 'From $400K', compare: 'The adjacent resort community with lakefront living, championship golf, and the Village shopping area.' },
              { name: 'MacDonald Highlands', href: '/macdonald-highlands/', price: 'From $800K', compare: 'Henderson\'s premier luxury community with DragonRidge Country Club and panoramic valley views.' },
              { name: 'Anthem', href: '/anthem/', price: 'From $400K', compare: 'Henderson\'s largest master-planned community with guard-gated options and mountain views.' },
              { name: 'Ascaya', href: '/ascaya/', price: 'From $3M', compare: 'Ultra-luxury custom lot community on the McCullough Range ridgeline in Henderson.' },
              { name: 'Calico Ridge', href: '/calico-ridge/', price: 'From $500K', compare: 'Henderson foothills community with mountain views and proximity to Lake Mead.' },
              { name: 'Seven Hills', href: '/seven-hills/', price: 'From $500K', compare: 'Guard-gated Henderson community with Rio Secco golf and Strip views.' },
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
              <h2>Ready to Find Your Lake Mead View Estates Home?</h2>
              <p>Nevada Real Estate Group is the #1 real estate team in Nevada. Whether you&apos;re buying or selling in Lake Mead View Estates, let&apos;s talk.</p>
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
                <input type="hidden" name="_subject" value="Lake Mead View Estates Inquiry — LasVegasHomeSearchExperts.com" />
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
