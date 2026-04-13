import HeartlandTuleSpringsFAQ from '@/components/HeartlandTuleSpringsFAQ'
import Link from 'next/link'
import type { Metadata } from 'next'
import HeartlandTuleSpringsMapWrapper from '@/components/HeartlandTuleSpringsMapWrapper'
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
    { '@type': 'ListItem', position: 3, name: 'Heartland at Tule Springs', item: 'https://www.lasvegashomesearchexperts.com/heartland-tule-springs/' },
  ],
}

const FAQ_DATA = [
  {
    "q": "What is the price range in Heartland at Tule Springs?",
    "a": "New-construction homes in Heartland at Tule Springs range from approximately $350,000 for entry-level floor plans to around $550,000 for the largest premium homes with upgraded finishes."
  },
  {
    "q": "Is Heartland at Tule Springs in North Las Vegas?",
    "a": "Yes. Heartland is located in North Las Vegas, in the rapidly growing northern corridor of the Las Vegas Valley, near the Tule Springs Fossil Beds National Monument."
  },
  {
    "q": "What builders are in Heartland at Tule Springs?",
    "a": "The community features homes from multiple national builders including Lennar, KB Home, Century Communities, and Richmond American Homes, each offering distinct floor plans and design options."
  },
  {
    "q": "Why is Heartland nationally ranked?",
    "a": "Heartland at Tule Springs has been ranked among the top 50 best-selling master-planned communities nationally due to its strong sales pace, competitive pricing, and the quality of its new-construction offerings."
  },
  {
    "q": "What is the Tule Springs National Monument?",
    "a": "Tule Springs Fossil Beds National Monument is a 22,650-acre federal preserve adjacent to Heartland that protects Ice Age fossils and desert habitat. It provides hiking, wildlife viewing, and open space that no other Las Vegas community can match."
  },
  {
    "q": "What ZIP code is Heartland at Tule Springs in?",
    "a": "Heartland at Tule Springs spans ZIP codes 89166 and 89084 in North Las Vegas."
  },
  {
    "q": "What schools serve Heartland at Tule Springs?",
    "a": "The community is served by CCSD schools. New schools are being planned as the area grows. Charter options like Doral Academy Fire Mesa (8/10) are available nearby."
  },
  {
    "q": "Is Heartland at Tule Springs a good investment?",
    "a": "Heartland offers strong investment potential due to its below-market pricing for new construction, location in one of the fastest-growing corridors in the valley, and planned infrastructure improvements including the 215 northern beltway extension."
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
  name: 'Heartland at Tule Springs',
  description: 'Heartland at Tule Springs is a master-planned · new construction community in North Las Vegas, Nevada.',
  geo: { '@type': 'GeoCoordinates', latitude: 36.29, longitude: -115.24 },
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
  const cms = await getCommunityPage('heartland-tule-springs')
  return {
    title: cms?.metaTitle ?? 'Heartland at Tule Springs Homes for Sale | Nevada Real Estate Group',
    description: cms?.metaDescription ?? 'Browse Heartland at Tule Springs homes for sale in North Las Vegas, NV. $350K–$550K. Schools, HOA, market stats. Nevada Real Estate Group.',
    alternates: { canonical: 'https://www.lasvegashomesearchexperts.com/heartland-tule-springs' },
  }
}

export default async function HeartlandTuleSpringsPage() {
  const cms = await getCommunityPage('heartland-tule-springs')
  const market = getMarketStats('heartland-tule-springs')
  const ms = market?.stats

  const heroHeadline = cms?.heroHeadline ?? 'Heartland at Tule Springs'
  const heroSubtitle = 'Homes for Sale in North Las Vegas, Nevada'
  const overviewTitle = cms?.overviewTitle ?? 'Heartland at Tule Springs: Master-Planned · New Construction Living in North Las Vegas'

  const HARDCODED_STATS: Array<[string, string] | [string, string, string]> = [
    ['Established', '2021'],
    ['Developer', 'Multiple National Builders'],
    ['Total Acreage', '~1,200 acres'],
    ['Homes', '3,000+ at build-out'],
    ['Median Home Price', ms?.medianSalePrice ?? '$350K–$550K'],
    ['ZIP Codes', '89166, 89084'],
    ['Guard-Gated', 'No'],
    ['HOA', '$80–$200/mo'],
  ]
  const displayStats = mergeQuickStats(HARDCODED_STATS, cms?.quickStats)
  const HARDCODED_DRIVE_TIMES = [
    {
        "time": "~30 min",
        "destination": "to the Strip",
        "route": "via US-95 South → I-15"
    },
    {
        "time": "~20 min",
        "destination": "to Centennial Hills",
        "route": "via N Decatur Blvd"
    },
    {
        "time": "~35 min",
        "destination": "to Harry Reid Airport",
        "route": "via US-95 South → I-15 South"
    },
    {
        "time": "~25 min",
        "destination": "to Downtown Las Vegas",
        "route": "via I-15 South"
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
          <span>Heartland at Tule Springs</span>
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
            <a href="#listings" className="hero-v2-cta">Search Homes in Heartland at Tule Springs</a>
          </div>
        </div>
      </header>

      <div className="hero-v2-qfb">
        <div className="container">
          <div className="hero-v2-qfb-row">
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <span><strong>ZIP:</strong> 89166, 89084</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              <span><strong>Type:</strong> Master-Planned · New Construction</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
              <span><strong>Price Range:</strong> $350K–$550K</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
              <span><strong>HOA:</strong> $80–$200/mo</span>
            </div>
          </div>
          <div className="hero-v2-qfb-est">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            <span>Est. 2021</span>
          </div>
        </div>
      </div>

      <section id="demographics" className="demographics-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Demographics</span>
            <h2>Heartland at Tule Springs Demographics</h2>
          </div>
          <div className="demo-grid">
            {[
              ['~7,500 (growing)', 'Population'],
              ['33', 'Median Age'],
              ['$75,000+', 'Avg Household Income'],
              ['~2,500 (growing)', 'Total Households'],
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
            <h2>Where is Heartland at Tule Springs?</h2>
            <p>North Las Vegas, Nevada &mdash; North Las Vegas, Nevada.</p>
          </div>
          <div className="map-container">
            <HeartlandTuleSpringsMapWrapper />
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
            <h2 className="listings-title">NEW HEARTLAND AT TULE SPRINGS LISTINGS</h2>
          </div>
          <div className="ylopo-wrap">
            <div className="YLOPO_searchWidget" />
            <div className="YLOPO_resultsWidget" data-search='{"propertyTypes":["house","condo","townhouse"],"minPrice":350000,"locations":[{"city":"North Las Vegas","state":"NV"}],"limit":12,"sortBy":"listDate","sortOrder":"desc","keywords":"Heartland Tule Springs","zipCodes":["89166","89084"]}' />
          </div>
          <p className="ylopo-note">Listing data sourced from regional MLS. Information deemed reliable but not guaranteed. Updated daily.</p>
          <div className="listings-actions">
            <a href="https://search.nevadarealestategroup.net/search?s[orderBy]=sourceCreationDate%2Cdesc&s[page]=1&s[locations][0][city]=North%20Las%20Vegas&s[locations][0][state]=NV&s[keywords]=Heartland%20Tule%20Springs" target="_blank" rel="noopener noreferrer" className="btn-gold">View All Heartland at Tule Springs Listings &rarr;</a>
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
                  <p>Heartland at Tule Springs is one of the most dynamic new-construction master-planned communities in the Las Vegas Valley, located in the rapidly growing northern corridor of North Las Vegas. Ranked among the top 50 best-selling master-planned communities nationally, Heartland has attracted thousands of buyers with its combination of brand-new homes, competitive pricing, modern amenities, and proximity to the Tule Springs Fossil Beds National Monument.</p>
                  <p>The community features homes from several of the nation's top production builders, including Lennar, KB Home, Century Communities, and Richmond American Homes. Floor plans range from compact single-family homes around 1,400 square feet to spacious two-story residences exceeding 3,000 square feet, with pricing that makes homeownership accessible to first-time buyers, young families, and investors.</p>
                  <p>Heartland's master plan includes an extensive network of parks, trails, and community amenities, with planned commercial centers to serve the growing population. The adjacent Tule Springs Fossil Beds National Monument — a 22,650-acre preserve protecting Ice Age fossils — provides a unique natural amenity that no other Las Vegas community can match. Residents also benefit from proximity to the VA Medical Center and the planned developments along the 215 northern beltway extension.</p>
                  <p>North Las Vegas has emerged as one of the fastest-growing cities in the United States, and Heartland at Tule Springs is at the center of that growth. For buyers seeking new-construction homes at price points significantly below Summerlin, Henderson, or the southwest valley, Heartland represents one of the strongest value propositions in the Las Vegas metro area.</p>
                </>
              )}
            </div>
            <div className="overview-aside">
              <div className="quick-facts">
                <h3>Heartland at Tule Springs At a Glance</h3>
                {displayStats.map(([label, value, cls]: any) => (
                  <div className="fact-row" key={label}>
                    <span className="fact-label">{label}</span>
                    <span className={`fact-value${cls ? ' ' + cls : ''}`}>{value}</span>
                  </div>
                ))}
              </div>
              <div className="cta-card">
                <p>Ready to explore Heartland at Tule Springs? Schedule a private tour of the community and the current listings that match your goals.</p>
                <a href="tel:+17252399950" className="btn-gold">Call 725.239.9950</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="highlights">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Why Heartland at Tule Springs</span>
            <h2>What Makes Heartland at Tule Springs Stand Out</h2>
          </div>
          <div className="highlights-grid">
            {[
              { title: 'Nationally Ranked Community', body: 'Ranked among the top 50 best-selling master-planned communities in the nation, reflecting strong buyer demand and builder confidence.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg> },
              { title: 'Affordable New Construction', body: 'Brand-new homes from the $350,000s — significantly below comparable new construction in Summerlin, Henderson, or the southwest valley.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
              { title: 'Multiple National Builders', body: 'Homes by Lennar, KB Home, Century Communities, Richmond American, and others. Wide selection of floor plans and design options.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><line x1="8" y1="6" x2="8" y2="6.01"/><line x1="12" y1="6" x2="12" y2="6.01"/><line x1="16" y1="6" x2="16" y2="6.01"/><line x1="8" y1="10" x2="8" y2="10.01"/><line x1="12" y1="10" x2="12" y2="10.01"/><line x1="16" y1="10" x2="16" y2="10.01"/><line x1="8" y1="14" x2="8" y2="14.01"/><line x1="12" y1="14" x2="12" y2="14.01"/><line x1="16" y1="14" x2="16" y2="14.01"/></svg> },
              { title: 'Tule Springs National Monument', body: 'Adjacent to the 22,650-acre Tule Springs Fossil Beds National Monument, providing hiking, wildlife viewing, and preserved desert landscape.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M8 21l4-11 4 11"/><path d="M2 21l5-14 4 8"/><path d="M14 15l4-8 4 14"/><line x1="2" y1="21" x2="22" y2="21"/></svg> },
              { title: 'Parks & Trail Network', body: 'Master-planned parks, community pools, playgrounds, and an expanding trail system connecting neighborhoods to open space.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
              { title: 'Rapid Growth Corridor', body: 'Located in one of the fastest-growing corridors in the Las Vegas Valley, with new schools, shopping centers, and infrastructure being built alongside homes.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
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
            <h2>Parks &amp; Recreation Near Heartland at Tule Springs</h2>
          </div>
          <div className="parks-grid">
            {[
              { name: 'Tule Springs Fossil Beds National Monument', address: '601 Nevada Hwy 157, Las Vegas, NV 89124', acreage: '22,650 acres', amenities: ["Hiking trails","Fossil viewing","Wildlife habitat","Desert preserve","Visitor center"] },
              { name: 'Craig Ranch Regional Park', address: '628 W Craig Rd, North Las Vegas, NV 89032', acreage: '~170 acres', amenities: ["Skate park","BMX track","Sports fields","Amphitheater","Dog park","Water playground"] },
              { name: 'Heartland Community Park', address: 'Heartland Village, North Las Vegas, NV 89166', acreage: '~15 acres (planned)', amenities: ["Playgrounds","Walking trails","Picnic pavilions","Open fields","Community pool"] },
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
            <h2>The Heartland at Tule Springs Lifestyle</h2>
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
              <div className="lifestyle-v2-stat">3,000+ at build-out</div>
              <div className="lifestyle-v2-label">Homes</div>
            </div>
            <div className="lifestyle-v2-item">
              <div className="lifestyle-v2-icon"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 2v10l7 4"/></svg></div>
              <div className="lifestyle-v2-stat">2021</div>
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
            <h2>Schools Serving Heartland at Tule Springs</h2>
          </div>
          <div className="schools-v2-table">
            <div className="schools-v2-header">
              <span>School Name</span>
              <span>Grades</span>
              <span>Rating</span>
            </div>
            {[
              ['Tule Springs Elementary', 'K–5', '6/10'],
              ['Elise L. Wolff Elementary', 'K–5', '6/10'],
              ['Cheyenne High School', '9–12', '5/10'],
              ['Legacy Christian Academy', 'K–12', 'B+'],
              ['Mountain View Christian School', 'PreK–8', 'B+'],
              ['Bishop Gorman High School', '9–12', 'A+'],
              ['Doral Academy Fire Mesa', 'K–8', '8/10'],
              ['Explore Academy', '6–12', '7/10'],
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
            <h2>What Heartland at Tule Springs Buyers Say</h2>
          </div>
          <div className="testimonials-grid">
            {[
              { quote: 'We got a brand-new home for nearly $200K less than comparable new construction in Summerlin. Nevada Real Estate Group helped us negotiate builder incentives that made the deal even better.', name: 'Carlos & Maria F.', detail: 'Bought in Heartland at Tule Springs · 2025' },
              { quote: 'As first-time buyers, the process felt overwhelming until Nevada Real Estate Group walked us through every builder option in Heartland. They even attended the design center appointment with us.', name: 'Ashley & Brandon T.', detail: 'Bought in Heartland at Tule Springs · 2024' },
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

      <HeartlandTuleSpringsFAQ />

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
              { name: 'Aliante', href: '/aliante/', price: 'From $350K', compare: 'Established North Las Vegas master plan with golf course and casino resort.' },
              { name: 'Skye Canyon', href: '/skye-canyon/', price: 'From $400K', compare: 'Northwest Las Vegas master plan with skye center amenities and mountain proximity.' },
              { name: 'Providence', href: '/providence/', price: 'From $450K', compare: 'Northwest Las Vegas master plan by Lennar with parks and community center.' },
              { name: 'Centennial Hills', href: '/centennial-hills/', price: 'From $400K', compare: 'Established northwest Las Vegas area with mature neighborhoods and amenities.' },
              { name: 'North Las Vegas', href: '/north-las-vegas/', price: 'From $300K', compare: 'The broader city encompassing Heartland, with diverse housing options.' },
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
              <h2>Ready to Find Your Heartland at Tule Springs Home?</h2>
              <p>Nevada Real Estate Group is the #1 real estate team in Nevada. Whether you&apos;re buying or selling in Heartland at Tule Springs, let&apos;s talk.</p>
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
                <input type="hidden" name="_subject" value="Heartland at Tule Springs Inquiry — LasVegasHomeSearchExperts.com" />
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
