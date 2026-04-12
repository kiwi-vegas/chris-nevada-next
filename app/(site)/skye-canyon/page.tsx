import SkyeCanyonFAQ from '@/components/SkyeCanyonFAQ'
import Link from 'next/link'
import type { Metadata } from 'next'
import SkyeCanyonMapWrapper from '@/components/SkyeCanyonMapWrapper'
import PortableText from '@/components/PortableText'
import { getCommunityPage } from '@/sanity/queries'
import { mergeQuickStats, mergeDriveTimes, getSectionImageUrl } from '@/lib/community-utils'

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const cms = await getCommunityPage('skye-canyon')
  return {
    title: cms?.metaTitle ?? 'Skye Canyon Homes For Sale | Nevada Real Estate Group',
    description: cms?.metaDescription ?? 'Browse Skye Canyon homes for sale in northwest Las Vegas. New construction from the mid-$300Ks. Master-planned community with resort-style amenities. Call 725.239.9950.',
  }
}

export default async function SkyeCanyonPage() {
  const cms = await getCommunityPage('skye-canyon')

  const heroHeadline = cms?.heroHeadline ?? 'Skye Canyon Homes\nFor Sale'
  const heroSubheadline = cms?.heroSubheadline ?? "Northwest Las Vegas\u2019 fastest-growing master-planned community \u2014 1,700 acres of new construction against the desert mountain skyline."
  const overviewTitle = cms?.overviewTitle ?? 'Skye Canyon: Northwest Las Vegas Done Right'

  const HARDCODED_STATS: Array<[string, string] | [string, string, string]> = [
    ['Established', '2015'],
    ['Developer', 'Century Communities'],
    ['Total Acreage', '~1,700 acres'],
    ['Planned Homes', '9,000+'],
    ['Median Home Price', '~$500,000', 'gold'],
    ['Neighborhoods', '20+'],
    ['Schools', '5+ nearby'],
    ['Parks', '10+'],
    ['Community Center', 'Skye Center (16,000 sq ft)'],
    ['Trails', 'Extensive network'],
    ['Distance to Strip', '~30 min'],
    ['Distance to Red Rock', '~25 min'],
  ]
  const displayStats = mergeQuickStats(HARDCODED_STATS, cms?.quickStats)
  const HARDCODED_DRIVE_TIMES = [
    { time: '~30 min', destination: 'to the Strip', route: 'via US-95 South' },
    { time: '~25 min', destination: 'to Red Rock Canyon', route: 'via W Charleston Blvd' },
    { time: '~20 min', destination: 'to Downtown Summerlin', route: 'via US-95 South' },
    { time: '~35 min', destination: 'to Harry Reid Airport', route: 'via US-95 → I-15 South' },
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
          <span>Skye Canyon</span>
        </div>
      </div>

      {/* HERO */}
      <header id="hero" className="summerlin-hero">
        {cms?.heroImageUrl
          ? <img src={`${cms.heroImageUrl}?w=1920&auto=format&q=85`} alt="Skye Canyon hero" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
          : <div className="hero-bg" />
        }
        <div className="hero-overlay" />
        <div className="hero-content summerlin">
          <div className="container">
            <p className="hero-eyebrow-sm">Las Vegas, Nevada</p>
            <div className="hero-rule" />
            <h1>{heroHeadline.split('\n').map((line, i) => (
              <span key={i}>{line}{i < heroHeadline.split('\n').length - 1 && <br />}</span>
            ))}</h1>
            <p className="hero-sub">{heroSubheadline}</p>
            <div className="hero-stats">
              <div className="hero-stat"><span className="hero-stat-num">{qs('Active Listings', '200+')}</span><span className="hero-stat-lbl">Active Listings</span></div>
              <div className="hero-stat"><span className="hero-stat-num">{qs('Price Range', '$350K\u2013$800K+')}</span><span className="hero-stat-lbl">Price Range</span></div>
              <div className="hero-stat"><span className="hero-stat-num">{qs('Schools', '5+')}</span><span className="hero-stat-lbl">Schools</span></div>
              <div className="hero-stat"><span className="hero-stat-num">{qs('Community Center', '16,000 sq ft')}</span><span className="hero-stat-lbl">Skye Center</span></div>
            </div>
          </div>
        </div>
      </header>

      {/* MAP */}
      <section id="map" style={{ padding: '64px 0 0', background: 'var(--charcoal)' }}>
        <div className="container">
          <div className="section-header" style={{ marginBottom: '32px' }}>
            <span className="section-label">Location</span>
            <h2>Where is Skye Canyon?</h2>
            <p>Located in the rapidly growing northwest corridor of Las Vegas &mdash; nestled against the desert foothills with panoramic mountain views.</p>
          </div>
          <div className="map-container">
            <SkyeCanyonMapWrapper />
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
            <h2>New Skye Canyon Listings</h2>
            <p>The 12 most recently listed homes in Skye Canyon &mdash; new construction and resale homes starting in the mid-$300Ks.</p>
          </div>
          <div className="ylopo-wrap">
            <div className="YLOPO_searchWidget" />
            <div className="YLOPO_resultsWidget" data-search='{"propertyTypes":["house","condo","townhouse"],"minPrice":200000,"locations":[{"city":"Las Vegas","state":"NV"}],"limit":12,"sortBy":"listDate","sortOrder":"desc","keywords":"Skye Canyon"}' />
          </div>
          <p className="ylopo-note">Listing data sourced from regional MLS. Information deemed reliable but not guaranteed. Updated daily.</p>
          <div className="listings-actions">
            <a href="https://search.nevadarealestategroup.net/search?s[orderBy]=sourceCreationDate%2Cdesc&s[page]=1&s[locations][0][city]=Las%20Vegas&s[locations][0][state]=NV&s[keywords]=Skye%20Canyon" target="_blank" rel="noopener noreferrer" className="btn-gold">View New Skye Canyon Listings Now &rarr;</a>
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
                  <p>I&apos;ve watched northwest Las Vegas transform over the past decade, and Skye Canyon is the community that&apos;s leading that transformation. When Century Communities (originally Olympia Companies) broke ground here around 2015, a lot of people questioned whether the market was ready for another large-scale master-planned community this far north. The answer has been decisive &mdash; Skye Canyon has become one of the fastest-selling communities in the entire valley.</p>
                  <p>What draws people out here is the combination of value and quality of life. You get newer construction with modern floor plans at price points that are $100K&ndash;$200K below what you&apos;d pay in Summerlin or Henderson for comparable square footage. The trade-off is an extra 10&ndash;15 minutes of drive time, and for most buyers I work with, that math works out easily.</p>
                  <p>The Skye Center is the heart of the community &mdash; a 16,000-square-foot facility with a resort-style pool, fitness center, event spaces, and year-round programming. Skye Canyon Park adds another 20 acres of recreation with a fitness court, splash pad, playgrounds, and a dog park. These aren&apos;t afterthought amenities &mdash; they rival what you&apos;d find in communities twice the price.</p>
                  <p>The setting is genuinely beautiful. You&apos;re looking at unobstructed mountain views in almost every direction, with the Tule Springs Fossil Beds National Monument practically in your backyard. It&apos;s a part of Las Vegas that still feels open and uncrowded, even as the community continues to grow toward its planned 9,000+ homes at build-out.</p>
                </>
              )}
            </div>
            <div className="overview-aside">
              <div className="quick-facts">
                <h3>Skye Canyon At a Glance</h3>
                {displayStats.map(([label, value, cls]) => (
                  <div className="fact-row" key={label}>
                    <span className="fact-label">{label}</span>
                    <span className={`fact-value${cls ? ' ' + cls : ''}`}>{value}</span>
                  </div>
                ))}
              </div>
              <div className="cta-card">
                <p>Ready to explore Skye Canyon? Let&apos;s schedule a private tour of the community and the current listings that match your goals.</p>
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
            <span className="section-label">Why Skye Canyon</span>
            <h2>What Makes Skye Canyon Stand Out</h2>
            <p>A modern master-planned community built for the way people actually live today.</p>
          </div>
          <div className="highlights-grid">
            {[
              { icon: '\u{1F3D7}\uFE0F', title: 'New Construction Available', body: 'One of the few Las Vegas master-planned communities still offering brand-new homes directly from builders like Lennar, KB Home, Century Communities, and Woodside Homes.' },
              { icon: '\u{1F3CA}', title: 'Resort-Style Skye Center', body: 'A 16,000 sq ft community center featuring a resort pool, fitness center, event lawns, and year-round social programming for residents of all ages.' },
              { icon: '\u{1F3DE}\uFE0F', title: 'Tule Springs at Your Door', body: 'Adjacent to Tule Springs Fossil Beds National Monument \u2014 22,650 acres of protected desert landscape with hiking trails and paleontological sites.' },
              { icon: '\u{1F4B0}', title: 'Exceptional Value', body: 'Newer homes with modern floor plans at $100K\u2013$200K below comparable properties in Summerlin or Henderson. One of the best value propositions in the valley.' },
              { icon: '\u{1F6DD}', title: '20-Acre Skye Canyon Park', body: 'A flagship community park with a fitness court, splash pad, adventure playground, dog park, picnic pavilions, and open green space \u2014 all maintained by the HOA.' },
              { icon: '\u{26F0}\uFE0F', title: 'Mountain Views & Open Space', body: 'Panoramic views of the Spring Mountains, Sheep Range, and surrounding desert. The northwest corridor preserves a sense of space that\u2019s increasingly rare in Las Vegas.' },
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
            <h2>Explore Skye Canyon&apos;s Neighborhoods</h2>
            <p>Multiple builders and distinct neighborhoods offer variety in style, size, and price point.</p>
          </div>
          <div className="villages-grid">
            {[
              { name: 'Skye Canyon Park', type: 'Family \u00B7 Active Lifestyle', desc: 'The core neighborhood surrounding the 20-acre community park and Skye Center. Walking distance to the splash pad, fitness court, and event spaces.', price: 'From $450K' },
              { name: 'Reverence by Pulte', type: 'Single-Family \u00B7 Modern', desc: 'Contemporary single-family homes with open floor plans, smart home technology, and energy-efficient construction. Popular with move-up buyers.', price: 'From $500K' },
              { name: 'KB Home Collections', type: 'Entry-Level \u00B7 Customizable', desc: 'Personalize-ready homes with KB Home\u2019s Built to Order approach. Some of the most accessible price points in the community.', price: 'From $380K' },
              { name: 'Lennar Communities', type: 'Family \u00B7 Everything\u2019s Included', desc: 'Lennar\u2019s signature Everything\u2019s Included homes with premium finishes, smart home features, and no hidden upgrade costs.', price: 'From $420K' },
              { name: 'Century Communities', type: 'Original Developer \u00B7 Varied', desc: 'As the original developer of Skye Canyon, Century Communities offers a range of floor plans from starter homes to spacious family residences.', price: 'From $400K' },
              { name: 'Custom & Semi-Custom Lots', type: 'Luxury \u00B7 Build Your Own', desc: 'Select lots within Skye Canyon allow for custom and semi-custom builds, offering buyers the chance to design their dream home with mountain views.', price: 'From $700K+' },
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
                alt="Desert mountain landscape near Skye Canyon, Las Vegas"
              />
            </div>
            <div className="lifestyle-content">
              <span className="section-label">Outdoor Living</span>
              <div className="gold-rule" />
              <h2>Desert Trails, Mountain Views, and Wide Open Spaces</h2>
              <p>Skye Canyon was designed around outdoor living. The community&apos;s trail system connects neighborhoods to parks, open desert, and the Tule Springs Fossil Beds National Monument &mdash; one of the newest additions to the National Park system.</p>
              <p>The northwest corridor offers some of the most dramatic topography in the Las Vegas Valley, with unobstructed views of the Spring Mountains and Sheep Range that you simply can&apos;t get in more established parts of town.</p>
              <div className="lifestyle-bullets">
                {[
                  'Extensive trail network connecting neighborhoods, parks, and natural desert terrain',
                  '20-acre Skye Canyon Park with fitness court, splash pad, adventure playground, and dog park',
                  'Tule Springs Fossil Beds National Monument \u2014 22,650 acres \u2014 directly adjacent to the community',
                  'Floyd Lamb Park at Tule Springs \u2014 680 acres of lakes, picnic areas, and wildlife habitat nearby',
                  'Red Rock Canyon, Mt. Charleston, and Valley of Fire all within an hour\u2019s drive',
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
            <h2>Schools Serving Skye Canyon Families</h2>
            <p>Newer schools built to serve the northwest corridor&apos;s growing population.</p>
          </div>
          <div className="schools-layout">
            <div className="school-group">
              <h3>Public Schools (CCSD)</h3>
              {[['Bonner Elementary','K\u20135'],['Goolsby Elementary','K\u20135'],['Tule Springs Elementary','K\u20135'],['Elise L. Wolff Elementary','K\u20135'],['William & Mary Scherkenbach Middle','6\u20138'],['Shadow Ridge High School','9\u201312'],['Northwest Career & Technical Academy','9\u201312'],].map(([n,g])=>(
                <div className="school-item" key={n}>{n}<span className="school-grades">{g}</span></div>
              ))}
            </div>
            <div className="school-group">
              <h3>Private &amp; Faith-Based</h3>
              {[['Mountain View Christian School','PreK\u201312'],['Legacy Traditional School','K\u20138'],['Pinecrest Academy of Nevada','K\u201312'],].map(([n,g])=>(
                <div className="school-item" key={n}>{n}<span className="school-grades">{g}</span></div>
              ))}
            </div>
            <div className="school-group">
              <h3>Charter &amp; Specialty</h3>
              {[['Doral Academy Red Rock','K\u20138'],['Somerset Academy Sky Pointe','K\u20138'],['Coral Academy of Science','K\u201312'],].map(([n,g])=>(
                <div className="school-item" key={n}>{n}<span className="school-grades">{g}</span></div>
              ))}
              <div style={{marginTop:'24px',padding:'18px',background:'rgba(201,168,76,0.06)',border:'1px solid var(--border)',borderRadius:'var(--radius)',fontSize:'13px',color:'var(--white-70)',lineHeight:'1.7'}}>
                <strong style={{color:'var(--white)'}}>School Assignment Note:</strong> Zoning varies by neighborhood. Several new schools have been built to serve Skye Canyon specifically. Always confirm your assigned school with CCSD before purchasing.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <SkyeCanyonFAQ />

      {/* CTA */}
      <section id="cta">
        <div className="container">
          <h2>Ready to Find Your Skye Canyon Home?</h2>
          <p>Whether you&apos;re looking at new construction or resale, I&apos;ll help you navigate every option in Skye Canyon and find the right fit for your family and budget.</p>
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
