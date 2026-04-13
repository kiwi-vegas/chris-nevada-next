import Link from 'next/link'
import type { Metadata } from 'next'
import { readFileSync } from 'fs'
import { join } from 'path'

export const metadata: Metadata = {
  title: 'Las Vegas Communities & Neighborhoods | 250+ Communities | Nevada Real Estate Group',
  description: 'Explore 250+ Las Vegas communities and neighborhoods. Summerlin, Henderson, North Las Vegas, guard-gated, 55+, luxury, high-rise. Find your perfect Las Vegas community.',
  alternates: { canonical: 'https://www.lasvegashomesearchexperts.com/communities' },
}

interface CommunityEntry {
  slug: string
  name: string
  parentCommunity?: string
  city: string
  priceRange: string
  type: string
  guardGated: boolean
  pageType?: string
}

function loadCommunities(): CommunityEntry[] {
  try {
    const filePath = join(process.cwd(), 'scripts', 'community-data.json')
    const raw = readFileSync(filePath, 'utf-8')
    return JSON.parse(raw).filter((c: any) => !c.pageType)
  } catch {
    return []
  }
}

function groupCommunities(communities: CommunityEntry[]) {
  // Primary groupings by area
  const summerlin: CommunityEntry[] = []
  const henderson: CommunityEntry[] = []
  const lasVegas: CommunityEntry[] = []
  const northLV: CommunityEntry[] = []
  const highRise: CommunityEntry[] = []

  communities.forEach(c => {
    const type = c.type?.toLowerCase() || ''
    if (type.includes('high-rise') || type.includes('high rise') || type.includes('tower') || type.includes('condo') && c.city === 'Las Vegas' && ['veer-towers','waldorf-astoria-las-vegas','panorama-towers','turnberry-towers','turnberry-place','sky-las-vegas','allure-las-vegas','juhl','the-ogden','soho-lofts','newport-lofts','the-martin','one-queensridge-place','cello-tower','four-seasons-private-residences'].includes(c.slug)) {
      highRise.push(c)
    } else if (c.parentCommunity === 'Summerlin' || c.parentCommunity === 'Summerlin West' || c.parentCommunity === 'Sun City Summerlin' || c.slug.startsWith('summerlin') || ['the-summit-club','mesa-ridge','regency-at-summerlin','heritage-at-stonebridge','trilogy-at-summerlin','sun-colony-at-siena','mira-villa','shawood-at-arcadia','the-loughton','sun-city-summerlin','red-rock-country-club','aventura-summerlin','bellacere','canyon-fairways','eagle-rock-summerlin','the-palisades-summerlin','mountain-trails-summerlin','corte-bella-summerlin','country-club-hills-summerlin','eagle-hills-summerlin','tournament-hills','the-pointe-summerlin','country-rose-estates','the-vineyards-summerlin','glenrock','carlisle-peak','astra-at-la-madre-peaks','ascension-at-the-peaks','the-paseos','the-peaks','eagle-crest'].includes(c.slug)) {
      summerlin.push(c)
    } else if (c.city === 'Henderson' || c.parentCommunity === 'Henderson' || c.parentCommunity === 'Anthem' || c.parentCommunity === 'Green Valley' || c.parentCommunity === 'MacDonald Ranch' || c.parentCommunity === 'MacDonald Highlands' || c.parentCommunity === 'Seven Hills' || c.parentCommunity === 'Lake Las Vegas' || c.parentCommunity === 'Cadence' || c.parentCommunity === 'Inspirada' || c.parentCommunity === 'Sun City Anthem') {
      henderson.push(c)
    } else if (c.city === 'North Las Vegas' || c.parentCommunity === 'Aliante') {
      northLV.push(c)
    } else {
      lasVegas.push(c)
    }
  })

  return [
    { label: 'Summerlin', count: summerlin.length, communities: summerlin.sort((a, b) => a.name.localeCompare(b.name)) },
    { label: 'Henderson', count: henderson.length, communities: henderson.sort((a, b) => a.name.localeCompare(b.name)) },
    { label: 'Las Vegas', count: lasVegas.length, communities: lasVegas.sort((a, b) => a.name.localeCompare(b.name)) },
    { label: 'North Las Vegas', count: northLV.length, communities: northLV.sort((a, b) => a.name.localeCompare(b.name)) },
    { label: 'High-Rise & Condos', count: highRise.length, communities: highRise.sort((a, b) => a.name.localeCompare(b.name)) },
  ]
}

