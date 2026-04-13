import SouthernHighlandsGolfEstatesFAQ from '@/components/SouthernHighlandsGolfEstatesFAQ'
import Link from 'next/link'
import type { Metadata } from 'next'
import SouthernHighlandsGolfEstatesMapWrapper from '@/components/SouthernHighlandsGolfEstatesMapWrapper'
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
    { '@type': 'ListItem', position: 3, name: 'Golf Estates at Southern Highlands', item: 'https://www.lasvegashomesearchexperts.com/southern-highlands-golf-estates/' },
  ],
}

const FAQ_DATA = [
  {
    "q": "What is the price range for homes in the Golf Estates at Southern Highlands?",
    "a": "Homes in the Golf Estates range from approximately $800,000 for semi-custom resale homes to over $3 million for custom estates on premium golf course frontage lots with mountain views."
  },
  {
    "q": "Are the Golf Estates guard-gated?",
    "a": "Yes — the Golf Estates are double guard-gated. Residents pass through the main Southern Highlands community guard gate and then a second dedicated Golf Estates gate. Both are staffed 24 hours a day."
  },
  {
    "q": "What golf course is in the Golf Estates?",
    "a": "The Golf Estates sit directly along the Southern Highlands Golf Club, an 18-hole Jack Nicklaus Signature championship course. The private club includes a Mediterranean clubhouse, dining, pools, tennis, spa, and fitness center."
  },
  {
    "q": "What ZIP code are the Golf Estates in?",
    "a": "The Golf Estates at Southern Highlands are located in ZIP code 89141 in southwest Las Vegas."
  },
  {
    "q": "What are HOA fees in the Golf Estates?",
    "a": "HOA fees typically range from $300 to $700 per month, covering the Southern Highlands master association fee plus the Golf Estates sub-association fee. Fees include guard gate staffing, security patrols, common area maintenance, and landscaping."
  },
  {
    "q": "Do I have to join the golf club?",
    "a": "Golf club membership is not mandatory with home ownership in the Golf Estates, but it is available by application. Many residents join for the dining, fitness, and social benefits as well as the golf."
  },
  {
    "q": "How does the Golf Estates compare to The Estates at Southern Highlands?",
    "a": "Both are double guard-gated enclaves within Southern Highlands. The Estates typically features larger custom homes on larger lots ($2M–$10M+), while the Golf Estates offers a broader range starting at $800K with a mix of semi-custom and custom homes, many with golf course frontage."
  },
  {
    "q": "What schools serve the Golf Estates?",
    "a": "The Golf Estates are served by CCSD schools including John R. Hummel Elementary (8/10), Del E. Webb Middle School (7/10), and Coronado High School. Bishop Gorman High School (A+) is the top private option nearby."
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
  name: 'Golf Estates at Southern Highlands',
  description: 'Golf Estates at Southern Highlands is a guard-gated · golf · luxury community in Las Vegas, Nevada.',
  geo: { '@type': 'GeoCoordinates', latitude: 35.992, longitude: -115.23 },
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
  const cms = await getCommunityPage('southern-highlands-golf-estates')
  return {
    title: cms?.metaTitle ?? 'Golf Estates at Southern Highlands Homes for Sale | Nevada Real Estate Group',
    description: cms?.metaDescription ?? 'Browse Golf Estates at Southern Highlands homes for sale in Las Vegas, NV. $800K–$3M+. Schools, HOA, market stats. Nevada Real Estate Group.',
    alternates: { canonical: 'https://www.lasvegashomesearchexperts.com/southern-highlands-golf-estates' },
  }
}

export default async function SouthernHighlandsGolfEstatesPage() {
  const cms = await getCommunityPage('southern-highlands-golf-estates')
  const market = getMarketStats('southern-highlands-golf-estates')
  const ms = market?.stats

  const heroHeadline = cms?.heroHeadline ?? 'Golf Estates at Southern Highlands'
  const heroSubtitle = 'Homes for Sale in Las Vegas, Nevada'
  const overviewTitle = cms?.overviewTitle ?? 'Golf Estates at Southern Highlands: Guard-Gated · Golf · Luxury Living in Las Vegas'

  const HARDCODED_STATS: Array<[string, string] | [string, string, string]> = [
    ['Established', '2000'],
    ['Developer', 'Olympia Group'],
    ['Total Acreage', '~180 acres'],
    ['Homes', '350+'],
    ['Median Home Price', ms?.medianSalePrice ?? '$800K–$3M+'],
    ['ZIP Codes', '89141'],
    ['Guard-Gated', 'Yes'],
    ['HOA', '$300–$700/mo'],
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
          <span>Golf Estates at Southern Highlands</span>
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
                <span className="hero-v2-stat-num">{ms?.medianSalePrice ?? qs('Median Home Price', '$800K–$3M+')}</span>
                <span className="hero-v2-stat-lbl">Median Sale Price</span>
              </div>
              <div className="hero-v2-stat">
                <span className="hero-v2-stat-num">{ms?.avgDaysToClose ?? qs('Avg Days on Market', '45')}</span>
                <span className="hero-v2-stat-lbl">Avg Days to Close</span>
              </div>
            </div>
            <a href="#listings" className="hero-v2-cta">Search Homes in Golf Estates at Southern Highlands</a>
          </div>
        </div>
      </header>

      <div className="hero-v2-qfb">
        <div className="container">
          <div className="hero-v2-qfb-row">
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <span><strong>ZIP:</strong> 89141</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              <span><strong>Type:</strong> Guard-Gated · Golf · Luxury</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
              <span><strong>Price Range:</strong> $800K–$3M+</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
              <span><strong>HOA:</strong> $300–$700/mo</span>
            </div>
          </div>
          <div className="hero-v2-qfb-est">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            <span>Est. 2000</span>
          </div>
        </div>
      </div>

      <section id="demographics" className="demographics-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Demographics</span>
            <h2>Golf Estates at Southern Highlands Demographics</h2>
          </div>
          <div className="demo-grid">
            {[
              ['~1,000', 'Population'],
              ['52', 'Median Age'],
              ['$225,000+', 'Avg Household Income'],
              ['350+', 'Total Households'],
              ['92%', 'Homeownership Rate'],
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
            <h2>Where is Golf Estates at Southern Highlands?</h2>
            <p>Southern Highlands, Las Vegas &mdash; Las Vegas, Nevada.</p>
          </div>
          <div className="map-container">
            <SouthernHighlandsGolfEstatesMapWrapper />
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
            <h2 className="listings-title">NEW GOLF ESTATES AT SOUTHERN HIGHLANDS LISTINGS</h2>
          </div>
          <div className="ylopo-wrap">
            <div className="YLOPO_searchWidget" />
            <div className="YLOPO_resultsWidget" data-search='{"propertyTypes":["house","condo","townhouse"],"minPrice":800000,"locations":[{"city":"Las Vegas","state":"NV"}],"limit":12,"sortBy":"listDate","sortOrder":"desc","keywords":"Southern Highlands","zipCodes":["89141"]}' />
          </div>
          <p className="ylopo-note">Listing data sourced from regional MLS. Information deemed reliable but not guaranteed. Updated daily.</p>
          <div className="listings-actions">
            <a href="https://search.nevadarealestategroup.net/search?s[orderBy]=sourceCreationDate%2Cdesc&s[page]=1&s[locations][0][city]=Las%20Vegas&s[locations][0][state]=NV&s[keywords]=Southern%20Highlands" target="_blank" rel="noopener noreferrer" className="btn-gold">View All Golf Estates at Southern Highlands Listings &rarr;</a>
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
                  <p>The Golf Estates at Southern Highlands occupy one of the most coveted positions within the Southern Highlands master-planned community — directly along the fairways and greens of the private Jack Nicklaus Signature championship golf course. These guard-gated homes sit behind both the Southern Highlands community gate and their own secondary gate, providing two layers of 24-hour security and creating one of the most private residential enclaves in the southwest valley.</p>
                  <p>Homes in the Golf Estates range from approximately $800,000 for semi-custom resale homes to well over $3 million for the largest custom estates on premium golf course frontage lots. The architectural character blends Mediterranean, Tuscan, and desert contemporary styles, with homes typically ranging from 3,500 to 8,000+ square feet. Many properties feature resort-style pools, outdoor kitchens, motor courts, and direct golf course views from expansive rear patios and covered loggias.</p>
                  <p>As a Golf Estates resident, access to the Southern Highlands Golf Club is the defining lifestyle advantage. The private club features the Nicklaus-designed championship course, a Mediterranean-inspired clubhouse with fine dining, resort-style pools, tennis courts, a spa and fitness center, and a full social calendar. Golf membership is available by application and is one of the most sought-after private memberships in Las Vegas.</p>
                  <p>The Golf Estates benefit from Southern Highlands' exceptional location in the southern foothills of the Las Vegas Valley. The I-15 freeway is minutes away, putting the Strip approximately 15 minutes north and Harry Reid International Airport about 20 minutes away. For buyers who want private golf course living within a prestigious master-planned community at price points that represent genuine value compared to comparable Summerlin properties, the Golf Estates deliver.</p>
                </>
              )}
            </div>
            <div className="overview-aside">
              <div className="quick-facts">
                <h3>Golf Estates at Southern Highlands At a Glance</h3>
                {displayStats.map(([label, value, cls]: any) => (
                  <div className="fact-row" key={label}>
                    <span className="fact-label">{label}</span>
                    <span className={`fact-value${cls ? ' ' + cls : ''}`}>{value}</span>
                  </div>
                ))}
              </div>
              <div className="cta-card">
                <p>Ready to explore Golf Estates at Southern Highlands? Schedule a private tour of the community and the current listings that match your goals.</p>
                <a href="tel:+17252399950" className="btn-gold">Call 725.239.9950</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="highlights">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Why Golf Estates at Southern Highlands</span>
            <h2>What Makes Golf Estates at Southern Highlands Stand Out</h2>
          </div>
          <div className="highlights-grid">
            {[
              { title: 'Nicklaus Golf Course Frontage', body: 'Homes sit directly along the fairways and greens of the private Jack Nicklaus Signature championship course, consistently ranked among the finest in Nevada.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 2v10l7 4"/></svg> },
              { title: 'Double Guard-Gated Security', body: 'Two layers of 24-hour staffed guard gates — the Southern Highlands community gate plus a dedicated Golf Estates gate — provide exceptional privacy and security.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
              { title: 'Private Club Membership', body: 'Access to the Southern Highlands Golf Club with its Mediterranean clubhouse, fine dining, resort pools, tennis courts, spa, and fitness center. Membership by application.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><line x1="8" y1="6" x2="8" y2="6.01"/><line x1="12" y1="6" x2="12" y2="6.01"/><line x1="16" y1="6" x2="16" y2="6.01"/><line x1="8" y1="10" x2="8" y2="10.01"/><line x1="12" y1="10" x2="12" y2="10.01"/><line x1="16" y1="10" x2="16" y2="10.01"/><line x1="8" y1="14" x2="8" y2="14.01"/><line x1="12" y1="14" x2="12" y2="14.01"/><line x1="16" y1="14" x2="16" y2="14.01"/></svg> },
              { title: 'Semi-Custom & Custom Homes', body: 'Homes from 3,500 to 8,000+ square feet in Mediterranean, Tuscan, and desert contemporary styles. Many with resort pools, motor courts, and direct golf course views.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
              { title: 'Mountain & Fairway Views', body: 'Elevated positions with panoramic views of the Spring Mountains and sweeping fairway views across the Nicklaus course. Sunset views are among the best in the south valley.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M8 21l4-11 4 11"/><path d="M2 21l5-14 4 8"/><path d="M14 15l4-8 4 14"/><line x1="2" y1="21" x2="22" y2="21"/></svg> },
              { title: 'Strong Appreciation', body: 'Golf course frontage properties in guard-gated communities consistently outperform the broader market. Limited inventory and strong demand support long-term value.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg> },
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

      <SouthernHighlandsGolfEstatesFAQ />

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
              { name: 'Southern Highlands', href: '/southern-highlands/', price: 'From $400K', compare: 'The broader master-planned community with Jack Nicklaus golf and multiple guard-gated enclaves.' },
              { name: 'The Estates at SH', href: '/southern-highlands-the-estates/', price: 'From $2M', compare: 'Southern Highlands\' ultra-luxury enclave with custom estates on half-acre to full-acre lots.' },
              { name: 'Olympia Ridge', href: '/olympia-ridge/', price: 'From $1.5M', compare: 'Ultra-luxury guard-gated enclave within Southern Highlands with the highest elevation and golf frontage.' },
              { name: 'Tuscan Cliffs', href: '/tuscan-cliffs/', price: 'From $800K', compare: 'Mediterranean-inspired guard-gated enclave with dramatic hillside homesites in Southern Highlands.' },
              { name: 'The Ridges', href: '/summerlin-the-ridges/', price: 'From $2M', compare: 'Summerlin\'s ultra-luxury guard-gated community with Bear\'s Best golf and Red Rock Canyon views.' },
              { name: 'Seven Hills', href: '/seven-hills/', price: 'From $500K', compare: 'Guard-gated Henderson community with Rio Secco golf and panoramic Strip views.' },
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
              <h2>Ready to Find Your Golf Estates at Southern Highlands Home?</h2>
              <p>Nevada Real Estate Group is the #1 real estate team in Nevada. Whether you&apos;re buying or selling in Golf Estates at Southern Highlands, let&apos;s talk.</p>
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
                <input type="hidden" name="_subject" value="Golf Estates at Southern Highlands Inquiry — LasVegasHomeSearchExperts.com" />
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
