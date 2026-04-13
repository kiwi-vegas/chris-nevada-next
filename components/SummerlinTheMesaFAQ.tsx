'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range in The Mesa?",
    "a": "Homes in The Mesa range from approximately $600,000 for production homes to around $1 million for larger semi-custom homes on premium lots."
  },
  {
    "q": "Is The Mesa new construction?",
    "a": "Yes — The Mesa is one of Summerlin South's newest villages, with construction beginning in 2018 and new homes still being built. Buyers can choose from new-build and recent resale options."
  },
  {
    "q": "What builders are in The Mesa?",
    "a": "Active builders in The Mesa include Toll Brothers, Lennar, and Taylor Morrison, offering diverse floor plans with design center options for personalizing finishes."
  },
  {
    "q": "Is The Mesa guard-gated?",
    "a": "No — The Mesa is not guard-gated. For guard-gated options in the same area, The Ridges and Red Rock Country Club are within minutes."
  },
  {
    "q": "What ZIP code is The Mesa in?",
    "a": "The Mesa is located in ZIP code 89135 in the Summerlin South area of Las Vegas."
  },
  {
    "q": "What schools serve The Mesa?",
    "a": "The Mesa is served by CCSD schools including Lowman Elementary (8/10), Rogich Middle (10/10), and Palo Verde High School (8/10). Private options including The Meadows School (A+) and Bishop Gorman (A+) are nearby."
  },
  {
    "q": "What are HOA fees in The Mesa?",
    "a": "HOA fees in The Mesa range from approximately $150 to $300 per month, including the Summerlin master association fee plus the village sub-association fee."
  },
  {
    "q": "How does The Mesa compare to Ridgebrook?",
    "a": "Both are new-construction Summerlin South villages at similar price points. The Mesa tends toward contemporary flat-roof architecture, while Ridgebrook offers a mix of styles. Both deliver modern construction and builder warranties in premium Summerlin South locations."
  },
  {
    "q": "What are the best sub-neighborhoods within The Mesa?",
    "a": "The best sub-neighborhood depends on your priorities — school zones, lot size, home age, and proximity to amenities all vary within the community. Nevada Real Estate Group agents who specialize in The Mesa can walk you through the specific blocks and streets that match your criteria."
  },
  {
    "q": "How is new construction availability in The Mesa?",
    "a": "New construction availability varies by season and builder phase. Some sections of The Mesa have active new home sales while others are fully built out with resale-only inventory. Contact Nevada Real Estate Group for the most current new construction options."
  }
]

export default function SummerlinTheMesaFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About The Mesa</h2>
          <p>The questions buyers ask most when exploring The Mesa.</p>
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
