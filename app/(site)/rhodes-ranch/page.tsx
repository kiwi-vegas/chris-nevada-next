import RhodesRanchFAQ from '@/components/RhodesRanchFAQ'
import Link from 'next/link'
import type { Metadata } from 'next'
import RhodesRanchMapWrapper from '@/components/RhodesRanchMapWrapper'
import PortableText from '@/components/PortableText'
import { getCommunityPage } from '@/sanity/queries'
import { mergeQuickStats, mergeDriveTimes, getSectionImageUrl } from '@/lib/community-utils'

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const cms = await getCommunityPage('rhodes-ranch')
  return {
    title: cms?.metaTitle ?? 'Rhodes Ranch Homes For Sale | Nevada Real Estate Group',
    description: cms?.metaDescription ?? 'Browse Rhodes Ranch homes for sale in southwest Las Vegas. Gated golf community with Ted Robinson-designed course. Homes from $250K to $750K+. Call 725.239.9950.',
  }
}

export default async function RhodesRanchPage() {
  const cms = await getCommunityPage('rhodes-ranch')

  const heroHeadline = cms?.heroHeadline ?? 'Rhodes Ranch Homes\nFor Sale'
  const heroSubheadline = cms?.heroSubheadline ?? "A gated southwest Las Vegas community centered around an 18-hole Ted Robinson championship golf course \u2014 the accessible golf lifestyle."
  const overviewTitle = cms?.overviewTitle ?? 'Rhodes Ranch: Golf Community Living Without the Premium'

  const HARDCODED_STATS: Array<[string, string] | [string, string, string]> = [
    ['Established', '1997'],
    ['Type', 'Gated community'],
    ['Homes', '3,500+'],
    ['Golf Course', '18-hole Ted Robinson Sr.'],
    ['Median Home Price', '~$475,000', 'gold'],
    ['Neighborhoods', '10+'],
    ['Schools', '5+ nearby'],
    ['Community Pools', 'Multiple'],
    ['Community Center', 'Yes'],
    ['Gates', 'Staffed / automated'],
    ['Distance to Strip', '~15 min'],
    ['Distance to I-215', '~2 min'],
  ]
  const displayStats = mergeQuickStats(HARDCODED_STATS, cms?.quickStats)
  const HARDCODED_DRIVE_TIMES = [
    { time: '~15 min', destination: 'to the Strip', route: 'via I-215 \u2192 I-15' },
    { time: '~20 min', destination: 'to Harry Reid Airport', route: 'via I-215 \u2192 I-15' },
    { time: '~15 min', destination: 'to Red Rock Canyon', route: 'via W Charleston Blvd' },
    { time: '~10 min', destination: 'to Downtown Summerlin', route: 'via I-215 North' },
  ]
  const displayDriveTimes = mergeDriveTimes(HARDCODED_DRIVE_TIMES, cms?.quickStats)
  const lifestyleImageUrl = getSectionImageUrl(cms?.sectionImages, 'lifestyle')

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
          <span>Rhodes Ranch</span>
        </div>
      </div>

      {/* HERO */}
      <header id="hero" className="summerlin-hero">
        {cms?.heroImageUrl
          ? <img src={`${cms.heroImageUrl}?w=1920&auto=format&q=85`} alt="Rhodes Ranch hero" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
          : <div className="hero-bg" />
        }
        <div className="hero-overlay" />
        <div className="hero-content summerlin">
          <div className="container">
            <p className="hero-eyebrow-sm">Southwest Las Vegas, Nevada</p>
            <div className="hero-rule" />
            <h1>{heroHeadline.split('\n').map((line, i) => (
              <span key={i}>{line}{i < heroHeadline.split('\n').length - 1 && <br />}</span>
            ))}</h1>
            <p className="hero-sub">{heroSubheadline}</p>
            <div className="hero-stats">
              <div className="hero-stat"><span className="hero-stat-num">{qs('Active Listings', '50+')}</span><span className="hero-stat-lbl">Active Listings</span></div>
              <div className="hero-stat"><span className="hero-stat-num">{qs('Price Range', '$250K\u2013$750K+')}</span><span className="hero-stat-lbl">Price Range</span></div>
              <div className="hero-stat"><span className="hero-stat-num">{qs('Golf Course', '18 holes')}</span><span className="hero-stat-lbl">Championship Golf</span></div>
              <div className="hero-stat"><span className="hero-stat-num">{qs('Homes', '3,500+')}</span><span className="hero-stat-lbl">Homes</span></div>
            </div>
          </div>
        </div>
      </header>

      {/* MAP */}
      <section id="map" style={{ padding: '32px 0 0', background: 'var(--charcoal)' }}>
        <div className="container">
          <div className="section-header" style={{ marginBottom: '32px' }}>
            <span className="section-label">Location</span>
            <h2>Where is Rhodes Ranch?</h2>
            <p>Located in southwest Las Vegas near Durango Drive and Warm Springs Road &mdash; minutes from the I-215 beltway with direct access to the Strip, Henderson, and Summerlin.</p>
          </div>
          <div className="map-container">
            <RhodesRanchMapWrapper />
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
            <span className="section-label">New Listings &middot; Updated Daily</span>
            <h2>New Rhodes Ranch Listings</h2>
            <p>The 12 most recently listed homes in Rhodes Ranch &mdash; golf course homes, single-family, and townhomes from $250K.</p>
          </div>
          <div className="ylopo-wrap">
            <div className="YLOPO_searchWidget" />
            <div className="YLOPO_resultsWidget" data-search='{"propertyTypes":["house","condo","townhouse"],"minPrice":200000,"locations":[{"city":"Las Vegas","state":"NV"}],"limit":12,"sortBy":"listDate","sortOrder":"desc","keywords":"Rhodes Ranch"}' />
          </div>
          <p className="ylopo-note">Listing data sourced from regional MLS. Information deemed reliable but not guaranteed. Updated daily.</p>
          <div className="listings-actions">
            <a href="https://search.nevadarealestategroup.net/search?s[orderBy]=sourceCreationDate%2Cdesc&s[page]=1&s[locations][0][city]=Las%20Vegas&s[locations][0][state]=NV&s[keywords]=Rhodes%20Ranch" target="_blank" rel="noopener noreferrer" className="btn-gold">View New Rhodes Ranch Listings Now &rarr;</a>
            <Link href="/#communities" className="btn-outline">&larr; Back to All Communities</Link>
          </div>
        </div>
      </section>

      {/* OVERVIEW */}
      <section id="overview">
        <div className="container">
          <div className="overview-grid">
            <div className="overview-text">
              <span className="section-label">A Local&apos;s Perspective</span>
              <div className="gold-rule" />
              <h2>{overviewTitle}</h2>
              {cms?.overviewBody?.length ? (
                <PortableText value={cms.overviewBody} />
              ) : (
                <>
                  <p>Rhodes Ranch is the community I recommend to buyers who tell me they want the gated golf lifestyle but don&apos;t want to stretch their budget to get it. When it was developed in the late 1990s, the concept was straightforward &mdash; build a championship golf course, gate the entire community, include resort-style amenities, and price it so working professionals could actually afford to live there. Nearly three decades later, that formula still works.</p>
                  <p>The golf course itself is an 18-hole Ted Robinson Sr. design, and Ted Robinson was one of the most prolific golf course architects in the American West. He was known for dramatic water features, and Rhodes Ranch delivers on that &mdash; lakes, waterfalls, and meandering streams run through the course, giving the community a lush, resort-like feel that you don&apos;t typically get at this price point. The course is technically public, but residents get preferred tee times and discounted rates.</p>
                  <p>The community amenities go beyond the golf course. Multiple resort-style pools, a community center, parks, walking paths, and organized social events give Rhodes Ranch the feel of a community where people actually know their neighbors. The HOA keeps the common areas and gates well-maintained, and the landscaping throughout the community is mature and established.</p>
                  <p>Location is another strength. Rhodes Ranch sits just off the I-215 beltway near Durango Drive, which puts you 15 minutes from the Strip, 10 minutes from Downtown Summerlin, and 15 minutes from Red Rock Canyon. For anyone who works in hospitality, healthcare, or aviation, the commute math is excellent. And the price of entry &mdash; townhomes from around $250K, single-family homes from around $400K &mdash; makes it one of the most accessible gated golf communities in the Las Vegas Valley.</p>
                </>
              )}
            </div>
            <div className="overview-aside">
              <div className="quick-facts">
                <h3>Rhodes Ranch At a Glance</h3>
                {displayStats.map(([label, value, cls]) => (
                  <div className="fact-row" key={label}>
                    <span className="fact-label">{label}</span>
                    <span className={`fact-value${cls ? ' ' + cls : ''}`}>{value}</span>
                  </div>
                ))}
              </div>
              <div className="cta-card">
                <p>Ready to explore Rhodes Ranch? Let&apos;s schedule a private tour of the community, the golf course, and the listings that match your goals.</p>
                <a href="tel:+17252399950" className="btn-gold">Call 725.239.9950</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HIGHLIGHTS */}
      <section id="highlights">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Why Rhodes Ranch</span>
            <h2>What Makes Rhodes Ranch Stand Out</h2>
            <p>Gated golf community living at a price point that actually makes sense.</p>
          </div>
          <div className="highlights-grid">
            {[
              { icon: '\u26F3', title: '18-Hole Ted Robinson Course', body: 'A championship layout by one of the West\u2019s most celebrated course architects. Known for its water features, mature landscaping, and mountain views. Public play with resident discounts.' },
              { icon: '\u{1F512}', title: 'Fully Gated Community', body: 'Controlled-access entry points with staffed and automated gates throughout. The security and privacy of a gated community at price points well below comparable options like Southern Highlands.' },
              { icon: '\u{1F3CA}', title: 'Resort-Style Amenities', body: 'Multiple swimming pools, a community center, parks, walking paths, and organized social programming. Amenities that rival much more expensive communities \u2014 included with your HOA.' },
              { icon: '\u{1F4B0}', title: 'Golf Community Value', body: 'Entry from ~$250K for townhomes, ~$400K for single-family. One of the most affordable gated golf communities in the Las Vegas Valley \u2014 golf lifestyle without the luxury tax.' },
              { icon: '\u{1F6E3}\uFE0F', title: 'I-215 Beltway Access', body: 'Directly adjacent to the I-215 beltway at Durango Drive. 15 minutes to the Strip, 10 to Downtown Summerlin, 15 to Red Rock Canyon, 20 to the airport.' },
              { icon: '\u{1F333}', title: 'Mature & Established', body: 'Nearly three decades of matured landscaping, established trees, and a settled community character. Rhodes Ranch feels like home from day one \u2014 no waiting for trees to grow.' },
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

      {/* NEIGHBORHOODS */}
      <section id="villages">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Neighborhoods</span>
            <h2>Explore Rhodes Ranch&apos;s Neighborhoods</h2>
            <p>From golf course estates to entry-level townhomes, all within the gates.</p>
          </div>
          <div className="villages-grid">
            {[
              { name: 'Golf Course Homes', type: 'Golf Frontage \u00B7 Premium', desc: 'Single-family homes directly on the golf course with fairway and water feature views. The premier positioning within Rhodes Ranch, with open-space buffers and mature landscaping.', price: 'From $550K' },
              { name: 'Interior Single-Family', type: 'Family \u00B7 Established', desc: 'The core of Rhodes Ranch \u2014 well-maintained single-family neighborhoods with 3\u20135 bedrooms, community pool access, and walking distance to the community center and parks.', price: 'From $400K' },
              { name: 'Rhodes Ranch Townhomes', type: 'Attached \u00B7 Low-Maintenance', desc: 'Townhome communities within the gates offering low-maintenance living with full access to all community amenities. Popular with first-time buyers and downsizers.', price: 'From $250K' },
              { name: 'Cul-de-Sac Neighborhoods', type: 'Family \u00B7 Quiet', desc: 'Several Rhodes Ranch neighborhoods feature cul-de-sac layouts that minimize through traffic \u2014 popular with families who want an extra layer of privacy within the gates.', price: 'From $425K' },
              { name: 'Pool-View Homes', type: 'Community Pool \u00B7 Convenient', desc: 'Homes positioned near one of the community\u2019s resort-style pools. The convenience of a pool steps from your door without the maintenance of a private pool.', price: 'From $420K' },
              { name: 'Larger Estate Homes', type: 'Move-Up \u00B7 Spacious', desc: 'The largest homes in Rhodes Ranch with 4\u20135 bedrooms, three-car garages, and premium lot sizes. Many with golf course or mountain views.', price: 'From $650K+' },
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

      {/* LIFESTYLE */}
      <section id="lifestyle">
        <div className="container">
          <div className="lifestyle-split">
            <div className="lifestyle-img">
              <img
                src={lifestyleImageUrl ? `${lifestyleImageUrl}?w=900&auto=format&q=85` : '/red-rock-canyon.jpg'}
                alt="Golf course and community lifestyle at Rhodes Ranch, Las Vegas"
              />
            </div>
            <div className="lifestyle-content">
              <span className="section-label">Golf &amp; Outdoor Living</span>
              <div className="gold-rule" />
              <h2>Championship Golf, Resort Pools, and Red Rock Sunsets</h2>
              <p>Rhodes Ranch was designed around the golf course, and it shows. The Ted Robinson layout weaves through the community with lakes, waterfalls, and mature trees creating a green corridor that benefits every neighborhood &mdash; whether you play golf or not.</p>
              <p>Beyond the course, the community&apos;s pools, parks, and walking paths provide everyday recreation, while Red Rock Canyon is just 15 minutes west for hiking and outdoor adventures.</p>
              <div className="lifestyle-bullets">
                {[
                  'Rhodes Ranch Golf Club \u2014 18-hole Ted Robinson Sr. design with water features, lakes, and mountain views',
                  'Multiple resort-style community pools with cabana areas and lap lanes',
                  'Community center with event spaces, fitness area, and social programming',
                  'Walking and jogging paths throughout the community connecting to parks and open spaces',
                  'Red Rock Canyon National Conservation Area \u2014 roughly 15 minutes west via Charleston Blvd',
                ].map((b, i) => <div className="lifestyle-bullet" key={i}>{b}</div>)}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SCHOOLS */}
      <section id="schools">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Education</span>
            <h2>Schools Serving Rhodes Ranch Families</h2>
            <p>Strong southwest Las Vegas school options in both public and private sectors.</p>
          </div>
          <div className="schools-layout">
            <div className="school-group">
              <h3>Public Schools (CCSD)</h3>
              {[['Gene Ward Elementary','K\u20135'],['William E. Orr Middle School','6\u20138'],['Sierra Vista High School','9\u201312'],['Desert Oasis High School','9\u201312'],['West Career & Technical Academy','9\u201312'],].map(([n,g])=>(
                <div className="school-item" key={n}>{n}<span className="school-grades">{g}</span></div>
              ))}
            </div>
            <div className="school-group">
              <h3>Private &amp; Faith-Based</h3>
              {[['Bishop Gorman High School','Catholic \u00B7 9\u201312'],['Mountain View Christian School','PreK\u201312'],['The Meadows School','PreK\u201312'],].map(([n,g])=>(
                <div className="school-item" key={n}>{n}<span className="school-grades">{g}</span></div>
              ))}
            </div>
            <div className="school-group">
              <h3>Charter &amp; Specialty</h3>
              {[['Doral Academy Red Rock','K\u20138'],['Somerset Academy','K\u20138'],['Pinecrest Academy of Nevada','K\u201312'],].map(([n,g])=>(
                <div className="school-item" key={n}>{n}<span className="school-grades">{g}</span></div>
              ))}
              <div style={{marginTop:'24px',padding:'18px',background:'rgba(201,168,76,0.06)',border:'1px solid var(--border)',borderRadius:'var(--radius)',fontSize:'13px',color:'var(--white-70)',lineHeight:'1.7'}}>
                <strong style={{color:'var(--white)'}}>School Assignment Note:</strong> School zones in southwest Las Vegas vary by address. Always confirm your assigned school with CCSD before purchasing.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <RhodesRanchFAQ />

      {/* CTA */}
      <section id="cta">
        <div className="container">
          <h2>Ready to Find Your Rhodes Ranch Home?</h2>
          <p>Whether you want a golf course view, a family home behind the gates, or a townhome to start building equity, I&apos;ll help you find the right fit in Rhodes Ranch.</p>
          <div className="cta-actions">
            <a href="tel:+17252399950" className="btn-gold">Call 725.239.9950</a>
            <a href="#listings" className="btn-outline">Browse All Listings</a>
          </div>
          <p style={{marginTop:'24px',fontSize:'12px',color:'rgba(255,255,255,0.3)'}}>Nevada Lic. #S.0181401.LLC &middot; lpt Realty</p>
        </div>
      </section>
    </main>
  )
}
