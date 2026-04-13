import SummerlinNewFAQ from '@/components/SummerlinNewFAQ'
import SchoolsTabs from '@/components/SchoolsTabs'
import { SUMMERLIN_FAQS } from '@/lib/summerlin-faqs'
import Link from 'next/link'
import type { Metadata } from 'next'
import SummerlinMapWrapper from '@/components/SummerlinMapWrapper'
import PortableText from '@/components/PortableText'
import { getCommunityPage } from '@/sanity/queries'
import { mergeQuickStats, mergeDriveTimes, getSectionImageUrl } from '@/lib/community-utils'

export const revalidate = 60

/* ── JSON-LD Schema ─────────────────────────────────────────── */

const BREADCRUMB_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.lasvegashomesearchexperts.com/' },
    { '@type': 'ListItem', position: 2, name: 'Communities', item: 'https://www.lasvegashomesearchexperts.com/#communities' },
    { '@type': 'ListItem', position: 3, name: 'Summerlin', item: 'https://www.lasvegashomesearchexperts.com/new-summerlin/' },
  ],
}

const FAQ_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: SUMMERLIN_FAQS.map(faq => ({
    '@type': 'Question',
    name: faq.q,
    acceptedAnswer: { '@type': 'Answer', text: faq.a },
  })),
}

const PLACE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Place',
  name: 'Summerlin',
  description: 'Summerlin is a 22,500-acre master-planned community in Las Vegas, Nevada, developed by the Howard Hughes Corporation beginning in 1990. It is located along the western rim of the Las Vegas Valley, adjacent to the Red Rock Canyon National Conservation Area.',
  geo: { '@type': 'GeoCoordinates', latitude: 36.1566, longitude: -115.3264 },
  address: { '@type': 'PostalAddress', addressLocality: 'Las Vegas', addressRegion: 'NV', postalCode: '89135', addressCountry: 'US' },
  containedInPlace: { '@type': 'City', name: 'Las Vegas', sameAs: 'https://en.wikipedia.org/wiki/Las_Vegas' },
  amenityFeature: [
    { '@type': 'LocationFeatureSpecification', name: 'Golf Courses', value: '10' },
    { '@type': 'LocationFeatureSpecification', name: 'Parks', value: '250+' },
    { '@type': 'LocationFeatureSpecification', name: 'Trails (miles)', value: '200+' },
  ],
}

const AGENT_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'RealEstateAgent',
  name: 'Nevada Real Estate Group',
  url: 'https://www.nevadarealestategroup.com',
  telephone: '+17252399950',
  email: 'info@nevadagroup.com',
  address: { '@type': 'PostalAddress', streetAddress: '8945 W Russell Rd #170', addressLocality: 'Las Vegas', addressRegion: 'NV', postalCode: '89148', addressCountry: 'US' },
  areaServed: [
    { '@type': 'City', name: 'Las Vegas' },
    { '@type': 'City', name: 'Henderson' },
    { '@type': 'City', name: 'North Las Vegas' },
  ],
  priceRange: '$$$',
}

/* ── Hardcoded Data ─────────────────────────────────────────── */

const PARKS = [
  { name: 'Fox Hill Park', address: '10100 Trails Dr, Las Vegas, NV 89138', acreage: '~20 acres',
    amenities: ['Adventure playground', 'Zip lines & climbing tower', 'Disc golf course', 'Multi-use trails', 'Picnic pavilions', 'Restrooms'] },
  { name: 'Trails Village Park', address: '9201 Trails Village Dr, Las Vegas, NV 89134', acreage: '~8 acres',
    amenities: ['Basketball courts', 'Playground', 'Picnic pavilions', 'Open turf fields'] },
  { name: 'The Paseos Park', address: '2851 Paseo Hills Dr, Las Vegas, NV 89138', acreage: '~12 acres',
    amenities: ['Multi-use sports fields', 'Playground', 'Trail connections', 'Dog-friendly area'] },
  { name: 'Arbors Tennis & Play Park', address: '9501 W Flamingo Rd, Las Vegas, NV 89147', acreage: '~5 acres',
    amenities: ['Tennis courts', 'Pickleball courts', 'Playground', 'Shaded seating'] },
  { name: 'Gardens Park', address: '10401 Garden Park Dr, Las Vegas, NV 89135', acreage: '~10 acres',
    amenities: ['Botanical gardens', 'Walking paths', 'Amphitheater', 'Event lawn'] },
  { name: 'Vistas Community Park', address: '10200 Sun City Blvd, Las Vegas, NV 89134', acreage: '~15 acres',
    amenities: ['Olympic pool', 'Fitness center', 'Tennis courts', 'Community center'] },
]

