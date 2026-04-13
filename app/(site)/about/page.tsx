import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About Nevada Real Estate Group | #1 Team in Nevada | Chris Nevada',
  description: 'Meet Chris Nevada and Nevada Real Estate Group — the #1 real estate team in Nevada. 5,000+ transactions, 150+ agents, 15+ years of experience. Featured on HGTV. Call 725.239.9950.',
  alternates: { canonical: 'https://www.lasvegashomesearchexperts.com/about' },
}

export default function AboutPage() {
  return (
    <main>
      <div className="breadcrumb">
        <div className="breadcrumb-inner">
          <Link href="/">Home</Link>
          <span className="breadcrumb-sep">&rsaquo;</span>
          <span>About Us</span>
        </div>
      </div>

      {/* HERO */}
      <section style={{ padding: '80px 0', background: 'var(--navy)', textAlign: 'center' }}>
        <div className="container">
          <span className="section-label" style={{ color: 'var(--gold)' }}>About Us</span>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-2xl)', fontWeight: 400, color: 'var(--white)', marginBottom: '16px' }}>Nevada Real Estate Group</h1>
          <p style={{ fontSize: 'var(--text-base)', color: 'rgba(255,255,255,0.7)', maxWidth: '640px', margin: '0 auto 40px', lineHeight: 1.8 }}>The #1 real estate team in Nevada. 5,000+ closed transactions. 150+ agents. From luxury estates to first homes &mdash; we know every community in the Las Vegas and Reno metros.</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '48px', flexWrap: 'wrap' }}>
            <div><div style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 400, color: 'var(--gold-light)', lineHeight: 1 }}>5,000+</div><div style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginTop: '8px' }}>Transactions Closed</div></div>
            <div><div style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 400, color: 'var(--gold-light)', lineHeight: 1 }}>150+</div><div style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginTop: '8px' }}>Licensed Agents</div></div>
            <div><div style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 400, color: 'var(--gold-light)', lineHeight: 1 }}>700+</div><div style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginTop: '8px' }}>Homes Sold in 2025</div></div>
            <div><div style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 400, color: 'var(--gold-light)', lineHeight: 1 }}>Top 1%</div><div style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginTop: '8px' }}>Nationwide (RealTrends)</div></div>
          </div>
        </div>
      </section>

      {/* CHRIS NEVADA BIO */}
      <section style={{ padding: '96px 0', background: 'var(--white)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'start' }}>
            <div>
              <span className="section-label">Team Leader</span>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-xl)', fontWeight: 400, color: 'var(--navy)', marginBottom: '24px' }}>Chris Nevada</h2>
              <p style={{ fontSize: '13px', color: 'var(--text-faint)', marginBottom: '24px' }}>Owner &amp; Team Leader &middot; Nevada Real Estate Group &middot; LPT Realty<br />Nevada License #S.0181401.LLC</p>

              <p style={{ fontSize: 'var(--text-base)', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '20px' }}>Chris Nevada didn&apos;t start in real estate. He started in service. After 16 years in the United States Navy, where he earned the rank of Chief Petty Officer, Chris brought the same discipline, accountability, and mission-first mentality to the Las Vegas real estate market &mdash; and built one of the most successful real estate organizations in the country.</p>

              <p style={{ fontSize: 'var(--text-base)', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '20px' }}>With over 15 years of experience in residential and luxury real estate, Chris has personally overseen more than 5,000 closed transactions across Las Vegas, Henderson, Summerlin, North Las Vegas, Reno, Sparks, and every corner of the Nevada market. In 2025 alone, Nevada Real Estate Group closed over 700 homes &mdash; earning recognition as a Top 100 Real Estate Team in the United States by RealTrends, placing the team in the top 1% of all real estate teams nationwide.</p>

              <p style={{ fontSize: 'var(--text-base)', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '20px' }}>But numbers only tell part of the story. Chris founded Nevada Real Estate Group on a simple principle: every client deserves the same level of expertise, communication, and commitment &mdash; whether they&apos;re purchasing a $300,000 starter home in North Las Vegas or a $20 million estate in The Ridges. That principle has attracted over 150 licensed agents to the team, each specializing in specific communities, price points, and property types across the state.</p>

              <p style={{ fontSize: 'var(--text-base)', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '20px' }}>Chris&apos;s approach to real estate mirrors his military background: preparation, precision, and relentless execution. Every listing is backed by data-driven pricing strategy. Every buyer receives neighborhood-level market intelligence. Every negotiation is handled with the kind of tactical focus that only comes from years of high-stakes decision-making. It&apos;s an approach that has earned the team over 6,500 five-star reviews across Zillow, Google, and FastExpert &mdash; one of the highest review counts for any real estate team in the western United States.</p>
            </div>
            <div>
              <div style={{ background: 'var(--cream)', borderRadius: '12px', padding: '40px 32px', marginBottom: '24px' }}>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-lg)', color: 'var(--navy)', marginBottom: '20px' }}>Recognition &amp; Awards</h3>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {[
                    'Top 100 Real Estate Team in the United States (RealTrends 2025)',
                    'Top 1% of All Real Estate Teams Nationwide',
                    '#1 Real Estate Team in Nevada (2025)',
                    'Voted Best Real Estate Agent — Las Vegas & Reno (2025)',
                    'Featured on HGTV',
                    '6,500+ Five-Star Reviews (Zillow, Google, FastExpert)',
                    'Top Real Estate Team Recognition — Annual Since 2018',
                  ].map(award => (
                    <li key={award} style={{ fontSize: '14px', color: 'var(--text-secondary)', paddingLeft: '20px', position: 'relative', lineHeight: 1.6 }}>
                      <span style={{ position: 'absolute', left: 0, top: '4px', color: 'var(--gold)', fontWeight: 700 }}>&bull;</span>
                      {award}
                    </li>
                  ))}
                </ul>
              </div>

              <div style={{ background: 'var(--cream)', borderRadius: '12px', padding: '40px 32px', marginBottom: '24px' }}>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-lg)', color: 'var(--navy)', marginBottom: '20px' }}>Areas of Expertise</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {['Luxury Properties', 'First-Time Buyers', 'Military & Veterans', 'Real Estate Investment', 'New Construction', 'High-Rise Condos', 'Relocation', 'Multi-Family', 'Wealth Building', '1031 Exchanges'].map(tag => (
                    <span key={tag} style={{ fontSize: '12px', fontWeight: 600, padding: '6px 14px', background: 'var(--white)', border: '1px solid var(--border-light)', borderRadius: '20px', color: 'var(--navy)' }}>{tag}</span>
                  ))}
                </div>
              </div>

              <div style={{ background: 'var(--cream)', borderRadius: '12px', padding: '40px 32px' }}>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-lg)', color: 'var(--navy)', marginBottom: '16px' }}>Service Areas</h3>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.7 }}>Las Vegas &middot; Henderson &middot; Summerlin &middot; North Las Vegas &middot; Boulder City &middot; Southern Highlands &middot; MacDonald Highlands &middot; Lake Las Vegas &middot; Anthem &middot; Green Valley &middot; Seven Hills &middot; Inspirada &middot; Cadence &middot; Skye Canyon &middot; Mountains Edge &middot; Centennial Hills</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MILITARY BACKGROUND */}
      <section style={{ padding: '80px 0', background: 'var(--cream)' }}>
        <div className="container" style={{ maxWidth: '780px' }}>
          <span className="section-label">Service Before Sales</span>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-xl)', fontWeight: 400, color: 'var(--navy)', marginBottom: '24px' }}>From the Navy to Nevada</h2>
          <p style={{ fontSize: 'var(--text-base)', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '20px' }}>Before Chris Nevada ever sold a home, he spent 16 years serving the United States as a Chief Petty Officer in the U.S. Navy. That experience shaped everything about how he leads Nevada Real Estate Group today &mdash; the operational discipline, the commitment to mission success, and the understanding that trust is earned through actions, not promises.</p>
          <p style={{ fontSize: 'var(--text-base)', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '20px' }}>Chris is a passionate advocate for veteran home buyers and has built specific programs within Nevada Real Estate Group to serve military families, including dedicated VA loan specialists, connections to veteran-friendly lenders, and agents who understand the unique timelines and requirements of military relocations. For Chris, serving those who serve is not a marketing angle &mdash; it&apos;s personal.</p>
        </div>
      </section>

      {/* THE TEAM */}
      <section style={{ padding: '80px 0', background: 'var(--white)' }}>
        <div className="container" style={{ maxWidth: '780px' }}>
          <span className="section-label">The Team</span>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-xl)', fontWeight: 400, color: 'var(--navy)', marginBottom: '24px' }}>150+ Agents. One Standard.</h2>
          <p style={{ fontSize: 'var(--text-base)', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '20px' }}>Nevada Real Estate Group is not a one-person operation. It is a full-service real estate organization with over 150 licensed agents operating across the Las Vegas and Reno metropolitan areas. Every agent on the team is trained in Chris Nevada&apos;s systems for market analysis, pricing strategy, negotiation, and client communication &mdash; ensuring that every client receives the same high-caliber service regardless of which agent they work with.</p>
          <p style={{ fontSize: 'var(--text-base)', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '20px' }}>The team includes dedicated specialists for luxury properties, new construction, 55+ active adult communities, high-rise condos, investment properties, and first-time buyers. This specialization means that when a buyer is searching in The Ridges, they work with an agent who knows every lot, every builder, and every recent transaction in The Ridges &mdash; not a generalist who covers the entire valley.</p>
          <p style={{ fontSize: 'var(--text-base)', color: 'var(--text-secondary)', lineHeight: 1.8 }}>The result: 700+ homes sold in 2025, 5,000+ career transactions, and a client satisfaction rate reflected in over 6,500 five-star reviews across the major review platforms. Nevada Real Estate Group is not the biggest team in Nevada because of marketing. It is the biggest team in Nevada because of results.</p>
        </div>
      </section>

      {/* REVIEWS HIGHLIGHT */}
      <section style={{ padding: '80px 0', background: 'var(--navy)', textAlign: 'center' }}>
        <div className="container">
          <span className="section-label" style={{ color: 'var(--gold)' }}>Client Reviews</span>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-xl)', fontWeight: 400, color: 'var(--white)', marginBottom: '32px' }}>6,500+ Five-Star Reviews</h2>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '48px', flexWrap: 'wrap', marginBottom: '32px' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '42px', color: 'var(--gold-light)' }}>2,500+</div>
              <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '4px' }}>Zillow Reviews</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '42px', color: 'var(--gold-light)' }}>2,000+</div>
              <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '4px' }}>Google Reviews</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '42px', color: 'var(--gold-light)' }}>2,000+</div>
              <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '4px' }}>FastExpert Reviews</div>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <a href="https://www.zillow.com/profile/NevadaGroup" target="_blank" rel="noopener noreferrer" className="btn-gold">Read Zillow Reviews</a>
            <a href="https://share.google/RndBhGHXBHjfihGd2" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', padding: '13px 28px', border: '2px solid rgba(255,255,255,0.4)', color: 'var(--white)', fontSize: '14px', fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase', borderRadius: '8px', textDecoration: 'none' }}>Read Google Reviews</a>
          </div>
        </div>
      </section>

      {/* CONTACT CTA */}
      <section style={{ padding: '80px 0', background: 'var(--cream)', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '640px' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-xl)', fontWeight: 400, color: 'var(--navy)', marginBottom: '16px' }}>Ready to Work With the #1 Team in Nevada?</h2>
          <p style={{ fontSize: 'var(--text-base)', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '32px' }}>Whether you&apos;re buying your first home, selling a luxury estate, or building an investment portfolio, Nevada Real Estate Group has an agent who specializes in exactly what you need.</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap', marginBottom: '24px' }}>
            <a href="tel:+17252399950" className="btn-gold">Call 725.239.9950</a>
            <Link href="/contact" className="btn-outline" style={{ borderColor: 'var(--navy)', color: 'var(--navy)' }}>Send a Message</Link>
          </div>
          <p style={{ fontSize: '13px', color: 'var(--text-faint)' }}>Chris Nevada &middot; S.181401 &middot; Nevada Real Estate Group &middot; LPT Realty<br />8945 W Russell Rd, Suite 170, Las Vegas, NV 89148<br /><a href="mailto:info@nevadagroup.com" style={{ color: 'var(--gold)' }}>info@nevadagroup.com</a></p>
        </div>
      </section>

      {/* SCHEMA */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'RealEstateAgent',
        name: 'Nevada Real Estate Group',
        url: 'https://www.lasvegashomesearchexperts.com',
        telephone: '+17252399950',
        email: 'info@nevadagroup.com',
        founder: { '@type': 'Person', name: 'Chris Nevada', jobTitle: 'Owner & Team Leader' },
        address: { '@type': 'PostalAddress', streetAddress: '8945 W Russell Rd #170', addressLocality: 'Las Vegas', addressRegion: 'NV', postalCode: '89148', addressCountry: 'US' },
        numberOfEmployees: '150+',
        areaServed: [
          { '@type': 'City', name: 'Las Vegas' },
          { '@type': 'City', name: 'Henderson' },
          { '@type': 'City', name: 'North Las Vegas' },
        ],
        aggregateRating: { '@type': 'AggregateRating', ratingValue: '5.0', bestRating: '5', worstRating: '1', ratingCount: '6500', reviewCount: '6500' },
        award: ['Top 100 Real Estate Team in the United States (RealTrends 2025)', '#1 Real Estate Team in Nevada', 'Featured on HGTV'],
      }) }} />
    </main>
  )
}
