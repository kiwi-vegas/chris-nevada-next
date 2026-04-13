'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range in The Pueblo?",
    "a": "Homes in The Pueblo range from approximately $400,000 for smaller homes and attached products to around $650,000 for larger, updated properties on premium lots."
  },
  {
    "q": "Is The Pueblo guard-gated?",
    "a": "No — The Pueblo is not guard-gated. Some neighborhoods have gated entry with key-fob or code access, but there is no staffed guard gate."
  },
  {
    "q": "What ZIP code is The Pueblo in?",
    "a": "The Pueblo is located in ZIP code 89135 in the Summerlin South area of Las Vegas."
  },
  {
    "q": "When was The Pueblo built?",
    "a": "The Pueblo was developed beginning in 2000. Most homes were built between 2000 and the mid-2000s as part of the Summerlin South expansion."
  },
  {
    "q": "What schools serve The Pueblo?",
    "a": "The Pueblo is served by CCSD schools including Lowman Elementary (8/10), Rogich Middle (10/10), and Palo Verde High School (8/10). Private options including The Meadows School (A+) are nearby."
  },
  {
    "q": "What are HOA fees in The Pueblo?",
    "a": "HOA fees in The Pueblo are among the most affordable in Summerlin South, ranging from approximately $75 to $175 per month."
  },
  {
    "q": "Is The Pueblo a good first home in Summerlin?",
    "a": "Yes — The Pueblo is one of the most affordable villages in Summerlin South, making it an excellent choice for first-time buyers who want the Summerlin address, schools, and lifestyle at the most accessible price point."
  },
  {
    "q": "How does The Pueblo compare to The Gardens?",
    "a": "Both are established Summerlin South villages at accessible price points. The Pueblo has slightly lower entry pricing, while The Gardens emphasizes park-centered design. Both deliver excellent value within the Summerlin South Association."
  },
  {
    "q": "What are the best sub-neighborhoods within The Pueblo?",
    "a": "The best sub-neighborhood depends on your priorities — school zones, lot size, home age, and proximity to amenities all vary within the community. Nevada Real Estate Group agents who specialize in The Pueblo can walk you through the specific blocks and streets that match your criteria."
  },
  {
    "q": "How is new construction availability in The Pueblo?",
    "a": "New construction availability varies by season and builder phase. Some sections of The Pueblo have active new home sales while others are fully built out with resale-only inventory. Contact Nevada Real Estate Group for the most current new construction options."
  }
]

export default function SummerlinThePuebloFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About The Pueblo</h2>
          <p>The questions buyers ask most when exploring The Pueblo.</p>
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
