'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range in The Trails?",
    "a": "Homes in The Trails range from approximately $500,000 for single-family homes in the village's more accessible neighborhoods to over $2 million for custom estates in the guard-gated Country Rose Estates enclave."
  },
  {
    "q": "Is The Trails guard-gated?",
    "a": "The Trails village as a whole is not guard-gated, but Country Rose Estates — the luxury enclave within The Trails — features a 24-hour staffed guard gate and comprehensive security."
  },
  {
    "q": "What is Country Rose Estates?",
    "a": "Country Rose Estates is a guard-gated neighborhood within The Trails featuring custom estate homes on large lots with mature landscaping. Homes in Country Rose typically feature 4,000 to 7,000+ square feet with prices starting around $800K and exceeding $2M."
  },
  {
    "q": "What ZIP code is The Trails in?",
    "a": "The Trails is located primarily in ZIP codes 89134 and 89144 in the Summerlin North area of Las Vegas."
  },
  {
    "q": "What schools serve The Trails?",
    "a": "The Trails is served by CCSD schools including Bonner Elementary (9/10), Rogich Middle (10/10), and Palo Verde High School (8/10). Private options including The Meadows School (A+) and Bishop Gorman (A+) are nearby."
  },
  {
    "q": "What are HOA fees in The Trails?",
    "a": "HOA fees in The Trails range from approximately $100 to $400 per month depending on the neighborhood. Country Rose Estates has higher fees due to guard-gate staffing and enhanced amenities."
  },
  {
    "q": "What makes The Trails unique in Summerlin?",
    "a": "The Trails is one of Summerlin's most diverse villages, spanning entry-level to luxury in a single community. Its namesake trail system connects neighborhoods to parks and the broader Summerlin network, and Country Rose Estates offers guard-gated luxury within an accessible village."
  },
  {
    "q": "When was The Trails built?",
    "a": "The Trails was developed beginning in 1995, with homes built through the 2000s. Country Rose Estates features custom homes built across multiple decades."
  }
]

export default function SummerlinTheTrailsFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About The Trails</h2>
          <p>The questions buyers ask most when exploring The Trails.</p>
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
