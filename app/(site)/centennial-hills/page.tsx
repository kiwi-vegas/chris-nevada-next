import CommunityFAQ from '@/components/CommunityFAQ'
import CommunityMapWrapper from '@/components/CommunityMapWrapper'
import Link from 'next/link'
import type { Metadata } from 'next'

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Centennial Hills Homes For Sale | Nevada Real Estate Group',
    description: 'Browse Centennial Hills homes for sale. Northwest Las Vegas\'s fastest-growing master-planned corridor — newer construction, mountain views, top-rated schools. 400+ active listings from $350K. Call 725.239.9950.',
  }
}

const boundary: [number, number][] = [
  [-115.32, 36.33],
  [-115.28, 36.33],
  [-115.22, 36.32],
  [-115.19, 36.30],
  [-115.19, 36.26],
  [-115.22, 36.25],
  [-115.29, 36.25],
  [-115.32, 36.27],
  [-115.32, 36.33],
]

const faqs = [
  {
    q: 'What are typical HOA fees in Centennial Hills?',
    a: 'HOA fees in Centennial Hills vary by neighborhood and community. Most master-planned sub-communities range from $50 to $150 per month, with communities like Skye Canyon toward the higher end due to their resort-style amenities. Always confirm fees with the listing agent before making an offer.',
  },
  {
    q: 'How are the schools in Centennial Hills?',
    a: 'Centennial Hills is zoned to some of Clark County School District\'s strongest schools. Arbor View, Centennial, and Legacy are the primary public high schools. The area has produced multiple National Blue Ribbon school designations, and several strong private options serve the community as well.',
  },
  {
    q: 'How does Centennial Hills compare to Summerlin?',
    a: 'Both are master-planned communities in northwest Las Vegas with excellent schools and amenities, but Centennial Hills tends to offer newer construction at slightly lower price points. Summerlin has more established villages, more trail miles, and a larger retail core (Downtown Summerlin). Centennial Hills buyers often prioritize newer homes and a somewhat quieter, more suburban feel.',
  },
  {
    q: 'How long is the commute from Centennial Hills to the Strip?',
    a: 'The commute from Centennial Hills to the Las Vegas Strip is approximately 25–30 minutes under normal traffic conditions via the 215 beltway to I-15. The 215 runs directly through the area, making the connection straightforward. During peak hours, budget 35–40 minutes.',
  },
  {
    q: 'Can I still find new construction homes in Centennial Hills?',
    a: 'Yes — Centennial Hills and Skye Canyon (its northernmost extension) still have active new construction from major builders like Toll Brothers, Lennar, and KB Home. This is one of the few areas left in northwest Las Vegas where brand-new homes are available. Inventory varies; contact us for current availability.',
  },
  {
    q: 'Are home prices in Centennial Hills trending up?',
    a: 'Centennial Hills has shown consistent appreciation over the past several years, driven by ongoing demand from California transplants, strong school quality, and continued new infrastructure investment. The north 215 corridor has been one of the more resilient submarkets in the valley during slower periods.',
  },
]

