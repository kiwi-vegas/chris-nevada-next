'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for homes in Anthem?",
    "a": "Anthem spans from approximately $350,000 for single-story homes in Sun City Anthem to over $8 million for custom estates in Anthem Country Club. Family neighborhoods like Highlands and Coventry range from $400K to $900K."
  },
  {
    "q": "Is Anthem guard-gated?",
    "a": "Anthem Country Club and Solera at Anthem are guard-gated. The broader Anthem master plan is not guard-gated but has controlled access points and active HOA management throughout."
  },
  {
    "q": "What ZIP codes is Anthem in?",
    "a": "Anthem spans ZIP codes 89052 and 89044 in Henderson, Nevada."
  },
  {
    "q": "What golf courses are in Anthem?",
    "a": "Anthem Country Club features an 18-hole Hale Irwin-designed championship course. Sun City Anthem has two courses — the Anthem Course and the Revere Golf Club at Anthem."
  },
  {
    "q": "Is there a 55+ community in Anthem?",
    "a": "Yes. Sun City Anthem is one of the premier 55+ communities in America with 7,200+ homes and three recreation centers. Solera at Anthem is a smaller, more intimate 55+ option."
  },
  {
    "q": "What are HOA fees in Anthem?",
    "a": "HOA fees vary significantly by sub-community: $80–$150/mo in family neighborhoods, $180–$350/mo in Sun City Anthem (includes recreation centers), and $350–$800/mo in Anthem Country Club (includes guard gate)."
  },
  {
    "q": "How big is Anthem?",
    "a": "Anthem spans approximately 4,775 acres with over 14,000 homes across multiple sub-communities. It is the largest master-planned community in Henderson and one of the largest in the Las Vegas Valley."
  },
  {
    "q": "What schools serve Anthem?",
    "a": "Anthem is served by CCSD schools including John C. Vanderburg Elementary (8/10), Del E. Webb Middle School (7/10), and Coronado High School (6/10). Private options include Henderson International School and Bishop Gorman."
  }
]

export default function AnthemFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Anthem</h2>
          <p>The questions buyers ask most when exploring Anthem.</p>
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
