import HendersonFAQ from '@/components/HendersonFAQ'
import Link from 'next/link'
import type { Metadata } from 'next'
import HendersonMapWrapper from '@/components/HendersonMapWrapper'
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
    { '@type': 'ListItem', position: 3, name: 'Henderson', item: 'https://www.lasvegashomesearchexperts.com/henderson/' },
  ],
}

const FAQ_DATA = [
  {
    "q": "Why is Henderson considered one of the best places to live in Nevada?",
    "a": "Henderson consistently ranks among the top 10 safest large cities in America, has its own city infrastructure (police, fire, hospital, parks), features world-class master-planned communities, and offers every lifestyle and price point from $300K to $28M+."
  },
  {
    "q": "What is the price range for homes in Henderson?",
    "a": "Henderson homes range from approximately $300,000 in established neighborhoods like Whitney Ranch and downtown Henderson to over $28 million in ultra-luxury communities like MacDonald Highlands and Ascaya."
  },
  {
    "q": "What are the best neighborhoods in Henderson?",
    "a": "The best Henderson neighborhoods depend on your lifestyle and budget. MacDonald Highlands and Ascaya lead the luxury segment. Anthem, Green Valley Ranch, and Seven Hills are premier master-planned communities. Inspirada and Cadence offer the best new construction. Lake Las Vegas provides resort-style living."
  },
  {
    "q": "Is Henderson safe?",
    "a": "Yes. Henderson is one of the safest large cities in the United States, consistently ranking in the top 10 nationally by the FBI's Uniform Crime Reporting data. The city operates its own police department with proactive community policing."
  },
  {
    "q": "How far is Henderson from the Las Vegas Strip?",
    "a": "Henderson is approximately 15–25 minutes from the Las Vegas Strip depending on which part of the city you're in. The I-215 beltway and I-15 provide direct commute corridors."
  },
  {
    "q": "What golf courses are in Henderson?",
    "a": "Henderson features world-class golf including DragonRidge Country Club (Tom Fazio), Rio Secco Golf Club, Reflection Bay (Jack Nicklaus), Anthem Country Club (Hale Irwin), Chimera Golf Club, SouthShore Country Club, and Revere Golf Club."
  },
  {
    "q": "Are there 55+ communities in Henderson?",
    "a": "Yes. Henderson has several excellent 55+ communities including Sun City Anthem (Del Webb, 7,200+ homes), Heritage at Cadence, Solera at Anthem, Del Webb at Lake Las Vegas, and Sun City MacDonald Ranch."
  },
  {
    "q": "What ZIP codes does Henderson cover?",
    "a": "Henderson spans multiple ZIP codes including 89002, 89011, 89012, 89014, 89015, 89044, 89052, and 89074. Each ZIP code corresponds to different areas and communities within the city."
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
  name: 'Henderson',
  description: 'Henderson is a city hub · all price points community in Henderson, Nevada.',
  geo: { '@type': 'GeoCoordinates', latitude: 36.04, longitude: -115.035 },
  address: { '@type': 'PostalAddress', addressLocality: 'Henderson', addressRegion: 'NV', postalCode: '89002', addressCountry: 'US' },
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
  const cms = await getCommunityPage('henderson')
  return {
    title: cms?.metaTitle ?? 'Henderson Homes for Sale | Nevada Real Estate Group',
    description: cms?.metaDescription ?? 'Browse Henderson homes for sale in Henderson, NV. $300K–$28M+. Schools, HOA, market stats. Nevada Real Estate Group.',
    alternates: { canonical: 'https://www.lasvegashomesearchexperts.com/henderson' },
  }
}

export default async function HendersonPage() {
  const cms = await getCommunityPage('henderson')
  const market = getMarketStats('henderson')
  const ms = market?.stats

  const heroHeadline = cms?.heroHeadline ?? 'Henderson'
  const heroSubtitle = 'Homes for Sale in Henderson, Nevada'
  const overviewTitle = cms?.overviewTitle ?? 'Henderson: City Hub · All Price Points Living in Henderson'

  const HARDCODED_STATS: Array<[string, string] | [string, string, string]> = [
    ['Established', '1953'],
    ['Developer', 'Multiple developers'],
    ['Total Acreage', '107.7 sq mi'],
    ['Homes', '115,000+'],
    ['Median Home Price', ms?.medianSalePrice ?? '$300K–$28M+'],
    ['ZIP Codes', '89002, 89011, 89012, 89014, 89015, 89044, 89052, 89074'],
    ['Guard-Gated', 'No'],
    ['HOA', '$0–$1,500/mo'],
  ]
  const displayStats = mergeQuickStats(HARDCODED_STATS, cms?.quickStats)
  const HARDCODED_DRIVE_TIMES = [
    {
        "time": "~20 min",
        "destination": "to the Strip",
        "route": "via I-215 → I-15"
    },
    {
        "time": "~20 min",
        "destination": "to Harry Reid Airport",
        "route": "via I-215 → I-15"
    },
    {
        "time": "~20 min",
        "destination": "to Lake Mead",
        "route": "via Lake Mead Pkwy East"
    },
    {
        "time": "~30 min",
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
          <span>Henderson</span>
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
                <span className="hero-v2-stat-num">{ms?.medianSalePrice ?? qs('Median Home Price', '$300K–$28M+')}</span>
                <span className="hero-v2-stat-lbl">Median Sale Price</span>
              </div>
              <div className="hero-v2-stat">
                <span className="hero-v2-stat-num">{ms?.avgDaysToClose ?? qs('Avg Days on Market', '45')}</span>
                <span className="hero-v2-stat-lbl">Avg Days to Close</span>
              </div>
            </div>
            <a href="#listings" className="hero-v2-cta">Search Homes in Henderson</a>
          </div>
        </div>
      </header>

      <div className="hero-v2-qfb">
        <div className="container">
          <div className="hero-v2-qfb-row">
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <span><strong>ZIP:</strong> 89002, 89011, 89012, 89014, 89015, 89044, 89052, 89074</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              <span><strong>Type:</strong> City Hub · All Price Points</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
              <span><strong>Price Range:</strong> $300K–$28M+</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
              <span><strong>HOA:</strong> $0–$1,500/mo</span>
            </div>
          </div>
          <div className="hero-v2-qfb-est">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            <span>Est. 1953</span>
          </div>
        </div>
      </div>

      <section id="demographics" className="demographics-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Demographics</span>
            <h2>Henderson Demographics</h2>
          </div>
          <div className="demo-grid">
            {[
              ['320,000+', 'Population'],
              ['41', 'Median Age'],
              ['$85,000', 'Avg Household Income'],
              ['115,000+', 'Total Households'],
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
            <h2>Where is Henderson?</h2>
            <p>Henderson, Nevada &mdash; Henderson, Nevada.</p>
          </div>
          <div className="map-container">
            <HendersonMapWrapper />
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
            <h2 className="listings-title">NEW HENDERSON LISTINGS</h2>
          </div>
          <div className="ylopo-wrap">
            <div className="YLOPO_searchWidget" />
            <div className="YLOPO_resultsWidget" data-search='{"propertyTypes":["house","condo","townhouse"],"minPrice":250000,"locations":[{"city":"Henderson","state":"NV"}],"limit":12,"sortBy":"listDate","sortOrder":"desc","keywords":"Henderson","zipCodes":["89002","89011","89012","89014","89015","89044","89052","89074"]}' />
          </div>
          <p className="ylopo-note">Listing data sourced from regional MLS. Information deemed reliable but not guaranteed. Updated daily.</p>
          <div className="listings-actions">
            <a href="https://search.nevadarealestategroup.net/search?s[orderBy]=sourceCreationDate%2Cdesc&s[page]=1&s[locations][0][city]=Henderson&s[locations][0][state]=NV&s[keywords]=Henderson" target="_blank" rel="noopener noreferrer" className="btn-gold">View All Henderson Listings &rarr;</a>
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
                  <p>Henderson is Nevada's second-largest city and one of the most desirable places to live in the entire American Southwest. With a population exceeding 320,000, Henderson consistently earns national recognition as one of the safest large cities in the United States — a distinction that has fueled decades of residential growth, from accessible starter homes to some of the most exclusive luxury estates in the Las Vegas Valley.</p>
                  <p>The city's residential landscape spans an extraordinary range. Entry-level homes in established neighborhoods like Whitney Ranch and downtown Henderson start around $300,000, while ultra-luxury custom estates in MacDonald Highlands, Ascaya, and Seven Hills can exceed $28 million. In between, master-planned communities like Green Valley Ranch, Anthem, Inspirada, Cadence, and Lake Las Vegas offer virtually every lifestyle and price point imaginable.</p>
                  <p>Henderson's infrastructure is first-rate. The city operates its own police and fire departments, water district, parks system, and Henderson Hospital. Green Valley Ranch Resort & Casino, the Galleria at Sunset, The District shopping center, and Henderson's revitalized Water Street District provide dining, entertainment, and retail. The I-215 beltway encircles the city, providing 20-minute access to the Strip, Harry Reid Airport, and Red Rock Canyon.</p>
                  <p>For real estate buyers, Henderson represents the best combination of safety, lifestyle, infrastructure, and investment potential in the Las Vegas metro area. Whether you're a first-time buyer looking at Cadence or Whitney Ranch, a family seeking Green Valley Ranch's top schools, or a luxury buyer considering MacDonald Highlands' Strip views, Henderson has a community that fits. It's no wonder Henderson consistently leads the valley in new home construction and resale demand.</p>
                </>
              )}
            </div>
            <div className="overview-aside">
              <div className="quick-facts">
                <h3>Henderson At a Glance</h3>
                {displayStats.map(([label, value, cls]: any) => (
                  <div className="fact-row" key={label}>
                    <span className="fact-label">{label}</span>
                    <span className={`fact-value${cls ? ' ' + cls : ''}`}>{value}</span>
                  </div>
                ))}
              </div>
              <div className="cta-card">
                <p>Ready to explore Henderson? Schedule a private tour of the community and the current listings that match your goals.</p>
                <a href="tel:+17252399950" className="btn-gold">Call 725.239.9950</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="villages"><div className="villages-header-bar"><h2>HENDERSON COMMUNITIES</h2></div><div className="container"><div className="villages-grid">{[{name:'Anthem',href:'/anthem/',type:'Master-Planned · Golf',price:'From $400K'},{name:'Anthem Country Club',href:'/anthem-country-club/',type:'Guard-Gated · Golf',price:'From $1.2M'},{name:'Sun City Anthem',href:'/sun-city-anthem/',type:'55+ Active Adult',price:'From $350K'},{name:'Green Valley',href:'/green-valley/',type:'Master-Planned',price:'From $350K'},{name:'Green Valley Ranch',href:'/green-valley-ranch/',type:'Master-Planned',price:'From $400K'},{name:'Seven Hills',href:'/seven-hills/',type:'Guard-Gated · Golf',price:'From $500K'},{name:'MacDonald Highlands',href:'/macdonald-highlands/',type:'Guard-Gated · Ultra-Luxury',price:'From $800K'},{name:'Ascaya',href:'/ascaya/',type:'Guard-Gated · Ultra-Luxury',price:'From $3M'},{name:'Dragon Rock',href:'/dragon-rock/',type:'Double Guard-Gated',price:'From $5M'},{name:'Lake Las Vegas',href:'/lake-las-vegas/',type:'Resort · Luxury',price:'From $400K'},{name:'Inspirada',href:'/inspirada/',type:'Master-Planned',price:'From $420K'},{name:'Cadence',href:'/cadence/',type:'New Construction',price:'From $350K'},{name:'MacDonald Ranch',href:'/macdonald-ranch/',type:'Golf',price:'From $300K'},{name:'Tuscany Village',href:'/tuscany-village/',type:'Guard-Gated · Golf',price:'From $400K'},{name:'Silverado Ranch',href:'/silverado-ranch/',type:'Master-Planned',price:'From $350K'},{name:'Whitney Ranch',href:'/whitney-ranch/',type:'Master-Planned',price:'From $350K'},{name:'Madeira Canyon',href:'/madeira-canyon/',type:'Guard-Gated',price:'From $400K'},{name:'Boulder City',href:'/boulder-city/',type:'Independent City',price:'From $400K'}].map((v:any)=>(<a href={v.href} className="village-card" key={v.name} style={{textDecoration:'none'}}><div className="village-name">{v.name}</div><div className="village-type">{v.type}</div><div className="village-price">{v.price}</div></a>))}</div></div></section>

      <section id="highlights">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Why Henderson</span>
            <h2>What Makes Henderson Stand Out</h2>
          </div>
          <div className="highlights-grid">
            {[
              { title: 'Safest Large City', body: 'Henderson consistently ranks among the top 10 safest large cities in America (FBI UCR data). The city\'s own police and fire departments deliver rapid response times and proactive community policing.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
              { title: 'Every Price Point', body: 'From $300K starter homes to $28M+ ultra-luxury estates, Henderson\'s residential range is unmatched in the Las Vegas Valley. Guard-gated, golf, 55+, master-planned — every lifestyle is represented.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg> },
              { title: 'Master-Planned Excellence', body: 'Henderson is home to some of the best master-planned communities in the West: Anthem, Green Valley Ranch, Inspirada, Cadence, Lake Las Vegas, Seven Hills, and more.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
              { title: 'World-Class Golf', body: 'DragonRidge, Rio Secco, Reflection Bay (Jack Nicklaus), Anthem Country Club (Hale Irwin), Chimera, and SouthShore — Henderson has more championship golf per capita than almost anywhere.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 2v10l7 4"/></svg> },
              { title: 'I-215 Beltway Access', body: 'The I-215 beltway encircles Henderson, providing direct corridor access to the Strip, Harry Reid Airport, Summerlin, and every quadrant of the valley in 20–30 minutes.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><line x1="8" y1="6" x2="8" y2="6.01"/><line x1="12" y1="6" x2="12" y2="6.01"/><line x1="16" y1="6" x2="16" y2="6.01"/><line x1="8" y1="10" x2="8" y2="10.01"/><line x1="12" y1="10" x2="12" y2="10.01"/><line x1="16" y1="10" x2="16" y2="10.01"/><line x1="8" y1="14" x2="8" y2="14.01"/><line x1="12" y1="14" x2="12" y2="14.01"/><line x1="16" y1="14" x2="16" y2="14.01"/></svg> },
              { title: 'Strong Appreciation', body: 'Henderson leads the Las Vegas Valley in home value appreciation and resale demand. Safety, infrastructure, and lifestyle drive consistent long-term investment returns.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M8 21l4-11 4 11"/><path d="M2 21l5-14 4 8"/><path d="M14 15l4-8 4 14"/><line x1="2" y1="21" x2="22" y2="21"/></svg> },
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
            <h2>Parks &amp; Recreation Near Henderson</h2>
          </div>
          <div className="parks-grid">
            {[
              { name: 'Lake Mead National Recreation Area', address: '601 Nevada Way, Boulder City, NV 89005', acreage: '1.5 million acres', amenities: ["Boating & water sports","Hiking trails","Scenic drives","Camping","Fishing"] },
              { name: 'Cornerstone Park', address: '1600 Wigwam Pkwy, Henderson, NV 89074', acreage: '~25 acres', amenities: ["Lake with fishing","Walking trails","Playground","Picnic areas","Dog park"] },
              { name: 'Henderson Bird Viewing Preserve', address: '2400 Moser Dr, Henderson, NV 89015', acreage: '~147 acres', amenities: ["Bird watching","Nature trails","Educational programs","Photography spots","Wildlife habitat"] },
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
            <h2>The Henderson Lifestyle</h2>
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
              <div className="lifestyle-v2-stat">115,000+</div>
              <div className="lifestyle-v2-label">Homes</div>
            </div>
            <div className="lifestyle-v2-item">
              <div className="lifestyle-v2-icon"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 2v10l7 4"/></svg></div>
              <div className="lifestyle-v2-stat">1953</div>
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
            <h2>HOA Information for Henderson</h2>
          </div>
          <div className="hoa-grid">
            <div className="hoa-fees-col">
              <h3>Fees &amp; Management</h3>
              <div className="hoa-fee-row"><span>Monthly HOA Range</span><strong>$0–$1,500/mo</strong></div>
              <div className="hoa-fee-row"><span>Guard-Gated</span><strong>No</strong></div>
              <div className="hoa-fee-row"><span>Community Type</span><strong>City Hub · All Price Points</strong></div>
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
            <h2>Schools Serving Henderson</h2>
          </div>
          <div className="schools-v2-table">
            <div className="schools-v2-header">
              <span>School Name</span>
              <span>Grades</span>
              <span>Rating</span>
            </div>
            {[
              ['Green Valley High School', '9–12', '7/10'],
              ['Coronado High School', '9–12', '6/10'],
              ['Foothill High School', '9–12', '7/10'],
              ['Henderson International School', 'PreK–12', 'A'],
              ['Bishop Gorman High School', '9–12', 'A+'],
              ['Pinecrest Academy of Nevada', 'K–12', 'A'],
              ['Doral Academy of Nevada', 'K–8', '9/10'],
              ['Somerset Academy', 'K–8', '8/10'],
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
            <h2>What Henderson Buyers Say</h2>
          </div>
          <div className="testimonials-grid">
            {[
              { quote: 'Henderson had everything on our checklist — safety, great schools, parks, and a direct commute to my office near the Strip. Nevada Real Estate Group showed us Green Valley Ranch, Anthem, and Inspirada and helped us find the perfect fit for our family.', name: 'David & Lauren S.', detail: 'Bought in Henderson · 2024' },
              { quote: 'After 30 years in California, we chose Henderson for retirement. Nevada Real Estate Group understood our priorities and showed us communities we never would have found on our own. Henderson is everything we hoped for and more.', name: 'Robert & Patricia H.', detail: 'Bought in Henderson · 2025' },
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

      <HendersonFAQ />

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
              { name: 'Las Vegas', href: '/summerlin/', price: 'From $300K', compare: 'The broader Las Vegas metro including Summerlin, Southern Highlands, and central Las Vegas neighborhoods.' },
              { name: 'Boulder City', href: '/boulder-city/', price: 'From $350K', compare: 'Small-town living near Lake Mead and Hoover Dam. No gaming, controlled growth.' },
              { name: 'Summerlin', href: '/summerlin/', price: 'From $450K', compare: 'Las Vegas\' premier master-planned community on the west side with Red Rock Canyon views.' },
              { name: 'Southern Highlands', href: '/southern-highlands/', price: 'From $400K', compare: 'Guard-gated golf community in the south valley with Jack Nicklaus course.' },
              { name: 'North Las Vegas', href: '/north-las-vegas/', price: 'From $250K', compare: 'More affordable new construction in communities like Aliante, Skye Canyon, and Tule Springs.' },
              { name: 'Enterprise', href: '/enterprise/', price: 'From $350K', compare: 'Growing unincorporated area south of the Strip with new-construction communities.' },
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
              <h2>Ready to Find Your Henderson Home?</h2>
              <p>Nevada Real Estate Group is the #1 real estate team in Nevada. Whether you&apos;re buying or selling in Henderson, let&apos;s talk.</p>
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
                <input type="hidden" name="_subject" value="Henderson Inquiry — LasVegasHomeSearchExperts.com" />
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
