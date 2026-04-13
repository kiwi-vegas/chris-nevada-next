import ThePalisadesSummerlinFAQ from '@/components/ThePalisadesSummerlinFAQ'
import Link from 'next/link'
import type { Metadata } from 'next'
import ThePalisadesSummerlinMapWrapper from '@/components/ThePalisadesSummerlinMapWrapper'
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
    { '@type': 'ListItem', position: 3, name: 'The Palisades', item: 'https://www.lasvegashomesearchexperts.com/the-palisades-summerlin/' },
  ],
}

const FAQ_DATA = [
  {
    "q": "What is the price range for homes in The Palisades?",
    "a": "Homes in The Palisades range from approximately $1 million for semi-custom homes to $4 million for premium custom estates on elevated lots with panoramic Red Rock Canyon views."
  },
  {
    "q": "Is The Palisades guard-gated?",
    "a": "Yes. The Palisades is a guard-gated community with a 24-hour staffed guard gate. Approximately 160 homes across 90 acres create a low-density, private environment."
  },
  {
    "q": "What village is The Palisades in?",
    "a": "The Palisades is located within The Canyons village of the Summerlin North Association, alongside other guard-gated enclaves like Bellacere, Eagle Rock, and Aventura."
  },
  {
    "q": "What ZIP code is The Palisades in?",
    "a": "The Palisades is located in ZIP code 89144 in the Summerlin North area of Las Vegas."
  },
  {
    "q": "What views do homes in The Palisades have?",
    "a": "The Palisades features elevated, west-facing lots with sweeping views of Red Rock Canyon and the Spring Mountains. Northern lots also capture Las Vegas Valley views. The sunset views are among the best in Summerlin."
  },
  {
    "q": "What are HOA fees in The Palisades?",
    "a": "HOA fees typically range from $400 to $900 per month, covering the Summerlin master association fee plus the Palisades sub-association fee for guard gate staffing, security patrols, and community maintenance."
  },
  {
    "q": "What schools serve The Palisades?",
    "a": "The Palisades is zoned for CCSD schools including Sig Rogich Middle School (10/10 GreatSchools) and Palo Verde High School (8/10). Private options include The Meadows School (A+) and Bishop Gorman High School (A+)."
  },
  {
    "q": "How does The Palisades compare to Eagle Rock?",
    "a": "Both are guard-gated luxury communities in The Canyons with similar price ranges ($1M–$4M). The Palisades is known for its west-facing sunset views, while Eagle Rock offers a slightly different view orientation. Both deliver comparable quality and exclusivity."
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
  name: 'The Palisades',
  description: 'The Palisades is a guard-gated · luxury community in Las Vegas, Nevada.',
  geo: { '@type': 'GeoCoordinates', latitude: 36.202, longitude: -115.292 },
  address: { '@type': 'PostalAddress', addressLocality: 'Las Vegas', addressRegion: 'NV', postalCode: '89144', addressCountry: 'US' },
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
  const cms = await getCommunityPage('the-palisades-summerlin')
  return {
    title: cms?.metaTitle ?? 'The Palisades Homes for Sale | Nevada Real Estate Group',
    description: cms?.metaDescription ?? 'Browse The Palisades homes for sale in Las Vegas, NV. $1M–$4M. Schools, HOA, market stats. Nevada Real Estate Group.',
  }
}

export default async function ThePalisadesSummerlinPage() {
  const cms = await getCommunityPage('the-palisades-summerlin')
  const market = getMarketStats('the-palisades-summerlin')
  const ms = market?.stats

  const heroHeadline = cms?.heroHeadline ?? 'The Palisades'
  const heroSubtitle = 'Homes for Sale in Las Vegas, Nevada'
  const overviewTitle = cms?.overviewTitle ?? 'The Palisades: Guard-Gated · Luxury Living in Las Vegas'

  const HARDCODED_STATS: Array<[string, string] | [string, string, string]> = [
    ['Established', '2002'],
    ['Developer', 'Howard Hughes Corporation'],
    ['Total Acreage', '90 acres'],
    ['Homes', '160+'],
    ['Median Home Price', ms?.medianSalePrice ?? '$1M–$4M'],
    ['ZIP Codes', '89144'],
    ['Guard-Gated', 'Yes'],
    ['HOA', '$400–$900/mo'],
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
        "route": "via W Sahara Ave"
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
          <span>The Palisades</span>
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
                <span className="hero-v2-stat-num">{ms?.medianSalePrice ?? qs('Median Home Price', '$1M–$4M')}</span>
                <span className="hero-v2-stat-lbl">Median Sale Price</span>
              </div>
              <div className="hero-v2-stat">
                <span className="hero-v2-stat-num">{ms?.avgDaysToClose ?? qs('Avg Days on Market', '45')}</span>
                <span className="hero-v2-stat-lbl">Avg Days to Close</span>
              </div>
            </div>
            <a href="#listings" className="hero-v2-cta">Search Homes in The Palisades</a>
          </div>
        </div>
      </header>

      <div className="hero-v2-qfb">
        <div className="container">
          <div className="hero-v2-qfb-row">
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <span><strong>ZIP:</strong> 89144</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              <span><strong>Type:</strong> Guard-Gated · Luxury</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
              <span><strong>Price Range:</strong> $1M–$4M</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
              <span><strong>HOA:</strong> $400–$900/mo</span>
            </div>
          </div>
          <div className="hero-v2-qfb-est">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            <span>Est. 2002</span>
          </div>
        </div>
      </div>

      <section id="demographics" className="demographics-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Demographics</span>
            <h2>The Palisades Demographics</h2>
          </div>
          <div className="demo-grid">
            {[
              ['500+', 'Population'],
              ['50', 'Median Age'],
              ['$275,000+', 'Avg Household Income'],
              ['160+', 'Total Households'],
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
            <h2>Where is The Palisades?</h2>
            <p>The Canyons, Summerlin &mdash; Las Vegas, Nevada.</p>
          </div>
          <div className="map-container">
            <ThePalisadesSummerlinMapWrapper />
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
            <h2 className="listings-title">NEW THE PALISADES LISTINGS</h2>
          </div>
          <div className="ylopo-wrap">
            <div className="YLOPO_searchWidget" />
            <div className="YLOPO_resultsWidget" data-search='{"propertyTypes":["house","condo","townhouse"],"minPrice":1000000,"locations":[{"city":"Las Vegas","state":"NV"}],"limit":12,"sortBy":"listDate","sortOrder":"desc","keywords":"The Palisades Summerlin","zipCodes":["89144"]}' />
          </div>
          <p className="ylopo-note">Listing data sourced from regional MLS. Information deemed reliable but not guaranteed. Updated daily.</p>
          <div className="listings-actions">
            <a href="https://search.nevadarealestategroup.net/search?s[orderBy]=sourceCreationDate%2Cdesc&s[page]=1&s[locations][0][city]=Las%20Vegas&s[locations][0][state]=NV&s[keywords]=The%20Palisades%20Summerlin" target="_blank" rel="noopener noreferrer" className="btn-gold">View All The Palisades Listings &rarr;</a>
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
                  <p>The Palisades is a refined guard-gated luxury community within The Canyons village of Summerlin North, known for its elevated terrain, architectural cohesion, and some of the most dramatic views available in the Summerlin master plan. With homes ranging from approximately $1 million to $4 million, The Palisades caters to discerning buyers who prioritize design, privacy, and views in equal measure. The community's approximately 160 homes across 90 acres create a low-density environment where generous lot sizes and thoughtful site planning maximize every homesite's view potential.</p>
                  <p>Homes in The Palisades feature a refined Mediterranean and desert contemporary aesthetic, with sizes ranging from 3,200 to 7,500+ square feet. Premium finishes are standard throughout — natural stone and hardwood flooring, custom cabinetry, gourmet kitchens with high-end appliances, wine rooms, and expansive indoor-outdoor living spaces designed to showcase the surrounding mountain and valley panoramas. Many homes were designed by noted Las Vegas architects and built by prominent luxury builders.</p>
                  <p>The Palisades occupies an enviable position within The Canyons village, situated on elevated terrain that provides sweeping west-facing views of Red Rock Canyon and the Spring Mountains. This orientation means spectacular sunset views year-round — one of the most sought-after features in the Las Vegas luxury market. The community's northern lots also capture Las Vegas Valley views, offering a different but equally compelling backdrop.</p>
                  <p>Within the context of Summerlin's guard-gated hierarchy, The Palisades sits alongside Eagle Rock and below Bellacere in terms of price and exclusivity. For buyers who want custom-quality homes with exceptional views and genuine guard-gated security, The Palisades delivers at a price point that represents strong value relative to The Ridges or the newer ultra-luxury options in Summerlin West.</p>
                </>
              )}
            </div>
            <div className="overview-aside">
              <div className="quick-facts">
                <h3>The Palisades At a Glance</h3>
                {displayStats.map(([label, value, cls]: any) => (
                  <div className="fact-row" key={label}>
                    <span className="fact-label">{label}</span>
                    <span className={`fact-value${cls ? ' ' + cls : ''}`}>{value}</span>
                  </div>
                ))}
              </div>
              <div className="cta-card">
                <p>Ready to explore The Palisades? Schedule a private tour of the community and the current listings that match your goals.</p>
                <a href="tel:+17252399950" className="btn-gold">Call 725.239.9950</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="highlights">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Why The Palisades</span>
            <h2>What Makes The Palisades Stand Out</h2>
          </div>
          <div className="highlights-grid">
            {[
              { title: 'Sunset Views', body: 'West-facing elevated lots with sweeping views of Red Rock Canyon and the Spring Mountains. Year-round sunset panoramas that define luxury desert living.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M8 21l4-11 4 11"/><path d="M2 21l5-14 4 8"/><path d="M14 15l4-8 4 14"/><line x1="2" y1="21" x2="22" y2="21"/></svg> },
              { title: 'Guard-Gated Security', body: '24-hour staffed guard gate with approximately 160 homes across 90 acres. Low density and generous lots provide enhanced privacy between residences.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
              { title: 'Architectural Excellence', body: 'Refined Mediterranean and desert contemporary homes from 3,200 to 7,500+ square feet. Designed by noted architects with premium finishes throughout.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
              { title: 'Established Character', body: '20+ years of mature landscaping and proven neighborhood stability. The community has a settled, elegant character that newer developments cannot match.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22c4-4 8-7.5 8-12a8 8 0 10-16 0c0 4.5 4 8 8 12z"/><circle cx="12" cy="10" r="3"/></svg> },
              { title: 'The Canyons Location', body: 'Within The Canyons village with easy access to Downtown Summerlin, TPC Summerlin, Red Rock Canyon, and Summerlin\'s trail network.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><line x1="8" y1="6" x2="8" y2="6.01"/><line x1="12" y1="6" x2="12" y2="6.01"/><line x1="16" y1="6" x2="16" y2="6.01"/><line x1="8" y1="10" x2="8" y2="10.01"/><line x1="12" y1="10" x2="12" y2="10.01"/><line x1="16" y1="10" x2="16" y2="10.01"/><line x1="8" y1="14" x2="8" y2="14.01"/><line x1="12" y1="14" x2="12" y2="14.01"/><line x1="16" y1="14" x2="16" y2="14.01"/></svg> },
              { title: 'Strong Value Position', body: 'Custom-quality homes with exceptional views and guard-gated security at prices below The Ridges. One of Summerlin North\'s best luxury values.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg> },
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

      <ThePalisadesSummerlinFAQ />

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
              { name: 'The Canyons', href: '/summerlin-the-canyons/', price: 'From $500K', compare: 'The broader village with multiple guard-gated enclaves and diverse price points.' },
              { name: 'Eagle Rock', href: '/eagle-rock-summerlin/', price: 'From $1M', compare: 'Neighboring guard-gated enclave in The Canyons with similar pricing and quality.' },
              { name: 'Bellacere', href: '/bellacere/', price: 'From $1.5M', compare: 'Ultra-luxury guard-gated enclave in The Canyons. Higher price ceiling with the community\'s largest estates.' },
              { name: 'The Ridges', href: '/summerlin-the-ridges/', price: 'From $2M', compare: 'Summerlin\'s ultra-luxury guard-gated community with Bear\'s Best golf.' },
              { name: 'Aventura', href: '/aventura-summerlin/', price: 'From $800K', compare: 'Guard-gated luxury in The Canyons at a more accessible price point.' },
              { name: 'Summerlin', href: '/summerlin/', price: 'From $450K', compare: 'The broader 22,500-acre master-planned community.' },
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
              <h2>Ready to Find Your The Palisades Home?</h2>
              <p>Nevada Real Estate Group is the #1 real estate team in Nevada. Whether you&apos;re buying or selling in The Palisades, let&apos;s talk.</p>
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
                <input type="hidden" name="_subject" value="The Palisades Inquiry — LasVegasHomeSearchExperts.com" />
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