export default function CentennialHillsPage() {
  const heroHeadline = 'Centennial Hills\nHomes For Sale'
  const heroSubheadline = "Northwest Las Vegas's fastest-growing master-planned corridor — newer construction, mountain views, family-friendly neighborhoods, and some of the best school zoning in the valley."

  return (
    <main>
      <div className="breadcrumb">
        <div className="breadcrumb-inner">
          <Link href="/">Home</Link>
          <span className="breadcrumb-sep">›</span>
          <a href="/#communities">Communities</a>
          <span className="breadcrumb-sep">›</span>
          <span>Centennial Hills</span>
        </div>
      </div>

      {/* HERO */}
      <header id="hero" className="centennial-hills-hero">
        <div className="hero-bg" />
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
              <div className="hero-stat"><span className="hero-stat-num">400+</span><span className="hero-stat-lbl">Active Listings</span></div>
              <div className="hero-stat"><span className="hero-stat-num">$350K–$2M+</span><span className="hero-stat-lbl">Price Range</span></div>
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
            <h2>Where is Centennial Hills?</h2>
            <p>Located in the far northwest corner of Las Vegas — backed against the Spring Mountains with Mount Charleston visible to the west.</p>
          </div>
          <div style={{ height: '420px', borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid var(--border)' }}>
            <CommunityMapWrapper
              center={[-115.256, 36.287]}
              zoom={12}
              boundary={boundary}
              name="Centennial Hills"
              subtitle="Northwest Las Vegas, Nevada"
              id="centennial-hills-map"
            />
          </div>
          <div className="drive-time-grid">
            {[
              ['~25 min', 'to the Strip', 'via 215 W → I-15 S'],
              ['~30 min', 'to Mount Charleston', 'via US-95 N → NV-157'],
              ['~20 min', 'to Downtown Las Vegas', 'via US-95 S'],
              ['~30 min', 'to Harry Reid Airport', 'via 215 S → I-15 S'],
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
            <h2>New Centennial Hills Listings</h2>
            <p>The latest homes listed in Centennial Hills — houses, condos, and townhomes from established neighborhoods to new construction.</p>
          </div>
          <div className="ylopo-wrap">
            <div className="YLOPO_resultsWidget" data-search='{"propertyTypes":["house","condo","townhouse"],"minPrice":350000,"locations":[{"community":"Centennial Hills","city":"Las Vegas","state":"NV"}],"limit":12}'></div>
          </div>
          <p className="ylopo-note">Listing data sourced from regional MLS. Information deemed reliable but not guaranteed. Updated daily.</p>
          <div className="listings-actions">
            <a href="https://search.nevadarealestategroup.net/search?s[orderBy]=sourceCreationDate%2Cdesc&s[page]=1&s[locations][0][community]=Centennial+Hills&s[locations][0][city]=Las+Vegas&s[locations][0][state]=NV" target="_blank" rel="noopener noreferrer" className="btn-gold">View All Centennial Hills Listings →</a>
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
              <h2>Centennial Hills: Northwest Las Vegas&apos;s Crown Jewel</h2>
              <p>Centennial Hills has emerged as one of the most sought-after addresses in the Las Vegas Valley for families relocating from California. Stretching along the north 215 beltway corridor, this master-planned community encompasses thousands of acres of newer construction built predominantly from the 2000s through today — meaning buyers get modern floor plans, updated energy systems, and contemporary finishes that older Las Vegas neighborhoods simply can&apos;t match.</p>
              <p>The anchor of the area is TPC Las Vegas, a PGA Tour-quality golf course that sets the tone for the community&apos;s character. To the north, Skye Canyon has become one of the valley&apos;s most successful recent master-planned developments, with its own community center, resort-style pools, and trail system. The proximity to Mount Charleston — with its pine forests, skiing, and summer hiking — gives Centennial Hills residents a true mountain escape just thirty minutes away, something most Las Vegas neighborhoods can&apos;t claim.</p>
              <p>School quality is one of the primary reasons families choose Centennial Hills. The area is served by Arbor View, Centennial, and Legacy High Schools — all well-regarded in Clark County — and the feeder elementary and middle schools have earned strong reputations including National Blue Ribbon designations. For California transplants accustomed to paying $1.2M+ for a mediocre school zone, Centennial Hills offers genuinely excellent public schools at a fraction of the cost, and that math is hard to argue with.</p>
            </div>
            <div className="overview-aside">
              <div className="quick-facts">
                <h3>Centennial Hills At a Glance</h3>
                {[
                  ['Location', 'NW Las Vegas, NV'],
                  ['Development Type', 'Master-Planned'],
                  ['Built', '1990s–Present'],
                  ['Min Price', '$350K', 'gold'],
                  ['HOA', '$50–$150/mo'],
                  ['Nearest Strip', '~25 min'],
                  ['Schools', 'Arbor View, Centennial, Legacy'],
                  ['Golf', 'TPC Las Vegas'],
                  ['Mountain Access', 'Mount Charleston ~30 min'],
                  ['State Income Tax', 'None'],
                  ['Property Tax Rate', '~0.6%'],
                ].map(([label, value, cls]) => (
                  <div className="fact-row" key={label}>
                    <span className="fact-label">{label}</span>
                    <span className={`fact-value${cls ? ' ' + cls : ''}`}>{value}</span>
                  </div>
                ))}
              </div>
              <div className="cta-card">
                <p>Ready to explore Centennial Hills? Let&apos;s schedule a private tour of the community and the listings that match your goals.</p>
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
            <span className="section-label">Why Centennial Hills</span>
            <h2>The Reasons Buyers Keep Choosing Centennial Hills</h2>
            <p>Newer homes, top schools, mountain access, and suburban amenity — here&apos;s what drives demand in northwest Las Vegas.</p>
          </div>
          <div className="highlights-grid">
            {[
              { icon: '🏗️', title: 'Newer Construction Quality', body: 'Most Centennial Hills homes were built in the 2000s through today, offering modern floor plans, energy-efficient systems, and contemporary finishes. Buyers coming from older California suburbs consistently remark on the quality-to-price ratio.' },
              { icon: '⛳', title: 'TPC Las Vegas Golf', body: 'The TPC Las Vegas course anchors the community with PGA Tour-caliber golf. Surrounding neighborhoods offer direct access and golf course views, with membership options for serious players.' },
              { icon: '🏫', title: 'Top School Zoning', body: 'Arbor View, Centennial, and Legacy High Schools serve the area and rank among the strongest public high schools in Southern Nevada. Several feeder schools have earned National Blue Ribbon recognition.' },
              { icon: '🛣️', title: '215 Beltway Access', body: 'The north 215 beltway runs directly through Centennial Hills, providing quick access to the entire valley — Downtown Las Vegas to the south, Summerlin to the west, and the I-15 corridor to the Strip.' },
              { icon: '🏔️', title: 'Mountain Proximity', body: 'Mount Charleston — with its pine forests, ski area, and summer hiking trails — sits roughly 30 minutes from Centennial Hills. A genuine four-seasons mountain escape that most Las Vegas communities don\'t have.' },
              { icon: '🏞️', title: 'Community Parks & Recreation', body: 'Centennial Hills and Skye Canyon both feature well-maintained community parks, resort-style pools, walking trails, and programming that gives the area a true neighborhood character.' },
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
            <h2>Find Your Neighborhood in Centennial Hills</h2>
            <p>From resort-style new construction to established family communities — Centennial Hills has a neighborhood for every lifestyle.</p>
          </div>
          <div className="villages-grid">
            {[
              { name: 'Skye Canyon', type: 'Resort-Style · New Construction', desc: 'One of the valley\'s newest master-planned communities within Centennial Hills. Features a resort-style community center, pools, trails, and active new construction from top builders.', price: 'From $450K' },
              { name: 'The Trails', type: 'Established · Family', desc: 'An established community with mature landscaping, consistent HOA maintenance, and strong family character. Well-positioned near top schools and community parks.', price: 'From $400K' },
              { name: 'Elkhorn Ridge', type: 'Semi-Custom · Views', desc: 'Elevated neighborhoods with mountain and valley views. Larger lots and semi-custom homes give Elkhorn Ridge a more premium character within the Centennial Hills corridor.', price: 'From $500K' },
              { name: 'Providence', type: 'Master-Planned · Affordable', desc: 'An accessible entry point into the Centennial Hills area with good school zoning and strong community amenities. Popular with first-time buyers and relocating families.', price: 'From $350K' },
              { name: 'Aliante', type: 'Golf · Master-Planned', desc: 'Built around the Aliante Golf Club, this master-planned community on the northeast edge of Centennial Hills offers golf course living with a diverse range of home sizes.', price: 'From $375K' },
              { name: 'Deer Springs', type: 'Family · Established', desc: 'A solid family community with well-maintained streets, good school access, and a range of home sizes suitable for growing households and downsizers alike.', price: 'From $400K' },
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
              <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=900&h=600&q=80" alt="Mount Charleston mountain views near Centennial Hills Las Vegas" />
            </div>
            <div className="lifestyle-content">
              <span className="section-label">Outdoor Living</span>
              <div className="gold-rule" />
              <h2>Mountain Recreation, Desert Trails, and Suburban Ease</h2>
              <p>Centennial Hills occupies a unique position in Las Vegas — far enough northwest to feel genuinely removed from the city&apos;s energy, but close enough via the 215 to access everything in 25 minutes. The outdoor lifestyle here is anchored by proximity to Mount Charleston to the northwest and the Spring Mountains to the west.</p>
              <p>The Skye Canyon trail system connects into regional desert trails, and community parks throughout the area offer everyday green space. It&apos;s a lifestyle that works for the family who wants weekend hiking and skiing without sacrificing suburban convenience.</p>
              <div className="lifestyle-bullets">
                {[
                  'Mount Charleston — skiing, hiking, and pine forests — approximately 30 minutes northwest',
                  'Skye Canyon community trails and resort-style amenities within the neighborhood',
                  'TPC Las Vegas golf course anchoring the community with PGA-caliber play',
                  'Regional parks and splash pads maintained throughout the Centennial Hills area',
                  'Day trips to Red Rock Canyon, Valley of Fire, and Zion National Park within 2–3 hours',
                  '215 beltway access connects the entire Las Vegas Valley in under 30 minutes',
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
            <h2>Top-Ranked Schools Serving Centennial Hills</h2>
            <p>One of the strongest school corridors in Clark County — a primary reason families choose northwest Las Vegas.</p>
          </div>
          <div className="schools-layout">
            <div className="school-group">
              <h3>Public High Schools (CCSD)</h3>
              {[
                ['Arbor View High School', '9–12'],
                ['Centennial High School', '9–12'],
                ['Legacy High School', '9–12'],
                ['Shadow Ridge High School', '9–12'],
              ].map(([n, g]) => (
                <div className="school-item" key={n}>{n}<span className="school-grades">{g}</span></div>
              ))}
            </div>
            <div className="school-group">
              <h3>Middle &amp; Elementary</h3>
              {[
                ['Edmundo Eddie Escobedo Sr. MS', '6–8'],
                ['Kenneth Divich Middle School', '6–8'],
                ['Multiple CCSD Elementaries', 'K–5'],
                ['Skye Canyon Elementary', 'K–5'],
                ['Centennial Hills Elementary', 'K–5'],
              ].map(([n, g]) => (
                <div className="school-item" key={n}>{n}<span className="school-grades">{g}</span></div>
              ))}
            </div>
            <div className="school-group">
              <h3>Private &amp; Charter</h3>
              {[
                ['Pinecrest Academy (NW Campus)', 'PreK–12'],
                ['Faith Lutheran Academy', 'K–5'],
                ['Doral Academy of Nevada', 'K–8'],
                ['Charter School Options', 'Various'],
              ].map(([n, g]) => (
                <div className="school-item" key={n}>{n}<span className="school-grades">{g}</span></div>
              ))}
              <div style={{ marginTop: '24px', padding: '18px', background: 'rgba(201,168,76,0.06)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', fontSize: '13px', color: 'var(--white-70)', lineHeight: '1.7' }}>
                <strong style={{ color: 'var(--white)' }}>School Assignment Note:</strong> Zoning varies by neighborhood and address within Centennial Hills. Always confirm your specific assignment with CCSD before purchasing.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <CommunityFAQ
        title="Centennial Hills FAQ"
        subtitle="Common questions from buyers considering northwest Las Vegas's most popular master-planned corridor."
        faqs={faqs}
      />

      {/* CTA */}
      <section id="cta">
        <div className="container">
          <h2>Ready to Find Your Centennial Hills Home?</h2>
          <p>Newer construction, top school zoning, mountain access, and a price point that makes California buyers feel like they&apos;ve discovered a secret.</p>
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
