'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the age requirement for Heritage at Stonebridge?",
    "a": "Heritage at Stonebridge is a 55+ community. At least one resident in each home must be 55 years of age or older. No residents under 19 are permitted as permanent residents, per HUD guidelines."
  },
  {
    "q": "What is the price range for homes in Heritage at Stonebridge?",
    "a": "Homes in Heritage at Stonebridge range from approximately $500,000 for the Garden Collection to around $700,000 for premium Signature Collection homes on larger lots."
  },
  {
    "q": "Is Heritage at Stonebridge guard-gated?",
    "a": "Yes. Heritage at Stonebridge is a guard-gated community with a 24-hour staffed gate and private streets within the Stonebridge village of Summerlin."
  },
  {
    "q": "Who builds homes in Heritage at Stonebridge?",
    "a": "All homes in Heritage at Stonebridge are built by Taylor Morrison, a nationally recognized homebuilder. Buyers can personalize finishes through Taylor Morrison's design studio."
  },
  {
    "q": "Does Heritage at Stonebridge have pickleball?",
    "a": "Yes. Heritage at Stonebridge was designed with dedicated pickleball courts from the start, reflecting the sport's popularity among active adults. Courts are located near the private clubhouse."
  },
  {
    "q": "What are HOA fees in Heritage at Stonebridge?",
    "a": "HOA fees typically range from $200 to $400 per month, covering guard gate staffing, clubhouse operations, pool maintenance, landscaping, and the Summerlin master association fee."
  },
  {
    "q": "What ZIP code is Heritage at Stonebridge in?",
    "a": "Heritage at Stonebridge is located in ZIP code 89135 in the Summerlin South area of Las Vegas."
  },
  {
    "q": "How does Heritage compare to Regency at Summerlin?",
    "a": "Both are guard-gated 55+ communities in Summerlin. Heritage at Stonebridge offers newer construction by Taylor Morrison at a slightly lower price point ($500K–$700K), while Regency at Summerlin by Toll Brothers ranges from $500K to $800K+ with larger floor plans."
  }
]

export default function HeritageAtStonebridgeFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Heritage at Stonebridge</h2>
          <p>The questions buyers ask most when exploring Heritage at Stonebridge.</p>
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
