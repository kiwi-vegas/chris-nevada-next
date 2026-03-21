import CommunityFAQ from '@/components/CommunityFAQ'
import CommunityMapWrapper from '@/components/CommunityMapWrapper'
import Link from 'next/link'
import type { Metadata } from 'next'

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'The Lakes Las Vegas Homes For Sale | Nevada Real Estate Group',
    description: "Browse homes for sale in The Lakes, Las Vegas — a distinctive 320-acre waterfront master-planned community in west Las Vegas. Lakefront paths, private beach club, and water views from $400K. Call 725.239.9950.",
  }
}

const heroHeadline = 'The Lakes\nHomes For Sale'
const heroSubheadline = "Las Vegas's original waterfront community — built around a 320-acre artificial lake in the heart of the city, with lakefront paths, private beach clubs, and homes that command water views from just about every street."

export default function TheLakesPage() {
  return (
    <main>
      <div className="breadcrumb">
        <div className="breadcrumb-inner">
          <Link href="/">Home</Link>
          <span className="breadcrumb-sep">›</span>
          <a href="/#communities">Communities</a>
          <span className="breadcrumb-sep">›</span>
          <span>The Lakes</span>
        </div>
      </div>

      {/* HERO */}
      <header id="hero" className="the-lakes-hero">
        <div className="hero-bg" />
        <div className="hero-overlay" />
        <div className="hero-content summerlin">
          <div className="container">
            <p className="hero-eyebrow-sm">Las Vegas, Nevada</p>
            <div className="hero-rule" />
            <h1>{heroHeadline.split('\n').map((line, i) => (
              <span key={i}>{line}{i < heroHeadline.split('\n').length - 1 && <br />}</span>
            ))}</h1>
            <p className="hero-sub">{heroSubheadline}</p>
            <div className="hero-stats">
              <div className="hero-stat"><span className="hero-stat-num">200+</span><span className="hero-stat-lbl">Active Listings</span></div>
              <div className="hero-stat"><span className="hero-stat-num">$400K–$2M+</span><span className="hero-stat-lbl">Price Range</span></div>
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
            <h2>Where is The Lakes?</h2>
            <p>Located in west-central Las Vegas — close to Summerlin Parkway and the Suncoast Casino, roughly 15 minutes from the Strip.</p>
          </div>
          <div style={{ height: '420px', borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid var(--border)' }}>
            <CommunityMapWrapper
              center={[-115.237, 36.147]}
              zoom={13}
              boundary={[[-115.26,36.16],[-115.22,36.16],[-115.21,36.15],[-115.21,36.13],[-115.22,36.12],[-115.25,36.12],[-115.27,36.13],[-115.27,36.15],[-115.26,36.16]]}
              name="The Lakes"
              subtitle="Las Vegas, Nevada"
              id="the-lakes-map"
            />
          </div>
          <div className="drive-time-grid">
            {[
              ['~15 min', 'to the Strip', 'via Summerlin Pkwy → I-15'],
              ['~10 min', 'to Summerlin', 'via Charleston Blvd'],
              ['~20 min', 'to Downtown Las Vegas', 'via US-95'],
              ['~20 min', 'to Harry Reid Airport', 'via I-215 South'],
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
            <h2>New The Lakes Listings</h2>
            <p>The latest homes listed in The Lakes community — houses, condos, and townhomes with water views starting at $400K.</p>
          </div>
          <div className="ylopo-wrap">
            <div className="YLOPO_resultsWidget" data-search='{"propertyTypes":["house","condo","townhouse"],"minPrice":400000,"locations":[{"city":"The Lakes","state":"NV"}],"limit":12}'></div>
          </div>
          <p className="ylopo-note">Listing data sourced from regional MLS. Information deemed reliable but not guaranteed. Updated daily.</p>
          <div className="listings-actions">
            <a href="https://search.nevadarealestategroup.net/search?s[orderBy]=sourceCreationDate%2Cdesc&s[page]=1&s[locations][0][city]=The+Lakes&s[locations][0][state]=NV" target="_blank" rel="noopener noreferrer" className="btn-gold">View All The Lakes Listings →</a>
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
              <h2>The Lakes: Las Vegas&apos;s Original Waterfront Community</h2>
              <p>The Lakes is one of Las Vegas&apos;s oldest and most distinctive master-planned communities — built in the late 1980s around a series of man-made lakes totaling about 320 acres of open water in the west-central part of the city. At a time when every other Las Vegas subdivision was a grid of stucco on flat desert, The Lakes was doing something genuinely different: building a community around water.</p>
              <p>The centerpiece is the Beach Club at The Lakes — a private facility for community residents with swimming, paddle sports, and direct lake access. A lakefront jogging and cycling path loops around the main lake, and it&apos;s not uncommon to see residents out at sunrise feeding ducks or watching the water catch the morning light from the Spring Mountains.</p>
              <p>The location is one of The Lakes&apos; underrated strengths. It sits in the sweet spot between Summerlin and the Strip — close enough to the Suncoast Casino and Summerlin Parkway to feel convenient, but without the price premium that comes with a Summerlin address. Professionals who need to stay close to the valley&apos;s employment centers consistently find The Lakes a better value than comparable waterfront addresses further west.</p>
              <p>Mature trees — rare in a Las Vegas suburb — line many of the streets, and the community&apos;s age gives it a settled, established character that newer developments can&apos;t replicate. For buyers who want distinctive, Las Vegas at its most livable, The Lakes delivers.</p>
            </div>
            <div className="overview-aside">
              <div className="quick-facts">
                <h3>The Lakes At a Glance</h3>
                {[
                  ['Location', 'West Las Vegas, NV'],
                  ['Water', '320-acre lake system'],
                  ['Built', 'Late 1980s'],
                  ['Min Price', '$400K', 'gold'],
                  ['HOA', '$70–$160/mo'],
                  ['Beach Club', 'Private (residents only)'],
                  ['Nearby Casino', 'Suncoast Hotel & Casino'],
                  ['Distance to Strip', '~15 min'],
                  ['Distance to Summerlin', '~10 min'],
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
                <p>Ready to explore The Lakes? Let&apos;s schedule a private tour of the community and the listings that match your goals.</p>
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
            <span className="section-label">Why The Lakes</span>
            <h2>What Sets The Lakes Apart</h2>
            <p>A 320-acre lake system, private beach club, and central location — here&apos;s why buyers keep choosing The Lakes.</p>
          </div>
          <div className="highlights-grid">
            {[
              { icon: '🌊', title: '320-Acre Lake System', body: "Las Vegas's original man-made waterfront — 320 acres of open water in the middle of the city. Most streets in The Lakes have direct or partial water views, which is genuinely rare in any Las Vegas community at this price point." },
              { icon: '🏖️', title: 'Private Beach Club', body: 'The Beach Club at The Lakes is a private facility exclusively for community residents. Swimming, paddle sports, and direct lake access — the kind of amenity you&apos;d expect in a coastal market, not a desert suburb.' },
              { icon: '🚶', title: 'Lakefront Walking Path', body: "A dedicated path loops around the main lake — popular with joggers, cyclists, dog walkers, and families at all hours. It's the kind of daily-use infrastructure that genuinely improves quality of life." },
              { icon: '📍', title: 'Central Las Vegas Location', body: "The Lakes sits at a practical crossroads — close to Summerlin Parkway, the Suncoast Casino, and major retail on Charleston and Sahara. Everything in the valley is 20 minutes or less without paying Summerlin prices." },
              { icon: '🌳', title: 'Mature Trees & Established Feel', body: "Planted in the late 1980s, the trees throughout The Lakes have had 35+ years to mature. Walking through the community feels dramatically different from a newer Las Vegas suburb — shaded streets are a genuine amenity here." },
              { icon: '🏘️', title: 'Strong Community Identity', body: "The Lakes has a neighborhood feel that many larger Las Vegas communities struggle to achieve. The beach club, the lakefront path, and the physical layout of the community naturally draw residents together in a way that pure-HOA communities don&apos;t." },
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
            <h2>Neighborhoods Within The Lakes</h2>
            <p>From lakefront estate sections to more accessible attached communities — The Lakes has options at multiple price points.</p>
          </div>
          <div className="villages-grid">
            {[
              { name: 'The Point', type: 'Lakefront · Premium', desc: 'Prime lakefront positions with direct water access. Larger lot sizes and some of the most sought-after addresses within the community.', price: 'From $700K' },
              { name: 'Lakeview Estates', type: 'Lake Views · Established', desc: 'Spacious single-family homes with strong lake sightlines. A mix of custom and semi-custom builds from the original development phase.', price: 'From $600K' },
              { name: 'Bayside', type: 'Family · Single-Family', desc: 'Well-established single-family neighborhood within walking distance of the beach club and lake path. A consistent value within The Lakes.', price: 'From $450K' },
              { name: 'Lakeside', type: 'Established · Mid-Range', desc: 'One of the larger sub-neighborhoods in The Lakes. Good lot sizes, consistent HOA maintenance, and proximity to the main lake amenities.', price: 'From $500K' },
              { name: 'Shoreline', type: 'Walkable · Community', desc: 'Well-positioned relative to the lakefront path with a mix of floor plans. Popular with buyers who prioritize walkable access to water over direct lake views.', price: 'From $475K' },
              { name: 'Beach Club Estates', type: 'Premium · Private Access', desc: 'The most exclusive section of The Lakes — immediate adjacency to the Beach Club with the community&apos;s best combination of lake views and amenity access.', price: 'From $800K' },
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
              <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&h=600&q=80" alt="Waterfront living in The Lakes community, Las Vegas" />
            </div>
            <div className="lifestyle-content">
              <span className="section-label">Waterfront Living</span>
              <div className="gold-rule" />
              <h2>320 Acres of Open Water in the Middle of Las Vegas</h2>
              <p>The Lakes was built around a premise that still feels surprising today: you can have genuine waterfront living in the Nevada desert, minutes from the city center. The lake system is real, the water sports are real, and the evening walks around the lake are exactly what they sound like.</p>
              <p>Residents have access to the Beach Club, the lakefront path, and the kind of daily outdoor life that most Las Vegas neighborhoods don&apos;t offer. The Suncoast Casino next door provides dining and entertainment without the Strip commute.</p>
              <div className="lifestyle-bullets">
                {[
                  '320-acre man-made lake system — the original Las Vegas waterfront community',
                  'Private Beach Club for residents — swimming, kayaking, paddle boarding',
                  'Lakefront jogging and cycling path — loops around the main lake',
                  'Suncoast Hotel & Casino adjacent — dining, movies, bowling',
                  'Summerlin Parkway access — Red Rock Canyon 15 minutes west',
                  'Mature tree canopy throughout — dramatically different from newer LV suburbs',
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
            <h2>Schools Serving The Lakes Families</h2>
            <p>The Lakes is zoned to CCSD schools in west Las Vegas, with private options nearby.</p>
          </div>
          <div className="schools-layout">
            <div className="school-group">
              <h3>Public Schools (CCSD)</h3>
              {[
                ['Derfelt Elementary School', 'K–5'],
                ['Hyde Park Middle School', '6–8'],
                ['Cimarron-Memorial High School', '9–12'],
                ['Multiple CCSD Elementary Options', 'K–5'],
              ].map(([n, g]) => (
                <div className="school-item" key={n}>{n}<span className="school-grades">{g}</span></div>
              ))}
            </div>
            <div className="school-group">
              <h3>Private &amp; Charter Nearby</h3>
              {[
                ['Bishop Gorman High School', 'Catholic · 9–12'],
                ['Faith Lutheran Middle & High', '6–12'],
                ['The Meadows School', 'PreK–12'],
                ['Merryhill School', 'PreK–5'],
              ].map(([n, g]) => (
                <div className="school-item" key={n}>{n}<span className="school-grades">{g}</span></div>
              ))}
            </div>
            <div className="school-group">
              <h3>Charter &amp; Magnet</h3>
              {[
                ['West Career & Technical Academy', '9–12'],
                ['Advanced Technologies Academy', '9–12'],
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
        title="The Lakes Las Vegas — Common Questions"
        subtitle="Answers to what buyers most often ask about The Lakes community."
        faqs={[
          {
            q: "What is The Lakes community in Las Vegas?",
            a: "The Lakes is a master-planned community in west-central Las Vegas built in the late 1980s around a 320-acre man-made lake system. It's one of Las Vegas's oldest and most distinctive communities, known for its waterfront paths, private beach club, and mature landscaping. It sits between Summerlin and the Strip, making it a practical choice for buyers who want character and a central location."
          },
          {
            q: "Is The Lakes beach club open to the public?",
            a: "No — the Beach Club at The Lakes is a private amenity exclusively for community residents. It provides access to the lake for swimming and paddle sports, as well as club facilities. Access is tied to HOA membership, not separately purchased."
          },
          {
            q: "What water activities are available at The Lakes?",
            a: "Residents have access to the lake via the Beach Club, which supports kayaking, paddle boarding, and swimming. The lakefront path that loops around the main lake is open to all residents for walking, jogging, and cycling. Fishing is also popular on the lake."
          },
          {
            q: "How does The Lakes compare to Desert Shores in price?",
            a: "The Lakes and Desert Shores are the two primary waterfront master-planned communities in Las Vegas proper, and they compete for similar buyers. The Lakes tends to run slightly higher on entry-level homes due to its more central location and the Beach Club amenity. Both communities offer genuine lakefront living — the choice often comes down to specific sub-neighborhood and view quality."
          },
          {
            q: "How long is the commute from The Lakes to the Strip?",
            a: "Most addresses in The Lakes are 12–18 minutes from the Strip via Summerlin Parkway to I-15. It's one of the community's practical advantages — you get lakefront living without the 25–30 minute drive that Summerlin addresses require."
          },
          {
            q: "What are the HOA fees in The Lakes?",
            a: "HOA fees in The Lakes typically run $70–$160 per month depending on the specific sub-neighborhood and property type. These cover common area maintenance, the lakefront path, and community amenities including the Beach Club. Some sub-neighborhoods have additional sub-association fees on top of the master HOA."
          },
        ]}
      />

      {/* CTA */}
      <section id="cta">
        <div className="container">
          <h2>Ready to Find Your Home at The Lakes?</h2>
          <p>Las Vegas&apos;s original waterfront community — genuine lake views, a private beach club, and a central location that newer communities can&apos;t replicate.</p>
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
