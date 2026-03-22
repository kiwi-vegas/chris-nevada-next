import CommunityFAQ from '@/components/CommunityFAQ'
import CommunityMapWrapper from '@/components/CommunityMapWrapper'
import Link from 'next/link'
import type { Metadata } from 'next'
import { getCommunityPage } from '@/sanity/queries'
import { mergeQuickStats, mergeDriveTimes, getSectionImageUrl } from '@/lib/community-utils'

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const cms = await getCommunityPage('mountains-edge')
  return {
    title: cms?.metaTitle ?? 'Mountains Edge Homes For Sale | Nevada Real Estate Group',
    description: cms?.metaDescription ?? 'Browse Mountains Edge homes for sale. Southwest Las Vegas\'s largest master-planned community — 3,500 acres, dramatic mountain views, Red Rock Canyon nearby. 350+ active listings from $350K. Call 725.239.9950.',
  }
}

const boundary: [number, number][] = [
  [-115.35, 36.06],
  [-115.31, 36.07],
  [-115.24, 36.06],
  [-115.21, 36.04],
  [-115.21, 35.99],
  [-115.25, 35.97],
  [-115.33, 35.97],
  [-115.36, 36.01],
  [-115.35, 36.06],
]

const faqs = [
  {
    q: 'What is Mountains Edge known for?',
    a: 'Mountains Edge is known for being the largest master-planned community in southwest Las Vegas, covering approximately 3,500 acres. It\'s recognized for its dramatic desert mountain backdrop, community parks with splash pads, newer construction homes, and its proximity to Red Rock Canyon National Conservation Area. The community has been popular with military families, first-time buyers, and California transplants seeking affordable desert living.',
  },
  {
    q: 'How does Mountains Edge compare to Henderson?',
    a: 'Both are excellent suburban choices, but they serve different buyers. Mountains Edge offers southwest Las Vegas\'s most affordable new construction in a master-planned setting with mountain views, while Henderson offers more established communities, a wider price range, and proximity to Lake Mead. Henderson has more amenity depth (shopping, dining, the arts district), while Mountains Edge tends to offer newer homes at lower prices per square foot.',
  },
  {
    q: 'What is the price range for Mountains Edge homes?',
    a: 'Homes in Mountains Edge generally range from $350,000 for townhomes and smaller single-family homes up to $750,000+ for larger single-family homes in premium locations. The community offers one of the better value propositions in the Las Vegas Valley for newer construction in a master-planned setting.',
  },
  {
    q: 'What are typical HOA fees in Mountains Edge?',
    a: 'HOA fees in Mountains Edge typically range from $50 to $120 per month depending on the specific sub-community. Most fees cover common area maintenance, community park upkeep, and neighborhood landscaping. Always confirm the exact fee and what it covers with the listing agent before making an offer.',
  },
  {
    q: 'Are there new construction homes available in Mountains Edge?',
    a: 'Mountains Edge has had active new construction phases over the years, and select parcels and phases may still have new builds available. The community has largely built out, but there are occasional new construction pockets. Contact us for the most current availability from builders.',
  },
  {
    q: 'How long does it take to commute from Mountains Edge to the Strip?',
    a: 'Mountains Edge sits in the southwest valley, approximately 20 minutes from the Las Vegas Strip under normal traffic conditions via Blue Diamond Road and I-15. During peak hours, budget 25–35 minutes. The community is also close to the I-215 beltway, which improves access across the entire valley.',
  },
]

