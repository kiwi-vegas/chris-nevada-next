import CommunityFAQ from '@/components/CommunityFAQ'
import CommunityMapWrapper from '@/components/CommunityMapWrapper'
import Link from 'next/link'
import type { Metadata } from 'next'

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'MacDonald Highlands Homes For Sale | Nevada Real Estate Group',
    description: "Browse MacDonald Highlands homes for sale in Henderson, NV. Guard-gated hillside estates with panoramic Las Vegas Strip views, anchored by DragonRidge Country Club. 100+ active listings from $1.5M to $15M+. Call 725.239.9950.",
  }
}

const heroHeadline = 'MacDonald Highlands\nHomes For Sale'
const heroSubheadline = "Henderson's most exclusive address — guard-gated hillside estates with panoramic Las Vegas Strip and valley views, anchored by DragonRidge Country Club and the Tom Fazio-designed championship course."

const macdonaldFaqs = [
  {
    q: 'How much does DragonRidge Country Club membership cost, and how do I join?',
    a: 'DragonRidge membership is available exclusively to residents and invited guests of MacDonald Highlands. Initiation fees and annual dues are structured by membership tier — golf, social, and full-equity options exist. Your real estate agent can provide an introduction to the club membership office during your purchase process. Membership is not automatic with home purchase but is strongly encouraged and is a primary driver of community value.',
  },
  {
    q: 'How does MacDonald Highlands compare to The Ridges in Summerlin?',
    a: 'Both are top-tier guard-gated communities with custom estate architecture and spectacular views. MacDonald Highlands sits at a higher elevation with more dramatic, unobstructed Strip panoramas and anchors around a private golf club. The Ridges is part of the larger Summerlin master plan on the west side of the valley with Red Rock Canyon access. MacDonald Highlands tends to attract buyers who prioritize the view, the golf club, and maximum security; The Ridges appeals to buyers who want Summerlin\'s broader amenity network. Both start at similar price points.',
  },
  {
    q: 'What is the minimum price to buy in MacDonald Highlands?',
    a: 'Entry-level attached luxury villas and smaller single-family homes in the community start around $1.5M. Custom hillside estates on the upper ridgeline with the most expansive Strip views typically range from $3M to $15M+. The market is consistently active at the $2M–$5M range for well-appointed single-family homes.',
  },
  {
    q: 'Is a view of the Las Vegas Strip guaranteed from every home?',
    a: 'MacDonald Highlands is intentionally sited on the ridgeline southeast of Henderson, and the overwhelming majority of homes in the community have direct Strip and valley views. However, view quality varies by elevation, lot position, and specific siting. Lower lots and attached villa products may have partial or neighboring roofline views rather than full Strip panoramas. Always confirm the specific view from the property during daylight and evening visits — nighttime Strip views from the upper elevations are extraordinary.',
  },
  {
    q: 'Can I buy in MacDonald Highlands as a vacation home or investment property?',
    a: 'Yes. The community allows primary, secondary, and investment ownership. Many buyers purchase as a primary residence; others use the property seasonally given Nevada\'s favorable tax environment. Short-term rentals (Airbnb/VRBO) are generally restricted by HOA CC&Rs in this community. Confirm current rental policy with your agent and review HOA documents during escrow.',
  },
  {
    q: 'What are the HOA fees and typical maintenance costs?',
    a: 'HOA fees in MacDonald Highlands vary by sub-neighborhood and product type, generally ranging from $300–$800/month depending on the specific enclave. These fees cover 24/7 guard-gated security, common area landscaping and maintenance, and shared amenity upkeep. Custom estate homes on larger lots also carry higher personal maintenance costs — pools, landscaping, and HVAC systems at this price point require professional service. Budget accordingly during your due diligence.',
  },
]