export default function CommunitiesPage() {
  const communities = loadCommunities()
  const groups = groupCommunities(communities)

  return (
    <main>
      <div className="breadcrumb">
        <div className="breadcrumb-inner">
          <Link href="/">Home</Link>
          <span className="breadcrumb-sep">&rsaquo;</span>
          <span>Communities</span>
        </div>
      </div>

      <section className="communities-hub">
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center' }}>
            <span className="section-label">Explore Las Vegas</span>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-2xl)', fontWeight: 400, color: 'var(--navy)', marginBottom: '16px' }}>Las Vegas Communities &amp; Neighborhoods</h1>
            <p style={{ maxWidth: '640px', margin: '0 auto', textAlign: 'center' }}>{communities.length} communities across Las Vegas, Henderson, Summerlin, and North Las Vegas. From luxury guard-gated estates to family-friendly master plans.</p>
          </div>

          <div className="comm-hub-nav">
            {groups.map(g => (
              <a key={g.label} href={`#${g.label.toLowerCase().replace(/\s+/g, '-')}`} className="comm-hub-nav-item">
                {g.label} <span className="comm-hub-nav-count">{g.count}</span>
              </a>
            ))}
          </div>

          <div className="comm-hub-nav" style={{ marginTop: '-40px', marginBottom: '56px' }}>
            {[
              { label: 'Guard-Gated', href: '/guard-gated-communities/' },
              { label: '55+ Active Adult', href: '/55-plus-communities/' },
              { label: 'Luxury', href: '/luxury-communities/' },
              { label: 'High-Rise & Condos', href: '/high-rise-condos/' },
              { label: 'New Construction', href: '/new-construction/' },
              { label: 'Golf Communities', href: '/golf-communities/' },
              { label: 'Vintage & Historic', href: '/vintage-historic-neighborhoods/' },
            ].map(item => (
              <a key={item.label} href={item.href} className="comm-hub-nav-item">
                {item.label}
              </a>
            ))}
          </div>

          <div style={{ maxWidth: '780px', marginBottom: '56px' }}>
            <span className="section-label">Expert Overview</span>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-xl)', fontWeight: 400, color: 'var(--navy)', marginBottom: '20px' }}>Las Vegas Communities: A Buyer&apos;s Guide</h2>
            <p style={{ fontSize: 'var(--text-base)', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '16px' }}>The Las Vegas metro area contains over 250 distinct residential communities spanning four cities: Las Vegas, Henderson, North Las Vegas, and Boulder City. Home prices range from under $200,000 in emerging North Las Vegas neighborhoods to over $30 million in ultra-luxury guard-gated enclaves like The Summit Club and Ascaya. The median home price across the metro area is approximately $425,000 as of early 2026.</p>
            <p style={{ fontSize: 'var(--text-base)', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '16px' }}>Summerlin, developed by the Howard Hughes Corporation beginning in 1990, is the largest and most established master-planned community with 22,500 acres and 20+ villages. Henderson, consistently ranked among the safest large cities in America, offers everything from the $28.95 million Four Seasons Private Residences in MacDonald Highlands to $350,000 starter homes in Cadence. North Las Vegas provides the best value per square foot in the valley, with new construction from national builders starting in the mid-$300s.</p>
            <p style={{ fontSize: 'var(--text-base)', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '16px' }}>Guard-gated communities account for over 80 of the metro&apos;s neighborhoods, offering 24-hour staffed entry, security patrols, and structural price support from limited supply. The valley&apos;s 55+ active adult communities — led by Sun City Summerlin (7,779 homes) and Sun City Anthem (7,219 homes) — attract retirees nationwide with resort-style amenities and Nevada&apos;s zero state income tax. Las Vegas also has 15+ luxury high-rise towers along and near the Strip, plus a growing inventory of new construction from builders including Toll Brothers, Pulte Homes, KB Home, and Taylor Morrison.</p>
            <p style={{ fontSize: 'var(--text-base)', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '16px' }}>Nevada Real Estate Group, led by Chris Nevada with 150+ agents, covers every community in the Las Vegas metro. Each community page on this site includes current market statistics sourced from Zillow Research, school ratings from GreatSchools, parks with addresses, HOA fee breakdowns, builder profiles where applicable, and FAQ sections optimized for the questions buyers actually ask.</p>
          </div>

          {groups.map(group => (
            <div key={group.label} id={group.label.toLowerCase().replace(/\s+/g, '-')} className="comm-hub-section">
              <h2 className="comm-hub-section-title">{group.label} <span className="comm-hub-section-count">{group.count} communities</span></h2>
              <div className="comm-hub-grid">
                {group.communities.map(c => (
                  <a key={c.slug} href={`/${c.slug}/`} className="comm-hub-card">
                    <span className="comm-hub-card-name">{c.name}</span>
                    <span className="comm-hub-card-price">{c.priceRange.split('\u2013')[0]}</span>
                  </a>
                ))}
              </div>
            </div>
          ))}

          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <p style={{ fontSize: '14px', color: 'var(--text-faint)', marginBottom: '24px' }}>Can&apos;t find your community? Contact us for a personalized search.</p>
            <a href="tel:+17252399950" className="btn-gold">Call 725.239.9950</a>
          </div>

          <div style={{ marginTop: '64px', background: 'var(--white)', borderRadius: '12px', padding: '48px 32px', border: '1px solid var(--border-light)' }}>
            <div className="section-header" style={{ textAlign: 'center' }}>
              <span className="section-label">Common Questions</span>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-xl)', fontWeight: 400, color: 'var(--navy)' }}>Las Vegas Community FAQ</h2>
            </div>
            <div style={{ maxWidth: '780px', margin: '32px auto 0' }}>
              {[
                { q: 'What are the best neighborhoods in Las Vegas?', a: 'The best Las Vegas neighborhood depends on buyer priorities. For luxury: The Ridges, Ascaya, MacDonald Highlands, and The Summit Club ($2M–$30M+). For families: The Paseos in Summerlin, Anthem in Henderson, and Inspirada ($400K–$1.2M). For value: Aliante, Skye Canyon, and Cadence ($300K–$600K). For 55+: Sun City Summerlin and Sun City Anthem ($300K–$700K). Nevada Real Estate Group agents specialize in matching buyers to the right community.' },
                { q: 'Is Henderson or Summerlin better?', a: 'Henderson and Summerlin are both premier areas with different strengths. Summerlin (22,500 acres, west Las Vegas) offers Red Rock Canyon proximity, Downtown Summerlin shopping, and 200+ miles of trails. Henderson (105 sq mi, southeast valley) offers its own city services, Lake Las Vegas, and consistently ranks among America\'s safest cities. Henderson tends to offer slightly lower prices at equivalent quality. Both have excellent schools, guard-gated options, and strong appreciation.' },
                { q: 'What is the average home price in Las Vegas?', a: 'The Las Vegas metro median home price is approximately $425,000 as of early 2026. However, prices vary dramatically by area: North Las Vegas ($250K–$600K), east Las Vegas ($200K–$400K), Spring Valley ($300K–$700K), Henderson ($300K–$28M+), Summerlin ($400K–$30M+). The luxury segment ($1M+) represents approximately 8% of active listings.' },
                { q: 'What are the safest communities in Las Vegas?', a: 'Henderson is consistently ranked among the top 10 safest large cities in America. Within Henderson, Anthem, Seven Hills, and MacDonald Highlands have among the lowest crime rates. In Las Vegas, Summerlin\'s guard-gated villages (The Ridges, Siena, The Hills South) and Southern Highlands offer premium security. Guard-gated communities with 24-hour staffed entry have the lowest property crime rates in the valley.' },
                { q: 'Where should I buy if I\'m moving from California?', a: 'California relocators most commonly choose Summerlin (familiar master-planned community feel, similar quality to Irvine or Calabasas at 40-60% lower prices), Henderson/Green Valley (family-oriented, top schools), and the luxury enclaves (MacDonald Highlands, Ascaya, The Ridges) for buyers coming from Newport Beach or Beverly Hills. Nevada offers zero state income tax, lower property taxes, and a lower cost of living. Nevada Real Estate Group works with relocating buyers regularly.' },
                { q: 'Are there property taxes in Nevada?', a: 'Yes, but Nevada property taxes are among the lowest in the country. Clark County property taxes are typically 0.5–0.7% of assessed value (which is 35% of taxable value, not full market value). A $500,000 home typically pays $2,500–$3,500 per year. Nevada has no state income tax, no inheritance tax, and no estate tax — making total tax burden significantly lower than California, New York, or most other states.' },
                { q: 'What communities have the best schools?', a: 'Top-rated public schools (GreatSchools 8-10/10) are concentrated in Summerlin (Sig Rogich Middle 10/10, Palo Verde High 8/10, Bonner Elementary 9/10), Henderson (Pinecrest Academy, Del Webb Middle, Coronado High), and Centennial Hills. Top private schools include The Meadows School (A+, PreK-12), Bishop Gorman High School (A+), and Alexander Dawson School (A+) — all in the Summerlin area. Charter options like Doral Academy Red Rock (9/10) also rank highly.' },
                { q: 'How many communities are in Las Vegas?', a: 'The Las Vegas metro area contains over 250 distinct residential communities across Las Vegas, Henderson, North Las Vegas, and Boulder City. This includes 80+ guard-gated communities, 15+ active adult (55+) communities, 30+ golf communities, 40+ communities with active new construction, and 15+ luxury high-rise towers. Nevada Real Estate Group covers every community with dedicated neighborhood specialists.' },
              ].map((faq, i) => (
                <div key={i} style={{ borderBottom: '1px solid var(--border)', paddingBottom: '20px', marginBottom: '20px' }}>
                  <h3 style={{ fontSize: 'var(--text-base)', fontWeight: 500, color: 'var(--navy)', lineHeight: 1.4, marginBottom: '10px' }}>{faq.q}</h3>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 1.75 }}>{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'Las Vegas Communities and Neighborhoods',
        description: `${communities.length} communities across Las Vegas, Henderson, Summerlin, and North Las Vegas.`,
        numberOfItems: communities.length,
        itemListElement: communities.map((c, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: c.name,
          url: `https://www.lasvegashomesearchexperts.com/${c.slug}/`,
        })),
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.lasvegashomesearchexperts.com/' },
          { '@type': 'ListItem', position: 2, name: 'Communities', item: 'https://www.lasvegashomesearchexperts.com/communities' },
        ],
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Las Vegas Communities & Neighborhoods',
        description: `Explore ${communities.length} communities across Las Vegas, Henderson, Summerlin, and North Las Vegas. From luxury guard-gated estates to family-friendly master plans.`,
        url: 'https://www.lasvegashomesearchexperts.com/communities',
        isPartOf: { '@type': 'WebSite', name: 'Las Vegas Home Search Experts', url: 'https://www.lasvegashomesearchexperts.com' },
        about: { '@type': 'City', name: 'Las Vegas', sameAs: 'https://en.wikipedia.org/wiki/Las_Vegas' },
        publisher: { '@type': 'RealEstateAgent', name: 'Nevada Real Estate Group', telephone: '+17252399950', email: 'info@nevadagroup.com' },
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          { '@type': 'Question', name: 'What are the best neighborhoods in Las Vegas?', acceptedAnswer: { '@type': 'Answer', text: 'The best Las Vegas neighborhood depends on buyer priorities. For luxury: The Ridges, Ascaya, MacDonald Highlands, and The Summit Club ($2M–$30M+). For families: The Paseos in Summerlin, Anthem in Henderson, and Inspirada ($400K–$1.2M). For value: Aliante, Skye Canyon, and Cadence ($300K–$600K). For 55+: Sun City Summerlin and Sun City Anthem ($300K–$700K).' } },
          { '@type': 'Question', name: 'Is Henderson or Summerlin better?', acceptedAnswer: { '@type': 'Answer', text: 'Henderson and Summerlin are both premier areas. Summerlin (22,500 acres, west Las Vegas) offers Red Rock Canyon proximity and 200+ miles of trails. Henderson (105 sq mi, southeast valley) ranks among America\'s safest cities. Henderson tends to offer slightly lower prices at equivalent quality.' } },
          { '@type': 'Question', name: 'What is the average home price in Las Vegas?', acceptedAnswer: { '@type': 'Answer', text: 'The Las Vegas metro median home price is approximately $425,000 as of early 2026. Prices vary by area: North Las Vegas ($250K–$600K), Henderson ($300K–$28M+), Summerlin ($400K–$30M+).' } },
          { '@type': 'Question', name: 'What are the safest communities in Las Vegas?', acceptedAnswer: { '@type': 'Answer', text: 'Henderson is consistently ranked among the top 10 safest large cities in America. Summerlin\'s guard-gated villages and Southern Highlands also offer premium security with 24-hour staffed entry.' } },
          { '@type': 'Question', name: 'Are there property taxes in Nevada?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, but Nevada property taxes are among the lowest in the country at 0.5–0.7% of assessed value. A $500,000 home typically pays $2,500–$3,500 per year. Nevada has no state income tax, no inheritance tax, and no estate tax.' } },
          { '@type': 'Question', name: 'What communities have the best schools?', acceptedAnswer: { '@type': 'Answer', text: 'Top-rated schools are in Summerlin (Sig Rogich Middle 10/10, Bonner Elementary 9/10), Henderson (Pinecrest Academy, Coronado High), and Centennial Hills. Top private schools include The Meadows School (A+) and Bishop Gorman (A+).' } },
          { '@type': 'Question', name: 'How many communities are in Las Vegas?', acceptedAnswer: { '@type': 'Answer', text: 'The Las Vegas metro area contains over 250 distinct residential communities across Las Vegas, Henderson, North Las Vegas, and Boulder City, including 80+ guard-gated, 15+ 55+ communities, 30+ golf communities, and 15+ high-rise towers.' } },
          { '@type': 'Question', name: 'Where should I buy if I\'m moving from California?', acceptedAnswer: { '@type': 'Answer', text: 'California relocators most commonly choose Summerlin (similar to Irvine at 40-60% lower prices), Henderson/Green Valley (family-oriented), and luxury enclaves (MacDonald Highlands, Ascaya, The Ridges). Nevada offers zero state income tax and lower property taxes.' } },
        ],
      }) }} />
    </main>
  )
}
