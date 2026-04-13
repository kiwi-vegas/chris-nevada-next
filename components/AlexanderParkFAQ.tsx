'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for homes in Alexander Park?",
    "a": "New homes in Alexander Park range from approximately $350,000 for entry-level floor plans to $550,000 for larger premium homes. Most buyers purchase in the $375K to $475K range."
  },
  {
    "q": "Is Alexander Park still selling new homes?",
    "a": "Yes — Alexander Park has active new-home sales from multiple national builders including Lennar, KB Home, and Century Communities. Both build-to-order and quick move-in options are available."
  },
  {
    "q": "Is Alexander Park in Las Vegas or North Las Vegas?",
    "a": "Alexander Park is located in North Las Vegas, a separately incorporated city in the northern Las Vegas Valley."
  },
  {
    "q": "What ZIP codes are in Alexander Park?",
    "a": "Alexander Park spans ZIP codes 89032 and 89086 in North Las Vegas."
  },
  {
    "q": "What are HOA fees in Alexander Park?",
    "a": "HOA fees are affordable, typically $60 to $150 per month, covering common area maintenance, parks, and community landscaping."
  },
  {
    "q": "Is Alexander Park a good first-time buyer community?",
    "a": "Alexander Park is one of the best choices for first-time buyers in the Las Vegas metro. Brand-new construction at price points in the $350K range, with builder warranties and energy-efficient systems, is extremely compelling for buyers entering the market."
  },
  {
    "q": "What schools serve Alexander Park?",
    "a": "Alexander Park is served by CCSD schools. Charter options including Somerset Academy NLV (8/10) and Doral Academy (9/10) provide higher-rated alternatives. Bishop Gorman (A+) is the top private option."
  },
  {
    "q": "How does Alexander Park compare to Aliante?",
    "a": "Alexander Park offers newer construction at comparable pricing. Aliante offers a more mature master-planned community with golf, casino, and nature park amenities. Both are strong North Las Vegas options — Alexander Park for new construction, Aliante for established community character."
  }
]

export default function AlexanderParkFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Alexander Park</h2>
          <p>The questions buyers ask most when exploring Alexander Park.</p>
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
