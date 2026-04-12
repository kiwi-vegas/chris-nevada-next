import SevenHillsFAQ from '@/components/SevenHillsFAQ'
import Link from 'next/link'
import type { Metadata } from 'next'
import SevenHillsMapWrapper from '@/components/SevenHillsMapWrapper'
import PortableText from '@/components/PortableText'
import { getCommunityPage } from '@/sanity/queries'
import { mergeQuickStats, mergeDriveTimes, getSectionImageUrl } from '@/lib/community-utils'

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const cms = await getCommunityPage('seven-hills')
  return {
    title: cms?.metaTitle ?? 'Seven Hills Homes For Sale | Nevada Real Estate Group',
    description: cms?.metaDescription ?? 'Browse Seven Hills homes for sale in Henderson, NV. Upscale master-planned community with Rio Secco Golf Club, guard-gated neighborhoods, and panoramic Strip views. Call 725.239.9950.',
  }
}

export default async function SevenHillsPage() {
  const cms = await getCommunityPage('seven-hills')

  const heroHeadline = cms?.heroHeadline ?? 'Seven Hills Homes\nFor Sale'
  const heroSubheadline = cms?.heroSubheadline ?? "Henderson\u2019s elevated luxury community \u2014 1,300 acres of rolling terrain with a Rees Jones golf course, guard-gated estates, and panoramic Las Vegas Strip views."
  const overviewTitle = cms?.overviewTitle ?? 'Seven Hills: Henderson\u2019s Elevated Address'

  const HARDCODED_STATS: Array<[string, string] | [string, string, string]> = [
    ['Established', '1999'],
    ['Developer', 'American Nevada Corp.'],
    ['Total Acreage', '~1,300 acres'],
    ['Homes', '3,500+'],
    ['Median Home Price', '~$700,000', 'gold'],
    ['Neighborhoods', '15+'],
    ['Guard-Gated', 'Multiple neighborhoods'],
    ['Golf Course', 'Rio Secco (Rees Jones, private)'],
    ['Golf School', 'Butch Harmon School of Golf'],
    ['Parks & Trails', 'Community network'],
    ['Distance to Strip', '15\u201320 min'],
    ['Distance to Airport', '~15 min'],
  ]
  const displayStats = mergeQuickStats(HARDCODED_STATS, cms?.quickStats)
  const HARDCODED_DRIVE_TIMES = [
    { time: '15\u201320 min', destination: 'to the Strip', route: 'via I-215 \u2192 I-15' },
    { time: '~15 min', destination: 'to Harry Reid Airport', route: 'via I-215 \u2192 I-15' },
    { time: '~10 min', destination: 'to Galleria at Sunset', route: 'via Eastern Ave' },
    { time: '~20 min', destination: 'to Lake Mead', route: 'via Lake Mead Pkwy East' },
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
          <span>Seven Hills</span>
        </div>
      </div>

      {/* HERO */}
      <header id="hero" className="summerlin-hero">
        {cms?.heroImageUrl
          ? <img src={`${cms.heroImageUrl}?w=1920&auto=format&q=85`} alt="Seven Hills hero" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
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
              <div className="hero-stat"><span className="hero-stat-num">{qs('Active Listings', '75+')}</span><span className="hero-stat-lbl">Active Listings</span></div>
              <div className="hero-stat"><span className="hero-stat-num">{qs('Price Range', '$500K\u2013$3M+')}</span><span className="hero-stat-lbl">Price Range</span></div>
              <div className="hero-stat"><span className="hero-stat-num">{qs('Golf Course', 'Rio Secco')}</span><span className="hero-stat-lbl">Private Golf</span></div>
              <div className="hero-stat"><span className="hero-stat-num">{qs('Guard-Gated', 'Multiple')}</span><span className="hero-stat-lbl">Guard-Gated</span></div>
            </div>
          </div>
        </div>
      </header>

      {/* MAP */}
      <section id="map" style={{ padding: '32px 0 0', background: 'var(--charcoal)' }}>
        <div className="container">
          <div className="section-header" style={{ marginBottom: '32px' }}>
            <span className="section-label">Location</span>
            <h2>Where is Seven Hills?</h2>
            <p>Built on rolling elevated terrain in south Henderson &mdash; one of the highest residential communities in the valley with panoramic views of the Las Vegas Strip and surrounding mountains.</p>
          </div>
          <div className="map-container">
            <SevenHillsMapWrapper />
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
            <h2>New Seven Hills Listings</h2>
            <p>The 12 most recently listed homes in Seven Hills &mdash; from family neighborhoods to guard-gated golf course estates.</p>
          </div>
          <div className="ylopo-wrap">
            <div className="YLOPO_searchWidget" />
            <div className="YLOPO_resultsWidget" data-search='{"propertyTypes":["house","condo","townhouse"],"minPrice":400000,"locations":[{"city":"Henderson","state":"NV"}],"limit":12,"sortBy":"listDate","sortOrder":"desc","keywords":"Seven Hills"}' />
          </div>
          <p className="ylopo-note">Listing data sourced from regional MLS. Information deemed reliable but not guaranteed. Updated daily.</p>
          <div className="listings-actions">
            <a href="https://search.nevadarealestategroup.net/search?s[orderBy]=sourceCreationDate%2Cdesc&s[page]=1&s[locations][0][city]=Henderson&s[locations][0][state]=NV&s[keywords]=Seven%20Hills" target="_blank" rel="noopener noreferrer" className="btn-gold">View New Seven Hills Listings Now &rarr;</a>
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
                  <p>Seven Hills is one of Henderson&apos;s most distinguished addresses, and the name tells you everything you need to know about the setting. Built across seven distinct hilltops in south Henderson, this community has genuine topographic variety that creates something rare in the Las Vegas Valley &mdash; neighborhoods where the terrain rises and falls, streets wind through natural contours, and the views change dramatically from one block to the next. From the highest lots, the entire Strip skyline stretches across your horizon.</p>
                  <p>American Nevada Corporation developed Seven Hills starting in 1999, and they invested in the kind of infrastructure that signals long-term value. The Rio Secco Golf Club anchors the community &mdash; a Rees Jones championship design that&apos;s consistently ranked among the best private courses in Nevada. The Butch Harmon School of Golf at Rio Secco adds a pedigree that serious golfers recognize worldwide. Even if you don&apos;t play, the golf course creates sweeping green corridors through the community that elevate the feel of every surrounding neighborhood.</p>
                  <p>The guard-gated neighborhoods are where Seven Hills steps into the luxury tier. Rio Secco Estates and Country Club Hills offer staffed entry gates, private streets, and some of the most impressive residential architecture in Henderson. Custom and semi-custom homes in these enclaves range from $800K to well over $3M, with lot sizes and finishes that compete with anything in Summerlin&apos;s Ridges or MacDonald Highlands. But Seven Hills also has accessible entry points &mdash; well-maintained non-gated neighborhoods starting in the low $500Ks that give you the community&apos;s parks, trails, and Henderson address without the luxury price tag.</p>
                  <p>The location is quietly excellent. The I-215 beltway connects you to the Strip and airport in about 15 minutes. Galleria at Sunset and Henderson&apos;s dining scene are 10 minutes north. And Henderson&apos;s reputation as one of America&apos;s safest cities applies fully here &mdash; clean streets, responsive services, and a community character that homeowners consistently invest in maintaining.</p>
                </>
              )}
            </div>
            <div className="overview-aside">
              <div className="quick-facts">
                <h3>Seven Hills At a Glance</h3>
                {displayStats.map(([label, value, cls]) => (
                  <div className="fact-row" key={label}>
                    <span className="fact-label">{label}</span>
                    <span className={`fact-value${cls ? ' ' + cls : ''}`}>{value}</span>
                  </div>
                ))}
              </div>
              <div className="cta-card">
                <p>Ready to explore Seven Hills? Let&apos;s schedule a private tour of the community, including the guard-gated enclaves and golf course properties.</p>
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
            <span className="section-label">Why Seven Hills</span>
            <h2>What Makes Seven Hills Stand Out</h2>
            <p>Elevation, a world-class golf club, and guard-gated luxury &mdash; in one of America&apos;s safest cities.</p>
          </div>
          <div className="highlights-grid">
            {[
              { icon: '\u{26F0}\uFE0F', title: 'Elevated Terrain & Strip Views', body: 'Built across seven hilltops with genuine topographic variety. The highest lots offer panoramic Strip views that are among the most dramatic residential vistas in the Las Vegas Valley.' },
              { icon: '\u26F3', title: 'Rio Secco Golf Club', body: 'A private Rees Jones championship course consistently ranked among Nevada\u2019s best. Home to the Butch Harmon School of Golf \u2014 a world-renowned instruction program.' },
              { icon: '\u{1F512}', title: 'Guard-Gated Neighborhoods', body: 'Multiple guard-gated enclaves including Rio Secco Estates and Country Club Hills. Staffed entry points, private streets, and some of Henderson\u2019s most impressive residential architecture.' },
              { icon: '\u{1F6E1}\uFE0F', title: 'Henderson: Top 10 Safest City', body: 'Henderson consistently ranks among the top 10 safest large cities in America. Seven Hills benefits from Henderson\u2019s low crime, clean infrastructure, and responsive city services.' },
              { icon: '\u{1F3E0}', title: 'Entry Points at Every Level', body: 'From non-gated single-family homes in the low $500Ks to $3M+ guard-gated estates. Seven Hills offers luxury community amenities at multiple price tiers.' },
              { icon: '\u{1F6E3}\uFE0F', title: 'I-215 Beltway Access', body: 'Quick access to the I-215 beltway puts the Strip and airport about 15 minutes away. Galleria at Sunset and Henderson dining are 10 minutes north on Eastern Ave.' },
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
            <h2>Explore Seven Hills&apos; Neighborhoods</h2>
            <p>From guard-gated golf estates to accessible family neighborhoods, all on elevated Henderson terrain.</p>
          </div>
          <div className="villages-grid">
            {[
              { name: 'Rio Secco Estates', type: 'Guard-Gated \u00B7 Golf \u00B7 Ultra-Luxury', desc: 'The most exclusive address in Seven Hills \u2014 guard-gated custom and semi-custom estates on and around the Rio Secco Golf Club. Premium lots with golf course, city, and mountain views.', price: 'From $1.2M' },
              { name: 'Country Club Hills', type: 'Guard-Gated \u00B7 Luxury', desc: 'A guard-gated luxury neighborhood with larger homes, private streets, and some of the best elevation-driven Strip views in the community. Quieter and more exclusive.', price: 'From $800K' },
              { name: 'Seven Hills Core', type: 'Family \u00B7 Established', desc: 'The heart of Seven Hills with well-maintained single-family neighborhoods, community parks, trail access, and strong schools. The most popular section for families.', price: 'From $550K' },
              { name: 'Hilltop Neighborhoods', type: 'Views \u00B7 Premium', desc: 'Non-gated neighborhoods positioned on the community\u2019s higher terrain. Panoramic valley and Strip views at price points below the guard-gated enclaves.', price: 'From $650K' },
              { name: 'Seven Hills Townhomes', type: 'Attached \u00B7 Low-Maintenance', desc: 'Townhome communities within Seven Hills offering the community\u2019s amenities and Henderson address in a low-maintenance format. Popular with professionals and downsizers.', price: 'From $450K' },
              { name: 'Golf Course Adjacent', type: 'Golf Views \u00B7 Non-Gated', desc: 'Non-gated homes positioned near the Rio Secco Golf Club with fairway views and the open-space buffer of the course. The golf lifestyle without the guard-gate premium.', price: 'From $700K' },
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
                alt="Elevated terrain and Strip views from Seven Hills, Henderson"
              />
            </div>
            <div className="lifestyle-content">
              <span className="section-label">Golf &amp; Elevated Living</span>
              <div className="gold-rule" />
              <h2>Championship Golf, Hilltop Views, and Henderson&apos;s Safest Streets</h2>
              <p>Seven Hills delivers a lifestyle built around elevation. The rolling terrain creates a different experience than flat-ground communities &mdash; streets wind through natural contours, backyards look out over the valley, and sunset views of the Strip against the Spring Mountains are a daily event, not a special occasion.</p>
              <p>Rio Secco Golf Club and the Butch Harmon School of Golf anchor the community&apos;s recreational identity, while parks, trails, and Henderson&apos;s infrastructure provide everyday quality of life.</p>
              <div className="lifestyle-bullets">
                {[
                  'Rio Secco Golf Club \u2014 private Rees Jones championship course with Butch Harmon School of Golf',
                  'Panoramic Strip and mountain views from elevated lots throughout the community',
                  'Community parks, trails, and walking paths connecting neighborhoods',
                  'Galleria at Sunset and Henderson dining district \u2014 roughly 10 minutes north',
                  'Lake Mead, Sloan Canyon, and Bootleg Canyon mountain biking all within 20\u201330 minutes',
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
            <h2>Schools Serving Seven Hills Families</h2>
            <p>Henderson&apos;s strong school options include well-regarded campuses near the community.</p>
          </div>
          <div className="schools-layout">
            <div className="school-group">
              <h3>Public Schools (CCSD)</h3>
              {[['John C. Vanderburg Elementary','K\u20135'],['Elise L. Wolff Elementary','K\u20135'],['Del E. Webb Middle School','6\u20138'],['Coronado High School','9\u201312'],['Liberty High School','9\u201312'],].map(([n,g])=>(
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
                <strong style={{color:'var(--white)'}}>School Assignment Note:</strong> Seven Hills spans multiple Henderson school zones. Guard-gated and non-gated neighborhoods may have different assigned schools. Always confirm with CCSD before purchasing.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <SevenHillsFAQ />

      {/* CTA */}
      <section id="cta">
        <div className="container">
          <h2>Ready to Find Your Seven Hills Home?</h2>
          <p>From guard-gated golf estates with Strip views to family homes on Henderson&apos;s safest streets, I&apos;ll help you find the right neighborhood and price point in Seven Hills.</p>
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
