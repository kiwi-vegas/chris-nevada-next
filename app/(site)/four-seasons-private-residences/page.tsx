import FourSeasonsPrivateResidencesFAQ from '@/components/FourSeasonsPrivateResidencesFAQ'
import Link from 'next/link'
import type { Metadata } from 'next'
import FourSeasonsPrivateResidencesMapWrapper from '@/components/FourSeasonsPrivateResidencesMapWrapper'
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
    { '@type': 'ListItem', position: 3, name: 'Four Seasons Private Residences', item: 'https://www.lasvegashomesearchexperts.com/four-seasons-private-residences/' },
  ],
}

const FAQ_DATA = [
  {
    "q": "What is the price range for Four Seasons Private Residences?",
    "a": "Residences range from approximately $3.67 million for entry-level units to over $28.95 million for the most exclusive sky residences and penthouses. This establishes a new pricing ceiling for the Las Vegas metro area."
  },
  {
    "q": "When will Four Seasons Private Residences be completed?",
    "a": "The development is expected to begin delivering residences in 2027. Pre-construction sales have been strong, with approximately 75% of the 171 units reported sold."
  },
  {
    "q": "What services are included with Four Seasons residences?",
    "a": "Residents receive full Four Seasons hospitality services including 24-hour concierge, valet parking, housekeeping, in-residence dining, spa services, fitness center access, and curated social programming."
  },
  {
    "q": "Is Four Seasons part of MacDonald Highlands?",
    "a": "Yes. Four Seasons Private Residences is located within the guard-gated MacDonald Highlands community in Henderson. Residents have access to MacDonald Highlands amenities including DragonRidge Country Club."
  },
  {
    "q": "How many units are in Four Seasons Private Residences?",
    "a": "The development includes 171 residences across multiple floor plan types, from garden-level units to full-floor penthouses and sky residences."
  },
  {
    "q": "What are HOA/service fees at Four Seasons?",
    "a": "Monthly fees at Four Seasons Private Residences are estimated between $2,000 and $5,000+ per month, reflecting the full-service Four Seasons hospitality model including concierge, security, housekeeping options, and resort amenities."
  },
  {
    "q": "Can I play golf at DragonRidge as a Four Seasons resident?",
    "a": "Four Seasons Private Residences is located within MacDonald Highlands, which is home to DragonRidge Country Club. Membership at DragonRidge is separate and available to residents on a fee basis."
  },
  {
    "q": "Is this a hotel or private residences?",
    "a": "Four Seasons Private Residences are privately owned homes — not hotel units. Owners receive Four Seasons-branded services and amenities, but the residences are full-time homes with private ownership, not timeshares or hotel-condo units."
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
  name: 'Four Seasons Private Residences',
  description: 'Four Seasons Private Residences is a luxury branded residences · new construction community in Henderson, Nevada.',
  geo: { '@type': 'GeoCoordinates', latitude: 36.015, longitude: -114.985 },
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
  const cms = await getCommunityPage('four-seasons-private-residences')
  return {
    title: cms?.metaTitle ?? 'Four Seasons Private Residences Homes for Sale | Nevada Real Estate Group',
    description: cms?.metaDescription ?? 'Browse Four Seasons Private Residences homes for sale in Henderson, NV. $3.67M–$28.95M+. Schools, HOA, market stats. Nevada Real Estate Group.',
  }
}

export default async function FourSeasonsPrivateResidencesPage() {
  const cms = await getCommunityPage('four-seasons-private-residences')
  const market = getMarketStats('four-seasons-private-residences')
  const ms = market?.stats

  const heroHeadline = cms?.heroHeadline ?? 'Four Seasons Private Residences'
  const heroSubtitle = 'Homes for Sale in Henderson, Nevada'
  const overviewTitle = cms?.overviewTitle ?? 'Four Seasons Private Residences: Luxury Branded Residences · New Construction Living in Henderson'

  const HARDCODED_STATS: Array<[string, string] | [string, string, string]> = [
    ['Established', '2024'],
    ['Developer', 'Discovery Land Company / MacDonald Highlands'],
    ['Total Acreage', '~15 acres'],
    ['Homes', '171'],
    ['Median Home Price', ms?.medianSalePrice ?? '$3.67M–$28.95M+'],
    ['ZIP Codes', '89012'],
    ['Guard-Gated', 'Yes'],
    ['HOA', '$2,000–$5,000+/mo'],
  ]
  const displayStats = mergeQuickStats(HARDCODED_STATS, cms?.quickStats)
  const HARDCODED_DRIVE_TIMES = [
    {
        "time": "~20 min",
        "destination": "to the Strip",
        "route": "via I-215 West → I-15 North"
    },
    {
        "time": "~15 min",
        "destination": "to Harry Reid Airport",
        "route": "via I-215 West → I-15"
    },
    {
        "time": "~10 min",
        "destination": "to Henderson Green Valley",
        "route": "via Horizon Ridge Pkwy"
    },
    {
        "time": "~25 min",
        "destination": "to Downtown Las Vegas",
        "route": "via I-515 North"
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
          <span>Four Seasons Private Residences</span>
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
                <span className="hero-v2-stat-num">{ms?.medianSalePrice ?? qs('Median Home Price', '$3.67M–$28.95M+')}</span>
                <span className="hero-v2-stat-lbl">Median Sale Price</span>
              </div>
              <div className="hero-v2-stat">
                <span className="hero-v2-stat-num">{ms?.avgDaysToClose ?? qs('Avg Days on Market', '45')}</span>
                <span className="hero-v2-stat-lbl">Avg Days to Close</span>
              </div>
            </div>
            <a href="#listings" className="hero-v2-cta">Search Homes in Four Seasons Private Residences</a>
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
              <span><strong>Type:</strong> Luxury Branded Residences · New Construction</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
              <span><strong>Price Range:</strong> $3.67M–$28.95M+</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
              <span><strong>HOA:</strong> $2,000–$5,000+/mo</span>
            </div>
          </div>
          <div className="hero-v2-qfb-est">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            <span>Est. 2024</span>
          </div>
        </div>
      </div>

      <section id="demographics" className="demographics-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Demographics</span>
            <h2>Four Seasons Private Residences Demographics</h2>
          </div>
          <div className="demo-grid">
            {[
              ['~350 (projected)', 'Population'],
              ['55', 'Median Age'],
              ['$1,000,000+', 'Avg Household Income'],
              ['171', 'Total Households'],
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
            <h2>Where is Four Seasons Private Residences?</h2>
            <p>MacDonald Highlands, Henderson &mdash; Henderson, Nevada.</p>
          </div>
          <div className="map-container">
            <FourSeasonsPrivateResidencesMapWrapper />
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
            <h2 className="listings-title">NEW FOUR SEASONS PRIVATE RESIDENCES LISTINGS</h2>
          </div>
          <div className="ylopo-wrap">
            <div className="YLOPO_searchWidget" />
            <div className="YLOPO_resultsWidget" data-search='{"propertyTypes":["house","condo","townhouse"],"minPrice":3670000,"locations":[{"city":"Henderson","state":"NV"}],"limit":12,"sortBy":"listDate","sortOrder":"desc","keywords":"Four Seasons Private Residences MacDonald Highlands","zipCodes":["89012"]}' />
          </div>
          <p className="ylopo-note">Listing data sourced from regional MLS. Information deemed reliable but not guaranteed. Updated daily.</p>
          <div className="listings-actions">
            <a href="https://search.nevadarealestategroup.net/search?s[orderBy]=sourceCreationDate%2Cdesc&s[page]=1&s[locations][0][city]=Henderson&s[locations][0][state]=NV&s[keywords]=Four%20Seasons%20Private%20Residences%20MacDonald%20Highlands" target="_blank" rel="noopener noreferrer" className="btn-gold">View All Four Seasons Private Residences Listings &rarr;</a>
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
                  <p>Four Seasons Private Residences Las Vegas is the most anticipated ultra-luxury residential development in the history of the Las Vegas Valley. Located within the guard-gated MacDonald Highlands community in Henderson, this 171-unit branded residence project brings the legendary Four Seasons hospitality brand to the residential market for the first time in Nevada, offering a level of service and luxury that is unprecedented in the region.</p>
                  <p>The project features a curated collection of residences ranging from approximately $3.67 million for entry-level units to over $28.95 million for the most exclusive penthouses and estate residences. Each home is designed with the Four Seasons standard of excellence, featuring premium finishes, expansive floor plans, and floor-to-ceiling glass that frames panoramic views of the Las Vegas Strip, the McCullough Range, and the desert landscape stretching to the horizon.</p>
                  <p>Residents of Four Seasons Private Residences enjoy a full suite of Four Seasons services, including 24-hour concierge, valet parking, housekeeping, in-residence dining, spa services, and access to resort-caliber amenities including infinity pools, a state-of-the-art fitness center, private dining rooms, and curated social programming. The development also benefits from its location within MacDonald Highlands, providing access to DragonRidge Country Club's Tom Fazio-designed championship golf course.</p>
                  <p>With approximately 75% of units reported sold during pre-construction, Four Seasons Private Residences has validated Las Vegas as a legitimate destination for branded ultra-luxury living. The project is expected to begin deliveries in 2027, establishing a new ceiling for residential real estate pricing in the Las Vegas metro area and attracting an international clientele of high-net-worth individuals seeking a primary residence, second home, or investment property.</p>
                </>
              )}
            </div>
            <div className="overview-aside">
              <div className="quick-facts">
                <h3>Four Seasons Private Residences At a Glance</h3>
                {displayStats.map(([label, value, cls]: any) => (
                  <div className="fact-row" key={label}>
                    <span className="fact-label">{label}</span>
                    <span className={`fact-value${cls ? ' ' + cls : ''}`}>{value}</span>
                  </div>
                ))}
              </div>
              <div className="cta-card">
                <p>Ready to explore Four Seasons Private Residences? Schedule a private tour of the community and the current listings that match your goals.</p>
                <a href="tel:+17252399950" className="btn-gold">Call 725.239.9950</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="highlights">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Why Four Seasons Private Residences</span>
            <h2>What Makes Four Seasons Private Residences Stand Out</h2>
          </div>
          <div className="highlights-grid">
            {[
              { title: 'Four Seasons Service', body: 'Full Four Seasons hospitality including 24-hour concierge, in-residence dining, housekeeping, valet, and spa services — the first branded residences of this caliber in Nevada.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><line x1="8" y1="6" x2="8" y2="6.01"/><line x1="12" y1="6" x2="12" y2="6.01"/><line x1="16" y1="6" x2="16" y2="6.01"/><line x1="8" y1="10" x2="8" y2="10.01"/><line x1="12" y1="10" x2="12" y2="10.01"/><line x1="16" y1="10" x2="16" y2="10.01"/><line x1="8" y1="14" x2="8" y2="14.01"/><line x1="12" y1="14" x2="12" y2="14.01"/><line x1="16" y1="14" x2="16" y2="14.01"/></svg> },
              { title: 'Ultra-Luxury Pricing', body: 'Residences from $3.67 million to over $28.95 million, establishing a new pricing benchmark for the Las Vegas metro luxury market.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg> },
              { title: 'Panoramic Strip Views', body: 'Floor-to-ceiling glass frames sweeping views of the Las Vegas Strip, the McCullough Range, and the desert valley from the elevated MacDonald Highlands position.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M8 21l4-11 4 11"/><path d="M2 21l5-14 4 8"/><path d="M14 15l4-8 4 14"/><line x1="2" y1="21" x2="22" y2="21"/></svg> },
              { title: 'DragonRidge Golf Access', body: 'Located within MacDonald Highlands, residents can access DragonRidge Country Club\'s Tom Fazio-designed championship course, dining, and spa.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 2v10l7 4"/></svg> },
              { title: 'Resort-Caliber Amenities', body: 'Infinity pools, state-of-the-art fitness center, private dining rooms, spa treatment rooms, and curated social programming for residents.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
              { title: 'Guard-Gated Privacy', body: 'Located within the guard-gated MacDonald Highlands community with additional private security and controlled access for Four Seasons residents.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
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

      <FourSeasonsPrivateResidencesFAQ />

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
              { name: 'MacDonald Highlands', href: '/macdonald-highlands/', price: 'From $800K', compare: 'The guard-gated luxury community surrounding Four Seasons with DragonRidge Country Club.' },
              { name: 'MacDonald Ranch', href: '/macdonald-ranch/', price: 'From $300K', compare: 'The broader Henderson master-plan area including Sun City, Foothills, and Sunridge.' },
              { name: 'Ascaya', href: '/ascaya/', price: 'From $3M', compare: 'Ultra-luxury custom lot community in the Henderson foothills with dramatic desert views.' },
              { name: 'The Ridges', href: '/summerlin-the-ridges/', price: 'From $2M', compare: 'Summerlin\'s ultra-luxury guard-gated enclave — the west valley\'s equivalent.' },
              { name: 'The Summit Club', href: '/the-summit-club/', price: 'From $5M', compare: 'Las Vegas\' most exclusive private community with Tom Fazio golf. By invitation only.' },
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
              <h2>Ready to Find Your Four Seasons Private Residences Home?</h2>
              <p>Nevada Real Estate Group is the #1 real estate team in Nevada. Whether you&apos;re buying or selling in Four Seasons Private Residences, let&apos;s talk.</p>
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
                <input type="hidden" name="_subject" value="Four Seasons Private Residences Inquiry — LasVegasHomeSearchExperts.com" />
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
