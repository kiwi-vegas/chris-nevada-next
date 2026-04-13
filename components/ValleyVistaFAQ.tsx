'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for homes in Valley Vista?",
    "a": "Homes in Valley Vista range from approximately $350,000 for compact single-story starter homes to $550,000 for larger two-story family homes with premium features."
  },
  {
    "q": "Is Valley Vista still building new homes?",
    "a": "Yes. Valley Vista is actively developing with national builders delivering new construction across ongoing phases. Model homes are available for touring."
  },
  {
    "q": "What builders are in Valley Vista?",
    "a": "National builders in Valley Vista include Lennar, KB Home, and Century Communities, offering a range of floor plans and price points."
  },
  {
    "q": "What ZIP code is Valley Vista in?",
    "a": "Valley Vista is located in ZIP code 89086 in North Las Vegas, Nevada."
  },
  {
    "q": "Is Valley Vista guard-gated?",
    "a": "No. Valley Vista is not guard-gated. It is an open new-construction community with HOA governance and developing community amenities."
  },
  {
    "q": "What are HOA fees in Valley Vista?",
    "a": "HOA fees in Valley Vista typically range from $50 to $130 per month, covering community parks, common area maintenance, and community governance."
  },
  {
    "q": "Is Valley Vista good for first-time buyers?",
    "a": "Yes. Valley Vista is one of the best new-construction options for first-time buyers in the Las Vegas metro due to its accessible price points, builder incentives, and modern construction."
  },
  {
    "q": "How far is Valley Vista from the Strip?",
    "a": "Valley Vista is approximately 25 minutes from the Las Vegas Strip via I-15 South. Downtown Las Vegas is approximately 15 minutes away."
  },
  {
    "q": "What are the best sub-neighborhoods within Valley Vista?",
    "a": "The best sub-neighborhood depends on your priorities — school zones, lot size, home age, and proximity to amenities all vary within the community. Nevada Real Estate Group agents who specialize in Valley Vista can walk you through the specific blocks and streets that match your criteria."
  },
  {
    "q": "How is new construction availability in Valley Vista?",
    "a": "New construction availability varies by season and builder phase. Some sections of Valley Vista have active new home sales while others are fully built out with resale-only inventory. Contact Nevada Real Estate Group for the most current new construction options."
  }
]

export default function ValleyVistaFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Valley Vista</h2>
          <p>The questions buyers ask most when exploring Valley Vista.</p>
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
