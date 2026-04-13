'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range at Turnberry Place?",
    "a": "Residences range from approximately $500,000 for one- and two-bedroom units to well over $5 million for expansive penthouses and combined units with panoramic views."
  },
  {
    "q": "How many towers are at Turnberry Place?",
    "a": "Turnberry Place consists of four 36-story towers containing approximately 720 total residences. The towers were completed in phases between 2001 and 2006."
  },
  {
    "q": "How large are the units at Turnberry Place?",
    "a": "Floor plans at Turnberry Place are among the most spacious in any Las Vegas high-rise. Two-bedroom units typically exceed 2,000 square feet, and penthouses can surpass 5,000 square feet. All units include private balconies."
  },
  {
    "q": "What amenities does Turnberry Place offer?",
    "a": "The 16-acre campus includes a 3-acre pool complex with waterfalls and cabanas, championship tennis courts, a 10,000 sq ft fitness center, full-service spa, putting green, dog parks, 24-hour concierge, valet parking, and private wine storage."
  },
  {
    "q": "What is the difference between Turnberry Place and Turnberry Towers?",
    "a": "Both were developed by Turnberry Associates. Turnberry Place (2001-2006) is a four-tower complex on Paradise Road with 720 units and a 16-acre resort campus. Turnberry Towers (2007-2008) is a twin-tower complex on Karen Avenue with 636 units. Both are luxury communities with distinct characters."
  },
  {
    "q": "Is Turnberry Place gated?",
    "a": "Yes. Turnberry Place is a gated community with 24-hour security, concierge services, valet parking, and controlled building access."
  },
  {
    "q": "What are HOA fees at Turnberry Place?",
    "a": "HOA fees typically range from $500 to $2,500 per month depending on unit size and tower. Fees cover building maintenance, the 16-acre resort campus, pool complex, spa, fitness center, concierge, security, and all common area operations."
  },
  {
    "q": "Can you rent out a unit at Turnberry Place?",
    "a": "Yes. Turnberry Place allows rentals. The spacious floor plans, resort amenities, and Strip-adjacent location make it one of the stronger rental performers among Las Vegas luxury high-rises."
  }
]

export default function TurnberryPlaceFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Turnberry Place</h2>
          <p>The questions buyers ask most when exploring Turnberry Place.</p>
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
