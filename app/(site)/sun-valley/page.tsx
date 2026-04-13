import CommunityFAQ from '@/components/CommunityFAQ'
import CommunityMapWrapper from '@/components/CommunityMapWrapper'
import Link from 'next/link'
import type { Metadata } from 'next'
import { getCommunityPage } from '@/sanity/queries'
import { mergeQuickStats, mergeDriveTimes, getSectionImageUrl } from '@/lib/community-utils'

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const cms = await getCommunityPage('sun-valley')
  return {
    title: cms?.metaTitle ?? 'Sun Valley NV Homes For Sale | Nevada Real Estate Group',
    alternates: { canonical: 'https://www.lasvegashomesearchexperts.com/sun-valley' },
    description: cms?.metaDescription ?? "Browse Sun Valley, NV homes for sale. Reno metro's most affordable established community — entry-level pricing, strong rental demand, US-395 access. 300+ listings from $250K. Call 725.239.9950.",
  }
}

export default async function SunValleyPage() {
  const cms = await getCommunityPage('sun-valley')

  const heroHeadline = cms?.heroHeadline ?? 'Sun Valley, NV\nHomes For Sale'
  const heroSubheadline = cms?.heroSubheadline ?? "The Reno metro's most affordable established community — a no-frills, unincorporated neighborhood north of Reno with quick freeway access, growing investment interest, and some of the valley's best entry-level price points."

  const HARDCODED_STATS: Array<[string, string] | [string, string, string]> = [
    ['Area', 'N. Washoe County (uninc.)'],
    ['To Reno', '~15 min'],
    ['Entry Price', 'From ~$250K'],
    ['Best for', 'First-time buyers, investors'],
    ['State Income Tax', 'None'],
    ['Regional Park', 'Sun Valley Regional Park'],
    ['To Pyramid Lake', '~20 min'],
    ['School District', 'Washoe County SD'],
    ['Property Tax Rate', '~0.7%'],
    ['Market Character', 'Value · Investment-friendly'],
  ]
  const displayStats = mergeQuickStats(HARDCODED_STATS, cms?.quickStats)
  const HARDCODED_DRIVE_TIMES = [
    { time: '~15 min', destination: 'to Downtown Reno', route: 'via US-395 S' },
    { time: '~20 min', destination: 'to Sparks', route: 'via US-395 S → I-80 E' },
    { time: '~20 min', destination: 'to Pyramid Lake', route: 'via Pyramid Hwy N' },
    { time: '~55 min', destination: 'to Lake Tahoe', route: 'via US-395 S → NV-431' },
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
          <span>Sun Valley</span>
        </div>
      </div>

      {/* HERO */}
      <header id="hero" className="sun-valley-hero">
        {cms?.heroImageUrl
          ? <img src={`${cms.heroImageUrl}?w=1920&auto=format&q=85`} alt="Sun Valley hero" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
          : <div className="hero-bg" />
        }
        <div className="hero-overlay" />
        <div className="hero-content summerlin">
          <div className="container">
            <p className="hero-eyebrow-sm">Sun Valley, Nevada</p>
            <div className="hero-rule" />
            <h1>{heroHeadline.split('\n').map((line, i) => (
              <span key={i}>{line}{i < heroHeadline.split('\n').length - 1 && <br />}</span>
            ))}</h1>
            <p className="hero-sub">{heroSubheadline}</p>
            <div className="hero-stats">
              <div className="hero-stat"><span className="hero-stat-num">{qs('Active Listings', '300+')}</span><span className="hero-stat-lbl">Active Listings</span></div>
              <div className="hero-stat"><span className="hero-stat-num">{qs('Price Range', '$250K–$700K+')}</span><span className="hero-stat-lbl">Price Range</span></div>
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
            <h2>Where is Sun Valley?</h2>
            <p>Located directly north of Reno along the US-395 corridor — unincorporated Washoe County with quick freeway access to Reno employment and services.</p>
          </div>
          <div style={{ height: '420px', borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid var(--border)' }}>
            <CommunityMapWrapper
              center={[-119.779, 39.598]}
              zoom={12}
              boundary={[[-119.82,39.63],[-119.78,39.64],[-119.74,39.63],[-119.72,39.61],[-119.73,39.57],[-119.77,39.56],[-119.82,39.57],[-119.84,39.60],[-119.82,39.63]]}
              name="Sun Valley"
              subtitle="Washoe County, Nevada"
              id="sun-valley-map"
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
            <h2>New Sun Valley Listings</h2>
            <p>The latest homes listed in Sun Valley — entry-level single-family homes, investment properties, and affordable condos and townhomes north of Reno.</p>
          </div>
          <div className="ylopo-wrap">
            <div className="YLOPO_resultsWidget" data-search='{"propertyTypes":["house","condo","townhouse"],"minPrice":250000,"locations":[{"city":"Sun Valley","state":"NV"}],"limit":12}'></div>
          </div>
          <p className="ylopo-note">Listing data sourced from regional MLS. Information deemed reliable but not guaranteed. Updated daily.</p>
          <div className="listings-actions">
            <a href="https://search.nevadarealestategroup.net/search?s[orderBy]=sourceCreationDate%2Cdesc&s[page]=1&s[locations][0][city]=Sun+Valley&s[locations][0][state]=NV" target="_blank" rel="noopener noreferrer" className="btn-gold">View All Sun Valley Listings →</a>
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
              <h2>Sun Valley: The Reno Metro&apos;s Most Accessible Entry Point</h2>
              <p>Sun Valley is an unincorporated community in Washoe County sitting just north of Reno proper along US-395. It has long served as the metro&apos;s most accessible entry point for first-time buyers and investors, with price points well below the Reno median. The area has seen growing interest from investors attracted by high rental demand from workers in nearby logistics and light industrial corridors.</p>
              <p>Access to downtown Reno is straightforward via US-395 — 15 minutes without highway traffic headaches. While Sun Valley lacks the master-planned polish of Spanish Springs or South Meadows, its fundamentals — affordable prices, Nevada tax advantages, proximity to employment, and improving infrastructure — make it a consistent performer for investment-minded buyers.</p>
              <p>Washoe County has invested meaningfully in the area&apos;s park system, and the Sun Valley Regional Park is a genuine community anchor with sports fields, walking trails, and recreational amenities that serve the entire north Reno corridor. The community also benefits from proximity to Pyramid Lake — one of Nevada&apos;s most spectacular natural features — just 20 minutes north via Pyramid Highway.</p>
              <p>For first-time buyers who have been priced out of Reno proper or California entirely, Sun Valley represents the clearest path to Nevada homeownership with genuine upside as the metro continues to grow northward.</p>
            </div>
            <div className="overview-aside">
              <div className="quick-facts">
                <h3>Sun Valley At a Glance</h3>
                {displayStats.map(([label, value, cls]) => (
                  <div className="fact-row" key={label}>
                    <span className="fact-label">{label}</span>
                    <span className={`fact-value${cls ? ' ' + cls : ''}`}>{value}</span>
                  </div>
                ))}
              </div>
              <div className="cta-card">
                <p>Looking for the best value in the Reno metro? Let&apos;s walk through Sun Valley&apos;s current listings and investment opportunities.</p>
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
            <span className="section-label">Why Sun Valley</span>
            <h2>What Makes Sun Valley a Smart Buy in the Reno Metro</h2>
            <p>Lowest entry price, strong rental demand, Nevada tax advantages, and a location that benefits from Reno&apos;s ongoing growth. Here&apos;s the case.</p>
          </div>
          <div className="highlights-grid">
            {[
              { icon: '💵', title: "Reno Metro's Lowest Entry Price", body: "Sun Valley consistently offers the lowest price-per-square-foot of any established community in the Reno-Sparks metro. Buyers who cannot qualify for Reno proper prices, or investors seeking maximum yield, find Sun Valley provides the best entry point to Nevada homeownership in the Truckee Meadows." },
              { icon: '🏘️', title: 'Strong Rental Demand', body: "Proximity to logistics and light industrial employment corridors along US-395 generates consistent rental demand from working households who need Reno access but cannot afford Reno rents. Vacancy rates for well-maintained single-family rentals in Sun Valley typically run below the Reno average." },
              { icon: '🛣️', title: 'US-395 Corridor Access', body: "US-395 runs directly through the Sun Valley corridor, providing 15-minute access to downtown Reno and quick connections to Sparks and I-80. For workers in the Reno-Sparks employment base, the commute is straightforward without the traffic complexity of suburban corridors to the south or east." },
              { icon: '🌳', title: 'Sun Valley Regional Park', body: "Washoe County&apos;s investment in Sun Valley Regional Park has created a genuine community anchor — athletic fields, walking trails, and recreational programming that serves the north Reno corridor. The park significantly improves the area&apos;s livability relative to its price point." },
              { icon: '💰', title: 'Nevada Tax Advantages', body: "Even at Sun Valley&apos;s entry-level price points, Nevada&apos;s zero state income tax benefit applies fully. For a household earning $80K annually relocating from California, the tax savings alone — $4,000–$7,000/year — can cover a meaningful portion of housing costs." },
              { icon: '📈', title: 'Growth-Path Investment', body: "As Reno continues to grow northward, Sun Valley sits directly in the path of metro expansion. Infrastructure improvements, new commercial development along the US-395 corridor, and rising Reno metro values historically lift Sun Valley prices in parallel. Buyers who purchased early in Sun Valley have seen consistent appreciation." },
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
            <h2>Neighborhoods Within Sun Valley</h2>
            <p>From established residential streets to newer pockets with mountain views — Sun Valley has more variety than its reputation suggests.</p>
          </div>
          <div className="villages-grid">
            {[
              { name: 'Sun Valley Estates', type: 'Established · Core', desc: "The central residential core of Sun Valley — established single-family homes on standard lots with good US-395 access. Represents the bulk of Sun Valley&apos;s housing inventory and the area most investors focus on for rental properties.", price: 'From $280K' },
              { name: 'Golden Valley', type: 'Slightly Elevated · Views', desc: "Slightly elevated from the valley floor with improved mountain views. A mix of older single-family homes and some newer construction. Quieter than the main Sun Valley corridor with a more residential character.", price: 'From $300K' },
              { name: 'Panther Valley', type: 'Entry · Investment', desc: "One of the most affordable pockets in the Reno metro — older housing stock with the smallest lot sizes in the area. Popular with investors due to low acquisition costs and reliable rental demand from the logistics employment base.", price: 'From $270K' },
              { name: 'North Hills', type: 'Higher Elevation · Newer', desc: "The higher-elevation portion of Sun Valley toward the north offering the best views in the area and some newer construction homes. Price points step up from the valley floor but remain well below comparable Reno addresses.", price: 'From $320K' },
              { name: 'Desert View', type: 'Western Edge · Quiet', desc: "The western portion of Sun Valley bordering open desert — quieter, slightly more spacious lots, and mountain views toward the Virginia Range. A good option for buyers who want Sun Valley&apos;s price points with more breathing room.", price: 'From $260K' },
              { name: 'Stead', type: 'North · Spacious', desc: "The northernmost portion of the Sun Valley corridor at the former Stead Air Force Base site. Larger lots, lower density, and proximity to Reno Stead Airport and the growing Tahoe Reno Industrial Center corridor.", price: 'From $280K' },
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
              <img src={lifestyleImageUrl ? `${lifestyleImageUrl}?w=900&auto=format&q=85` : 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&h=600&q=80'} alt="Desert landscape near Sun Valley, Nevada" />
            </div>
            <div className="lifestyle-content">
              <span className="section-label">Community & Access</span>
              <div className="gold-rule" />
              <h2>Reno&apos;s Arts Scene, Pyramid Lake, and Sun Valley Regional Park</h2>
              <p>Sun Valley&apos;s lifestyle proposition is honest: this isn&apos;t a resort community, but it&apos;s a solid, accessible base for everything the Reno metro offers. The park, the proximity to Reno&apos;s dining and arts scene, and the quick shot to Pyramid Lake provide genuine quality of life at a fraction of what comparable proximity costs in California.</p>
              <p>Sun Valley Regional Park is the community&apos;s backbone — athletic leagues, walking paths, and a gathering point that gives the neighborhood a center it otherwise wouldn&apos;t have. Pyramid Lake, a stunning saline lake on the Paiute Reservation just 20 minutes north, is one of Nevada&apos;s least-known treasures: dramatic tufa formations, trophy cutthroat trout, and desert silence accessible from a city address.</p>
              <div className="lifestyle-bullets">
                {[
                  'Sun Valley Regional Park — athletic fields, trails, and community programming',
                  'Pyramid Lake — trophy fishing, kayaking, and desert landscapes, 20 min north',
                  'Reno Midtown — arts, dining, and independent culture, 15 min south',
                  'US-395 corridor — quick access to all Reno-Sparks employment and services',
                  'Pah Rah Range — hiking and trail running from the eastern valley edge',
                  'Lake Tahoe — 55 min south for skiing, swimming, and weekend escapes',
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
            <h2>Schools Serving Sun Valley Families</h2>
            <p>Washoe County School District schools serving the north Reno corridor.</p>
          </div>
          <div className="schools-layout">
            <div className="school-group">
              <h3>Public Schools (WCSD)</h3>
              {[
                ['Sun Valley Elementary', 'K–5'],
                ['Obester Elementary', 'K–5'],
                ['Hug High School', '9–12'],
                ['North Valleys High School', '9–12'],
                ['Cold Springs Middle School', '6–8'],
              ].map(([n, g]) => (
                <div className="school-item" key={n}>{n}<span className="school-grades">{g}</span></div>
              ))}
            </div>
            <div className="school-group">
              <h3>Charter Options</h3>
              {[
                ['Coral Academy of Science', 'K–12'],
                ['NOVA Academy', 'K–8'],
                ['Rainshadow Community Charter', '9–12'],
              ].map(([n, g]) => (
                <div className="school-item" key={n}>{n}<span className="school-grades">{g}</span></div>
              ))}
            </div>
            <div className="school-group">
              <h3>Private Options (Reno, ~15 min)</h3>
              {[
                ['Davidson Academy', '6–12'],
                ['Bishop Manogue Catholic HS', '9–12'],
                ['Sage Ridge School', 'K–12'],
              ].map(([n, g]) => (
                <div className="school-item" key={n}>{n}<span className="school-grades">{g}</span></div>
              ))}
              <div style={{ marginTop: '24px', padding: '18px', background: 'rgba(201,168,76,0.06)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', fontSize: '13px', color: 'var(--white-70)', lineHeight: '1.7' }}>
                <strong style={{ color: 'var(--white)' }}>School Assignment Note:</strong> Specific school assignment depends on your address. Confirm with Washoe County School District before purchasing. Charter school admission may require a lottery application.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <CommunityFAQ
        title="Sun Valley Real Estate — Frequently Asked Questions"
        subtitle="The most common questions from first-time buyers and investors considering Sun Valley."
        faqs={[
          {
            q: "Is Sun Valley a good investment in the Reno metro?",
            a: "Sun Valley offers the strongest yield potential of any established Reno-area community. Low acquisition prices, consistent rental demand from the US-395 employment corridor, and a position in the path of metro growth combine to deliver solid cash flow and appreciation potential. Investors find cap rates in the 5–7% range for well-selected properties — significantly above what's available in central Reno or Spanish Springs."
          },
          {
            q: "What is the rental market like in Sun Valley?",
            a: "Strong and consistent. Rental demand comes primarily from workers in logistics, light industrial, and service industries who need Reno metro access but cannot afford Reno rents. Single-family 3BR/2BA homes typically rent for $1,400–$1,800/month. Vacancy for well-maintained properties is low. The tenant base is working households rather than luxury renters, which creates stability — Sun Valley doesn't experience the seasonal vacancy swings that some resort-adjacent Nevada markets see."
          },
          {
            q: "How does Sun Valley compare to North Las Vegas as an investment?",
            a: "Both markets target value-oriented investment, but they differ in important ways. Sun Valley benefits from Reno's tech-driven job growth (Apple, Google, Tesla adjacency), which creates stronger employment fundamentals than North Las Vegas's more service-sector dependent base. Sun Valley also has Nevada's outdoor recreation proximity as a demand driver. North Las Vegas has a larger inventory and more institutional investor activity, which can compress yields. For individual investors, Sun Valley often offers less competition and better cap rates."
          },
          {
            q: "What is the commute from Sun Valley to Reno?",
            a: "Approximately 15 minutes to central Reno via US-395 South under normal conditions. The freeway runs directly through the Sun Valley corridor, making it one of the more straightforward commutes in the metro. Traffic peaks are moderate by California standards. Most residents find the commute adds minimal friction to daily life compared to what they experienced before moving to Nevada."
          },
          {
            q: "Where are the best price-to-value pockets within Sun Valley?",
            a: "For investment: Panther Valley and Desert View offer the lowest acquisition prices with reliable rental demand. For owner-occupants seeking the best lifestyle-adjusted value: North Hills provides elevated views and slightly newer construction at modest premiums. Golden Valley offers a good balance of price, views, and community feel. Sun Valley Estates is the most liquid market — best for buyers who may need to resell quickly."
          },
          {
            q: "What's the price trajectory for Sun Valley?",
            a: "Sun Valley has appreciated steadily alongside the broader Reno metro, though more modestly in dollar terms than higher-price neighborhoods. The community saw strong appreciation in 2020–2022 as Reno's overall market heated up. Since then, prices have stabilized and remain well below the Reno metro median. As Reno continues to grow northward and infrastructure along US-395 improves, Sun Valley is positioned to benefit — particularly as buyers priced out of Reno proper increasingly look north."
          },
        ]}
      />

      {/* CTA */}
      <section id="cta">
        <div className="container">
          <h2>Ready to Find Your Sun Valley Property?</h2>
          <p>The Reno metro&apos;s best entry-level market — first-time buyer accessibility, investment yield, Nevada tax advantages, and 15 minutes to everything Reno offers.</p>
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
