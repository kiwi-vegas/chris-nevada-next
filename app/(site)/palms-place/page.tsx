import PalmsPlaceFAQ from '@/components/PalmsPlaceFAQ'
import Link from 'next/link'
import type { Metadata } from 'next'
import PalmsPlaceMapWrapper from '@/components/PalmsPlaceMapWrapper'
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
    { '@type': 'ListItem', position: 3, name: 'Palms Place Hotel and Spa', item: 'https://www.lasvegashomesearchexperts.com/palms-place/' },
  ],
}

const FAQ_DATA = [
  {
    "q": "What is the price range for units at Palms Place?",
    "a": "Units at Palms Place range from approximately $200,000 for studio suites to over $1.5 million for premium penthouses on the upper floors. One-bedroom suites, the most popular unit type, typically range from $300,000 to $500,000."
  },
  {
    "q": "Is Palms Place a hotel or condos?",
    "a": "Palms Place is a condo-hotel. Each unit is an individually owned condominium that can be placed into the hotel's rental management program. Owners can use their unit as a primary residence, vacation home, or rental investment property."
  },
  {
    "q": "What are HOA fees at Palms Place?",
    "a": "HOA fees at Palms Place typically range from $500 to $1,800 per month depending on unit size and floor level. Fees cover building amenities, common area maintenance, concierge services, valet parking, pool, spa, and building infrastructure."
  },
  {
    "q": "Can I use the Palms Casino Resort amenities?",
    "a": "Yes. Palms Place owners have direct indoor access to the Palms Casino Resort and all of its amenities, including restaurants, the pool complex, entertainment venues, the casino floor, and the spa. Palms Place also has its own private pool and spa separate from the resort."
  },
  {
    "q": "Can I live full-time at Palms Place?",
    "a": "Yes. While many owners use the hotel rental program, Palms Place allows full-time residency. Full-time residents enjoy the same amenities, concierge services, and resort access as other owners and hotel guests."
  },
  {
    "q": "What happened with the Palms renovation?",
    "a": "The Palms Casino Resort underwent a $690 million renovation completed in 2019, one of the most expensive resort renovations in Las Vegas history. The renovation included Damien Hirst artwork, new restaurants, a reimagined pool complex, and upgraded common areas that benefit all Palms Place owners."
  },
  {
    "q": "How close is Palms Place to the Strip?",
    "a": "Palms Place is located approximately one block west of the Las Vegas Strip on Flamingo Road. The central Strip corridor, including CityCenter, Bellagio, and Caesars Palace, is approximately a 5-minute drive or a short rideshare trip."
  },
  {
    "q": "What is the rental income potential at Palms Place?",
    "a": "Rental income varies by unit size, floor level, view, and season. The Palms brand recognition and resort amenities support solid nightly rates, particularly during conventions, holidays, and major Las Vegas events. Contact our team for current rental performance data."
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
  name: 'Palms Place Hotel and Spa',
  description: 'Palms Place Hotel and Spa is a high-rise · condo-hotel community in Las Vegas, Nevada.',
  geo: { '@type': 'GeoCoordinates', latitude: 36.116, longitude: -115.184 },
  address: { '@type': 'PostalAddress', addressLocality: 'Las Vegas', addressRegion: 'NV', postalCode: '89103', addressCountry: 'US' },
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
  const cms = await getCommunityPage('palms-place')
  return {
    title: cms?.metaTitle ?? 'Palms Place Hotel and Spa Homes for Sale | Nevada Real Estate Group',
    description: cms?.metaDescription ?? 'Browse Palms Place Hotel and Spa homes for sale in Las Vegas, NV. $200K–$1.5M+. Schools, HOA, market stats. Nevada Real Estate Group.',
    alternates: { canonical: 'https://www.lasvegashomesearchexperts.com/palms-place' },
  }
}

export default async function PalmsPlacePage() {
  const cms = await getCommunityPage('palms-place')
  const market = getMarketStats('palms-place')
  const ms = market?.stats

  const heroHeadline = cms?.heroHeadline ?? 'Palms Place Hotel and Spa'
  const heroSubtitle = 'Homes for Sale in Las Vegas, Nevada'
  const overviewTitle = cms?.overviewTitle ?? 'Palms Place Hotel and Spa: High-Rise · Condo-Hotel Living in Las Vegas'

  const HARDCODED_STATS: Array<[string, string] | [string, string, string]> = [
    ['Established', '2008'],
    ['Developer', 'Palms Casino Resort / Maloof Family'],
    ['Total Acreage', '~2 acres'],
    ['Homes', '~599 units'],
    ['Median Home Price', ms?.medianSalePrice ?? '$200K–$1.5M+'],
    ['ZIP Codes', '89103'],
    ['Guard-Gated', 'Yes'],
    ['HOA', '$500–$1,800/mo'],
  ]
  const displayStats = mergeQuickStats(HARDCODED_STATS, cms?.quickStats)
  const HARDCODED_DRIVE_TIMES = [
    {
        "time": "~5 min",
        "destination": "to the Strip",
        "route": "via W Flamingo Rd"
    },
    {
        "time": "~15 min",
        "destination": "to Harry Reid Airport",
        "route": "via I-15 South"
    },
    {
        "time": "~10 min",
        "destination": "to Downtown / Fremont",
        "route": "via I-15 North"
    },
    {
        "time": "~25 min",
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
          <span>Palms Place Hotel and Spa</span>
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
                <span className="hero-v2-stat-num">{ms?.medianSalePrice ?? qs('Median Home Price', '$200K–$1.5M+')}</span>
                <span className="hero-v2-stat-lbl">Median Sale Price</span>
              </div>
              <div className="hero-v2-stat">
                <span className="hero-v2-stat-num">{ms?.avgDaysToClose ?? qs('Avg Days on Market', '45')}</span>
                <span className="hero-v2-stat-lbl">Avg Days to Close</span>
              </div>
            </div>
            <a href="#listings" className="hero-v2-cta">Search Homes in Palms Place Hotel and Spa</a>
          </div>
        </div>
      </header>

      <div className="hero-v2-qfb">
        <div className="container">
          <div className="hero-v2-qfb-row">
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <span><strong>ZIP:</strong> 89103</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              <span><strong>Type:</strong> High-Rise · Condo-Hotel</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
              <span><strong>Price Range:</strong> $200K–$1.5M+</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
              <span><strong>HOA:</strong> $500–$1,800/mo</span>
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
            <h2>Palms Place Hotel and Spa Demographics</h2>
          </div>
          <div className="demo-grid">
            {[
              ['~400 (full-time residents)', 'Population'],
              ['42', 'Median Age'],
              ['$120,000+', 'Avg Household Income'],
              ['~599 units', 'Total Households'],
              ['65%', 'Homeownership Rate'],
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
            <h2>Where is Palms Place Hotel and Spa?</h2>
            <p>Las Vegas, Nevada &mdash; Las Vegas, Nevada.</p>
          </div>
          <div className="map-container">
            <PalmsPlaceMapWrapper />
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
            <h2 className="listings-title">NEW PALMS PLACE HOTEL AND SPA LISTINGS</h2>
          </div>
          <div className="ylopo-wrap">
            <div className="YLOPO_searchWidget" />
            <div className="YLOPO_resultsWidget" data-search='{"propertyTypes":["house","condo","townhouse"],"minPrice":200000,"locations":[{"city":"Las Vegas","state":"NV"}],"limit":12,"sortBy":"listDate","sortOrder":"desc","keywords":"Palms Place","zipCodes":["89103"]}' />
          </div>
          <p className="ylopo-note">Listing data sourced from regional MLS. Information deemed reliable but not guaranteed. Updated daily.</p>
          <div className="listings-actions">
            <a href="https://search.nevadarealestategroup.net/search?s[orderBy]=sourceCreationDate%2Cdesc&s[page]=1&s[locations][0][city]=Las%20Vegas&s[locations][0][state]=NV&s[keywords]=Palms%20Place" target="_blank" rel="noopener noreferrer" className="btn-gold">View All Palms Place Hotel and Spa Listings &rarr;</a>
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
                  <p>Palms Place Hotel and Spa is a 47-story luxury condo-hotel tower connected to the Palms Casino Resort, one of the most iconic off-Strip resorts in Las Vegas. Completed in 2008, the tower contains approximately 599 individually owned residential units and offers a distinctive lifestyle that blends private high-rise living with full access to the Palms' world-class entertainment, dining, and nightlife venues.</p>
                  <p>The Palms Casino Resort underwent a $690 million renovation completed in 2019, transforming the property into one of the most visually striking resorts in Las Vegas with Damien Hirst artwork installations, a reimagined pool complex, and new restaurant and entertainment concepts. Palms Place owners benefit directly from this investment through access to the resort's upgraded amenities, including the KAOS dayclub and nightclub venue spaces, multiple celebrity-chef restaurants, and the resort's signature pool scene.</p>
                  <p>Units at Palms Place range from studios starting around $200,000 to premium one- and two-bedroom suites and penthouses exceeding $1.5 million. Every unit features floor-to-ceiling windows, modern kitchens with stainless steel appliances, marble bathrooms, and designer furnishings. The building offers its own dedicated amenities separate from the casino, including a private resort-style pool, a 15,000-square-foot spa and fitness center, 24-hour concierge, and valet parking.</p>
                  <p>Palms Place's location on Flamingo Road, just one block west of the Strip, provides the convenience of Strip proximity without the density of a Strip-front address. The property is minutes from CityCenter, the Bellagio, Caesars Palace, and the entire central Strip corridor. For buyers seeking an affordable entry into Las Vegas condo-hotel ownership with access to a fully renovated resort property, Palms Place remains one of the most compelling value propositions in the market.</p>
                </>
              )}
            </div>
            <div className="overview-aside">
              <div className="quick-facts">
                <h3>Palms Place Hotel and Spa At a Glance</h3>
                {displayStats.map(([label, value, cls]: any) => (
                  <div className="fact-row" key={label}>
                    <span className="fact-label">{label}</span>
                    <span className={`fact-value${cls ? ' ' + cls : ''}`}>{value}</span>
                  </div>
                ))}
              </div>
              <div className="cta-card">
                <p>Ready to explore Palms Place Hotel and Spa? Schedule a private tour of the community and the current listings that match your goals.</p>
                <a href="tel:+17252399950" className="btn-gold">Call 725.239.9950</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="highlights">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Why Palms Place Hotel and Spa</span>
            <h2>What Makes Palms Place Hotel and Spa Stand Out</h2>
          </div>
          <div className="highlights-grid">
            {[
              { title: 'Connected to Palms Resort', body: 'Direct indoor access to the Palms Casino Resort, which underwent a $690 million renovation. World-class dining, entertainment, pool complex, and nightlife at your doorstep.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><line x1="8" y1="6" x2="8" y2="6.01"/><line x1="12" y1="6" x2="12" y2="6.01"/><line x1="16" y1="6" x2="16" y2="6.01"/><line x1="8" y1="10" x2="8" y2="10.01"/><line x1="12" y1="10" x2="12" y2="10.01"/><line x1="16" y1="10" x2="16" y2="10.01"/><line x1="8" y1="14" x2="8" y2="14.01"/><line x1="12" y1="14" x2="12" y2="14.01"/><line x1="16" y1="14" x2="16" y2="14.01"/></svg> },
              { title: 'Condo-Hotel Income', body: 'Individually owned units can be placed in the hotel rental program to generate income from Las Vegas tourism. Flexible use as a primary residence, vacation home, or investment property.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg> },
              { title: 'Private Spa & Pool', body: 'Palms Place has its own dedicated 15,000-square-foot spa and fitness center plus a private resort-style pool separate from the casino hotel\'s pool complex.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
              { title: 'Floor-to-Ceiling Views', body: 'Every unit features floor-to-ceiling windows with views of the Strip, the mountains, or the Las Vegas Valley. Higher floors offer panoramic vistas across the entire metro area.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M8 21l4-11 4 11"/><path d="M2 21l5-14 4 8"/><path d="M14 15l4-8 4 14"/><line x1="2" y1="21" x2="22" y2="21"/></svg> },
              { title: 'Turnkey Furnished', body: 'Units come fully furnished with modern designer interiors, stainless steel kitchen appliances, marble bathrooms, and premium finishes ready for immediate occupancy or rental.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
              { title: 'Accessible Price Point', body: 'One of the most affordable entry points into Las Vegas high-rise condo-hotel ownership, with studios starting around $200,000 and strong rental potential from the tourism market.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
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

      <PalmsPlaceFAQ />

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
              { name: 'Trump International', href: '/trump-international/', price: 'From $200K', compare: '64-story Strip-front condo-hotel with non-gaming environment and five-star amenities.' },
              { name: 'Veer Towers', href: '/veer-towers/', price: 'From $400K', compare: 'CityCenter luxury high-rise condos with direct Strip frontage and modern architecture.' },
              { name: 'Panorama Towers', href: '/panorama-towers/', price: 'From $300K', compare: 'Twin luxury high-rise towers just off the Strip with resort amenities and Strip views.' },
              { name: 'Sky Las Vegas', href: '/sky-las-vegas/', price: 'From $200K', compare: 'Strip-adjacent residential high-rise with full kitchens and a non-gaming environment.' },
              { name: 'The Martin', href: '/the-martin/', price: 'From $300K', compare: '43-story luxury condo tower near CityCenter with spacious layouts and premium finishes.' },
              { name: 'Waldorf Astoria', href: '/waldorf-astoria/', price: 'From $500K', compare: 'Ultra-luxury condo-hotel in CityCenter with Waldorf Astoria five-star branding and services.' },
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
              <h2>Ready to Find Your Palms Place Hotel and Spa Home?</h2>
              <p>Nevada Real Estate Group is the #1 real estate team in Nevada. Whether you&apos;re buying or selling in Palms Place Hotel and Spa, let&apos;s talk.</p>
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
                <input type="hidden" name="_subject" value="Palms Place Hotel and Spa Inquiry — LasVegasHomeSearchExperts.com" />
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
