'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for homes in Mira Villa?",
    "a": "Homes in Mira Villa range from approximately $1 million for the Signature Collection to $2.2 million or more for Grand Estate Collection homes on premium view lots."
  },
  {
    "q": "Is Mira Villa guard-gated?",
    "a": "Yes. Mira Villa is a guard-gated community with a 24-hour staffed gate and private streets within the Summerlin master plan."
  },
  {
    "q": "Who builds homes in Mira Villa?",
    "a": "Homes in Mira Villa are built by Taylor Morrison (which acquired William Lyon Homes). Taylor Morrison is a nationally recognized luxury homebuilder offering semi-custom options."
  },
  {
    "q": "What ZIP code is Mira Villa in?",
    "a": "Mira Villa is located in ZIP code 89135 in the Summerlin South area of Las Vegas."
  },
  {
    "q": "What are HOA fees in Mira Villa?",
    "a": "HOA fees typically range from $350 to $650 per month, covering guard gate staffing, security patrols, common area maintenance, and the Summerlin master association fee."
  },
  {
    "q": "How does Mira Villa compare to Mesa Ridge?",
    "a": "Both are guard-gated luxury communities in Summerlin. Mira Villa offers newer construction by Taylor Morrison in a similar price range ($1M–$2.2M). Mesa Ridge was built by Toll Brothers at $1M–$3M+ with slightly larger estate options."
  },
  {
    "q": "Do Mira Villa homes have casitas?",
    "a": "Yes. Many Mira Villa floor plans offer optional casitas, providing flexible space for guests, extended family, home offices, or creative studios."
  },
  {
    "q": "What schools serve Mira Villa?",
    "a": "Mira Villa is served by CCSD schools including Bonner Elementary (9/10), Sig Rogich Middle School (10/10), and Palo Verde High School (8/10). Private options include The Meadows School (A+) and Bishop Gorman High School (A+)."
  }
]

export default function MiraVillaFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Mira Villa</h2>
          <p>The questions buyers ask most when exploring Mira Villa.</p>
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
