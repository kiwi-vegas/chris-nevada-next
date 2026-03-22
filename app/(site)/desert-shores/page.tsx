import CommunityFAQ from '@/components/CommunityFAQ'
import CommunityMapWrapper from '@/components/CommunityMapWrapper'
import Link from 'next/link'
import type { Metadata } from 'next'
import { getCommunityPage } from '@/sanity/queries'
import { mergeQuickStats, getSectionImageUrl } from '@/lib/community-utils'

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const cms = await getCommunityPage('desert-shores')
  return {
    title: cms?.metaTitle ?? 'Desert Shores Homes For Sale | Nevada Real Estate Group',
    description: cms?.metaDescription ?? 'Browse Desert Shores homes for sale. Las Vegas\'s hidden waterfront community — four man-made lakes, lakeside walking paths, boat launches, and established neighborhoods. 200+ listings from $350K. Call 725.239.9950.',
  }
}

const boundary: [number, number][] = [
  [-115.26, 36.22],
  [-115.22, 36.22],
  [-115.20, 36.21],
  [-115.20, 36.19],
  [-115.21, 36.18],
  [-115.25, 36.18],
  [-115.27, 36.19],
  [-115.27, 36.21],
  [-115.26, 36.22],
]

const faqs = [
  {
    q: 'Is Desert Shores an affordable community?',
    a: 'Desert Shores offers a range of price points, starting around $350,000 for condos and smaller townhomes and reaching $700,000+ for lakefront single-family homes. Compared to Summerlin, Desert Shores tends to be more accessible while offering the unique amenity of actual waterfront living. The value proposition — man-made lakes, walking paths, and established mature trees — is genuinely difficult to find at this price range anywhere in Las Vegas.',
  },
  {
    q: 'How much of a premium do lakefront homes command?',
    a: 'Lakefront and lake-view homes in Desert Shores typically command a 15–30% premium over comparable interior homes in the same neighborhood. The premium varies by lake, view quality, and direct water access. Homes on Lake Sahara Estates and The Point tend to carry the highest premiums. The waterfront premium in Desert Shores is often considered strong value compared to manufactured lake communities in other states.',
  },
  {
    q: 'What activities are available on the Desert Shores lakes?',
    a: 'The Desert Shores lakes support non-motorized watercraft — kayaks, paddleboards, and small sailboats are common. There are designated boat launches for community residents. The lakeside walking and jogging paths that ring the lakes are heavily used, and lakeside dining is available at the Duck Club restaurant. The lakes also support fishing and wildlife viewing.',
  },
  {
    q: 'How does Desert Shores compare to The Lakes community?',
    a: 'Both are established northwest Las Vegas communities built around man-made lakes, developed in roughly the same era. Desert Shores has four lakes and tends to have slightly more commercial lakeside activity (the Duck Club restaurant, boat launches). The Lakes is immediately adjacent and residents of both communities often use the combined path system. Home prices are comparable, though Desert Shores tends to have slightly more lakefront inventory.',
  },
  {
    q: 'How long is the commute from Desert Shores to Downtown Las Vegas?',
    a: 'Desert Shores is in northwest Las Vegas, approximately 10–15 minutes from Downtown Las Vegas via US-95 South. The Strip is roughly 15–20 minutes depending on traffic. The community\'s location between US-95 and the 215 gives residents good valley-wide access without the longer Strip commute that Centennial Hills or Summerlin involves.',
  },
  {
    q: 'What does the Desert Shores HOA cover?',
    a: 'HOA fees in Desert Shores typically cover lake maintenance (a significant cost), lakeside path upkeep, common area landscaping, and community amenity management. The lake maintenance component is what makes the HOA essential — the artificial lakes require ongoing water treatment and upkeep that the HOA funds. Fees generally range from $60 to $150 per month depending on sub-community and home type.',
  },
]

