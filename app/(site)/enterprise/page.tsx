import EnterpriseFAQ from '@/components/EnterpriseFAQ'
import Link from 'next/link'
import type { Metadata } from 'next'
import EnterpriseMapWrapper from '@/components/EnterpriseMapWrapper'
import PortableText from '@/components/PortableText'
import { getCommunityPage } from '@/sanity/queries'
import { mergeQuickStats, mergeDriveTimes, getSectionImageUrl } from '@/lib/community-utils'

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const cms = await getCommunityPage('enterprise')
  return {
    title: cms?.metaTitle ?? 'Enterprise Homes For Sale | Nevada Real Estate Group',
    description: cms?.metaDescription ?? 'Browse Enterprise homes for sale in southwest Las Vegas. Minutes from the Strip and airport with easy I-15 and I-215 access. Homes from $250K to $1M+. Call 725.239.9950.',
  }
}

export default async function EnterprisePage() {
  const cms = await getCommunityPage('enterprise')

  const heroHeadline = cms?.heroHeadline ?? 'Enterprise Homes\nFor Sale'
  const heroSubheadline = cms?.heroSubheadline ?? "Southwest Las Vegas\u2019 most connected community \u2014 minutes from the Strip, the airport, and two major freeways, with neighborhoods for every budget."
  const overviewTitle = cms?.overviewTitle ?? 'Enterprise: Southwest Las Vegas at the Center of Everything'

  const HARDCODED_STATS: Array<[string, string] | [string, string, string]> = [
    ['Type', 'Unincorporated town'],
    ['County', 'Clark County'],
    ['Population', '~170,000'],
    ['Area', '~44 sq miles'],
    ['Median Home Price', '~$475,000', 'gold'],
    ['Neighborhoods', '30+'],
    ['Schools', '15+ nearby'],
    ['Golf Courses', '5+'],
    ['Key Freeways', 'I-15 & I-215'],
    ['Nearest Airport', 'Harry Reid (5\u201315 min)'],
    ['Distance to Strip', '5\u201315 min'],
    ['Distance to Red Rock', '~20 min'],
  ]
  const displayStats = mergeQuickStats(HARDCODED_STATS, cms?.quickStats)
  const HARDCODED_DRIVE_TIMES = [
    { time: '5\u201315 min', destination: 'to the Strip', route: 'via Las Vegas Blvd or I-15' },
    { time: '10\u201315 min', destination: 'to Harry Reid Airport', route: 'via I-15 or Las Vegas Blvd' },
    { time: '~20 min', destination: 'to Red Rock Canyon', route: 'via I-215 West' },
    { time: '~15 min', destination: 'to Downtown Las Vegas', route: 'via I-15 North' },
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
          <span>Enterprise</span>
        </div>
      </div>

      {/* HERO */}
      <header id="hero" className="summerlin-hero">
        {cms?.heroImageUrl
          ? <img src={`${cms.heroImageUrl}?w=1920&auto=format&q=85`} alt="Enterprise hero" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
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
              <div className="hero-stat"><span className="hero-stat-num">{qs('Active Listings', '500+')}</span><span className="hero-stat-lbl">Active Listings</span></div>
              <div className="hero-stat"><span className="hero-stat-num">{qs('Price Range', '$250K\u2013$1M+')}</span><span className="hero-stat-lbl">Price Range</span></div>
              <div className="hero-stat"><span className="hero-stat-num">{qs('Distance to Strip', '5\u201315 min')}</span><span className="hero-stat-lbl">To the Strip</span></div>
              <div className="hero-stat"><span className="hero-stat-num">{qs('Population', '170K+')}</span><span className="hero-stat-lbl">Population</span></div>
            </div>
          </div>
        </div>
      </header>

      {/* MAP */}
      <section id="map" style={{ padding: '32px 0 0', background: 'var(--charcoal)' }}>
        <div className="container">
          <div className="section-header" style={{ marginBottom: '32px' }}>
            <span className="section-label">Location</span>
            <h2>Where is Enterprise?</h2>
            <p>Spanning southwest Las Vegas from the south end of the Strip to the I-215 beltway &mdash; one of the most centrally connected areas in the valley.</p>
          </div>
          <div className="map-container">
            <EnterpriseMapWrapper />
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
            <h2>New Enterprise Listings</h2>
            <p>The 12 most recently listed homes in Enterprise &mdash; condos, townhomes, and single-family homes from $250K to $1M+.</p>
          </div>
          <div className="ylopo-wrap">
            <div className="YLOPO_searchWidget" />
            <div className="YLOPO_resultsWidget" data-search='{"propertyTypes":["house","condo","townhouse"],"minPrice":200000,"locations":[{"city":"Las Vegas","state":"NV"}],"limit":12,"sortBy":"listDate","sortOrder":"desc","keywords":"Enterprise"}' />
          </div>
          <p className="ylopo-note">Listing data sourced from regional MLS. Information deemed reliable but not guaranteed. Updated daily.</p>
          <div className="listings-actions">
            <a href="https://search.nevadarealestategroup.net/search?s[orderBy]=sourceCreationDate%2Cdesc&s[page]=1&s[locations][0][city]=Las%20Vegas&s[locations][0][state]=NV&s[keywords]=Enterprise" target="_blank" rel="noopener noreferrer" className="btn-gold">View New Enterprise Listings Now &rarr;</a>
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
                  <p>Enterprise is one of those areas that a lot of out-of-state buyers don&apos;t know by name, but once I show them the map, it clicks immediately. This is the southwest quadrant of the Las Vegas Valley &mdash; an unincorporated Clark County town that stretches from the south end of the Strip all the way to the mountains. It borders Henderson to the east, Southern Highlands to the south, and Summerlin-adjacent areas to the northwest. In terms of pure location, it&apos;s hard to beat.</p>
                  <p>What makes Enterprise work for so many of my clients is the combination of proximity and variety. You can be on the Strip or at the airport in 5&ndash;15 minutes. You have I-15 running through the east side and I-215 looping through the south and west. If you work in hospitality, aviation, healthcare, or anywhere along those freeway corridors, Enterprise is the commute sweet spot. And unlike a lot of commuter-friendly areas, this isn&apos;t all tract housing &mdash; Enterprise has genuine neighborhood diversity.</p>
                  <p>Southern Highlands, one of the most prestigious master-planned communities in the valley, sits within Enterprise. So does Rhodes Ranch with its golf course and family-friendly streets. The corridor along Bermuda Road and Cactus Avenue has seen a wave of newer construction. And there are still pockets of older, non-HOA neighborhoods for buyers who want more flexibility and lower monthly costs. The price range reflects all of that &mdash; from $250K condos to $1M+ estates.</p>
                  <p>The retail and dining infrastructure has matured significantly over the past decade. The St. Rose Parkway corridor is packed with shopping, restaurants, and medical facilities. The M Resort Spa Casino anchors the southern end. And the new UNLV campus expansion and Raiders headquarters have brought even more investment into the area. Enterprise isn&apos;t the flashiest name on the map, but in terms of value, connectivity, and long-term upside, it&apos;s one of the smartest places to buy in Las Vegas.</p>
                </>
              )}
            </div>
            <div className="overview-aside">
              <div className="quick-facts">
                <h3>Enterprise At a Glance</h3>
                {displayStats.map(([label, value, cls]) => (
                  <div className="fact-row" key={label}>
                    <span className="fact-label">{label}</span>
                    <span className={`fact-value${cls ? ' ' + cls : ''}`}>{value}</span>
                  </div>
                ))}
              </div>
              <div className="cta-card">
                <p>Ready to explore Enterprise? Let&apos;s schedule a private tour and find the neighborhood that fits your lifestyle and commute.</p>
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
            <span className="section-label">Why Enterprise</span>
            <h2>What Makes Enterprise Stand Out</h2>
            <p>Location, variety, and value &mdash; the three things buyers consistently tell me they love about Enterprise.</p>
          </div>
          <div className="highlights-grid">
            {[
              { icon: '\u{1F4CD}', title: 'Minutes From Everything', body: '5\u201315 minutes to the Strip and Harry Reid Airport. I-15 and I-215 put you 10\u201320 minutes from virtually every major employment center, shopping district, and entertainment venue in the valley.' },
              { icon: '\u{1F3E0}', title: 'Every Price Point Covered', body: 'From $250K condos to $1M+ guard-gated estates. Enterprise has starter homes, move-up neighborhoods, golf communities, and luxury enclaves \u2014 all within the same area code.' },
              { icon: '\u26F3', title: 'Multiple Golf Communities', body: 'Southern Highlands Golf Club, Rhodes Ranch, and several other courses put championship golf within minutes. Both private and public options for every level of player.' },
              { icon: '\u{1F3EB}', title: 'Strong School Options', body: 'Home to Bishop Gorman High School \u2014 one of Nevada\u2019s top private schools \u2014 plus well-regarded CCSD public schools and multiple charter academies.' },
              { icon: '\u{1F6CD}\uFE0F', title: 'St. Rose Parkway Corridor', body: 'A fully built-out commercial corridor with major retailers, restaurants, medical facilities, and the M Resort Spa Casino. Daily errands never require a long drive.' },
              { icon: '\u{1F4C8}', title: 'Long-Term Growth', body: 'UNLV campus expansion, Raiders headquarters, and ongoing commercial development continue to drive investment and appreciation in the Enterprise area.' },
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
            <h2>Explore Enterprise&apos;s Neighborhoods</h2>
            <p>From guard-gated golf communities to accessible starter neighborhoods, Enterprise has genuine variety.</p>
          </div>
          <div className="villages-grid">
            {[
              { name: 'Southern Highlands', type: 'Guard-Gated \u00B7 Golf \u00B7 Luxury', desc: 'The premier address in Enterprise \u2014 a large master-planned community with a private golf club, resort-style amenities, parks, and homes ranging from family residences to custom estates.', price: 'From $550K' },
              { name: 'Rhodes Ranch', type: 'Golf \u00B7 Family', desc: 'A well-established golf community centered around the Rhodes Ranch Golf Club. Family-friendly neighborhoods with mature landscaping, community pools, and parks.', price: 'From $400K' },
              { name: 'Coronado Ranch', type: 'Gated \u00B7 Established', desc: 'A gated community near the I-215 and Bermuda Road interchange. Well-maintained neighborhoods with community pools and parks at accessible price points.', price: 'From $380K' },
              { name: 'Bermuda / Cactus Corridor', type: 'New Construction \u00B7 Modern', desc: 'One of the newest development corridors in Enterprise. Contemporary floor plans, energy-efficient construction, and proximity to the St. Rose Parkway commercial strip.', price: 'From $420K' },
              { name: 'Enterprise Townhomes & Condos', type: 'Attached \u00B7 Entry-Level', desc: 'Townhome and condo communities near the Strip corridor and major freeways. Ideal for first-time buyers, investors, and professionals who want proximity to work.', price: 'From $250K' },
              { name: 'Custom & Estate Homes', type: 'Luxury \u00B7 Premium', desc: 'Scattered custom lots and estate-sized properties throughout Enterprise, including golf course frontage in Southern Highlands and mountain-view parcels near the western boundary.', price: 'From $900K+' },
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
                alt="Southwest Las Vegas landscape near Enterprise"
              />
            </div>
            <div className="lifestyle-content">
              <span className="section-label">Lifestyle &amp; Amenities</span>
              <div className="gold-rule" />
              <h2>Strip Access, Mountain Views, and a Fully Built-Out Corridor</h2>
              <p>Enterprise gives you something rare in Las Vegas &mdash; the ability to live minutes from the action without feeling like you&apos;re in the middle of it. The southwest corridor has matured into one of the most complete suburban environments in the valley, with everything from world-class dining to neighborhood parks.</p>
              <p>The western edge of Enterprise backs up to mountain terrain with hiking access, while the east side puts the Strip and airport within a short drive.</p>
              <div className="lifestyle-bullets">
                {[
                  'Las Vegas Strip and Harry Reid Airport both 5\u201315 minutes away via I-15 or Las Vegas Blvd',
                  'St. Rose Parkway corridor with major retail, dining, medical facilities, and M Resort Spa Casino',
                  'Multiple golf courses including Southern Highlands Golf Club and Rhodes Ranch',
                  'Red Rock Canyon National Conservation Area ~20 minutes west via I-215',
                  'Sloan Canyon National Conservation Area and Wetlands Park accessible for hiking and nature walks',
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
            <h2>Schools Serving Enterprise Families</h2>
            <p>A mix of strong public, private, and charter options serving the southwest corridor.</p>
          </div>
          <div className="schools-layout">
            <div className="school-group">
              <h3>Public Schools (CCSD)</h3>
              {[['Gene Ward Elementary','K\u20135'],['Elbert Edwards Elementary','K\u20135'],['Tom Williams Elementary','K\u20135'],['Walter Johnson Middle School','6\u20138'],['Larry & Sandra Schaben Middle','6\u20138'],['Sierra Vista High School','9\u201312'],['Desert Oasis High School','9\u201312'],].map(([n,g])=>(
                <div className="school-item" key={n}>{n}<span className="school-grades">{g}</span></div>
              ))}
            </div>
            <div className="school-group">
              <h3>Private &amp; Faith-Based</h3>
              {[['Bishop Gorman High School','Catholic \u00B7 9\u201312'],['Henderson International School','PreK\u201312'],['Merryhill School','PreK\u20135'],['St. Elizabeth Ann Seton','PreK\u20138'],].map(([n,g])=>(
                <div className="school-item" key={n}>{n}<span className="school-grades">{g}</span></div>
              ))}
            </div>
            <div className="school-group">
              <h3>Charter &amp; Specialty</h3>
              {[['Doral Academy Red Rock','K\u20138'],['Somerset Academy','K\u20138'],['Pinecrest Academy of Nevada','K\u201312'],['Coral Academy of Science','K\u201312'],].map(([n,g])=>(
                <div className="school-item" key={n}>{n}<span className="school-grades">{g}</span></div>
              ))}
              <div style={{marginTop:'24px',padding:'18px',background:'rgba(201,168,76,0.06)',border:'1px solid var(--border)',borderRadius:'var(--radius)',fontSize:'13px',color:'var(--white-70)',lineHeight:'1.7'}}>
                <strong style={{color:'var(--white)'}}>School Assignment Note:</strong> Enterprise spans a large area with multiple school zones. Assignments vary significantly by address. Always confirm your assigned school with CCSD before purchasing.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <EnterpriseFAQ />

      {/* CTA */}
      <section id="cta">
        <div className="container">
          <h2>Ready to Find Your Enterprise Home?</h2>
          <p>From golf course living in Southern Highlands to starter homes near the Strip, I&apos;ll help you find the right neighborhood and price point in Enterprise.</p>
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
