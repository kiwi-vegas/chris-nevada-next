'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range along the Horizon Ridge corridor?",
    "a": "Homes along the Horizon Ridge corridor range from approximately $400,000 for smaller single-family homes to $800,000 for larger homes on premium lots with mountain views."
  },
  {
    "q": "What ZIP codes are in the Horizon Ridge corridor?",
    "a": "The Horizon Ridge corridor spans ZIP codes 89012 and 89052 in Henderson, Nevada."
  },
  {
    "q": "Is the Horizon Ridge area guard-gated?",
    "a": "The Horizon Ridge corridor itself is not guard-gated. However, it is adjacent to guard-gated communities including Anthem Country Club and MacDonald Highlands for buyers seeking gated options."
  },
  {
    "q": "What schools serve the Horizon Ridge corridor?",
    "a": "The area is served by CCSD schools including John C. Vanderburg Elementary (8/10) and Del E. Webb Middle School (7/10). Henderson International School (A) and Bishop Gorman High School (A+) are top private options."
  },
  {
    "q": "What shopping is near Horizon Ridge?",
    "a": "The District at Green Valley Ranch, Horizon Ridge shopping centers, and multiple grocery stores and restaurants are within minutes. Henderson's retail infrastructure along the corridor is excellent."
  },
  {
    "q": "How far is Horizon Ridge from the Strip?",
    "a": "The Horizon Ridge corridor is approximately 20 minutes from the Las Vegas Strip via I-215 and I-15."
  },
  {
    "q": "What are HOA fees along Horizon Ridge?",
    "a": "HOA fees vary by neighborhood and range from $75 to $200 per month, covering common area maintenance and community amenities."
  },
  {
    "q": "Is the Horizon Ridge corridor a good area for families?",
    "a": "Yes. The Horizon Ridge corridor is one of Henderson's most family-friendly areas with quality schools, multiple parks, sidewalk connectivity, and safe established neighborhoods."
  }
]

export default function HendersonHorizonRidgeFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Horizon Ridge Corridor</h2>
          <p>The questions buyers ask most when exploring Horizon Ridge Corridor.</p>
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
