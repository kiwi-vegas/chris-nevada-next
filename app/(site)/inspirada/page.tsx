import InspiradaFAQ from '@/components/InspiradaFAQ'
import Link from 'next/link'
import type { Metadata } from 'next'
import InspiradaMapWrapper from '@/components/InspiradaMapWrapper'
import PortableText from '@/components/PortableText'
import { getCommunityPage } from '@/sanity/queries'
import { mergeQuickStats, mergeDriveTimes, getSectionImageUrl } from '@/lib/community-utils'

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const cms = await getCommunityPage('inspirada')
  return {
    title: cms?.metaTitle ?? 'Inspirada Homes For Sale | Nevada Real Estate Group',
    description: cms?.metaDescription ?? 'Browse Inspirada homes for sale in Henderson, NV. 2,500-acre master-planned community with resort amenities, 30+ parks, and Mediterranean-inspired architecture. Call 725.239.9950.',
  }
}

export default async function InspiradaPage() {
  const cms = await getCommunityPage('inspirada')

  const heroHeadline = cms?.heroHeadline ?? 'Inspirada Homes\nFor Sale'
  const heroSubheadline = cms?.heroSubheadline ?? "Henderson\u2019s premier master-planned community \u2014 2,500 acres of Mediterranean-inspired living with resort-level amenities and 30+ parks."
  const overviewTitle = cms?.overviewTitle ?? 'Inspirada: Henderson Living at Its Best'

  const HARDCODED_STATS: Array<[string, string] | [string, string, string]> = [
    ['Established', '2007'],
    ['Developers', 'Toll Brothers, Beazer, Century'],
    ['Total Acreage', '~2,500 acres'],
    ['Planned Homes', '8,000\u20139,000'],
    ['Median Home Price', '~$575,000', 'gold'],
    ['Neighborhoods', '20+'],
    ['Schools', '5+ nearby'],
    ['Parks', '30+'],
    ['Community Club', 'Inspirada Club'],
    ['Architecture', 'Mediterranean-inspired'],
    ['Distance to Strip', '~25 min'],
    ['Distance to Water Street', '~10 min'],
  ]
  const displayStats = mergeQuickStats(HARDCODED_STATS, cms?.quickStats)
  const HARDCODED_DRIVE_TIMES = [
    { time: '~25 min', destination: 'to the Strip', route: 'via I-215 \u2192 I-15' },
    { time: '~10 min', destination: 'to Water Street District', route: 'via S Eastern Ave' },
    { time: '~15 min', destination: 'to Henderson Bird Preserve', route: 'via Volunteer Blvd' },
    { time: '~20 min', destination: 'to Harry Reid Airport', route: 'via I-215 West' },
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
          <span className="breadcrumb-sep">&rsaquo;</span>
          <a href="/#communities">Communities</a>
          <span className="breadcrumb-sep">&rsaquo;</span>
          <span>Inspirada</span>
        </div>
      </div>

      {/* HERO */}
      <header id="hero" className="summerlin-hero">
        {cms?.heroImageUrl
          ? <img src={`${cms.heroImageUrl}?w=1920&auto=format&q=85`} alt="Inspirada hero" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
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
              <div className="hero-stat"><span className="hero-stat-num">{qs('Active Listings', '150+')}</span><span className="hero-stat-lbl">Active Listings</span></div>
              <div className="hero-stat"><span className="hero-stat-num">{qs('Price Range', '$400K\u2013$900K+')}</span><span className="hero-stat-lbl">Price Range</span></div>
              <div className="hero-stat"><span className="hero-stat-num">{qs('Parks', '30+')}</span><span className="hero-stat-lbl">Parks</span></div>
              <div className="hero-stat"><span className="hero-stat-num">{qs('Total Acreage', '2,500')}</span><span className="hero-stat-lbl">Acres</span></div>
            </div>
          </div>
        </div>
      </header>

      {/* MAP */}
      <section id="map" style={{ padding: '64px 0 0', background: 'var(--charcoal)' }}>
        <div className="container">
          <div className="section-header" style={{ marginBottom: '32px' }}>
            <span className="section-label">Location</span>
            <h2>Where is Inspirada?</h2>
            <p>Located in the southern reaches of Henderson &mdash; one of America&apos;s safest cities &mdash; with easy access to the I-215 beltway and downtown Henderson.</p>
          </div>
          <div className="map-container">
            <InspiradaMapWrapper />
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
            <span className="section-label">New Listings &middot; Updated Daily</span>
            <h2>New Inspirada Listings</h2>
            <p>The 12 most recently listed homes in Inspirada &mdash; new construction and resale homes from the $400Ks.</p>
          </div>
          <div className="ylopo-wrap">
            <div className="YLOPO_searchWidget" />
            <div className="YLOPO_resultsWidget" data-search='{"propertyTypes":["house","condo","townhouse"],"minPrice":200000,"locations":[{"city":"Henderson","state":"NV"}],"limit":12,"sortBy":"listDate","sortOrder":"desc","keywords":"Inspirada"}' />
          </div>
          <p className="ylopo-note">Listing data sourced from regional MLS. Information deemed reliable but not guaranteed. Updated daily.</p>
          <div className="listings-actions">
            <a href="https://search.nevadarealestategroup.net/search?s[orderBy]=sourceCreationDate%2Cdesc&s[page]=1&s[locations][0][city]=Henderson&s[locations][0][state]=NV&s[keywords]=Inspirada" target="_blank" rel="noopener noreferrer" className="btn-gold">View New Inspirada Listings Now &rarr;</a>
            <Link href="/#communities" className="btn-outline">&larr; Back to All Communities</Link>
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
              <h2>{overviewTitle}</h2>
              {cms?.overviewBody?.length ? (
                <PortableText value={cms.overviewBody} />
              ) : (
                <>
                  <p>I&apos;ve been selling homes in Henderson for decades, and Inspirada is one of the communities I find myself recommending more and more. When the development partnership broke ground back in 2007, the timing was brutal &mdash; right into the teeth of the recession. But that turned out to be a hidden advantage. The developers had time to get the master plan right, and what emerged is one of the most thoughtfully designed communities in the entire Las Vegas Valley.</p>
                  <p>The Mediterranean-inspired architecture gives Inspirada a cohesive, resort-like feel that you don&apos;t get in most master-planned communities. Every neighborhood has a consistent aesthetic &mdash; warm stucco exteriors, tile roofs, courtyards, and mature landscaping that makes the community feel established even in its newer sections. It&apos;s a deliberate design choice, and it pays off in curb appeal and long-term property values.</p>
                  <p>What really sets Inspirada apart is the amenity package. The Inspirada Club is the centerpiece &mdash; resort-style pools, a full fitness center, sports courts, event spaces, and year-round programming &mdash; all included with your HOA dues. Then there are the 30-plus parks connected by a trail network that weaves through the entire community. My clients with kids consistently tell me it&apos;s the parks that sold them.</p>
                  <p>The location in south Henderson puts you in one of the safest cities in America (Henderson regularly ranks in the top 10 nationally), with easy freeway access via I-215. You&apos;re 10 minutes from the Water Street District, 15 minutes from the Henderson Bird Viewing Preserve, and 20&ndash;25 minutes from the Strip. For families and professionals who want newer construction with genuine community character, Inspirada delivers.</p>
                </>
              )}
            </div>
            <div className="overview-aside">
              <div className="quick-facts">
                <h3>Inspirada At a Glance</h3>
                {displayStats.map(([label, value, cls]) => (
                  <div className="fact-row" key={label}>
                    <span className="fact-label">{label}</span>
                    <span className={`fact-value${cls ? ' ' + cls : ''}`}>{value}</span>
                  </div>
                ))}
              </div>
              <div className="cta-card">
                <p>Ready to explore Inspirada? Let&apos;s schedule a private tour of the community and the current listings that match your goals.</p>
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
            <span className="section-label">Why Inspirada</span>
            <h2>What Makes Inspirada Stand Out</h2>
            <p>A master-planned community with the polish of a private resort and the warmth of a real neighborhood.</p>
          </div>
          <div className="highlights-grid">
            {[
              { icon: '\u{1F3DB}\uFE0F', title: 'Mediterranean Architecture', body: 'A cohesive, resort-inspired design language across every neighborhood \u2014 warm stucco, tile roofs, courtyards, and mature landscaping that gives the community instant character.' },
              { icon: '\u{1F3CA}', title: 'The Inspirada Club', body: 'A resort-caliber community center with multiple pools, a full fitness center, sports courts, event lawns, and year-round social programming \u2014 all included with HOA dues.' },
              { icon: '\u{1F333}', title: '30+ Parks & Connected Trails', body: 'One of the most extensive park systems in Southern Nevada. Pocket parks, playgrounds, splash pads, dog parks, and open green spaces connected by miles of walking and biking trails.' },
              { icon: '\u{1F6E1}\uFE0F', title: 'Henderson: Top 10 Safest City', body: 'Inspirada sits in Henderson, which consistently ranks among the top 10 safest large cities in America. Low crime, clean streets, and responsive city services.' },
              { icon: '\u{1F426}', title: 'Bird Viewing Preserve Nearby', body: 'The Henderson Bird Viewing Preserve \u2014 a 140-acre wetland oasis with 270+ bird species \u2014 is just minutes away. A unique amenity you won\u2019t find near any other Las Vegas community.' },
              { icon: '\u{1F3D7}\uFE0F', title: 'New Construction Available', body: 'Multiple national builders \u2014 Toll Brothers, Beazer Homes, Century Communities \u2014 are still actively building. Brand-new homes with modern floor plans and energy-efficient construction.' },
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
            <h2>Explore Inspirada&apos;s Neighborhoods</h2>
            <p>National builders and diverse floor plans offer something for every lifestyle and budget.</p>
          </div>
          <div className="villages-grid">
            {[
              { name: 'Toll Brothers at Inspirada', type: 'Luxury \u00B7 Semi-Custom', desc: 'Premium single-family homes with upscale finishes, gourmet kitchens, and spacious lots. Toll Brothers\u2019 signature quality in a master-planned setting.', price: 'From $650K' },
              { name: 'Beazer Homes', type: 'Family \u00B7 Energy-Efficient', desc: 'Well-designed family homes with Beazer\u2019s emphasis on energy efficiency and sustainable building practices. Popular with move-up buyers.', price: 'From $500K' },
              { name: 'Century Communities', type: 'Entry-Level \u00B7 Modern', desc: 'Accessible price points with contemporary floor plans. A strong option for first-time buyers looking to enter the Henderson market.', price: 'From $420K' },
              { name: 'Pardee Homes', type: 'Family \u00B7 Established', desc: 'One of Inspirada\u2019s original builders, Pardee delivered many of the community\u2019s earliest and most established neighborhoods with mature landscaping.', price: 'From $480K' },
              { name: 'The Paseo Collection', type: 'Townhomes \u00B7 Low-Maintenance', desc: 'Attached townhomes ideal for professionals, downsizers, and first-time buyers. Walking distance to the Inspirada Club and central parks.', price: 'From $400K' },
              { name: 'Custom & Premium Lots', type: 'Luxury \u00B7 Select Sites', desc: 'Select oversized lots within Inspirada offer the opportunity for custom and semi-custom builds with premium views and private positioning.', price: 'From $800K+' },
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
              <img
                src={lifestyleImageUrl ? `${lifestyleImageUrl}?w=900&auto=format&q=85` : '/red-rock-canyon.jpg'}
                alt="Parks and outdoor lifestyle in Inspirada, Henderson"
              />
            </div>
            <div className="lifestyle-content">
              <span className="section-label">Outdoor Living</span>
              <div className="gold-rule" />
              <h2>30+ Parks, Connected Trails, and a Resort You Already Belong To</h2>
              <p>Inspirada was designed around the idea that outdoor space isn&apos;t a luxury &mdash; it&apos;s infrastructure. The park system here is one of the most extensive in Southern Nevada, with 30-plus parks connected by a trail network that lets you walk, jog, or bike through the entire community without ever touching a road.</p>
              <p>The Inspirada Club anchors it all with resort-style pools, sports courts, and event spaces that would cost thousands per year in a private club &mdash; but are included with your HOA.</p>
              <div className="lifestyle-bullets">
                {[
                  '30+ parks including pocket parks, playgrounds, splash pads, dog parks, and open green spaces',
                  'Miles of interconnected walking and biking trails through every neighborhood',
                  'Inspirada Club with resort pools, fitness center, sports courts, and event lawns',
                  'Henderson Bird Viewing Preserve \u2014 140 acres, 270+ bird species \u2014 minutes away',
                  'Lake Mead, Sloan Canyon, Bootleg Canyon mountain biking, and Valley of Fire all within an hour',
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
            <h2>Schools Serving Inspirada Families</h2>
            <p>Henderson&apos;s strong school options include several newer campuses built for this part of the city.</p>
          </div>
          <div className="schools-layout">
            <div className="school-group">
              <h3>Public Schools (CCSD)</h3>
              {[['Elise L. Wolff Elementary','K\u20135'],['John C. Vanderburg Elementary','K\u20135'],['Robert L. Forbuss Elementary','K\u20135'],['Del E. Webb Middle School','6\u20138'],['Coronado High School','9\u201312'],['Southeast Career Technical Academy','9\u201312'],].map(([n,g])=>(
                <div className="school-item" key={n}>{n}<span className="school-grades">{g}</span></div>
              ))}
            </div>
            <div className="school-group">
              <h3>Private &amp; Faith-Based</h3>
              {[['Henderson International School','PreK\u201312'],['Pinecrest Academy of Nevada','K\u201312'],['Mountain View Christian School','PreK\u201312'],].map(([n,g])=>(
                <div className="school-item" key={n}>{n}<span className="school-grades">{g}</span></div>
              ))}
            </div>
            <div className="school-group">
              <h3>Charter &amp; Specialty</h3>
              {[['Doral Academy of Nevada','K\u20138'],['Somerset Academy','K\u20138'],['Coral Academy of Science','K\u201312'],].map(([n,g])=>(
                <div className="school-item" key={n}>{n}<span className="school-grades">{g}</span></div>
              ))}
              <div style={{marginTop:'24px',padding:'18px',background:'rgba(201,168,76,0.06)',border:'1px solid var(--border)',borderRadius:'var(--radius)',fontSize:'13px',color:'var(--white-70)',lineHeight:'1.7'}}>
                <strong style={{color:'var(--white)'}}>School Assignment Note:</strong> Henderson school zones vary by address. Several newer schools have been built specifically to serve south Henderson communities like Inspirada. Always confirm your assigned school with CCSD before purchasing.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <InspiradaFAQ />

      {/* CTA */}
      <section id="cta">
        <div className="container">
          <h2>Ready to Find Your Inspirada Home?</h2>
          <p>Whether you&apos;re looking at new construction from Toll Brothers or a move-in-ready resale, I&apos;ll help you find the right home in Inspirada for your family and budget.</p>
          <div className="cta-actions">
            <a href="tel:+17252399950" className="btn-gold">Call 725.239.9950</a>
            <a href="#listings" className="btn-outline">Browse All Listings</a>
          </div>
          <p style={{marginTop:'24px',fontSize:'12px',color:'rgba(255,255,255,0.3)'}}>Nevada Lic. #S.0181401.LLC &middot; lpt Realty</p>
        </div>
      </section>
    </main>
  )
}
