import LasVegasArtsDistrictFAQ from '@/components/LasVegasArtsDistrictFAQ'
import Link from 'next/link'
import type { Metadata } from 'next'
import LasVegasArtsDistrictMapWrapper from '@/components/LasVegasArtsDistrictMapWrapper'
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
    { '@type': 'ListItem', position: 3, name: 'Arts District / 18b', item: 'https://www.lasvegashomesearchexperts.com/las-vegas-arts-district/' },
  ],
}

const FAQ_DATA = [
  {
    "q": "What is the price range in the Arts District?",
    "a": "Homes in the Arts District range from approximately $200,000 for studio condos and lofts to $800,000+ for custom modern homes and premium conversions. The average unit sells between $300K and $500K."
  },
  {
    "q": "Where is the Arts District in Las Vegas?",
    "a": "The Arts District (18b) occupies 18 blocks in Downtown Las Vegas, bounded approximately by Las Vegas Boulevard, I-15, Charleston Boulevard, and Sahara Avenue. It is just south of Fremont Street."
  },
  {
    "q": "What is First Friday?",
    "a": "First Friday is a monthly arts walk held on the first Friday of every month in the Arts District. Galleries open their doors, food trucks line the streets, live music plays, and thousands of visitors explore the district's creative culture."
  },
  {
    "q": "Is the Arts District safe?",
    "a": "The Arts District has improved significantly in recent years with increased foot traffic, business investment, and residential development. As with any urban neighborhood, awareness is important. The active street life and growing resident base contribute to safety."
  },
  {
    "q": "What types of housing are in the Arts District?",
    "a": "The Arts District offers converted industrial lofts, modern townhomes, mid-century home renovations, new construction condos, and mixed-use live/work spaces. It is one of the most architecturally diverse neighborhoods in Las Vegas."
  },
  {
    "q": "Is the Arts District walkable?",
    "a": "Yes. The Arts District is one of the only truly walkable neighborhoods in Las Vegas. Residents can walk to galleries, restaurants, breweries, coffee shops, and nightlife destinations within the district."
  },
  {
    "q": "Is the Arts District a good investment?",
    "a": "The Arts District has seen some of the strongest appreciation in the Las Vegas metro as the neighborhood continues to develop. The unique character, downtown location, and limited inventory create favorable conditions for long-term value growth."
  },
  {
    "q": "What are HOA fees in the Arts District?",
    "a": "HOA fees vary widely from $100 to $400 per month depending on the building type. Condo and loft buildings typically have higher fees covering shared amenities. Standalone homes and townhomes may have lower or no HOA fees."
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
  name: 'Arts District / 18b',
  description: 'Arts District / 18b is a urban · creative · mixed-use community in Las Vegas, Nevada.',
  geo: { '@type': 'GeoCoordinates', latitude: 36.155, longitude: -115.157 },
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
  const cms = await getCommunityPage('las-vegas-arts-district')
  return {
    title: cms?.metaTitle ?? 'Arts District / 18b Homes for Sale | Nevada Real Estate Group',
    description: cms?.metaDescription ?? 'Browse Arts District / 18b homes for sale in Las Vegas, NV. $200K–$800K. Schools, HOA, market stats. Nevada Real Estate Group.',
    alternates: { canonical: 'https://www.lasvegashomesearchexperts.com/las-vegas-arts-district' },
  }
}

export default async function LasVegasArtsDistrictPage() {
  const cms = await getCommunityPage('las-vegas-arts-district')
  const market = getMarketStats('las-vegas-arts-district')
  const ms = market?.stats

  const heroHeadline = cms?.heroHeadline ?? 'Arts District / 18b'
  const heroSubtitle = 'Homes for Sale in Las Vegas, Nevada'
  const overviewTitle = cms?.overviewTitle ?? 'Arts District / 18b: Urban · Creative · Mixed-Use Living in Las Vegas'

  const HARDCODED_STATS: Array<[string, string] | [string, string, string]> = [
    ['Established', '1998'],
    ['Developer', 'Various Developers / City of Las Vegas'],
    ['Total Acreage', '~18 blocks'],
    ['Homes', '1,500+'],
    ['Median Home Price', ms?.medianSalePrice ?? '$200K–$800K'],
    ['ZIP Codes', '89101, 89102'],
    ['Guard-Gated', 'No'],
    ['HOA', '$100–$400/mo'],
  ]
  const displayStats = mergeQuickStats(HARDCODED_STATS, cms?.quickStats)
  const HARDCODED_DRIVE_TIMES = [
    {
        "time": "~5 min",
        "destination": "to Downtown Las Vegas",
        "route": "via Las Vegas Blvd North"
    },
    {
        "time": "~10 min",
        "destination": "to the Strip",
        "route": "via Las Vegas Blvd South"
    },
    {
        "time": "~15 min",
        "destination": "to Harry Reid Airport",
        "route": "via I-15 South"
    },
    {
        "time": "~10 min",
        "destination": "to UNLV",
        "route": "via Maryland Pkwy"
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
          <span>Arts District / 18b</span>
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
                <span className="hero-v2-stat-num">{ms?.medianSalePrice ?? qs('Median Home Price', '$200K–$800K')}</span>
                <span className="hero-v2-stat-lbl">Median Sale Price</span>
              </div>
              <div className="hero-v2-stat">
                <span className="hero-v2-stat-num">{ms?.avgDaysToClose ?? qs('Avg Days on Market', '45')}</span>
                <span className="hero-v2-stat-lbl">Avg Days to Close</span>
              </div>
            </div>
            <a href="#listings" className="hero-v2-cta">Search Homes in Arts District / 18b</a>
          </div>
        </div>
      </header>

      <div className="hero-v2-qfb">
        <div className="container">
          <div className="hero-v2-qfb-row">
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <span><strong>ZIP:</strong> 89101, 89102</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              <span><strong>Type:</strong> Urban · Creative · Mixed-Use</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
              <span><strong>Price Range:</strong> $200K–$800K</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
              <span><strong>HOA:</strong> $100–$400/mo</span>
            </div>
          </div>
          <div className="hero-v2-qfb-est">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            <span>Est. 1998</span>
          </div>
        </div>
      </div>

      <section id="demographics" className="demographics-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Demographics</span>
            <h2>Arts District / 18b Demographics</h2>
          </div>
          <div className="demo-grid">
            {[
              ['4,000+', 'Population'],
              ['35', 'Median Age'],
              ['$48,000', 'Avg Household Income'],
              ['1,500+', 'Total Households'],
              ['30%', 'Homeownership Rate'],
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
            <h2>Where is Arts District / 18b?</h2>
            <p>Downtown Las Vegas, Nevada &mdash; Las Vegas, Nevada.</p>
          </div>
          <div className="map-container">
            <LasVegasArtsDistrictMapWrapper />
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
            <h2 className="listings-title">NEW ARTS DISTRICT / 18B LISTINGS</h2>
          </div>
          <div className="ylopo-wrap">
            <div className="YLOPO_searchWidget" />
            <div className="YLOPO_resultsWidget" data-search='{"propertyTypes":["house","condo","townhouse"],"minPrice":200000,"locations":[{"city":"Las Vegas","state":"NV"}],"limit":12,"sortBy":"listDate","sortOrder":"desc","keywords":"Arts District Downtown Las Vegas","zipCodes":["89101","89102"]}' />
          </div>
          <p className="ylopo-note">Listing data sourced from regional MLS. Information deemed reliable but not guaranteed. Updated daily.</p>
          <div className="listings-actions">
            <a href="https://search.nevadarealestategroup.net/search?s[orderBy]=sourceCreationDate%2Cdesc&s[page]=1&s[locations][0][city]=Las%20Vegas&s[locations][0][state]=NV&s[keywords]=Arts%20District%20Downtown%20Las%20Vegas" target="_blank" rel="noopener noreferrer" className="btn-gold">View All Arts District / 18b Listings &rarr;</a>
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
                  <p>The Arts District — officially known as 18b, the Las Vegas Arts District — is an 18-block creative and cultural neighborhood in Downtown Las Vegas, bounded approximately by Las Vegas Boulevard to the east, Interstate 15 to the west, Charleston Boulevard to the north, and Sahara Avenue to the south. Designated by the City of Las Vegas in 1998, the district has undergone a remarkable transformation from an industrial area to one of the most vibrant and exciting neighborhoods in the valley.</p>
                  <p>The Arts District features a distinctive mix of galleries, studios, breweries, cocktail bars, vintage shops, street art, and creative businesses alongside a growing residential inventory that includes converted lofts, modern townhomes, mid-century renovations, and ground-up contemporary construction. Housing ranges from approximately $200,000 for studio condos and lofts to $800,000+ for custom modern homes and premium loft conversions.</p>
                  <p>First Friday — the monthly arts walk that draws thousands of visitors — has become one of Las Vegas' signature cultural events, and the surrounding businesses and restaurants have created a year-round neighborhood energy that extends well beyond the monthly event. The district's brewery scene (Able Baker, Astronomy Alehouse, Nevada Brew Works), cocktail bars (Velveteen Rabbit, Herbs & Rye), and restaurants have made it a dining and nightlife destination in its own right.</p>
                  <p>For buyers seeking an urban, walkable, creative lifestyle that is distinctly different from Las Vegas' master-planned suburbs, the Arts District offers something truly unique. The neighborhood attracts artists, entrepreneurs, young professionals, remote workers, and lifestyle-focused buyers who value character, walkability, and proximity to Downtown's growing employment and entertainment scene. Property values have appreciated significantly as the district matures, though entry points remain accessible compared to comparable urban neighborhoods in other major metros.</p>
                </>
              )}
            </div>
            <div className="overview-aside">
              <div className="quick-facts">
                <h3>Arts District / 18b At a Glance</h3>
                {displayStats.map(([label, value, cls]: any) => (
                  <div className="fact-row" key={label}>
                    <span className="fact-label">{label}</span>
                    <span className={`fact-value${cls ? ' ' + cls : ''}`}>{value}</span>
                  </div>
                ))}
              </div>
              <div className="cta-card">
                <p>Ready to explore Arts District / 18b? Schedule a private tour of the community and the current listings that match your goals.</p>
                <a href="tel:+17252399950" className="btn-gold">Call 725.239.9950</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="highlights">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Why Arts District / 18b</span>
            <h2>What Makes Arts District / 18b Stand Out</h2>
          </div>
          <div className="highlights-grid">
            {[
              { title: 'Creative & Cultural Hub', body: '18 blocks of galleries, studios, street art, and creative businesses. First Friday arts walk draws thousands monthly. A living cultural district unlike anything else in Las Vegas.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><line x1="8" y1="6" x2="8" y2="6.01"/><line x1="12" y1="6" x2="12" y2="6.01"/><line x1="16" y1="6" x2="16" y2="6.01"/><line x1="8" y1="10" x2="8" y2="10.01"/><line x1="12" y1="10" x2="12" y2="10.01"/><line x1="16" y1="10" x2="16" y2="10.01"/><line x1="8" y1="14" x2="8" y2="14.01"/><line x1="12" y1="14" x2="12" y2="14.01"/><line x1="16" y1="14" x2="16" y2="14.01"/></svg> },
              { title: 'Walkable Urban Living', body: 'One of the only truly walkable neighborhoods in Las Vegas. Walk to galleries, breweries, restaurants, and nightlife from your front door.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22c4-4 8-7.5 8-12a8 8 0 10-16 0c0 4.5 4 8 8 12z"/><circle cx="12" cy="10" r="3"/></svg> },
              { title: 'Diverse Housing Stock', body: 'Converted lofts, modern townhomes, mid-century renovations, and new construction. From $200K studio condos to $800K+ custom modern homes.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
              { title: 'Brewery & Dining Scene', body: 'Craft breweries, cocktail bars, and chef-driven restaurants throughout the district. Able Baker, Astronomy Alehouse, Velveteen Rabbit, and more.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><line x1="8" y1="6" x2="8" y2="6.01"/><line x1="12" y1="6" x2="12" y2="6.01"/><line x1="16" y1="6" x2="16" y2="6.01"/><line x1="8" y1="10" x2="8" y2="10.01"/><line x1="12" y1="10" x2="12" y2="10.01"/><line x1="16" y1="10" x2="16" y2="10.01"/><line x1="8" y1="14" x2="8" y2="14.01"/><line x1="12" y1="14" x2="12" y2="14.01"/><line x1="16" y1="14" x2="16" y2="14.01"/></svg> },
              { title: 'Downtown Proximity', body: 'Adjacent to Downtown Las Vegas, Fremont East, and the emerging DTLV tech and startup scene. Walking distance to downtown employment and entertainment.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><line x1="8" y1="6" x2="8" y2="6.01"/><line x1="12" y1="6" x2="12" y2="6.01"/><line x1="16" y1="6" x2="16" y2="6.01"/><line x1="8" y1="10" x2="8" y2="10.01"/><line x1="12" y1="10" x2="12" y2="10.01"/><line x1="16" y1="10" x2="16" y2="10.01"/><line x1="8" y1="14" x2="8" y2="14.01"/><line x1="12" y1="14" x2="12" y2="14.01"/><line x1="16" y1="14" x2="16" y2="14.01"/></svg> },
              { title: 'Rapid Appreciation', body: 'The Arts District has experienced some of the strongest appreciation in the Las Vegas metro as the neighborhood matures. Early buyers have seen significant returns.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg> },
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

      <LasVegasArtsDistrictFAQ />

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
              { name: 'Downtown Las Vegas', href: '/downtown-las-vegas/', price: 'From $200K', compare: 'The broader downtown area including Fremont East, Huntridge, and emerging DTLV neighborhoods.' },
              { name: 'Scotch 80s', href: '/scotch-80s/', price: 'From $800K', compare: 'Historic guard-gated neighborhood nearby with vintage luxury homes and celebrity history.' },
              { name: 'Chinatown', href: '/las-vegas-chinatown/', price: 'From $250K', compare: 'Premier dining district to the west with diverse Asian cuisine and cultural vibrancy.' },
              { name: 'Spring Valley', href: '/spring-valley/', price: 'From $300K', compare: 'Suburban community to the southwest with more traditional neighborhood character.' },
              { name: 'The Ogden', href: '/the-ogden/', price: 'From $200K', compare: 'Downtown high-rise condo with urban living and Fremont Street views.' },
              { name: 'Juhl', href: '/juhl/', price: 'From $200K', compare: 'Downtown condo community with loft-style units and a creative community focus.' },
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
              <h2>Ready to Find Your Arts District / 18b Home?</h2>
              <p>Nevada Real Estate Group is the #1 real estate team in Nevada. Whether you&apos;re buying or selling in Arts District / 18b, let&apos;s talk.</p>
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
                <input type="hidden" name="_subject" value="Arts District / 18b Inquiry — LasVegasHomeSearchExperts.com" />
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
