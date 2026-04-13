'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range in The Willows?",
    "a": "Homes in The Willows range from approximately $450,000 for smaller homes and attached products to around $750,000 for larger, updated properties on premium lots."
  },
  {
    "q": "Is The Willows guard-gated?",
    "a": "No — The Willows is not guard-gated. Some neighborhoods within the village have gated entry with key-fob or code access, but there is no staffed guard gate."
  },
  {
    "q": "What ZIP code is The Willows in?",
    "a": "The Willows is located in ZIP code 89134 in the Summerlin North area of Las Vegas. Home prices range from $450K–$750K."
  },
  {
    "q": "When was The Willows built?",
    "a": "The Willows was developed beginning in 1998. Most homes were built between 1998 and the mid-2000s as part of the Summerlin North expansion."
  },
  {
    "q": "What schools serve The Willows?",
    "a": "The Willows is served by CCSD schools including Jydstrup Elementary (7/10), Mannion Middle (7/10), and Palo Verde High School (8/10). Top private schools including The Meadows School (A+) are nearby."
  },
  {
    "q": "What are HOA fees in The Willows?",
    "a": "HOA fees in The Willows range from approximately $75 to $200 per month, including the Summerlin master association fee plus the village sub-association fee."
  },
  {
    "q": "Is The Willows good for families?",
    "a": "Yes — The Willows is one of the most family-oriented villages in Summerlin. Community parks, playgrounds, mature tree-lined streets, and strong school zoning make it a top choice for families with children."
  },
  {
    "q": "How does The Willows compare to The Arbors?",
    "a": "Both are established Summerlin North villages at similar price points. The Arbors is slightly older with more mature trees. The Willows was built a few years later and has a slightly newer feel. Both offer excellent Summerlin value for families."
  },
  {
    "q": "What are the best sub-neighborhoods within The Willows?",
    "a": "The best sub-neighborhood depends on your priorities — school zones, lot size, home age, and proximity to amenities all vary within the community. Nevada Real Estate Group agents who specialize in The Willows can walk you through the specific blocks and streets that match your criteria."
  },
  {
    "q": "How is new construction availability in The Willows?",
    "a": "New construction availability varies by season and builder phase. Some sections of The Willows have active new home sales while others are fully built out with resale-only inventory. Contact Nevada Real Estate Group for the most current new construction options."
  }
]

export default function SummerlinTheWillowsFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About The Willows</h2>
          <p>The questions buyers ask most when exploring The Willows.</p>
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
