import SpringValleyFAQ from '@/components/SpringValleyFAQ'
import Link from 'next/link'
import type { Metadata } from 'next'
import SpringValleyMapWrapper from '@/components/SpringValleyMapWrapper'
import PortableText from '@/components/PortableText'
import { getCommunityPage } from '@/sanity/queries'
import { mergeQuickStats, mergeDriveTimes, getSectionImageUrl } from '@/lib/community-utils'

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const cms = await getCommunityPage('spring-valley')
  return {
    title: cms?.metaTitle ?? 'Spring Valley Homes For Sale | Nevada Real Estate Group',
    description: cms?.metaDescription ?? 'Browse Spring Valley homes for sale in southwest Las Vegas. Established community near Chinatown, the 215 beltway, and the Strip. Homes from $200K to $700K+. Call 725.239.9950.',
  }
}

export default async function SpringValleyPage() {
  const cms = await getCommunityPage('spring-valley')

  const heroHeadline = cms?.heroHeadline ?? 'Spring Valley Homes\nFor Sale'
  const heroSubheadline = cms?.heroSubheadline ?? "One of Las Vegas\u2019 largest established communities \u2014 home to the Chinatown dining corridor, the I-215 beltway, and neighborhoods for every budget."
  const overviewTitle = cms?.overviewTitle ?? 'Spring Valley: The Heart of Southwest Las Vegas'

  const HARDCODED_STATS: Array<[string, string] | [string, string, string]> = [
    ['Type', 'Unincorporated town'],
    ['County', 'Clark County'],
    ['Population', '~190,000'],
    ['Area', '~33 sq miles'],
    ['Median Home Price', '~$420,000', 'gold'],
    ['Neighborhoods', '40+'],
    ['Schools', '20+ nearby'],
    ['Chinatown', 'Spring Mountain Road corridor'],
    ['Key Freeways', 'I-215 & US-95'],
    ['Major Hospital', 'Spring Valley Hospital'],
    ['Distance to Strip', '5\u201320 min'],
    ['Distance to Red Rock', '~15 min'],
  ]
  const displayStats = mergeQuickStats(HARDCODED_STATS, cms?.quickStats)
  const HARDCODED_DRIVE_TIMES = [
    { time: '5\u201320 min', destination: 'to the Strip', route: 'via Flamingo, Tropicana, or Spring Mtn Rd' },
    { time: '~15 min', destination: 'to Red Rock Canyon', route: 'via W Charleston Blvd' },
    { time: '~15 min', destination: 'to Downtown Summerlin', route: 'via I-215 North' },
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
          <span>Spring Valley</span>
        </div>
      </div>

      {/* HERO */}
      <header id="hero" className="summerlin-hero">
        {cms?.heroImageUrl
          ? <img src={`${cms.heroImageUrl}?w=1920&auto=format&q=85`} alt="Spring Valley hero" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
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
              <div className="hero-stat"><span className="hero-stat-num">{qs('Active Listings', '400+')}</span><span className="hero-stat-lbl">Active Listings</span></div>
              <div className="hero-stat"><span className="hero-stat-num">{qs('Price Range', '$200K\u2013$700K+')}</span><span className="hero-stat-lbl">Price Range</span></div>
              <div className="hero-stat"><span className="hero-stat-num">{qs('Distance to Strip', '5\u201320 min')}</span><span className="hero-stat-lbl">To the Strip</span></div>
              <div className="hero-stat"><span className="hero-stat-num">{qs('Population', '190K+')}</span><span className="hero-stat-lbl">Population</span></div>
            </div>
          </div>
        </div>
      </header>

      {/* MAP */}
      <section id="map" style={{ padding: '32px 0 0', background: 'var(--charcoal)' }}>
        <div className="container">
          <div className="section-header" style={{ marginBottom: '32px' }}>
            <span className="section-label">Location</span>
            <h2>Where is Spring Valley?</h2>
            <p>Spanning the southwest quadrant of the Las Vegas Valley &mdash; from the Chinatown corridor to the I-215 beltway, with Red Rock Canyon to the west.</p>
          </div>
          <div className="map-container">
            <SpringValleyMapWrapper />
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
            <h2>New Spring Valley Listings</h2>
            <p>The 12 most recently listed homes in Spring Valley &mdash; condos, townhomes, and single-family homes from $200K to $700K+.</p>
          </div>
          <div className="ylopo-wrap">
            <div className="YLOPO_searchWidget" />
            <div className="YLOPO_resultsWidget" data-search='{"propertyTypes":["house","condo","townhouse"],"minPrice":150000,"locations":[{"city":"Las Vegas","state":"NV"}],"limit":12,"sortBy":"listDate","sortOrder":"desc","keywords":"Spring Valley"}' />
          </div>
          <p className="ylopo-note">Listing data sourced from regional MLS. Information deemed reliable but not guaranteed. Updated daily.</p>
          <div className="listings-actions">
            <a href="https://search.nevadarealestategroup.net/search?s[orderBy]=sourceCreationDate%2Cdesc&s[page]=1&s[locations][0][city]=Las%20Vegas&s[locations][0][state]=NV&s[keywords]=Spring%20Valley" target="_blank" rel="noopener noreferrer" className="btn-gold">View New Spring Valley Listings Now &rarr;</a>
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
                  <p>Spring Valley is one of those communities where I&apos;ve been placing buyers for my entire career, and it never stops being a smart recommendation. It&apos;s the largest unincorporated town in Clark County &mdash; roughly 190,000 people spread across 33 square miles of southwest Las Vegas &mdash; and that scale is exactly what makes it work. There&apos;s a neighborhood here for literally everyone, from first-time buyers on a budget to professionals who want a short commute to the Strip.</p>
                  <p>The biggest draw for most of my clients is the combination of central location and real value. Spring Valley sits right between the Strip and Summerlin, with the I-215 beltway running through the southern and western edges. You can be at work on the Strip in 10 minutes, at Red Rock Canyon in 15, and at Downtown Summerlin in 15. That kind of connectivity at a median price of ~$420K is increasingly rare in the valley.</p>
                  <p>Then there&apos;s Chinatown. The Spring Mountain Road corridor running through Spring Valley has become one of the most celebrated dining districts in the western United States. Hundreds of restaurants spanning Chinese, Korean, Japanese, Vietnamese, Thai, and Filipino cuisines &mdash; it&apos;s a genuine culinary destination that draws food lovers from across the city. Living in Spring Valley means having world-class dining within a 5-minute drive, which is a lifestyle amenity that most communities can&apos;t match.</p>
                  <p>The housing stock here is genuinely diverse. The western half closer to the 215 tends to be newer, with more planned subdivisions and parks. The eastern half closer to the Strip is more established and urban, with a mix of single-family homes, condos, and townhomes. And Spring Valley still has some non-HOA neighborhoods &mdash; a rarity in Las Vegas that appeals to buyers who want more freedom with their property. Whether you&apos;re looking for a $200K condo as a starter or investment property, or a $700K home in a gated community, Spring Valley has it.</p>
                </>
              )}
            </div>
            <div className="overview-aside">
              <div className="quick-facts">
                <h3>Spring Valley At a Glance</h3>
                {displayStats.map(([label, value, cls]) => (
                  <div className="fact-row" key={label}>
                    <span className="fact-label">{label}</span>
                    <span className={`fact-value${cls ? ' ' + cls : ''}`}>{value}</span>
                  </div>
                ))}
              </div>
              <div className="cta-card">
                <p>Ready to explore Spring Valley? Let&apos;s find the neighborhood that fits your lifestyle, commute, and budget.</p>
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
            <span className="section-label">Why Spring Valley</span>
            <h2>What Makes Spring Valley Stand Out</h2>
            <p>Central location, culinary culture, and genuine housing diversity &mdash; the three pillars of Spring Valley.</p>
          </div>
          <div className="highlights-grid">
            {[
              { icon: '\u{1F35C}', title: 'Chinatown Dining District', body: 'The Spring Mountain Road corridor is one of the best Asian dining destinations in the U.S. \u2014 hundreds of restaurants spanning Chinese, Korean, Japanese, Vietnamese, Thai, and Filipino cuisines within minutes.' },
              { icon: '\u{1F4CD}', title: 'Central to Everything', body: '5\u201320 minutes to the Strip, 15 minutes to Red Rock Canyon, 15 minutes to Downtown Summerlin. The I-215 beltway and US-95 put the entire valley within easy reach.' },
              { icon: '\u{1F4B0}', title: 'Broad Value Spectrum', body: 'From $200K condos to $700K+ gated homes. One of the few Las Vegas communities with genuine price diversity and non-HOA options \u2014 rare in today\u2019s market.' },
              { icon: '\u{1F3E5}', title: 'Full Infrastructure', body: 'Spring Valley Hospital, multiple urgent care facilities, every major grocery chain, and dense retail along Flamingo, Tropicana, and Rainbow corridors. Daily life never requires a long drive.' },
              { icon: '\u{1F3DE}\uFE0F', title: 'Red Rock at Your Doorstep', body: 'The western edge of Spring Valley is minutes from Red Rock Canyon National Conservation Area. Morning hikes and sunset drives are an everyday option, not a weekend trip.' },
              { icon: '\u{1F3E0}', title: 'Established & Mature', body: 'Tree-lined streets, mature landscaping, and established neighborhoods that feel lived-in and welcoming. Spring Valley has the settled character that newer communities are still building toward.' },
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
            <h2>Explore Spring Valley&apos;s Neighborhoods</h2>
            <p>40+ neighborhoods ranging from gated communities to established non-HOA streets.</p>
          </div>
          <div className="villages-grid">
            {[
              { name: 'The Willows', type: 'Gated \u00B7 Established', desc: 'A popular gated community near Fort Apache and Flamingo with well-maintained homes, community pools, and a strong HOA. One of Spring Valley\u2019s most sought-after addresses.', price: 'From $475K' },
              { name: 'Canyon Gate Country Club', type: 'Guard-Gated \u00B7 Golf', desc: 'A private guard-gated golf community centered around a Ted Robinson-designed course. Established luxury living with mature trees and a country club lifestyle.', price: 'From $600K' },
              { name: 'Spanish Trail', type: 'Guard-Gated \u00B7 Golf \u00B7 Luxury', desc: 'One of the valley\u2019s original luxury communities with three 9-hole golf courses, a country club, and estates that set the standard for Las Vegas luxury living.', price: 'From $700K' },
              { name: 'Rainbow / Flamingo Corridor', type: 'Established \u00B7 Central', desc: 'The heart of Spring Valley with a mix of single-family homes, townhomes, and condos. Dense retail, dining, and services along both corridors. Excellent for commuters.', price: 'From $300K' },
              { name: 'Spring Valley West', type: 'Newer \u00B7 Family', desc: 'The western neighborhoods closer to the I-215 beltway tend to be newer, with more planned subdivisions, parks, and proximity to well-rated schools.', price: 'From $400K' },
              { name: 'Condos & Townhomes', type: 'Attached \u00B7 Entry-Level', desc: 'Numerous condo and townhome communities throughout Spring Valley \u2014 ideal for first-time buyers, investors, and professionals who want proximity to the Strip and Chinatown.', price: 'From $200K' },
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
                alt="Spring Valley neighborhood and Red Rock Canyon views, Las Vegas"
              />
            </div>
            <div className="lifestyle-content">
              <span className="section-label">Lifestyle &amp; Dining</span>
              <div className="gold-rule" />
              <h2>World-Class Dining, Red Rock Sunsets, and a Central Address</h2>
              <p>Spring Valley delivers a lifestyle that blends urban convenience with desert beauty. The Chinatown corridor alone would be reason enough to live here &mdash; add Red Rock Canyon at your western doorstep and the Strip minutes east, and you have a location that checks boxes most communities can&apos;t.</p>
              <p>Daily life in Spring Valley feels complete. Grocery stores, medical facilities, parks, and schools are all within a short drive of every neighborhood.</p>
              <div className="lifestyle-bullets">
                {[
                  'Chinatown dining corridor \u2014 hundreds of restaurants spanning Chinese, Korean, Japanese, Vietnamese, Thai, and Filipino cuisines',
                  'Red Rock Canyon National Conservation Area \u2014 200,000 acres of trails \u2014 roughly 15 minutes from western Spring Valley',
                  'I-215 beltway and US-95 provide direct access to Summerlin, Henderson, and the airport corridor',
                  'Desert Breeze Park \u2014 community park with sports fields, a skate park, and a seasonal train ride',
                  'Las Vegas Strip entertainment, dining, and employment \u2014 5\u201320 minutes depending on neighborhood',
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
            <h2>Schools Serving Spring Valley Families</h2>
            <p>A large selection of public, private, and charter schools across the community.</p>
          </div>
          <div className="schools-layout">
            <div className="school-group">
              <h3>Public Schools (CCSD)</h3>
              {[['Walter Bracken STEAM Academy','K\u20135'],['Red Rock Elementary','K\u20135'],['Marc & Eva Stern Elementary','K\u20135'],['Clarence Piggott Academy','6\u20138'],['Lawrence & Heidi Canarelli Middle','6\u20138'],['Spring Valley High School','9\u201312'],['Clark High School','9\u201312'],['Desert Oasis High School','9\u201312'],].map(([n,g])=>(
                <div className="school-item" key={n}>{n}<span className="school-grades">{g}</span></div>
              ))}
            </div>
            <div className="school-group">
              <h3>Private &amp; Faith-Based</h3>
              {[['The Meadows School','PreK\u201312'],['Bishop Gorman High School','Catholic \u00B7 9\u201312'],['Mountain View Christian School','PreK\u201312'],['St. Viator Catholic School','PreK\u20138'],].map(([n,g])=>(
                <div className="school-item" key={n}>{n}<span className="school-grades">{g}</span></div>
              ))}
            </div>
            <div className="school-group">
              <h3>Charter &amp; Specialty</h3>
              {[['Doral Academy Red Rock','K\u20138'],['Somerset Academy','K\u20138'],['Coral Academy of Science','K\u201312'],['Pinecrest Academy of Nevada','K\u201312'],].map(([n,g])=>(
                <div className="school-item" key={n}>{n}<span className="school-grades">{g}</span></div>
              ))}
              <div style={{marginTop:'24px',padding:'18px',background:'rgba(201,168,76,0.06)',border:'1px solid var(--border)',borderRadius:'var(--radius)',fontSize:'13px',color:'var(--white-70)',lineHeight:'1.7'}}>
                <strong style={{color:'var(--white)'}}>School Assignment Note:</strong> Spring Valley spans a large area with many school zones. Assignments vary significantly by address. Western Spring Valley tends to zone into newer, higher-rated schools. Always confirm your assigned school with CCSD before purchasing.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <SpringValleyFAQ />

      {/* CTA */}
      <section id="cta">
        <div className="container">
          <h2>Ready to Find Your Spring Valley Home?</h2>
          <p>From golf course living at Canyon Gate to a starter condo near Chinatown, I&apos;ll help you find the right fit in Spring Valley for your lifestyle and budget.</p>
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
