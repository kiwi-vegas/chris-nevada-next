import BoulderCityFAQ from '@/components/BoulderCityFAQ'
import Link from 'next/link'
import type { Metadata } from 'next'
import BoulderCityMapWrapper from '@/components/BoulderCityMapWrapper'
import PortableText from '@/components/PortableText'
import { getCommunityPage } from '@/sanity/queries'
import { mergeQuickStats, mergeDriveTimes, getSectionImageUrl } from '@/lib/community-utils'

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const cms = await getCommunityPage('boulder-city')
  return {
    title: cms?.metaTitle ?? 'Boulder City Homes For Sale | Nevada Real Estate Group',
    description: cms?.metaDescription ?? 'Browse Boulder City homes for sale near Lake Mead and the Hoover Dam. Historic small-town living with no gambling, growth controls, and walkable downtown. Call 725.239.9950.',
  }
}

export default async function BoulderCityPage() {
  const cms = await getCommunityPage('boulder-city')

  const heroHeadline = cms?.heroHeadline ?? 'Boulder City Homes\nFor Sale'
  const heroSubheadline = cms?.heroSubheadline ?? "Nevada\u2019s historic small town at the doorstep of Lake Mead and the Hoover Dam \u2014 no casinos, walkable downtown, and strict growth controls that protect property values."
  const overviewTitle = cms?.overviewTitle ?? 'Boulder City: Small-Town Living at the Gateway to Lake Mead'

  const HARDCODED_STATS: Array<[string, string] | [string, string, string]> = [
    ['Founded', '1931'],
    ['Origin', 'Built for Hoover Dam workers'],
    ['Population', '~16,000'],
    ['City Area', '~208 sq mi'],
    ['Median Home Price', '~$525,000', 'gold'],
    ['Growth Controls', 'Strict annual limits'],
    ['Gambling', 'Prohibited by law'],
    ['Schools', '4 dedicated CCSD'],
    ['Lake Mead', '~10 min drive'],
    ['Hoover Dam', '~15 min drive'],
    ['Distance to Strip', '~25 min'],
    ['Distance to Henderson', '~20 min'],
  ]
  const displayStats = mergeQuickStats(HARDCODED_STATS, cms?.quickStats)
  const HARDCODED_DRIVE_TIMES = [
    { time: '~25 min', destination: 'to the Strip', route: 'via I-11 \u2192 I-515' },
    { time: '~20 min', destination: 'to Henderson', route: 'via I-11 North' },
    { time: '~15 min', destination: 'to Harry Reid Airport', route: 'via I-11' },
    { time: '~10 min', destination: 'to Lake Mead Marina', route: 'via Lakeshore Rd' },
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
          <span>Boulder City</span>
        </div>
      </div>

      {/* HERO */}
      <header id="hero" className="summerlin-hero">
        {cms?.heroImageUrl
          ? <img src={`${cms.heroImageUrl}?w=1920&auto=format&q=85`} alt="Boulder City hero" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
          : <div className="hero-bg" />
        }
        <div className="hero-overlay" />
        <div className="hero-content summerlin">
          <div className="container">
            <p className="hero-eyebrow-sm">Boulder City, Nevada</p>
            <div className="hero-rule" />
            <h1>{heroHeadline.split('\n').map((line, i) => (
              <span key={i}>{line}{i < heroHeadline.split('\n').length - 1 && <br />}</span>
            ))}</h1>
            <p className="hero-sub">{heroSubheadline}</p>
            <div className="hero-stats">
              <div className="hero-stat"><span className="hero-stat-num">{qs('Active Listings', '30+')}</span><span className="hero-stat-lbl">Active Listings</span></div>
              <div className="hero-stat"><span className="hero-stat-num">{qs('Price Range', '$400K\u2013$1M+')}</span><span className="hero-stat-lbl">Price Range</span></div>
              <div className="hero-stat"><span className="hero-stat-num">{qs('Population', '16,000')}</span><span className="hero-stat-lbl">Residents</span></div>
              <div className="hero-stat"><span className="hero-stat-num">{qs('Founded', '1931')}</span><span className="hero-stat-lbl">Established</span></div>
            </div>
          </div>
        </div>
      </header>

      {/* MAP */}
      <section id="map" style={{ padding: '32px 0 0', background: 'var(--charcoal)' }}>
        <div className="container">
          <div className="section-header" style={{ marginBottom: '32px' }}>
            <span className="section-label">Location</span>
            <h2>Where is Boulder City?</h2>
            <p>Located 25 miles southeast of the Las Vegas Strip along the I-11 corridor &mdash; the gateway to Lake Mead National Recreation Area and the Hoover Dam.</p>
          </div>
          <div className="map-container">
            <BoulderCityMapWrapper />
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
            <h2>New Boulder City Listings</h2>
            <p>The most recently listed homes in Boulder City &mdash; single-family homes, custom estates, and historic properties from $400K.</p>
          </div>
          <div className="ylopo-wrap">
            <div className="YLOPO_searchWidget" />
            <div className="YLOPO_resultsWidget" data-search='{"propertyTypes":["house","condo","townhouse"],"minPrice":200000,"locations":[{"city":"Boulder City","state":"NV"}],"limit":12,"sortBy":"listDate","sortOrder":"desc"}' />
          </div>
          <p className="ylopo-note">Listing data sourced from regional MLS. Information deemed reliable but not guaranteed. Updated daily.</p>
          <div className="listings-actions">
            <a href="https://search.nevadarealestategroup.net/search?s[orderBy]=sourceCreationDate%2Cdesc&s[page]=1&s[locations][0][city]=Boulder%20City&s[locations][0][state]=NV" target="_blank" rel="noopener noreferrer" className="btn-gold">View New Boulder City Listings Now &rarr;</a>
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
                  <p>Boulder City is the most unique community in the entire Las Vegas metro, and I don&apos;t say that lightly. This is a place that was purpose-built by the federal government in 1931 to house the workers constructing the Hoover Dam, and that origin story still defines the character of the town today. It&apos;s one of only two cities in Nevada where gambling is illegal, which means no casinos, no neon, and none of the transient energy that defines the rest of Clark County. What you get instead is a genuine small town &mdash; tree-lined streets, a walkable historic downtown, and a community where people know their neighbors.</p>
                  <p>The strict growth control ordinances are the single most important thing for buyers to understand about Boulder City. The city caps how much new development can happen each year, which keeps the population stable at around 16,000 people and the housing supply permanently tight. That scarcity is the engine behind Boulder City&apos;s strong property values. You&apos;re not going to find the rapid new construction you see in Henderson or North Las Vegas. What you will find are established neighborhoods with mature landscaping, custom homes on larger lots, and a sense of permanence that master-planned communities are still trying to manufacture.</p>
                  <p>The location is extraordinary. Lake Mead &mdash; the largest reservoir in the United States &mdash; is literally 10 minutes from downtown. Hemenway Harbor, Boulder Beach, and the Las Vegas Boat Harbor are all right there. The Hoover Dam is 15 minutes east. And the River Mountains Loop Trail, a 34-mile paved cycling and running path, runs right through town connecting Boulder City to Henderson, Lake Mead, and the Historic Railroad Trail through old rail tunnels with views of Lake Mead. For outdoor people, there is nothing in the valley that comes close.</p>
                  <p>Downtown Boulder City along Nevada Highway is having a genuine moment. Breweries, restaurants, antique shops, and art galleries have filled in the historic storefronts, and events like Art in the Park draw tens of thousands of visitors twice a year. The I-11 corridor has also cut commute times significantly &mdash; you can be at Harry Reid Airport in about 15 minutes and at the Strip in 25. You get small-town Nevada living with legitimate Las Vegas access, and the growth controls ensure that character isn&apos;t going anywhere.</p>
                </>
              )}
            </div>
            <div className="overview-aside">
              <div className="quick-facts">
                <h3>Boulder City At a Glance</h3>
                {displayStats.map(([label, value, cls]) => (
                  <div className="fact-row" key={label}>
                    <span className="fact-label">{label}</span>
                    <span className={`fact-value${cls ? ' ' + cls : ''}`}>{value}</span>
                  </div>
                ))}
              </div>
              <div className="cta-card">
                <p>Ready to explore Boulder City? Let&apos;s schedule a private tour of the community and the current listings that match your goals.</p>
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
            <span className="section-label">Why Boulder City</span>
            <h2>What Makes Boulder City Stand Out</h2>
            <p>Historic small-town character, Lake Mead at your doorstep, and growth controls that protect your investment.</p>
          </div>
          <div className="highlights-grid">
            {[
              { icon: '\u{1F3DB}\uFE0F', title: 'Historic Small-Town Character', body: 'Founded in 1931 to house Hoover Dam workers, Boulder City retains its original small-town charm with tree-lined streets, a walkable downtown, and a tight-knit community of about 16,000 residents.' },
              { icon: '\u{1F6A4}', title: 'Gateway to Lake Mead', body: 'Lake Mead National Recreation Area is 10 minutes away \u2014 boating, kayaking, fishing, swimming, and scenic drives along the largest reservoir in the United States. Year-round outdoor recreation at your doorstep.' },
              { icon: '\u{1F4C8}', title: 'Growth Control Ordinances', body: 'Strict annual limits on new development keep housing supply tight and property values strong. Boulder City\u2019s scarcity is a built-in investment advantage that no master-planned community can replicate.' },
              { icon: '\u{1F6AB}', title: 'No Gambling, No Casinos', body: 'One of only two cities in Nevada where gambling is prohibited by law. The result: a quiet, family-oriented atmosphere completely unlike the rest of the Las Vegas metro.' },
              { icon: '\u{1F6B4}', title: 'River Mountains Loop Trail', body: 'A 34-mile paved cycling and running trail runs right through town, connecting Boulder City to Henderson, Lake Mead, and the Historic Railroad Trail through tunnels with lake views.' },
              { icon: '\u{1F6E3}\uFE0F', title: 'I-11 Corridor Access', body: 'The I-11 corridor has transformed commute times \u2014 15 minutes to Harry Reid Airport, 25 minutes to the Strip, and 20 minutes to Henderson. Small-town living with genuine metro access.' },
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
            <h2>Explore Boulder City&apos;s Neighborhoods</h2>
            <p>From historic homes near downtown to custom estates on the hills, Boulder City has neighborhoods for every lifestyle.</p>
          </div>
          <div className="villages-grid">
            {[
              { name: 'Historic Downtown', type: 'Historic \u00B7 Walkable', desc: 'Original 1930s\u201350s homes near Nevada Highway with tree-lined streets, character architecture, and walking distance to shops, restaurants, and breweries. The soul of Boulder City.', price: 'From $350K' },
              { name: 'Boulder Hills', type: 'Custom \u00B7 Views', desc: 'Custom single-family homes on larger lots in the elevated neighborhoods south of town. Many properties offer panoramic views of the surrounding desert mountains and Lake Mead.', price: 'From $600K' },
              { name: 'Lake Mead View Estates', type: 'Premium \u00B7 Luxury', desc: 'The premium tier of Boulder City real estate \u2014 custom homes on oversized lots with lake and mountain views. Quiet, private, and minutes from the water.', price: 'From $800K' },
              { name: 'Boulder City Golf Course', type: 'Golf \u00B7 Established', desc: 'Homes along the Boulder City Municipal Golf Course, an affordable 18-hole course that has served the community since 1972. Mature landscaping and established neighborhood feel.', price: 'From $450K' },
              { name: 'Del Prado & Villa Del Prado', type: 'Family \u00B7 Newer', desc: 'Among the newer residential developments in Boulder City \u2014 single-family homes built in the 2000s with modern floor plans in a community where new construction is rare.', price: 'From $500K' },
              { name: 'Lakeview & Bootleg Canyon', type: 'Outdoor \u00B7 Adventure', desc: 'Neighborhoods near the Bootleg Canyon mountain bike trails and with proximity to Lake Mead. Popular with outdoor enthusiasts who want trail access built into daily life.', price: 'From $475K' },
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
                alt="Lake Mead and desert landscape near Boulder City, Nevada"
              />
            </div>
            <div className="lifestyle-content">
              <span className="section-label">Outdoor Living</span>
              <div className="gold-rule" />
              <h2>Lake Mead, Hoover Dam, and Desert Trails at Your Doorstep</h2>
              <p>No community in the Las Vegas metro offers outdoor access like Boulder City. Lake Mead is 10 minutes from downtown, the Hoover Dam is 15 minutes east, and the River Mountains Loop Trail literally runs through town. This is where Las Vegas goes to escape Las Vegas.</p>
              <p>Bootleg Canyon offers world-class mountain biking with trails ranging from beginner to expert. The Historic Railroad Trail takes you through five tunnels with views of Lake Mead. And the desert landscape surrounding Boulder City is some of the most dramatic in southern Nevada.</p>
              <div className="lifestyle-bullets">
                {[
                  'Lake Mead National Recreation Area \u2014 boating, kayaking, fishing, and swimming, 10 minutes away',
                  'Hoover Dam \u2014 one of America\u2019s most iconic landmarks, 15 minutes east',
                  'River Mountains Loop Trail \u2014 34 miles of paved cycling and running connecting BC to Henderson and Lake Mead',
                  'Bootleg Canyon \u2014 world-class mountain biking trails minutes from downtown',
                  'Historic Railroad Trail \u2014 5 tunnels with panoramic Lake Mead views, great for hiking and cycling',
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
            <h2>Schools Serving Boulder City Families</h2>
            <p>Boulder City has its own dedicated CCSD schools with smaller enrollments and strong community involvement.</p>
          </div>
          <div className="schools-layout">
            <div className="school-group">
              <h3>Public Schools (CCSD)</h3>
              {[['Andrew J. Mitchell Elementary','K\u20135'],['Elise L. Wolff Elementary','K\u20135'],['Garrett Junior High School','6\u20138'],['Boulder City High School','9\u201312'],].map(([n,g])=>(
                <div className="school-item" key={n}>{n}<span className="school-grades">{g}</span></div>
              ))}
            </div>
            <div className="school-group">
              <h3>Private &amp; Faith-Based</h3>
              {[['Grace Christian Academy','K\u20138'],['St. Andrew\u2019s Catholic School','PreK\u20138'],].map(([n,g])=>(
                <div className="school-item" key={n}>{n}<span className="school-grades">{g}</span></div>
              ))}
            </div>
            <div className="school-group">
              <h3>Nearby Options</h3>
              {[['Henderson International School','PreK\u201312'],['Pinecrest Academy of Nevada','K\u201312'],['Somerset Academy','K\u20138'],].map(([n,g])=>(
                <div className="school-item" key={n}>{n}<span className="school-grades">{g}</span></div>
              ))}
              <div style={{marginTop:'24px',padding:'18px',background:'rgba(201,168,76,0.06)',border:'1px solid var(--border)',borderRadius:'var(--radius)',fontSize:'13px',color:'var(--white-70)',lineHeight:'1.7'}}>
                <strong style={{color:'var(--white)'}}>School Assignment Note:</strong> Boulder City has its own dedicated CCSD schools, separate from the Henderson and Las Vegas zones. The smaller school populations are a major draw for families. Always confirm your assigned school with CCSD before purchasing.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <BoulderCityFAQ />

      {/* CTA */}
      <section id="cta">
        <div className="container">
          <h2>Ready to Find Your Boulder City Home?</h2>
          <p>Whether you want a historic home near downtown, a custom estate with lake views, or the quiet small-town lifestyle that only Boulder City offers, I&apos;ll help you find the right fit.</p>
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
