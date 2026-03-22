import HendersonFAQ from '@/components/HendersonFAQ'
import Link from 'next/link'
import type { Metadata } from 'next'
import HendersonMapWrapper from '@/components/HendersonMapWrapper'
import PortableText from '@/components/PortableText'
import { getCommunityPage } from '@/sanity/queries'
import { mergeQuickStats, getSectionImageUrl } from '@/lib/community-utils'

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const cms = await getCommunityPage('henderson')
  return {
    title: cms?.metaTitle ?? 'Henderson NV Homes For Sale | Nevada Real Estate Group',
    description: cms?.metaDescription ?? "Browse Henderson, NV homes for sale. Nevada's safest large city — Anthem, Green Valley Ranch, MacDonald Highlands, Lake Las Vegas. 1,200+ active listings from $300K to $10M+. Call 725.239.9950.",
  }
}

export default async function HendersonPage() {
  const cms = await getCommunityPage('henderson')

  const heroHeadline = cms?.heroHeadline ?? 'Henderson, NV Homes\nFor Sale'
  const heroSubheadline = cms?.heroSubheadline ?? "Nevada's second largest city — and consistently ranked one of the safest and most livable in America. Anthem, Green Valley Ranch, MacDonald Highlands, and Lake Las Vegas all call Henderson home."
  const overviewTitle = cms?.overviewTitle ?? 'Henderson: The Best-Kept Secret in the Las Vegas Metro'

  const HARDCODED_STATS: Array<[string, string] | [string, string, string]> = [
    ['Incorporated', '1953'],
    ['Population', '320,000+'],
    ['Median Home Price', '$485,000', 'gold'],
    ['Neighborhoods', '30+'],
    ['Schools', '45+ public, private & charter'],
    ['Parks', '160+'],
    ['Area', '105 sq miles'],
    ['Ranking', '#1 Safest City in NV'],
    ['Distance to Strip', '~15 min'],
    ['Distance to Lake Mead', '~15 min'],
    ['State Income Tax', 'None'],
    ['Property Tax Rate', '~0.6%'],
  ]
  const displayStats = mergeQuickStats(HARDCODED_STATS, cms?.quickStats)
  const lifestyleImageUrl = getSectionImageUrl(cms?.sectionImages, 'lifestyle')

  return (
    <main>
      <div className="breadcrumb">
        <div className="breadcrumb-inner">
          <Link href="/">Home</Link>
          <span className="breadcrumb-sep">›</span>
          <a href="/#communities">Communities</a>
          <span className="breadcrumb-sep">›</span>
          <span>Henderson</span>
        </div>
      </div>

      {/* HERO */}
      <header id="hero" className="henderson-hero">
        {cms?.heroImageUrl
          ? <img src={`${cms.heroImageUrl}?w=1920&auto=format&q=85`} alt="Henderson hero" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
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
              <div className="hero-stat"><span className="hero-stat-num">1,200+</span><span className="hero-stat-lbl">Active Listings</span></div>
              <div className="hero-stat"><span className="hero-stat-num">$300K–$10M+</span><span className="hero-stat-lbl">Price Range</span></div>
              <div className="hero-stat"><span className="hero-stat-num">45+</span><span className="hero-stat-lbl">Schools</span></div>
              <div className="hero-stat"><span className="hero-stat-num">160+</span><span className="hero-stat-lbl">Parks</span></div>
            </div>
          </div>
        </div>
      </header>

      {/* MAP */}
      <section id="map" style={{ padding: '64px 0', background: 'var(--charcoal)', borderBottom: '1px solid var(--border-dim)' }}>
        <div className="container">
          <div className="section-header" style={{ marginBottom: '32px' }}>
            <span className="section-label">Location</span>
            <h2>Where is Henderson?</h2>
            <p>Located southeast of Las Vegas — backed against the Black Mountains with Lake Mead to the east and the Strip visible from higher elevations.</p>
          </div>
          <div className="map-container">
            <HendersonMapWrapper />
          </div>
          <div className="drive-time-grid">
            {[
              ['~15 min', 'to the Strip', 'via I-215 W → I-15'],
              ['~15 min', 'to Lake Mead', 'via Lake Mead Dr E'],
              ['~20 min', 'to Downtown Las Vegas', 'via US-95 N'],
              ['~25 min', 'to Harry Reid Airport', 'via I-215 W → I-15 S'],
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
            <h2>New Henderson Listings</h2>
            <p>The latest homes listed in Henderson — houses, condos, and townhomes from established neighborhoods to new construction.</p>
          </div>
          <div className="ylopo-wrap">
            <div className="YLOPO_searchWidget" />
            <div className="YLOPO_resultsWidget" data-search='{"propertyTypes":["house","condo","townhouse"],"minPrice":200000,"locations":[{"city":"Henderson","state":"NV"}],"limit":12}'></div>
          </div>
          <p className="ylopo-note">Listing data sourced from regional MLS. Information deemed reliable but not guaranteed. Updated daily.</p>
          <div className="listings-actions">
            <a href="https://search.nevadarealestategroup.net/search?s[orderBy]=sourceCreationDate%2Cdesc&s[page]=1&s[locations][0][city]=Henderson&s[locations][0][state]=NV" target="_blank" rel="noopener noreferrer" className="btn-gold">View New Henderson Listings Now →</a>
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
                  <p>Henderson doesn&apos;t get the same national press as Summerlin, but buyers who end up here almost always wonder why they didn&apos;t look sooner. It&apos;s Nevada&apos;s second-largest city, with over 320,000 residents, and it operates entirely independently of Las Vegas — its own police force, fire department, water system, and municipal government.</p>
                  <p>What sets Henderson apart is the consistency of quality across its neighborhoods. Whether you&apos;re in Anthem, Green Valley Ranch, or the newer Inspirada development, the streets are clean, the HOAs are functional, and the planning shows. Henderson is what happens when a city government takes long-term livability seriously.</p>
                  <p>For families relocating from California, Henderson tends to check every box: nationally ranked safety, strong schools, newer housing stock, access to outdoor recreation at Lake Mead, and a price point that makes California buyers feel like they&apos;ve found something almost unreasonable. For investors, Henderson&apos;s employment base — Amazon, Barclaycard, a growing healthcare corridor — provides the rental demand fundamentals that pure resort markets can&apos;t.</p>
                  <p>The western communities like Anthem and Seven Hills sit up on the foothills with Strip views. The eastern side opens toward Lake Mead. Lake Las Vegas in the northeast is an entirely different experience — resort-style living on a 320-acre man-made lake that feels nothing like the rest of Nevada.</p>
                </>
              )}
            </div>
            <div className="overview-aside">
              <div className="quick-facts">
                <h3>Henderson At a Glance</h3>
                {displayStats.map(([label, value, cls]) => (
                  <div className="fact-row" key={label}>
                    <span className="fact-label">{label}</span>
                    <span className={`fact-value${cls ? ' ' + cls : ''}`}>{value}</span>
                  </div>
                ))}
              </div>
              <div className="cta-card">
                <p>Ready to explore Henderson? Let&apos;s schedule a private tour of the community and the listings that match your goals.</p>
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
            <span className="section-label">Why Henderson</span>
            <h2>The Reasons Buyers Keep Choosing Henderson</h2>
            <p>Safety, schools, outdoor access, and a real-city feel — not just a suburb. Here&apos;s what drives demand year after year.</p>
          </div>
          <div className="highlights-grid">
            {[
              { icon: '🛡️', title: "Nevada's Safest Large City", body: "Henderson has ranked among the nation's top 10 safest large cities for over a decade. Crime rates per capita run well below the national average — a primary draw for families relocating from higher-crime metros." },
              { icon: '🏞️', title: 'Lake Mead at Your Back Door', body: 'The Lake Mead National Recreation Area — the largest reservoir in the US — borders Henderson to the east. Boating, kayaking, hiking, and swimming within 15 minutes of most Henderson addresses.' },
              { icon: '🏛️', title: 'Anthem: A Master Plan Done Right', body: "Del Webb's Anthem community is one of the most successful master-planned developments in the Southwest. Guard-gated neighborhoods, dedicated parks, the Anthem Community Center, and sweeping Black Mountain views." },
              { icon: '💎', title: 'MacDonald Highlands & Ultra-Luxury', body: "Henderson's highest addresses sit in MacDonald Highlands — a guard-gated hillside enclave with some of the most dramatic Las Vegas Strip views available. DragonRidge Country Club anchors the community." },
              { icon: '🎓', title: '45+ Schools, Strong Options', body: "Henderson is zoned across CCSD's strongest feeder patterns. Liberty, Coronado, Foothill, and Green Valley High Schools are among the top-ranked public schools in Southern Nevada. Several strong private options round out the roster." },
              { icon: '🏢', title: 'Real Employment, Not Just Tourism', body: "Henderson's diversified job base — Amazon, Barclaycard, St. Rose hospitals, and a growing tech corridor — means rental demand and resale value aren't solely dependent on the Strip's fortunes." },
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
            <h2>Find Your Neighborhood in Henderson</h2>
            <p>From master-planned excellence to resort-style lakeside living — Henderson has a neighborhood for every lifestyle and price point.</p>
          </div>
          <div className="villages-grid">
            {[
              { name: 'Anthem', type: 'Guard-Gated · Master-Planned', desc: "Del Webb's flagship 4,800-acre master-planned community. Guard-gated enclaves, Anthem Country Club, stunning Black Mountain views, and one of Henderson's top community centers.", price: 'From $500K' },
              { name: 'MacDonald Highlands', type: 'Ultra-Luxury · Guard-Gated', desc: "Henderson's most exclusive address — hillside estates with panoramic Strip and valley views. DragonRidge Country Club anchors the community with a Tom Fazio-designed course.", price: 'From $1.5M+' },
              { name: 'Green Valley Ranch', type: 'Established · Walkable', desc: "One of Henderson's most desirable and walkable communities. Anchored by the Green Valley Ranch Resort & Spa and Town Center. Top-ranked schools and mature landscaping.", price: 'From $450K' },
              { name: 'Lake Las Vegas', type: 'Resort · Lakefront', desc: 'A 320-acre man-made lake in northeastern Henderson surrounded by resort hotels, two golf courses, and upscale residential communities. Almost Mediterranean in character.', price: 'From $600K' },
              { name: 'Seven Hills', type: 'Guard-Gated · Golf', desc: 'A guard-gated golf community built around the Revere Golf Club courses. Elevated terrain with valley views and well-established custom and semi-custom homes.', price: 'From $600K' },
              { name: 'Inspirada', type: 'Modern · New Construction', desc: "Henderson's newest major master-planned community on the southwest side. Contemporary architecture, great schools, and strong community programming. Popular with younger families.", price: 'From $450K' },
              { name: 'Sun City Anthem', type: '55+ Active Adult', desc: "Del Webb's premier active adult community within Anthem. Resort-style amenities, golf, clubs, organized activities, and some of the best views in Henderson.", price: 'From $380K' },
              { name: 'Tuscany Village', type: 'Italian-Inspired · Master-Planned', desc: 'A Mediterranean-themed master-planned community with its own golf course. Guard-gated sections, a community center, and consistently strong resale values.', price: 'From $420K' },
              { name: 'Whitney Ranch', type: 'Family · Established', desc: "One of Henderson's long-established family communities. Great location near Green Valley, strong school zoning, and a more affordable entry point into the Henderson market.", price: 'From $350K' },
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
              <img src={lifestyleImageUrl ? `${lifestyleImageUrl}?w=900&auto=format&q=85` : 'https://images.unsplash.com/photo-1570126618953-d437176e8c79?auto=format&fit=crop&w=900&h=600&q=80'} alt="Beautiful Henderson, Nevada home with mountain views" />
            </div>
            <div className="lifestyle-content">
              <span className="section-label">Outdoor Living</span>
              <div className="gold-rule" />
              <h2>160 Parks, Lake Mead, and 300 Days of Sunshine</h2>
              <p>Henderson was built with outdoor living in mind. The city maintains over 160 parks connected by a growing trail network, and the Lake Mead National Recreation Area — the largest reservoir in the US — sits at Henderson&apos;s eastern edge.</p>
              <p>The Anthem area trails connect to Black Mountain, while the northern communities tie into the regional trail system heading toward Las Vegas. Lake Las Vegas offers watersports, lakeside dining, and golf within city limits.</p>
              <div className="lifestyle-bullets">
                {[
                  '160+ parks maintained to consistent standards across all Henderson neighborhoods',
                  'Lake Mead National Recreation Area — 1.5 million acres of boating, hiking, and swimming',
                  'Black Mountain Trail system accessed directly from Anthem and Seven Hills',
                  'Lake Las Vegas — 320-acre man-made lake with watersports and golf',
                  'Henderson Bird Viewing Preserve — a genuine wildlife sanctuary within city limits',
                  'Day trips to Valley of Fire, Grand Canyon, Zion, and Bryce Canyon within 2–3 hours',
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
            <h2>45+ Schools Serving Henderson Families</h2>
            <p>From nationally recognized private schools to some of CCSD&apos;s strongest public options.</p>
          </div>
          <div className="schools-layout">
            <div className="school-group">
              <h3>Public High Schools (CCSD)</h3>
              {[
                ['Liberty High School', '9–12'],
                ['Coronado High School', '9–12'],
                ['Foothill High School', '9–12'],
                ['Green Valley High School', '9–12'],
                ['Silverado High School', '9–12'],
                ['Del Sol High School', '9–12'],
                ['Multiple CCSD Middle & Elementary', 'K–8'],
              ].map(([n, g]) => (
                <div className="school-item" key={n}>{n}<span className="school-grades">{g}</span></div>
              ))}
            </div>
            <div className="school-group">
              <h3>Private &amp; Catholic</h3>
              {[
                ['Pinecrest Academy of Nevada', 'PreK–12'],
                ['Henderson International School', 'PreK–8'],
                ['Alexander Dawson School', 'K–8'],
                ['The Meadows School', 'PreK–12'],
                ['Desert Christian Academy', 'K–12'],
                ['Faith Lutheran (Henderson Campus)', '6–12'],
              ].map(([n, g]) => (
                <div className="school-item" key={n}>{n}<span className="school-grades">{g}</span></div>
              ))}
            </div>
            <div className="school-group">
              <h3>Charter &amp; Magnet</h3>
              {[
                ['STEM Academy at Pinecrest', '6–8'],
                ['Nevada State High School', '11–12'],
                ['Advanced Technologies Academy', '9–12'],
                ['Charter School Options (×4)', 'Various'],
              ].map(([n, g]) => (
                <div className="school-item" key={n}>{n}<span className="school-grades">{g}</span></div>
              ))}
              <div style={{ marginTop: '24px', padding: '18px', background: 'rgba(201,168,76,0.06)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', fontSize: '13px', color: 'var(--white-70)', lineHeight: '1.7' }}>
                <strong style={{ color: 'var(--white)' }}>School Assignment Note:</strong> Zoning varies by neighborhood and address within Henderson. Always confirm your specific assignment with CCSD before purchasing.
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
            <h2>World-Class Golf in Henderson</h2>
            <p>From Tom Fazio&apos;s design at DragonRidge to the Butch Harmon School of Golf at Rio Secco — Henderson delivers serious golf.</p>
          </div>
          <div className="golf-grid">
            {[
              ["DragonRidge Country Club", "Tom Fazio Design · MacDonald Highlands · Members Only", 'private'],
              ["Revere Golf Club — Lexington", "Billy Casper & Greg Nash · Public · Stunning Views", 'public'],
              ["Revere Golf Club — Concord", "Billy Casper & Greg Nash · Public", 'public'],
              ["Anthem Country Club", "Members Only · Within Anthem Community", 'private'],
              ["Reflection Bay Golf Club", "Jack Nicklaus Design · Lake Las Vegas", 'public'],
              ["Rio Secco Golf Club", "Butch Harmon School of Golf · Semi-Private", 'public'],
              ["Tuscany Golf Club", "Tuscany Village · Semi-Private", 'public'],
              ["Legacy Golf Club", "Arthur Hills Design · Public", 'public'],
            ].map(([name, type, badge]) => (
              <div className="golf-card" key={name}>
                <div><div className="golf-name">{name}</div><div className="golf-type">{type}</div></div>
                <span className={`golf-badge ${badge}`}>{badge === 'private' ? 'Private' : 'Public'}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <HendersonFAQ />

      {/* CTA */}
      <section id="cta">
        <div className="container">
          <h2>Ready to Find Your Henderson Home?</h2>
          <p>Nevada&apos;s safest large city, some of the valley&apos;s best master-planned communities, and a market that consistently rewards buyers who move decisively.</p>
          <div className="cta-actions">
            <a href="tel:+17252399950" className="btn-gold">Call 725.239.9950</a>
            <a href="#listings" className="btn-outline">Browse All Listings</a>
          </div>
          <p style={{ marginTop: '24px', fontSize: '12px', color: 'rgba(255,255,255,0.3)' }}>Nevada Lic. #S.0181401.LLC · lpt Realty</p>
        </div>
      </section>
    </main>
  )
}
