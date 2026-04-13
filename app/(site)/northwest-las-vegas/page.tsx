import NorthwestLasVegasFAQ from '@/components/NorthwestLasVegasFAQ'
import Link from 'next/link'
import type { Metadata } from 'next'
import NorthwestLasVegasMapWrapper from '@/components/NorthwestLasVegasMapWrapper'
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
    { '@type': 'ListItem', position: 3, name: 'Northwest Las Vegas', item: 'https://www.lasvegashomesearchexperts.com/northwest-las-vegas/' },
  ],
}

const FAQ_DATA = [
  {
    "q": "What is the price range for homes in Northwest Las Vegas?",
    "a": "Homes in Northwest Las Vegas range from approximately $350,000 for entry-level homes to $800,000 or more for premium lots with mountain views and custom finishes in communities like Lone Mountain and Skye Canyon."
  },
  {
    "q": "What communities are in Northwest Las Vegas?",
    "a": "Major communities include Centennial Hills, Skye Canyon, Providence, Lone Mountain, Aliante (in North Las Vegas), and Tule Springs. Each offers a distinct character and price point within the broader northwest corridor."
  },
  {
    "q": "Is Northwest Las Vegas a good area for families?",
    "a": "Yes. Northwest Las Vegas is one of the most family-friendly areas in the valley, with newer schools, extensive park systems, master-planned community amenities, and a growing base of family-oriented retail and dining."
  },
  {
    "q": "What ZIP codes are in Northwest Las Vegas?",
    "a": "Northwest Las Vegas spans numerous ZIP codes including 89129, 89130, 89131, 89134, 89138, 89143, 89149, and 89166."
  },
  {
    "q": "How does Northwest Las Vegas compare to Summerlin?",
    "a": "Northwest Las Vegas offers comparable new-construction quality at prices typically 15–25% below Summerlin. The tradeoff is that Summerlin has a stronger brand, more established amenities, and higher-end luxury options."
  },
  {
    "q": "Is Northwest Las Vegas still growing?",
    "a": "Yes. Northwest Las Vegas is the fastest-growing residential area in the valley. Active builders deliver thousands of new homes annually, and commercial infrastructure continues to expand to serve the growing population."
  },
  {
    "q": "What are HOA fees in Northwest Las Vegas?",
    "a": "HOA fees vary widely depending on the specific community, typically ranging from $30 to $250 per month. Master-planned communities with resort amenities tend to be on the higher end."
  },
  {
    "q": "What's the commute like from Northwest Las Vegas?",
    "a": "US-95 and the I-215 Beltway provide efficient commute routes. The Strip and downtown are approximately 20 minutes via US-95. Summerlin is 15 minutes via I-215. Harry Reid Airport is about 30 minutes."
  },
  {
    "q": "What are the best neighborhoods for families?",
    "a": "Family-oriented neighborhoods with top-rated schools, parks, and community amenities are found throughout the area. The best fit depends on budget, school preferences, and commute needs. Nevada Real Estate Group can provide neighborhood-specific guidance based on your family's priorities."
  },
  {
    "q": "How do property taxes compare to other areas?",
    "a": "Nevada has no state income tax, and property tax rates are among the lowest in the country. Clark County property taxes are typically 0.5-0.7% of assessed value (not market value). A ,000 home might pay ,500-,500 per year in property taxes."
  },
  {
    "q": "What is the rental market like for investors?",
    "a": "The Las Vegas metro area has a strong rental market driven by population growth, tourism industry employment, and relocation from higher-cost states. Rental yields vary by area and property type but typically range from 4-7% gross depending on location and price point."
  },
  {
    "q": "How has the market performed over the past year?",
    "a": "The Las Vegas housing market has shown steady appreciation with moderate inventory growth. Prices have increased year-over-year while days on market have normalized from pandemic-era lows. Contact Nevada Real Estate Group for the most current market data specific to this area."
  },
  {
    "q": "What should I know about buying in Nevada as an out-of-state buyer?",
    "a": "Nevada offers significant tax advantages including no state income tax, no inheritance tax, and relatively low property taxes. The buying process is similar to most states. Out-of-state buyers can complete most of the process remotely with the help of a local agent. Nevada Real Estate Group works with relocation buyers regularly."
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
  name: 'Northwest Las Vegas',
  description: 'Northwest Las Vegas is a suburban · area hub community in Las Vegas, Nevada (ZIP 89129), established in 1990, spanning ~55 sq mi. Home prices range from $350K–$800K.',
  geo: { '@type': 'GeoCoordinates', latitude: 36.26, longitude: -115.28 },
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
  const cms = await getCommunityPage('northwest-las-vegas')
  return {
    title: cms?.metaTitle ?? 'Northwest Las Vegas Homes for Sale | Nevada Real Estate Group',
    description: cms?.metaDescription ?? 'Browse Northwest Las Vegas homes for sale in Las Vegas, NV. $350K–$800K. Schools, HOA, market stats. Nevada Real Estate Group.',
    alternates: { canonical: 'https://www.lasvegashomesearchexperts.com/northwest-las-vegas' },
  }
}

export default async function NorthwestLasVegasPage() {
  const cms = await getCommunityPage('northwest-las-vegas')
  const market = getMarketStats('northwest-las-vegas')
  const ms = market?.stats

  const heroHeadline = cms?.heroHeadline ?? 'Northwest Las Vegas'
  const heroSubtitle = 'Homes for Sale in Las Vegas, Nevada'
  const overviewTitle = cms?.overviewTitle ?? 'Northwest Las Vegas: Suburban · Area Hub Living in Las Vegas'

  const HARDCODED_STATS: Array<[string, string] | [string, string, string]> = [
    ['Established', '1990'],
    ['Developer', 'Various'],
    ['Total Acreage', '~55 sq mi'],
    ['Homes', '90,000+'],
    ['Median Home Price', ms?.medianSalePrice ?? '$350K–$800K'],
    ['ZIP Codes', '89129, 89130, 89131, 89134, 89138, 89143, 89149, 89166'],
    ['Guard-Gated', 'No'],
    ['HOA', '$30–$250/mo'],
  ]
  const displayStats = mergeQuickStats(HARDCODED_STATS, cms?.quickStats)
  const HARDCODED_DRIVE_TIMES = [
    {
        "time": "~20 min",
        "destination": "to the Strip",
        "route": "via US-95 South → I-15"
    },
    {
        "time": "~30 min",
        "destination": "to Harry Reid Airport",
        "route": "via US-95 → I-15 South"
    },
    {
        "time": "~15 min",
        "destination": "to Downtown Summerlin",
        "route": "via I-215 West"
    },
    {
        "time": "~25 min",
        "destination": "to Red Rock Canyon",
        "route": "via I-215 → W Charleston Blvd"
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
          <span>Northwest Las Vegas</span>
        </div>
      </div>

      <header id="hero" className="summerlin-hero hero-v2">
        <img src="https://images.unsplash.com/photo-1581351721010-8cf859cb14a4?auto=format&fit=crop&w=1600&h=700&q=80" alt="Northwest Las Vegas community aerial view, Las Vegas Nevada" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
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
                <span className="hero-v2-stat-num">{ms?.medianSalePrice ?? qs('Median Home Price', '$350K–$800K')}</span>
                <span className="hero-v2-stat-lbl">Median Sale Price</span>
              </div>
              <div className="hero-v2-stat">
                <span className="hero-v2-stat-num">{ms?.avgDaysToClose ?? qs('Avg Days on Market', '45')}</span>
                <span className="hero-v2-stat-lbl">Avg Days to Close</span>
              </div>
            </div>
            <a href="#listings" className="hero-v2-cta">Search Homes in Northwest Las Vegas</a>
          </div>
        </div>
      </header>

      <div className="hero-v2-qfb">
        <div className="container">
          <div className="hero-v2-qfb-row">
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <span><strong>ZIP:</strong> 89129, 89130, 89131, 89134, 89138, 89143, 89149, 89166</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              <span><strong>Type:</strong> Suburban · Area Hub</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
              <span><strong>Price Range:</strong> $350K–$800K</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
              <span><strong>HOA:</strong> $30–$250/mo</span>
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
            <h2>Northwest Las Vegas Demographics</h2>
          </div>
          <div className="demo-grid">
            {[
              ['250,000+', 'Population'],
              ['35', 'Median Age'],
              ['$80,000', 'Avg Household Income'],
              ['90,000+', 'Total Households'],
              ['62%', 'Homeownership Rate'],
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
            <h2>Where is Northwest Las Vegas?</h2>
            <p>Las Vegas, Nevada &mdash; Las Vegas, Nevada.</p>
          </div>
          <div className="map-container">
            <NorthwestLasVegasMapWrapper />
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
            <h2 className="listings-title">NEW NORTHWEST LAS VEGAS LISTINGS</h2>
          </div>
          <div className="ylopo-wrap">
            <div className="YLOPO_searchWidget" />
            <div className="YLOPO_resultsWidget" data-search='{"propertyTypes":["house","condo","townhouse"],"minPrice":350000,"locations":[{"city":"Las Vegas","state":"NV"}],"limit":12,"sortBy":"listDate","sortOrder":"desc","keywords":"Northwest Las Vegas","zipCodes":["89129","89130","89131","89134","89138","89143","89149","89166"]}' />
          </div>
          <p className="ylopo-note">Listing data sourced from regional MLS. Information deemed reliable but not guaranteed. Updated daily.</p>
          <div className="listings-actions">
            <a href="https://search.nevadarealestategroup.net/search?s[orderBy]=sourceCreationDate%2Cdesc&s[page]=1&s[locations][0][city]=Las%20Vegas&s[locations][0][state]=NV&s[keywords]=Northwest%20Las%20Vegas" target="_blank" rel="noopener noreferrer" className="btn-gold">View All Northwest Las Vegas Listings &rarr;</a>
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
                  <p>Northwest Las Vegas is a suburban · area hub community in Las Vegas, Nevada (ZIP 89129/89130), established in 1990, spanning ~55 sq mi, with 90,000+ homes. Northwest Las Vegas is the growth engine of the Las Vegas Valley — a sprawling corridor that stretches from the US-95/I-215 interchange north to the edge of the Sheep Range foothills and west toward the Spring Mountains. This area encompasses some of the valley's most popular master-planned communities including Centennial Hills, Skye Canyon, Providence, Lone Mountain, and Aliante, along with dozens of smaller neighborhoods that together form one of the most dynamic residential markets in Nevada.</p>
                  <p>The northwest corridor offers a compelling combination of newer construction, mountain views, growing commercial infrastructure, and family-friendly amenities at price points generally below Summerlin and Henderson. Homes range from the mid-$300,000s for starter properties to $800,000 or more for premium lots with mountain views and custom finishes. Active builders including Lennar, Toll Brothers, Taylor Morrison, and Pulte Homes maintain new-construction communities throughout the area.</p>
                  <p>Infrastructure investment has followed the population boom. The 215 Beltway, US-95, and Centennial Parkway provide efficient commute routes to the Strip, downtown, and Summerlin. Retail hubs along Centennial Parkway, Ann Road, and Aliante Parkway have matured into full-service commercial corridors with grocery, medical, dining, and entertainment options. The 120-acre Centennial Hills Park and Floyd Lamb Park at Tule Springs anchor the area's recreation network.</p>
                  <p>For buyers seeking newer construction, strong school zones, and a northwest Las Vegas address at a meaningful discount to Summerlin, the northwest corridor represents one of the best value propositions in the valley. Continued population growth, limited remaining developable land, and ongoing commercial investment support strong long-term appreciation throughout the area.</p>
                </>
              )}
            </div>
            <div className="overview-aside">
              <div className="quick-facts">
                <h3>Northwest Las Vegas At a Glance</h3>
                {displayStats.map(([label, value, cls]: any) => (
                  <div className="fact-row" key={label}>
                    <span className="fact-label">{label}</span>
                    <span className={`fact-value${cls ? ' ' + cls : ''}`}>{value}</span>
                  </div>
                ))}
              </div>
              <div className="cta-card">
                <p>Ready to explore Northwest Las Vegas? Schedule a private tour of the community and the current listings that match your goals.</p>
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
            <h2>Top 7 Facts About Northwest Las Vegas</h2>
          </div>
          <ol className="top-facts-list">
            <li key={0}>Northwest Las Vegas spans ~55 sq mi in Las Vegas, Nevada (ZIP 89129, 89130).</li>
            <li key={1}>Northwest Las Vegas was established in 1990.</li>
            <li key={2}>Northwest Las Vegas contains 90,000+ homes with prices ranging from $350K–$800K.</li>
            <li key={3}>Northwest Las Vegas is a suburban · area hub community.</li>
            <li key={4}>HOA fees in Northwest Las Vegas range from $30–$250/mo per month.</li>
            <li key={5}>Top-rated schools serving Northwest Las Vegas include Arbor View High School (7/10) and Centennial High School (6/10).</li>
            <li key={6}>Northwest Las Vegas is located ~20 min to the Strip via US-95 South → I-15.</li>
          </ol>
        </div>
      </section>

      <section id="highlights">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Why Northwest Las Vegas</span>
            <h2>What Makes Northwest Las Vegas Stand Out</h2>
          </div>
          <div className="highlights-grid">
            {[
              { title: 'Master-Planned Communities', body: 'Home to Skye Canyon, Providence, Centennial Hills, and other master-planned communities with resort amenities, trail networks, and community programming.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
              { title: 'Mountain Backdrop', body: 'Northwest Las Vegas enjoys dramatic views of the Spring Mountains and Sheep Range. The elevated terrain provides scenic desert and mountain vistas from elevated home sites.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M8 21l4-11 4 11"/><path d="M2 21l5-14 4 8"/><path d="M14 15l4-8 4 14"/><line x1="2" y1="21" x2="22" y2="21"/></svg> },
              { title: 'Growing Fast', body: 'The northwest corridor is the fastest-growing residential area in Las Vegas, with thousands of new homes delivered annually and new commercial amenities opening monthly.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg> },
              { title: 'Commuter Connectivity', body: 'US-95, I-215, and Centennial Parkway provide efficient access to the Strip (20 min), downtown (20 min), and Summerlin (15 min). Multiple transit options available.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><line x1="8" y1="6" x2="8" y2="6.01"/><line x1="12" y1="6" x2="12" y2="6.01"/><line x1="16" y1="6" x2="16" y2="6.01"/><line x1="8" y1="10" x2="8" y2="10.01"/><line x1="12" y1="10" x2="12" y2="10.01"/><line x1="16" y1="10" x2="16" y2="10.01"/><line x1="8" y1="14" x2="8" y2="14.01"/><line x1="12" y1="14" x2="12" y2="14.01"/><line x1="16" y1="14" x2="16" y2="14.01"/></svg> },
              { title: 'Family-Friendly Parks', body: 'The 120-acre Centennial Hills Park, 680-acre Floyd Lamb Park, and Skye Center trail system offer extensive outdoor recreation for families and fitness enthusiasts.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22c4-4 8-7.5 8-12a8 8 0 10-16 0c0 4.5 4 8 8 12z"/><circle cx="12" cy="10" r="3"/></svg> },
              { title: 'Value vs. Summerlin', body: 'Northwest Las Vegas delivers comparable new-construction quality at price points typically 15–25% below equivalent Summerlin homes, making it attractive for move-up buyers.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
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
            <h2>Parks &amp; Recreation Near Northwest Las Vegas</h2>
          </div>
          <div className="parks-grid">
            {[
              { name: 'Centennial Hills Park', address: '7101 N Buffalo Dr, Las Vegas, NV 89131', acreage: '120 acres', amenities: ["Sports fields","Playgrounds","Skate park","Walking trails","Picnic shelters"] },
              { name: 'Floyd Lamb Park at Tule Springs', address: '9200 Tule Springs Rd, Las Vegas, NV 89131', acreage: '680 acres', amenities: ["Fishing ponds","Picnic areas","Historic ranch buildings","Walking trails","Wildlife viewing"] },
              { name: 'Skye Canyon Park', address: '10115 W Skye Canyon Park Dr, Las Vegas, NV 89166', acreage: '~15 acres', amenities: ["Pool complex","Splash pad","Fitness center","Hiking trailheads","Community events"] },
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
            <h2>The Northwest Las Vegas Lifestyle</h2>
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
              <div className="lifestyle-v2-stat">90,000+</div>
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
            <h2>HOA Information for Northwest Las Vegas</h2>
          </div>
          <div className="hoa-grid">
            <div className="hoa-fees-col">
              <h3>Fees &amp; Management</h3>
              <div className="hoa-fee-row"><span>Monthly HOA Range</span><strong>$30–$250/mo</strong></div>
              <div className="hoa-fee-row"><span>Guard-Gated</span><strong>No</strong></div>
              <div className="hoa-fee-row"><span>Community Type</span><strong>Suburban · Area Hub</strong></div>
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
            <h2>Schools Serving Northwest Las Vegas</h2>
          </div>
          <div className="schools-v2-table">
            <div className="schools-v2-header">
              <span>School Name</span>
              <span>Grades</span>
              <span>Rating</span>
            </div>
            {[
              ['Arbor View High School', '9–12', '7/10'],
              ['Centennial High School', '9–12', '6/10'],
              ['Shadow Ridge High School', '9–12', '6/10'],
              ['Mountain View Christian School', 'PreK–12', 'B+'],
              ['Bishop Gorman High School', '9–12', 'A+'],
              ['Faith Lutheran Middle & High', '6–12', 'A'],
              ['Doral Academy of Nevada', 'K–8', '9/10'],
              ['Coral Academy of Science', 'K–12', '8/10'],
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
            <h2>What Northwest Las Vegas Buyers Say</h2>
          </div>
          <div className="testimonials-grid">
            {[
              { quote: 'Nevada Real Estate Group showed us that we could get more house for our money in Northwest Las Vegas compared to Summerlin. We love our Skye Canyon home and the mountain views are incredible. Their market knowledge saved us over $100K.', name: 'Mark & Jennifer P.', detail: 'Bought in Northwest Las Vegas · 2024' },
              { quote: 'As investors, we\'ve been buying in the northwest corridor for three years on Nevada Real Estate Group\'s recommendation. Every property has appreciated significantly. They understand which pockets of the northwest offer the best returns.', name: 'David T.', detail: 'Investment Properties in Northwest Las Vegas · 2025' },
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

      <NorthwestLasVegasFAQ />

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
              { name: 'Centennial Hills', href: '/centennial-hills/', price: 'From $400K', compare: 'Established area hub with strong schools, comprehensive retail, and diverse housing stock.' },
              { name: 'Skye Canyon', href: '/skye-canyon/', price: 'From $450K', compare: 'Newer master-planned community with Skye Center amenities and mountain views.' },
              { name: 'Summerlin', href: '/summerlin/', price: 'From $450K', compare: 'Premier master-planned community to the west with guard-gated enclaves and luxury amenities.' },
              { name: 'Providence', href: '/providence/', price: 'From $450K', compare: 'Family-friendly master-planned community with parks, trails, and community programming.' },
              { name: 'Lone Mountain', href: '/lone-mountain/', price: 'From $500K', compare: 'Semi-rural custom homes near Lone Mountain with larger lots and mountain views.' },
              { name: 'Aliante', href: '/aliante/', price: 'From $350K', compare: 'Established North Las Vegas master plan with golf, nature park, and family amenities.' },
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
              <h2>Ready to Find Your Northwest Las Vegas Home?</h2>
              <p>Nevada Real Estate Group is the #1 real estate team in Nevada. Whether you&apos;re buying or selling in Northwest Las Vegas, let&apos;s talk.</p>
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
                <input type="hidden" name="_subject" value="Northwest Las Vegas Inquiry — LasVegasHomeSearchExperts.com" />
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
