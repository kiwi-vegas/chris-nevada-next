'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for homes in Calico Ridge?",
    "a": "Homes in Calico Ridge range from approximately $500,000 for established homes in the lower sections to $1.2 million or more for larger custom homes on premium elevated view lots."
  },
  {
    "q": "Is Calico Ridge guard-gated?",
    "a": "No. Calico Ridge is not guard-gated. The community offers foothill views and larger lots at a price point below guard-gated alternatives, with Henderson's excellent public safety services."
  },
  {
    "q": "What ZIP codes is Calico Ridge in?",
    "a": "Calico Ridge spans ZIP codes 89012 and 89052 in Henderson, Nevada."
  },
  {
    "q": "What views do Calico Ridge homes have?",
    "a": "Many homes in Calico Ridge have panoramic views of the Las Vegas Strip, the Henderson Valley, and the surrounding mountain ranges. Upper-elevation lots offer the most dramatic viewsheds."
  },
  {
    "q": "What are HOA fees in Calico Ridge?",
    "a": "HOA fees in Calico Ridge are relatively low, typically ranging from $75 to $200 per month. Fees cover common area maintenance, desert landscaping, and community park upkeep."
  },
  {
    "q": "What schools serve Calico Ridge?",
    "a": "Calico Ridge is served by CCSD schools including Vanderburg Elementary (8/10), Del E. Webb Middle School (7/10), and Coronado High School (6/10). Charter options include Doral Academy (9/10) and Somerset Academy (8/10)."
  },
  {
    "q": "How do Calico Ridge lots compare to newer communities?",
    "a": "Calico Ridge lots are generally larger than those in newer Henderson master-planned communities. Buyers get more outdoor space for pools, landscaping, and outdoor kitchens without the premium lot prices of new construction."
  },
  {
    "q": "Is Calico Ridge a good value compared to guard-gated communities?",
    "a": "Calico Ridge offers foothill views and larger lots similar to guard-gated communities like Roma Hills and Madeira Canyon, but without the guard-gated HOA premium. It is an excellent value for buyers who prioritize views and lot size over gated access."
  }
]

export default function CalicoRidgeFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Calico Ridge</h2>
          <p>The questions buyers ask most when exploring Calico Ridge.</p>
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
