import SummerlinLaMadrePeaksFAQ from '@/components/SummerlinLaMadrePeaksFAQ'
import Link from 'next/link'
import type { Metadata } from 'next'
import SummerlinLaMadrePeaksMapWrapper from '@/components/SummerlinLaMadrePeaksMapWrapper'
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
    { '@type': 'ListItem', position: 3, name: 'La Madre Peaks', item: 'https://www.lasvegashomesearchexperts.com/summerlin-la-madre-peaks/' },
  ],
}

const FAQ_DATA = [
  {
    "q": "What is Astra at La Madre Peaks?",
    "a": "Astra is the most exclusive section of La Madre Peaks, offering 167 custom home lots ranging from one-third acre to over one acre. Many lots back directly to the Red Rock Canyon National Conservation Area. Custom builders have full architectural freedom within community design guidelines. Lots and completed homes start at approximately $2 million."
  },
  {
    "q": "What is the price range in La Madre Peaks?",
    "a": "Homes in La Madre Peaks range from approximately $800,000 for production luxury homes by Taylor Morrison and Shea Homes to over $5 million for custom estates on premium Astra lots."
  },
  {
    "q": "Is La Madre Peaks guard-gated?",
    "a": "The broader La Madre Peaks village is gated but not guard-gated. Some individual neighborhoods within the village may have enhanced gating. Astra at La Madre Peaks has its own gated entry."
  },
  {
    "q": "Why is La Madre Peaks a good investment?",
    "a": "La Madre Peaks is the last major luxury village in Summerlin. Red Rock Canyon to the west prevents further expansion. Once lots are built out, there will be no new Summerlin luxury inventory at the canyon's edge — creating permanent scarcity that supports long-term appreciation."
  },
  {
    "q": "What builders are in La Madre Peaks?",
    "a": "Active builders include Toll Brothers, Taylor Morrison, Shea Homes, and multiple custom builders on Astra lots. Floor plans range from 2,500 to 8,000+ square feet across production and custom homes."
  },
  {
    "q": "How close is La Madre Peaks to Red Rock Canyon?",
    "a": "La Madre Peaks backs directly to the Red Rock Canyon National Conservation Area boundary. Some Astra lots are adjacent to the canyon. The Red Rock Canyon Scenic Loop is approximately 5 minutes away."
  },
  {
    "q": "What ZIP code is La Madre Peaks in?",
    "a": "La Madre Peaks is located in ZIP code 89138 in the Summerlin West area of Las Vegas."
  },
  {
    "q": "Can I build a custom home in La Madre Peaks?",
    "a": "Yes — the Astra at La Madre Peaks section offers 167 custom home lots where buyers can work with their chosen builder and architect within community design guidelines. This is the primary custom-build opportunity in Summerlin's newest expansion."
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
  name: 'La Madre Peaks',
  description: 'La Madre Peaks is a luxury · new construction community in Las Vegas, Nevada.',
  geo: { '@type': 'GeoCoordinates', latitude: 36.2, longitude: -115.34 },
  address: { '@type': 'PostalAddress', addressLocality: 'Las Vegas', addressRegion: 'NV', postalCode: '89138', addressCountry: 'US' },
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
  const cms = await getCommunityPage('summerlin-la-madre-peaks')
  return {
    title: cms?.metaTitle ?? 'La Madre Peaks Homes for Sale | Nevada Real Estate Group',
    description: cms?.metaDescription ?? 'Browse La Madre Peaks homes for sale in Las Vegas, NV. $800K–$5M+. Schools, HOA, market stats. Nevada Real Estate Group.',
  }
}

export default async function SummerlinLaMadrePeaksPage() {
  const cms = await getCommunityPage('summerlin-la-madre-peaks')
  const market = getMarketStats('summerlin-la-madre-peaks')
  const ms = market?.stats

  const heroHeadline = cms?.heroHeadline ?? 'La Madre Peaks'
  const heroSubtitle = 'Homes for Sale in Las Vegas, Nevada'
  const overviewTitle = cms?.overviewTitle ?? 'La Madre Peaks: Luxury · New Construction Living in Las Vegas'

  const HARDCODED_STATS: Array<[string, string] | [string, string, string]> = [
    ['Established', '2022'],
    ['Developer', 'Howard Hughes Corporation'],
    ['Total Acreage', '400 acres'],
    ['Homes', '500+'],
    ['Median Home Price', ms?.medianSalePrice ?? '$800K–$5M+'],
    ['ZIP Codes', '89138'],
    ['Guard-Gated', 'No'],
    ['HOA', '$150–$600/mo'],
  ]
  const displayStats = mergeQuickStats(HARDCODED_STATS, cms?.quickStats)
  const HARDCODED_DRIVE_TIMES = [
    {
        "time": "~25 min",
        "destination": "to the Strip",
        "route": "via Summerlin Pkwy → I-15"
    },
    {
        "time": "~5 min",
        "destination": "to Red Rock Canyon",
        "route": "via W Charleston Blvd"
    },
    {
        "time": "~10 min",
        "destination": "to Downtown Summerlin",
        "route": "via Summerlin Pkwy"
    },
    {
        "time": "~35 min",
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
          <span>La Madre Peaks</span>
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
                <span className="hero-v2-stat-num">{ms?.medianSalePrice ?? qs('Median Home Price', '$800K–$5M+')}</span>
                <span className="hero-v2-stat-lbl">Median Sale Price</span>
              </div>
              <div className="hero-v2-stat">
                <span className="hero-v2-stat-num">{ms?.avgDaysToClose ?? qs('Avg Days on Market', '45')}</span>
                <span className="hero-v2-stat-lbl">Avg Days to Close</span>
              </div>
            </div>
            <a href="#listings" className="hero-v2-cta">Search Homes in La Madre Peaks</a>
          </div>
        </div>
      </header>

      <div className="hero-v2-qfb">
        <div className="container">
          <div className="hero-v2-qfb-row">
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <span><strong>ZIP:</strong> 89138</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              <span><strong>Type:</strong> Luxury · New Construction</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
              <span><strong>Price Range:</strong> $800K–$5M+</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
              <span><strong>HOA:</strong> $150–$600/mo</span>
            </div>
          </div>
          <div className="hero-v2-qfb-est">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            <span>Est. 2022</span>
          </div>
        </div>
      </div>

      <section id="demographics" className="demographics-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Demographics</span>
            <h2>La Madre Peaks Demographics</h2>
          </div>
          <div className="demo-grid">
            {[
              ['1,500+', 'Population'],
              ['40', 'Median Age'],
              ['$225,000+', 'Avg Household Income'],
              ['500+', 'Total Households'],
              ['92%', 'Homeownership Rate'],
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
            <h2>Where is La Madre Peaks?</h2>
            <p>Summerlin West, Las Vegas &mdash; Las Vegas, Nevada.</p>
          </div>
          <div className="map-container">
            <SummerlinLaMadrePeaksMapWrapper />
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
            <h2 className="listings-title">NEW LA MADRE PEAKS LISTINGS</h2>
          </div>
          <div className="ylopo-wrap">
            <div className="YLOPO_searchWidget" />
            <div className="YLOPO_resultsWidget" data-search='{"propertyTypes":["house","condo","townhouse"],"minPrice":800000,"locations":[{"city":"Las Vegas","state":"NV"}],"limit":12,"sortBy":"listDate","sortOrder":"desc","keywords":"La Madre Peaks Summerlin","zipCodes":["89138"]}' />
          </div>
          <p className="ylopo-note">Listing data sourced from regional MLS. Information deemed reliable but not guaranteed. Updated daily.</p>
          <div className="listings-actions">
            <a href="https://search.nevadarealestategroup.net/search?s[orderBy]=sourceCreationDate%2Cdesc&s[page]=1&s[locations][0][city]=Las%20Vegas&s[locations][0][state]=NV&s[keywords]=La%20Madre%20Peaks%20Summerlin" target="_blank" rel="noopener noreferrer" className="btn-gold">View All La Madre Peaks Listings &rarr;</a>
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
                  <p>La Madre Peaks is Summerlin's newest luxury village, located in the Summerlin West Association at the westernmost edge of the master plan. Named for the La Madre Mountain range that forms its dramatic western backdrop, this village represents the final chapter of Summerlin's three-decade development story — the last major luxury community to be built before the Red Rock Canyon National Conservation Area boundary prevents any further westward expansion.</p>
                  <p>Homes in La Madre Peaks range from approximately $800,000 for production luxury homes to over $5 million for custom estate lots in Astra at La Madre Peaks, the village's most exclusive section. Astra offers 167 custom home lots ranging from one-third acre to over one acre, with many backing directly to natural desert washes and the Red Rock Canyon boundary. For buyers seeking a custom build in Summerlin's most dramatic setting, Astra represents what may be the last opportunity.</p>
                  <p>Multiple luxury builders are active in La Madre Peaks, including Toll Brothers, Taylor Morrison, Shea Homes, and several custom builders on the Astra lots. The architectural style throughout the village is contemporary desert — clean lines, natural materials, large glass expanses, and indoor-outdoor living designs that are intentionally oriented toward the mountain and canyon views that define the location.</p>
                  <p>The scarcity story at La Madre Peaks is the most compelling investment thesis in Summerlin. Red Rock Canyon to the west is a national conservation area — there will be no more land, no more Summerlin expansion, and no more opportunities to build at the canyon's edge. La Madre Peaks is the last village with this positioning, and once the lots are sold and built out, this inventory disappears permanently. For luxury buyers who understand supply dynamics, La Madre Peaks is the single most compelling new-construction opportunity in the Las Vegas Valley.</p>
                </>
              )}
            </div>
            <div className="overview-aside">
              <div className="quick-facts">
                <h3>La Madre Peaks At a Glance</h3>
                {displayStats.map(([label, value, cls]: any) => (
                  <div className="fact-row" key={label}>
                    <span className="fact-label">{label}</span>
                    <span className={`fact-value${cls ? ' ' + cls : ''}`}>{value}</span>
                  </div>
                ))}
              </div>
              <div className="cta-card">
                <p>Ready to explore La Madre Peaks? Schedule a private tour of the community and the current listings that match your goals.</p>
                <a href="tel:+17252399950" className="btn-gold">Call 725.239.9950</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="highlights">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Why La Madre Peaks</span>
            <h2>What Makes La Madre Peaks Stand Out</h2>
          </div>
          <div className="highlights-grid">
            {[
              { title: 'Astra Custom Estate Lots', body: '167 custom home lots from one-third acre to 1+ acre backing directly to Red Rock Canyon. Custom builders, architectural freedom, and the last lots at the canyon\'s edge.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
              { title: 'Canyon-Edge Location', body: 'The westernmost residential community in Summerlin, backing directly to the Red Rock Canyon National Conservation Area boundary. Unobstructed canyon and mountain views.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M8 21l4-11 4 11"/><path d="M2 21l5-14 4 8"/><path d="M14 15l4-8 4 14"/><line x1="2" y1="21" x2="22" y2="21"/></svg> },
              { title: 'Final Summerlin Expansion', body: 'La Madre Peaks is the last major luxury village to be developed in Summerlin. Once built out, there will be no new Summerlin luxury construction — permanent scarcity.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg> },
              { title: 'Contemporary Desert Architecture', body: 'Clean lines, natural materials, floor-to-ceiling glass, and indoor-outdoor living. Every home is designed to maximize the mountain views and desert setting.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><line x1="8" y1="6" x2="8" y2="6.01"/><line x1="12" y1="6" x2="12" y2="6.01"/><line x1="16" y1="6" x2="16" y2="6.01"/><line x1="8" y1="10" x2="8" y2="10.01"/><line x1="12" y1="10" x2="12" y2="10.01"/><line x1="16" y1="10" x2="16" y2="10.01"/><line x1="8" y1="14" x2="8" y2="14.01"/><line x1="12" y1="14" x2="12" y2="14.01"/><line x1="16" y1="14" x2="16" y2="14.01"/></svg> },
              { title: 'Premium Builder Selection', body: 'Toll Brothers, Taylor Morrison, Shea Homes, and custom builders. The highest concentration of luxury builder talent in any active Summerlin village.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
              { title: 'Trail System at Your Door', body: 'Direct access to the Summerlin trail system connecting to Red Rock Canyon hiking routes. Morning hikes into the canyon from your front door.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22c4-4 8-7.5 8-12a8 8 0 10-16 0c0 4.5 4 8 8 12z"/><circle cx="12" cy="10" r="3"/></svg> },
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

      <SummerlinLaMadrePeaksFAQ />

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
              { name: 'Summerlin', href: '/summerlin/', price: 'From $450K', compare: 'The broader master-planned community. 22,500 acres, 20+ villages.' },
              { name: 'Stonebridge', href: '/summerlin-stonebridge/', price: 'From $550K', compare: 'Summerlin West\'s largest village with new construction at more accessible price points.' },
              { name: 'Carlisle Peak', href: '/carlisle-peak/', price: 'From $1.55M', compare: 'Guard-gated luxury new construction in Grand Park. Similar price range, different village.' },
              { name: 'The Ridges', href: '/summerlin-the-ridges/', price: 'From $2M', compare: 'Summerlin\'s established ultra-luxury community. Resale only; La Madre Peaks offers new construction.' },
              { name: 'Red Rock Country Club', href: '/red-rock-country-club/', price: 'From $1.2M', compare: 'Guard-gated golf community within Summerlin. Established luxury vs. new construction.' },
              { name: 'The Summit Club', href: '/the-summit-club/', price: 'From $5M', compare: 'Las Vegas\' most exclusive private community. A tier above La Madre Peaks in exclusivity and price.' },
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
              <h2>Ready to Find Your La Madre Peaks Home?</h2>
              <p>Nevada Real Estate Group is the #1 real estate team in Nevada. Whether you&apos;re buying or selling in La Madre Peaks, let&apos;s talk.</p>
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
                <input type="hidden" name="_subject" value="La Madre Peaks Inquiry — LasVegasHomeSearchExperts.com" />
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
