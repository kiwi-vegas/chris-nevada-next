'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range in the Green Valley Plaza area?",
    "a": "Homes in the Green Valley Plaza area range from approximately $350,000 for condos and townhomes to $600,000 for larger single-family homes. The most common price range is $400K–$500K."
  },
  {
    "q": "What ZIP codes are in the Green Valley Plaza area?",
    "a": "The Green Valley Plaza area spans ZIP codes 89014 and 89074 in Henderson, Nevada."
  },
  {
    "q": "Is the Green Valley Plaza area part of the original Green Valley?",
    "a": "Yes. The Green Valley Plaza area is part of the original Green Valley master plan developed by American Nevada Corporation beginning in the late 1980s. It represents some of the most established neighborhoods in Henderson."
  },
  {
    "q": "What schools serve the Green Valley Plaza area?",
    "a": "The area is served by CCSD schools including Green Valley High School (7/10) and Bob Miller Middle School (7/10). Henderson International School (A) and Pinecrest Academy (A) are top private options."
  },
  {
    "q": "What shopping is near the Green Valley Plaza area?",
    "a": "Green Valley Plaza, Green Valley Town Center, and multiple retail strips provide walkable shopping, dining, and services. The District at Green Valley Ranch and Galleria at Sunset are both within 10 minutes."
  },
  {
    "q": "What are HOA fees in the Green Valley Plaza area?",
    "a": "HOA fees range from $50 to $150 per month for most neighborhoods. Condo communities may have slightly higher fees. Some standalone homes have no HOA."
  },
  {
    "q": "Is the Green Valley Plaza area a good investment?",
    "a": "Yes. The area's established character, Henderson address, and convenient location support consistent property values. Rental demand is strong due to the central location and proximity to commercial services."
  },
  {
    "q": "How far is the Green Valley Plaza area from the Strip?",
    "a": "The Green Valley Plaza area is approximately 18 minutes from the Las Vegas Strip via I-215 and I-15."
  },
  {
    "q": "What are the best sub-neighborhoods within Green Valley Plaza Area?",
    "a": "The best sub-neighborhood depends on your priorities — school zones, lot size, home age, and proximity to amenities all vary within the community. Nevada Real Estate Group agents who specialize in Green Valley Plaza Area can walk you through the specific blocks and streets that match your criteria."
  },
  {
    "q": "How is new construction availability in Green Valley Plaza Area?",
    "a": "New construction availability varies by season and builder phase. Some sections of Green Valley Plaza Area have active new home sales while others are fully built out with resale-only inventory. Contact Nevada Real Estate Group for the most current new construction options."
  }
]

export default function HendersonGreenValleyPlazaFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Green Valley Plaza Area</h2>
          <p>The questions buyers ask most when exploring Green Valley Plaza Area.</p>
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
