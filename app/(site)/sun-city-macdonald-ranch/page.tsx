import SunCityMacdonaldRanchFAQ from '@/components/SunCityMacdonaldRanchFAQ'
import Link from 'next/link'
import type { Metadata } from 'next'
import SunCityMacdonaldRanchMapWrapper from '@/components/SunCityMacdonaldRanchMapWrapper'
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
    { '@type': 'ListItem', position: 3, name: 'Sun City MacDonald Ranch', item: 'https://www.lasvegashomesearchexperts.com/sun-city-macdonald-ranch/' },
  ],
}

const FAQ_DATA = [
  {
    "q": "What is the age requirement for Sun City MacDonald Ranch?",
    "a": "Sun City MacDonald Ranch is a 55+ community. At least one resident in each household must be 55 years of age or older."
  },
  {
    "q": "Does Sun City MacDonald Ranch have a golf course?",
    "a": "Yes. The community has its own private 18-hole championship golf course exclusively for residents. The course features mountain views and is walking distance from most homes."
  },
  {
    "q": "What is the price range for homes in Sun City MacDonald Ranch?",
    "a": "Homes range from approximately $300,000 for smaller floor plans to $600,000 for premium golf course or mountain-view lots."
  },
  {
    "q": "Is Sun City MacDonald Ranch guard-gated?",
    "a": "No. Sun City MacDonald Ranch is not guard-gated. The community has managed access points and an active HOA but no staffed guard gate."
  },
  {
    "q": "What are HOA fees in Sun City MacDonald Ranch?",
    "a": "HOA fees typically range from $150 to $280 per month, covering the clubhouse, golf course, pool, fitness center, common area maintenance, and the community's extensive activities program."
  },
  {
    "q": "How does Sun City MacDonald Ranch compare to Sun City Anthem?",
    "a": "Both are Del Webb 55+ communities in Henderson. Sun City Anthem is larger (7,000+ homes) with two courses and a bigger clubhouse. Sun City MacDonald Ranch is more intimate (2,900+ homes) with a foothills location that provides better views. Pricing is similar."
  },
  {
    "q": "What ZIP code is Sun City MacDonald Ranch in?",
    "a": "Sun City MacDonald Ranch is located in ZIP code 89012 in Henderson, Nevada."
  },
  {
    "q": "Who built Sun City MacDonald Ranch?",
    "a": "Sun City MacDonald Ranch was built by Del Webb, America's most recognized builder of 55+ active adult communities. Del Webb is known for quality construction, open floor plans, and resort-style community amenities."
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
  name: 'Sun City MacDonald Ranch',
  description: 'Sun City MacDonald Ranch is a 55+ · golf · active adult community in Henderson, Nevada.',
  geo: { '@type': 'GeoCoordinates', latitude: 36.03, longitude: -114.99 },
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
  const cms = await getCommunityPage('sun-city-macdonald-ranch')
  return {
    title: cms?.metaTitle ?? 'Sun City MacDonald Ranch Homes for Sale | Nevada Real Estate Group',
    description: cms?.metaDescription ?? 'Browse Sun City MacDonald Ranch homes for sale in Henderson, NV. $300K–$600K. Schools, HOA, market stats. Nevada Real Estate Group.',
    alternates: { canonical: 'https://www.lasvegashomesearchexperts.com/sun-city-macdonald-ranch' },
  }
}

export default async function SunCityMacdonaldRanchPage() {
  const cms = await getCommunityPage('sun-city-macdonald-ranch')
  const market = getMarketStats('sun-city-macdonald-ranch')
  const ms = market?.stats

  const heroHeadline = cms?.heroHeadline ?? 'Sun City MacDonald Ranch'
  const heroSubtitle = 'Homes for Sale in Henderson, Nevada'
  const overviewTitle = cms?.overviewTitle ?? 'Sun City MacDonald Ranch: 55+ · Golf · Active Adult Living in Henderson'

  const HARDCODED_STATS: Array<[string, string] | [string, string, string]> = [
    ['Established', '1996'],
    ['Developer', 'Del Webb'],
    ['Total Acreage', '1,100 acres'],
    ['Homes', '2,900+'],
    ['Median Home Price', ms?.medianSalePrice ?? '$300K–$600K'],
    ['ZIP Codes', '89012'],
    ['Guard-Gated', 'No'],
    ['HOA', '$150–$280/mo'],
  ]
  const displayStats = mergeQuickStats(HARDCODED_STATS, cms?.quickStats)
  const HARDCODED_DRIVE_TIMES = [
    {
        "time": "~20 min",
        "destination": "to the Strip",
        "route": "via I-215 W → I-15 N"
    },
    {
        "time": "~20 min",
        "destination": "to Harry Reid Airport",
        "route": "via I-215 W"
    },
    {
        "time": "~10 min",
        "destination": "to Henderson Downtown",
        "route": "via Horizon Ridge Pkwy"
    },
    {
        "time": "~35 min",
        "destination": "to Summerlin",
        "route": "via I-215 W"
    },
    {
        "time": "~25 min",
        "destination": "to Lake Mead",
        "route": "via US-93 / I-11"
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
          <span>Sun City MacDonald Ranch</span>
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
                <span className="hero-v2-stat-num">{ms?.medianSalePrice ?? qs('Median Home Price', '$300K–$600K')}</span>
                <span className="hero-v2-stat-lbl">Median Sale Price</span>
              </div>
              <div className="hero-v2-stat">
                <span className="hero-v2-stat-num">{ms?.avgDaysToClose ?? qs('Avg Days on Market', '45')}</span>
                <span className="hero-v2-stat-lbl">Avg Days to Close</span>
              </div>
            </div>
            <a href="#listings" className="hero-v2-cta">Search Homes in Sun City MacDonald Ranch</a>
          </div>
        </div>
      </header>

      <div className="hero-v2-qfb">
        <div className="container">
          <div className="hero-v2-qfb-row">
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <span><strong>ZIP:</strong> 89012</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              <span><strong>Type:</strong> 55+ · Golf · Active Adult</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
              <span><strong>Price Range:</strong> $300K–$600K</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
              <span><strong>HOA:</strong> $150–$280/mo</span>
            </div>
          </div>
          <div className="hero-v2-qfb-est">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            <span>Est. 1996</span>
          </div>
        </div>
      </div>

      <section id="demographics" className="demographics-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Demographics</span>
            <h2>Sun City MacDonald Ranch Demographics</h2>
          </div>
          <div className="demo-grid">
            {[
              ['5,000+', 'Population'],
              ['70', 'Median Age'],
              ['$75,000+', 'Avg Household Income'],
              ['2,900+', 'Total Households'],
              ['91%', 'Homeownership Rate'],
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
            <h2>Where is Sun City MacDonald Ranch?</h2>
            <p>MacDonald Ranch, Henderson &mdash; Henderson, Nevada.</p>
          </div>
          <div className="map-container">
            <SunCityMacdonaldRanchMapWrapper />
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
            <h2 className="listings-title">NEW SUN CITY MACDONALD RANCH LISTINGS</h2>
          </div>
          <div className="ylopo-wrap">
            <div className="YLOPO_searchWidget" />
            <div className="YLOPO_resultsWidget" data-search='{"propertyTypes":["house","condo","townhouse"],"minPrice":300000,"locations":[{"city":"Henderson","state":"NV"}],"limit":12,"sortBy":"listDate","sortOrder":"desc","keywords":"Sun City MacDonald Ranch","zipCodes":["89012"]}' />
          </div>
          <p className="ylopo-note">Listing data sourced from regional MLS. Information deemed reliable but not guaranteed. Updated daily.</p>
          <div className="listings-actions">
            <a href="https://search.nevadarealestategroup.net/search?s[orderBy]=sourceCreationDate%2Cdesc&s[page]=1&s[locations][0][city]=Henderson&s[locations][0][state]=NV&s[keywords]=Sun%20City%20MacDonald%20Ranch" target="_blank" rel="noopener noreferrer" className="btn-gold">View All Sun City MacDonald Ranch Listings &rarr;</a>
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
                  <p>Sun City MacDonald Ranch is a 55+ active adult community developed by Del Webb in the foothills of Henderson's MacDonald Ranch area. One of the earliest 55+ communities in the Las Vegas Valley, Sun City MacDonald Ranch has been home to active retirees since 1996, offering a resort-style lifestyle with its own golf course, expansive clubhouse, and a comprehensive activities program that keeps residents engaged year-round.</p>
                  <p>Homes in Sun City MacDonald Ranch range from approximately $300,000 for smaller floor plans to $600,000 for premium single-story homes on golf course or mountain-view lots. The community features over a dozen distinct floor plans, all single-story, ranging from approximately 1,200 to 2,600 square feet. Del Webb's signature attention to open floor plans, low-maintenance exteriors, and indoor-outdoor living is evident throughout the community.</p>
                  <p>The heart of Sun City MacDonald Ranch is its 35,000-square-foot clubhouse, one of the most impressive 55+ community centers in the Las Vegas Valley. The facility includes an 18-hole championship golf course, swimming pool, spa, fitness center, tennis and pickleball courts, bocce ball, a woodworking shop, arts and crafts studio, billiards room, and a grand ballroom for events and performances. The activities calendar rivals any resort — daily fitness classes, social clubs, hobby groups, cultural events, and organized travel keep residents active and connected.</p>
                  <p>The community's location in the MacDonald Ranch foothills provides many homes with elevated mountain and valley views that flat-terrain 55+ communities cannot offer. Henderson's medical corridor, dining, and retail are minutes away, while the natural beauty of Lake Mead and Sloan Canyon are within a 30-minute drive. For 55+ buyers seeking a proven Del Webb community with golf, resort amenities, and an established social culture, Sun City MacDonald Ranch remains one of Henderson's strongest options.</p>
                </>
              )}
            </div>
            <div className="overview-aside">
              <div className="quick-facts">
                <h3>Sun City MacDonald Ranch At a Glance</h3>
                {displayStats.map(([label, value, cls]: any) => (
                  <div className="fact-row" key={label}>
                    <span className="fact-label">{label}</span>
                    <span className={`fact-value${cls ? ' ' + cls : ''}`}>{value}</span>
                  </div>
                ))}
              </div>
              <div className="cta-card">
                <p>Ready to explore Sun City MacDonald Ranch? Schedule a private tour of the community and the current listings that match your goals.</p>
                <a href="tel:+17252399950" className="btn-gold">Call 725.239.9950</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="highlights">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Why Sun City MacDonald Ranch</span>
            <h2>What Makes Sun City MacDonald Ranch Stand Out</h2>
          </div>
          <div className="highlights-grid">
            {[
              { title: '18-Hole Golf Course', body: 'A private championship golf course exclusively for Sun City MacDonald Ranch residents. Walking distance from most homes with mountain views from nearly every hole.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 2v10l7 4"/></svg> },
              { title: '35,000 SF Clubhouse', body: 'One of the most impressive 55+ clubhouses in the Las Vegas Valley with fitness center, pool, spa, tennis, pickleball, bocce, woodworking, arts studio, billiards, and grand ballroom.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><line x1="8" y1="6" x2="8" y2="6.01"/><line x1="12" y1="6" x2="12" y2="6.01"/><line x1="16" y1="6" x2="16" y2="6.01"/><line x1="8" y1="10" x2="8" y2="10.01"/><line x1="12" y1="10" x2="12" y2="10.01"/><line x1="16" y1="10" x2="16" y2="10.01"/><line x1="8" y1="14" x2="8" y2="14.01"/><line x1="12" y1="14" x2="12" y2="14.01"/><line x1="16" y1="14" x2="16" y2="14.01"/></svg> },
              { title: 'Del Webb Quality', body: 'All single-story homes built by Del Webb with open floor plans, low-maintenance exteriors, and thoughtful design for active adult living. Over a dozen floor plan options.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
              { title: 'Mountain & Valley Views', body: 'Elevated MacDonald Ranch foothills location provides many homes with panoramic views of the Las Vegas Valley and the surrounding mountain ranges.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M8 21l4-11 4 11"/><path d="M2 21l5-14 4 8"/><path d="M14 15l4-8 4 14"/><line x1="2" y1="21" x2="22" y2="21"/></svg> },
              { title: 'Active Social Culture', body: 'Daily fitness classes, 100+ social clubs and hobby groups, cultural events, and organized travel. A resort-style social calendar with something for every interest.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><line x1="8" y1="6" x2="8" y2="6.01"/><line x1="12" y1="6" x2="12" y2="6.01"/><line x1="16" y1="6" x2="16" y2="6.01"/><line x1="8" y1="10" x2="8" y2="10.01"/><line x1="12" y1="10" x2="12" y2="10.01"/><line x1="16" y1="10" x2="16" y2="10.01"/><line x1="8" y1="14" x2="8" y2="14.01"/><line x1="12" y1="14" x2="12" y2="14.01"/><line x1="16" y1="14" x2="16" y2="14.01"/></svg> },
              { title: 'Proven 25+ Year Track Record', body: 'Established since 1996 with a mature community culture, well-funded HOA, and consistent resale performance. One of the original Del Webb communities in Nevada.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg> },
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
            <h2>Parks &amp; Recreation Near Sun City MacDonald Ranch</h2>
          </div>
          <div className="parks-grid">
            {[
              { name: 'Sun City MacDonald Ranch Clubhouse', address: '2020 W Horizon Ridge Pkwy, Henderson, NV 89012', acreage: '~20 acres', amenities: ["18-hole golf course","Swimming pool","Spa","Fitness center","Tennis courts","Pickleball","Bocce ball","Arts & crafts studio","Woodworking shop","Grand ballroom"] },
              { name: 'Cornerstone Park', address: '1600 Wigwam Pkwy, Henderson, NV 89074', acreage: '~25 acres', amenities: ["Lake with fishing","Walking trails","Picnic areas","Playground","Amphitheater"] },
              { name: 'Sloan Canyon National Conservation Area', address: 'South of Henderson, NV', acreage: '48,438 acres', amenities: ["Hiking trails","Petroglyphs","Desert wildlife","Photography"] },
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
            <h2>The Sun City MacDonald Ranch Lifestyle</h2>
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
              <div className="lifestyle-v2-stat">2,900+</div>
              <div className="lifestyle-v2-label">Homes</div>
            </div>
            <div className="lifestyle-v2-item">
              <div className="lifestyle-v2-icon"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 2v10l7 4"/></svg></div>
              <div className="lifestyle-v2-stat">1996</div>
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
            <h2>HOA Information for Sun City MacDonald Ranch</h2>
          </div>
          <div className="hoa-grid">
            <div className="hoa-fees-col">
              <h3>Fees &amp; Management</h3>
              <div className="hoa-fee-row"><span>Monthly HOA Range</span><strong>$150–$280/mo</strong></div>
              <div className="hoa-fee-row"><span>Guard-Gated</span><strong>No</strong></div>
              <div className="hoa-fee-row"><span>Community Type</span><strong>55+ · Golf · Active Adult</strong></div>
              <div className="hoa-management">
                <p className="hoa-mgmt-label">Management</p>
                <p className="hoa-mgmt-value">MacDonald Ranch Master Association + Sub-HOA</p>
              </div>
              <p style={{ marginTop: '16px', fontSize: '11px', color: 'var(--text-faint)', fontStyle: 'italic' }}>HOA fees are subject to change. Verify current fees with the management company before purchase.</p>
            </div>
            <div className="hoa-amenities-col">
              <h3>What HOA Typically Covers</h3>
              <ul className="hoa-amenity-list">
                {['Common area landscaping and maintenance','Community parks and trail maintenance','Neighborhood street maintenance','Exterior architectural standards enforcement','Reserve fund contributions','Golf course common area adjacency','Recreation center and pool maintenance','Social programming and activities'].map((a: string) => <li key={a}>{a}</li>)}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="schools" className="schools-v2">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Education</span>
            <h2>Schools Serving Sun City MacDonald Ranch</h2>
          </div>
          <div className="schools-v2-table">
            <div className="schools-v2-header">
              <span>School Name</span>
              <span>Grades</span>
              <span>Rating</span>
            </div>
            {[
              ['Coronado High School', '9–12', '8/10'],
              ['Bob Miller Middle School', '6–8', '7/10'],
              ['Fay Herron Elementary', 'K–5', '7/10'],
              ['Henderson International School', 'PreK–12', 'A'],
              ['Bishop Gorman High School', '9–12', 'A+'],
              ['Pinecrest Academy of Nevada', 'PreK–12', '9/10'],
              ['Doral Academy', 'K–8', '8/10'],
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
            <h2>What Sun City MacDonald Ranch Buyers Say</h2>
          </div>
          <div className="testimonials-grid">
            {[
              { quote: 'We visited five 55+ communities before choosing Sun City MacDonald Ranch. The views from our back patio sealed it — you can see the entire valley. The clubhouse, the golf course, the social events — we\'ve never been more active in our lives.', name: 'Frank & Carol S.', detail: 'Bought in Sun City MacDonald Ranch · 2024' },
              { quote: 'Sold our Sun City MacDonald Ranch home and moved closer to family. Nevada Real Estate Group priced it right, staged it beautifully, and we had an offer in the first week. Professional from start to finish.', name: 'Eleanor P.', detail: 'Sold in Sun City MacDonald Ranch · 2025' },
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

      <SunCityMacdonaldRanchFAQ />

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
              { name: 'MacDonald Ranch', href: '/macdonald-ranch/', price: 'From $400K', compare: 'The broader MacDonald Ranch area including non-age-restricted neighborhoods.' },
              { name: 'MacDonald Highlands', href: '/macdonald-highlands/', price: 'From $800K', compare: 'Henderson\'s premier luxury community just above Sun City with DragonRidge Country Club.' },
              { name: 'Sun City Anthem', href: '/sun-city-anthem/', price: 'From $350K', compare: 'Larger Del Webb 55+ community in Anthem with two golf courses.' },
              { name: 'Solera at Anthem', href: '/solera-at-anthem/', price: 'From $350K', compare: 'Guard-gated 55+ community in Anthem. Smaller and more intimate.' },
              { name: 'Seven Hills', href: '/seven-hills/', price: 'From $500K', compare: 'Nearby Henderson community with Rio Secco golf. Not age-restricted.' },
              { name: 'Foothills at MacDonald Ranch', href: '/foothills-at-macdonald-ranch/', price: 'From $1M', compare: 'Guard-gated luxury community adjacent with golf and elevated views.' },
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
              <h2>Ready to Find Your Sun City MacDonald Ranch Home?</h2>
              <p>Nevada Real Estate Group is the #1 real estate team in Nevada. Whether you&apos;re buying or selling in Sun City MacDonald Ranch, let&apos;s talk.</p>
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
                <input type="hidden" name="_subject" value="Sun City MacDonald Ranch Inquiry — LasVegasHomeSearchExperts.com" />
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
