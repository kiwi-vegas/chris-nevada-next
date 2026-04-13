import PanoramaTowersFAQ from '@/components/PanoramaTowersFAQ'
import Link from 'next/link'
import type { Metadata } from 'next'
import PanoramaTowersMapWrapper from '@/components/PanoramaTowersMapWrapper'
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
    { '@type': 'ListItem', position: 3, name: 'Panorama Towers', item: 'https://www.lasvegashomesearchexperts.com/panorama-towers/' },
  ],
}

const FAQ_DATA = [
  {
    "q": "What is the price range at Panorama Towers?",
    "a": "Residences at Panorama Towers range from approximately $300,000 for one-bedroom units on lower floors to over $2 million for penthouses and combined corner units with panoramic Strip and mountain views."
  },
  {
    "q": "How many towers and units are there?",
    "a": "Panorama Towers consists of twin 33-story towers containing approximately 650 total residences. The two towers were completed in phases between 2006 and 2008."
  },
  {
    "q": "What amenities does Panorama Towers offer?",
    "a": "Amenities include two resort-style pool decks, tennis courts, a fitness center, 24-hour concierge and security, valet parking, a business center, and private resident lounges."
  },
  {
    "q": "Is Panorama Towers gated?",
    "a": "Yes. Panorama Towers has a gated entry with 24-hour security and concierge services. Dedicated residential parking and controlled building access provide privacy for residents."
  },
  {
    "q": "Can you rent out a unit at Panorama Towers?",
    "a": "Yes. Panorama Towers allows owners to rent their units. The Strip-adjacent location and resort amenities drive consistent rental demand. Contact our team for current rental market conditions."
  },
  {
    "q": "How does Panorama compare to Veer Towers?",
    "a": "Panorama Towers generally offers larger floor plans at a lower per-square-foot price compared to Veer Towers. Veer is directly on-Strip at CityCenter with a more modern design. Panorama is Strip-adjacent with more established HOA reserves and two pool decks."
  },
  {
    "q": "What are HOA fees at Panorama Towers?",
    "a": "HOA fees at Panorama Towers typically range from $350 to $1,500 per month depending on unit size and floor level. Fees cover building maintenance, concierge, security, pool and fitness facilities, and common area upkeep."
  },
  {
    "q": "What views do Panorama Towers units have?",
    "a": "Depending on tower and unit position, views include the Las Vegas Strip, CityCenter, the Spring Mountains, the Las Vegas Valley, and Red Rock Canyon in the distance."
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
  name: 'Panorama Towers',
  description: 'Panorama Towers is a high-rise · luxury · strip-adjacent community in Las Vegas, Nevada.',
  geo: { '@type': 'GeoCoordinates', latitude: 36.108, longitude: -115.181 },
  address: { '@type': 'PostalAddress', addressLocality: 'Las Vegas', addressRegion: 'NV', postalCode: '89158', addressCountry: 'US' },
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
  const cms = await getCommunityPage('panorama-towers')
  return {
    title: cms?.metaTitle ?? 'Panorama Towers Homes for Sale | Nevada Real Estate Group',
    description: cms?.metaDescription ?? 'Browse Panorama Towers homes for sale in Las Vegas, NV. $300K–$2M+. Schools, HOA, market stats. Nevada Real Estate Group.',
    alternates: { canonical: 'https://www.lasvegashomesearchexperts.com/panorama-towers' },
  }
}

export default async function PanoramaTowersPage() {
  const cms = await getCommunityPage('panorama-towers')
  const market = getMarketStats('panorama-towers')
  const ms = market?.stats

  const heroHeadline = cms?.heroHeadline ?? 'Panorama Towers'
  const heroSubtitle = 'Homes for Sale in Las Vegas, Nevada'
  const overviewTitle = cms?.overviewTitle ?? 'Panorama Towers: High-Rise · Luxury · Strip-Adjacent Living in Las Vegas'

  const HARDCODED_STATS: Array<[string, string] | [string, string, string]> = [
    ['Established', '2006'],
    ['Developer', 'Panorama Group / Laurence Hallier'],
    ['Total Acreage', '~6 acres'],
    ['Homes', '~650'],
    ['Median Home Price', ms?.medianSalePrice ?? '$300K–$2M+'],
    ['ZIP Codes', '89158'],
    ['Guard-Gated', 'Yes'],
    ['HOA', '$350–$1,500/mo'],
  ]
  const displayStats = mergeQuickStats(HARDCODED_STATS, cms?.quickStats)
  const HARDCODED_DRIVE_TIMES = [
    {
        "time": "~3 min",
        "destination": "to the Strip",
        "route": "via Dean Martin Dr"
    },
    {
        "time": "~10 min",
        "destination": "to Harry Reid Airport",
        "route": "via I-15 South"
    },
    {
        "time": "~5 min",
        "destination": "to T-Mobile Arena",
        "route": "via Dean Martin Dr"
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
          <span>Panorama Towers</span>
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
                <span className="hero-v2-stat-num">{ms?.medianSalePrice ?? qs('Median Home Price', '$300K–$2M+')}</span>
                <span className="hero-v2-stat-lbl">Median Sale Price</span>
              </div>
              <div className="hero-v2-stat">
                <span className="hero-v2-stat-num">{ms?.avgDaysToClose ?? qs('Avg Days on Market', '45')}</span>
                <span className="hero-v2-stat-lbl">Avg Days to Close</span>
              </div>
            </div>
            <a href="#listings" className="hero-v2-cta">Search Homes in Panorama Towers</a>
          </div>
        </div>
      </header>

      <div className="hero-v2-qfb">
        <div className="container">
          <div className="hero-v2-qfb-row">
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <span><strong>ZIP:</strong> 89158</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              <span><strong>Type:</strong> High-Rise · Luxury · Strip-Adjacent</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
              <span><strong>Price Range:</strong> $300K–$2M+</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
              <span><strong>HOA:</strong> $350–$1,500/mo</span>
            </div>
          </div>
          <div className="hero-v2-qfb-est">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            <span>Est. 2006</span>
          </div>
        </div>
      </div>

      <section id="demographics" className="demographics-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Demographics</span>
            <h2>Panorama Towers Demographics</h2>
          </div>
          <div className="demo-grid">
            {[
              ['~1,200', 'Population'],
              ['45', 'Median Age'],
              ['$150,000+', 'Avg Household Income'],
              ['~650', 'Total Households'],
              ['55%', 'Homeownership Rate'],
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
            <h2>Where is Panorama Towers?</h2>
            <p>Las Vegas Strip Corridor &mdash; Las Vegas, Nevada.</p>
          </div>
          <div className="map-container">
            <PanoramaTowersMapWrapper />
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
            <h2 className="listings-title">NEW PANORAMA TOWERS LISTINGS</h2>
          </div>
          <div className="ylopo-wrap">
            <div className="YLOPO_searchWidget" />
            <div className="YLOPO_resultsWidget" data-search='{"propertyTypes":["house","condo","townhouse"],"minPrice":300000,"locations":[{"city":"Las Vegas","state":"NV"}],"limit":12,"sortBy":"listDate","sortOrder":"desc","keywords":"Panorama Towers","zipCodes":["89158"]}' />
          </div>
          <p className="ylopo-note">Listing data sourced from regional MLS. Information deemed reliable but not guaranteed. Updated daily.</p>
          <div className="listings-actions">
            <a href="https://search.nevadarealestategroup.net/search?s[orderBy]=sourceCreationDate%2Cdesc&s[page]=1&s[locations][0][city]=Las%20Vegas&s[locations][0][state]=NV&s[keywords]=Panorama%20Towers" target="_blank" rel="noopener noreferrer" className="btn-gold">View All Panorama Towers Listings &rarr;</a>
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
                  <p>Panorama Towers is a twin-tower luxury high-rise condominium community located on Dean Martin Drive, directly adjacent to the Las Vegas Strip and CityCenter. Completed in phases between 2006 and 2008, the two 33-story towers contain approximately 650 residences and offer some of the most compelling high-rise living in the Las Vegas corridor, combining spacious floor plans with panoramic Strip, mountain, and valley views.</p>
                  <p>Panorama Towers was one of the first purpose-built luxury residential high-rises in the Las Vegas market, and it set the standard for amenity-rich condo living near the Strip. Residences range from approximately $300,000 for one-bedroom units to over $2 million for penthouses and combined corner units with sweeping views. Floor plans are notably generous compared to many Strip and Strip-adjacent towers, with two- and three-bedroom units offering substantial living space.</p>
                  <p>The complex features two resort-style pool decks, a fully equipped fitness center, 24-hour concierge and security, valet parking, tennis courts, a business center, and private resident lounges. The gated entry and dedicated residential parking provide a sense of privacy and security, while the location on Dean Martin Drive offers direct access to the Strip, CityCenter, T-Mobile Arena, and the I-15 freeway.</p>
                  <p>For buyers seeking the convenience of Strip-adjacent living with more space and value than on-Strip towers like Veer or the Waldorf Astoria, Panorama Towers has been a go-to address for over 15 years. Its established reputation, strong HOA reserves, and large floor plans continue to attract both primary residents and investors looking for a proven high-rise community in the heart of the Las Vegas corridor.</p>
                </>
              )}
            </div>
            <div className="overview-aside">
              <div className="quick-facts">
                <h3>Panorama Towers At a Glance</h3>
                {displayStats.map(([label, value, cls]: any) => (
                  <div className="fact-row" key={label}>
                    <span className="fact-label">{label}</span>
                    <span className={`fact-value${cls ? ' ' + cls : ''}`}>{value}</span>
                  </div>
                ))}
              </div>
              <div className="cta-card">
                <p>Ready to explore Panorama Towers? Schedule a private tour of the community and the current listings that match your goals.</p>
                <a href="tel:+17252399950" className="btn-gold">Call 725.239.9950</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="highlights">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Why Panorama Towers</span>
            <h2>What Makes Panorama Towers Stand Out</h2>
          </div>
          <div className="highlights-grid">
            {[
              { title: 'Twin 33-Story Towers', body: 'Two 33-story residential towers with approximately 650 residences. One of the largest and most established luxury high-rise communities near the Strip.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><line x1="8" y1="6" x2="8" y2="6.01"/><line x1="12" y1="6" x2="12" y2="6.01"/><line x1="16" y1="6" x2="16" y2="6.01"/><line x1="8" y1="10" x2="8" y2="10.01"/><line x1="12" y1="10" x2="12" y2="10.01"/><line x1="16" y1="10" x2="16" y2="10.01"/><line x1="8" y1="14" x2="8" y2="14.01"/><line x1="12" y1="14" x2="12" y2="14.01"/><line x1="16" y1="14" x2="16" y2="14.01"/></svg> },
              { title: 'Spacious Floor Plans', body: 'Floor plans are notably generous compared to on-Strip towers. Two- and three-bedroom units offer substantial living space for full-time residents.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
              { title: 'Dual Pool Decks', body: 'Two resort-style pool decks with cabanas, lounge areas, and panoramic views. Tennis courts and outdoor recreation areas enhance the resort lifestyle.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
              { title: 'Strip-Adjacent Location', body: 'Located on Dean Martin Drive with direct access to CityCenter, T-Mobile Arena, ARIA, and the Las Vegas Strip — all within a five-minute walk.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
              { title: '24-Hour Concierge', body: 'Gated entry with 24-hour concierge, valet parking, fitness center, business center, and dedicated security for resident privacy.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
              { title: 'Proven Investment', body: 'One of the first luxury high-rises in Las Vegas with strong HOA reserves, an established track record, and consistent demand from both residents and investors.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg> },
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
            <h2>Parks &amp; Recreation Near Panorama Towers</h2>
          </div>
          <div className="parks-grid">
            {[
              { name: 'The Park Las Vegas', address: '3784 Las Vegas Blvd S, Las Vegas, NV 89158', acreage: '~8 acres', amenities: ["Outdoor dining","Live entertainment","Public art","T-Mobile Arena access","Landscaped promenades"] },
              { name: 'Panorama Towers Pool & Tennis', address: '4525 Dean Martin Dr, Las Vegas, NV 89103', acreage: '~3 acres', amenities: ["Two resort pools","Tennis courts","Cabanas","Lounge areas","BBQ grills"] },
              { name: 'Bruce Trent Park', address: '8851 Vegas Dr, Las Vegas, NV 89128', acreage: '~20 acres', amenities: ["Sports fields","Playground","Walking paths","Picnic areas"] },
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
            <h2>The Panorama Towers Lifestyle</h2>
          </div>
          <div className="lifestyle-v2-grid">
            <div className="lifestyle-v2-item">
              <div className="lifestyle-v2-icon"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg></div>
              <div className="lifestyle-v2-stat">~3 min</div>
              <div className="lifestyle-v2-label">to the Strip</div>
            </div>
            <div className="lifestyle-v2-item">
              <div className="lifestyle-v2-icon"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22c4-4 8-7.5 8-12a8 8 0 10-16 0c0 4.5 4 8 8 12z"/><circle cx="12" cy="10" r="3"/></svg></div>
              <div className="lifestyle-v2-stat">3+</div>
              <div className="lifestyle-v2-label">Nearby Parks</div>
            </div>
            <div className="lifestyle-v2-item">
              <div className="lifestyle-v2-icon"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg></div>
              <div className="lifestyle-v2-stat">~650</div>
              <div className="lifestyle-v2-label">Homes</div>
            </div>
            <div className="lifestyle-v2-item">
              <div className="lifestyle-v2-icon"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 2v10l7 4"/></svg></div>
              <div className="lifestyle-v2-stat">2006</div>
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
            <h2>HOA Information for Panorama Towers</h2>
          </div>
          <div className="hoa-grid">
            <div className="hoa-fees-col">
              <h3>Fees &amp; Management</h3>
              <div className="hoa-fee-row"><span>Monthly HOA Range</span><strong>$350–$1,500/mo</strong></div>
              <div className="hoa-fee-row"><span>Guard-Gated</span><strong>Yes — staffed gate</strong></div>
              <div className="hoa-fee-row"><span>Community Type</span><strong>High-Rise · Luxury · Strip-Adjacent</strong></div>
              <div className="hoa-management">
                <p className="hoa-mgmt-label">Management</p>
                <p className="hoa-mgmt-value">Community Association</p>
              </div>
              <p style={{ marginTop: '16px', fontSize: '11px', color: 'var(--text-faint)', fontStyle: 'italic' }}>HOA fees are subject to change. Verify current fees with the management company before purchase.</p>
            </div>
            <div className="hoa-amenities-col">
              <h3>What HOA Typically Covers</h3>
              <ul className="hoa-amenity-list">
                {['24-hour guard gate staffing and security patrols','Common area landscaping and maintenance','Community parks and trail maintenance','Neighborhood street maintenance','Perimeter wall and gate maintenance','Exterior architectural standards enforcement','Reserve fund contributions'].map((a: string) => <li key={a}>{a}</li>)}
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
            <h2>Schools Serving Panorama Towers</h2>
          </div>
          <div className="schools-v2-table">
            <div className="schools-v2-header">
              <span>School Name</span>
              <span>Grades</span>
              <span>Rating</span>
            </div>
            {[
              ['Las Vegas Academy of the Arts', '9–12', '9/10'],
              ['Walter Bracken STEAM Academy', 'K–5', '8/10'],
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
            <h2>What Panorama Towers Buyers Say</h2>
          </div>
          <div className="testimonials-grid">
            {[
              { quote: 'Panorama Towers gave us the Strip lifestyle we wanted with the space we needed. Nevada Real Estate Group helped us find a high-floor two-bedroom with mountain views at a price that was well below comparable units at Veer.', name: 'Steven & Amy R.', detail: 'Bought at Panorama Towers · 2024' },
              { quote: 'We\'ve owned at Panorama for five years and recently upgraded to a higher floor. Nevada Real Estate Group handled both transactions and their knowledge of the building\'s inventory is unmatched.', name: 'Karen M.', detail: 'Upgraded at Panorama Towers · 2025' },
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

      <PanoramaTowersFAQ />

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
              { name: 'Veer Towers', href: '/veer-towers/', price: 'From $400K', compare: 'CityCenter\'s iconic twin leaning towers with on-Strip location and modern design.' },
              { name: 'The Martin', href: '/the-martin/', price: 'From $400K', compare: '45-story luxury tower on the same Dean Martin Drive corridor with comparable views.' },
              { name: 'Waldorf Astoria Las Vegas', href: '/waldorf-astoria-las-vegas/', price: 'From $500K', compare: 'Five-star branded residences at CityCenter with full hotel services.' },
              { name: 'Allure Las Vegas', href: '/allure-las-vegas/', price: 'From $250K', compare: '41-story tower with a more accessible price point, located north of the Strip.' },
              { name: 'Turnberry Towers', href: '/turnberry-towers/', price: 'From $400K', compare: 'Twin 45-story luxury towers near the Convention Center with full resort amenities.' },
              { name: 'Sky Las Vegas', href: '/sky-las-vegas/', price: 'From $300K', compare: '45-story tower directly on the Strip with Las Vegas Boulevard frontage.' },
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
              <h2>Ready to Find Your Panorama Towers Home?</h2>
              <p>Nevada Real Estate Group is the #1 real estate team in Nevada. Whether you&apos;re buying or selling in Panorama Towers, let&apos;s talk.</p>
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
                <input type="hidden" name="_subject" value="Panorama Towers Inquiry — LasVegasHomeSearchExperts.com" />
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
