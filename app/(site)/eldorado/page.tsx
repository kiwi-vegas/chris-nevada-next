import EldoradoFAQ from '@/components/EldoradoFAQ'
import Link from 'next/link'
import type { Metadata } from 'next'
import EldoradoMapWrapper from '@/components/EldoradoMapWrapper'
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
    { '@type': 'ListItem', position: 3, name: 'Eldorado', item: 'https://www.lasvegashomesearchexperts.com/eldorado/' },
  ],
}

const FAQ_DATA = [
  {
    "q": "What is the price range for homes in Eldorado?",
    "a": "Homes in Eldorado range from approximately $300,000 for townhomes and smaller single-family homes to $500,000 for larger floor plans on premium lots."
  },
  {
    "q": "Is Eldorado in Las Vegas or North Las Vegas?",
    "a": "Eldorado is in the City of North Las Vegas, located in the central-northern section of the city along the North 5th Street and Decatur Boulevard corridors."
  },
  {
    "q": "Is Eldorado a good area?",
    "a": "Eldorado is a family-oriented community with affordable homes, access to Craig Ranch Regional Park, and improving infrastructure. North Las Vegas has invested significantly in the area's roads, parks, and commercial development."
  },
  {
    "q": "What ZIP codes are in Eldorado?",
    "a": "Eldorado spans ZIP codes 89032 and 89031 in North Las Vegas."
  },
  {
    "q": "What is Craig Ranch Regional Park?",
    "a": "Craig Ranch Regional Park is a 170-acre park featuring the world's largest skate park, an amphitheater for concerts and events, sports fields, playgrounds, and walking trails. It serves as the premier recreation destination for Eldorado residents."
  },
  {
    "q": "Are there good schools in Eldorado?",
    "a": "Eldorado is served by CCSD schools including Legacy High School and Tarkanian Middle School. Charter options like Coral Academy of Science (8/10) and Somerset Academy provide additional choices. Bishop Gorman High School (A+) is accessible by a 20-minute drive."
  },
  {
    "q": "What are HOA fees in Eldorado?",
    "a": "HOA fees in Eldorado are among the lowest in the valley, typically $40 to $120 per month. Some older neighborhoods have no HOA. Low fees are a significant value advantage."
  },
  {
    "q": "Is Eldorado a good investment?",
    "a": "Eldorado's affordable pricing, growing infrastructure, and strong rental demand make it attractive for investors. North Las Vegas' population growth and commercial development support continued property value appreciation."
  },
  {
    "q": "What are the best sub-neighborhoods within Eldorado?",
    "a": "The best sub-neighborhood depends on your priorities — school zones, lot size, home age, and proximity to amenities all vary within the community. Nevada Real Estate Group agents who specialize in Eldorado can walk you through the specific blocks and streets that match your criteria."
  },
  {
    "q": "How is new construction availability in Eldorado?",
    "a": "New construction availability varies by season and builder phase. Some sections of Eldorado have active new home sales while others are fully built out with resale-only inventory. Contact Nevada Real Estate Group for the most current new construction options."
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
  name: 'Eldorado',
  description: 'Eldorado is a established · family community in North Las Vegas, Nevada (ZIP 89032), established in 1998 by Various Builders, spanning ~700 acres. Home prices range from $300K–$500K.',
  geo: { '@type': 'GeoCoordinates', latitude: 36.235, longitude: -115.165 },
  address: { '@type': 'PostalAddress', addressLocality: 'North Las Vegas', addressRegion: 'NV', postalCode: '89032', addressCountry: 'US' },
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
  const cms = await getCommunityPage('eldorado')
  return {
    title: cms?.metaTitle ?? 'Eldorado Homes for Sale | Nevada Real Estate Group',
    description: cms?.metaDescription ?? 'Browse Eldorado homes for sale in North Las Vegas, NV. $300K–$500K. Schools, HOA, market stats. Nevada Real Estate Group.',
    alternates: { canonical: 'https://www.lasvegashomesearchexperts.com/eldorado' },
  }
}

export default async function EldoradoPage() {
  const cms = await getCommunityPage('eldorado')
  const market = getMarketStats('eldorado')
  const ms = market?.stats

  const heroHeadline = cms?.heroHeadline ?? 'Eldorado'
  const heroSubtitle = 'Homes for Sale in North Las Vegas, Nevada'
  const overviewTitle = cms?.overviewTitle ?? 'Eldorado: Established · Family Living in North Las Vegas'

  const HARDCODED_STATS: Array<[string, string] | [string, string, string]> = [
    ['Established', '1998'],
    ['Developer', 'Various Builders'],
    ['Total Acreage', '~700 acres'],
    ['Homes', '~4,000'],
    ['Median Home Price', ms?.medianSalePrice ?? '$300K–$500K'],
    ['ZIP Codes', '89032, 89031'],
    ['Guard-Gated', 'No'],
    ['HOA', '$40–$120/mo'],
  ]
  const displayStats = mergeQuickStats(HARDCODED_STATS, cms?.quickStats)
  const HARDCODED_DRIVE_TIMES = [
    {
        "time": "~20 min",
        "destination": "to the Strip",
        "route": "via I-15 South"
    },
    {
        "time": "~25 min",
        "destination": "to Harry Reid Airport",
        "route": "via I-15 South"
    },
    {
        "time": "~10 min",
        "destination": "to Aliante Casino & Shopping",
        "route": "via Aliante Pkwy"
    },
    {
        "time": "~15 min",
        "destination": "to Centennial Hills Shopping",
        "route": "via US-95 West"
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
          <span>Eldorado</span>
        </div>
      </div>

      <header id="hero" className="summerlin-hero hero-v2">
        <img src="https://images.unsplash.com/photo-1570126618953-d437176e8c79?auto=format&fit=crop&w=1600&h=700&q=80" alt="Eldorado community aerial view, North Las Vegas Nevada" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
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
                <span className="hero-v2-stat-num">{ms?.medianSalePrice ?? qs('Median Home Price', '$300K–$500K')}</span>
                <span className="hero-v2-stat-lbl">Median Sale Price</span>
              </div>
              <div className="hero-v2-stat">
                <span className="hero-v2-stat-num">{ms?.avgDaysToClose ?? qs('Avg Days on Market', '45')}</span>
                <span className="hero-v2-stat-lbl">Avg Days to Close</span>
              </div>
            </div>
            <a href="#listings" className="hero-v2-cta">Search Homes in Eldorado</a>
          </div>
        </div>
      </header>

      <div className="hero-v2-qfb">
        <div className="container">
          <div className="hero-v2-qfb-row">
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <span><strong>ZIP:</strong> 89032, 89031</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              <span><strong>Type:</strong> Established · Family</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
              <span><strong>Price Range:</strong> $300K–$500K</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
              <span><strong>HOA:</strong> $40–$120/mo</span>
            </div>
          </div>
          <div className="hero-v2-qfb-est">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            <span>Est. 1998</span>
          </div>
        </div>
      </div>

      <section id="demographics" className="demographics-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Demographics</span>
            <h2>Eldorado Demographics</h2>
          </div>
          <div className="demo-grid">
            {[
              ['~12,000', 'Population'],
              ['32', 'Median Age'],
              ['$62,000', 'Avg Household Income'],
              ['~4,000', 'Total Households'],
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
            <h2>Where is Eldorado?</h2>
            <p>North Las Vegas, Nevada &mdash; North Las Vegas, Nevada.</p>
          </div>
          <div className="map-container">
            <EldoradoMapWrapper />
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
            <h2 className="listings-title">NEW ELDORADO LISTINGS</h2>
          </div>
          <div className="ylopo-wrap">
            <div className="YLOPO_searchWidget" />
            <div className="YLOPO_resultsWidget" data-search='{"propertyTypes":["house","condo","townhouse"],"minPrice":280000,"locations":[{"city":"North Las Vegas","state":"NV"}],"limit":12,"sortBy":"listDate","sortOrder":"desc","keywords":"Eldorado North Las Vegas","zipCodes":["89032","89031"]}' />
          </div>
          <p className="ylopo-note">Listing data sourced from regional MLS. Information deemed reliable but not guaranteed. Updated daily.</p>
          <div className="listings-actions">
            <a href="https://search.nevadarealestategroup.net/search?s[orderBy]=sourceCreationDate%2Cdesc&s[page]=1&s[locations][0][city]=North%20Las%20Vegas&s[locations][0][state]=NV&s[keywords]=Eldorado%20North%20Las%20Vegas" target="_blank" rel="noopener noreferrer" className="btn-gold">View All Eldorado Listings &rarr;</a>
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
                  <p>Eldorado is a established · family community in North Las Vegas, Nevada (ZIP 89032/89031), established in 1998, developed by Various Builders, spanning ~700 acres. Eldorado is an established residential area in North Las Vegas that offers some of the most affordable single-family homes in the northwest Las Vegas Valley. Located along the North 5th Street and Decatur Boulevard corridors in the central-northern section of North Las Vegas, Eldorado features a mix of single-family homes, townhomes, and newer infill development that has brought fresh inventory to an area with deep roots in the community.</p>
                  <p>Homes in Eldorado were built by a variety of builders — Pardee, Beazer, KB Home, DR Horton, and others — with construction spanning from the late 1990s through the 2010s. Floor plans range from approximately 1,000 to 2,800 square feet with prices from $300,000 to $500,000. The area offers exceptional square-footage value compared to communities further west, making it a popular choice for first-time buyers, investors, and families seeking maximum space on a budget.</p>
                  <p>Eldorado is served by the broader North Las Vegas parks and recreation system, with Craig Ranch Regional Park — a 170-acre facility featuring the largest skate park in the world, an amphitheater, sports fields, and event spaces — serving as the area's premier recreation destination. The North Las Vegas Library and nearby community centers provide additional family resources. Shopping and dining options along Craig Road and North 5th Street continue to expand.</p>
                  <p>The community's central North Las Vegas location provides access to multiple commute corridors: I-15 to the east, US-95 to the west, and the 215 Beltway to the north. Downtown Las Vegas and the Strip are approximately 20-25 minutes south. For buyers seeking affordable homeownership in a family-oriented area with improving infrastructure and services, Eldorado delivers strong value.</p>
                </>
              )}
            </div>
            <div className="overview-aside">
              <div className="quick-facts">
                <h3>Eldorado At a Glance</h3>
                {displayStats.map(([label, value, cls]: any) => (
                  <div className="fact-row" key={label}>
                    <span className="fact-label">{label}</span>
                    <span className={`fact-value${cls ? ' ' + cls : ''}`}>{value}</span>
                  </div>
                ))}
              </div>
              <div className="cta-card">
                <p>Ready to explore Eldorado? Schedule a private tour of the community and the current listings that match your goals.</p>
                <a href="tel:+17252399950" className="btn-gold">Call 725.239.9950</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="highlights">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Why Eldorado</span>
            <h2>What Makes Eldorado Stand Out</h2>
          </div>
          <div className="highlights-grid">
            {[
              { title: 'Affordable Homeownership', body: 'Single-family homes from $300K to $500K — some of the most affordable options in the northwest Las Vegas Valley. Exceptional square-footage value compared to communities further west.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
              { title: 'Craig Ranch Regional Park', body: '170-acre park featuring the world\'s largest skate park, an amphitheater, sports fields, playgrounds, and event spaces. One of the finest regional parks in the valley.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22c4-4 8-7.5 8-12a8 8 0 10-16 0c0 4.5 4 8 8 12z"/><circle cx="12" cy="10" r="3"/></svg> },
              { title: 'Central Location', body: 'Access to I-15, US-95, and the 215 Beltway provides efficient commutes to Downtown Las Vegas, the Strip, Henderson, and employment centers throughout the valley.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><line x1="8" y1="6" x2="8" y2="6.01"/><line x1="12" y1="6" x2="12" y2="6.01"/><line x1="16" y1="6" x2="16" y2="6.01"/><line x1="8" y1="10" x2="8" y2="10.01"/><line x1="12" y1="10" x2="12" y2="10.01"/><line x1="16" y1="10" x2="16" y2="10.01"/><line x1="8" y1="14" x2="8" y2="14.01"/><line x1="12" y1="14" x2="12" y2="14.01"/><line x1="16" y1="14" x2="16" y2="14.01"/></svg> },
              { title: 'Investment Opportunity', body: 'Eldorado\'s affordable pricing and North Las Vegas\' continued growth make it an attractive option for investors seeking rental properties with strong cash flow potential.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg> },
              { title: 'Improving Infrastructure', body: 'North Las Vegas continues to invest in roads, parks, schools, and commercial development in the Eldorado corridor. Infrastructure improvements support property value growth.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><line x1="8" y1="6" x2="8" y2="6.01"/><line x1="12" y1="6" x2="12" y2="6.01"/><line x1="16" y1="6" x2="16" y2="6.01"/><line x1="8" y1="10" x2="8" y2="10.01"/><line x1="12" y1="10" x2="12" y2="10.01"/><line x1="16" y1="10" x2="16" y2="10.01"/><line x1="8" y1="14" x2="8" y2="14.01"/><line x1="12" y1="14" x2="12" y2="14.01"/><line x1="16" y1="14" x2="16" y2="14.01"/></svg> },
              { title: 'Family Community', body: 'A diverse, family-oriented community with active neighborhood associations, community events, and growing retail and dining options along the major corridors.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
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
            <h2>Parks &amp; Recreation Near Eldorado</h2>
          </div>
          <div className="parks-grid">
            {[
              { name: 'Craig Ranch Regional Park', address: '628 W Craig Rd, North Las Vegas, NV 89032', acreage: '170 acres', amenities: ["World's largest skate park","Amphitheater","Sports fields","Playground","Walking trails"] },
              { name: 'Seastrand Park', address: '6880 Donald Nelson Ave, North Las Vegas, NV 89084', acreage: '~10 acres', amenities: ["Playground","Basketball courts","Walking paths","Picnic areas"] },
              { name: 'Joe Kneip Park', address: '4220 E Alexander Rd, North Las Vegas, NV 89032', acreage: '~5 acres', amenities: ["Playground","Sports courts","Shade structures","Open turf"] },
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
            <h2>The Eldorado Lifestyle</h2>
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
              <div className="lifestyle-v2-stat">~4,000</div>
              <div className="lifestyle-v2-label">Homes</div>
            </div>
            <div className="lifestyle-v2-item">
              <div className="lifestyle-v2-icon"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 2v10l7 4"/></svg></div>
              <div className="lifestyle-v2-stat">1998</div>
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
            <h2>HOA Information for Eldorado</h2>
          </div>
          <div className="hoa-grid">
            <div className="hoa-fees-col">
              <h3>Fees &amp; Management</h3>
              <div className="hoa-fee-row"><span>Monthly HOA Range</span><strong>$40–$120/mo</strong></div>
              <div className="hoa-fee-row"><span>Guard-Gated</span><strong>No</strong></div>
              <div className="hoa-fee-row"><span>Community Type</span><strong>Established · Family</strong></div>
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
            <h2>Schools Serving Eldorado</h2>
          </div>
          <div className="schools-v2-table">
            <div className="schools-v2-header">
              <span>School Name</span>
              <span>Grades</span>
              <span>Rating</span>
            </div>
            {[
              ['Myrtle Tate Elementary', 'K–5', '5/10'],
              ['Lois & Jerry Tarkanian Middle School', '6–8', '6/10'],
              ['Legacy High School', '9–12', '5/10'],
              ['Mountain View Christian School', 'PreK–12', 'B+'],
              ['Bishop Gorman High School', '9–12', 'A+'],
              ['Coral Academy of Science', 'K–12', '8/10'],
              ['Somerset Academy — Losee', 'K–8', '7/10'],
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
            <h2>What Eldorado Buyers Say</h2>
          </div>
          <div className="testimonials-grid">
            {[
              { quote: 'Nevada Real Estate Group helped us find a great home in Eldorado for under $350K. They never judged our budget — they just worked hard to find us the best value. We\'re thrilled with our home and the neighborhood.', name: 'Marcus & Tanya W.', detail: 'Bought in Eldorado · 2024' },
              { quote: 'As an investor, I\'ve purchased three rental properties in Eldorado with Nevada Real Estate Group\'s help. The cash flow is excellent and the area continues to improve. They understand the investor mindset.', name: 'Raymond L.', detail: 'Invested in Eldorado · 2025' },
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

      <EldoradoFAQ />

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
              { name: 'Aliante', href: '/aliante/', price: 'From $350K', compare: 'North Las Vegas\' premier master-planned community with golf course and nature park.' },
              { name: 'Tule Springs', href: '/tule-springs/', price: 'From $300K', compare: 'Adjacent community with Floyd Lamb Park and newer construction options.' },
              { name: 'Centennial Hills', href: '/centennial-hills/', price: 'From $400K', compare: 'Established northwest Las Vegas community with stronger schools and more amenities.' },
              { name: 'North Las Vegas', href: '/north-las-vegas/', price: 'From $280K', compare: 'The broader North Las Vegas market with diverse neighborhoods and price points.' },
              { name: 'Skye Canyon', href: '/skye-canyon/', price: 'From $450K', compare: 'Newer northwest master plan for buyers willing to invest more for modern amenities.' },
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
              <h2>Ready to Find Your Eldorado Home?</h2>
              <p>Nevada Real Estate Group is the #1 real estate team in Nevada. Whether you&apos;re buying or selling in Eldorado, let&apos;s talk.</p>
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
                <input type="hidden" name="_subject" value="Eldorado Inquiry — LasVegasHomeSearchExperts.com" />
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
