import GreenValleyRanchFAQ from '@/components/GreenValleyRanchFAQ'
import Link from 'next/link'
import type { Metadata } from 'next'
import GreenValleyRanchMapWrapper from '@/components/GreenValleyRanchMapWrapper'
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
    { '@type': 'ListItem', position: 3, name: 'Green Valley Ranch', item: 'https://www.lasvegashomesearchexperts.com/green-valley-ranch/' },
  ],
}

const FAQ_DATA = [
  {
    "q": "What is the price range for homes in Green Valley Ranch?",
    "a": "Homes in Green Valley Ranch range from approximately $400,000 for smaller resale homes to $900,000 for larger estate-style properties on premium lots. The community offers a well-defined mid-range that appeals to families and move-up buyers."
  },
  {
    "q": "Is Green Valley Ranch guard-gated?",
    "a": "No. Green Valley Ranch is not a guard-gated community. It is an open master-planned community with active HOA governance and the safety benefits of Henderson — one of America's safest large cities."
  },
  {
    "q": "What ZIP codes is Green Valley Ranch in?",
    "a": "Green Valley Ranch spans ZIP codes 89012, 89052, and 89074 in Henderson, Nevada."
  },
  {
    "q": "What are HOA fees in Green Valley Ranch?",
    "a": "HOA fees in Green Valley Ranch typically range from $60 to $180 per month, covering common area maintenance, community parks, landscaping, and HOA governance."
  },
  {
    "q": "What schools serve Green Valley Ranch?",
    "a": "Green Valley Ranch feeds into some of Henderson's top-rated schools including Nate Mack Elementary (8/10), Bob Miller Middle School (7/10), and Green Valley High School (7/10). Private and charter options are also available nearby."
  },
  {
    "q": "Is the Green Valley Ranch Resort part of the community?",
    "a": "Green Valley Ranch Resort Casino & Spa is located within the community and serves as a neighborhood amenity, but it is a separate commercial property — not a community amenity included in HOA fees. Residents enjoy the dining, spa, and entertainment as paying guests."
  },
  {
    "q": "When were homes in Green Valley Ranch built?",
    "a": "Green Valley Ranch was developed from the mid-1990s through the mid-2000s across multiple phases. The community features mature landscaping, tree-lined streets, and a settled character."
  },
  {
    "q": "How does Green Valley Ranch compare to Summerlin?",
    "a": "Both are premier master-planned communities. Summerlin is on the west side near Red Rock Canyon with a broader price range. Green Valley Ranch is in Henderson with a focus on family-friendly living, top schools, and central convenience. Both offer excellent quality of life at similar entry-level price points."
  },
  {
    "q": "What are the best sub-neighborhoods within Green Valley Ranch?",
    "a": "The best sub-neighborhood depends on your priorities — school zones, lot size, home age, and proximity to amenities all vary within the community. Nevada Real Estate Group agents who specialize in Green Valley Ranch can walk you through the specific blocks and streets that match your criteria."
  },
  {
    "q": "How is new construction availability in Green Valley Ranch?",
    "a": "New construction availability varies by season and builder phase. Some sections of Green Valley Ranch have active new home sales while others are fully built out with resale-only inventory. Contact Nevada Real Estate Group for the most current new construction options."
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
  name: 'Green Valley Ranch',
  description: 'Green Valley Ranch is a master-planned · established community in Henderson, Nevada (ZIP 89012), established in 1994 by American Nevada Corporation, spanning ~1,600 acres. Home prices range from $400K–$900K.',
  geo: { '@type': 'GeoCoordinates', latitude: 36.05, longitude: -115.085 },
  address: { '@type': 'PostalAddress', addressLocality: 'Henderson', addressRegion: 'NV', postalCode: '89012', addressCountry: 'US' },
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
  const cms = await getCommunityPage('green-valley-ranch')
  return {
    title: cms?.metaTitle ?? 'Green Valley Ranch Homes for Sale | Nevada Real Estate Group',
    description: cms?.metaDescription ?? 'Browse Green Valley Ranch homes for sale in Henderson, NV. $400K–$900K. Schools, HOA, market stats. Nevada Real Estate Group.',
    alternates: { canonical: 'https://www.lasvegashomesearchexperts.com/green-valley-ranch' },
  }
}

export default async function GreenValleyRanchPage() {
  const cms = await getCommunityPage('green-valley-ranch')
  const market = getMarketStats('green-valley-ranch')
  const ms = market?.stats

  const heroHeadline = cms?.heroHeadline ?? 'Green Valley Ranch'
  const heroSubtitle = 'Homes for Sale in Henderson, Nevada'
  const overviewTitle = cms?.overviewTitle ?? 'Green Valley Ranch: Master-Planned · Established Living in Henderson'

  const HARDCODED_STATS: Array<[string, string] | [string, string, string]> = [
    ['Established', '1994'],
    ['Developer', 'American Nevada Corporation'],
    ['Total Acreage', '~1,600 acres'],
    ['Homes', '6,000+'],
    ['Median Home Price', ms?.medianSalePrice ?? '$400K–$900K'],
    ['ZIP Codes', '89012, 89052, 89074'],
    ['Guard-Gated', 'No'],
    ['HOA', '$60–$180/mo'],
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
        "time": "~5 min",
        "destination": "to The District",
        "route": "via Green Valley Pkwy"
    },
    {
        "time": "~10 min",
        "destination": "to Galleria at Sunset",
        "route": "via Sunset Rd"
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
          <span>Green Valley Ranch</span>
        </div>
      </div>

      <header id="hero" className="summerlin-hero hero-v2">
        <img src="https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1600&h=700&q=80" alt="Green Valley Ranch community aerial view, Henderson Nevada" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
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
                <span className="hero-v2-stat-num">{ms?.medianSalePrice ?? qs('Median Home Price', '$400K–$900K')}</span>
                <span className="hero-v2-stat-lbl">Median Sale Price</span>
              </div>
              <div className="hero-v2-stat">
                <span className="hero-v2-stat-num">{ms?.avgDaysToClose ?? qs('Avg Days on Market', '45')}</span>
                <span className="hero-v2-stat-lbl">Avg Days to Close</span>
              </div>
            </div>
            <a href="#listings" className="hero-v2-cta">Search Homes in Green Valley Ranch</a>
          </div>
        </div>
      </header>

      <div className="hero-v2-qfb">
        <div className="container">
          <div className="hero-v2-qfb-row">
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <span><strong>ZIP:</strong> 89012, 89052, 89074</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              <span><strong>Type:</strong> Master-Planned · Established</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
              <span><strong>Price Range:</strong> $400K–$900K</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
              <span><strong>HOA:</strong> $60–$180/mo</span>
            </div>
          </div>
          <div className="hero-v2-qfb-est">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            <span>Est. 1994</span>
          </div>
        </div>
      </div>

      <section id="demographics" className="demographics-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Demographics</span>
            <h2>Green Valley Ranch Demographics</h2>
          </div>
          <div className="demo-grid">
            {[
              ['~17,000', 'Population'],
              ['42', 'Median Age'],
              ['$100,000', 'Avg Household Income'],
              ['~6,000', 'Total Households'],
              ['75%', 'Homeownership Rate'],
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
            <h2>Where is Green Valley Ranch?</h2>
            <p>Henderson, Nevada &mdash; Henderson, Nevada.</p>
          </div>
          <div className="map-container">
            <GreenValleyRanchMapWrapper />
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
            <h2 className="listings-title">NEW GREEN VALLEY RANCH LISTINGS</h2>
          </div>
          <div className="ylopo-wrap">
            <div className="YLOPO_searchWidget" />
            <div className="YLOPO_resultsWidget" data-search='{"propertyTypes":["house","condo","townhouse"],"minPrice":350000,"locations":[{"city":"Henderson","state":"NV"}],"limit":12,"sortBy":"listDate","sortOrder":"desc","keywords":"Green Valley Ranch","zipCodes":["89012","89052","89074"]}' />
          </div>
          <p className="ylopo-note">Listing data sourced from regional MLS. Information deemed reliable but not guaranteed. Updated daily.</p>
          <div className="listings-actions">
            <a href="https://search.nevadarealestategroup.net/search?s[orderBy]=sourceCreationDate%2Cdesc&s[page]=1&s[locations][0][city]=Henderson&s[locations][0][state]=NV&s[keywords]=Green%20Valley%20Ranch" target="_blank" rel="noopener noreferrer" className="btn-gold">View All Green Valley Ranch Listings &rarr;</a>
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
                  <p>Green Valley Ranch is a master-planned · established community in Henderson, Nevada (ZIP 89012/89052), established in 1994, spanning ~1,600 acres, with 6,000+ homes. Green Valley Ranch is one of the most desirable and well-established master-planned communities in the Las Vegas Valley. Developed by American Nevada Corporation beginning in the mid-1990s, the community spans approximately 1,600 acres in the heart of Henderson and has become synonymous with family-friendly living, top-rated schools, parks, and everyday convenience.</p>
                  <p>The community is anchored by Green Valley Ranch Resort Casino & Spa — a AAA Four-Diamond property that serves as a premier dining, entertainment, and relaxation destination right in the neighborhood. The District at Green Valley Ranch adds an outdoor lifestyle shopping center with boutiques, restaurants, and entertainment. Combined with multiple grocery stores, medical facilities, and professional services, Green Valley Ranch offers a complete live-work-play environment.</p>
                  <p>Homes in Green Valley Ranch range from approximately $400,000 for well-maintained resale homes with 1,500–2,000 square feet to $900,000 for larger estate-style properties on premium lots with mountain and valley views. The community features a mix of national builders including Pardee, American West, and Pulte who delivered homes across multiple phases. Mature landscaping, tree-lined streets, and well-maintained common areas give the community a polished, established character.</p>
                  <p>Green Valley Ranch's central Henderson location provides outstanding connectivity. The I-215 beltway and Green Valley Parkway are the community's primary corridors, offering 20-minute access to the Strip, Harry Reid Airport, and Summerlin. The community is served by several of Henderson's highest-rated CCSD schools, making it one of the most popular choices for families relocating to the Las Vegas area.</p>
                </>
              )}
            </div>
            <div className="overview-aside">
              <div className="quick-facts">
                <h3>Green Valley Ranch At a Glance</h3>
                {displayStats.map(([label, value, cls]: any) => (
                  <div className="fact-row" key={label}>
                    <span className="fact-label">{label}</span>
                    <span className={`fact-value${cls ? ' ' + cls : ''}`}>{value}</span>
                  </div>
                ))}
              </div>
              <div className="cta-card">
                <p>Ready to explore Green Valley Ranch? Schedule a private tour of the community and the current listings that match your goals.</p>
                <a href="tel:+17252399950" className="btn-gold">Call 725.239.9950</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="highlights">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Why Green Valley Ranch</span>
            <h2>What Makes Green Valley Ranch Stand Out</h2>
          </div>
          <div className="highlights-grid">
            {[
              { title: 'GVR Resort Casino & Spa', body: 'AAA Four-Diamond resort right in the neighborhood. Fine dining, spa, pool complex, movie theater, and entertainment — all within minutes of home.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><line x1="8" y1="6" x2="8" y2="6.01"/><line x1="12" y1="6" x2="12" y2="6.01"/><line x1="16" y1="6" x2="16" y2="6.01"/><line x1="8" y1="10" x2="8" y2="10.01"/><line x1="12" y1="10" x2="12" y2="10.01"/><line x1="16" y1="10" x2="16" y2="10.01"/><line x1="8" y1="14" x2="8" y2="14.01"/><line x1="12" y1="14" x2="12" y2="14.01"/><line x1="16" y1="14" x2="16" y2="14.01"/></svg> },
              { title: 'The District Shopping', body: 'Outdoor lifestyle shopping center with restaurants, boutiques, and entertainment. Walkable from many GVR neighborhoods and a community gathering place.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22c4-4 8-7.5 8-12a8 8 0 10-16 0c0 4.5 4 8 8 12z"/><circle cx="12" cy="10" r="3"/></svg> },
              { title: 'Top-Rated Schools', body: 'Green Valley Ranch feeds into some of Henderson\'s highest-rated CCSD schools. One of the top reasons families choose GVR over other Henderson communities.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
              { title: 'Henderson Safety', body: 'Henderson consistently ranks among the top 10 safest large cities in America. Green Valley Ranch benefits from low crime rates and responsive city services.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
              { title: 'Established & Mature', body: 'Tree-lined streets, mature landscaping, and a settled community character. Over 6,000 homes built across a 15+ year build-out with a strong sense of community.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M8 21l4-11 4 11"/><path d="M2 21l5-14 4 8"/><path d="M14 15l4-8 4 14"/><line x1="2" y1="21" x2="22" y2="21"/></svg> },
              { title: 'Excellent Connectivity', body: 'Central Henderson location with I-215 beltway access. 20 minutes to the Strip, Harry Reid Airport, and every quadrant of the valley.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg> },
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
            <h2>Parks &amp; Recreation Near Green Valley Ranch</h2>
          </div>
          <div className="parks-grid">
            {[
              { name: 'Paseo Verde Park', address: '171 S Valle Verde Dr, Henderson, NV 89012', acreage: '~30 acres', amenities: ["Recreation center","Sports fields","Pool","Tennis courts","Playground"] },
              { name: 'Discovery Park', address: '2011 Paseo Verde Pkwy, Henderson, NV 89012', acreage: '~15 acres', amenities: ["Walking trails","Playground","Picnic areas","Basketball courts","Open turf"] },
              { name: 'Cornerstone Park', address: '1600 Wigwam Pkwy, Henderson, NV 89074', acreage: '~25 acres', amenities: ["Lake with fishing","Walking trails","Playground","Picnic areas","Dog park"] },
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
            <h2>The Green Valley Ranch Lifestyle</h2>
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
              <div className="lifestyle-v2-stat">6,000+</div>
              <div className="lifestyle-v2-label">Homes</div>
            </div>
            <div className="lifestyle-v2-item">
              <div className="lifestyle-v2-icon"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 2v10l7 4"/></svg></div>
              <div className="lifestyle-v2-stat">1994</div>
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
            <h2>HOA Information for Green Valley Ranch</h2>
          </div>
          <div className="hoa-grid">
            <div className="hoa-fees-col">
              <h3>Fees &amp; Management</h3>
              <div className="hoa-fee-row"><span>Monthly HOA Range</span><strong>$60–$180/mo</strong></div>
              <div className="hoa-fee-row"><span>Guard-Gated</span><strong>No</strong></div>
              <div className="hoa-fee-row"><span>Community Type</span><strong>Master-Planned · Established</strong></div>
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
            <h2>Schools Serving Green Valley Ranch</h2>
          </div>
          <div className="schools-v2-table">
            <div className="schools-v2-header">
              <span>School Name</span>
              <span>Grades</span>
              <span>Rating</span>
            </div>
            {[
              ['Nate Mack Elementary', 'K–5', '8/10'],
              ['Bob Miller Middle School', '6–8', '7/10'],
              ['Green Valley High School', '9–12', '7/10'],
              ['Henderson International School', 'PreK–12', 'A'],
              ['Pinecrest Academy of Nevada', 'K–12', 'A'],
              ['Bishop Gorman High School', '9–12', 'A+'],
              ['Doral Academy of Nevada', 'K–8', '9/10'],
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
            <h2>What Green Valley Ranch Buyers Say</h2>
          </div>
          <div className="testimonials-grid">
            {[
              { quote: 'Green Valley Ranch was exactly what our family needed — great schools, beautiful parks, and the GVR resort right in the neighborhood. Nevada Real Estate Group helped us find a home near the top-rated elementary school and we couldn\'t be happier.', name: 'Chris & Sarah T.', detail: 'Bought in Green Valley Ranch · 2024' },
              { quote: 'We\'ve lived in Green Valley Ranch for 15 years and when it was time to sell, Nevada Real Estate Group got us top dollar. They know this community inside and out and attracted multiple offers in the first week.', name: 'Robert & Linda M.', detail: 'Sold in Green Valley Ranch · 2025' },
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

      <GreenValleyRanchFAQ />

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
              { name: 'Seven Hills', href: '/seven-hills/', price: 'From $500K', compare: 'Guard-gated Henderson community with Rio Secco golf and Strip views.' },
              { name: 'Anthem', href: '/anthem/', price: 'From $400K', compare: 'Henderson\'s largest master plan with guard-gated golf, 55+, and family neighborhoods.' },
              { name: 'Tuscany Village', href: '/tuscany-village/', price: 'From $400K', compare: 'Guard-gated golf community adjacent to Green Valley Ranch with Chimera Golf Club.' },
              { name: 'Whitney Ranch', href: '/whitney-ranch/', price: 'From $350K', compare: 'Established central Henderson community with similar convenience at lower price points.' },
              { name: 'MacDonald Highlands', href: '/macdonald-highlands/', price: 'From $800K', compare: 'Henderson\'s ultra-luxury community with DragonRidge Country Club.' },
              { name: 'Cadence', href: '/cadence/', price: 'From $350K', compare: 'Henderson\'s newest master plan with new construction and modern amenities.' },
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
              <h2>Ready to Find Your Green Valley Ranch Home?</h2>
              <p>Nevada Real Estate Group is the #1 real estate team in Nevada. Whether you&apos;re buying or selling in Green Valley Ranch, let&apos;s talk.</p>
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
                <input type="hidden" name="_subject" value="Green Valley Ranch Inquiry — LasVegasHomeSearchExperts.com" />
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
