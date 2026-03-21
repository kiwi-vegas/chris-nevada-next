import CommunityFAQ from '@/components/CommunityFAQ'
import CommunityMapWrapper from '@/components/CommunityMapWrapper'
import Link from 'next/link'
import type { Metadata } from 'next'
import { getCommunityPage } from '@/sanity/queries'
import { mergeQuickStats, getSectionImage } from '@/lib/community-utils'
import { createImageUrlBuilder } from '@sanity/image-url'
import { client } from '@/sanity/client'

const urlFor = (source: any) => createImageUrlBuilder(client).image(source)

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const cms = await getCommunityPage('red-rock-country-club')
  return {
    title: cms?.metaTitle ?? 'Red Rock Country Club Homes For Sale | Nevada Real Estate Group',
    description: cms?.metaDescription ?? "Browse homes for sale in Red Rock Country Club, Summerlin — Las Vegas's premier private golf community with two Arnold Palmer-designed courses, guard-gated enclaves, and dramatic Spring Mountain views from $800K. Call 725.239.9950.",
  }
}

export default async function RedRockCountryClubPage() {
  const cms = await getCommunityPage('red-rock-country-club')

  const heroHeadline = cms?.heroHeadline ?? 'Red Rock Country Club\nHomes For Sale'
  const heroSubheadline = cms?.heroSubheadline ?? "Summerlin's premier private golf community — two Arnold Palmer-designed courses, guard-gated enclaves, and a clubhouse lifestyle set against the red sandstone drama of the Spring Mountains."

  const HARDCODED_STATS: Array<[string, string] | [string, string, string]> = [
    ['Location', 'West Summerlin, NV'],
    ['Golf', '2 Arnold Palmer courses'],
    ['Access', 'Guard-gated'],
    ['Min Price', '$800K', 'gold'],
    ['HOA + Club Dues', 'Separate fees apply'],
    ['Red Rock Canyon', '~5 min'],
    ['Downtown Summerlin', '~5 min'],
    ['Distance to Strip', '~20 min'],
    ['Distance to Airport', '~35 min'],
    ['State Income Tax', 'None'],
    ['Property Tax Rate', '~0.6%'],
  ]
  const displayStats = mergeQuickStats(HARDCODED_STATS, cms?.quickStats)
  const lifestyleImage = getSectionImage(cms?.sectionImages, 'lifestyle')

  return (
    <main>
      <div className="breadcrumb">
        <div className="breadcrumb-inner">
          <Link href="/">Home</Link>
          <span className="breadcrumb-sep">›</span>
          <a href="/#communities">Communities</a>
          <span className="breadcrumb-sep">›</span>
          <span>Red Rock Country Club</span>
        </div>
      </div>

      {/* HERO */}
      <header id="hero" className="red-rock-cc-hero">
        {cms?.heroImage && (
          <img
            src={urlFor(cms.heroImage).width(1920).url()}
            alt="Red Rock Country Club hero"
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }}
          />
        )}
        <div className="hero-bg" />
        <div className="hero-overlay" />
        <div className="hero-content summerlin">
          <div className="container">
            <p className="hero-eyebrow-sm">Summerlin, Las Vegas, Nevada</p>
            <div className="hero-rule" />
            <h1>{heroHeadline.split('\n').map((line, i) => (
              <span key={i}>{line}{i < heroHeadline.split('\n').length - 1 && <br />}</span>
            ))}</h1>
            <p className="hero-sub">{heroSubheadline}</p>
            <div className="hero-stats">
              <div className="hero-stat"><span className="hero-stat-num">150+</span><span className="hero-stat-lbl">Active Listings</span></div>
              <div className="hero-stat"><span className="hero-stat-num">$800K–$6M+</span><span className="hero-stat-lbl">Price Range</span></div>
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
            <h2>Where is Red Rock Country Club?</h2>
            <p>Situated at the western edge of Summerlin, directly below the Spring Mountains — 5 minutes from Red Rock Canyon National Conservation Area.</p>
          </div>
          <div style={{ height: '420px', borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid var(--border)' }}>
            <CommunityMapWrapper
              center={[-115.323, 36.151]}
              zoom={13}
              boundary={[[-115.36,36.17],[-115.32,36.18],[-115.29,36.17],[-115.28,36.15],[-115.29,36.13],[-115.32,36.12],[-115.36,36.13],[-115.37,36.15],[-115.36,36.17]]}
              name="Red Rock Country Club"
              subtitle="Summerlin, Las Vegas, NV"
              id="red-rock-cc-map"
            />
          </div>
          <div className="drive-time-grid">
            {[
              ['~5 min', 'to Red Rock Canyon', 'via W Charleston Blvd'],
              ['~20 min', 'to the Strip', 'via Summerlin Pkwy → I-15'],
              ['~5 min', 'to Downtown Summerlin', 'via W Charleston Blvd E'],
              ['~35 min', 'to Harry Reid Airport', 'via I-215 South'],
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
            <h2>New Red Rock Country Club Listings</h2>
            <p>The latest homes listed at Red Rock Country Club — villas, single-family, and custom estates on and around two Arnold Palmer-designed courses.</p>
          </div>
          <div className="ylopo-wrap">
            <div className="YLOPO_resultsWidget" data-search='{"propertyTypes":["house","condo","townhouse"],"minPrice":800000,"locations":[{"city":"Red Rock Country Club","state":"NV"}],"limit":12}'></div>
          </div>
          <p className="ylopo-note">Listing data sourced from regional MLS. Information deemed reliable but not guaranteed. Updated daily.</p>
          <div className="listings-actions">
            <a href="https://search.nevadarealestategroup.net/search?s[orderBy]=sourceCreationDate%2Cdesc&s[page]=1&s[locations][0][city]=Red+Rock+Country+Club&s[locations][0][state]=NV" target="_blank" rel="noopener noreferrer" className="btn-gold">View All Red Rock CC Listings →</a>
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
              <h2>Red Rock Country Club: Summerlin&apos;s Premier Private Golf Address</h2>
              <p>Red Rock Country Club is a private, guard-gated country club community within Summerlin, positioned at the western edge of the master plan where the valley floor begins to give way to the red sandstone cliffs of the Spring Mountains. The setting is genuinely dramatic — it&apos;s one of the few communities in the Las Vegas Valley where the mountain backdrop doesn&apos;t feel like a distant backdrop, it feels like part of your yard.</p>
              <p>The community is anchored by two Arnold Palmer-designed 18-hole courses: the Mountain Course (private members only) and the Hills Course. The full-service clubhouse offers dining, tennis, resort-style pool facilities, and a fitness center — all accessible to members, which is a separate arrangement from the HOA. Buyers should budget for both HOA dues and monthly club membership fees when calculating total carrying costs.</p>
              <p>Properties range significantly in size and price — from attached villas starting around $800K to fully custom estate homes that exceed 6,000 square feet and push well past $5M. The most sought-after lots have fairway-facing rear yards with the Spring Mountains as a backdrop, which is exactly as good as it sounds. Red Rock Canyon National Conservation Area is roughly five minutes down Charleston Boulevard.</p>
              <p>For buyers comparing guard-gated Summerlin options, Red Rock CC sits squarely between The Ridges (ultra-luxury, Bear&apos;s Best course) and Tournament Hills (established, slightly more accessible) in terms of price and prestige. The golf program and the mountain-to-fairway views are its defining advantages.</p>
            </div>
            <div className="overview-aside">
              <div className="quick-facts">
                <h3>Red Rock CC At a Glance</h3>
                {displayStats.map(([label, value, cls]) => (
                  <div className="fact-row" key={label}>
                    <span className="fact-label">{label}</span>
                    <span className={`fact-value${cls ? ' ' + cls : ''}`}>{value}</span>
                  </div>
                ))}
              </div>
              <div className="cta-card">
                <p>Ready to explore Red Rock Country Club? Let&apos;s schedule a private tour of the community and the listings that match your goals.</p>
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
            <span className="section-label">Why Red Rock Country Club</span>
            <h2>The Reasons Buyers Choose Red Rock CC</h2>
            <p>Guard-gated security, world-class golf, and the most dramatic mountain setting in Summerlin — here&apos;s what drives demand at Red Rock CC.</p>
          </div>
          <div className="highlights-grid">
            {[
              { icon: '⛳', title: '2 Arnold Palmer Courses', body: 'The Mountain Course and the Hills Course — both designed by Arnold Palmer — give members a private golf experience that most Las Vegas communities can&apos;t touch. The Mountain Course in particular is consistently ranked among the top private courses in the Southwest.' },
              { icon: '🛡️', title: 'Guard-Gated Security', body: 'Red Rock Country Club is a fully guard-gated community with 24/7 security at the entrance. Every visitor is logged and credentialed — the kind of controlled access that luxury buyers consistently rate as a top priority.' },
              { icon: '🏔️', title: 'Mountain & Golf Course Views', body: 'The best lots at Red Rock CC back to the golf course with the Spring Mountains directly behind. At sunset, the red sandstone cliffs glow — it&apos;s a view that sells homes and retains value across market cycles.' },
              { icon: '🍽️', title: 'Full-Service Clubhouse', body: 'The clubhouse includes fine and casual dining, tennis courts, resort pools, a full fitness center, and a dedicated golf practice facility. Club membership is separate from the HOA and provides access to the full amenity package.' },
              { icon: '🧗', title: 'Red Rock Canyon: 5 Minutes', body: "Red Rock Canyon National Conservation Area — 200,000 acres of world-class climbing, hiking, and cycling — is roughly five minutes down Charleston Boulevard from the community gate. It's one of the most significant outdoor recreation adjacencies in the entire Las Vegas Valley." },
              { icon: '🏡', title: 'Summerlin Master Plan Benefits', body: "Red Rock CC sits within the broader Summerlin master plan, meaning residents also have access to Summerlin's 200+ miles of trails, 250+ parks, and the full Downtown Summerlin retail and entertainment complex." },
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
            <h2>Enclaves Within Red Rock Country Club</h2>
            <p>From villa communities to custom estate sections — Red Rock CC has options across a broad range of price points and product types.</p>
          </div>
          <div className="villages-grid">
            {[
              { name: 'The Fairways', type: 'Golf Frontage · Premium', desc: 'Single-family homes with direct fairway views — the most sought-after positions within the community. Rear yards open to the course with the Spring Mountains behind.', price: 'From $900K' },
              { name: 'Tournament Hills', type: 'Established · Prestige', desc: 'One of the original and most established sections of Red Rock CC. Larger lot sizes, mature landscaping, and some of the community&apos;s most recognized addresses.', price: 'From $1.2M' },
              { name: 'Augusta', type: 'Estate · Custom', desc: 'Named after the famous Georgia course, Augusta is one of the more exclusive sections within Red Rock CC. Larger custom homes with premium finishes throughout.', price: 'From $1.5M' },
              { name: 'The Enclave', type: 'Guard-Gated within Gated', desc: 'A gated-within-gated sub-community offering an additional layer of privacy. Popular with buyers who prioritize seclusion while remaining within the full Red Rock CC amenity footprint.', price: 'From $1M' },
              { name: 'Villas', type: 'Attached · Lock-and-Leave', desc: 'Attached villa homes ideal for buyers who want the Red Rock CC lifestyle without the maintenance of a larger single-family home. Popular second-home and seasonal buyer choice.', price: 'From $800K' },
              { name: 'Custom Estates', type: 'Ultra-Luxury · Bespoke', desc: 'The premier custom home sites within Red Rock CC — larger parcels, architectural freedom, and the community&apos;s best views. Often 5,000–8,000+ sq ft.', price: 'From $3M' },
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
              <img src={lifestyleImage ? urlFor(lifestyleImage).width(900).url() : 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&w=900&h=600&q=80'} alt="Golf course and mountain views at Red Rock Country Club, Summerlin" />
            </div>
            <div className="lifestyle-content">
              <span className="section-label">Club Living</span>
              <div className="gold-rule" />
              <h2>Golf, Mountains, and a Clubhouse That Earns Its Dues</h2>
              <p>The lifestyle at Red Rock Country Club is organized around the golf club — it&apos;s not incidental to the community, it&apos;s the reason the community exists. Members have two Arnold Palmer courses, a full practice facility, and a clubhouse that runs year-round dining and social programming.</p>
              <p>Outside the gates, Red Rock Canyon is five minutes away — which means residents have legitimate world-class hiking and climbing access in addition to the club amenities. Downtown Summerlin adds retail, dining, and entertainment within a 10-minute drive.</p>
              <div className="lifestyle-bullets">
                {[
                  'Two Arnold Palmer 18-hole courses — Mountain Course (private) and Hills Course',
                  'Full-service clubhouse with fine dining, casual dining, and event facilities',
                  'Tennis courts, resort-style pools, and a full fitness center',
                  'Red Rock Canyon NCA — 5 minutes for hiking, cycling, and world-class climbing',
                  'Downtown Summerlin — 125+ shops and restaurants, Las Vegas Ballpark, City National Arena',
                  "Summerlin's 200+ miles of trails and 250+ parks accessible from the community",
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
            <h2>Schools Serving Red Rock CC Families</h2>
            <p>Zoned to some of Summerlin&apos;s strongest public schools, with top private options nearby.</p>
          </div>
          <div className="schools-layout">
            <div className="school-group">
              <h3>Public Schools (CCSD)</h3>
              {[
                ['Lummis Elementary School', 'K–5'],
                ['Fertitta Middle School', '6–8'],
                ['Palo Verde High School', '9–12'],
                ['West Career & Technical Academy', '9–12'],
              ].map(([n, g]) => (
                <div className="school-item" key={n}>{n}<span className="school-grades">{g}</span></div>
              ))}
            </div>
            <div className="school-group">
              <h3>Private &amp; Catholic</h3>
              {[
                ['Bishop Gorman High School', 'Catholic · 9–12'],
                ['Faith Lutheran Middle & High', '6–12'],
                ['Faith Lutheran Academy', 'K–5'],
                ['The Meadows School', 'PreK–12'],
                ['St. Elizabeth Ann Seton', 'PreK–8'],
              ].map(([n, g]) => (
                <div className="school-item" key={n}>{n}<span className="school-grades">{g}</span></div>
              ))}
            </div>
            <div className="school-group">
              <h3>Charter &amp; Independent</h3>
              {[
                ['Alexander Dawson School', 'K–8'],
                ['Adelson Educational Campus', 'PreK–12'],
                ['Shenker Academy', 'K–5'],
              ].map(([n, g]) => (
                <div className="school-item" key={n}>{n}<span className="school-grades">{g}</span></div>
              ))}
              <div style={{ marginTop: '24px', padding: '18px', background: 'rgba(201,168,76,0.06)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', fontSize: '13px', color: 'var(--white-70)', lineHeight: '1.7' }}>
                <strong style={{ color: 'var(--white)' }}>School Assignment Note:</strong> Zoning varies by address within the community. Always confirm your specific assignment with CCSD before purchasing.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <CommunityFAQ
        title="Red Rock Country Club — Common Questions"
        subtitle="Answers to what buyers most often ask about Red Rock Country Club in Summerlin."
        faqs={[
          {
            q: "Is Red Rock Country Club gated?",
            a: "Yes — Red Rock Country Club is a fully guard-gated community with 24/7 staffed security at the entrance. All visitors must be credentialed, and certain sub-enclaves within the community have additional internal gating for an extra layer of privacy."
          },
          {
            q: "How much does golf club membership cost at Red Rock Country Club?",
            a: "Club membership fees at Red Rock Country Club are separate from the HOA and are subject to change. Initiation fees and monthly dues vary by membership type (full golf, social, etc.). Contact the club directly for current membership pricing, as it is not included in the home purchase price and must be budgeted separately."
          },
          {
            q: "How does Red Rock CC compare to The Ridges in Summerlin?",
            a: "The Ridges is Summerlin's ultra-luxury guard-gated community anchored by Bear's Best Jack Nicklaus course, with entry prices typically starting around $1.5M and custom estates reaching $10M+. Red Rock CC has a broader range starting around $800K for attached villas, with a strong private club amenity package. The Ridges is generally considered more exclusive; Red Rock CC offers more accessible entry with a more active golf club social culture."
          },
          {
            q: "What is the price range at Red Rock Country Club?",
            a: "Homes at Red Rock Country Club range from approximately $800K for attached villa units to $6M+ for larger custom estate homes. The most sought-after positions — golf course frontage with Spring Mountain views — typically start around $1.5M and rise significantly for the best lots."
          },
          {
            q: "How close is Red Rock Canyon from the community?",
            a: "Red Rock Canyon National Conservation Area is approximately 5 minutes from the Red Rock Country Club gate via W Charleston Boulevard. This is one of the community's most significant lifestyle advantages — 200,000 acres of world-class hiking, cycling, and rock climbing within a very short drive."
          },
          {
            q: "Is Red Rock Country Club a good investment?",
            a: "Guard-gated golf communities in top-tier master-planned communities have historically held value well in the Las Vegas market. Red Rock CC benefits from the Summerlin master plan brand, the scarcity of its location (western edge, mountain adjacency), and the appeal of the Arnold Palmer golf pedigree. As with any luxury purchase, market timing and specific lot/location matter significantly — consult with a local specialist before purchasing."
          },
        ]}
      />

      {/* CTA */}
      <section id="cta">
        <div className="container">
          <h2>Ready to Find Your Home at Red Rock Country Club?</h2>
          <p>Summerlin&apos;s premier private golf community — guard-gated enclaves, two Arnold Palmer courses, and the Spring Mountains at your back door.</p>
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
