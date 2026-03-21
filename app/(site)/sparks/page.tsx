import CommunityFAQ from '@/components/CommunityFAQ'
import CommunityMapWrapper from '@/components/CommunityMapWrapper'
import Link from 'next/link'
import type { Metadata } from 'next'

export const revalidate = 60

export function generateMetadata(): Metadata {
  return {
    title: 'Sparks NV Homes For Sale | Nevada Real Estate Group',
    description: "Browse Sparks, NV homes for sale. Reno's twin city — Tesla Gigafactory proximity, Sparks Marina, Victorian Square, master-planned communities. 800+ listings from $300K to $2M+. Call 725.239.9950.",
  }
}

export default function SparksPage() {
  const heroHeadline = 'Sparks, NV\nHomes For Sale'
  const heroSubheadline = "Reno's twin city — an independent Nevada municipality east of Reno with its own downtown, the Tesla Gigafactory in its backyard, a booming job market, and newer master-planned communities that rival anything in the valley."

  return (
    <main>
      <div className="breadcrumb">
        <div className="breadcrumb-inner">
          <Link href="/">Home</Link>
          <span className="breadcrumb-sep">›</span>
          <a href="/#communities">Communities</a>
          <span className="breadcrumb-sep">›</span>
          <span>Sparks</span>
        </div>
      </div>

      {/* HERO */}
      <header id="hero" className="sparks-hero">
        <div className="hero-bg" />
        <div className="hero-overlay" />
        <div className="hero-content summerlin">
          <div className="container">
            <p className="hero-eyebrow-sm">Sparks, Nevada</p>
            <div className="hero-rule" />
            <h1>{heroHeadline.split('\n').map((line, i) => (
              <span key={i}>{line}{i < heroHeadline.split('\n').length - 1 && <br />}</span>
            ))}</h1>
            <p className="hero-sub">{heroSubheadline}</p>
            <div className="hero-stats">
              <div className="hero-stat"><span className="hero-stat-num">800+</span><span className="hero-stat-lbl">Active Listings</span></div>
              <div className="hero-stat"><span className="hero-stat-num">$300K–$2M+</span><span className="hero-stat-lbl">Price Range</span></div>
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
            <h2>Where is Sparks?</h2>
            <p>Located directly east of Reno along the I-80 corridor — an independent city with its own downtown, marina, and growing master-planned communities on the south and east sides.</p>
          </div>
          <div style={{ height: '420px', borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid var(--border)' }}>
            <CommunityMapWrapper
              center={[-119.752, 39.534]}
              zoom={12}
              boundary={[[-119.82,39.58],[-119.77,39.59],[-119.71,39.58],[-119.67,39.55],[-119.67,39.51],[-119.71,39.48],[-119.77,39.47],[-119.83,39.49],[-119.85,39.53],[-119.82,39.58]]}
              name="Sparks"
              subtitle="Washoe County, Nevada"
              id="sparks-map"
            />
          </div>
          <div className="drive-time-grid">
            {[
              ['~10 min', 'to Downtown Reno', 'via I-80 W'],
              ['~20 min', 'to Tesla Gigafactory', 'via I-80 E → NV-341'],
              ['~25 min', 'to Spanish Springs', 'via Vista Blvd N'],
              ['~65 min', 'to Lake Tahoe', 'via I-80 W → NV-431'],
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
            <h2>New Sparks Listings</h2>
            <p>The latest homes listed in Sparks — from Victorian Square townhomes to master-planned family communities and luxury golf course estates.</p>
          </div>
          <div className="ylopo-wrap">
            <div className="YLOPO_resultsWidget" data-search='{"propertyTypes":["house","condo","townhouse"],"minPrice":300000,"locations":[{"city":"Sparks","state":"NV"}],"limit":12}'></div>
          </div>
          <p className="ylopo-note">Listing data sourced from regional MLS. Information deemed reliable but not guaranteed. Updated daily.</p>
          <div className="listings-actions">
            <a href="https://search.nevadarealestategroup.net/search?s[orderBy]=sourceCreationDate%2Cdesc&s[page]=1&s[locations][0][city]=Sparks&s[locations][0][state]=NV" target="_blank" rel="noopener noreferrer" className="btn-gold">View All Sparks Listings →</a>
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
              <h2>Sparks: Nevada&apos;s Most Economically Dynamic City</h2>
              <p>Sparks is a fully independent city of 110,000 people directly east of Reno — often mistaken for a suburb but operating with its own mayor, city council, police department, and economic development strategy. That strategy is paying off: the Tesla Gigafactory (in adjacent Storey County, but Sparks is the closest residential hub), several other major manufacturers, and the Legends at Sparks Marina retail and dining complex have transformed Sparks from Reno&apos;s industrial neighbor into one of Nevada&apos;s most economically dynamic cities.</p>
              <p>Victorian Square in downtown Sparks hosts year-round events — Hot August Nights, Sparks Hometowne Christmas, and the Best in the West Nugget Rib Cook-Off draw visitors from across the region. The Sparks Marina — a flooded gravel pit turned 77-acre recreational lake — anchors the midtown area with swimming, paddleboarding, and lakeside dining that has no equivalent in Reno.</p>
              <p>Newer master-planned communities in the south and east — South Meadows, Wingfield Springs, Sparks Highlands — offer large homes at prices that consistently undercut comparable Reno addresses by 5–15%. For buyers who value new construction, community amenities, and Tesla-corridor job proximity over downtown Reno&apos;s urban character, Sparks is the stronger value proposition.</p>
              <p>No state income tax. I-80 access connects to Reno in 10 minutes. The employment base — manufacturing, logistics, tech infrastructure — is among the most diversified in the Truckee Meadows and growing faster than any comparable Nevada city outside Las Vegas.</p>
            </div>
            <div className="overview-aside">
              <div className="quick-facts">
                <h3>Sparks At a Glance</h3>
                {[
                  ['Status', 'Independent City'],
                  ['Population', '~110,000'],
                  ['Notable Employer', 'Tesla Gigafactory (~20 min)'],
                  ['Downtown', 'Victorian Square'],
                  ['Marina', 'Sparks Marina (77-acre lake)'],
                  ['State Income Tax', 'None'],
                  ['To Reno', '~10 min via I-80'],
                  ['To Tahoe', '~65 min via I-80 W'],
                  ['Property Tax Rate', '~0.7%'],
                  ['Median Home Price', '~$450,000'],
                ].map(([label, value]) => (
                  <div className="fact-row" key={label}>
                    <span className="fact-label">{label}</span>
                    <span className="fact-value">{value}</span>
                  </div>
                ))}
              </div>
              <div className="cta-card">
                <p>Ready to explore Sparks? Let&apos;s schedule a private tour of the neighborhoods and listings that match your goals.</p>
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
            <span className="section-label">Why Sparks</span>
            <h2>The Reasons Buyers Keep Choosing Sparks</h2>
            <p>Tesla jobs, Sparks Marina, Victorian Square, master-planned communities, and Reno pricing minus the Reno premium. Here&apos;s the case.</p>
          </div>
          <div className="highlights-grid">
            {[
              { icon: '⚡', title: 'Tesla Gigafactory Job Proximity', body: "The Tesla Gigafactory — one of the largest buildings in the world by footprint — sits in adjacent Storey County, with Sparks as the closest residential hub. The Gigafactory employs thousands directly and has seeded an entire supplier and services ecosystem. Panasonic, Switch, and dozens of tech and logistics firms have co-located, creating Sparks' most powerful demand driver." },
              { icon: '🌊', title: 'Sparks Marina — 77 Acres of Water', body: "The Sparks Marina is the metro's most surprising amenity — a 77-acre lake created from a flooded gravel pit that now hosts swimming, paddleboarding, kayaking, and lakeside restaurants. The marina trail loops the entire lake, and summer weekends see it packed with families, fitness users, and diners. Nothing like it exists in Reno." },
              { icon: '🎪', title: 'Victorian Square Year-Round Events', body: "Downtown Sparks' Victorian Square hosts some of the region's most beloved events: Hot August Nights (classic cars), the Nugget Rib Cook-Off (nationally recognized), and Sparks Hometowne Christmas. The square provides a genuine civic gathering point that drives community identity and downtown foot traffic year-round." },
              { icon: '🏗️', title: 'Newer Master-Planned Communities', body: "South Meadows, Wingfield Springs, and Sparks Highlands offer large-lot, newer-construction homes at prices that undercut comparable Reno addresses. HOA maintenance, community parks, and planned retail corridors give these neighborhoods a polished character that older Sparks addresses can't match." },
              { icon: '🏙️', title: 'Independent City Services', body: "Sparks operates its own police department, fire department, public works, and parks system. City government is accountable to 110,000 Sparks residents — not subordinated to Reno&apos;s priorities. This independence means responsive local services and an economic development focus that has produced some of Nevada's most aggressive business attraction success." },
              { icon: '💰', title: 'Below-Reno Pricing for Comparable Homes', body: "Sparks consistently offers 5–15% lower price-per-square-foot than comparable Reno neighborhoods while providing better job-proximity to the Tesla corridor, newer construction in the south and east, and the unique Sparks Marina amenity. For buyers running the numbers, Sparks frequently wins the value comparison against similar Reno listings." },
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
            <h2>Find Your Neighborhood in Sparks</h2>
            <p>From the lakeside Sparks Marina district to master-planned South Meadows — Sparks has more neighborhood variety than most buyers expect.</p>
          </div>
          <div className="villages-grid">
            {[
              { name: 'South Meadows', type: 'Master-Planned · Executive', desc: "The premier address in Sparks — a high-growth corridor on the south side with newer construction, strong schools, and major retail anchors. South Meadows consistently attracts tech workers and corporate relocations seeking the best of Sparks at executive price points.", price: 'From $550K' },
              { name: 'Wingfield Springs', type: 'Golf · Master-Planned', desc: "A large master-planned community centered on Wingfield Springs Golf Course. Well-maintained HOA, parks, trails, and a mix of housing types from townhomes to large custom-adjacent single-family homes. One of the most established master-planned communities in Washoe County.", price: 'From $500K' },
              { name: 'Sparks Highlands', type: 'Elevated · Newer', desc: "Elevated communities on Sparks' southeast side with views across the Truckee Meadows toward the Virginia Range. Newer construction, larger lots, and a quieter character than the flatlands. Popular with buyers seeking Sparks pricing with a Caughlin Ranch aesthetic.", price: 'From $600K' },
              { name: 'Victorian Square', type: 'Downtown · Urban', desc: "The historic core of downtown Sparks — Victorian-era commercial architecture, year-round events, the Nugget Casino Resort, and a growing residential base of condos and townhomes. The most walkable and urban Sparks address, with the marina a short walk away.", price: 'From $380K' },
              { name: 'Sparks Marina District', type: 'Lakeside · Lifestyle', desc: "Residential neighborhoods surrounding the 77-acre Sparks Marina lake — the most distinctive lifestyle address in the Reno-Sparks metro. Lakefront access, dining, and recreational amenities that drive strong demand from buyers who prioritize outdoor lifestyle.", price: 'From $400K' },
              { name: 'Los Altos', type: 'Established · Family', desc: "A well-established family neighborhood on Sparks&apos; east side with mature landscaping, good school zoning, and a quieter residential character. Strong resale liquidity and consistent demand from families seeking established neighborhoods at Sparks price points.", price: 'From $450K' },
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
              <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=900&h=600&q=80" alt="Active outdoor lifestyle near Sparks, Nevada" />
            </div>
            <div className="lifestyle-content">
              <span className="section-label">Recreation & Community</span>
              <div className="gold-rule" />
              <h2>The Marina, Victorian Square, and Quick Access to Sierra Nevada Recreation</h2>
              <p>Sparks surprises people. The Sparks Marina — a 77-acre lake with a paved loop trail, sandy swimming areas, paddleboard rentals, and lakeside restaurants — is the kind of urban recreational amenity that entire cities build their identity around. For Sparks residents, it&apos;s a Tuesday evening walk.</p>
              <p>Victorian Square&apos;s event calendar keeps downtown alive year-round. Hot August Nights draws classic car enthusiasts from across the West every August. The Nugget Rib Cook-Off is a legitimate food event. The Sparks Hometowne Christmas parade anchors December. For a city of 110,000, the event density is remarkable.</p>
              <div className="lifestyle-bullets">
                {[
                  'Sparks Marina — 77-acre lake with swimming, paddleboarding, trail, and lakeside dining',
                  'Victorian Square — year-round events including Hot August Nights and Nugget Rib Cook-Off',
                  'Wingfield Springs Golf Course — 18-hole course within the community',
                  'I-80 west — 10 min to downtown Reno arts, dining, and Truckee River WhiteWater Park',
                  'Tesla Gigafactory — employment anchor and economic driver for the east valley',
                  'Lake Tahoe day trips — 65 min via I-80 west for skiing, boating, and hiking',
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
            <h2>Schools Serving Sparks Families</h2>
            <p>Washoe County School District schools serving one of Nevada&apos;s fastest-growing cities.</p>
          </div>
          <div className="schools-layout">
            <div className="school-group">
              <h3>Public High Schools (WCSD)</h3>
              {[
                ['Spanish Springs High School', '9–12'],
                ['Reed High School', '9–12'],
                ['Hug High School', '9–12'],
                ['Sparks High School', '9–12'],
                ['Multiple WCSD Middle & Elementary', 'K–8'],
              ].map(([n, g]) => (
                <div className="school-item" key={n}>{n}<span className="school-grades">{g}</span></div>
              ))}
            </div>
            <div className="school-group">
              <h3>Charter &amp; Magnet</h3>
              {[
                ['Coral Academy of Science (Sparks)', 'K–12'],
                ['Sepulveda Elementary', 'K–5'],
                ['Shaw Middle School', '6–8'],
                ['NOVA Academy', 'K–8'],
              ].map(([n, g]) => (
                <div className="school-item" key={n}>{n}<span className="school-grades">{g}</span></div>
              ))}
            </div>
            <div className="school-group">
              <h3>Private Options (Reno, ~10 min)</h3>
              {[
                ['Davidson Academy', '6–12'],
                ['Bishop Manogue Catholic HS', '9–12'],
                ['Sage Ridge School', 'K–12'],
                ['Coral Academy of Science (Reno)', 'K–12'],
              ].map(([n, g]) => (
                <div className="school-item" key={n}>{n}<span className="school-grades">{g}</span></div>
              ))}
              <div style={{ marginTop: '24px', padding: '18px', background: 'rgba(201,168,76,0.06)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', fontSize: '13px', color: 'var(--white-70)', lineHeight: '1.7' }}>
                <strong style={{ color: 'var(--white)' }}>School Assignment Note:</strong> School zoning varies by Sparks neighborhood. South Meadows and Spanish Springs-adjacent areas feed into some of Washoe County&apos;s highest-performing schools. Always confirm your specific assignment before purchasing.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <CommunityFAQ
        title="Sparks Real Estate — Frequently Asked Questions"
        subtitle="The most common questions buyers ask when comparing Sparks to Reno and evaluating the Gigafactory effect."
        faqs={[
          {
            q: "How much cheaper is Sparks than Reno?",
            a: "Sparks typically runs 5–15% less per square foot than comparable Reno neighborhoods. South Meadows in Sparks and South Meadows in Reno are often compared directly — Sparks addresses in the same development consistently come in below equivalent Reno-side prices. The gap is narrower in master-planned communities and wider in central/downtown comparisons. For buyers running the math, Sparks often delivers more home for the same budget."
          },
          {
            q: "What is the Tesla Gigafactory's impact on Sparks property values?",
            a: "Significant and ongoing. The Gigafactory and the broader Tahoe Reno Industrial Center have created thousands of well-paying manufacturing and tech jobs accessible from Sparks in 20 minutes. This employment anchor has driven population growth, rental demand, and sustained price appreciation in east Sparks and South Meadows neighborhoods. As the Gigafactory expands and additional employers co-locate, the employment base supporting Sparks housing demand continues to strengthen."
          },
          {
            q: "What is the Sparks Marina neighborhood like?",
            a: "The Sparks Marina is genuinely one of the Reno metro's most distinctive lifestyle amenities — a 77-acre lake with swimming areas, paddleboard rentals, a paved 2.5-mile loop trail, and lakeside restaurants including a dedicated marina-view dining area. Residential properties near the marina command a modest premium but provide access to the kind of waterfront lifestyle that simply doesn't exist elsewhere in northern Nevada. Families, fitness enthusiasts, and remote workers particularly value the proximity."
          },
          {
            q: "What are the best new construction communities in Sparks?",
            a: "South Meadows and Sparks Highlands currently have the most active new construction. Several regional and national builders maintain active subdivisions with 2023–2025 construction standards — open floor plans, energy-efficient systems, smart home features, and three-car garages. For buyers wanting new construction without the Reno price premium, these communities consistently deliver strong value."
          },
          {
            q: "Is Sparks safe?",
            a: "Sparks' overall crime rates are comparable to Reno — both are mid-range Western cities. The master-planned communities (South Meadows, Wingfield Springs, Sparks Highlands) have lower crime rates than the Sparks metro average, driven by HOA standards, newer housing stock, and a more homogeneous residential character. Victorian Square and older downtown Sparks have higher activity levels typical of urban cores. The south and east side communities that most buyers are considering are safe, family-appropriate neighborhoods."
          },
          {
            q: "How does the commute from Sparks to Reno actually work?",
            a: "I-80 West connects Sparks to downtown Reno in approximately 10 minutes under normal conditions. Traffic peaks are moderate by California standards — even the worst Reno-Sparks rush hour rarely exceeds 20–25 minutes for the full cross-town commute. Many Sparks residents work in Sparks or the I-80 corridor and don't commute to Reno at all. For buyers accustomed to Bay Area or Los Angeles commutes, the Sparks-Reno commute is a non-issue."
          },
        ]}
      />

      {/* CTA */}
      <section id="cta">
        <div className="container">
          <h2>Ready to Find Your Sparks Home?</h2>
          <p>Reno&apos;s twin city — Tesla job proximity, the Sparks Marina, Victorian Square, master-planned communities, and prices that consistently beat comparable Reno addresses.</p>
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
