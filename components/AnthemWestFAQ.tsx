'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for homes in Anthem West?",
    "a": "Homes in Anthem West range from approximately $450,000 for townhomes and smaller homes to $800,000 or more for premium single-family homes with mountain views and upgraded finishes."
  },
  {
    "q": "Is Anthem West guard-gated?",
    "a": "No. Anthem West is not guard-gated. It is the non-gated family section of the Anthem master plan. For guard-gated Anthem living, see Anthem Country Club and Anthem Highlands."
  },
  {
    "q": "What ZIP code is Anthem West in?",
    "a": "Anthem West is located in ZIP code 89052 in Henderson."
  },
  {
    "q": "What amenities does Anthem West have?",
    "a": "Anthem West residents enjoy community pools, parks, walking trails, the Anthem Community Center, and the Anthem Hills trail system. All standard Anthem master-plan amenities are included."
  },
  {
    "q": "What are HOA fees in Anthem West?",
    "a": "HOA fees typically range from $70 to $200 per month, depending on the specific neighborhood and its amenities. This covers the Anthem master association plus any sub-association fees."
  },
  {
    "q": "What schools serve Anthem West?",
    "a": "Anthem West is zoned for above-average CCSD schools including Fremont Elementary (8/10) and Coronado High School (7/10). Charter options include Pinecrest Academy and Somerset Academy."
  },
  {
    "q": "Is there a 55+ community in Anthem West?",
    "a": "Yes. Solera at Anthem is a Del Webb age-restricted (55+) community within Anthem West featuring a clubhouse, fitness center, pools, and active lifestyle programming."
  },
  {
    "q": "How does Anthem West compare to Anthem Country Club?",
    "a": "Anthem West offers Anthem's lifestyle and reputation at 30–50% below Anthem Country Club prices. The tradeoff is no guard gate and no golf course access, but the location, schools, and community amenities are shared."
  },
  {
    "q": "What are the best sub-neighborhoods within Anthem West?",
    "a": "The best sub-neighborhood depends on your priorities — school zones, lot size, home age, and proximity to amenities all vary within the community. Nevada Real Estate Group agents who specialize in Anthem West can walk you through the specific blocks and streets that match your criteria."
  },
  {
    "q": "How is new construction availability in Anthem West?",
    "a": "New construction availability varies by season and builder phase. Some sections of Anthem West have active new home sales while others are fully built out with resale-only inventory. Contact Nevada Real Estate Group for the most current new construction options."
  }
]

export default function AnthemWestFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Anthem West</h2>
          <p>The questions buyers ask most when exploring Anthem West.</p>
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
