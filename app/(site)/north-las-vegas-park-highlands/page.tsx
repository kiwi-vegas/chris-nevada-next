import NorthLasVegasParkHighlandsFAQ from '@/components/NorthLasVegasParkHighlandsFAQ'
import Link from 'next/link'
import type { Metadata } from 'next'
import NorthLasVegasParkHighlandsMapWrapper from '@/components/NorthLasVegasParkHighlandsMapWrapper'
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
    { '@type': 'ListItem', position: 3, name: 'Park Highlands', item: 'https://www.lasvegashomesearchexperts.com/north-las-vegas-park-highlands/' },
  ],
}

const FAQ_DATA = [
  {
    "q": "What is the price range for homes in Park Highlands?",
    "a": "Homes in Park Highlands range from approximately $350,000 for entry-level new construction to $600,000 for larger single-family homes with premium features and elevated lot positioning."
  },
  {
    "q": "Is Park Highlands still building new homes?",
    "a": "Yes. Park Highlands is actively developing with multiple national builders delivering new construction across ongoing phases. The community is entitled for over 10,000 homes at full build-out."
  },
  {
    "q": "What builders are in Park Highlands?",
    "a": "National builders in Park Highlands include Shea Homes, Lennar, KB Home, Richmond American, and Taylor Morrison. Multiple model homes are available for touring."
  },
  {
    "q": "What ZIP codes is Park Highlands in?",
    "a": "Park Highlands spans ZIP codes 89085 and 89086 in North Las Vegas, Nevada."
  },
  {
    "q": "Is Park Highlands guard-gated?",
    "a": "No. Park Highlands is not guard-gated. It is an open master-planned community with HOA governance, community parks, and trail systems."
  },
  {
    "q": "What are HOA fees in Park Highlands?",
    "a": "HOA fees in Park Highlands typically range from $60 to $150 per month, covering community parks, trail system, common area maintenance, and master plan governance."
  },
  {
    "q": "How does Park Highlands compare to Aliante?",
    "a": "Park Highlands is a newer community with active new construction, while Aliante is more established with a golf course and casino. Park Highlands offers the newest homes and floor plans; Aliante offers more mature amenities and community character."
  },
  {
    "q": "How far is Park Highlands from the Strip?",
    "a": "Park Highlands is approximately 25 minutes from the Las Vegas Strip via I-15 South. Downtown Las Vegas is approximately 15 minutes away."
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
  name: 'Park Highlands',
  description: 'Park Highlands is a master-planned · new construction community in North Las Vegas, Nevada.',
  geo: { '@type': 'GeoCoordinates', latitude: 36.305, longitude: -115.195 },
  address: { '@type': 'PostalAddress', addressLocality: 'North Las Vegas', addressRegion: 'NV', postalCode: '89085', addressCountry: 'US' },
  containedInPlace: { '@type': 'City', name: 'North Las Vegas' },
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
  const cms = await getCommunityPage('north-las-vegas-park-highlands')
  return {
    title: cms?.metaTitle ?? 'Park Highlands Homes for Sale | Nevada Real Estate Group',
    description: cms?.metaDescription ?? 'Browse Park Highlands homes for sale in North Las Vegas, NV. $350K–$600K. Schools, HOA, market stats. Nevada Real Estate Group.',
  }
}

export default async function NorthLasVegasParkHighlandsPage() {
  const cms = await getCommunityPage('north-las-vegas-park-highlands')
  const market = getMarketStats('north-las-vegas-park-highlands')
  const ms = market?.stats

  const heroHeadline = cms?.heroHeadline ?? 'Park Highlands'
  const heroSubtitle = 'Homes for Sale in North Las Vegas, Nevada'
  const overviewTitle = cms?.overviewTitle ?? 'Park Highlands: Master-Planned · New Construction Living in North Las Vegas'

  const HARDCODED_STATS: Array<[string, string] | [string, string, string]> = [
    ['Established', '2014'],
    ['Developer', 'Shea Homes / Lennar / Various'],
    ['Total Acreage', '~2,000 acres'],
    ['Homes', '4,000+'],
    ['Median Home Price', ms?.medianSalePrice ?? '$350K–$600K'],
    ['ZIP Codes', '89085, 89086'],
    ['Guard-Gated', 'No'],
    ['HOA', '$60–$150/mo'],
  ]
  const displayStats = mergeQuickStats(HARDCODED_STATS, cms?.quickStats)
  const HARDCODED_DRIVE_TIMES = [
    {
        "time": "~25 min",
        "destination": "to the Strip",
        "route": "via I-15 South"
    },
    {
        "time": "~35 min",
        "destination": "to Harry Reid Airport",
        "route": "via I-15 South → I-215"
    },
    {
        "time": "~15 min",
        "destination": "to Downtown Las Vegas",
        "route": "via I-15 South"
    },
    {
        "time": "~10 min",
        "destination": "to Aliante Casino",
        "route": "via Aliante Pkwy"
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
          <span>Park Highlands</span>
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
                <span className="hero-v2-stat-num">{ms?.medianSalePrice ?? qs('Median Home Price', '$350K–$600K')}</span>
                <span className="hero-v2-stat-lbl">Median Sale Price</span>
              </div>
              <div className="hero-v2-stat">
                <span className="hero-v2-stat-num">{ms?.avgDaysToClose ?? qs('Avg Days on Market', '45')}</span>
                <span className="hero-v2-stat-lbl">Avg Days to Close</span>
              </div>
            </div>
            <a href="#listings" className="hero-v2-cta">Search Homes in Park Highlands</a>
          </div>
        </div>
      </header>

      <div className="hero-v2-qfb">
        <div className="container">
          <div className="hero-v2-qfb-row">
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <span><strong>ZIP:</strong> 89085, 89086</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              <span><strong>Type:</strong> Master-Planned · New Construction</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
              <span><strong>Price Range:</strong> $350K–$600K</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
              <span><strong>HOA:</strong> $60–$150/mo</span>
            </div>
          </div>
          <div className="hero-v2-qfb-est">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            <span>Est. 2014</span>
          </div>
        </div>
      </div>

      <section id="demographics" className="demographics-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Demographics</span>
            <h2>Park Highlands Demographics</h2>
          </div>
          <div className="demo-grid">
            {[
              ['~12,000', 'Population'],
              ['33', 'Median Age'],
              ['$65,000', 'Avg Household Income'],
              ['~4,200', 'Total Households'],
              ['72%', 'Homeownership Rate'],
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
            <h2>Where is Park Highlands?</h2>
            <p>North Las Vegas, Nevada &mdash; North Las Vegas, Nevada.</p>
          </div>
          <div className="map-container">
            <NorthLasVegasParkHighlandsMapWrapper />
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
            <h2 className="listings-title">NEW PARK HIGHLANDS LISTINGS</h2>
          </div>
          <div className="ylopo-wrap">
            <div className="YLOPO_searchWidget" />
            <div className="YLOPO_resultsWidget" data-search='{"propertyTypes":["house","condo","townhouse"],"minPrice":300000,"locations":[{"city":"North Las Vegas","state":"NV"}],"limit":12,"sortBy":"listDate","sortOrder":"desc","keywords":"Park Highlands","zipCodes":["89085","89086"]}' />
          </div>
          <p className="ylopo-note">Listing data sourced from regional MLS. Information deemed reliable but not guaranteed. Updated daily.</p>
          <div className="listings-actions">
            <a href="https://search.nevadarealestategroup.net/search?s[orderBy]=sourceCreationDate%2Cdesc&s[page]=1&s[locations][0][city]=North%20Las%20Vegas&s[locations][0][state]=NV&s[keywords]=Park%20Highlands" target="_blank" rel="noopener noreferrer" className="btn-gold">View All Park Highlands Listings &rarr;</a>
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
                  <p>Park Highlands is one of the newest and most ambitious master-planned communities in North Las Vegas, spanning approximately 2,000 acres in the northern reaches of the Las Vegas Valley. The community was entitled for over 10,000 homes at full build-out and has been actively developing since 2014, with national builders including Shea Homes, Lennar, KB Home, Richmond American, and Taylor Morrison delivering new construction across multiple phases.</p>
                  <p>Homes in Park Highlands range from approximately $350,000 for entry-level new construction to $600,000 for larger single-family homes with premium features and lot positioning. The community features contemporary floor plans with open-concept designs, energy-efficient construction, smart-home technology, and the modern amenities that today's buyers expect. Most homes range from 1,600 to 3,200 square feet with two-car garages.</p>
                  <p>The community's master plan includes a significant park and trail component, with multiple community parks, connected walking and cycling trails, a central community park with event space, and preserved open space throughout. The developer has emphasized outdoor recreation and community gathering spaces as core elements of the master plan, and early residents have benefited from parks and trails being built alongside the first residential phases.</p>
                  <p>Park Highlands is positioned at the northern edge of the valley with views of the surrounding desert mountains and easy access to the I-15 corridor for commuting south to the Strip, Downtown Las Vegas, and the broader metro. For buyers seeking new construction in a planned community at price points well below Summerlin or Henderson, Park Highlands offers the most ambitious development vision in the North Las Vegas market.</p>
                </>
              )}
            </div>
            <div className="overview-aside">
              <div className="quick-facts">
                <h3>Park Highlands At a Glance</h3>
                {displayStats.map(([label, value, cls]: any) => (
                  <div className="fact-row" key={label}>
                    <span className="fact-label">{label}</span>
                    <span className={`fact-value${cls ? ' ' + cls : ''}`}>{value}</span>
                  </div>
                ))}
              </div>
              <div className="cta-card">
                <p>Ready to explore Park Highlands? Schedule a private tour of the community and the current listings that match your goals.</p>
                <a href="tel:+17252399950" className="btn-gold">Call 725.239.9950</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="highlights">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Why Park Highlands</span>
            <h2>What Makes Park Highlands Stand Out</h2>
          </div>
          <div className="highlights-grid">
            {[
              { title: 'New Construction Value', body: 'Brand-new homes from national builders at prices 20–40% below comparable new construction in Summerlin or Henderson. Energy-efficient, smart-home-ready, and warranty-covered.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
              { title: '2,000-Acre Master Plan', body: 'One of the largest active master-planned developments in the Las Vegas Valley. Entitled for 10,000+ homes with parks, trails, schools, and commercial amenities throughout.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><line x1="8" y1="6" x2="8" y2="6.01"/><line x1="12" y1="6" x2="12" y2="6.01"/><line x1="16" y1="6" x2="16" y2="6.01"/><line x1="8" y1="10" x2="8" y2="10.01"/><line x1="12" y1="10" x2="12" y2="10.01"/><line x1="16" y1="10" x2="16" y2="10.01"/><line x1="8" y1="14" x2="8" y2="14.01"/><line x1="12" y1="14" x2="12" y2="14.01"/><line x1="16" y1="14" x2="16" y2="14.01"/></svg> },
              { title: 'Parks & Trail System', body: 'Community parks, connected walking and cycling trails, and preserved open space built alongside residential phases. Outdoor recreation is central to the master plan.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22c4-4 8-7.5 8-12a8 8 0 10-16 0c0 4.5 4 8 8 12z"/><circle cx="12" cy="10" r="3"/></svg> },
              { title: 'Mountain Views', body: 'Northern valley positioning provides views of the surrounding desert mountain ranges. Elevated lots capture panoramic vistas of the Sheep Range and Spring Mountains.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M8 21l4-11 4 11"/><path d="M2 21l5-14 4 8"/><path d="M14 15l4-8 4 14"/><line x1="2" y1="21" x2="22" y2="21"/></svg> },
              { title: 'National Builders', body: 'Homes by Shea, Lennar, KB Home, Richmond American, and Taylor Morrison. Multiple floor plans, price points, and design options to choose from.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
              { title: 'Growth Trajectory', body: 'Park Highlands is in its growth phase with new commercial and residential development ongoing. Early buyers position themselves for the strongest appreciation as the community matures.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg> },
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

      <NorthLasVegasParkHighlandsFAQ />

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
              { name: 'Aliante', href: '/aliante/', price: 'From $300K', compare: 'Established NLV master plan with golf, casino, and Nature Discovery Park. More mature amenities.' },
              { name: 'Providence', href: '/providence/', price: 'From $350K', compare: 'Newer NLV master plan with contemporary construction and family amenities.' },
              { name: 'Skye Canyon', href: '/skye-canyon/', price: 'From $400K', compare: 'New master plan in far northwest Las Vegas with Skye Center amenities.' },
              { name: 'Centennial Hills', href: '/centennial-hills/', price: 'From $350K', compare: 'Growing northwest Las Vegas community with diverse housing options.' },
              { name: 'North Las Vegas', href: '/north-las-vegas/', price: 'From $300K', compare: 'The broader city with diverse communities and growing amenities.' },
              { name: 'Tule Springs', href: '/tule-springs/', price: 'From $350K', compare: 'Nearby NLV community near Floyd Lamb Park with newer construction.' },
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
              <h2>Ready to Find Your Park Highlands Home?</h2>
              <p>Nevada Real Estate Group is the #1 real estate team in Nevada. Whether you&apos;re buying or selling in Park Highlands, let&apos;s talk.</p>
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
                <input type="hidden" name="_subject" value="Park Highlands Inquiry — LasVegasHomeSearchExperts.com" />
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
