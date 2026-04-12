import TuscanyVillageFAQ from '@/components/TuscanyVillageFAQ'
import Link from 'next/link'
import type { Metadata } from 'next'
import TuscanyVillageMapWrapper from '@/components/TuscanyVillageMapWrapper'
import PortableText from '@/components/PortableText'
import { getCommunityPage } from '@/sanity/queries'
import { mergeQuickStats, mergeDriveTimes, getSectionImageUrl } from '@/lib/community-utils'

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const cms = await getCommunityPage('tuscany-village')
  return {
    title: cms?.metaTitle ?? 'Tuscany Village Homes For Sale | Nevada Real Estate Group',
    description: cms?.metaDescription ?? 'Browse Tuscany Village homes for sale in Henderson, NV. Established Mediterranean-inspired community near Eastern Ave and Horizon Ridge. Homes from $375K to $750K+. Call 725.239.9950.',
  }
}

export default async function TuscanyVillagePage() {
  const cms = await getCommunityPage('tuscany-village')

  const heroHeadline = cms?.heroHeadline ?? 'Tuscany Village Homes\nFor Sale'
  const heroSubheadline = cms?.heroSubheadline ?? "Henderson\u2019s Mediterranean-inspired community \u2014 established neighborhoods with cohesive architecture, mature landscaping, and genuine neighborhood character."
  const overviewTitle = cms?.overviewTitle ?? 'Tuscany Village: Henderson\u2019s Mediterranean Enclave'

  const HARDCODED_STATS: Array<[string, string] | [string, string, string]> = [
    ['Established', 'Early 2000s'],
    ['Style', 'Mediterranean-inspired'],
    ['Location', 'Eastern Ave & Horizon Ridge'],
    ['City', 'Henderson'],
    ['Median Home Price', '~$525,000', 'gold'],
    ['Neighborhoods', '10+'],
    ['Schools', '5+ nearby'],
    ['Parks', 'Community parks & paths'],
    ['Architecture', 'Stucco, tile roofs, courtyards'],
    ['Character', 'Established & mature'],
    ['Distance to Strip', '15\u201320 min'],
    ['Distance to Water Street', '~12 min'],
  ]
  const displayStats = mergeQuickStats(HARDCODED_STATS, cms?.quickStats)
  const HARDCODED_DRIVE_TIMES = [
    { time: '15\u201320 min', destination: 'to the Strip', route: 'via I-215 \u2192 I-15' },
    { time: '~12 min', destination: 'to Water Street District', route: 'via Eastern Ave' },
    { time: '~10 min', destination: 'to Galleria at Sunset', route: 'via Eastern Ave North' },
    { time: '~15 min', destination: 'to Harry Reid Airport', route: 'via I-215 West' },
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
          <span>Tuscany Village</span>
        </div>
      </div>

      {/* HERO */}
      <header id="hero" className="summerlin-hero">
        {cms?.heroImageUrl
          ? <img src={`${cms.heroImageUrl}?w=1920&auto=format&q=85`} alt="Tuscany Village hero" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
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
              <div className="hero-stat"><span className="hero-stat-num">{qs('Active Listings', '50+')}</span><span className="hero-stat-lbl">Active Listings</span></div>
              <div className="hero-stat"><span className="hero-stat-num">{qs('Price Range', '$375K\u2013$750K+')}</span><span className="hero-stat-lbl">Price Range</span></div>
              <div className="hero-stat"><span className="hero-stat-num">{qs('Style', 'Mediterranean')}</span><span className="hero-stat-lbl">Architecture</span></div>
              <div className="hero-stat"><span className="hero-stat-num">{qs('Character', 'Established')}</span><span className="hero-stat-lbl">Community</span></div>
            </div>
          </div>
        </div>
      </header>

      {/* MAP */}
      <section id="map" style={{ padding: '32px 0 0', background: 'var(--charcoal)' }}>
        <div className="container">
          <div className="section-header" style={{ marginBottom: '32px' }}>
            <span className="section-label">Location</span>
            <h2>Where is Tuscany Village?</h2>
            <p>Situated in south Henderson near the intersection of Eastern Avenue and Horizon Ridge Parkway &mdash; central to Henderson&apos;s best retail, dining, and recreation.</p>
          </div>
          <div className="map-container">
            <TuscanyVillageMapWrapper />
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
            <h2>New Tuscany Village Listings</h2>
            <p>The 12 most recently listed homes in Tuscany Village &mdash; Mediterranean-styled single-family homes and townhomes.</p>
          </div>
          <div className="ylopo-wrap">
            <div className="YLOPO_searchWidget" />
            <div className="YLOPO_resultsWidget" data-search='{"propertyTypes":["house","condo","townhouse"],"minPrice":250000,"locations":[{"city":"Henderson","state":"NV"}],"limit":12,"sortBy":"listDate","sortOrder":"desc","keywords":"Tuscany Village"}' />
          </div>
          <p className="ylopo-note">Listing data sourced from regional MLS. Information deemed reliable but not guaranteed. Updated daily.</p>
          <div className="listings-actions">
            <a href="https://search.nevadarealestategroup.net/search?s[orderBy]=sourceCreationDate%2Cdesc&s[page]=1&s[locations][0][city]=Henderson&s[locations][0][state]=NV&s[keywords]=Tuscany%20Village" target="_blank" rel="noopener noreferrer" className="btn-gold">View New Tuscany Village Listings Now &rarr;</a>
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
                  <p>Tuscany Village is one of those Henderson communities that rewards buyers who take the time to look beyond the big-name master plans. Developed in the early 2000s near the intersection of Eastern Avenue and Horizon Ridge Parkway, it was built with a deliberate Mediterranean design vision &mdash; warm stucco exteriors, clay tile roofs, arched doorways, and courtyard-style layouts that give the entire community a cohesive, almost European feel. Two decades later, that design choice has aged beautifully.</p>
                  <p>The mature landscaping is what strikes you first when you drive through. Established trees line the streets, front yards have had twenty-plus years to fill in, and the common areas have the settled, lush character that newer communities simply can&apos;t replicate. In a valley where most homes are surrounded by rock and desert landscaping, Tuscany Village stands out with genuine shade trees and green spaces that create a noticeably different atmosphere.</p>
                  <p>The location on the Eastern Avenue corridor puts you in a sweet spot for Henderson living. Galleria at Sunset is about 10 minutes north. The Water Street District &mdash; Henderson&apos;s walkable downtown with restaurants, breweries, and shops &mdash; is about 12 minutes away. The I-215 beltway provides a clean route to the airport, the Strip, and the rest of the valley. And Anthem, with its country club and foothill trails, is just a few minutes south.</p>
                  <p>Price-wise, Tuscany Village sits in the Henderson mid-range &mdash; above the entry-level communities but well below the guard-gated luxury tier. You&apos;re getting established homes with genuine architectural character in one of the safest cities in America, at prices that are competitive with newer construction that won&apos;t have the same design cohesion or mature landscaping for another decade. For buyers who value character and aesthetic consistency, Tuscany Village delivers something that&apos;s genuinely hard to find elsewhere in the valley.</p>
                </>
              )}
            </div>
            <div className="overview-aside">
              <div className="quick-facts">
                <h3>Tuscany Village At a Glance</h3>
                {displayStats.map(([label, value, cls]) => (
                  <div className="fact-row" key={label}>
                    <span className="fact-label">{label}</span>
                    <span className={`fact-value${cls ? ' ' + cls : ''}`}>{value}</span>
                  </div>
                ))}
              </div>
              <div className="cta-card">
                <p>Ready to explore Tuscany Village? Let&apos;s schedule a tour of the community and find the home that fits your style.</p>
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
            <span className="section-label">Why Tuscany Village</span>
            <h2>What Makes Tuscany Village Stand Out</h2>
            <p>Mediterranean character, mature landscaping, and Henderson safety &mdash; a community with genuine personality.</p>
          </div>
          <div className="highlights-grid">
            {[
              { icon: '\u{1F3DB}\uFE0F', title: 'Mediterranean Architecture', body: 'A cohesive design language throughout \u2014 warm stucco, clay tile roofs, arched entries, and courtyard layouts. Design guidelines maintain the community\u2019s character home by home.' },
              { icon: '\u{1F333}', title: 'Mature & Established', body: 'Twenty-plus years of growth have created tree-lined streets, lush front yards, and mature common areas. A settled aesthetic that newer communities won\u2019t achieve for a decade or more.' },
              { icon: '\u{1F6E1}\uFE0F', title: 'Henderson: Top 10 Safest City', body: 'Henderson consistently ranks among the top 10 safest large cities in America. Low crime, clean streets, and responsive city services that residents consistently praise.' },
              { icon: '\u{1F4CD}', title: 'Eastern Ave & Horizon Ridge', body: 'Central to Henderson\u2019s best retail, dining, and services. Galleria at Sunset ~10 min, Water Street District ~12 min, and the I-215 beltway within easy reach.' },
              { icon: '\u{1F3E0}', title: 'Genuine Neighborhood Feel', body: 'Quieter residential streets, pedestrian-friendly layouts, and a community where neighbors know each other. The kind of lived-in character that can\u2019t be manufactured.' },
              { icon: '\u{1F4B0}', title: 'Henderson Mid-Range Value', body: 'Established homes with real architectural character at prices below the guard-gated luxury tier. Strong value for buyers who prioritize aesthetics and community feel.' },
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
            <h2>Explore Tuscany Village&apos;s Neighborhoods</h2>
            <p>Mediterranean-themed neighborhoods with variety in size, layout, and price point.</p>
          </div>
          <div className="villages-grid">
            {[
              { name: 'Tuscany Village Estates', type: 'Single-Family \u00B7 Premium', desc: 'Larger single-family homes with 4\u20135 bedrooms, premium lot sizes, and the most pronounced Mediterranean styling. Many feature private courtyards and upgraded landscaping.', price: 'From $600K' },
              { name: 'Tuscany Village Core', type: 'Family \u00B7 Established', desc: 'The heart of the community with well-maintained single-family homes, mature trees, and walking distance to community parks. The most popular section for families.', price: 'From $475K' },
              { name: 'Courtyard Collection', type: 'Single-Story \u00B7 Courtyard', desc: 'Single-story homes with courtyard entries and low-maintenance desert landscaping. Popular with downsizers and buyers who want single-level living with Mediterranean character.', price: 'From $450K' },
              { name: 'Tuscany Village Townhomes', type: 'Attached \u00B7 Low-Maintenance', desc: 'Townhome communities within the Tuscany Village area offering the Mediterranean aesthetic in a low-maintenance, attached format. Ideal for first-time buyers and professionals.', price: 'From $375K' },
              { name: 'Horizon Ridge Corridor', type: 'Convenient \u00B7 Mixed', desc: 'Neighborhoods along the Horizon Ridge corridor with walkable access to retail, dining, and the Horizon Ridge trail system. A mix of single-family and attached homes.', price: 'From $425K' },
              { name: 'Premium View Homes', type: 'Views \u00B7 Elevated', desc: 'Select homes on elevated lots with views of the McCullough Range and the broader Henderson valley. Premium positioning within the community.', price: 'From $650K+' },
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
                alt="Mediterranean-styled homes and mature landscaping in Tuscany Village, Henderson"
              />
            </div>
            <div className="lifestyle-content">
              <span className="section-label">Lifestyle &amp; Community</span>
              <div className="gold-rule" />
              <h2>Tree-Lined Streets, Henderson Dining, and a Real Sense of Place</h2>
              <p>Life in Tuscany Village moves at a different pace. The mature landscaping, quiet residential streets, and Mediterranean aesthetic create an atmosphere that feels more like a European village than a Las Vegas suburb. It&apos;s the kind of community where people wave to their neighbors and know the mail carrier by name.</p>
              <p>Henderson&apos;s retail, dining, and recreation infrastructure surrounds you, with everything from the Galleria to the Water Street District within a short drive.</p>
              <div className="lifestyle-bullets">
                {[
                  'Tree-lined streets with twenty-plus years of mature landscaping and established shade trees',
                  'Galleria at Sunset \u2014 major retail, dining, and entertainment \u2014 roughly 10 minutes north on Eastern Ave',
                  'Water Street District \u2014 Henderson\u2019s walkable downtown with restaurants, breweries, and local shops',
                  'Community parks and walking paths throughout the neighborhood',
                  'Anthem foothill trails, Sloan Canyon, and Lake Mead all within 20\u201330 minutes for weekend adventures',
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
            <h2>Schools Serving Tuscany Village Families</h2>
            <p>Henderson&apos;s solid school options include well-regarded campuses near the community.</p>
          </div>
          <div className="schools-layout">
            <div className="school-group">
              <h3>Public Schools (CCSD)</h3>
              {[['John C. Vanderburg Elementary','K\u20135'],['Dean Petersen Elementary','K\u20135'],['Del E. Webb Middle School','6\u20138'],['Jim Bridger Middle School','6\u20138'],['Coronado High School','9\u201312'],['Liberty High School','9\u201312'],].map(([n,g])=>(
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
                <strong style={{color:'var(--white)'}}>School Assignment Note:</strong> Henderson school zones vary by address. Always confirm your assigned school with CCSD before purchasing.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <TuscanyVillageFAQ />

      {/* CTA */}
      <section id="cta">
        <div className="container">
          <h2>Ready to Find Your Tuscany Village Home?</h2>
          <p>Whether you want a courtyard home with Mediterranean character or a family property near Horizon Ridge, I&apos;ll help you find the right fit in Tuscany Village.</p>
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
