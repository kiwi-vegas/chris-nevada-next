import AlianteFAQ from '@/components/AlianteFAQ'
import Link from 'next/link'
import type { Metadata } from 'next'
import AlianteMapWrapper from '@/components/AlianteMapWrapper'
import PortableText from '@/components/PortableText'
import { getCommunityPage } from '@/sanity/queries'
import { mergeQuickStats, mergeDriveTimes, getSectionImageUrl } from '@/lib/community-utils'

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const cms = await getCommunityPage('aliante')
  return {
    title: cms?.metaTitle ?? 'Aliante Homes For Sale | Nevada Real Estate Group',
    description: cms?.metaDescription ?? 'Browse Aliante homes for sale in North Las Vegas. Master-planned community with championship golf, Nature Discovery Park, and casino resort. Homes from $300K. Call 725.239.9950.',
  }
}

export default async function AliantePage() {
  const cms = await getCommunityPage('aliante')

  const heroHeadline = cms?.heroHeadline ?? 'Aliante Homes\nFor Sale'
  const heroSubheadline = cms?.heroSubheadline ?? "North Las Vegas\u2019 premier master-planned community \u2014 championship golf, a nature discovery park, and a casino resort all within walking distance."
  const overviewTitle = cms?.overviewTitle ?? 'Aliante: The Complete Community in North Las Vegas'

  const HARDCODED_STATS: Array<[string, string] | [string, string, string]> = [
    ['Established', '2003'],
    ['Developer', 'North Las Vegas Partners'],
    ['Total Acreage', '~1,905 acres'],
    ['Homes', '7,000+'],
    ['Median Home Price', '~$425,000', 'gold'],
    ['Neighborhoods', '15+'],
    ['Schools', '5+ nearby'],
    ['Parks', '10+'],
    ['Golf Course', 'Aliante Golf Club (18 holes)'],
    ['Casino Resort', 'Aliante Casino + Hotel + Spa'],
    ['Distance to Strip', '~25 min'],
    ['Distance to Downtown', '~20 min'],
  ]
  const displayStats = mergeQuickStats(HARDCODED_STATS, cms?.quickStats)
  const HARDCODED_DRIVE_TIMES = [
    { time: '~25 min', destination: 'to the Strip', route: 'via I-215 \u2192 I-15' },
    { time: '~20 min', destination: 'to Downtown Las Vegas', route: 'via US-95 South' },
    { time: '~30 min', destination: 'to Harry Reid Airport', route: 'via I-215 \u2192 I-15' },
    { time: '~40 min', destination: 'to Mt. Charleston', route: 'via US-95 \u2192 SR-157' },
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
          <span>Aliante</span>
        </div>
      </div>

      {/* HERO */}
      <header id="hero" className="summerlin-hero">
        {cms?.heroImageUrl
          ? <img src={`${cms.heroImageUrl}?w=1920&auto=format&q=85`} alt="Aliante hero" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
          : <div className="hero-bg" />
        }
        <div className="hero-overlay" />
        <div className="hero-content summerlin">
          <div className="container">
            <p className="hero-eyebrow-sm">North Las Vegas, Nevada</p>
            <div className="hero-rule" />
            <h1>{heroHeadline.split('\n').map((line, i) => (
              <span key={i}>{line}{i < heroHeadline.split('\n').length - 1 && <br />}</span>
            ))}</h1>
            <p className="hero-sub">{heroSubheadline}</p>
            <div className="hero-stats">
              <div className="hero-stat"><span className="hero-stat-num">{qs('Active Listings', '100+')}</span><span className="hero-stat-lbl">Active Listings</span></div>
              <div className="hero-stat"><span className="hero-stat-num">{qs('Price Range', '$300K\u2013$650K+')}</span><span className="hero-stat-lbl">Price Range</span></div>
              <div className="hero-stat"><span className="hero-stat-num">{qs('Golf Course', '18 holes')}</span><span className="hero-stat-lbl">Championship Golf</span></div>
              <div className="hero-stat"><span className="hero-stat-num">{qs('Total Acreage', '1,905')}</span><span className="hero-stat-lbl">Acres</span></div>
            </div>
          </div>
        </div>
      </header>

      {/* MAP */}
      <section id="map" style={{ padding: '32px 0 0', background: 'var(--charcoal)' }}>
        <div className="container">
          <div className="section-header" style={{ marginBottom: '32px' }}>
            <span className="section-label">Location</span>
            <h2>Where is Aliante?</h2>
            <p>Located in the northwest quadrant of North Las Vegas &mdash; bordered by the I-215 beltway with quick access to US-95 and I-15.</p>
          </div>
          <div className="map-container">
            <AlianteMapWrapper />
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
            <h2>New Aliante Listings</h2>
            <p>The 12 most recently listed homes in Aliante &mdash; single-family homes, townhomes, and golf course properties from $300K.</p>
          </div>
          <div className="ylopo-wrap">
            <div className="YLOPO_searchWidget" />
            <div className="YLOPO_resultsWidget" data-search='{"propertyTypes":["house","condo","townhouse"],"minPrice":200000,"locations":[{"city":"North Las Vegas","state":"NV"}],"limit":12,"sortBy":"listDate","sortOrder":"desc","keywords":"Aliante"}' />
          </div>
          <p className="ylopo-note">Listing data sourced from regional MLS. Information deemed reliable but not guaranteed. Updated daily.</p>
          <div className="listings-actions">
            <a href="https://search.nevadarealestategroup.net/search?s[orderBy]=sourceCreationDate%2Cdesc&s[page]=1&s[locations][0][city]=North%20Las%20Vegas&s[locations][0][state]=NV&s[keywords]=Aliante" target="_blank" rel="noopener noreferrer" className="btn-gold">View New Aliante Listings Now &rarr;</a>
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
                  <p>I&apos;ve been watching Aliante evolve since it broke ground in the early 2000s, and what impresses me most is how it changed the entire perception of North Las Vegas. Before Aliante, most buyers didn&apos;t consider North Las Vegas for serious master-planned community living. Aliante proved that you could build a genuinely world-class neighborhood here &mdash; complete with championship golf, resort-level amenities, and home quality that rivals anything on the west side of town &mdash; at price points that make the math work for a much wider range of buyers.</p>
                  <p>The Aliante Golf Club is the crown jewel. Designed by Gary Panks and Associates, this 18-hole championship course has been rated among the top public courses in Nevada since it opened. Whether you play or not, the golf course creates an open-space buffer through the community that elevates every neighborhood around it. Homes backing the fairways command a premium, but even homes several blocks away benefit from the views and the sense of space.</p>
                  <p>Then there&apos;s the Nature Discovery Park &mdash; a 20-acre educational park that showcases native Mojave Desert habitats with walking trails, wildlife viewing areas, and interpretive displays. It&apos;s a genuinely unique amenity that no other community in the valley has. Kids love it, and it gives the whole community a connection to the desert landscape that gets lost in most subdivisions.</p>
                  <p>The Aliante Casino + Hotel + Spa rounds out the package in a way that no other master-planned community can match. Fine dining, entertainment, a spa, and a full casino &mdash; walkable from most neighborhoods. It sounds unusual until you live here, and then it becomes one of those everyday conveniences that residents never want to give up. Combined with the I-215 beltway access, solid schools, and home prices that consistently offer more square footage per dollar than the valley average, Aliante is one of the smartest buys in the Las Vegas metro.</p>
                </>
              )}
            </div>
            <div className="overview-aside">
              <div className="quick-facts">
                <h3>Aliante At a Glance</h3>
                {displayStats.map(([label, value, cls]) => (
                  <div className="fact-row" key={label}>
                    <span className="fact-label">{label}</span>
                    <span className={`fact-value${cls ? ' ' + cls : ''}`}>{value}</span>
                  </div>
                ))}
              </div>
              <div className="cta-card">
                <p>Ready to explore Aliante? Let&apos;s schedule a private tour of the community and the current listings that match your goals.</p>
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
            <span className="section-label">Why Aliante</span>
            <h2>What Makes Aliante Stand Out</h2>
            <p>Championship golf, a nature park, and a casino resort &mdash; all in a master-planned community priced well below the valley average.</p>
          </div>
          <div className="highlights-grid">
            {[
              { icon: '\u26F3', title: 'Championship Golf Course', body: 'Aliante Golf Club is an 18-hole Gary Panks design consistently rated among the top public courses in Nevada. Open fairways and mountain views create a resort atmosphere for the entire community.' },
              { icon: '\u{1F3B0}', title: 'Aliante Casino + Hotel + Spa', body: 'A full-service casino resort within walking distance \u2014 fine dining, entertainment, a luxury spa, and a sportsbook. An everyday convenience no other master-planned community offers.' },
              { icon: '\u{1F335}', title: 'Nature Discovery Park', body: 'A 20-acre educational park showcasing native Mojave Desert habitats with walking trails, wildlife viewing areas, and interpretive displays. A one-of-a-kind community amenity.' },
              { icon: '\u{1F4B0}', title: 'Exceptional Value', body: 'More home for your dollar than almost anywhere in the Las Vegas metro. Median prices ~40% below Summerlin with comparable master-plan amenities and newer construction.' },
              { icon: '\u{1F6E3}\uFE0F', title: 'I-215 Beltway Access', body: 'Direct access to the I-215 beltway puts you 20\u201325 minutes from the Strip, downtown, and major employment centers. US-95 and I-15 connections are minutes away.' },
              { icon: '\u{1F6E1}\uFE0F', title: 'Growing North Las Vegas', body: 'North Las Vegas is one of the fastest-growing cities in Nevada with significant commercial development, new retail, and expanding city services. Aliante anchors the northwest quadrant.' },
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
            <h2>Explore Aliante&apos;s Neighborhoods</h2>
            <p>From golf course homes to family-friendly cul-de-sacs, Aliante has a neighborhood for every lifestyle.</p>
          </div>
          <div className="villages-grid">
            {[
              { name: 'Golf Course Estates', type: 'Golf \u00B7 Premium Views', desc: 'Single-family homes backing the Aliante Golf Club fairways. Panoramic course and mountain views with the open-space buffer that golf course living provides.', price: 'From $500K' },
              { name: 'Aliante North', type: 'Family \u00B7 Established', desc: 'Well-established neighborhoods in the northern section of the community with mature landscaping, parks, and proximity to the Nature Discovery Park.', price: 'From $400K' },
              { name: 'Aliante South', type: 'Entry-Level \u00B7 Convenient', desc: 'More accessible price points near the southern entrance of the community. Convenient freeway access and walking distance to the Aliante Casino.', price: 'From $330K' },
              { name: 'The Villas', type: 'Townhomes \u00B7 Low-Maintenance', desc: 'Attached townhome communities ideal for first-time buyers, young professionals, and downsizers looking for low-maintenance living within Aliante.', price: 'From $300K' },
              { name: 'Nature Park Neighborhoods', type: 'Family \u00B7 Outdoor Access', desc: 'Neighborhoods adjacent to the Nature Discovery Park and community trail system. Popular with families who want outdoor access built into daily life.', price: 'From $380K' },
              { name: 'Premium Single-Family', type: 'Move-Up \u00B7 Spacious', desc: 'Larger single-family homes with 4\u20135 bedrooms, three-car garages, and premium lot sizes. The top tier of Aliante\u2019s housing stock.', price: 'From $550K+' },
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
                alt="Golf course and desert landscape in Aliante, North Las Vegas"
              />
            </div>
            <div className="lifestyle-content">
              <span className="section-label">Outdoor Living</span>
              <div className="gold-rule" />
              <h2>Championship Golf, Desert Trails, and Mountain Views</h2>
              <p>Aliante delivers an outdoor lifestyle that punches well above its price point. The championship golf course creates a green corridor through the heart of the community, and the Nature Discovery Park adds something genuinely unique &mdash; a 20-acre window into the Mojave Desert ecosystem.</p>
              <p>The community trail system connects neighborhoods to parks, the golf course, and the Nature Discovery Park, making it easy to walk, jog, or bike without ever leaving the community.</p>
              <div className="lifestyle-bullets">
                {[
                  'Aliante Golf Club \u2014 18-hole championship course, top-rated public course in Nevada',
                  'Nature Discovery Park \u2014 20 acres of native desert habitats, trails, and wildlife viewing',
                  'Community trail system connecting neighborhoods, parks, and open spaces',
                  'Panoramic views of the Spring Mountains, Sheep Range, and surrounding desert',
                  'Mt. Charleston ski resort ~40 minutes; Red Rock Canyon and Valley of Fire within an hour',
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
            <h2>Schools Serving Aliante Families</h2>
            <p>North Las Vegas has invested in new schools to serve the growing northwest corridor.</p>
          </div>
          <div className="schools-layout">
            <div className="school-group">
              <h3>Public Schools (CCSD)</h3>
              {[['Aliante Elementary','K\u20135'],['Sandra L. Thompson Elementary','K\u20135'],['William E. Ferron Elementary','K\u20135'],['James & Rosemary Fong Elementary','K\u20135'],['Ralph & Betty Cadwallader Middle','6\u20138'],['Cheyenne High School','9\u201312'],['Legacy High School','9\u201312'],].map(([n,g])=>(
                <div className="school-item" key={n}>{n}<span className="school-grades">{g}</span></div>
              ))}
            </div>
            <div className="school-group">
              <h3>Private &amp; Faith-Based</h3>
              {[['Mountain View Christian School','PreK\u201312'],['Legacy Traditional School','K\u20138'],['Faith Lutheran Academy','K\u20135'],].map(([n,g])=>(
                <div className="school-item" key={n}>{n}<span className="school-grades">{g}</span></div>
              ))}
            </div>
            <div className="school-group">
              <h3>Charter &amp; Specialty</h3>
              {[['Doral Academy of Nevada','K\u20138'],['Somerset Academy Sky Pointe','K\u20138'],['Pinecrest Academy of Nevada','K\u201312'],].map(([n,g])=>(
                <div className="school-item" key={n}>{n}<span className="school-grades">{g}</span></div>
              ))}
              <div style={{marginTop:'24px',padding:'18px',background:'rgba(201,168,76,0.06)',border:'1px solid var(--border)',borderRadius:'var(--radius)',fontSize:'13px',color:'var(--white-70)',lineHeight:'1.7'}}>
                <strong style={{color:'var(--white)'}}>School Assignment Note:</strong> North Las Vegas school zones vary by address. The city has built several new schools in recent years to serve the northwest corridor. Always confirm your assigned school with CCSD before purchasing.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <AlianteFAQ />

      {/* CTA */}
      <section id="cta">
        <div className="container">
          <h2>Ready to Find Your Aliante Home?</h2>
          <p>Whether you want a golf course view, a family home near the Nature Discovery Park, or the best value per square foot in the valley, I&apos;ll help you find the right fit in Aliante.</p>
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
