import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'First Time Home Buyers Guide | Nevada Real Estate Group',
    alternates: { canonical: 'https://www.lasvegashomesearchexperts.com/buyers/first-time-buyers' },
  description: 'A complete Nevada home buying guide for first-time buyers. From checking your credit to getting your keys — step-by-step guidance from agents with 35 years of Las Vegas market experience.',
}

export default function FirstTimeBuyersPage() {
  return (
    <main>
      {/* BREADCRUMB */}
      <div className="breadcrumb">
        <div className="breadcrumb-inner">
          <Link href="/">Home</Link>
          <span className="breadcrumb-sep">›</span>
          <Link href="/buyers/">Buyers</Link>
          <span className="breadcrumb-sep">›</span>
          <span>First Time Buyers</span>
        </div>
      </div>

      {/* HERO */}
      <header id="hero" className="summerlin-hero">
        <div className="hero-bg" style={{ background: 'linear-gradient(135deg, #1C1C1C 0%, #0F0F0F 100%)' }} />
        <div className="hero-overlay" />
        <div className="hero-content summerlin">
          <div className="container">
            <p className="hero-eyebrow-sm">First Time Buyers</p>
            <div className="hero-rule" />
            <h1>Your Complete Nevada<br />Home Buying Guide</h1>
            <p className="hero-sub">
              Buying your first home is one of the most significant financial decisions you&apos;ll make. It
              doesn&apos;t have to be overwhelming. This guide walks you through every step — from checking
              your finances to picking up your keys — with plain language and Nevada-specific guidance.
            </p>
          </div>
        </div>
      </header>

      {/* THE HOME BUYING JOURNEY */}
      <section style={{ padding: '96px 0', background: 'var(--dark)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-label">The Journey</span>
            <div className="gold-rule" />
            <h2 style={{ fontFamily: 'var(--font-serif)' }}>The Home Buying Journey — 8 Steps</h2>
            <p>Follow this roadmap to go from curious to closing with confidence.</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '48px' }}>
            {[
              {
                n: '01',
                title: 'Assess Your Finances',
                body: 'Before you look at a single listing, get a clear picture of your finances. Check your credit score (aim for 620+ for conventional, 580+ for FHA). Calculate your savings — you\'ll need down payment funds plus closing costs (typically 2–5% of purchase price). Review your debt-to-income ratio; most lenders want DTI below 43%.',
              },
              {
                n: '02',
                title: 'Get Pre-Approved',
                body: 'A pre-approval letter from a lender tells you exactly how much house you can afford and shows sellers you\'re a serious buyer. In Nevada\'s competitive market, offers without pre-approval letters are often ignored. Gather your W-2s, pay stubs, bank statements, and tax returns before meeting with a lender.',
              },
              {
                n: '03',
                title: 'Choose the Right Agent',
                body: 'Your agent is your advocate throughout the entire transaction. Look for someone with specific experience in your target community — local knowledge affects everything from offer strategy to school district nuances. Nevada Real Estate Group agents have 35 years of market knowledge and zero-pressure approach.',
              },
              {
                n: '04',
                title: 'Define Your Priorities',
                body: 'Make a list of must-haves (non-negotiables) and nice-to-haves (bonuses). Common must-haves: number of bedrooms, school district, commute distance, garage. Common nice-to-haves: pool, updated kitchen, specific views. Being clear on this list helps your agent filter listings and saves you from touring homes that won\'t work.',
              },
              {
                n: '05',
                title: 'Search and Tour Homes',
                body: 'Use our YLOPO-powered search platform to browse live MLS listings. Set up alerts so you\'re notified the moment a matching home is listed. When you find candidates, tour them in person — photos never capture the full picture. Plan to tour at least 5–10 homes before making your first offer.',
              },
              {
                n: '06',
                title: 'Make a Competitive Offer',
                body: 'Your agent will run a comparative market analysis (CMA) to determine fair market value. In a seller\'s market, you may need to offer at or above list price. Leverage matters too: an escalation clause, flexible closing date, or larger earnest money deposit can win a deal without just throwing money at it.',
              },
              {
                n: '07',
                title: 'Complete Inspections',
                body: 'Once your offer is accepted, hire a licensed Nevada home inspector. The inspector will review structure, roof, HVAC, plumbing, and electrical. In Nevada, pay special attention to HVAC systems (they work hard in desert heat) and pool equipment if applicable. If issues are found, you can request repairs, credits, or — in serious cases — walk away.',
              },
              {
                n: '08',
                title: 'Close and Celebrate',
                body: 'Your final walkthrough verifies the home is in agreed-upon condition. You\'ll sign closing documents, the lender funds the loan, title records the transfer, and you receive your keys. The whole closing appointment typically takes 60–90 minutes. And then — you own a Nevada home.',
              },
            ].map(step => (
              <div key={step.n} style={{
                display: 'grid',
                gridTemplateColumns: '64px 1fr',
                gap: '24px',
                background: 'var(--dark-3)',
                border: '1px solid var(--border-dim)',
                borderLeft: '3px solid var(--gold)',
                borderRadius: 'var(--radius)',
                padding: '28px',
                alignItems: 'start',
              }}>
                <div style={{
                  fontSize: '28px',
                  fontWeight: 700,
                  color: 'var(--gold)',
                  fontFamily: 'var(--font-serif)',
                  opacity: 0.6,
                  lineHeight: 1,
                  paddingTop: '4px',
                }}>
                  {step.n}
                </div>
                <div>
                  <h3 style={{ fontSize: '17px', fontWeight: 600, color: 'var(--white)', marginBottom: '10px', fontFamily: 'var(--font-sans)' }}>
                    {step.title}
                  </h3>
                  <p style={{ fontSize: '14px', color: 'var(--white-70)', lineHeight: '1.8', margin: 0, fontFamily: 'var(--font-sans)' }}>
                    {step.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEVADA FIRST-TIME BUYER PROGRAMS */}
      <section style={{ padding: '96px 0', background: 'var(--charcoal)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '48px', alignItems: 'start' }}>
            <div>
              <span className="section-label">Nevada Programs</span>
              <div className="gold-rule" />
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(24px, 3vw, 36px)', marginBottom: '20px' }}>
                Nevada First-Time Buyer Programs
              </h2>
              <p style={{ color: 'var(--white-70)', lineHeight: '1.8', marginBottom: '20px' }}>
                The <strong style={{ color: 'var(--white)' }}>Nevada Housing Division</strong> administers several programs designed to make homeownership more accessible for first-time buyers. These can reduce your upfront costs significantly.
              </p>
              <p style={{ color: 'var(--white-70)', lineHeight: '1.8', marginBottom: '20px' }}>
                The <strong style={{ color: 'var(--white)' }}>Silver State Homebuyer Assistance Program</strong> provides down payment and closing cost assistance in the form of a second mortgage at low or deferred rates — essentially free money if you stay in the home for the required period.
              </p>
              <p style={{ color: 'var(--white-70)', lineHeight: '1.8', marginBottom: '32px' }}>
                Income and purchase price limits apply. Talk to us or your lender about whether you qualify — it&apos;s worth the five-minute check.
              </p>
              <a href="tel:+17252399950" className="btn-gold">Ask Us About Programs</a>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                { title: 'Nevada Housing Division Home Is Possible', desc: 'Below-market interest rates paired with down payment assistance grants for qualifying buyers.' },
                { title: 'Home Is Possible for Heroes', desc: 'Enhanced benefits for active military, veterans, and first responders purchasing in Nevada.' },
                { title: 'Silver State Homebuyer Assistance', desc: 'Down payment assistance up to 5% of the loan amount as a forgivable or deferred second mortgage.' },
                { title: 'FHA Loans (3.5% Down)', desc: 'Backed by the federal government, FHA loans accept lower credit scores and smaller down payments.' },
                { title: 'USDA Rural Development Loans', desc: 'Zero down payment loans for qualifying rural and suburban areas of Nevada — ask your lender if your target community qualifies.' },
              ].map(prog => (
                <div key={prog.title} style={{
                  padding: '20px 24px',
                  background: 'var(--dark-2)',
                  borderRadius: 'var(--radius)',
                  border: '1px solid var(--border-dim)',
                }}>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--gold)', fontFamily: 'var(--font-sans)', marginBottom: '6px' }}>{prog.title}</div>
                  <div style={{ fontSize: '13px', color: 'var(--white-60)', fontFamily: 'var(--font-sans)', lineHeight: '1.6' }}>{prog.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* COMMON MISTAKES */}
      <section style={{ padding: '96px 0', background: 'var(--dark-2)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-label">Buyer Mistakes</span>
            <div className="gold-rule" />
            <h2 style={{ fontFamily: 'var(--font-serif)' }}>Common First-Time Buyer Mistakes to Avoid</h2>
            <p>These are the errors we see most often — and they&apos;re all preventable with the right guidance.</p>
          </div>
          <div className="callouts-grid" style={{ marginTop: '48px' }}>
            {[
              {
                icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>,
                title: 'Skipping Pre-Approval',
                body: 'Touring homes before getting pre-approved wastes your time and the seller\'s. You may fall in love with a home outside your budget, or lose out to a pre-approved buyer making the same offer.',
              },
              {
                icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>,
                title: 'Making Large Purchases Before Closing',
                body: 'Buying a car, furniture, or anything on credit between pre-approval and closing can tank your debt-to-income ratio and kill your loan. Freeze your spending until you have your keys.',
              },
              {
                icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>,
                title: 'Waiving the Home Inspection',
                body: 'In a hot market, buyers sometimes waive inspections to compete. In Nevada, that\'s almost always a mistake. HVAC systems, roofs, and pool equipment are expensive repairs that an inspection catches before you own them.',
              },
              {
                icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>,
                title: 'Working Without a Buyer\'s Agent',
                body: 'In most Nevada transactions, the seller pays both agents\' commissions. You get full representation at no additional cost to you. Representing yourself against a seller\'s experienced listing agent puts you at a significant disadvantage.',
              },
              {
                icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="1.5"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
                title: 'Ignoring Total Monthly Cost',
                body: 'Your mortgage payment is just one piece. Property taxes (~0.7%/yr), homeowners insurance (~0.5%/yr), HOA fees, and maintenance all add up. Use our mortgage calculator to see the full picture before making an offer.',
              },
            ].map(m => (
              <div key={m.title} className="callout-card">
                <div className="callout-icon">{m.icon}</div>
                <h3>{m.title}</h3>
                <p>{m.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RESOURCES */}
      <section style={{ padding: '80px 0', background: 'var(--charcoal)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-label">Next Steps</span>
            <div className="gold-rule" />
            <h2 style={{ fontFamily: 'var(--font-serif)' }}>Resources for First-Time Buyers</h2>
          </div>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center', marginTop: '40px' }}>
            <Link href="/buyers/mortgage-pre-approval/" className="btn-gold">Get Pre-Approved</Link>
            <Link href="/buyers/mortgage-calculator/" className="btn-outline">Mortgage Calculator</Link>
            <a
              href="https://search.nevadarealestategroup.net/search?s[orderBy]=sourceCreationDate%2Cdesc&s[page]=1&s[locations][0][city]=Las%20Vegas&s[locations][0][state]=NV"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
            >
              Browse Homes
            </a>
            <a href="tel:+17252399950" className="btn-outline">Call an Agent</a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="cta" style={{ padding: '96px 0', background: 'var(--dark)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="section-label">Ready?</span>
          <div className="gold-rule" style={{ margin: '16px auto' }} />
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(28px, 4vw, 42px)', marginBottom: '16px' }}>
            Ready to Take the First Step?
          </h2>
          <p style={{ color: 'var(--white-70)', fontSize: '16px', maxWidth: '520px', margin: '0 auto 36px', lineHeight: '1.7' }}>
            Call us today — no pressure, no obligation. We&apos;ll answer your questions and help you figure
            out exactly where to start based on your situation.
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
