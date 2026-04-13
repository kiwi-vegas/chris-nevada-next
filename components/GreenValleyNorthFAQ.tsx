'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for homes in Green Valley North?",
    "a": "Homes in Green Valley North range from approximately $400,000 for condos and townhomes to $1.5 million for custom homes along the Legacy Golf Course."
  },
  {
    "q": "Is Green Valley North guard-gated?",
    "a": "No. Green Valley North is an open community, though some individual neighborhoods within it may have gated entries. For guard-gated living in Green Valley, see Legacy at Green Valley or The Fountains."
  },
  {
    "q": "What ZIP codes cover Green Valley North?",
    "a": "Green Valley North spans ZIP codes 89014 and 89074 in Henderson, Nevada."
  },
  {
    "q": "What golf course is in Green Valley North?",
    "a": "The Legacy Golf Course is the primary course in Green Valley North, winding through the community with many homes enjoying direct fairway frontage. It is a public course with membership options."
  },
  {
    "q": "What schools serve Green Valley North?",
    "a": "Green Valley North is served by CCSD schools including Green Valley High School (8/10), Greenspun Junior High (7/10), and C.T. Sewell Elementary (8/10). Private options include Henderson International School and Bishop Gorman."
  },
  {
    "q": "How does Green Valley North compare to Green Valley South?",
    "a": "Green Valley North is the original community with more mature trees, established character, and generally lower prices. Green Valley South includes newer construction, more guard-gated enclaves, and a wider luxury range reaching $3M+."
  },
  {
    "q": "What are HOA fees in Green Valley North?",
    "a": "HOA fees vary widely by sub-community, from approximately $50 per month in single-family neighborhoods to $200 per month in condo and townhome communities with pools and fitness centers."
  },
  {
    "q": "Is Green Valley North a good investment?",
    "a": "Green Valley North benefits from its central Henderson location, mature character, and broad buyer appeal. The community has shown steady appreciation and consistently strong rental demand thanks to its proximity to employment, schools, and amenities."
  },
  {
    "q": "What are the best sub-neighborhoods within Green Valley North?",
    "a": "The best sub-neighborhood depends on your priorities — school zones, lot size, home age, and proximity to amenities all vary within the community. Nevada Real Estate Group agents who specialize in Green Valley North can walk you through the specific blocks and streets that match your criteria."
  },
  {
    "q": "How is new construction availability in Green Valley North?",
    "a": "New construction availability varies by season and builder phase. Some sections of Green Valley North have active new home sales while others are fully built out with resale-only inventory. Contact Nevada Real Estate Group for the most current new construction options."
  }
]

export default function GreenValleyNorthFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Green Valley North</h2>
          <p>The questions buyers ask most when exploring Green Valley North.</p>
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
