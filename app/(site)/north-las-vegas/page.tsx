import CommunityFAQ from '@/components/CommunityFAQ'
import CommunityMapWrapper from '@/components/CommunityMapWrapper'
import Link from 'next/link'
import type { Metadata } from 'next'

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'North Las Vegas Homes For Sale | Nevada Real Estate Group',
    description: "Browse North Las Vegas homes for sale. Nevada's fastest-growing city — master-planned communities, affordable prices from $250K, Brightline West terminus, and direct Mount Charleston access. 800+ active listings. Call 725.239.9950.",
  }
}

const heroHeadline = 'North Las Vegas\nHomes For Sale'
const heroSubheadline = "Nevada's fastest-growing city — an independent municipality north of Las Vegas with newer master-planned communities, affordable entry prices, the Valley's largest industrial job base, and direct access to Mount Charleston."

const northLVFaqs = [
  {
    q: 'Is North Las Vegas the same as Las Vegas?',
    a: 'No — North Las Vegas is a completely separate, incorporated city with its own mayor, city council, police department, fire department, water system, and municipal government. It shares a border with the City of Las Vegas and Clark County unincorporated areas but operates entirely independently. When you purchase a home in North Las Vegas, your property taxes, services, and local government are all North Las Vegas — not the City of Las Vegas or Clark County.',
  },
  {
    q: 'What is Aliante, and is it a good community?',
    a: "Aliante is one of North Las Vegas's two major master-planned communities and consistently ranks as the most desirable area within the city. It features a dedicated community center, the Aliante Golf Club, retail anchored by the Aliante Gaming Casino & Hotel, multiple parks, and well-maintained streets. Home values in Aliante are stronger and more stable than the broader North Las Vegas market, and the community attracts families and buyers relocating from California who want a planned neighborhood at a reasonable price point.",
  },
  {
    q: 'Is North Las Vegas safe? How has it changed?',
    a: "North Las Vegas historically carried a higher crime rate than Henderson or Summerlin. Over the past decade, significant investment in infrastructure, policing, and community programming has improved conditions considerably — particularly in Aliante and the newer master-planned areas. As with any city, neighborhood selection matters. The newer northern and western sections of North Las Vegas are notably different from older core neighborhoods near downtown. Your agent can guide you to the specific areas that match your priorities.",
  },
  {
    q: 'How does North Las Vegas compare to Henderson for investors?',
    a: "North Las Vegas offers lower acquisition costs than Henderson, which means stronger gross rental yields on paper. However, Henderson's tenant quality, vacancy rates, and long-term appreciation have historically been more consistent. North Las Vegas appeals to investors willing to trade some stability for a higher yield. The city's job growth story — logistics, distribution, Brightline West construction, and tech manufacturing — is building a stronger rental demand base. Both cities have active investor markets; the right choice depends on your strategy.",
  },
  {
    q: 'How will Brightline West affect North Las Vegas property values?',
    a: "Brightline West's high-speed rail line will connect Las Vegas to Rancho Cucamonga (and onward to Los Angeles) with a Nevada terminus in the North Las Vegas/Las Vegas area. The station proximity creates transit-oriented development opportunities and is expected to increase demand from California buyers and commuters. Properties within a reasonable drive of the terminus are likely to benefit as construction progresses and opening approaches. This is a long-term catalyst — the effect on day-to-day values is gradual rather than immediate.",
  },
  {
    q: 'What is the commute like from North Las Vegas to the Strip?',
    a: "The commute depends heavily on traffic. During off-peak hours, North Las Vegas to the Strip runs 20–30 minutes via I-15 or US-95. During peak commute hours, especially the I-15 corridor, travel times can extend to 40–50 minutes. The US-95 north-south corridor is the primary artery, and several new interchange improvements have been completed in recent years. Many North Las Vegas residents commute to Strip hospitality and gaming jobs — it's a well-traveled route.",
  },
]