export default async function MountainsEdgePage() {
  const cms = await getCommunityPage('mountains-edge')

  const heroHeadline = cms?.heroHeadline ?? 'Mountains Edge\nHomes For Sale'
  const heroSubheadline = cms?.heroSubheadline ?? "Southwest Las Vegas's largest master-planned community — 3,500 acres of thoughtfully designed neighborhoods, dramatic desert mountain backdrops, and quick access to Red Rock Canyon."

  const HARDCODED_STATS: Array<[string, string] | [string, string, string]> = [
    ['Location', 'SW Las Vegas, NV'],
    ['Development', '3,500 Acres'],
    ['Built', '2004–Present'],
    ['Min Price', '$350K', 'gold'],
    ['HOA', '$50–$120/mo'],
    ['To Strip', '~20 min'],
    ['To Red Rock', '~15 min'],
    ['Anchor Park', 'Exploration Peak'],
    ['State Income Tax', 'None'],
    ['Property Tax Rate', '~0.6%'],
  ]
  const displayStats = mergeQuickStats(HARDCODED_STATS, cms?.quickStats)
  const HARDCODED_DRIVE_TIMES = [
    { time: '~20 min', destination: 'to the Strip', route: 'via Blue Diamond → I-15 N' },
    { time: '~15 min', destination: 'to Red Rock Canyon', route: 'via W Charleston Blvd' },
    { time: '~25 min', destination: 'to Downtown Las Vegas', route: 'via I-15 N → US-95' },
    { time: '~25 min', destination: 'to Harry Reid Airport', route: 'via I-15 N → I-215 E' },
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
          <span>Mountains Edge</span>
        </div>
      </div>

      {/* HERO */}
      <header id="hero" className="mountains-edge-hero">
        {cms?.heroImageUrl
          ? <img src={`${cms.heroImageUrl}?w=1920&auto=format&q=85`} alt="Mountains Edge hero" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
          : <div className="hero-bg" />
        }
        <div className="hero-overlay" />
        <div className="hero-content summerlin">
          <div className="container">
            <p className="hero-eyebrow-sm">Southwest Las Vegas, Nevada</p>
            <div className="hero-rule" />
            <h1>{heroHeadline.split('\n').map((line, i) => (
              <span key={i}>{line}{i < heroHeadline.split('\n').length - 1 && <br />}</span>
            ))}</h1>
            <p className="hero-sub">{heroSubheadline}</p>
            <div className="hero-stats">
              <div className="hero-stat"><span className="hero-stat-num">{qs('Active Listings', '350+')}</span><span className="hero-stat-lbl">Active Listings</span></div>
              <div className="hero-stat"><span className="hero-stat-num">{qs('Price Range', '$350K–$1.5M+')}</span><span className="hero-stat-lbl">Price Range</span></div>
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
            <h2>Where is Mountains Edge?</h2>
            <p>Located in the southwest Las Vegas Valley — the desert mountain ranges that give the community its name form a dramatic natural backdrop to the west and south.</p>
          </div>
          <div style={{ height: '420px', borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid var(--border)' }}>
            <CommunityMapWrapper
              center={[-115.270, 36.021]}
              zoom={12}
              boundary={boundary}
              name="Mountains Edge"
              subtitle="Southwest Las Vegas, Nevada"
              id="mountains-edge-map"
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
            <h2>New Mountains Edge Listings</h2>
            <p>The latest homes listed in Mountains Edge — houses, condos, and townhomes in southwest Las Vegas&apos;s most ambitious master-planned community.</p>
          </div>
          <div className="ylopo-wrap">
            <div className="YLOPO_resultsWidget" data-search='{"propertyTypes":["house","condo","townhouse"],"minPrice":350000,"locations":[{"community":"Mountains Edge","city":"Las Vegas","state":"NV"}],"limit":12}'></div>
          </div>
          <p className="ylopo-note">Listing data sourced from regional MLS. Information deemed reliable but not guaranteed. Updated daily.</p>
          <div className="listings-actions">
            <a href="https://search.nevadarealestategroup.net/search?s[orderBy]=sourceCreationDate%2Cdesc&s[page]=1&s[locations][0][community]=Mountains+Edge&s[locations][0][city]=Las+Vegas&s[locations][0][state]=NV" target="_blank" rel="noopener noreferrer" className="btn-gold">View All Mountains Edge Listings →</a>
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
              <h2>Mountains Edge: Southwest Las Vegas Done Right</h2>
              <p>When Mountains Edge broke ground in 2004, it set out to be the southwest valley&apos;s defining master-planned community — and it delivered. Covering approximately 3,500 acres along the southern face of the Spring Mountains, the community was designed with mountain views as an intentional feature rather than an accident of geography. The ridgeline backdrop that defines the Mountains Edge skyline is one of the most striking in the Las Vegas Valley.</p>
              <p>The community is particularly well-known for its parks, which go beyond the standard Las Vegas neighborhood playgrounds. Several Mountains Edge parks feature splash pads, amphitheaters, and maintained open space that serves the dense family population the community has attracted. Exploration Peak Community Park is the centerpiece — a regional destination with walking paths, a splash pad, and panoramic mountain views.</p>
              <p>Mountains Edge has consistently attracted military families from Nellis Air Force Base, first-time buyers priced out of Summerlin, and California transplants seeking affordable desert living with newer construction. The proximity to Red Rock Canyon National Conservation Area — one of the most spectacular landscapes in the American West — puts world-class hiking, climbing, and scenic driving within 15 minutes of most Mountains Edge addresses. That&apos;s a combination that&apos;s hard to find at any price point in the valley.</p>
            </div>
            <div className="overview-aside">
              <div className="quick-facts">
                <h3>Mountains Edge At a Glance</h3>
                {displayStats.map(([label, value, cls]) => (
                  <div className="fact-row" key={label}>
                    <span className="fact-label">{label}</span>
                    <span className={`fact-value${cls ? ' ' + cls : ''}`}>{value}</span>
                  </div>
                ))}
              </div>
              <div className="cta-card">
                <p>Ready to explore Mountains Edge? Let&apos;s schedule a private tour of the community and the listings that match your goals.</p>
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
            <span className="section-label">Why Mountains Edge</span>
            <h2>The Reasons Buyers Keep Choosing Mountains Edge</h2>
            <p>Affordable luxury, mountain views, community parks, and Red Rock Canyon at your door — here&apos;s what drives demand in the southwest valley.</p>
          </div>
          <div className="highlights-grid">
            {[
              { icon: '💰', title: 'Affordable Entry Point', body: 'Mountains Edge offers one of the valley\'s best value propositions for newer master-planned living. Buyers consistently find more home for their money here versus comparable communities in Henderson or Summerlin.' },
              { icon: '🏔️', title: 'Dramatic Mountain Views', body: 'The Spring Mountains form a constant backdrop along the western and southern edges of the community. Many homes and all major parks are sited to take advantage of views that would cost a premium anywhere else in the valley.' },
              { icon: '🏞️', title: 'Community Parks with Splash Pads', body: 'Mountains Edge is known for park quality that goes above the Las Vegas average. Exploration Peak Community Park features splash pads, walking paths, and mountain vista points that make it a genuine community asset.' },
              { icon: '🪨', title: 'Red Rock Canyon Proximity', body: 'Red Rock Canyon National Conservation Area — 200,000 acres of spectacular Mojave desert terrain — is approximately 15 minutes from Mountains Edge. World-class hiking, rock climbing, and the 13-mile scenic drive are effectively in the backyard.' },
              { icon: '🏡', title: 'Newer Construction Throughout', body: 'The community was developed from 2004 onward, meaning the housing stock is relatively modern throughout. Buyers get contemporary floor plans, updated systems, and the curb appeal that comes with planned-community standards.' },
              { icon: '📈', title: 'Strong Resale Performance', body: 'Mountains Edge has demonstrated consistent resale strength driven by sustained family demand, ongoing infrastructure investment, and the scarcity of quality master-planned living in the southwest corridor.' },
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
            <h2>Find Your Neighborhood in Mountains Edge</h2>
            <p>From affordable starter communities to premium hillside addresses — Mountains Edge offers a range of sub-communities for every buyer profile.</p>
          </div>
          <div className="villages-grid">
            {[
              { name: 'Exploration Peak', type: 'Premier · Park-Adjacent', desc: 'The community surrounding Exploration Peak Community Park — the largest and most amenity-rich park in Mountains Edge. Park views, walking path access, and premium positioning.', price: 'From $400K' },
              { name: 'Inspirada Adjacent', type: 'Border Community · Family', desc: 'Neighborhoods on the eastern edge of Mountains Edge that border the Inspirada master-planned community in Henderson, giving residents access to both communities\' amenities.', price: 'From $425K' },
              { name: 'Cimarron', type: 'Established · Family', desc: 'One of the earlier-developed neighborhoods in Mountains Edge with an established feel and consistent character. Good school zoning and strong community identity.', price: 'From $350K' },
              { name: 'Cambria', type: 'Mid-Range · Family', desc: 'A well-regarded sub-community offering a solid balance of price, size, and location within the Mountains Edge footprint. Popular with growing families and relocators.', price: 'From $370K' },
              { name: 'Marquis', type: 'Premium · Larger Homes', desc: 'One of the more premium address zones within Mountains Edge, featuring larger lots, more spacious floor plans, and a generally quieter residential character.', price: 'From $450K' },
              { name: 'Saguaro Ridge', type: 'Views · Hillside', desc: 'Hillside positioning gives Saguaro Ridge residents elevated mountain and valley views. A sought-after location within the community for buyers who prioritize the visual backdrop.', price: 'From $380K' },
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
              <img src={lifestyleImageUrl ? `${lifestyleImageUrl}?w=900&auto=format&q=85` : 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=900&h=600&q=80'} alt="Red Rock Canyon desert landscape near Mountains Edge Las Vegas" />
            </div>
            <div className="lifestyle-content">
              <span className="section-label">Outdoor Living</span>
              <div className="gold-rule" />
              <h2>Desert Mountains, Red Rock Canyon, and Community Parks</h2>
              <p>Mountains Edge was designed around the idea that Las Vegas outdoor living should be exceptional. The community parks go well beyond what most Nevada neighborhoods provide, and the proximity to Red Rock Canyon makes weekend outdoor adventure a genuine part of daily life here rather than a special occasion.</p>
              <p>Exploration Peak Community Park is the heart of the outdoor life in Mountains Edge — a regional-quality park with mountain views, walking paths, and splash pads that draws families from across the southwest valley. The park system, combined with Red Rock Canyon at 15 minutes, creates a lifestyle that surprises buyers expecting a typical Las Vegas suburb.</p>
              <div className="lifestyle-bullets">
                {[
                  'Exploration Peak Community Park — mountain views, splash pads, and regional walking paths',
                  'Red Rock Canyon National Conservation Area — approximately 15 minutes from most addresses',
                  '13-mile Red Rock Scenic Loop Drive — open for driving, cycling, and wildlife viewing',
                  'Community parks with consistent HOA maintenance throughout all neighborhoods',
                  'Day trips to Mount Charleston, Valley of Fire, and Lake Mead within 30–60 minutes',
                  'Spring Mountains provide natural air conditioning — elevation cooling on hot summer days',
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
            <h2>Schools Serving Mountains Edge Families</h2>
            <p>Public and charter school options serving the southwest Las Vegas community.</p>
          </div>
          <div className="schools-layout">
            <div className="school-group">
              <h3>Public Schools (CCSD)</h3>
              {[
                ['Desert Oasis High School', '9–12'],
                ['Sierra Vista High School', '9–12'],
                ['Frank F. Garside Junior High', '6–8'],
                ['Multiple CCSD Elementary Schools', 'K–5'],
              ].map(([n, g]) => (
                <div className="school-item" key={n}>{n}<span className="school-grades">{g}</span></div>
              ))}
            </div>
            <div className="school-group">
              <h3>Charter Schools</h3>
              {[
                ['Pinecrest Academy of Nevada', 'PreK–12'],
                ['Doral Academy of Nevada', 'K–8'],
                ['Faiss Middle School', '6–8'],
                ['Charter Options (Various)', 'K–12'],
              ].map(([n, g]) => (
                <div className="school-item" key={n}>{n}<span className="school-grades">{g}</span></div>
              ))}
            </div>
            <div className="school-group">
              <h3>Private Options</h3>
              {[
                ['Faith Lutheran Schools', '6–12'],
                ['Desert Christian Academy', 'K–12'],
                ['Private School Options Nearby', 'Various'],
              ].map(([n, g]) => (
                <div className="school-item" key={n}>{n}<span className="school-grades">{g}</span></div>
              ))}
              <div style={{ marginTop: '24px', padding: '18px', background: 'rgba(201,168,76,0.06)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', fontSize: '13px', color: 'var(--white-70)', lineHeight: '1.7' }}>
                <strong style={{ color: 'var(--white)' }}>School Assignment Note:</strong> Zoning varies by address within Mountains Edge. Always confirm your specific assignment with CCSD before purchasing.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <CommunityFAQ
        title="Mountains Edge FAQ"
        subtitle="Common questions from buyers considering southwest Las Vegas's largest master-planned community."
        faqs={faqs}
      />

      {/* CTA */}
      <section id="cta">
        <div className="container">
          <h2>Ready to Find Your Mountains Edge Home?</h2>
          <p>Three thousand five hundred acres of master-planned living, dramatic mountain views, and a price point that delivers genuine value in the Las Vegas Valley.</p>
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
