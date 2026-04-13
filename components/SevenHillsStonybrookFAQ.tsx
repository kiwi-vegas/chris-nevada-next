'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for homes in Stonybrook at Seven Hills?",
    "a": "Homes in Stonybrook range from approximately $600,000 for standard floor plans to $1.2 million for premium lots with mountain or Las Vegas Strip views."
  },
  {
    "q": "Is Stonybrook guard-gated?",
    "a": "Stonybrook itself is not guard-gated, though it is part of the Seven Hills master plan which has a guard-gated main entry. Some adjacent neighborhoods within Seven Hills, such as Terracina and the Country Club area, are separately guard-gated."
  },
  {
    "q": "What ZIP code is Stonybrook in?",
    "a": "Stonybrook is located in ZIP code 89052 in Henderson, Nevada, within the Seven Hills master-planned community."
  },
  {
    "q": "What schools serve Stonybrook?",
    "a": "Stonybrook is served by CCSD schools including Jim Thorpe Elementary (8/10), Del E. Webb Middle School, and Coronado High School. Private options include Henderson International School and Bishop Gorman High School."
  },
  {
    "q": "What are HOA fees in Stonybrook?",
    "a": "HOA fees in Stonybrook typically range from $120 to $250 per month, covering the Seven Hills master association fee plus any sub-association fees. Fees cover common area maintenance, parks, trails, and community amenities."
  },
  {
    "q": "What year were homes in Stonybrook built?",
    "a": "Most homes in Stonybrook were built between 2000 and 2005 by American West Homes. The neighborhood features established landscaping and mature trees."
  },
  {
    "q": "What size are homes in Stonybrook?",
    "a": "Homes in Stonybrook range from approximately 2,000 to 4,000 square feet, with most falling in the 2,500 to 3,500 square foot range. All are single-family detached homes."
  },
  {
    "q": "Is Stonybrook a good investment?",
    "a": "Seven Hills communities have historically held their value well in Henderson. Stonybrook's combination of a prestigious Seven Hills address, established character, family-friendly layout, and strong school options supports consistent resale performance."
  }
]

export default function SevenHillsStonybrookFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Stonybrook</h2>
          <p>The questions buyers ask most when exploring Stonybrook.</p>
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
