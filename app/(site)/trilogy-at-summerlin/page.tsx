import TrilogyAtSummerlinFAQ from '@/components/TrilogyAtSummerlinFAQ'
import Link from 'next/link'
import type { Metadata } from 'next'
import TrilogyAtSummerlinMapWrapper from '@/components/TrilogyAtSummerlinMapWrapper'
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
    { '@type': 'ListItem', position: 2, name: 'Communities', item: 'https://www.lasvegashomesearchexperts.com/#communities' },
    { '@type': 'ListItem', position: 3, name: 'Trilogy at Summerlin', item: 'https://www.lasvegashomesearchexperts.com/trilogy-at-summerlin/' },
  ],
}

const FAQ_DATA = [
  {
    "q": "What is the age requirement for Trilogy at Summerlin?",
    "a": "Trilogy at Summerlin is a 55+ community. At least one resident in each home must be 55 years of age or older. No residents under 19 are permitted as permanent residents, per HUD guidelines."
  },
  {
    "q": "What is the price range for homes in Trilogy at Summerlin?",
    "a": "Homes in Trilogy at Summerlin range from approximately $500,000 for the Reflect Collection to around $800,000 for premium Pinnacle Collection homes on mountain-view lots."
  },
  {
    "q": "Does Trilogy at Summerlin have a restaurant?",
    "a": "Yes. The Outlook Club features a full-service restaurant and bar exclusively for residents and their guests. It is one of the few 55+ communities in Las Vegas with an on-site dining venue."
  },
  {
    "q": "Is Trilogy at Summerlin guard-gated?",
    "a": "Yes. Trilogy at Summerlin is a guard-gated community with a 24-hour staffed gate and private streets, providing security and controlled access for residents."
  },
  {
    "q": "Who builds homes in Trilogy at Summerlin?",
    "a": "All homes in Trilogy at Summerlin are built by Shea Homes under the nationally recognized Trilogy brand. Shea Homes' SheaXero and SheaConnect technology packages come standard."
  },
  {
    "q": "What are HOA fees in Trilogy at Summerlin?",
    "a": "HOA fees typically range from $250 to $500 per month, covering guard gate staffing, Outlook Club operations, restaurant, pool, fitness center, lifestyle programming, and the Summerlin master association fee."
  },
  {
    "q": "What is the Lifestyle Director at Trilogy?",
    "a": "Trilogy communities employ a full-time Lifestyle Director who plans and coordinates events, classes, excursions, and social activities year-round — from wine tastings and cooking classes to hiking groups and live entertainment."
  },
  {
    "q": "What ZIP code is Trilogy at Summerlin in?",
    "a": "Trilogy at Summerlin is located in ZIP code 89135 in the Summerlin South area of Las Vegas."
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
  name: 'Trilogy at Summerlin',
  description: 'Trilogy at Summerlin is a 55+ · guard-gated community in Las Vegas, Nevada.',
  geo: { '@type': 'GeoCoordinates', latitude: 36.165, longitude: -115.32 },
  address: { '@type': 'PostalAddress', addressLocality: 'Las Vegas', addressRegion: 'NV', postalCode: '89135', addressCountry: 'US' },
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
  const cms = await getCommunityPage('trilogy-at-summerlin')
  return {
    title: cms?.metaTitle ?? 'Trilogy at Summerlin Homes for Sale | Nevada Real Estate Group',
    description: cms?.metaDescription ?? 'Browse Trilogy at Summerlin homes for sale in Las Vegas, NV. $500K–$800K. Schools, HOA, market stats. Nevada Real Estate Group.',
  }
}

export default async function TrilogyAtSummerlinPage() {
  const cms = await getCommunityPage('trilogy-at-summerlin')
  const market = getMarketStats('trilogy-at-summerlin')
  const ms = market?.stats

  const heroHeadline = cms?.heroHeadline ?? 'Trilogy at Summerlin'
  const heroSubtitle = 'Homes for Sale in Las Vegas, Nevada'
  const overviewTitle = cms?.overviewTitle ?? 'Trilogy at Summerlin: 55+ · Guard-Gated Living in Las Vegas'

  const HARDCODED_STATS: Array<[string, string] | [string, string, string]> = [
    ['Established', '2017'],
    ['Developer', 'Shea Homes'],
    ['Total Acreage', '~120 acres'],
    ['Homes', '350+'],
    ['Median Home Price', ms?.medianSalePrice ?? '$500K–$800K'],
    ['ZIP Codes', '89135'],
    ['Guard-Gated', 'Yes'],
    ['HOA', '$250–$500/mo'],
  ]
  const displayStats = mergeQuickStats(HARDCODED_STATS, cms?.quickStats)
  const HARDCODED_DRIVE_TIMES = [
    {
        "time": "~20 min",
        "destination": "to the Strip",
        "route": "via Summerlin Pkwy → I-15"
    },
    {
        "time": "~10 min",
        "destination": "to Red Rock Canyon",
        "route": "via W Charleston Blvd"
    },
    {
        "time": "~5 min",
        "destination": "to Downtown Summerlin",
        "route": "via W Charleston Blvd"
    },
    {
        "time": "~30 min",
        "destination": "to Harry Reid Airport",
        "route": "via I-215 South"
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
          <a href="/#communities">Communities</a>
          <span className="breadcrumb-sep">&rsaquo;</span>
          <span>Trilogy at Summerlin</span>
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
                <span className="hero-v2-stat-num">{ms?.medianSalePrice ?? qs('Median Home Price', '$500K–$800K')}</span>
                <span className="hero-v2-stat-lbl">Median Sale Price</span>
              </div>
              <div className="hero-v2-stat">
                <span className="hero-v2-stat-num">{ms?.avgDaysToClose ?? qs('Avg Days on Market', '45')}</span>
                <span className="hero-v2-stat-lbl">Avg Days to Close</span>
              </div>
            </div>
            <a href="#listings" className="hero-v2-cta">Search Homes in Trilogy at Summerlin</a>
          </div>
        </div>
      </header>

      <div className="hero-v2-qfb">
        <div className="container">
          <div className="hero-v2-qfb-row">
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <span><strong>ZIP:</strong> 89135</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              <span><strong>Type:</strong> 55+ · Guard-Gated</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
              <span><strong>Price Range:</strong> $500K–$800K</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
              <span><strong>HOA:</strong> $250–$500/mo</span>
            </div>
          </div>
          <div className="hero-v2-qfb-est">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            <span>Est. 2017</span>
          </div>
        </div>
      </div>

      <section id="demographics" className="demographics-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Demographics</span>
            <h2>Trilogy at Summerlin Demographics</h2>
          </div>
          <div className="demo-grid">
            {[
              ['~700', 'Population'],
              ['64', 'Median Age'],
              ['$115,000+', 'Avg Household Income'],
              ['~350', 'Total Households'],
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
            <h2>Where is Trilogy at Summerlin?</h2>
            <p>Summerlin, Las Vegas &mdash; Las Vegas, Nevada.</p>
          </div>
          <div className="map-container">
            <TrilogyAtSummerlinMapWrapper />
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
            <h2 className="listings-title">NEW TRILOGY AT SUMMERLIN LISTINGS</h2>
          </div>
          <div className="ylopo-wrap">
            <div className="YLOPO_searchWidget" />
            <div className="YLOPO_resultsWidget" data-search='{"propertyTypes":["house","condo","townhouse"],"minPrice":500000,"locations":[{"city":"Las Vegas","state":"NV"}],"limit":12,"sortBy":"listDate","sortOrder":"desc","keywords":"Trilogy at Summerlin","zipCodes":["89135"]}' />
          </div>
          <p className="ylopo-note">Listing data sourced from regional MLS. Information deemed reliable but not guaranteed. Updated daily.</p>
          <div className="listings-actions">
            <a href="https://search.nevadarealestategroup.net/search?s[orderBy]=sourceCreationDate%2Cdesc&s[page]=1&s[locations][0][city]=Las%20Vegas&s[locations][0][state]=NV&s[keywords]=Trilogy%20at%20Summerlin" target="_blank" rel="noopener noreferrer" className="btn-gold">View All Trilogy at Summerlin Listings &rarr;</a>
            <Link href="/#communities" className="btn-outline">&larr; Back to All Communities</Link>
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
                  <p>Trilogy at Summerlin is a guard-gated 55+ active adult community built by Shea Homes, known nationally for creating resort-style communities under the Trilogy brand. Located within the Summerlin master plan, Trilogy offers single-story luxury homes, a stunning private clubhouse, and a lifestyle program designed to keep active adults engaged, connected, and healthy.</p>
                  <p>The centerpiece of Trilogy at Summerlin is the Outlook Club, a private amenity center featuring a resort-style pool and spa, indoor-outdoor event spaces, a full-service restaurant and bar, fitness center, movement studio, culinary studio, arts and crafts workshops, and an outdoor amphitheater for live entertainment. The Outlook Club is staffed by a full-time Lifestyle Director who curates events, classes, and social programming year-round.</p>
                  <p>Homes in Trilogy at Summerlin range from approximately $500,000 to $800,000, with single-story floor plans spanning 1,700 to 3,100 square feet. Shea Homes' SheaXero and SheaConnect technology packages come standard, offering advanced energy efficiency and smart-home connectivity. Floor plans feature open great rooms, gourmet kitchens with quartz countertops, spa master suites, and flexible bonus rooms.</p>
                  <p>Trilogy's Summerlin location places residents minutes from Downtown Summerlin, Red Rock Canyon, and the master plan's extensive trail system. The Trilogy brand has a loyal following among active adults who want more than just a house — they want a lifestyle community with built-in social infrastructure, resort amenities, and like-minded neighbors.</p>
                </>
              )}
            </div>
            <div className="overview-aside">
              <div className="quick-facts">
                <h3>Trilogy at Summerlin At a Glance</h3>
                {displayStats.map(([label, value, cls]: any) => (
                  <div className="fact-row" key={label}>
                    <span className="fact-label">{label}</span>
                    <span className={`fact-value${cls ? ' ' + cls : ''}`}>{value}</span>
                  </div>
                ))}
              </div>
              <div className="cta-card">
                <p>Ready to explore Trilogy at Summerlin? Schedule a private tour of the community and the current listings that match your goals.</p>
                <a href="tel:+17252399950" className="btn-gold">Call 725.239.9950</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="highlights">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Why Trilogy at Summerlin</span>
            <h2>What Makes Trilogy at Summerlin Stand Out</h2>
          </div>
          <div className="highlights-grid">
            {[
              { title: 'The Outlook Club', body: 'Private amenity center with resort pool, restaurant and bar, fitness center, culinary studio, arts workshops, and outdoor amphitheater for live events.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><line x1="8" y1="6" x2="8" y2="6.01"/><line x1="12" y1="6" x2="12" y2="6.01"/><line x1="16" y1="6" x2="16" y2="6.01"/><line x1="8" y1="10" x2="8" y2="10.01"/><line x1="12" y1="10" x2="12" y2="10.01"/><line x1="16" y1="10" x2="16" y2="10.01"/><line x1="8" y1="14" x2="8" y2="14.01"/><line x1="12" y1="14" x2="12" y2="14.01"/><line x1="16" y1="14" x2="16" y2="14.01"/></svg> },
              { title: 'Guard-Gated 55+ Living', body: '24-hour staffed guard gate with private streets. Secure, peaceful environment designed exclusively for active adults 55 and older.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
              { title: 'Lifestyle Director', body: 'A full-time Lifestyle Director curates events, classes, excursions, and social programming year-round — from wine tastings to hiking groups.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22c4-4 8-7.5 8-12a8 8 0 10-16 0c0 4.5 4 8 8 12z"/><circle cx="12" cy="10" r="3"/></svg> },
              { title: 'Shea Homes Innovation', body: 'SheaXero energy-efficient construction and SheaConnect smart-home technology come standard. Homes range from 1,700 to 3,100 square feet.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
              { title: 'Restaurant & Bar', body: 'The Outlook Club features a full-service restaurant and bar exclusively for residents and guests — a rare amenity in 55+ communities.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><line x1="8" y1="6" x2="8" y2="6.01"/><line x1="12" y1="6" x2="12" y2="6.01"/><line x1="16" y1="6" x2="16" y2="6.01"/><line x1="8" y1="10" x2="8" y2="10.01"/><line x1="12" y1="10" x2="12" y2="10.01"/><line x1="16" y1="10" x2="16" y2="10.01"/><line x1="8" y1="14" x2="8" y2="14.01"/><line x1="12" y1="14" x2="12" y2="14.01"/><line x1="16" y1="14" x2="16" y2="14.01"/></svg> },
              { title: 'Proven Trilogy Brand', body: 'Trilogy communities have a national reputation for excellence in 55+ living. Strong resale demand from active adults seeking the Trilogy lifestyle.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg> },
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

      <TrilogyAtSummerlinFAQ />

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
              { name: 'Regency at Summerlin', href: '/regency-at-summerlin/', price: 'From $500K', compare: 'Toll Brothers\' guard-gated 55+ community in Summerlin with comparable pricing.' },
              { name: 'Heritage at Stonebridge', href: '/heritage-at-stonebridge/', price: 'From $500K', compare: 'Taylor Morrison\'s newest 55+ guard-gated community in Summerlin with new construction.' },
              { name: 'Sun City Summerlin', href: '/sun-city-summerlin/', price: 'From $300K', compare: 'Del Webb\'s original 55+ community with 7,200+ homes and three golf courses.' },
              { name: 'Sun Colony at Siena', href: '/sun-colony-at-siena/', price: 'From $700K', compare: '55+ guard-gated enclave within Siena village at a higher price point.' },
              { name: 'Summerlin', href: '/summerlin/', price: 'From $450K', compare: 'The broader master-planned community with 20+ villages and all-ages neighborhoods.' },
              { name: 'Sun City Anthem', href: '/sun-city-anthem/', price: 'From $350K', compare: 'Henderson\'s premier Del Webb 55+ community with two golf courses and 7,200+ homes.' },
            ].map((n: any) => (
              <Link href={n.href} key={n.name} className="nearby-v2-row">
                <span className="nearby-v2-name">{n.name}</span>
                <span className="nearby-v2-price">{n.price}</span>
                <span className="nearby-v2-compare">{n.compare}</span>
                <span className="nearby-v2-arrow">&rarr;</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="cta" className="cta-v2">
        <div className="container">
          <div className="cta-v2-inner">
            <div className="cta-v2-content">
              <h2>Ready to Find Your Trilogy at Summerlin Home?</h2>
              <p>Nevada Real Estate Group is the #1 real estate team in Nevada. Whether you&apos;re buying or selling in Trilogy at Summerlin, let&apos;s talk.</p>
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
                <input type="hidden" name="_subject" value="Trilogy at Summerlin Inquiry — LasVegasHomeSearchExperts.com" />
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
