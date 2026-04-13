import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mortgage Pre-Approval | Nevada Real Estate Group',
    alternates: { canonical: 'https://www.lasvegashomesearchexperts.com/buyers/mortgage-pre-approval' },
  description: 'Get pre-approved for a mortgage before you shop for Nevada homes. Pre-approved buyers make stronger offers, close faster, and avoid disappointment.',
}

export default function MortgagePreApprovalPage() {
  return (
    <main>
      {/* BREADCRUMB */}
      <div className="breadcrumb">
        <div className="breadcrumb-inner">
          <Link href="/">Home</Link>
          <span className="breadcrumb-sep">›</span>
          <Link href="/buyers/">Buyers</Link>
          <span className="breadcrumb-sep">›</span>
          <span>Mortgage Pre-Approval</span>
        </div>
      </div>

      {/* HERO */}
      <header id="hero" className="summerlin-hero">
        <div className="hero-bg" style={{ background: 'linear-gradient(135deg, #1C1C1C 0%, #0F0F0F 100%)' }} />
        <div className="hero-overlay" />
        <div className="hero-content summerlin">
          <div className="container">
            <p className="hero-eyebrow-sm">Financing</p>
            <div className="hero-rule" />
            <h1>Get Pre-Approved<br />Before You Shop</h1>
            <p className="hero-sub">
              In Nevada&apos;s competitive real estate market, sellers take pre-approved buyers far more seriously
              than those who haven&apos;t spoken to a lender. A pre-approval letter is your first negotiating tool —
              and it costs nothing to get.
            </p>
          </div>
        </div>
      </header>

      {/* WHY PRE-APPROVAL MATTERS */}
      <section style={{ padding: '96px 0', background: 'var(--dark)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-label">Why It Matters</span>
            <div className="gold-rule" />
            <h2 style={{ fontFamily: 'var(--font-serif)' }}>Why Pre-Approval Matters</h2>
            <p>Four reasons why every serious Nevada buyer starts with a pre-approval — before they look at a single listing.</p>
          </div>
          <div className="callouts-grid" style={{ marginTop: '48px' }}>
            {[
              {
                icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>,
                title: 'Know Your Exact Budget',
                body: 'Stop guessing. A pre-approval gives you a hard number — the maximum loan amount a lender will extend based on your real income, credit, and assets. No surprises.',
              },
              {
                icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>,
                title: 'Stronger Offer Position',
                body: 'In multiple-offer situations, a pre-approved buyer is always more attractive than a non-pre-approved one — even at the same price. Sellers want certainty, and pre-approval provides it.',
              },
              {
                icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>,
                title: 'Faster Closing Timeline',
                body: 'A significant chunk of loan processing happens during pre-approval. When your offer is accepted, your file is already partially complete — shaving days or weeks off your closing timeline.',
              },
              {
                icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
                title: 'Avoid Disappointment',
                body: 'There is nothing worse than finding your perfect home, falling in love, and then discovering you can\'t afford it — or losing it to a competing offer because you weren\'t ready.',
              },
            ].map(r => (
              <div key={r.title} className="callout-card">
                <div className="callout-icon">{r.icon}</div>
                <h3>{r.title}</h3>
                <p>{r.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT YOU'LL NEED */}
      <section style={{ padding: '96px 0', background: 'var(--charcoal)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '56px', alignItems: 'start' }}>
            <div>
              <span className="section-label">Documentation</span>
              <div className="gold-rule" />
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(24px, 3vw, 36px)', marginBottom: '20px' }}>
                What You&apos;ll Need to Apply
              </h2>
              <p style={{ color: 'var(--white-70)', lineHeight: '1.8', marginBottom: '24px' }}>
                Gathering these documents before you sit down with a lender makes the process faster and smoother.
                Most pre-approvals can be completed within 24–48 hours once you submit a complete file.
              </p>
              <p style={{ color: 'var(--white-70)', lineHeight: '1.8', marginBottom: '32px' }}>
                If you&apos;re self-employed or have non-traditional income, let us know. Our lender partners have
                experience with bank statement loans, asset-based lending, and other alternative documentation programs.
              </p>
              <a href="tel:+17252399950" className="btn-gold">We&apos;ll Connect You With a Lender</a>
            </div>
            <div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[
                  { doc: 'Government-Issued Photo ID', note: 'Driver\'s license or passport' },
                  { doc: 'Last 2 Years of Tax Returns', note: 'Federal returns, all schedules' },
                  { doc: 'Last 2 Months of Pay Stubs', note: 'Or 3 months if self-employed' },
                  { doc: 'Last 2 Months Bank Statements', note: 'All accounts, all pages' },
                  { doc: 'W-2s for Last 2 Years', note: 'From all employers' },
                  { doc: 'Employment History', note: 'Last 2 years with dates and employers' },
                  { doc: 'Credit Authorization', note: 'Lender will run a hard pull with your consent' },
                  { doc: 'Gift Letter (if applicable)', note: 'If any portion of down payment is gifted' },
                ].map(item => (
                  <div key={item.doc} style={{
                    display: 'flex',
                    gap: '14px',
                    alignItems: 'flex-start',
                    padding: '16px 20px',
                    background: 'var(--dark-2)',
                    borderRadius: 'var(--radius)',
                    border: '1px solid var(--border-dim)',
                  }}>
                    <div style={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      background: 'rgba(201,168,76,0.15)',
                      border: '1px solid var(--gold)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      marginTop: '2px',
                    }}>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                    </div>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--white)', fontFamily: 'var(--font-sans)', marginBottom: '2px' }}>{item.doc}</div>
                      <div style={{ fontSize: '12px', color: 'var(--white-40)', fontFamily: 'var(--font-sans)' }}>{item.note}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STEPS TO GET PRE-APPROVED */}
      <section style={{ padding: '96px 0', background: 'var(--dark-2)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-label">Simple Process</span>
            <div className="gold-rule" />
            <h2 style={{ fontFamily: 'var(--font-serif)' }}>3 Steps to Your Pre-Approval Letter</h2>
            <p>Our lender partners keep it simple. Most buyers have a letter in hand within 24 hours.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginTop: '48px' }}>
            {[
              {
                n: '01',
                title: 'Gather Your Documents',
                body: 'Collect the documents listed above. Having everything ready upfront dramatically speeds up the process and shows the lender you\'re organized and motivated.',
              },
              {
                n: '02',
                title: 'Complete an Application',
                body: 'A loan officer will review your application, run your credit, verify your income and assets, and determine the loan amount and program you qualify for. The application itself takes about 30–60 minutes.',
              },
              {
                n: '03',
                title: 'Receive Your Letter',
                body: 'Once underwriting reviews your file, you\'ll receive a pre-approval letter stating the maximum loan amount. You can use this letter to make offers — it\'s typically valid for 60–90 days.',
              },
            ].map(step => (
              <div key={step.n} style={{
                background: 'var(--dark-3)',
                border: '1px solid var(--border-dim)',
                borderLeft: '3px solid var(--gold)',
                borderRadius: 'var(--radius)',
                padding: '32px 28px',
                textAlign: 'center',
              }}>
                <div style={{ fontSize: '40px', fontWeight: 700, color: 'var(--gold)', fontFamily: 'var(--font-serif)', lineHeight: 1, marginBottom: '16px', opacity: 0.5 }}>
                  {step.n}
                </div>
                <h3 style={{ fontSize: '17px', fontWeight: 600, color: 'var(--white)', marginBottom: '12px', fontFamily: 'var(--font-sans)' }}>
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

      {/* LENDER PARTNERS */}
      <section style={{ padding: '80px 0', background: 'var(--charcoal)' }}>
        <div className="container">
          <div style={{
            background: 'var(--dark-2)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-lg)',
            padding: 'clamp(28px, 4vw, 56px)',
            maxWidth: '720px',
            margin: '0 auto',
          }}>
            <span className="section-label">Lender Partners</span>
            <div className="gold-rule" style={{ margin: '16px 0' }} />
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(22px, 2.5vw, 30px)', marginBottom: '20px' }}>
              We Work With Trusted Nevada Lenders
            </h2>
            <p style={{ color: 'var(--white-70)', lineHeight: '1.8', marginBottom: '16px' }}>
              Nevada Real Estate Group works closely with a network of local Nevada lenders who understand
              the state&apos;s market, respond quickly, and communicate clearly. We can connect you with
              preferred lender partners who have a track record of getting deals done.
            </p>
            <p style={{ color: 'var(--white-70)', lineHeight: '1.8', marginBottom: '0' }}>
              You are always free to use your own lender — we work with any licensed Nevada lender. But
              if you don&apos;t have a lender relationship yet, we can make an introduction that gets you
              moving quickly.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="cta" style={{ padding: '96px 0', background: 'var(--dark)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="section-label">Let&apos;s Connect</span>
          <div className="gold-rule" style={{ margin: '16px auto' }} />
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(28px, 4vw, 42px)', marginBottom: '16px' }}>
            Let&apos;s Connect You With a Lender
          </h2>
          <p style={{ color: 'var(--white-70)', maxWidth: '500px', margin: '0 auto 36px', lineHeight: '1.7' }}>
            Call us at 725.239.9950 and we&apos;ll introduce you to a trusted Nevada lender partner who can
            get your pre-approval started today.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="tel:+17252399950" className="btn-gold">Call 725.239.9950</a>
            <a
              href="https://search.nevadarealestategroup.net/search?s[orderBy]=sourceCreationDate%2Cdesc&s[page]=1&s[locations][0][city]=Las%20Vegas&s[locations][0][state]=NV"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
            >
              Browse Homes
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
