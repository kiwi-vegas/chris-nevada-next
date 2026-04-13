'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for homes in Anthem Coventry?",
    "a": "Homes in Anthem Coventry range from approximately $500,000 for well-maintained resale homes to $900,000 for larger updated properties on premium lots with mountain views."
  },
  {
    "q": "Is Anthem Coventry guard-gated?",
    "a": "No. Anthem Coventry is not guard-gated, though it benefits from the managed access points and security patrols of the broader Anthem master-planned community. For guard-gated living within Anthem, see Anthem Country Club."
  },
  {
    "q": "What ZIP code is Anthem Coventry in?",
    "a": "Anthem Coventry is located in ZIP code 89052 in Henderson, Nevada."
  },
  {
    "q": "What schools serve Anthem Coventry?",
    "a": "Anthem Coventry is zoned for top-rated CCSD schools including John C. Vanderburg Elementary (9/10), Del E. Webb Middle School (8/10), and Coronado High School (8/10). Private options include Henderson International School and Bishop Gorman High School."
  },
  {
    "q": "What amenities does Anthem Coventry have?",
    "a": "Anthem Coventry residents have full access to the Anthem Center, which includes resort-style pools, a fitness center, tennis and basketball courts, a splash pad, and community gathering spaces. The neighborhood also features parks and connected walking trails."
  },
  {
    "q": "How does Anthem Coventry compare to Anthem Highlands?",
    "a": "Both are family-oriented neighborhoods within the Anthem master plan. Coventry was built slightly earlier and has more mature landscaping. Highlands tends to have slightly newer construction. Both share access to Anthem Center amenities and top-rated schools."
  },
  {
    "q": "What are HOA fees in Anthem Coventry?",
    "a": "HOA fees in Anthem Coventry typically range from $80 to $180 per month, covering the Anthem master association fee. Fees fund community amenities including the Anthem Center, trail maintenance, common area landscaping, and security patrols."
  },
  {
    "q": "Is Anthem Coventry a good investment?",
    "a": "Anthem Coventry has a strong track record of appreciation thanks to its Anthem address, top-rated schools, and Henderson location. The neighborhood attracts consistent buyer demand from families and professionals, supporting stable long-term values."
  }
]

export default function AnthemCoventryFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Anthem Coventry</h2>
          <p>The questions buyers ask most when exploring Anthem Coventry.</p>
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