export default function MacdonaldHighlandsPage() {
  return (
    <main>
      <div className="breadcrumb">
        <div className="breadcrumb-inner">
          <Link href="/">Home</Link>
          <span className="breadcrumb-sep">›</span>
          <a href="/#communities">Communities</a>
          <span className="breadcrumb-sep">›</span>
          <span>MacDonald Highlands</span>
        </div>
      </div>

      {/* HERO */}
      <header id="hero" className="macdonald-highlands-hero">
        <div className="hero-bg" />
        <div className="hero-overlay" />
        <div className="hero-content summerlin">
          <div className="container">
            <p className="hero-eyebrow-sm">Henderson, Nevada</p>
            <div className="hero-rule" />
            <h1>{heroHeadline.split('\n').map((line: string, i: number) => (
              <span key={i}>{line}{i < heroHeadline.split('\n').length - 1 && <br />}</span>
            ))}</h1>
            <p className="hero-sub">{heroSubheadline}</p>
            <div className="hero-stats">
              <div className="hero-stat"><span className="hero-stat-num">100+</span><span className="hero-stat-lbl">Active Listings</span></div>
              <div className="hero-stat"><span className="hero-stat-num">$1.5M–$15M+</span><span className="hero-stat-lbl">Price Range</span></div>
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
            <h2>Where is MacDonald Highlands?</h2>
            <p>Located on the elevated ridgeline southeast of Henderson — a natural amphitheater position with commanding views across the valley floor to the Las Vegas Strip.</p>
          </div>
          <div style={{ height: '420px', borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid var(--border)' }}>
            <CommunityMapWrapper
              center={[-114.977, 35.987]}
              zoom={13}
              boundary={[
                [-115.01, 36.01],
                [-114.97, 36.01],
                [-114.94, 36.00],
                [-114.93, 35.98],
                [-114.94, 35.96],
                [-114.97, 35.95],
                [-115.01, 35.96],
                [-115.02, 35.98],
                [-115.01, 36.01],
              ]}
              name="MacDonald Highlands"
              subtitle="Henderson, Nevada"
              id="macdonald-highlands-map"
            />
          </div>
          <div className="drive-time-grid">
            {[
              ['~20 min', 'to the Strip', 'via I-215 W → I-15'],
              ['~10 min', 'to Henderson', 'via Lake Mead Pkwy'],
              ['~25 min', 'to Harry Reid Airport', 'via I-215'],
              ['~15 min', 'to Lake Mead', 'via Lake Mead Dr E'],
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
            <h2>New MacDonald Highlands Listings</h2>
            <p>The latest luxury homes listed in MacDonald Highlands — guard-gated hillside estates, custom villas, and trophy properties from $1.5M to $15M+.</p>
          </div>
          <div className="ylopo-wrap">
            <div className="YLOPO_resultsWidget" data-search='{"propertyTypes":["house","condo","townhouse"],"minPrice":1500000,"locations":[{"city":"MacDonald Highlands","state":"NV"}],"limit":12}'></div>
          </div>
          <p className="ylopo-note">Listing data sourced from regional MLS. Information deemed reliable but not guaranteed. Updated daily.</p>
          <div className="listings-actions">
            <a href="https://search.nevadarealestategroup.net/search?s[orderBy]=sourceCreationDate%2Cdesc&s[page]=1&s[locations][0][city]=MacDonald+Highlands&s[locations][0][state]=NV" target="_blank" rel="noopener noreferrer" className="btn-gold">View All MacDonald Highlands Listings →</a>
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
              <h2>Henderson&apos;s Most Exclusive Hillside Address</h2>
              <p>MacDonald Highlands sits on the elevated ridgeline southeast of Henderson, a natural amphitheater position that gives every home in the community a view down across the valley floor toward the Las Vegas Strip. The community is fully guard-gated with 24/7 staffed entry — one of the most secure residential environments in the metro.</p>
              <p>DragonRidge Country Club, designed by Tom Fazio, anchors the community with a private 18-hole course ranked among Nevada&apos;s best, plus a full-service clubhouse, resort pool, tennis courts, and fine dining. Club membership is available to residents and is a primary driver of property value — this is a genuine members-only club, not a pay-and-play operation.</p>
              <p>Real estate ranges from attached luxury villas starting around $1.5M to custom hillside estates exceeding $15M with infinity pools cantilevered over the valley. This is where entertainers, athletes, and senior executives live when they want maximum privacy, security, and the most dramatic residential views in the Las Vegas metro.</p>
            </div>
            <div className="overview-aside">
              <div className="quick-facts">
                <h3>MacDonald Highlands At a Glance</h3>
                {[
                  ['Location', 'SE Henderson, NV'],
                  ['Golf', 'DragonRidge (Tom Fazio, private)'],
                  ['Access', '24/7 Guard-Gated'],
                  ['Min Price', '$1.5M', 'gold'],
                  ['Club Dues', 'Required'],
                  ['Views', 'Las Vegas Strip'],
                  ['Property Tax Rate', '~0.6%'],
                  ['State Income Tax', 'None'],
                ].map(([label, value, cls]) => (
                  <div className="fact-row" key={label}>
                    <span className="fact-label">{label}</span>
                    <span className={`fact-value${cls ? ' ' + cls : ''}`}>{value}</span>
                  </div>
                ))}
              </div>
              <div className="cta-card">
                <p>Ready to tour MacDonald Highlands? Let&apos;s schedule a private showing of the community and the listings that match your goals.</p>
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
            <span className="section-label">Why MacDonald Highlands</span>
            <h2>The Reasons Buyers Choose MacDonald Highlands</h2>
            <p>Privacy, exclusivity, world-class golf, and the most dramatic views in the Las Vegas metro — all within a single guard-gated community.</p>
          </div>
          <div className="highlights-grid">
            {[
              { icon: '🔒', title: '24/7 Guard-Gated Security', body: "MacDonald Highlands operates one of the most secure residential environments in the Las Vegas metro. A staffed guard gate with 24/7 personnel controls all access — no drive-through traffic, no uninvited guests. This level of security is a primary reason high-profile residents choose this community." },
              { icon: '⛳', title: 'Tom Fazio Championship Golf', body: "DragonRidge Country Club's 18-hole championship course was designed by Tom Fazio — one of the most celebrated golf architects in the country. The course leverages the dramatic hillside terrain to create a layout unlike anything else in Southern Nevada. Membership is strictly private." },
              { icon: '🌆', title: 'Panoramic Las Vegas Strip Views', body: "The community's ridgeline position delivers unobstructed views across the valley floor to the Las Vegas Strip. At night, the effect is extraordinary — a glittering skyline visible from nearly every home. This view is the community's signature asset and a significant price driver." },
              { icon: '🏛️', title: 'Custom Estate Architecture', body: "Homes in MacDonald Highlands range from architect-designed custom builds on multi-acre lots to attached luxury villas in controlled sub-enclaves. No cookie-cutter production homes — every property reflects a level of design, materials, and craftsmanship consistent with the $1.5M+ price point." },
              { icon: '🎾', title: 'DragonRidge Club Amenities', body: "Beyond the golf course, DragonRidge Country Club offers a resort-style pool, fitness center, tennis courts, fine dining restaurant, and a full clubhouse. Residents gain access to a social and recreational infrastructure that rivals any private club in the Southwest." },
              { icon: '👑', title: 'Privacy and Exclusivity', body: "MacDonald Highlands is home to entertainers, professional athletes, executives, and business owners who require a level of privacy unavailable in open communities. The combination of guard-gating, elevated siting, and a small resident population creates an enclave that operates entirely on its own terms." },
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
            <span className="section-label">Sub-Enclaves</span>
            <h2>Neighborhoods Within MacDonald Highlands</h2>
            <p>Each sub-enclave within MacDonald Highlands offers a distinct product type and price point — all sharing the same 24/7 guard-gated security and DragonRidge Club access.</p>
          </div>
          <div className="villages-grid">
            {[
              { name: 'DragonRidge Estates', type: 'Custom · Golf-Frontage', desc: 'The flagship custom estate lots within MacDonald Highlands, many directly abutting the DragonRidge fairways. Architect-designed homes with the most expansive views and the largest lot sizes in the community.', price: 'From $3M+' },
              { name: 'The Ridges at MacDonald', type: 'Semi-Custom · Elevated', desc: 'Upper-ridgeline semi-custom homes with commanding Strip and valley panoramas. Larger lots, dramatic terrain, and some of the most dramatic evening views available anywhere in Henderson.', price: 'From $2M+' },
              { name: 'Bellacere', type: 'Luxury · Custom', desc: 'A boutique enclave of custom-built luxury homes within the MacDonald Highlands gates. Mature landscaping, private cul-de-sacs, and architectural diversity distinguish this sub-community.', price: 'From $1.8M+' },
              { name: 'The Summit', type: 'Ultra-Luxury · Trophy', desc: 'The highest-elevation addresses in MacDonald Highlands — reserved for the largest custom estates with the most unobstructed Strip views. Trophy properties with full-service club membership included.', price: 'From $5M+' },
              { name: 'Vista', type: 'Luxury Villas · Attached', desc: 'The entry point into MacDonald Highlands — attached luxury villa products with shared walls but full guard-gated security and club access. Ideal for buyers who want the community without full estate maintenance.', price: 'From $1.5M+' },
              { name: 'Grand Reserve', type: 'Estate · Guard-Gated', desc: 'A distinct enclave of single-family estate homes with generous lot sizes, private pool settings, and a quieter residential character within the larger MacDonald Highlands gates.', price: 'From $2.5M+' },
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
              <img src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=900&h=600&q=80" alt="Luxury estate home with pool and Las Vegas valley views" />
            </div>
            <div className="lifestyle-content">
              <span className="section-label">The MacDonald Highlands Lifestyle</span>
              <div className="gold-rule" />
              <h2>World-Class Golf, Panoramic Views, and Total Privacy</h2>
              <p>Life in MacDonald Highlands revolves around the DragonRidge Club, the community&apos;s elevated setting, and the ease of access to everything Henderson and the broader Las Vegas metro have to offer — without sacrificing a moment of privacy.</p>
              <p>Henderson Executive Airport is minutes away, making helicopter access to the Strip or private aviation straightforward. Lake Mead&apos;s recreation areas sit just to the east for boating and hiking. The Strip&apos;s world-class dining, entertainment, and sports venues are a 20-minute drive down I-215.</p>
              <div className="lifestyle-bullets">
                {[
                  'DragonRidge Country Club — Tom Fazio golf, resort pool, tennis, and fine dining',
                  'Henderson Executive Airport nearby — private aviation and helicopter access',
                  'Lake Mead National Recreation Area — 20 minutes for boating, hiking, and swimming',
                  'Las Vegas Strip — world-class dining, entertainment, and sports within 20 min',
                  'Mount Charleston — skiing, hiking, and cool elevation escapes within 45 min',
                  'Day trips to Zion, Grand Canyon, and Valley of Fire within 2–3 hours',
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
            <h2>Top Henderson Schools Serving MacDonald Highlands</h2>
            <p>MacDonald Highlands residents are zoned to some of Henderson&apos;s highest-rated public schools, with strong private options nearby.</p>
          </div>
          <div className="schools-layout">
            <div className="school-group">
              <h3>Public Schools (CCSD)</h3>
              {[
                ['John C. Vanderburg Elementary', 'K–5'],
                ['Del E. Webb Middle School', '6–8'],
                ['Liberty High School', '9–12'],
              ].map(([n, g]) => (
                <div className="school-item" key={n}>{n}<span className="school-grades">{g}</span></div>
              ))}
            </div>
            <div className="school-group">
              <h3>Private Options Nearby</h3>
              {[
                ['Pinecrest Academy of Nevada', 'PreK–12'],
                ['Henderson International School', 'PreK–8'],
                ['The Meadows School', 'PreK–12'],
              ].map(([n, g]) => (
                <div className="school-item" key={n}>{n}<span className="school-grades">{g}</span></div>
              ))}
            </div>
            <div className="school-group">
              <h3>Higher Education</h3>
              {[
                ['UNLV (Las Vegas Campus)', '~20 min'],
                ['Nevada State University', '~15 min'],
              ].map(([n, g]) => (
                <div className="school-item" key={n}>{n}<span className="school-grades">{g}</span></div>
              ))}
              <div style={{ marginTop: '24px', padding: '18px', background: 'rgba(201,168,76,0.06)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', fontSize: '13px', color: 'var(--white-70)', lineHeight: '1.7' }}>
                <strong style={{ color: 'var(--white)' }}>School Assignment Note:</strong> Zoning varies by address within Henderson. Always confirm your specific school assignment with CCSD before purchasing.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <CommunityFAQ
        title="MacDonald Highlands — Frequently Asked Questions"
        subtitle="Answers to the most common questions from buyers considering MacDonald Highlands."
        faqs={macdonaldFaqs}
      />

      {/* CTA */}
      <section id="cta">
        <div className="container">
          <h2>Ready to Find Your MacDonald Highlands Estate?</h2>
          <p>Henderson&apos;s most exclusive guard-gated address — panoramic Strip views, Tom Fazio golf, and a level of privacy the rest of the metro simply can&apos;t offer.</p>
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
