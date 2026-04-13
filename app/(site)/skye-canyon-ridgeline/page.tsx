import SkyeCanyonRidgelineFAQ from '@/components/SkyeCanyonRidgelineFAQ'
import Link from 'next/link'
import type { Metadata } from 'next'
import SkyeCanyonRidgelineMapWrapper from '@/components/SkyeCanyonRidgelineMapWrapper'
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
    { '@type': 'ListItem', position: 3, name: 'Ridgeline at Skye Canyon', item: 'https://www.lasvegashomesearchexperts.com/skye-canyon-ridgeline/' },
  ],
}

const FAQ_DATA = [
  {
    "q": "What is the price range for homes in Ridgeline at Skye Canyon?",
    "a": "Homes in Ridgeline range from approximately $500,000 to $800,000, depending on builder, floor plan size, lot position, and view orientation."
  },
  {
    "q": "What builders are in Ridgeline?",
    "a": "Ridgeline features homes by Toll Brothers and Taylor Morrison — two of the most respected national home builders. Floor plans range from 2,400 to 4,200 square feet."
  },
  {
    "q": "Is Ridgeline guard-gated?",
    "a": "No. Ridgeline is not guard-gated. It is a premium section within the Skye Canyon master plan with managed HOA and community amenities including the Skye Center."
  },
  {
    "q": "What is the Skye Center?",
    "a": "The Skye Center is Skye Canyon's resort-style community hub featuring a pool complex, splash pad, fitness center, event pavilion, and trailhead access. All Ridgeline residents have full access."
  },
  {
    "q": "What ZIP code is Ridgeline in?",
    "a": "Ridgeline at Skye Canyon is located in ZIP code 89166 in northwest Las Vegas."
  },
  {
    "q": "What are HOA fees in Ridgeline?",
    "a": "HOA fees range from $100 to $200 per month, covering Skye Canyon master association amenities including the Skye Center, trail system, and common area maintenance."
  },
  {
    "q": "How does Ridgeline compare to other Skye Canyon neighborhoods?",
    "a": "Ridgeline is the premium residential section of Skye Canyon with the largest lots, most upscale builders, and the most elevated positioning. It commands a price premium over standard Skye Canyon neighborhoods."
  },
  {
    "q": "Are there mountain views from Ridgeline?",
    "a": "Yes. Ridgeline occupies one of the highest positions in Skye Canyon. West-facing lots enjoy unobstructed Spring Mountain views, while east-facing lots provide Las Vegas Valley panoramas."
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
  name: 'Ridgeline at Skye Canyon',
  description: 'Ridgeline at Skye Canyon is a new construction · premium community in North Las Vegas, Nevada (ZIP 89166), established in 2019 by Toll Brothers / Taylor Morrison, spanning ~200 acres. Home prices range from $500K–$800K.',
  geo: { '@type': 'GeoCoordinates', latitude: 36.31, longitude: -115.33 },
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
  const cms = await getCommunityPage('skye-canyon-ridgeline')
  return {
    title: cms?.metaTitle ?? 'Ridgeline at Skye Canyon Homes for Sale | Nevada Real Estate Group',
    description: cms?.metaDescription ?? 'Browse Ridgeline at Skye Canyon homes for sale in North Las Vegas, NV. $500K–$800K. Schools, HOA, market stats. Nevada Real Estate Group.',
    alternates: { canonical: 'https://www.lasvegashomesearchexperts.com/skye-canyon-ridgeline' },
  }
}

export default async function SkyeCanyonRidgelinePage() {
  const cms = await getCommunityPage('skye-canyon-ridgeline')
  const market = getMarketStats('skye-canyon-ridgeline')
  const ms = market?.stats

  const heroHeadline = cms?.heroHeadline ?? 'Ridgeline at Skye Canyon'
  const heroSubtitle = 'Homes for Sale in North Las Vegas, Nevada'
  const overviewTitle = cms?.overviewTitle ?? 'Ridgeline at Skye Canyon: New Construction · Premium Living in North Las Vegas'

  const HARDCODED_STATS: Array<[string, string] | [string, string, string]> = [
    ['Established', '2019'],
    ['Developer', 'Toll Brothers / Taylor Morrison'],
    ['Total Acreage', '~200 acres'],
    ['Homes', '~800'],
    ['Median Home Price', ms?.medianSalePrice ?? '$500K–$800K'],
    ['ZIP Codes', '89166'],
    ['Guard-Gated', 'No'],
    ['HOA', '$100–$200/mo'],
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
          <span>Ridgeline at Skye Canyon</span>
        </div>
      </div>

      <header id="hero" className="summerlin-hero hero-v2">
        <img src="https://images.unsplash.com/photo-1570126618953-d437176e8c79?auto=format&fit=crop&w=1600&h=700&q=80" alt="Ridgeline at Skye Canyon community aerial view, North Las Vegas Nevada" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
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
                <span className="hero-v2-stat-num">{ms?.medianSalePrice ?? qs('Median Home Price', '$500K–$800K')}</span>
                <span className="hero-v2-stat-lbl">Median Sale Price</span>
              </div>
              <div className="hero-v2-stat">
                <span className="hero-v2-stat-num">{ms?.avgDaysToClose ?? qs('Avg Days on Market', '45')}</span>
                <span className="hero-v2-stat-lbl">Avg Days to Close</span>
              </div>
            </div>
            <a href="#listings" className="hero-v2-cta">Search Homes in Ridgeline at Skye Canyon</a>
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
              <span><strong>Type:</strong> New Construction · Premium</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
              <span><strong>Price Range:</strong> $500K–$800K</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
              <span><strong>HOA:</strong> $100–$200/mo</span>
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
            <h2>Ridgeline at Skye Canyon Demographics</h2>
          </div>
          <div className="demo-grid">
            {[
              ['~2,500', 'Population'],
              ['35', 'Median Age'],
              ['$110,000', 'Avg Household Income'],
              ['~800', 'Total Households'],
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
            <h2>Where is Ridgeline at Skye Canyon?</h2>
            <p>North Las Vegas, Nevada &mdash; North Las Vegas, Nevada.</p>
          </div>
          <div className="map-container">
            <SkyeCanyonRidgelineMapWrapper />
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
            <h2 className="listings-title">NEW RIDGELINE AT SKYE CANYON LISTINGS</h2>
          </div>
          <div className="ylopo-wrap">
            <div className="YLOPO_searchWidget" />
            <div className="YLOPO_resultsWidget" data-search='{"propertyTypes":["house","condo","townhouse"],"minPrice":500000,"locations":[{"city":"Las Vegas","state":"NV"}],"limit":12,"sortBy":"listDate","sortOrder":"desc","keywords":"Ridgeline Skye Canyon","zipCodes":["89166"]}' />
          </div>
          <p className="ylopo-note">Listing data sourced from regional MLS. Information deemed reliable but not guaranteed. Updated daily.</p>
          <div className="listings-actions">
            <a href="https://search.nevadarealestategroup.net/search?s[orderBy]=sourceCreationDate%2Cdesc&s[page]=1&s[locations][0][city]=Las%20Vegas&s[locations][0][state]=NV&s[keywords]=Ridgeline%20Skye%20Canyon" target="_blank" rel="noopener noreferrer" className="btn-gold">View All Ridgeline at Skye Canyon Listings &rarr;</a>
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
                  <p>Ridgeline at Skye Canyon is a new construction · premium community within Skye Canyon in North Las Vegas, Nevada (ZIP 89166), established in 2019, developed by Toll Brothers / Taylor Morrison, spanning ~200 acres. Ridgeline at Skye Canyon occupies one of the most elevated positions within the Skye Canyon master-planned community in northwest Las Vegas, offering premium home sites with dramatic views of the Spring Mountains and the Las Vegas Valley below. This newer section of Skye Canyon features larger lots and more upscale floor plans than the community's core neighborhoods, attracting move-up buyers who want Skye Canyon's trail-oriented lifestyle with a step up in size, finish quality, and view premium.</p>
                  <p>Homes in Ridgeline range from approximately $500,000 to $800,000, with floor plans from 2,400 to 4,200 square feet built by premier builders including Toll Brothers and Taylor Morrison. The elevated positioning provides unobstructed mountain views from west-facing home sites and valley panoramas from east-facing lots. Interior finishes include gourmet kitchens with oversized islands, covered outdoor living areas, and the energy-efficient construction that modern buyers expect.</p>
                  <p>Ridgeline residents enjoy full access to Skye Canyon's resort-style Skye Center — a community hub featuring a resort pool, splash pad, fitness center, gathering spaces, and the trailhead for the Skye Canyon trail network that connects to regional hiking and mountain biking routes in the Spring Mountain foothills. The community's event programming, from outdoor movie nights to seasonal festivals, fosters a connected neighborhood culture.</p>
                  <p>For buyers seeking the largest and most premium homes within Skye Canyon, Ridgeline delivers a compelling combination of elevation, views, builder quality, and trail-oriented lifestyle. The section's newer construction and elevated positioning make it Skye Canyon's premier residential address.</p>
                </>
              )}
            </div>
            <div className="overview-aside">
              <div className="quick-facts">
                <h3>Ridgeline at Skye Canyon At a Glance</h3>
                {displayStats.map(([label, value, cls]: any) => (
                  <div className="fact-row" key={label}>
                    <span className="fact-label">{label}</span>
                    <span className={`fact-value${cls ? ' ' + cls : ''}`}>{value}</span>
                  </div>
                ))}
              </div>
              <div className="cta-card">
                <p>Ready to explore Ridgeline at Skye Canyon? Schedule a private tour of the community and the current listings that match your goals.</p>
                <a href="tel:+17252399950" className="btn-gold">Call 725.239.9950</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="highlights">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Why Ridgeline at Skye Canyon</span>
            <h2>What Makes Ridgeline at Skye Canyon Stand Out</h2>
          </div>
          <div className="highlights-grid">
            {[
              { title: 'Elevated Positioning', body: 'One of the highest residential sections in Skye Canyon, providing unobstructed mountain views to the west and sweeping valley panoramas to the east.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M8 21l4-11 4 11"/><path d="M2 21l5-14 4 8"/><path d="M14 15l4-8 4 14"/><line x1="2" y1="21" x2="22" y2="21"/></svg> },
              { title: 'Premier Builders', body: 'Homes by Toll Brothers and Taylor Morrison with floor plans from 2,400 to 4,200 sq ft. Premium finishes, gourmet kitchens, and covered outdoor living throughout.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
              { title: 'Skye Center Access', body: 'Full access to the resort-style Skye Center with pool complex, splash pad, fitness center, event pavilion, and community programming year-round.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22c4-4 8-7.5 8-12a8 8 0 10-16 0c0 4.5 4 8 8 12z"/><circle cx="12" cy="10" r="3"/></svg> },
              { title: 'Trail Network', body: 'Connected to Skye Canyon\'s extensive trail network with hiking and mountain biking routes extending into the Spring Mountain foothills. Active outdoor lifestyle within the community.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
              { title: 'Newer Construction', body: 'Homes built from 2019 onward with the latest energy-efficient systems, smart-home technology, and contemporary open floor plans that modern buyers demand.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><line x1="8" y1="6" x2="8" y2="6.01"/><line x1="12" y1="6" x2="12" y2="6.01"/><line x1="16" y1="6" x2="16" y2="6.01"/><line x1="8" y1="10" x2="8" y2="10.01"/><line x1="12" y1="10" x2="12" y2="10.01"/><line x1="16" y1="10" x2="16" y2="10.01"/><line x1="8" y1="14" x2="8" y2="14.01"/><line x1="12" y1="14" x2="12" y2="14.01"/><line x1="16" y1="14" x2="16" y2="14.01"/></svg> },
              { title: 'Skye Canyon\'s Premium Section', body: 'The largest lots and most upscale homes within Skye Canyon. Ridgeline represents the top tier of the community\'s residential offering.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg> },
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
            <h2>Parks &amp; Recreation Near Ridgeline at Skye Canyon</h2>
          </div>
          <div className="parks-grid">
            {[
              { name: 'Skye Center', address: '10115 W Skye Canyon Park Dr, Las Vegas, NV 89166', acreage: '~15 acres', amenities: ["Resort pool","Splash pad","Fitness center","Event pavilion","Trail access"] },
              { name: 'Skye Canyon Trail System', address: 'Various trailheads throughout Skye Canyon', acreage: 'Regional trail network', amenities: ["Hiking trails","Mountain biking","Running paths","Desert scenery","Mountain views"] },
              { name: 'Floyd Lamb Park at Tule Springs', address: '9200 Tule Springs Rd, Las Vegas, NV 89131', acreage: '680 acres', amenities: ["Fishing ponds","Picnic areas","Historic ranch","Walking trails","Wildlife viewing"] },
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
            <h2>The Ridgeline at Skye Canyon Lifestyle</h2>
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
              <div className="lifestyle-v2-stat">~800</div>
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
            <h2>HOA Information for Ridgeline at Skye Canyon</h2>
          </div>
          <div className="hoa-grid">
            <div className="hoa-fees-col">
              <h3>Fees &amp; Management</h3>
              <div className="hoa-fee-row"><span>Monthly HOA Range</span><strong>$100–$200/mo</strong></div>
              <div className="hoa-fee-row"><span>Guard-Gated</span><strong>No</strong></div>
              <div className="hoa-fee-row"><span>Community Type</span><strong>New Construction · Premium</strong></div>
              <div className="hoa-management">
                <p className="hoa-mgmt-label">Management</p>
                <p className="hoa-mgmt-value">Skye Canyon Master Association + Sub-HOA</p>
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
            <h2>Schools Serving Ridgeline at Skye Canyon</h2>
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
            <h2>What Ridgeline at Skye Canyon Buyers Say</h2>
          </div>
          <div className="testimonials-grid">
            {[
              { quote: 'Nevada Real Estate Group showed us the Ridgeline section of Skye Canyon and we immediately knew it was the right move. The mountain views from our Toll Brothers home are breathtaking, and the Skye Center is a huge bonus for the kids.', name: 'Matt & Sarah W.', detail: 'Bought in Ridgeline at Skye Canyon · 2024' },
              { quote: 'We compared Ridgeline to similar-sized homes in Summerlin and saved over $150K while getting newer construction and better views. Nevada Real Estate Group\'s honest comparison of the two areas gave us confidence in our decision.', name: 'James & Laura C.', detail: 'Bought in Ridgeline at Skye Canyon · 2025' },
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

      <SkyeCanyonRidgelineFAQ />

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
              { name: 'Centennial Hills', href: '/centennial-hills/', price: 'From $400K', compare: 'Established northwest community with strong schools and comprehensive commercial infrastructure.' },
              { name: 'Providence', href: '/providence/', price: 'From $450K', compare: 'Family-friendly master plan in northwest Las Vegas with parks and community programming.' },
              { name: 'Lone Mountain', href: '/lone-mountain/', price: 'From $500K', compare: 'Semi-rural custom homes with larger lots and mountain views.' },
              { name: 'Summerlin West', href: '/summerlin-west/', price: 'From $400K', compare: 'Summerlin\'s newest section with Red Rock views and the Summerlin brand.' },
              { name: 'Skye Hills', href: '/skye-hills/', price: 'From $400K', compare: 'Adjacent community to Skye Canyon with newer construction and growing amenities.' },
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
              <h2>Ready to Find Your Ridgeline at Skye Canyon Home?</h2>
              <p>Nevada Real Estate Group is the #1 real estate team in Nevada. Whether you&apos;re buying or selling in Ridgeline at Skye Canyon, let&apos;s talk.</p>
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
                <input type="hidden" name="_subject" value="Ridgeline at Skye Canyon Inquiry — LasVegasHomeSearchExperts.com" />
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
