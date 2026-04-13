import BoulderCityFAQ from '@/components/BoulderCityFAQ'
import Link from 'next/link'
import type { Metadata } from 'next'
import BoulderCityMapWrapper from '@/components/BoulderCityMapWrapper'
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
    { '@type': 'ListItem', position: 3, name: 'Boulder City', item: 'https://www.lasvegashomesearchexperts.com/boulder-city/' },
  ],
}

const FAQ_DATA = [
  {
    "q": "What is the price range for homes in Boulder City?",
    "a": "Homes in Boulder City range from approximately $400,000 for established homes in older neighborhoods to over $1 million for custom properties with mountain views or Lake Mead proximity."
  },
  {
    "q": "Is gambling legal in Boulder City?",
    "a": "No. Boulder City is the only city in Nevada where gambling is prohibited. This was established when the city was founded in 1931 and has been maintained ever since, creating a distinctly different atmosphere from the rest of the valley."
  },
  {
    "q": "Why are there so few new homes in Boulder City?",
    "a": "Boulder City maintains a controlled-growth ordinance that strictly limits new development. This preserves the small-town character and permanently constrains housing supply, which supports property values."
  },
  {
    "q": "What ZIP code is Boulder City in?",
    "a": "Boulder City is in ZIP code 89005."
  },
  {
    "q": "How close is Boulder City to Lake Mead?",
    "a": "Boulder City is approximately 10 minutes from Lake Mead Marina and the Hemenway Harbor area. Lake Mead National Recreation Area — the largest reservoir in the United States — is immediately adjacent to the city."
  },
  {
    "q": "What outdoor recreation is near Boulder City?",
    "a": "Boulder City offers world-class outdoor recreation: Lake Mead (boating, fishing, kayaking), Bootleg Canyon (mountain biking, zip lines), River Mountains Loop Trail (34-mile paved trail), Historic Railroad Trail, and the Hoover Dam."
  },
  {
    "q": "What schools serve Boulder City?",
    "a": "Boulder City has its own CCSD schools including Andrew J. Mitchell Elementary (7/10), Garrett Middle School (7/10), and Boulder City High School (7/10). The compact town means short school commutes for all families."
  },
  {
    "q": "How far is Boulder City from the Strip?",
    "a": "Boulder City is approximately 30 minutes from the Las Vegas Strip via I-11 and I-215. Harry Reid International Airport is about 35 minutes away."
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
  name: 'Boulder City',
  description: 'Boulder City is a independent city · historic community in Boulder City, Nevada.',
  geo: { '@type': 'GeoCoordinates', latitude: 35.979, longitude: -114.832 },
  address: { '@type': 'PostalAddress', addressLocality: 'Boulder City', addressRegion: 'NV', postalCode: '89005', addressCountry: 'US' },
  containedInPlace: { '@type': 'City', name: 'Boulder City' },
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
  const cms = await getCommunityPage('boulder-city')
  return {
    title: cms?.metaTitle ?? 'Boulder City Homes for Sale | Nevada Real Estate Group',
    description: cms?.metaDescription ?? 'Browse Boulder City homes for sale in Boulder City, NV. $400K–$1M+. Schools, HOA, market stats. Nevada Real Estate Group.',
    alternates: { canonical: 'https://www.lasvegashomesearchexperts.com/boulder-city' },
  }
}

export default async function BoulderCityPage() {
  const cms = await getCommunityPage('boulder-city')
  const market = getMarketStats('boulder-city')
  const ms = market?.stats

  const heroHeadline = cms?.heroHeadline ?? 'Boulder City'
  const heroSubtitle = 'Homes for Sale in Boulder City, Nevada'
  const overviewTitle = cms?.overviewTitle ?? 'Boulder City: Independent City · Historic Living in Boulder City'

  const HARDCODED_STATS: Array<[string, string] | [string, string, string]> = [
    ['Established', '1931'],
    ['Developer', 'U.S. Bureau of Reclamation (original)'],
    ['Total Acreage', '~208 sq mi'],
    ['Homes', '6,500+'],
    ['Median Home Price', ms?.medianSalePrice ?? '$400K–$1M+'],
    ['ZIP Codes', '89005'],
    ['Guard-Gated', 'No'],
    ['HOA', '$0–$150/mo'],
  ]
  const displayStats = mergeQuickStats(HARDCODED_STATS, cms?.quickStats)
  const HARDCODED_DRIVE_TIMES = [
    {
        "time": "~10 min",
        "destination": "to Hoover Dam",
        "route": "via US-93 South"
    },
    {
        "time": "~10 min",
        "destination": "to Lake Mead Marina",
        "route": "via Lakeshore Rd"
    },
    {
        "time": "~30 min",
        "destination": "to the Strip",
        "route": "via I-11 → I-215 → I-15"
    },
    {
        "time": "~35 min",
        "destination": "to Harry Reid Airport",
        "route": "via I-11 → I-215 → I-15"
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
          <span>Boulder City</span>
        </div>
      </div>

      <header id="hero" className="summerlin-hero hero-v2">
        <img src="https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=1600&h=700&q=80" alt="Boulder City community aerial view, Boulder City Nevada" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
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
                <span className="hero-v2-stat-num">{ms?.medianSalePrice ?? qs('Median Home Price', '$400K–$1M+')}</span>
                <span className="hero-v2-stat-lbl">Median Sale Price</span>
              </div>
              <div className="hero-v2-stat">
                <span className="hero-v2-stat-num">{ms?.avgDaysToClose ?? qs('Avg Days on Market', '45')}</span>
                <span className="hero-v2-stat-lbl">Avg Days to Close</span>
              </div>
            </div>
            <a href="#listings" className="hero-v2-cta">Search Homes in Boulder City</a>
          </div>
        </div>
      </header>

      <div className="hero-v2-qfb">
        <div className="container">
          <div className="hero-v2-qfb-row">
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <span><strong>ZIP:</strong> 89005</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              <span><strong>Type:</strong> Independent City · Historic</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
              <span><strong>Price Range:</strong> $400K–$1M+</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
              <span><strong>HOA:</strong> $0–$150/mo</span>
            </div>
          </div>
          <div className="hero-v2-qfb-est">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            <span>Est. 1931</span>
          </div>
        </div>
      </div>

      <section id="demographics" className="demographics-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Demographics</span>
            <h2>Boulder City Demographics</h2>
          </div>
          <div className="demo-grid">
            {[
              ['16,000', 'Population'],
              ['48', 'Median Age'],
              ['$72,000', 'Avg Household Income'],
              ['6,500+', 'Total Households'],
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
            <h2>Where is Boulder City?</h2>
            <p>Boulder City, Nevada &mdash; Boulder City, Nevada.</p>
          </div>
          <div className="map-container">
            <BoulderCityMapWrapper />
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
            <h2 className="listings-title">NEW BOULDER CITY LISTINGS</h2>
          </div>
          <div className="ylopo-wrap">
            <div className="YLOPO_searchWidget" />
            <div className="YLOPO_resultsWidget" data-search='{"propertyTypes":["house","condo","townhouse"],"minPrice":350000,"locations":[{"city":"Boulder City","state":"NV"}],"limit":12,"sortBy":"listDate","sortOrder":"desc","keywords":"Boulder City","zipCodes":["89005"]}' />
          </div>
          <p className="ylopo-note">Listing data sourced from regional MLS. Information deemed reliable but not guaranteed. Updated daily.</p>
          <div className="listings-actions">
            <a href="https://search.nevadarealestategroup.net/search?s[orderBy]=sourceCreationDate%2Cdesc&s[page]=1&s[locations][0][city]=Boulder%20City&s[locations][0][state]=NV&s[keywords]=Boulder%20City" target="_blank" rel="noopener noreferrer" className="btn-gold">View All Boulder City Listings &rarr;</a>
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
                  <p>Boulder City is one of the most unique communities in the state of Nevada and a place unlike anywhere else in the Las Vegas metro. Founded in 1931 as the government town built to house workers constructing the Hoover Dam, Boulder City remains the only city in Nevada where gambling is prohibited. This distinction — along with its small-town character, historic downtown, and proximity to Lake Mead — has made it one of the most sought-after residential enclaves in the region.</p>
                  <p>The city maintains a controlled-growth ordinance that strictly limits new development, resulting in a small-town feel that has been preserved for decades while the rest of the Las Vegas Valley exploded with suburban expansion. The population hovers around 16,000, and the compact downtown features locally owned restaurants, antique shops, art galleries, and a thriving community events calendar. The Boulder City Historic District, listed on the National Register of Historic Places, showcases the original 1930s architecture that was planned as a model community.</p>
                  <p>Homes in Boulder City range from approximately $400,000 for established homes to over $1 million for custom properties with mountain views or proximity to Lake Mead. The housing stock includes original 1930s–1940s government-built homes (many beautifully renovated), mid-century ranch homes, and newer custom construction on the city's edges. Several golf course communities, including Boulder Creek and Boulder City Municipal Golf Course, offer course-frontage living.</p>
                  <p>Boulder City's location provides easy access to some of the most spectacular outdoor recreation in the American Southwest. Lake Mead National Recreation Area — the largest reservoir in the United States — is minutes away, offering boating, fishing, kayaking, and beach activities. The Hoover Dam, River Mountains Loop Trail, Bootleg Canyon mountain biking trails, and the Historic Railroad Trail all lie within or adjacent to Boulder City. For buyers seeking a small-town lifestyle with world-class outdoor recreation and no gambling, Boulder City is the only option.</p>
                </>
              )}
            </div>
            <div className="overview-aside">
              <div className="quick-facts">
                <h3>Boulder City At a Glance</h3>
                {displayStats.map(([label, value, cls]: any) => (
                  <div className="fact-row" key={label}>
                    <span className="fact-label">{label}</span>
                    <span className={`fact-value${cls ? ' ' + cls : ''}`}>{value}</span>
                  </div>
                ))}
              </div>
              <div className="cta-card">
                <p>Ready to explore Boulder City? Schedule a private tour of the community and the current listings that match your goals.</p>
                <a href="tel:+17252399950" className="btn-gold">Call 725.239.9950</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="highlights">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Why Boulder City</span>
            <h2>What Makes Boulder City Stand Out</h2>
          </div>
          <div className="highlights-grid">
            {[
              { title: 'No Gambling', body: 'The only city in Nevada that prohibits gambling. This creates a distinctly different atmosphere — quieter, family-oriented, and focused on community rather than tourism.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
              { title: 'Controlled Growth', body: 'A city ordinance strictly limits new development, preserving the small-town character. Boulder City has maintained a population of approximately 16,000 while the rest of the valley boomed.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><line x1="8" y1="6" x2="8" y2="6.01"/><line x1="12" y1="6" x2="12" y2="6.01"/><line x1="16" y1="6" x2="16" y2="6.01"/><line x1="8" y1="10" x2="8" y2="10.01"/><line x1="12" y1="10" x2="12" y2="10.01"/><line x1="16" y1="10" x2="16" y2="10.01"/><line x1="8" y1="14" x2="8" y2="14.01"/><line x1="12" y1="14" x2="12" y2="14.01"/><line x1="16" y1="14" x2="16" y2="14.01"/></svg> },
              { title: 'Lake Mead Access', body: 'Minutes from the largest reservoir in the United States. Boating, fishing, kayaking, swimming, and beach activities at Lake Mead National Recreation Area.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22c4-4 8-7.5 8-12a8 8 0 10-16 0c0 4.5 4 8 8 12z"/><circle cx="12" cy="10" r="3"/></svg> },
              { title: 'Historic Character', body: 'Founded in 1931 for Hoover Dam workers. The Historic District is on the National Register of Historic Places. Original 1930s architecture, antique shops, and locally owned businesses.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
              { title: 'World-Class Outdoor Recreation', body: 'River Mountains Loop Trail (34 miles), Bootleg Canyon mountain biking, Historic Railroad Trail, and the Hoover Dam — all within minutes of town.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M8 21l4-11 4 11"/><path d="M2 21l5-14 4 8"/><path d="M14 15l4-8 4 14"/><line x1="2" y1="21" x2="22" y2="21"/></svg> },
              { title: 'Scarcity Premium', body: 'Controlled growth means limited inventory. Boulder City properties hold value exceptionally well because supply is permanently constrained by ordinance.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg> },
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
            <h2>Parks &amp; Recreation Near Boulder City</h2>
          </div>
          <div className="parks-grid">
            {[
              { name: 'Lake Mead National Recreation Area', address: '601 Nevada Way, Boulder City, NV 89005', acreage: '1.5 million acres', amenities: ["Boating","Fishing","Kayaking","Swimming beaches","Camping","Hiking trails"] },
              { name: 'Bootleg Canyon', address: 'Bootleg Canyon Rd, Boulder City, NV 89005', acreage: '~2,000 acres', amenities: ["Mountain biking trails","Hiking","Zip line","Panoramic overlooks","Desert wildlife viewing"] },
              { name: 'Hemenway Valley Park', address: '401 Ville Dr, Boulder City, NV 89005', acreage: '~10 acres', amenities: ["Playground","Sports fields","Picnic shelters","Bighorn sheep viewing","Walking paths"] },
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
            <h2>The Boulder City Lifestyle</h2>
          </div>
          <div className="lifestyle-v2-grid">
            <div className="lifestyle-v2-item">
              <div className="lifestyle-v2-icon"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg></div>
              <div className="lifestyle-v2-stat">~10 min</div>
              <div className="lifestyle-v2-label">to Hoover Dam</div>
            </div>
            <div className="lifestyle-v2-item">
              <div className="lifestyle-v2-icon"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22c4-4 8-7.5 8-12a8 8 0 10-16 0c0 4.5 4 8 8 12z"/><circle cx="12" cy="10" r="3"/></svg></div>
              <div className="lifestyle-v2-stat">3+</div>
              <div className="lifestyle-v2-label">Nearby Parks</div>
            </div>
            <div className="lifestyle-v2-item">
              <div className="lifestyle-v2-icon"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg></div>
              <div className="lifestyle-v2-stat">6,500+</div>
              <div className="lifestyle-v2-label">Homes</div>
            </div>
            <div className="lifestyle-v2-item">
              <div className="lifestyle-v2-icon"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 2v10l7 4"/></svg></div>
              <div className="lifestyle-v2-stat">1931</div>
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
            <h2>HOA Information for Boulder City</h2>
          </div>
          <div className="hoa-grid">
            <div className="hoa-fees-col">
              <h3>Fees &amp; Management</h3>
              <div className="hoa-fee-row"><span>Monthly HOA Range</span><strong>$0–$150/mo</strong></div>
              <div className="hoa-fee-row"><span>Guard-Gated</span><strong>No</strong></div>
              <div className="hoa-fee-row"><span>Community Type</span><strong>Independent City · Historic</strong></div>
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
            <h2>Schools Serving Boulder City</h2>
          </div>
          <div className="schools-v2-table">
            <div className="schools-v2-header">
              <span>School Name</span>
              <span>Grades</span>
              <span>Rating</span>
            </div>
            {[
              ['Andrew J. Mitchell Elementary', 'K–5', '7/10'],
              ['Garrett Middle School', '6–8', '7/10'],
              ['Boulder City High School', '9–12', '7/10'],
              ['Grace Christian Academy', 'K–8', 'B+'],
              ['Bishop Gorman High School', '9–12', 'A+'],
              ['Henderson International School', 'PreK–12', 'A'],
              ['Silver State Academy', 'K–8', '7/10'],
              ['Nevada State High School', '11–12', '8/10'],
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
            <h2>What Boulder City Buyers Say</h2>
          </div>
          <div className="testimonials-grid">
            {[
              { quote: 'Nevada Real Estate Group helped us find the small-town lifestyle we\'d been dreaming about. Boulder City is unlike anywhere else in Nevada — no casinos, no traffic, just a genuine community. They knew the town inside and out.', name: 'Thomas & Patricia A.', detail: 'Bought in Boulder City · 2024' },
              { quote: 'Selling in Boulder City requires an agent who understands the unique market dynamics — limited inventory, controlled growth, and buyers who value lifestyle over square footage. Nevada Real Estate Group delivered a perfect transaction.', name: 'Margaret H.', detail: 'Sold in Boulder City · 2025' },
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

      <BoulderCityFAQ />

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
              { name: 'Henderson', href: '/henderson/', price: 'From $350K', compare: 'The adjacent incorporated city with master-planned communities, top schools, and full urban amenities.' },
              { name: 'Lake Las Vegas', href: '/lake-las-vegas/', price: 'From $400K', compare: 'Resort-style lakefront community between Henderson and Boulder City. Golf and waterfront living.' },
              { name: 'MacDonald Highlands', href: '/macdonald-highlands/', price: 'From $800K', compare: 'Henderson\'s premier luxury community with DragonRidge golf and Strip views.' },
              { name: 'Anthem', href: '/anthem/', price: 'From $400K', compare: 'Henderson master-planned community with golf, guard-gated enclaves, and mountain views.' },
              { name: 'Seven Hills', href: '/seven-hills/', price: 'From $500K', compare: 'Guard-gated Henderson community with Rio Secco golf and Strip views.' },
              { name: 'Inspirada', href: '/inspirada/', price: 'From $420K', compare: 'Henderson\'s newest master-planned community with new construction and resort amenities.' },
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
              <h2>Ready to Find Your Boulder City Home?</h2>
              <p>Nevada Real Estate Group is the #1 real estate team in Nevada. Whether you&apos;re buying or selling in Boulder City, let&apos;s talk.</p>
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
                <input type="hidden" name="_subject" value="Boulder City Inquiry — LasVegasHomeSearchExperts.com" />
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
