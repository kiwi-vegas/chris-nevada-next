import SummerlinWestFAQ from '@/components/SummerlinWestFAQ'
import Link from 'next/link'
import type { Metadata } from 'next'
import SummerlinWestMapWrapper from '@/components/SummerlinWestMapWrapper'
import PortableText from '@/components/PortableText'
import { getCommunityPage } from '@/sanity/queries'
import { mergeQuickStats, mergeDriveTimes, getSectionImageUrl } from '@/lib/community-utils'

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const cms = await getCommunityPage('summerlin-west')
  return {
    title: cms?.metaTitle ?? 'Summerlin West Homes For Sale | Nevada Real Estate Group',
    description: cms?.metaDescription ?? 'Browse Summerlin West homes for sale. The newest expansion of Summerlin with Stonebridge, Reverence, and Redpoint — minutes from Red Rock Canyon. Homes from $500K. Call 725.239.9950.',
  }
}

export default async function SummerlinWestPage() {
  const cms = await getCommunityPage('summerlin-west')

  const heroHeadline = cms?.heroHeadline ?? 'Summerlin West Homes\nFor Sale'
  const heroSubheadline = cms?.heroSubheadline ?? "Summerlin\u2019s newest frontier \u2014 the westernmost expansion backing directly up to Red Rock Canyon with the newest construction and the most dramatic mountain views in the valley."
  const overviewTitle = cms?.overviewTitle ?? 'Summerlin West: Where Summerlin Meets Red Rock'

  const HARDCODED_STATS: Array<[string, string] | [string, string, string]> = [
    ['Developer', 'Howard Hughes Corporation'],
    ['Part Of', 'Summerlin master plan'],
    ['Status', 'Actively developing'],
    ['Key Villages', 'Stonebridge, Reverence, Redpoint'],
    ['Median Home Price', '~$750,000', 'gold'],
    ['Neighborhoods', '15+'],
    ['Schools', '10+ nearby'],
    ['Trails', 'Connected to Red Rock Canyon'],
    ['Golf Courses', 'TPC, Bear\u2019s Best nearby'],
    ['55+ Community', 'Reverence by Pulte'],
    ['Distance to Strip', '~25 min'],
    ['Distance to Red Rock', '~5 min'],
  ]
  const displayStats = mergeQuickStats(HARDCODED_STATS, cms?.quickStats)
  const HARDCODED_DRIVE_TIMES = [
    { time: '~5 min', destination: 'to Red Rock Canyon', route: 'via W Charleston Blvd' },
    { time: '~10 min', destination: 'to Downtown Summerlin', route: 'via Summerlin Pkwy' },
    { time: '~25 min', destination: 'to the Strip', route: 'via Summerlin Pkwy \u2192 I-15' },
    { time: '~35 min', destination: 'to Harry Reid Airport', route: 'via I-215 South' },
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
          <Link href="/summerlin/">Summerlin</Link>
          <span className="breadcrumb-sep">&rsaquo;</span>
          <span>Summerlin West</span>
        </div>
      </div>

      {/* HERO */}
      <header id="hero" className="summerlin-hero">
        {cms?.heroImageUrl
          ? <img src={`${cms.heroImageUrl}?w=1920&auto=format&q=85`} alt="Summerlin West hero" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
          : <div className="hero-bg" />
        }
        <div className="hero-overlay" />
        <div className="hero-content summerlin">
          <div className="container">
            <p className="hero-eyebrow-sm">Las Vegas, Nevada &middot; Summerlin</p>
            <div className="hero-rule" />
            <h1>{heroHeadline.split('\n').map((line, i) => (
              <span key={i}>{line}{i < heroHeadline.split('\n').length - 1 && <br />}</span>
            ))}</h1>
            <p className="hero-sub">{heroSubheadline}</p>
            <div className="hero-stats">
              <div className="hero-stat"><span className="hero-stat-num">{qs('Active Listings', '200+')}</span><span className="hero-stat-lbl">Active Listings</span></div>
              <div className="hero-stat"><span className="hero-stat-num">{qs('Price Range', '$500K\u2013$1.5M+')}</span><span className="hero-stat-lbl">Price Range</span></div>
              <div className="hero-stat"><span className="hero-stat-num">{qs('Distance to Red Rock', '~5 min')}</span><span className="hero-stat-lbl">To Red Rock</span></div>
              <div className="hero-stat"><span className="hero-stat-num">{qs('Status', 'Building')}</span><span className="hero-stat-lbl">New Construction</span></div>
            </div>
          </div>
        </div>
      </header>

      {/* MAP */}
      <section id="map" style={{ padding: '32px 0 0', background: 'var(--charcoal)' }}>
        <div className="container">
          <div className="section-header" style={{ marginBottom: '32px' }}>
            <span className="section-label">Location</span>
            <h2>Where is Summerlin West?</h2>
            <p>The westernmost edge of Summerlin &mdash; backing directly up to the Spring Mountains and Red Rock Canyon National Conservation Area.</p>
          </div>
          <div className="map-container">
            <SummerlinWestMapWrapper />
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
            <h2>New Summerlin West Listings</h2>
            <p>The 12 most recently listed homes in Summerlin West &mdash; new construction and resale in Stonebridge, Reverence, and Redpoint.</p>
          </div>
          <div className="ylopo-wrap">
            <div className="YLOPO_searchWidget" />
            <div className="YLOPO_resultsWidget" data-search='{"propertyTypes":["house","condo","townhouse"],"minPrice":400000,"locations":[{"city":"Las Vegas","state":"NV"}],"limit":12,"sortBy":"listDate","sortOrder":"desc","keywords":"Summerlin West"}' />
          </div>
          <p className="ylopo-note">Listing data sourced from regional MLS. Information deemed reliable but not guaranteed. Updated daily.</p>
          <div className="listings-actions">
            <a href="https://search.nevadarealestategroup.net/search?s[orderBy]=sourceCreationDate%2Cdesc&s[page]=1&s[locations][0][city]=Las%20Vegas&s[locations][0][state]=NV&s[keywords]=Summerlin%20West" target="_blank" rel="noopener noreferrer" className="btn-gold">View New Summerlin West Listings Now &rarr;</a>
            <Link href="/summerlin/" className="btn-outline">&larr; All Summerlin</Link>
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
                  <p>Summerlin West is where thirty-five years of master-planned community development reaches its most dramatic expression. This is the final westward expansion of the Summerlin master plan &mdash; the neighborhoods closest to Red Rock Canyon, with the newest construction and the most striking mountain views in the entire community. When I drive buyers through here for the first time, the reaction is always the same: they didn&apos;t know Las Vegas had anything like this.</p>
                  <p>Howard Hughes Corporation has been developing Summerlin since 1990, and the lessons learned over three decades show in Summerlin West. The village layouts are more thoughtful, the trail connections more seamless, and the relationship to the natural landscape more intentional than the earlier phases. Stonebridge, the largest village in Summerlin West, has become one of the most popular neighborhoods in the entire valley &mdash; contemporary architecture, dramatic Spring Mountain views, and a trail system that literally connects to Red Rock Canyon hiking routes.</p>
                  <p>Reverence adds a dimension that no other part of Summerlin has &mdash; a gated, age-qualified (55+) community by Pulte Homes with its own private clubhouse, resort pool, and fitness center. For active adults who want the Summerlin address and the Red Rock proximity without the family-neighborhood density, Reverence delivers something genuinely unique. Redpoint rounds out the offering with additional family-oriented neighborhoods and trail access.</p>
                  <p>The critical context for buyers is scarcity. Summerlin West is the last major expansion area &mdash; there isn&apos;t more land to the west because Red Rock Canyon is a national conservation area. Once these neighborhoods are built out, there won&apos;t be new Summerlin construction to buy. Builders like Toll Brothers, Lennar, Shea Homes, and Taylor Morrison are actively building, but the window for new construction in Summerlin&apos;s most desirable location is closing. That scarcity, combined with the views and trail access, makes Summerlin West one of the strongest long-term value plays in the Las Vegas market.</p>
                </>
              )}
            </div>
            <div className="overview-aside">
              <div className="quick-facts">
                <h3>Summerlin West At a Glance</h3>
                {displayStats.map(([label, value, cls]) => (
                  <div className="fact-row" key={label}>
                    <span className="fact-label">{label}</span>
                    <span className={`fact-value${cls ? ' ' + cls : ''}`}>{value}</span>
                  </div>
                ))}
              </div>
              <div className="cta-card">
                <p>Ready to explore Summerlin West? Let&apos;s tour Stonebridge, Reverence, and the newest listings backing up to Red Rock Canyon.</p>
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
            <span className="section-label">Why Summerlin West</span>
            <h2>What Makes Summerlin West Stand Out</h2>
            <p>The newest Summerlin construction, the closest homes to Red Rock Canyon, and a scarcity factor that protects long-term value.</p>
          </div>
          <div className="highlights-grid">
            {[
              { icon: '\u{1F3D4}\uFE0F', title: '5 Minutes to Red Rock Canyon', body: 'The closest residential community to Red Rock Canyon National Conservation Area \u2014 200,000 acres of protected desert. Some homes back directly to the canyon boundary with trail access from your door.' },
              { icon: '\u{1F3D7}\uFE0F', title: 'Summerlin\u2019s Newest Construction', body: 'The final westward expansion of the Summerlin master plan. Toll Brothers, Lennar, Shea Homes, and Taylor Morrison are actively building with the most contemporary designs in the community.' },
              { icon: '\u{1F4C9}', title: 'Built-In Scarcity', body: 'Red Rock Canyon to the west means there\u2019s no more land. Once Summerlin West is built out, new Summerlin construction ends. This finite supply is a structural value protector.' },
              { icon: '\u{1F6B6}', title: 'Trail-Connected to Red Rock', body: 'The Summerlin trail system extends into Summerlin West and connects directly to Red Rock Canyon hiking routes. You can hike from your neighborhood into 200,000 acres of wilderness.' },
              { icon: '\u{1F3E0}', title: 'Reverence 55+ Community', body: 'A gated, age-qualified community by Pulte Homes with a private clubhouse, resort pool, and fitness center. One of the most desirable 55+ communities in the Las Vegas Valley.' },
              { icon: '\u26F0\uFE0F', title: 'Dramatic Mountain Views', body: 'The Spring Mountains and Red Rock escarpment provide a dramatic western backdrop. Sunset views from Summerlin West are widely considered the best residential views in Las Vegas.' },
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
            <span className="section-label">Villages</span>
            <h2>Explore Summerlin West&apos;s Villages</h2>
            <p>The newest Summerlin villages &mdash; each with its own character, builders, and proximity to Red Rock Canyon.</p>
          </div>
          <div className="villages-grid">
            {[
              { name: 'Stonebridge', type: 'Family \u00B7 Contemporary \u00B7 Views', desc: 'Summerlin West\u2019s largest and most popular village. Contemporary architecture, dramatic Spring Mountain views, and direct trail connections. Multiple builders offering 3\u20135 bedroom homes.', price: 'From $650K' },
              { name: 'Reverence', type: 'Gated \u00B7 55+ \u00B7 Active Adult', desc: 'A gated age-qualified community by Pulte Homes with single-story designs, a private clubhouse, resort pool, and fitness center. Adjacent to Red Rock Canyon with mountain views.', price: 'From $550K' },
              { name: 'Redpoint', type: 'Family \u00B7 Trail Access', desc: 'A newer village with family-oriented neighborhoods and excellent trail connectivity. Contemporary floor plans with mountain views and proximity to Summerlin\u2019s park system.', price: 'From $600K' },
              { name: 'Toll Brothers Collections', type: 'Luxury \u00B7 Semi-Custom', desc: 'Toll Brothers\u2019 premium offerings in Summerlin West with upscale finishes, gourmet kitchens, and the largest floor plans available. The luxury tier of the newest Summerlin construction.', price: 'From $850K' },
              { name: 'Lennar at Summerlin West', type: 'Family \u00B7 Everything\u2019s Included', desc: 'Lennar\u2019s signature Everything\u2019s Included homes with premium finishes and smart home features. No hidden upgrade costs \u2014 a popular choice for families.', price: 'From $600K' },
              { name: 'Custom & Premium Lots', type: 'Ultra-Luxury \u00B7 Red Rock Views', desc: 'Select lots at the western edge of Summerlin West with the most direct Red Rock Canyon views. Custom and semi-custom builds on premium terrain.', price: 'From $1.2M+' },
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
                alt="Red Rock Canyon and Spring Mountain views from Summerlin West"
              />
            </div>
            <div className="lifestyle-content">
              <span className="section-label">Outdoor Living</span>
              <div className="gold-rule" />
              <h2>Red Rock at Your Doorstep, Downtown Summerlin 10 Minutes Away</h2>
              <p>Summerlin West delivers the outdoor lifestyle that the rest of Summerlin aspires to. When your community trail system literally connects to Red Rock Canyon hiking routes, &ldquo;outdoor access&rdquo; stops being an amenity and becomes your daily reality. Morning hikes, sunset trail runs, and weekend rock climbing are all within a few minutes of your front door.</p>
              <p>And when you want urban conveniences, Downtown Summerlin&apos;s 125+ shops and restaurants are just 10 minutes east.</p>
              <div className="lifestyle-bullets">
                {[
                  'Red Rock Canyon National Conservation Area \u2014 200,000 acres \u2014 roughly 5 minutes from most Summerlin West homes',
                  'Connected trail system linking neighborhoods directly to Red Rock Canyon hiking routes',
                  'Downtown Summerlin \u2014 125+ shops, restaurants, Las Vegas Ballpark \u2014 about 10 minutes east',
                  'TPC Summerlin and Bear\u2019s Best Jack Nicklaus course both within 10\u201315 minutes',
                  'Spring Mountain sunset views widely considered the best residential views in the Las Vegas Valley',
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
            <h2>Schools Serving Summerlin West Families</h2>
            <p>Summerlin&apos;s strong school network extends to the newest western villages.</p>
          </div>
          <div className="schools-layout">
            <div className="school-group">
              <h3>Public Schools (CCSD)</h3>
              {[['John W. Bonner Elementary','K\u20135'],['Givens Elementary','K\u20135'],['Goolsby Elementary','K\u20135'],['Summerlin-area Middle Schools','6\u20138'],['West Career & Technical Academy','9\u201312'],['Palo Verde High School','9\u201312'],].map(([n,g])=>(
                <div className="school-item" key={n}>{n}<span className="school-grades">{g}</span></div>
              ))}
            </div>
            <div className="school-group">
              <h3>Private &amp; Catholic</h3>
              {[['Bishop Gorman High School','Catholic \u00B7 9\u201312'],['Faith Lutheran Middle & High','6\u201312'],['The Meadows School','PreK\u201312'],['Alexander Dawson School','K\u20138'],].map(([n,g])=>(
                <div className="school-item" key={n}>{n}<span className="school-grades">{g}</span></div>
              ))}
            </div>
            <div className="school-group">
              <h3>Charter &amp; Independent</h3>
              {[['Adelson Educational Campus','PreK\u201312'],['Doral Academy Red Rock','K\u20138'],['Pinecrest Academy of Nevada','K\u201312'],].map(([n,g])=>(
                <div className="school-item" key={n}>{n}<span className="school-grades">{g}</span></div>
              ))}
              <div style={{marginTop:'24px',padding:'18px',background:'rgba(201,168,76,0.06)',border:'1px solid var(--border)',borderRadius:'var(--radius)',fontSize:'13px',color:'var(--white-70)',lineHeight:'1.7'}}>
                <strong style={{color:'var(--white)'}}>School Assignment Note:</strong> Summerlin West school zones are still being established as new neighborhoods are built. Newer schools may be added. Always confirm your specific address zoning with CCSD before purchasing.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <SummerlinWestFAQ />

      {/* CTA */}
      <section id="cta">
        <div className="container">
          <h2>Ready to Find Your Summerlin West Home?</h2>
          <p>Whether you want a Stonebridge family home with Red Rock views, a Reverence retreat for active adult living, or a custom lot at the canyon&apos;s edge, I&apos;ll help you navigate Summerlin&apos;s newest and most dramatic expansion.</p>
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
