'use client'
import { useState } from 'react'

const FAQS = [
  {
    q: 'Is Seven Hills a gated community?',
    a: "Seven Hills has a layered security approach. The overall community is not fully gated, but several of the most desirable neighborhoods within Seven Hills \u2014 including Rio Secco Estates and Country Club Hills \u2014 are guard-gated with staffed entry points. This gives buyers the option of choosing guard-gated privacy or more accessible non-gated neighborhoods, all within the same master plan.",
  },
  {
    q: 'What are HOA fees like in Seven Hills?',
    a: "Seven Hills has a master association fee that typically runs $80\u2013$110 per month, covering common areas, parks, trails, and community maintenance. Guard-gated neighborhoods carry additional sub-association fees of $100\u2013$200+ that cover gate staffing, private streets, and exclusive amenities. Total monthly HOA for non-gated homes is typically $100\u2013$150; guard-gated homes can run $200\u2013$350.",
  },
  {
    q: 'Is the Rio Secco Golf Club part of Seven Hills?',
    a: "Yes \u2014 Rio Secco Golf Club is the private championship course within Seven Hills. Designed by Rees Jones, it\u2019s one of the top-rated private courses in Nevada. The Butch Harmon School of Golf is also located at Rio Secco, making it a destination for serious players. Membership is separate from the HOA and available to homeowners within the community.",
  },
  {
    q: 'How far is Seven Hills from the Las Vegas Strip?',
    a: "Seven Hills is about 10\u201315 miles from the Strip \u2014 roughly 15\u201320 minutes via I-215 and I-15. The I-215 beltway is directly accessible, making commutes to the Strip, the airport, and the rest of the valley straightforward. Harry Reid Airport is about 15 minutes away.",
  },
  {
    q: "What\u2019s the price range for homes in Seven Hills?",
    a: "Seven Hills spans a wide range. Non-gated single-family homes start around $500K\u2013$600K. Guard-gated neighborhoods like Country Club Hills typically start around $700K\u2013$800K. Premium estates near the golf course and the highest elevation lots can reach $1.5M\u2013$3M+. The median across all of Seven Hills sits around $700K.",
  },
  {
    q: 'What makes Seven Hills different from other Henderson luxury communities?',
    a: "The combination of elevation, views, and the Rio Secco Golf Club. Seven Hills is built on rolling terrain with genuine topographic variety \u2014 some of the highest residential elevations in Henderson. The Strip views from the upper neighborhoods are among the best in the valley. And Rio Secco with the Butch Harmon School gives the community a golf pedigree that most private clubs can\u2019t match.",
  },
  {
    q: 'Are there good schools near Seven Hills?',
    a: "Yes \u2014 Seven Hills is served by several well-regarded CCSD schools in the Henderson district, including Vanderburg Elementary and Coronado High School. The area also has strong private and charter school options. As always with CCSD, school assignments are address-specific \u2014 confirm zoning for any property you\u2019re considering.",
  },
]

export default function SevenHillsFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Seven Hills Home Buyer FAQ</h2>
          <p>The questions I hear most from buyers exploring Seven Hills.</p>
        </div>
        <div className="faq-list">
          {FAQS.map((faq, i) => (
            <div key={i} className={`faq-item${open === i ? ' open' : ''}`}>
              <button className="faq-btn" onClick={() => setOpen(open === i ? null : i)}>
                <span className="faq-question">{faq.q}</span>
                <svg className="faq-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 5v14M5 12h14"/>
                </svg>
              </button>
              <div className="faq-answer">{faq.a}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
