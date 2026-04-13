import MountCharlestonFAQ from '@/components/MountCharlestonFAQ'
import Link from 'next/link'
import type { Metadata } from 'next'
import MountCharlestonMapWrapper from '@/components/MountCharlestonMapWrapper'
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
    { '@type': 'ListItem', position: 3, name: 'Mount Charleston', item: 'https://www.lasvegashomesearchexperts.com/mount-charleston/' },
  ],
}

const FAQ_DATA = [
  {
    "q": "What is the price range for homes on Mount Charleston?",
    "a": "Homes on Mount Charleston range from approximately $400,000 for rustic cabins to over $1.5 million for custom mountain estates with premium views and modern construction."
  },
  {
    "q": "Does it snow on Mount Charleston?",
    "a": "Yes. Mount Charleston receives significant snowfall each winter, typically from November through March. The Lee Canyon area at higher elevation receives the most snow, supporting the Lee Canyon Ski Resort."
  },
  {
    "q": "Can you live on Mount Charleston year-round?",
    "a": "Yes. Most Mount Charleston residents are full-time, year-round residents. The roads are maintained by NDOT through winter, though chains or 4WD may be advisable during heavy snowstorms."
  },
  {
    "q": "How far is Mount Charleston from Las Vegas?",
    "a": "Mount Charleston is approximately 35 minutes from the Las Vegas Strip via Kyle Canyon Road. Many residents commute daily to valley-floor jobs."
  },
  {
    "q": "What is the elevation of Mount Charleston?",
    "a": "Residential areas range from approximately 6,500 to 8,500 feet elevation. Charleston Peak, the highest point, reaches 11,916 feet — the tallest peak in the Spring Mountains."
  },
  {
    "q": "Is there a ski resort on Mount Charleston?",
    "a": "Yes. Lee Canyon Ski & Snowboard Resort offers 195 acres of skiable terrain with 3 chairlifts, night skiing, and a lodge. It is Nevada's only ski area."
  },
  {
    "q": "Are there stores and restaurants on Mount Charleston?",
    "a": "The Mount Charleston Lodge (rebuilt after the 2021 fire) provides dining and events. For full grocery and retail, residents drive to the Summerlin area, approximately 25 minutes downhill."
  },
  {
    "q": "How many homes are on Mount Charleston?",
    "a": "Mount Charleston has approximately 500 homes split between Kyle Canyon, Lee Canyon, and Rainbow Canyon. Development is constrained by National Forest boundaries, ensuring permanent scarcity."
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
  name: 'Mount Charleston',
  description: 'Mount Charleston is a mountain · resort community in Mount Charleston, Nevada.',
  geo: { '@type': 'GeoCoordinates', latitude: 36.275, longitude: -115.645 },
  address: { '@type': 'PostalAddress', addressLocality: 'Mount Charleston', addressRegion: 'NV', postalCode: '89124', addressCountry: 'US' },
  containedInPlace: { '@type': 'City', name: 'Mount Charleston' },
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
  const cms = await getCommunityPage('mount-charleston')
  return {
    title: cms?.metaTitle ?? 'Mount Charleston Homes for Sale | Nevada Real Estate Group',
    description: cms?.metaDescription ?? 'Browse Mount Charleston homes for sale in Mount Charleston, NV. $400K–$1.5M+. Schools, HOA, market stats. Nevada Real Estate Group.',
  }
}

export default async function MountCharlestonPage() {
  const cms = await getCommunityPage('mount-charleston')
  const market = getMarketStats('mount-charleston')
  const ms = market?.stats

  const heroHeadline = cms?.heroHeadline ?? 'Mount Charleston'
  const heroSubtitle = 'Homes for Sale in Mount Charleston, Nevada'
  const overviewTitle = cms?.overviewTitle ?? 'Mount Charleston: Mountain · Resort Living in Mount Charleston'

  const HARDCODED_STATS: Array<[string, string] | [string, string, string]> = [
    ['Established', '1950'],
    ['Developer', 'Various / Private Owners'],
    ['Total Acreage', '~5 sq mi residential'],
    ['Homes', '~500'],
    ['Median Home Price', ms?.medianSalePrice ?? '$400K–$1.5M+'],
    ['ZIP Codes', '89124'],
    ['Guard-Gated', 'No'],
    ['HOA', '$0–$50/mo'],
  ]
  const displayStats = mergeQuickStats(HARDCODED_STATS, cms?.quickStats)
  const HARDCODED_DRIVE_TIMES = [
    {
        "time": "~35 min",
        "destination": "to the Strip",
        "route": "via Kyle Canyon Rd (SR-157) → US-95"
    },
    {
        "time": "~25 min",
        "destination": "to Downtown Summerlin",
        "route": "via Kyle Canyon Rd → W Charleston Blvd"
    },
    {
        "time": "~45 min",
        "destination": "to Harry Reid Airport",
        "route": "via Kyle Canyon Rd → US-95 → I-15"
    },
    {
        "time": "~15 min",
        "destination": "to Lee Canyon Ski Resort",
        "route": "via Lee Canyon Rd (SR-156)"
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
          <span>Mount Charleston</span>
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
                <span className="hero-v2-stat-num">{ms?.medianSalePrice ?? qs('Median Home Price', '$400K–$1.5M+')}</span>
                <span className="hero-v2-stat-lbl">Median Sale Price</span>
              </div>
              <div className="hero-v2-stat">
                <span className="hero-v2-stat-num">{ms?.avgDaysToClose ?? qs('Avg Days on Market', '45')}</span>
                <span className="hero-v2-stat-lbl">Avg Days to Close</span>
              </div>
            </div>
            <a href="#listings" className="hero-v2-cta">Search Homes in Mount Charleston</a>
          </div>
        </div>
      </header>

      <div className="hero-v2-qfb">
        <div className="container">
          <div className="hero-v2-qfb-row">
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <span><strong>ZIP:</strong> 89124</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              <span><strong>Type:</strong> Mountain · Resort</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
              <span><strong>Price Range:</strong> $400K–$1.5M+</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
              <span><strong>HOA:</strong> $0–$50/mo</span>
            </div>
          </div>
          <div className="hero-v2-qfb-est">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            <span>Est. 1950</span>
          </div>
        </div>
      </div>

      <section id="demographics" className="demographics-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Demographics</span>
            <h2>Mount Charleston Demographics</h2>
          </div>
          <div className="demo-grid">
            {[
              ['~400', 'Population'],
              ['52', 'Median Age'],
              ['$110,000+', 'Avg Household Income'],
              ['~200', 'Total Households'],
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
            <h2>Where is Mount Charleston?</h2>
            <p>Spring Mountains, Nevada &mdash; Mount Charleston, Nevada.</p>
          </div>
          <div className="map-container">
            <MountCharlestonMapWrapper />
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
            <h2 className="listings-title">NEW MOUNT CHARLESTON LISTINGS</h2>
          </div>
          <div className="ylopo-wrap">
            <div className="YLOPO_searchWidget" />
            <div className="YLOPO_resultsWidget" data-search='{"propertyTypes":["house","condo","townhouse"],"minPrice":400000,"locations":[{"city":"Las Vegas","state":"NV"}],"limit":12,"sortBy":"listDate","sortOrder":"desc","keywords":"Mount Charleston","zipCodes":["89124"]}' />
          </div>
          <p className="ylopo-note">Listing data sourced from regional MLS. Information deemed reliable but not guaranteed. Updated daily.</p>
          <div className="listings-actions">
            <a href="https://search.nevadarealestategroup.net/search?s[orderBy]=sourceCreationDate%2Cdesc&s[page]=1&s[locations][0][city]=Las%20Vegas&s[locations][0][state]=NV&s[keywords]=Mount%20Charleston" target="_blank" rel="noopener noreferrer" className="btn-gold">View All Mount Charleston Listings &rarr;</a>
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
                  <p>Mount Charleston is the Las Vegas Valley's mountain escape — a collection of residential communities perched at 6,500 to 8,500 feet elevation in the Spring Mountains National Recreation Area, roughly 35 minutes northwest of the Strip. The communities of Kyle Canyon and Lee Canyon offer a genuine four-season mountain lifestyle with pine forests, cool summer temperatures, and winter snowfall, all within an easy drive of the desert valley floor below. For Las Vegas homeowners seeking a primary residence or vacation retreat in the mountains, Mount Charleston is the only option within commuting distance.</p>
                  <p>The residential areas of Mount Charleston are split between two main canyons. Kyle Canyon is the larger and more developed, home to the majority of full-time residents, the Mount Charleston Lodge (rebuilt after the 2021 fire), and the starting point for popular hiking trails. Lee Canyon is home to the Lee Canyon Ski & Snowboard Resort, Nevada's only ski area, and a smaller collection of cabin-style homes. Homes range from rustic A-frame cabins starting around $400,000 to custom mountain estates exceeding $1.5 million.</p>
                  <p>The mountain lifestyle at Mount Charleston is dramatically different from the valley floor. Summer temperatures run 20–30 degrees cooler than Las Vegas — a significant draw when the desert hits 110°F. The Humboldt-Toiyabe National Forest provides endless hiking, mountain biking, and horseback riding through ponderosa pine and bristlecone pine forests. Winter brings snow and skiing at Lee Canyon. The elevation and forest setting support diverse wildlife including wild horses, elk, mule deer, and the Mount Charleston blue butterfly — an endangered species found nowhere else on Earth.</p>
                  <p>Mount Charleston appeals to nature lovers, remote workers, retirees, and anyone seeking a mountain lifestyle without leaving the Las Vegas metro area. The limited housing stock — approximately 500 homes total — and constrained development on U.S. Forest Service land ensure that Mount Charleston will remain a small, exclusive community. Properties trade infrequently, and the market is driven by lifestyle buyers rather than investors, resulting in a uniquely stable and passion-driven real estate market.</p>
                </>
              )}
            </div>
            <div className="overview-aside">
              <div className="quick-facts">
                <h3>Mount Charleston At a Glance</h3>
                {displayStats.map(([label, value, cls]: any) => (
                  <div className="fact-row" key={label}>
                    <span className="fact-label">{label}</span>
                    <span className={`fact-value${cls ? ' ' + cls : ''}`}>{value}</span>
                  </div>
                ))}
              </div>
              <div className="cta-card">
                <p>Ready to explore Mount Charleston? Schedule a private tour of the community and the current listings that match your goals.</p>
                <a href="tel:+17252399950" className="btn-gold">Call 725.239.9950</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="highlights">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Why Mount Charleston</span>
            <h2>What Makes Mount Charleston Stand Out</h2>
          </div>
          <div className="highlights-grid">
            {[
              { title: 'Four-Season Mountain Living', body: 'At 6,500–8,500 feet elevation, Mount Charleston enjoys 20–30 degree cooler summers, fall foliage, winter snow, and spring wildflowers. A true mountain experience 35 minutes from the Strip.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M8 21l4-11 4 11"/><path d="M2 21l5-14 4 8"/><path d="M14 15l4-8 4 14"/><line x1="2" y1="21" x2="22" y2="21"/></svg> },
              { title: 'Lee Canyon Ski Resort', body: 'Nevada\'s only ski and snowboard resort sits at the top of Lee Canyon with 195 acres of skiable terrain, night skiing, and a lodge. Residents enjoy a mountain winter sport right in their backyard.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22c4-4 8-7.5 8-12a8 8 0 10-16 0c0 4.5 4 8 8 12z"/><circle cx="12" cy="10" r="3"/></svg> },
              { title: 'Hiking & National Forest', body: 'The Spring Mountains NRA encompasses over 316,000 acres of Humboldt-Toiyabe National Forest with dozens of hiking trails including the challenging 11,916-foot Charleston Peak summit.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
              { title: '35 Minutes to the Strip', body: 'Despite the mountain setting, Mount Charleston is just 35 minutes from the Las Vegas Strip via Kyle Canyon Road (SR-157) or Lee Canyon Road (SR-156). Many residents commute daily.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><line x1="8" y1="6" x2="8" y2="6.01"/><line x1="12" y1="6" x2="12" y2="6.01"/><line x1="16" y1="6" x2="16" y2="6.01"/><line x1="8" y1="10" x2="8" y2="10.01"/><line x1="12" y1="10" x2="12" y2="10.01"/><line x1="16" y1="10" x2="16" y2="10.01"/><line x1="8" y1="14" x2="8" y2="14.01"/><line x1="12" y1="14" x2="12" y2="14.01"/><line x1="16" y1="14" x2="16" y2="14.01"/></svg> },
              { title: 'Extreme Scarcity', body: 'With only ~500 homes on limited privately held land surrounded by National Forest, Mount Charleston is one of the most supply-constrained markets in Nevada. Properties rarely come to market.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg> },
              { title: 'Wildlife & Dark Skies', body: 'Home to wild horses, elk, mule deer, and the endangered Mount Charleston blue butterfly. Minimal light pollution makes Mount Charleston one of the best stargazing locations near a major city.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
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

      <MountCharlestonFAQ />

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
              { name: 'Blue Diamond', href: '/blue-diamond/', price: 'From $500K', compare: 'Rural equestrian community at the base of the Spring Mountains. Desert setting vs. mountain forest.' },
              { name: 'Summerlin', href: '/summerlin/', price: 'From $450K', compare: 'Premier master-planned community on the valley floor. Full suburban amenities, 25 minutes from the mountain.' },
              { name: 'The Ridges', href: '/summerlin-the-ridges/', price: 'From $2M', compare: 'Ultra-luxury guard-gated Summerlin enclave with Red Rock views. Valley-floor luxury alternative.' },
              { name: 'Red Rock Country Club', href: '/red-rock-country-club/', price: 'From $1.2M', compare: 'Guard-gated golf community in Summerlin with mountain views. Country club lifestyle on the valley floor.' },
              { name: 'Lone Mountain', href: '/lone-mountain/', price: 'From $500K', compare: 'Semi-rural custom homes near Lone Mountain. Larger lots but valley-floor desert setting.' },
              { name: 'Las Vegas', href: '/las-vegas/', price: 'From $300K', compare: 'The broader Las Vegas metro with every community type and price point. 35 minutes from Mount Charleston.' },
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
              <h2>Ready to Find Your Mount Charleston Home?</h2>
              <p>Nevada Real Estate Group is the #1 real estate team in Nevada. Whether you&apos;re buying or selling in Mount Charleston, let&apos;s talk.</p>
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
                <input type="hidden" name="_subject" value="Mount Charleston Inquiry — LasVegasHomeSearchExperts.com" />
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
