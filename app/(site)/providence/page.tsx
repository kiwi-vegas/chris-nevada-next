import ProvidenceFAQ from '@/components/ProvidenceFAQ'
import Link from 'next/link'
import type { Metadata } from 'next'
import ProvidenceMapWrapper from '@/components/ProvidenceMapWrapper'
import PortableText from '@/components/PortableText'
import { getCommunityPage } from '@/sanity/queries'
import { mergeQuickStats, mergeDriveTimes, getSectionImageUrl } from '@/lib/community-utils'

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const cms = await getCommunityPage('providence')
  return {
    title: cms?.metaTitle ?? 'Providence Homes For Sale | Nevada Real Estate Group',
    description: cms?.metaDescription ?? 'Browse Providence homes for sale in northwest Las Vegas. Newer master-planned community with parks, trails, and new construction from $330K. Call 725.239.9950.',
  }
}

export default async function ProvidencePage() {
  const cms = await getCommunityPage('providence')

  const heroHeadline = cms?.heroHeadline ?? 'Providence Homes\nFor Sale'
  const heroSubheadline = cms?.heroSubheadline ?? "Northwest Las Vegas\u2019 family-focused master-planned community \u2014 newer construction, connected trails, and mountain views near the I-215 beltway."
  const overviewTitle = cms?.overviewTitle ?? 'Providence: Northwest Las Vegas Built for Families'

  const HARDCODED_STATS: Array<[string, string] | [string, string, string]> = [
    ['Established', '2016'],
    ['Developer', 'Focus Property Group'],
    ['Total Acreage', '~1,200 acres'],
    ['Planned Homes', '5,000+'],
    ['Median Home Price', '~$475,000', 'gold'],
    ['Neighborhoods', '10+'],
    ['Schools', '4+ nearby'],
    ['Parks', 'Multiple community parks'],
    ['Trails', 'Connected trail system'],
    ['Builders', 'Lennar, KB Home, others'],
    ['Distance to Strip', '~30 min'],
    ['Distance to Summerlin', '~15 min'],
  ]
  const displayStats = mergeQuickStats(HARDCODED_STATS, cms?.quickStats)
  const HARDCODED_DRIVE_TIMES = [
    { time: '~30 min', destination: 'to the Strip', route: 'via US-95 South' },
    { time: '~15 min', destination: 'to Downtown Summerlin', route: 'via I-215 South' },
    { time: '~25 min', destination: 'to Red Rock Canyon', route: 'via W Charleston Blvd' },
    { time: '~35 min', destination: 'to Harry Reid Airport', route: 'via US-95 \u2192 I-15 South' },
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
          <span>Providence</span>
        </div>
      </div>

      {/* HERO */}
      <header id="hero" className="summerlin-hero">
        {cms?.heroImageUrl
          ? <img src={`${cms.heroImageUrl}?w=1920&auto=format&q=85`} alt="Providence hero" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
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
              <div className="hero-stat"><span className="hero-stat-num">{qs('Active Listings', '100+')}</span><span className="hero-stat-lbl">Active Listings</span></div>
              <div className="hero-stat"><span className="hero-stat-num">{qs('Price Range', '$330K\u2013$700K+')}</span><span className="hero-stat-lbl">Price Range</span></div>
              <div className="hero-stat"><span className="hero-stat-num">{qs('Parks', 'Multiple')}</span><span className="hero-stat-lbl">Community Parks</span></div>
              <div className="hero-stat"><span className="hero-stat-num">{qs('Total Acreage', '1,200')}</span><span className="hero-stat-lbl">Acres</span></div>
            </div>
          </div>
        </div>
      </header>

      {/* MAP */}
      <section id="map" style={{ padding: '32px 0 0', background: 'var(--charcoal)' }}>
        <div className="container">
          <div className="section-header" style={{ marginBottom: '32px' }}>
            <span className="section-label">Location</span>
            <h2>Where is Providence?</h2>
            <p>Located in the northwest corridor near the I-215 beltway &mdash; between Centennial Hills and Skye Canyon, with mountain views and quick access to Summerlin.</p>
          </div>
          <div className="map-container">
            <ProvidenceMapWrapper />
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
            <h2>New Providence Listings</h2>
            <p>The 12 most recently listed homes in Providence &mdash; new construction and resale starting in the low $300Ks.</p>
          </div>
          <div className="ylopo-wrap">
            <div className="YLOPO_searchWidget" />
            <div className="YLOPO_resultsWidget" data-search='{"propertyTypes":["house","condo","townhouse"],"minPrice":200000,"locations":[{"city":"Las Vegas","state":"NV"}],"limit":12,"sortBy":"listDate","sortOrder":"desc","keywords":"Providence"}' />
          </div>
          <p className="ylopo-note">Listing data sourced from regional MLS. Information deemed reliable but not guaranteed. Updated daily.</p>
          <div className="listings-actions">
            <a href="https://search.nevadarealestategroup.net/search?s[orderBy]=sourceCreationDate%2Cdesc&s[page]=1&s[locations][0][city]=Las%20Vegas&s[locations][0][state]=NV&s[keywords]=Providence" target="_blank" rel="noopener noreferrer" className="btn-gold">View New Providence Listings Now &rarr;</a>
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
                  <p>Providence is one of the northwest corridor&apos;s newer master-planned communities, and it&apos;s quietly become one of the better family-oriented options in that part of the valley. Developed by Focus Property Group starting around 2016, Providence sits between Centennial Hills and Skye Canyon &mdash; close enough to the I-215 beltway for commuters, but far enough from the congestion of the older Strip-adjacent areas to feel genuinely suburban.</p>
                  <p>What I like about Providence is the scale. At roughly 1,200 acres, it&apos;s large enough to have meaningful amenities &mdash; community parks, a connected trail system, playgrounds, and open green spaces &mdash; but compact enough that the community doesn&apos;t feel sprawling or disconnected. Neighborhoods are designed with cul-de-sacs, low-traffic streets, and clear walking paths that make it easy for families to move around safely.</p>
                  <p>The builder lineup includes national names like Lennar and KB Home, which gives buyers options across a range of price points and floor plans. Whether you need a three-bedroom starter home or a five-bedroom family property, the variety is there. And because the community is still being built out, new construction remains available &mdash; an increasingly rare advantage in the Las Vegas market where established communities have long since sold their last new-build lots.</p>
                  <p>The northwest corridor setting delivers mountain views that are hard to beat. The Spring Mountains and Sheep Range provide a dramatic backdrop, and the desert terrain surrounding the community preserves a sense of openness. Downtown Summerlin is about 15 minutes south via the I-215, and Skye Canyon&apos;s amenities are right next door. For families who want newer construction with genuine community infrastructure at price points below Summerlin, Providence is a strong choice.</p>
                </>
              )}
            </div>
            <div className="overview-aside">
              <div className="quick-facts">
                <h3>Providence At a Glance</h3>
                {displayStats.map(([label, value, cls]) => (
                  <div className="fact-row" key={label}>
                    <span className="fact-label">{label}</span>
                    <span className={`fact-value${cls ? ' ' + cls : ''}`}>{value}</span>
                  </div>
                ))}
              </div>
              <div className="cta-card">
                <p>Ready to explore Providence? Let&apos;s schedule a tour of the community and find the home that fits your family.</p>
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
            <span className="section-label">Why Providence</span>
            <h2>What Makes Providence Stand Out</h2>
            <p>Newer construction, family-first design, and mountain views at price points below Summerlin.</p>
          </div>
          <div className="highlights-grid">
            {[
              { icon: '\u{1F46A}', title: 'Family-First Design', body: 'Cul-de-sac layouts, low-traffic residential streets, connected walking paths, and community parks and playgrounds designed specifically for families with kids.' },
              { icon: '\u{1F3D7}\uFE0F', title: 'New Construction Available', body: 'Multiple national builders still actively constructing new homes. Modern floor plans, energy-efficient features, smart home technology, and full builder warranties.' },
              { icon: '\u{26F0}\uFE0F', title: 'Mountain Views', body: 'Panoramic views of the Spring Mountains and Sheep Range from throughout the community. The northwest corridor preserves a sense of open desert space that older areas have lost.' },
              { icon: '\u{1F6B6}', title: 'Connected Trail System', body: 'A community trail network linking neighborhoods to parks, playgrounds, and open spaces. Walk, jog, or bike through the community without touching a major road.' },
              { icon: '\u{1F4B0}', title: 'Below-Summerlin Pricing', body: 'Newer construction with comparable amenities at price points typically $100K\u2013$150K below what you\u2019d pay for similar square footage in Summerlin. The value math works.' },
              { icon: '\u{1F6E3}\uFE0F', title: 'I-215 Beltway Access', body: 'Quick access to the I-215 beltway connects you to Downtown Summerlin (~15 min), the Strip (~30 min), and the broader valley without navigating surface streets.' },
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
            <h2>Explore Providence&apos;s Neighborhoods</h2>
            <p>National builders and family-oriented designs across a range of price points.</p>
          </div>
          <div className="villages-grid">
            {[
              { name: 'Lennar at Providence', type: 'Family \u00B7 Everything\u2019s Included', desc: 'Lennar\u2019s signature Everything\u2019s Included homes with premium finishes, smart home features, and no hidden upgrade costs. A popular choice for families and move-up buyers.', price: 'From $430K' },
              { name: 'KB Home at Providence', type: 'Customizable \u00B7 Value', desc: 'KB Home\u2019s Built to Order approach lets buyers personalize finishes and layouts. Some of the most accessible new-construction price points in the community.', price: 'From $380K' },
              { name: 'Providence Park Neighborhoods', type: 'Family \u00B7 Park-Adjacent', desc: 'Neighborhoods positioned along the community\u2019s parks and trail corridors. Walking distance to playgrounds and green spaces \u2014 the most popular choice for families with young children.', price: 'From $450K' },
              { name: 'Providence Townhomes', type: 'Attached \u00B7 Entry-Level', desc: 'Townhome communities offering low-maintenance living with access to all community amenities. Ideal for first-time buyers, young professionals, and downsizers.', price: 'From $330K' },
              { name: 'Providence Ridge', type: 'Premium \u00B7 Views', desc: 'Neighborhoods on elevated terrain at the community\u2019s western edge with the best mountain views. Larger lots and premium positioning.', price: 'From $550K' },
              { name: 'Premium Single-Family', type: 'Move-Up \u00B7 Spacious', desc: 'The largest homes in Providence with 4\u20135 bedrooms, three-car garages, and generous lot sizes. Modern open floor plans with energy-efficient construction.', price: 'From $600K+' },
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
                alt="Mountain views and community parks in Providence, Las Vegas"
              />
            </div>
            <div className="lifestyle-content">
              <span className="section-label">Outdoor Living</span>
              <div className="gold-rule" />
              <h2>Community Parks, Mountain Views, and Desert Trails</h2>
              <p>Providence was designed around outdoor living. The community&apos;s parks, trails, and open spaces aren&apos;t afterthoughts &mdash; they&apos;re woven into the neighborhood layout so families can walk to playgrounds, jog through connected paths, and enjoy mountain views from their daily routines.</p>
              <p>The northwest corridor&apos;s open desert terrain and dramatic mountain backdrop create a setting that feels spacious and uncrowded, even as the area continues to develop.</p>
              <div className="lifestyle-bullets">
                {[
                  'Multiple community parks with playgrounds, open green spaces, and picnic areas',
                  'Connected trail system linking neighborhoods to parks and open desert terrain',
                  'Panoramic views of the Spring Mountains and Sheep Range from throughout the community',
                  'Skye Canyon\u2019s Skye Center and 20-acre park \u2014 resort amenities right next door',
                  'Red Rock Canyon, Mt. Charleston, and Valley of Fire all within an hour\u2019s drive for weekend adventures',
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
            <h2>Schools Serving Providence Families</h2>
            <p>Newer schools built to serve the growing northwest corridor.</p>
          </div>
          <div className="schools-layout">
            <div className="school-group">
              <h3>Public Schools (CCSD)</h3>
              {[['Tule Springs Elementary','K\u20135'],['Elise L. Wolff Elementary','K\u20135'],['Goolsby Elementary','K\u20135'],['William & Mary Scherkenbach Middle','6\u20138'],['Shadow Ridge High School','9\u201312'],['Northwest Career & Technical Academy','9\u201312'],].map(([n,g])=>(
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
                <strong style={{color:'var(--white)'}}>School Assignment Note:</strong> The northwest corridor has seen significant new school construction. Zoning varies by neighborhood. Always confirm your assigned school with CCSD before purchasing.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <ProvidenceFAQ />

      {/* CTA */}
      <section id="cta">
        <div className="container">
          <h2>Ready to Find Your Providence Home?</h2>
          <p>Whether you&apos;re a first-time buyer looking at new construction or a growing family that needs more space, I&apos;ll help you find the right home in Providence.</p>
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
