'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for homes in The Vineyards?",
    "a": "Homes in The Vineyards range from approximately $900,000 for semi-custom homes to over $3 million for premium custom estates on elevated lots with panoramic mountain views."
  },
  {
    "q": "Is The Vineyards guard-gated?",
    "a": "Yes. The Vineyards is a guard-gated community with a 24-hour staffed guard gate. It is the only guard-gated enclave within The Vistas village of Summerlin North."
  },
  {
    "q": "What village is The Vineyards in?",
    "a": "The Vineyards is located within The Vistas village of the Summerlin North Association. It is the village's premier and only guard-gated community."
  },
  {
    "q": "What ZIP code is The Vineyards in?",
    "a": "The Vineyards is located in ZIP code 89134 in the Summerlin North area of Las Vegas."
  },
  {
    "q": "What are HOA fees in The Vineyards?",
    "a": "HOA fees typically range from $350 to $850 per month, covering the Summerlin master association fee plus The Vineyards sub-association fee for guard gate staffing, security patrols, and community maintenance."
  },
  {
    "q": "What schools serve The Vineyards?",
    "a": "The Vineyards is zoned for top CCSD schools including Sig Rogich Middle School (10/10 GreatSchools) and Palo Verde High School (8/10). The Meadows School (A+) and Bishop Gorman (A+) are nearby."
  },
  {
    "q": "How does The Vineyards compare to Mountain Trails?",
    "a": "Both are guard-gated luxury communities in Summerlin North with similar price ranges. Mountain Trails is in The Hills village with multi-directional views. The Vineyards is in The Vistas village. Both offer established character and strong long-term value."
  },
  {
    "q": "How large are homes in The Vineyards?",
    "a": "Custom and semi-custom homes range from 3,200 to over 7,000 square feet, with 3–6 bedrooms, gourmet kitchens, wine cellars, home theaters, and resort-style outdoor living areas."
  }
]

export default function TheVineyardsSummerlinFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About The Vineyards</h2>
          <p>The questions buyers ask most when exploring The Vineyards.</p>
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
