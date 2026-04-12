import WhitneyRanchFAQ from '@/components/WhitneyRanchFAQ'
import Link from 'next/link'
import type { Metadata } from 'next'
import WhitneyRanchMapWrapper from '@/components/WhitneyRanchMapWrapper'
import PortableText from '@/components/PortableText'
import { getCommunityPage } from '@/sanity/queries'
import { mergeQuickStats, mergeDriveTimes, getSectionImageUrl } from '@/lib/community-utils'

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const cms = await getCommunityPage('whitney-ranch')
  return {
    title: cms?.metaTitle ?? 'Whitney Ranch Homes For Sale | Nevada Real Estate Group',
    description: cms?.metaDescription ?? 'Browse Whitney Ranch homes for sale in Henderson, NV. One of Henderson\u2019s oldest master-planned communities near Galleria at Sunset. Homes from $250K to $650K+. Call 725.239.9950.',
  }
}

export default async function WhitneyRanchPage() {
  const cms = await getCommunityPage('whitney-ranch')

  const heroHeadline = cms?.heroHeadline ?? 'Whitney Ranch Homes\nFor Sale'
  const heroSubheadline = cms?.heroSubheadline ?? "One of Henderson\u2019s founding master-planned communities \u2014 30+ years of mature landscaping, walkable retail, and the established character that only time can build."
  const overviewTitle = cms?.overviewTitle ?? 'Whitney Ranch: Henderson\u2019s Original Master-Planned Community'

  const HARDCODED_STATS: Array<[string, string] | [string, string, string]> = [
    ['Established', 'Late 1980s'],
    ['Type', 'Master-planned community'],
    ['City', 'Henderson'],
    ['Character', 'Mature & established'],
    ['Median Home Price', '~$425,000', 'gold'],
    ['Neighborhoods', '15+'],
    ['Schools', '6+ nearby'],
    ['Parks', 'Multiple community parks'],
    ['Rec Center', 'Whitney Ranch Recreation Center'],
    ['Retail', 'Galleria at Sunset (walkable)'],
    ['Distance to Strip', '15\u201320 min'],
    ['Distance to Airport', '10\u201315 min'],
  ]
  const displayStats = mergeQuickStats(HARDCODED_STATS, cms?.quickStats)
  const HARDCODED_DRIVE_TIMES = [
    { time: '15\u201320 min', destination: 'to the Strip', route: 'via I-215 \u2192 I-15 or Sunset Rd' },
    { time: '10\u201315 min', destination: 'to Harry Reid Airport', route: 'via I-215 or Eastern Ave' },
    { time: '~5 min', destination: 'to Galleria at Sunset', route: 'via Galleria Dr (walkable)' },
    { time: '~10 min', destination: 'to Water Street District', route: 'via Lake Mead Pkwy' },
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
          <span>Whitney Ranch</span>
        </div>
      </div>

      {/* HERO */}
      <header id="hero" className="summerlin-hero">
        {cms?.heroImageUrl
          ? <img src={`${cms.heroImageUrl}?w=1920&auto=format&q=85`} alt="Whitney Ranch hero" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
          : <div className="hero-bg" />
        }
        <div className="hero-overlay" />
        <div className="hero-content summerlin">
          <div className="container">
            <p className="hero-eyebrow-sm">Henderson, Nevada</p>
            <div className="hero-rule" />
            <h1>{heroHeadline.split('\n').map((line, i) => (
              <span key={i}>{line}{i < heroHeadline.split('\n').length - 1 && <br />}</span>
            ))}</h1>
            <p className="hero-sub">{heroSubheadline}</p>
            <div className="hero-stats">
              <div className="hero-stat"><span className="hero-stat-num">{qs('Active Listings', '75+')}</span><span className="hero-stat-lbl">Active Listings</span></div>
              <div className="hero-stat"><span className="hero-stat-num">{qs('Price Range', '$250K\u2013$650K+')}</span><span className="hero-stat-lbl">Price Range</span></div>
              <div className="hero-stat"><span className="hero-stat-num">{qs('Established', '1980s')}</span><span className="hero-stat-lbl">Established</span></div>
              <div className="hero-stat"><span className="hero-stat-num">{qs('Retail', 'Walkable')}</span><span className="hero-stat-lbl">Galleria at Sunset</span></div>
            </div>
          </div>
        </div>
      </header>

      {/* MAP */}
      <section id="map" style={{ padding: '32px 0 0', background: 'var(--charcoal)' }}>
        <div className="container">
          <div className="section-header" style={{ marginBottom: '32px' }}>
            <span className="section-label">Location</span>
            <h2>Where is Whitney Ranch?</h2>
            <p>In the heart of central Henderson near Galleria Drive and Sunset Road &mdash; walkable to major retail and minutes from I-215 and the airport.</p>
          </div>
          <div className="map-container">
            <WhitneyRanchMapWrapper />
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
            <h2>New Whitney Ranch Listings</h2>
            <p>The 12 most recently listed homes in Whitney Ranch &mdash; condos, townhomes, and single-family homes from $250K.</p>
          </div>
          <div className="ylopo-wrap">
            <div className="YLOPO_searchWidget" />
            <div className="YLOPO_resultsWidget" data-search='{"propertyTypes":["house","condo","townhouse"],"minPrice":200000,"locations":[{"city":"Henderson","state":"NV"}],"limit":12,"sortBy":"listDate","sortOrder":"desc","keywords":"Whitney Ranch"}' />
          </div>
          <p className="ylopo-note">Listing data sourced from regional MLS. Information deemed reliable but not guaranteed. Updated daily.</p>
          <div className="listings-actions">
            <a href="https://search.nevadarealestategroup.net/search?s[orderBy]=sourceCreationDate%2Cdesc&s[page]=1&s[locations][0][city]=Henderson&s[locations][0][state]=NV&s[keywords]=Whitney%20Ranch" target="_blank" rel="noopener noreferrer" className="btn-gold">View New Whitney Ranch Listings Now &rarr;</a>
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
                  <p>Whitney Ranch holds a special place in Henderson&apos;s history. When development started in the late 1980s, Henderson was still a small city finding its identity beyond the industrial roots of the Boulder Highway corridor. Whitney Ranch was one of the first master-planned communities to bet on Henderson as a genuine residential destination &mdash; and that bet paid off. Three decades later, Henderson is one of the safest, most desirable cities in Nevada, and Whitney Ranch sits right at its center.</p>
                  <p>What makes Whitney Ranch work today is the combination of maturity and location that newer communities can&apos;t match. The trees are grown. The landscaping is filled in. The streets have the settled, lived-in character that takes twenty or thirty years to develop. Walk through Whitney Ranch in the evening and you&apos;ll see kids on bikes, neighbors on porches, and the kind of community life that master-planned developers promise but only time delivers.</p>
                  <p>The Galleria at Sunset location is a genuine lifestyle advantage. Henderson&apos;s largest regional mall is within walking distance of many Whitney Ranch neighborhoods &mdash; along with dozens of restaurants, a movie theater, and major retailers along the Galleria Drive and Sunset Road corridors. You can walk to dinner, walk to shopping, and still be home in 10 minutes. That kind of walkable retail access barely exists in Las Vegas, and it&apos;s something buyers consistently underestimate until they experience it.</p>
                  <p>The Whitney Ranch Recreation Center and aquatic complex anchor the community&apos;s recreational infrastructure with year-round swimming, fitness facilities, and youth programming. Parks are scattered throughout the neighborhoods. And the price points &mdash; a median around $425K for an established Henderson address with this level of convenience &mdash; represent some of the strongest value in the city. Newer communities charge $75K&ndash;$150K more for comparable square footage without the mature character or the walkable retail.</p>
                </>
              )}
            </div>
            <div className="overview-aside">
              <div className="quick-facts">
                <h3>Whitney Ranch At a Glance</h3>
                {displayStats.map(([label, value, cls]) => (
                  <div className="fact-row" key={label}>
                    <span className="fact-label">{label}</span>
                    <span className={`fact-value${cls ? ' ' + cls : ''}`}>{value}</span>
                  </div>
                ))}
              </div>
              <div className="cta-card">
                <p>Ready to explore Whitney Ranch? Let&apos;s tour the community and find the home that fits your lifestyle and budget.</p>
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
            <span className="section-label">Why Whitney Ranch</span>
            <h2>What Makes Whitney Ranch Stand Out</h2>
            <p>Mature character, walkable retail, and Henderson value that newer communities can&apos;t match.</p>
          </div>
          <div className="highlights-grid">
            {[
              { icon: '\u{1F333}', title: '30+ Years of Maturity', body: 'Established trees, settled landscaping, and genuine neighborhood character that takes decades to develop. Whitney Ranch looks and feels like a real community \u2014 not a construction zone.' },
              { icon: '\u{1F6CD}\uFE0F', title: 'Walkable to Galleria at Sunset', body: 'Henderson\u2019s largest regional mall within walking distance. 100+ shops, restaurants, a movie theater, and major retailers along Galleria Drive and Sunset Road.' },
              { icon: '\u{1F6E1}\uFE0F', title: 'Henderson: Top 10 Safest City', body: 'Henderson consistently ranks among the top 10 safest large cities in America. Whitney Ranch benefits from the city\u2019s low crime, clean streets, and responsive services.' },
              { icon: '\u{1F3CA}', title: 'Recreation Center & Aquatic Complex', body: 'The Whitney Ranch Recreation Center offers year-round swimming, fitness facilities, sports courts, and youth programming. A community amenity that rivals newer development clubhouses.' },
              { icon: '\u{1F4B0}', title: 'Below-Market Henderson Value', body: 'Median ~$425K for an established Henderson address with walkable retail. Typically $75K\u2013$150K below comparable square footage in newer communities like Inspirada or Cadence.' },
              { icon: '\u{1F6E3}\uFE0F', title: 'Central Henderson Location', body: 'I-215 beltway access puts the Strip 15\u201320 minutes away and the airport 10\u201315 minutes. Water Street District is 10 minutes south. Everything Henderson has to offer is close.' },
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
            <h2>Explore Whitney Ranch&apos;s Neighborhoods</h2>
            <p>Established neighborhoods with mature character and genuine price diversity.</p>
          </div>
          <div className="villages-grid">
            {[
              { name: 'Whitney Ranch Core', type: 'Family \u00B7 Established', desc: 'The heart of Whitney Ranch with the most established neighborhoods, mature trees, and settled community character. Walking distance to parks, schools, and the Galleria at Sunset.', price: 'From $400K' },
              { name: 'Galleria Drive Corridor', type: 'Walkable \u00B7 Convenient', desc: 'Neighborhoods along the Galleria Drive corridor with the closest walking access to shopping, dining, and entertainment. Strong rental demand and convenience-driven value.', price: 'From $350K' },
              { name: 'Whitney Ranch Estates', type: 'Larger Homes \u00B7 Premium', desc: 'The larger single-family homes in Whitney Ranch with 4\u20135 bedrooms and generous lot sizes. The most established sections with the most mature landscaping.', price: 'From $525K' },
              { name: 'Whitney Ranch Townhomes', type: 'Attached \u00B7 Entry-Level', desc: 'Townhome and condo communities within Whitney Ranch. The most accessible entry point into Henderson \u2014 ideal for first-time buyers, investors, and professionals.', price: 'From $250K' },
              { name: 'Recreation Center Area', type: 'Family \u00B7 Active', desc: 'Neighborhoods near the Whitney Ranch Recreation Center and aquatic complex. Walking distance to swimming, fitness, and youth programs.', price: 'From $400K' },
              { name: 'Sunset Road Neighborhoods', type: 'Convenient \u00B7 Mixed', desc: 'Properties along the Sunset Road corridor with easy freeway access and proximity to retail. A mix of single-family homes and attached units at competitive prices.', price: 'From $325K' },
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
                alt="Established neighborhood and mature trees in Whitney Ranch, Henderson"
              />
            </div>
            <div className="lifestyle-content">
              <span className="section-label">Lifestyle &amp; Convenience</span>
              <div className="gold-rule" />
              <h2>Walk to the Mall, Swim at the Rec Center, Live in a Real Neighborhood</h2>
              <p>Whitney Ranch delivers a lifestyle built around everyday convenience. The Galleria at Sunset is walkable. The recreation center has year-round swimming and fitness. Parks are tucked into every section of the community. And the streets have the settled character of a neighborhood where people have raised families for three decades.</p>
              <p>Henderson&apos;s retail, dining, and cultural infrastructure surrounds you on every side.</p>
              <div className="lifestyle-bullets">
                {[
                  'Galleria at Sunset \u2014 100+ shops, restaurants, movie theater \u2014 walkable from many neighborhoods',
                  'Whitney Ranch Recreation Center & aquatic complex \u2014 year-round swimming, fitness, and youth programs',
                  'Community parks scattered throughout with playgrounds, walking paths, and green spaces',
                  'Water Street District \u2014 Henderson\u2019s walkable downtown with restaurants and breweries \u2014 about 10 minutes south',
                  'I-215 beltway and I-15 access for quick commutes to the Strip, airport, and the broader valley',
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
            <h2>Schools Serving Whitney Ranch Families</h2>
            <p>Established Henderson schools that have served the community for decades.</p>
          </div>
          <div className="schools-layout">
            <div className="school-group">
              <h3>Public Schools (CCSD)</h3>
              {[['C.T. Sewell Elementary','K\u20135'],['Robert Taylor Elementary','K\u20135'],['Jack Lund Schofield Middle School','6\u20138'],['Thurman White Middle School','6\u20138'],['Green Valley High School','9\u201312'],['Basic High School','9\u201312'],].map(([n,g])=>(
                <div className="school-item" key={n}>{n}<span className="school-grades">{g}</span></div>
              ))}
            </div>
            <div className="school-group">
              <h3>Private &amp; Faith-Based</h3>
              {[['Henderson International School','PreK\u201312'],['Pinecrest Academy of Nevada','K\u201312'],['Mountain View Christian School','PreK\u201312'],].map(([n,g])=>(
                <div className="school-item" key={n}>{n}<span className="school-grades">{g}</span></div>
              ))}
            </div>
            <div className="school-group">
              <h3>Charter &amp; Specialty</h3>
              {[['Doral Academy of Nevada','K\u20138'],['Somerset Academy','K\u20138'],['Coral Academy of Science','K\u201312'],].map(([n,g])=>(
                <div className="school-item" key={n}>{n}<span className="school-grades">{g}</span></div>
              ))}
              <div style={{marginTop:'24px',padding:'18px',background:'rgba(201,168,76,0.06)',border:'1px solid var(--border)',borderRadius:'var(--radius)',fontSize:'13px',color:'var(--white-70)',lineHeight:'1.7'}}>
                <strong style={{color:'var(--white)'}}>School Assignment Note:</strong> Whitney Ranch is served by some of Henderson\u2019s most established schools. Zoning varies by address. Always confirm your assigned school with CCSD before purchasing.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <WhitneyRanchFAQ />

      {/* CTA */}
      <section id="cta">
        <div className="container">
          <h2>Ready to Find Your Whitney Ranch Home?</h2>
          <p>Whether you want a family home walking distance to the Galleria or a starter condo in one of Henderson&apos;s most established communities, I&apos;ll help you find the right fit in Whitney Ranch.</p>
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
