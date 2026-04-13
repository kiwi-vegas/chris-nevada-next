import HendersonOldTownFAQ from '@/components/HendersonOldTownFAQ'
import Link from 'next/link'
import type { Metadata } from 'next'
import HendersonOldTownMapWrapper from '@/components/HendersonOldTownMapWrapper'
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
    { '@type': 'ListItem', position: 3, name: 'Old Town Henderson', item: 'https://www.lasvegashomesearchexperts.com/henderson-old-town/' },
  ],
}

const FAQ_DATA = [
  {
    "q": "What is the price range for homes in Old Town Henderson?",
    "a": "Homes in Old Town Henderson range from approximately $300,000 for smaller original bungalows and ranch homes to $600,000 for fully renovated properties on larger lots near the Water Street District."
  },
  {
    "q": "What is the Water Street District?",
    "a": "The Water Street District is Henderson's revitalized historic commercial corridor featuring craft breweries, locally owned restaurants, boutique shops, a farmers' market, and community event spaces. It has undergone a dramatic revitalization in recent years."
  },
  {
    "q": "Is Old Town Henderson safe?",
    "a": "Yes. Henderson consistently ranks among the top 10 safest large cities in America. Old Town Henderson benefits from the city's low crime rates, responsive police and fire services, and strong civic investment."
  },
  {
    "q": "Are there HOA fees in Old Town Henderson?",
    "a": "Most of Old Town Henderson has no HOA, which means no monthly fees and considerable flexibility for renovations, expansions, and personal expression. Monthly HOA fees in Old Town Henderson range from None–$50/mo, which typically covers common area maintenance, landscaping, and reserve fund contributions."
  },
  {
    "q": "What ZIP code is Old Town Henderson?",
    "a": "Old Town Henderson is located in ZIP code 89015 in Henderson, Nevada. Home prices range from $300K–$600K."
  },
  {
    "q": "Is Old Town Henderson walkable?",
    "a": "Yes. Old Town Henderson is one of the most walkable neighborhoods in the Las Vegas Valley. The Water Street District, Henderson civic campus, parks, and daily services are all within walking distance or a short bike ride."
  },
  {
    "q": "Is Old Town Henderson a good investment?",
    "a": "Old Town Henderson offers strong investment potential due to the Water Street District revitalization, accessible price points, no-HOA flexibility, and Henderson's strong city services and safety rankings."
  },
  {
    "q": "When were homes in Old Town Henderson built?",
    "a": "Most homes in Old Town Henderson were built between the 1940s and 1970s. The neighborhood dates to Henderson's origins as a World War II industrial town that has since grown into Nevada's second-largest city."
  },
  {
    "q": "What are the best sub-neighborhoods within Old Town Henderson?",
    "a": "The best sub-neighborhood depends on your priorities — school zones, lot size, home age, and proximity to amenities all vary within the community. Nevada Real Estate Group agents who specialize in Old Town Henderson can walk you through the specific blocks and streets that match your criteria."
  },
  {
    "q": "How is new construction availability in Old Town Henderson?",
    "a": "New construction availability varies by season and builder phase. Some sections of Old Town Henderson have active new home sales while others are fully built out with resale-only inventory. Contact Nevada Real Estate Group for the most current new construction options."
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
  name: 'Old Town Henderson',
  description: 'Old Town Henderson is a historic · walkable urban community in Henderson, Nevada (ZIP 89015), established in 1940s–1950s by City of Henderson / Various, spanning ~500 acres. Home prices range from $300K–$600K.',
  geo: { '@type': 'GeoCoordinates', latitude: 36.039, longitude: -114.981 },
  address: { '@type': 'PostalAddress', addressLocality: 'Henderson', addressRegion: 'NV', postalCode: '89015', addressCountry: 'US' },
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
  const cms = await getCommunityPage('henderson-old-town')
  return {
    title: cms?.metaTitle ?? 'Old Town Henderson Homes for Sale | Nevada Real Estate Group',
    description: cms?.metaDescription ?? 'Browse Old Town Henderson homes for sale in Henderson, NV. $300K–$600K. Schools, HOA, market stats. Nevada Real Estate Group.',
    alternates: { canonical: 'https://www.lasvegashomesearchexperts.com/henderson-old-town' },
  }
}

export default async function HendersonOldTownPage() {
  const cms = await getCommunityPage('henderson-old-town')
  const market = getMarketStats('henderson-old-town')
  const ms = market?.stats

  const heroHeadline = cms?.heroHeadline ?? 'Old Town Henderson'
  const heroSubtitle = 'Homes for Sale in Henderson, Nevada'
  const overviewTitle = cms?.overviewTitle ?? 'Old Town Henderson: Historic · Walkable Urban Living in Henderson'

  const HARDCODED_STATS: Array<[string, string] | [string, string, string]> = [
    ['Established', '1940s–1950s'],
    ['Developer', 'City of Henderson / Various'],
    ['Total Acreage', '~500 acres'],
    ['Homes', '2,000+'],
    ['Median Home Price', ms?.medianSalePrice ?? '$300K–$600K'],
    ['ZIP Codes', '89015'],
    ['Guard-Gated', 'No'],
    ['HOA', 'None–$50/mo'],
  ]
  const displayStats = mergeQuickStats(HARDCODED_STATS, cms?.quickStats)
  const HARDCODED_DRIVE_TIMES = [
    {
        "time": "~20 min",
        "destination": "to the Strip",
        "route": "via Boulder Hwy → I-515"
    },
    {
        "time": "~20 min",
        "destination": "to Harry Reid Airport",
        "route": "via I-515 → I-215"
    },
    {
        "time": "~10 min",
        "destination": "to Galleria at Sunset",
        "route": "via Sunset Rd"
    },
    {
        "time": "~15 min",
        "destination": "to Boulder City",
        "route": "via US-93/95"
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
          <span>Old Town Henderson</span>
        </div>
      </div>

      <header id="hero" className="summerlin-hero hero-v2">
        <img src="https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1600&h=700&q=80" alt="Old Town Henderson community aerial view, Henderson Nevada" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
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
            <a href="#listings" className="hero-v2-cta">Search Homes in Old Town Henderson</a>
          </div>
        </div>
      </header>

      <div className="hero-v2-qfb">
        <div className="container">
          <div className="hero-v2-qfb-row">
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <span><strong>ZIP:</strong> 89015</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              <span><strong>Type:</strong> Historic · Walkable Urban</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
              <span><strong>Price Range:</strong> $300K–$600K</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
              <span><strong>HOA:</strong> None–$50/mo</span>
            </div>
          </div>
          <div className="hero-v2-qfb-est">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            <span>Est. 1940s–1950s</span>
          </div>
        </div>
      </div>

      <section id="demographics" className="demographics-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Demographics</span>
            <h2>Old Town Henderson Demographics</h2>
          </div>
          <div className="demo-grid">
            {[
              ['~6,000', 'Population'],
              ['42', 'Median Age'],
              ['$55,000', 'Avg Household Income'],
              ['~2,200', 'Total Households'],
              ['58%', 'Homeownership Rate'],
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
            <h2>Where is Old Town Henderson?</h2>
            <p>Henderson, Nevada &mdash; Henderson, Nevada.</p>
          </div>
          <div className="map-container">
            <HendersonOldTownMapWrapper />
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
            <h2 className="listings-title">NEW OLD TOWN HENDERSON LISTINGS</h2>
          </div>
          <div className="ylopo-wrap">
            <div className="YLOPO_searchWidget" />
            <div className="YLOPO_resultsWidget" data-search='{"propertyTypes":["house","condo","townhouse"],"minPrice":250000,"locations":[{"city":"Henderson","state":"NV"}],"limit":12,"sortBy":"listDate","sortOrder":"desc","keywords":"Old Town Henderson","zipCodes":["89015"]}' />
          </div>
          <p className="ylopo-note">Listing data sourced from regional MLS. Information deemed reliable but not guaranteed. Updated daily.</p>
          <div className="listings-actions">
            <a href="https://search.nevadarealestategroup.net/search?s[orderBy]=sourceCreationDate%2Cdesc&s[page]=1&s[locations][0][city]=Henderson&s[locations][0][state]=NV&s[keywords]=Old%20Town%20Henderson" target="_blank" rel="noopener noreferrer" className="btn-gold">View All Old Town Henderson Listings &rarr;</a>
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
                  <p>Old Town Henderson is a historic · walkable urban community in Henderson, Nevada (ZIP 89015), established in 1940s–1950s, developed by City of Henderson / Various, spanning ~500 acres. Old Town Henderson is the historic heart of Nevada's second-largest city, centered around the Water Street District — the original commercial corridor that has undergone a dramatic revitalization in recent years. The neighborhood encompasses approximately 500 acres of residential streets surrounding Water Street, with homes dating from the 1940s through the 1970s that reflect Henderson's origins as a World War II industrial town that grew into one of America's safest and most livable cities.</p>
                  <p>Homes in Old Town Henderson range from approximately $300,000 for smaller original bungalows and ranch homes to $600,000 for fully renovated properties and larger lots near the Water Street District. Lot sizes are generous by modern standards, typically a quarter-acre or more, and many properties feature mature trees, detached garages, and room for expansions. The neighborhood has no HOA in most areas, giving homeowners considerable flexibility for renovations.</p>
                  <p>The Water Street District revitalization has been transformative for Old Town Henderson. The city has invested heavily in streetscape improvements, public art, event spaces, and mixed-use development along Water Street. The corridor now features craft breweries, locally owned restaurants, boutique shops, a year-round farmers' market, and community event spaces that host live music, food festivals, and cultural celebrations. The new Henderson City Hall and convention center anchor the district's eastern end.</p>
                  <p>Old Town Henderson appeals to buyers who value walkability, character, and a genuine sense of community. The neighborhood is within walking distance or a short bike ride of the Water Street District, Henderson's civic campus, and multiple parks. For investors and renovation-minded buyers, Old Town Henderson offers some of the best upside potential in the valley — an established city with a revitalizing core, no HOA restrictions, and price points well below Henderson's master-planned communities.</p>
                </>
              )}
            </div>
            <div className="overview-aside">
              <div className="quick-facts">
                <h3>Old Town Henderson At a Glance</h3>
                {displayStats.map(([label, value, cls]: any) => (
                  <div className="fact-row" key={label}>
                    <span className="fact-label">{label}</span>
                    <span className={`fact-value${cls ? ' ' + cls : ''}`}>{value}</span>
                  </div>
                ))}
              </div>
              <div className="cta-card">
                <p>Ready to explore Old Town Henderson? Schedule a private tour of the community and the current listings that match your goals.</p>
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
            <h2>Top 7 Facts About Old Town Henderson</h2>
          </div>
          <ol className="top-facts-list">
            <li key={0}>Old Town Henderson spans ~500 acres in Henderson, Nevada (ZIP 89015).</li>
            <li key={1}>Old Town Henderson was established in 1940s–1950s by City of Henderson / Various.</li>
            <li key={2}>Old Town Henderson contains 2,000+ homes with prices ranging from $300K–$600K.</li>
            <li key={3}>Old Town Henderson is a historic · walkable urban community.</li>
            <li key={4}>HOA fees in Old Town Henderson range from None–$50/mo per month.</li>
            <li key={5}>Top-rated schools serving Old Town Henderson include C.T. Sewell Elementary (6/10) and Burkholder Middle School (5/10).</li>
            <li key={6}>Old Town Henderson is located ~20 min to the Strip via Boulder Hwy → I-515.</li>
          </ol>
        </div>
      </section>

      <section id="highlights">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Why Old Town Henderson</span>
            <h2>What Makes Old Town Henderson Stand Out</h2>
          </div>
          <div className="highlights-grid">
            {[
              { title: 'Water Street District', body: 'Henderson\'s revitalized historic corridor with craft breweries, locally owned restaurants, boutique shops, farmers\' market, and community events. The walkable heart of the city.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><line x1="8" y1="6" x2="8" y2="6.01"/><line x1="12" y1="6" x2="12" y2="6.01"/><line x1="16" y1="6" x2="16" y2="6.01"/><line x1="8" y1="10" x2="8" y2="10.01"/><line x1="12" y1="10" x2="12" y2="10.01"/><line x1="16" y1="10" x2="16" y2="10.01"/><line x1="8" y1="14" x2="8" y2="14.01"/><line x1="12" y1="14" x2="12" y2="14.01"/><line x1="16" y1="14" x2="16" y2="14.01"/></svg> },
              { title: 'Historic Character', body: 'Homes dating from the 1940s through 1970s with mature trees, generous lots, and a neighborhood character that predates master-planned communities. Authentic Henderson living.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
              { title: 'No HOA Freedom', body: 'Most of Old Town Henderson has no HOA, giving homeowners flexibility for renovations, expansions, home-based businesses, and personal expression.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
              { title: 'Walkable Lifestyle', body: 'Walking distance to the Water Street District, Henderson civic campus, parks, and daily services. One of the few genuinely walkable neighborhoods in the Las Vegas Valley.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22c4-4 8-7.5 8-12a8 8 0 10-16 0c0 4.5 4 8 8 12z"/><circle cx="12" cy="10" r="3"/></svg> },
              { title: 'Renovation Upside', body: 'Original homes on generous lots at accessible prices. The Water Street District revitalization is driving renewed interest and appreciation in surrounding residential streets.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg> },
              { title: 'Henderson Safety & Services', body: 'Henderson consistently ranks among the top 10 safest large cities in America. Old Town residents benefit from responsive city services and a strong civic investment.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M8 21l4-11 4 11"/><path d="M2 21l5-14 4 8"/><path d="M14 15l4-8 4 14"/><line x1="2" y1="21" x2="22" y2="21"/></svg> },
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
            <h2>Parks &amp; Recreation Near Old Town Henderson</h2>
          </div>
          <div className="parks-grid">
            {[
              { name: 'Morrell Park', address: '500 Harris St, Henderson, NV 89015', acreage: '~8 acres', amenities: ["Pool","Playground","Basketball courts","Picnic areas","Walking paths"] },
              { name: 'Black Mountain Recreation Area', address: '599 Greenway Rd, Henderson, NV 89015', acreage: '~20 acres', amenities: ["Baseball fields","Soccer fields","Playground","Picnic areas","Walking trails"] },
              { name: 'Henderson Events Plaza', address: '200 S Water St, Henderson, NV 89015', acreage: '~2 acres', amenities: ["Event space","Amphitheater","Public art","Seating areas","Seasonal events"] },
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
            <h2>The Old Town Henderson Lifestyle</h2>
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
              <div className="lifestyle-v2-stat">2,000+</div>
              <div className="lifestyle-v2-label">Homes</div>
            </div>
            <div className="lifestyle-v2-item">
              <div className="lifestyle-v2-icon"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 2v10l7 4"/></svg></div>
              <div className="lifestyle-v2-stat">1940s–1950s</div>
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
            <h2>HOA Information for Old Town Henderson</h2>
          </div>
          <div className="hoa-grid">
            <div className="hoa-fees-col">
              <h3>Fees &amp; Management</h3>
              <div className="hoa-fee-row"><span>Monthly HOA Range</span><strong>None–$50/mo</strong></div>
              <div className="hoa-fee-row"><span>Guard-Gated</span><strong>No</strong></div>
              <div className="hoa-fee-row"><span>Community Type</span><strong>Historic · Walkable Urban</strong></div>
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
            <h2>Schools Serving Old Town Henderson</h2>
          </div>
          <div className="schools-v2-table">
            <div className="schools-v2-header">
              <span>School Name</span>
              <span>Grades</span>
              <span>Rating</span>
            </div>
            {[
              ['C.T. Sewell Elementary', 'K–5', '6/10'],
              ['Burkholder Middle School', '6–8', '5/10'],
              ['Basic High School', '9–12', '5/10'],
              ['Henderson International School', 'PreK–12', 'A'],
              ['Pinecrest Academy of Nevada', 'K–12', 'A'],
              ['Somerset Academy Henderson', 'K–8', '8/10'],
              ['Doral Academy of Nevada', 'K–8', '9/10'],
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
            <h2>What Old Town Henderson Buyers Say</h2>
          </div>
          <div className="testimonials-grid">
            {[
              { quote: 'We fell in love with the Water Street District and wanted to live within walking distance. Nevada Real Estate Group found us a charming bungalow two blocks from our favorite brewery. Old Town Henderson is exactly what we were looking for.', name: 'Derek & Natalie H.', detail: 'Bought in Old Town Henderson · 2024' },
              { quote: 'We renovated our Old Town Henderson home and Nevada Real Estate Group helped us sell it for nearly double what we paid. They understood the revitalization story and attracted buyers who valued the walkable lifestyle.', name: 'Ryan S.', detail: 'Sold in Old Town Henderson · 2025' },
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

      <HendersonOldTownFAQ />

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
              { name: 'Whitney Ranch', href: '/whitney-ranch/', price: 'From $350K', compare: 'Established master-planned community in central Henderson. More structured with HOA governance.' },
              { name: 'Black Mountain Ranch', href: '/black-mountain-ranch/', price: 'From $400K', compare: 'Henderson foothills community with mountain trails and valley views.' },
              { name: 'Cadence', href: '/cadence/', price: 'From $350K', compare: 'Henderson\'s newest master-planned community with new construction and modern amenities.' },
              { name: 'Boulder City', href: '/boulder-city/', price: 'From $400K', compare: 'Historic small town near Hoover Dam. Similar character-driven appeal with a different setting.' },
              { name: 'Green Valley', href: '/green-valley/', price: 'From $375K', compare: 'Henderson\'s largest master-planned community with parks, trails, and top schools.' },
              { name: 'Henderson', href: '/henderson/', price: 'From $350K', compare: 'The broader city of Henderson with diverse communities and consistently high safety rankings.' },
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
              <h2>Ready to Find Your Old Town Henderson Home?</h2>
              <p>Nevada Real Estate Group is the #1 real estate team in Nevada. Whether you&apos;re buying or selling in Old Town Henderson, let&apos;s talk.</p>
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
                <input type="hidden" name="_subject" value="Old Town Henderson Inquiry — LasVegasHomeSearchExperts.com" />
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
