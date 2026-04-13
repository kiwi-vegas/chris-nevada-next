import LasVegasChinatownFAQ from '@/components/LasVegasChinatownFAQ'
import Link from 'next/link'
import type { Metadata } from 'next'
import LasVegasChinatownMapWrapper from '@/components/LasVegasChinatownMapWrapper'
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
    { '@type': 'ListItem', position: 3, name: 'Chinatown', item: 'https://www.lasvegashomesearchexperts.com/las-vegas-chinatown/' },
  ],
}

const FAQ_DATA = [
  {
    "q": "What is the price range in the Chinatown area?",
    "a": "Homes in the Las Vegas Chinatown area range from approximately $250,000 for condos and older homes to $600,000 for larger renovated single-family homes and newer townhomes."
  },
  {
    "q": "Where is Las Vegas Chinatown located?",
    "a": "Las Vegas Chinatown stretches along Spring Mountain Road between Valley View Boulevard and Rainbow Boulevard, approximately 2 miles west of the Las Vegas Strip."
  },
  {
    "q": "Is Las Vegas Chinatown a good area to live?",
    "a": "Yes, especially for buyers who value dining, cultural vibrancy, and central location. The area offers some of the shortest commute times in Las Vegas and walkable access to hundreds of restaurants. Ongoing revitalization is driving improvement and property values."
  },
  {
    "q": "What ZIP codes cover Chinatown?",
    "a": "The Chinatown area spans ZIP codes 89102, 89103, and 89146 in central Las Vegas."
  },
  {
    "q": "How far is Chinatown from the Strip?",
    "a": "Chinatown is approximately 5-10 minutes from the Las Vegas Strip via Spring Mountain Road. It is one of the closest residential areas to the resort corridor."
  },
  {
    "q": "Is Chinatown a good investment area?",
    "a": "Yes. Chinatown's proximity to the Strip, expanding restaurant scene, and ongoing commercial investment are driving property values. The area attracts strong rental demand from hospitality workers and UNLV students."
  },
  {
    "q": "What types of food are in Las Vegas Chinatown?",
    "a": "Las Vegas Chinatown features hundreds of restaurants spanning Chinese, Japanese, Korean, Vietnamese, Thai, Filipino, Taiwanese, and fusion cuisines. It is widely regarded as having the best Asian food scene west of New York outside San Francisco."
  },
  {
    "q": "Are there new construction options in Chinatown?",
    "a": "Yes. Several newer townhome developments from the 2010s-2020s offer modern design and low-maintenance living within the Chinatown corridor. New residential projects continue to be developed as the area grows."
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
  name: 'Chinatown',
  description: 'Chinatown is a urban · cultural district · mixed-use community in Las Vegas, Nevada.',
  geo: { '@type': 'GeoCoordinates', latitude: 36.126, longitude: -115.21 },
  address: { '@type': 'PostalAddress', addressLocality: 'Las Vegas', addressRegion: 'NV', postalCode: '89102', addressCountry: 'US' },
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
  const cms = await getCommunityPage('las-vegas-chinatown')
  return {
    title: cms?.metaTitle ?? 'Chinatown Homes for Sale | Nevada Real Estate Group',
    description: cms?.metaDescription ?? 'Browse Chinatown homes for sale in Las Vegas, NV. $250K–$600K. Schools, HOA, market stats. Nevada Real Estate Group.',
    alternates: { canonical: 'https://www.lasvegashomesearchexperts.com/las-vegas-chinatown' },
  }
}

export default async function LasVegasChinatownPage() {
  const cms = await getCommunityPage('las-vegas-chinatown')
  const market = getMarketStats('las-vegas-chinatown')
  const ms = market?.stats

  const heroHeadline = cms?.heroHeadline ?? 'Chinatown'
  const heroSubtitle = 'Homes for Sale in Las Vegas, Nevada'
  const overviewTitle = cms?.overviewTitle ?? 'Chinatown: Urban · Cultural District · Mixed-Use Living in Las Vegas'

  const HARDCODED_STATS: Array<[string, string] | [string, string, string]> = [
    ['Established', '1995'],
    ['Developer', 'Various Developers'],
    ['Total Acreage', '~2 miles corridor'],
    ['Homes', '5,000+'],
    ['Median Home Price', ms?.medianSalePrice ?? '$250K–$600K'],
    ['ZIP Codes', '89102, 89103, 89146'],
    ['Guard-Gated', 'No'],
    ['HOA', '$50–$250/mo'],
  ]
  const displayStats = mergeQuickStats(HARDCODED_STATS, cms?.quickStats)
  const HARDCODED_DRIVE_TIMES = [
    {
        "time": "~8 min",
        "destination": "to the Strip",
        "route": "via Spring Mountain Rd East"
    },
    {
        "time": "~10 min",
        "destination": "to Downtown Las Vegas",
        "route": "via I-15 North"
    },
    {
        "time": "~15 min",
        "destination": "to Harry Reid Airport",
        "route": "via I-15 South"
    },
    {
        "time": "~10 min",
        "destination": "to UNLV",
        "route": "via Flamingo Rd East"
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
          <span>Chinatown</span>
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
                <span className="hero-v2-stat-num">{ms?.medianSalePrice ?? qs('Median Home Price', '$250K–$600K')}</span>
                <span className="hero-v2-stat-lbl">Median Sale Price</span>
              </div>
              <div className="hero-v2-stat">
                <span className="hero-v2-stat-num">{ms?.avgDaysToClose ?? qs('Avg Days on Market', '45')}</span>
                <span className="hero-v2-stat-lbl">Avg Days to Close</span>
              </div>
            </div>
            <a href="#listings" className="hero-v2-cta">Search Homes in Chinatown</a>
          </div>
        </div>
      </header>

      <div className="hero-v2-qfb">
        <div className="container">
          <div className="hero-v2-qfb-row">
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <span><strong>ZIP:</strong> 89102, 89103, 89146</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              <span><strong>Type:</strong> Urban · Cultural District · Mixed-Use</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
              <span><strong>Price Range:</strong> $250K–$600K</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
              <span><strong>HOA:</strong> $50–$250/mo</span>
            </div>
          </div>
          <div className="hero-v2-qfb-est">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            <span>Est. 1995</span>
          </div>
        </div>
      </div>

      <section id="demographics" className="demographics-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Demographics</span>
            <h2>Chinatown Demographics</h2>
          </div>
          <div className="demo-grid">
            {[
              ['20,000+', 'Population'],
              ['36', 'Median Age'],
              ['$55,000', 'Avg Household Income'],
              ['5,000+', 'Total Households'],
              ['45%', 'Homeownership Rate'],
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
            <h2>Where is Chinatown?</h2>
            <p>Central Las Vegas, Nevada &mdash; Las Vegas, Nevada.</p>
          </div>
          <div className="map-container">
            <LasVegasChinatownMapWrapper />
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
            <h2 className="listings-title">NEW CHINATOWN LISTINGS</h2>
          </div>
          <div className="ylopo-wrap">
            <div className="YLOPO_searchWidget" />
            <div className="YLOPO_resultsWidget" data-search='{"propertyTypes":["house","condo","townhouse"],"minPrice":250000,"locations":[{"city":"Las Vegas","state":"NV"}],"limit":12,"sortBy":"listDate","sortOrder":"desc","keywords":"Chinatown Las Vegas Spring Mountain","zipCodes":["89102","89103","89146"]}' />
          </div>
          <p className="ylopo-note">Listing data sourced from regional MLS. Information deemed reliable but not guaranteed. Updated daily.</p>
          <div className="listings-actions">
            <a href="https://search.nevadarealestategroup.net/search?s[orderBy]=sourceCreationDate%2Cdesc&s[page]=1&s[locations][0][city]=Las%20Vegas&s[locations][0][state]=NV&s[keywords]=Chinatown%20Las%20Vegas%20Spring%20Mountain" target="_blank" rel="noopener noreferrer" className="btn-gold">View All Chinatown Listings &rarr;</a>
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
                  <p>Las Vegas Chinatown is a vibrant cultural and commercial district stretching approximately two miles along Spring Mountain Road between Valley View Boulevard and Rainbow Boulevard. What began in 1995 with the opening of the Chinatown Plaza has exploded into one of the most dynamic dining, shopping, and cultural corridors in the American West, now widely regarded as having the best Asian food scene of any city in the United States outside of the San Francisco and New York metro areas.</p>
                  <p>The residential neighborhoods surrounding Chinatown offer an eclectic mix of single-family homes, townhomes, and condominiums at price points ranging from approximately $250,000 to $600,000. The housing stock varies significantly, from 1970s ranch-style homes on larger lots to modern townhome developments built in the 2010s-2020s. This diversity of housing creates opportunities for first-time buyers, investors, professionals, and anyone who values walkable access to one of the best restaurant scenes in Las Vegas.</p>
                  <p>Chinatown's central location is one of its strongest assets. The area sits just west of the Strip, providing 5-10 minute access to the resort corridor, and is flanked by major freeways including I-15 and US-95. Commuters working on the Strip, in Downtown, or in the medical district along Rancho Drive benefit from extremely short commutes. The UNLV campus, the Strip, and Downtown are all within a 10-15 minute drive.</p>
                  <p>For buyers who value dining, culture, walkability, and central location over master-planned community amenities, Chinatown offers a lifestyle that is truly unique in Las Vegas. The district has undergone remarkable revitalization, with ongoing restaurant openings, commercial investment, and residential development driving both energy and property values. The area represents one of the most interesting emerging neighborhoods in the valley for buyers seeking character and convenience.</p>
                </>
              )}
            </div>
            <div className="overview-aside">
              <div className="quick-facts">
                <h3>Chinatown At a Glance</h3>
                {displayStats.map(([label, value, cls]: any) => (
                  <div className="fact-row" key={label}>
                    <span className="fact-label">{label}</span>
                    <span className={`fact-value${cls ? ' ' + cls : ''}`}>{value}</span>
                  </div>
                ))}
              </div>
              <div className="cta-card">
                <p>Ready to explore Chinatown? Schedule a private tour of the community and the current listings that match your goals.</p>
                <a href="tel:+17252399950" className="btn-gold">Call 725.239.9950</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="highlights">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Why Chinatown</span>
            <h2>What Makes Chinatown Stand Out</h2>
          </div>
          <div className="highlights-grid">
            {[
              { title: 'Premier Dining District', body: 'Widely considered the best Asian food corridor in the western United States. Hundreds of restaurants spanning Chinese, Japanese, Korean, Vietnamese, Thai, Filipino, and fusion cuisines.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><line x1="8" y1="6" x2="8" y2="6.01"/><line x1="12" y1="6" x2="12" y2="6.01"/><line x1="16" y1="6" x2="16" y2="6.01"/><line x1="8" y1="10" x2="8" y2="10.01"/><line x1="12" y1="10" x2="12" y2="10.01"/><line x1="16" y1="10" x2="16" y2="10.01"/><line x1="8" y1="14" x2="8" y2="14.01"/><line x1="12" y1="14" x2="12" y2="14.01"/><line x1="16" y1="14" x2="16" y2="14.01"/></svg> },
              { title: 'Central Strip-Adjacent Location', body: 'Just west of the Las Vegas Strip with 5-10 minute access to the resort corridor. One of the most centrally located residential areas in the valley.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><line x1="8" y1="6" x2="8" y2="6.01"/><line x1="12" y1="6" x2="12" y2="6.01"/><line x1="16" y1="6" x2="16" y2="6.01"/><line x1="8" y1="10" x2="8" y2="10.01"/><line x1="12" y1="10" x2="12" y2="10.01"/><line x1="16" y1="10" x2="16" y2="10.01"/><line x1="8" y1="14" x2="8" y2="14.01"/><line x1="12" y1="14" x2="12" y2="14.01"/><line x1="16" y1="14" x2="16" y2="14.01"/></svg> },
              { title: 'Cultural Vibrancy', body: 'A living cultural district with specialty markets, tea houses, bakeries, bookstores, and community events. Year-round Lunar New Year and cultural celebrations.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22c4-4 8-7.5 8-12a8 8 0 10-16 0c0 4.5 4 8 8 12z"/><circle cx="12" cy="10" r="3"/></svg> },
              { title: 'Diverse Housing Options', body: 'From 1970s ranch homes to modern townhomes, the area offers diverse styles and price points. Entry-level to move-up options in a single corridor.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
              { title: 'Short Commutes', body: '5-10 minutes to the Strip, 10 minutes to Downtown, 10 minutes to UNLV. Among the shortest average commute times in the Las Vegas metro.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><line x1="8" y1="6" x2="8" y2="6.01"/><line x1="12" y1="6" x2="12" y2="6.01"/><line x1="16" y1="6" x2="16" y2="6.01"/><line x1="8" y1="10" x2="8" y2="10.01"/><line x1="12" y1="10" x2="12" y2="10.01"/><line x1="16" y1="10" x2="16" y2="10.01"/><line x1="8" y1="14" x2="8" y2="14.01"/><line x1="12" y1="14" x2="12" y2="14.01"/><line x1="16" y1="14" x2="16" y2="14.01"/></svg> },
              { title: 'Emerging Value', body: 'Ongoing commercial investment and revitalization are driving property values. One of the most dynamic emerging neighborhoods in Las Vegas.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg> },
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

      <LasVegasChinatownFAQ />

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
              { name: 'Spring Valley', href: '/spring-valley/', price: 'From $300K', compare: 'Adjacent residential community to the south with more suburban character and family neighborhoods.' },
              { name: 'The Lakes', href: '/the-lakes/', price: 'From $350K', compare: 'Waterfront community nearby with lake living and guard-gated sections.' },
              { name: 'Peccole Ranch', href: '/peccole-ranch/', price: 'From $250K', compare: 'Established west Las Vegas community with guard-gated sections and golf.' },
              { name: 'Downtown Las Vegas', href: '/downtown-las-vegas/', price: 'From $200K', compare: 'Downtown arts, culture, and nightlife with urban loft and condo living.' },
              { name: 'Summerlin', href: '/summerlin/', price: 'From $450K', compare: 'Las Vegas\' premier master plan to the west. Higher price point with extensive amenities.' },
              { name: 'Desert Shores', href: '/desert-shores/', price: 'From $350K', compare: 'Lake community in the northwest with waterfront homes and boating.' },
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
              <h2>Ready to Find Your Chinatown Home?</h2>
              <p>Nevada Real Estate Group is the #1 real estate team in Nevada. Whether you&apos;re buying or selling in Chinatown, let&apos;s talk.</p>
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
                <input type="hidden" name="_subject" value="Chinatown Inquiry — LasVegasHomeSearchExperts.com" />
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
