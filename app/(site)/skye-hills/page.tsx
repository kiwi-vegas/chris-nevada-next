import SkyeHillsFAQ from '@/components/SkyeHillsFAQ'
import Link from 'next/link'
import type { Metadata } from 'next'
import SkyeHillsMapWrapper from '@/components/SkyeHillsMapWrapper'
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
    { '@type': 'ListItem', position: 3, name: 'Skye Hills', item: 'https://www.lasvegashomesearchexperts.com/skye-hills/' },
  ],
}

const FAQ_DATA = [
  {
    "q": "What is the price range for homes in Skye Hills?",
    "a": "Homes in Skye Hills range from approximately $450,000 to $750,000, depending on builder, floor plan, lot position, and upgrades."
  },
  {
    "q": "What builders are in Skye Hills?",
    "a": "Skye Hills features new construction from KB Home, Lennar, and Century Communities, offering a variety of contemporary floor plans and price points."
  },
  {
    "q": "How does Skye Hills compare to Skye Canyon?",
    "a": "Skye Hills and Skye Canyon are neighboring northwest communities. Skye Canyon is a larger master plan with the Skye Center amenity complex, while Skye Hills is newer with a more intimate community feel. Pricing is comparable, with Skye Hills often slightly more accessible."
  },
  {
    "q": "What ZIP code is Skye Hills in?",
    "a": "Skye Hills is located in ZIP code 89166 in northwest Las Vegas. Home prices range from $450K–$750K."
  },
  {
    "q": "Is Skye Hills guard-gated?",
    "a": "Skye Hills is not a guard-gated community. The open access design and lower HOA fees are part of its appeal for buyers seeking value without gate restrictions."
  },
  {
    "q": "What outdoor recreation is near Skye Hills?",
    "a": "Skye Hills provides close access to Red Rock Canyon (25 min), Floyd Lamb Park (10 min), Tule Springs Fossil Beds National Monument, and extensive BLM desert lands for hiking, biking, and outdoor adventures."
  },
  {
    "q": "What are HOA fees in Skye Hills?",
    "a": "HOA fees in Skye Hills typically range from $100 to $220 per month, covering community pool, parks, trail maintenance, and common area upkeep."
  },
  {
    "q": "What schools serve Skye Hills?",
    "a": "Skye Hills is served by CCSD schools including Scherkenbach Elementary and Centennial High School. Charter options include Coral Academy of Science and Doral Academy of Nevada."
  },
  {
    "q": "What are the best sub-neighborhoods within Skye Hills?",
    "a": "The best sub-neighborhood depends on your priorities — school zones, lot size, home age, and proximity to amenities all vary within the community. Nevada Real Estate Group agents who specialize in Skye Hills can walk you through the specific blocks and streets that match your criteria."
  },
  {
    "q": "How is new construction availability in Skye Hills?",
    "a": "New construction availability varies by season and builder phase. Some sections of Skye Hills have active new home sales while others are fully built out with resale-only inventory. Contact Nevada Real Estate Group for the most current new construction options."
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
  name: 'Skye Hills',
  description: 'Skye Hills is a master-planned · new construction community in North Las Vegas, Nevada (ZIP 89166), established in 2019 by Various Builders, spanning ~600 acres. Home prices range from $450K–$750K.',
  geo: { '@type': 'GeoCoordinates', latitude: 36.3, longitude: -115.29 },
  address: { '@type': 'PostalAddress', addressLocality: 'North Las Vegas', addressRegion: 'NV', postalCode: '89166', addressCountry: 'US' },
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
  const cms = await getCommunityPage('skye-hills')
  return {
    title: cms?.metaTitle ?? 'Skye Hills Homes for Sale | Nevada Real Estate Group',
    description: cms?.metaDescription ?? 'Browse Skye Hills homes for sale in North Las Vegas, NV. $450K–$750K. Schools, HOA, market stats. Nevada Real Estate Group.',
    alternates: { canonical: 'https://www.lasvegashomesearchexperts.com/skye-hills' },
  }
}

export default async function SkyeHillsPage() {
  const cms = await getCommunityPage('skye-hills')
  const market = getMarketStats('skye-hills')
  const ms = market?.stats

  const heroHeadline = cms?.heroHeadline ?? 'Skye Hills'
  const heroSubtitle = 'Homes for Sale in North Las Vegas, Nevada'
  const overviewTitle = cms?.overviewTitle ?? 'Skye Hills: Master-Planned · New Construction Living in North Las Vegas'

  const HARDCODED_STATS: Array<[string, string] | [string, string, string]> = [
    ['Established', '2019'],
    ['Developer', 'Various Builders'],
    ['Total Acreage', '~600 acres'],
    ['Homes', '~2,000'],
    ['Median Home Price', ms?.medianSalePrice ?? '$450K–$750K'],
    ['ZIP Codes', '89166'],
    ['Guard-Gated', 'No'],
    ['HOA', '$100–$220/mo'],
  ]
  const displayStats = mergeQuickStats(HARDCODED_STATS, cms?.quickStats)
  const HARDCODED_DRIVE_TIMES = [
    {
        "time": "~30 min",
        "destination": "to the Strip",
        "route": "via US-95 South → I-15"
    },
    {
        "time": "~35 min",
        "destination": "to Harry Reid Airport",
        "route": "via US-95 → I-15 South"
    },
    {
        "time": "~15 min",
        "destination": "to Centennial Hills Shopping",
        "route": "via Centennial Pkwy"
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
          <a href="/communities">Communities</a>
          <span className="breadcrumb-sep">&rsaquo;</span>
          <span>Skye Hills</span>
        </div>
      </div>

      <header id="hero" className="summerlin-hero hero-v2">
        <img src="https://images.unsplash.com/photo-1570126618953-d437176e8c79?auto=format&fit=crop&w=1600&h=700&q=80" alt="Skye Hills community aerial view, North Las Vegas Nevada" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
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
                <span className="hero-v2-stat-num">{ms?.medianSalePrice ?? qs('Median Home Price', '$450K–$750K')}</span>
                <span className="hero-v2-stat-lbl">Median Sale Price</span>
              </div>
              <div className="hero-v2-stat">
                <span className="hero-v2-stat-num">{ms?.avgDaysToClose ?? qs('Avg Days on Market', '45')}</span>
                <span className="hero-v2-stat-lbl">Avg Days to Close</span>
              </div>
            </div>
            <a href="#listings" className="hero-v2-cta">Search Homes in Skye Hills</a>
          </div>
        </div>
      </header>

      <div className="hero-v2-qfb">
        <div className="container">
          <div className="hero-v2-qfb-row">
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <span><strong>ZIP:</strong> 89166</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              <span><strong>Type:</strong> Master-Planned · New Construction</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
              <span><strong>Price Range:</strong> $450K–$750K</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
              <span><strong>HOA:</strong> $100–$220/mo</span>
            </div>
          </div>
          <div className="hero-v2-qfb-est">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            <span>Est. 2019</span>
          </div>
        </div>
      </div>

      <section id="demographics" className="demographics-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Demographics</span>
            <h2>Skye Hills Demographics</h2>
          </div>
          <div className="demo-grid">
            {[
              ['~5,500', 'Population'],
              ['33', 'Median Age'],
              ['$85,000', 'Avg Household Income'],
              ['~2,000', 'Total Households'],
              ['70%', 'Homeownership Rate'],
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
            <h2>Where is Skye Hills?</h2>
            <p>North Las Vegas, Nevada &mdash; North Las Vegas, Nevada.</p>
          </div>
          <div className="map-container">
            <SkyeHillsMapWrapper />
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
            <h2 className="listings-title">NEW SKYE HILLS LISTINGS</h2>
          </div>
          <div className="ylopo-wrap">
            <div className="YLOPO_searchWidget" />
            <div className="YLOPO_resultsWidget" data-search='{"propertyTypes":["house","condo","townhouse"],"minPrice":450000,"locations":[{"city":"Las Vegas","state":"NV"}],"limit":12,"sortBy":"listDate","sortOrder":"desc","keywords":"Skye Hills","zipCodes":["89166"]}' />
          </div>
          <p className="ylopo-note">Listing data sourced from regional MLS. Information deemed reliable but not guaranteed. Updated daily.</p>
          <div className="listings-actions">
            <a href="https://search.nevadarealestategroup.net/search?s[orderBy]=sourceCreationDate%2Cdesc&s[page]=1&s[locations][0][city]=Las%20Vegas&s[locations][0][state]=NV&s[keywords]=Skye%20Hills" target="_blank" rel="noopener noreferrer" className="btn-gold">View All Skye Hills Listings &rarr;</a>
            <Link href="/communities" className="btn-outline">&larr; Back to All Communities</Link>
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
                  <p>Skye Hills is a master-planned · new construction community in North Las Vegas, Nevada (ZIP 89166), established in 2019, developed by Various Builders, spanning ~600 acres. Skye Hills is a newer master-planned community in northwest Las Vegas, positioned at the scenic base of the Sheep Range foothills. The community delivers contemporary new-construction homes with dramatic mountain views, modern amenities, and the open-space character that defines the northwest Las Vegas lifestyle. Skye Hills has emerged as a strong alternative to nearby Skye Canyon for buyers seeking newer construction with mountain proximity at an accessible price point.</p>
                  <p>Homes in Skye Hills range from approximately 1,600 to 3,800 square feet, built by a mix of national and regional builders including KB Home, Lennar, and Century Communities. Architecture is contemporary desert — clean lines, flat or low-profile rooflines, open floor plans, and earth-toned exteriors that blend with the natural terrain. Most homes feature energy-efficient construction, smart-home technology, and outdoor living spaces designed for the Las Vegas climate.</p>
                  <p>The community features a central amenity area with a pool, parks, playgrounds, and a network of walking trails that connect neighborhoods and provide views of the surrounding mountains. The northwest Las Vegas location provides relatively easy access to outdoor recreation including Red Rock Canyon, Floyd Lamb Park, Tule Springs Fossil Beds National Monument, and the vast BLM desert lands north of the valley.</p>
                  <p>Skye Hills appeals to families, young professionals, and active adults seeking newer construction with mountain views at prices significantly below Summerlin. The US-95 corridor provides a direct commute to downtown Las Vegas and the Strip, while the growing retail and dining along Centennial Parkway and the 215 Beltway corridor reduces the need for long shopping trips. The community's continued buildout and the northwest's population growth support a positive long-term investment outlook.</p>
                </>
              )}
            </div>
            <div className="overview-aside">
              <div className="quick-facts">
                <h3>Skye Hills At a Glance</h3>
                {displayStats.map(([label, value, cls]: any) => (
                  <div className="fact-row" key={label}>
                    <span className="fact-label">{label}</span>
                    <span className={`fact-value${cls ? ' ' + cls : ''}`}>{value}</span>
                  </div>
                ))}
              </div>
              <div className="cta-card">
                <p>Ready to explore Skye Hills? Schedule a private tour of the community and the current listings that match your goals.</p>
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
            <h2>Top 7 Facts About Skye Hills</h2>
          </div>
          <ol className="top-facts-list">
            <li key={0}>Skye Hills spans ~600 acres in North Las Vegas, Nevada (ZIP 89166).</li>
            <li key={1}>Skye Hills was established in 2019 by Various Builders.</li>
            <li key={2}>Skye Hills contains ~2,000 homes with prices ranging from $450K–$750K.</li>
            <li key={3}>Skye Hills is a master-planned · new construction community.</li>
            <li key={4}>HOA fees in Skye Hills range from $100–$220/mo per month.</li>
            <li key={5}>Top-rated schools serving Skye Hills include Scherkenbach Elementary (7/10) and Edmundo "Eddie" Escobedo Sr. Middle School (6/10).</li>
            <li key={6}>Skye Hills is located ~30 min to the Strip via US-95 South → I-15.</li>
          </ol>
        </div>
      </section>

      <section id="highlights">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Why Skye Hills</span>
            <h2>What Makes Skye Hills Stand Out</h2>
          </div>
          <div className="highlights-grid">
            {[
              { title: 'Mountain Backdrop', body: 'Skye Hills sits at the base of the Sheep Range foothills, providing dramatic mountain views and a scenic desert setting that distinguishes the community from typical Las Vegas subdivisions.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M8 21l4-11 4 11"/><path d="M2 21l5-14 4 8"/><path d="M14 15l4-8 4 14"/><line x1="2" y1="21" x2="22" y2="21"/></svg> },
              { title: 'Contemporary New Construction', body: 'Modern desert architecture from KB Home, Lennar, and Century Communities with open floor plans, energy-efficient systems, and smart-home technology from 1,600 to 3,800 sq ft.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
              { title: 'Community Amenities', body: 'Central pool and recreation area, parks, playgrounds, and an interconnected trail system providing mountain views and neighborhood connectivity.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22c4-4 8-7.5 8-12a8 8 0 10-16 0c0 4.5 4 8 8 12z"/><circle cx="12" cy="10" r="3"/></svg> },
              { title: 'Outdoor Recreation Access', body: 'Close to Red Rock Canyon, Floyd Lamb Park, Tule Springs Fossil Beds, and vast BLM desert lands for hiking, biking, horseback riding, and off-road adventures.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><line x1="8" y1="6" x2="8" y2="6.01"/><line x1="12" y1="6" x2="12" y2="6.01"/><line x1="16" y1="6" x2="16" y2="6.01"/><line x1="8" y1="10" x2="8" y2="10.01"/><line x1="12" y1="10" x2="12" y2="10.01"/><line x1="16" y1="10" x2="16" y2="10.01"/><line x1="8" y1="14" x2="8" y2="14.01"/><line x1="12" y1="14" x2="12" y2="14.01"/><line x1="16" y1="14" x2="16" y2="14.01"/></svg> },
              { title: 'Value vs. Summerlin', body: 'Skye Hills delivers newer construction with mountain views at prices 20-30% below comparable Summerlin homes. An excellent value for budget-conscious buyers seeking quality.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg> },
              { title: 'Growing Northwest Corridor', body: 'Northwest Las Vegas continues to add population, retail, dining, and services. Early buyers in Skye Hills benefit from the area\'s growth trajectory and appreciation potential.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><line x1="8" y1="6" x2="8" y2="6.01"/><line x1="12" y1="6" x2="12" y2="6.01"/><line x1="16" y1="6" x2="16" y2="6.01"/><line x1="8" y1="10" x2="8" y2="10.01"/><line x1="12" y1="10" x2="12" y2="10.01"/><line x1="16" y1="10" x2="16" y2="10.01"/><line x1="8" y1="14" x2="8" y2="14.01"/><line x1="12" y1="14" x2="12" y2="14.01"/><line x1="16" y1="14" x2="16" y2="14.01"/></svg> },
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
            <h2>Parks &amp; Recreation Near Skye Hills</h2>
          </div>
          <div className="parks-grid">
            {[
              { name: 'Skye Hills Community Park', address: 'Skye Hills Dr, Las Vegas, NV 89166', acreage: '~8 acres', amenities: ["Community pool","Playground","Basketball courts","Walking trails","Picnic areas"] },
              { name: 'Floyd Lamb Park', address: '9200 Tule Springs Rd, Las Vegas, NV 89131', acreage: '680 acres', amenities: ["Fishing ponds","Picnic areas","Historic ranch","Walking trails","Wildlife viewing"] },
              { name: 'Tule Springs Fossil Beds National Monument', address: 'Corn Creek Rd, Las Vegas, NV 89131', acreage: '22,650 acres', amenities: ["Fossil viewing sites","Hiking","Interpretive trails","Wildlife habitat"] },
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
            <h2>The Skye Hills Lifestyle</h2>
          </div>
          <div className="lifestyle-v2-grid">
            <div className="lifestyle-v2-item">
              <div className="lifestyle-v2-icon"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg></div>
              <div className="lifestyle-v2-stat">~30 min</div>
              <div className="lifestyle-v2-label">to the Strip</div>
            </div>
            <div className="lifestyle-v2-item">
              <div className="lifestyle-v2-icon"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22c4-4 8-7.5 8-12a8 8 0 10-16 0c0 4.5 4 8 8 12z"/><circle cx="12" cy="10" r="3"/></svg></div>
              <div className="lifestyle-v2-stat">3+</div>
              <div className="lifestyle-v2-label">Nearby Parks</div>
            </div>
            <div className="lifestyle-v2-item">
              <div className="lifestyle-v2-icon"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg></div>
              <div className="lifestyle-v2-stat">~2,000</div>
              <div className="lifestyle-v2-label">Homes</div>
            </div>
            <div className="lifestyle-v2-item">
              <div className="lifestyle-v2-icon"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 2v10l7 4"/></svg></div>
              <div className="lifestyle-v2-stat">2019</div>
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
            <h2>HOA Information for Skye Hills</h2>
          </div>
          <div className="hoa-grid">
            <div className="hoa-fees-col">
              <h3>Fees &amp; Management</h3>
              <div className="hoa-fee-row"><span>Monthly HOA Range</span><strong>$100–$220/mo</strong></div>
              <div className="hoa-fee-row"><span>Guard-Gated</span><strong>No</strong></div>
              <div className="hoa-fee-row"><span>Community Type</span><strong>Master-Planned · New Construction</strong></div>
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
            <h2>Schools Serving Skye Hills</h2>
          </div>
          <div className="schools-v2-table">
            <div className="schools-v2-header">
              <span>School Name</span>
              <span>Grades</span>
              <span>Rating</span>
            </div>
            {[
              ['Scherkenbach Elementary', 'K–5', '7/10'],
              ['Edmundo "Eddie" Escobedo Sr. Middle School', '6–8', '6/10'],
              ['Centennial High School', '9–12', '6/10'],
              ['Mountain View Christian School', 'PreK–12', 'B+'],
              ['Bishop Gorman High School', '9–12', 'A+'],
              ['Coral Academy of Science', 'K–12', '8/10'],
              ['Doral Academy of Nevada', 'K–8', '9/10'],
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
            <h2>What Skye Hills Buyers Say</h2>
          </div>
          <div className="testimonials-grid">
            {[
              { quote: 'Skye Hills gave us everything we wanted — new construction, mountain views, and a price that let us buy more home for less. Nevada Real Estate Group steered us here after we were priced out of Summerlin, and we couldn\'t be happier.', name: 'Matt & Brittany S.', detail: 'Bought in Skye Hills · 2024' },
              { quote: 'We looked at every new community in northwest Las Vegas and Skye Hills offered the best combination of price, views, and quality. Nevada Real Estate Group negotiated builder incentives that saved us over $15,000.', name: 'Carlos & Ana V.', detail: 'Bought in Skye Hills · 2025' },
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

      <SkyeHillsFAQ />

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
              { name: 'Skye Canyon', href: '/skye-canyon/', price: 'From $450K', compare: 'Neighboring northwest master plan with the Skye Center amenity complex and mountain views.' },
              { name: 'Centennial Hills', href: '/centennial-hills/', price: 'From $400K', compare: 'Established northwest community with parks, shopping, and family amenities.' },
              { name: 'Providence', href: '/providence/', price: 'From $450K', compare: 'Family-friendly master-planned community in northwest Las Vegas.' },
              { name: 'Lone Mountain', href: '/lone-mountain/', price: 'From $500K', compare: 'Custom homes and larger lots near Lone Mountain with mountain views.' },
              { name: 'Aliante', href: '/aliante/', price: 'From $350K', compare: 'Established North Las Vegas master plan with golf and nature park.' },
              { name: 'Summerlin West', href: '/summerlin-west/', price: 'From $400K', compare: 'Summerlin\'s newest section with Red Rock Canyon views and premium brand recognition.' },
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
              <h2>Ready to Find Your Skye Hills Home?</h2>
              <p>Nevada Real Estate Group is the #1 real estate team in Nevada. Whether you&apos;re buying or selling in Skye Hills, let&apos;s talk.</p>
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
                <input type="hidden" name="_subject" value="Skye Hills Inquiry — LasVegasHomeSearchExperts.com" />
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
