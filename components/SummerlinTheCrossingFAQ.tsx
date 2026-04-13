'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range in The Crossing?",
    "a": "Homes in The Crossing range from approximately $400,000 for smaller single-family homes to around $700,000 for larger, updated properties on premium lots."
  },
  {
    "q": "Is The Crossing guard-gated?",
    "a": "No — The Crossing is not guard-gated. Some neighborhoods within the village have gated entry with key-fob or code access, but there is no staffed guard gate."
  },
  {
    "q": "What ZIP code is The Crossing in?",
    "a": "The Crossing is located in ZIP code 89134 in the Summerlin North area of Las Vegas."
  },
  {
    "q": "When was The Crossing built?",
    "a": "The Crossing was developed beginning in 1997. Most homes were built between 1997 and the early 2000s as part of the Summerlin North expansion."
  },
  {
    "q": "What schools serve The Crossing?",
    "a": "The Crossing is served by CCSD schools including Marion B. Earl Elementary (7/10), Mannion Middle (7/10), and Palo Verde High School (8/10). Top private schools including The Meadows School (A+) are nearby."
  },
  {
    "q": "What are HOA fees in The Crossing?",
    "a": "HOA fees in The Crossing are among the most affordable in Summerlin, ranging from approximately $75 to $175 per month. This includes the Summerlin master association fee plus the village sub-association fee."
  },
  {
    "q": "Is The Crossing a good value in Summerlin?",
    "a": "Yes — The Crossing is one of the most affordable villages in Summerlin while still delivering the full Summerlin lifestyle: trail access, community parks, strong schools, and proximity to Downtown Summerlin."
  },
  {
    "q": "How does The Crossing compare to The Arbors?",
    "a": "Both are established Summerlin North villages at accessible price points. The Crossing tends to have slightly lower entry prices. The Arbors is slightly older with more mature landscaping. Both deliver excellent Summerlin value."
  },
  {
    "q": "What are the best sub-neighborhoods within The Crossing?",
    "a": "The best sub-neighborhood depends on your priorities — school zones, lot size, home age, and proximity to amenities all vary within the community. Nevada Real Estate Group agents who specialize in The Crossing can walk you through the specific blocks and streets that match your criteria."
  },
  {
    "q": "How is new construction availability in The Crossing?",
    "a": "New construction availability varies by season and builder phase. Some sections of The Crossing have active new home sales while others are fully built out with resale-only inventory. Contact Nevada Real Estate Group for the most current new construction options."
  }
]

export default function SummerlinTheCrossingFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About The Crossing</h2>
          <p>The questions buyers ask most when exploring The Crossing.</p>
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