export default async function DesertShoresPage() {
  const cms = await getCommunityPage('desert-shores')

  const heroHeadline = cms?.heroHeadline ?? 'Desert Shores\nHomes For Sale'
  const heroSubheadline = cms?.heroSubheadline ?? "Las Vegas's hidden waterfront community — four man-made lakes, lakeside walking paths, boat launches, and established neighborhoods that established the template for Vegas resort living."

  const HARDCODED_STATS: Array<[string, string] | [string, string, string]> = [
    ['Location', 'NW Las Vegas, NV'],
    ['Lakes', '4 man-made lakes', 'gold'],
    ['Built', '1980s–1990s'],
    ['Min Price', '$350K'],
    ['HOA', '$60–$150/mo'],
    ['To Strip', '~15 min'],
    ['To Downtown', '~10 min'],
    ['Dining', 'Duck Club on the Lake'],
    ['Watercraft', 'Kayak, Paddleboard, Sail'],
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
          <span>Desert Shores</span>
        </div>
      </div>

      {/* HERO */}
      <header id="hero" className="desert-shores-hero">
        {cms?.heroImageUrl
          ? <img src={`${cms.heroImageUrl}?w=1920&auto=format&q=85`} alt="Desert Shores hero" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
          : <div className="hero-bg" />
        }
        <div className="hero-overlay" />
        <div className="hero-content summerlin">
          <div className="container">
            <p className="hero-eyebrow-sm">Northwest Las Vegas, Nevada</p>
            <div className="hero-rule" />
            <h1>{heroHeadline.split('\n').map((line, i) => (
              <span key={i}>{line}{i < heroHeadline.split('\n').length - 1 && <br />}</span>
            ))}</h1>
            <p className="hero-sub">{heroSubheadline}</p>
            <div className="hero-stats">
              <div className="hero-stat"><span className="hero-stat-num">200+</span><span className="hero-stat-lbl">Active Listings</span></div>
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
            <h2>Where is Desert Shores?</h2>
            <p>Located in northwest Las Vegas between US-95 and the 215 beltway — close to Summerlin, close to the Strip, and built around four man-made lakes.</p>
          </div>
          <div style={{ height: '420px', borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid var(--border)' }}>
            <CommunityMapWrapper
              center={[-115.233, 36.203]}
              zoom={13}
              boundary={boundary}
              name="Desert Shores"
              subtitle="Northwest Las Vegas, Nevada"
              id="desert-shores-map"
            />
          </div>
          <div className="drive-time-grid">
            {[
              ['~15 min', 'to the Strip', 'via US-95 S → I-15 S'],
              ['~10 min', 'to Downtown Las Vegas', 'via US-95 S'],
              ['~10 min', 'to Summerlin', 'via W Sahara Ave'],
              ['~20 min', 'to Harry Reid Airport', 'via I-15 S → I-215'],
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
            <h2>New Desert Shores Listings</h2>
            <p>The latest homes listed in Desert Shores — lakefront estates, lake-view single-family homes, and condos on four man-made lakes in northwest Las Vegas.</p>
          </div>
          <div className="ylopo-wrap">
            <div className="YLOPO_resultsWidget" data-search='{"propertyTypes":["house","condo","townhouse"],"minPrice":350000,"locations":[{"community":"Desert Shores","city":"Las Vegas","state":"NV"}],"limit":12}'></div>
          </div>
          <p className="ylopo-note">Listing data sourced from regional MLS. Information deemed reliable but not guaranteed. Updated daily.</p>
          <div className="listings-actions">
            <a href="https://search.nevadarealestategroup.net/search?s[orderBy]=sourceCreationDate%2Cdesc&s[page]=1&s[locations][0][community]=Desert+Shores&s[locations][0][city]=Las+Vegas&s[locations][0][state]=NV" target="_blank" rel="noopener noreferrer" className="btn-gold">View All Desert Shores Listings →</a>
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
              <h2>Desert Shores: Las Vegas&apos;s Best-Kept Waterfront Secret</h2>
              <p>Desert Shores was built in the 1980s and early 1990s around a genuinely audacious concept: create real waterfront living in the middle of the Mojave Desert. The community was developed with four man-made lakes — Lake Sahara, Lakeshore Lake, Sandpiper Lake, and the main Desert Shores Lake — and a network of lakeside paths, boat launches, and community amenities designed to make the water feel like a genuine part of daily life rather than a decorative backdrop.</p>
              <p>The Duck Club restaurant on the lake has become an institution — a lakeside dining destination that serves both residents and visitors from across the valley. It&apos;s the kind of anchor that gives a neighborhood identity. Paddleboarding, kayaking, and fishing on the lakes are part of normal weekend life for Desert Shores residents, and the walking and jogging paths that ring the lakes are among the most used recreational infrastructure in northwest Las Vegas.</p>
              <p>What buyers consistently discover about Desert Shores is the maturity of the community. The trees are established, the landscaping is lush by Las Vegas standards, and the neighborhood has a settled, human-scaled character that newer master-planned developments can&apos;t replicate for decades. It sits between Summerlin to the west and downtown Las Vegas to the southeast, making it one of the better-positioned established communities in the city. The price-to-lifestyle ratio — particularly for lakefront and lake-view homes — remains one of the most compelling in the entire valley.</p>
            </div>
            <div className="overview-aside">
              <div className="quick-facts">
                <h3>Desert Shores At a Glance</h3>
                {displayStats.map(([label, value, cls]) => (
                  <div className="fact-row" key={label}>
                    <span className="fact-label">{label}</span>
                    <span className={`fact-value${cls ? ' ' + cls : ''}`}>{value}</span>
                  </div>
                ))}
              </div>
              <div className="cta-card">
                <p>Ready to explore Desert Shores? Let&apos;s schedule a private lakeside tour of the community and the listings that match your goals.</p>
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
            <span className="section-label">Why Desert Shores</span>
            <h2>The Reasons Buyers Discover Desert Shores and Never Leave</h2>
            <p>Four lakes, waterfront living, mature trees, and a 15-minute Strip commute — a combination that genuinely doesn&apos;t exist anywhere else in Las Vegas.</p>
          </div>
          <div className="highlights-grid">
            {[
              { icon: '🌊', title: '4 Man-Made Lakes', body: 'Desert Shores, Lake Sahara, Lakeshore, and Sandpiper — four interconnected bodies of water that form the heart of the community. Each has its own character, and the lakeside path network connects them all.' },
              { icon: '🏠', title: 'True Waterfront Homes', body: 'Lakefront single-family homes with direct water access, private docks, and permanent lake views. A genuinely rare product in Las Vegas that commands steady demand and strong resale — waterfront real estate doesn\'t depreciate easily.' },
              { icon: '🚣', title: 'Boat Launches & Water Recreation', body: 'Designated boat launches serve kayakers, paddleboarders, and small sailboat owners throughout the community. Non-motorized watercraft keeps the lakes peaceful while maintaining the active-living character that defines Desert Shores.' },
              { icon: '🍽️', title: 'Lakeside Dining — The Duck Club', body: 'The Duck Club restaurant on the lake has served as the community\'s social anchor for decades. Lakeside dining, outdoor seating, and a consistently maintained waterfront experience that residents genuinely use.' },
              { icon: '🚶', title: 'Lakeside Walking Paths', body: 'The walking and jogging paths that ring the Desert Shores lakes are some of the most heavily used recreational infrastructure in northwest Las Vegas. Shaded by mature trees and consistently maintained.' },
              { icon: '🌳', title: 'Established Mature Trees & Landscaping', body: 'Desert Shores was planted in the 1980s, and those trees are now mature. The canopy cover and established landscaping give the community a genuinely different character than newer Las Vegas developments — a character that takes 30 years to grow.' },
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
            <h2>Find Your Neighborhood in Desert Shores</h2>
            <p>From lakefront estates to established interior neighborhoods — Desert Shores offers a range of price points within its waterfront community.</p>
          </div>
          <div className="villages-grid">
            {[
              { name: 'Lakeshore', type: 'Lakefront · Premier', desc: 'Direct lakefront addresses on the main Desert Shores lake. The most sought-after positioning in the community, with private dock access and permanent water views from the primary living areas.', price: 'From $500K' },
              { name: 'The Point', type: 'Peninsula · Water Views', desc: 'Peninsula-positioned homes with water on multiple sides. The Point offers some of the most dramatic lake views in Desert Shores and a genuine sense of being surrounded by water.', price: 'From $600K' },
              { name: 'Sandpiper Cove', type: 'Established · Family', desc: 'A well-established neighborhood along Sandpiper Lake with consistent character and strong community identity. Lake access within easy walking distance.', price: 'From $450K' },
              { name: 'Lake Sahara Estates', type: 'Lake Views · Premium', desc: 'Premium addresses on Lake Sahara with excellent lake views and established mature landscaping. One of the more consistently desirable sub-communities within Desert Shores.', price: 'From $700K' },
              { name: 'Desert Shores Villas', type: 'Townhome · Entry Luxury', desc: 'An accessible entry point into the Desert Shores community. Well-maintained townhomes and villas with HOA-managed landscaping and access to community amenities.', price: 'From $375K' },
              { name: 'Golf Estates', type: 'Established · Interior', desc: 'Interior single-family homes with well-maintained streets and proximity to both the lakes and the Desert Shores Golf Course. A solid family neighborhood within the master-planned footprint.', price: 'From $400K' },
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
              <img src={lifestyleImageUrl ? `${lifestyleImageUrl}?w=900&auto=format&q=85` : 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=900&h=600&q=80'} alt="Lakeside living and waterfront homes at Desert Shores Las Vegas" />
            </div>
            <div className="lifestyle-content">
              <span className="section-label">Waterfront Living</span>
              <div className="gold-rule" />
              <h2>Four Lakes, Lakeside Dining, and Las Vegas&apos;s Finest Walking Paths</h2>
              <p>Desert Shores offers something that feels genuinely anomalous in the Mojave Desert: real waterfront living. The four man-made lakes aren&apos;t decorative — they&apos;re functional bodies of water with boat launches, active recreation, and lakeside restaurants that serve as the social core of the community.</p>
              <p>The walking paths that ring the lakes connect through mature trees and maintained landscaping, making Desert Shores one of the most walkable established communities in Las Vegas. Residents consistently describe the lakeside morning walks as a defining quality-of-life feature that justifies the premium over comparable interior Las Vegas neighborhoods.</p>
              <div className="lifestyle-bullets">
                {[
                  'Four man-made lakes — Desert Shores, Lake Sahara, Lakeshore, and Sandpiper — with active recreation',
                  'Designated boat launches for kayaks, paddleboards, and small sailboats throughout the community',
                  'The Duck Club restaurant — lakeside dining institution serving residents and valley visitors alike',
                  'Lakeside walking and jogging paths shaded by mature trees planted in the 1980s',
                  'Fishing and wildlife viewing on the lakes — unexpected in the middle of Las Vegas',
                  '15 minutes to the Strip, 10 minutes to Downtown — the best-positioned waterfront in the valley',
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
            <h2>Schools Serving Desert Shores Families</h2>
            <p>Public schools and charter options serving northwest Las Vegas families.</p>
          </div>
          <div className="schools-layout">
            <div className="school-group">
              <h3>Public High Schools (CCSD)</h3>
              {[
                ['Cimarron-Memorial High School', '9–12'],
                ['Shadow Ridge High School', '9–12'],
                ['Clark High School', '9–12'],
              ].map(([n, g]) => (
                <div className="school-item" key={n}>{n}<span className="school-grades">{g}</span></div>
              ))}
            </div>
            <div className="school-group">
              <h3>Middle &amp; Elementary</h3>
              {[
                ['Hyde Park Middle School', '6–8'],
                ['J.E. Manch Elementary School', 'K–5'],
                ['William E. Ferron Elementary', 'K–5'],
                ['Multiple CCSD Elementaries', 'K–5'],
              ].map(([n, g]) => (
                <div className="school-item" key={n}>{n}<span className="school-grades">{g}</span></div>
              ))}
            </div>
            <div className="school-group">
              <h3>Private &amp; Charter</h3>
              {[
                ['Merryhill School (NW Campus)', 'PreK–5'],
                ['The Meadows School', 'PreK–12'],
                ['Advanced Technologies Academy', '9–12'],
                ['Charter School Options', 'Various'],
              ].map(([n, g]) => (
                <div className="school-item" key={n}>{n}<span className="school-grades">{g}</span></div>
              ))}
              <div style={{ marginTop: '24px', padding: '18px', background: 'rgba(201,168,76,0.06)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', fontSize: '13px', color: 'var(--white-70)', lineHeight: '1.7' }}>
                <strong style={{ color: 'var(--white)' }}>School Assignment Note:</strong> Zoning varies by address within Desert Shores. Always confirm your specific assignment with CCSD before purchasing.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <CommunityFAQ
        title="Desert Shores FAQ"
        subtitle="Common questions from buyers considering Las Vegas's most unique waterfront community."
        faqs={faqs}
      />

      {/* CTA */}
      <section id="cta">
        <div className="container">
          <h2>Ready to Find Your Desert Shores Home?</h2>
          <p>Four man-made lakes, waterfront living, mature trees, and a 15-minute commute to the Strip — Las Vegas&apos;s best-kept real estate secret.</p>
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
