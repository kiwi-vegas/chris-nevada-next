import DesertShoresVillasFAQ from '@/components/DesertShoresVillasFAQ'
import Link from 'next/link'
import type { Metadata } from 'next'
import DesertShoresVillasMapWrapper from '@/components/DesertShoresVillasMapWrapper'
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
    { '@type': 'ListItem', position: 3, name: 'Desert Shores Villas', item: 'https://www.lasvegashomesearchexperts.com/desert-shores-villas/' },
  ],
}

const FAQ_DATA = [
  {
    "q": "What is the price range for Desert Shores Villas?",
    "a": "Desert Shores Villas range from approximately $200,000 for one-bedroom condos to $450,000 for larger waterfront townhomes with lake views and updated interiors. The most active price range is $250,000 to $375,000."
  },
  {
    "q": "Are Desert Shores Villas on the lake?",
    "a": "Some units have direct lakefront positions with water views, while others are lake-adjacent or on interior streets. Lakefront units command higher prices. All residents have access to the four community lakes and beaches."
  },
  {
    "q": "What activities are available on the Desert Shores lakes?",
    "a": "Residents can kayak, paddleboard, and fish (catch and release) on the four man-made lakes. Sandy beaches provide sunbathing and lakeside relaxation. Motorized boats are not permitted. Walking trails circle the lakes."
  },
  {
    "q": "What are HOA fees at Desert Shores Villas?",
    "a": "HOA fees for the Villas typically range from $250 to $450 per month, covering exterior maintenance, landscaping, common area upkeep, lake and beach maintenance, and community amenities. Fees vary by specific complex."
  },
  {
    "q": "Are Desert Shores Villas a good investment?",
    "a": "Desert Shores Villas offer strong rental demand due to their lakefront lifestyle and affordable pricing. The community attracts tenants seeking waterfront living at a fraction of Lake Las Vegas pricing. Verify rental restrictions in the specific HOA before purchasing for investment."
  },
  {
    "q": "What is the difference between Desert Shores and Desert Shores Villas?",
    "a": "Desert Shores is the larger master-planned community with single-family homes, custom homes, and lakefront estates. Desert Shores Villas specifically refers to the condominium and townhome complexes within the community, offering a lower price point and maintenance-free lifestyle."
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
  name: 'Desert Shores Villas',
  description: 'Desert Shores Villas is a lakefront · condos community in Las Vegas, Nevada (ZIP 89128), established in 1988 by Greenspun Corporation, spanning ~40 acres. Home prices range from $200K–$450K.',
  geo: { '@type': 'GeoCoordinates', latitude: 36.21, longitude: -115.268 },
  address: { '@type': 'PostalAddress', addressLocality: 'Las Vegas', addressRegion: 'NV', postalCode: '89128', addressCountry: 'US' },
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
  const cms = await getCommunityPage('desert-shores-villas')
  return {
    title: cms?.metaTitle ?? 'Desert Shores Villas Homes for Sale | Nevada Real Estate Group',
    description: cms?.metaDescription ?? 'Browse Desert Shores Villas homes for sale in Las Vegas, NV. $200K–$450K. Schools, HOA, market stats. Nevada Real Estate Group.',
    alternates: { canonical: 'https://www.lasvegashomesearchexperts.com/desert-shores-villas' },
  }
}

export default async function DesertShoresVillasPage() {
  const cms = await getCommunityPage('desert-shores-villas')
  const market = getMarketStats('desert-shores-villas')
  const ms = market?.stats

  const heroHeadline = cms?.heroHeadline ?? 'Desert Shores Villas'
  const heroSubtitle = 'Homes for Sale in Las Vegas, Nevada'
  const overviewTitle = cms?.overviewTitle ?? 'Desert Shores Villas: Lakefront · Condos Living in Las Vegas'

  const HARDCODED_STATS: Array<[string, string] | [string, string, string]> = [
    ['Established', '1988'],
    ['Developer', 'Greenspun Corporation'],
    ['Total Acreage', '~40 acres'],
    ['Homes', '~600'],
    ['Median Home Price', ms?.medianSalePrice ?? '$200K–$450K'],
    ['ZIP Codes', '89128'],
    ['Guard-Gated', 'No'],
    ['HOA', '$250–$450/mo'],
  ]
  const displayStats = mergeQuickStats(HARDCODED_STATS, cms?.quickStats)
  const HARDCODED_DRIVE_TIMES = [
    {
        "time": "~20 min",
        "destination": "to the Strip",
        "route": "via US-95 → I-15"
    },
    {
        "time": "~15 min",
        "destination": "to Downtown Summerlin",
        "route": "via W Sahara Ave / Rampart Blvd"
    },
    {
        "time": "~25 min",
        "destination": "to Harry Reid Airport",
        "route": "via US-95 → I-15"
    },
    {
        "time": "~20 min",
        "destination": "to Red Rock Canyon",
        "route": "via W Charleston Blvd"
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
          <span>Desert Shores Villas</span>
        </div>
      </div>

      <header id="hero" className="summerlin-hero hero-v2">
        <img src="https://images.unsplash.com/photo-1581351721010-8cf859cb14a4?auto=format&fit=crop&w=1600&h=700&q=80" alt="Desert Shores Villas community aerial view, Las Vegas Nevada" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
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
                <span className="hero-v2-stat-num">{ms?.medianSalePrice ?? qs('Median Home Price', '$200K–$450K')}</span>
                <span className="hero-v2-stat-lbl">Median Sale Price</span>
              </div>
              <div className="hero-v2-stat">
                <span className="hero-v2-stat-num">{ms?.avgDaysToClose ?? qs('Avg Days on Market', '45')}</span>
                <span className="hero-v2-stat-lbl">Avg Days to Close</span>
              </div>
            </div>
            <a href="#listings" className="hero-v2-cta">Search Homes in Desert Shores Villas</a>
          </div>
        </div>
      </header>

      <div className="hero-v2-qfb">
        <div className="container">
          <div className="hero-v2-qfb-row">
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <span><strong>ZIP:</strong> 89128</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              <span><strong>Type:</strong> Lakefront · Condos</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
              <span><strong>Price Range:</strong> $200K–$450K</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
              <span><strong>HOA:</strong> $250–$450/mo</span>
            </div>
          </div>
          <div className="hero-v2-qfb-est">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            <span>Est. 1988</span>
          </div>
        </div>
      </div>

      <section id="demographics" className="demographics-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Demographics</span>
            <h2>Desert Shores Villas Demographics</h2>
          </div>
          <div className="demo-grid">
            {[
              ['~1,500', 'Population'],
              ['42', 'Median Age'],
              ['$55,000', 'Avg Household Income'],
              ['~600', 'Total Households'],
              ['65%', 'Homeownership Rate'],
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
            <h2>Where is Desert Shores Villas?</h2>
            <p>Desert Shores, Las Vegas &mdash; Las Vegas, Nevada.</p>
          </div>
          <div className="map-container">
            <DesertShoresVillasMapWrapper />
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
            <h2 className="listings-title">NEW DESERT SHORES VILLAS LISTINGS</h2>
          </div>
          <div className="ylopo-wrap">
            <div className="YLOPO_searchWidget" />
            <div className="YLOPO_resultsWidget" data-search='{"propertyTypes":["house","condo","townhouse"],"minPrice":150000,"locations":[{"city":"Las Vegas","state":"NV"}],"limit":12,"sortBy":"listDate","sortOrder":"desc","keywords":"Desert Shores","zipCodes":["89128"]}' />
          </div>
          <p className="ylopo-note">Listing data sourced from regional MLS. Information deemed reliable but not guaranteed. Updated daily.</p>
          <div className="listings-actions">
            <a href="https://search.nevadarealestategroup.net/search?s[orderBy]=sourceCreationDate%2Cdesc&s[page]=1&s[locations][0][city]=Las%20Vegas&s[locations][0][state]=NV&s[keywords]=Desert%20Shores" target="_blank" rel="noopener noreferrer" className="btn-gold">View All Desert Shores Villas Listings &rarr;</a>
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
                  <p>Desert Shores Villas is a lakefront · condos community within Desert Shores in Las Vegas, Nevada (ZIP 89128), spanning ~40 acres, with ~600 homes, where home prices range from $200K–$450K. Desert Shores Villas is a collection of lakefront and lake-adjacent condominium and townhome communities within the larger Desert Shores development in northwest Las Vegas. Built beginning in 1988 as part of the Greenspun Corporation's Desert Shores master plan, the Villas offer an affordable entry point to one of Las Vegas' most unique residential environments — a community centered around four man-made recreational lakes totaling over 30 acres of waterfront.</p>
                  <p>The Desert Shores Villas include several distinct condo and townhome complexes positioned along or near the community's lakes. Units range from approximately $200,000 for one-bedroom condos to $450,000 for larger waterfront townhomes with lake views, private patios, and updated interiors. Many units have been renovated with modern kitchens, new flooring, and updated bathrooms, while others present opportunities for buyers who want to customize.</p>
                  <p>Desert Shores' four lakes — Lake Jacqueline, Lake Ashley, Lake Tiffany, and Lake Serena — provide a lifestyle uncommon in the Las Vegas desert. Residents enjoy kayaking, paddleboarding, fishing (catch and release), and lakeside walking trails. The community's beaches, parks, and open spaces create a resort-like atmosphere, and the Desert Shores Community Association maintains the lakes, beaches, and common areas to a high standard.</p>
                  <p>The Villas' northwest Las Vegas location provides good access to the US-95 freeway, the shopping and dining along N Rancho Drive and W Lake Mead Boulevard, and the Summerlin corridor. The community is also close to The Lakes, another established community, and the growing Centennial Hills area. For buyers seeking waterfront living at a fraction of Lake Las Vegas pricing, Desert Shores Villas delivers remarkable value.</p>
                </>
              )}
            </div>
            <div className="overview-aside">
              <div className="quick-facts">
                <h3>Desert Shores Villas At a Glance</h3>
                {displayStats.map(([label, value, cls]: any) => (
                  <div className="fact-row" key={label}>
                    <span className="fact-label">{label}</span>
                    <span className={`fact-value${cls ? ' ' + cls : ''}`}>{value}</span>
                  </div>
                ))}
              </div>
              <div className="cta-card">
                <p>Ready to explore Desert Shores Villas? Schedule a private tour of the community and the current listings that match your goals.</p>
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
            <h2>Top 7 Facts About Desert Shores Villas</h2>
          </div>
          <ol className="top-facts-list">
            <li key={0}>Desert Shores Villas spans ~40 acres in Las Vegas, Nevada (ZIP 89128).</li>
            <li key={1}>Desert Shores Villas was established in 1988 by Greenspun Corporation.</li>
            <li key={2}>Desert Shores Villas contains ~600 homes with prices ranging from $200K–$450K.</li>
            <li key={3}>Desert Shores Villas is a lakefront · condos community within Desert Shores.</li>
            <li key={4}>HOA fees in Desert Shores Villas range from $250–$450/mo per month.</li>
            <li key={5}>Top-rated schools serving Desert Shores Villas include Bilbray Elementary (5/10) and Thurman White Middle School (6/10).</li>
            <li key={6}>Desert Shores Villas is located ~20 min to the Strip via US-95 → I-15.</li>
          </ol>
        </div>
      </section>

      <section id="highlights">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Why Desert Shores Villas</span>
            <h2>What Makes Desert Shores Villas Stand Out</h2>
          </div>
          <div className="highlights-grid">
            {[
              { title: 'Lakefront Living', body: 'Four man-made recreational lakes — Jacqueline, Ashley, Tiffany, and Serena — provide waterfront living, lake views, and water activities unique in the Las Vegas desert.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22c4-4 8-7.5 8-12a8 8 0 10-16 0c0 4.5 4 8 8 12z"/><circle cx="12" cy="10" r="3"/></svg> },
              { title: 'Affordable Waterfront', body: 'Lake-view condos and townhomes from $200K — a fraction of what waterfront living costs at Lake Las Vegas or other lakefront communities nationwide.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg> },
              { title: 'Water Recreation', body: 'Kayaking, paddleboarding, fishing (catch and release), and lakeside walking on four interconnected lakes. Sandy beaches and lakeside picnic areas for residents.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M8 21l4-11 4 11"/><path d="M2 21l5-14 4 8"/><path d="M14 15l4-8 4 14"/><line x1="2" y1="21" x2="22" y2="21"/></svg> },
              { title: 'Community Beaches', body: 'Sandy beaches maintained by the Desert Shores Community Association provide a resort-like atmosphere with lounge areas, shade structures, and lake access.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
              { title: 'Low-Maintenance Living', body: 'Condo and townhome ownership with HOA-maintained exteriors, landscaping, and common areas. Ideal for busy professionals, snowbirds, and investors.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><line x1="8" y1="6" x2="8" y2="6.01"/><line x1="12" y1="6" x2="12" y2="6.01"/><line x1="16" y1="6" x2="16" y2="6.01"/><line x1="8" y1="10" x2="8" y2="10.01"/><line x1="12" y1="10" x2="12" y2="10.01"/><line x1="16" y1="10" x2="16" y2="10.01"/><line x1="8" y1="14" x2="8" y2="14.01"/><line x1="12" y1="14" x2="12" y2="14.01"/><line x1="16" y1="14" x2="16" y2="14.01"/></svg> },
              { title: 'Central NW Location', body: 'Easy US-95 access, proximity to Summerlin and Centennial Hills shopping, and minutes from Red Rock Canyon and outdoor recreation.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
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
            <h2>Parks &amp; Recreation Near Desert Shores Villas</h2>
          </div>
          <div className="parks-grid">
            {[
              { name: 'Desert Shores Community Lakes', address: '3200 N Marlin Ave, Las Vegas, NV 89128', acreage: '~30 acres (water)', amenities: ["Four recreational lakes","Sandy beaches","Kayaking & paddleboarding","Fishing (catch & release)","Lakeside walking trails"] },
              { name: 'Desert Shores Park', address: '3291 N Marlin Ave, Las Vegas, NV 89128', acreage: '~15 acres', amenities: ["Playground","Basketball courts","Picnic areas","Open turf","Lakeside seating"] },
              { name: 'The Lakes Park', address: '800 S Rampart Blvd, Las Vegas, NV 89145', acreage: '~10 acres', amenities: ["Walking trails","Picnic areas","Playground","Open space"] },
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
            <h2>The Desert Shores Villas Lifestyle</h2>
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
              <div className="lifestyle-v2-stat">~600</div>
              <div className="lifestyle-v2-label">Homes</div>
            </div>
            <div className="lifestyle-v2-item">
              <div className="lifestyle-v2-icon"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 2v10l7 4"/></svg></div>
              <div className="lifestyle-v2-stat">1988</div>
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
            <h2>HOA Information for Desert Shores Villas</h2>
          </div>
          <div className="hoa-grid">
            <div className="hoa-fees-col">
              <h3>Fees &amp; Management</h3>
              <div className="hoa-fee-row"><span>Monthly HOA Range</span><strong>$250–$450/mo</strong></div>
              <div className="hoa-fee-row"><span>Guard-Gated</span><strong>No</strong></div>
              <div className="hoa-fee-row"><span>Community Type</span><strong>Lakefront · Condos</strong></div>
              <div className="hoa-management">
                <p className="hoa-mgmt-label">Management</p>
                <p className="hoa-mgmt-value">Desert Shores Master Association + Sub-HOA</p>
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
            <h2>Schools Serving Desert Shores Villas</h2>
          </div>
          <div className="schools-v2-table">
            <div className="schools-v2-header">
              <span>School Name</span>
              <span>Grades</span>
              <span>Rating</span>
            </div>
            {[
              ['Bilbray Elementary', 'K–5', '5/10'],
              ['Thurman White Middle School', '6–8', '6/10'],
              ['Cimarron-Memorial High School', '9–12', '5/10'],
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
            <h2>What Desert Shores Villas Buyers Say</h2>
          </div>
          <div className="testimonials-grid">
            {[
              { quote: 'I couldn\'t believe I could get lakefront living in Las Vegas for under $300,000. Desert Shores Villas is a hidden gem. Nevada Real Estate Group showed me every lakefront unit on the market and helped me pick the one with the best sunset views.', name: 'Angela R.', detail: 'Bought in Desert Shores Villas · 2024' },
              { quote: 'We bought a Desert Shores Villas townhome as a rental investment and it\'s been fully occupied since day one. The lakefront lifestyle sells itself. Nevada Real Estate Group understood the rental market here perfectly.', name: 'Kevin & Lisa T.', detail: 'Investment purchase, Desert Shores Villas · 2025' },
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

      <DesertShoresVillasFAQ />

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
              { name: 'Desert Shores', href: '/desert-shores/', price: 'From $350K', compare: 'The broader Desert Shores community with single-family homes and custom lakefront estates.' },
              { name: 'The Lakes', href: '/the-lakes/', price: 'From $350K', compare: 'Adjacent lakefront community with recreational lakes and a similar waterfront lifestyle.' },
              { name: 'Canyon Gate Country Club', href: '/canyon-gate-country-club/', price: 'From $700K', compare: 'Guard-gated golf community nearby for buyers seeking a step up in price and amenities.' },
              { name: 'Peccole Ranch', href: '/peccole-ranch/', price: 'From $250K', compare: 'Nearby master-planned community with guard-gated sections and excellent schools.' },
              { name: 'Summerlin', href: '/summerlin/', price: 'From $400K', compare: 'Nevada\'s premier master-planned community minutes west with every price point.' },
              { name: 'Los Prados', href: '/los-prados/', price: 'From $300K', compare: 'Guard-gated golf community nearby for buyers who prefer golf course views over lake views.' },
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
              <h2>Ready to Find Your Desert Shores Villas Home?</h2>
              <p>Nevada Real Estate Group is the #1 real estate team in Nevada. Whether you&apos;re buying or selling in Desert Shores Villas, let&apos;s talk.</p>
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
                <input type="hidden" name="_subject" value="Desert Shores Villas Inquiry — LasVegasHomeSearchExperts.com" />
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
