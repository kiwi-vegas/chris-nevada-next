import SummerlinReverenceFAQ from '@/components/SummerlinReverenceFAQ'
import Link from 'next/link'
import type { Metadata } from 'next'
import SummerlinReverenceMapWrapper from '@/components/SummerlinReverenceMapWrapper'
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
    { '@type': 'ListItem', position: 3, name: 'Reverence', item: 'https://www.lasvegashomesearchexperts.com/summerlin-reverence/' },
  ],
}

const FAQ_DATA = [
  {
    "q": "What is the price range for homes in Reverence?",
    "a": "Homes in Reverence range from approximately $600,000 for single-story ranch plans to $1.5 million for larger estate-style homes on premium lots with mountain views."
  },
  {
    "q": "Who builds homes in Reverence?",
    "a": "All homes in Reverence are built by Pulte Homes, a nationally recognized builder known for innovative floor plans and energy-efficient construction. Pulte offers multiple collections within the community."
  },
  {
    "q": "What amenities does Reverence have?",
    "a": "Reverence features a private residents' club with a resort-style pool, cabanas, fitness center, fire pit lounges, bocce ball courts, and event lawns. The community also has an extensive trail system connecting to Summerlin's broader network."
  },
  {
    "q": "Is Reverence guard-gated?",
    "a": "No. Reverence is not guard-gated. It is an open-access village within Summerlin West that relies on community design, Summerlin patrols, and a strong HOA for security and neighborhood standards."
  },
  {
    "q": "What ZIP code is Reverence in?",
    "a": "Reverence is located in ZIP code 89166 in the Summerlin West area of Las Vegas. Home prices range from $600K–$1.5M."
  },
  {
    "q": "What schools serve Reverence?",
    "a": "Reverence is served by CCSD schools including Bonner Elementary (9/10), Sig Rogich Middle School (10/10), and Arbor View High School (7/10). Private options include The Meadows School (A+) and Bishop Gorman High School (A+)."
  },
  {
    "q": "Does Reverence have mountain views?",
    "a": "Yes. Reverence's elevated position in Summerlin West provides views of the Spring Mountains and Red Rock Canyon from many homesites, community trails, and the residents' club. Western-facing premium lots have the best views."
  },
  {
    "q": "How far is Reverence from Red Rock Canyon?",
    "a": "Reverence is approximately 8 minutes from Red Rock Canyon's scenic loop entrance via West Charleston Boulevard. Hiking trails are accessible directly from the community's trail system."
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
  name: 'Reverence',
  description: 'Reverence is a master-planned · new construction community in Las Vegas, Nevada (ZIP 89166), established in 2019 by Howard Hughes Corporation / Pulte Homes, spanning 300+ acres. Home prices range from $600K–$1.5M.',
  geo: { '@type': 'GeoCoordinates', latitude: 36.21, longitude: -115.338 },
  address: { '@type': 'PostalAddress', addressLocality: 'Las Vegas', addressRegion: 'NV', postalCode: '89166', addressCountry: 'US' },
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
  const cms = await getCommunityPage('summerlin-reverence')
  return {
    title: cms?.metaTitle ?? 'Reverence Homes for Sale | Nevada Real Estate Group',
    description: cms?.metaDescription ?? 'Browse Reverence homes for sale in Las Vegas, NV. $600K–$1.5M. Schools, HOA, market stats. Nevada Real Estate Group.',
    alternates: { canonical: 'https://www.lasvegashomesearchexperts.com/summerlin-reverence' },
  }
}

export default async function SummerlinReverencePage() {
  const cms = await getCommunityPage('summerlin-reverence')
  const market = getMarketStats('summerlin-reverence')
  const ms = market?.stats

  const heroHeadline = cms?.heroHeadline ?? 'Reverence'
  const heroSubtitle = 'Homes for Sale in Las Vegas, Nevada'
  const overviewTitle = cms?.overviewTitle ?? 'Reverence: Master-Planned · New Construction Living in Las Vegas'

  const HARDCODED_STATS: Array<[string, string] | [string, string, string]> = [
    ['Established', '2019'],
    ['Developer', 'Howard Hughes Corporation / Pulte Homes'],
    ['Total Acreage', '300+ acres'],
    ['Homes', '900+ at buildout'],
    ['Median Home Price', ms?.medianSalePrice ?? '$600K–$1.5M'],
    ['ZIP Codes', '89166'],
    ['Guard-Gated', 'No'],
    ['HOA', '$180–$400/mo'],
  ]
  const displayStats = mergeQuickStats(HARDCODED_STATS, cms?.quickStats)
  const HARDCODED_DRIVE_TIMES = [
    {
        "time": "~25 min",
        "destination": "to the Strip",
        "route": "via Summerlin Pkwy → I-15"
    },
    {
        "time": "~8 min",
        "destination": "to Red Rock Canyon",
        "route": "via W Charleston Blvd"
    },
    {
        "time": "~10 min",
        "destination": "to Downtown Summerlin",
        "route": "via Summerlin Pkwy"
    },
    {
        "time": "~35 min",
        "destination": "to Harry Reid Airport",
        "route": "via I-215 South → I-15"
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
          <span>Reverence</span>
        </div>
      </div>

      <header id="hero" className="summerlin-hero hero-v2">
        <img src="https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1600&h=700&q=80" alt="Reverence community aerial view, Las Vegas Nevada" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
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
                <span className="hero-v2-stat-num">{ms?.medianSalePrice ?? qs('Median Home Price', '$600K–$1.5M')}</span>
                <span className="hero-v2-stat-lbl">Median Sale Price</span>
              </div>
              <div className="hero-v2-stat">
                <span className="hero-v2-stat-num">{ms?.avgDaysToClose ?? qs('Avg Days on Market', '45')}</span>
                <span className="hero-v2-stat-lbl">Avg Days to Close</span>
              </div>
            </div>
            <a href="#listings" className="hero-v2-cta">Search Homes in Reverence</a>
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
              <span><strong>Price Range:</strong> $600K–$1.5M</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
              <span><strong>HOA:</strong> $180–$400/mo</span>
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
            <h2>Reverence Demographics</h2>
          </div>
          <div className="demo-grid">
            {[
              ['~2,500', 'Population'],
              ['42', 'Median Age'],
              ['$150,000+', 'Avg Household Income'],
              ['~900', 'Total Households'],
              ['88%', 'Homeownership Rate'],
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
            <h2>Where is Reverence?</h2>
            <p>Summerlin West, Las Vegas &mdash; Las Vegas, Nevada.</p>
          </div>
          <div className="map-container">
            <SummerlinReverenceMapWrapper />
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
            <h2 className="listings-title">NEW REVERENCE LISTINGS</h2>
          </div>
          <div className="ylopo-wrap">
            <div className="YLOPO_searchWidget" />
            <div className="YLOPO_resultsWidget" data-search='{"propertyTypes":["house","condo","townhouse"],"minPrice":600000,"locations":[{"city":"Las Vegas","state":"NV"}],"limit":12,"sortBy":"listDate","sortOrder":"desc","keywords":"Reverence Summerlin","zipCodes":["89166"]}' />
          </div>
          <p className="ylopo-note">Listing data sourced from regional MLS. Information deemed reliable but not guaranteed. Updated daily.</p>
          <div className="listings-actions">
            <a href="https://search.nevadarealestategroup.net/search?s[orderBy]=sourceCreationDate%2Cdesc&s[page]=1&s[locations][0][city]=Las%20Vegas&s[locations][0][state]=NV&s[keywords]=Reverence%20Summerlin" target="_blank" rel="noopener noreferrer" className="btn-gold">View All Reverence Listings &rarr;</a>
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
                  <p>Reverence is a master-planned · new construction community within Summerlin in Las Vegas, Nevada (ZIP 89166), established in 2019, developed by Howard Hughes Corporation / Pulte Homes, spanning 300+ acres. Reverence is a premier village in Summerlin West that occupies a coveted position along the western rim of the Las Vegas Valley, offering residents dramatic mountain views and direct access to some of the best trail systems in Southern Nevada. Developed by Pulte Homes within the Howard Hughes Corporation's Summerlin master plan, Reverence was designed from the ground up as an elevated living experience with resort-caliber amenities.</p>
                  <p>The centerpiece of Reverence is its private residents' club, featuring a resort-style pool with cabanas, a state-of-the-art fitness center, outdoor gathering spaces with fire pits, bocce ball courts, and event lawns. The community's trail system connects directly to the Summerlin trail network and provides access to Red Rock Canyon trailheads, making it one of the most trail-connected neighborhoods in the entire master plan.</p>
                  <p>Homes in Reverence range from approximately $600,000 for single-story ranch plans to $1.5 million for larger two-story estate-style homes on premium lots. Pulte Homes delivers modern desert-contemporary architecture with open floor plans, multi-slide glass doors, chef-grade kitchens, and energy-efficient construction. Many floor plans feature casitas, courtyards, and multi-generational suites.</p>
                  <p>Reverence's elevated position in Summerlin West provides mountain views from many homesites, particularly those along the western edge of the community. The combination of resort amenities, trail connectivity, mountain views, and the Summerlin address makes Reverence one of the most desirable new-construction communities for buyers seeking a premium lifestyle without guard-gated pricing.</p>
                </>
              )}
            </div>
            <div className="overview-aside">
              <div className="quick-facts">
                <h3>Reverence At a Glance</h3>
                {displayStats.map(([label, value, cls]: any) => (
                  <div className="fact-row" key={label}>
                    <span className="fact-label">{label}</span>
                    <span className={`fact-value${cls ? ' ' + cls : ''}`}>{value}</span>
                  </div>
                ))}
              </div>
              <div className="cta-card">
                <p>Ready to explore Reverence? Schedule a private tour of the community and the current listings that match your goals.</p>
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
            <h2>Top 7 Facts About Reverence</h2>
          </div>
          <ol className="top-facts-list">
            <li key={0}>Reverence spans 300+ acres in Las Vegas, Nevada (ZIP 89166).</li>
            <li key={1}>Reverence was established in 2019 by Howard Hughes Corporation / Pulte Homes.</li>
            <li key={2}>Reverence contains 900+ at buildout homes with prices ranging from $600K–$1.5M.</li>
            <li key={3}>Reverence is a master-planned · new construction community within Summerlin.</li>
            <li key={4}>HOA fees in Reverence range from $180–$400/mo per month.</li>
            <li key={5}>Top-rated schools serving Reverence include Bonner Elementary (9/10) and Sig Rogich Middle School (10/10).</li>
            <li key={6}>Reverence is located ~25 min to the Strip via Summerlin Pkwy → I-15.</li>
          </ol>
        </div>
      </section>

      <section id="highlights">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Why Reverence</span>
            <h2>What Makes Reverence Stand Out</h2>
          </div>
          <div className="highlights-grid">
            {[
              { title: 'Private Residents\' Club', body: 'Resort-style pool with cabanas, fitness center, fire pit lounges, bocce ball courts, and event lawns exclusively for Reverence residents.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><line x1="8" y1="6" x2="8" y2="6.01"/><line x1="12" y1="6" x2="12" y2="6.01"/><line x1="16" y1="6" x2="16" y2="6.01"/><line x1="8" y1="10" x2="8" y2="10.01"/><line x1="12" y1="10" x2="12" y2="10.01"/><line x1="16" y1="10" x2="16" y2="10.01"/><line x1="8" y1="14" x2="8" y2="14.01"/><line x1="12" y1="14" x2="12" y2="14.01"/><line x1="16" y1="14" x2="16" y2="14.01"/></svg> },
              { title: 'Trail Connectivity', body: 'Direct connections to the Summerlin trail system and Red Rock Canyon trailheads. One of the most trail-connected neighborhoods in Summerlin.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22c4-4 8-7.5 8-12a8 8 0 10-16 0c0 4.5 4 8 8 12z"/><circle cx="12" cy="10" r="3"/></svg> },
              { title: 'Mountain Views', body: 'Elevated western position offers dramatic views of the Spring Mountains and Red Rock Canyon from homesites, trails, and the residents\' club.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M8 21l4-11 4 11"/><path d="M2 21l5-14 4 8"/><path d="M14 15l4-8 4 14"/><line x1="2" y1="21" x2="22" y2="21"/></svg> },
              { title: 'Pulte Homes Quality', body: 'All homes built by Pulte Homes with desert-contemporary architecture, open floor plans, multi-slide glass doors, and energy-efficient systems.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
              { title: 'Modern Floor Plans', body: 'Floor plans from 2,200 to 4,200+ square feet with options for casitas, courtyards, multi-generational suites, and home offices.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
              { title: 'Summerlin Appreciation', body: 'Summerlin West is the growth corridor of a 35-year master plan with a proven track record of strong home value appreciation across market cycles.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg> },
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
            <h2>Parks &amp; Recreation Near Reverence</h2>
          </div>
          <div className="parks-grid">
            {[
              { name: 'Reverence Residents\' Club', address: 'Reverence, Las Vegas, NV 89166', acreage: '~5 acres', amenities: ["Resort pool","Cabanas","Fitness center","Fire pit lounge","Bocce courts","Event lawn"] },
              { name: 'Reverence Trail System', address: 'Reverence, Las Vegas, NV 89166', acreage: '~15 acres', amenities: ["Paved walking paths","Desert hiking trails","Mountain viewpoints","Bike routes"] },
              { name: 'Fox Hill Park', address: '10100 Trails Dr, Las Vegas, NV 89138', acreage: '~20 acres', amenities: ["Adventure playground","Zip lines","Disc golf","Trails","Picnic areas"] },
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
            <h2>The Reverence Lifestyle</h2>
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
              <div className="lifestyle-v2-stat">900+ at buildout</div>
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
            <h2>HOA Information for Reverence</h2>
          </div>
          <div className="hoa-grid">
            <div className="hoa-fees-col">
              <h3>Fees &amp; Management</h3>
              <div className="hoa-fee-row"><span>Monthly HOA Range</span><strong>$180–$400/mo</strong></div>
              <div className="hoa-fee-row"><span>Guard-Gated</span><strong>No</strong></div>
              <div className="hoa-fee-row"><span>Community Type</span><strong>Master-Planned · New Construction</strong></div>
              <div className="hoa-management">
                <p className="hoa-mgmt-label">Management</p>
                <p className="hoa-mgmt-value">Summerlin Master Association + Sub-HOA</p>
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
            <h2>Schools Serving Reverence</h2>
          </div>
          <div className="schools-v2-table">
            <div className="schools-v2-header">
              <span>School Name</span>
              <span>Grades</span>
              <span>Rating</span>
            </div>
            {[
              ['Bonner Elementary', 'K–5', '9/10'],
              ['Sig Rogich Middle School', '6–8', '10/10'],
              ['Arbor View High School', '9–12', '7/10'],
              ['The Meadows School', 'PreK–12', 'A+'],
              ['Bishop Gorman High School', '9–12', 'A+'],
              ['Faith Lutheran Middle & High', '6–12', 'A'],
              ['Doral Academy Red Rock', 'K–12', '9/10'],
              ['Pinecrest Academy of Nevada', 'K–12', 'A'],
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
            <h2>What Reverence Buyers Say</h2>
          </div>
          <div className="testimonials-grid">
            {[
              { quote: 'We fell in love with Reverence the moment we saw the residents\' club and mountain views. Nevada Real Estate Group helped us select the right lot and negotiate upgrades that made our home exactly what we wanted.', name: 'Mark & Lisa D.', detail: 'Bought in Reverence, Summerlin · 2024' },
              { quote: 'The trail access at Reverence is unbeatable. Nevada Real Estate Group knew which homesites had the best trail connections and mountain views. They made the new-construction process easy.', name: 'Sarah K.', detail: 'Bought in Reverence, Summerlin · 2025' },
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

      <SummerlinReverenceFAQ />

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
              { name: 'Redpoint Square', href: '/summerlin-redpoint-square/', price: 'From $450K', compare: 'Adjacent Summerlin West village with new construction from multiple builders.' },
              { name: 'Summerlin', href: '/summerlin/', price: 'From $450K', compare: 'The broader master-planned community with 20+ villages and every price point.' },
              { name: 'The Ridges', href: '/summerlin-the-ridges/', price: 'From $2M', compare: 'Summerlin\'s ultra-luxury guard-gated enclave with Bear\'s Best golf course.' },
              { name: 'Mesa Ridge', href: '/mesa-ridge/', price: 'From $1M', compare: 'Guard-gated luxury community in Summerlin with semi-custom and custom homes.' },
              { name: 'Skye Canyon', href: '/skye-canyon/', price: 'From $450K', compare: 'New master-planned community in the northwest with resort-style amenities.' },
              { name: 'Centennial Hills', href: '/centennial-hills/', price: 'From $400K', compare: 'Established northwest Las Vegas community with parks, trails, and top-rated schools.' },
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
              <h2>Ready to Find Your Reverence Home?</h2>
              <p>Nevada Real Estate Group is the #1 real estate team in Nevada. Whether you&apos;re buying or selling in Reverence, let&apos;s talk.</p>
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
                <input type="hidden" name="_subject" value="Reverence Inquiry — LasVegasHomeSearchExperts.com" />
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