const BUILDERS = [
  { name: 'Toll Brothers', collections: ['Regency at Summerlin', 'Sterling Crest'], sqft: '2,400\u20135,200 sq ft', price: 'From $850K', note: 'Active in Stonebridge. Luxury and move-up product with premium finishes.' },
  { name: 'Pulte Homes', collections: ['Willow Creek', 'Sterling Park'], sqft: '1,800\u20133,600 sq ft', price: 'From $650K', note: 'Family-focused floor plans in The Paseos with flex spaces.' },
  { name: 'Taylor Morrison', collections: ['Meridian at Summerlin'], sqft: '2,100\u20134,100 sq ft', price: 'From $720K', note: 'Contemporary architecture in Stonebridge with mountain views.' },
  { name: 'Tri Pointe Homes', collections: ['Altis Summerlin (55+)'], sqft: '1,600\u20132,800 sq ft', price: 'From $550K', note: 'Active-adult product line with resort-style amenity center.' },
  { name: 'Richmond American', collections: ['Summerlin West Homes'], sqft: '2,000\u20133,800 sq ft', price: 'From $580K', note: 'Value-oriented product in Summerlin West with personalization.' },
  { name: 'KB Home', collections: ['Painted Desert at Summerlin'], sqft: '1,600\u20132,900 sq ft', price: 'From $490K', note: 'Entry and move-up product with customizable floor plans.' },
]

const NEARBY = [
  { name: 'Summerlin West', href: '/summerlin-west/', price: 'From $500K', compare: 'Newer construction with more affordable entry points than Summerlin South. Growing retail corridor along Far Hills Ave.' },
  { name: 'Henderson', href: '/henderson/', price: 'From $380K', compare: 'More affordable overall with established master-planned communities like Green Valley Ranch, Anthem, and Seven Hills.' },
  { name: 'Skye Canyon', href: '/skye-canyon/', price: 'From $450K', compare: 'Newer northwest Las Vegas master plan with a similar trail system. Lower price point and less established retail.' },
  { name: 'Southern Highlands', href: '/southern-highlands/', price: 'From $550K', compare: 'Guard-gated, golf-anchored community in the south valley. Private country club with resort-style amenities.' },
  { name: 'Red Rock Country Club', href: '/red-rock-country-club/', price: 'From $1.2M', compare: 'Guard-gated golf community within Summerlin boundaries. Two Arnold Palmer-designed courses and private club membership.' },
  { name: 'Providence', href: '/providence/', price: 'From $400K', compare: 'Northwest Las Vegas master plan at a more accessible price tier with newer construction and family-oriented amenities.' },
]

const RELATED_POSTS = [
  { title: 'The Best Schools in Summerlin: A Complete Parent\u2019s Guide', category: 'Education', href: '/blog' },
  { title: 'Summerlin vs. Henderson: Which Las Vegas Community Is Right for You?', category: 'Comparison', href: '/blog' },
  { title: 'New Construction Homes in Summerlin: What\u2019s Available in 2026', category: 'New Builds', href: '/blog' },
  { title: 'Guard-Gated Communities in Las Vegas: The Complete Guide', category: 'Lifestyle', href: '/blog' },
]

/* ── Metadata ───────────────────────────────────────────────── */

export async function generateMetadata(): Promise<Metadata> {
  const cms = await getCommunityPage('summerlin')
  return {
    title: cms?.metaTitle ?? 'Summerlin Las Vegas Homes for Sale | 700+ Listings | Nevada Real Estate Group',
    description: cms?.metaDescription ?? '700+ homes for sale in Summerlin, Las Vegas. $450K\u2013$10M+ \u2014 from condos to custom estates in 20+ villages. Schools, HOA info, builder options. Nevada Real Estate Group \u2014 35+ years of Summerlin expertise.',
  }
}

