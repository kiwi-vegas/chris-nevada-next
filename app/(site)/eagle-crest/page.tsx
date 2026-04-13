import EagleCrestFAQ from '@/components/EagleCrestFAQ'
import Link from 'next/link'
import type { Metadata } from 'next'
import EagleCrestMapWrapper from '@/components/EagleCrestMapWrapper'
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
    { '@type': 'ListItem', position: 3, name: 'Eagle Crest', item: 'https://www.lasvegashomesearchexperts.com/eagle-crest/' },
  ],
}

const FAQ_DATA = [
  {
    "q": "What is Eagle Crest?",
    "a": "Eagle Crest is one of three golf courses within Sun City Summerlin, the valley's largest 55+ community. It is an 18-hole executive-length (par 60) course designed by Billy Casper and Greg Nash. Homes surrounding the course benefit from fairway views and open space."
  },
  {
    "q": "What is the price range for homes near Eagle Crest?",
    "a": "Homes along the Eagle Crest golf course corridor range from approximately $400,000 to $700,000. Golf course-front homes command premiums for their fairway views and setback from neighbors."
  },
  {
    "q": "Is Eagle Crest part of Sun City Summerlin?",
    "a": "Yes. Eagle Crest is one of three golf courses within the Sun City Summerlin 55+ community. Residents have full access to all Sun City Summerlin amenities including four recreation centers, pools, fitness, and 100+ clubs."
  },
  {
    "q": "What is the age requirement for Eagle Crest?",
    "a": "As part of Sun City Summerlin, Eagle Crest follows the 55+ age requirement — at least one resident must be 55 or older, and no permanent residents under 19 are permitted."
  },
  {
    "q": "How does Eagle Crest compare to Highland Falls and Palm Valley?",
    "a": "Eagle Crest is the executive-length course (par 60, shorter) while Highland Falls and Palm Valley are full championship-length courses (par 72). Eagle Crest is popular with walkers and daily golfers who prefer a quicker round. All three courses are available to Sun City Summerlin residents."
  },
  {
    "q": "What are HOA fees at Eagle Crest?",
    "a": "As part of Sun City Summerlin, HOA fees range from $180 to $350 per month. Fees cover access to all four recreation centers, pools, fitness facilities, common area maintenance, and community programming."
  },
  {
    "q": "What ZIP code is Eagle Crest in?",
    "a": "Eagle Crest is in ZIP code 89134 in Summerlin, Las Vegas."
  },
  {
    "q": "Can non-residents play Eagle Crest?",
    "a": "The Sun City Summerlin golf courses are open to the public, but residents receive preferred tee times and discounted rates. Eagle Crest is a particularly popular choice for senior golfers due to its walkable executive layout."
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
  name: 'Eagle Crest',
  description: 'Eagle Crest is a 55+ · golf community community in Las Vegas, Nevada.',
  geo: { '@type': 'GeoCoordinates', latitude: 36.205, longitude: -115.295 },
  address: { '@type': 'PostalAddress', addressLocality: 'Las Vegas', addressRegion: 'NV', postalCode: '89134', addressCountry: 'US' },
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
  const cms = await getCommunityPage('eagle-crest')
  return {
    title: cms?.metaTitle ?? 'Eagle Crest Homes for Sale | Nevada Real Estate Group',
    description: cms?.metaDescription ?? 'Browse Eagle Crest homes for sale in Las Vegas, NV. $400K–$700K. Schools, HOA, market stats. Nevada Real Estate Group.',
  }
}

export default async function EagleCrestPage() {
  const cms = await getCommunityPage('eagle-crest')
  const market = getMarketStats('eagle-crest')
  const ms = market?.stats

  const heroHeadline = cms?.heroHeadline ?? 'Eagle Crest'
  const heroSubtitle = 'Homes for Sale in Las Vegas, Nevada'
  const overviewTitle = cms?.overviewTitle ?? 'Eagle Crest: 55+ · Golf Community Living in Las Vegas'

  const HARDCODED_STATS: Array<[string, string] | [string, string, string]> = [
    ['Established', '1996'],
    ['Developer', 'Del Webb'],
    ['Total Acreage', '~120 acres (golf course)'],
    ['Homes', '~500 (course-adjacent)'],
    ['Median Home Price', ms?.medianSalePrice ?? '$400K–$700K'],
    ['ZIP Codes', '89134'],
    ['Guard-Gated', 'No'],
    ['HOA', '$180–$350/mo'],
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
        "destination": "to Downtown Summerlin",
        "route": "via W Charleston Blvd"
    },
    {
        "time": "~15 min",
        "destination": "to Red Rock Canyon",
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
          <span>Eagle Crest</span>
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
                <span className="hero-v2-stat-num">{ms?.medianSalePrice ?? qs('Median Home Price', '$400K–$700K')}</span>
                <span className="hero-v2-stat-lbl">Median Sale Price</span>
              </div>
              <div className="hero-v2-stat">
                <span className="hero-v2-stat-num">{ms?.avgDaysToClose ?? qs('Avg Days on Market', '45')}</span>
                <span className="hero-v2-stat-lbl">Avg Days to Close</span>
              </div>
            </div>
            <a href="#listings" className="hero-v2-cta">Search Homes in Eagle Crest</a>
          </div>
        </div>
      </header>

      <div className="hero-v2-qfb">
        <div className="container">
          <div className="hero-v2-qfb-row">
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <span><strong>ZIP:</strong> 89134</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              <span><strong>Type:</strong> 55+ · Golf Community</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
              <span><strong>Price Range:</strong> $400K–$700K</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
              <span><strong>HOA:</strong> $180–$350/mo</span>
            </div>
          </div>
          <div className="hero-v2-qfb-est">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            <span>Est. 1996</span>
          </div>
        </div>
      </div>

      <section id="demographics" className="demographics-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Demographics</span>
            <h2>Eagle Crest Demographics</h2>
          </div>
          <div className="demo-grid">
            {[
              ['~1,200', 'Population'],
              ['70', 'Median Age'],
              ['$75,000', 'Avg Household Income'],
              ['~500', 'Total Households'],
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
            <h2>Where is Eagle Crest?</h2>
            <p>Sun City Summerlin, Las Vegas &mdash; Las Vegas, Nevada.</p>
          </div>
          <div className="map-container">
            <EagleCrestMapWrapper />
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
            <h2 className="listings-title">NEW EAGLE CREST LISTINGS</h2>
          </div>
          <div className="ylopo-wrap">
            <div className="YLOPO_searchWidget" />
            <div className="YLOPO_resultsWidget" data-search='{"propertyTypes":["house","condo","townhouse"],"minPrice":350000,"locations":[{"city":"Las Vegas","state":"NV"}],"limit":12,"sortBy":"listDate","sortOrder":"desc","keywords":"Eagle Crest Sun City Summerlin","zipCodes":["89134"]}' />
          </div>
          <p className="ylopo-note">Listing data sourced from regional MLS. Information deemed reliable but not guaranteed. Updated daily.</p>
          <div className="listings-actions">
            <a href="https://search.nevadarealestategroup.net/search?s[orderBy]=sourceCreationDate%2Cdesc&s[page]=1&s[locations][0][city]=Las%20Vegas&s[locations][0][state]=NV&s[keywords]=Eagle%20Crest%20Sun%20City%20Summerlin" target="_blank" rel="noopener noreferrer" className="btn-gold">View All Eagle Crest Listings &rarr;</a>
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
                  <p>Eagle Crest is one of three golf courses within Sun City Summerlin, the Las Vegas Valley's original and largest 55+ active adult community. The Eagle Crest Golf Course, designed by Billy Casper and Greg Nash, is an 18-hole executive layout that emphasizes playability and enjoyment over extreme difficulty, making it a favorite among Sun City residents who golf regularly. Homes surrounding the Eagle Crest course benefit from fairway views, open space setbacks, and the mature desert landscaping that defines this section of the community.</p>
                  <p>The Eagle Crest course features well-maintained fairways, strategic bunkering, and several water features that add both beauty and challenge. As an executive-length course (par 60), it plays shorter than the community's other two courses — Highland Falls and Palm Valley — making it popular for walkers, senior golfers, and players who prefer a quicker round. Preferred tee times and resident rates make golf an affordable daily activity.</p>
                  <p>Homes along the Eagle Crest corridor range from approximately $400,000 to $700,000, with the premium driven by golf course frontage, views, and lot position. Most are single-story Del Webb floor plans ranging from 1,400 to 2,800+ square feet, featuring open layouts, covered patios, and low-maintenance desert landscaping. Many homes have been updated with modern kitchens, flooring, and bathroom finishes.</p>
                  <p>As part of Sun City Summerlin, Eagle Crest residents have full access to four recreation centers, resort-style pools, fitness facilities, tennis and pickleball courts, and over 100 chartered clubs and organizations. The community's location in the western Summerlin corridor provides proximity to Downtown Summerlin's shopping and dining, Red Rock Canyon, and the I-215 beltway.</p>
                </>
              )}
            </div>
            <div className="overview-aside">
              <div className="quick-facts">
                <h3>Eagle Crest At a Glance</h3>
                {displayStats.map(([label, value, cls]: any) => (
                  <div className="fact-row" key={label}>
                    <span className="fact-label">{label}</span>
                    <span className={`fact-value${cls ? ' ' + cls : ''}`}>{value}</span>
                  </div>
                ))}
              </div>
              <div className="cta-card">
                <p>Ready to explore Eagle Crest? Schedule a private tour of the community and the current listings that match your goals.</p>
                <a href="tel:+17252399950" className="btn-gold">Call 725.239.9950</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="highlights">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Why Eagle Crest</span>
            <h2>What Makes Eagle Crest Stand Out</h2>
          </div>
          <div className="highlights-grid">
            {[
              { title: 'Eagle Crest Golf Course', body: 'Billy Casper/Greg Nash-designed 18-hole executive course (par 60). Walkable, well-maintained, and perfect for daily play with preferred resident rates.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 2v10l7 4"/></svg> },
              { title: 'Sun City Summerlin Amenities', body: 'Full access to four recreation centers, resort pools, fitness, tennis, pickleball, ballrooms, and 100+ clubs. Over 100,000 square feet of amenity space.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><line x1="8" y1="6" x2="8" y2="6.01"/><line x1="12" y1="6" x2="12" y2="6.01"/><line x1="16" y1="6" x2="16" y2="6.01"/><line x1="8" y1="10" x2="8" y2="10.01"/><line x1="12" y1="10" x2="12" y2="10.01"/><line x1="16" y1="10" x2="16" y2="10.01"/><line x1="8" y1="14" x2="8" y2="14.01"/><line x1="12" y1="14" x2="12" y2="14.01"/><line x1="16" y1="14" x2="16" y2="14.01"/></svg> },
              { title: 'Three Golf Courses', body: 'In addition to Eagle Crest, Sun City Summerlin offers Highland Falls (18-hole championship) and Palm Valley (18-hole championship) for a total of 54 holes.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22c4-4 8-7.5 8-12a8 8 0 10-16 0c0 4.5 4 8 8 12z"/><circle cx="12" cy="10" r="3"/></svg> },
              { title: 'Single-Story Living', body: 'Del Webb floor plans from 1,400 to 2,800+ square feet, all single-story with covered patios, open layouts, and low-maintenance desert landscaping.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
              { title: 'Summerlin Location', body: 'Minutes to Downtown Summerlin, Red Rock Canyon, and the I-215 beltway. All the benefits of the Summerlin corridor with the value of an established community.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M8 21l4-11 4 11"/><path d="M2 21l5-14 4 8"/><path d="M14 15l4-8 4 14"/><line x1="2" y1="21" x2="22" y2="21"/></svg> },
              { title: 'Value Pricing', body: 'Golf course homes from $400K within Sun City Summerlin — a fraction of what comparable Summerlin golf-course homes cost in non-55+ communities.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg> },
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

      <EagleCrestFAQ />

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
              { name: 'Sun City Summerlin', href: '/sun-city-summerlin/', price: 'From $300K', compare: 'The broader 55+ community that encompasses Eagle Crest, Highland Falls, and Palm Valley golf courses.' },
              { name: 'Summerlin', href: '/summerlin/', price: 'From $400K', compare: 'The broader master-planned community with villages, guard-gated enclaves, and every price point.' },
              { name: 'Siena', href: '/summerlin-siena/', price: 'From $400K', compare: 'Guard-gated 55+ community within Summerlin South with a private clubhouse and pool.' },
              { name: 'Trilogy at Summerlin', href: '/trilogy-at-summerlin/', price: 'From $500K', compare: 'Newer guard-gated 55+ community with modern architecture and resort amenities.' },
              { name: 'Red Rock Country Club', href: '/red-rock-country-club/', price: 'From $800K', compare: 'Summerlin guard-gated golf community with two Arnold Palmer courses (all ages).' },
              { name: 'The Ridges', href: '/summerlin-the-ridges/', price: 'From $2M', compare: 'Summerlin\'s ultra-luxury guard-gated enclave with Bear\'s Best golf.' },
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
              <h2>Ready to Find Your Eagle Crest Home?</h2>
              <p>Nevada Real Estate Group is the #1 real estate team in Nevada. Whether you&apos;re buying or selling in Eagle Crest, let&apos;s talk.</p>
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
                <input type="hidden" name="_subject" value="Eagle Crest Inquiry — LasVegasHomeSearchExperts.com" />
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
