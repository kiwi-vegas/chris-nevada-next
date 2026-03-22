import CommunityFAQ from '@/components/CommunityFAQ'
import CommunityMapWrapper from '@/components/CommunityMapWrapper'
import Link from 'next/link'
import type { Metadata } from 'next'
import { getCommunityPage } from '@/sanity/queries'
import { mergeQuickStats, getSectionImageUrl } from '@/lib/community-utils'

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const cms = await getCommunityPage('spanish-springs')
  return {
    title: cms?.metaTitle ?? 'Spanish Springs NV Homes For Sale | Nevada Real Estate Group',
    description: cms?.metaDescription ?? "Browse Spanish Springs, NV homes for sale. Northeast Reno's fastest-growing valley — newer construction, mountain views, master-planned neighborhoods from $350K to $1.5M+. Call 725.239.9950.",
  }
}

export default async function SpanishSpringsPage() {
  const cms = await getCommunityPage('spanish-springs')

  const heroHeadline = cms?.heroHeadline ?? 'Spanish Springs, NV\nHomes For Sale'
  const heroSubheadline = cms?.heroSubheadline ?? "Northeast Reno's fastest-growing residential valley — master-planned neighborhoods, newer construction, mountain views in every direction, and access to Sparks and Reno without the density of either."

  const HARDCODED_STATS: Array<[string, string] | [string, string, string]> = [
    ['Area', 'NE Washoe County'],
    ['Built Era', 'Primarily 2000s–2020s'],
    ['Commute to Reno', '~20 min'],
    ['Commute to Sparks', '~15 min'],
    ['State Income Tax', 'None'],
    ['School District', 'Washoe County SD'],
    ['To Pyramid Lake', '~35 min'],
    ['To Lake Tahoe', '~60 min'],
    ['Property Tax Rate', '~0.7%'],
    ['Best for', 'Families, CA relocations'],
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
          <span>Spanish Springs</span>
        </div>
      </div>

      {/* HERO */}
      <header id="hero" className="spanish-springs-hero">
        {cms?.heroImageUrl
          ? <img src={`${cms.heroImageUrl}?w=1920&auto=format&q=85`} alt="Spanish Springs hero" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
          : <div className="hero-bg" />
        }
        <div className="hero-overlay" />
        <div className="hero-content summerlin">
          <div className="container">
            <p className="hero-eyebrow-sm">Spanish Springs, Nevada</p>
            <div className="hero-rule" />
            <h1>{heroHeadline.split('\n').map((line, i) => (
              <span key={i}>{line}{i < heroHeadline.split('\n').length - 1 && <br />}</span>
            ))}</h1>
            <p className="hero-sub">{heroSubheadline}</p>
            <div className="hero-stats">
              <div className="hero-stat"><span className="hero-stat-num">500+</span><span className="hero-stat-lbl">Active Listings</span></div>
              <div className="hero-stat"><span className="hero-stat-num">$350K–$1.5M+</span><span className="hero-stat-lbl">Price Range</span></div>
              <div className="hero-stat"><span className="hero-stat-num">3</span><span className="hero-stat-lbl">Property Types</span></div>
              <div className="hero-stat"><span className="hero-stat-num">Daily</span><span className="hero-stat-lbl">Updates</span></div>
            </div>
          </div>
        </div>
      </header>

      {/* MAP */}
      <section id="map" style={{ padding: '64px 0', background: 'var(--charcoal)', borderBottom: '1px solid var(--border-dim)' }}>
        <div className="container">
          <div className="section-header" style={{ marginBottom: '32px' }}>
            <span className="section-label">Location</span>
            <h2>Where is Spanish Springs?</h2>
            <p>Situated in a natural valley northeast of Reno — flanked by the Pah Rah Range to the east and the Virginia Range to the south, with the Reno-Sparks metro just over the ridge.</p>
          </div>
          <div style={{ height: '420px', borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid var(--border)' }}>
            <CommunityMapWrapper
              center={[-119.703, 39.638]}
              zoom={12}
              boundary={[[-119.77,39.67],[-119.72,39.68],[-119.66,39.66],[-119.63,39.63],[-119.63,39.60],[-119.66,39.58],[-119.72,39.57],[-119.78,39.59],[-119.79,39.63],[-119.77,39.67]]}
              name="Spanish Springs"
              subtitle="Washoe County, Nevada"
              id="spanish-springs-map"
            />
          </div>
          <div className="drive-time-grid">
            {[
              ['~20 min', 'to Downtown Reno', 'via Pyramid Hwy → US-395 S'],
              ['~15 min', 'to Sparks', 'via Vista Blvd → I-80 W'],
              ['~35 min', 'to Pyramid Lake', 'via Pyramid Hwy N'],
              ['~60 min', 'to Lake Tahoe', 'via US-395 S → NV-431'],
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
            <h2>New Spanish Springs Listings</h2>
            <p>The latest homes listed in Spanish Springs — newer construction single-family homes, townhomes, and move-in-ready properties from established builders.</p>
          </div>
          <div className="ylopo-wrap">
            <div className="YLOPO_resultsWidget" data-search='{"propertyTypes":["house","condo","townhouse"],"minPrice":350000,"locations":[{"city":"Spanish Springs","state":"NV"}],"limit":12}'></div>
          </div>
          <p className="ylopo-note">Listing data sourced from regional MLS. Information deemed reliable but not guaranteed. Updated daily.</p>
          <div className="listings-actions">
            <a href="https://search.nevadarealestategroup.net/search?s[orderBy]=sourceCreationDate%2Cdesc&s[page]=1&s[locations][0][city]=Spanish+Springs&s[locations][0][state]=NV" target="_blank" rel="noopener noreferrer" className="btn-gold">View All Spanish Springs Listings →</a>
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
              <h2>Spanish Springs: Northeast Reno&apos;s Most Livable Valley</h2>
              <p>Spanish Springs Valley sits northeast of Reno in a natural basin that has absorbed much of the region&apos;s growth over the past two decades. Unlike urban Reno or downtown Sparks, Spanish Springs feels distinctly suburban — quieter streets, larger lot sizes, newer construction standards, and the kind of mountain views (Pah Rah Range to the east, Virginia Range to the south) that don&apos;t exist in flatter parts of the valley.</p>
              <p>The area is popular with families relocating from California who want space, good schools, and an easy commute. The Spanish Springs Town Center anchors the commercial core with grocery, dining, and retail that handles daily needs without requiring a drive to Reno proper. No state income tax. Easy I-80 access connects to both Reno and Sparks employment centers in under 20 minutes.</p>
              <p>What distinguishes Spanish Springs from other Reno suburbs is the sense of contained geography — the valley has natural boundaries that create a genuine community feel rather than the sprawl of newer developments. Residents know their neighborhood. The schools are newer, the parks are maintained, and the streets actually have sidewalks.</p>
              <p>For buyers priced out of Reno proper or deterred by the density of Sparks, Spanish Springs offers the best of both: suburban space and quiet, with urban employment and amenities within a 20-minute commute.</p>
            </div>
            <div className="overview-aside">
              <div className="quick-facts">
                <h3>Spanish Springs At a Glance</h3>
                {displayStats.map(([label, value, cls]) => (
                  <div className="fact-row" key={label}>
                    <span className="fact-label">{label}</span>
                    <span className={`fact-value${cls ? ' ' + cls : ''}`}>{value}</span>
                  </div>
                ))}
              </div>
              <div className="cta-card">
                <p>Ready to explore Spanish Springs? Let&apos;s schedule a private tour of the neighborhoods and listings that match your goals.</p>
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
            <span className="section-label">Why Spanish Springs</span>
            <h2>The Reasons Families Keep Choosing Spanish Springs</h2>
            <p>Newer construction, mountain views, family-friendly planning, and a price point that beats Reno proper. Here&apos;s what drives demand.</p>
          </div>
          <div className="highlights-grid">
            {[
              { icon: '🏗️', title: 'Newer Construction Standards', body: "Spanish Springs grew primarily in the 2000s and 2010s, meaning the housing stock is significantly newer than Reno proper or Sparks proper. Buyers find better insulation, updated mechanical systems, larger floor plans, and the kind of open-concept layouts that older Reno neighborhoods simply don&apos;t have." },
              { icon: '🏔️', title: 'Mountain Views in Every Direction', body: "The Pah Rah Range rises to the east, the Virginia Range borders the south, and the Spanish Springs Valley sits in a natural bowl that frames mountain views from nearly every street. This kind of topographic drama is rare in metro-accessible real estate." },
              { icon: '🚗', title: 'Easy Commute Corridor', body: "Pyramid Highway and US-395 connect Spanish Springs to Reno in 20 minutes and Sparks in 15. The commute is highway-based with minimal traffic compared to most California metros, and the drive itself — through high desert with mountain backdrops — is genuinely pleasant." },
              { icon: '🎒', title: 'Strong Family Infrastructure', body: "Spanish Springs has been built for families — newer schools, parks within walking distance of most subdivisions, lower crime rates than urban Reno, and a neighborhood-first character that comes from planned development rather than organic urban growth." },
              { icon: '🏞️', title: 'Pyramid Lake Access', body: "Pyramid Lake — the stunning saline lake on the Paiute Reservation — sits 35 minutes north via Pyramid Highway. One of the most visually dramatic landscapes in Nevada, Pyramid Lake offers trophy trout fishing, kayaking, and desert photography opportunities unavailable near any other Nevada metro." },
              { icon: '💰', title: 'Affordable Relative to Reno Proper', body: "Spanish Springs consistently offers more square footage per dollar than comparable Reno neighborhoods. Buyers who prioritize new construction, larger lots, and suburban quiet over urban proximity find Spanish Springs represents exceptional value within the Washoe County market." },
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
            <h2>Neighborhoods Within Spanish Springs</h2>
            <p>From established family subdivisions to newer construction communities — every neighborhood in Spanish Springs offers mountain views and easy metro access.</p>
          </div>
          <div className="villages-grid">
            {[
              { name: 'Hidden Valley', type: 'Established · Family', desc: "One of Spanish Springs&apos; most established neighborhoods with mature landscaping and a strong community feel. Single-family homes on larger lots with good school zoning and easy access to Hidden Valley Regional Park.", price: 'From $450K' },
              { name: 'Wingfield Springs', type: 'Master-Planned · Golf', desc: "A large master-planned community anchored by the Wingfield Springs Golf Course. Well-maintained HOA, parks, and a mix of housing types from townhomes to executive single-family homes.", price: 'From $500K' },
              { name: 'Los Altos', type: 'Established · Value', desc: "A well-established Spanish Springs neighborhood offering good value within the valley. Reliable schools, park access, and the quiet suburban character that draws families from California.", price: 'From $400K' },
              { name: 'Pioneer Meadows', type: 'Newer · Family', desc: "One of the newer planned communities in Spanish Springs with contemporary floor plans, energy-efficient construction, and family-oriented amenities. Popular with first-time buyers and young families.", price: 'From $375K' },
              { name: 'Silver Knolls', type: 'Elevated · Views', desc: "Higher-elevation homes on the valley&apos;s eastern edge offering the most dramatic Pah Rah Range views in Spanish Springs. Larger lots, more custom-style construction, and a quieter setting than valley-floor subdivisions.", price: 'From $550K' },
              { name: 'Cold Springs', type: 'Entry · Spacious', desc: "The northernmost community in the Spanish Springs corridor — lower price points, larger lot sizes, and a genuine rural feel while still within commuting distance of Sparks and Reno employment centers.", price: 'From $350K' },
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
              <img src={lifestyleImageUrl ? `${lifestyleImageUrl}?w=900&auto=format&q=85` : 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=900&h=600&q=80'} alt="Desert mountain landscape near Spanish Springs, Nevada" />
            </div>
            <div className="lifestyle-content">
              <span className="section-label">Suburban Living, Natural Access</span>
              <div className="gold-rule" />
              <h2>Mountain Views, Pyramid Lake, and a Commute That Actually Works</h2>
              <p>Spanish Springs delivers the suburban lifestyle California families are accustomed to, but with mountain views from the backyard, a genuine outdoor recreation corridor to the north, and a commute that takes 20 minutes instead of 90.</p>
              <p>The Pah Rah Range immediately east of the valley offers hiking and trail running with views across the Truckee Meadows. Pyramid Lake — a strikingly beautiful desert lake 35 minutes north — provides fishing, kayaking, and one of the most photogenic landscapes in Nevada. Lake Tahoe and its ski resorts are an hour away for weekend trips.</p>
              <div className="lifestyle-bullets">
                {[
                  'Hidden Valley Regional Park — trails, sports fields, and open space within the valley',
                  'Pyramid Lake — trophy trout fishing, kayaking, and desert landscapes, 35 min north',
                  'Pah Rah Range hiking — access to trails from multiple Spanish Springs trailheads',
                  'Spanish Springs Town Center — grocery, dining, and daily needs without Reno traffic',
                  'Lake Tahoe day trips — 60 min via US-395 for skiing, swimming, and mountain biking',
                  'Reno arts and dining — 20 min to Midtown, downtown, and all Reno cultural amenities',
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
            <h2>Schools Serving Spanish Springs Families</h2>
            <p>Washoe County School District schools built for a growing community — newer facilities with strong academic programming.</p>
          </div>
          <div className="schools-layout">
            <div className="school-group">
              <h3>Public Schools (WCSD)</h3>
              {[
                ['Spanish Springs Elementary', 'K–5'],
                ['Shaw Middle School', '6–8'],
                ['Spanish Springs High School', '9–12'],
                ['Cold Springs Middle School', '6–8'],
                ['Multiple WCSD Elementary Schools', 'K–5'],
              ].map(([n, g]) => (
                <div className="school-item" key={n}>{n}<span className="school-grades">{g}</span></div>
              ))}
            </div>
            <div className="school-group">
              <h3>Charter &amp; Alternative</h3>
              {[
                ['Coral Academy of Science (Sparks)', 'K–12'],
                ['Rainshadow Community Charter', '9–12'],
                ['NOVA Academy', 'K–8'],
              ].map(([n, g]) => (
                <div className="school-item" key={n}>{n}<span className="school-grades">{g}</span></div>
              ))}
            </div>
            <div className="school-group">
              <h3>Private Options (Reno, ~20 min)</h3>
              {[
                ['Davidson Academy', '6–12'],
                ['Bishop Manogue Catholic HS', '9–12'],
                ['Sage Ridge School', 'K–12'],
              ].map(([n, g]) => (
                <div className="school-item" key={n}>{n}<span className="school-grades">{g}</span></div>
              ))}
              <div style={{ marginTop: '24px', padding: '18px', background: 'rgba(201,168,76,0.06)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', fontSize: '13px', color: 'var(--white-70)', lineHeight: '1.7' }}>
                <strong style={{ color: 'var(--white)' }}>School Assignment Note:</strong> Specific school assignment depends on your address within Spanish Springs. Always confirm with Washoe County School District before purchasing.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <CommunityFAQ
        title="Spanish Springs Real Estate — Frequently Asked Questions"
        subtitle="Answers to the questions buyers ask most about living and investing in Spanish Springs."
        faqs={[
          {
            q: "How does Spanish Springs compare to Sparks and Reno for home buyers?",
            a: "Spanish Springs offers newer construction, larger lot sizes, and a quieter suburban character than either urban Reno or Sparks proper. Price per square foot is typically lower than comparable Reno neighborhoods. The tradeoff is slightly longer commutes to downtown Reno and fewer walkable urban amenities. For families who prioritize space, newer homes, and good schools over walkability, Spanish Springs is often the best value in the Truckee Meadows."
          },
          {
            q: "Is there new construction available in Spanish Springs?",
            a: "Yes — Spanish Springs continues to see new construction activity, particularly in Pioneer Meadows and the northern portions of the valley. Several national and regional builders maintain active subdivisions. New construction typically comes with builder warranties, energy efficiency upgrades, and the ability to customize finishes, which appeals strongly to buyers relocating from California who are accustomed to newer housing stock."
          },
          {
            q: "What is the commute from Spanish Springs to Reno like?",
            a: "Most Spanish Springs addresses are 15–25 minutes from central Reno via Pyramid Highway and US-395. Traffic is light by California standards — even during peak hours, the commute rarely exceeds 30 minutes. The drive itself crosses through the Spanish Springs Valley and over a low ridge into the Truckee Meadows, with mountain views for most of the route. Many residents describe it as one of the more pleasant commutes they've experienced."
          },
          {
            q: "What is the price per square foot in Spanish Springs vs. other Reno suburbs?",
            a: "Spanish Springs typically runs $220–$280/sqft for single-family homes, compared to $280–$380/sqft in central Reno and $250–$320/sqft in South Meadows. The discount reflects the commute premium and the suburban rather than urban location. For buyers prioritizing space and newer construction over proximity to downtown, Spanish Springs consistently delivers more home for the dollar than any other comparable Washoe County market."
          },
          {
            q: "What is the investment potential in Spanish Springs?",
            a: "Spanish Springs has seen consistent appreciation driven by the Reno metro's population growth and California in-migration. Rental demand is solid given proximity to Sparks employment centers and the broader Reno tech corridor. The valley's natural geographic limits on development create a degree of supply scarcity that supports long-term values. Investors focused on single-family rentals find cap rates in the 4–5.5% range, which compares favorably to Northern California or Portland."
          },
          {
            q: "What does the community feel like day-to-day?",
            a: "Spanish Springs has a genuine suburban community character — neighbors know each other, the parks are well-used, and the schools are the social hub of the community. It's quieter and more spacious than Sparks or central Reno without feeling isolated. The Town Center provides everyday convenience. Most residents describe it as the closest thing to California suburban living they've found in Nevada, but at a fraction of the cost and with better weather and outdoor access."
          },
        ]}
      />

      {/* CTA */}
      <section id="cta">
        <div className="container">
          <h2>Ready to Find Your Spanish Springs Home?</h2>
          <p>Northeast Reno&apos;s most livable valley — newer construction, mountain views, strong schools, and a commute that actually works.</p>
          <div className="cta-actions">
            <a href="tel:+17252399950" className="btn-gold">Call 725.239.9950</a>
            <a href="https://www.nevadarealestategroup.com/free-market-analysis/" target="_blank" rel="noopener noreferrer" className="btn-outline">Free Market Analysis</a>
          </div>
          <p style={{ marginTop: '24px', fontSize: '12px', color: 'rgba(255,255,255,0.3)' }}>Nevada Lic. #S.0181401.LLC · lpt Realty</p>
        </div>
      </section>
    </main>
  )
}
