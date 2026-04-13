import NorthLasVegasFAQ from '@/components/NorthLasVegasFAQ'
import Link from 'next/link'
import type { Metadata } from 'next'
import NorthLasVegasMapWrapper from '@/components/NorthLasVegasMapWrapper'
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
    { '@type': 'ListItem', position: 3, name: 'North Las Vegas', item: 'https://www.lasvegashomesearchexperts.com/north-las-vegas/' },
  ],
}

const FAQ_DATA = [
  {
    "q": "Is North Las Vegas a good place to buy a home?",
    "a": "Yes. North Las Vegas offers the best value in the Las Vegas Valley with new-construction homes from the mid-$200s — typically $50K–$100K below comparable homes in Henderson or Summerlin. Major economic development and improving infrastructure support long-term appreciation."
  },
  {
    "q": "What is the price range for homes in North Las Vegas?",
    "a": "Homes in North Las Vegas range from approximately $250,000 in established neighborhoods to $600,000 for premium homes in newer master-planned communities like Skye Canyon and Aliante."
  },
  {
    "q": "What are the best neighborhoods in North Las Vegas?",
    "a": "Aliante is the most established master-planned community with golf and a casino resort. Skye Canyon offers premium new construction. Heartland at Tule Springs and The Villages deliver affordable new builds. Centennial Hills straddles the Las Vegas border."
  },
  {
    "q": "Is North Las Vegas safe?",
    "a": "Safety varies by neighborhood. Newer master-planned communities like Aliante, Skye Canyon, and Heartland at Tule Springs have low crime rates comparable to Henderson. The city's investment in policing and infrastructure continues to improve safety across all areas."
  },
  {
    "q": "How far is North Las Vegas from the Strip?",
    "a": "North Las Vegas is approximately 15–25 minutes from the Las Vegas Strip depending on which area you're in. The I-15 and US-95 corridors provide direct commute access."
  },
  {
    "q": "Is there new construction in North Las Vegas?",
    "a": "Yes. North Las Vegas is one of the most active new-construction markets in the Las Vegas Valley. Multiple national builders are delivering new homes in Skye Canyon, Heartland at Tule Springs, The Villages at Tule Springs, Craig Ranch, and other communities."
  },
  {
    "q": "What ZIP codes does North Las Vegas cover?",
    "a": "North Las Vegas spans multiple ZIP codes including 89030, 89031, 89032, 89081, 89084, 89085, and 89086. Newer communities tend to be in the 89084, 89085, and 89086 ZIP codes."
  },
  {
    "q": "Are there 55+ communities in North Las Vegas?",
    "a": "Yes. Sun City Aliante is a Del Webb 55+ community within the Aliante master plan. Ardiente and Del Webb at North Ranch offer additional active adult options."
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
  name: 'North Las Vegas',
  description: 'North Las Vegas is a city hub · all price points community in North Las Vegas, Nevada.',
  geo: { '@type': 'GeoCoordinates', latitude: 36.228, longitude: -115.117 },
  address: { '@type': 'PostalAddress', addressLocality: 'North Las Vegas', addressRegion: 'NV', postalCode: '89030', addressCountry: 'US' },
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
  const cms = await getCommunityPage('north-las-vegas')
  return {
    title: cms?.metaTitle ?? 'North Las Vegas Homes for Sale | Nevada Real Estate Group',
    description: cms?.metaDescription ?? 'Browse North Las Vegas homes for sale in North Las Vegas, NV. $250K–$600K. Schools, HOA, market stats. Nevada Real Estate Group.',
    alternates: { canonical: 'https://www.lasvegashomesearchexperts.com/north-las-vegas' },
  }
}

export default async function NorthLasVegasPage() {
  const cms = await getCommunityPage('north-las-vegas')
  const market = getMarketStats('north-las-vegas')
  const ms = market?.stats

  const heroHeadline = cms?.heroHeadline ?? 'North Las Vegas'
  const heroSubtitle = 'Homes for Sale in North Las Vegas, Nevada'
  const overviewTitle = cms?.overviewTitle ?? 'North Las Vegas: City Hub · All Price Points Living in North Las Vegas'

  const HARDCODED_STATS: Array<[string, string] | [string, string, string]> = [
    ['Established', '1946'],
    ['Developer', 'Multiple developers'],
    ['Total Acreage', '101.3 sq mi'],
    ['Homes', '60,000+'],
    ['Median Home Price', ms?.medianSalePrice ?? '$250K–$600K'],
    ['ZIP Codes', '89030, 89031, 89032, 89081, 89084, 89085, 89086'],
    ['Guard-Gated', 'No'],
    ['HOA', '$0–$250/mo'],
  ]
  const displayStats = mergeQuickStats(HARDCODED_STATS, cms?.quickStats)
  const HARDCODED_DRIVE_TIMES = [
    {
        "time": "~20 min",
        "destination": "to the Strip",
        "route": "via I-15 or US-95"
    },
    {
        "time": "~25 min",
        "destination": "to Harry Reid Airport",
        "route": "via I-15"
    },
    {
        "time": "~30 min",
        "destination": "to Henderson",
        "route": "via I-15 → I-215"
    },
    {
        "time": "~15 min",
        "destination": "to Downtown Las Vegas",
        "route": "via Las Vegas Blvd or I-15"
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
          <span>North Las Vegas</span>
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
                <span className="hero-v2-stat-num">{ms?.medianSalePrice ?? qs('Median Home Price', '$250K–$600K')}</span>
                <span className="hero-v2-stat-lbl">Median Sale Price</span>
              </div>
              <div className="hero-v2-stat">
                <span className="hero-v2-stat-num">{ms?.avgDaysToClose ?? qs('Avg Days on Market', '45')}</span>
                <span className="hero-v2-stat-lbl">Avg Days to Close</span>
              </div>
            </div>
            <a href="#listings" className="hero-v2-cta">Search Homes in North Las Vegas</a>
          </div>
        </div>
      </header>

      <div className="hero-v2-qfb">
        <div className="container">
          <div className="hero-v2-qfb-row">
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <span><strong>ZIP:</strong> 89030, 89031, 89032, 89081, 89084, 89085, 89086</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              <span><strong>Type:</strong> City Hub · All Price Points</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
              <span><strong>Price Range:</strong> $250K–$600K</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
              <span><strong>HOA:</strong> $0–$250/mo</span>
            </div>
          </div>
          <div className="hero-v2-qfb-est">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            <span>Est. 1946</span>
          </div>
        </div>
      </div>

      <section id="demographics" className="demographics-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Demographics</span>
            <h2>North Las Vegas Demographics</h2>
          </div>
          <div className="demo-grid">
            {[
              ['270,000+', 'Population'],
              ['34', 'Median Age'],
              ['$65,000', 'Avg Household Income'],
              ['~60,000', 'Total Households'],
              ['58%', 'Homeownership Rate'],
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
            <h2>Where is North Las Vegas?</h2>
            <p>North Las Vegas, Nevada &mdash; North Las Vegas, Nevada.</p>
          </div>
          <div className="map-container">
            <NorthLasVegasMapWrapper />
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
            <h2 className="listings-title">NEW NORTH LAS VEGAS LISTINGS</h2>
          </div>
          <div className="ylopo-wrap">
            <div className="YLOPO_searchWidget" />
            <div className="YLOPO_resultsWidget" data-search='{"propertyTypes":["house","condo","townhouse"],"minPrice":200000,"locations":[{"city":"North Las Vegas","state":"NV"}],"limit":12,"sortBy":"listDate","sortOrder":"desc","keywords":"North Las Vegas","zipCodes":["89030","89031","89032","89081","89084","89085","89086"]}' />
          </div>
          <p className="ylopo-note">Listing data sourced from regional MLS. Information deemed reliable but not guaranteed. Updated daily.</p>
          <div className="listings-actions">
            <a href="https://search.nevadarealestategroup.net/search?s[orderBy]=sourceCreationDate%2Cdesc&s[page]=1&s[locations][0][city]=North%20Las%20Vegas&s[locations][0][state]=NV&s[keywords]=North%20Las%20Vegas" target="_blank" rel="noopener noreferrer" className="btn-gold">View All North Las Vegas Listings &rarr;</a>
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
                  <p>North Las Vegas is one of the fastest-growing cities in Nevada and an increasingly attractive destination for homebuyers seeking value, new construction, and a family-friendly environment. With a population exceeding 270,000, North Las Vegas has transformed dramatically over the past two decades — from a small, overlooked city north of the Strip into a hub of modern master-planned communities, new school construction, and major economic development.</p>
                  <p>The city's residential landscape spans from established neighborhoods near downtown to brand-new master-planned communities along the northern and northwestern corridors. Aliante is the most well-known, a mature master-planned community with a championship golf course, casino resort, and parks. Newer communities like Skye Canyon, Heartland at Tule Springs, and The Villages at Tule Springs offer brand-new construction from national builders at price points that are typically $50,000–$100,000 below comparable homes in Henderson or Summerlin.</p>
                  <p>North Las Vegas has attracted significant economic investment, with Amazon, Sephora, and other major employers building distribution and logistics centers that have brought thousands of jobs to the city. The VA Southern Nevada Healthcare System campus in North Las Vegas serves the region's veteran population. Las Vegas Motor Speedway, the Craig Ranch Regional Park, and the new Tule Springs Fossil Beds National Monument add recreation and cultural amenities.</p>
                  <p>For homebuyers, North Las Vegas represents the best value proposition in the Las Vegas Valley. New-construction single-family homes from the mid-$200s, established communities with parks and schools, and improving infrastructure make it an excellent choice for first-time buyers, families, and investors. The US-95 and I-15 corridors provide 20–30 minute commute access to the Strip, downtown Las Vegas, and the valley's employment centers.</p>
                </>
              )}
            </div>
            <div className="overview-aside">
              <div className="quick-facts">
                <h3>North Las Vegas At a Glance</h3>
                {displayStats.map(([label, value, cls]: any) => (
                  <div className="fact-row" key={label}>
                    <span className="fact-label">{label}</span>
                    <span className={`fact-value${cls ? ' ' + cls : ''}`}>{value}</span>
                  </div>
                ))}
              </div>
              <div className="cta-card">
                <p>Ready to explore North Las Vegas? Schedule a private tour of the community and the current listings that match your goals.</p>
                <a href="tel:+17252399950" className="btn-gold">Call 725.239.9950</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="villages"><div className="villages-header-bar"><h2>NORTH LAS VEGAS COMMUNITIES</h2></div><div className="container"><div className="villages-grid">{[{name:'Aliante',href:'/aliante/',type:'Master-Planned · Golf',price:'From $300K'},{name:'Skye Canyon',href:'/skye-canyon/',type:'New Construction',price:'From $400K'},{name:'Centennial Hills',href:'/centennial-hills/',type:'Master-Planned',price:'From $350K'},{name:'Providence',href:'/providence/',type:'Master-Planned',price:'From $350K'},{name:'Lone Mountain',href:'/lone-mountain/',type:'Semi-Rural',price:'From $400K'},{name:'Heartland at Tule Springs',href:'/heartland-tule-springs/',type:'New Construction',price:'From $350K'},{name:'Sunstone',href:'/sunstone/',type:'New Construction',price:'From $380K'},{name:'Sun City Aliante',href:'/sun-city-aliante/',type:'55+ Active Adult',price:'From $300K'},{name:'Park Highlands',href:'/north-las-vegas-park-highlands/',type:'Master-Planned',price:'From $350K'},{name:'Craig Ranch',href:'/craig-ranch/',type:'Family · Parks',price:'From $300K'},{name:'Eldorado',href:'/eldorado/',type:'Established',price:'From $300K'},{name:'Tule Springs',href:'/tule-springs/',type:'Established',price:'From $300K'}].map((v:any)=>(<a href={v.href} className="village-card" key={v.name} style={{textDecoration:'none'}}><div className="village-name">{v.name}</div><div className="village-type">{v.type}</div><div className="village-price">{v.price}</div></a>))}</div></div></section>

      <section id="highlights">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Why North Las Vegas</span>
            <h2>What Makes North Las Vegas Stand Out</h2>
          </div>
          <div className="highlights-grid">
            {[
              { title: 'Best Value in the Valley', body: 'New-construction homes from the mid-$200s — typically $50K–$100K below comparable homes in Henderson or Summerlin. The strongest value proposition in the Las Vegas metro.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg> },
              { title: 'New Master-Planned Communities', body: 'Aliante, Skye Canyon, Heartland at Tule Springs, and Sunstone offer modern master-planned living with parks, trails, and community amenities.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
              { title: 'Major Economic Growth', body: 'Amazon, Sephora, and other major employers have built facilities in North Las Vegas, bringing thousands of jobs and driving housing demand and appreciation.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><line x1="8" y1="6" x2="8" y2="6.01"/><line x1="12" y1="6" x2="12" y2="6.01"/><line x1="16" y1="6" x2="16" y2="6.01"/><line x1="8" y1="10" x2="8" y2="10.01"/><line x1="12" y1="10" x2="12" y2="10.01"/><line x1="16" y1="10" x2="16" y2="10.01"/><line x1="8" y1="14" x2="8" y2="14.01"/><line x1="12" y1="14" x2="12" y2="14.01"/><line x1="16" y1="14" x2="16" y2="14.01"/></svg> },
              { title: 'Craig Ranch Regional Park', body: 'One of the largest municipal parks in the Las Vegas Valley with 170 acres of sports fields, skate parks, water playgrounds, and walking trails.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22c4-4 8-7.5 8-12a8 8 0 10-16 0c0 4.5 4 8 8 12z"/><circle cx="12" cy="10" r="3"/></svg> },
              { title: 'Active New Construction', body: 'Multiple national builders delivering new homes across several communities. Lennar, KB Home, Richmond American, DR Horton, and others offer a wide range of floor plans.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M8 21l4-11 4 11"/><path d="M2 21l5-14 4 8"/><path d="M14 15l4-8 4 14"/><line x1="2" y1="21" x2="22" y2="21"/></svg> },
              { title: 'Improving Infrastructure', body: 'New schools, roads, parks, and commercial development continue to transform North Las Vegas. The city\'s investment in infrastructure supports long-term value appreciation.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
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
            <h2>Parks &amp; Recreation Near North Las Vegas</h2>
          </div>
          <div className="parks-grid">
            {[
              { name: 'Craig Ranch Regional Park', address: '628 W Craig Rd, North Las Vegas, NV 89032', acreage: '~170 acres', amenities: ["Sports fields","Skate park","Water playground","Walking trails","Dog park"] },
              { name: 'Tule Springs Fossil Beds National Monument', address: '16090 N Las Vegas Blvd, North Las Vegas, NV 89131', acreage: '~22,000 acres', amenities: ["Paleontological sites","Hiking trails","Desert exploration","Educational programs","Wildlife viewing"] },
              { name: 'Floyd Lamb Park at Tule Springs', address: '9200 Tule Springs Rd, Las Vegas, NV 89131', acreage: '~680 acres', amenities: ["Historic ranch","Fishing ponds","Picnic areas","Nature trails","Wildlife viewing"] },
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
            <h2>The North Las Vegas Lifestyle</h2>
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
              <div className="lifestyle-v2-stat">60,000+</div>
              <div className="lifestyle-v2-label">Homes</div>
            </div>
            <div className="lifestyle-v2-item">
              <div className="lifestyle-v2-icon"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 2v10l7 4"/></svg></div>
              <div className="lifestyle-v2-stat">1946</div>
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
            <h2>HOA Information for North Las Vegas</h2>
          </div>
          <div className="hoa-grid">
            <div className="hoa-fees-col">
              <h3>Fees &amp; Management</h3>
              <div className="hoa-fee-row"><span>Monthly HOA Range</span><strong>$0–$250/mo</strong></div>
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
            <h2>Schools Serving North Las Vegas</h2>
          </div>
          <div className="schools-v2-table">
            <div className="schools-v2-header">
              <span>School Name</span>
              <span>Grades</span>
              <span>Rating</span>
            </div>
            {[
              ['Somerset Academy Sky Pointe', 'K–8', '8/10'],
              ['Legacy High School', '9–12', '5/10'],
              ['Canyon Springs High School', '9–12', '4/10'],
              ['Faith Lutheran Middle & High', '6–12', 'A'],
              ['Bishop Gorman High School', '9–12', 'A+'],
              ['Somerset Academy', 'K–8', '8/10'],
              ['Doral Academy Red Rock', 'K–12', '9/10'],
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
            <h2>What North Las Vegas Buyers Say</h2>
          </div>
          <div className="testimonials-grid">
            {[
              { quote: 'We couldn\'t afford Summerlin or Henderson on our budget, but Nevada Real Estate Group showed us brand-new homes in North Las Vegas that were $75,000 less for the same square footage. We love our home in Heartland at Tule Springs.', name: 'Marcus & Stephanie G.', detail: 'Bought in North Las Vegas · 2024' },
              { quote: 'As investors, North Las Vegas offers the best rental yields in the valley. Nevada Real Estate Group helped us purchase two properties in growing neighborhoods with strong tenant demand. The numbers are hard to beat.', name: 'Keith D.', detail: 'Investor in North Las Vegas · 2025' },
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

      <NorthLasVegasFAQ />

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
              { name: 'Las Vegas', href: '/summerlin/', price: 'From $300K', compare: 'The broader Las Vegas metro including Summerlin, Southern Highlands, and central neighborhoods.' },
              { name: 'Summerlin', href: '/summerlin/', price: 'From $450K', compare: 'Las Vegas\' premier west-side master plan. Higher prices but more established infrastructure.' },
              { name: 'Henderson', href: '/henderson/', price: 'From $300K', compare: 'Nevada\'s second-largest city. Safer reputation and more upscale communities.' },
              { name: 'Centennial Hills', href: '/centennial-hills/', price: 'From $400K', compare: 'Established community straddling the LV/NLV border with family-friendly neighborhoods.' },
              { name: 'Aliante', href: '/aliante/', price: 'From $350K', compare: 'North Las Vegas\' premier master-planned community with golf, casino, and parks.' },
              { name: 'Skye Canyon', href: '/skye-canyon/', price: 'From $450K', compare: 'Premium new-construction master plan in the northwest with mountain views.' },
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
              <h2>Ready to Find Your North Las Vegas Home?</h2>
              <p>Nevada Real Estate Group is the #1 real estate team in Nevada. Whether you&apos;re buying or selling in North Las Vegas, let&apos;s talk.</p>
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
                <input type="hidden" name="_subject" value="North Las Vegas Inquiry — LasVegasHomeSearchExperts.com" />
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'ItemList',
        name: 'North Las Vegas Communities and Neighborhoods',
        description: 'All communities and neighborhoods in North Las Vegas, Nevada.',
        numberOfItems: 12,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Aliante', url: 'https://www.lasvegashomesearchexperts.com/aliante/' },
          { '@type': 'ListItem', position: 2, name: 'Skye Canyon', url: 'https://www.lasvegashomesearchexperts.com/skye-canyon/' },
          { '@type': 'ListItem', position: 3, name: 'Centennial Hills', url: 'https://www.lasvegashomesearchexperts.com/centennial-hills/' },
          { '@type': 'ListItem', position: 4, name: 'Providence', url: 'https://www.lasvegashomesearchexperts.com/providence/' },
          { '@type': 'ListItem', position: 5, name: 'Lone Mountain', url: 'https://www.lasvegashomesearchexperts.com/lone-mountain/' },
          { '@type': 'ListItem', position: 6, name: 'Heartland at Tule Springs', url: 'https://www.lasvegashomesearchexperts.com/heartland-tule-springs/' },
          { '@type': 'ListItem', position: 7, name: 'Sunstone', url: 'https://www.lasvegashomesearchexperts.com/sunstone/' },
          { '@type': 'ListItem', position: 8, name: 'Sun City Aliante', url: 'https://www.lasvegashomesearchexperts.com/sun-city-aliante/' },
          { '@type': 'ListItem', position: 9, name: 'Park Highlands', url: 'https://www.lasvegashomesearchexperts.com/north-las-vegas-park-highlands/' },
          { '@type': 'ListItem', position: 10, name: 'Craig Ranch', url: 'https://www.lasvegashomesearchexperts.com/craig-ranch/' },
          { '@type': 'ListItem', position: 11, name: 'Eldorado', url: 'https://www.lasvegashomesearchexperts.com/eldorado/' },
          { '@type': 'ListItem', position: 12, name: 'Tule Springs', url: 'https://www.lasvegashomesearchexperts.com/tule-springs/' },
        ],
      }) }} />
    </main>
  )
}
