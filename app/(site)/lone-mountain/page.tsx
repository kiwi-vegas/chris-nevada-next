import LoneMountainFAQ from '@/components/LoneMountainFAQ'
import Link from 'next/link'
import type { Metadata } from 'next'
import LoneMountainMapWrapper from '@/components/LoneMountainMapWrapper'
import PortableText from '@/components/PortableText'
import { getCommunityPage } from '@/sanity/queries'
import { mergeQuickStats, mergeDriveTimes, getSectionImageUrl } from '@/lib/community-utils'

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const cms = await getCommunityPage('lone-mountain')
  return {
    title: cms?.metaTitle ?? 'Lone Mountain Homes For Sale | Nevada Real Estate Group',
    description: cms?.metaDescription ?? 'Browse Lone Mountain homes for sale in northwest Las Vegas. Large lots, equestrian properties, and mountain views near Lone Mountain Regional Park. Homes from $450K to $2M+. Call 725.239.9950.',
  }
}

export default async function LoneMountainPage() {
  const cms = await getCommunityPage('lone-mountain')

  const heroHeadline = cms?.heroHeadline ?? 'Lone Mountain Homes\nFor Sale'
  const heroSubheadline = cms?.heroSubheadline ?? "Northwest Las Vegas\u2019 most distinctive address \u2014 large lots, equestrian properties, and mountain views anchored by the iconic Lone Mountain peak."
  const overviewTitle = cms?.overviewTitle ?? 'Lone Mountain: Space, Freedom, and Character in Northwest Las Vegas'

  const HARDCODED_STATS: Array<[string, string] | [string, string, string]> = [
    ['Type', 'Established area'],
    ['Character', 'Semi-rural / upscale'],
    ['Lot Sizes', '\u00BD acre to 2+ acres'],
    ['Landmark', 'Lone Mountain peak (300 ft)'],
    ['Median Home Price', '~$650,000', 'gold'],
    ['Equestrian', 'Horse-zoned properties'],
    ['HOA', 'Many non-HOA properties'],
    ['Park', 'Lone Mountain Regional Park'],
    ['Schools', '5+ nearby'],
    ['Views', 'Spring Mountains panoramic'],
    ['Distance to Strip', '~25 min'],
    ['Distance to Summerlin', '~10 min'],
  ]
  const displayStats = mergeQuickStats(HARDCODED_STATS, cms?.quickStats)
  const HARDCODED_DRIVE_TIMES = [
    { time: '~25 min', destination: 'to the Strip', route: 'via US-95 South' },
    { time: '~10 min', destination: 'to Downtown Summerlin', route: 'via W Sahara or I-215' },
    { time: '~15 min', destination: 'to Red Rock Canyon', route: 'via W Charleston Blvd' },
    { time: '~30 min', destination: 'to Harry Reid Airport', route: 'via US-95 \u2192 I-15 South' },
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
          <span>Lone Mountain</span>
        </div>
      </div>

      {/* HERO */}
      <header id="hero" className="summerlin-hero">
        {cms?.heroImageUrl
          ? <img src={`${cms.heroImageUrl}?w=1920&auto=format&q=85`} alt="Lone Mountain hero" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
          : <div className="hero-bg" />
        }
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
              <div className="hero-stat"><span className="hero-stat-num">{qs('Active Listings', '75+')}</span><span className="hero-stat-lbl">Active Listings</span></div>
              <div className="hero-stat"><span className="hero-stat-num">{qs('Price Range', '$450K\u2013$2M+')}</span><span className="hero-stat-lbl">Price Range</span></div>
              <div className="hero-stat"><span className="hero-stat-num">{qs('Lot Sizes', '\u00BD\u20132+ acres')}</span><span className="hero-stat-lbl">Lot Sizes</span></div>
              <div className="hero-stat"><span className="hero-stat-num">{qs('Equestrian', 'Horse-Zoned')}</span><span className="hero-stat-lbl">Properties</span></div>
            </div>
          </div>
        </div>
      </header>

      {/* MAP */}
      <section id="map" style={{ padding: '32px 0 0', background: 'var(--charcoal)' }}>
        <div className="container">
          <div className="section-header" style={{ marginBottom: '32px' }}>
            <span className="section-label">Location</span>
            <h2>Where is Lone Mountain?</h2>
            <p>Anchored by the iconic Lone Mountain peak in northwest Las Vegas &mdash; between Summerlin and Centennial Hills, with Spring Mountain views and quick freeway access.</p>
          </div>
          <div className="map-container">
            <LoneMountainMapWrapper />
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
            <h2>New Lone Mountain Listings</h2>
            <p>The 12 most recently listed homes in Lone Mountain &mdash; large-lot properties, equestrian estates, and newer subdivisions.</p>
          </div>
          <div className="ylopo-wrap">
            <div className="YLOPO_searchWidget" />
            <div className="YLOPO_resultsWidget" data-search='{"propertyTypes":["house","condo","townhouse"],"minPrice":300000,"locations":[{"city":"Las Vegas","state":"NV"}],"limit":12,"sortBy":"listDate","sortOrder":"desc","keywords":"Lone Mountain"}' />
          </div>
          <p className="ylopo-note">Listing data sourced from regional MLS. Information deemed reliable but not guaranteed. Updated daily.</p>
          <div className="listings-actions">
            <a href="https://search.nevadarealestategroup.net/search?s[orderBy]=sourceCreationDate%2Cdesc&s[page]=1&s[locations][0][city]=Las%20Vegas&s[locations][0][state]=NV&s[keywords]=Lone%20Mountain" target="_blank" rel="noopener noreferrer" className="btn-gold">View New Lone Mountain Listings Now &rarr;</a>
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
                  <p>Lone Mountain is one of those areas that surprises buyers who think they&apos;ve seen everything Las Vegas has to offer. While most of the valley is built on the master-planned community model &mdash; subdivisions, HOAs, identical setbacks &mdash; Lone Mountain has a completely different character. This is where you find half-acre, one-acre, and even two-plus-acre lots in the middle of the Las Vegas metro. Properties with horses. Custom homes with genuine breathing room. It&apos;s a semi-rural enclave surrounded by suburban growth, and that contrast is exactly what makes it valuable.</p>
                  <p>The area is anchored by Lone Mountain itself &mdash; a distinctive 300-foot volcanic butte that rises from the northwest valley floor and is visible from miles in every direction. Lone Mountain Regional Park surrounds the peak with hiking trails, walking paths, and open desert terrain. It&apos;s the kind of landmark that gives a neighborhood identity, and the properties surrounding it benefit from both the views and the permanent open space buffer.</p>
                  <p>What I tell buyers about Lone Mountain is that you&apos;re buying scarcity. Large-lot, non-HOA properties in the Las Vegas metro are not being created anymore &mdash; every new development is a master-planned subdivision. The existing Lone Mountain estates with their horse zoning, mature trees, and open-space character represent a finite inventory that only becomes more valuable as the surrounding area densifies. When Centennial Hills and Providence build out around it, Lone Mountain&apos;s large lots will stand out even more.</p>
                  <p>The location works better than most buyers expect. Downtown Summerlin is about 10 minutes south. Red Rock Canyon is 15 minutes west. The I-215 beltway and US-95 provide freeway access to the Strip in about 25 minutes. And the newer subdivisions that have been built along the Lone Mountain corridor give buyers who want the area&apos;s views and proximity without the large-lot maintenance a more conventional option starting in the mid-$400Ks.</p>
                </>
              )}
            </div>
            <div className="overview-aside">
              <div className="quick-facts">
                <h3>Lone Mountain At a Glance</h3>
                {displayStats.map(([label, value, cls]) => (
                  <div className="fact-row" key={label}>
                    <span className="fact-label">{label}</span>
                    <span className={`fact-value${cls ? ' ' + cls : ''}`}>{value}</span>
                  </div>
                ))}
              </div>
              <div className="cta-card">
                <p>Ready to explore Lone Mountain? Let&apos;s tour the large-lot estates, equestrian properties, and newer neighborhoods surrounding the peak.</p>
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
            <span className="section-label">Why Lone Mountain</span>
            <h2>What Makes Lone Mountain Stand Out</h2>
            <p>Large lots, equestrian freedom, and a semi-rural character that can&apos;t be replicated in a master-planned community.</p>
          </div>
          <div className="highlights-grid">
            {[
              { icon: '\u{1F3E1}', title: 'Large Lots: \u00BD to 2+ Acres', body: 'Some of the largest residential lots in the Las Vegas metro. Half-acre, one-acre, and multi-acre properties with the space and privacy that standard subdivisions can\u2019t provide.' },
              { icon: '\u{1F40E}', title: 'Equestrian Properties', body: 'One of the few Las Vegas areas zoned for horses. Properties with stables, riding areas, and trail access for equestrians who want to keep horses without leaving the metro.' },
              { icon: '\u26F0\uFE0F', title: 'Lone Mountain Peak & Park', body: 'The iconic 300-foot volcanic butte anchors the area with a regional park offering summit hiking trails, walking paths, and permanent open desert space.' },
              { icon: '\u{1F6AB}', title: 'Non-HOA Freedom', body: 'Many Lone Mountain properties have no HOA \u2014 increasingly rare in Las Vegas. Build what you want, park what you want, landscape how you want. Freedom that master-planned communities don\u2019t offer.' },
              { icon: '\u{1F4C9}', title: 'Scarcity Value', body: 'Large-lot, non-HOA properties are not being built anymore in Las Vegas. This finite inventory becomes more valuable as surrounding communities densify. You\u2019re buying what can\u2019t be replicated.' },
              { icon: '\u{1F304}', title: 'Spring Mountain Views', body: 'Panoramic views of the Spring Mountains and Red Rock escarpment from elevated lots. The open terrain around Lone Mountain preserves sightlines that subdivision walls block elsewhere.' },
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
            <h2>Explore Lone Mountain&apos;s Neighborhoods</h2>
            <p>From multi-acre equestrian estates to newer conventional subdivisions &mdash; genuine variety in lot size, style, and price.</p>
          </div>
          <div className="villages-grid">
            {[
              { name: 'Equestrian Estates', type: 'Horse-Zoned \u00B7 Large Lot', desc: 'Multi-acre properties zoned for horses with stables, riding areas, and the space for a genuine equestrian lifestyle. The most distinctive properties in the area \u2014 and among the most unique in the Las Vegas Valley.', price: 'From $900K' },
              { name: 'Lone Mountain Acres', type: 'Large Lot \u00B7 Custom', desc: 'Half-acre to one-acre custom home sites with mature landscaping and no HOA restrictions. The core of Lone Mountain\u2019s large-lot residential character. Space, privacy, and freedom.', price: 'From $700K' },
              { name: 'Lone Mountain Estates', type: 'Upscale \u00B7 Semi-Custom', desc: 'Larger semi-custom homes on generous lots near Lone Mountain Regional Park. Mountain views, established landscaping, and the area\u2019s signature open-space feel.', price: 'From $800K' },
              { name: 'Newer Subdivisions', type: 'Family \u00B7 Conventional', desc: 'Standard-lot subdivisions built along the Lone Mountain corridor offering newer construction with the area\u2019s views and proximity at more conventional price points.', price: 'From $450K' },
              { name: 'Parkside Neighborhoods', type: 'Family \u00B7 Park Access', desc: 'Neighborhoods adjacent to Lone Mountain Regional Park with hiking trail access from your door. The convenience of park proximity on standard residential lots.', price: 'From $500K' },
              { name: 'Custom Build Sites', type: 'Land \u00B7 Build Your Own', desc: 'Vacant land parcels in the Lone Mountain area for custom home construction. One of the last areas in northwest Las Vegas where you can buy land and build from scratch.', price: 'From $400K (land)' },
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
                alt="Lone Mountain peak and desert landscape in northwest Las Vegas"
              />
            </div>
            <div className="lifestyle-content">
              <span className="section-label">Rural Character, Urban Access</span>
              <div className="gold-rule" />
              <h2>Acres of Space, Minutes From Everything</h2>
              <p>Lone Mountain delivers a rare combination in the Las Vegas Valley &mdash; the space and freedom of semi-rural living with genuine urban convenience. You can keep horses, have a workshop, and enjoy mountain views from a property measured in acres, while still being 10 minutes from Downtown Summerlin&apos;s shops and restaurants.</p>
              <p>The area&apos;s character is defined by space. Open sightlines, mature trees, and the Lone Mountain peak itself create an atmosphere that feels more like a mountain community than a Las Vegas suburb.</p>
              <div className="lifestyle-bullets">
                {[
                  'Lone Mountain Regional Park \u2014 summit hiking trails, walking paths, and open desert directly adjacent to residential properties',
                  'Equestrian-friendly: horse-zoned lots with trail riding access through the surrounding desert terrain',
                  'Downtown Summerlin \u2014 125+ shops, restaurants, Las Vegas Ballpark \u2014 about 10 minutes south',
                  'Red Rock Canyon National Conservation Area \u2014 roughly 15 minutes west for hiking and scenic drives',
                  'Panoramic Spring Mountain views preserved by the area\u2019s large lots and open terrain',
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
            <h2>Schools Serving Lone Mountain Families</h2>
            <p>Northwest Las Vegas school options drawing from both the Summerlin and Centennial Hills corridors.</p>
          </div>
          <div className="schools-layout">
            <div className="school-group">
              <h3>Public Schools (CCSD)</h3>
              {[['John W. Bonner Elementary','K\u20135'],['Elise L. Wolff Elementary','K\u20135'],['Ernest Becker Middle School','6\u20138'],['Centennial High School','9\u201312'],['Palo Verde High School','9\u201312'],['West Career & Technical Academy','9\u201312'],].map(([n,g])=>(
                <div className="school-item" key={n}>{n}<span className="school-grades">{g}</span></div>
              ))}
            </div>
            <div className="school-group">
              <h3>Private &amp; Faith-Based</h3>
              {[['Faith Lutheran Middle & High','6\u201312'],['The Meadows School','PreK\u201312'],['Bishop Gorman High School','Catholic \u00B7 9\u201312'],].map(([n,g])=>(
                <div className="school-item" key={n}>{n}<span className="school-grades">{g}</span></div>
              ))}
            </div>
            <div className="school-group">
              <h3>Charter &amp; Independent</h3>
              {[['Doral Academy Red Rock','K\u20138'],['Pinecrest Academy of Nevada','K\u201312'],['Somerset Academy Sky Pointe','K\u20138'],].map(([n,g])=>(
                <div className="school-item" key={n}>{n}<span className="school-grades">{g}</span></div>
              ))}
              <div style={{marginTop:'24px',padding:'18px',background:'rgba(201,168,76,0.06)',border:'1px solid var(--border)',borderRadius:'var(--radius)',fontSize:'13px',color:'var(--white-70)',lineHeight:'1.7'}}>
                <strong style={{color:'var(--white)'}}>School Assignment Note:</strong> Lone Mountain spans multiple CCSD school zones. The area sits between Summerlin and Centennial Hills school corridors. Always confirm your assigned school with CCSD before purchasing.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <LoneMountainFAQ />

      {/* CTA */}
      <section id="cta">
        <div className="container">
          <h2>Ready to Find Your Lone Mountain Home?</h2>
          <p>Whether you want an equestrian estate on two acres, a custom home with mountain views, or a newer subdivision near the park, I&apos;ll help you find the right property in Lone Mountain.</p>
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
