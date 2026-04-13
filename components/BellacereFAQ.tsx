'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for homes in Bellacere?",
    "a": "Homes in Bellacere range from approximately $1.5 million for semi-custom homes to over $5 million for premium custom estates on elevated lots with panoramic mountain views."
  },
  {
    "q": "Is Bellacere guard-gated?",
    "a": "Yes. Bellacere is a fully guard-gated community with a 24-hour staffed guard gate. With only approximately 120 homes across 85 acres, it is one of the most exclusive enclaves in Summerlin."
  },
  {
    "q": "What village is Bellacere in?",
    "a": "Bellacere is located within The Canyons village of the Summerlin North Association. The Canyons is known for its concentration of guard-gated luxury communities."
  },
  {
    "q": "What ZIP code is Bellacere in?",
    "a": "Bellacere is located in ZIP code 89144 in the Summerlin North area of Las Vegas."
  },
  {
    "q": "How does Bellacere compare to The Ridges?",
    "a": "Both are guard-gated luxury communities in Summerlin. The Ridges offers prices from $2M to $20M+ with Bear's Best golf. Bellacere is more intimate (~120 homes vs. 800+) with a slightly lower entry point at $1.5M, but comparable quality at the top end."
  },
  {
    "q": "What are HOA fees in Bellacere?",
    "a": "HOA fees in Bellacere typically range from $500 to $1,000 per month, covering the Summerlin master association fee plus the Bellacere sub-association fee for guard gate staffing, security patrols, and community maintenance."
  },
  {
    "q": "How large are homes in Bellacere?",
    "a": "Custom and semi-custom estates in Bellacere range from approximately 4,000 to over 10,000 square feet, with 4–7 bedrooms, gourmet kitchens, wine rooms, home theaters, and resort-style outdoor living."
  },
  {
    "q": "What schools serve Bellacere?",
    "a": "Bellacere is zoned for CCSD schools including Sig Rogich Middle School (10/10 GreatSchools) and Palo Verde High School (8/10). Private options include The Meadows School (A+) and Bishop Gorman High School (A+)."
  }
]

export default function BellacereFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Bellacere</h2>
          <p>The questions buyers ask most when exploring Bellacere.</p>
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
