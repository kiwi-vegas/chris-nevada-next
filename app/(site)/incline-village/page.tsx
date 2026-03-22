import CommunityFAQ from '@/components/CommunityFAQ'
import CommunityMapWrapper from '@/components/CommunityMapWrapper'
import Link from 'next/link'
import type { Metadata } from 'next'
import { getCommunityPage } from '@/sanity/queries'
import { mergeQuickStats, getSectionImageUrl } from '@/lib/community-utils'

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const cms = await getCommunityPage('incline-village')
  return {
    title: cms?.metaTitle ?? 'Incline Village NV Homes For Sale | Nevada Real Estate Group',
    description: cms?.metaDescription ?? "Browse Incline Village, NV homes for sale. Nevada's most coveted Lake Tahoe address — private beach clubs, Diamond Peak ski resort, Nevada tax advantages. 250+ listings from $800K to $15M+. Call 725.239.9950.",
  }
}

export default async function InclineVillagePage() {
  const cms = await getCommunityPage('incline-village')

  const heroHeadline = cms?.heroHeadline ?? 'Incline Village, NV\nHomes For Sale'
  const heroSubheadline = cms?.heroSubheadline ?? "Nevada's most coveted Lake Tahoe address — private beach clubs on the clearest alpine lake in North America, Diamond Peak ski resort, and the tax advantages of Nevada residency steps from California's backyard."

  const HARDCODED_STATS: Array<[string, string] | [string, string, string]> = [
    ['County', 'Washoe'],
    ['Lake', 'Lake Tahoe (NE shore)'],
    ['Ski Resort', 'Diamond Peak'],
    ['Golf', 'Incline Village GC (RTJ Jr.)'],
    ['State Income Tax', 'None'],
    ['Population', '~9,000'],
    ['Beach Clubs', '2 private (IVGID)'],
    ['To Reno', '~35 min'],
    ['Elevation', '6,300 ft'],
    ['Season', 'Year-round'],
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
          <span>Incline Village</span>
        </div>
      </div>

      {/* HERO */}
      <header id="hero" className="incline-village-hero">
        {cms?.heroImageUrl
          ? <img src={`${cms.heroImageUrl}?w=1920&auto=format&q=85`} alt="Incline Village hero" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
          : <div className="hero-bg" />
        }
        <div className="hero-overlay" />
        <div className="hero-content summerlin">
          <div className="container">
            <p className="hero-eyebrow-sm">Lake Tahoe, Nevada</p>
            <div className="hero-rule" />
            <h1>{heroHeadline.split('\n').map((line, i) => (
              <span key={i}>{line}{i < heroHeadline.split('\n').length - 1 && <br />}</span>
            ))}</h1>
            <p className="hero-sub">{heroSubheadline}</p>
            <div className="hero-stats">
              <div className="hero-stat"><span className="hero-stat-num">250+</span><span className="hero-stat-lbl">Active Listings</span></div>
              <div className="hero-stat"><span className="hero-stat-num">$800K–$15M+</span><span className="hero-stat-lbl">Price Range</span></div>
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
            <h2>Where is Incline Village?</h2>
            <p>Located on the northeast shore of Lake Tahoe, entirely within Nevada — the closest major Tahoe community to Reno and the only lakeside address with Nevada&apos;s zero income tax.</p>
          </div>
          <div style={{ height: '420px', borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid var(--border)' }}>
            <CommunityMapWrapper
              center={[-119.960, 39.250]}
              zoom={12}
              boundary={[[-120.00,39.28],[-119.97,39.29],[-119.93,39.28],[-119.91,39.26],[-119.92,39.22],[-119.95,39.21],[-119.99,39.22],[-120.01,39.25],[-120.00,39.28]]}
              name="Incline Village"
              subtitle="Lake Tahoe, Nevada"
              id="incline-village-map"
            />
          </div>
          <div className="drive-time-grid">
            {[
              ['~35 min', 'to Reno', 'via NV-431 → US-395 N'],
              ['~30 min', 'to Truckee, CA', 'via NV-267 → CA-267'],
              ['~20 min', 'to Crystal Bay', 'via NV-28 W'],
              ['~45 min', 'to South Lake Tahoe', 'via NV-28 → US-50'],
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
            <h2>New Incline Village Listings</h2>
            <p>The latest homes listed in Incline Village — lakefront estates, mountain retreats, ski-in condos, and golf community homes.</p>
          </div>
          <div className="ylopo-wrap">
            <div className="YLOPO_resultsWidget" data-search='{"propertyTypes":["house","condo","townhouse"],"minPrice":800000,"locations":[{"city":"Incline Village","state":"NV"}],"limit":12}'></div>
          </div>
          <p className="ylopo-note">Listing data sourced from regional MLS. Information deemed reliable but not guaranteed. Updated daily.</p>
          <div className="listings-actions">
            <a href="https://search.nevadarealestategroup.net/search?s[orderBy]=sourceCreationDate%2Cdesc&s[page]=1&s[locations][0][city]=Incline+Village&s[locations][0][state]=NV" target="_blank" rel="noopener noreferrer" className="btn-gold">View All Incline Village Listings →</a>
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
              <h2>Incline Village: The Most Coveted Tahoe Address in Nevada</h2>
              <p>Incline Village is one of the most sought-after residential communities in the western United States — a small city of about 9,000 residents on the northeast shore of Lake Tahoe, entirely within Nevada. What makes it extraordinary is the combination: Nevada&apos;s zero state income tax (saving California transplants up to 13.3% annually), private beach clubs with exclusive access to Lake Tahoe&apos;s crystal-clear waters, Diamond Peak ski resort steps from residential streets, and a tight-knit community of physicians, tech executives, and retirees who could live anywhere.</p>
              <p>The Hyatt Regency Lake Tahoe anchors the lakefront. Championship golf at Incline Village Golf Course (designed by Robert Trent Jones Jr.). The contrast to South Lake Tahoe on the California side is stark — quieter, better maintained, higher property values, and none of California&apos;s tax burden.</p>
              <p>For California buyers, the calculation is compelling: establish Nevada residency in Incline Village, eliminate state income tax, and enjoy Lake Tahoe access that is genuinely superior to what&apos;s available from the California side. For buyers accustomed to luxury resort markets, Incline Village offers something even Aspen and Vail can&apos;t — a sovereign state tax advantage built directly into your address.</p>
              <p>The private beach clubs — the IVGID (Incline Village General Improvement District) manages two sandy beaches with volleyball, boat launches, and seasonal amenities — are available exclusively to Incline Village and Crystal Bay residents. Outsiders cannot access them. This exclusivity is a meaningful driver of demand.</p>
            </div>
            <div className="overview-aside">
              <div className="quick-facts">
                <h3>Incline Village At a Glance</h3>
                {displayStats.map(([label, value, cls]) => (
                  <div className="fact-row" key={label}>
                    <span className="fact-label">{label}</span>
                    <span className={`fact-value${cls ? ' ' + cls : ''}`}>{value}</span>
                  </div>
                ))}
              </div>
              <div className="cta-card">
                <p>Ready to explore Incline Village? Let&apos;s schedule a private tour of the community and available properties.</p>
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
            <span className="section-label">Why Incline Village</span>
            <h2>The Reasons Buyers Choose Incline Village Over the California Side</h2>
            <p>Tax advantages, private beach access, Diamond Peak, and a community that&apos;s genuinely exclusive. Here&apos;s what drives demand.</p>
          </div>
          <div className="highlights-grid">
            {[
              { icon: '🏖️', title: 'Private Beach Clubs — Residents Only', body: "IVGID operates two private sandy beaches on Lake Tahoe accessible exclusively to Incline Village and Crystal Bay property owners and renters. No public access. Year-round amenities include volleyball courts, boat launches, and seasonal programming. This is a primary driver of property values." },
              { icon: '⛷️', title: 'Diamond Peak Ski Resort', body: "Diamond Peak sits directly above the community — some residential streets are a short drive from the base. A family-oriented mountain with 30 trails, 1,840-foot vertical drop, and Lake Tahoe views from virtually every run. Far less crowded than the South Shore resorts on weekends." },
              { icon: '💰', title: 'Nevada Tax Advantage', body: "Incline Village residents pay zero Nevada state income tax. For a California resident earning $500K annually, establishing Nevada residency here saves approximately $50,000+ per year. The combination of Tahoe lifestyle and California-free taxation makes Incline Village effectively tax-advantaged luxury real estate." },
              { icon: '⛳', title: 'Championship Golf', body: "Incline Village Golf Course (Mountain Course, Robert Trent Jones Jr.) and the Championship Course offer two distinct experiences at elevation. The courses are IVGID-operated and available to property owners with preferred access and pricing." },
              { icon: '🌊', title: "Lake Tahoe's Clearest Water", body: "Lake Tahoe is one of the clearest large lakes in the world — visibility to 70+ feet in places. The northeast shore at Incline Village experiences the clearest water and least boat traffic of any developed Tahoe community. Summer water temperatures reach the low 60s for swimming." },
              { icon: '🏘️', title: 'Tight-Knit Exclusive Community', body: "With only ~9,000 year-round residents and limited developable land, Incline Village has a genuine small-community feel that larger resort markets can&apos;t replicate. The community knows itself. Property values are underpinned by a permanent scarcity of supply — no new land is being created on Lake Tahoe." },
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
            <h2>Neighborhoods Within Incline Village</h2>
            <p>From lakefront estates to mountain-view condos — every address in Incline Village comes with Nevada residency and private beach access.</p>
          </div>
          <div className="villages-grid">
            {[
              { name: 'Lakeshore Estates', type: 'Lakefront · Ultra-Luxury', desc: "The most coveted addresses in Incline Village — direct lakefront homes on the north shore of Lake Tahoe with private piers, boat docks, and unobstructed water views. Trophy properties that change hands rarely.", price: 'From $3M+' },
              { name: 'The Uplands', type: 'Mountain Views · Luxury', desc: "Elevated residential enclave above the community center offering panoramic views of Lake Tahoe and the Sierra Nevada. Custom homes on larger lots with privacy not available closer to the lake.", price: 'From $1.2M+' },
              { name: 'Tyner', type: 'Established · Family', desc: "A well-established neighborhood within walking distance of Diamond Peak and the IVGID recreational facilities. Mix of single-family homes and townhomes at slightly more accessible price points for Incline Village.", price: 'From $900K+' },
              { name: 'Ponderosa', type: 'Entry · Value', desc: "The most accessible neighborhood in Incline Village — condos and smaller single-family homes that provide full IVGID membership benefits (beach clubs, ski access, golf priority) at the lowest entry price point in the community.", price: 'From $800K+' },
              { name: 'Agate Bay', type: 'Lakefront · Exclusive', desc: "The western edge of Incline Village merging toward Crystal Bay. Lakefront and near-lakefront properties with some of the most dramatic Tahoe views available. Smaller lot sizes but unmatched proximity to the water.", price: 'From $1.5M+' },
              { name: 'Championship', type: 'Golf Course · Custom', desc: "Homes bordering the Championship Golf Course — the Robert Trent Jones Jr. design that winds through the community. Fairway and mountain views, mature pines, and a quieter setting than the lakefront neighborhoods.", price: 'From $1M+' },
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
              <img src={lifestyleImageUrl ? `${lifestyleImageUrl}?w=900&auto=format&q=85` : 'https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=900&h=600&q=80'} alt="Lake Tahoe crystal clear water from Incline Village Nevada" />
            </div>
            <div className="lifestyle-content">
              <span className="section-label">Year-Round Living</span>
              <div className="gold-rule" />
              <h2>Lake Tahoe, Diamond Peak, and Four Seasons of World-Class Recreation</h2>
              <p>Incline Village is one of the few places in North America where you can swim in a crystal-clear alpine lake in July and ski a legitimate mountain in February, all from the same address. The lifestyle here isn&apos;t aspirational — it&apos;s your actual Tuesday morning.</p>
              <p>Summers center on the private beaches — swimming, paddleboarding, kayaking, and sailing on North America&apos;s most famous alpine lake. Fall brings mountain biking on the Flume Trail above the community, which is widely regarded as one of the best singletrack rides in the Sierra Nevada. Winter is Diamond Peak, cross-country skiing at Spooner Lake, and the particular quiet of a snow-covered mountain community.</p>
              <div className="lifestyle-bullets">
                {[
                  'Private IVGID beach clubs — exclusive to Incline Village and Crystal Bay residents',
                  'Diamond Peak Ski Resort — 30 trails, family atmosphere, Lake Tahoe views on every run',
                  'Flume Trail mountain biking — world-class singletrack above the lake',
                  'Incline Village Golf Course — Robert Trent Jones Jr. Championship Course',
                  'Spooner Lake State Park — cross-country skiing and snowshoeing in winter',
                  '30 min to Truckee, CA — Amtrak, Palisades Tahoe, and additional dining/retail',
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
            <h2>Schools Serving Incline Village Families</h2>
            <p>Small-town Nevada public schools with strong community investment, plus proximity to Truckee and Reno options.</p>
          </div>
          <div className="schools-layout">
            <div className="school-group">
              <h3>Incline Village Public Schools (WCSD)</h3>
              {[
                ['Incline Elementary School', 'K–5'],
                ['Incline Middle School', '6–8'],
                ['Incline High School', '9–12'],
              ].map(([n, g]) => (
                <div className="school-item" key={n}>{n}<span className="school-grades">{g}</span></div>
              ))}
            </div>
            <div className="school-group">
              <h3>Nearby Private &amp; Alternative</h3>
              {[
                ['Lake Tahoe School (Truckee, CA)', 'K–8'],
                ['Sierra Nevada Academy (Charter)', 'K–8'],
                ['Sage Ridge School (Reno)', 'K–12'],
                ['Davidson Academy (Reno)', '6–12'],
              ].map(([n, g]) => (
                <div className="school-item" key={n}>{n}<span className="school-grades">{g}</span></div>
              ))}
            </div>
            <div className="school-group">
              <h3>Higher Education Nearby</h3>
              {[
                ['University of Nevada, Reno', '~35 min'],
                ['Sierra Nevada University (Kings Beach)', '~15 min'],
                ['Truckee Meadows Community College', '~40 min'],
              ].map(([n, g]) => (
                <div className="school-item" key={n}>{n}<span className="school-grades">{g}</span></div>
              ))}
              <div style={{ marginTop: '24px', padding: '18px', background: 'rgba(201,168,76,0.06)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', fontSize: '13px', color: 'var(--white-70)', lineHeight: '1.7' }}>
                <strong style={{ color: 'var(--white)' }}>Note:</strong> Incline Village public schools are small by design — Incline High typically has fewer than 400 students — giving students individual attention that larger suburban schools cannot provide.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <CommunityFAQ
        title="Incline Village Real Estate — Frequently Asked Questions"
        subtitle="Answers to the questions luxury buyers ask most when considering Nevada&apos;s premier Lake Tahoe address."
        faqs={[
          {
            q: "How much do Nevada taxes save me compared to owning on the California side of Tahoe?",
            a: "Nevada has no state income tax. California's top marginal rate is 13.3%. For a household with $500K in annual income, establishing Nevada residency at Incline Village saves approximately $50,000–$65,000 per year in state taxes alone — often exceeding the entire carrying cost of a second home. Many buyers in the $2M–$10M range find the tax savings essentially offset their mortgage payment within a few years."
          },
          {
            q: "What is the IVGID beach club and who gets access?",
            a: "IVGID (Incline Village General Improvement District) operates two private sandy beaches — Incline Beach and Burnt Cedar Beach — exclusively for Incline Village and Crystal Bay property owners and their guests. No public access is permitted. Residents receive beach passes through IVGID, which also manages Diamond Peak ski resort, the recreation center, tennis courts, golf courses, and other community amenities. IVGID membership is one of the primary drivers of property values in Incline Village."
          },
          {
            q: "How does Diamond Peak compare to other Lake Tahoe ski resorts?",
            a: "Diamond Peak is a smaller, family-oriented mountain compared to Heavenly, Palisades Tahoe, or Northstar — 655 acres, 30 trails, 1,840-foot vertical. What it lacks in terrain variety it makes up for in: no crowds (far less busy than South Shore resorts on weekends), direct access from residential neighborhoods (you can see the mountain from your driveway), and some of the best Lake Tahoe views from any ski resort. Residents with Diamond Peak season passes typically supplement with day trips to the larger resorts."
          },
          {
            q: "Is Incline Village a year-round community or seasonal?",
            a: "Primarily year-round, though the population swells significantly in summer (beach season) and winter (ski season). Year-round residents are a mix of remote workers, retirees, and business owners who have relocated from California metros. The community has full-year services — grocery, medical, restaurant, fitness — unlike more seasonal Tahoe communities that partially shut down between seasons."
          },
          {
            q: "What's driving Incline Village price appreciation?",
            a: "Three converging forces: (1) supply scarcity — Incline Village is built out with essentially no new developable land on Lake Tahoe; (2) California migration — remote work has enabled high-income California households to relocate to Nevada full-time, capturing tax savings while retaining their careers; (3) Lake Tahoe's long-term demand as a finite luxury resource. Prices have generally risen regardless of broader market cycles because the underlying supply constraint never changes."
          },
          {
            q: "What are the best streets for lake views in Incline Village?",
            a: "Lakeshore Boulevard and the surrounding Lakeshore Estates area provide direct lakefront access. For lake views without the lakefront premium, the elevated streets in The Uplands and along Tahoe Drive offer panoramic perspectives. Country Club Drive near the golf course provides mountain and partial lake views at lower price points. Our agents can walk you through the specific streets and their view corridors in detail — call 725.239.9950."
          },
        ]}
      />

      {/* CTA */}
      <section id="cta">
        <div className="container">
          <h2>Ready to Find Your Incline Village Property?</h2>
          <p>Nevada&apos;s most coveted Lake Tahoe address — private beaches, Diamond Peak, zero state income tax, and a finite supply of properties that rarely hit the market.</p>
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
