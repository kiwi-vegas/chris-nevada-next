'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for homes at The Loughton?",
    "a": "Homes at The Loughton start from approximately $500,000 and range upward to $700,000 or more for premium Estate Series homes on larger lots."
  },
  {
    "q": "Who builds homes at The Loughton?",
    "a": "The Loughton is built by Christopher Homes, one of Las Vegas' most respected local luxury homebuilders with decades of experience building premium communities in Summerlin and Henderson."
  },
  {
    "q": "Is The Loughton guard-gated?",
    "a": "No. The Loughton is not guard-gated. It is an open-access community within Summerlin that offers luxury construction quality and a boutique feel without guard-gated pricing premiums."
  },
  {
    "q": "What ZIP code is The Loughton in?",
    "a": "The Loughton is located in ZIP code 89138 in the Summerlin area of Las Vegas. Home prices range from $500K+."
  },
  {
    "q": "What are HOA fees at The Loughton?",
    "a": "HOA fees typically range from $150 to $350 per month, covering common area maintenance, landscaping, and the Summerlin master association fee."
  },
  {
    "q": "What makes Christopher Homes different from national builders?",
    "a": "Christopher Homes is a local luxury builder that emphasizes design-forward architecture, premium standard features, and a curated community feel. They build fewer homes with more attention to detail than national production builders."
  },
  {
    "q": "What schools serve The Loughton?",
    "a": "The Loughton is served by CCSD schools including Bonner Elementary (9/10), Sig Rogich Middle School (10/10), and Palo Verde High School (8/10). Private options include The Meadows School (A+) and Bishop Gorman (A+)."
  },
  {
    "q": "How does The Loughton compare to other Summerlin new construction?",
    "a": "The Loughton offers boutique luxury from a local builder at a lower price point than guard-gated communities like Mira Villa ($1M+) or Mesa Ridge ($1M+). It provides similar design quality and attention to detail without the guard-gated premium."
  }
]

export default function TheLoughtonFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About The Loughton</h2>
          <p>The questions buyers ask most when exploring The Loughton.</p>
        </div>
        <div className="faq-list">
          {FAQS.map((faq: any, i: number) => (
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
