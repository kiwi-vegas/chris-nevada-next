import ParadiseFAQ from '@/components/ParadiseFAQ'
import Link from 'next/link'
import type { Metadata } from 'next'
import ParadiseMapWrapper from '@/components/ParadiseMapWrapper'
import PortableText from '@/components/PortableText'
import { getCommunityPage } from '@/sanity/queries'
import { mergeQuickStats, mergeDriveTimes, getSectionImageUrl } from '@/lib/community-utils'

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const cms = await getCommunityPage('paradise')
  return {
    title: cms?.metaTitle ?? 'Paradise Homes For Sale | Nevada Real Estate Group',
    description: cms?.metaDescription ?? 'Browse Paradise homes for sale in central Las Vegas. Home to the Strip, UNLV, and Harry Reid Airport. Condos from $150K, homes from $300K, luxury high-rises to $10M+. Call 725.239.9950.',
  }
}

export default async function ParadisePage() {
  const cms = await getCommunityPage('paradise')

  const heroHeadline = cms?.heroHeadline ?? 'Paradise Homes\nFor Sale'
  const heroSubheadline = cms?.heroSubheadline ?? "The unincorporated heart of Las Vegas \u2014 home to the Strip, UNLV, Harry Reid Airport, and the widest range of housing in the valley."
  const overviewTitle = cms?.overviewTitle ?? 'Paradise: Where Las Vegas Actually Lives'

  const HARDCODED_STATS: Array<[string, string] | [string, string, string]> = [
    ['Type', 'Unincorporated town'],
    ['County', 'Clark County'],
    ['Population', '~230,000'],
    ['Area', '~46 sq miles'],
    ['Median Home Price', '~$375,000', 'gold'],
    ['Neighborhoods', '40+'],
    ['Landmarks', 'The Strip, UNLV, Airport'],
    ['Business District', 'Hughes Center / Howard Hughes Pkwy'],
    ['Key Freeways', 'I-15 & I-215'],
    ['Convention Center', 'Las Vegas Convention Center'],
    ['Distance to Strip', '0\u201310 min'],
    ['Distance to Airport', '0\u201310 min'],
  ]
  const displayStats = mergeQuickStats(HARDCODED_STATS, cms?.quickStats)
  const HARDCODED_DRIVE_TIMES = [
    { time: '0\u201310 min', destination: 'to the Strip', route: 'The Strip is in Paradise' },
    { time: '0\u201310 min', destination: 'to Harry Reid Airport', route: 'Airport is in Paradise' },
    { time: '~10 min', destination: 'to Downtown Las Vegas', route: 'via Las Vegas Blvd North' },
    { time: '~15 min', destination: 'to Henderson', route: 'via I-215 or Eastern Ave' },
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
          <span>Paradise</span>
        </div>
      </div>

      {/* HERO */}
      <header id="hero" className="summerlin-hero">
        {cms?.heroImageUrl
          ? <img src={`${cms.heroImageUrl}?w=1920&auto=format&q=85`} alt="Paradise hero" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
          : <div className="hero-bg" />
        }
        <div className="hero-overlay" />
        <div className="hero-content summerlin">
          <div className="container">
            <p className="hero-eyebrow-sm">Central Las Vegas, Nevada</p>
            <div className="hero-rule" />
            <h1>{heroHeadline.split('\n').map((line, i) => (
              <span key={i}>{line}{i < heroHeadline.split('\n').length - 1 && <br />}</span>
            ))}</h1>
            <p className="hero-sub">{heroSubheadline}</p>
            <div className="hero-stats">
              <div className="hero-stat"><span className="hero-stat-num">{qs('Active Listings', '600+')}</span><span className="hero-stat-lbl">Active Listings</span></div>
              <div className="hero-stat"><span className="hero-stat-num">{qs('Price Range', '$150K\u2013$10M+')}</span><span className="hero-stat-lbl">Price Range</span></div>
              <div className="hero-stat"><span className="hero-stat-num">{qs('Distance to Strip', '0\u201310 min')}</span><span className="hero-stat-lbl">To the Strip</span></div>
              <div className="hero-stat"><span className="hero-stat-num">{qs('Population', '230K+')}</span><span className="hero-stat-lbl">Population</span></div>
            </div>
          </div>
        </div>
      </header>

      {/* MAP */}
      <section id="map" style={{ padding: '32px 0 0', background: 'var(--charcoal)' }}>
        <div className="container">
          <div className="section-header" style={{ marginBottom: '32px' }}>
            <span className="section-label">Location</span>
            <h2>Where is Paradise?</h2>
            <p>Encompassing the central Las Vegas corridor from the Strip to UNLV to Harry Reid Airport &mdash; the geographic and economic heart of the valley.</p>
          </div>
          <div className="map-container">
            <ParadiseMapWrapper />
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
            <h2>New Paradise Listings</h2>
            <p>The 12 most recently listed properties in Paradise &mdash; condos, high-rises, townhomes, and single-family homes from $150K to $10M+.</p>
          </div>
          <div className="ylopo-wrap">
            <div className="YLOPO_searchWidget" />
            <div className="YLOPO_resultsWidget" data-search='{"propertyTypes":["house","condo","townhouse"],"minPrice":100000,"locations":[{"city":"Las Vegas","state":"NV"}],"limit":12,"sortBy":"listDate","sortOrder":"desc","keywords":"Paradise"}' />
          </div>
          <p className="ylopo-note">Listing data sourced from regional MLS. Information deemed reliable but not guaranteed. Updated daily.</p>
          <div className="listings-actions">
            <a href="https://search.nevadarealestategroup.net/search?s[orderBy]=sourceCreationDate%2Cdesc&s[page]=1&s[locations][0][city]=Las%20Vegas&s[locations][0][state]=NV&s[keywords]=Paradise" target="_blank" rel="noopener noreferrer" className="btn-gold">View New Paradise Listings Now &rarr;</a>
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
                  <p>Most people don&apos;t realize that the Las Vegas Strip isn&apos;t actually in Las Vegas. It&apos;s in Paradise &mdash; an unincorporated town of roughly 230,000 people that encompasses the geographic and economic center of the entire valley. The Strip, Harry Reid International Airport, UNLV, the Las Vegas Convention Center, the T-Mobile Arena, Allegiant Stadium &mdash; they&apos;re all technically in Paradise. When people picture &ldquo;Las Vegas,&rdquo; they&apos;re mostly picturing Paradise.</p>
                  <p>For real estate, this means Paradise offers something no other community in the valley can &mdash; the ability to live within walking distance or a short drive of the largest concentration of employment, entertainment, and economic activity in Nevada. If you work on the Strip, at the airport, at the Convention Center, or at UNLV, living in Paradise can mean a commute measured in minutes instead of miles. For hospitality workers doing shift work, that proximity isn&apos;t a luxury &mdash; it&apos;s a quality-of-life necessity.</p>
                  <p>The housing stock here is the most varied in the valley. You can find a $150K condo near UNLV, a mid-century ranch in Paradise Palms or Huntridge with genuine architectural character, a modern townhome in the Hughes Center business district, or a $10M penthouse in a Strip-adjacent luxury high-rise. No other community covers that spectrum. The neighborhoods east of the Strip &mdash; along Maryland Parkway, around UNLV, and in the established residential blocks between Eastern and Tropicana &mdash; have a walkable urban character that&apos;s unique in Las Vegas.</p>
                  <p>Paradise also has a strong investor case. Steady rental demand from hospitality workers, UNLV students, business travelers, and short-term vacation renters means well-located properties rarely sit vacant. The ongoing development around Allegiant Stadium, the Convention Center expansion, and UNLV&apos;s growth continue to push demand higher. For both owner-occupants and investors, Paradise delivers a combination of location, variety, and upside that the suburban master-planned communities simply can&apos;t match.</p>
                </>
              )}
            </div>
            <div className="overview-aside">
              <div className="quick-facts">
                <h3>Paradise At a Glance</h3>
                {displayStats.map(([label, value, cls]) => (
                  <div className="fact-row" key={label}>
                    <span className="fact-label">{label}</span>
                    <span className={`fact-value${cls ? ' ' + cls : ''}`}>{value}</span>
                  </div>
                ))}
              </div>
              <div className="cta-card">
                <p>Ready to explore Paradise? Let&apos;s find the neighborhood that fits your lifestyle, commute, and investment goals.</p>
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
            <span className="section-label">Why Paradise</span>
            <h2>What Makes Paradise Stand Out</h2>
            <p>The Strip, the airport, UNLV, and the widest housing spectrum in the valley &mdash; all in one community.</p>
          </div>
          <div className="highlights-grid">
            {[
              { icon: '\u{1F3B0}', title: 'Home of the Las Vegas Strip', body: 'The entire Strip corridor falls within Paradise. Living here means the world\u2019s most famous entertainment district is your neighborhood \u2014 not a commute destination.' },
              { icon: '\u2708\uFE0F', title: 'Airport in Your Backyard', body: 'Harry Reid International Airport is within Paradise\u2019s boundaries. Some neighborhoods are 5 minutes from the terminal \u2014 a massive advantage for frequent travelers and aviation workers.' },
              { icon: '\u{1F393}', title: 'UNLV Campus & Culture', body: 'The University of Nevada, Las Vegas brings academic, cultural, and athletic energy. The campus district supports a vibrant rental market and a walkable urban lifestyle.' },
              { icon: '\u{1F4B0}', title: 'Widest Price Spectrum', body: '$150K condos to $10M+ penthouses. No other Las Vegas community covers this range. Whether you\u2019re a first-time buyer, an investor, or a luxury seeker, Paradise has your price point.' },
              { icon: '\u{1F4C8}', title: 'Strong Investment Market', body: 'Steady rental demand from Strip workers, UNLV students, and tourists. Allegiant Stadium, Convention Center expansion, and UNLV growth continue driving appreciation.' },
              { icon: '\u{1F3D9}\uFE0F', title: 'Urban Walkability', body: 'The UNLV district, Maryland Parkway corridor, and Hughes Center area offer something rare in Las Vegas \u2014 genuinely walkable urban neighborhoods with restaurants, shops, and services.' },
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
            <h2>Explore Paradise&apos;s Neighborhoods</h2>
            <p>From mid-century character homes to Strip-adjacent luxury high-rises &mdash; the most diverse housing in Las Vegas.</p>
          </div>
          <div className="villages-grid">
            {[
              { name: 'Strip-Adjacent High-Rises', type: 'Luxury \u00B7 High-Rise \u00B7 Views', desc: 'Luxury condominium towers on and near the Las Vegas Strip \u2014 Veer Towers, Panorama, Allure, and others. Floor-to-ceiling views, resort amenities, and a lifestyle unlike anything else in the valley.', price: 'From $400K' },
              { name: 'Hughes Center / Howard Hughes', type: 'Business District \u00B7 Upscale', desc: 'The corporate heart of Las Vegas with upscale condos and townhomes. Walking distance to offices, restaurants, and the Strip. Popular with professionals and executives.', price: 'From $350K' },
              { name: 'UNLV District', type: 'Urban \u00B7 Walkable', desc: 'The neighborhoods surrounding UNLV with a vibrant mix of single-family homes, condos, and townhomes. Walkable to campus, restaurants, and Maryland Parkway retail.', price: 'From $250K' },
              { name: 'Paradise Palms', type: 'Mid-Century \u00B7 Character', desc: 'A historic mid-century modern neighborhood built in the 1960s. Architectural character, mature trees, and a creative community vibe. One of Las Vegas\u2019s most distinctive residential areas.', price: 'From $350K' },
              { name: 'Huntridge', type: 'Historic \u00B7 Walkable', desc: 'One of Las Vegas\u2019s oldest residential neighborhoods with genuine historic character, walkability to local shops and restaurants, and proximity to the Arts District.', price: 'From $300K' },
              { name: 'Airport Corridor Condos', type: 'Investor \u00B7 Entry-Level', desc: 'Condos and townhomes near the airport corridor. The most accessible price points in Paradise \u2014 popular with investors, first-time buyers, and hospitality workers who need proximity.', price: 'From $150K' },
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
                alt="Las Vegas Strip skyline and urban lifestyle in Paradise"
              />
            </div>
            <div className="lifestyle-content">
              <span className="section-label">Urban Living</span>
              <div className="gold-rule" />
              <h2>Strip Access, University Culture, and a Walkable Urban Core</h2>
              <p>Paradise is the only community in the Las Vegas Valley where you can genuinely live an urban lifestyle. The Strip, UNLV, and the Maryland Parkway corridor create pockets of walkability, dining density, and cultural activity that the suburban communities can&apos;t replicate.</p>
              <p>Whether it&apos;s catching a show on the Strip, grabbing dinner on Maryland Parkway, or watching a UNLV game, entertainment and culture are woven into daily life here.</p>
              <div className="lifestyle-bullets">
                {[
                  'Las Vegas Strip \u2014 world-class entertainment, dining, and nightlife within your community\u2019s borders',
                  'UNLV campus \u2014 academic events, athletics (Runnin\u2019 Rebels), and cultural programming year-round',
                  'Maryland Parkway corridor \u2014 local restaurants, shops, and services in a walkable urban setting',
                  'Allegiant Stadium and T-Mobile Arena \u2014 Raiders, Golden Knights, concerts, and major events',
                  'Las Vegas Convention Center \u2014 CES, SEMA, and hundreds of major conventions driving economic activity',
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
            <h2>Schools Serving Paradise Families</h2>
            <p>A wide range of public, private, and charter options across the community.</p>
          </div>
          <div className="schools-layout">
            <div className="school-group">
              <h3>Public Schools (CCSD)</h3>
              {[['Paradise Elementary','K\u20135'],['Tom Williams Elementary','K\u20135'],['Roy W. Martin Middle School','6\u20138'],['Jim Bridger Middle School','6\u20138'],['Rancho High School','9\u201312'],['Las Vegas Academy of the Arts','9\u201312'],['Southeast Career Technical Academy','9\u201312'],].map(([n,g])=>(
                <div className="school-item" key={n}>{n}<span className="school-grades">{g}</span></div>
              ))}
            </div>
            <div className="school-group">
              <h3>Private &amp; University</h3>
              {[['Bishop Gorman High School','Catholic \u00B7 9\u201312'],['The Meadows School','PreK\u201312'],['UNLV','University'],['Nevada State University','University'],].map(([n,g])=>(
                <div className="school-item" key={n}>{n}<span className="school-grades">{g}</span></div>
              ))}
            </div>
            <div className="school-group">
              <h3>Charter &amp; Specialty</h3>
              {[['Las Vegas Academy of the Arts','9\u201312'],['Somerset Academy','K\u20138'],['Doral Academy of Nevada','K\u20138'],['Coral Academy of Science','K\u201312'],].map(([n,g])=>(
                <div className="school-item" key={n}>{n}<span className="school-grades">{g}</span></div>
              ))}
              <div style={{marginTop:'24px',padding:'18px',background:'rgba(201,168,76,0.06)',border:'1px solid var(--border)',borderRadius:'var(--radius)',fontSize:'13px',color:'var(--white-70)',lineHeight:'1.7'}}>
                <strong style={{color:'var(--white)'}}>School Assignment Note:</strong> Paradise covers a vast area with many school zones. Quality varies significantly by neighborhood. Las Vegas Academy of the Arts is a selective magnet school. Always confirm your assigned school with CCSD before purchasing.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <ParadiseFAQ />

      {/* CTA */}
      <section id="cta">
        <div className="container">
          <h2>Ready to Find Your Paradise Home?</h2>
          <p>Whether you&apos;re looking for a Strip-view penthouse, a mid-century gem in Paradise Palms, or an investment condo near the airport, I&apos;ll help you navigate Paradise&apos;s incredible variety.</p>
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
