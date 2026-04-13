import SouthernHighlandsFAQ from '@/components/SouthernHighlandsFAQ'
import Link from 'next/link'
import type { Metadata } from 'next'
import SouthernHighlandsMapWrapper from '@/components/SouthernHighlandsMapWrapper'
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
    { '@type': 'ListItem', position: 3, name: 'Southern Highlands', item: 'https://www.lasvegashomesearchexperts.com/southern-highlands/' },
  ],
}

const FAQ_DATA = [
  {
    "q": "What is the price range for homes in Southern Highlands?",
    "a": "Southern Highlands offers an exceptional range from approximately $400,000 for non-gated family homes to over $10 million for custom estates in the guard-gated enclaves. Guard-gated homes typically start around $700K."
  },
  {
    "q": "Is Southern Highlands guard-gated?",
    "a": "Southern Highlands includes both guard-gated and non-gated sections. The guard-gated enclaves include The Estates, Tuscan Cliffs, Olympia Ridge, The Foothills, Royal Highlands, The Enclave, Vintage Canyon, and others. The broader community has non-gated sections as well. Southern Highlands features a 24-hour staffed guard gate with controlled vehicle access, security patrols, and perimeter walls."
  },
  {
    "q": "What golf course is in Southern Highlands?",
    "a": "The Southern Highlands Golf Club features an 18-hole Jack Nicklaus Signature course, consistently ranked among the best in Nevada. It is a private club with a Mediterranean clubhouse, fine dining, pools, tennis, spa, and fitness center."
  },
  {
    "q": "What ZIP codes are in Southern Highlands?",
    "a": "Southern Highlands spans ZIP codes 89141, 89139, and 89178 in southwest Las Vegas, within unincorporated Clark County."
  },
  {
    "q": "What are HOA fees in Southern Highlands?",
    "a": "HOA fees vary by section. Non-gated sections typically pay $150–$250 per month. Guard-gated enclaves range from $300 to $600+ per month, covering guard gate staffing, security, common area maintenance, and community amenities."
  },
  {
    "q": "How far is Southern Highlands from the Strip?",
    "a": "Southern Highlands is approximately 15 minutes from the Las Vegas Strip via I-15 North. Harry Reid International Airport is about 20 minutes away."
  },
  {
    "q": "What schools serve Southern Highlands?",
    "a": "Southern Highlands is served by CCSD schools including John R. Hummel Elementary (8/10) and Del E. Webb Middle School (7/10). Private options include Bishop Gorman High School (A+). Doral Academy Red Rock (9/10) is the top charter option."
  },
  {
    "q": "Who developed Southern Highlands?",
    "a": "Southern Highlands was developed by the Olympia Group beginning in 1997. The community spans approximately 2,200 acres in the southwestern foothills and has grown to include over 6,500 homes and multiple guard-gated enclaves."
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
    "a": "Most guard-gated communities include perimeter walls, security patrols, surveillance cameras at entry points, and emergency response coordination. Some communities also offer interior patrol routes and resident notification systems. Southern Highlands features a 24-hour staffed guard gate with controlled vehicle access, security patrols, and perimeter walls."
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
  name: 'Southern Highlands',
  description: 'Southern Highlands is a guard-gated · golf · master-planned community in Las Vegas, Nevada (ZIP 89141), established in 1997 by Olympia Group, spanning 2,200 acres. Home prices range from $400K–$10M+.',
  geo: { '@type': 'GeoCoordinates', latitude: 35.996, longitude: -115.244 },
  address: { '@type': 'PostalAddress', addressLocality: 'Las Vegas', addressRegion: 'NV', postalCode: '89141', addressCountry: 'US' },
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
  const cms = await getCommunityPage('southern-highlands')
  return {
    title: cms?.metaTitle ?? 'Southern Highlands Homes for Sale | Nevada Real Estate Group',
    description: cms?.metaDescription ?? 'Browse Southern Highlands homes for sale in Las Vegas, NV. $400K–$10M+. Schools, HOA, market stats. Nevada Real Estate Group.',
    alternates: { canonical: 'https://www.lasvegashomesearchexperts.com/southern-highlands' },
  }
}

export default async function SouthernHighlandsPage() {
  const cms = await getCommunityPage('southern-highlands')
  const market = getMarketStats('southern-highlands')
  const ms = market?.stats

  const heroHeadline = cms?.heroHeadline ?? 'Southern Highlands'
  const heroSubtitle = 'Homes for Sale in Las Vegas, Nevada'
  const overviewTitle = cms?.overviewTitle ?? 'Southern Highlands: Guard-Gated · Golf · Master-Planned Living in Las Vegas'

  const HARDCODED_STATS: Array<[string, string] | [string, string, string]> = [
    ['Established', '1997'],
    ['Developer', 'Olympia Group'],
    ['Total Acreage', '2,200 acres'],
    ['Homes', '6,500+'],
    ['Median Home Price', ms?.medianSalePrice ?? '$400K–$10M+'],
    ['ZIP Codes', '89141, 89139, 89178'],
    ['Guard-Gated', 'Yes'],
    ['HOA', '$150–$600/mo'],
  ]
  const displayStats = mergeQuickStats(HARDCODED_STATS, cms?.quickStats)
  const HARDCODED_DRIVE_TIMES = [
    {
        "time": "~15 min",
        "destination": "to the Strip",
        "route": "via I-15 North"
    },
    {
        "time": "~20 min",
        "destination": "to Harry Reid Airport",
        "route": "via I-15 → I-215"
    },
    {
        "time": "~25 min",
        "destination": "to Summerlin",
        "route": "via I-215 West"
    },
    {
        "time": "~10 min",
        "destination": "to Mountains Edge",
        "route": "via S Las Vegas Blvd"
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
          <span>Southern Highlands</span>
        </div>
      </div>

      <header id="hero" className="summerlin-hero hero-v2">
        <img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&h=700&q=80" alt="Southern Highlands community aerial view, Las Vegas Nevada" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
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
                <span className="hero-v2-stat-num">{ms?.medianSalePrice ?? qs('Median Home Price', '$400K–$10M+')}</span>
                <span className="hero-v2-stat-lbl">Median Sale Price</span>
              </div>
              <div className="hero-v2-stat">
                <span className="hero-v2-stat-num">{ms?.avgDaysToClose ?? qs('Avg Days on Market', '45')}</span>
                <span className="hero-v2-stat-lbl">Avg Days to Close</span>
              </div>
            </div>
            <a href="#listings" className="hero-v2-cta">Search Homes in Southern Highlands</a>
          </div>
        </div>
      </header>

      <div className="hero-v2-qfb">
        <div className="container">
          <div className="hero-v2-qfb-row">
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <span><strong>ZIP:</strong> 89141, 89139, 89178</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              <span><strong>Type:</strong> Guard-Gated · Golf · Master-Planned</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
              <span><strong>Price Range:</strong> $400K–$10M+</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
              <span><strong>HOA:</strong> $150–$600/mo</span>
            </div>
          </div>
          <div className="hero-v2-qfb-est">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            <span>Est. 1997</span>
          </div>
        </div>
      </div>

      <section id="demographics" className="demographics-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Demographics</span>
            <h2>Southern Highlands Demographics</h2>
          </div>
          <div className="demo-grid">
            {[
              ['22,000+', 'Population'],
              ['42', 'Median Age'],
              ['$120,000', 'Avg Household Income'],
              ['6,500+', 'Total Households'],
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
            <h2>Where is Southern Highlands?</h2>
            <p>Southwest Las Vegas, Nevada &mdash; Las Vegas, Nevada.</p>
          </div>
          <div className="map-container">
            <SouthernHighlandsMapWrapper />
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
            <h2 className="listings-title">NEW SOUTHERN HIGHLANDS LISTINGS</h2>
          </div>
          <div className="ylopo-wrap">
            <div className="YLOPO_searchWidget" />
            <div className="YLOPO_resultsWidget" data-search='{"propertyTypes":["house","condo","townhouse"],"minPrice":350000,"locations":[{"city":"Las Vegas","state":"NV"}],"limit":12,"sortBy":"listDate","sortOrder":"desc","keywords":"Southern Highlands","zipCodes":["89141","89139","89178"]}' />
          </div>
          <p className="ylopo-note">Listing data sourced from regional MLS. Information deemed reliable but not guaranteed. Updated daily.</p>
          <div className="listings-actions">
            <a href="https://search.nevadarealestategroup.net/search?s[orderBy]=sourceCreationDate%2Cdesc&s[page]=1&s[locations][0][city]=Las%20Vegas&s[locations][0][state]=NV&s[keywords]=Southern%20Highlands" target="_blank" rel="noopener noreferrer" className="btn-gold">View All Southern Highlands Listings &rarr;</a>
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
                  <p>Southern Highlands is a guard-gated · golf · master-planned community in Las Vegas, Nevada (ZIP 89141/89139), with 6,500+ homes, where home prices range from $400K–$10M+. Southern Highlands is one of the most prestigious master-planned communities in Las Vegas, combining guard-gated luxury living with a Jack Nicklaus Signature championship golf course in the scenic southwestern foothills. Spanning approximately 2,200 acres, the community was developed by the Olympia Group beginning in 1997 and has matured into one of the valley's most desirable addresses, attracting executives, professionals, entertainers, and athletes seeking privacy, views, and premier amenities.</p>
                  <p>The centerpiece of Southern Highlands is the Southern Highlands Golf Club, an 18-hole Jack Nicklaus Signature course consistently ranked among the best in Nevada. The private club includes a Mediterranean-inspired clubhouse, fine dining, resort-style pools, tennis courts, a spa and fitness center, and an active social calendar. Membership is available to residents of certain guard-gated sections, though many homes in the community do not require golf membership.</p>
                  <p>Southern Highlands offers an extraordinary range of housing. The non-gated sections feature well-built single-family homes from approximately $400,000, while the community's multiple guard-gated enclaves — including The Estates, Tuscan Cliffs, The Foothills, Royal Highlands, Olympia Ridge, and Vintage Canyon — offer custom and semi-custom homes from $700,000 to well over $10 million. The architectural standards are high throughout, with Mediterranean, Tuscan, and desert contemporary styles predominating.</p>
                  <p>The community's location at the southern rim of the Las Vegas Valley provides elevation, mountain views, and a sense of separation from the urban core while remaining just 15 minutes from the Strip and 20 minutes from Harry Reid International Airport via I-15. The Southern Highlands commercial corridor along Southern Highlands Parkway includes grocery, dining, medical, and retail, ensuring residents have everyday conveniences without leaving the community.</p>
                </>
              )}
            </div>
            <div className="overview-aside">
              <div className="quick-facts">
                <h3>Southern Highlands At a Glance</h3>
                {displayStats.map(([label, value, cls]: any) => (
                  <div className="fact-row" key={label}>
                    <span className="fact-label">{label}</span>
                    <span className={`fact-value${cls ? ' ' + cls : ''}`}>{value}</span>
                  </div>
                ))}
              </div>
              <div className="cta-card">
                <p>Ready to explore Southern Highlands? Schedule a private tour of the community and the current listings that match your goals.</p>
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
            <h2>Top 7 Facts About Southern Highlands</h2>
          </div>
          <ol className="top-facts-list">
            <li key={0}>Southern Highlands spans 2,200 acres in Las Vegas, Nevada (ZIP 89141, 89139).</li>
            <li key={1}>Southern Highlands was established in 1997 by Olympia Group.</li>
            <li key={2}>Southern Highlands contains 6,500+ homes with prices ranging from $400K–$10M+.</li>
            <li key={3}>Southern Highlands is a guard-gated community with 24-hour staffed entry and security patrols.</li>
            <li key={4}>HOA fees in Southern Highlands range from $150–$600/mo per month.</li>
            <li key={5}>Top-rated schools serving Southern Highlands include John R. Hummel Elementary (8/10) and Del E. Webb Middle School (7/10).</li>
            <li key={6}>Southern Highlands is located ~15 min to the Strip via I-15 North.</li>
          </ol>
        </div>
      </section>

      <section id="highlights">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Why Southern Highlands</span>
            <h2>What Makes Southern Highlands Stand Out</h2>
          </div>
          <div className="highlights-grid">
            {[
              { title: 'Jack Nicklaus Golf Club', body: 'Southern Highlands Golf Club features an 18-hole Jack Nicklaus Signature course consistently ranked among Nevada\'s best. Private membership with Mediterranean clubhouse, dining, and resort amenities.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 2v10l7 4"/></svg> },
              { title: 'Multiple Guard-Gated Enclaves', body: 'Over 10 distinct guard-gated neighborhoods including The Estates, Tuscan Cliffs, Olympia Ridge, The Foothills, Royal Highlands, and Vintage Canyon. Each with unique character and pricing.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
              { title: 'Mountain & Valley Views', body: 'Elevated position at the valley\'s southern rim provides panoramic views of the Spring Mountains, Red Rock Canyon, and the Las Vegas Strip skyline from many homes.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M8 21l4-11 4 11"/><path d="M2 21l5-14 4 8"/><path d="M14 15l4-8 4 14"/><line x1="2" y1="21" x2="22" y2="21"/></svg> },
              { title: '$400K to $10M+ Range', body: 'From non-gated family homes to ultra-luxury custom estates, Southern Highlands offers one of the widest price ranges of any Las Vegas master-planned community.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
              { title: 'Resort-Style Amenities', body: 'Multiple community parks, pools, fitness centers, trails, and the Southern Highlands Golf Club. Active HOA programming with social events and activities throughout the year.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><line x1="8" y1="6" x2="8" y2="6.01"/><line x1="12" y1="6" x2="12" y2="6.01"/><line x1="16" y1="6" x2="16" y2="6.01"/><line x1="8" y1="10" x2="8" y2="10.01"/><line x1="12" y1="10" x2="12" y2="10.01"/><line x1="16" y1="10" x2="16" y2="10.01"/><line x1="8" y1="14" x2="8" y2="14.01"/><line x1="12" y1="14" x2="12" y2="14.01"/><line x1="16" y1="14" x2="16" y2="14.01"/></svg> },
              { title: 'Proven Appreciation', body: 'Southern Highlands has consistently appreciated through market cycles. The guard-gated enclaves and Nicklaus golf course anchor long-term value in the southwest valley\'s premium tier.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg> },
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
            <h2>Parks &amp; Recreation Near Southern Highlands</h2>
          </div>
          <div className="parks-grid">
            {[
              { name: 'Southern Highlands Community Park', address: 'Southern Highlands Pkwy, Las Vegas, NV 89141', acreage: '~15 acres', amenities: ["Resort-style pool","Playground","Basketball courts","Walking trails","Picnic areas"] },
              { name: 'Olympia Ridge Park', address: 'Olympia Ridge Pkwy, Las Vegas, NV 89141', acreage: '~10 acres', amenities: ["Open turf","Walking paths","Playground","Shade structures","Desert landscape trails"] },
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
            <h2>The Southern Highlands Lifestyle</h2>
          </div>
          <div className="lifestyle-v2-grid">
            <div className="lifestyle-v2-item">
              <div className="lifestyle-v2-icon"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg></div>
              <div className="lifestyle-v2-stat">~15 min</div>
              <div className="lifestyle-v2-label">to the Strip</div>
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
              <div className="lifestyle-v2-stat">1997</div>
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
            <h2>HOA Information for Southern Highlands</h2>
          </div>
          <div className="hoa-grid">
            <div className="hoa-fees-col">
              <h3>Fees &amp; Management</h3>
              <div className="hoa-fee-row"><span>Monthly HOA Range</span><strong>$150–$600/mo</strong></div>
              <div className="hoa-fee-row"><span>Guard-Gated</span><strong>Yes — staffed gate</strong></div>
              <div className="hoa-fee-row"><span>Community Type</span><strong>Guard-Gated · Golf · Master-Planned</strong></div>
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
            <h2>Schools Serving Southern Highlands</h2>
          </div>
          <div className="schools-v2-table">
            <div className="schools-v2-header">
              <span>School Name</span>
              <span>Grades</span>
              <span>Rating</span>
            </div>
            {[
              ['John R. Hummel Elementary', 'K–5', '8/10'],
              ['Del E. Webb Middle School', '6–8', '7/10'],
              ['Coronado High School', '9–12', '6/10'],
              ['Bishop Gorman High School', '9–12', 'A+'],
              ['Henderson International School', 'PreK–12', 'A'],
              ['Pinecrest Academy of Nevada', 'K–12', 'A'],
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
            <h2>What Southern Highlands Buyers Say</h2>
          </div>
          <div className="testimonials-grid">
            {[
              { quote: 'Nevada Real Estate Group guided us through every guard-gated enclave in Southern Highlands until we found the perfect home in Tuscan Cliffs. Their deep knowledge of the community\'s different sections saved us months of searching.', name: 'Richard & Patricia G.', detail: 'Bought in Tuscan Cliffs, Southern Highlands · 2024' },
              { quote: 'Selling our estate in The Estates required a team that understood the ultra-luxury Southern Highlands market. Nevada Real Estate Group delivered qualified buyers and a smooth closing. Outstanding professionalism.', name: 'William H.', detail: 'Sold in The Estates, Southern Highlands · 2025' },
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

      <SouthernHighlandsFAQ />

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
              { name: 'Mountains Edge', href: '/mountains-edge/', price: 'From $350K', compare: 'Adjacent master-planned community with 12,000+ homes. More attainable pricing for families.' },
              { name: 'Rhodes Ranch', href: '/rhodes-ranch/', price: 'From $350K', compare: 'Guard-gated golf community to the north. Ted Robinson course and resort amenities.' },
              { name: 'Enterprise', href: '/enterprise/', price: 'From $350K', compare: 'Growing unincorporated area surrounding Southern Highlands with diverse housing.' },
              { name: 'Summerlin', href: '/summerlin/', price: 'From $450K', compare: 'The valley\'s other premier master-planned community with 20+ villages on the west side.' },
              { name: 'MacDonald Highlands', href: '/macdonald-highlands/', price: 'From $800K', compare: 'Henderson\'s premier luxury community with DragonRidge golf. Comparable ultra-luxury tier.' },
              { name: 'Seven Hills', href: '/seven-hills/', price: 'From $500K', compare: 'Guard-gated Henderson community with Rio Secco golf and Strip views.' },
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
              <h2>Ready to Find Your Southern Highlands Home?</h2>
              <p>Nevada Real Estate Group is the #1 real estate team in Nevada. Whether you&apos;re buying or selling in Southern Highlands, let&apos;s talk.</p>
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
                <input type="hidden" name="_subject" value="Southern Highlands Inquiry — LasVegasHomeSearchExperts.com" />
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
