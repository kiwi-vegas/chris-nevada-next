import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Buyers Guide | Buy a Home in Nevada | Nevada Real Estate Group',
  description: 'Work with Nevada Real Estate Group to buy your next home in Las Vegas or Reno. 35+ years of experience, 1,000+ homes sold, and a no-pressure approach that puts your goals first.',
}

export default function BuyersPage() {
  return (
    <main>
      {/* BREADCRUMB */}
      <div className="breadcrumb">
        <div className="breadcrumb-inner">
          <Link href="/">Home</Link>
          <span className="breadcrumb-sep">›</span>
          <span>Buyers</span>
        </div>
      </div>

      {/* HERO */}
      <header id="hero" className="summerlin-hero buyers-hero">
        <div className="hero-bg" style={{ background: 'linear-gradient(135deg, #1C1C1C 0%, #0F0F0F 100%)' }} />
        <div className="hero-overlay" />
        <div className="hero-content summerlin">
          <div className="container">
            <p className="hero-eyebrow-sm">For Buyers</p>
            <div className="hero-rule" />
            <h1>Buy Your Next Nevada Home<br />With Confidence</h1>
            <p className="hero-sub">
              Nevada Real Estate Group has guided buyers through every market condition for over three decades.
              From first-time buyers to seasoned investors, we bring local expertise, honest guidance, and
              a relentless work ethic to every transaction.
            </p>
            <div className="hero-stats">
              <div className="hero-stat">
                <span className="hero-stat-num">35+</span>
                <span className="hero-stat-lbl">Years Experience</span>
              </div>
              <div className="hero-stat">
                <span className="hero-stat-num">1,000+</span>
                <span className="hero-stat-lbl">Homes Sold</span>
              </div>
              <div className="hero-stat">
                <span className="hero-stat-num">LV + Reno</span>
                <span className="hero-stat-lbl">Markets</span>
              </div>
              <div className="hero-stat">
                <span className="hero-stat-num">4.9★</span>
                <span className="hero-stat-lbl">Rating</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* WHY WORK WITH OUR TEAM */}
      <section style={{ padding: '96px 0', background: 'var(--dark-2)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-label">Why Choose Us</span>
            <div className="gold-rule" />
            <h2 style={{ fontFamily: 'var(--font-serif)' }}>Why Work With Our Team</h2>
            <p>We&apos;ve spent 35 years learning every neighborhood, every market cycle, and every negotiation tactic in Southern Nevada and Reno. That knowledge is yours from day one.</p>
          </div>
          <div className="callouts-grid">
            <div className="callout-card">
              <div className="callout-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              </div>
              <h3>Local Market Expertise</h3>
              <p>35 years working exclusively in Las Vegas and Reno. We know the communities, the HOAs, the school districts, and the micro-markets that make all the difference in your purchase decision.</p>
            </div>
            <div className="callout-card">
              <div className="callout-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>
              </div>
              <h3>Full-Service Representation</h3>
              <p>From your first search to the moment you get your keys, we handle every step — pre-approval coordination, offer strategy, inspection negotiations, title review, and closing logistics.</p>
            </div>
            <div className="callout-card">
              <div className="callout-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
              </div>
              <h3>No-Pressure Approach</h3>
              <p>We work on your timeline and toward your goals. We&apos;d rather you take the time to find the right home than rush into the wrong one. Our business is built on referrals, not volume.</p>
            </div>
          </div>
        </div>
      </section>

      {/* THE BUYING PROCESS */}
      <section style={{ padding: '96px 0', background: 'var(--charcoal)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-label">The Process</span>
            <div className="gold-rule" />
            <h2 style={{ fontFamily: 'var(--font-serif)' }}>The Home Buying Process</h2>
            <p>A clear roadmap from your first conversation to closing day. We guide you through every step.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginTop: '48px' }}>
            {[
              { n: '01', title: 'Find the Right Agent', body: 'Start with a free consultation. We listen to your needs, timeline, and budget — then build a strategy tailored to you.' },
              { n: '02', title: 'Get Pre-Approved', body: 'A pre-approval letter shows sellers you\'re serious. We connect you with trusted Nevada lenders who move fast and communicate clearly.' },
              { n: '03', title: 'Browse Listings', body: 'Search live MLS data with our YLOPO-powered platform. Set up instant alerts so you never miss a new listing that fits your criteria.' },
              { n: '04', title: 'Make an Offer', body: 'We analyze comps, assess the market, and craft a competitive offer. Our negotiation experience helps you win without overpaying.' },
              { n: '05', title: 'Inspection & Due Diligence', body: 'We recommend trusted inspectors, review every report with you, and negotiate repairs or credits before you\'re locked in.' },
              { n: '06', title: 'Close and Get Your Keys', body: 'We coordinate title, escrow, and lender timelines. You show up to closing prepared, and walk out with your keys.' },
            ].map(step => (
              <div key={step.n} style={{
                background: 'var(--dark-3)',
                border: '1px solid var(--border-dim)',
                borderLeft: '3px solid var(--gold)',
                borderRadius: 'var(--radius)',
                padding: '24px 28px',
              }}>
                <div style={{ fontSize: '32px', fontWeight: 700, color: 'var(--gold)', fontFamily: 'var(--font-serif)', lineHeight: 1, marginBottom: '12px', opacity: 0.6 }}>
                  {step.n}
                </div>
                <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--white)', marginBottom: '10px', fontFamily: 'var(--font-sans)' }}>
                  {step.title}
                </h3>
                <p style={{ fontSize: '14px', color: 'var(--white-70)', lineHeight: '1.7', margin: 0, fontFamily: 'var(--font-sans)' }}>
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BUYER RESOURCES */}
      <section id="resources" style={{ padding: '96px 0', background: 'var(--dark)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-label">Buyer Resources</span>
            <div className="gold-rule" />
            <h2 style={{ fontFamily: 'var(--font-serif)' }}>Everything You Need to Buy in Nevada</h2>
            <p>Tools, guides, and expert resources to help you navigate the Nevada real estate market with confidence.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px', marginTop: '48px' }}>
            <a
              href="https://search.nevadarealestategroup.net/search?s[orderBy]=sourceCreationDate%2Cdesc&s[page]=1&s[locations][0][city]=Las%20Vegas&s[locations][0][state]=NV"
              target="_blank"
              rel="noopener noreferrer"
              style={{ background: 'var(--dark-3)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '28px', display: 'flex', flexDirection: 'column', gap: '12px', textDecoration: 'none', transition: 'border-color 0.15s' }}
            >
              <div style={{ width: '40px', height: '40px', borderRadius: 'var(--radius)', background: 'rgba(201,168,76,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/></svg>
              </div>
              <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--white)', fontFamily: 'var(--font-sans)', margin: 0 }}>Browse All Homes</h3>
              <p style={{ fontSize: '13px', color: 'var(--white-50)', fontFamily: 'var(--font-sans)', margin: 0, lineHeight: '1.6' }}>Search live MLS listings in Las Vegas and beyond. Updated daily with new listings.</p>
              <span style={{ fontSize: '13px', color: 'var(--gold)', fontFamily: 'var(--font-sans)', fontWeight: 600 }}>Search Listings →</span>
            </a>

            <Link
              href="/buyers/personalized-home-search/"
              style={{ background: 'var(--dark-3)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '28px', display: 'flex', flexDirection: 'column', gap: '12px', textDecoration: 'none' }}
            >
              <div style={{ width: '40px', height: '40px', borderRadius: 'var(--radius)', background: 'rgba(201,168,76,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>
              </div>
              <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--white)', fontFamily: 'var(--font-sans)', margin: 0 }}>Get Listing Alerts</h3>
              <p style={{ fontSize: '13px', color: 'var(--white-50)', fontFamily: 'var(--font-sans)', margin: 0, lineHeight: '1.6' }}>Never miss a new listing. Get instant alerts when homes matching your criteria hit the market.</p>
              <span style={{ fontSize: '13px', color: 'var(--gold)', fontFamily: 'var(--font-sans)', fontWeight: 600 }}>Set Up Alerts →</span>
            </Link>

            <Link
              href="/buyers/first-time-buyers/"
              style={{ background: 'var(--dark-3)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '28px', display: 'flex', flexDirection: 'column', gap: '12px', textDecoration: 'none' }}
            >
              <div style={{ width: '40px', height: '40px', borderRadius: 'var(--radius)', background: 'rgba(201,168,76,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
              </div>
              <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--white)', fontFamily: 'var(--font-sans)', margin: 0 }}>First Time Buyers Guide</h3>
              <p style={{ fontSize: '13px', color: 'var(--white-50)', fontFamily: 'var(--font-sans)', margin: 0, lineHeight: '1.6' }}>A complete walkthrough of the buying process from finances to closing — written for Nevada buyers.</p>
              <span style={{ fontSize: '13px', color: 'var(--gold)', fontFamily: 'var(--font-sans)', fontWeight: 600 }}>Read the Guide →</span>
            </Link>

            <Link
              href="/buyers/mortgage-calculator/"
              style={{ background: 'var(--dark-3)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '28px', display: 'flex', flexDirection: 'column', gap: '12px', textDecoration: 'none' }}
            >
              <div style={{ width: '40px', height: '40px', borderRadius: 'var(--radius)', background: 'rgba(201,168,76,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="8" y1="10" x2="16" y2="10"/><line x1="8" y1="14" x2="12" y2="14"/></svg>
              </div>
              <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--white)', fontFamily: 'var(--font-sans)', margin: 0 }}>Mortgage Calculator</h3>
              <p style={{ fontSize: '13px', color: 'var(--white-50)', fontFamily: 'var(--font-sans)', margin: 0, lineHeight: '1.6' }}>Estimate your monthly payment with our interactive calculator. Adjust price, down payment, and rate.</p>
              <span style={{ fontSize: '13px', color: 'var(--gold)', fontFamily: 'var(--font-sans)', fontWeight: 600 }}>Calculate Now →</span>
            </Link>

            <Link
              href="/buyers/mortgage-pre-approval/"
              style={{ background: 'var(--dark-3)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '28px', display: 'flex', flexDirection: 'column', gap: '12px', textDecoration: 'none' }}
            >
              <div style={{ width: '40px', height: '40px', borderRadius: 'var(--radius)', background: 'rgba(201,168,76,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5"><path d="M9 12l2 2 4-4"/><path d="M21 12c.552 0 1-.448 1-1V5a2 2 0 00-2-2H4a2 2 0 00-2 2v6c0 .552.448 1 1 1h1v7a2 2 0 002 2h10a2 2 0 002-2v-7h1z"/></svg>
              </div>
              <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--white)', fontFamily: 'var(--font-sans)', margin: 0 }}>Mortgage Pre-Approval</h3>
              <p style={{ fontSize: '13px', color: 'var(--white-50)', fontFamily: 'var(--font-sans)', margin: 0, lineHeight: '1.6' }}>Know your budget before you shop. We connect you with trusted Nevada lenders who move fast.</p>
              <span style={{ fontSize: '13px', color: 'var(--gold)', fontFamily: 'var(--font-sans)', fontWeight: 600 }}>Get Pre-Approved →</span>
            </Link>

            <a
              href="https://search.nevadarealestategroup.net/search?s[orderBy]=sourceCreationDate%2Cdesc&s[page]=1&s[locations][0][city]=Las%20Vegas&s[locations][0][state]=NV&s[yearMin]=2025"
              target="_blank"
              rel="noopener noreferrer"
              style={{ background: 'var(--dark-3)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '28px', display: 'flex', flexDirection: 'column', gap: '12px', textDecoration: 'none' }}
            >
              <div style={{ width: '40px', height: '40px', borderRadius: 'var(--radius)', background: 'rgba(201,168,76,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              </div>
              <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--white)', fontFamily: 'var(--font-sans)', margin: 0 }}>New Construction</h3>
              <p style={{ fontSize: '13px', color: 'var(--white-50)', fontFamily: 'var(--font-sans)', margin: 0, lineHeight: '1.6' }}>Browse brand-new 2025 builds across Las Vegas. New construction communities added monthly.</p>
              <span style={{ fontSize: '13px', color: 'var(--gold)', fontFamily: 'var(--font-sans)', fontWeight: 600 }}>Browse New Homes →</span>
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="cta" style={{ padding: '96px 0', background: 'var(--dark-2)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="section-label">Let&apos;s Get Started</span>
          <div className="gold-rule" style={{ margin: '16px auto' }} />
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(28px, 4vw, 42px)', marginBottom: '16px' }}>
            Ready to Find Your Nevada Home?
          </h2>
          <p style={{ color: 'var(--white-70)', fontSize: '16px', maxWidth: '520px', margin: '0 auto 36px', lineHeight: '1.7' }}>
            Call us today or browse current listings. Our team is ready to help you find the right home in the right neighborhood at the right price.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="tel:+17252399950" className="btn-gold">Call 725.239.9950</a>
            <a
              href="https://search.nevadarealestategroup.net/search?s[orderBy]=sourceCreationDate%2Cdesc&s[page]=1&s[locations][0][city]=Las%20Vegas&s[locations][0][state]=NV"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
            >
              Browse Listings
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
