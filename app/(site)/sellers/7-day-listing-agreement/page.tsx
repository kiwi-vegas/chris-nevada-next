import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '7-Day Listing Agreement | Nevada Real Estate Group',
  description: 'No long-term contracts. Nevada Real Estate Group offers a 7-day listing agreement — we earn your business every week. If you\'re not satisfied, cancel anytime after 7 days.',
}

export default function SevenDayListingPage() {
  return (
    <main>
      {/* BREADCRUMB */}
      <div className="breadcrumb">
        <div className="breadcrumb-inner">
          <Link href="/">Home</Link>
          <span className="breadcrumb-sep">›</span>
          <Link href="/sellers/">Sell Your Home</Link>
          <span className="breadcrumb-sep">›</span>
          <span>7-Day Listing Agreement</span>
        </div>
      </div>

      {/* HERO */}
      <header id="hero" className="summerlin-hero">
        <div className="hero-bg" style={{ background: 'linear-gradient(135deg, #1C1C1C 0%, #0F0F0F 100%)' }} />
        <div className="hero-overlay" />
        <div className="hero-content summerlin">
          <div className="container">
            <p className="hero-eyebrow-sm">Seller Advantage</p>
            <div className="hero-rule" />
            <h1>The 7-Day<br />Listing Agreement</h1>
            <p className="hero-sub">
              No long-term commitment. No being locked in with an agent who isn&apos;t performing.
              Just results — or you walk. We&apos;re confident enough in our work to offer what
              no other Nevada agent will.
            </p>
          </div>
        </div>
      </header>

      {/* WHAT IS IT */}
      <section style={{ padding: '96px 0', background: 'var(--dark)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '56px', alignItems: 'start' }}>
            <div>
              <span className="section-label">The Agreement</span>
              <div className="gold-rule" />
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(24px, 3vw, 38px)', marginBottom: '24px' }}>
                What Is the 7-Day Listing Agreement?
              </h2>
              <p style={{ color: 'var(--white-70)', lineHeight: '1.9', marginBottom: '20px' }}>
                Most real estate agents lock sellers into 6-month or even 12-month listing contracts. If the
                agent underperforms — slow communication, poor marketing, bad advice — you&apos;re stuck.
                You can&apos;t fire them without legal risk. You can&apos;t relist with someone better.
              </p>
              <p style={{ color: 'var(--white-70)', lineHeight: '1.9', marginBottom: '20px' }}>
                <strong style={{ color: 'var(--white)' }}>Nevada Real Estate Group does it differently.</strong>{' '}
                We offer a 7-day listing agreement. If you&apos;re not satisfied with our service after
                the first seven days — our communication, our marketing, our strategy — you can cancel.
                No penalties. No arguments.
              </p>
              <p style={{ color: 'var(--white-70)', lineHeight: '1.9', marginBottom: '0' }}>
                We&apos;ve operated this way because we get results. We don&apos;t need to trap clients
                in long contracts to keep their business. We earn it every single week.
              </p>
            </div>
            <div style={{
              background: 'var(--dark-3)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-lg)',
              padding: '36px',
            }}>
              <div style={{
                fontSize: '72px',
                fontWeight: 700,
                color: 'var(--gold)',
                fontFamily: 'var(--font-serif)',
                lineHeight: 1,
                marginBottom: '8px',
              }}>
                7
              </div>
              <div style={{
                fontSize: '18px',
                fontWeight: 600,
                color: 'var(--white)',
                fontFamily: 'var(--font-sans)',
                marginBottom: '20px',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
              }}>
                Day Cancel Guarantee
              </div>
              <p style={{ color: 'var(--white-70)', fontSize: '14px', lineHeight: '1.7', marginBottom: '24px' }}>
                List your home with Nevada Real Estate Group. If you&apos;re not completely satisfied
                with our service after the first 7 days, cancel the agreement with no penalties and
                no questions asked.
              </p>
              <div style={{ borderTop: '1px solid var(--border-dim)', paddingTop: '20px', marginBottom: '20px' }}>
                {[
                  'No cancellation fees',
                  'No penalty clauses',
                  'No arguments or pushback',
                  'No minimum term commitment',
                ].map(item => (
                  <div key={item} style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '10px' }}>
                    <div style={{ width: '16px', height: '16px', borderRadius: '50%', background: 'var(--gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="3.5"><polyline points="20 6 9 17 4 12"/></svg>
                    </div>
                    <span style={{ fontSize: '13px', color: 'var(--white-80)', fontFamily: 'var(--font-sans)' }}>{item}</span>
                  </div>
                ))}
              </div>
              <a
                href="https://nevadarealestategroup.hifello.com/lp/63ef80d5109ae10018e62028"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold"
                style={{ display: 'block', textAlign: 'center', textDecoration: 'none' }}
              >
                Start With a Free CMA
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ padding: '96px 0', background: 'var(--charcoal)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-label">How It Works</span>
            <div className="gold-rule" />
            <h2 style={{ fontFamily: 'var(--font-serif)' }}>Three Steps to Getting Your Home Sold</h2>
            <p>We keep it simple — and we keep our end of the bargain.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginTop: '48px' }}>
            {[
              {
                n: '01',
                title: 'List Your Home',
                body: 'We run a free CMA, agree on pricing and strategy, and list your home with professional photography and a complete MLS entry. Marketing launches within 48 hours.',
              },
              {
                n: '02',
                title: 'We Market Aggressively',
                body: 'From day one, your home appears on Zillow, Realtor.com, and 50+ portals. We run targeted digital ads and email your listing to our database of active Nevada buyers.',
              },
              {
                n: '03',
                title: 'Cancel Anytime After 7 Days',
                body: 'If you feel our service isn\'t meeting your expectations after the first 7 days, notify us and we\'ll cancel the agreement immediately. No penalties, no questions.',
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

      {/* WHY WE CAN OFFER THIS */}
      <section style={{ padding: '96px 0', background: 'var(--dark-2)' }}>
        <div className="container">
          <div style={{ maxWidth: '760px', margin: '0 auto', textAlign: 'center' }}>
            <span className="section-label">Our Confidence</span>
            <div className="gold-rule" style={{ margin: '16px auto' }} />
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(24px, 3vw, 38px)', marginBottom: '28px' }}>
              Why We Can Offer This — And Why Others Can&apos;t
            </h2>
            <p style={{ color: 'var(--white-70)', lineHeight: '1.9', marginBottom: '24px', fontSize: '16px' }}>
              Long listing contracts exist to protect agents, not sellers. They&apos;re designed to keep you
              locked in even when the agent stops performing. We don&apos;t need that protection because
              our performance speaks for itself.
            </p>
            <p style={{ color: 'var(--white-70)', lineHeight: '1.9', marginBottom: '40px', fontSize: '16px' }}>
              With a 98.6% list-to-sale ratio and an average of 21 days on market, our results generate
              repeat business and referrals. We don&apos;t need contracts to keep clients — we need results.
              And results are what we deliver.
            </p>
            <div style={{
              background: 'var(--dark-3)',
              border: '1px solid var(--border)',
              borderLeft: '4px solid var(--gold)',
              borderRadius: 'var(--radius)',
              padding: '28px 32px',
              textAlign: 'left',
            }}>
              <p style={{
                fontSize: '18px',
                fontStyle: 'italic',
                color: 'var(--white-90)',
                lineHeight: '1.7',
                margin: '0 0 12px',
                fontFamily: 'var(--font-serif)',
              }}>
                &ldquo;If an agent won&apos;t offer you a short-term or cancellable listing agreement, ask yourself why.
                The answer is usually that they aren&apos;t confident enough in their results to put their
                contract where their pitch is.&rdquo;
              </p>
              <p style={{ fontSize: '13px', color: 'var(--gold)', fontFamily: 'var(--font-sans)', fontWeight: 600, margin: 0, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                Nevada Real Estate Group
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT'S INCLUDED */}
      <section style={{ padding: '96px 0', background: 'var(--charcoal)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-label">Included Services</span>
            <div className="gold-rule" />
            <h2 style={{ fontFamily: 'var(--font-serif)' }}>What&apos;s Included in Every Listing</h2>
            <p>Every seller gets our full-service marketing package — not a discounted or reduced offering.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '12px', marginTop: '48px' }}>
            {[
              'Professional Photography',
              'Full MLS Listing Entry',
              'Zillow and Realtor.com Syndication',
              'Trulia, Homes.com & 50+ Portal Syndication',
              'Social Media Marketing Campaign',
              'Email Blast to Active Buyer Database',
              'Open House Coordination',
              'Showing Management & Feedback',
              'Expert Offer Negotiation',
              'Inspection & Repair Negotiation',
              'Escrow & Title Coordination',
              'Transaction Management Through Closing',
            ].map(item => (
              <div key={item} style={{
                display: 'flex',
                gap: '12px',
                alignItems: 'center',
                padding: '16px 20px',
                background: 'var(--dark-2)',
                borderRadius: 'var(--radius)',
                border: '1px solid var(--border-dim)',
              }}>
                <div style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  background: 'var(--gold)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <span style={{ fontSize: '14px', color: 'var(--white-80)', fontFamily: 'var(--font-sans)', fontWeight: 500 }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: '96px 0', background: 'var(--dark)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-label">Common Questions</span>
            <div className="gold-rule" />
            <h2 style={{ fontFamily: 'var(--font-serif)' }}>Frequently Asked Questions</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '48px', maxWidth: '720px', margin: '48px auto 0' }}>
            {[
              {
                q: 'Is there a catch?',
                a: 'No. The 7-day agreement is exactly what it sounds like. After the first 7 days of your listing being active, you can cancel with no penalties and no fees. We don\'t add hidden language or cancellation penalties — the agreement is straightforward.',
              },
              {
                q: 'What happens if I cancel after 7 days?',
                a: 'You notify us, we cancel the listing, and it\'s over. You keep any marketing materials we\'ve created (photography, listing copy). If a buyer we introduced later purchases your home privately, standard procuring cause rules may apply — but we\'re transparent about that upfront.',
              },
              {
                q: 'Does this mean you\'re less committed to selling my home?',
                a: 'The opposite. The 7-day structure forces us to perform immediately and consistently. We can\'t coast on a 6-month contract. We have to be excellent from day one — and we are. Our 98.6% list-to-sale ratio and 21-day average DOM are the evidence.',
              },
              {
                q: 'Who qualifies for the 7-day listing agreement?',
                a: 'Any seller in our service area (Las Vegas and Reno metropolitan areas). We do ask that you commit to realistic pricing based on our CMA analysis. We can\'t guarantee results if a home is significantly overpriced — and we\'ll be upfront about that in our initial consultation.',
              },
            ].map((faq, i) => (
              <div key={i} style={{
                background: 'var(--dark-3)',
                border: '1px solid var(--border-dim)',
                borderRadius: 'var(--radius)',
                padding: '24px 28px',
              }}>
                <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--white)', marginBottom: '12px', fontFamily: 'var(--font-sans)' }}>
                  {faq.q}
                </h3>
                <p style={{ fontSize: '14px', color: 'var(--white-70)', lineHeight: '1.8', margin: 0, fontFamily: 'var(--font-sans)' }}>
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="cta" style={{ padding: '96px 0', background: 'var(--dark-2)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="section-label">Get Started</span>
          <div className="gold-rule" style={{ margin: '16px auto' }} />
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(28px, 4vw, 42px)', marginBottom: '16px' }}>
            Start With a Free Market Analysis
          </h2>
          <p style={{ color: 'var(--white-70)', maxWidth: '520px', margin: '0 auto 36px', lineHeight: '1.7' }}>
            Find out what your home is worth, meet our team, and decide if you want to list — all for free,
            with no obligation. That&apos;s our offer.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href="https://nevadarealestategroup.hifello.com/lp/63ef80d5109ae10018e62028"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold"
            >
              Get Free Market Analysis →
            </a>
            <a href="tel:+17252399950" className="btn-outline">Call 725.239.9950</a>
          </div>
          <p style={{ marginTop: '24px', fontSize: '12px', color: 'rgba(255,255,255,0.3)' }}>
            Nevada Lic. #S.0181401.LLC · lpt Realty
          </p>
        </div>
      </section>
    </main>
  )
}
