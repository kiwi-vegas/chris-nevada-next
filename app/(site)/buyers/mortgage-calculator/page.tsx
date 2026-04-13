import Link from 'next/link'
import type { Metadata } from 'next'
import MortgageCalculator from '@/components/MortgageCalculator'

export const metadata: Metadata = {
  title: 'Mortgage Calculator | Estimate Your Payment | Nevada Real Estate Group',
    alternates: { canonical: 'https://www.lasvegashomesearchexperts.com/buyers/mortgage-calculator' },
  description: 'Estimate your monthly mortgage payment with our free Nevada mortgage calculator. Adjust home price, down payment, interest rate, and loan term to plan your budget.',
}

export default function MortgageCalculatorPage() {
  return (
    <main>
      {/* BREADCRUMB */}
      <div className="breadcrumb">
        <div className="breadcrumb-inner">
          <Link href="/">Home</Link>
          <span className="breadcrumb-sep">›</span>
          <Link href="/buyers/">Buyers</Link>
          <span className="breadcrumb-sep">›</span>
          <span>Mortgage Calculator</span>
        </div>
      </div>

      {/* PAGE HEADER */}
      <header id="hero" className="summerlin-hero" style={{ minHeight: '340px' }}>
        <div className="hero-bg" style={{ background: 'linear-gradient(135deg, #1C1C1C 0%, #0F0F0F 100%)' }} />
        <div className="hero-overlay" />
        <div className="hero-content summerlin">
          <div className="container">
            <p className="hero-eyebrow-sm">Planning Tools</p>
            <div className="hero-rule" />
            <h1>Estimate Your Monthly<br />Mortgage Payment</h1>
            <p className="hero-sub">
              Enter your home price, down payment, and interest rate to get an instant estimate.
              Use this tool to set a realistic budget before you start touring homes.
            </p>
          </div>
        </div>
      </header>

      {/* CALCULATOR */}
      <section style={{ padding: '80px 0', background: 'var(--dark)' }}>
        <div className="container">
          <MortgageCalculator />
          <p style={{
            textAlign: 'center',
            marginTop: '32px',
            fontSize: '12px',
            color: 'var(--white-40)',
            fontFamily: 'var(--font-sans)',
            maxWidth: '600px',
            margin: '32px auto 0',
            lineHeight: '1.7',
          }}>
            Estimates are for planning purposes only. Actual rates and payments will vary based on your credit score,
            lender, and market conditions. Contact us for a personalized pre-approval with real numbers.
          </p>
        </div>
      </section>

      {/* WHAT AFFECTS YOUR PAYMENT */}
      <section style={{ padding: '96px 0', background: 'var(--charcoal)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-label">Payment Factors</span>
            <div className="gold-rule" />
            <h2 style={{ fontFamily: 'var(--font-serif)' }}>What Affects Your Monthly Payment</h2>
            <p>Six factors determine how much you&apos;ll pay each month. Understanding each one helps you make smarter decisions.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginTop: '48px' }}>
            {[
              {
                title: 'Home Price',
                body: 'The purchase price of the home is the foundation of your mortgage. A higher price means a larger loan and higher monthly payment — all else being equal.',
              },
              {
                title: 'Down Payment',
                body: 'A larger down payment reduces your loan amount and monthly payment. Putting down 20%+ also eliminates Private Mortgage Insurance (PMI), saving $100–300/month.',
              },
              {
                title: 'Interest Rate',
                body: 'Even a 0.5% difference in rate has a significant impact over 30 years. Shop multiple lenders and consider buying down your rate with points if you plan to stay long-term.',
              },
              {
                title: 'Loan Term',
                body: 'A 30-year loan has lower monthly payments but costs far more in interest over time. A 15-year loan builds equity faster and saves tens of thousands in interest.',
              },
              {
                title: 'Property Taxes',
                body: 'Nevada has relatively low property taxes — approximately 0.7% of assessed value per year. On a $500K home, that\'s about $3,500/year, or ~$292/month added to your payment.',
              },
              {
                title: 'HOA Fees',
                body: 'Many Nevada communities have homeowners association fees ranging from $50 to $500+/month depending on amenities. Always factor HOA dues into your total monthly budget.',
              },
            ].map(f => (
              <div key={f.title} style={{
                background: 'var(--dark-2)',
                border: '1px solid var(--border-dim)',
                borderLeft: '3px solid var(--gold)',
                borderRadius: 'var(--radius)',
                padding: '24px 28px',
              }}>
                <h3 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--white)', marginBottom: '10px', fontFamily: 'var(--font-sans)' }}>
                  {f.title}
                </h3>
                <p style={{ fontSize: '14px', color: 'var(--white-70)', lineHeight: '1.7', margin: 0, fontFamily: 'var(--font-sans)' }}>
                  {f.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEVADA SPECIFIC */}
      <section style={{ padding: '80px 0', background: 'var(--dark-2)' }}>
        <div className="container">
          <div style={{
            background: 'var(--dark-3)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-lg)',
            padding: 'clamp(28px, 4vw, 56px)',
            maxWidth: '800px',
            margin: '0 auto',
          }}>
            <span className="section-label">Nevada Advantage</span>
            <div className="gold-rule" style={{ margin: '16px 0' }} />
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(22px, 2.5vw, 30px)', marginBottom: '20px' }}>
              Why Nevada Is a Smart Place to Buy
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                { label: 'No State Income Tax', desc: 'Nevada has no personal income tax, which means your gross income goes further here than in California, Oregon, or most other states.' },
                { label: '~0.7% Property Tax Rate', desc: 'One of the lowest effective property tax rates in the West. A $600K home costs roughly $350/month in property taxes — significantly less than comparable markets.' },
                { label: 'Competitive Insurance Market', desc: 'Homeowners insurance in Nevada is generally lower than coastal markets. Desert climate means no hurricane or flood risk in most communities. Expect $150–250/month on most homes.' },
                { label: 'No Transfer Tax on Real Property', desc: 'Nevada does not impose a real property transfer tax at the state level, reducing your closing costs compared to many other states.' },
              ].map(item => (
                <div key={item.label} style={{
                  display: 'flex',
                  gap: '16px',
                  padding: '16px 0',
                  borderBottom: '1px solid var(--border-dim)',
                }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--gold)', marginTop: '7px', flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--white)', fontFamily: 'var(--font-sans)', marginBottom: '4px' }}>{item.label}</div>
                    <div style={{ fontSize: '13px', color: 'var(--white-60)', fontFamily: 'var(--font-sans)', lineHeight: '1.6' }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="cta" style={{ padding: '96px 0', background: 'var(--charcoal)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="section-label">Next Step</span>
          <div className="gold-rule" style={{ margin: '16px auto' }} />
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(28px, 4vw, 42px)', marginBottom: '16px' }}>
            Ready for Real Numbers?
          </h2>
          <p style={{ color: 'var(--white-70)', maxWidth: '520px', margin: '0 auto 36px', lineHeight: '1.7' }}>
            Our calculator gives you a useful estimate — but a pre-approval gives you a real number from a real lender,
            based on your actual credit and income profile.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/buyers/mortgage-pre-approval/" className="btn-gold">Get Pre-Approved</Link>
            <a href="tel:+17252399950" className="btn-outline">Call Us</a>
          </div>
          <p style={{ marginTop: '24px', fontSize: '12px', color: 'rgba(255,255,255,0.3)' }}>
            Nevada Lic. #S.0181401.LLC · lpt Realty
          </p>
        </div>
      </section>
    </main>
  )
}
