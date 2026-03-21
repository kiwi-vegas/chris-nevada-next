import CommunityFAQ from '@/components/CommunityFAQ'
import CommunityMapWrapper from '@/components/CommunityMapWrapper'
import Link from 'next/link'
import type { Metadata } from 'next'
import { getCommunityPage } from '@/sanity/queries'
import { mergeQuickStats, getSectionImage } from '@/lib/community-utils'
import { createImageUrlBuilder } from '@sanity/image-url'
import { client } from '@/sanity/client'

const urlFor = (source: any) => createImageUrlBuilder(client).image(source)

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const cms = await getCommunityPage('reno')
  return {
    title: cms?.metaTitle ?? 'Reno NV Homes For Sale | Nevada Real Estate Group',
    description: cms?.metaDescription ?? "Browse Reno, NV homes for sale. The Biggest Little City — tech industry growth, Midtown arts district, 45 min to Lake Tahoe. 1,200+ active listings from $300K to $3M+. Call 725.239.9950.",
  }
}

export default async function RenoPage() {
  const cms = await getCommunityPage('reno')

  const heroHeadline = cms?.heroHeadline ?? 'Reno, NV\nHomes For Sale'
  const heroSubheadline = cms?.heroSubheadline ?? "The Biggest Little City in the World — a dynamic Nevada city reinventing itself with tech industry growth, a thriving arts district, world-class skiing 45 minutes away, and a real estate market that still defies its quality."

  const HARDCODED_STATS: Array<[string, string] | [string, string, string]> = [
    ['County', 'Washoe'],
    ['Population', '~275,000'],
    ['University', 'UNR (21,000 students)'],
    ['Airport', 'RNO (Reno-Tahoe Intl)'],
    ['State Income Tax', 'None'],
    ['To Lake Tahoe', '~45 min'],
    ['To Bay Area', '~3.5 hrs'],
    ['Elevation', '4,505 ft'],
    ['Property Tax Rate', '~0.7%'],
    ['Median Home Price', '~$480,000'],
  ]
  const displayStats = mergeQuickStats(HARDCODED_STATS, cms?.quickStats)
  const lifestyleImage = getSectionImage(cms?.sectionImages, 'lifestyle')

  return (
    <main>
      <div className="breadcrumb">
        <div className="breadcrumb-inner">
          <Link href="/">Home</Link>
          <span className="breadcrumb-sep">›</span>
          <a href="/#communities">Communities</a>
          <span className="breadcrumb-sep">›</span>
          <span>Reno</span>
        </div>
      </div>

      {/* HERO */}
      <header id="hero" className="reno-hero">
        {cms?.heroImage && (
          <img
            src={urlFor(cms.heroImage).width(1920).url()}
            alt="Reno hero"
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }}
          />
        )}
        <div className="hero-bg" />
        <div className="hero-overlay" />
        <div className="hero-content summerlin">
          <div className="container">
            <p className="hero-eyebrow-sm">Reno, Nevada</p>
            <div className="hero-rule" />
            <h1>{heroHeadline.split('\n').map((line, i) => (
              <span key={i}>{line}{i < heroHeadline.split('\n').length - 1 && <br />}</span>
            ))}</h1>
            <p className="hero-sub">{heroSubheadline}</p>
            <div className="hero-stats">
              <div className="hero-stat"><span className="hero-stat-num">1,200+</span><span className="hero-stat-lbl">Active Listings</span></div>
              <div className="hero-stat"><span className="hero-stat-num">$300K–$3M+</span><span className="hero-stat-lbl">Price Range</span></div>
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
            <h2>Where is Reno?</h2>
            <p>Located in the Truckee Meadows of western Nevada — the Sierra Nevada to the west, high desert to the east, and Lake Tahoe just 45 minutes up the mountain.</p>
          </div>
          <div style={{ height: '420px', borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid var(--border)' }}>
            <CommunityMapWrapper
              center={[-119.813, 39.527]}
              zoom={11}
              boundary={[[-119.94,39.62],[-119.87,39.65],[-119.78,39.64],[-119.71,39.60],[-119.68,39.55],[-119.70,39.48],[-119.76,39.44],[-119.84,39.43],[-119.92,39.47],[-119.96,39.53],[-119.94,39.62]]}
              name="Reno"
              subtitle="Washoe County, Nevada"
              id="reno-map"
            />
          </div>
          <div className="drive-time-grid">
            {[
              ['~45 min', 'to Lake Tahoe', 'via US-395 S → NV-431'],
              ['~25 min', 'to Sparks', 'via I-80 E'],
              ['~30 min', 'to Truckee, CA', 'via I-80 W'],
              ['~5 min', 'to RNO Airport', 'via US-395 N'],
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
            <h2>New Reno Listings</h2>
            <p>The latest homes listed in Reno — houses, condos, and townhomes from Midtown bungalows to South Meadows new construction.</p>
          </div>
          <div className="ylopo-wrap">
            <div className="YLOPO_resultsWidget" data-search='{"propertyTypes":["house","condo","townhouse"],"minPrice":300000,"locations":[{"city":"Reno","state":"NV"}],"limit":12}'></div>
          </div>
          <p className="ylopo-note">Listing data sourced from regional MLS. Information deemed reliable but not guaranteed. Updated daily.</p>
          <div className="listings-actions">
            <a href="https://search.nevadarealestategroup.net/search?s[orderBy]=sourceCreationDate%2Cdesc&s[page]=1&s[locations][0][city]=Reno&s[locations][0][state]=NV" target="_blank" rel="noopener noreferrer" className="btn-gold">View All Reno Listings →</a>
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
              <h2>Reno: Nevada&apos;s Most Rapidly Transforming Metro</h2>
              <p>Reno is Nevada&apos;s second-largest city and one of the most rapidly transforming metros in the American West. Originally known for quick marriages, quickie divorces, and mid-tier casinos, modern Reno has reinvented itself around tech (Apple, Google, Tesla Gigafactory nearby in Storey County), the University of Nevada, a genuine arts and food scene in the Midtown district, and unmatched Sierra Nevada access.</p>
              <p>No state income tax. 45 minutes to Lake Tahoe and world-class ski resorts. The Truckee River runs through downtown. Median home price has risen steadily but still well below comparable California metros — which is exactly why buyers keep arriving from the Bay Area and Sacramento.</p>
              <p>For families, Reno offers UNR&apos;s university-city energy, strong public schools, and the kind of outdoor access — skiing, mountain biking, hiking, whitewater — that cities twice its size can&apos;t match. For investors, the tech-driven job growth and California migration wave have created durable rental demand in a market that still has room to run.</p>
              <p>The Midtown district along South Virginia Street has emerged as one of the most vibrant urban corridors in Nevada — independent restaurants, galleries, boutiques, and cocktail bars that would feel at home in Portland or Denver. This is not the Reno of 1995.</p>
            </div>
            <div className="overview-aside">
              <div className="quick-facts">
                <h3>Reno At a Glance</h3>
                {displayStats.map(([label, value, cls]) => (
                  <div className="fact-row" key={label}>
                    <span className="fact-label">{label}</span>
                    <span className={`fact-value${cls ? ' ' + cls : ''}`}>{value}</span>
                  </div>
                ))}
              </div>
              <div className="cta-card">
                <p>Ready to explore Reno? Let&apos;s schedule a private tour of the neighborhoods that match your goals.</p>
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
            <span className="section-label">Why Reno</span>
            <h2>The Reasons Buyers Keep Choosing Reno</h2>
            <p>Tech jobs, tax advantages, mountain access, and a real-city culture that outpaces its reputation. Here&apos;s what drives demand.</p>
          </div>
          <div className="highlights-grid">
            {[
              { icon: '💻', title: 'Tech Industry Transformation', body: "Apple, Google, and Tesla (Gigafactory in adjacent Storey County) have collectively remade Reno's employment base. The Switch data center campus and a growing ecosystem of logistics and manufacturing firms have diversified the economy far beyond its casino roots." },
              { icon: '⛷️', title: 'World-Class Skiing, 45 Minutes Away', body: "Mt. Rose Ski Tahoe sits 45 minutes from downtown Reno. Lake Tahoe's full complement of resorts — Heavenly, Northstar, Squaw Valley Alpine Meadows — are within 90 minutes. No other major Nevada city can match this access." },
              { icon: '🏛️', title: 'University of Nevada, Reno', body: "UNR brings 21,000 students and the energy of a university city to Reno's northwest side. The Mackay School of Earth Sciences, medical school, and engineering programs attract research funding and skilled graduates who tend to stay." },
              { icon: '🎨', title: 'Midtown Arts & Food Scene', body: "South Virginia Street&apos;s Midtown district has become one of the most vibrant urban corridors in Nevada — independent restaurants, cocktail bars, galleries, and boutiques. The National Automobile Museum and Nevada Museum of Art anchor a genuine cultural calendar." },
              { icon: '🌊', title: 'Truckee River Corridor', body: "The Truckee River cuts through downtown Reno, feeding a riverside park system, kayaking runs, and the WhiteWater Park. The river continues west toward Lake Tahoe, creating a natural greenbelt through the urban core." },
              { icon: '💰', title: 'No State Income Tax', body: "Nevada has no personal income tax — a benefit worth 5–13% of income annually for California transplants. Combined with housing prices that still undercut Bay Area comps by 50–70%, Reno&apos;s value proposition is unusually strong." },
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
            <h2>Find Your Neighborhood in Reno</h2>
            <p>From walkable Midtown bungalows to master-planned South Meadows estates — Reno has a neighborhood for every lifestyle and price point.</p>
          </div>
          <div className="villages-grid">
            {[
              { name: 'Midtown', type: 'Urban · Walkable · Arts', desc: "Reno&apos;s hippest district — a walkable stretch of South Virginia Street with independent restaurants, bars, galleries, and a mix of bungalows, craftsmans, and condos. The closest thing to a true urban neighborhood in Northern Nevada.", price: 'From $450K' },
              { name: 'South Meadows', type: 'Master-Planned · Newer Construction', desc: "A high-growth corridor in south Reno anchored by major retail, newer schools, and well-maintained master-planned subdivisions. Popular with families relocating from California for its clean streets and strong school zoning.", price: 'From $500K' },
              { name: 'Northwest Reno', type: 'Established · Family', desc: "The foothills above UNR extending toward Caughlin Ranch and Somersett. Mature neighborhoods, strong schools, proximity to the university, and the kind of established community that&apos;s hard to replicate in newer areas.", price: 'From $550K' },
              { name: 'Old Southwest', type: 'Historic · Character Homes', desc: "Reno&apos;s most historic residential district — craftsmans, tudors, and mid-century ranches on tree-lined streets within walking distance of UNR and the Truckee River. Strong renovation potential throughout.", price: 'From $400K' },
              { name: 'Caughlin Ranch', type: 'Guard-Gated · Views', desc: "A guard-gated community in the northwest foothills offering sweeping valley views, mature landscaping, and proximity to Caughlin Club. One of Reno&apos;s most consistently desirable addresses.", price: 'From $600K' },
              { name: 'Damonte Ranch', type: 'South Reno · New Construction', desc: "A newer master-planned community at the southern edge of Reno with contemporary homes, parks, and easy freeway access. Popular with tech workers and young families seeking move-in-ready construction.", price: 'From $550K' },
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
              <img src={lifestyleImage ? urlFor(lifestyleImage).width(900).url() : 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=900&h=600&q=80'} alt="Sierra Nevada mountains near Reno, Nevada" />
            </div>
            <div className="lifestyle-content">
              <span className="section-label">Outdoor Living</span>
              <div className="gold-rule" />
              <h2>Sierra Nevada Skiing, Truckee River Whitewater, and 300 Days of Sun</h2>
              <p>Reno&apos;s outdoor lifestyle is genuinely exceptional for a city its size. The Sierra Nevada rises immediately to the west, putting world-class skiing, mountain biking, and hiking within a 45-minute drive of most Reno addresses.</p>
              <p>The Truckee River WhiteWater Park — a series of engineered whitewater features in downtown Reno — draws kayakers and stand-up paddleboarders year-round. Pyramid Lake, a stunning saline lake on the Paiute Reservation, sits 35 miles northeast and offers trophy fishing and dramatic desert landscapes.</p>
              <div className="lifestyle-bullets">
                {[
                  'Mt. Rose Ski Tahoe — 45 min from downtown, 1,200+ skiable acres',
                  'Lake Tahoe — 45 min to the clearest alpine lake in North America',
                  'Truckee River WhiteWater Park — downtown kayaking and paddleboarding',
                  'Pyramid Lake — trophy fishing and dramatic desert scenery, 35 min north',
                  'Black Rock Desert — Burning Man site and otherworldly playa drives, 2 hrs north',
                  'Tahoe Rim Trail — 165-mile circumnavigation of Lake Tahoe accessible from Reno',
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
            <h2>Schools Serving Reno Families</h2>
            <p>From nationally recognized Davidson Academy to strong Washoe County public schools and the University of Nevada.</p>
          </div>
          <div className="schools-layout">
            <div className="school-group">
              <h3>Public High Schools (WCSD)</h3>
              {[
                ['Reno High School', '9–12'],
                ['McQueen High School', '9–12'],
                ['Wooster High School', '9–12'],
                ['Galena High School', '9–12'],
                ['Spanish Springs High School', '9–12'],
                ['Multiple WCSD Middle & Elementary', 'K–8'],
              ].map(([n, g]) => (
                <div className="school-item" key={n}>{n}<span className="school-grades">{g}</span></div>
              ))}
            </div>
            <div className="school-group">
              <h3>Private &amp; Charter</h3>
              {[
                ['Davidson Academy', '6–12'],
                ['Sage Ridge School', 'K–12'],
                ['Bishop Manogue Catholic HS', '9–12'],
                ['Coral Academy of Science', 'K–12'],
                ['Rainshadow Community Charter', '9–12'],
              ].map(([n, g]) => (
                <div className="school-item" key={n}>{n}<span className="school-grades">{g}</span></div>
              ))}
            </div>
            <div className="school-group">
              <h3>Higher Education</h3>
              {[
                ['University of Nevada, Reno', 'University'],
                ['Truckee Meadows Community College', 'Community College'],
                ['Western Nevada College', 'Community College'],
              ].map(([n, g]) => (
                <div className="school-item" key={n}>{n}<span className="school-grades">{g}</span></div>
              ))}
              <div style={{ marginTop: '24px', padding: '18px', background: 'rgba(201,168,76,0.06)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', fontSize: '13px', color: 'var(--white-70)', lineHeight: '1.7' }}>
                <strong style={{ color: 'var(--white)' }}>School Assignment Note:</strong> Zoning varies by neighborhood and address within Reno. Always confirm your specific assignment with Washoe County School District before purchasing.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <CommunityFAQ
        title="Reno Real Estate — Frequently Asked Questions"
        subtitle="Answers to the questions buyers ask most when considering a move to the Biggest Little City."
        faqs={[
          {
            q: "How does Reno real estate compare to Las Vegas?",
            a: "Reno and Las Vegas serve different buyer profiles. Reno attracts more tech workers, outdoor enthusiasts, and California Bay Area/Sacramento transplants. Prices are comparable — Reno's median is around $480K vs Las Vegas at $420K — but Reno offers Sierra Nevada access, a university-city atmosphere, and a smaller metro scale. Las Vegas has more entertainment infrastructure and a larger inventory. Both have no state income tax."
          },
          {
            q: "Why are so many Californians moving to Reno?",
            a: "The math is straightforward: no state income tax (saves 5–13.3% annually), housing at 50–70% of Bay Area prices, a reasonable 3.5-hour drive back to the Bay if needed, and genuine lifestyle quality — skiing, outdoor recreation, a growing food and arts scene. Tech companies including Apple and Google have Reno operations, so remote workers can often maintain their tech salaries while dramatically lowering their cost of living."
          },
          {
            q: "Which Reno neighborhoods are best for families?",
            a: "South Meadows and Damonte Ranch in south Reno offer the newest construction, strong schools, and master-planned amenities most comparable to what California families are accustomed to. Northwest Reno and Caughlin Ranch offer more established neighborhoods with mature trees and slightly higher price points. Old Southwest has character but older infrastructure — better for buyers who value walkability and history over polish."
          },
          {
            q: "How far is Reno from ski resorts?",
            a: "Mt. Rose Ski Tahoe is approximately 45 minutes from downtown Reno and is the closest major resort. Lake Tahoe's full complement of resorts — Heavenly, Northstar, Palisades Tahoe (formerly Squaw Valley) — are 60–90 minutes away. Many Reno residents have season passes and ski 30+ days per year, a lifestyle that's essentially impossible from Las Vegas or most California metros at anything like Reno's price points."
          },
          {
            q: "Is the Reno tech job market real or overhyped?",
            a: "The transformation is real and documented. Apple operates a 1-million-square-foot data center campus in Reno. Google has a data center in Fernley. The Tesla Gigafactory in adjacent Storey County employs thousands and has seeded an entire supplier ecosystem. Switch, one of the nation's largest data center operators, has a major Reno campus. The University of Nevada produces a pipeline of engineering and computer science graduates. This is not casino-dependent employment."
          },
          {
            q: "What are Reno home prices doing?",
            a: "Reno home prices rose sharply from 2019–2022 driven by California migration and low inventory, then moderated in 2023 with rising rates. The median has stabilized around $480K. Demand remains strong from tech employment and ongoing California in-migration. Inventory is improving but still below historical norms. Buyers who move quickly on well-priced homes in desirable neighborhoods still face competition. The long-term fundamentals — job growth, tax advantages, population growth — remain intact."
          },
        ]}
      />

      {/* CTA */}
      <section id="cta">
        <div className="container">
          <h2>Ready to Find Your Reno Home?</h2>
          <p>The Biggest Little City has reinvented itself — tech jobs, world-class skiing, no state income tax, and a real estate market that still defies its quality.</p>
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