/* ── Page Component ─────────────────────────────────────────── */

export default async function NewSummerlinPage() {
  const cms = await getCommunityPage('summerlin')

  const heroHeadline = cms?.heroHeadline ?? 'Summerlin'
  const heroSubtitle = 'Homes for Sale in Las Vegas, Nevada'
  const heroSubheadline = cms?.heroSubheadline ?? "Nevada\u2019s most celebrated master-planned community \u2014 22,500 acres of refined desert living against the Red Rock Canyon skyline."
  const overviewTitle = cms?.overviewTitle ?? 'Summerlin: Where Las Vegas Does Living Right'

  const HARDCODED_STATS: Array<[string, string] | [string, string, string]> = [
    ['Established', '1990'],
    ['Developer', 'Howard Hughes Corporation'],
    ['Total Acreage', '22,500 acres'],
    ['Population', '130,000+'],
    ['Median Home Price', '$686,000'],
    ['Villages', '20+'],
    ['Schools', '26 public, private & charter'],
    ['Parks', '250+'],
    ['Miles of Trails', '200+'],
    ['Golf Courses', '10'],
    ['ZIP Codes', '89134, 89135, 89138, 89144, 89145'],
    ['Guard-Gated Villages', 'The Ridges, RRCC, Siena, The Pueblo'],
  ]
  const displayStats = mergeQuickStats(HARDCODED_STATS, cms?.quickStats)
  const HARDCODED_DRIVE_TIMES = [
    { time: '~20 min', destination: 'to the Strip', route: 'via Summerlin Pkwy \u2192 I-15' },
    { time: '~10 min', destination: 'to Red Rock Canyon', route: 'via W Charleston Blvd' },
    { time: '~15 min', destination: 'to Downtown Las Vegas', route: 'via US-95' },
    { time: '~30 min', destination: 'to Harry Reid Airport', route: 'via I-215 South' },
  ]
  const displayDriveTimes = mergeDriveTimes(HARDCODED_DRIVE_TIMES, cms?.quickStats)
  const lifestyleImageUrl = getSectionImageUrl(cms?.sectionImages, 'lifestyle')

  const qs = (key: string, fallback: string) =>
    cms?.quickStats?.find((s) => s.key.toLowerCase() === key.toLowerCase())?.value ?? fallback

  return (
    <main>
      {/* BREADCRUMB */}
      <div className="breadcrumb">
        <div className="breadcrumb-inner">
          <Link href="/">Home</Link>
          <span className="breadcrumb-sep">&rsaquo;</span>
          <a href="/#communities">Communities</a>
          <span className="breadcrumb-sep">&rsaquo;</span>
          <span>Summerlin</span>
        </div>
      </div>

      {/* HERO */}
      <header id="hero" className="summerlin-hero hero-v2">
        <img src={cms?.heroImageUrl ? `${cms.heroImageUrl}?w=1920&auto=format&q=85` : '/summerlin-hero-ai.jpg'} alt="Aerial view of Summerlin master-planned community, Las Vegas, Nevada" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        <div className="hero-overlay" />
        <div className="hero-v2-content">
          <div className="container">
            <h1 className="hero-v2-h1">
              <span className="hero-v2-community">{heroHeadline}</span>
              <span className="hero-v2-subtitle">{heroSubtitle}</span>
            </h1>
            <div className="hero-v2-stats">
              <div className="hero-v2-stat">
                <span className="hero-v2-stat-num">{qs('Active Listings', '485+')}</span>
                <span className="hero-v2-stat-lbl">Active Listings</span>
              </div>
              <div className="hero-v2-stat">
                <span className="hero-v2-stat-num">{qs('Median Home Price', '$686,000')}</span>
                <span className="hero-v2-stat-lbl">Median Price</span>
              </div>
              <div className="hero-v2-stat">
                <span className="hero-v2-stat-num">{qs('Avg Days on Market', '78')}</span>
                <span className="hero-v2-stat-lbl">Avg Days on Market</span>
              </div>
            </div>
            <a href="#listings" className="hero-v2-cta">Search Homes in Summerlin</a>
          </div>
        </div>
      </header>

      {/* QUICK FACTS BAR */}
      <div className="hero-v2-qfb">
        <div className="container">
          <div className="hero-v2-qfb-row">
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <span><strong>ZIP:</strong> 89134, 89135, 89138, 89144</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              <span><strong>Type:</strong> Master-Planned</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
              <span><strong>Price Range:</strong> $300K&ndash;$20M+</span>
            </div>
            <div className="hero-v2-qfb-divider" />
            <div className="hero-v2-qfb-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
              <span><strong>HOA:</strong> Yes</span>
            </div>
          </div>
          <div className="hero-v2-qfb-est">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            <span>Est. 1990</span>
          </div>
        </div>
      </div>

      {/* DEMOGRAPHICS */}
      <section id="demographics" className="demographics-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Demographics</span>
            <h2>Summerlin Demographics</h2>
            <p>Population and household data for the Summerlin area.</p>
          </div>
          <div className="demo-grid">
            {[
              ['130,000+', 'Population'],
              ['42', 'Median Age'],
              ['$112,000', 'Avg Household Income'],
              ['52,000+', 'Total Households'],
              ['68%', 'Homeownership Rate'],
            ].map(([value, label]) => (
              <div className="demo-stat" key={label}>
                <div className="demo-value">{value}</div>
                <div className="demo-label">{label}</div>
              </div>
            ))}
          </div>
          <p className="demo-citation">Source: U.S. Census Bureau, American Community Survey 2022 5-Year Estimates. Figures are approximate for the Summerlin statistical area.</p>
        </div>
      </section>

      {/* MAP */}
      <section id="map" style={{ padding: '64px 0 0', background: 'var(--white)' }}>
        <div className="container">
          <div className="section-header" style={{ marginBottom: '32px' }}>
            <span className="section-label">Location</span>
            <h2>Where is Summerlin?</h2>
            <p>Located along the western rim of the Las Vegas Valley &mdash; backed against the Spring Mountains and Red Rock Canyon.</p>
          </div>
          <div className="map-container">
            <SummerlinMapWrapper />
          </div>
          <div className="drive-time-grid">
            {displayDriveTimes.map(({ time, destination, route }) => (
              <div key={destination} className="drive-time-card">
                <div className="drive-time-time">{time}</div>
                <div className="drive-time-label">{destination}</div>
                <div className="drive-time-route">{route}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LISTINGS */}
      <section id="listings">
        <div className="container">
          <div className="section-header">
            <h2 className="listings-title">NEW SUMMERLIN LISTINGS</h2>
          </div>
          <div className="ylopo-wrap">
            <div className="YLOPO_searchWidget" />
            <div className="YLOPO_resultsWidget" data-search='{"propertyTypes":["house","condo","townhouse"],"minPrice":300000,"locations":[{"city":"Las Vegas","state":"NV"}],"limit":12,"sortBy":"listDate","sortOrder":"desc","keywords":"Summerlin","zipCodes":["89134","89135","89138","89144","89145"]}' />
          </div>
          <p className="ylopo-note">Listing data sourced from regional MLS. Information deemed reliable but not guaranteed. Updated daily.</p>
          <div className="listings-actions">
            <a href="https://search.nevadarealestategroup.net/search?s[orderBy]=sourceCreationDate%2Cdesc&s[page]=1&s[locations][0][city]=Las%20Vegas&s[locations][0][state]=NV&s[keywords]=Summerlin" target="_blank" rel="noopener noreferrer" className="btn-gold">View All Summerlin Listings &rarr;</a>
            <Link href="/#communities" className="btn-outline">&larr; Back to All Communities</Link>
          </div>
        </div>
      </section>

      {/* OVERVIEW */}
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
                  <p>Summerlin has been the Las Vegas Valley&apos;s most sought-after address since the Howard Hughes Corporation broke ground in 1990. Named after Hughes&apos; grandmother Jean Amelia Summerlin, the community was never designed to be just another subdivision &mdash; it was designed to be a complete, self-sustaining neighborhood. Thirty-five years later, that vision has held up remarkably well.</p>
                  <p>Spanning 22,500 acres along the western rim of the Las Vegas Valley, Summerlin backs directly against the Spring Mountains and Red Rock Canyon National Conservation Area. Residents are ten minutes from some of the most dramatic hiking, cycling, and rock climbing terrain in the country, while still being twenty minutes from the Strip. The community&apos;s ZIP codes include 89134, 89135, 89138, 89144, and 89145 &mdash; covering Summerlin North, South, and West.</p>
                  <p>Buyers who discover Summerlin rarely look anywhere else. The community is organized into 20-plus distinct villages &mdash; from the ultra-exclusive guard-gated estates of The Ridges to the family-friendly streets of The Paseos and Stonebridge. Each village has its own character and price point, all connected by 200-plus miles of trails.</p>
                  <p>Through every market cycle &mdash; the booms, the corrections, the recoveries &mdash; Summerlin has consistently held its value better than almost anywhere else in Southern Nevada. The schools are excellent, the streets are well-maintained, and the HOA enforces its standards. The Howard Hughes Corporation continues to develop new phases in Summerlin West, ensuring the community stays current while the established villages appreciate.</p>
                </>
              )}
            </div>
            <div className="overview-aside">
              <div className="quick-facts">
                <h3>Summerlin At a Glance</h3>
                {displayStats.map(([label, value, cls]) => (
                  <div className="fact-row" key={label}>
                    <span className="fact-label">{label}</span>
                    <span className={`fact-value${cls ? ' ' + cls : ''}`}>{value}</span>
                  </div>
                ))}
              </div>
              <div className="cta-card">
                <p>Ready to explore Summerlin? Schedule a private tour of the community and the current listings that match your goals.</p>
                <a href="tel:+17252399950" className="btn-gold">Call 725.239.9950</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MARKET STATISTICS + CTA */}
      <section id="market-stats" className="market-stats-section">
        <div className="container">
          <div className="mstat-layout">
            <div className="mstat-left">
              <div className="section-header">
                <span className="section-label">Market Data</span>
                <h2>Summerlin Real Estate Market Statistics</h2>
                <p>Current market conditions for Summerlin, Las Vegas &mdash; sourced from regional MLS data.</p>
              </div>
              <div className="mstat-table">
                {[
                  ['Median Sale Price', '$686,000', 'gold'],
                  ['Avg Price Per Sq Ft', '$285'],
                  ['Active Listings', '700+'],
                  ['Avg Days on Market', '38'],
                  ['Highest Active Listing', '$12,500,000'],
                  ['Lowest Active Listing', '$389,000'],
                ].map(([label, value, cls]) => (
                  <div className="mstat-row" key={label}>
                    <span className="mstat-label">{label}</span>
                    <span className={`mstat-value${cls ? ' ' + cls : ''}`}>{value}</span>
                  </div>
                ))}
              </div>
              <p className="mstat-citation">Data sourced from NVAR MLS. Last updated: <strong>April 2026</strong>. Information deemed reliable but not guaranteed.</p>
            </div>
            <div className="mstat-cta-card">
              <h3>Get Your Free Summerlin Market Report</h3>
              <p>Comprehensive market analysis delivered to your inbox within 24 hours.</p>
              <form className="mstat-cta-form" action="https://formsubmit.co/info@nevadagroup.com" method="POST">
                <input type="text" placeholder="Your Name" className="mstat-input" />
                <input type="email" placeholder="Email Address" className="mstat-input" />
                <button type="submit" className="btn-gold mstat-submit">Send My Report</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* HIGHLIGHTS */}
      <section id="highlights">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Why Summerlin</span>
            <h2>What Makes Summerlin Stand Out</h2>
            <p>A community this consistently popular doesn&apos;t happen by accident. Here&apos;s what drives demand year after year.</p>
          </div>
          <div className="highlights-grid">
            {[
              { title: 'Red Rock Canyon at Your Door', body: 'Most Summerlin homes are within ten minutes of the Red Rock Canyon National Conservation Area \u2014 200,000 acres of trails, climbing routes, and scenic drives.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M8 21l4-11 4 11"/><path d="M2 21l5-14 4 8"/><path d="M14 15l4-8 4 14"/><line x1="2" y1="21" x2="22" y2="21"/></svg> },
              { title: '26 Schools, Exceptional Choices', body: 'From top-ranked public schools in CCSD to nationally recognized private institutions like Bishop Gorman, Faith Lutheran, and The Meadows School.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M4 19.5A2.5 2.5 0 006.5 22H20V2H6.5A2.5 2.5 0 004 4.5v15z"/></svg> },
              { title: 'Downtown Summerlin', body: 'A 400-acre walkable urban core with 125+ shops and restaurants, a Whole Foods, Las Vegas Ballpark, and City National Arena \u2014 the Golden Knights\u2019 practice facility.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><line x1="8" y1="6" x2="8" y2="6.01"/><line x1="12" y1="6" x2="12" y2="6.01"/><line x1="16" y1="6" x2="16" y2="6.01"/><line x1="8" y1="10" x2="8" y2="10.01"/><line x1="12" y1="10" x2="12" y2="10.01"/><line x1="16" y1="10" x2="16" y2="10.01"/><line x1="8" y1="14" x2="8" y2="14.01"/><line x1="12" y1="14" x2="12" y2="14.01"/><line x1="16" y1="14" x2="16" y2="14.01"/></svg> },
              { title: '250+ Parks & 200+ Miles of Trails', body: 'Summerlin\u2019s trail network connects villages, parks, golf courses, and natural desert arroyos. Fox Hill Park features zip lines, a climbing tower, and disc golf.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22c4-4 8-7.5 8-12a8 8 0 10-16 0c0 4.5 4 8 8 12z"/><circle cx="12" cy="10" r="3"/></svg> },
              { title: '10 Championship Golf Courses', body: 'TPC Summerlin (host of the Shriners Open), Bear\u2019s Best Jack Nicklaus design, two Red Rock Country Club courses \u2014 the golf capital of Southern Nevada.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 2v10l7 4"/></svg> },
              { title: 'Three Decades of Top Rankings', body: 'Summerlin has ranked among the nation\u2019s top-selling master-planned communities for over 30 consecutive years. Property values consistently outperform the broader market.', icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg> },
            ].map(h => (
              <div className="highlight-card" key={h.title}>
                <div className="highlight-icon">{h.icon}</div>
                <h3>{h.title}</h3>
                <p>{h.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VILLAGES */}
      <section id="villages">
        <div className="villages-header-bar">
          <h2>SUMMERLIN NEIGHBORHOODS</h2>
        </div>
        <div className="container">
          <div className="villages-grid">
            {[
              { name: 'The Ridges', type: 'Guard-Gated \u00B7 Ultra-Luxury', desc: '793 acres of the most exclusive addresses in Las Vegas. Custom and semi-custom estates anchored by Bear\u2019s Best golf course.', price: 'From $1.5M+' },
              { name: 'The Paseos', type: 'Family \u00B7 Master-Planned', desc: 'One of Summerlin\u2019s largest villages with 29 neighborhoods. Home to Fox Hill Park, extensive trail access, and top-rated schools.', price: 'From $650K' },
              { name: 'Stonebridge', type: 'Modern \u00B7 Growing', desc: 'Summerlin\u2019s newest major village, developed from 2017 onward. Contemporary architecture with dramatic Spring Mountain views.', price: 'From $700K' },
              { name: 'Red Rock Country Club', type: 'Guard-Gated \u00B7 Golf', desc: 'Gated golf community with two Arnold Palmer-designed courses \u2014 The Arroyo and The Mountain.', price: 'From $1.2M' },
              { name: 'The Summit Club', type: 'Ultra-Private \u00B7 Trophy Estates', desc: 'Las Vegas\u2019 most exclusive private community with a Tom Fazio golf course. By invitation only.', price: 'From $5M+' },
              { name: 'The Canyons', type: 'Established \u00B7 Diverse', desc: 'A well-established village with a range of housing from starter homes to larger estates. Great freeway access and strong schools.', price: 'From $550K' },
              { name: 'Summerlin Centre', type: 'Walkable \u00B7 Mixed-Use', desc: 'At the heart of the community, directly adjacent to Downtown Summerlin. Townhomes and condos within walking distance of everything.', price: 'From $480K' },
              { name: 'The Vistas', type: 'Family \u00B7 Active Lifestyle', desc: 'Known for its resident-only community center with Olympic pool. A popular choice for families who want top-tier amenities.', price: 'From $600K' },
              { name: 'Sun City Summerlin', type: '55+ Active Adult', desc: 'The original active adult community in Las Vegas. Multiple golf courses, fitness centers, clubs, and organized activities.', price: 'From $400K' },
            ].map(v => (
              <div className="village-card" key={v.name}>
                <div className="village-name">{v.name}</div>
                <div className="village-type">{v.type}</div>
                <p className="village-desc">{v.desc}</p>
                <div className="village-price">{v.price}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PARKS & RECREATION */}
      <section id="parks" className="parks-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Outdoor Amenities</span>
            <h2>Parks &amp; Recreation in Summerlin</h2>
            <p>250+ parks across all villages &mdash; from pocket green spaces to full adventure playgrounds.</p>
          </div>
          <div className="parks-grid">
            {PARKS.map(park => (
              <div className="park-card" key={park.name}>
                <h3 className="park-name">{park.name}</h3>
                <p className="park-address">{park.address}</p>
                <span className="park-acreage">{park.acreage}</span>
                <ul className="park-amenities">
                  {park.amenities.map(a => <li key={a}>{a}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LIFESTYLE */}
      <section id="lifestyle" className="lifestyle-v2">
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center' }}>
            <span className="section-label">Outdoor Living</span>
            <h2>The Summerlin Lifestyle</h2>
          </div>
          <div className="lifestyle-v2-grid">
            <div className="lifestyle-v2-item">
              <div className="lifestyle-v2-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>
              </div>
              <div className="lifestyle-v2-stat">200+</div>
              <div className="lifestyle-v2-label">Miles of Trails</div>
            </div>
            <div className="lifestyle-v2-item">
              <div className="lifestyle-v2-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22c4-4 8-7.5 8-12a8 8 0 10-16 0c0 4.5 4 8 8 12z"/><circle cx="12" cy="10" r="3"/></svg>
              </div>
              <div className="lifestyle-v2-stat">250+</div>
              <div className="lifestyle-v2-label">Parks</div>
            </div>
            <div className="lifestyle-v2-item">
              <div className="lifestyle-v2-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 2v10l7 4"/></svg>
              </div>
              <div className="lifestyle-v2-stat">10</div>
              <div className="lifestyle-v2-label">Golf Courses</div>
            </div>
            <div className="lifestyle-v2-item">
              <div className="lifestyle-v2-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 15h18"/><path d="M3 19h18"/><path d="M12 3v8"/><path d="M8 7l4-4 4 4"/></svg>
              </div>
              <div className="lifestyle-v2-stat">4</div>
              <div className="lifestyle-v2-label">Rec Centers</div>
            </div>
            <div className="lifestyle-v2-item">
              <div className="lifestyle-v2-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M8 21l4-11 4 11"/><path d="M2 21l5-14 4 8"/><path d="M14 15l4-8 4 14"/><line x1="2" y1="21" x2="22" y2="21"/></svg>
              </div>
              <div className="lifestyle-v2-stat">10 Min</div>
              <div className="lifestyle-v2-label">to Red Rock Canyon</div>
            </div>
          </div>
        </div>
      </section>

      {/* SCHOOLS */}
      <section id="schools" className="schools-v2 schools-v2-tabs">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Education</span>
            <h2>Schools Serving Summerlin Families</h2>
            <p>School assignments are address-specific. Data sourced from GreatSchools.org, 2025.</p>
          </div>
          <SchoolsTabs />
        </div>
      </section>

      {/* BUILDERS */}
      <section id="builders" className="builders-v5">
        <div className="container">
          <div className="builders-v5-header">
            <span className="section-label">New Construction</span>
            <h2>Builders in Summerlin</h2>
            <div className="builders-v5-rule" />
          </div>
          <div className="builders-v5-grid">
            {BUILDERS.map(b => (
              <div className="builders-v5-card" key={b.name}>
                <h3 className="builders-v5-name">{b.name}</h3>
                <div className="builders-v5-collections">{b.collections.join(' \u00B7 ')}</div>
                <div className="builders-v5-price">{b.price}</div>
              </div>
            ))}
            <div className="builders-v5-contact">
              <div className="builders-v5-contact-inner">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 11.5 19.79 19.79 0 01.12 2.74 2 2 0 012.11 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.09a16 16 0 006 6l.46-.46a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92v2z"/></svg>
                <div>
                  <p className="builders-v5-contact-headline">We Are New Construction Specialists</p>
                  <p className="builders-v5-contact-sub">Call today for exclusive builder incentives and new home availability.</p>
                </div>
                <a href="tel:+17252399950" className="btn-gold">Call 725.239.9950</a>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* TESTIMONIALS */}
      <section id="testimonials" className="testimonials-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Client Stories</span>
            <h2>What Summerlin Buyers Say</h2>
          </div>
          <div className="testimonials-grid">
            {[
              { quote: "We\u2019d been researching Summerlin for eight months before we called Nevada Real Estate Group. Within two weeks we were under contract on a home in The Paseos \u2014 exactly the village, school zone, and price point we wanted. The knowledge of this specific community was unlike anything we\u2019d experienced with other agents.", name: 'Michael & Sara T.', detail: 'Bought in The Paseos, Summerlin \u00B7 2024' },
              { quote: "Sold our Summerlin home in Stonebridge in 11 days at $32,000 over asking. The team knew exactly what buyers in this price range in this village were looking for. The pricing strategy was surgical \u2014 we listed on Thursday and had three offers by Saturday.", name: 'David K.', detail: 'Sold in Stonebridge, Summerlin \u00B7 2025' },
            ].map((t, i) => (
              <div className="testimonial-card" key={i}>
                <div className="testimonial-stars">{'\u2605\u2605\u2605\u2605\u2605'}</div>
                <blockquote className="testimonial-quote">&ldquo;{t.quote}&rdquo;</blockquote>
                <div className="testimonial-meta">
                  <span className="testimonial-name">{t.name}</span>
                  <span className="testimonial-detail">{t.detail}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <SummerlinNewFAQ />

      {/* NEARBY COMMUNITIES */}
      <section id="nearby" className="nearby-v2">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Comparisons</span>
            <h2>Nearby Communities to Consider</h2>
            <p>How Summerlin compares to neighboring communities.</p>
          </div>
          <div className="nearby-v2-table">
            <div className="nearby-v2-header">
              <span>Community</span>
              <span>Starting Price</span>
              <span>Why Consider</span>
              <span></span>
            </div>
            {NEARBY.map(c => (
              <Link href={c.href} key={c.name} className="nearby-v2-row">
                <span className="nearby-v2-name">{c.name}</span>
                <span className="nearby-v2-price">{c.price}</span>
                <span className="nearby-v2-compare">{c.compare}</span>
                <span className="nearby-v2-arrow">&rarr;</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* RELATED BLOG POSTS */}
      <section id="related-posts" className="related-posts-v2">
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center' }}>
            <span className="section-label">Further Reading</span>
            <h2>Summerlin Resources &amp; Guides</h2>
          </div>
          <div className="related-posts-v2-grid">
            <Link href={RELATED_POSTS[0].href} className="related-posts-v2-featured">
              <span className="related-posts-v2-badge">{RELATED_POSTS[0].category}</span>
              <h3>{RELATED_POSTS[0].title}</h3>
              <span className="related-posts-v2-link">Read Article &rarr;</span>
            </Link>
            <div className="related-posts-v2-small">
              {RELATED_POSTS.slice(1).map(p => (
                <Link href={p.href} key={p.title} className="related-posts-v2-card">
                  <span className="related-posts-v2-badge">{p.category}</span>
                  <h4>{p.title}</h4>
                  <span className="related-posts-v2-link">Read &rarr;</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="cta" className="cta-v2">
        <div className="container">
          <div className="cta-v2-inner">
            <div className="cta-v2-content">
              <h2>Ready to Find Your Summerlin Home?</h2>
              <p>We are Summerlin market experts! Nevada&apos;s largest and #1 Real Estate Team and we are committed to getting you the best outcome. Whether you&apos;re buying or selling, let&apos;s talk.</p>
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
                <input type="text" placeholder="Your Name" className="cta-v2-input" />
                <input type="email" placeholder="Email Address" className="cta-v2-input" />
                <input type="tel" placeholder="Phone Number" className="cta-v2-input" />
                <button type="submit" className="btn-gold cta-v2-submit">Get in Touch</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* JSON-LD SCHEMA */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(PLACE_SCHEMA) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(AGENT_SCHEMA) }} />
    </main>
  )
}
