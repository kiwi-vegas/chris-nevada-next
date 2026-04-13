import NewportLoftsFAQ from '@/components/NewportLoftsFAQ'
import Link from 'next/link'
import type { Metadata } from 'next'
import NewportLoftsMapWrapper from '@/components/NewportLoftsMapWrapper'
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
    { '@type': 'ListItem', position: 3, name: 'Newport Lofts', item: 'https://www.lasvegashomesearchexperts.com/newport-lofts/' },
  ],
}

const FAQ_DATA = [
  {
    "q": "What is the price range at Newport Lofts?",
    "a": "Residences range from approximately $200,000 for studios and one-bedrooms to around $500,000 for two-bedroom and penthouse-level units."
  },
  {
    "q": "What is the design style at Newport Lofts?",
    "a": "Newport Lofts features a raw industrial aesthetic with polished concrete floors, exposed ductwork, floor-to-ceiling windows, open floor plans, and soaring ceilings. It is the most authentically industrial loft experience in Las Vegas."
  },
  {
    "q": "What amenities does Newport Lofts offer?",
    "a": "Amenities include a pool deck, fitness center, controlled building access, and dedicated resident parking. The streamlined amenity package helps keep HOA fees among the lowest of any downtown tower."
  },
  {
    "q": "Can you rent out a unit at Newport Lofts?",
    "a": "Yes. Newport Lofts allows rentals. The accessible pricing and downtown location attract young professionals and remote workers."
  },
  {
    "q": "What are HOA fees at Newport Lofts?",
    "a": "HOA fees typically range from $200 to $600 per month depending on unit size — among the lowest of any condo tower in downtown Las Vegas."
  },
  {
    "q": "How does Newport Lofts compare to Soho Lofts?",
    "a": "Both are downtown loft-style communities. Newport has a rawer, more industrial character with polished concrete and exposed ductwork. Soho Lofts is a taller 15-story tower with a slightly more refined design and mezzanine configurations. Newport has lower HOA fees and a lower entry price."
  },
  {
    "q": "Where is Newport Lofts located?",
    "a": "Newport Lofts is located in Downtown Las Vegas between the Fremont East entertainment district and the Arts District, within walking distance of both neighborhoods' restaurants, bars, and cultural venues. Newport Lofts is ~5 min to the Strip via Las Vegas Blvd."
  },
  {
    "q": "How many units are in Newport Lofts?",
    "a": "Newport Lofts contains 168 residences across 23 stories, making it one of the more intimate tower communities in downtown Las Vegas."
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
  name: 'Newport Lofts',
  description: 'Newport Lofts is a loft conversion · urban · downtown community in Las Vegas, Nevada (ZIP 89101), established in 2008 by Christopher Homes, spanning ~1 acre. Home prices range from $200K–$500K.',
  geo: { '@type': 'GeoCoordinates', latitude: 36.163, longitude: -115.151 },
  address: { '@type': 'PostalAddress', addressLocality: 'Las Vegas', addressRegion: 'NV', postalCode: '89101', addressCountry: 'US' },
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
  const cms = await getCommunityPage('newport-lofts')
  return {
    title: cms?.metaTitle ?? 'Newport Lofts Homes for Sale | Nevada Real Estate Group',
    description: cms?.metaDescription ?? 'Browse Newport Lofts homes for sale in Las Vegas, NV. $200K–$500K. Schools, HOA, market stats. Nevada Real Estate Group.',
    alternates: { canonical: 'https://www.lasvegashomesearchexperts.com/newport-lofts' },
  }
}

export default async function NewportLoftsPage() {
  const cms = await getCommunityPage('newport-lofts')
  const market = getMarketStats('newport-lofts')
  const ms = market?.stats

  const heroHeadline = cms?.heroHeadline ?? 'Newport Lofts'
  const heroSubtitle = 'Homes for Sale in Las Vegas, Nevada'
  const overviewTitle = cms?.overviewTitle ?? 'Newport Lofts: Loft Conversion · Urban · Downtown Living in Las Vegas'

  const HARDCODED_STATS: Array<[string, string] | [string, string, string]> = [
    ['Established', '2008'],
    ['Developer', 'Christopher Homes'],
    ['Total Acreage', '~1 acre'],
    ['Homes', '168'],
    ['Median Home Price', ms?.medianSalePrice ?? '$200K–$500K'],
    ['ZIP Codes', '89101'],
    ['Guard-Gated', 'No'],
    ['HOA', '$200–$600/mo'],
  ]
  const displayStats = mergeQuickStats(HARDCODED_STATS, cms?.quickStats)
  const HARDCODED_DRIVE_TIMES = [
    {
        "time": "~5 min",
        "destination": "to the Strip",
        "route": "via Las Vegas Blvd"
    },
    {
        "time": "~10 min",
        "destination": "to Harry Reid Airport",
        "route": "via I-15 South"
    },
    {
        "time": "~3 min",
        "destination": "to Fremont East",
        "route": "via Fremont St"
    },
    {
        "time": "~20 min",
        "destination": "to Summerlin",
        "route": "via US-95 West"
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
          <span>Newport Lofts</span>
        </div>
      </div>

      <header id="hero" className="summerlin-hero hero-v2">
        <img src="https://images.unsplash.com/photo-1605833556294-ea5c7a74f57d?auto=format&fit=crop&w=1600&h=700&q=80" alt="Newport Lofts community aerial view, Las Vegas Nevada" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
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
                <span className="hero-v2-stat-num">{ms?.medianSalePrice ?? qs('Median Home Price', '$200K–$500K')}</span>
                <span className="hero-v2-stat-lbl">Median Sale Price</span>
              </div>
              <div className="hero-v2-stat">
                <span className="hero-v2-stat-num">{ms?.avgDaysToClose ?? qs('Avg Days on Market', '45')}</span>
                <span className="hero-v2-stat-lbl">Avg Days to Close</span>
              </div>
            </div>
            <a href="#listings" className="hero-v2-cta">Search Homes in Newport Lofts</a>
          </div>
        </div>
      </header>

      <div className="hero-v2-qfb">
        <div className="container">
          <div className="hero-v2-qfb-row">
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <span><strong>ZIP:</strong> 89101</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              <span><strong>Type:</strong> Loft Conversion · Urban · Downtown</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
              <span><strong>Price Range:</strong> $200K–$500K</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
              <span><strong>HOA:</strong> $200–$600/mo</span>
            </div>
          </div>
          <div className="hero-v2-qfb-est">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            <span>Est. 2008</span>
          </div>
        </div>
      </div>

      <section id="demographics" className="demographics-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Demographics</span>
            <h2>Newport Lofts Demographics</h2>
          </div>
          <div className="demo-grid">
            {[
              ['~300', 'Population'],
              ['32', 'Median Age'],
              ['$60,000+', 'Avg Household Income'],
              ['168', 'Total Households'],
              ['38%', 'Homeownership Rate'],
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
            <h2>Where is Newport Lofts?</h2>
            <p>Downtown Las Vegas &mdash; Las Vegas, Nevada.</p>
          </div>
          <div className="map-container">
            <NewportLoftsMapWrapper />
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
            <h2 className="listings-title">NEW NEWPORT LOFTS LISTINGS</h2>
          </div>
          <div className="ylopo-wrap">
            <div className="YLOPO_searchWidget" />
            <div className="YLOPO_resultsWidget" data-search='{"propertyTypes":["house","condo","townhouse"],"minPrice":200000,"locations":[{"city":"Las Vegas","state":"NV"}],"limit":12,"sortBy":"listDate","sortOrder":"desc","keywords":"Newport Lofts Downtown","zipCodes":["89101"]}' />
          </div>
          <p className="ylopo-note">Listing data sourced from regional MLS. Information deemed reliable but not guaranteed. Updated daily.</p>
          <div className="listings-actions">
            <a href="https://search.nevadarealestategroup.net/search?s[orderBy]=sourceCreationDate%2Cdesc&s[page]=1&s[locations][0][city]=Las%20Vegas&s[locations][0][state]=NV&s[keywords]=Newport%20Lofts%20Downtown" target="_blank" rel="noopener noreferrer" className="btn-gold">View All Newport Lofts Listings &rarr;</a>
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
                  <p>Newport Lofts is a loft conversion · urban · downtown community in Las Vegas, Nevada (ZIP 89101), developed by Christopher Homes, spanning ~1 acre, where home prices range from $200K–$500K. Newport Lofts is a 23-story residential tower located in Downtown Las Vegas, offering authentic loft-style condominiums with a raw, industrial character that distinguishes it from the city's more conventional high-rise communities. Completed in 2008, the building contains 168 residences and has earned a loyal following among buyers who appreciate genuine urban design and the energy of downtown living.</p>
                  <p>Residences at Newport Lofts range from approximately $200,000 for studios and one-bedrooms to around $500,000 for two-bedroom and penthouse-level units. The design aesthetic emphasizes raw industrial elements — polished concrete floors, exposed ductwork, floor-to-ceiling windows, open floor plans with minimal interior walls, and ceiling heights that give every unit an airy, expansive feel. Many units offer direct views of the Stratosphere Tower, the downtown skyline, and the Spring Mountains.</p>
                  <p>Building amenities include a pool deck, fitness center, controlled building access, and dedicated resident parking. While the amenity package is more streamlined than some competing towers, Newport Lofts' appeal lies in its authentic loft character and its central downtown location — not in resort-style extras.</p>
                  <p>Newport Lofts is positioned between the Fremont East entertainment district and the Arts District, giving residents walkable access to both neighborhoods. The building is within blocks of the Mob Museum, Container Park, Fremont Street Experience, and the growing concentration of restaurants, bars, and creative businesses that are transforming downtown Las Vegas. For buyers seeking the most authentic loft living experience in Las Vegas at the most accessible price point, Newport Lofts delivers.</p>
                </>
              )}
            </div>
            <div className="overview-aside">
              <div className="quick-facts">
                <h3>Newport Lofts At a Glance</h3>
                {displayStats.map(([label, value, cls]: any) => (
                  <div className="fact-row" key={label}>
                    <span className="fact-label">{label}</span>
                    <span className={`fact-value${cls ? ' ' + cls : ''}`}>{value}</span>
                  </div>
                ))}
              </div>
              <div className="cta-card">
                <p>Ready to explore Newport Lofts? Schedule a private tour of the community and the current listings that match your goals.</p>
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
            <h2>Top 7 Facts About Newport Lofts</h2>
          </div>
          <ol className="top-facts-list">
            <li key={0}>Newport Lofts spans ~1 acre in Las Vegas, Nevada (ZIP 89101).</li>
            <li key={1}>Newport Lofts was established in 2008 by Christopher Homes.</li>
            <li key={2}>Newport Lofts contains 168 homes with prices ranging from $200K–$500K.</li>
            <li key={3}>Newport Lofts is a loft conversion · urban · downtown community.</li>
            <li key={4}>HOA fees in Newport Lofts range from $200–$600/mo per month.</li>
            <li key={5}>Top-rated schools serving Newport Lofts include Las Vegas Academy of the Arts (9/10) and Rancho High School (5/10).</li>
            <li key={6}>Newport Lofts is located ~5 min to the Strip via Las Vegas Blvd.</li>
          </ol>
        </div>
      </section>

      <section id="highlights">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Why Newport Lofts</span>
            <h2>What Makes Newport Lofts Stand Out</h2>
          </div>
          <div className="highlights-grid">
            {[
              { title: 'Raw Industrial Character', body: 'Polished concrete floors, exposed ductwork, floor-to-ceiling windows, and minimal interior walls. The most authentically industrial loft experience in Las Vegas.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
              { title: '23-Story Tower', body: 'A 23-story tower with 168 residences offering downtown skyline and mountain views. Compact building with a tight-knit community feel.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><line x1="8" y1="6" x2="8" y2="6.01"/><line x1="12" y1="6" x2="12" y2="6.01"/><line x1="16" y1="6" x2="16" y2="6.01"/><line x1="8" y1="10" x2="8" y2="10.01"/><line x1="12" y1="10" x2="12" y2="10.01"/><line x1="16" y1="10" x2="16" y2="10.01"/><line x1="8" y1="14" x2="8" y2="14.01"/><line x1="12" y1="14" x2="12" y2="14.01"/><line x1="16" y1="14" x2="16" y2="14.01"/></svg> },
              { title: 'Downtown Central Location', body: 'Between Fremont East and the Arts District with walkable access to restaurants, bars, galleries, and entertainment venues.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
              { title: 'Most Accessible Entry Price', body: 'Studios and one-bedrooms start around $200,000 with some of the lowest HOA fees among downtown towers, making Newport the most accessible loft option.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg> },
              { title: 'Pool & Fitness', body: 'Pool deck, fitness center, and resident common areas. Streamlined amenities that keep HOA fees low.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
              { title: 'Secure Parking', body: 'Controlled building access, dedicated resident parking, and security systems for resident safety.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
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
            <h2>Parks &amp; Recreation Near Newport Lofts</h2>
          </div>
          <div className="parks-grid">
            {[
              { name: 'Newport Lofts Pool Deck', address: '200 Hoover Ave, Las Vegas, NV 89101', acreage: '~0.2 acres', amenities: ["Pool","Lounge area","City views"] },
              { name: 'Fremont Street Experience', address: '425 Fremont St, Las Vegas, NV 89101', acreage: '~5 acres', amenities: ["LED canopy","Live entertainment","Dining","Shopping","Events"] },
              { name: 'Container Park', address: '707 Fremont St, Las Vegas, NV 89101', acreage: '~1 acre', amenities: ["Outdoor shopping","Dining","Live entertainment","Treehouse playground","Art installations"] },
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
            <h2>The Newport Lofts Lifestyle</h2>
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
              <div className="lifestyle-v2-stat">168</div>
              <div className="lifestyle-v2-label">Homes</div>
            </div>
            <div className="lifestyle-v2-item">
              <div className="lifestyle-v2-icon"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 2v10l7 4"/></svg></div>
              <div className="lifestyle-v2-stat">2008</div>
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
            <h2>HOA Information for Newport Lofts</h2>
          </div>
          <div className="hoa-grid">
            <div className="hoa-fees-col">
              <h3>Fees &amp; Management</h3>
              <div className="hoa-fee-row"><span>Monthly HOA Range</span><strong>$200–$600/mo</strong></div>
              <div className="hoa-fee-row"><span>Guard-Gated</span><strong>No</strong></div>
              <div className="hoa-fee-row"><span>Community Type</span><strong>Loft Conversion · Urban · Downtown</strong></div>
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
            <h2>Schools Serving Newport Lofts</h2>
          </div>
          <div className="schools-v2-table">
            <div className="schools-v2-header">
              <span>School Name</span>
              <span>Grades</span>
              <span>Rating</span>
            </div>
            {[
              ['Las Vegas Academy of the Arts', '9–12', '9/10'],
              ['Rancho High School', '9–12', '5/10'],
              ['West Prep Academy', '6–12', '6/10'],
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
            <h2>What Newport Lofts Buyers Say</h2>
          </div>
          <div className="testimonials-grid">
            {[
              { quote: 'Newport Lofts is the most authentic loft living in Las Vegas. The concrete floors, the exposed ductwork, the giant windows — it\'s the real thing. Nevada Real Estate Group found us the perfect unit.', name: 'Evan & Sarah C.', detail: 'Bought at Newport Lofts · 2024' },
              { quote: 'We wanted a downtown loft at the lowest possible price and Newport delivered. Nevada Real Estate Group showed us every option and Newport was the clear winner for value.', name: 'Andrea K.', detail: 'Bought at Newport Lofts · 2025' },
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

      <NewportLoftsFAQ />

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
              { name: 'Soho Lofts', href: '/soho-lofts/', price: 'From $200K', compare: 'Arts District loft tower with mezzanine configurations and a more refined industrial design.' },
              { name: 'Juhl', href: '/juhl/', price: 'From $200K', compare: 'Loft-style campus condos with Sky Deck, co-working spaces, and a creative community.' },
              { name: 'The Ogden', href: '/the-ogden/', price: 'From $200K', compare: 'Downtown high-rise tower with conventional layouts and Fremont East location.' },
              { name: 'Cello Tower', href: '/cello-tower/', price: 'From $700K', compare: 'Downtown\'s newest luxury high-rise. Premium new construction.' },
              { name: 'Allure Las Vegas', href: '/allure-las-vegas/', price: 'From $250K', compare: '41-story tower near the north Strip with traditional high-rise design.' },
              { name: 'Sky Las Vegas', href: '/sky-las-vegas/', price: 'From $300K', compare: 'Strip-front high-rise for buyers wanting the Las Vegas Boulevard experience.' },
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
              <h2>Ready to Find Your Newport Lofts Home?</h2>
              <p>Nevada Real Estate Group is the #1 real estate team in Nevada. Whether you&apos;re buying or selling in Newport Lofts, let&apos;s talk.</p>
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
                <input type="hidden" name="_subject" value="Newport Lofts Inquiry — LasVegasHomeSearchExperts.com" />
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
