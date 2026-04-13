'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range in Ridgebrook?",
    "a": "Homes in Ridgebrook range from approximately $600,000 for production homes to around $900,000 for larger semi-custom homes on premium lots."
  },
  {
    "q": "Is Ridgebrook still building new homes?",
    "a": "Yes — Ridgebrook is an actively developing village with new construction available. Buyers can purchase from builders and customize finishes through design centers."
  },
  {
    "q": "Is Ridgebrook guard-gated?",
    "a": "No — Ridgebrook is not guard-gated. For guard-gated options nearby, The Ridges and Red Rock Country Club are within minutes."
  },
  {
    "q": "What ZIP code is Ridgebrook in?",
    "a": "Ridgebrook is located in ZIP code 89135 in the Summerlin South area of Las Vegas."
  },
  {
    "q": "What schools serve Ridgebrook?",
    "a": "Ridgebrook is served by CCSD schools including Lowman Elementary (8/10), Rogich Middle (10/10), and Palo Verde High School (8/10). Private options including The Meadows School (A+) and Bishop Gorman (A+) are nearby."
  },
  {
    "q": "What are HOA fees in Ridgebrook?",
    "a": "HOA fees in Ridgebrook range from approximately $150 to $300 per month, including the Summerlin master association fee plus the village sub-association fee."
  },
  {
    "q": "How does Ridgebrook compare to The Mesa?",
    "a": "Both are new-construction Summerlin South villages at similar price points. Ridgebrook offers a blend of desert contemporary and transitional styles; The Mesa leans more contemporary. Both deliver modern construction in the premium western Summerlin corridor."
  },
  {
    "q": "When was Ridgebrook established?",
    "a": "Ridgebrook was launched in 2019 and is still actively under development. It is one of the newest villages in the Summerlin South Association."
  },
  {
    "q": "What are the best sub-neighborhoods within Ridgebrook?",
    "a": "The best sub-neighborhood depends on your priorities — school zones, lot size, home age, and proximity to amenities all vary within the community. Nevada Real Estate Group agents who specialize in Ridgebrook can walk you through the specific blocks and streets that match your criteria."
  },
  {
    "q": "How is new construction availability in Ridgebrook?",
    "a": "New construction availability varies by season and builder phase. Some sections of Ridgebrook have active new home sales while others are fully built out with resale-only inventory. Contact Nevada Real Estate Group for the most current new construction options."
  }
]

export default function SummerlinRidgebrookFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Ridgebrook</h2>
          <p>The questions buyers ask most when exploring Ridgebrook.</p>
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
