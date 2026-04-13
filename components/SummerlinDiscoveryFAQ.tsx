'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range in Discovery?",
    "a": "Homes in Discovery range from approximately $450,000 for smaller production homes and townhomes to around $750,000 for larger floor plans on premium lots."
  },
  {
    "q": "Is Discovery new construction?",
    "a": "Yes — Discovery is one of Summerlin North's newest villages, with construction beginning in 2016 and new homes still being built. Buyers can choose from both new-build and recent resale options."
  },
  {
    "q": "What builders are in Discovery?",
    "a": "Builders active in Discovery include Toll Brothers, Lennar, Pulte, and KB Home. Each offers multiple floor plans with design center options for personalizing finishes."
  },
  {
    "q": "Is Discovery guard-gated?",
    "a": "No — Discovery is not guard-gated. Some neighborhoods within the village have gated entry with key-fob or code access, but there is no staffed guard gate."
  },
  {
    "q": "What ZIP code is Discovery in?",
    "a": "Discovery is located primarily in ZIP codes 89134 and 89138 in the Summerlin North area of Las Vegas."
  },
  {
    "q": "What schools serve Discovery?",
    "a": "Discovery is served by CCSD schools including Kesterson Elementary (8/10), Rogich Middle (10/10), and Palo Verde High School (8/10). Top private schools including The Meadows School are nearby."
  },
  {
    "q": "What are HOA fees in Discovery?",
    "a": "HOA fees in Discovery range from approximately $100 to $225 per month, which includes the Summerlin master association fee plus the village sub-association fee."
  },
  {
    "q": "How does Discovery compare to The Crossing?",
    "a": "Discovery offers modern new construction with current floor plans and energy efficiency, while The Crossing offers established neighborhoods at slightly lower price points. Discovery appeals to buyers who prioritize new construction; The Crossing appeals to buyers who value mature neighborhoods."
  },
  {
    "q": "What are the best sub-neighborhoods within Discovery?",
    "a": "The best sub-neighborhood depends on your priorities — school zones, lot size, home age, and proximity to amenities all vary within the community. Nevada Real Estate Group agents who specialize in Discovery can walk you through the specific blocks and streets that match your criteria."
  },
  {
    "q": "How is new construction availability in Discovery?",
    "a": "New construction availability varies by season and builder phase. Some sections of Discovery have active new home sales while others are fully built out with resale-only inventory. Contact Nevada Real Estate Group for the most current new construction options."
  }
]

export default function SummerlinDiscoveryFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Discovery</h2>
          <p>The questions buyers ask most when exploring Discovery.</p>
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
