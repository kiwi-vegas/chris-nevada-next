import CadenceFAQ from '@/components/CadenceFAQ'
import Link from 'next/link'
import type { Metadata } from 'next'
import CadenceMapWrapper from '@/components/CadenceMapWrapper'
import PortableText from '@/components/PortableText'
import { getCommunityPage } from '@/sanity/queries'
import { mergeQuickStats, mergeDriveTimes, getSectionImageUrl } from '@/lib/community-utils'

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const cms = await getCommunityPage('cadence')
  return {
    title: cms?.metaTitle ?? 'Cadence Homes For Sale | Nevada Real Estate Group',
    description: cms?.metaDescription ?? 'Browse Cadence homes for sale in Henderson, NV. 2,200-acre master-planned community with a 50-acre central park, resort clubhouse, and new construction from $350K. Call 725.239.9950.',
  }
}

export default async function CadencePage() {
  const cms = await getCommunityPage('cadence')

  const heroHeadline = cms?.heroHeadline ?? 'Cadence Homes\nFor Sale'
  const heroSubheadline = cms?.heroSubheadline ?? "Henderson\u2019s newest master-planned community \u2014 2,200 acres anchored by a 50-acre central park and resort-caliber clubhouse."
  const overviewTitle = cms?.overviewTitle ?? 'Cadence: Henderson\u2019s Next Great Neighborhood'

  const HARDCODED_STATS: Array<[string, string] | [string, string, string]> = [
    ['Established', '2014'],
    ['Developer', 'The LandWell Company'],
    ['Total Acreage', '~2,200 acres'],
    ['Planned Homes', '~13,000'],
    ['Median Home Price', '~$500,000', 'gold'],
    ['Neighborhoods', '20+'],
    ['Schools', '5+ nearby'],
    ['Central Park', '50 acres'],
    ['Clubhouse', 'Cadence Clubhouse'],
    ['Builders', 'Lennar, Toll Brothers, Richmond American'],
    ['Distance to Strip', '~25 min'],
    ['Distance to Lake Mead', '~20 min'],
  ]
  const displayStats = mergeQuickStats(HARDCODED_STATS, cms?.quickStats)
  const HARDCODED_DRIVE_TIMES = [
    { time: '~25 min', destination: 'to the Strip', route: 'via I-11 \u2192 I-515' },
    { time: '~10 min', destination: 'to Water Street District', route: 'via Lake Mead Pkwy' },
    { time: '~20 min', destination: 'to Lake Mead', route: 'via Lake Mead Pkwy East' },
    { time: '~15 min', destination: 'to Harry Reid Airport', route: 'via I-11 \u2192 I-515' },
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
          <span>Cadence</span>
        </div>
      </div>

      {/* HERO */}
      <header id="hero" className="summerlin-hero">
        {cms?.heroImageUrl
          ? <img src={`${cms.heroImageUrl}?w=1920&auto=format&q=85`} alt="Cadence hero" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
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
              <div className="hero-stat"><span className="hero-stat-num">{qs('Active Listings', '200+')}</span><span className="hero-stat-lbl">Active Listings</span></div>
              <div className="hero-stat"><span className="hero-stat-num">{qs('Price Range', '$350K\u2013$800K+')}</span><span className="hero-stat-lbl">Price Range</span></div>
              <div className="hero-stat"><span className="hero-stat-num">{qs('Central Park', '50 acres')}</span><span className="hero-stat-lbl">Central Park</span></div>
              <div className="hero-stat"><span className="hero-stat-num">{qs('Total Acreage', '2,200')}</span><span className="hero-stat-lbl">Acres</span></div>
            </div>
          </div>
        </div>
      </header>

      {/* MAP */}
      <section id="map" style={{ padding: '32px 0 0', background: 'var(--charcoal)' }}>
        <div className="container">
          <div className="section-header" style={{ marginBottom: '32px' }}>
            <span className="section-label">Location</span>
            <h2>Where is Cadence?</h2>
            <p>Located in east Henderson near Lake Mead Parkway &mdash; with quick access to I-11, Lake Mead, and the River Mountains Loop Trail.</p>
          </div>
          <div className="map-container">
            <CadenceMapWrapper />
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
            <h2>New Cadence Listings</h2>
            <p>The 12 most recently listed homes in Cadence &mdash; new construction and resale starting in the mid-$300Ks.</p>
          </div>
          <div className="ylopo-wrap">
            <div className="YLOPO_searchWidget" />
            <div className="YLOPO_resultsWidget" data-search='{"propertyTypes":["house","condo","townhouse"],"minPrice":200000,"locations":[{"city":"Henderson","state":"NV"}],"limit":12,"sortBy":"listDate","sortOrder":"desc","keywords":"Cadence"}' />
          </div>
          <p className="ylopo-note">Listing data sourced from regional MLS. Information deemed reliable but not guaranteed. Updated daily.</p>
          <div className="listings-actions">
            <a href="https://search.nevadarealestategroup.net/search?s[orderBy]=sourceCreationDate%2Cdesc&s[page]=1&s[locations][0][city]=Henderson&s[locations][0][state]=NV&s[keywords]=Cadence" target="_blank" rel="noopener noreferrer" className="btn-gold">View New Cadence Listings Now &rarr;</a>
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
                  <p>Cadence is one of those communities that quietly became one of the best deals in the Las Vegas Valley. When The LandWell Company started developing this 2,200-acre site in east Henderson around 2014, the area didn&apos;t have the name recognition of Summerlin or Inspirada. But the developers did something smart &mdash; they invested heavily in the amenity package first, and that decision is paying dividends for every homeowner in the community.</p>
                  <p>The centerpiece is the 50-acre central park, and I&apos;m not exaggerating when I say it&apos;s one of the best community parks in Southern Nevada. Sports fields, an amphitheater for concerts and events, splash pads for the kids, walking loops, and wide open green space that actually feels like a real park &mdash; not just a patch of grass between houses. Every time I bring buyers through here, the park sells the community before I say a word.</p>
                  <p>The Cadence Clubhouse rounds it out with resort-style pools, a full fitness center, sports courts, and year-round social programming. These are the kinds of amenities that you&apos;d pay a separate membership for in most communities, but they&apos;re bundled into your HOA &mdash; which, by the way, is remarkably reasonable for what you get.</p>
                  <p>The builder lineup is another strength. Lennar, Toll Brothers, Richmond American, and Woodside Homes are all here, which gives buyers real variety in floor plans, finishes, and price points. Whether you&apos;re a first-time buyer looking for an efficient three-bedroom or a move-up buyer wanting a premium Toll Brothers build, Cadence has something that fits. And the location on Lake Mead Parkway puts Lake Mead itself about 20 minutes east &mdash; a proximity that no other major Henderson community can match.</p>
                </>
              )}
            </div>
            <div className="overview-aside">
              <div className="quick-facts">
                <h3>Cadence At a Glance</h3>
                {displayStats.map(([label, value, cls]) => (
                  <div className="fact-row" key={label}>
                    <span className="fact-label">{label}</span>
                    <span className={`fact-value${cls ? ' ' + cls : ''}`}>{value}</span>
                  </div>
                ))}
              </div>
              <div className="cta-card">
                <p>Ready to explore Cadence? Let&apos;s schedule a private tour of the community and the current listings that match your goals.</p>
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
            <span className="section-label">Why Cadence</span>
            <h2>What Makes Cadence Stand Out</h2>
            <p>A modern community built around a flagship park with the builder variety and price points to match any buyer.</p>
          </div>
          <div className="highlights-grid">
            {[
              { icon: '\u{1F3DE}\uFE0F', title: '50-Acre Central Park', body: 'One of the largest community parks in the Las Vegas Valley \u2014 sports fields, amphitheater, splash pads, walking loops, and wide open green space at the heart of the community.' },
              { icon: '\u{1F3CA}', title: 'Cadence Clubhouse', body: 'Resort-style pools, a full fitness center, sports courts, event spaces, and year-round community programming \u2014 all included with your HOA dues.' },
              { icon: '\u{1F3D7}\uFE0F', title: 'Four National Builders', body: 'Lennar, Toll Brothers, Richmond American, and Woodside Homes all build here \u2014 giving buyers real choice in floor plans, finishes, and price points from $350K to $800K+.' },
              { icon: '\u{1F30A}', title: 'Lake Mead in 20 Minutes', body: 'Cadence is the closest major Henderson community to Lake Mead National Recreation Area \u2014 boating, fishing, kayaking, and shoreline beaches just a short drive east.' },
              { icon: '\u{1F6B4}', title: 'River Mountains Loop Trail', body: 'Direct access to the 34-mile River Mountains Loop Trail connecting Henderson, Boulder City, and Lake Mead \u2014 one of the premier cycling and running routes in Nevada.' },
              { icon: '\u{1F4B0}', title: 'Henderson Value', body: 'Newer construction in one of America\u2019s safest cities at price points well below comparable Henderson communities. Strong appreciation and builder warranty on new homes.' },
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
            <h2>Explore Cadence&apos;s Neighborhoods</h2>
            <p>Multiple national builders offer variety in style, size, and price from starter homes to luxury.</p>
          </div>
          <div className="villages-grid">
            {[
              { name: 'Lennar at Cadence', type: 'Family \u00B7 Everything\u2019s Included', desc: 'Lennar\u2019s signature Everything\u2019s Included homes with premium finishes, smart home features, and no hidden upgrade costs. A popular choice for families.', price: 'From $420K' },
              { name: 'Toll Brothers at Cadence', type: 'Luxury \u00B7 Semi-Custom', desc: 'Premium single-family homes with upscale finishes, gourmet kitchens, and Toll Brothers\u2019 signature quality. The prestige option within Cadence.', price: 'From $600K' },
              { name: 'Richmond American Homes', type: 'Personalized \u00B7 Modern', desc: 'Richmond American\u2019s HomeGallery experience lets buyers personalize finishes and layouts. Contemporary designs with energy-efficient construction.', price: 'From $450K' },
              { name: 'Woodside Homes', type: 'Family \u00B7 Value', desc: 'Well-designed family homes with thoughtful floor plans and quality construction at accessible price points. Strong option for first-time and move-up buyers.', price: 'From $400K' },
              { name: 'Cadence Townhomes', type: 'Attached \u00B7 Low-Maintenance', desc: 'Townhome communities ideal for professionals, downsizers, and first-time buyers. Walking distance to the central park and clubhouse.', price: 'From $350K' },
              { name: 'Premium & Custom Lots', type: 'Luxury \u00B7 Select Sites', desc: 'Select lots within Cadence offer the opportunity for larger custom and semi-custom builds with premium positioning near the central park and mountain views.', price: 'From $700K+' },
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
                alt="Central park and outdoor lifestyle in Cadence, Henderson"
              />
            </div>
            <div className="lifestyle-content">
              <span className="section-label">Outdoor Living</span>
              <div className="gold-rule" />
              <h2>A 50-Acre Park, Lake Mead Access, and 34 Miles of Loop Trail</h2>
              <p>Cadence was designed with outdoor living as a core feature, not an afterthought. The 50-acre central park is the community&apos;s anchor &mdash; a genuine civic space with sports fields, event programming, and enough open green space that it never feels crowded.</p>
              <p>The location in east Henderson gives you something no other major community in the valley can match: proximity to Lake Mead and direct access to the River Mountains Loop Trail.</p>
              <div className="lifestyle-bullets">
                {[
                  '50-acre central park with sports fields, amphitheater, splash pads, and walking loops',
                  'Cadence Clubhouse with resort pools, fitness center, sports courts, and event spaces',
                  'River Mountains Loop Trail \u2014 34-mile paved loop connecting Henderson, Boulder City, and Lake Mead',
                  'Lake Mead National Recreation Area \u2014 boating, kayaking, fishing \u2014 roughly 20 minutes east',
                  'Sloan Canyon National Conservation Area, Bootleg Canyon, and Valley of Fire all within an hour',
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
            <h2>Schools Serving Cadence Families</h2>
            <p>Growing east Henderson has seen new schools built to serve communities like Cadence.</p>
          </div>
          <div className="schools-layout">
            <div className="school-group">
              <h3>Public Schools (CCSD)</h3>
              {[['Robert L. Forbuss Elementary','K\u20135'],['Elise L. Wolff Elementary','K\u20135'],['C.T. Sewell Elementary','K\u20135'],['Del E. Webb Middle School','6\u20138'],['Basic High School','9\u201312'],['Southeast Career Technical Academy','9\u201312'],].map(([n,g])=>(
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
                <strong style={{color:'var(--white)'}}>School Assignment Note:</strong> Henderson school zones vary by address. New schools continue to be built as east Henderson grows. Always confirm your assigned school with CCSD before purchasing.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <CadenceFAQ />

      {/* CTA */}
      <section id="cta">
        <div className="container">
          <h2>Ready to Find Your Cadence Home?</h2>
          <p>Whether you&apos;re looking at new construction from Lennar or Toll Brothers, or a move-in-ready resale near the central park, I&apos;ll help you find the right home in Cadence.</p>
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
