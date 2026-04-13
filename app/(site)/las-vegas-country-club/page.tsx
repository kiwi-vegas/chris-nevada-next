import LasVegasCountryClubFAQ from '@/components/LasVegasCountryClubFAQ'
import Link from 'next/link'
import type { Metadata } from 'next'
import LasVegasCountryClubMapWrapper from '@/components/LasVegasCountryClubMapWrapper'
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
    { '@type': 'ListItem', position: 3, name: 'Las Vegas Country Club', item: 'https://www.lasvegashomesearchexperts.com/las-vegas-country-club/' },
  ],
}

const FAQ_DATA = [
  {
    "q": "What is the price range at Las Vegas Country Club?",
    "a": "Homes range from approximately $400,000 for original-era residences to over $3 million for custom-remodeled estates on premium golf course lots."
  },
  {
    "q": "Is Las Vegas Country Club guard-gated?",
    "a": "Yes. Las Vegas Country Club is a guard-gated community with 24-hour staffed gates, security patrols, and controlled access for resident privacy."
  },
  {
    "q": "When was Las Vegas Country Club established?",
    "a": "Las Vegas Country Club was founded in 1967, making it the oldest established country club community in the Las Vegas Valley."
  },
  {
    "q": "Is the golf course private?",
    "a": "Yes. The Las Vegas Country Club golf course is a private 18-hole championship layout. Membership is available separately from homeownership and includes golf, tennis, dining, and social event access."
  },
  {
    "q": "What celebrities have lived at Las Vegas Country Club?",
    "a": "Las Vegas Country Club has been home to many Las Vegas legends and celebrities over its 50+ year history. The community's Strip proximity and guard-gated privacy have made it a preferred address for entertainers, business leaders, and professional athletes."
  },
  {
    "q": "What are HOA fees at Las Vegas Country Club?",
    "a": "HOA fees typically range from $300 to $800 per month, covering guard gate staffing, security patrols, common area maintenance, and community infrastructure. Country club membership is a separate fee."
  },
  {
    "q": "How close is Las Vegas Country Club to the Strip?",
    "a": "Las Vegas Country Club is the closest guard-gated golf community to the Las Vegas Strip — approximately five minutes via Desert Inn Road. The Convention Center is even closer."
  },
  {
    "q": "Are the homes midcentury?",
    "a": "Many original homes date to the late 1960s and 1970s with midcentury architecture. Many have been fully remodeled with contemporary interiors while preserving the exterior character. The community offers renovation potential at every price point."
  },
  {
    "q": "How does the guard gate entry process work?",
    "a": "Residents receive transponders or access codes for automatic entry. Guests must be called in by the homeowner or added to a pre-approved list. Delivery drivers and service providers follow the community's vendor access policy. Most guard-gated communities staff the gate 24 hours a day, 7 days a week."
  },
  {
    "q": "Can non-residents access the community for viewings?",
    "a": "Yes. Prospective buyers can access the community with a licensed real estate agent who coordinates entry with the guard gate in advance. Nevada Real Estate Group handles all gate access arrangements for property showings."
  },
  {
    "q": "What security features are included beyond the guard gate?",
    "a": "Most guard-gated communities include perimeter walls, security patrols, surveillance cameras at entry points, and emergency response coordination. Some communities also offer interior patrol routes and resident notification systems."
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
  name: 'Las Vegas Country Club',
  description: 'Las Vegas Country Club is a guard-gated · golf · established community in Las Vegas, Nevada (ZIP 89109), established in 1967 by Irwin Molasky / Pardee Homes, spanning ~800 acres. Home prices range from $400K–$3M+.',
  geo: { '@type': 'GeoCoordinates', latitude: 36.115, longitude: -115.143 },
  address: { '@type': 'PostalAddress', addressLocality: 'Las Vegas', addressRegion: 'NV', postalCode: '89109', addressCountry: 'US' },
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
  const cms = await getCommunityPage('las-vegas-country-club')
  return {
    title: cms?.metaTitle ?? 'Las Vegas Country Club Homes for Sale | Nevada Real Estate Group',
    description: cms?.metaDescription ?? 'Browse Las Vegas Country Club homes for sale in Las Vegas, NV. $400K–$3M+. Schools, HOA, market stats. Nevada Real Estate Group.',
    alternates: { canonical: 'https://www.lasvegashomesearchexperts.com/las-vegas-country-club' },
  }
}

export default async function LasVegasCountryClubPage() {
  const cms = await getCommunityPage('las-vegas-country-club')
  const market = getMarketStats('las-vegas-country-club')
  const ms = market?.stats

  const heroHeadline = cms?.heroHeadline ?? 'Las Vegas Country Club'
  const heroSubtitle = 'Homes for Sale in Las Vegas, Nevada'
  const overviewTitle = cms?.overviewTitle ?? 'Las Vegas Country Club: Guard-Gated · Golf · Established Living in Las Vegas'

  const HARDCODED_STATS: Array<[string, string] | [string, string, string]> = [
    ['Established', '1967'],
    ['Developer', 'Irwin Molasky / Pardee Homes'],
    ['Total Acreage', '~800 acres'],
    ['Homes', '1,400+'],
    ['Median Home Price', ms?.medianSalePrice ?? '$400K–$3M+'],
    ['ZIP Codes', '89109, 89169'],
    ['Guard-Gated', 'Yes'],
    ['HOA', '$300–$800/mo'],
  ]
  const displayStats = mergeQuickStats(HARDCODED_STATS, cms?.quickStats)
  const HARDCODED_DRIVE_TIMES = [
    {
        "time": "~5 min",
        "destination": "to the Strip",
        "route": "via Desert Inn Rd"
    },
    {
        "time": "~10 min",
        "destination": "to Harry Reid Airport",
        "route": "via Paradise Rd → I-15"
    },
    {
        "time": "~3 min",
        "destination": "to Convention Center",
        "route": "via Desert Inn Rd"
    },
    {
        "time": "~20 min",
        "destination": "to Summerlin",
        "route": "via I-15 → Summerlin Pkwy"
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
          <span>Las Vegas Country Club</span>
        </div>
      </div>

      <header id="hero" className="summerlin-hero hero-v2">
        <img src="https://images.unsplash.com/photo-1581351721010-8cf859cb14a4?auto=format&fit=crop&w=1600&h=700&q=80" alt="Las Vegas Country Club community aerial view, Las Vegas Nevada" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
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
                <span className="hero-v2-stat-num">{ms?.medianSalePrice ?? qs('Median Home Price', '$400K–$3M+')}</span>
                <span className="hero-v2-stat-lbl">Median Sale Price</span>
              </div>
              <div className="hero-v2-stat">
                <span className="hero-v2-stat-num">{ms?.avgDaysToClose ?? qs('Avg Days on Market', '45')}</span>
                <span className="hero-v2-stat-lbl">Avg Days to Close</span>
              </div>
            </div>
            <a href="#listings" className="hero-v2-cta">Search Homes in Las Vegas Country Club</a>
          </div>
        </div>
      </header>

      <div className="hero-v2-qfb">
        <div className="container">
          <div className="hero-v2-qfb-row">
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <span><strong>ZIP:</strong> 89109, 89169</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              <span><strong>Type:</strong> Guard-Gated · Golf · Established</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
              <span><strong>Price Range:</strong> $400K–$3M+</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
              <span><strong>HOA:</strong> $300–$800/mo</span>
            </div>
          </div>
          <div className="hero-v2-qfb-est">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            <span>Est. 1967</span>
          </div>
        </div>
      </div>

      <section id="demographics" className="demographics-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Demographics</span>
            <h2>Las Vegas Country Club Demographics</h2>
          </div>
          <div className="demo-grid">
            {[
              ['~3,000', 'Population'],
              ['55', 'Median Age'],
              ['$200,000+', 'Avg Household Income'],
              ['1,400+', 'Total Households'],
              ['80%', 'Homeownership Rate'],
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
            <h2>Where is Las Vegas Country Club?</h2>
            <p>Las Vegas, Nevada &mdash; Las Vegas, Nevada.</p>
          </div>
          <div className="map-container">
            <LasVegasCountryClubMapWrapper />
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
            <h2 className="listings-title">NEW LAS VEGAS COUNTRY CLUB LISTINGS</h2>
          </div>
          <div className="ylopo-wrap">
            <div className="YLOPO_searchWidget" />
            <div className="YLOPO_resultsWidget" data-search='{"propertyTypes":["house","condo","townhouse"],"minPrice":400000,"locations":[{"city":"Las Vegas","state":"NV"}],"limit":12,"sortBy":"listDate","sortOrder":"desc","keywords":"Las Vegas Country Club","zipCodes":["89109","89169"]}' />
          </div>
          <p className="ylopo-note">Listing data sourced from regional MLS. Information deemed reliable but not guaranteed. Updated daily.</p>
          <div className="listings-actions">
            <a href="https://search.nevadarealestategroup.net/search?s[orderBy]=sourceCreationDate%2Cdesc&s[page]=1&s[locations][0][city]=Las%20Vegas&s[locations][0][state]=NV&s[keywords]=Las%20Vegas%20Country%20Club" target="_blank" rel="noopener noreferrer" className="btn-gold">View All Las Vegas Country Club Listings &rarr;</a>
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
                  <p>Las Vegas Country Club is one of the most storied residential communities in Nevada and the oldest established country club neighborhood in the Las Vegas Valley. Founded in 1967, the community spans approximately 800 acres just east of the Las Vegas Strip and features an 18-hole championship golf course, approximately 1,400 homes, and a guard-gated perimeter that has attracted celebrities, entertainers, business leaders, and Las Vegas legends for over five decades.</p>
                  <p>The community's proximity to the Strip is distinctive by any other guard-gated golf community in the valley — the Las Vegas Strip is literally minutes away, and the midcentury character of the neighborhood creates a unique atmosphere that blends old Las Vegas charm with modern luxury living. Homes range from approximately $400,000 for original-era residences to over $3 million for custom-remodeled estates on premium golf course lots.</p>
                  <p>The Las Vegas Country Club golf course is a private 18-hole layout that winds through the community, providing golf course views and mature landscaping throughout. Club membership offers golf, tennis, dining, social events, and access to the clubhouse and pool facilities. While membership is available separately from homeownership, many residents are active club members.</p>
                  <p>What makes Las Vegas Country Club irreplaceable is its combination of Strip proximity, golf course living, guard-gated security, and historical significance. This is where Las Vegas legends from Howard Hughes to Wayne Newton to Andre Agassi have called home. For buyers who want established luxury, golf, and the most convenient location of any guard-gated community in the valley, Las Vegas Country Club is the address.</p>
                </>
              )}
            </div>
            <div className="overview-aside">
              <div className="quick-facts">
                <h3>Las Vegas Country Club At a Glance</h3>
                {displayStats.map(([label, value, cls]: any) => (
                  <div className="fact-row" key={label}>
                    <span className="fact-label">{label}</span>
                    <span className={`fact-value${cls ? ' ' + cls : ''}`}>{value}</span>
                  </div>
                ))}
              </div>
              <div className="cta-card">
                <p>Ready to explore Las Vegas Country Club? Schedule a private tour of the community and the current listings that match your goals.</p>
                <a href="tel:+17252399950" className="btn-gold">Call 725.239.9950</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="highlights">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Why Las Vegas Country Club</span>
            <h2>What Makes Las Vegas Country Club Stand Out</h2>
          </div>
          <div className="highlights-grid">
            {[
              { title: 'Founded in 1967', body: 'The oldest established country club community in the Las Vegas Valley. Over five decades of history with a roster of legendary residents.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><line x1="8" y1="6" x2="8" y2="6.01"/><line x1="12" y1="6" x2="12" y2="6.01"/><line x1="16" y1="6" x2="16" y2="6.01"/><line x1="8" y1="10" x2="8" y2="10.01"/><line x1="12" y1="10" x2="12" y2="10.01"/><line x1="16" y1="10" x2="16" y2="10.01"/><line x1="8" y1="14" x2="8" y2="14.01"/><line x1="12" y1="14" x2="12" y2="14.01"/><line x1="16" y1="14" x2="16" y2="14.01"/></svg> },
              { title: 'Private 18-Hole Golf Course', body: 'Championship 18-hole private golf course winding through the community with mature landscaping and golf course home sites throughout.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 2v10l7 4"/></svg> },
              { title: 'Strip-Adjacent Location', body: 'The closest guard-gated golf community to the Las Vegas Strip. Minutes from the Resort Corridor, Convention Center, and Harry Reid Airport.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
              { title: 'Guard-Gated Security', body: 'Guard-gated perimeter with 24-hour staffed gates, security patrols, and controlled access for resident privacy.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
              { title: 'Midcentury Character', body: 'Mature landscaping, wide streets, and midcentury architecture create a character that newer master-planned communities cannot replicate.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
              { title: 'Historic Investment Value', body: 'An irreplaceable address with proximity to the Strip that no new community can match. Land value and location support long-term appreciation.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg> },
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
            <h2>Parks &amp; Recreation Near Las Vegas Country Club</h2>
          </div>
          <div className="parks-grid">
            {[
              { name: 'Las Vegas Country Club Golf Course', address: '3000 Joe W Brown Dr, Las Vegas, NV 89109', acreage: '~150 acres', amenities: ["18-hole private golf","Pro shop","Practice facilities","Cart service"] },
              { name: 'LVCC Clubhouse & Pool', address: '3000 Joe W Brown Dr, Las Vegas, NV 89109', acreage: '~5 acres', amenities: ["Clubhouse dining","Pool","Tennis courts","Social events","Fitness"] },
              { name: 'Desert Breeze Park', address: '8275 Spring Mountain Rd, Las Vegas, NV 89147', acreage: '~20 acres', amenities: ["Sports fields","Skate park","Playground","Walking paths","Picnic areas"] },
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
            <h2>The Las Vegas Country Club Lifestyle</h2>
          </div>
          <div className="lifestyle-v2-grid">
            <div className="lifestyle-v2-item">
              <div className="lifestyle-v2-icon"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg></div>
              <div className="lifestyle-v2-stat">~5 min</div>
              <div className="lifestyle-v2-label">to the Strip</div>
            </div>
            <div className="lifestyle-v2-item">
              <div className="lifestyle-v2-icon"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22c4-4 8-7.5 8-12a8 8 0 10-16 0c0 4.5 4 8 8 12z"/><circle cx="12" cy="10" r="3"/></svg></div>
              <div className="lifestyle-v2-stat">3+</div>
              <div className="lifestyle-v2-label">Nearby Parks</div>
            </div>
            <div className="lifestyle-v2-item">
              <div className="lifestyle-v2-icon"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg></div>
              <div className="lifestyle-v2-stat">1,400+</div>
              <div className="lifestyle-v2-label">Homes</div>
            </div>
            <div className="lifestyle-v2-item">
              <div className="lifestyle-v2-icon"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 2v10l7 4"/></svg></div>
              <div className="lifestyle-v2-stat">1967</div>
              <div className="lifestyle-v2-label">Established</div>
            </div>
            <div className="lifestyle-v2-item">
              <div className="lifestyle-v2-icon"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg></div>
              <div className="lifestyle-v2-stat">Yes</div>
              <div className="lifestyle-v2-label">Guard-Gated</div>
            </div>
          </div>
        </div>
      </section>

      <section id="hoa" className="hoa-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">HOA</span>
            <h2>HOA Information for Las Vegas Country Club</h2>
          </div>
          <div className="hoa-grid">
            <div className="hoa-fees-col">
              <h3>Fees &amp; Management</h3>
              <div className="hoa-fee-row"><span>Monthly HOA Range</span><strong>$300–$800/mo</strong></div>
              <div className="hoa-fee-row"><span>Guard-Gated</span><strong>Yes — staffed gate</strong></div>
              <div className="hoa-fee-row"><span>Community Type</span><strong>Guard-Gated · Golf · Established</strong></div>
              <div className="hoa-management">
                <p className="hoa-mgmt-label">Management</p>
                <p className="hoa-mgmt-value">Community Association</p>
              </div>
              <p style={{ marginTop: '16px', fontSize: '11px', color: 'var(--text-faint)', fontStyle: 'italic' }}>HOA fees are subject to change. Verify current fees with the management company before purchase.</p>
            </div>
            <div className="hoa-amenities-col">
              <h3>What HOA Typically Covers</h3>
              <ul className="hoa-amenity-list">
                {['24-hour guard gate staffing and security patrols','Common area landscaping and maintenance','Community parks and trail maintenance','Neighborhood street maintenance','Perimeter wall and gate maintenance','Exterior architectural standards enforcement','Reserve fund contributions','Golf course common area adjacency'].map((a: string) => <li key={a}>{a}</li>)}
              </ul>
              <div className="hoa-gated-badge"><span>Guard-Gated Community</span></div>
            </div>
          </div>
        </div>
      </section>

      <section id="schools" className="schools-v2">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Education</span>
            <h2>Schools Serving Las Vegas Country Club</h2>
          </div>
          <div className="schools-v2-table">
            <div className="schools-v2-header">
              <span>School Name</span>
              <span>Grades</span>
              <span>Rating</span>
            </div>
            {[
              ['Las Vegas Academy of the Arts', '9–12', '9/10'],
              ['Mabel W. Hoggard Elementary', 'K–5', '7/10'],
              ['Valley High School', '9–12', '5/10'],
              ['Bishop Gorman High School', '9–12', 'A+'],
              ['The Meadows School', 'PreK–12', 'A+'],
              ['Las Vegas Day School', 'PreK–8', 'A'],
              ['Explore Academy', '6–12', '7/10'],
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
            <h2>What Las Vegas Country Club Buyers Say</h2>
          </div>
          <div className="testimonials-grid">
            {[
              { quote: 'There\'s only one Las Vegas Country Club. The location, the golf, the history — nothing else in the valley comes close. Nevada Real Estate Group helped us find a golf course estate that we completely renovated.', name: 'Robert & Sandra M.', detail: 'Bought at Las Vegas Country Club · 2024' },
              { quote: 'We wanted guard-gated golf within five minutes of the Strip and Las Vegas Country Club was the only answer. Nevada Real Estate Group\'s knowledge of the community\'s inventory and history was invaluable.', name: 'Thomas K.', detail: 'Bought at Las Vegas Country Club · 2025' },
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

      <LasVegasCountryClubFAQ />

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
              { name: 'Scotch 80s', href: '/scotch-80s/', price: 'From $800K', compare: 'Adjacent vintage luxury neighborhood with estates near the Strip. No golf but historic character.' },
              { name: 'Turnberry Place', href: '/turnberry-place/', price: 'From $500K', compare: 'Four-tower luxury high-rise complex nearby on Paradise Road.' },
              { name: 'Turnberry Towers', href: '/turnberry-towers/', price: 'From $400K', compare: 'Twin 45-story towers near the Convention Center with resort amenities.' },
              { name: 'Canyon Gate', href: '/canyon-gate/', price: 'From $700K', compare: 'Guard-gated golf community in west Las Vegas with Ted Robinson course.' },
              { name: 'Spanish Trail', href: '/spanish-trail/', price: 'From $400K', compare: 'Guard-gated golf community with three 9-hole courses and resort living.' },
              { name: 'Red Rock Country Club', href: '/red-rock-country-club/', price: 'From $800K', compare: 'Summerlin\'s premier guard-gated golf community with two Arnold Palmer courses.' },
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
              <h2>Ready to Find Your Las Vegas Country Club Home?</h2>
              <p>Nevada Real Estate Group is the #1 real estate team in Nevada. Whether you&apos;re buying or selling in Las Vegas Country Club, let&apos;s talk.</p>
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
                <input type="hidden" name="_subject" value="Las Vegas Country Club Inquiry — LasVegasHomeSearchExperts.com" />
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
