import FAQAccordion from '@/components/FAQAccordion'
import Link from 'next/link'
import type { Metadata } from 'next'
import SummerlinMapWrapper from '@/components/SummerlinMapWrapper'
import PortableText from '@/components/PortableText'
import { getCommunityPage } from '@/sanity/queries'

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const cms = await getCommunityPage('summerlin')
  return {
    title: cms?.metaTitle ?? 'Summerlin Homes For Sale | Nevada Real Estate Group',
    description: cms?.metaDescription ?? 'Browse Summerlin homes for sale. 700+ active listings from $450K to $10M+. Expert local agents with 35 years of Summerlin market knowledge. Call 725.239.9950.',
  }
}

export default async function SummerlinPage() {
  const cms = await getCommunityPage('summerlin')

  const heroHeadline = cms?.heroHeadline ?? 'Summerlin Homes\nFor Sale'
  const heroSubheadline = cms?.heroSubheadline ?? "Nevada's most celebrated master-planned community — 22,500 acres of refined desert living against the Red Rock Canyon skyline."
  const overviewTitle = cms?.overviewTitle ?? 'Summerlin: Where Las Vegas Does Living Right'

  return (
    <main>
      <div className="breadcrumb">
        <div className="breadcrumb-inner">
          <Link href="/">Home</Link>
          <span className="breadcrumb-sep">›</span>
          <a href="/#communities">Communities</a>
          <span className="breadcrumb-sep">›</span>
          <span>Summerlin</span>
        </div>
      </div>

      {/* HERO */}
      <header id="hero" className="summerlin-hero">
        <div className="hero-bg" />
        <div className="hero-overlay" />
        <div className="hero-content summerlin">
          <div className="container">
            <p className="hero-eyebrow-sm">Las Vegas, Nevada</p>
            <div className="hero-rule" />
            <h1>{heroHeadline.split('\n').map((line, i) => (
              <span key={i}>{line}{i < heroHeadline.split('\n').length - 1 && <br />}</span>
            ))}</h1>
            <p className="hero-sub">{heroSubheadline}</p>
            <div className="hero-stats">
              <div className="hero-stat"><span className="hero-stat-num">700+</span><span className="hero-stat-lbl">Active Listings</span></div>
              <div className="hero-stat"><span className="hero-stat-num">$450K–$10M+</span><span className="hero-stat-lbl">Price Range</span></div>
              <div className="hero-stat"><span className="hero-stat-num">26</span><span className="hero-stat-lbl">Schools</span></div>
              <div className="hero-stat"><span className="hero-stat-num">200+</span><span className="hero-stat-lbl">Miles of Trails</span></div>
            </div>
          </div>
        </div>
      </header>

      {/* MAP */}
      <section id="map" style={{ padding: '64px 0', background: 'var(--charcoal)', borderBottom: '1px solid var(--border-dim)' }}>
        <div className="container">
          <div className="section-header" style={{ marginBottom: '32px' }}>
            <span className="section-label">Location</span>
            <h2>Where is Summerlin?</h2>
            <p>Located along the western rim of the Las Vegas Valley — backed against the Spring Mountains and Red Rock Canyon.</p>
          </div>
          <div className="map-container">
            <SummerlinMapWrapper />
          </div>
          <div className="drive-time-grid">
            {[
              ['~20 min', 'to the Strip', 'via Summerlin Pkwy → I-15'],
              ['~10 min', 'to Red Rock Canyon', 'via W Charleston Blvd'],
              ['~15 min', 'to Downtown Las Vegas', 'via US-95'],
              ['~30 min', 'to Harry Reid Airport', 'via I-215 South'],
            ].map(([time, label, route]) => (
              <div key={label} className="drive-time-card">
                <div className="drive-time-time">{time}</div>
                <div className="drive-time-label">{label}</div>
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
            <span className="section-label">New Listings · Updated Daily</span>
            <h2>New Summerlin Listings</h2>
            <p>The 12 most recently listed homes in Summerlin — houses, condos, and townhomes starting at $200K.</p>
          </div>
          <div className="ylopo-wrap">
            <div className="YLOPO_searchWidget" />
            <div className="YLOPO_resultsWidget" data-search='{"propertyTypes":["house","condo","townhouse"],"minPrice":200000,"locations":[{"community":"Summerlin","state":"NV"}],"maxResults":12,"sortBy":"listDate","sortOrder":"desc"}' />
          </div>
          <p className="ylopo-note">Listing data sourced from regional MLS. Information deemed reliable but not guaranteed. Updated daily.</p>
          <div className="listings-actions">
            <a href="https://search.nevadarealestategroup.net/search?s[orderBy]=sourceCreationDate%2Cdesc&s[page]=1&s[locations][0][community]=Summerlin&s[locations][0][state]=NV" target="_blank" rel="noopener noreferrer" className="btn-gold">View New Summerlin Listings Now →</a>
            <Link href="/#communities" className="btn-outline">← Back to All Communities</Link>
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
                  <p>I&apos;ve been working real estate in Las Vegas my entire career, and I watched Summerlin come up from bare desert back in 1990 when Howard Hughes Corporation broke ground on what would become the valley&apos;s most sought-after address. Named after Hughes&apos; grandmother Jean Amelia Summerlin, this was never designed to be just another subdivision — it was designed to be a complete community, and thirty-five years later, that vision has held up remarkably well.</p>
                  <p>Positioned along the western rim of the Las Vegas Valley, Summerlin backs up directly against the Spring Mountains and Red Rock Canyon National Conservation Area. That backdrop changes everything. You&apos;re ten minutes from some of the most dramatic hiking, cycling, and rock climbing terrain in the country, while still being twenty minutes from the Strip.</p>
                  <p>What I&apos;ve seen over the decades is that buyers who discover Summerlin rarely look anywhere else. The community is organized into 20-plus distinct villages — from the ultra-exclusive guard-gated estates of The Ridges to the family-friendly streets of The Paseos and Stonebridge. Each has its own feel and price point, all connected by 200-plus miles of trails.</p>
                  <p>Through every market cycle I&apos;ve worked — the booms, the corrections, the recoveries — Summerlin has consistently held its value better than almost anywhere else in Southern Nevada. The schools are excellent, the streets are clean, and the HOA actually enforces its standards.</p>
                </>
              )}
            </div>
            <div className="overview-aside">
              <div className="quick-facts">
                <h3>Summerlin At a Glance</h3>
                {[
                  ['Established', '1990'],
                  ['Developer', 'Howard Hughes Corp.'],
                  ['Total Acreage', '22,500 acres'],
                  ['Population', '130,000+'],
                  ['Median Home Price', '$686,000', 'gold'],
                  ['Villages', '20+'],
                  ['Schools', '26 public, private & charter'],
                  ['Parks', '250+'],
                  ['Miles of Trails', '200+'],
                  ['Golf Courses', '10'],
                  ['Distance to Strip', '~20 min'],
                  ['Distance to Red Rock', '~10 min'],
                ].map(([label, value, cls]) => (
                  <div className="fact-row" key={label}>
                    <span className="fact-label">{label}</span>
                    <span className={`fact-value${cls ? ' ' + cls : ''}`}>{value}</span>
                  </div>
                ))}
              </div>
              <div className="cta-card">
                <p>Ready to explore Summerlin? Let&apos;s schedule a private tour of the community and the current listings that match your goals.</p>
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
            <span className="section-label">Why Summerlin</span>
            <h2>The Reasons People Stay for Decades</h2>
            <p>A community this consistently popular doesn&apos;t happen by accident. Here&apos;s what drives demand year after year.</p>
          </div>
          <div className="highlights-grid">
            {[
              { icon: '🏔️', title: 'Red Rock Canyon at Your Door', body: 'Most Summerlin homes are within ten minutes of the Red Rock Canyon National Conservation Area — 200,000 acres of trails, climbing routes, and scenic drives.' },
              { icon: '🏫', title: '26 Schools, Exceptional Choices', body: 'From top-ranked public schools in CCSD to nationally recognized private institutions like Bishop Gorman, Faith Lutheran, and The Meadows School.' },
              { icon: '🛍️', title: 'Downtown Summerlin', body: 'A 400-acre walkable urban core with 125+ shops and restaurants, a Whole Foods, Las Vegas Ballpark, and City National Arena — the Golden Knights\' practice facility.' },
              { icon: '🌿', title: '250+ Parks & 200+ Miles of Trails', body: 'Summerlin\'s trail network connects villages, parks, golf courses, and natural desert arroyos. Fox Hill Park features zip lines, a climbing tower, and disc golf.' },
              { icon: '⛳', title: '10 Championship Golf Courses', body: 'TPC Summerlin (host of the Shriners Open), Bear\'s Best Jack Nicklaus design, two Red Rock Country Club courses — the golf capital of Southern Nevada.' },
              { icon: '🏆', title: 'Three Decades of Top Rankings', body: 'Summerlin has ranked among the nation\'s top-selling master-planned communities for over 30 consecutive years. Property values consistently outperform the broader market.' },
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
        <div className="container">
          <div className="section-header">
            <span className="section-label">Neighborhoods</span>
            <h2>Find Your Village in Summerlin</h2>
            <p>With 20+ distinct villages, Summerlin has a neighborhood for every lifestyle and budget.</p>
          </div>
          <div className="villages-grid">
            {[
              { name: 'The Ridges', type: 'Guard-Gated · Ultra-Luxury', desc: '793 acres of the most exclusive addresses in Las Vegas. Custom and semi-custom estates anchored by Bear\'s Best golf course.', price: 'From $1.5M+' },
              { name: 'The Paseos', type: 'Family · Master-Planned', desc: 'One of Summerlin\'s largest villages with 29 neighborhoods. Home to Fox Hill Park, extensive trail access, and top-rated schools.', price: 'From $650K' },
              { name: 'Stonebridge', type: 'Modern · Growing', desc: 'Summerlin\'s newest major village, developed from 2017 onward. Contemporary architecture with dramatic Spring Mountain views.', price: 'From $700K' },
              { name: 'Red Rock Country Club', type: 'Guard-Gated · Golf', desc: 'Gated golf community with two Arnold Palmer-designed courses — The Arroyo and The Mountain.', price: 'From $1.2M' },
              { name: 'The Summit Club', type: 'Ultra-Private · Trophy Estates', desc: 'Las Vegas\' most exclusive private community with a Tom Fazio golf course. By invitation only.', price: 'From $5M+' },
              { name: 'The Canyons', type: 'Established · Diverse', desc: 'A well-established village with a range of housing types from starter homes to larger estates. Great freeway access and strong schools.', price: 'From $550K' },
              { name: 'Summerlin Centre', type: 'Walkable · Mixed-Use', desc: 'At the heart of the community, directly adjacent to Downtown Summerlin. Townhomes and condos within walking distance of everything.', price: 'From $480K' },
              { name: 'The Vistas', type: 'Family · Active Lifestyle', desc: 'Known for its resident-only community center with Olympic pool. A popular choice for families who want top-tier amenities.', price: 'From $600K' },
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

      {/* LIFESTYLE */}
      <section id="lifestyle">
        <div className="container">
          <div className="lifestyle-split">
            <div className="lifestyle-img">
              <img src="/red-rock-canyon.jpg" alt="Red Rock Canyon National Conservation Area near Summerlin, Las Vegas" />
            </div>
            <div className="lifestyle-content">
              <span className="section-label">Outdoor Living</span>
              <div className="gold-rule" />
              <h2>250 Parks, 200 Miles of Trails, One Extraordinary Backyard</h2>
              <p>People in Summerlin live outside. The trail system here is legitimate infrastructure — it runs through every village, connects to natural desert arroyos, and eventually reaches Red Rock Canyon itself.</p>
              <p>The planned expansion will push the trail network past 250 miles, including a dedicated 20-mile bike and hiking corridor from Stonebridge all the way to the Red Rock Visitor Center.</p>
              <div className="lifestyle-bullets">
                {[
                  '200+ miles of interconnected trails through all villages — paved, soft surface, and natural arroyo routes',
                  '250+ parks ranging from pocket green spaces to Fox Hill Park\'s adventure playground',
                  'Red Rock Canyon National Conservation Area — 200,000 acres — roughly 10 minutes away',
                  '4 resident-only community centers with Olympic pools; year-round programming',
                  'Day trips to Lake Mead, Mt. Charleston, Valley of Fire, Zion, and Grand Canyon within 3 hours',
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
            <h2>26 Schools Serving Summerlin Families</h2>
            <p>From nationally ranked private schools to strong CCSD public options.</p>
          </div>
          <div className="schools-layout">
            <div className="school-group">
              <h3>Public Schools (CCSD)</h3>
              {[['John W. Bonner Elementary','K–5'],['John & Judy Goolsby Elementary','K–5'],['Linda Givens Elementary','K–5'],['D\'vorre & Hall Ober Elementary','K–5'],['Multiple CCSD Elementary Schools','K–5'],['Public Middle Schools (×3)','6–8'],['West Career & Technical Academy','9–12'],].map(([n,g])=>(
                <div className="school-item" key={n}>{n}<span className="school-grades">{g}</span></div>
              ))}
            </div>
            <div className="school-group">
              <h3>Private &amp; Catholic</h3>
              {[['Bishop Gorman High School','Catholic · 9–12'],['Faith Lutheran Middle & High','6–12'],['Faith Lutheran Academy','K–5'],['St. Elizabeth Ann Seton','PreK–8'],['The Meadows School','PreK–12'],['Merryhill School','PreK–5'],].map(([n,g])=>(
                <div className="school-item" key={n}>{n}<span className="school-grades">{g}</span></div>
              ))}
            </div>
            <div className="school-group">
              <h3>Charter &amp; Independent</h3>
              {[['Alexander Dawson School','K–8'],['Adelson Educational Campus','PreK–12'],['Shenker Academy','K–5'],['Charter School Options (×2)','Various'],].map(([n,g])=>(
                <div className="school-item" key={n}>{n}<span className="school-grades">{g}</span></div>
              ))}
              <div style={{marginTop:'24px',padding:'18px',background:'rgba(201,168,76,0.06)',border:'1px solid var(--border)',borderRadius:'var(--radius)',fontSize:'13px',color:'var(--white-70)',lineHeight:'1.7'}}>
                <strong style={{color:'var(--white)'}}>School Assignment Note:</strong> Zoning varies by village. Always confirm your specific address with CCSD before purchasing.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GOLF */}
      <section id="golf">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Golf</span>
            <h2>10 Championship Courses</h2>
            <p>Summerlin is home to Nevada&apos;s only two TPC courses and a Jack Nicklaus design.</p>
          </div>
          <div className="golf-grid">
            {[
              ['TPC Summerlin','Bobby Weed Design · Host of the Shriners Open','private'],
              ['TPC Las Vegas','PGA Tour Course · Red Rock Canyon Views','public'],
              ['Bear\'s Best Las Vegas','Jack Nicklaus Design · The Ridges Village','public'],
              ['Red Rock CC — The Arroyo','Arnold Palmer Design','private'],
              ['Red Rock CC — The Mountain','Members Only','private'],
              ['Eagle Crest Golf Club','Billy Casper & Greg Nash · Executive Course','public'],
              ['Highland Falls Golf Club','Billy Casper & Greg Nash · Rolling Fairways','public'],
              ['Palm Valley Golf Club','Sun City Summerlin','public'],
              ['Siena Golf Club','Semi-Private','public'],
              ['The Summit Club','Tom Fazio Design · Invitation Only','private'],
            ].map(([name,type,badge])=>(
              <div className="golf-card" key={name}>
                <div><div className="golf-name">{name}</div><div className="golf-type">{type}</div></div>
                <span className={`golf-badge ${badge}`}>{badge === 'private' ? 'Private' : 'Public'}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQAccordion />

      {/* CTA */}
      <section id="cta">
        <div className="container">
          <h2>Ready to Find Your Summerlin Home?</h2>
          <p>Thirty-five years of Summerlin market experience, Nevada&apos;s largest real estate team, and a commitment to getting you the best outcome.</p>
          <div className="cta-actions">
            <a href="tel:+17252399950" className="btn-gold">Call 725.239.9950</a>
            <a href="#listings" className="btn-outline">Browse All Listings</a>
          </div>
          <p style={{marginTop:'24px',fontSize:'12px',color:'rgba(255,255,255,0.3)'}}>Nevada Lic. #S.0181401.LLC · lpt Realty</p>
        </div>
      </section>
    </main>
  )
}
