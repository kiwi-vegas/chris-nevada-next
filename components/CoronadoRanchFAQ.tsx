'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for homes in Coronado Ranch?",
    "a": "Homes in Coronado Ranch typically range from approximately $400,000 for smaller single-story homes to $650,000 for larger estate-style homes with upgrades. The median sale price hovers around $475,000."
  },
  {
    "q": "Is Coronado Ranch guard-gated?",
    "a": "No. Coronado Ranch is an open-access community without a guard gate. The community relies on Henderson's excellent public safety services and low neighborhood crime rates."
  },
  {
    "q": "What ZIP code is Coronado Ranch in?",
    "a": "Coronado Ranch is located in ZIP code 89052 in Henderson, Nevada. Home prices range from $400K–$650K."
  },
  {
    "q": "What are HOA fees in Coronado Ranch?",
    "a": "HOA fees in Coronado Ranch are among the lowest in Henderson, typically ranging from $50 to $150 per month. Fees cover common area maintenance and community park upkeep."
  },
  {
    "q": "What schools serve Coronado Ranch?",
    "a": "Coronado Ranch is served by CCSD schools including Vanderburg Elementary (8/10), Del E. Webb Middle School (7/10), and Coronado High School (6/10). Charter options include Doral Academy (9/10) and Somerset Academy (8/10)."
  },
  {
    "q": "Is Coronado Ranch a good investment?",
    "a": "Coronado Ranch offers strong investment fundamentals: Henderson location, low HOA fees, consistent rental demand, and price points that attract a broad pool of buyers. Henderson's growth and safety reputation support long-term value."
  },
  {
    "q": "How old are homes in Coronado Ranch?",
    "a": "Most homes in Coronado Ranch were built between 2000 and 2006 during Henderson's primary growth period. The construction quality is solid, and many homes have been updated by their owners."
  },
  {
    "q": "What is near Coronado Ranch?",
    "a": "Coronado Ranch is near Cornerstone Park, the Henderson Pavilion, Galleria at Sunset mall, and the I-215 Beltway for easy access to the Strip, airport, and the broader valley."
  },
  {
    "q": "What are the best sub-neighborhoods within Coronado Ranch?",
    "a": "The best sub-neighborhood depends on your priorities — school zones, lot size, home age, and proximity to amenities all vary within the community. Nevada Real Estate Group agents who specialize in Coronado Ranch can walk you through the specific blocks and streets that match your criteria."
  },
  {
    "q": "How is new construction availability in Coronado Ranch?",
    "a": "New construction availability varies by season and builder phase. Some sections of Coronado Ranch have active new home sales while others are fully built out with resale-only inventory. Contact Nevada Real Estate Group for the most current new construction options."
  }
]

export default function CoronadoRanchFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Coronado Ranch</h2>
          <p>The questions buyers ask most when exploring Coronado Ranch.</p>
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
