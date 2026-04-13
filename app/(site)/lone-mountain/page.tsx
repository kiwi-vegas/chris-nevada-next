import LoneMountainFAQ from '@/components/LoneMountainFAQ'
import Link from 'next/link'
import type { Metadata } from 'next'
import LoneMountainMapWrapper from '@/components/LoneMountainMapWrapper'
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
    { '@type': 'ListItem', position: 3, name: 'Lone Mountain', item: 'https://www.lasvegashomesearchexperts.com/lone-mountain/' },
  ],
}

const FAQ_DATA = [
  {
    "q": "What is the price range for homes in Lone Mountain?",
    "a": "Homes in the Lone Mountain area range from approximately $400,000 for standard-lot single-family homes to $900,000 or more for large-lot custom homes and equestrian estates with acreage."
  },
  {
    "q": "Can you keep horses in Lone Mountain?",
    "a": "Yes. Lone Mountain is one of the few areas in the Las Vegas Valley zoned for horse keeping. Many properties include stables, corrals, riding arenas, and access to riding trails."
  },
  {
    "q": "What is Lone Mountain?",
    "a": "Lone Mountain is a prominent geological formation rising approximately 600 feet above the surrounding desert in northwest Las Vegas. The residential area surrounding it features large-lot homes, equestrian properties, and mountain views."
  },
  {
    "q": "What ZIP codes are in the Lone Mountain area?",
    "a": "The Lone Mountain area spans portions of ZIP codes 89129, 89131, and 89149 in northwest Las Vegas. Home prices range from $400K–$900K."
  },
  {
    "q": "Do homes in Lone Mountain have an HOA?",
    "a": "Many Lone Mountain properties — particularly the larger-lot and equestrian properties — have no HOA. This gives owners maximum flexibility for land use. Some newer subdivisions on the community's periphery do have HOA associations. Monthly HOA fees in Lone Mountain range from $0–$150/mo, which typically covers common area maintenance, landscaping, and reserve fund contributions."
  },
  {
    "q": "How far is Lone Mountain from the Strip?",
    "a": "Lone Mountain is approximately 20 minutes from the Las Vegas Strip via US-95 South. Downtown Summerlin is about 15 minutes south."
  },
  {
    "q": "Is Lone Mountain good for families?",
    "a": "Lone Mountain is excellent for families seeking space, privacy, and outdoor living. The large lots, mountain views, and proximity to parks and trails create a unique family environment. Schools include Lowman Elementary (8/10) and Escobedo Middle (7/10)."
  },
  {
    "q": "What schools serve Lone Mountain?",
    "a": "Lone Mountain is served by CCSD schools including Lowman Elementary (8/10) and Escobedo Middle (7/10). Private options include The Meadows School (A+) and Bishop Gorman (A+). Doral Academy Red Rock (9/10) is a top charter option."
  },
  {
    "q": "What are the best sub-neighborhoods within Lone Mountain?",
    "a": "The best sub-neighborhood depends on your priorities — school zones, lot size, home age, and proximity to amenities all vary within the community. Nevada Real Estate Group agents who specialize in Lone Mountain can walk you through the specific blocks and streets that match your criteria."
  },
  {
    "q": "How is new construction availability in Lone Mountain?",
    "a": "New construction availability varies by season and builder phase. Some sections of Lone Mountain have active new home sales while others are fully built out with resale-only inventory. Contact Nevada Real Estate Group for the most current new construction options."
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
  name: 'Lone Mountain',
  description: 'Lone Mountain is a semi-rural · equestrian · luxury community in Las Vegas, Nevada (ZIP 89129), established in 1990, spanning ~5 sq mi. Home prices range from $400K–$900K.',
  geo: { '@type': 'GeoCoordinates', latitude: 36.26, longitude: -115.297 },
  address: { '@type': 'PostalAddress', addressLocality: 'Las Vegas', addressRegion: 'NV', postalCode: '89129', addressCountry: 'US' },
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
  const cms = await getCommunityPage('lone-mountain')
  return {
    title: cms?.metaTitle ?? 'Lone Mountain Homes for Sale | Nevada Real Estate Group',
    description: cms?.metaDescription ?? 'Browse Lone Mountain homes for sale in Las Vegas, NV. $400K–$900K. Schools, HOA, market stats. Nevada Real Estate Group.',
    alternates: { canonical: 'https://www.lasvegashomesearchexperts.com/lone-mountain' },
  }
}

export default async function LoneMountainPage() {
  const cms = await getCommunityPage('lone-mountain')
  const market = getMarketStats('lone-mountain')
  const ms = market?.stats

  const heroHeadline = cms?.heroHeadline ?? 'Lone Mountain'
  const heroSubtitle = 'Homes for Sale in Las Vegas, Nevada'
  const overviewTitle = cms?.overviewTitle ?? 'Lone Mountain: Semi-Rural · Equestrian · Luxury Living in Las Vegas'

  const HARDCODED_STATS: Array<[string, string] | [string, string, string]> = [
    ['Established', '1990'],
    ['Developer', 'Various'],
    ['Total Acreage', '~5 sq mi'],
    ['Homes', '3,000+'],
    ['Median Home Price', ms?.medianSalePrice ?? '$400K–$900K'],
    ['ZIP Codes', '89129, 89131, 89149'],
    ['Guard-Gated', 'No'],
    ['HOA', '$0–$150/mo'],
  ]
  const displayStats = mergeQuickStats(HARDCODED_STATS, cms?.quickStats)
  const HARDCODED_DRIVE_TIMES = [
    {
        "time": "~20 min",
        "destination": "to the Strip",
        "route": "via US-95 South → I-15"
    },
    {
        "time": "~15 min",
        "destination": "to Downtown Summerlin",
        "route": "via Durango Dr South"
    },
    {
        "time": "~30 min",
        "destination": "to Harry Reid Airport",
        "route": "via US-95 → I-15 South"
    },
    {
        "time": "~15 min",
        "destination": "to Mount Charleston / Lee Canyon",
        "route": "via US-95 → Kyle Canyon Rd"
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
          <span>Lone Mountain</span>
        </div>
      </div>

      <header id="hero" className="summerlin-hero hero-v2">
        <img src="https://images.unsplash.com/photo-1581351721010-8cf859cb14a4?auto=format&fit=crop&w=1600&h=700&q=80" alt="Lone Mountain community aerial view, Las Vegas Nevada" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
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
                <span className="hero-v2-stat-num">{ms?.medianSalePrice ?? qs('Median Home Price', '$400K–$900K')}</span>
                <span className="hero-v2-stat-lbl">Median Sale Price</span>
              </div>
              <div className="hero-v2-stat">
                <span className="hero-v2-stat-num">{ms?.avgDaysToClose ?? qs('Avg Days on Market', '45')}</span>
                <span className="hero-v2-stat-lbl">Avg Days to Close</span>
              </div>
            </div>
            <a href="#listings" className="hero-v2-cta">Search Homes in Lone Mountain</a>
          </div>
        </div>
      </header>

      <div className="hero-v2-qfb">
        <div className="container">
          <div className="hero-v2-qfb-row">
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <span><strong>ZIP:</strong> 89129, 89131, 89149</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              <span><strong>Type:</strong> Semi-Rural · Equestrian · Luxury</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
              <span><strong>Price Range:</strong> $400K–$900K</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
              <span><strong>HOA:</strong> $0–$150/mo</span>
            </div>
          </div>
          <div className="hero-v2-qfb-est">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            <span>Est. 1990</span>
          </div>
        </div>
      </div>

      <section id="demographics" className="demographics-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Demographics</span>
            <h2>Lone Mountain Demographics</h2>
          </div>
          <div className="demo-grid">
            {[
              ['10,000+', 'Population'],
              ['40', 'Median Age'],
              ['$90,000', 'Avg Household Income'],
              ['3,200+', 'Total Households'],
              ['78%', 'Homeownership Rate'],
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
            <h2>Where is Lone Mountain?</h2>
            <p>Northwest Las Vegas, Nevada &mdash; Las Vegas, Nevada.</p>
          </div>
          <div className="map-container">
            <LoneMountainMapWrapper />
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
            <h2 className="listings-title">NEW LONE MOUNTAIN LISTINGS</h2>
          </div>
          <div className="ylopo-wrap">
            <div className="YLOPO_searchWidget" />
            <div className="YLOPO_resultsWidget" data-search='{"propertyTypes":["house","condo","townhouse"],"minPrice":350000,"locations":[{"city":"Las Vegas","state":"NV"}],"limit":12,"sortBy":"listDate","sortOrder":"desc","keywords":"Lone Mountain","zipCodes":["89129","89131","89149"]}' />
          </div>
          <p className="ylopo-note">Listing data sourced from regional MLS. Information deemed reliable but not guaranteed. Updated daily.</p>
          <div className="listings-actions">
            <a href="https://search.nevadarealestategroup.net/search?s[orderBy]=sourceCreationDate%2Cdesc&s[page]=1&s[locations][0][city]=Las%20Vegas&s[locations][0][state]=NV&s[keywords]=Lone%20Mountain" target="_blank" rel="noopener noreferrer" className="btn-gold">View All Lone Mountain Listings &rarr;</a>
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
                  <p>Lone Mountain is a semi-rural · equestrian · luxury community in Las Vegas, Nevada (ZIP 89129/89131), established in 1990, spanning ~5 sq mi, with 3,000+ homes. Lone Mountain is one of the most distinctive and sought-after residential enclaves in the Las Vegas Valley. Named for the prominent Lone Mountain geological formation that rises approximately 600 feet above the surrounding desert, this northwest Las Vegas community offers something that virtually no other area in the metro can match: semi-rural living with large lots, equestrian properties, and sweeping mountain views — all within 20 minutes of the Strip.</p>
                  <p>The area surrounding Lone Mountain features a mix of larger custom homes on half-acre to multi-acre lots, equestrian properties with horse facilities, and newer suburban development along its eastern and southern edges. The large lot sizes and relaxed zoning allow for horse keeping, RV storage, workshops, and the kind of personal space that is increasingly rare in the urbanizing valley. Many properties feature custom architecture, private pools, and views of Lone Mountain itself or the broader Spring Mountain range.</p>
                  <p>Homes in the Lone Mountain area range from approximately $400,000 for standard-lot single-family homes on the community's periphery to $900,000 or more for large-lot custom homes and equestrian estates with acreage. The most premium properties are those with unobstructed Lone Mountain views, horse facilities, and full-custom construction. Unlike most Las Vegas communities, many Lone Mountain properties do not have an HOA, giving owners maximum flexibility for how they use their land.</p>
                  <p>Lone Mountain's location is strategically advantageous. It sits between Summerlin to the south and the newer Skye Canyon community to the north, with Centennial Hills to the east. The US-95 freeway is easily accessible for commutes, and the commercial corridors along Durango, Elkhorn, and Ann Road provide shopping, dining, and services. For buyers who want space, privacy, mountain views, and the option to keep horses — all within commuting distance of the valley's employment centers — Lone Mountain is unique.</p>
                </>
              )}
            </div>
            <div className="overview-aside">
              <div className="quick-facts">
                <h3>Lone Mountain At a Glance</h3>
                {displayStats.map(([label, value, cls]: any) => (
                  <div className="fact-row" key={label}>
                    <span className="fact-label">{label}</span>
                    <span className={`fact-value${cls ? ' ' + cls : ''}`}>{value}</span>
                  </div>
                ))}
              </div>
              <div className="cta-card">
                <p>Ready to explore Lone Mountain? Schedule a private tour of the community and the current listings that match your goals.</p>
                <a href="tel:+17252399950" className="btn-gold">Call 725.239.9950</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="top-facts" className="top-facts-section">
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center' }}>
            <span className="section-label">Quick Facts</span>
            <h2>Top 7 Facts About Lone Mountain</h2>
          </div>
          <ol className="top-facts-list">
            <li key={0}>Lone Mountain spans ~5 sq mi in Las Vegas, Nevada (ZIP 89129, 89131).</li>
            <li key={1}>Lone Mountain was established in 1990.</li>
            <li key={2}>Lone Mountain contains 3,000+ homes with prices ranging from $400K–$900K.</li>
            <li key={3}>Lone Mountain is a semi-rural · equestrian · luxury community.</li>
            <li key={4}>HOA fees in Lone Mountain range from $0–$150/mo per month.</li>
            <li key={5}>Top-rated schools serving Lone Mountain include Zel & Mary Lowman Elementary (8/10) and Edmundo \'Eddie\' Escobedo Middle (7/10).</li>
            <li key={6}>Lone Mountain is located ~20 min to the Strip via US-95 South → I-15.</li>
          </ol>
        </div>
      </section>

      <section id="highlights">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Why Lone Mountain</span>
            <h2>What Makes Lone Mountain Stand Out</h2>
          </div>
          <div className="highlights-grid">
            {[
              { title: 'Large Lot Living', body: 'Half-acre to multi-acre lots that are increasingly rare in the Las Vegas Valley. Room for pools, workshops, RV storage, and outdoor living that standard subdivisions can\'t offer.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
              { title: 'Equestrian Properties', body: 'One of the few areas in the valley zoned for horse keeping. Properties with stables, corrals, arenas, and trail access for equestrian enthusiasts.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M8 21l4-11 4 11"/><path d="M2 21l5-14 4 8"/><path d="M14 15l4-8 4 14"/><line x1="2" y1="21" x2="22" y2="21"/></svg> },
              { title: 'Lone Mountain Views', body: 'The iconic 600-foot Lone Mountain formation provides a dramatic backdrop. Many homes enjoy unobstructed views of this geological landmark and the Spring Mountains beyond.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22c4-4 8-7.5 8-12a8 8 0 10-16 0c0 4.5 4 8 8 12z"/><circle cx="12" cy="10" r="3"/></svg> },
              { title: 'No HOA Options', body: 'Many Lone Mountain properties have no HOA, giving owners maximum flexibility for land use, home modifications, and property improvements without association restrictions.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
              { title: 'Strategic Location', body: 'Between Summerlin and Skye Canyon with easy US-95 access. 20 minutes to the Strip, 15 minutes to Downtown Summerlin, and 15 minutes to mountain recreation.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><line x1="8" y1="6" x2="8" y2="6.01"/><line x1="12" y1="6" x2="12" y2="6.01"/><line x1="16" y1="6" x2="16" y2="6.01"/><line x1="8" y1="10" x2="8" y2="10.01"/><line x1="12" y1="10" x2="12" y2="10.01"/><line x1="16" y1="10" x2="16" y2="10.01"/><line x1="8" y1="14" x2="8" y2="14.01"/><line x1="12" y1="14" x2="12" y2="14.01"/><line x1="16" y1="14" x2="16" y2="14.01"/></svg> },
              { title: 'Scarcity Value', body: 'Large-lot semi-rural properties in the Las Vegas Valley are a finite resource. As the valley urbanizes, Lone Mountain\'s acreage properties become increasingly rare and valuable.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg> },
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

      <section id="parks" className="parks-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Outdoor Amenities</span>
            <h2>Parks &amp; Recreation Near Lone Mountain</h2>
          </div>
          <div className="parks-grid">
            {[
              { name: 'Lone Mountain Regional Park', address: '4445 N Jensen St, Las Vegas, NV 89129', acreage: '~30 acres', amenities: ["Hiking trails","Mountain summit trail","Picnic areas","Desert landscape views","Wildlife viewing"] },
              { name: 'Floyd Lamb Park at Tule Springs', address: '9200 Tule Springs Rd, Las Vegas, NV 89131', acreage: '~680 acres', amenities: ["Fishing ponds","Picnic areas","Historic ranch buildings","Walking trails","Peacock gardens"] },
              { name: 'Centennial Hills Park', address: '7101 N Buffalo Dr, Las Vegas, NV 89131', acreage: '~20 acres', amenities: ["Swimming pool","Water slide","Sports courts","Playground","Walking trails"] },
            ].map((park: any) => (
              <div className="park-card" key={park.name}>
                <h3 className="park-name">{park.name}</h3>
                <p className="park-address">{park.address}</p>
                <span className="park-acreage">{park.acreage}</span>
                <ul className="park-amenities">
                  {park.amenities.map((a: string) => <li key={a}>{a}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="lifestyle" className="lifestyle-v2">
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center' }}>
            <span className="section-label">Outdoor Living</span>
            <h2>The Lone Mountain Lifestyle</h2>
          </div>
          <div className="lifestyle-v2-grid">
            <div className="lifestyle-v2-item">
              <div className="lifestyle-v2-icon"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg></div>
              <div className="lifestyle-v2-stat">~20 min</div>
              <div className="lifestyle-v2-label">to the Strip</div>
            </div>
            <div className="lifestyle-v2-item">
              <div className="lifestyle-v2-icon"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22c4-4 8-7.5 8-12a8 8 0 10-16 0c0 4.5 4 8 8 12z"/><circle cx="12" cy="10" r="3"/></svg></div>
              <div className="lifestyle-v2-stat">3+</div>
              <div className="lifestyle-v2-label">Nearby Parks</div>
            </div>
            <div className="lifestyle-v2-item">
              <div className="lifestyle-v2-icon"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg></div>
              <div className="lifestyle-v2-stat">3,000+</div>
              <div className="lifestyle-v2-label">Homes</div>
            </div>
            <div className="lifestyle-v2-item">
              <div className="lifestyle-v2-icon"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 2v10l7 4"/></svg></div>
              <div className="lifestyle-v2-stat">1990</div>
              <div className="lifestyle-v2-label">Established</div>
            </div>
            <div className="lifestyle-v2-item">
              <div className="lifestyle-v2-icon"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg></div>
              <div className="lifestyle-v2-stat">No</div>
              <div className="lifestyle-v2-label">Guard-Gated</div>
            </div>
          </div>
        </div>
      </section>

      <section id="hoa" className="hoa-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">HOA</span>
            <h2>HOA Information for Lone Mountain</h2>
          </div>
          <div className="hoa-grid">
            <div className="hoa-fees-col">
              <h3>Fees &amp; Management</h3>
              <div className="hoa-fee-row"><span>Monthly HOA Range</span><strong>$0–$150/mo</strong></div>
              <div className="hoa-fee-row"><span>Guard-Gated</span><strong>No</strong></div>
              <div className="hoa-fee-row"><span>Community Type</span><strong>Semi-Rural · Equestrian · Luxury</strong></div>
              <div className="hoa-management">
                <p className="hoa-mgmt-label">Management</p>
                <p className="hoa-mgmt-value">Community Association</p>
              </div>
              <p style={{ marginTop: '16px', fontSize: '11px', color: 'var(--text-faint)', fontStyle: 'italic' }}>HOA fees are subject to change. Verify current fees with the management company before purchase.</p>
            </div>
            <div className="hoa-amenities-col">
              <h3>What HOA Typically Covers</h3>
              <ul className="hoa-amenity-list">
                {['Common area landscaping and maintenance','Community parks and trail maintenance','Neighborhood street maintenance','Exterior architectural standards enforcement','Reserve fund contributions'].map((a: string) => <li key={a}>{a}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="schools" className="schools-v2">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Education</span>
            <h2>Schools Serving Lone Mountain</h2>
          </div>
          <div className="schools-v2-table">
            <div className="schools-v2-header">
              <span>School Name</span>
              <span>Grades</span>
              <span>Rating</span>
            </div>
            {[
              ['Zel & Mary Lowman Elementary', 'K–5', '8/10'],
              ['Edmundo \'Eddie\' Escobedo Middle', '6–8', '7/10'],
              ['Centennial High School', '9–12', '6/10'],
              ['Bishop Gorman High School', '9–12', 'A+'],
              ['The Meadows School', 'PreK–12', 'A+'],
              ['Faith Lutheran Middle & High', '6–12', 'A'],
              ['Doral Academy Red Rock', 'K–12', '9/10'],
              ['Somerset Academy', 'K–8', '8/10'],
            ].map(([name, grades, rating]: any) => (
              <div className="schools-v2-row" key={name}>
                <span className="schools-v2-name">{name}</span>
                <span className="schools-v2-grades">{grades}</span>
                <span className={`schools-v2-rating${rating.includes('10') || rating === 'A+' ? ' top-rated' : ''}`}>{rating}</span>
              </div>
            ))}
          </div>
          <p className="schools-v2-note">School assignments are address-specific. Verify with CCSD before purchasing.</p>
        </div>
      </section>

      <section id="testimonials" className="testimonials-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Client Stories</span>
            <h2>What Lone Mountain Buyers Say</h2>
          </div>
          <div className="testimonials-grid">
            {[
              { quote: 'Nevada Real Estate Group found us the equestrian property we\'d been searching for in Lone Mountain. Two acres, mountain views, and horse facilities — all 20 minutes from the Strip. They understood exactly what we needed.', name: 'Laura & Michael D.', detail: 'Bought equestrian property in Lone Mountain · 2024' },
              { quote: 'We sold our Lone Mountain acreage property through Nevada Real Estate Group. They attracted buyers who appreciated the value of large-lot living and negotiated a premium price for our unique property.', name: 'Daniel K.', detail: 'Sold in Lone Mountain · 2025' },
            ].map((t: any, i: number) => (
              <div className="testimonial-card" key={i}>
                <div className="testimonial-stars">{'★★★★★'}</div>
                <blockquote className="testimonial-quote">&ldquo;{t.quote}&rdquo;</blockquote>
                <div className="testimonial-meta">
                  <span className="testimonial-name">{t.name}</span>
                  <span className="testimonial-detail">{t.detail}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <LoneMountainFAQ />

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
              { name: 'Summerlin', href: '/summerlin/', price: 'From $450K', compare: 'Premier master-planned community directly south. Guard-gated enclaves and premium amenities.' },
              { name: 'Skye Canyon', href: '/skye-canyon/', price: 'From $400K', compare: 'New master-planned community to the north. Mountain access and Skye Center amenities.' },
              { name: 'Centennial Hills', href: '/centennial-hills/', price: 'From $350K', compare: 'Broader northwest area to the east. More suburban character with strong commercial infrastructure.' },
              { name: 'Desert Shores', href: '/desert-shores/', price: 'From $350K', compare: 'Lakefront community to the southeast. Waterfront living as an alternative to mountain living.' },
              { name: 'Providence', href: '/providence/', price: 'From $350K', compare: 'Master-planned community in North Las Vegas. More structured community design at attainable prices.' },
              { name: 'Aliante', href: '/aliante/', price: 'From $300K', compare: 'North Las Vegas master plan with golf and casino. More affordable master-planned alternative.' },
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
              <h2>Ready to Find Your Lone Mountain Home?</h2>
              <p>Nevada Real Estate Group is the #1 real estate team in Nevada. Whether you&apos;re buying or selling in Lone Mountain, let&apos;s talk.</p>
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
                <input type="hidden" name="_subject" value="Lone Mountain Inquiry — LasVegasHomeSearchExperts.com" />
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
