import SevenHillsTerracinaFAQ from '@/components/SevenHillsTerracinaFAQ'
import Link from 'next/link'
import type { Metadata } from 'next'
import SevenHillsTerracinaMapWrapper from '@/components/SevenHillsTerracinaMapWrapper'
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
    { '@type': 'ListItem', position: 3, name: 'Terracina', item: 'https://www.lasvegashomesearchexperts.com/seven-hills-terracina/' },
  ],
}

const FAQ_DATA = [
  {
    "q": "What is the price range for homes in Terracina?",
    "a": "Homes in Terracina range from approximately $1 million for semi-custom homes to over $3 million for fully custom estates on premium view lots with Strip and mountain panoramas."
  },
  {
    "q": "Is Terracina guard-gated?",
    "a": "Yes. Terracina is a fully guard-gated community with a 24-hour staffed guard gate and security patrols. It is the most exclusive guard-gated enclave within the Seven Hills master plan."
  },
  {
    "q": "What views do Terracina homes have?",
    "a": "Terracina occupies an elevated ridgeline within Seven Hills. North-facing properties enjoy panoramic Las Vegas Strip views, while south and east-facing homes overlook the McCullough Range and Sloan Canyon."
  },
  {
    "q": "What ZIP code is Terracina in?",
    "a": "Terracina is in ZIP code 89052 in Henderson, Nevada, within the Seven Hills master-planned community."
  },
  {
    "q": "How large are homes in Terracina?",
    "a": "Homes in Terracina range from approximately 3,500 to over 7,000 square feet on lots from 10,000 to 20,000+ square feet. Both original custom builds and fully renovated contemporary estates are available."
  },
  {
    "q": "What are HOA fees in Terracina?",
    "a": "HOA fees in Terracina typically range from $300 to $600 per month, covering the guard gate staffing, security patrols, Seven Hills master association fee, and sub-association common area maintenance."
  },
  {
    "q": "How does Terracina compare to MacDonald Highlands?",
    "a": "Terracina offers guard-gated luxury with custom homes and Strip views at roughly one-third to one-half the price of comparable MacDonald Highlands properties. MacDonald Highlands offers a higher elevation, DragonRidge golf, and more ultra-luxury options."
  },
  {
    "q": "What golf courses are near Terracina?",
    "a": "Rio Secco Golf Club, a Rees Jones-designed championship course, is minutes from Terracina. The course features dramatic canyon terrain and is home to the Butch Harmon School of Golf."
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
  name: 'Terracina',
  description: 'Terracina is a guard-gated · luxury community in Henderson, Nevada.',
  geo: { '@type': 'GeoCoordinates', latitude: 36.005, longitude: -115.093 },
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
  const cms = await getCommunityPage('seven-hills-terracina')
  return {
    title: cms?.metaTitle ?? 'Terracina Homes for Sale | Nevada Real Estate Group',
    description: cms?.metaDescription ?? 'Browse Terracina homes for sale in Henderson, NV. $1M–$3M+. Schools, HOA, market stats. Nevada Real Estate Group.',
  }
}

export default async function SevenHillsTerracinaPage() {
  const cms = await getCommunityPage('seven-hills-terracina')
  const market = getMarketStats('seven-hills-terracina')
  const ms = market?.stats

  const heroHeadline = cms?.heroHeadline ?? 'Terracina'
  const heroSubtitle = 'Homes for Sale in Henderson, Nevada'
  const overviewTitle = cms?.overviewTitle ?? 'Terracina: Guard-Gated · Luxury Living in Henderson'

  const HARDCODED_STATS: Array<[string, string] | [string, string, string]> = [
    ['Established', '2001'],
    ['Developer', 'Pacific Rim / Various Custom'],
    ['Total Acreage', '~100 acres'],
    ['Homes', '~180'],
    ['Median Home Price', ms?.medianSalePrice ?? '$1M–$3M+'],
    ['ZIP Codes', '89052'],
    ['Guard-Gated', 'Yes'],
    ['HOA', '$300–$600/mo'],
  ]
  const displayStats = mergeQuickStats(HARDCODED_STATS, cms?.quickStats)
  const HARDCODED_DRIVE_TIMES = [
    {
        "time": "~20 min",
        "destination": "to the Strip",
        "route": "via I-215 → I-15"
    },
    {
        "time": "~20 min",
        "destination": "to Harry Reid Airport",
        "route": "via I-215 West → I-15"
    },
    {
        "time": "~10 min",
        "destination": "to Galleria at Sunset",
        "route": "via Eastern Ave"
    },
    {
        "time": "~5 min",
        "destination": "to Rio Secco Golf Club",
        "route": "via Seven Hills Dr"
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
          <span>Terracina</span>
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
                <span className="hero-v2-stat-num">{ms?.medianSalePrice ?? qs('Median Home Price', '$1M–$3M+')}</span>
                <span className="hero-v2-stat-lbl">Median Sale Price</span>
              </div>
              <div className="hero-v2-stat">
                <span className="hero-v2-stat-num">{ms?.avgDaysToClose ?? qs('Avg Days on Market', '45')}</span>
                <span className="hero-v2-stat-lbl">Avg Days to Close</span>
              </div>
            </div>
            <a href="#listings" className="hero-v2-cta">Search Homes in Terracina</a>
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
              <span><strong>Type:</strong> Guard-Gated · Luxury</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
              <span><strong>Price Range:</strong> $1M–$3M+</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
              <span><strong>HOA:</strong> $300–$600/mo</span>
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
            <h2>Terracina Demographics</h2>
          </div>
          <div className="demo-grid">
            {[
              ['~500', 'Population'],
              ['52', 'Median Age'],
              ['$250,000', 'Avg Household Income'],
              ['~180', 'Total Households'],
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
            <h2>Where is Terracina?</h2>
            <p>Seven Hills, Henderson &mdash; Henderson, Nevada.</p>
          </div>
          <div className="map-container">
            <SevenHillsTerracinaMapWrapper />
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
            <h2 className="listings-title">NEW TERRACINA LISTINGS</h2>
          </div>
          <div className="ylopo-wrap">
            <div className="YLOPO_searchWidget" />
            <div className="YLOPO_resultsWidget" data-search='{"propertyTypes":["house","condo","townhouse"],"minPrice":1000000,"locations":[{"city":"Henderson","state":"NV"}],"limit":12,"sortBy":"listDate","sortOrder":"desc","keywords":"Terracina Seven Hills","zipCodes":["89052"]}' />
          </div>
          <p className="ylopo-note">Listing data sourced from regional MLS. Information deemed reliable but not guaranteed. Updated daily.</p>
          <div className="listings-actions">
            <a href="https://search.nevadarealestategroup.net/search?s[orderBy]=sourceCreationDate%2Cdesc&s[page]=1&s[locations][0][city]=Henderson&s[locations][0][state]=NV&s[keywords]=Terracina%20Seven%20Hills" target="_blank" rel="noopener noreferrer" className="btn-gold">View All Terracina Listings &rarr;</a>
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
                  <p>Terracina is the premier guard-gated luxury enclave within Seven Hills, offering custom and semi-custom homes on generous lots with some of the most expansive views in Henderson. Situated along the elevated southern rim of Seven Hills overlooking the McCullough Range and the Las Vegas Strip, Terracina provides the exclusivity and architectural quality that distinguish it from the broader Seven Hills community.</p>
                  <p>Behind Terracina's 24-hour staffed guard gate, approximately 180 homes occupy lots that range from 10,000 to over 20,000 square feet. Homes are a mix of original custom builds from the early 2000s and extensively renovated estates, with sizes ranging from approximately 3,500 to 7,000+ square feet. Architectural styles include Mediterranean, Tuscan, and transitional contemporary, with many homeowners undertaking full modern renovations that have brought sleek desert-contemporary aesthetics to the community.</p>
                  <p>The views from Terracina are among the community's greatest assets. North-facing properties command panoramic Las Vegas Strip views that are particularly spectacular at night. South and east-facing homes look over the McCullough Range, Sloan Canyon, and the undeveloped desert beyond. The combination of guard-gated security, custom-home architecture, and premium views positions Terracina as a true luxury address within Henderson.</p>
                  <p>Terracina's location provides quick access to Rio Secco Golf Club, Sloan Canyon National Conservation Area, and Henderson's full amenity package along St. Rose Parkway and Eastern Avenue. The I-215 beltway is minutes away, connecting residents to the Strip, Harry Reid Airport, and the broader metro area. For buyers seeking guard-gated luxury in Henderson without the ultra-premium pricing of MacDonald Highlands or Ascaya, Terracina offers exceptional value.</p>
                </>
              )}
            </div>
            <div className="overview-aside">
              <div className="quick-facts">
                <h3>Terracina At a Glance</h3>
                {displayStats.map(([label, value, cls]: any) => (
                  <div className="fact-row" key={label}>
                    <span className="fact-label">{label}</span>
                    <span className={`fact-value${cls ? ' ' + cls : ''}`}>{value}</span>
                  </div>
                ))}
              </div>
              <div className="cta-card">
                <p>Ready to explore Terracina? Schedule a private tour of the community and the current listings that match your goals.</p>
                <a href="tel:+17252399950" className="btn-gold">Call 725.239.9950</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="highlights">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Why Terracina</span>
            <h2>What Makes Terracina Stand Out</h2>
          </div>
          <div className="highlights-grid">
            {[
              { title: '24-Hour Guard Gate', body: 'Terracina features a staffed guard gate with round-the-clock security, providing the privacy and exclusivity expected in a luxury residential enclave.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
              { title: 'Custom Home Architecture', body: 'Approximately 180 custom and semi-custom homes ranging from 3,500 to 7,000+ square feet. Mediterranean, Tuscan, and contemporary desert-modern styles throughout.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
              { title: 'Panoramic Strip & Mountain Views', body: 'Elevated ridgeline position delivers unobstructed views of the Las Vegas Strip to the north and the McCullough Range to the south. Night views are exceptional.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M8 21l4-11 4 11"/><path d="M2 21l5-14 4 8"/><path d="M14 15l4-8 4 14"/><line x1="2" y1="21" x2="22" y2="21"/></svg> },
              { title: 'Premium Lot Sizes', body: 'Lots range from 10,000 to over 20,000 square feet — significantly larger than standard Seven Hills neighborhoods. Space for resort-style pools and outdoor living.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><line x1="8" y1="6" x2="8" y2="6.01"/><line x1="12" y1="6" x2="12" y2="6.01"/><line x1="16" y1="6" x2="16" y2="6.01"/><line x1="8" y1="10" x2="8" y2="10.01"/><line x1="12" y1="10" x2="12" y2="10.01"/><line x1="16" y1="10" x2="16" y2="10.01"/><line x1="8" y1="14" x2="8" y2="14.01"/><line x1="12" y1="14" x2="12" y2="14.01"/><line x1="16" y1="14" x2="16" y2="14.01"/></svg> },
              { title: 'Rio Secco Golf Club', body: 'Minutes from the Rees Jones-designed Rio Secco Golf Club, offering championship desert golf with dramatic canyon views. Butch Harmon School of Golf on-site.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 2v10l7 4"/></svg> },
              { title: 'Value vs. Ultra-Luxury', body: 'Terracina delivers guard-gated luxury with custom homes and premium views at a fraction of the cost of MacDonald Highlands or Ascaya, making it one of Henderson\'s best luxury values.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg> },
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

      <SevenHillsTerracinaFAQ />

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
              { name: 'Seven Hills', href: '/seven-hills/', price: 'From $500K', compare: 'The broader Seven Hills master plan encompassing all neighborhoods and price points.' },
              { name: 'Seven Hills Country Club', href: '/seven-hills-country-club/', price: 'From $1.2M', compare: 'Guard-gated golf community adjacent to Terracina with direct Rio Secco course access.' },
              { name: 'Silver Ridge', href: '/seven-hills-silver-ridge/', price: 'From $800K', compare: 'Non-gated Seven Hills neighborhood with comparable views at a lower price point.' },
              { name: 'MacDonald Highlands', href: '/macdonald-highlands/', price: 'From $800K', compare: 'Henderson\'s premier luxury community with DragonRidge Country Club and higher elevation.' },
              { name: 'Ascaya', href: '/ascaya/', price: 'From $3M', compare: 'Ultra-luxury custom lot community on the McCullough Range in Henderson.' },
              { name: 'Anthem Country Club', href: '/anthem-country-club/', price: 'From $1.2M', compare: 'Guard-gated golf community in the Anthem foothills with Hale Irwin course.' },
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
              <h2>Ready to Find Your Terracina Home?</h2>
              <p>Nevada Real Estate Group is the #1 real estate team in Nevada. Whether you&apos;re buying or selling in Terracina, let&apos;s talk.</p>
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
                <input type="hidden" name="_subject" value="Terracina Inquiry — LasVegasHomeSearchExperts.com" />
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
