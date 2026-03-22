import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sell Your Home in Nevada | Nevada Real Estate Group',
  description: 'Sell your Nevada home for top dollar with Nevada Real Estate Group. 35+ years of market experience, 98.6% list-to-sale ratio, and a proven marketing system that gets results.',
}

export default function SellersPage() {
  return (
    <main>
      {/* BREADCRUMB */}
      <div className="breadcrumb">
        <div className="breadcrumb-inner">
          <Link href="/">Home</Link>
          <span className="breadcrumb-sep">›</span>
          <span>Sell Your Home</span>
        </div>
      </div>

      {/* HERO */}
      <header id="hero" className="summerlin-hero sellers-hero">
        <div className="hero-bg" style={{ background: 'linear-gradient(135deg, #1C1C1C 0%, #0F0F0F 100%)' }} />
        <div className="hero-overlay" />
        <div className="hero-content summerlin">
          <div className="container">
            <p className="hero-eyebrow-sm">Sell Your Home</p>
            <div className="hero-rule" />
            <h1>Sell Your Nevada Home<br />for Top Dollar</h1>
            <p className="hero-sub">
              Nevada Real Estate Group has a proven track record of selling homes faster, for more money,
              and with less stress. Our 35-year history in the Las Vegas and Reno markets means we know
              exactly what buyers want — and how to position your home to attract them.
            </p>
            <div className="hero-stats">
              <div className="hero-stat">
                <span className="hero-stat-num">35+</span>
                <span className="hero-stat-lbl">Years Market Experience</span>
              </div>
              <div className="hero-stat">
                <span className="hero-stat-num">98.6%</span>
                <span className="hero-stat-lbl">List-to-Sale Ratio</span>
              </div>
              <div className="hero-stat">
                <span className="hero-stat-num">21 Days</span>
                <span className="hero-stat-lbl">Avg. Days on Market</span>
              </div>
              <div className="hero-stat">
                <span className="hero-stat-num">1,000+</span>
                <span className="hero-stat-lbl">Homes Sold</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* WHY SELL WITH NREG */}
      <section style={{ padding: '96px 0', background: 'var(--dark-2)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-label">Why Choose Us</span>
            <div className="gold-rule" />
            <h2 style={{ fontFamily: 'var(--font-serif)' }}>Why Sell With Nevada Real Estate Group</h2>
            <p>We don&apos;t just list homes — we market them. Here&apos;s what sets our approach apart.</p>
          </div>
          <div className="callouts-grid">
            <div className="callout-card">
              <div className="callout-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 8h1a4 4 0 010 8h-1"/><path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>
              </div>
              <h3>Maximum Exposure</h3>
              <p>Your home will be marketed on the MLS, Zillow, Realtor.com, Trulia, social media platforms, our email list of active buyers, and YLOPO&apos;s digital ad network — reaching buyers wherever they search.</p>
            </div>
            <div className="callout-card">
              <div className="callout-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
              </div>
              <h3>Expert Pricing Strategy</h3>
              <p>Overpriced homes sit. Underpriced homes leave money on the table. We run a data-driven Comparative Market Analysis (CMA) to identify the precise price point that attracts maximum competition and achieves top dollar.</p>
            </div>
            <div className="callout-card">
              <div className="callout-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              </div>
              <h3>Seamless Transaction</h3>
              <p>From listing agreement to closing day, we coordinate every moving part — photography scheduling, MLS entry, showing management, offer negotiation, inspection response, title, and escrow. You just pack.</p>
            </div>
          </div>
        </div>
      </section>

      {/* OUR SELLING PROCESS */}
      <section style={{ padding: '96px 0', background: 'var(--charcoal)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-label">The Process</span>
            <div className="gold-rule" />
            <h2 style={{ fontFamily: 'var(--font-serif)' }}>Our Proven Selling Process</h2>
            <p>A transparent, step-by-step approach from your first conversation to the closing table.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginTop: '48px' }}>
            {[
              {
                n: '01',
                title: 'Free Market Analysis',
                body: 'We start with a complimentary CMA — a detailed analysis of comparable sales, active competition, and market trends. You\'ll know exactly what your home is worth before we ever sign anything.',
              },
              {
                n: '02',
                title: 'Strategic Pricing',
                body: 'Pricing is the most important decision you\'ll make as a seller. We set a price that reflects market data, your timeline, and your financial goals — then explain our reasoning so you feel confident.',
              },
              {
                n: '03',
                title: 'Professional Marketing',
                body: 'Professional photography, an MLS listing, syndication to 50+ portals, targeted social media ads, and email campaigns to our buyer database. Your home gets maximum visibility from day one.',
              },
              {
                n: '04',
                title: 'Showings & Offers',
                body: 'We coordinate showings, provide feedback after each one, and monitor buyer activity. When offers arrive, we present every one with a full analysis and our recommendation.',
              },
              {
                n: '05',
                title: 'Negotiation',
                body: 'We negotiate on your behalf with one goal: maximum net proceeds with minimum hassle. Whether it\'s price, contingencies, repairs, or closing timeline, we protect your interests at every turn.',
              },
              {
                n: '06',
                title: 'Close',
                body: 'We manage the escrow and title timeline, coordinate with all parties, and make sure nothing falls through the cracks. You show up to closing, sign, and receive your proceeds.',
              },
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

      {/* SELLER RESOURCES */}
      <section id="resources" style={{ padding: '96px 0', background: 'var(--dark)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-label">Seller Resources</span>
            <div className="gold-rule" />
            <h2 style={{ fontFamily: 'var(--font-serif)' }}>Everything You Need to Sell Successfully</h2>
            <p>Start with a free market analysis, explore our flexible listing agreement, or call us directly.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px', marginTop: '48px' }}>
            <a
              href="https://nevadarealestategroup.hifello.com/lp/63ef80d5109ae10018e62028"
              target="_blank"
              rel="noopener noreferrer"
              style={{ background: 'var(--dark-3)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '28px', display: 'flex', flexDirection: 'column', gap: '12px', textDecoration: 'none' }}
            >
              <div style={{ width: '40px', height: '40px', borderRadius: 'var(--radius)', background: 'rgba(201,168,76,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
              </div>
              <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--white)', fontFamily: 'var(--font-sans)', margin: 0 }}>Free Market Analysis</h3>
              <p style={{ fontSize: '13px', color: 'var(--white-50)', fontFamily: 'var(--font-sans)', margin: 0, lineHeight: '1.6' }}>Find out exactly what your home is worth in today&apos;s market. No obligation, no pressure.</p>
              <span style={{ fontSize: '13px', color: 'var(--gold)', fontFamily: 'var(--font-sans)', fontWeight: 600 }}>Get Your Free CMA →</span>
            </a>

            <Link
              href="/sellers/7-day-listing-agreement/"
              style={{ background: 'var(--dark-3)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '28px', display: 'flex', flexDirection: 'column', gap: '12px', textDecoration: 'none' }}
            >
              <div style={{ width: '40px', height: '40px', borderRadius: 'var(--radius)', background: 'rgba(201,168,76,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
              </div>
              <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--white)', fontFamily: 'var(--font-sans)', margin: 0 }}>7-Day Listing Agreement</h3>
              <p style={{ fontSize: '13px', color: 'var(--white-50)', fontFamily: 'var(--font-sans)', margin: 0, lineHeight: '1.6' }}>No long-term contracts. List with confidence knowing you can cancel after 7 days if you&apos;re not satisfied.</p>
              <span style={{ fontSize: '13px', color: 'var(--gold)', fontFamily: 'var(--font-sans)', fontWeight: 600 }}>Learn More →</span>
            </Link>

            <a
              href="tel:+17252399950"
              style={{ background: 'var(--dark-3)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: '28px', display: 'flex', flexDirection: 'column', gap: '12px', textDecoration: 'none' }}
            >
              <div style={{ width: '40px', height: '40px', borderRadius: 'var(--radius)', background: 'rgba(201,168,76,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 11.5 19.79 19.79 0 01.12 2.74 2 2 0 012.11 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.09a16 16 0 006 6l.46-.46a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92v2z"/></svg>
              </div>
              <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--white)', fontFamily: 'var(--font-sans)', margin: 0 }}>Call to Discuss</h3>
              <p style={{ fontSize: '13px', color: 'var(--white-50)', fontFamily: 'var(--font-sans)', margin: 0, lineHeight: '1.6' }}>Prefer to talk through your options first? Call us and we&apos;ll answer your questions with no pressure.</p>
              <span style={{ fontSize: '13px', color: 'var(--gold)', fontFamily: 'var(--font-sans)', fontWeight: 600 }}>Call 725.239.9950 →</span>
            </a>
          </div>
        </div>
      </section>

      {/* WHAT YOUR HOME IS WORTH */}
      <section style={{ padding: '80px 0', background: 'var(--dark-2)' }}>
        <div className="container">
          <div style={{
            background: 'var(--dark-3)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-lg)',
            padding: 'clamp(28px, 4vw, 56px)',
            maxWidth: '720px',
            margin: '0 auto',
            textAlign: 'center',
          }}>
            <span className="section-label">Home Value</span>
            <div className="gold-rule" style={{ margin: '16px auto' }} />
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(22px, 2.5vw, 32px)', marginBottom: '16px' }}>
              What Is Your Home Worth Right Now?
            </h2>
            <p style={{ color: 'var(--white-70)', lineHeight: '1.8', marginBottom: '28px', maxWidth: '500px', margin: '0 auto 28px' }}>
              Home values in Nevada have shifted significantly over the past few years. The only way to know
              what your home is worth today is a professional Comparative Market Analysis — and ours is completely
              free, with no obligation to list.
            </p>
            <a
              href="https://nevadarealestategroup.hifello.com/lp/63ef80d5109ae10018e62028"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold"
            >
              Get Your Free Market Analysis →
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="cta" style={{ padding: '96px 0', background: 'var(--charcoal)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="section-label">Ready to Sell?</span>
          <div className="gold-rule" style={{ margin: '16px auto' }} />
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(28px, 4vw, 42px)', marginBottom: '16px' }}>
            Let&apos;s Get Your Home Sold
          </h2>
          <p style={{ color: 'var(--white-70)', maxWidth: '520px', margin: '0 auto 36px', lineHeight: '1.7' }}>
            Call us today for a free, no-pressure consultation. We&apos;ll walk you through your options
            and show you exactly what we&apos;d do to get your home sold for top dollar.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="tel:+17252399950" className="btn-gold">Call 725.239.9950</a>
            <a
              href="https://nevadarealestategroup.hifello.com/lp/63ef80d5109ae10018e62028"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
            >
              Free Market Analysis
            </a>
          </div>
          <p style={{ marginTop: '24px', fontSize: '12px', color: 'rgba(255,255,255,0.3)' }}>
            Nevada Lic. #S.0181401.LLC · lpt Realty
          </p>
        </div>
      </section>
    </main>
  )
}
