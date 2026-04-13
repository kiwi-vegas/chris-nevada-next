import DowntownLasVegasFAQ from '@/components/DowntownLasVegasFAQ'
import Link from 'next/link'
import type { Metadata } from 'next'
import DowntownLasVegasMapWrapper from '@/components/DowntownLasVegasMapWrapper'
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
    { '@type': 'ListItem', position: 3, name: 'Downtown Las Vegas', item: 'https://www.lasvegashomesearchexperts.com/downtown-las-vegas/' },
  ],
}

const FAQ_DATA = [
  {
    "q": "What is the price range for homes in Downtown Las Vegas?",
    "a": "Downtown Las Vegas offers an extraordinary range: loft condos and mid-rise units start around $200,000, while historic estates in the Scotch 80s can exceed $5 million. High-rise condos at buildings like Juhl and The Ogden range from $200K to $700K+."
  },
  {
    "q": "Is Downtown Las Vegas a good investment?",
    "a": "Downtown Las Vegas is one of the most compelling investment markets in the valley. It remains undervalued compared to comparable urban cores in other major cities. Ongoing development, cultural momentum, and proximity to the Strip support strong appreciation potential."
  },
  {
    "q": "What ZIP codes cover Downtown Las Vegas?",
    "a": "Downtown Las Vegas primarily falls within ZIP codes 89101, 89104, and 89106. The Arts District and Fremont East are in 89101."
  },
  {
    "q": "What is the Arts District?",
    "a": "The Arts District, also known as 18b, is an 18-block creative corridor south of Fremont Street featuring galleries, breweries, restaurants, murals, and a monthly First Friday arts walk that draws thousands of visitors. It is the epicenter of downtown's revitalization."
  },
  {
    "q": "Are there high-rise condos in Downtown Las Vegas?",
    "a": "Yes. Downtown high-rises include The Ogden (21 stories), Juhl (16 stories), Newport Lofts (22 stories), Soho Lofts (18 stories), Loft 5, and the newer Cello Tower. Prices range from approximately $200K to over $4.5M."
  },
  {
    "q": "What is the Scotch 80s?",
    "a": "The Scotch 80s is Las Vegas' most prestigious vintage neighborhood, named for its location in Section 8, Township 21 South, Range 61 East. It features guard-gated estate lots up to half an acre with mature landscaping and celebrity provenance. Homes range from $800K to $3M+."
  },
  {
    "q": "Is Downtown Las Vegas walkable?",
    "a": "Yes. Downtown Las Vegas is one of the few truly walkable neighborhoods in the valley. Residents can walk to restaurants, galleries, bars, fitness studios, grocery stores, and entertainment without needing a car — unique for Las Vegas."
  },
  {
    "q": "What schools serve Downtown Las Vegas?",
    "a": "Las Vegas Academy of the Arts (9/10 GreatSchools) is the standout public school option. Private options include The Meadows School (A+) and Bishop Gorman High School (A+). Several charter schools also serve the area."
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
  name: 'Downtown Las Vegas',
  description: 'Downtown Las Vegas is a urban hub · arts & entertainment community in Las Vegas, Nevada.',
  geo: { '@type': 'GeoCoordinates', latitude: 36.171, longitude: -115.148 },
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
  const cms = await getCommunityPage('downtown-las-vegas')
  return {
    title: cms?.metaTitle ?? 'Downtown Las Vegas Homes for Sale | Nevada Real Estate Group',
    description: cms?.metaDescription ?? 'Browse Downtown Las Vegas homes for sale in Las Vegas, NV. $200K–$5M+. Schools, HOA, market stats. Nevada Real Estate Group.',
  }
}

export default async function DowntownLasVegasPage() {
  const cms = await getCommunityPage('downtown-las-vegas')
  const market = getMarketStats('downtown-las-vegas')
  const ms = market?.stats

  const heroHeadline = cms?.heroHeadline ?? 'Downtown Las Vegas'
  const heroSubtitle = 'Homes for Sale in Las Vegas, Nevada'
  const overviewTitle = cms?.overviewTitle ?? 'Downtown Las Vegas: Urban Hub · Arts & Entertainment Living in Las Vegas'

  const HARDCODED_STATS: Array<[string, string] | [string, string, string]> = [
    ['Established', '1905'],
    ['Developer', 'Various'],
    ['Total Acreage', '~3,500 acres'],
    ['Homes', '12,000+'],
    ['Median Home Price', ms?.medianSalePrice ?? '$200K–$5M+'],
    ['ZIP Codes', '89101, 89104, 89106'],
    ['Guard-Gated', 'No'],
    ['HOA', '$100–$800/mo'],
  ]
  const displayStats = mergeQuickStats(HARDCODED_STATS, cms?.quickStats)
  const HARDCODED_DRIVE_TIMES = [
    {
        "time": "~5 min",
        "destination": "to the Strip",
        "route": "via Las Vegas Blvd"
    },
    {
        "time": "~15 min",
        "destination": "to Harry Reid Airport",
        "route": "via I-15 South"
    },
    {
        "time": "~20 min",
        "destination": "to Summerlin",
        "route": "via US-95 West"
    },
    {
        "time": "~20 min",
        "destination": "to Henderson",
        "route": "via I-15 → I-215"
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
          <span>Downtown Las Vegas</span>
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
                <span className="hero-v2-stat-num">{ms?.medianSalePrice ?? qs('Median Home Price', '$200K–$5M+')}</span>
                <span className="hero-v2-stat-lbl">Median Sale Price</span>
              </div>
              <div className="hero-v2-stat">
                <span className="hero-v2-stat-num">{ms?.avgDaysToClose ?? qs('Avg Days on Market', '45')}</span>
                <span className="hero-v2-stat-lbl">Avg Days to Close</span>
              </div>
            </div>
            <a href="#listings" className="hero-v2-cta">Search Homes in Downtown Las Vegas</a>
          </div>
        </div>
      </header>

      <div className="hero-v2-qfb">
        <div className="container">
          <div className="hero-v2-qfb-row">
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <span><strong>ZIP:</strong> 89101, 89104, 89106</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              <span><strong>Type:</strong> Urban Hub · Arts & Entertainment</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
              <span><strong>Price Range:</strong> $200K–$5M+</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
              <span><strong>HOA:</strong> $100–$800/mo</span>
            </div>
          </div>
          <div className="hero-v2-qfb-est">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            <span>Est. 1905</span>
          </div>
        </div>
      </div>

      <section id="demographics" className="demographics-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Demographics</span>
            <h2>Downtown Las Vegas Demographics</h2>
          </div>
          <div className="demo-grid">
            {[
              ['45,000+', 'Population'],
              ['38', 'Median Age'],
              ['$55,000', 'Avg Household Income'],
              ['20,000+', 'Total Households'],
              ['35%', 'Homeownership Rate'],
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
            <h2>Where is Downtown Las Vegas?</h2>
            <p>Las Vegas, Nevada &mdash; Las Vegas, Nevada.</p>
          </div>
          <div className="map-container">
            <DowntownLasVegasMapWrapper />
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
            <h2 className="listings-title">NEW DOWNTOWN LAS VEGAS LISTINGS</h2>
          </div>
          <div className="ylopo-wrap">
            <div className="YLOPO_searchWidget" />
            <div className="YLOPO_resultsWidget" data-search='{"propertyTypes":["house","condo","townhouse"],"minPrice":null,"locations":[{"city":"Las Vegas","state":"NV"}],"limit":12,"sortBy":"listDate","sortOrder":"desc","keywords":"Downtown Las Vegas","zipCodes":["89101","89104","89106"]}' />
          </div>
          <p className="ylopo-note">Listing data sourced from regional MLS. Information deemed reliable but not guaranteed. Updated daily.</p>
          <div className="listings-actions">
            <a href="https://search.nevadarealestategroup.net/search?s[orderBy]=sourceCreationDate%2Cdesc&s[page]=1&s[locations][0][city]=Las%20Vegas&s[locations][0][state]=NV&s[keywords]=Downtown%20Las%20Vegas" target="_blank" rel="noopener noreferrer" className="btn-gold">View All Downtown Las Vegas Listings &rarr;</a>
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
                  <p>Downtown Las Vegas is the original heart of the city and one of the most dynamic real estate markets in the entire Las Vegas Valley. Anchored by Fremont Street, the Arts District (18b), and a rapidly expanding roster of mixed-use developments, downtown has transformed from a fading casino corridor into a vibrant urban neighborhood attracting young professionals, creatives, remote workers, and investors seeking walkable city living at a fraction of coastal prices.</p>
                  <p>The revitalization accelerated in the 2010s with Tony Hsieh's Downtown Project, which invested hundreds of millions of dollars into small businesses, restaurants, bars, and co-working spaces in the Fremont East Entertainment District and surrounding blocks. That momentum has continued with major projects like the International Gem Tower, Fremont9, and numerous loft and condo conversions throughout the Arts District. Today downtown Las Vegas offers a genuinely urban lifestyle that simply did not exist a decade ago.</p>
                  <p>Housing in downtown Las Vegas spans an extraordinary range. The Arts District and Fremont East feature loft-style condos, mid-rise developments, and converted vintage buildings starting around $200,000. Historic neighborhoods like John S. Park, Huntridge, and the Scotch 80s surround the core and offer everything from mid-century bungalows to multi-million-dollar estates on half-acre lots behind guard gates. High-rise living is available at The Ogden, Juhl, Newport Lofts, Soho Lofts, and the new Cello Tower.</p>
                  <p>The investment case for downtown Las Vegas is compelling. It remains significantly undervalued compared to comparable urban cores in Phoenix, Austin, and Nashville. The ongoing construction of new residential and mixed-use projects, combined with the proximity to the Strip and improved transit infrastructure, positions downtown for sustained appreciation. For buyers who want walkability, culture, and nightlife without suburban sprawl, downtown Las Vegas is the only real option in the valley.</p>
                </>
              )}
            </div>
            <div className="overview-aside">
              <div className="quick-facts">
                <h3>Downtown Las Vegas At a Glance</h3>
                {displayStats.map(([label, value, cls]: any) => (
                  <div className="fact-row" key={label}>
                    <span className="fact-label">{label}</span>
                    <span className={`fact-value${cls ? ' ' + cls : ''}`}>{value}</span>
                  </div>
                ))}
              </div>
              <div className="cta-card">
                <p>Ready to explore Downtown Las Vegas? Schedule a private tour of the community and the current listings that match your goals.</p>
                <a href="tel:+17252399950" className="btn-gold">Call 725.239.9950</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="highlights">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Why Downtown Las Vegas</span>
            <h2>What Makes Downtown Las Vegas Stand Out</h2>
          </div>
          <div className="highlights-grid">
            {[
              { title: 'Arts District (18b)', body: 'Las Vegas\' premier arts and culture corridor. Galleries, breweries, murals, First Friday events, and a thriving creative community. The epicenter of downtown\'s renaissance.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><line x1="8" y1="6" x2="8" y2="6.01"/><line x1="12" y1="6" x2="12" y2="6.01"/><line x1="16" y1="6" x2="16" y2="6.01"/><line x1="8" y1="10" x2="8" y2="10.01"/><line x1="12" y1="10" x2="12" y2="10.01"/><line x1="16" y1="10" x2="16" y2="10.01"/><line x1="8" y1="14" x2="8" y2="14.01"/><line x1="12" y1="14" x2="12" y2="14.01"/><line x1="16" y1="14" x2="16" y2="14.01"/></svg> },
              { title: 'Fremont East Entertainment', body: 'The original Fremont Street reimagined. Craft cocktail bars, chef-driven restaurants, and live music venues line the pedestrian-friendly blocks east of Las Vegas Boulevard.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22c4-4 8-7.5 8-12a8 8 0 10-16 0c0 4.5 4 8 8 12z"/><circle cx="12" cy="10" r="3"/></svg> },
              { title: 'High-Rise & Loft Living', body: 'Urban residences at The Ogden, Juhl, Newport Lofts, Soho Lofts, and Cello Tower offer panoramic Strip and mountain views with walkable downtown access.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
              { title: 'Historic Neighborhoods', body: 'John S. Park, Huntridge, Scotch 80s, and Beverly Green offer mid-century charm, mature trees, and some of the most architecturally distinctive homes in Las Vegas.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M8 21l4-11 4 11"/><path d="M2 21l5-14 4 8"/><path d="M14 15l4-8 4 14"/><line x1="2" y1="21" x2="22" y2="21"/></svg> },
              { title: 'Walkable Urban Lifestyle', body: 'One of the few truly walkable neighborhoods in Las Vegas. Walk to restaurants, galleries, gyms, grocery stores, and nightlife without ever getting in a car.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
              { title: 'Strong Investment Potential', body: 'Downtown Las Vegas remains undervalued compared to peer urban markets. Ongoing development, improved transit, and cultural momentum drive strong appreciation potential.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg> },
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

      <DowntownLasVegasFAQ />

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
              { name: 'Paradise', href: '/paradise/', price: 'From $250K', compare: 'The unincorporated area surrounding the Strip. Condos, high-rises, and diverse residential neighborhoods.' },
              { name: 'Spring Valley', href: '/spring-valley/', price: 'From $300K', compare: 'Established suburban community west of the Strip with diverse housing and strong retail.' },
              { name: 'Summerlin', href: '/summerlin/', price: 'From $450K', compare: 'The premier master-planned community in the valley. 20+ villages, every price point.' },
              { name: 'The Lakes', href: '/the-lakes/', price: 'From $400K', compare: 'Waterfront community with man-made lakes west of the Strip. Mature trees and resort-style amenities.' },
              { name: 'Enterprise', href: '/enterprise/', price: 'From $350K', compare: 'Growing unincorporated area in southwest Las Vegas with newer construction and family neighborhoods.' },
              { name: 'Henderson', href: '/henderson/', price: 'From $350K', compare: 'The second-largest city in Nevada. Master-planned communities, top schools, and consistently ranked among the safest cities.' },
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
              <h2>Ready to Find Your Downtown Las Vegas Home?</h2>
              <p>Nevada Real Estate Group is the #1 real estate team in Nevada. Whether you&apos;re buying or selling in Downtown Las Vegas, let&apos;s talk.</p>
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
                <input type="hidden" name="_subject" value="Downtown Las Vegas Inquiry — LasVegasHomeSearchExperts.com" />
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
