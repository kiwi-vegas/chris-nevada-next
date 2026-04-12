import SilveradoRanchFAQ from '@/components/SilveradoRanchFAQ'
import Link from 'next/link'
import type { Metadata } from 'next'
import SilveradoRanchMapWrapper from '@/components/SilveradoRanchMapWrapper'
import PortableText from '@/components/PortableText'
import { getCommunityPage } from '@/sanity/queries'
import { mergeQuickStats, mergeDriveTimes, getSectionImageUrl } from '@/lib/community-utils'

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const cms = await getCommunityPage('silverado-ranch')
  return {
    title: cms?.metaTitle ?? 'Silverado Ranch Homes For Sale | Nevada Real Estate Group',
    description: cms?.metaDescription ?? 'Browse Silverado Ranch homes for sale in southeast Las Vegas. Established community minutes from the airport and Henderson with homes from $225K to $650K+. Call 725.239.9950.',
  }
}

export default async function SilveradoRanchPage() {
  const cms = await getCommunityPage('silverado-ranch')

  const heroHeadline = cms?.heroHeadline ?? 'Silverado Ranch Homes\nFor Sale'
  const heroSubheadline = cms?.heroSubheadline ?? "Southeast Las Vegas\u2019 best-connected established community \u2014 minutes from the airport, the Strip, and Henderson, with genuine value at every price point."
  const overviewTitle = cms?.overviewTitle ?? 'Silverado Ranch: Southeast Value With Unbeatable Access'

  const HARDCODED_STATS: Array<[string, string] | [string, string, string]> = [
    ['Type', 'Unincorporated area'],
    ['County', 'Clark County'],
    ['Zip Codes', '89123 / 89183'],
    ['Population', '~40,000'],
    ['Median Home Price', '~$425,000', 'gold'],
    ['Neighborhoods', '15+'],
    ['Schools', '6+ nearby'],
    ['Parks', '5+'],
    ['Key Freeways', 'I-215 & I-15'],
    ['Nearest Airport', 'Harry Reid (5\u201310 min)'],
    ['Distance to Strip', '10\u201315 min'],
    ['Distance to Henderson', '~5 min'],
  ]
  const displayStats = mergeQuickStats(HARDCODED_STATS, cms?.quickStats)
  const HARDCODED_DRIVE_TIMES = [
    { time: '10\u201315 min', destination: 'to the Strip', route: 'via I-15 or Las Vegas Blvd' },
    { time: '5\u201310 min', destination: 'to Harry Reid Airport', route: 'via I-215 or Las Vegas Blvd' },
    { time: '~5 min', destination: 'to Henderson', route: 'via Eastern Ave or I-215' },
    { time: '~15 min', destination: 'to Downtown Las Vegas', route: 'via I-15 North' },
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
          <span>Silverado Ranch</span>
        </div>
      </div>

      {/* HERO */}
      <header id="hero" className="summerlin-hero">
        {cms?.heroImageUrl
          ? <img src={`${cms.heroImageUrl}?w=1920&auto=format&q=85`} alt="Silverado Ranch hero" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
          : <div className="hero-bg" />
        }
        <div className="hero-overlay" />
        <div className="hero-content summerlin">
          <div className="container">
            <p className="hero-eyebrow-sm">Southeast Las Vegas, Nevada</p>
            <div className="hero-rule" />
            <h1>{heroHeadline.split('\n').map((line, i) => (
              <span key={i}>{line}{i < heroHeadline.split('\n').length - 1 && <br />}</span>
            ))}</h1>
            <p className="hero-sub">{heroSubheadline}</p>
            <div className="hero-stats">
              <div className="hero-stat"><span className="hero-stat-num">{qs('Active Listings', '150+')}</span><span className="hero-stat-lbl">Active Listings</span></div>
              <div className="hero-stat"><span className="hero-stat-num">{qs('Price Range', '$225K\u2013$650K+')}</span><span className="hero-stat-lbl">Price Range</span></div>
              <div className="hero-stat"><span className="hero-stat-num">{qs('Distance to Strip', '10\u201315 min')}</span><span className="hero-stat-lbl">To the Strip</span></div>
              <div className="hero-stat"><span className="hero-stat-num">{qs('Nearest Airport', '5\u201310 min')}</span><span className="hero-stat-lbl">To the Airport</span></div>
            </div>
          </div>
        </div>
      </header>

      {/* MAP */}
      <section id="map" style={{ padding: '32px 0 0', background: 'var(--charcoal)' }}>
        <div className="container">
          <div className="section-header" style={{ marginBottom: '32px' }}>
            <span className="section-label">Location</span>
            <h2>Where is Silverado Ranch?</h2>
            <p>Straddling the Las Vegas&ndash;Henderson border in the southeast valley &mdash; one of the most centrally connected locations with I-215 and I-15 access.</p>
          </div>
          <div className="map-container">
            <SilveradoRanchMapWrapper />
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
            <h2>New Silverado Ranch Listings</h2>
            <p>The 12 most recently listed homes in Silverado Ranch &mdash; condos, townhomes, and single-family homes from $225K.</p>
          </div>
          <div className="ylopo-wrap">
            <div className="YLOPO_searchWidget" />
            <div className="YLOPO_resultsWidget" data-search='{"propertyTypes":["house","condo","townhouse"],"minPrice":150000,"locations":[{"city":"Las Vegas","state":"NV"}],"limit":12,"sortBy":"listDate","sortOrder":"desc","keywords":"Silverado Ranch"}' />
          </div>
          <p className="ylopo-note">Listing data sourced from regional MLS. Information deemed reliable but not guaranteed. Updated daily.</p>
          <div className="listings-actions">
            <a href="https://search.nevadarealestategroup.net/search?s[orderBy]=sourceCreationDate%2Cdesc&s[page]=1&s[locations][0][city]=Las%20Vegas&s[locations][0][state]=NV&s[keywords]=Silverado%20Ranch" target="_blank" rel="noopener noreferrer" className="btn-gold">View New Silverado Ranch Listings Now &rarr;</a>
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
                  <p>Silverado Ranch is the community I recommend to buyers who tell me they want the southeast valley &mdash; close to Henderson, close to the airport, close to the Strip &mdash; but don&apos;t want to pay Henderson prices. Sitting right on the Las Vegas&ndash;Henderson border, Silverado Ranch gives you almost everything Henderson offers at price points that are typically $50K&ndash;$100K lower for comparable homes. That&apos;s a meaningful difference, especially for first-time buyers or investors.</p>
                  <p>The location really is the story here. Harry Reid International Airport is 5&ndash;10 minutes away. The Strip is 10&ndash;15 minutes via I-15 or Las Vegas Blvd. Henderson&apos;s Galleria at Sunset, dining, and retail are about 5 minutes south. And the I-215 beltway connects you to the entire valley without touching surface streets. If you work in hospitality, aviation, healthcare, or anywhere along the I-15 corridor, the commute from Silverado Ranch is hard to beat.</p>
                  <p>The housing stock is a healthy mix of established and newer construction. The neighborhoods north of Silverado Ranch Blvd tend to be older &mdash; built in the early 2000s with mature landscaping and larger lots. South of the boulevard, you&apos;ll find newer subdivisions with modern floor plans and energy-efficient construction. And there are still some non-HOA pockets for buyers who want more freedom with their property, which is increasingly rare in this part of the valley.</p>
                  <p>Silverado Ranch Park anchors the community green space, and several subdivisions have their own community pools and parks. The suburban character is genuine &mdash; tree-lined streets, family-oriented neighborhoods, and the kind of settled feel that newer communities are still working toward. It&apos;s not flashy, it&apos;s not trying to be a resort. It&apos;s a well-located, well-priced community that consistently delivers for buyers who prioritize value and convenience.</p>
                </>
              )}
            </div>
            <div className="overview-aside">
              <div className="quick-facts">
                <h3>Silverado Ranch At a Glance</h3>
                {displayStats.map(([label, value, cls]) => (
                  <div className="fact-row" key={label}>
                    <span className="fact-label">{label}</span>
                    <span className={`fact-value${cls ? ' ' + cls : ''}`}>{value}</span>
                  </div>
                ))}
              </div>
              <div className="cta-card">
                <p>Ready to explore Silverado Ranch? Let&apos;s find the neighborhood that fits your commute, lifestyle, and budget.</p>
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
            <span className="section-label">Why Silverado Ranch</span>
            <h2>What Makes Silverado Ranch Stand Out</h2>
            <p>Location, value, and convenience &mdash; the three reasons buyers keep choosing Silverado Ranch.</p>
          </div>
          <div className="highlights-grid">
            {[
              { icon: '\u2708\uFE0F', title: '5\u201310 Minutes to the Airport', body: 'One of the closest established communities to Harry Reid International Airport. A major advantage for frequent travelers, flight crews, and aviation industry professionals.' },
              { icon: '\u{1F4CD}', title: 'Strip in 10\u201315 Minutes', body: 'Direct access to the Las Vegas Strip via I-15 or Las Vegas Blvd. One of the shortest commutes in the valley for hospitality and entertainment industry workers.' },
              { icon: '\u{1F4B0}', title: 'Henderson Quality, Lower Prices', body: 'Same southeast valley location, same freeway access, same proximity to Henderson retail and dining \u2014 at price points typically $50K\u2013$100K below comparable Henderson homes.' },
              { icon: '\u{1F6E3}\uFE0F', title: 'I-215 & I-15 Access', body: 'Two major freeways within minutes. The I-215 beltway connects to Summerlin, Henderson, and the southwest corridor. I-15 runs straight to the Strip and downtown.' },
              { icon: '\u{1F3E0}', title: 'HOA & Non-HOA Options', body: 'One of the few southeast valley communities with both HOA-managed subdivisions and non-HOA neighborhoods. Choose the level of structure and cost that fits your lifestyle.' },
              { icon: '\u{1F333}', title: 'Established & Settled', body: 'Mature trees, established landscaping, and a settled suburban character. Silverado Ranch feels like a real neighborhood \u2014 not a construction zone waiting to be finished.' },
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
            <h2>Explore Silverado Ranch&apos;s Neighborhoods</h2>
            <p>A mix of established and newer neighborhoods with genuine price diversity.</p>
          </div>
          <div className="villages-grid">
            {[
              { name: 'Silverado Ranch North', type: 'Established \u00B7 Mature', desc: 'The original Silverado Ranch neighborhoods north of Silverado Ranch Blvd. Mature landscaping, larger lots, and an established suburban feel. Some non-HOA pockets available.', price: 'From $375K' },
              { name: 'Silverado Ranch South', type: 'Newer \u00B7 Family', desc: 'Newer subdivisions south of Silverado Ranch Blvd with modern floor plans, energy-efficient construction, and proximity to the I-215 beltway. Popular with families.', price: 'From $425K' },
              { name: 'Gated Subdivisions', type: 'Gated \u00B7 Premium', desc: 'Several gated neighborhoods within Silverado Ranch offer an extra layer of privacy and security. Well-maintained common areas, community pools, and controlled-access entry.', price: 'From $450K' },
              { name: 'Silverado Ranch Townhomes', type: 'Attached \u00B7 Entry-Level', desc: 'Townhome and condo communities ideal for first-time buyers, investors, and professionals. Low-maintenance living with proximity to the airport and Strip.', price: 'From $225K' },
              { name: 'Eastern Avenue Corridor', type: 'Convenient \u00B7 Mixed', desc: 'Neighborhoods along the Eastern Avenue corridor with walkable access to retail, dining, and services. A mix of single-family homes and attached units.', price: 'From $300K' },
              { name: 'Premium Single-Family', type: 'Move-Up \u00B7 Spacious', desc: 'Larger single-family homes with 4\u20135 bedrooms and premium lot sizes. The top tier of Silverado Ranch housing, often with mountain views and upgraded finishes.', price: 'From $550K+' },
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
                alt="Suburban neighborhood and mountain views in Silverado Ranch, Las Vegas"
              />
            </div>
            <div className="lifestyle-content">
              <span className="section-label">Lifestyle &amp; Convenience</span>
              <div className="gold-rule" />
              <h2>Airport Access, Henderson Dining, and Suburban Comfort</h2>
              <p>Silverado Ranch&apos;s lifestyle is defined by convenience. The airport, the Strip, and Henderson&apos;s best retail and dining corridors are all within 15 minutes. Daily life here feels effortless &mdash; errands are quick, commutes are short, and weekends are wide open.</p>
              <p>The suburban character provides a genuine neighborhood feel with parks, community pools, and mature tree-lined streets that make Silverado Ranch feel lived-in and welcoming.</p>
              <div className="lifestyle-bullets">
                {[
                  'Harry Reid International Airport \u2014 5\u201310 minutes, one of the closest communities to the terminal',
                  'Galleria at Sunset and Henderson dining corridor \u2014 roughly 5 minutes south via Eastern Ave',
                  'Las Vegas Strip entertainment, dining, and employment \u2014 10\u201315 minutes via I-15',
                  'Silverado Ranch Park and multiple subdivision community pools and green spaces',
                  'Clark County Wetlands Park \u2014 210 acres of trails and nature viewing \u2014 minutes east toward Henderson',
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
            <h2>Schools Serving Silverado Ranch Families</h2>
            <p>A mix of Las Vegas and Henderson school zones serving the border community.</p>
          </div>
          <div className="schools-layout">
            <div className="school-group">
              <h3>Public Schools (CCSD)</h3>
              {[['Lois & Jerry Tarkanian Middle School','6\u20138'],['Silvestri Junior High School','6\u20138'],['Silverado High School','9\u201312'],['Green Valley High School','9\u201312'],['Southeast Career Technical Academy','9\u201312'],].map(([n,g])=>(
                <div className="school-item" key={n}>{n}<span className="school-grades">{g}</span></div>
              ))}
            </div>
            <div className="school-group">
              <h3>Private &amp; Faith-Based</h3>
              {[['Henderson International School','PreK\u201312'],['Mountain View Christian School','PreK\u201312'],['Pinecrest Academy of Nevada','K\u201312'],].map(([n,g])=>(
                <div className="school-item" key={n}>{n}<span className="school-grades">{g}</span></div>
              ))}
            </div>
            <div className="school-group">
              <h3>Charter &amp; Specialty</h3>
              {[['Doral Academy of Nevada','K\u20138'],['Somerset Academy','K\u20138'],['Coral Academy of Science','K\u201312'],].map(([n,g])=>(
                <div className="school-item" key={n}>{n}<span className="school-grades">{g}</span></div>
              ))}
              <div style={{marginTop:'24px',padding:'18px',background:'rgba(201,168,76,0.06)',border:'1px solid var(--border)',borderRadius:'var(--radius)',fontSize:'13px',color:'var(--white-70)',lineHeight:'1.7'}}>
                <strong style={{color:'var(--white)'}}>School Assignment Note:</strong> Silverado Ranch straddles Las Vegas and Henderson school zones. Assignments vary significantly by address and may fall into either district\u2019s boundaries. Always confirm your assigned school with CCSD before purchasing.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <SilveradoRanchFAQ />

      {/* CTA */}
      <section id="cta">
        <div className="container">
          <h2>Ready to Find Your Silverado Ranch Home?</h2>
          <p>Whether you&apos;re looking for a starter condo near the airport or a family home bordering Henderson, I&apos;ll help you find the right fit in Silverado Ranch.</p>
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
