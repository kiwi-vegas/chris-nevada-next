import CelloTowerFAQ from '@/components/CelloTowerFAQ'
import Link from 'next/link'
import type { Metadata } from 'next'
import CelloTowerMapWrapper from '@/components/CelloTowerMapWrapper'
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
    { '@type': 'ListItem', position: 3, name: 'Cello Tower', item: 'https://www.lasvegashomesearchexperts.com/cello-tower/' },
  ],
}

const FAQ_DATA = [
  {
    "q": "What is the price range for Cello Tower?",
    "a": "Residences in Cello Tower range from approximately $700,000 for entry-level units to over $4.5 million for the most exclusive penthouses with panoramic Strip and mountain views."
  },
  {
    "q": "When will Cello Tower be completed?",
    "a": "Cello Tower is currently under construction in Downtown Las Vegas. It is the first new luxury high-rise in downtown in over 15 years. Contact our team for the latest delivery timeline."
  },
  {
    "q": "How many units are in Cello Tower?",
    "a": "Cello Tower includes 240 residences across multiple floor plan types, from efficient city residences to expansive penthouses."
  },
  {
    "q": "Where is Cello Tower located?",
    "a": "Cello Tower is located in Downtown Las Vegas, near Symphony Park and the Arts District. It is steps from the Smith Center for the Performing Arts, Fremont East, and downtown's growing dining and entertainment corridor."
  },
  {
    "q": "What amenities does Cello Tower offer?",
    "a": "The tower features a rooftop infinity pool and lounge, state-of-the-art fitness center, co-working spaces, private dining and entertainment rooms, concierge services, secure parking, and ground-floor retail."
  },
  {
    "q": "Is there parking at Cello Tower?",
    "a": "Yes. Cello Tower includes secure, dedicated parking for residents. Premium parking options may be available for larger residences and penthouses."
  },
  {
    "q": "What is the Arts District like?",
    "a": "The Las Vegas Arts District, located adjacent to Cello Tower, is a vibrant neighborhood of galleries, breweries, restaurants, vintage shops, and creative studios. Monthly First Friday events attract thousands of visitors."
  },
  {
    "q": "How does Cello Tower compare to Strip high-rises?",
    "a": "Cello Tower offers brand-new construction, modern design, and lower HOA fees compared to aging Strip high-rises like Veer, Panorama, or Waldorf Astoria. Its downtown location provides a more neighborhood-oriented, walkable lifestyle."
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
  name: 'Cello Tower',
  description: 'Cello Tower is a luxury high-rise · new construction community in Las Vegas, Nevada.',
  geo: { '@type': 'GeoCoordinates', latitude: 36.168, longitude: -115.148 },
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
  const cms = await getCommunityPage('cello-tower')
  return {
    title: cms?.metaTitle ?? 'Cello Tower Homes for Sale | Nevada Real Estate Group',
    description: cms?.metaDescription ?? 'Browse Cello Tower homes for sale in Las Vegas, NV. $700K–$4.5M+. Schools, HOA, market stats. Nevada Real Estate Group.',
  }
}

export default async function CelloTowerPage() {
  const cms = await getCommunityPage('cello-tower')
  const market = getMarketStats('cello-tower')
  const ms = market?.stats

  const heroHeadline = cms?.heroHeadline ?? 'Cello Tower'
  const heroSubtitle = 'Homes for Sale in Las Vegas, Nevada'
  const overviewTitle = cms?.overviewTitle ?? 'Cello Tower: Luxury High-Rise · New Construction Living in Las Vegas'

  const HARDCODED_STATS: Array<[string, string] | [string, string, string]> = [
    ['Established', '2025'],
    ['Developer', 'Cello Group'],
    ['Total Acreage', '~2 acres'],
    ['Homes', '240'],
    ['Median Home Price', ms?.medianSalePrice ?? '$700K–$4.5M+'],
    ['ZIP Codes', '89101'],
    ['Guard-Gated', 'Yes'],
    ['HOA', '$500–$2,500/mo'],
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
        "time": "~5 min",
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
          <a href="/#communities">Communities</a>
          <span className="breadcrumb-sep">&rsaquo;</span>
          <span>Cello Tower</span>
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
                <span className="hero-v2-stat-num">{ms?.medianSalePrice ?? qs('Median Home Price', '$700K–$4.5M+')}</span>
                <span className="hero-v2-stat-lbl">Median Sale Price</span>
              </div>
              <div className="hero-v2-stat">
                <span className="hero-v2-stat-num">{ms?.avgDaysToClose ?? qs('Avg Days on Market', '45')}</span>
                <span className="hero-v2-stat-lbl">Avg Days to Close</span>
              </div>
            </div>
            <a href="#listings" className="hero-v2-cta">Search Homes in Cello Tower</a>
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
              <span><strong>Type:</strong> Luxury High-Rise · New Construction</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
              <span><strong>Price Range:</strong> $700K–$4.5M+</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
              <span><strong>HOA:</strong> $500–$2,500/mo</span>
            </div>
          </div>
          <div className="hero-v2-qfb-est">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            <span>Est. 2025</span>
          </div>
        </div>
      </div>

      <section id="demographics" className="demographics-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Demographics</span>
            <h2>Cello Tower Demographics</h2>
          </div>
          <div className="demo-grid">
            {[
              ['~500 (projected)', 'Population'],
              ['40', 'Median Age'],
              ['$175,000+', 'Avg Household Income'],
              ['240', 'Total Households'],
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
            <h2>Where is Cello Tower?</h2>
            <p>Downtown Las Vegas &mdash; Las Vegas, Nevada.</p>
          </div>
          <div className="map-container">
            <CelloTowerMapWrapper />
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
            <h2 className="listings-title">NEW CELLO TOWER LISTINGS</h2>
          </div>
          <div className="ylopo-wrap">
            <div className="YLOPO_searchWidget" />
            <div className="YLOPO_resultsWidget" data-search='{"propertyTypes":["house","condo","townhouse"],"minPrice":700000,"locations":[{"city":"Las Vegas","state":"NV"}],"limit":12,"sortBy":"listDate","sortOrder":"desc","keywords":"Cello Tower Downtown","zipCodes":["89101"]}' />
          </div>
          <p className="ylopo-note">Listing data sourced from regional MLS. Information deemed reliable but not guaranteed. Updated daily.</p>
          <div className="listings-actions">
            <a href="https://search.nevadarealestategroup.net/search?s[orderBy]=sourceCreationDate%2Cdesc&s[page]=1&s[locations][0][city]=Las%20Vegas&s[locations][0][state]=NV&s[keywords]=Cello%20Tower%20Downtown" target="_blank" rel="noopener noreferrer" className="btn-gold">View All Cello Tower Listings &rarr;</a>
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
                  <p>Cello Tower is the first new luxury high-rise condominium development to break ground in Downtown Las Vegas in over 15 years, signaling a new era of urban luxury living in the heart of the city. Rising above the intersection of Symphony Park and the Arts District, this 240-unit tower is bringing a level of residential sophistication to downtown that was previously only available on the Las Vegas Strip or in suburban guard-gated communities.</p>
                  <p>The project features residences ranging from approximately $700,000 for studio and one-bedroom units to over $4.5 million for the tower's most exclusive penthouses. Every unit is designed with floor-to-ceiling glass, premium finishes, and smart home technology. The building's architecture makes a deliberate statement — a modern glass tower that adds to the evolving downtown skyline while complementing the nearby Smith Center for the Performing Arts and the World Market Center.</p>
                  <p>Residents of Cello Tower will have access to resort-caliber amenities including a rooftop infinity pool and lounge, state-of-the-art fitness center, private dining and entertainment spaces, co-working facilities, concierge services, and secure parking. The building's ground-floor retail component will bring curated dining and shopping directly to residents' doorsteps.</p>
                  <p>Cello Tower's location in Downtown Las Vegas positions residents at the epicenter of the city's cultural renaissance. The Arts District, Fremont East, Symphony Park, and the forthcoming developments along the UNLV Medical District corridor are transforming downtown into a vibrant urban neighborhood. For buyers seeking a walkable, culturally rich lifestyle that is distinctly different from suburban Las Vegas, Cello Tower represents the most compelling opportunity in the market.</p>
                </>
              )}
            </div>
            <div className="overview-aside">
              <div className="quick-facts">
                <h3>Cello Tower At a Glance</h3>
                {displayStats.map(([label, value, cls]: any) => (
                  <div className="fact-row" key={label}>
                    <span className="fact-label">{label}</span>
                    <span className={`fact-value${cls ? ' ' + cls : ''}`}>{value}</span>
                  </div>
                ))}
              </div>
              <div className="cta-card">
                <p>Ready to explore Cello Tower? Schedule a private tour of the community and the current listings that match your goals.</p>
                <a href="tel:+17252399950" className="btn-gold">Call 725.239.9950</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="highlights">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Why Cello Tower</span>
            <h2>What Makes Cello Tower Stand Out</h2>
          </div>
          <div className="highlights-grid">
            {[
              { title: 'First in 15 Years', body: 'The first new luxury high-rise to break ground in Downtown Las Vegas in over 15 years, marking a milestone in the city\'s urban residential renaissance.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><line x1="8" y1="6" x2="8" y2="6.01"/><line x1="12" y1="6" x2="12" y2="6.01"/><line x1="16" y1="6" x2="16" y2="6.01"/><line x1="8" y1="10" x2="8" y2="10.01"/><line x1="12" y1="10" x2="12" y2="10.01"/><line x1="16" y1="10" x2="16" y2="10.01"/><line x1="8" y1="14" x2="8" y2="14.01"/><line x1="12" y1="14" x2="12" y2="14.01"/><line x1="16" y1="14" x2="16" y2="14.01"/></svg> },
              { title: 'Rooftop Infinity Pool', body: 'Resort-style rooftop amenity deck with infinity pool, lounge areas, and panoramic views of the Strip, mountains, and downtown skyline.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
              { title: 'Floor-to-Ceiling Glass', body: 'Every residence features floor-to-ceiling glass walls with panoramic views, premium finishes, and integrated smart home technology.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
              { title: 'Arts District Location', body: 'Steps from the Arts District, Fremont East, Smith Center for the Performing Arts, and downtown\'s growing dining and entertainment scene.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
              { title: 'Concierge Living', body: 'Full-service concierge, secure parking, fitness center, co-working spaces, private dining rooms, and ground-floor retail.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
              { title: 'Urban Investment Opportunity', body: 'Downtown Las Vegas is undergoing a multi-billion-dollar transformation. Cello Tower positions buyers at the center of one of the fastest-appreciating urban corridors in the West.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg> },
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

      <CelloTowerFAQ />

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
              { name: 'The Ogden', href: '/the-ogden/', price: 'From $200K', compare: 'Established downtown high-rise with city views. More accessible price point.' },
              { name: 'Juhl', href: '/juhl/', price: 'From $200K', compare: 'Boutique loft-style condos in the Arts District with walkable urban living.' },
              { name: 'Soho Lofts', href: '/soho-lofts/', price: 'From $250K', compare: 'Industrial-chic loft condos in the Arts District with urban character.' },
              { name: 'One Queensridge Place', href: '/one-queensridge-place/', price: 'From $500K', compare: 'Luxury high-rise towers in Queensridge — suburban luxury vs. urban living.' },
              { name: 'Veer Towers', href: '/veer-towers/', price: 'From $400K', compare: 'CityCenter Strip high-rise with resort amenities. Different lifestyle profile.' },
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
              <h2>Ready to Find Your Cello Tower Home?</h2>
              <p>Nevada Real Estate Group is the #1 real estate team in Nevada. Whether you&apos;re buying or selling in Cello Tower, let&apos;s talk.</p>
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
                <input type="hidden" name="_subject" value="Cello Tower Inquiry — LasVegasHomeSearchExperts.com" />
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
