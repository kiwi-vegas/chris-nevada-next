import CommunityFAQ from '@/components/CommunityFAQ'
import CommunityMapWrapper from '@/components/CommunityMapWrapper'
import Link from 'next/link'
import type { Metadata } from 'next'
import { getCommunityPage } from '@/sanity/queries'
import { mergeQuickStats, mergeDriveTimes, getSectionImageUrl } from '@/lib/community-utils'

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const cms = await getCommunityPage('green-valley-ranch')
  return {
    title: cms?.metaTitle ?? 'Green Valley Ranch Homes For Sale | Nevada Real Estate Group',
    description: cms?.metaDescription ?? "Browse homes for sale in Green Valley Ranch, Henderson — Henderson's most walkable master-planned community with top-rated CCSD schools, the District town center, and Green Valley Ranch Resort. Homes from $450K. Call 725.239.9950.",
  }
}

export default async function GreenValleyRanchPage() {
  const cms = await getCommunityPage('green-valley-ranch')

  const heroHeadline = cms?.heroHeadline ?? 'Green Valley Ranch\nHomes For Sale'
  const heroSubheadline = cms?.heroSubheadline ?? "Henderson's most walkable and established master-planned community — anchored by the Green Valley Ranch Resort & Spa, a vibrant town center, and some of CCSD's most consistently top-rated schools."

  const HARDCODED_STATS: Array<[string, string] | [string, string, string]> = [
    ['Location', 'Green Valley, Henderson, NV'],
    ['Developer', 'American Nevada Corp'],
    ['Built', '1980s–2000s'],
    ['Min Price', '$450K', 'gold'],
    ['HOA', '$60–$160/mo'],
    ['Resort', 'Green Valley Ranch Resort & Spa'],
    ['Town Center', 'The District at GVR'],
    ['Distance to Strip', '~15 min'],
    ['Distance to Airport', '~15 min'],
    ['Distance to Lake Mead', '~20 min'],
    ['State Income Tax', 'None'],
    ['Property Tax Rate', '~0.6%'],
  ]
  const displayStats = mergeQuickStats(HARDCODED_STATS, cms?.quickStats)
  const HARDCODED_DRIVE_TIMES = [
    { time: '~15 min', destination: 'to the Strip', route: 'via I-215 W → I-15 N' },
    { time: '~15 min', destination: 'to Harry Reid Airport', route: 'via I-215 W' },
    { time: '~20 min', destination: 'to Downtown Las Vegas', route: 'via I-215 W → US-95 N' },
    { time: '~20 min', destination: 'to Lake Mead', route: 'via Lake Mead Dr E' },
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
          <span>Green Valley Ranch</span>
        </div>
      </div>

      {/* HERO */}
      <header id="hero" className="green-valley-ranch-hero">
        {cms?.heroImageUrl
          ? <img src={`${cms.heroImageUrl}?w=1920&auto=format&q=85`} alt="Green Valley Ranch hero" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
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
              <div className="hero-stat"><span className="hero-stat-num">{qs('Active Listings', '300+')}</span><span className="hero-stat-lbl">Active Listings</span></div>
              <div className="hero-stat"><span className="hero-stat-num">{qs('Price Range', '$450K–$2M+')}</span><span className="hero-stat-lbl">Price Range</span></div>
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
            <h2>Where is Green Valley Ranch?</h2>
            <p>Located in the Green Valley area of Henderson — convenient to the I-215 beltway, Harry Reid Airport, and the Las Vegas Strip.</p>
          </div>
          <div style={{ height: '420px', borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid var(--border)' }}>
            <CommunityMapWrapper
              center={[-115.070, 36.037]}
              zoom={13}
              boundary={[[-115.10,36.06],[-115.06,36.06],[-115.03,36.05],[-115.02,36.03],[-115.03,36.01],[-115.06,36.00],[-115.10,36.00],[-115.12,36.02],[-115.12,36.04],[-115.10,36.06]]}
              name="Green Valley Ranch"
              subtitle="Henderson, Nevada"
              id="green-valley-ranch-map"
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
            <h2>New Green Valley Ranch Listings</h2>
            <p>The latest homes listed in Green Valley Ranch — houses, condos, and townhomes starting at $450K in Henderson&apos;s most established community.</p>
          </div>
          <div className="ylopo-wrap">
            <div className="YLOPO_resultsWidget" data-search='{"propertyTypes":["house","condo","townhouse"],"minPrice":450000,"locations":[{"community":"Green Valley Ranch","city":"Henderson","state":"NV"}],"limit":12}'></div>
          </div>
          <p className="ylopo-note">Listing data sourced from regional MLS. Information deemed reliable but not guaranteed. Updated daily.</p>
          <div className="listings-actions">
            <a href="https://search.nevadarealestategroup.net/search?s[orderBy]=sourceCreationDate%2Cdesc&s[page]=1&s[locations][0][community]=Green+Valley+Ranch&s[locations][0][city]=Henderson&s[locations][0][state]=NV" target="_blank" rel="noopener noreferrer" className="btn-gold">View All Green Valley Ranch Listings →</a>
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
              <h2>Green Valley Ranch: Henderson&apos;s Gold Standard for Master-Planned Living</h2>
              <p>Green Valley Ranch is Henderson&apos;s flagship master-planned community — developed by American Nevada Corporation starting in the 1980s and widely regarded as the template for what large-scale planned communities in the Southwest should look like. It was here before most of the valley&apos;s current development, and that head start shows in everything from the tree canopy to the school quality.</p>
              <p>The centerpiece is the District at Green Valley Ranch — an outdoor lifestyle center that predated the modern mixed-use trend and has only gotten better with age. Restaurants, boutiques, a Whole Foods, a Regal Cinema, and direct access to the Green Valley Ranch Resort & Spa make it the kind of walkable town center most master-planned communities in the Southwest never manage to build. Residents walk to it. That sounds simple but it&apos;s genuinely rare in Las Vegas.</p>
              <p>The community features mature tree-lined streets that set it apart from almost every other Las Vegas suburb. Trees here have had 30–40 years to mature, and the effect on walkability and livability is real. Connected path networks tie neighborhoods together without requiring a car for every trip.</p>
              <p>Green Valley Ranch consistently ranks in the top 10 for CCSD school performance across its feeder pattern. For families relocating from quality school markets in California or other states, this is often the deciding factor. Coronado High School, which serves much of the community, is among Southern Nevada&apos;s highest-ranked public schools.</p>
            </div>
            <div className="overview-aside">
              <div className="quick-facts">
                <h3>Green Valley Ranch At a Glance</h3>
                {displayStats.map(([label, value, cls]) => (
                  <div className="fact-row" key={label}>
                    <span className="fact-label">{label}</span>
                    <span className={`fact-value${cls ? ' ' + cls : ''}`}>{value}</span>
                  </div>
                ))}
              </div>
              <div className="cta-card">
                <p>Ready to explore Green Valley Ranch? Let&apos;s schedule a private tour of the community and the listings that match your goals.</p>
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
            <span className="section-label">Why Green Valley Ranch</span>
            <h2>What Makes Green Valley Ranch Henderson&apos;s Most Consistent Community</h2>
            <p>Schools, walkability, a real town center, and 40 years of quality — here&apos;s why Green Valley Ranch consistently outperforms Henderson&apos;s broader market.</p>
          </div>
          <div className="highlights-grid">
            {[
              { icon: '🏨', title: 'Green Valley Ranch Resort On-Site', body: "The Green Valley Ranch Resort & Spa is one of Henderson's best full-service hotel and entertainment properties — and it's inside the community. Residents have dining, spa services, and entertainment within walking distance of their front door." },
              { icon: '🛍️', title: 'The District Town Center', body: "The District at Green Valley Ranch is a genuine mixed-use lifestyle center — not a strip mall, a real walkable outdoor district. Whole Foods, boutiques, restaurants, a cinema, and direct hotel access in one connected space. Rare in the Las Vegas Valley." },
              { icon: '🌳', title: 'Mature Tree Canopy', body: "Planted in the 1980s and 90s, the trees throughout Green Valley Ranch have had decades to mature. Walking through the community feels entirely different from newer Las Vegas suburbs — shaded, established, and genuinely livable." },
              { icon: '🎓', title: 'Top-Ranked CCSD Schools', body: "Green Valley Ranch's feeder pattern consistently produces some of Clark County's strongest school results. Coronado High School routinely ranks in the top tier of Southern Nevada public schools for academics and extracurriculars." },
              { icon: '🚶', title: 'Connected Paths & Walkability', body: "Green Valley Ranch was designed with pedestrian connectivity in mind before walkability was a marketing term. Internal paths connect neighborhoods, parks, and the District — and residents actually use them." },
              { icon: '🏠', title: 'Proven Long-Term Value', body: "Green Valley Ranch has been one of Henderson's most consistently appreciating communities across multiple market cycles. The combination of school quality, amenity infrastructure, and established character creates durable demand." },
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
            <h2>Neighborhoods Within Green Valley Ranch</h2>
            <p>From walkable attached communities to guard-gated single-family enclaves — Green Valley Ranch covers a broad range of product types and price points.</p>
          </div>
          <div className="villages-grid">
            {[
              { name: 'Tuscany', type: 'Mediterranean · Established', desc: 'Italian-inspired architecture, guard-gated sections, and some of the community&apos;s most desirable single-family homes. Consistent resale demand and mature landscaping throughout.', price: 'From $600K' },
              { name: 'Anthem Highlands', type: 'Guard-Gated · Premium', desc: 'One of the more upscale gated sections within the broader Green Valley Ranch area. Larger homes, strong views in elevated positions, and top school zoning.', price: 'From $700K' },
              { name: 'The Fountains', type: 'Established · Single-Family', desc: 'A well-established neighborhood with a mix of single-story and two-story homes. Popular with families for its proximity to parks, schools, and the District.', price: 'From $500K' },
              { name: 'Willowbrook', type: 'Family · Walkable', desc: 'One of the community&apos;s more walkable neighborhoods — close to the path network and within easy reach of the District. A mix of product types and price points.', price: 'From $475K' },
              { name: 'Tiara', type: 'Accessible · Established', desc: "An accessible entry point into Green Valley Ranch's desirable feeder pattern. Solid school zoning, community path access, and a consistent resale market.", price: 'From $450K' },
              { name: 'Hampton Cove', type: 'Mid-Range · Community Feel', desc: 'A mid-range neighborhood with good access to community amenities. Popular with buyers who want the Green Valley Ranch lifestyle without the premium of the top-tier sections.', price: 'From $550K' },
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
              <img src={lifestyleImageUrl ? `${lifestyleImageUrl}?w=900&auto=format&q=85` : 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=900&h=600&q=80'} alt="Beautiful home in Green Valley Ranch, Henderson Nevada" />
            </div>
            <div className="lifestyle-content">
              <span className="section-label">Community Living</span>
              <div className="gold-rule" />
              <h2>Walkable, Established, and Actually Livable</h2>
              <p>Green Valley Ranch was planned around the idea that a community should work as a community — that residents should be able to walk to a restaurant, a park, or a school without getting in a car. That planning philosophy has aged extremely well in a valley where most suburbs are the opposite.</p>
              <p>The District at Green Valley Ranch is the community&apos;s living room — an outdoor lifestyle center where residents actually go on weeknights and weekends. It&apos;s the kind of place that creates the community feel that master-planned developments usually only claim to have.</p>
              <div className="lifestyle-bullets">
                {[
                  'The District at Green Valley Ranch — walkable outdoor lifestyle center, dining, Whole Foods, cinema',
                  'Green Valley Ranch Resort & Spa — on-site dining, spa, and entertainment',
                  'Connected internal path network through all community neighborhoods',
                  'Multiple community parks with sports facilities, playgrounds, and green space',
                  'Mature tree canopy — 30–40+ years of growth setting the community apart visually',
                  'Harry Reid Airport 15 minutes — ideal for frequent travelers',
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
            <h2>Schools Serving Green Valley Ranch Families</h2>
            <p>One of Henderson&apos;s strongest school feeder patterns — consistently top-ranked public schools and excellent private options nearby.</p>
          </div>
          <div className="schools-layout">
            <div className="school-group">
              <h3>Public Schools (CCSD)</h3>
              {[
                ['Henry Elementary School', 'K–5'],
                ['Del E. Webb Middle School', '6–8'],
                ['Coronado High School', '9–12'],
                ['Green Valley High School', '9–12'],
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
                ['Advanced Technologies Academy', '9–12'],
                ['Charter School Options (×3)', 'Various'],
              ].map(([n, g]) => (
                <div className="school-item" key={n}>{n}<span className="school-grades">{g}</span></div>
              ))}
              <div style={{ marginTop: '24px', padding: '18px', background: 'rgba(201,168,76,0.06)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', fontSize: '13px', color: 'var(--white-70)', lineHeight: '1.7' }}>
                <strong style={{ color: 'var(--white)' }}>School Assignment Note:</strong> Zoning varies by neighborhood and address within Green Valley Ranch. Always confirm your specific assignment with CCSD before purchasing.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <CommunityFAQ
        title="Green Valley Ranch Henderson — Common Questions"
        subtitle="Answers to what buyers most often ask about Green Valley Ranch in Henderson."
        faqs={[
          {
            q: "How does Green Valley Ranch compare to Henderson Anthem?",
            a: "Green Valley Ranch and Anthem are Henderson's two most consistently desirable master-planned communities, but they serve different buyer profiles. Green Valley Ranch is more central, more walkable, and more established — it's ideal for buyers who want the District town center, airport proximity, and mature community character. Anthem is further south, more suburban in scale, and better suited for buyers who prioritize guard-gated living, the Anthem Community Center, and hillside views with Strip vistas. Green Valley Ranch tends to have a slightly lower entry price; Anthem has stronger guard-gated options at mid-price."
          },
          {
            q: "What are the HOA fees in Green Valley Ranch?",
            a: "HOA fees in Green Valley Ranch typically range from $60–$160 per month depending on the specific neighborhood and property type. The master HOA covers common area maintenance, community paths, and shared amenities. Some gated sub-neighborhoods have additional sub-association fees. Always confirm total monthly dues with your real estate agent before purchasing."
          },
          {
            q: "Is Green Valley Ranch actually walkable?",
            a: "Yes — more than almost any other community in the Las Vegas Valley. The internal path network connects neighborhoods, and the District at Green Valley Ranch is within walking distance of a significant portion of the community. Most residents can walk to the District, the resort, and community parks without driving. It's one of the primary reasons the community commands a consistent premium in the Henderson market."
          },
          {
            q: "How are the schools in Green Valley Ranch?",
            a: "Green Valley Ranch has one of Henderson's strongest school feeder patterns. Coronado High School, which serves much of the community, is consistently among the top-ranked public high schools in Clark County. Middle and elementary schools in the feeder pattern also perform well above the CCSD average. Private options including Pinecrest Academy are also nearby."
          },
          {
            q: "What is the price range in Green Valley Ranch?",
            a: "Homes in Green Valley Ranch range from approximately $450K for entry-level condos and townhomes to $2M+ for larger single-family homes in premium positions. The sweet spot for single-family homes is typically $550K–$900K. Guard-gated sections and homes with direct access to the District or path network command a premium over comparable properties elsewhere in the community."
          },
          {
            q: "How far is Green Valley Ranch from Harry Reid Airport?",
            a: "Harry Reid International Airport is approximately 15 minutes from most Green Valley Ranch addresses via I-215 West. This proximity makes Green Valley Ranch particularly appealing for frequent travelers and business buyers who need easy airport access — it's a practical advantage that most of Henderson's other desirable communities can't match."
          },
        ]}
      />

      {/* CTA */}
      <section id="cta">
        <div className="container">
          <h2>Ready to Find Your Green Valley Ranch Home?</h2>
          <p>Henderson&apos;s most established master-planned community — top schools, a walkable town center, and a character that newer developments can&apos;t replicate.</p>
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
