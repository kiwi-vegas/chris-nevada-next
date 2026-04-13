import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Get a Cash Offer on Your Las Vegas Home | Nevada Real Estate Group',
  description: 'Get a no-obligation cash offer on your Las Vegas, Henderson, or Summerlin home within 24 hours. No repairs, no showings, close in as few as 7 days. Nevada Real Estate Group.',
  alternates: { canonical: 'https://www.lasvegashomesearchexperts.com/cash-offer' },
}

export default function CashOfferPage() {
  return (
    <main>
      <div className="breadcrumb">
        <div className="breadcrumb-inner">
          <Link href="/">Home</Link>
          <span className="breadcrumb-sep">&rsaquo;</span>
          <span>Get a Cash Offer</span>
        </div>
      </div>

      {/* HERO */}
      <section style={{ padding: '80px 0', background: 'var(--navy)', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '720px' }}>
          <span className="section-label" style={{ color: 'var(--gold)' }}>Sell Fast</span>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-2xl)', fontWeight: 400, color: 'var(--white)', marginBottom: '20px' }}>Get a Cash Offer on Your Home in 24 Hours</h1>
          <p style={{ fontSize: 'var(--text-base)', color: 'rgba(255,255,255,0.7)', lineHeight: 1.8, marginBottom: '40px' }}>No repairs. No showings. No open houses. Close in as few as 7 days or on your schedule. Nevada Real Estate Group provides no-obligation cash offers on homes across Las Vegas, Henderson, Summerlin, and North Las Vegas.</p>
          <a href="https://nevadarealestategroup.hifello.com/lp/63ef80d5109ae10018e62028" target="_blank" rel="noopener noreferrer" className="btn-gold" style={{ fontSize: '16px', padding: '16px 40px' }}>Get Your Cash Offer Now &rarr;</a>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ padding: '80px 0', background: 'var(--white)' }}>
        <div className="container">
          <div className="section-header" style={{ textAlign: 'center' }}>
            <span className="section-label">How It Works</span>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-xl)', fontWeight: 400, color: 'var(--navy)' }}>Three Steps to Your Cash Offer</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px', marginTop: '48px', maxWidth: '960px', margin: '48px auto 0' }}>
            {[
              { step: '1', title: 'Tell Us About Your Home', desc: 'Fill out a short form with your property address and basic details. No in-person visit required to get your initial offer. Takes less than 2 minutes.' },
              { step: '2', title: 'Receive Your Cash Offer', desc: 'Within 24 hours, you receive a no-obligation cash offer based on current market data, comparable sales, and property condition. No hidden fees, no surprises.' },
              { step: '3', title: 'Close on Your Timeline', desc: 'Accept the offer and choose your closing date — as fast as 7 days or up to 60 days. No repairs, no inspections, no appraisal contingencies. You pick the date that works for you.' },
            ].map(s => (
              <div key={s.step} style={{ textAlign: 'center' }}>
                <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'var(--navy)', color: 'var(--gold-light)', fontFamily: 'var(--font-serif)', fontSize: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>{s.step}</div>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-lg)', color: 'var(--navy)', marginBottom: '12px' }}>{s.title}</h3>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 1.7 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CASH OFFER */}
      <section style={{ padding: '80px 0', background: 'var(--cream)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'start' }}>
            <div>
              <span className="section-label">Why Choose a Cash Offer</span>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-xl)', fontWeight: 400, color: 'var(--navy)', marginBottom: '24px' }}>The Fastest Way to Sell Your Nevada Home</h2>
              <p style={{ fontSize: 'var(--text-base)', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '20px' }}>A traditional home sale in the Las Vegas metro area takes an average of 45&ndash;90 days from listing to closing. That timeline includes staging, photography, showings, open houses, buyer financing delays, inspection negotiations, and appraisal contingencies. For homeowners who need to move quickly, a cash offer eliminates every one of those steps.</p>
              <p style={{ fontSize: 'var(--text-base)', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '20px' }}>Nevada Real Estate Group&apos;s cash offer program is designed for sellers who value certainty and speed over maximum market price. The offer is based on current comparable sales data for your specific neighborhood and ZIP code, adjusted for property condition. There are no agent commissions on the cash offer side, no repair credits, and no closing cost surprises.</p>
              <p style={{ fontSize: 'var(--text-base)', color: 'var(--text-secondary)', lineHeight: 1.8 }}>This program is ideal for homeowners facing relocation deadlines, inherited properties, divorce situations, financial hardship, or simply anyone who wants the certainty of a guaranteed sale without the uncertainty of the open market.</p>
            </div>
            <div>
              <div style={{ background: 'var(--white)', border: '1px solid var(--border-light)', borderRadius: '12px', padding: '32px' }}>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-lg)', color: 'var(--navy)', marginBottom: '20px' }}>Cash Offer vs. Traditional Sale</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                  {[
                    ['Timeline', 'As fast as 7 days', '45–90 days'],
                    ['Repairs Required', 'None — sell as-is', 'Negotiated after inspection'],
                    ['Showings', 'None', '10–30+ showings'],
                    ['Appraisal', 'Not required', 'Required by lender'],
                    ['Financing Risk', 'Zero — cash is guaranteed', 'Buyer loan may fall through'],
                    ['Closing Costs', 'Minimal or covered', 'Standard seller costs'],
                    ['Certainty', 'Guaranteed close', 'Contingent on buyer'],
                  ].map(([label, cash, traditional]) => (
                    <div key={label} style={{ display: 'grid', gridTemplateColumns: '140px 1fr 1fr', gap: '12px', padding: '12px 0', borderBottom: '1px solid var(--border-light)', fontSize: '13px' }}>
                      <span style={{ fontWeight: 600, color: 'var(--navy)' }}>{label}</span>
                      <span style={{ color: 'var(--gold-hover)', fontWeight: 600 }}>{cash}</span>
                      <span style={{ color: 'var(--text-faint)' }}>{traditional}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHO IS THIS FOR */}
      <section style={{ padding: '80px 0', background: 'var(--white)' }}>
        <div className="container" style={{ maxWidth: '780px' }}>
          <div className="section-header" style={{ textAlign: 'center' }}>
            <span className="section-label">Is This Right for You?</span>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-xl)', fontWeight: 400, color: 'var(--navy)' }}>Common Situations for a Cash Offer</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '40px' }}>
            {[
              'Relocating for work with a tight deadline',
              'Inherited a property you don\'t want to manage',
              'Going through a divorce and need a clean split',
              'Behind on mortgage payments or facing foreclosure',
              'Property needs major repairs you can\'t afford',
              'Tired of being a landlord on a rental property',
              'Downsizing and want to simplify the process',
              'Already bought your next home and need to close fast',
            ].map(item => (
              <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '14px 16px', background: 'var(--cream)', borderRadius: '8px' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2.5" style={{ flexShrink: 0, marginTop: '2px' }}><polyline points="20 6 9 17 4 12"/></svg>
                <span style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: '80px 0', background: 'var(--cream)' }}>
        <div className="container" style={{ maxWidth: '780px' }}>
          <div className="section-header" style={{ textAlign: 'center' }}>
            <span className="section-label">Common Questions</span>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-xl)', fontWeight: 400, color: 'var(--navy)' }}>Cash Offer FAQ</h2>
          </div>
          <div style={{ marginTop: '40px' }}>
            {[
              { q: 'How much will my cash offer be?', a: 'Cash offers are typically 85–95% of fair market value, depending on property condition, location, and current market conditions. The exact offer is based on comparable sales in your specific neighborhood and ZIP code. You receive a transparent breakdown showing how the offer was calculated.' },
              { q: 'Is there any obligation if I request a cash offer?', a: 'No. The cash offer is completely free and no-obligation. You can request an offer, review it, and decide whether to accept or decline with zero pressure. Many homeowners request a cash offer simply to understand their options before deciding between a cash sale and a traditional listing.' },
              { q: 'How fast can I close?', a: 'Cash closings can happen in as few as 7 days from acceptance. Most sellers choose a 14–21 day closing window. You can also choose a longer timeline up to 60 days if you need more time to arrange your move. The closing date is entirely up to you.' },
              { q: 'Do I need to make repairs before selling?', a: 'No. Cash offers are made on an as-is basis. You do not need to make any repairs, updates, or improvements. The property condition is factored into the offer price. This saves sellers an average of $5,000–$15,000 in repair costs and weeks of contractor coordination.' },
              { q: 'Will I pay real estate commissions?', a: 'There are no traditional real estate commissions on the cash offer side. The offer you receive is the amount you take home minus standard closing costs (title, escrow, recording fees). Nevada Real Estate Group is compensated by the buying entity, not by you as the seller.' },
              { q: 'Can I get a cash offer on any type of property?', a: 'Cash offers are available for single-family homes, condos, townhomes, and multi-family properties (2–4 units) across Las Vegas, Henderson, North Las Vegas, Summerlin, Boulder City, and surrounding Clark County areas. Properties with significant title issues, active liens, or code violations may require additional review.' },
              { q: 'What if I want to list traditionally instead?', a: 'Nevada Real Estate Group offers both options. Many sellers request a cash offer first, then compare it to the estimated net proceeds from a traditional listing. If the traditional route makes more sense for your timeline and financial goals, the team will list your home on the MLS with full marketing support. There is no pressure to choose one path over the other.' },
              { q: 'How is this different from an iBuyer like Opendoor?', a: 'National iBuyer programs charge service fees of 5–8% on top of the offer discount. Nevada Real Estate Group\'s cash offer program has no service fee. The offer comes from local investors and cash buyers who are active in the Las Vegas market, which means competitive pricing based on real local demand — not a national algorithm.' },
            ].map((faq, i) => (
              <div key={i} style={{ borderBottom: '1px solid var(--border)', paddingBottom: '20px', marginBottom: '20px' }}>
                <h3 style={{ fontSize: 'var(--text-base)', fontWeight: 500, color: 'var(--navy)', lineHeight: 1.4, marginBottom: '10px' }}>{faq.q}</h3>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 1.75 }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '80px 0', background: 'var(--navy)', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '640px' }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-xl)', fontWeight: 400, color: 'var(--white)', marginBottom: '16px' }}>Ready for Your Cash Offer?</h2>
          <p style={{ fontSize: 'var(--text-base)', color: 'rgba(255,255,255,0.7)', lineHeight: 1.8, marginBottom: '32px' }}>It takes less than 2 minutes to request your no-obligation cash offer. You&apos;ll hear back within 24 hours with a transparent, competitive offer on your Las Vegas area home.</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap', marginBottom: '32px' }}>
            <a href="https://nevadarealestategroup.hifello.com/lp/63ef80d5109ae10018e62028" target="_blank" rel="noopener noreferrer" className="btn-gold" style={{ fontSize: '16px', padding: '16px 40px' }}>Get Your Cash Offer Now</a>
            <a href="tel:+17252399950" style={{ display: 'inline-flex', padding: '15px 28px', border: '2px solid rgba(255,255,255,0.4)', color: 'var(--white)', fontSize: '14px', fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase', borderRadius: '8px', textDecoration: 'none' }}>Call 725.239.9950</a>
          </div>
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.35)' }}>Chris Nevada &middot; S.181401 &middot; Nevada Real Estate Group &middot; LPT Realty<br />8945 W Russell Rd, Suite 170, Las Vegas, NV 89148</p>
        </div>
      </section>

      {/* SCHEMA */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          { '@type': 'Question', name: 'How much will my cash offer be?', acceptedAnswer: { '@type': 'Answer', text: 'Cash offers are typically 85–95% of fair market value, depending on property condition, location, and current market conditions.' } },
          { '@type': 'Question', name: 'How fast can I close with a cash offer?', acceptedAnswer: { '@type': 'Answer', text: 'Cash closings can happen in as few as 7 days from acceptance. Most sellers choose a 14–21 day closing window. The closing date is entirely up to you.' } },
          { '@type': 'Question', name: 'Do I need to make repairs before selling?', acceptedAnswer: { '@type': 'Answer', text: 'No. Cash offers are made on an as-is basis. No repairs, updates, or improvements are required. The property condition is factored into the offer price.' } },
          { '@type': 'Question', name: 'Will I pay real estate commissions on a cash offer?', acceptedAnswer: { '@type': 'Answer', text: 'There are no traditional real estate commissions on the cash offer side. The offer you receive is the amount you take home minus standard closing costs.' } },
          { '@type': 'Question', name: 'Is there any obligation if I request a cash offer?', acceptedAnswer: { '@type': 'Answer', text: 'No. The cash offer is completely free and no-obligation. You can request an offer, review it, and decide whether to accept or decline with zero pressure.' } },
        ],
      }) }} />
    </main>
  )
}
