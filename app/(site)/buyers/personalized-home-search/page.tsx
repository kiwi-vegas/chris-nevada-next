import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Get Personalized Home Alerts | Nevada Real Estate Group',
    alternates: { canonical: 'https://www.lasvegashomesearchexperts.com/buyers/personalized-home-search' },
  description: 'Never miss the perfect home. Set up personalized listing alerts and get instant notifications when homes matching your criteria hit the Nevada market.',
}

export default function PersonalizedHomeSearchPage() {
  return (
    <main>
      {/* BREADCRUMB */}
      <div className="breadcrumb">
        <div className="breadcrumb-inner">
          <Link href="/">Home</Link>
          <span className="breadcrumb-sep">›</span>
          <Link href="/buyers/">Buyers</Link>
          <span className="breadcrumb-sep">›</span>
          <span>Get Alerts</span>
        </div>
      </div>

      {/* HERO */}
      <header id="hero" className="summerlin-hero">
        <div className="hero-bg" style={{ background: 'linear-gradient(135deg, #1C1C1C 0%, #0F0F0F 100%)' }} />
        <div className="hero-overlay" />
        <div className="hero-content summerlin">
          <div className="container">
            <p className="hero-eyebrow-sm">Listing Alerts</p>
            <div className="hero-rule" />
            <h1>Never Miss the<br />Perfect Home</h1>
            <p className="hero-sub">
              The Nevada market moves fast. Homes in Summerlin, Henderson, and other popular communities often
              go under contract within days — sometimes hours. With personalized listing alerts, you&apos;ll be
              the first to know when a home matching your exact criteria hits the market.
            </p>
          </div>
        </div>
      </header>

      {/* HOW IT WORKS */}
      <section style={{ padding: '96px 0', background: 'var(--dark)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-label">How It Works</span>
            <div className="gold-rule" />
            <h2 style={{ fontFamily: 'var(--font-serif)' }}>Three Simple Steps to Instant Alerts</h2>
            <p>Tell us what you&apos;re looking for and we&apos;ll monitor the market for you — around the clock.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px', marginTop: '48px' }}>
            {[
              {
                n: '01',
                title: 'Tell Us What You Want',
                body: 'Share your target community, price range, property type, bedroom count, and any must-have features. The more specific you are, the better your alerts will be.',
              },
              {
                n: '02',
                title: 'We Monitor the Market Daily',
                body: 'Our platform pulls fresh MLS data every day. The moment a matching home is listed — or a price drops on an existing listing — your alert fires immediately.',
              },
              {
                n: '03',
                title: 'Get Instant Alerts',
                body: 'Receive email or text notifications with full listing details, photos, and pricing. You decide how often you want to hear from us — daily digest or real-time.',
              },
            ].map(step => (
              <div key={step.n} style={{
                background: 'var(--dark-3)',
                border: '1px solid var(--border-dim)',
                borderLeft: '3px solid var(--gold)',
                borderRadius: 'var(--radius)',
                padding: '32px 28px',
              }}>
                <div style={{ fontSize: '36px', fontWeight: 700, color: 'var(--gold)', fontFamily: 'var(--font-serif)', lineHeight: 1, marginBottom: '16px', opacity: 0.5 }}>
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

      {/* ALERT BENEFITS */}
      <section style={{ padding: '96px 0', background: 'var(--charcoal)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '48px', alignItems: 'start' }}>
            <div>
              <span className="section-label">What You Get</span>
              <div className="gold-rule" />
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(24px, 3vw, 36px)', marginBottom: '20px' }}>
                Stay One Step Ahead of the Market
              </h2>
              <p style={{ color: 'var(--white-70)', lineHeight: '1.8', marginBottom: '32px' }}>
                In a competitive market, timing is everything. Our alert system is designed to give you a genuine
                edge over buyers who are simply refreshing Zillow. You&apos;ll get better information, faster.
              </p>
              <a href="tel:+17252399950" className="btn-gold">Call to Set Up Your Search</a>
            </div>
            <div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {[
                  { label: 'New Listings', desc: 'Instant alerts the moment a matching home is listed on MLS' },
                  { label: 'Price Reductions', desc: 'Know immediately when a home on your watchlist drops in price' },
                  { label: 'Back on Market', desc: 'Get notified when a previously pending home becomes available again' },
                  { label: 'Fully Customizable', desc: 'Adjust your search criteria any time — community, price, beds, features' },
                  { label: 'Email or Text Delivery', desc: 'Choose how and how often you want to receive your alerts' },
                  { label: 'No Obligation', desc: 'Cancel or pause your alerts at any time — no pressure, no commitment' },
                ].map(item => (
                  <div key={item.label} style={{
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
                      background: 'var(--gold)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      marginTop: '2px',
                    }}>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
                    </div>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--white)', fontFamily: 'var(--font-sans)', marginBottom: '2px' }}>{item.label}</div>
                      <div style={{ fontSize: '13px', color: 'var(--white-50)', fontFamily: 'var(--font-sans)', lineHeight: '1.5' }}>{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BROWSE NOW */}
      <section style={{ padding: '96px 0', background: 'var(--dark-2)' }}>
        <div className="container">
          <div style={{
            background: 'var(--dark-3)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-lg)',
            padding: 'clamp(32px, 5vw, 64px)',
            textAlign: 'center',
            maxWidth: '700px',
            margin: '0 auto',
          }}>
            <span className="section-label">Start Now</span>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(24px, 3vw, 36px)', margin: '20px 0 16px' }}>
              Browse Nevada Homes Right Now
            </h2>
            <p style={{ color: 'var(--white-70)', lineHeight: '1.8', marginBottom: '32px', maxWidth: '480px', margin: '0 auto 32px' }}>
              Start your search on our YLOPO-powered platform. When you find communities or homes you like,
              call us and we&apos;ll set up a personalized alert tailored to your exact criteria.
            </p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a
                href="https://search.nevadarealestategroup.net"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold"
              >
                Search Listings Now →
              </a>
              <a href="tel:+17252399950" className="btn-outline">
                Call to Set Up Alerts
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="cta" style={{ padding: '80px 0', background: 'var(--charcoal)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(24px, 3vw, 36px)', marginBottom: '16px' }}>
            Want a Personalized Search?
          </h2>
          <p style={{ color: 'var(--white-70)', maxWidth: '480px', margin: '0 auto 32px', lineHeight: '1.7' }}>
            Call us and one of our agents will set up a customized search profile for you in minutes.
            You&apos;ll start receiving alerts before you hang up the phone.
          </p>
          <a href="tel:+17252399950" className="btn-gold">Call 725.239.9950</a>
          <p style={{ marginTop: '24px', fontSize: '12px', color: 'rgba(255,255,255,0.3)' }}>
            Nevada Lic. #S.0181401.LLC · lpt Realty
          </p>
        </div>
      </section>
    </main>
  )
}