export default function NorthLasVegasPage() {
  return (
    <main>
      <div className="breadcrumb">
        <div className="breadcrumb-inner">
          <Link href="/">Home</Link>
          <span className="breadcrumb-sep">›</span>
          <a href="/#communities">Communities</a>
          <span className="breadcrumb-sep">›</span>
          <span>North Las Vegas</span>
        </div>
      </div>

      {/* HERO */}
      <header id="hero" className="north-las-vegas-hero">
        <div className="hero-bg" />
        <div className="hero-overlay" />
        <div className="hero-content summerlin">
          <div className="container">
            <p className="hero-eyebrow-sm">North Las Vegas, Nevada</p>
            <div className="hero-rule" />
            <h1>{heroHeadline.split('\n').map((line: string, i: number) => (
              <span key={i}>{line}{i < heroHeadline.split('\n').length - 1 && <br />}</span>
            ))}</h1>
            <p className="hero-sub">{heroSubheadline}</p>
            <div className="hero-stats">
              <div className="hero-stat"><span className="hero-stat-num">800+</span><span className="hero-stat-lbl">Active Listings</span></div>
              <div className="hero-stat"><span className="hero-stat-num">$250K–$1M+</span><span className="hero-stat-lbl">Price Range</span></div>
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
            <h2>Where is North Las Vegas?</h2>
            <p>An independent incorporated city directly north of Las Vegas — bordered by Nellis Air Force Base to the east and the Spring Mountains to the west, with Mount Charleston visible on clear days.</p>
          </div>
          <div style={{ height: '420px', borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid var(--border)' }}>
            <CommunityMapWrapper
              center={[-115.117, 36.198]}
              zoom={12}
              boundary={[
                [-115.21, 36.31],
                [-115.17, 36.34],
                [-115.09, 36.33],
                [-115.04, 36.30],
                [-115.02, 36.25],
                [-115.03, 36.19],
                [-115.07, 36.16],
                [-115.13, 36.16],
                [-115.18, 36.17],
                [-115.21, 36.20],
                [-115.21, 36.31],
              ]}
              name="North Las Vegas"
              subtitle="North Las Vegas, Nevada"
              id="north-las-vegas-map"
            />
          </div>
          <div className="drive-time-grid">
            {[
              ['~25 min', 'to the Strip', 'via I-15 S or US-95 S'],
              ['~30 min', 'to Mount Charleston', 'via US-95 N → NV-157'],
              ['~20 min', 'to Downtown Las Vegas', 'via US-95 S'],
              ['~35 min', 'to Harry Reid Airport', 'via I-15 S'],
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
            <h2>New North Las Vegas Listings</h2>
            <p>The latest homes listed in North Las Vegas — houses, condos, and townhomes across Aliante, Eldorado, Providence, and all city neighborhoods.</p>
          </div>
          <div className="ylopo-wrap">
            <div className="YLOPO_resultsWidget" data-search='{"propertyTypes":["house","condo","townhouse"],"minPrice":250000,"locations":[{"city":"North Las Vegas","state":"NV"}],"limit":12}'></div>
          </div>
          <p className="ylopo-note">Listing data sourced from regional MLS. Information deemed reliable but not guaranteed. Updated daily.</p>
          <div className="listings-actions">
            <a href="https://search.nevadarealestategroup.net/search?s[orderBy]=sourceCreationDate%2Cdesc&s[page]=1&s[locations][0][city]=North+Las+Vegas&s[locations][0][state]=NV" target="_blank" rel="noopener noreferrer" className="btn-gold">View All North Las Vegas Listings →</a>
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
              <h2>North Las Vegas: Nevada&apos;s Fastest-Growing City</h2>
              <p>North Las Vegas is its own incorporated city — a separate municipality with its own mayor, city council, police department, and city services, not a neighborhood within Las Vegas. With a population approaching 300,000, it&apos;s Nevada&apos;s fourth-largest city and one of the fastest-growing municipalities in the country. The city has invested heavily in infrastructure over the past decade, adding parks, libraries, and improving roads in response to explosive growth.</p>
              <p>Real estate is anchored by two large master-planned communities — Aliante and Eldorado — plus the newer Apex/Lamb industrial corridor development bringing major employers like Brightline West&apos;s Nevada terminus and a growing logistics and distribution center cluster. For first-time buyers and investors, North Las Vegas offers some of the most affordable quality housing in the metro at prices that still make California buyers feel like they&apos;ve found something unreasonable.</p>
              <p>The city has been aggressively courting tech and manufacturing, and an Amazon distribution center, IKEA, and Brightline West high-speed rail terminus are all within or adjacent to the city limits. These employment anchors are building a rental demand base that makes North Las Vegas increasingly attractive to investors alongside owner-occupants.</p>
            </div>
            <div className="overview-aside">
              <div className="quick-facts">
                <h3>North Las Vegas At a Glance</h3>
                {[
                  ['Location', 'North Las Vegas, NV (incorporated city)'],
                  ['Population', '~290,000'],
                  ['Notable', 'Nellis AFB adjacent'],
                  ['Min Price', '$250K', 'gold'],
                  ['Brightline West', 'Nearby terminus'],
                  ['Mount Charleston', '30 min'],
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
                <p>Ready to explore North Las Vegas? Let&apos;s schedule a tour of the communities and listings that match your goals.</p>
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
            <span className="section-label">Why North Las Vegas</span>
            <h2>The Reasons Buyers Are Choosing North Las Vegas</h2>
            <p>Affordability, growth, master-planned communities, and a job market expanding faster than any other part of the valley.</p>
          </div>
          <div className="highlights-grid">
            {[
              { icon: '💰', title: 'Affordable Entry Prices', body: "North Las Vegas offers the lowest entry point for quality housing in the Las Vegas metro. With homes starting under $300K, buyers who are priced out of Summerlin or Henderson find North Las Vegas gives them new construction, master-planned amenities, and solid schools at a fraction of the cost." },
              { icon: '🏘️', title: 'Aliante Master-Planned Community', body: "Aliante is North Las Vegas's showpiece development — a fully planned community with its own golf club, community center, shopping center anchored by the Aliante Casino, parks, and trails. It's the most desirable neighborhood in the city and consistently outperforms the broader North Las Vegas market on resale." },
              { icon: '✈️', title: 'Nellis AFB Proximity', body: "Nellis Air Force Base, one of the largest and busiest Air Force installations in the country, sits on the eastern edge of North Las Vegas. Military families seeking VA loan purchases near base represent a strong and consistent buyer pool — and a reliable rental market for investors targeting VA-eligible tenants." },
              { icon: '🚄', title: 'Brightline West Rail Terminus', body: "Brightline West's high-speed passenger rail will connect the Las Vegas area to Southern California with the Nevada terminus in the North Las Vegas corridor. This creates long-term transit-oriented development opportunities and positions the area favorably for California buyers and commuters." },
              { icon: '⛷️', title: 'Mount Charleston 30 Minutes Away', body: "The Spring Mountains and Mount Charleston — offering skiing, hiking, and cool-elevation relief from valley heat — sit 30 minutes from most North Las Vegas addresses. This access to year-round mountain recreation is a genuine quality-of-life differentiator unavailable from Henderson or the south valley." },
              { icon: '📈', title: 'Strong Job Growth', body: "North Las Vegas has attracted Amazon distribution, IKEA, and a growing cluster of logistics and light manufacturing employers to its Apex industrial corridor. These jobs create rental demand and support home values independent of Strip tourism cycles — a meaningful stabilizer for the local market." },
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
            <h2>Find Your Neighborhood in North Las Vegas</h2>
            <p>From master-planned Aliante to affordable starter neighborhoods — North Las Vegas has options for first-time buyers, investors, and growing families.</p>
          </div>
          <div className="villages-grid">
            {[
              { name: 'Aliante', type: 'Master-Planned · Golf', desc: "North Las Vegas's most desirable community. Dedicated golf club, community center, casino and retail anchors, parks, and trails. Consistent resale performance and the strongest long-term appreciation track record in the city.", price: 'From $350K' },
              { name: 'Eldorado', type: 'Established · Master-Planned', desc: 'One of the original large master-planned communities in North Las Vegas. Established landscaping, community parks, and a broad range of home sizes and price points. Good schools and stable neighborhood character.', price: 'From $300K' },
              { name: 'The Crossings', type: 'Family · Newer Construction', desc: 'A newer community on the northern edge of North Las Vegas with contemporary home designs, good school zoning, and proximity to the growing retail and employment base in the city\'s north sector.', price: 'From $375K' },
              { name: 'Deer Valley', type: 'Affordable · Family', desc: 'One of the more affordable established neighborhoods in North Las Vegas. Larger lot sizes relative to price, well-maintained streets, and convenient access to US-95 for commuting throughout the valley.', price: 'From $280K' },
              { name: 'Sunrise Estates', type: 'Affordable · Entry-Level', desc: "An accessible neighborhood for first-time buyers and investors. Proximity to Nellis AFB makes it popular with military families. Strong rental demand and a steady buyer pool driven by VA loan eligibility.", price: 'From $280K' },
              { name: 'Providence', type: 'Master-Planned · Premium', desc: "One of North Las Vegas's newer and more upscale planned communities on the western edge of the city. Contemporary architecture, community parks, and a higher price point that reflects newer construction and amenities.", price: 'From $400K' },
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
              <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=900&h=600&q=80" alt="North Las Vegas neighborhood with mountain backdrop" />
            </div>
            <div className="lifestyle-content">
              <span className="section-label">Outdoor Living &amp; Recreation</span>
              <div className="gold-rule" />
              <h2>Mountains, Desert, and a City Growing Into Itself</h2>
              <p>North Las Vegas sits at the foot of the Spring Mountains, giving residents quicker access to Mount Charleston&apos;s skiing, hiking, and cool-weather escapes than any other Las Vegas metro community. At 8,000+ feet, Charleston Peak is visible from most of the city on clear days.</p>
              <p>The Aliante Town Center brings walkable retail, dining, and entertainment to the community&apos;s core. Nellis AFB adds a military community network of services and recreation. Lake Mead&apos;s boating and hiking sits 30 minutes southeast, rounding out a strong outdoor recreation portfolio.</p>
              <div className="lifestyle-bullets">
                {[
                  'Mount Charleston — skiing, hiking, and cool-weather elevation relief within 30 min',
                  'Aliante Town Center — walkable dining, retail, and casino entertainment',
                  'Nellis AFB — community services, recreation programs, and a strong military network',
                  'Lake Mead National Recreation Area — boating and hiking 30 min southeast',
                  'Craig Ranch Regional Park — 164 acres of trails, sports fields, and open space',
                  'Valley of Fire State Park — stunning red rock landscapes 45 min east',
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
            <h2>Schools Serving North Las Vegas Families</h2>
            <p>North Las Vegas is served by CCSD (Clark County School District), with several strong options in the Aliante and Providence areas.</p>
          </div>
          <div className="schools-layout">
            <div className="school-group">
              <h3>Public Elementary (CCSD)</h3>
              {[
                ['Aliante Elementary School', 'K–5'],
                ['Staton Elementary School', 'K–5'],
                ['Multiple CCSD Elementary Schools', 'K–5'],
              ].map(([n, g]) => (
                <div className="school-item" key={n}>{n}<span className="school-grades">{g}</span></div>
              ))}
            </div>
            <div className="school-group">
              <h3>Public High Schools (CCSD)</h3>
              {[
                ['Legacy High School', '9–12'],
                ['Shadow Ridge High School', '9–12'],
                ['Mojave High School', '9–12'],
              ].map(([n, g]) => (
                <div className="school-item" key={n}>{n}<span className="school-grades">{g}</span></div>
              ))}
            </div>
            <div className="school-group">
              <h3>Charter &amp; Higher Education</h3>
              {[
                ['Charter School Options (×3)', 'Various'],
                ['College of Southern Nevada (N. Las Vegas)', 'Post-secondary'],
              ].map(([n, g]) => (
                <div className="school-item" key={n}>{n}<span className="school-grades">{g}</span></div>
              ))}
              <div style={{ marginTop: '24px', padding: '18px', background: 'rgba(201,168,76,0.06)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', fontSize: '13px', color: 'var(--white-70)', lineHeight: '1.7' }}>
                <strong style={{ color: 'var(--white)' }}>School Assignment Note:</strong> Zoning varies by neighborhood and address within North Las Vegas. Always confirm your specific assignment with CCSD before purchasing.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <CommunityFAQ
        title="North Las Vegas — Frequently Asked Questions"
        subtitle="Answers to the most common questions from buyers and investors considering North Las Vegas."
        faqs={northLVFaqs}
      />

      {/* CTA */}
      <section id="cta">
        <div className="container">
          <h2>Ready to Find Your North Las Vegas Home?</h2>
          <p>Nevada&apos;s fastest-growing city — master-planned communities, affordable prices, and a job market that&apos;s building lasting value for buyers who move early.</p>
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
