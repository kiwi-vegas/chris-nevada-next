import EastLasVegasFAQ from '@/components/EastLasVegasFAQ'
import Link from 'next/link'
import type { Metadata } from 'next'
import EastLasVegasMapWrapper from '@/components/EastLasVegasMapWrapper'
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
    { '@type': 'ListItem', position: 3, name: 'East Las Vegas', item: 'https://www.lasvegashomesearchexperts.com/east-las-vegas/' },
  ],
}

const FAQ_DATA = [
  {
    "q": "What is the price range for homes in East Las Vegas?",
    "a": "Homes in East Las Vegas start in the low $200,000s for smaller homes and condos, reaching up to $500,000 for larger homes in newer subdivisions. The median home price is typically $300K–$350K."
  },
  {
    "q": "Is East Las Vegas a good area to invest?",
    "a": "East Las Vegas offers some of the strongest rental yields in the valley due to low purchase prices and steady demand from Nellis AFB military families, Strip workers, and medical professionals. Cap rates are among the highest in the metro."
  },
  {
    "q": "What ZIP codes are in East Las Vegas?",
    "a": "East Las Vegas spans multiple ZIP codes including 89101, 89104, 89110, 89115, 89121, 89122, 89142, and 89156."
  },
  {
    "q": "Is East Las Vegas safe?",
    "a": "Safety varies significantly by neighborhood. Newer subdivisions near Lamb Boulevard and sections adjacent to Henderson are generally safe and well-maintained. As with any urban area, researching specific blocks and neighborhoods is important."
  },
  {
    "q": "How close is East Las Vegas to the Strip?",
    "a": "East Las Vegas is approximately 15 minutes from the Strip via Flamingo Road, Tropicana Avenue, or Boulder Highway. Some east-side locations are closer to the Strip than many west-side communities."
  },
  {
    "q": "What schools serve East Las Vegas?",
    "a": "The area is served by multiple CCSD campuses. Southeast Career Technical Academy (8/10) is the top-rated public option. Charter schools including Coral Academy of Science provide alternatives. Bishop Gorman (A+) is the premier private option."
  },
  {
    "q": "Is East Las Vegas being redeveloped?",
    "a": "Yes. Significant redevelopment is underway along Boulder Highway, the former Sam Boyd Stadium site, and several commercial corridors. New investment is transforming the east side's character and driving appreciation."
  },
  {
    "q": "What is Sunrise Manor?",
    "a": "Sunrise Manor is a large census-designated place on the east side, essentially the core of East Las Vegas. It encompasses a wide area from Charleston Boulevard south to Tropicana Avenue, east of the Strip corridor to Nellis AFB."
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
  name: 'East Las Vegas',
  description: 'East Las Vegas is a urban · area hub community in Las Vegas, Nevada.',
  geo: { '@type': 'GeoCoordinates', latitude: 36.17, longitude: -115.075 },
  address: { '@type': 'PostalAddress', addressLocality: 'Las Vegas', addressRegion: 'NV', postalCode: '89101', addressCountry: 'US' },
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
  const cms = await getCommunityPage('east-las-vegas')
  return {
    title: cms?.metaTitle ?? 'East Las Vegas Homes for Sale | Nevada Real Estate Group',
    description: cms?.metaDescription ?? 'Browse East Las Vegas homes for sale in Las Vegas, NV. $200K–$500K. Schools, HOA, market stats. Nevada Real Estate Group.',
  }
}

export default async function EastLasVegasPage() {
  const cms = await getCommunityPage('east-las-vegas')
  const market = getMarketStats('east-las-vegas')
  const ms = market?.stats

  const heroHeadline = cms?.heroHeadline ?? 'East Las Vegas'
  const heroSubtitle = 'Homes for Sale in Las Vegas, Nevada'
  const overviewTitle = cms?.overviewTitle ?? 'East Las Vegas: Urban · Area Hub Living in Las Vegas'

  const HARDCODED_STATS: Array<[string, string] | [string, string, string]> = [
    ['Established', '1960'],
    ['Developer', 'Various'],
    ['Total Acreage', '~50 sq mi'],
    ['Homes', '80,000+'],
    ['Median Home Price', ms?.medianSalePrice ?? '$200K–$500K'],
    ['ZIP Codes', '89101, 89104, 89110, 89115, 89121, 89122, 89142, 89156'],
    ['Guard-Gated', 'No'],
    ['HOA', '$0–$100/mo'],
  ]
  const displayStats = mergeQuickStats(HARDCODED_STATS, cms?.quickStats)
  const HARDCODED_DRIVE_TIMES = [
    {
        "time": "~15 min",
        "destination": "to the Strip",
        "route": "via Flamingo Rd / Boulder Hwy"
    },
    {
        "time": "~15 min",
        "destination": "to Harry Reid Airport",
        "route": "via I-515 / Boulder Hwy"
    },
    {
        "time": "~25 min",
        "destination": "to Lake Mead",
        "route": "via Lake Mead Blvd East"
    },
    {
        "time": "~10 min",
        "destination": "to Nellis AFB",
        "route": "via Las Vegas Blvd / Nellis Blvd"
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
          <span>East Las Vegas</span>
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
                <span className="hero-v2-stat-num">{ms?.medianSalePrice ?? qs('Median Home Price', '$200K–$500K')}</span>
                <span className="hero-v2-stat-lbl">Median Sale Price</span>
              </div>
              <div className="hero-v2-stat">
                <span className="hero-v2-stat-num">{ms?.avgDaysToClose ?? qs('Avg Days on Market', '45')}</span>
                <span className="hero-v2-stat-lbl">Avg Days to Close</span>
              </div>
            </div>
            <a href="#listings" className="hero-v2-cta">Search Homes in East Las Vegas</a>
          </div>
        </div>
      </header>

      <div className="hero-v2-qfb">
        <div className="container">
          <div className="hero-v2-qfb-row">
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <span><strong>ZIP:</strong> 89101, 89104, 89110, 89115, 89121, 89122, 89142, 89156</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              <span><strong>Type:</strong> Urban · Area Hub</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
              <span><strong>Price Range:</strong> $200K–$500K</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
              <span><strong>HOA:</strong> $0–$100/mo</span>
            </div>
          </div>
          <div className="hero-v2-qfb-est">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            <span>Est. 1960</span>
          </div>
        </div>
      </div>

      <section id="demographics" className="demographics-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Demographics</span>
            <h2>East Las Vegas Demographics</h2>
          </div>
          <div className="demo-grid">
            {[
              ['220,000+', 'Population'],
              ['34', 'Median Age'],
              ['$45,000', 'Avg Household Income'],
              ['80,000+', 'Total Households'],
              ['42%', 'Homeownership Rate'],
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
            <h2>Where is East Las Vegas?</h2>
            <p>Las Vegas, Nevada &mdash; Las Vegas, Nevada.</p>
          </div>
          <div className="map-container">
            <EastLasVegasMapWrapper />
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
            <h2 className="listings-title">NEW EAST LAS VEGAS LISTINGS</h2>
          </div>
          <div className="ylopo-wrap">
            <div className="YLOPO_searchWidget" />
            <div className="YLOPO_resultsWidget" data-search='{"propertyTypes":["house","condo","townhouse"],"minPrice":200000,"locations":[{"city":"Las Vegas","state":"NV"}],"limit":12,"sortBy":"listDate","sortOrder":"desc","keywords":"East Las Vegas","zipCodes":["89101","89104","89110","89115","89121","89122","89142","89156"]}' />
          </div>
          <p className="ylopo-note">Listing data sourced from regional MLS. Information deemed reliable but not guaranteed. Updated daily.</p>
          <div className="listings-actions">
            <a href="https://search.nevadarealestategroup.net/search?s[orderBy]=sourceCreationDate%2Cdesc&s[page]=1&s[locations][0][city]=Las%20Vegas&s[locations][0][state]=NV&s[keywords]=East%20Las%20Vegas" target="_blank" rel="noopener noreferrer" className="btn-gold">View All East Las Vegas Listings &rarr;</a>
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
                  <p>East Las Vegas, encompassing the Sunrise Manor area and surrounding neighborhoods, is one of the most affordable and opportunity-rich residential corridors in the Las Vegas Valley. Stretching east from the Strip corridor to Nellis Air Force Base and beyond toward Lake Mead, this diverse area offers a wide range of housing from vintage mid-century homes to newer tract developments. For buyers priced out of Summerlin, Henderson, and the southwest corridor, East Las Vegas delivers homeownership at price points that are increasingly rare in the valley.</p>
                  <p>The housing stock in East Las Vegas is diverse, ranging from 1960s-era ranch homes in established neighborhoods to 2000s-era tract homes near Sunrise Manor and the Lamb Boulevard corridor. Prices typically start in the low $200,000s for smaller homes and condominiums, reaching into the $500,000 range for larger homes on premium lots or in newer sections. The area's proximity to Nellis AFB creates consistent rental demand from military families, making it particularly attractive for investor-buyers.</p>
                  <p>East Las Vegas has benefited from significant public and private investment in recent years. The Sam Boyd Stadium site's redevelopment, improvements along Boulder Highway, and new commercial development near the Hollywood and Lamb corridors are bringing fresh energy to the area. Sunrise Hospital and Medical Center, one of the largest medical facilities in Nevada, anchors the local economy. The Sunrise Marketplace and Boulevard Mall provide established retail, while newer shops and restaurants continue to open.</p>
                  <p>The investment case for East Las Vegas is compelling: some of the lowest price-per-square-foot in the valley, strong rental yields driven by Nellis AFB and Strip employment, and a location that places residents within 15–20 minutes of the Strip, downtown, and Harry Reid Airport. As the valley's western and southern corridors become fully built out and increasingly expensive, East Las Vegas is positioned for the kind of value discovery that has driven appreciation in similar markets nationwide.</p>
                </>
              )}
            </div>
            <div className="overview-aside">
              <div className="quick-facts">
                <h3>East Las Vegas At a Glance</h3>
                {displayStats.map(([label, value, cls]: any) => (
                  <div className="fact-row" key={label}>
                    <span className="fact-label">{label}</span>
                    <span className={`fact-value${cls ? ' ' + cls : ''}`}>{value}</span>
                  </div>
                ))}
              </div>
              <div className="cta-card">
                <p>Ready to explore East Las Vegas? Schedule a private tour of the community and the current listings that match your goals.</p>
                <a href="tel:+17252399950" className="btn-gold">Call 725.239.9950</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="highlights">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Why East Las Vegas</span>
            <h2>What Makes East Las Vegas Stand Out</h2>
          </div>
          <div className="highlights-grid">
            {[
              { title: 'Most Affordable in the Valley', body: 'East Las Vegas offers some of the lowest home prices in the metro area, with entry-level homes starting in the low $200,000s — making homeownership accessible for first-time buyers and investors.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg> },
              { title: 'Nellis AFB Proximity', body: 'Adjacent to Nellis Air Force Base, one of the largest employers in Clark County. Military families and personnel create consistent rental demand throughout the east side.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
              { title: 'Strip & Airport Access', body: 'East Las Vegas is 15–20 minutes from the Strip and Harry Reid Airport via Boulder Highway, Flamingo Road, or I-515. Commute times rival many western and southern communities.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><line x1="8" y1="6" x2="8" y2="6.01"/><line x1="12" y1="6" x2="12" y2="6.01"/><line x1="16" y1="6" x2="16" y2="6.01"/><line x1="8" y1="10" x2="8" y2="10.01"/><line x1="12" y1="10" x2="12" y2="10.01"/><line x1="16" y1="10" x2="16" y2="10.01"/><line x1="8" y1="14" x2="8" y2="14.01"/><line x1="12" y1="14" x2="12" y2="14.01"/><line x1="16" y1="14" x2="16" y2="14.01"/></svg> },
              { title: 'Lake Mead & Outdoor Recreation', body: 'Lake Mead National Recreation Area is just 20–30 minutes east. Residents enjoy boating, fishing, hiking, and scenic drives through the desert landscape.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M8 21l4-11 4 11"/><path d="M2 21l5-14 4 8"/><path d="M14 15l4-8 4 14"/><line x1="2" y1="21" x2="22" y2="21"/></svg> },
              { title: 'Sunrise Hospital & Medical Hub', body: 'Sunrise Hospital and Medical Center is one of Nevada\'s largest healthcare facilities, anchoring a medical corridor that provides employment and healthcare access for east side residents.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22c4-4 8-7.5 8-12a8 8 0 10-16 0c0 4.5 4 8 8 12z"/><circle cx="12" cy="10" r="3"/></svg> },
              { title: 'Strong Rental Yields', body: 'Low purchase prices combined with steady rental demand from Nellis AFB, Strip workers, and medical professionals create some of the strongest cap rates in the Las Vegas metro.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
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

      <EastLasVegasFAQ />

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
              { name: 'Henderson', href: '/henderson/', price: 'From $350K', compare: 'Nevada\'s second-largest city to the south with master-planned communities and strong schools.' },
              { name: 'Downtown Las Vegas', href: '/downtown-las-vegas/', price: 'From $200K', compare: 'The urban core with Arts District, high-rises, and walkable entertainment. 10 minutes west.' },
              { name: 'Boulder City', href: '/boulder-city/', price: 'From $400K', compare: 'Small-town charm near Hoover Dam with no gaming, controlled growth, and outdoor recreation.' },
              { name: 'Whitney Ranch', href: '/whitney-ranch/', price: 'From $350K', compare: 'Established Henderson community with parks, pools, and strong family amenities.' },
              { name: 'Paradise', href: '/paradise/', price: 'From $250K', compare: 'Unincorporated area home to the Strip with diverse housing from condos to estates.' },
              { name: 'Lake Las Vegas', href: '/lake-las-vegas/', price: 'From $400K', compare: 'Resort-style lakefront living in Henderson with a Mediterranean village and water sports.' },
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
              <h2>Ready to Find Your East Las Vegas Home?</h2>
              <p>Nevada Real Estate Group is the #1 real estate team in Nevada. Whether you&apos;re buying or selling in East Las Vegas, let&apos;s talk.</p>
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
                <input type="hidden" name="_subject" value="East Las Vegas Inquiry — LasVegasHomeSearchExperts.com" />
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
