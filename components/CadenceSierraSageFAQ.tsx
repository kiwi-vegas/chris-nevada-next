'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for homes in Sierra Sage at Cadence?",
    "a": "Homes in Sierra Sage range from approximately $450,000 to $700,000, depending on builder, floor plan, lot position, and selected upgrades."
  },
  {
    "q": "What builders are in Sierra Sage?",
    "a": "Sierra Sage features homes by Toll Brothers and Woodside Homes. Toll Brothers is known for premium finishes and attention to detail; Woodside Homes offers thoughtfully designed, family-oriented floor plans."
  },
  {
    "q": "How does Sierra Sage differ from Village Park?",
    "a": "Sierra Sage is positioned as Cadence's move-up neighborhood with larger floor plans (2,200–4,000 sq ft vs 1,600–3,200), premium builders, and higher standard finishes. Pricing is correspondingly higher than Village Park."
  },
  {
    "q": "Is Sierra Sage part of Cadence?",
    "a": "Yes. Sierra Sage is a neighborhood within the Cadence master-planned community. Residents have full access to all Cadence amenities including Central Park, the Clubhouse, pools, and trails."
  },
  {
    "q": "What ZIP code is Sierra Sage in?",
    "a": "Sierra Sage is in ZIP code 89011 in Henderson, Nevada, within the Cadence master-planned community. Home prices range from $450K–$700K."
  },
  {
    "q": "What are HOA fees in Sierra Sage?",
    "a": "HOA fees typically range from $120 to $220 per month, covering access to all Cadence amenities, parks, pools, the Clubhouse, and common area maintenance."
  },
  {
    "q": "What schools serve Sierra Sage?",
    "a": "Sierra Sage is served by CCSD schools including John C. Vanderburg Elementary (8/10) and Foothill High School. Charter options include Doral Academy (9/10) and Somerset Academy."
  },
  {
    "q": "What size are homes in Sierra Sage?",
    "a": "Floor plans in Sierra Sage range from approximately 2,200 to 4,000 square feet, with most offering 3 to 6 bedrooms, open-concept living areas, and two-car or three-car garages."
  }
]

export default function CadenceSierraSageFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Sierra Sage</h2>
          <p>The questions buyers ask most when exploring Sierra Sage.</p>
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
