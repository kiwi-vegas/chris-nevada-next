'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is SHAWOOD construction?",
    "a": "SHAWOOD is Sekisui House's proprietary precision-engineered steel-frame construction system. Panels are manufactured in controlled facilities and assembled on-site with millimeter-level tolerances, resulting in superior structural integrity and fit-and-finish compared to conventional stick-frame construction."
  },
  {
    "q": "What is the price range for homes at SHAWOOD at Arcadia?",
    "a": "Homes at SHAWOOD at Arcadia start from $1.56 million and can exceed $2.5 million or more for the largest estate-style homes on premium view lots."
  },
  {
    "q": "Who is Sekisui House?",
    "a": "Sekisui House is Japan's largest homebuilder and one of the most respected construction companies in the world. SHAWOOD at Arcadia represents their first U.S. residential community, bringing decades of precision engineering expertise to the Las Vegas market."
  },
  {
    "q": "Is SHAWOOD at Arcadia guard-gated?",
    "a": "Yes. SHAWOOD at Arcadia is a guard-gated community within Summerlin with 24-hour security and controlled access. The community is limited to approximately 75 homes."
  },
  {
    "q": "What ZIP code is SHAWOOD at Arcadia in?",
    "a": "SHAWOOD at Arcadia is located in ZIP code 89135 in the Summerlin South area of Las Vegas."
  },
  {
    "q": "What makes SHAWOOD homes different from other luxury homes?",
    "a": "SHAWOOD homes use precision-engineered steel frames with millimeter tolerances (vs. typical construction tolerances of 1/4 inch or more), Japanese 'slow living' design philosophy, integrated smart-home systems, and premium imported fixtures as standard features."
  },
  {
    "q": "What are HOA fees at SHAWOOD at Arcadia?",
    "a": "HOA fees typically range from $400 to $800 per month, covering guard gate staffing, security, community garden maintenance, and the Summerlin master association fee."
  },
  {
    "q": "How many homes will be in SHAWOOD at Arcadia?",
    "a": "SHAWOOD at Arcadia is a small, exclusive community planned for approximately 75 homes at full buildout, making it one of the most limited luxury enclaves in Summerlin."
  }
]

export default function ShawoodAtArcadiaFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About SHAWOOD at Arcadia</h2>
          <p>The questions buyers ask most when exploring SHAWOOD at Arcadia.</p>
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
