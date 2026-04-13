import AnthemSunCityAnthemCenterFAQ from '@/components/AnthemSunCityAnthemCenterFAQ'
import Link from 'next/link'
import type { Metadata } from 'next'
import AnthemSunCityAnthemCenterMapWrapper from '@/components/AnthemSunCityAnthemCenterMapWrapper'
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
    { '@type': 'ListItem', position: 3, name: 'Sun City Anthem Center', item: 'https://www.lasvegashomesearchexperts.com/anthem-sun-city-anthem-center/' },
  ],
}

const FAQ_DATA = [
  {
    "q": "What is the price range for homes near the Anthem Center?",
    "a": "Homes in the Anthem Center area range from approximately $400,000 for interior-lot single-story villas to $700,000 for larger estate homes on premium golf course or view lots."
  },
  {
    "q": "What is the Anthem Center?",
    "a": "The Anthem Center is Sun City Anthem's flagship 50,000-square-foot recreation facility featuring resort-style pools, a fitness center, tennis and pickleball courts, a grand ballroom, arts studios, and meeting rooms for 100+ chartered clubs and organizations."
  },
  {
    "q": "Is Sun City Anthem Center guard-gated?",
    "a": "Sun City Anthem is not guard-gated. The community has controlled access points and neighborhood watch programs, but does not have staffed guard gates."
  },
  {
    "q": "What is the minimum age to live in Sun City Anthem?",
    "a": "Sun City Anthem is a 55+ active adult community. At least one resident in each home must be 55 years of age or older. No permanent residents under 19 are permitted."
  },
  {
    "q": "What are HOA fees in Sun City Anthem Center area?",
    "a": "HOA fees typically range from $200 to $350 per month, which covers access to all three recreation centers, pools, fitness, common area maintenance, and community programming."
  },
  {
    "q": "What golf course is near the Anthem Center?",
    "a": "The Anthem Course is an 18-hole championship golf course that winds through the Sun City Anthem community. It offers preferred rates for residents and is accessible from the Anthem Center area."
  },
  {
    "q": "How many clubs and activities are available?",
    "a": "Sun City Anthem has 100+ chartered clubs and organizations covering everything from pickleball and tennis leagues to art guilds, book clubs, travel groups, card clubs, and community theater. The social calendar is one of the most active in any 55+ community nationwide."
  },
  {
    "q": "How close is the Anthem Center area to shopping?",
    "a": "The Anthem Center area is about 10 minutes from the Green Valley Ranch resort area and the Henderson shopping corridors along Eastern Avenue and St. Rose Parkway."
  },
  {
    "q": "What is the age requirement?",
    "a": "Under the Housing for Older Persons Act (HOPA), at least one resident in each household must be 55 years of age or older. Some communities apply an 80/20 rule where 80% of occupied units must have at least one resident 55+."
  },
  {
    "q": "What social activities and clubs are available?",
    "a": "Active adult communities typically offer dozens of organized clubs and activities including golf leagues, tennis groups, fitness classes, card and game groups, cultural excursions, seasonal events, and volunteer opportunities. Most have a dedicated activities director."
  },
  {
    "q": "Are grandchildren allowed to visit or stay?",
    "a": "Yes. Grandchildren and family members of any age can visit and stay temporarily. The age restriction applies to permanent residents, not guests. Each community has specific guest stay policies, typically allowing visits of 30-90 days."
  },
  {
    "q": "What recreational facilities are included?",
    "a": "Typical 55+ communities include fitness centers, swimming pools, spa facilities, tennis and pickleball courts, walking trails, and a main clubhouse with meeting rooms, a restaurant or cafe, and event spaces. Some include golf courses."
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
  name: 'Sun City Anthem Center',
  description: 'Sun City Anthem Center is a 55+ active adult · community center community in Henderson, Nevada (ZIP 89052), established in 1999 by Del Webb / Pulte Homes, spanning ~400 acres. Home prices range from $400K–$700K.',
  geo: { '@type': 'GeoCoordinates', latitude: 35.988, longitude: -115.055 },
  address: { '@type': 'PostalAddress', addressLocality: 'Henderson', addressRegion: 'NV', postalCode: '89052', addressCountry: 'US' },
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
  const cms = await getCommunityPage('anthem-sun-city-anthem-center')
  return {
    title: cms?.metaTitle ?? 'Sun City Anthem Center Homes for Sale | Nevada Real Estate Group',
    description: cms?.metaDescription ?? 'Browse Sun City Anthem Center homes for sale in Henderson, NV. $400K–$700K. Schools, HOA, market stats. Nevada Real Estate Group.',
    alternates: { canonical: 'https://www.lasvegashomesearchexperts.com/anthem-sun-city-anthem-center' },
  }
}

export default async function AnthemSunCityAnthemCenterPage() {
  const cms = await getCommunityPage('anthem-sun-city-anthem-center')
  const market = getMarketStats('anthem-sun-city-anthem-center')
  const ms = market?.stats

  const heroHeadline = cms?.heroHeadline ?? 'Sun City Anthem Center'
  const heroSubtitle = 'Homes for Sale in Henderson, Nevada'
  const overviewTitle = cms?.overviewTitle ?? 'Sun City Anthem Center: 55+ Active Adult · Community Center Living in Henderson'

  const HARDCODED_STATS: Array<[string, string] | [string, string, string]> = [
    ['Established', '1999'],
    ['Developer', 'Del Webb / Pulte Homes'],
    ['Total Acreage', '~400 acres'],
    ['Homes', '1,800+'],
    ['Median Home Price', ms?.medianSalePrice ?? '$400K–$700K'],
    ['ZIP Codes', '89052'],
    ['Guard-Gated', 'No'],
    ['HOA', '$200–$350/mo'],
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
        "time": "~10 min",
        "destination": "to Henderson Green Valley",
        "route": "via Eastern Ave"
    },
    {
        "time": "~15 min",
        "destination": "to Lake Mead",
        "route": "via Lake Mead Pkwy"
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
          <span>Sun City Anthem Center</span>
        </div>
      </div>

      <header id="hero" className="summerlin-hero hero-v2">
        <img src="https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1600&h=700&q=80" alt="Sun City Anthem Center community aerial view, Henderson Nevada" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
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
                <span className="hero-v2-stat-num">{ms?.medianSalePrice ?? qs('Median Home Price', '$400K–$700K')}</span>
                <span className="hero-v2-stat-lbl">Median Sale Price</span>
              </div>
              <div className="hero-v2-stat">
                <span className="hero-v2-stat-num">{ms?.avgDaysToClose ?? qs('Avg Days on Market', '45')}</span>
                <span className="hero-v2-stat-lbl">Avg Days to Close</span>
              </div>
            </div>
            <a href="#listings" className="hero-v2-cta">Search Homes in Sun City Anthem Center</a>
          </div>
        </div>
      </header>

      <div className="hero-v2-qfb">
        <div className="container">
          <div className="hero-v2-qfb-row">
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <span><strong>ZIP:</strong> 89052</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              <span><strong>Type:</strong> 55+ Active Adult · Community Center</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
              <span><strong>Price Range:</strong> $400K–$700K</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
              <span><strong>HOA:</strong> $200–$350/mo</span>
            </div>
          </div>
          <div className="hero-v2-qfb-est">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            <span>Est. 1999</span>
          </div>
        </div>
      </div>

      <section id="demographics" className="demographics-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Demographics</span>
            <h2>Sun City Anthem Center Demographics</h2>
          </div>
          <div className="demo-grid">
            {[
              ['~4,500', 'Population'],
              ['68', 'Median Age'],
              ['$80,000', 'Avg Household Income'],
              ['1,800+', 'Total Households'],
              ['90%', 'Homeownership Rate'],
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
            <h2>Where is Sun City Anthem Center?</h2>
            <p>Sun City Anthem, Henderson &mdash; Henderson, Nevada.</p>
          </div>
          <div className="map-container">
            <AnthemSunCityAnthemCenterMapWrapper />
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
            <h2 className="listings-title">NEW SUN CITY ANTHEM CENTER LISTINGS</h2>
          </div>
          <div className="ylopo-wrap">
            <div className="YLOPO_searchWidget" />
            <div className="YLOPO_resultsWidget" data-search='{"propertyTypes":["house","condo","townhouse"],"minPrice":350000,"locations":[{"city":"Henderson","state":"NV"}],"limit":12,"sortBy":"listDate","sortOrder":"desc","keywords":"Sun City Anthem","zipCodes":["89052"]}' />
          </div>
          <p className="ylopo-note">Listing data sourced from regional MLS. Information deemed reliable but not guaranteed. Updated daily.</p>
          <div className="listings-actions">
            <a href="https://search.nevadarealestategroup.net/search?s[orderBy]=sourceCreationDate%2Cdesc&s[page]=1&s[locations][0][city]=Henderson&s[locations][0][state]=NV&s[keywords]=Sun%20City%20Anthem" target="_blank" rel="noopener noreferrer" className="btn-gold">View All Sun City Anthem Center Listings &rarr;</a>
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
                  <p>Sun City Anthem Center is a 55+ active adult · community center community within Sun City Anthem in Henderson, Nevada (ZIP 89052), established in 1999, developed by Del Webb / Pulte Homes, spanning ~400 acres. Sun City Anthem Center is the vibrant heart of the Sun City Anthem 55+ active adult community, encompassing the neighborhoods surrounding the Anthem Center — the community's flagship recreation facility. This section of Sun City Anthem puts residents within walking distance of the 50,000-square-foot Anthem Center, which houses resort-style pools, a state-of-the-art fitness center, tennis and pickleball courts, a grand ballroom, arts studios, meeting rooms for 100+ clubs, and the social programming that makes Sun City Anthem one of the most acclaimed active adult communities in the country.</p>
                  <p>Homes in the Anthem Center area range from approximately $400,000 for well-maintained single-story villas to $700,000 for larger estate-style homes on premium lots with golf course or mountain views. Virtually every home is single-story, consistent with the Del Webb 55+ design philosophy, with floor plans ranging from 1,400 to 3,200 square feet. The most sought-after properties are those within a short walk of the Anthem Center, where proximity to pools, fitness, dining, and social activities defines daily life.</p>
                  <p>The Anthem Center section also benefits from proximity to the Anthem Course, an 18-hole championship golf course that winds through the community's neighborhoods. Homes with golf course views and frontage command a premium and are among the most desirable properties in the entire Sun City Anthem community. The course offers preferred rates for residents and is the backdrop for many of the community's social events.</p>
                  <p>Sun City Anthem Center residents enjoy all the advantages of Henderson living — consistently ranked among the safest large cities in America, excellent healthcare access, and proximity to shopping, dining, and entertainment. The I-215 beltway provides a direct corridor to the Strip and Harry Reid Airport in approximately 20 minutes.</p>
                </>
              )}
            </div>
            <div className="overview-aside">
              <div className="quick-facts">
                <h3>Sun City Anthem Center At a Glance</h3>
                {displayStats.map(([label, value, cls]: any) => (
                  <div className="fact-row" key={label}>
                    <span className="fact-label">{label}</span>
                    <span className={`fact-value${cls ? ' ' + cls : ''}`}>{value}</span>
                  </div>
                ))}
              </div>
              <div className="cta-card">
                <p>Ready to explore Sun City Anthem Center? Schedule a private tour of the community and the current listings that match your goals.</p>
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
            <h2>Top 7 Facts About Sun City Anthem Center</h2>
          </div>
          <ol className="top-facts-list">
            <li key={0}>Sun City Anthem Center spans ~400 acres in Henderson, Nevada (ZIP 89052).</li>
            <li key={1}>Sun City Anthem Center was established in 1999 by Del Webb / Pulte Homes.</li>
            <li key={2}>Sun City Anthem Center contains 1,800+ homes with prices ranging from $400K–$700K.</li>
            <li key={3}>Sun City Anthem Center is a 55+ active adult · community center community within Sun City Anthem.</li>
            <li key={4}>HOA fees in Sun City Anthem Center range from $200–$350/mo per month.</li>
            <li key={5}>Top-rated schools serving Sun City Anthem Center include Henderson International School (A) and Pinecrest Academy of Nevada (A).</li>
            <li key={6}>Sun City Anthem Center is located ~20 min to the Strip via I-215 → I-15.</li>
          </ol>
        </div>
      </section>

      <section id="highlights">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Why Sun City Anthem Center</span>
            <h2>What Makes Sun City Anthem Center Stand Out</h2>
          </div>
          <div className="highlights-grid">
            {[
              { title: 'Anthem Center Proximity', body: 'Walking distance to the 50,000-square-foot Anthem Center with resort pools, fitness center, tennis/pickleball courts, ballroom, arts studios, and 100+ social clubs.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><line x1="8" y1="6" x2="8" y2="6.01"/><line x1="12" y1="6" x2="12" y2="6.01"/><line x1="16" y1="6" x2="16" y2="6.01"/><line x1="8" y1="10" x2="8" y2="10.01"/><line x1="12" y1="10" x2="12" y2="10.01"/><line x1="16" y1="10" x2="16" y2="10.01"/><line x1="8" y1="14" x2="8" y2="14.01"/><line x1="12" y1="14" x2="12" y2="14.01"/><line x1="16" y1="14" x2="16" y2="14.01"/></svg> },
              { title: 'Championship Golf', body: 'Adjacent to the Anthem Course, an 18-hole championship layout winding through the community. Preferred rates for residents. Golf course frontage homes available.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 2v10l7 4"/></svg> },
              { title: 'Active Social Calendar', body: '100+ chartered clubs, organized travel groups, fitness classes, art guilds, card clubs, and community events. One of the most active social calendars in any 55+ community nationwide.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22c4-4 8-7.5 8-12a8 8 0 10-16 0c0 4.5 4 8 8 12z"/><circle cx="12" cy="10" r="3"/></svg> },
              { title: 'Single-Story Living', body: 'Virtually every home is single-story, designed for comfort, accessibility, and the active adult lifestyle. Floor plans from 1,400 to 3,200 square feet.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
              { title: 'Henderson Safety', body: 'Henderson consistently ranks among the top 10 safest large cities in America, with responsive city services and excellent healthcare access nearby.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
              { title: 'Strong Resale Value', body: 'Anthem Center-area homes command premium pricing due to their proximity to the flagship recreation facility. Consistent demand from active adult buyers nationwide.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg> },
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
            <h2>Parks &amp; Recreation Near Sun City Anthem Center</h2>
          </div>
          <div className="parks-grid">
            {[
              { name: 'Anthem Center', address: '2450 Hampton Rd, Henderson, NV 89052', acreage: '~15 acres', amenities: ["Resort-style pools","Fitness center","Tennis & pickleball courts","Grand ballroom","Arts studios","Meeting rooms"] },
              { name: 'Anthem Community Park', address: '2256 N Reunion Dr, Henderson, NV 89052', acreage: '~63 acres', amenities: ["Sports fields","Walking trails","Playground","Dog park","Picnic areas"] },
              { name: 'Sloan Canyon National Conservation Area', address: 'Near S Las Vegas Blvd, Henderson, NV', acreage: '48,438 acres', amenities: ["Petroglyph hiking","Desert trails","Wildlife viewing","Photography","Rock art"] },
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
            <h2>The Sun City Anthem Center Lifestyle</h2>
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
              <div className="lifestyle-v2-stat">1,800+</div>
              <div className="lifestyle-v2-label">Homes</div>
            </div>
            <div className="lifestyle-v2-item">
              <div className="lifestyle-v2-icon"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 2v10l7 4"/></svg></div>
              <div className="lifestyle-v2-stat">1999</div>
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
            <h2>HOA Information for Sun City Anthem Center</h2>
          </div>
          <div className="hoa-grid">
            <div className="hoa-fees-col">
              <h3>Fees &amp; Management</h3>
              <div className="hoa-fee-row"><span>Monthly HOA Range</span><strong>$200–$350/mo</strong></div>
              <div className="hoa-fee-row"><span>Guard-Gated</span><strong>No</strong></div>
              <div className="hoa-fee-row"><span>Community Type</span><strong>55+ Active Adult · Community Center</strong></div>
              <div className="hoa-management">
                <p className="hoa-mgmt-label">Management</p>
                <p className="hoa-mgmt-value">Sun City Anthem Master Association + Sub-HOA</p>
              </div>
              <p style={{ marginTop: '16px', fontSize: '11px', color: 'var(--text-faint)', fontStyle: 'italic' }}>HOA fees are subject to change. Verify current fees with the management company before purchase.</p>
            </div>
            <div className="hoa-amenities-col">
              <h3>What HOA Typically Covers</h3>
              <ul className="hoa-amenity-list">
                {['Common area landscaping and maintenance','Community parks and trail maintenance','Neighborhood street maintenance','Exterior architectural standards enforcement','Reserve fund contributions','Recreation center and pool maintenance','Social programming and activities'].map((a: string) => <li key={a}>{a}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="schools" className="schools-v2">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Education</span>
            <h2>Schools Serving Sun City Anthem Center</h2>
          </div>
          <div className="schools-v2-table">
            <div className="schools-v2-header">
              <span>School Name</span>
              <span>Grades</span>
              <span>Rating</span>
            </div>
            {[
              ['Not applicable (55+ community)', '—', '—'],
              ['Henderson International School', 'PreK–12', 'A'],
              ['Pinecrest Academy of Nevada', 'K–12', 'A'],
              ['Somerset Academy Losee', 'K–8', '8/10'],
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
            <h2>What Sun City Anthem Center Buyers Say</h2>
          </div>
          <div className="testimonials-grid">
            {[
              { quote: 'We wanted to be walking distance to the Anthem Center so we could use the pools and fitness center every day. Nevada Real Estate Group found us the perfect home two blocks from the center. Best move we\'ve ever made.', name: 'Robert & Joan F.', detail: 'Bought near Anthem Center, Sun City Anthem · 2024' },
              { quote: 'Nevada Real Estate Group understood what matters to active adults — proximity to the center, single-story living, and a strong community. They helped us sell our California home and transition seamlessly to Sun City Anthem.', name: 'Carol M.', detail: 'Bought in Sun City Anthem · 2025' },
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

      <AnthemSunCityAnthemCenterFAQ />

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
              { name: 'Sun City Anthem', href: '/sun-city-anthem/', price: 'From $350K', compare: 'The broader 55+ community encompassing 7,200+ homes with three recreation centers and two golf courses.' },
              { name: 'Anthem', href: '/anthem/', price: 'From $400K', compare: 'Henderson\'s largest master-planned community adjacent to Sun City Anthem with all-ages neighborhoods.' },
              { name: 'Seven Hills', href: '/seven-hills/', price: 'From $500K', compare: 'Guard-gated Henderson community with Rio Secco golf and panoramic Strip views.' },
              { name: 'Solera at Anthem', href: '/solera-at-anthem/', price: 'From $300K', compare: 'Smaller 55+ guard-gated community in the Anthem area with a more intimate setting.' },
              { name: 'Inspirada', href: '/inspirada/', price: 'From $420K', compare: 'All-ages master-planned community in southern Henderson with award-winning design.' },
              { name: 'MacDonald Highlands', href: '/macdonald-highlands/', price: 'From $800K', compare: 'Henderson\'s premier luxury community with DragonRidge Country Club.' },
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
              <h2>Ready to Find Your Sun City Anthem Center Home?</h2>
              <p>Nevada Real Estate Group is the #1 real estate team in Nevada. Whether you&apos;re buying or selling in Sun City Anthem Center, let&apos;s talk.</p>
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
                <input type="hidden" name="_subject" value="Sun City Anthem Center Inquiry — LasVegasHomeSearchExperts.com" />
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
