import SkyeCanyonBoulderHillsFAQ from '@/components/SkyeCanyonBoulderHillsFAQ'
import Link from 'next/link'
import type { Metadata } from 'next'
import SkyeCanyonBoulderHillsMapWrapper from '@/components/SkyeCanyonBoulderHillsMapWrapper'
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
    { '@type': 'ListItem', position: 3, name: 'Boulder Hills at Skye Canyon', item: 'https://www.lasvegashomesearchexperts.com/skye-canyon-boulder-hills/' },
  ],
}

const FAQ_DATA = [
  {
    "q": "What is the price range for homes in Boulder Hills at Skye Canyon?",
    "a": "Homes in Boulder Hills range from approximately $450,000 for townhomes to $700,000 for the largest single-family floor plans with premium lot positions."
  },
  {
    "q": "What builders are in Boulder Hills?",
    "a": "Boulder Hills features homes by Lennar and KB Home — national builders offering a range of floor plans from 1,600 to 3,400 square feet."
  },
  {
    "q": "Does Boulder Hills have access to the Skye Center?",
    "a": "Yes. All Boulder Hills residents have full access to the resort-style Skye Center including the pool complex, splash pad, fitness center, and community event programming."
  },
  {
    "q": "What ZIP code is Boulder Hills in?",
    "a": "Boulder Hills at Skye Canyon is located in ZIP code 89166 in northwest Las Vegas."
  },
  {
    "q": "What are HOA fees in Boulder Hills?",
    "a": "HOA fees range from $90 to $180 per month, covering Skye Canyon master association amenities including the Skye Center, trails, and common area maintenance."
  },
  {
    "q": "Is Boulder Hills guard-gated?",
    "a": "No. Boulder Hills is not guard-gated. It is a managed HOA community within the Skye Canyon master plan with shared amenities and community trails."
  },
  {
    "q": "How does Boulder Hills compare to Ridgeline at Skye Canyon?",
    "a": "Boulder Hills offers a more accessible price point than Ridgeline, with slightly smaller floor plans and lower-elevation positioning. Ridgeline provides the premium view lots and largest homes in Skye Canyon."
  },
  {
    "q": "What schools serve Boulder Hills?",
    "a": "The area is served by CCSD schools including Jydstrup Elementary (7/10) and Shadow Ridge High School (6/10). Doral Academy (9/10) and Coral Academy (8/10) are nearby charter options."
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
  name: 'Boulder Hills at Skye Canyon',
  description: 'Boulder Hills at Skye Canyon is a new construction · family community in North Las Vegas, Nevada.',
  geo: { '@type': 'GeoCoordinates', latitude: 36.3, longitude: -115.325 },
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
  const cms = await getCommunityPage('skye-canyon-boulder-hills')
  return {
    title: cms?.metaTitle ?? 'Boulder Hills at Skye Canyon Homes for Sale | Nevada Real Estate Group',
    description: cms?.metaDescription ?? 'Browse Boulder Hills at Skye Canyon homes for sale in North Las Vegas, NV. $450K–$700K. Schools, HOA, market stats. Nevada Real Estate Group.',
    alternates: { canonical: 'https://www.lasvegashomesearchexperts.com/skye-canyon-boulder-hills' },
  }
}

export default async function SkyeCanyonBoulderHillsPage() {
  const cms = await getCommunityPage('skye-canyon-boulder-hills')
  const market = getMarketStats('skye-canyon-boulder-hills')
  const ms = market?.stats

  const heroHeadline = cms?.heroHeadline ?? 'Boulder Hills at Skye Canyon'
  const heroSubtitle = 'Homes for Sale in North Las Vegas, Nevada'
  const overviewTitle = cms?.overviewTitle ?? 'Boulder Hills at Skye Canyon: New Construction · Family Living in North Las Vegas'

  const HARDCODED_STATS: Array<[string, string] | [string, string, string]> = [
    ['Established', '2018'],
    ['Developer', 'Lennar / KB Home'],
    ['Total Acreage', '~250 acres'],
    ['Homes', '~1,200'],
    ['Median Home Price', ms?.medianSalePrice ?? '$450K–$700K'],
    ['ZIP Codes', '89166'],
    ['Guard-Gated', 'No'],
    ['HOA', '$90–$180/mo'],
  ]
  const displayStats = mergeQuickStats(HARDCODED_STATS, cms?.quickStats)
  const HARDCODED_DRIVE_TIMES = [
    {
        "time": "~25 min",
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
        "time": "~20 min",
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
          <span>Boulder Hills at Skye Canyon</span>
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
                <span className="hero-v2-stat-num">{ms?.medianSalePrice ?? qs('Median Home Price', '$450K–$700K')}</span>
                <span className="hero-v2-stat-lbl">Median Sale Price</span>
              </div>
              <div className="hero-v2-stat">
                <span className="hero-v2-stat-num">{ms?.avgDaysToClose ?? qs('Avg Days on Market', '45')}</span>
                <span className="hero-v2-stat-lbl">Avg Days to Close</span>
              </div>
            </div>
            <a href="#listings" className="hero-v2-cta">Search Homes in Boulder Hills at Skye Canyon</a>
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
              <span><strong>Type:</strong> New Construction · Family</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
              <span><strong>Price Range:</strong> $450K–$700K</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
              <span><strong>HOA:</strong> $90–$180/mo</span>
            </div>
          </div>
          <div className="hero-v2-qfb-est">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            <span>Est. 2018</span>
          </div>
        </div>
      </div>

      <section id="demographics" className="demographics-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Demographics</span>
            <h2>Boulder Hills at Skye Canyon Demographics</h2>
          </div>
          <div className="demo-grid">
            {[
              ['~3,600', 'Population'],
              ['34', 'Median Age'],
              ['$95,000', 'Avg Household Income'],
              ['~1,200', 'Total Households'],
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
            <h2>Where is Boulder Hills at Skye Canyon?</h2>
            <p>North Las Vegas, Nevada &mdash; North Las Vegas, Nevada.</p>
          </div>
          <div className="map-container">
            <SkyeCanyonBoulderHillsMapWrapper />
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
            <h2 className="listings-title">NEW BOULDER HILLS AT SKYE CANYON LISTINGS</h2>
          </div>
          <div className="ylopo-wrap">
            <div className="YLOPO_searchWidget" />
            <div className="YLOPO_resultsWidget" data-search='{"propertyTypes":["house","condo","townhouse"],"minPrice":400000,"locations":[{"city":"Las Vegas","state":"NV"}],"limit":12,"sortBy":"listDate","sortOrder":"desc","keywords":"Boulder Hills Skye Canyon","zipCodes":["89166"]}' />
          </div>
          <p className="ylopo-note">Listing data sourced from regional MLS. Information deemed reliable but not guaranteed. Updated daily.</p>
          <div className="listings-actions">
            <a href="https://search.nevadarealestategroup.net/search?s[orderBy]=sourceCreationDate%2Cdesc&s[page]=1&s[locations][0][city]=Las%20Vegas&s[locations][0][state]=NV&s[keywords]=Boulder%20Hills%20Skye%20Canyon" target="_blank" rel="noopener noreferrer" className="btn-gold">View All Boulder Hills at Skye Canyon Listings &rarr;</a>
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
                  <p>Boulder Hills at Skye Canyon is a family-oriented neighborhood within the Skye Canyon master-planned community in northwest Las Vegas. Featuring newer construction by national builders including Lennar and KB Home, Boulder Hills offers well-designed single-family homes and townhomes that balance modern open floor plans with the outdoor lifestyle that defines Skye Canyon. The neighborhood's name reflects the natural boulder formations and desert terrain that frame the community's perimeter.</p>
                  <p>Homes in Boulder Hills range from approximately $450,000 for townhome-style residences and smaller single-family homes to $700,000 for the largest floor plans with three-car garages, covered outdoor living, and upgraded interior packages. Floor plans span 1,600 to 3,400 square feet with the contemporary open layouts, kitchen islands, and flexible spaces that today's families demand. Construction from 2018 onward means homes include the latest energy-efficient systems and smart-home readiness.</p>
                  <p>Boulder Hills residents enjoy full access to Skye Canyon's signature Skye Center amenity complex, including the resort-style pool, splash pad, fitness center, and community event programming. The Skye Canyon trail network — one of the most extensive community trail systems in Las Vegas — connects Boulder Hills to regional hiking and mountain biking routes through the desert landscape and Spring Mountain foothills.</p>
                  <p>The neighborhood appeals to families and young professionals seeking newer construction in a well-amenitized master-planned community at a price point below Summerlin. Skye Canyon's growing commercial infrastructure along Skye Canyon Drive and the US-95 corridor provides expanding retail, dining, and service options, while the community's northwest location offers mountain views and a less congested lifestyle than the central valley.</p>
                </>
              )}
            </div>
            <div className="overview-aside">
              <div className="quick-facts">
                <h3>Boulder Hills at Skye Canyon At a Glance</h3>
                {displayStats.map(([label, value, cls]: any) => (
                  <div className="fact-row" key={label}>
                    <span className="fact-label">{label}</span>
                    <span className={`fact-value${cls ? ' ' + cls : ''}`}>{value}</span>
                  </div>
                ))}
              </div>
              <div className="cta-card">
                <p>Ready to explore Boulder Hills at Skye Canyon? Schedule a private tour of the community and the current listings that match your goals.</p>
                <a href="tel:+17252399950" className="btn-gold">Call 725.239.9950</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="highlights">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Why Boulder Hills at Skye Canyon</span>
            <h2>What Makes Boulder Hills at Skye Canyon Stand Out</h2>
          </div>
          <div className="highlights-grid">
            {[
              { title: 'Family-Friendly Design', body: 'Homes designed for modern family living with open floor plans, flexible spaces, covered patios, and proximity to community parks and playgrounds.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
              { title: 'Skye Center Amenities', body: 'Full access to the resort-style Skye Center with pool complex, splash pad, fitness center, event pavilion, and year-round community programming.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22c4-4 8-7.5 8-12a8 8 0 10-16 0c0 4.5 4 8 8 12z"/><circle cx="12" cy="10" r="3"/></svg> },
              { title: 'Trail Lifestyle', body: 'Connected to the Skye Canyon trail network for hiking, biking, and running through desert landscape and Spring Mountain foothills. Active outdoor living within the community.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M8 21l4-11 4 11"/><path d="M2 21l5-14 4 8"/><path d="M14 15l4-8 4 14"/><line x1="2" y1="21" x2="22" y2="21"/></svg> },
              { title: 'Modern Construction', body: 'Homes built from 2018 onward by Lennar and KB Home with energy-efficient systems, smart-home technology, and contemporary floor plans from 1,600 to 3,400 sq ft.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><line x1="8" y1="6" x2="8" y2="6.01"/><line x1="12" y1="6" x2="12" y2="6.01"/><line x1="16" y1="6" x2="16" y2="6.01"/><line x1="8" y1="10" x2="8" y2="10.01"/><line x1="12" y1="10" x2="12" y2="10.01"/><line x1="16" y1="10" x2="16" y2="10.01"/><line x1="8" y1="14" x2="8" y2="14.01"/><line x1="12" y1="14" x2="12" y2="14.01"/><line x1="16" y1="14" x2="16" y2="14.01"/></svg> },
              { title: 'Below Summerlin Pricing', body: 'Boulder Hills delivers Skye Canyon\'s master-planned lifestyle at prices typically 20–30% below comparable Summerlin homes. Strong value for the amenity level provided.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg> },
              { title: 'Growing Commercial Base', body: 'New shopping, dining, and services continue to open along Skye Canyon Drive and the US-95 corridor, reducing commute requirements for daily errands.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
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
            <h2>Parks &amp; Recreation Near Boulder Hills at Skye Canyon</h2>
          </div>
          <div className="parks-grid">
            {[
              { name: 'Skye Center', address: '10115 W Skye Canyon Park Dr, Las Vegas, NV 89166', acreage: '~15 acres', amenities: ["Resort pool","Splash pad","Fitness center","Event pavilion","Community programming"] },
              { name: 'Boulder Hills Community Park', address: 'Within Boulder Hills at Skye Canyon', acreage: '~5 acres', amenities: ["Playground","Walking paths","Picnic areas","Open fields"] },
              { name: 'Skye Canyon Trail System', address: 'Various trailheads throughout Skye Canyon', acreage: 'Regional trail network', amenities: ["Hiking trails","Mountain biking","Running paths","Desert scenery"] },
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
            <h2>The Boulder Hills at Skye Canyon Lifestyle</h2>
          </div>
          <div className="lifestyle-v2-grid">
            <div className="lifestyle-v2-item">
              <div className="lifestyle-v2-icon"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg></div>
              <div className="lifestyle-v2-stat">~25 min</div>
              <div className="lifestyle-v2-label">to the Strip</div>
            </div>
            <div className="lifestyle-v2-item">
              <div className="lifestyle-v2-icon"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22c4-4 8-7.5 8-12a8 8 0 10-16 0c0 4.5 4 8 8 12z"/><circle cx="12" cy="10" r="3"/></svg></div>
              <div className="lifestyle-v2-stat">3+</div>
              <div className="lifestyle-v2-label">Nearby Parks</div>
            </div>
            <div className="lifestyle-v2-item">
              <div className="lifestyle-v2-icon"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg></div>
              <div className="lifestyle-v2-stat">~1,200</div>
              <div className="lifestyle-v2-label">Homes</div>
            </div>
            <div className="lifestyle-v2-item">
              <div className="lifestyle-v2-icon"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 2v10l7 4"/></svg></div>
              <div className="lifestyle-v2-stat">2018</div>
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
            <h2>Schools Serving Boulder Hills at Skye Canyon</h2>
          </div>
          <div className="schools-v2-table">
            <div className="schools-v2-header">
              <span>School Name</span>
              <span>Grades</span>
              <span>Rating</span>
            </div>
            {[
              ['Jydstrup Elementary', 'K–5', '7/10'],
              ['Edmundo "Eddie" Escobedo Sr. Middle School', '6–8', '6/10'],
              ['Shadow Ridge High School', '9–12', '6/10'],
              ['Mountain View Christian School', 'PreK–12', 'B+'],
              ['Bishop Gorman High School', '9–12', 'A+'],
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
            <h2>What Boulder Hills at Skye Canyon Buyers Say</h2>
          </div>
          <div className="testimonials-grid">
            {[
              { quote: 'Nevada Real Estate Group helped us find the right floor plan in Boulder Hills for our growing family. The Skye Center pool and trails keep the kids active all year, and the price was thousands below what we\'d pay for similar square footage in Summerlin.', name: 'Ryan & Michelle A.', detail: 'Bought in Boulder Hills at Skye Canyon · 2024' },
              { quote: 'We were comparing homes in Centennial Hills and Skye Canyon. Nevada Real Estate Group walked us through both areas honestly and showed us that Boulder Hills offered the best combination of new construction, amenities, and value. We\'re thrilled with our choice.', name: 'Daniel & Jessica T.', detail: 'Bought in Boulder Hills at Skye Canyon · 2025' },
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

      <SkyeCanyonBoulderHillsFAQ />

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
              { name: 'Skye Canyon', href: '/skye-canyon/', price: 'From $450K', compare: 'The broader Skye Canyon master plan with the Skye Center, trails, and diverse neighborhoods.' },
              { name: 'Ridgeline at Skye Canyon', href: '/skye-canyon-ridgeline/', price: 'From $500K', compare: 'Skye Canyon\'s premium section with the largest lots and most elevated positioning.' },
              { name: 'Centennial Hills', href: '/centennial-hills/', price: 'From $400K', compare: 'Established northwest area with comprehensive commercial infrastructure.' },
              { name: 'Providence', href: '/providence/', price: 'From $450K', compare: 'Family-friendly master plan in northwest Las Vegas with parks and trails.' },
              { name: 'Skye Hills', href: '/skye-hills/', price: 'From $400K', compare: 'Adjacent community with newer construction and growing amenities.' },
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
              <h2>Ready to Find Your Boulder Hills at Skye Canyon Home?</h2>
              <p>Nevada Real Estate Group is the #1 real estate team in Nevada. Whether you&apos;re buying or selling in Boulder Hills at Skye Canyon, let&apos;s talk.</p>
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
                <input type="hidden" name="_subject" value="Boulder Hills at Skye Canyon Inquiry — LasVegasHomeSearchExperts.com" />
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
