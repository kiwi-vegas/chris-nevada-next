import CountryRoseEstatesFAQ from '@/components/CountryRoseEstatesFAQ'
import Link from 'next/link'
import type { Metadata } from 'next'
import CountryRoseEstatesMapWrapper from '@/components/CountryRoseEstatesMapWrapper'
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
    { '@type': 'ListItem', position: 3, name: 'Country Rose Estates', item: 'https://www.lasvegashomesearchexperts.com/country-rose-estates/' },
  ],
}

const FAQ_DATA = [
  {
    "q": "What is the price range for homes in Country Rose Estates?",
    "a": "Homes in Country Rose Estates start at approximately $800,000 and go up from there, with premium lots and larger custom homes commanding higher prices. The generous lot sizes and guard-gated address support strong values."
  },
  {
    "q": "Is Country Rose Estates guard-gated?",
    "a": "Yes. Country Rose Estates is a guard-gated community with a 24-hour staffed guard gate. Approximately 100 homes across 60 acres maintain a very low-density, private environment."
  },
  {
    "q": "What village is Country Rose Estates in?",
    "a": "Country Rose Estates is located within The Trails village of the Summerlin North Association."
  },
  {
    "q": "What ZIP code is Country Rose Estates in?",
    "a": "Country Rose Estates is located in ZIP code 89134 in the Summerlin North area of Las Vegas."
  },
  {
    "q": "How large are the lots in Country Rose Estates?",
    "a": "Country Rose Estates features some of the largest lots in Summerlin — many approaching or exceeding half an acre. These generous parcels provide exceptional privacy and room for custom landscaping."
  },
  {
    "q": "What are HOA fees in Country Rose Estates?",
    "a": "HOA fees typically range from $300 to $700 per month, covering the Summerlin master association fee plus the Country Rose sub-association fee for guard gate staffing and community maintenance."
  },
  {
    "q": "What schools serve Country Rose Estates?",
    "a": "Country Rose Estates is zoned for top CCSD schools including Sig Rogich Middle School (10/10 GreatSchools) and Palo Verde High School (8/10). Private options include The Meadows School (A+) nearby."
  },
  {
    "q": "How does Country Rose compare to other Summerlin guard-gated communities?",
    "a": "Country Rose Estates is unique for its large lots and traditional estate character. Most Summerlin guard-gated communities feature smaller lots with Mediterranean or contemporary homes. Country Rose appeals to buyers who want acreage and privacy over modern luxury design."
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
  name: 'Country Rose Estates',
  description: 'Country Rose Estates is a guard-gated · estate living community in Las Vegas, Nevada.',
  geo: { '@type': 'GeoCoordinates', latitude: 36.21, longitude: -115.3 },
  address: { '@type': 'PostalAddress', addressLocality: 'Las Vegas', addressRegion: 'NV', postalCode: '89134', addressCountry: 'US' },
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
  const cms = await getCommunityPage('country-rose-estates')
  return {
    title: cms?.metaTitle ?? 'Country Rose Estates Homes for Sale | Nevada Real Estate Group',
    description: cms?.metaDescription ?? 'Browse Country Rose Estates homes for sale in Las Vegas, NV. $800K+. Schools, HOA, market stats. Nevada Real Estate Group.',
    alternates: { canonical: 'https://www.lasvegashomesearchexperts.com/country-rose-estates' },
  }
}

export default async function CountryRoseEstatesPage() {
  const cms = await getCommunityPage('country-rose-estates')
  const market = getMarketStats('country-rose-estates')
  const ms = market?.stats

  const heroHeadline = cms?.heroHeadline ?? 'Country Rose Estates'
  const heroSubtitle = 'Homes for Sale in Las Vegas, Nevada'
  const overviewTitle = cms?.overviewTitle ?? 'Country Rose Estates: Guard-Gated · Estate Living Living in Las Vegas'

  const HARDCODED_STATS: Array<[string, string] | [string, string, string]> = [
    ['Established', '1997'],
    ['Developer', 'Howard Hughes Corporation'],
    ['Total Acreage', '60 acres'],
    ['Homes', '100+'],
    ['Median Home Price', ms?.medianSalePrice ?? '$800K+'],
    ['ZIP Codes', '89134'],
    ['Guard-Gated', 'Yes'],
    ['HOA', '$300–$700/mo'],
  ]
  const displayStats = mergeQuickStats(HARDCODED_STATS, cms?.quickStats)
  const HARDCODED_DRIVE_TIMES = [
    {
        "time": "~18 min",
        "destination": "to the Strip",
        "route": "via Summerlin Pkwy → I-15"
    },
    {
        "time": "~12 min",
        "destination": "to Red Rock Canyon",
        "route": "via W Charleston Blvd"
    },
    {
        "time": "~7 min",
        "destination": "to Downtown Summerlin",
        "route": "via Summerlin Pkwy"
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
          <span>Country Rose Estates</span>
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
                <span className="hero-v2-stat-num">{ms?.medianSalePrice ?? qs('Median Home Price', '$800K+')}</span>
                <span className="hero-v2-stat-lbl">Median Sale Price</span>
              </div>
              <div className="hero-v2-stat">
                <span className="hero-v2-stat-num">{ms?.avgDaysToClose ?? qs('Avg Days on Market', '45')}</span>
                <span className="hero-v2-stat-lbl">Avg Days to Close</span>
              </div>
            </div>
            <a href="#listings" className="hero-v2-cta">Search Homes in Country Rose Estates</a>
          </div>
        </div>
      </header>

      <div className="hero-v2-qfb">
        <div className="container">
          <div className="hero-v2-qfb-row">
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <span><strong>ZIP:</strong> 89134</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              <span><strong>Type:</strong> Guard-Gated · Estate Living</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
              <span><strong>Price Range:</strong> $800K+</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
              <span><strong>HOA:</strong> $300–$700/mo</span>
            </div>
          </div>
          <div className="hero-v2-qfb-est">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            <span>Est. 1997</span>
          </div>
        </div>
      </div>

      <section id="demographics" className="demographics-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Demographics</span>
            <h2>Country Rose Estates Demographics</h2>
          </div>
          <div className="demo-grid">
            {[
              ['300+', 'Population'],
              ['50', 'Median Age'],
              ['$225,000+', 'Avg Household Income'],
              ['100+', 'Total Households'],
              ['95%', 'Homeownership Rate'],
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
            <h2>Where is Country Rose Estates?</h2>
            <p>The Trails, Summerlin &mdash; Las Vegas, Nevada.</p>
          </div>
          <div className="map-container">
            <CountryRoseEstatesMapWrapper />
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
            <h2 className="listings-title">NEW COUNTRY ROSE ESTATES LISTINGS</h2>
          </div>
          <div className="ylopo-wrap">
            <div className="YLOPO_searchWidget" />
            <div className="YLOPO_resultsWidget" data-search='{"propertyTypes":["house","condo","townhouse"],"minPrice":800000,"locations":[{"city":"Las Vegas","state":"NV"}],"limit":12,"sortBy":"listDate","sortOrder":"desc","keywords":"Country Rose Estates Summerlin","zipCodes":["89134"]}' />
          </div>
          <p className="ylopo-note">Listing data sourced from regional MLS. Information deemed reliable but not guaranteed. Updated daily.</p>
          <div className="listings-actions">
            <a href="https://search.nevadarealestategroup.net/search?s[orderBy]=sourceCreationDate%2Cdesc&s[page]=1&s[locations][0][city]=Las%20Vegas&s[locations][0][state]=NV&s[keywords]=Country%20Rose%20Estates%20Summerlin" target="_blank" rel="noopener noreferrer" className="btn-gold">View All Country Rose Estates Listings &rarr;</a>
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
                  <p>Country Rose Estates is a guard-gated community within The Trails village of Summerlin, known for its uniquely spacious lots, mature landscaping, and a quieter, more traditional character that distinguishes it from the contemporary luxury enclaves found elsewhere in Summerlin. With homes starting at approximately $800,000 and above, Country Rose Estates appeals to buyers who prioritize lot size, privacy, and established neighborhood character over the newer construction and modern design found in communities like Grand Park or The Ridges.</p>
                  <p>The hallmark of Country Rose Estates is its generous lot sizes — among the largest in Summerlin outside of the ultra-luxury tier. Many lots in Country Rose Estates feature true half-acre or larger parcels, providing the kind of setbacks and privacy that are exceptionally rare within a master-planned community. Homes range from approximately 3,000 to 5,500+ square feet in a variety of architectural styles, with mature trees, custom landscaping, and established gardens giving the community an almost estate-ranch quality.</p>
                  <p>Developed in the late 1990s, Country Rose Estates has had the benefit of over two decades of maturation. The tree canopy is substantial, the landscaping is lush by desert standards, and the overall neighborhood character has a warmth and permanence that only time can create. The community's guard-gated entry provides security and controlled access, while the limited number of homes — approximately 100 across 60 acres — maintains the low-density feel.</p>
                  <p>The Trails village location in Summerlin North provides Country Rose Estates residents with convenient access to Summerlin Parkway, Downtown Summerlin, and the Summerlin trail network. For buyers who want generous acreage, mature landscaping, guard-gated security, and the Summerlin address — without the contemporary luxury aesthetic that dominates newer communities — Country Rose Estates offers something genuinely unique in the Las Vegas market.</p>
                </>
              )}
            </div>
            <div className="overview-aside">
              <div className="quick-facts">
                <h3>Country Rose Estates At a Glance</h3>
                {displayStats.map(([label, value, cls]: any) => (
                  <div className="fact-row" key={label}>
                    <span className="fact-label">{label}</span>
                    <span className={`fact-value${cls ? ' ' + cls : ''}`}>{value}</span>
                  </div>
                ))}
              </div>
              <div className="cta-card">
                <p>Ready to explore Country Rose Estates? Schedule a private tour of the community and the current listings that match your goals.</p>
                <a href="tel:+17252399950" className="btn-gold">Call 725.239.9950</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="highlights">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Why Country Rose Estates</span>
            <h2>What Makes Country Rose Estates Stand Out</h2>
          </div>
          <div className="highlights-grid">
            {[
              { title: 'Generous Estate Lots', body: 'Among the largest residential lots in Summerlin. Half-acre and larger parcels with exceptional setbacks and privacy between homes — a rarity in master-planned communities.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
              { title: 'Guard-Gated Security', body: '24-hour staffed guard gate with approximately 100 homes across 60 acres. Low density and large lots create genuine estate-quality privacy.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
              { title: 'Mature Landscaping', body: '25+ years of mature trees, established gardens, and lush desert landscaping. A neighborhood character and tree canopy that cannot be replicated in newer developments.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22c4-4 8-7.5 8-12a8 8 0 10-16 0c0 4.5 4 8 8 12z"/><circle cx="12" cy="10" r="3"/></svg> },
              { title: 'Estate-Ranch Character', body: 'A unique traditional character with spacious lots and established gardens that distinguish Country Rose from the contemporary luxury found elsewhere in Summerlin.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M8 21l4-11 4 11"/><path d="M2 21l5-14 4 8"/><path d="M14 15l4-8 4 14"/><line x1="2" y1="21" x2="22" y2="21"/></svg> },
              { title: 'Summerlin North Location', body: 'Convenient access to Summerlin Parkway, Downtown Summerlin, and the Summerlin trail network. Central positioning within The Trails village.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><line x1="8" y1="6" x2="8" y2="6.01"/><line x1="12" y1="6" x2="12" y2="6.01"/><line x1="16" y1="6" x2="16" y2="6.01"/><line x1="8" y1="10" x2="8" y2="10.01"/><line x1="12" y1="10" x2="12" y2="10.01"/><line x1="16" y1="10" x2="16" y2="10.01"/><line x1="8" y1="14" x2="8" y2="14.01"/><line x1="12" y1="14" x2="12" y2="14.01"/><line x1="16" y1="14" x2="16" y2="14.01"/></svg> },
              { title: 'Unique Value', body: 'Large-lot guard-gated living in Summerlin is exceptionally rare. Country Rose Estates\' combination of acreage, privacy, and guard gate makes it irreplaceable inventory.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg> },
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

      <CountryRoseEstatesFAQ />

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
              { name: 'The Trails', href: '/summerlin-the-trails/', price: 'From $500K', compare: 'The broader village containing Country Rose Estates with diverse neighborhoods at multiple price points.' },
              { name: 'Mountain Trails', href: '/mountain-trails-summerlin/', price: 'From $1M', compare: 'Guard-gated luxury in The Hills village with mountain views and contemporary estates.' },
              { name: 'The Canyons', href: '/summerlin-the-canyons/', price: 'From $500K', compare: 'Adjacent Summerlin North village with multiple guard-gated enclaves including Bellacere and Eagle Rock.' },
              { name: 'The Vistas', href: '/summerlin-the-vistas/', price: 'From $450K', compare: 'Summerlin North village with The Vineyards guard-gated enclave.' },
              { name: 'The Ridges', href: '/summerlin-the-ridges/', price: 'From $2M', compare: 'Summerlin\'s ultra-luxury guard-gated community.' },
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
              <h2>Ready to Find Your Country Rose Estates Home?</h2>
              <p>Nevada Real Estate Group is the #1 real estate team in Nevada. Whether you&apos;re buying or selling in Country Rose Estates, let&apos;s talk.</p>
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
                <input type="hidden" name="_subject" value="Country Rose Estates Inquiry — LasVegasHomeSearchExperts.com" />
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
