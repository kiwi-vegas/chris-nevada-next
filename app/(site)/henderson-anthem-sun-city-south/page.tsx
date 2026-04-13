import HendersonAnthemSunCitySouthFAQ from '@/components/HendersonAnthemSunCitySouthFAQ'
import Link from 'next/link'
import type { Metadata } from 'next'
import HendersonAnthemSunCitySouthMapWrapper from '@/components/HendersonAnthemSunCitySouthMapWrapper'
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
    { '@type': 'ListItem', position: 3, name: 'Sun City Anthem South', item: 'https://www.lasvegashomesearchexperts.com/henderson-anthem-sun-city-south/' },
  ],
}

const FAQ_DATA = [
  {
    "q": "What is the price range for homes in Sun City Anthem South?",
    "a": "Homes range from approximately $350,000 for well-maintained single-story homes to $600,000 for larger floor plans on premium lots with golf course or mountain views."
  },
  {
    "q": "What is the age requirement for Sun City Anthem South?",
    "a": "Sun City Anthem is a 55+ community. At least one member of each household must be 55 years of age or older. Some homes may allow one occupant under 55."
  },
  {
    "q": "What are HOA fees in Sun City Anthem South?",
    "a": "HOA fees range from $180 to $350 per month, covering all three recreation centers, pools, fitness facilities, clubs, social programming, common area maintenance, and landscaping."
  },
  {
    "q": "What amenities are included?",
    "a": "Sun City Anthem South residents have full access to three recreation centers (100,000+ sq ft total), resort-style pools, fitness centers, tennis and pickleball courts, ballrooms, 100+ clubs, and an extensive trail system."
  },
  {
    "q": "Is there golf at Sun City Anthem?",
    "a": "Yes. The Anthem Course and Revere Golf Club at Anthem offer championship desert golf with mountain views. Residents enjoy preferred tee times and rates."
  },
  {
    "q": "What ZIP codes cover Sun City Anthem South?",
    "a": "Sun City Anthem South spans portions of ZIP codes 89044 and 89052 in Henderson, Nevada."
  },
  {
    "q": "How far is Sun City Anthem South from the Strip?",
    "a": "Sun City Anthem South is approximately 25 minutes from the Las Vegas Strip via I-215 and I-15 North."
  },
  {
    "q": "Is Sun City Anthem South a good investment?",
    "a": "Yes. Sun City Anthem consistently ranks among the most desirable 55+ communities in the US. Strong buyer demand, limited inventory, and excellent amenities support long-term property values."
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
  name: 'Sun City Anthem South',
  description: 'Sun City Anthem South is a 55+ active adult community in Henderson, Nevada.',
  geo: { '@type': 'GeoCoordinates', latitude: 35.975, longitude: -115.05 },
  address: { '@type': 'PostalAddress', addressLocality: 'Henderson', addressRegion: 'NV', postalCode: '89044', addressCountry: 'US' },
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
  const cms = await getCommunityPage('henderson-anthem-sun-city-south')
  return {
    title: cms?.metaTitle ?? 'Sun City Anthem South Homes for Sale | Nevada Real Estate Group',
    description: cms?.metaDescription ?? 'Browse Sun City Anthem South homes for sale in Henderson, NV. $350K–$600K. Schools, HOA, market stats. Nevada Real Estate Group.',
  }
}

export default async function HendersonAnthemSunCitySouthPage() {
  const cms = await getCommunityPage('henderson-anthem-sun-city-south')
  const market = getMarketStats('henderson-anthem-sun-city-south')
  const ms = market?.stats

  const heroHeadline = cms?.heroHeadline ?? 'Sun City Anthem South'
  const heroSubtitle = 'Homes for Sale in Henderson, Nevada'
  const overviewTitle = cms?.overviewTitle ?? 'Sun City Anthem South: 55+ Active Adult Living in Henderson'

  const HARDCODED_STATS: Array<[string, string] | [string, string, string]> = [
    ['Established', '2001'],
    ['Developer', 'Del Webb / Pulte Homes'],
    ['Total Acreage', '~800 acres'],
    ['Homes', '2,800+'],
    ['Median Home Price', ms?.medianSalePrice ?? '$350K–$600K'],
    ['ZIP Codes', '89044, 89052'],
    ['Guard-Gated', 'No'],
    ['HOA', '$180–$350/mo'],
  ]
  const displayStats = mergeQuickStats(HARDCODED_STATS, cms?.quickStats)
  const HARDCODED_DRIVE_TIMES = [
    {
        "time": "~25 min",
        "destination": "to the Strip",
        "route": "via I-215 → I-15 North"
    },
    {
        "time": "~25 min",
        "destination": "to Harry Reid Airport",
        "route": "via I-215 West → I-15"
    },
    {
        "time": "~10 min",
        "destination": "to Anthem Marketplace",
        "route": "via Eastern Ave"
    },
    {
        "time": "~15 min",
        "destination": "to Henderson Hospital",
        "route": "via St. Rose Pkwy"
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
          <span>Sun City Anthem South</span>
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
                <span className="hero-v2-stat-num">{ms?.medianSalePrice ?? qs('Median Home Price', '$350K–$600K')}</span>
                <span className="hero-v2-stat-lbl">Median Sale Price</span>
              </div>
              <div className="hero-v2-stat">
                <span className="hero-v2-stat-num">{ms?.avgDaysToClose ?? qs('Avg Days on Market', '45')}</span>
                <span className="hero-v2-stat-lbl">Avg Days to Close</span>
              </div>
            </div>
            <a href="#listings" className="hero-v2-cta">Search Homes in Sun City Anthem South</a>
          </div>
        </div>
      </header>

      <div className="hero-v2-qfb">
        <div className="container">
          <div className="hero-v2-qfb-row">
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <span><strong>ZIP:</strong> 89044, 89052</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              <span><strong>Type:</strong> 55+ Active Adult</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
              <span><strong>Price Range:</strong> $350K–$600K</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
              <span><strong>HOA:</strong> $180–$350/mo</span>
            </div>
          </div>
          <div className="hero-v2-qfb-est">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            <span>Est. 2001</span>
          </div>
        </div>
      </div>

      <section id="demographics" className="demographics-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Demographics</span>
            <h2>Sun City Anthem South Demographics</h2>
          </div>
          <div className="demo-grid">
            {[
              ['6,000+', 'Population'],
              ['68', 'Median Age'],
              ['$75,000', 'Avg Household Income'],
              ['2,800+', 'Total Households'],
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
            <h2>Where is Sun City Anthem South?</h2>
            <p>Sun City Anthem, Henderson &mdash; Henderson, Nevada.</p>
          </div>
          <div className="map-container">
            <HendersonAnthemSunCitySouthMapWrapper />
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
            <h2 className="listings-title">NEW SUN CITY ANTHEM SOUTH LISTINGS</h2>
          </div>
          <div className="ylopo-wrap">
            <div className="YLOPO_searchWidget" />
            <div className="YLOPO_resultsWidget" data-search='{"propertyTypes":["house","condo","townhouse"],"minPrice":300000,"locations":[{"city":"Henderson","state":"NV"}],"limit":12,"sortBy":"listDate","sortOrder":"desc","keywords":"Sun City Anthem","zipCodes":["89044","89052"]}' />
          </div>
          <p className="ylopo-note">Listing data sourced from regional MLS. Information deemed reliable but not guaranteed. Updated daily.</p>
          <div className="listings-actions">
            <a href="https://search.nevadarealestategroup.net/search?s[orderBy]=sourceCreationDate%2Cdesc&s[page]=1&s[locations][0][city]=Henderson&s[locations][0][state]=NV&s[keywords]=Sun%20City%20Anthem" target="_blank" rel="noopener noreferrer" className="btn-gold">View All Sun City Anthem South Listings &rarr;</a>
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
                  <p>Sun City Anthem South is the southern expansion phase of the celebrated Sun City Anthem 55+ active adult community in Henderson. Developed by Del Webb beginning in 2001, this section extends the Sun City Anthem experience into the foothills of the McCullough Range, providing residents with slightly more elevated terrain, wider lot options, and dramatic desert views that complement the broader community's renowned amenity package.</p>
                  <p>Residents of Sun City Anthem South enjoy full access to all three Sun City Anthem recreation centers — the Anthem Center, Liberty Center, and Independence Center — totaling over 100,000 square feet of amenity space. This includes resort-style pools, fitness facilities, tennis and pickleball courts, ballrooms, arts studios, and meeting rooms for the community's 100+ chartered clubs and organizations. The social calendar is one of the most active of any 55+ community in the United States.</p>
                  <p>Homes in Sun City Anthem South range from approximately $350,000 for well-maintained single-story homes to $600,000 for larger floor plans on premium lots with golf course or mountain views. Virtually every home is single-story, designed for comfort and accessibility with open floor plans, covered patios, and attached two-car garages. Floor plans range from approximately 1,200 to 3,200 square feet.</p>
                  <p>The southern section's location provides convenient access to the Sun City Anthem golf courses, including the Anthem Course and the Revere Golf Club at Anthem. The community trail system extends into this section, connecting to Henderson's broader trail network for walking and cycling. The proximity to I-215 and the growing commercial corridor along Eastern Avenue ensures that shopping, dining, and medical services are within a short drive.</p>
                </>
              )}
            </div>
            <div className="overview-aside">
              <div className="quick-facts">
                <h3>Sun City Anthem South At a Glance</h3>
                {displayStats.map(([label, value, cls]: any) => (
                  <div className="fact-row" key={label}>
                    <span className="fact-label">{label}</span>
                    <span className={`fact-value${cls ? ' ' + cls : ''}`}>{value}</span>
                  </div>
                ))}
              </div>
              <div className="cta-card">
                <p>Ready to explore Sun City Anthem South? Schedule a private tour of the community and the current listings that match your goals.</p>
                <a href="tel:+17252399950" className="btn-gold">Call 725.239.9950</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="highlights">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Why Sun City Anthem South</span>
            <h2>What Makes Sun City Anthem South Stand Out</h2>
          </div>
          <div className="highlights-grid">
            {[
              { title: 'Three Recreation Centers', body: 'Full access to Sun City Anthem\'s 100,000+ sq ft of amenity space — resort pools, fitness, tennis, pickleball, ballrooms, and arts studios across three centers.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><line x1="8" y1="6" x2="8" y2="6.01"/><line x1="12" y1="6" x2="12" y2="6.01"/><line x1="16" y1="6" x2="16" y2="6.01"/><line x1="8" y1="10" x2="8" y2="10.01"/><line x1="12" y1="10" x2="12" y2="10.01"/><line x1="16" y1="10" x2="16" y2="10.01"/><line x1="8" y1="14" x2="8" y2="14.01"/><line x1="12" y1="14" x2="12" y2="14.01"/><line x1="16" y1="14" x2="16" y2="14.01"/></svg> },
              { title: '100+ Clubs & Activities', body: 'One of the most active social calendars in the country. From travel clubs to art guilds to pickleball leagues, there is something for every interest.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22c4-4 8-7.5 8-12a8 8 0 10-16 0c0 4.5 4 8 8 12z"/><circle cx="12" cy="10" r="3"/></svg> },
              { title: 'Single-Story Living', body: 'Virtually every home is single-story, designed for comfort and accessibility. Floor plans from 1,200 to 3,200+ square feet with covered patios.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
              { title: 'Golf Course Access', body: 'Preferred access to the Anthem Course and Revere Golf Club at Anthem. Championship desert golf with mountain views and resident-preferred tee times.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 2v10l7 4"/></svg> },
              { title: 'Mountain Views', body: 'Elevated foothills terrain provides dramatic views of the McCullough Range and the Las Vegas Valley from many homes throughout the section.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M8 21l4-11 4 11"/><path d="M2 21l5-14 4 8"/><path d="M14 15l4-8 4 14"/><line x1="2" y1="21" x2="22" y2="21"/></svg> },
              { title: 'Strong Resale', body: 'Sun City Anthem consistently ranks among the most desirable 55+ communities in the country. Strong demand and limited inventory support property values.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg> },
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

      <HendersonAnthemSunCitySouthFAQ />

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
              { name: 'Sun City Anthem', href: '/sun-city-anthem/', price: 'From $350K', compare: 'The broader 55+ community with all three recreation centers and two golf courses.' },
              { name: 'Anthem', href: '/anthem/', price: 'From $400K', compare: 'The broader Anthem master plan encompassing Village, Country Club, and Sun City sections.' },
              { name: 'Solera at Anthem', href: '/solera-at-anthem/', price: 'From $375K', compare: 'Smaller 55+ enclave within Anthem with its own community amenities.' },
              { name: 'Inspirada', href: '/inspirada/', price: 'From $400K', compare: 'Newer master-planned community to the south with contemporary design and resort amenities.' },
              { name: 'Madeira Canyon', href: '/madeira-canyon/', price: 'From $500K', compare: 'Guard-gated community adjacent to Anthem with canyon views and premium homes.' },
              { name: 'Seven Hills', href: '/seven-hills/', price: 'From $500K', compare: 'Premium master-planned community to the north with golf and elevated views.' },
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
              <h2>Ready to Find Your Sun City Anthem South Home?</h2>
              <p>Nevada Real Estate Group is the #1 real estate team in Nevada. Whether you&apos;re buying or selling in Sun City Anthem South, let&apos;s talk.</p>
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
                <input type="hidden" name="_subject" value="Sun City Anthem South Inquiry — LasVegasHomeSearchExperts.com" />
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
