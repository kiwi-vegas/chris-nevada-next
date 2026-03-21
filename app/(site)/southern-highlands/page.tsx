import CommunityFAQ from '@/components/CommunityFAQ'
import CommunityMapWrapper from '@/components/CommunityMapWrapper'
import Link from 'next/link'
import type { Metadata } from 'next'

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Southern Highlands Homes For Sale | Nevada Real Estate Group',
    description: 'Browse Southern Highlands homes for sale. Las Vegas\'s most prestigious gated master-planned community — private golf club, guard-gated enclaves, 15 min to airport. 300+ active listings from $500K. Call 725.239.9950.',
  }
}

const boundary: [number, number][] = [
  [-115.24, 36.03],
  [-115.18, 36.03],
  [-115.15, 36.02],
  [-115.14, 35.97],
  [-115.15, 35.95],
  [-115.20, 35.95],
  [-115.26, 35.97],
  [-115.26, 36.01],
  [-115.24, 36.03],
]

const faqs = [
  {
    q: 'Is Southern Highlands a gated community?',
    a: 'Yes — Southern Highlands is a guard-gated master-planned community with multiple guard-gated enclaves within the larger development. The community has 24-hour security at primary access points, and several of the premium sub-communities (like Vista Encanto and Regency) have their own secondary guard gates for an additional level of privacy.',
  },
  {
    q: 'How does Southern Highlands Golf Club membership work?',
    a: 'Southern Highlands Golf Club is a private member club featuring an Arnold Palmer-designed championship course. Membership is by application and involves initiation fees and annual dues — it is not automatically included with home purchase. However, living in Southern Highlands gives residents priority access to the membership waitlist. Contact us for current membership information.',
  },
  {
    q: 'What is the price range for Southern Highlands homes?',
    a: 'Southern Highlands homes range from approximately $500,000 for smaller single-family homes and townhomes in entry communities like Emerald, up to $5M+ for custom estates in Vista Encanto and premium hillside addresses. The median falls in the $700K–$1.2M range depending on size, lot, and sub-community.',
  },
  {
    q: 'How does Southern Highlands compare to Summerlin?',
    a: 'Both are prestigious master-planned communities, but they have distinct characters. Summerlin is larger (22,500 acres vs. roughly 2,200 for Southern Highlands), has more established retail (Downtown Summerlin), and sits against Red Rock Canyon. Southern Highlands is more intimate, more uniformly upscale, features a private golf club, and is positioned much closer to the airport — a significant advantage for frequent travelers and executives. Southern Highlands also tends to offer more guard-gating per dollar spent.',
  },
  {
    q: 'How long is the commute from Southern Highlands to the Strip?',
    a: 'From most Southern Highlands addresses to the Las Vegas Strip is approximately 20–25 minutes via I-15 North. To Harry Reid International Airport is approximately 15 minutes — one of the shortest airport commutes of any upscale Las Vegas community. This proximity to the airport is a consistent draw for business travelers and executives.',
  },
  {
    q: 'Is Southern Highlands a good investment?',
    a: 'Southern Highlands has demonstrated strong investment fundamentals — guard-gated prestige, private golf club anchoring, limited land available for new development, and consistent executive-level demand. The community has held value well through market cycles and benefits from being perceived as one of Las Vegas\'s most prestigious addresses. The airport proximity also makes it popular with short-term rental investors in appropriate zones.',
  },
]

