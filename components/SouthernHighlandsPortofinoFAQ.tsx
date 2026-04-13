'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for homes in Portofino at Southern Highlands?",
    "a": "Homes in Portofino range from approximately $600,000 for entry-level homes within the enclave to $1.5 million for premium estate-sized homes on view lots."
  },
  {
    "q": "Is Portofino guard-gated?",
    "a": "Yes — Portofino is double guard-gated. Residents pass through the Southern Highlands community guard gate and then a second Portofino-specific gate. Both are staffed 24 hours."
  },
  {
    "q": "What is the architectural style in Portofino?",
    "a": "Portofino features Mediterranean and Tuscan-inspired architecture with stucco exteriors, clay tile roofs, arched entryways, wrought-iron accents, and lush landscaping. The streetscapes are designed to evoke an Italian village character."
  },
  {
    "q": "What ZIP code is Portofino in?",
    "a": "Portofino at Southern Highlands is located in ZIP code 89141 in southwest Las Vegas."
  },
  {
    "q": "What are HOA fees in Portofino?",
    "a": "HOA fees typically range from $250 to $550 per month, covering the Southern Highlands master association fee plus the Portofino sub-association fee. Fees include guard gate staffing, security, common area maintenance, and landscaping."
  },
  {
    "q": "How does Portofino compare to Tuscan Cliffs?",
    "a": "Both are guard-gated enclaves within Southern Highlands. Tuscan Cliffs features more dramatic hillside lots and higher price points ($800K–$3M), while Portofino offers a more accessible entry point ($600K–$1.5M) with a warm Mediterranean village atmosphere and mature landscaping."
  },
  {
    "q": "Is golf membership required in Portofino?",
    "a": "No. Golf club membership at the Southern Highlands Golf Club is optional and available by application. Many Portofino residents enjoy the club's dining, fitness, and social amenities without being golfers."
  },
  {
    "q": "What schools serve Portofino?",
    "a": "Portofino is served by CCSD schools including John R. Hummel Elementary (8/10) and Del E. Webb Middle School (7/10). Bishop Gorman High School (A+) is the top private option in the area."
  }
]

export default function SouthernHighlandsPortofinoFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Portofino at Southern Highlands</h2>
          <p>The questions buyers ask most when exploring Portofino at Southern Highlands.</p>
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
