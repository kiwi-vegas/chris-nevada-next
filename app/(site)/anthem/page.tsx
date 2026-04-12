import AnthemFAQ from '@/components/AnthemFAQ'
import Link from 'next/link'
import type { Metadata } from 'next'
import AnthemMapWrapper from '@/components/AnthemMapWrapper'
import PortableText from '@/components/PortableText'
import { getCommunityPage } from '@/sanity/queries'
import { mergeQuickStats, mergeDriveTimes, getSectionImageUrl } from '@/lib/community-utils'

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const cms = await getCommunityPage('anthem')
  return {
    title: cms?.metaTitle ?? 'Anthem Homes For Sale | Nevada Real Estate Group',
    description: cms?.metaDescription ?? 'Browse Anthem homes for sale in Henderson, NV. Premier master-planned community in the McCullough Range foothills with country club golf, luxury estates, and Strip views. Call 725.239.9950.',
  }
}

export default async function AnthemPage() {
  const cms = await getCommunityPage('anthem')

  const heroHeadline = cms?.heroHeadline ?? 'Anthem Homes\nFor Sale'
  const heroSubheadline = cms?.heroSubheadline ?? "Henderson\u2019s premier foothill community \u2014 4,755 acres in the McCullough Range with a private country club, luxury neighborhoods, and panoramic Strip views."
  const overviewTitle = cms?.overviewTitle ?? 'Anthem: Henderson\u2019s Address in the Foothills'

  const HARDCODED_STATS: Array<[string, string] | [string, string, string]> = [
    ['Established', '1998'],
    ['Developer', 'Del Webb / Pulte Homes'],
    ['Total Acreage', '~4,755 acres'],
    ['Homes', '11,000+'],
    ['Median Home Price', '~$625,000', 'gold'],
    ['Neighborhoods', '25+'],
    ['Schools', '8+ nearby'],
    ['Parks & Trails', '30+ miles of trails'],
    ['Country Club', 'Anthem Country Club (private)'],
    ['Community Center', 'Anthem Center'],
    ['Distance to Strip', '~25 min'],
    ['Distance to Lake Mead', '~25 min'],
  ]
  const displayStats = mergeQuickStats(HARDCODED_STATS, cms?.quickStats)
  const HARDCODED_DRIVE_TIMES = [
    { time: '~25 min', destination: 'to the Strip', route: 'via I-215 \u2192 I-15' },
    { time: '~10 min', destination: 'to Galleria at Sunset', route: 'via Eastern Ave' },
    { time: '~25 min', destination: 'to Lake Mead', route: 'via Lake Mead Pkwy East' },
    { time: '~20 min', destination: 'to Harry Reid Airport', route: 'via I-215 \u2192 I-15' },
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
          <span>Anthem</span>
        </div>
      </div>

      {/* HERO */}
      <header id="hero" className="summerlin-hero">
        {cms?.heroImageUrl
          ? <img src={`${cms.heroImageUrl}?w=1920&auto=format&q=85`} alt="Anthem hero" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
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
              <div className="hero-stat"><span className="hero-stat-num">{qs('Price Range', '$400K\u2013$3M+')}</span><span className="hero-stat-lbl">Price Range</span></div>
              <div className="hero-stat"><span className="hero-stat-num">{qs('Country Club', 'Private')}</span><span className="hero-stat-lbl">Country Club</span></div>
              <div className="hero-stat"><span className="hero-stat-num">{qs('Total Acreage', '4,755')}</span><span className="hero-stat-lbl">Acres</span></div>
            </div>
          </div>
        </div>
      </header>

      {/* MAP */}
      <section id="map" style={{ padding: '32px 0 0', background: 'var(--charcoal)' }}>
        <div className="container">
          <div className="section-header" style={{ marginBottom: '32px' }}>
            <span className="section-label">Location</span>
            <h2>Where is Anthem?</h2>
            <p>Built into the foothills of the McCullough Range in southeast Henderson &mdash; elevated terrain with panoramic views of the Las Vegas Valley and the Strip skyline.</p>
          </div>
          <div className="map-container">
            <AnthemMapWrapper />
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
            <h2>New Anthem Listings</h2>
            <p>The 12 most recently listed homes in Anthem &mdash; from family neighborhoods to country club estates.</p>
          </div>
          <div className="ylopo-wrap">
            <div className="YLOPO_searchWidget" />
            <div className="YLOPO_resultsWidget" data-search='{"propertyTypes":["house","condo","townhouse"],"minPrice":300000,"locations":[{"city":"Henderson","state":"NV"}],"limit":12,"sortBy":"listDate","sortOrder":"desc","keywords":"Anthem"}' />
          </div>
          <p className="ylopo-note">Listing data sourced from regional MLS. Information deemed reliable but not guaranteed. Updated daily.</p>
          <div className="listings-actions">
            <a href="https://search.nevadarealestategroup.net/search?s[orderBy]=sourceCreationDate%2Cdesc&s[page]=1&s[locations][0][city]=Henderson&s[locations][0][state]=NV&s[keywords]=Anthem" target="_blank" rel="noopener noreferrer" className="btn-gold">View New Anthem Listings Now &rarr;</a>
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
                  <p>Anthem is the community I show to buyers who want more than a house &mdash; they want a setting. Built into the foothills of the McCullough Range starting in the late 1990s, Anthem has something that no other Henderson community can replicate: genuine elevation. Streets rise and wind through natural desert terrain, and the higher you go, the more dramatic the views become. On a clear evening, you can see the entire Las Vegas Strip from your backyard. That&apos;s not marketing &mdash; that&apos;s geography.</p>
                  <p>Del Webb and Pulte Homes developed Anthem as a full-spectrum community, and the variety shows. Sun City Anthem anchors the southeast as one of the most successful 55+ active adult communities in the country &mdash; multiple golf courses, recreation centers, and a social calendar that never stops. Anthem Country Club occupies the premium tier with its Hale Irwin-designed private course, guard gates, and custom estates. And Anthem Highlands fills the family segment with well-built neighborhoods, strong schools, and the Anthem Center as a community hub.</p>
                  <p>The Anthem Center is worth calling out specifically. It&apos;s a full community center with resort-style pools, sports courts, a fitness area, and year-round programming for all ages. The trail system extends over 30 miles through the community, connecting neighborhoods to parks, open desert, and the surrounding mountain terrain. People who move to Anthem for the views end up staying for the trails.</p>
                  <p>The location in southeast Henderson puts you in one of the safest cities in America with the I-215 beltway providing a clean commute corridor to the airport, the Strip, and the rest of the valley. Lake Mead is about 25 minutes east. Galleria at Sunset and the Henderson dining scene are 10 minutes north. And the price spectrum &mdash; from $400K townhomes to $3M+ country club estates &mdash; means Anthem has a genuine path for buyers at every stage of life.</p>
                </>
              )}
            </div>
            <div className="overview-aside">
              <div className="quick-facts">
                <h3>Anthem At a Glance</h3>
                {displayStats.map(([label, value, cls]) => (
                  <div className="fact-row" key={label}>
                    <span className="fact-label">{label}</span>
                    <span className={`fact-value${cls ? ' ' + cls : ''}`}>{value}</span>
                  </div>
                ))}
              </div>
              <div className="cta-card">
                <p>Ready to explore Anthem? Let&apos;s schedule a private tour of the community, the country club, and the listings that match your goals.</p>
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
            <span className="section-label">Why Anthem</span>
            <h2>What Makes Anthem Stand Out</h2>
            <p>Foothill elevation, a private country club, and panoramic Strip views &mdash; in one of America&apos;s safest cities.</p>
          </div>
          <div className="highlights-grid">
            {[
              { icon: '\u{26F0}\uFE0F', title: 'McCullough Range Foothills', body: 'Built into genuine mountain terrain with elevation changes that create dramatic views of the Las Vegas Valley and Strip skyline. A setting that no flat-ground community can match.' },
              { icon: '\u26F3', title: 'Anthem Country Club', body: 'A private, guard-gated club with an 18-hole Hale Irwin championship course, full-service clubhouse, resort pools, tennis courts, and dining. One of Henderson\u2019s premier private clubs.' },
              { icon: '\u{1F6E1}\uFE0F', title: 'Henderson: Top 10 Safest City', body: 'Henderson consistently ranks among the top 10 safest large cities in America. Low crime, clean streets, and responsive city services that residents consistently praise.' },
              { icon: '\u{1F6B6}', title: '30+ Miles of Trails', body: 'An extensive trail system connecting neighborhoods to parks, open desert, and mountain terrain. Hiking, biking, and trail running from your front door \u2014 no car required.' },
              { icon: '\u{1F3CA}', title: 'Anthem Center', body: 'A full community center with resort-style pools, sports courts, fitness area, and year-round programming for all ages. The social and recreational hub of the community.' },
              { icon: '\u{1F3E0}', title: 'Every Life Stage', body: 'From Sun City Anthem (55+) to Anthem Highlands (families) to Anthem Country Club (luxury). A community with genuine paths for first-time buyers, families, empty nesters, and retirees.' },
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
            <h2>Explore Anthem&apos;s Neighborhoods</h2>
            <p>From guard-gated country club estates to active adult living, Anthem has a neighborhood for every lifestyle.</p>
          </div>
          <div className="villages-grid">
            {[
              { name: 'Anthem Country Club', type: 'Guard-Gated \u00B7 Golf \u00B7 Luxury', desc: 'The premier address in Anthem \u2014 a private, guard-gated community with an 18-hole Hale Irwin course, custom estates, and full country club amenities. The highest elevation and best views in the community.', price: 'From $800K' },
              { name: 'Anthem Hills', type: 'Guard-Gated \u00B7 Luxury', desc: 'A guard-gated luxury neighborhood featuring larger custom and semi-custom homes on elevated lots with panoramic Strip and valley views. Quieter and more exclusive than the family neighborhoods.', price: 'From $700K' },
              { name: 'Anthem Highlands', type: 'Family \u00B7 Master-Planned', desc: 'The family heart of Anthem with well-designed neighborhoods, strong schools, trail access, and the Anthem Center. The most popular section for families with school-age children.', price: 'From $500K' },
              { name: 'Sun City Anthem', type: '55+ Active Adult', desc: 'One of the most successful active adult communities in the country. Two golf courses, multiple recreation centers, 100+ clubs, and a social calendar that keeps residents engaged year-round.', price: 'From $350K' },
              { name: 'Solera at Anthem', type: '55+ \u00B7 Boutique', desc: 'A smaller, more intimate 55+ community within Anthem. Single-story homes with low-maintenance yards, a private clubhouse, and the convenience of the broader Anthem amenity package.', price: 'From $400K' },
              { name: 'Anthem Parkside', type: 'Family \u00B7 Park-Adjacent', desc: 'Neighborhoods positioned along the community\u2019s trail system and park corridors. Popular with active families who want outdoor access built into daily life.', price: 'From $475K' },
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
                alt="McCullough Range foothills and Strip views from Anthem, Henderson"
              />
            </div>
            <div className="lifestyle-content">
              <span className="section-label">Outdoor Living</span>
              <div className="gold-rule" />
              <h2>Foothill Trails, Country Club Golf, and Valley-Wide Views</h2>
              <p>Anthem&apos;s setting in the McCullough Range foothills defines the lifestyle here. The elevation creates a natural cooling effect, the terrain provides built-in hiking and biking trails, and the views &mdash; especially at sunset when the Strip lights up against the mountains &mdash; are genuinely spectacular.</p>
              <p>Whether you play golf at the country club, swim at the Anthem Center, or hike the 30+ miles of community trails, outdoor living is woven into daily life here.</p>
              <div className="lifestyle-bullets">
                {[
                  '30+ miles of trails through foothill terrain connecting neighborhoods, parks, and open desert',
                  'Anthem Country Club \u2014 18-hole Hale Irwin design with Strip views from elevated fairways',
                  'Anthem Center with resort pools, sports courts, and year-round community programming',
                  'Panoramic views of the Las Vegas Strip, Spring Mountains, and surrounding valley from elevated lots',
                  'Lake Mead, Sloan Canyon, and Bootleg Canyon mountain biking all within 30 minutes',
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
            <h2>Schools Serving Anthem Families</h2>
            <p>Henderson&apos;s strong school options include several well-regarded campuses serving the Anthem community.</p>
          </div>
          <div className="schools-layout">
            <div className="school-group">
              <h3>Public Schools (CCSD)</h3>
              {[['John C. Vanderburg Elementary','K\u20135'],['Elise L. Wolff Elementary','K\u20135'],['Dean Petersen Elementary','K\u20135'],['Del E. Webb Middle School','6\u20138'],['Jim Bridger Middle School','6\u20138'],['Coronado High School','9\u201312'],['Liberty High School','9\u201312'],].map(([n,g])=>(
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
                <strong style={{color:'var(--white)'}}>School Assignment Note:</strong> Anthem spans a large area with multiple school zones. Anthem Highlands tends to zone into some of Henderson\u2019s highest-rated schools. Always confirm your assigned school with CCSD before purchasing.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <AnthemFAQ />

      {/* CTA */}
      <section id="cta">
        <div className="container">
          <h2>Ready to Find Your Anthem Home?</h2>
          <p>From country club estates with Strip views to family homes near the Anthem Center, I&apos;ll help you find the right neighborhood and price point in Anthem.</p>
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
