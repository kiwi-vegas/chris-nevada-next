import NorthLasVegasAlianteNorthFAQ from '@/components/NorthLasVegasAlianteNorthFAQ'
import Link from 'next/link'
import type { Metadata } from 'next'
import NorthLasVegasAlianteNorthMapWrapper from '@/components/NorthLasVegasAlianteNorthMapWrapper'
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
    { '@type': 'ListItem', position: 3, name: 'Aliante North', item: 'https://www.lasvegashomesearchexperts.com/north-las-vegas-aliante-north/' },
  ],
}

const FAQ_DATA = [
  {
    "q": "What is the price range in Aliante North?",
    "a": "Homes in Aliante North range from approximately $350,000 to $550,000 for single-family homes. The most common price range is $400K–$475K for homes between 1,800 and 2,800 square feet."
  },
  {
    "q": "Is Aliante North part of the Aliante master plan?",
    "a": "Yes. Aliante North is the northern portion of the Aliante master-planned community in North Las Vegas. Residents benefit from all Aliante community amenities including the golf club, parks, trails, and nature preserve."
  },
  {
    "q": "What ZIP code is Aliante North in?",
    "a": "Aliante North is located in ZIP code 89084 in North Las Vegas, Nevada."
  },
  {
    "q": "Is there a golf course in Aliante?",
    "a": "Yes. Aliante Golf Club is an 18-hole public golf course located within the Aliante master plan. The course adds green space and value to the community."
  },
  {
    "q": "What schools serve Aliante North?",
    "a": "Aliante North is served by CCSD schools including Elise L. Wolff Elementary (7/10) and William E. Orr Middle School (5/10). Private options include Faith Lutheran (A) and Bishop Gorman High School (A+) in Las Vegas."
  },
  {
    "q": "How far is Aliante North from the Strip?",
    "a": "Aliante North is approximately 22 minutes from the Las Vegas Strip via I-15 South. The 215 Northern Beltway provides alternative routes to Summerlin and the west side."
  },
  {
    "q": "What amenities does Aliante offer?",
    "a": "Aliante features an 18-hole golf club, the Aliante Casino + Hotel + Spa, Aliante Nature Discovery Park (20 acres), Aliante Library, multiple neighborhood parks, trails, and playgrounds. It is one of the most amenitized communities in North Las Vegas."
  },
  {
    "q": "What are HOA fees in Aliante North?",
    "a": "HOA fees in Aliante North range from approximately $75 to $175 per month, covering master community maintenance, parks, trails, and common areas."
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
  name: 'Aliante North',
  description: 'Aliante North is a master-planned · family community in North Las Vegas, Nevada.',
  geo: { '@type': 'GeoCoordinates', latitude: 36.29, longitude: -115.206 },
  address: { '@type': 'PostalAddress', addressLocality: 'North Las Vegas', addressRegion: 'NV', postalCode: '89084', addressCountry: 'US' },
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
  const cms = await getCommunityPage('north-las-vegas-aliante-north')
  return {
    title: cms?.metaTitle ?? 'Aliante North Homes for Sale | Nevada Real Estate Group',
    description: cms?.metaDescription ?? 'Browse Aliante North homes for sale in North Las Vegas, NV. $350K–$550K. Schools, HOA, market stats. Nevada Real Estate Group.',
    alternates: { canonical: 'https://www.lasvegashomesearchexperts.com/north-las-vegas-aliante-north' },
  }
}

export default async function NorthLasVegasAlianteNorthPage() {
  const cms = await getCommunityPage('north-las-vegas-aliante-north')
  const market = getMarketStats('north-las-vegas-aliante-north')
  const ms = market?.stats

  const heroHeadline = cms?.heroHeadline ?? 'Aliante North'
  const heroSubtitle = 'Homes for Sale in North Las Vegas, Nevada'
  const overviewTitle = cms?.overviewTitle ?? 'Aliante North: Master-Planned · Family Living in North Las Vegas'

  const HARDCODED_STATS: Array<[string, string] | [string, string, string]> = [
    ['Established', '2003'],
    ['Developer', 'Del Webb / Pulte Group / American Nevada Corp'],
    ['Total Acreage', '~400 acres'],
    ['Homes', '2,500+'],
    ['Median Home Price', ms?.medianSalePrice ?? '$350K–$550K'],
    ['ZIP Codes', '89084'],
    ['Guard-Gated', 'No'],
    ['HOA', '$75–$175/mo'],
  ]
  const displayStats = mergeQuickStats(HARDCODED_STATS, cms?.quickStats)
  const HARDCODED_DRIVE_TIMES = [
    {
        "time": "~22 min",
        "destination": "to the Strip",
        "route": "via I-15 South"
    },
    {
        "time": "~15 min",
        "destination": "to Centennial Hills",
        "route": "via 215 Beltway West"
    },
    {
        "time": "~30 min",
        "destination": "to Harry Reid Airport",
        "route": "via I-15 South"
    },
    {
        "time": "~20 min",
        "destination": "to Summerlin",
        "route": "via 215 Beltway West"
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
          <span>Aliante North</span>
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
                <span className="hero-v2-stat-num">{ms?.medianSalePrice ?? qs('Median Home Price', '$350K–$550K')}</span>
                <span className="hero-v2-stat-lbl">Median Sale Price</span>
              </div>
              <div className="hero-v2-stat">
                <span className="hero-v2-stat-num">{ms?.avgDaysToClose ?? qs('Avg Days on Market', '45')}</span>
                <span className="hero-v2-stat-lbl">Avg Days to Close</span>
              </div>
            </div>
            <a href="#listings" className="hero-v2-cta">Search Homes in Aliante North</a>
          </div>
        </div>
      </header>

      <div className="hero-v2-qfb">
        <div className="container">
          <div className="hero-v2-qfb-row">
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <span><strong>ZIP:</strong> 89084</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              <span><strong>Type:</strong> Master-Planned · Family</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
              <span><strong>Price Range:</strong> $350K–$550K</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
              <span><strong>HOA:</strong> $75–$175/mo</span>
            </div>
          </div>
          <div className="hero-v2-qfb-est">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            <span>Est. 2003</span>
          </div>
        </div>
      </div>

      <section id="demographics" className="demographics-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Demographics</span>
            <h2>Aliante North Demographics</h2>
          </div>
          <div className="demo-grid">
            {[
              ['8,000+', 'Population'],
              ['35', 'Median Age'],
              ['$72,000', 'Avg Household Income'],
              ['2,500+', 'Total Households'],
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
            <h2>Where is Aliante North?</h2>
            <p>Aliante, North Las Vegas &mdash; North Las Vegas, Nevada.</p>
          </div>
          <div className="map-container">
            <NorthLasVegasAlianteNorthMapWrapper />
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
            <h2 className="listings-title">NEW ALIANTE NORTH LISTINGS</h2>
          </div>
          <div className="ylopo-wrap">
            <div className="YLOPO_searchWidget" />
            <div className="YLOPO_resultsWidget" data-search='{"propertyTypes":["house","condo","townhouse"],"minPrice":350000,"locations":[{"city":"North Las Vegas","state":"NV"}],"limit":12,"sortBy":"listDate","sortOrder":"desc","keywords":"Aliante","zipCodes":["89084"]}' />
          </div>
          <p className="ylopo-note">Listing data sourced from regional MLS. Information deemed reliable but not guaranteed. Updated daily.</p>
          <div className="listings-actions">
            <a href="https://search.nevadarealestategroup.net/search?s[orderBy]=sourceCreationDate%2Cdesc&s[page]=1&s[locations][0][city]=North%20Las%20Vegas&s[locations][0][state]=NV&s[keywords]=Aliante" target="_blank" rel="noopener noreferrer" className="btn-gold">View All Aliante North Listings &rarr;</a>
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
                  <p>Aliante North encompasses the northern portion of the Aliante master-planned community in North Las Vegas, one of the most successful and well-regarded master plans in the city. Located north of Aliante Parkway and extending toward Elkhorn Road, this section features newer construction, wider lots, and a more open feel compared to the community's earlier southern phases.</p>
                  <p>Built primarily between 2003 and 2010 with some newer infill, Aliante North offers single-family homes ranging from approximately 1,400 to 3,200 square feet at price points between $350,000 and $550,000. The area benefits from its proximity to the Aliante Nature Discovery Park, a 20-acre park featuring walking trails, playgrounds, and wetland areas that provide a green oasis in the desert landscape.</p>
                  <p>The Aliante master plan was designed with community amenities at its core, and the northern section is no exception. The Aliante Casino + Hotel + Spa, Aliante Golf Club (an 18-hole course open to the public), Aliante Library, and multiple neighborhood parks are all within the community. The 215 Northern Beltway provides convenient freeway access for commuters working on the Strip, in Summerlin, or in Henderson.</p>
                  <p>Aliante North attracts first-time buyers, young families, and value-conscious purchasers who want the structure and amenities of a master-planned community at North Las Vegas pricing. The area offers significantly more square footage per dollar than comparable communities in Las Vegas or Henderson, and the quality of the community infrastructure — parks, trails, golf, casino — rivals many higher-priced neighborhoods across the valley.</p>
                </>
              )}
            </div>
            <div className="overview-aside">
              <div className="quick-facts">
                <h3>Aliante North At a Glance</h3>
                {displayStats.map(([label, value, cls]: any) => (
                  <div className="fact-row" key={label}>
                    <span className="fact-label">{label}</span>
                    <span className={`fact-value${cls ? ' ' + cls : ''}`}>{value}</span>
                  </div>
                ))}
              </div>
              <div className="cta-card">
                <p>Ready to explore Aliante North? Schedule a private tour of the community and the current listings that match your goals.</p>
                <a href="tel:+17252399950" className="btn-gold">Call 725.239.9950</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="highlights">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Why Aliante North</span>
            <h2>What Makes Aliante North Stand Out</h2>
          </div>
          <div className="highlights-grid">
            {[
              { title: 'Master-Planned Amenities', body: 'Full master-planned community with golf club, casino, library, nature parks, trails, and multiple neighborhood parks. Resort-caliber amenities at North Las Vegas pricing.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><line x1="8" y1="6" x2="8" y2="6.01"/><line x1="12" y1="6" x2="12" y2="6.01"/><line x1="16" y1="6" x2="16" y2="6.01"/><line x1="8" y1="10" x2="8" y2="10.01"/><line x1="12" y1="10" x2="12" y2="10.01"/><line x1="16" y1="10" x2="16" y2="10.01"/><line x1="8" y1="14" x2="8" y2="14.01"/><line x1="12" y1="14" x2="12" y2="14.01"/><line x1="16" y1="14" x2="16" y2="14.01"/></svg> },
              { title: 'Aliante Golf Club', body: '18-hole public golf course designed within the community. A valued amenity that adds character and green space to the neighborhood.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 2v10l7 4"/></svg> },
              { title: 'Nature Discovery Park', body: '20-acre park with walking trails, wetland areas, playgrounds, and natural desert landscape. One of North Las Vegas\' premier outdoor spaces.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22c4-4 8-7.5 8-12a8 8 0 10-16 0c0 4.5 4 8 8 12z"/><circle cx="12" cy="10" r="3"/></svg> },
              { title: 'Exceptional Value', body: 'Quality single-family homes from $350K–$550K in a fully amenitized master plan. More square footage per dollar than comparable Las Vegas or Henderson communities.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
              { title: '215 Beltway Access', body: 'The 215 Northern Beltway provides direct freeway access to Summerlin, the Strip, and Henderson. Commute times comparable to many Las Vegas addresses.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><line x1="8" y1="6" x2="8" y2="6.01"/><line x1="12" y1="6" x2="12" y2="6.01"/><line x1="16" y1="6" x2="16" y2="6.01"/><line x1="8" y1="10" x2="8" y2="10.01"/><line x1="12" y1="10" x2="12" y2="10.01"/><line x1="16" y1="10" x2="16" y2="10.01"/><line x1="8" y1="14" x2="8" y2="14.01"/><line x1="12" y1="14" x2="12" y2="14.01"/><line x1="16" y1="14" x2="16" y2="14.01"/></svg> },
              { title: 'Growth Corridor Value', body: 'North Las Vegas is the fastest-growing city in Nevada. New commercial development, employment centers, and infrastructure improvements are driving appreciation across Aliante.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg> },
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
            <h2>Parks &amp; Recreation Near Aliante North</h2>
          </div>
          <div className="parks-grid">
            {[
              { name: 'Aliante Nature Discovery Park', address: '2627 Nature Park Dr, North Las Vegas, NV 89084', acreage: '~20 acres', amenities: ["Walking trails","Wetland areas","Playgrounds","Picnic areas","Wildlife viewing"] },
              { name: 'Aliante Park', address: '3281 Elkhorn Rd, North Las Vegas, NV 89084', acreage: '~12 acres', amenities: ["Sports fields","Playground","Basketball courts","Walking paths","Open turf"] },
              { name: 'Centennial Hills Park', address: '7101 N Buffalo Dr, Las Vegas, NV 89131', acreage: '~120 acres', amenities: ["Sports fields","Playground","Dog park","Trails","Community center"] },
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
            <h2>The Aliante North Lifestyle</h2>
          </div>
          <div className="lifestyle-v2-grid">
            <div className="lifestyle-v2-item">
              <div className="lifestyle-v2-icon"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg></div>
              <div className="lifestyle-v2-stat">~22 min</div>
              <div className="lifestyle-v2-label">to the Strip</div>
            </div>
            <div className="lifestyle-v2-item">
              <div className="lifestyle-v2-icon"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22c4-4 8-7.5 8-12a8 8 0 10-16 0c0 4.5 4 8 8 12z"/><circle cx="12" cy="10" r="3"/></svg></div>
              <div className="lifestyle-v2-stat">3+</div>
              <div className="lifestyle-v2-label">Nearby Parks</div>
            </div>
            <div className="lifestyle-v2-item">
              <div className="lifestyle-v2-icon"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg></div>
              <div className="lifestyle-v2-stat">2,500+</div>
              <div className="lifestyle-v2-label">Homes</div>
            </div>
            <div className="lifestyle-v2-item">
              <div className="lifestyle-v2-icon"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 2v10l7 4"/></svg></div>
              <div className="lifestyle-v2-stat">2003</div>
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

      <section id="schools" className="schools-v2">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Education</span>
            <h2>Schools Serving Aliante North</h2>
          </div>
          <div className="schools-v2-table">
            <div className="schools-v2-header">
              <span>School Name</span>
              <span>Grades</span>
              <span>Rating</span>
            </div>
            {[
              ['Sandra L. Thompson Elementary', 'K–5', '6/10'],
              ['Elise L. Wolff Elementary', 'K–5', '7/10'],
              ['William E. Orr Middle School', '6–8', '5/10'],
              ['Faith Lutheran Middle & High', '6–12', 'A'],
              ['Bishop Gorman High School', '9–12', 'A+'],
              ['Somerset Academy NLV', 'K–8', '8/10'],
              ['Doral Academy Fire Mesa', 'K–8', '8/10'],
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
            <h2>What Aliante North Buyers Say</h2>
          </div>
          <div className="testimonials-grid">
            {[
              { quote: 'We got more house for our money in Aliante North than anywhere else we looked in the valley. The parks, the golf course, the casino — it feels like a resort community at a fraction of the price. Nevada Real Estate Group made it happen.', name: 'Marcus & Tiffany H.', detail: 'Bought in Aliante North, NLV · 2024' },
              { quote: 'As first-time buyers, we were nervous about North Las Vegas, but Aliante North changed our perception completely. The community is beautiful, well-maintained, and the value is incredible. Nevada Real Estate Group guided us perfectly.', name: 'Justin & Megan C.', detail: 'Bought in Aliante North · 2025' },
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

      <NorthLasVegasAlianteNorthFAQ />

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
              { name: 'Aliante', href: '/aliante/', price: 'From $350K', compare: 'The broader Aliante master plan including the core community, golf club, and casino.' },
              { name: 'Sun City Aliante', href: '/sun-city-aliante/', price: 'From $300K', compare: '55+ active adult community within the Aliante master plan with its own amenities.' },
              { name: 'Centennial Hills', href: '/centennial-hills/', price: 'From $400K', compare: 'Las Vegas community to the west with more retail options and higher price points.' },
              { name: 'Providence', href: '/providence/', price: 'From $450K', compare: 'Family-focused master plan in northwest Las Vegas with newer construction.' },
              { name: 'Skye Canyon', href: '/skye-canyon/', price: 'From $450K', compare: 'Newer master plan further northwest with active new construction.' },
              { name: 'North Las Vegas', href: '/north-las-vegas/', price: 'From $300K', compare: 'The broader North Las Vegas area with diverse housing options at accessible price points.' },
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
              <h2>Ready to Find Your Aliante North Home?</h2>
              <p>Nevada Real Estate Group is the #1 real estate team in Nevada. Whether you&apos;re buying or selling in Aliante North, let&apos;s talk.</p>
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
                <input type="hidden" name="_subject" value="Aliante North Inquiry — LasVegasHomeSearchExperts.com" />
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