export default function SouthernHighlandsPage() {
  const heroHeadline = 'Southern Highlands\nHomes For Sale'
  const heroSubheadline = "Las Vegas's most livable zip code — a prestigious master-planned community with a private golf club, guard-gated enclaves, and a price-per-square-foot that would stun any California buyer."

  return (
    <main>
      <div className="breadcrumb">
        <div className="breadcrumb-inner">
          <Link href="/">Home</Link>
          <span className="breadcrumb-sep">›</span>
          <a href="/#communities">Communities</a>
          <span className="breadcrumb-sep">›</span>
          <span>Southern Highlands</span>
        </div>
      </div>

      {/* HERO */}
      <header id="hero" className="southern-highlands-hero">
        <div className="hero-bg" />
        <div className="hero-overlay" />
        <div className="hero-content summerlin">
          <div className="container">
            <p className="hero-eyebrow-sm">South Las Vegas, Nevada</p>
            <div className="hero-rule" />
            <h1>{heroHeadline.split('\n').map((line, i) => (
              <span key={i}>{line}{i < heroHeadline.split('\n').length - 1 && <br />}</span>
            ))}</h1>
            <p className="hero-sub">{heroSubheadline}</p>
            <div className="hero-stats">
              <div className="hero-stat"><span className="hero-stat-num">300+</span><span className="hero-stat-lbl">Active Listings</span></div>
              <div className="hero-stat"><span className="hero-stat-num">$500K–$5M+</span><span className="hero-stat-lbl">Price Range</span></div>
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
            <h2>Where is Southern Highlands?</h2>
            <p>Located at the southernmost edge of Las Vegas — just 15 minutes from Harry Reid Airport with direct I-15 access to Henderson and California.</p>
          </div>
          <div style={{ height: '420px', borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid var(--border)' }}>
            <CommunityMapWrapper
              center={[-115.190, 35.987]}
              zoom={12}
              boundary={boundary}
              name="Southern Highlands"
              subtitle="South Las Vegas, Nevada"
              id="southern-highlands-map"
            />
          </div>
          <div className="drive-time-grid">
            {[
              ['~20 min', 'to the Strip', 'via I-15 N'],
              ['~15 min', 'to Harry Reid Airport', 'via I-15 N → I-215 W'],
              ['~15 min', 'to Henderson', 'via I-215 E'],
              ['~2 hrs', 'to Los Angeles', 'via I-15 S'],
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
            <h2>New Southern Highlands Listings</h2>
            <p>The latest homes listed in Southern Highlands — guard-gated luxury, golf course living, and executive estates from $500K.</p>
          </div>
          <div className="ylopo-wrap">
            <div className="YLOPO_resultsWidget" data-search='{"propertyTypes":["house","condo","townhouse"],"minPrice":500000,"locations":[{"community":"Southern Highlands","city":"Las Vegas","state":"NV"}],"limit":12}'></div>
          </div>
          <p className="ylopo-note">Listing data sourced from regional MLS. Information deemed reliable but not guaranteed. Updated daily.</p>
          <div className="listings-actions">
            <a href="https://search.nevadarealestategroup.net/search?s[orderBy]=sourceCreationDate%2Cdesc&s[page]=1&s[locations][0][community]=Southern+Highlands&s[locations][0][city]=Las+Vegas&s[locations][0][state]=NV" target="_blank" rel="noopener noreferrer" className="btn-gold">View All Southern Highlands Listings →</a>
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
              <h2>Southern Highlands: Las Vegas Prestige, Without the Price Tag</h2>
              <p>Southern Highlands sits at the southernmost point of Las Vegas — quieter, more private, and more uniformly upscale than most of the valley. The community is anchored by Southern Highlands Golf Club, an Arnold Palmer championship design that gives the entire development a sense of purpose and permanence that newer Las Vegas communities often lack. The club is private, which does something important: it keeps the golf course beautiful and the community composition largely consistent.</p>
              <p>The guard-gating here is comprehensive. The outer community has primary security gates, and several interior enclaves — Vista Encanto, Regency, the Foothills — have their own secondary guard stations. For executives and families who prioritize genuine privacy and security, Southern Highlands delivers a level of protection that few communities in the valley can match at comparable price points. Crime rates in Southern Highlands are among the lowest in all of Las Vegas.</p>
              <p>The location story is often what surprises buyers. Harry Reid International Airport is 15 minutes away via I-15 — a commute that makes Southern Highlands the logical choice for anyone who travels frequently for business. The I-15 runs directly south to California, making weekend drives to Los Angeles and San Diego more straightforward than from Summerlin or Henderson. For executives and second-home buyers who split time between Nevada and California, the math on Southern Highlands&apos; location is compelling.</p>
            </div>
            <div className="overview-aside">
              <div className="quick-facts">
                <h3>Southern Highlands At a Glance</h3>
                {[
                  ['Location', 'South Las Vegas, NV'],
                  ['Type', 'Gated Master-Planned'],
                  ['Golf Club', 'Private (Arnold Palmer)', 'gold'],
                  ['Min Price', '$500K'],
                  ['HOA', '$75–$200/mo'],
                  ['Airport', '15 min'],
                  ['To Strip', '~20 min'],
                  ['To Henderson', '~15 min'],
                  ['Security', '24-hr Guard-Gated'],
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
                <p>Ready to explore Southern Highlands? Let&apos;s schedule a private tour of the community and the gated enclaves that match your goals.</p>
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
            <span className="section-label">Why Southern Highlands</span>
            <h2>The Reasons Executives and Families Choose Southern Highlands</h2>
            <p>Private golf, guard-gated security, airport proximity, and ultra-low crime — here&apos;s what defines Las Vegas&apos;s southernmost prestige address.</p>
          </div>
          <div className="highlights-grid">
            {[
              { icon: '⛳', title: 'Private Golf Club (Arnold Palmer)', body: 'Southern Highlands Golf Club is a true private member club anchored by an Arnold Palmer championship design. The course is maintained to country club standards and serves as the social and architectural centerpiece of the entire community.' },
              { icon: '🔒', title: 'Guard-Gated Enclaves', body: 'Multiple layers of security define Southern Highlands — community-level guard gates and sub-community secondary gates in the premium enclaves. Twenty-four-hour security is a standard feature, not an upgrade.' },
              { icon: '✈️', title: 'Airport 15 Minutes Away', body: 'Harry Reid International Airport is the shortest executive commute of any upscale Las Vegas community. For frequent flyers and business travelers, this single geographic fact makes Southern Highlands the rational choice.' },
              { icon: '🛡️', title: 'Ultra-Low Crime Rate', body: 'Southern Highlands consistently records among the lowest crime rates in all of Las Vegas, benefiting from gated access, private security, and the demographic consistency of the community.' },
              { icon: '💼', title: 'Executive Lifestyle', body: 'The community profile skews heavily toward executives, business owners, and professionals. The private club, gating, and community character create an environment that supports that lifestyle throughout.' },
              { icon: '🏫', title: 'Excellent School Options', body: 'Southern Highlands is zoned to strong CCSD schools including Liberty High School, one of Henderson area\'s highest-rated public schools. Private options including Faith Lutheran serve the community as well.' },
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
            <h2>Find Your Enclave in Southern Highlands</h2>
            <p>From entry-level luxury to private-gated trophy estates — Southern Highlands has a neighborhood for every level of the executive market.</p>
          </div>
          <div className="villages-grid">
            {[
              { name: 'The Foothills', type: 'Guard-Gated · Golf Views', desc: 'Premium positioning within Southern Highlands with golf course views and elevated terrain. Guard-gated with larger lots and more spacious floor plans.', price: 'From $550K' },
              { name: 'Painted Desert', type: 'Established · Family', desc: 'A well-regarded neighborhood within Southern Highlands featuring consistent HOA maintenance and a mix of family-sized homes. Popular with professionals relocating from California.', price: 'From $600K' },
              { name: 'Regency', type: 'Semi-Custom · Private', desc: 'An upscale gated enclave within Southern Highlands featuring larger semi-custom homes on premium lots. Secondary guard gate provides additional privacy.', price: 'From $800K' },
              { name: 'Vista Encanto', type: 'Ultra-Luxury · Guard-Gated', desc: 'The most exclusive address within Southern Highlands — custom and semi-custom estates with the highest level of gating and privacy. A true trophy community.', price: 'From $1M+' },
              { name: 'Emerald', type: 'Entry Luxury · Value', desc: 'An accessible entry point into Southern Highlands prestige. Well-maintained and benefiting from all community amenities while offering the most competitive pricing within the gates.', price: 'From $500K' },
              { name: 'Enclave at Southern Highlands', type: 'Premium · Gated', desc: 'A guard-gated enclave featuring upscale single-family homes with well-maintained streets and proximity to the Southern Highlands Golf Club.', price: 'From $700K' },
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
              <img src="https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&w=900&h=600&q=80" alt="Championship golf course at Southern Highlands Las Vegas" />
            </div>
            <div className="lifestyle-content">
              <span className="section-label">Executive Living</span>
              <div className="gold-rule" />
              <h2>Private Golf, Airport Access, and the Desert&apos;s Best-Kept Secret</h2>
              <p>Life in Southern Highlands moves at a different pace than the rest of Las Vegas. The community is large enough to have everything you need — the private club, parks, and retail — but intimate enough that it doesn&apos;t feel like a city.</p>
              <p>The Arnold Palmer golf course defines daily life for members in a way that goes beyond just the game. The clubhouse, the dining, the practice facilities — it&apos;s a social infrastructure that builds the kind of community connection that most Las Vegas neighborhoods lack. For buyers who prioritize a genuine community identity alongside privacy and security, Southern Highlands delivers both.</p>
              <div className="lifestyle-bullets">
                {[
                  'Southern Highlands Golf Club — Arnold Palmer design, private membership, championship conditioning',
                  '24-hour guard-gated security across the community and secondary gates in premium enclaves',
                  'Harry Reid Airport 15 minutes away — the best business traveler commute in Las Vegas',
                  'Community parks, walking paths, and maintained open space throughout the development',
                  'Quick I-15 access south to Jean, Primm, and ultimately Los Angeles (2 hours)',
                  'Henderson\'s retail, dining, and arts district 15 minutes east via the 215',
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
            <h2>Schools Serving Southern Highlands Families</h2>
            <p>Strong public options and respected private schools within the community and nearby.</p>
          </div>
          <div className="schools-layout">
            <div className="school-group">
              <h3>Public Schools (CCSD)</h3>
              {[
                ['Liberty High School', '9–12'],
                ['Del E. Webb Middle School', '6–8'],
                ['Elise L. Wolff Elementary', 'K–5'],
                ['Multiple CCSD Elementary Schools', 'K–5'],
              ].map(([n, g]) => (
                <div className="school-item" key={n}>{n}<span className="school-grades">{g}</span></div>
              ))}
            </div>
            <div className="school-group">
              <h3>Private &amp; Faith-Based</h3>
              {[
                ['Faith Lutheran Middle & High', '6–12'],
                ['Faith Lutheran Academy', 'K–5'],
                ['Desert Christian Academy', 'K–12'],
                ['Private Options Nearby', 'Various'],
              ].map(([n, g]) => (
                <div className="school-item" key={n}>{n}<span className="school-grades">{g}</span></div>
              ))}
            </div>
            <div className="school-group">
              <h3>Charter &amp; Specialized</h3>
              {[
                ['Pinecrest Academy (Henderson)', 'PreK–12'],
                ['Doral Academy', 'K–8'],
                ['Charter School Options', 'Various'],
              ].map(([n, g]) => (
                <div className="school-item" key={n}>{n}<span className="school-grades">{g}</span></div>
              ))}
              <div style={{ marginTop: '24px', padding: '18px', background: 'rgba(201,168,76,0.06)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', fontSize: '13px', color: 'var(--white-70)', lineHeight: '1.7' }}>
                <strong style={{ color: 'var(--white)' }}>School Assignment Note:</strong> Zoning varies by address within Southern Highlands. Always confirm your specific assignment with CCSD before purchasing.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <CommunityFAQ
        title="Southern Highlands FAQ"
        subtitle="Common questions from buyers considering Las Vegas's most prestigious gated master-planned community."
        faqs={faqs}
      />

      {/* CTA */}
      <section id="cta">
        <div className="container">
          <h2>Ready to Find Your Southern Highlands Home?</h2>
          <p>Private golf, guard-gated prestige, airport proximity, and a price-per-square-foot that would be impossible anywhere in California.</p>
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
