import HendersonSolitudeFAQ from '@/components/HendersonSolitudeFAQ'
import Link from 'next/link'
import type { Metadata } from 'next'
import HendersonSolitudeMapWrapper from '@/components/HendersonSolitudeMapWrapper'
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
    { '@type': 'ListItem', position: 3, name: 'Solitude at Seven Hills', item: 'https://www.lasvegashomesearchexperts.com/henderson-solitude/' },
  ],
}

const FAQ_DATA = [
  {
    "q": "What is the price range for homes in Solitude at Seven Hills?",
    "a": "Homes in Solitude range from approximately $500,000 for resale homes to $900,000 or more for premium view lots with upgraded finishes and custom-quality construction."
  },
  {
    "q": "Is Solitude guard-gated?",
    "a": "Yes. Solitude is a fully guard-gated community within Seven Hills with a 24-hour staffed guard gate and security patrols. It is one of the most private neighborhoods in Henderson."
  },
  {
    "q": "What is the view like from Solitude?",
    "a": "Solitude sits on elevated terrain providing sweeping panoramic views of the Las Vegas Valley, the Strip skyline, and surrounding mountain ranges. View homes are a primary draw for buyers."
  },
  {
    "q": "What ZIP code is Solitude in?",
    "a": "Solitude at Seven Hills is located in ZIP code 89052 in Henderson."
  },
  {
    "q": "What are HOA fees in Solitude?",
    "a": "HOA fees typically range from $150 to $300 per month, which includes the Seven Hills master association fee plus the Solitude sub-association fee covering guard-gate staffing and private common area maintenance."
  },
  {
    "q": "What schools serve Solitude at Seven Hills?",
    "a": "Solitude is zoned for CCSD schools including Vanderburg Elementary (8/10) and Foothill High School (7/10). Private options include Henderson International School and Bishop Gorman High School (A+)."
  },
  {
    "q": "Who built homes in Solitude?",
    "a": "Solitude was developed primarily by American West Homes starting in 2003. Homes feature semi-custom floor plans from 2,200 to 4,200 square feet with design elements that maximize the elevated terrain."
  },
  {
    "q": "How does Solitude compare to MacDonald Highlands?",
    "a": "Solitude offers guard-gated privacy and valley views at 40–60% below MacDonald Highlands pricing. MacDonald Highlands provides a higher luxury tier with DragonRidge Country Club, but Solitude delivers significant guard-gated value."
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
  name: 'Solitude at Seven Hills',
  description: 'Solitude at Seven Hills is a guard-gated · semi-custom community in Henderson, Nevada.',
  geo: { '@type': 'GeoCoordinates', latitude: 35.995, longitude: -115.095 },
  address: { '@type': 'PostalAddress', addressLocality: 'Henderson', addressRegion: 'NV', postalCode: '89052', addressCountry: 'US' },
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
  const cms = await getCommunityPage('henderson-solitude')
  return {
    title: cms?.metaTitle ?? 'Solitude at Seven Hills Homes for Sale | Nevada Real Estate Group',
    description: cms?.metaDescription ?? 'Browse Solitude at Seven Hills homes for sale in Henderson, NV. $500K–$900K. Schools, HOA, market stats. Nevada Real Estate Group.',
  }
}

export default async function HendersonSolitudePage() {
  const cms = await getCommunityPage('henderson-solitude')
  const market = getMarketStats('henderson-solitude')
  const ms = market?.stats

  const heroHeadline = cms?.heroHeadline ?? 'Solitude at Seven Hills'
  const heroSubtitle = 'Homes for Sale in Henderson, Nevada'
  const overviewTitle = cms?.overviewTitle ?? 'Solitude at Seven Hills: Guard-Gated · Semi-Custom Living in Henderson'

  const HARDCODED_STATS: Array<[string, string] | [string, string, string]> = [
    ['Established', '2003'],
    ['Developer', 'American West Homes'],
    ['Total Acreage', '~120 acres'],
    ['Homes', '~350'],
    ['Median Home Price', ms?.medianSalePrice ?? '$500K–$900K'],
    ['ZIP Codes', '89052'],
    ['Guard-Gated', 'Yes'],
    ['HOA', '$150–$300/mo'],
  ]
  const displayStats = mergeQuickStats(HARDCODED_STATS, cms?.quickStats)
  const HARDCODED_DRIVE_TIMES = [
    {
        "time": "~20 min",
        "destination": "to the Strip",
        "route": "via I-215 West → I-15 North"
    },
    {
        "time": "~15 min",
        "destination": "to Harry Reid Airport",
        "route": "via I-215 → I-15"
    },
    {
        "time": "~10 min",
        "destination": "to Henderson Downtown",
        "route": "via Eastern Ave North"
    },
    {
        "time": "~25 min",
        "destination": "to Lake Las Vegas",
        "route": "via Lake Mead Pkwy East"
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
          <span>Solitude at Seven Hills</span>
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
                <span className="hero-v2-stat-num">{ms?.medianSalePrice ?? qs('Median Home Price', '$500K–$900K')}</span>
                <span className="hero-v2-stat-lbl">Median Sale Price</span>
              </div>
              <div className="hero-v2-stat">
                <span className="hero-v2-stat-num">{ms?.avgDaysToClose ?? qs('Avg Days on Market', '45')}</span>
                <span className="hero-v2-stat-lbl">Avg Days to Close</span>
              </div>
            </div>
            <a href="#listings" className="hero-v2-cta">Search Homes in Solitude at Seven Hills</a>
          </div>
        </div>
      </header>

      <div className="hero-v2-qfb">
        <div className="container">
          <div className="hero-v2-qfb-row">
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <span><strong>ZIP:</strong> 89052</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              <span><strong>Type:</strong> Guard-Gated · Semi-Custom</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
              <span><strong>Price Range:</strong> $500K–$900K</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
              <span><strong>HOA:</strong> $150–$300/mo</span>
            </div>
          </div>
          <div className="hero-v2-qfb-est">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            <span>Est. 2003</span>
          </div>
        </div>
      </div>

      <section id="demographics" className="demographics-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Demographics</span>
            <h2>Solitude at Seven Hills Demographics</h2>
          </div>
          <div className="demo-grid">
            {[
              ['~1,000', 'Population'],
              ['46', 'Median Age'],
              ['$145,000', 'Avg Household Income'],
              ['~350', 'Total Households'],
              ['82%', 'Homeownership Rate'],
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
            <h2>Where is Solitude at Seven Hills?</h2>
            <p>Seven Hills, Henderson &mdash; Henderson, Nevada.</p>
          </div>
          <div className="map-container">
            <HendersonSolitudeMapWrapper />
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
            <h2 className="listings-title">NEW SOLITUDE AT SEVEN HILLS LISTINGS</h2>
          </div>
          <div className="ylopo-wrap">
            <div className="YLOPO_searchWidget" />
            <div className="YLOPO_resultsWidget" data-search='{"propertyTypes":["house","condo","townhouse"],"minPrice":500000,"locations":[{"city":"Henderson","state":"NV"}],"limit":12,"sortBy":"listDate","sortOrder":"desc","keywords":"Solitude Seven Hills","zipCodes":["89052"]}' />
          </div>
          <p className="ylopo-note">Listing data sourced from regional MLS. Information deemed reliable but not guaranteed. Updated daily.</p>
          <div className="listings-actions">
            <a href="https://search.nevadarealestategroup.net/search?s[orderBy]=sourceCreationDate%2Cdesc&s[page]=1&s[locations][0][city]=Henderson&s[locations][0][state]=NV&s[keywords]=Solitude%20Seven%20Hills" target="_blank" rel="noopener noreferrer" className="btn-gold">View All Solitude at Seven Hills Listings &rarr;</a>
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
                  <p>Solitude at Seven Hills is a guard-gated enclave within the prestigious Seven Hills master-planned community in Henderson. Situated on elevated terrain along the southeastern foothills, Solitude offers semi-custom homes with sweeping views of the Las Vegas Valley, Strip skyline, and surrounding mountain ranges. The guard-gated entry, 24-hour security, and elevated positioning create a sense of privacy and exclusivity that distinguishes Solitude from the broader Seven Hills community.</p>
                  <p>Homes in Solitude range from approximately $500,000 for resale single-family homes to $900,000 or more for premium view lots with upgraded construction and custom-quality finishes. Developed primarily by American West Homes starting in 2003, the community features semi-custom floor plans from 2,200 to 4,200 square feet with design elements that take advantage of the elevated terrain — large windows, view balconies, and rear-facing entertainment areas oriented toward the valley lights.</p>
                  <p>As part of Seven Hills, Solitude residents enjoy access to the Seven Hills community amenities including parks, walking trails, and community events, as well as proximity to the Rio Secco Golf Club — a Rees Jones-designed 18-hole championship course that has hosted PGA Tour events. The Seven Hills master plan is one of Henderson's most desirable addresses, and Solitude represents its most private and view-oriented section.</p>
                  <p>Solitude appeals to move-up buyers and luxury seekers who want guard-gated privacy and panoramic views at a price point below Henderson's ultra-luxury communities like MacDonald Highlands and Ascaya. The combination of Seven Hills' established reputation, Henderson's safety and services, and Solitude's guard-gated exclusivity creates a compelling value proposition for discerning buyers.</p>
                </>
              )}
            </div>
            <div className="overview-aside">
              <div className="quick-facts">
                <h3>Solitude at Seven Hills At a Glance</h3>
                {displayStats.map(([label, value, cls]: any) => (
                  <div className="fact-row" key={label}>
                    <span className="fact-label">{label}</span>
                    <span className={`fact-value${cls ? ' ' + cls : ''}`}>{value}</span>
                  </div>
                ))}
              </div>
              <div className="cta-card">
                <p>Ready to explore Solitude at Seven Hills? Schedule a private tour of the community and the current listings that match your goals.</p>
                <a href="tel:+17252399950" className="btn-gold">Call 725.239.9950</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="highlights">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Why Solitude at Seven Hills</span>
            <h2>What Makes Solitude at Seven Hills Stand Out</h2>
          </div>
          <div className="highlights-grid">
            {[
              { title: 'Guard-Gated Security', body: '24-hour staffed guard gate with security patrols. Solitude is one of the most private and secure neighborhoods within the Seven Hills master plan.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
              { title: 'Panoramic Valley Views', body: 'Elevated terrain provides sweeping views of the Las Vegas Valley, Strip skyline, and surrounding mountain ranges. Many homes feature view balconies and glass-walled entertaining areas.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M8 21l4-11 4 11"/><path d="M2 21l5-14 4 8"/><path d="M14 15l4-8 4 14"/><line x1="2" y1="21" x2="22" y2="21"/></svg> },
              { title: 'Semi-Custom Homes', body: 'Floor plans from 2,200 to 4,200 sq ft with semi-custom design elements, upgraded finishes, and architectural features that maximize the elevated terrain.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
              { title: 'Rio Secco Golf Club', body: 'Adjacent to the Rees Jones-designed Rio Secco Golf Club — an 18-hole championship course that has hosted PGA Tour events and offers membership to residents.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 2v10l7 4"/></svg> },
              { title: 'Seven Hills Amenities', body: 'Access to the full Seven Hills amenity package including community parks, walking trails, and community programming. One of Henderson\'s most desirable master-planned addresses.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22c4-4 8-7.5 8-12a8 8 0 10-16 0c0 4.5 4 8 8 12z"/><circle cx="12" cy="10" r="3"/></svg> },
              { title: 'Value vs. Ultra-Luxury', body: 'Guard-gated privacy and panoramic views at 40–60% below MacDonald Highlands and Ascaya pricing. Compelling value for luxury-seeking buyers in Henderson.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg> },
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

      <HendersonSolitudeFAQ />

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
              { name: 'Seven Hills', href: '/seven-hills/', price: 'From $500K', compare: 'The broader Seven Hills master plan with diverse neighborhoods, country club, and elevated terrain.' },
              { name: 'MacDonald Highlands', href: '/macdonald-highlands/', price: 'From $800K', compare: 'Henderson\'s premier luxury community with DragonRidge Country Club and custom estates.' },
              { name: 'Ascaya', href: '/ascaya/', price: 'From $3M', compare: 'Ultra-luxury custom lot community with the most dramatic views in Henderson.' },
              { name: 'Anthem', href: '/anthem/', price: 'From $450K', compare: 'Large Henderson master plan with guard-gated sections, Sun City, and resort amenities.' },
              { name: 'Tuscan Cliffs', href: '/tuscan-cliffs/', price: 'From $1M', compare: 'Guard-gated luxury enclave in MacDonald Highlands with custom and semi-custom homes.' },
              { name: 'Inspirada', href: '/inspirada/', price: 'From $400K', compare: 'Newer Henderson master plan with modern amenities at a lower price point.' },
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
              <h2>Ready to Find Your Solitude at Seven Hills Home?</h2>
              <p>Nevada Real Estate Group is the #1 real estate team in Nevada. Whether you&apos;re buying or selling in Solitude at Seven Hills, let&apos;s talk.</p>
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
                <input type="hidden" name="_subject" value="Solitude at Seven Hills Inquiry — LasVegasHomeSearchExperts.com" />
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
