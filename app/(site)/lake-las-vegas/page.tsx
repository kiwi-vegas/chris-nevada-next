import CommunityFAQ from '@/components/CommunityFAQ'
import CommunityMapWrapper from '@/components/CommunityMapWrapper'
import Link from 'next/link'
import type { Metadata } from 'next'
import { getCommunityPage } from '@/sanity/queries'
import { mergeQuickStats, mergeDriveTimes, getSectionImageUrl } from '@/lib/community-utils'

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const cms = await getCommunityPage('lake-las-vegas')
  return {
    title: cms?.metaTitle ?? 'Lake Las Vegas Homes For Sale | Nevada Real Estate Group',
    description: cms?.metaDescription ?? "Browse homes for sale in Lake Las Vegas, Henderson — Nevada's largest private lake, Mediterranean architecture, two Jack Nicklaus golf courses, and resort living 30 minutes from the Strip. Homes from $600K. Call 725.239.9950.",
  }
}

export default async function LakeLasVegasPage() {
  const cms = await getCommunityPage('lake-las-vegas')

  const heroHeadline = cms?.heroHeadline ?? 'Lake Las Vegas\nHomes For Sale'
  const heroSubheadline = cms?.heroSubheadline ?? "320 acres of man-made water in the Nevada desert — Mediterranean-inspired architecture, lakefront dining, two Jack Nicklaus-designed golf courses, and resort living 30 minutes from the Strip."

  const HARDCODED_STATS: Array<[string, string] | [string, string, string]> = [
    ['Location', 'NE Henderson, NV'],
    ['Lake', '320 acres (largest private lake in NV)'],
    ['Golf', '2 Jack Nicklaus designs'],
    ['Resort Hotels', 'Westin + Hilton'],
    ['Min Price', '$600K', 'gold'],
    ['Architecture', 'Mediterranean / Tuscan'],
    ['Lake Mead NRA', '~10 min'],
    ['Distance to Strip', '~30 min'],
    ['Distance to Airport', '~25 min'],
    ['State Income Tax', 'None'],
    ['Property Tax Rate', '~0.6%'],
  ]
  const displayStats = mergeQuickStats(HARDCODED_STATS, cms?.quickStats)
  const HARDCODED_DRIVE_TIMES = [
    { time: '~30 min', destination: 'to the Strip', route: 'via Lake Mead Pkwy → I-515' },
    { time: '~10 min', destination: 'to Lake Mead NRA', route: 'via Lake Mead Dr E' },
    { time: '~25 min', destination: 'to Harry Reid Airport', route: 'via Lake Mead Pkwy → I-215' },
    { time: '~30 min', destination: 'to Downtown Henderson', route: 'via Lake Mead Pkwy W' },
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
          <span className="breadcrumb-sep">›</span>
          <a href="/#communities">Communities</a>
          <span className="breadcrumb-sep">›</span>
          <span>Lake Las Vegas</span>
        </div>
      </div>

      {/* HERO */}
      <header id="hero" className="lake-las-vegas-hero">
        {cms?.heroImageUrl
          ? <img src={`${cms.heroImageUrl}?w=1920&auto=format&q=85`} alt="Lake Las Vegas hero" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
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
              <div className="hero-stat"><span className="hero-stat-num">{qs('Active Listings', '150+')}</span><span className="hero-stat-lbl">Active Listings</span></div>
              <div className="hero-stat"><span className="hero-stat-num">{qs('Price Range', '$600K–$8M+')}</span><span className="hero-stat-lbl">Price Range</span></div>
              <div className="hero-stat"><span className="hero-stat-num">{qs('Property Types', '3')}</span><span className="hero-stat-lbl">Property Types</span></div>
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
            <h2>Where is Lake Las Vegas?</h2>
            <p>Located in northeastern Henderson — tucked between the McCullough Range and Lake Mead, approximately 30 minutes from the Strip.</p>
          </div>
          <div style={{ height: '420px', borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid var(--border)' }}>
            <CommunityMapWrapper
              center={[-114.935, 36.068]}
              zoom={13}
              boundary={[[-114.97,36.09],[-114.93,36.09],[-114.90,36.08],[-114.89,36.06],[-114.90,36.04],[-114.93,36.03],[-114.97,36.04],[-114.99,36.06],[-114.98,36.08],[-114.97,36.09]]}
              name="Lake Las Vegas"
              subtitle="Henderson, Nevada"
              id="lake-las-vegas-map"
            />
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
            <span className="section-label">New Listings · Updated Daily</span>
            <h2>New Lake Las Vegas Listings</h2>
            <p>The latest homes listed at Lake Las Vegas — lakefront villas, Mediterranean estates, and resort residences from $600K.</p>
          </div>
          <div className="ylopo-wrap">
            <div className="YLOPO_resultsWidget" data-search='{"propertyTypes":["house","condo","townhouse"],"minPrice":600000,"locations":[{"community":"Lake Las Vegas","city":"Henderson","state":"NV"}],"limit":12}'></div>
          </div>
          <p className="ylopo-note">Listing data sourced from regional MLS. Information deemed reliable but not guaranteed. Updated daily.</p>
          <div className="listings-actions">
            <a href="https://search.nevadarealestategroup.net/search?s[orderBy]=sourceCreationDate%2Cdesc&s[page]=1&s[locations][0][community]=Lake+Las+Vegas&s[locations][0][city]=Henderson&s[locations][0][state]=NV" target="_blank" rel="noopener noreferrer" className="btn-gold">View All Lake Las Vegas Listings →</a>
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
              <h2>Lake Las Vegas: Nevada&apos;s Most Distinctive Resort Community</h2>
              <p>Lake Las Vegas is unlike any other community in the valley. At its center is a 320-acre man-made lake — the largest private lake in Nevada — created in the late 1990s as the anchor for a resort community that was designed to feel like a Mediterranean village dropped into the desert. The concept sounds almost absurd on paper, but the execution is genuinely impressive in person.</p>
              <p>The Westin Lake Las Vegas Resort and the Hilton Lake Las Vegas ring the water. The Village at Lake Las Vegas offers lakefront dining, boutiques, and a promenade that feels entirely removed from the standard Las Vegas suburban experience. In the evening, when the hotels are lit and the water is calm, the setting has a quality that photographs don&apos;t quite capture.</p>
              <p>Two Jack Nicklaus-designed courses anchor the recreational side: Reflection Bay — a Golf Digest top-100 public course that runs along the lakeshore — and South Shore, the private members course. Golf at Reflection Bay is among the most visually dramatic public-access rounds available in the Southwest.</p>
              <p>Architecture throughout leans toward Tuscan and Spanish Colonial: pitched tile roofs, stucco facades, wrought iron details. The design standards are enforced consistently, which gives the community a visual coherence that more eclectic neighborhoods don&apos;t have. For buyers seeking genuine resort living as a primary residence — not a vacation property, but an actual home — Lake Las Vegas remains the valley&apos;s most distinctive option.</p>
            </div>
            <div className="overview-aside">
              <div className="quick-facts">
                <h3>Lake Las Vegas At a Glance</h3>
                {displayStats.map(([label, value, cls]) => (
                  <div className="fact-row" key={label}>
                    <span className="fact-label">{label}</span>
                    <span className={`fact-value${cls ? ' ' + cls : ''}`}>{value}</span>
                  </div>
                ))}
              </div>
              <div className="cta-card">
                <p>Ready to explore Lake Las Vegas? Let&apos;s schedule a private tour of the community and the listings that match your goals.</p>
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
            <span className="section-label">Why Lake Las Vegas</span>
            <h2>What Makes Lake Las Vegas Unlike Any Other Nevada Community</h2>
            <p>A 320-acre private lake, resort hotels, world-class golf, and Mediterranean architecture — here&apos;s what defines the Lake Las Vegas lifestyle.</p>
          </div>
          <div className="highlights-grid">
            {[
              { icon: '🌊', title: '320-Acre Private Lake', body: "Nevada's largest private lake — 320 acres of open water surrounded by Mediterranean-inspired architecture and resort hotels. The lake is the organizing principle of the entire community, and every neighborhood is oriented toward it." },
              { icon: '🍽️', title: 'Lakefront Dining & Village', body: "The Village at Lake Las Vegas offers lakefront restaurants, boutiques, and a waterfront promenade. Dining with a view of the water and the Westin and Hilton properties lit in the evening background — it's a setting that feels more European resort than Nevada suburb." },
              { icon: '⛳', title: 'Reflection Bay Golf — Golf Digest Top 100', body: "Reflection Bay Golf Club is a Jack Nicklaus-designed public course ranked in Golf Digest's top 100 — one of the most visually stunning rounds available in the Southwest. The course runs along the lakeshore with water views on multiple holes." },
              { icon: '🏨', title: 'Resort Hotel Amenities', body: "The Westin Lake Las Vegas Resort & Spa and the Hilton Lake Las Vegas are within the community — meaning residents have immediate access to world-class spa services, resort pools, hotel dining, and fitness facilities without leaving the neighborhood." },
              { icon: '🏛️', title: 'Mediterranean Architecture Standards', body: "Design standards throughout Lake Las Vegas enforce a cohesive Mediterranean/Tuscan aesthetic: tile roofs, stucco, wrought iron, and warm earth tones. The visual consistency is enforced by HOA design guidelines and is a significant contributor to property value stability." },
              { icon: '🏞️', title: 'Lake Mead National Recreation Area', body: "Lake Mead — the largest reservoir in the United States — is approximately 10 minutes from Lake Las Vegas. Boating, kayaking, hiking, and camping access adds to a recreational lifestyle that few resort communities in the country can match." },
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
            <h2>Communities Within Lake Las Vegas</h2>
            <p>From lakefront estate sections to resort-adjacent residences — Lake Las Vegas has a range of product types and positions within the community.</p>
          </div>
          <div className="villages-grid">
            {[
              { name: 'Via Contessa', type: 'Lakefront · Ultra-Premium', desc: 'Among the most exclusive addresses in Lake Las Vegas — directly on the water with private dock access. Larger custom homes with unobstructed lake views and resort hotel proximity.', price: 'From $1.5M' },
              { name: 'MonteLago Village', type: 'Resort-Adjacent · Walkable', desc: 'The most walkable section of Lake Las Vegas — directly adjacent to the Village at Lake Las Vegas, the restaurants, and the lakefront promenade. Attached and smaller single-family options.', price: 'From $700K' },
              { name: 'Coventry', type: 'Single-Family · Established', desc: 'One of the larger single-family neighborhoods within Lake Las Vegas. Good lake views from upper positions, established landscaping, and a range of floor plans.', price: 'From $800K' },
              { name: 'Bella Terra', type: 'Entry · Community Feel', desc: "Lake Las Vegas's most accessible entry point — single-family homes with community amenities and the full Lake Las Vegas lifestyle at a more attainable price.", price: 'From $600K' },
              { name: 'Shores', type: 'Golf & Lake Views', desc: 'Positioned to capture both lake and golf course views. Popular with golf-focused buyers who want the Reflection Bay course on one side and the lake on the other.', price: 'From $900K' },
              { name: 'The Reserve', type: 'Premium · Private', desc: 'One of the more exclusive residential enclaves within Lake Las Vegas. Larger parcels, premium finishes, and the community&apos;s best combination of privacy and view quality.', price: 'From $1.2M' },
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
              <img src={lifestyleImageUrl ? `${lifestyleImageUrl}?w=900&auto=format&q=85` : 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=900&h=600&q=80'} alt="Lake Las Vegas waterfront resort community in Henderson Nevada" />
            </div>
            <div className="lifestyle-content">
              <span className="section-label">Resort Living</span>
              <div className="gold-rule" />
              <h2>A Mediterranean Village in the Nevada Desert</h2>
              <p>The Lake Las Vegas lifestyle is organized around water, golf, and a resort experience that doesn&apos;t require leaving the neighborhood. The 320-acre lake anchors everything — from morning kayaking to evening dinners on the Village waterfront to weekend golf on Reflection Bay.</p>
              <p>The proximity to Lake Mead National Recreation Area extends the outdoor recreation footprint dramatically — boating, hiking, and camping at the largest reservoir in the country is 10 minutes away. Combined with the resort amenities on-site, Lake Las Vegas offers a recreational lifestyle that few primary residence communities anywhere in the country can match at this price point.</p>
              <div className="lifestyle-bullets">
                {[
                  '320-acre man-made lake — Nevada\'s largest private lake — kayaking, paddle boarding, fishing',
                  'Reflection Bay Golf Club — Jack Nicklaus design, Golf Digest top-100, lakeside play',
                  'South Shore Golf Club — private Jack Nicklaus members course',
                  'Westin Lake Las Vegas Resort & Spa — spa, pools, dining within the community',
                  'Village at Lake Las Vegas — lakefront restaurants, boutiques, waterfront promenade',
                  'Lake Mead National Recreation Area — ~10 min, boating and 1.5M acres of outdoor recreation',
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
            <h2>Schools Serving Lake Las Vegas Families</h2>
            <p>Lake Las Vegas is zoned to CCSD schools in the northeastern Henderson area, with private options available in the broader Henderson market.</p>
          </div>
          <div className="schools-layout">
            <div className="school-group">
              <h3>Public Schools (CCSD)</h3>
              {[
                ['John C. Vanderburg Elementary', 'K–5'],
                ['Del E. Webb Middle School', '6–8'],
                ['Liberty High School', '9–12'],
                ['Multiple CCSD Elementary Options', 'K–5'],
              ].map(([n, g]) => (
                <div className="school-item" key={n}>{n}<span className="school-grades">{g}</span></div>
              ))}
            </div>
            <div className="school-group">
              <h3>Private &amp; Charter Nearby</h3>
              {[
                ['Pinecrest Academy of Nevada', 'PreK–12'],
                ['Henderson International School', 'PreK–8'],
                ['Alexander Dawson School', 'K–8'],
                ['Desert Christian Academy', 'K–12'],
              ].map(([n, g]) => (
                <div className="school-item" key={n}>{n}<span className="school-grades">{g}</span></div>
              ))}
            </div>
            <div className="school-group">
              <h3>Charter &amp; Magnet</h3>
              {[
                ['STEM Academy at Pinecrest', '6–8'],
                ['Nevada State High School', '11–12'],
                ['Charter School Options', 'Various'],
              ].map(([n, g]) => (
                <div className="school-item" key={n}>{n}<span className="school-grades">{g}</span></div>
              ))}
              <div style={{ marginTop: '24px', padding: '18px', background: 'rgba(201,168,76,0.06)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', fontSize: '13px', color: 'var(--white-70)', lineHeight: '1.7' }}>
                <strong style={{ color: 'var(--white)' }}>School Assignment Note:</strong> Zoning varies by address. Always confirm your specific school assignment with CCSD before purchasing.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <CommunityFAQ
        title="Lake Las Vegas — Common Questions"
        subtitle="Answers to what buyers most often ask about Lake Las Vegas in Henderson."
        faqs={[
          {
            q: "How does Lake Las Vegas compare to Henderson Anthem?",
            a: "They serve quite different buyer profiles. Anthem is a large traditional master-planned community with guard-gated neighborhoods, strong schools, and a community center — ideal for families prioritizing school quality and a suburban lifestyle. Lake Las Vegas is a resort-oriented community built around a 320-acre lake and two Jack Nicklaus golf courses — ideal for buyers prioritizing a resort lifestyle, unique architecture, and a setting that's genuinely unlike anything else in the valley. Lake Las Vegas tends to attract more second-home buyers and primary residents who prioritize lifestyle over proximity to employment."
          },
          {
            q: "Is golf membership required at Lake Las Vegas?",
            a: "No — Reflection Bay Golf Club is a public-access course, meaning you can play it without a membership. South Shore Golf Club is a private members course. Neither is required as a condition of purchasing a home within Lake Las Vegas. HOA fees cover community maintenance and common area amenities but do not include golf membership."
          },
          {
            q: "Is Lake Las Vegas better as a primary residence or vacation home?",
            a: "Lake Las Vegas works well as both, and the community has a significant mix of primary and second-home residents. As a primary residence it offers a resort lifestyle at a value that comparable lake-and-golf communities in other markets can't match. As a vacation home or lock-and-leave property, the resort hotels and managed community provide security and amenity access even during absence. The choice depends on your lifestyle priorities — both uses are well-supported by the community's infrastructure."
          },
          {
            q: "What are the HOA fees at Lake Las Vegas?",
            a: "HOA fees at Lake Las Vegas vary by sub-community and property type, but generally range from $150–$400+ per month. The master HOA covers the lakefront promenade, common areas, and community maintenance. Sub-neighborhood associations may have additional fees. The resort-quality environment requires more maintenance than a standard residential HOA, which is reflected in the fee structure."
          },
          {
            q: "How close is Lake Las Vegas to Lake Mead?",
            a: "Lake Mead National Recreation Area is approximately 10 minutes from Lake Las Vegas via Lake Mead Drive East. This proximity is one of the community's most significant lifestyle advantages — the largest reservoir in the United States is effectively in your backyard, offering boating, kayaking, fishing, hiking, and camping access that few Nevada communities can claim."
          },
          {
            q: "Has Lake Las Vegas appreciated in value?",
            a: "Lake Las Vegas went through significant distress during the 2008–2012 downturn after the original developer filed for bankruptcy. The community has recovered strongly since then, with values appreciating substantially through the 2020–2023 cycle. The unique character of the community — there is nothing else quite like it in the Las Vegas Valley — creates a degree of scarcity that has supported price recovery and long-term value stability. As always with luxury real estate, specific location, views, and condition matter significantly."
          },
        ]}
      />

      {/* CTA */}
      <section id="cta">
        <div className="container">
          <h2>Ready to Find Your Lake Las Vegas Home?</h2>
          <p>Nevada&apos;s most distinctive resort community — 320 acres of private lake, Jack Nicklaus golf, Mediterranean architecture, and a lifestyle that doesn&apos;t exist anywhere else in the valley.</p>
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
