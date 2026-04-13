import LegacyGreenValleyFAQ from '@/components/LegacyGreenValleyFAQ'
import Link from 'next/link'
import type { Metadata } from 'next'
import LegacyGreenValleyMapWrapper from '@/components/LegacyGreenValleyMapWrapper'
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
    { '@type': 'ListItem', position: 3, name: 'Legacy at Green Valley', item: 'https://www.lasvegashomesearchexperts.com/legacy-green-valley/' },
  ],
}

const FAQ_DATA = [
  {
    "q": "What is the price range for homes in Legacy at Green Valley?",
    "a": "Homes in Legacy at Green Valley range from approximately $700,000 for smaller resale homes within the gates to $2.5 million for custom estates on premium golf course lots with mountain views."
  },
  {
    "q": "Is Legacy at Green Valley guard-gated?",
    "a": "Yes. Legacy at Green Valley is a fully guard-gated community with a 24-hour staffed guard gate. It is one of the most established guard-gated communities in Henderson."
  },
  {
    "q": "What golf course is in Legacy at Green Valley?",
    "a": "The Legacy Golf Course is a public championship 18-hole course that winds through the community. Residents enjoy golf course views and proximity without mandatory membership fees."
  },
  {
    "q": "What ZIP codes cover Legacy at Green Valley?",
    "a": "Legacy at Green Valley spans ZIP codes 89014 and 89074 in Henderson, Nevada."
  },
  {
    "q": "Do I need a golf membership to live in Legacy at Green Valley?",
    "a": "No. The Legacy Golf Course is a public course, not a private club. Residents enjoy golf course views and easy access without mandatory membership fees — a significant cost advantage over private club communities."
  },
  {
    "q": "What are HOA fees in Legacy at Green Valley?",
    "a": "HOA fees typically range from $200 to $500 per month, covering 24-hour guard gate staffing, security patrols, common area maintenance, and community landscaping."
  },
  {
    "q": "How does Legacy at Green Valley compare to Anthem Country Club?",
    "a": "Both are guard-gated golf communities in Henderson. Anthem Country Club is newer with a private Hale Irwin course and higher price points ($1.2M+). Legacy at Green Valley is more established with a public course and more accessible pricing starting at $700K."
  },
  {
    "q": "Is Legacy at Green Valley a good investment?",
    "a": "Legacy at Green Valley has been one of Henderson's most stable luxury addresses for over 30 years. The guard gate, golf course, central location, and limited inventory support consistent appreciation and strong resale values."
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
  name: 'Legacy at Green Valley',
  description: 'Legacy at Green Valley is a guard-gated · golf · luxury community in Henderson, Nevada.',
  geo: { '@type': 'GeoCoordinates', latitude: 36.055, longitude: -115.08 },
  address: { '@type': 'PostalAddress', addressLocality: 'Henderson', addressRegion: 'NV', postalCode: '89014', addressCountry: 'US' },
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
  const cms = await getCommunityPage('legacy-green-valley')
  return {
    title: cms?.metaTitle ?? 'Legacy at Green Valley Homes for Sale | Nevada Real Estate Group',
    description: cms?.metaDescription ?? 'Browse Legacy at Green Valley homes for sale in Henderson, NV. $700K–$2.5M. Schools, HOA, market stats. Nevada Real Estate Group.',
  }
}

export default async function LegacyGreenValleyPage() {
  const cms = await getCommunityPage('legacy-green-valley')
  const market = getMarketStats('legacy-green-valley')
  const ms = market?.stats

  const heroHeadline = cms?.heroHeadline ?? 'Legacy at Green Valley'
  const heroSubtitle = 'Homes for Sale in Henderson, Nevada'
  const overviewTitle = cms?.overviewTitle ?? 'Legacy at Green Valley: Guard-Gated · Golf · Luxury Living in Henderson'

  const HARDCODED_STATS: Array<[string, string] | [string, string, string]> = [
    ['Established', '1989'],
    ['Developer', 'American Nevada Corporation'],
    ['Total Acreage', '400 acres'],
    ['Homes', '600+'],
    ['Median Home Price', ms?.medianSalePrice ?? '$700K–$2.5M'],
    ['ZIP Codes', '89014, 89074'],
    ['Guard-Gated', 'Yes'],
    ['HOA', '$200–$500/mo'],
  ]
  const displayStats = mergeQuickStats(HARDCODED_STATS, cms?.quickStats)
  const HARDCODED_DRIVE_TIMES = [
    {
        "time": "~15 min",
        "destination": "to the Strip",
        "route": "via I-215 W → I-15 N"
    },
    {
        "time": "~15 min",
        "destination": "to Harry Reid Airport",
        "route": "via I-215 W"
    },
    {
        "time": "~10 min",
        "destination": "to Henderson Downtown",
        "route": "via Green Valley Pkwy"
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
          <a href="/#communities">Communities</a>
          <span className="breadcrumb-sep">&rsaquo;</span>
          <span>Legacy at Green Valley</span>
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
                <span className="hero-v2-stat-num">{ms?.medianSalePrice ?? qs('Median Home Price', '$700K–$2.5M')}</span>
                <span className="hero-v2-stat-lbl">Median Sale Price</span>
              </div>
              <div className="hero-v2-stat">
                <span className="hero-v2-stat-num">{ms?.avgDaysToClose ?? qs('Avg Days on Market', '45')}</span>
                <span className="hero-v2-stat-lbl">Avg Days to Close</span>
              </div>
            </div>
            <a href="#listings" className="hero-v2-cta">Search Homes in Legacy at Green Valley</a>
          </div>
        </div>
      </header>

      <div className="hero-v2-qfb">
        <div className="container">
          <div className="hero-v2-qfb-row">
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <span><strong>ZIP:</strong> 89014, 89074</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              <span><strong>Type:</strong> Guard-Gated · Golf · Luxury</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
              <span><strong>Price Range:</strong> $700K–$2.5M</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
              <span><strong>HOA:</strong> $200–$500/mo</span>
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
            <h2>Legacy at Green Valley Demographics</h2>
          </div>
          <div className="demo-grid">
            {[
              ['1,800+', 'Population'],
              ['50', 'Median Age'],
              ['$175,000+', 'Avg Household Income'],
              ['600+', 'Total Households'],
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
            <h2>Where is Legacy at Green Valley?</h2>
            <p>Green Valley, Henderson &mdash; Henderson, Nevada.</p>
          </div>
          <div className="map-container">
            <LegacyGreenValleyMapWrapper />
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
            <h2 className="listings-title">NEW LEGACY AT GREEN VALLEY LISTINGS</h2>
          </div>
          <div className="ylopo-wrap">
            <div className="YLOPO_searchWidget" />
            <div className="YLOPO_resultsWidget" data-search='{"propertyTypes":["house","condo","townhouse"],"minPrice":700000,"locations":[{"city":"Henderson","state":"NV"}],"limit":12,"sortBy":"listDate","sortOrder":"desc","keywords":"Legacy Green Valley","zipCodes":["89014","89074"]}' />
          </div>
          <p className="ylopo-note">Listing data sourced from regional MLS. Information deemed reliable but not guaranteed. Updated daily.</p>
          <div className="listings-actions">
            <a href="https://search.nevadarealestategroup.net/search?s[orderBy]=sourceCreationDate%2Cdesc&s[page]=1&s[locations][0][city]=Henderson&s[locations][0][state]=NV&s[keywords]=Legacy%20Green%20Valley" target="_blank" rel="noopener noreferrer" className="btn-gold">View All Legacy at Green Valley Listings &rarr;</a>
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
                  <p>Legacy at Green Valley is a guard-gated luxury community centered around the Legacy Golf Course in the heart of Henderson's Green Valley. One of Henderson's original premium addresses, the community combines mature landscaping, custom estate lots, and direct golf course frontage with 24-hour guard-gated security — a combination that has kept Legacy at Green Valley among the most sought-after addresses in the Green Valley area for over three decades.</p>
                  <p>Homes in Legacy at Green Valley range from approximately $700,000 for smaller resale homes within the gates to $2.5 million for custom estates on premium golf course lots. The housing stock includes semi-custom homes from the original development period as well as custom-built estates that occupy the largest lots along the fairways. Homes typically range from 2,500 to 6,000+ square feet, with many featuring resort-style pools, outdoor kitchens, and views of the golf course and surrounding mountains.</p>
                  <p>The Legacy Golf Course itself is a public championship course that has been a Henderson landmark since 1989. The course winds through the community, creating lush green corridors between neighborhoods. While the course is open to public play, residents of Legacy at Green Valley enjoy the unique benefit of living on the course without the mandatory membership fees that private club communities require.</p>
                  <p>Location elevates Legacy at Green Valley above many Henderson luxury alternatives. The community sits near the intersection of Green Valley Parkway and Warm Springs Road, placing residents within 10 minutes of Downtown Henderson, 15 minutes of Harry Reid International Airport, and 15 minutes of the Las Vegas Strip. The District at Green Valley Ranch, Henderson's premier shopping and dining destination, is minutes away. For luxury buyers who want guard-gated golf living with genuine convenience, Legacy at Green Valley delivers a combination that few Henderson communities can match.</p>
                </>
              )}
            </div>
            <div className="overview-aside">
              <div className="quick-facts">
                <h3>Legacy at Green Valley At a Glance</h3>
                {displayStats.map(([label, value, cls]: any) => (
                  <div className="fact-row" key={label}>
                    <span className="fact-label">{label}</span>
                    <span className={`fact-value${cls ? ' ' + cls : ''}`}>{value}</span>
                  </div>
                ))}
              </div>
              <div className="cta-card">
                <p>Ready to explore Legacy at Green Valley? Schedule a private tour of the community and the current listings that match your goals.</p>
                <a href="tel:+17252399950" className="btn-gold">Call 725.239.9950</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="highlights">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Why Legacy at Green Valley</span>
            <h2>What Makes Legacy at Green Valley Stand Out</h2>
          </div>
          <div className="highlights-grid">
            {[
              { title: 'Guard-Gated Golf Community', body: '24-hour staffed guard gate with direct access to the Legacy Golf Course — one of Henderson\'s premier championship courses winding through the community.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 2v10l7 4"/></svg> },
              { title: '24-Hour Security', body: 'Staffed guard gate with comprehensive security presence. One of the most established guard-gated communities in Henderson with over three decades of secure residential living.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
              { title: 'Custom Estate Lots', body: 'Spacious lots supporting homes from 2,500 to 6,000+ sq ft. Many feature resort-style pools, outdoor kitchens, and direct golf course frontage.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
              { title: 'Mature, Established Character', body: 'Over 30 years of growth have created mature tree-lined streets, established landscaping, and a community character that newer developments cannot replicate.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22c4-4 8-7.5 8-12a8 8 0 10-16 0c0 4.5 4 8 8 12z"/><circle cx="12" cy="10" r="3"/></svg> },
              { title: 'Central Henderson Location', body: '10 minutes to Downtown Henderson, 15 minutes to the Strip and airport. The District at Green Valley Ranch shopping and dining is minutes away.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><line x1="8" y1="6" x2="8" y2="6.01"/><line x1="12" y1="6" x2="12" y2="6.01"/><line x1="16" y1="6" x2="16" y2="6.01"/><line x1="8" y1="10" x2="8" y2="10.01"/><line x1="12" y1="10" x2="12" y2="10.01"/><line x1="16" y1="10" x2="16" y2="10.01"/><line x1="8" y1="14" x2="8" y2="14.01"/><line x1="12" y1="14" x2="12" y2="14.01"/><line x1="16" y1="14" x2="16" y2="14.01"/></svg> },
              { title: 'No Mandatory Golf Membership', body: 'The Legacy Golf Course is a public course — residents enjoy golf course living and views without mandatory membership fees, keeping ongoing costs lower than private club communities.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg> },
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

      <LegacyGreenValleyFAQ />

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
              { name: 'Green Valley North', href: '/green-valley-north/', price: 'From $400K', compare: 'The original Green Valley neighborhood surrounding the Legacy Golf Course. More accessible pricing.' },
              { name: 'Green Valley South', href: '/green-valley-south/', price: 'From $350K', compare: 'The broader southern Green Valley area with diverse housing from townhomes to luxury estates.' },
              { name: 'The Fountains', href: '/the-fountains/', price: 'From $800K', compare: 'Guard-gated luxury enclave nearby with custom estate homes and higher price ceiling.' },
              { name: 'Quail Ridge Estates', href: '/quail-ridge-estates/', price: 'From $1M', compare: 'Guard-gated luxury community with custom homes on larger lots. Higher price points.' },
              { name: 'Anthem Country Club', href: '/anthem-country-club/', price: 'From $1.2M', compare: 'Guard-gated private golf community in Anthem. Newer with private Hale Irwin course.' },
              { name: 'Seven Hills', href: '/seven-hills/', price: 'From $500K', compare: 'Established Henderson community with Rio Secco golf and 25 distinct neighborhoods.' },
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
              <h2>Ready to Find Your Legacy at Green Valley Home?</h2>
              <p>Nevada Real Estate Group is the #1 real estate team in Nevada. Whether you&apos;re buying or selling in Legacy at Green Valley, let&apos;s talk.</p>
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
                <input type="hidden" name="_subject" value="Legacy at Green Valley Inquiry — LasVegasHomeSearchExperts.com" />
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
