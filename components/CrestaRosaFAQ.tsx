'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for homes in Cresta Rosa?",
    "a": "Homes in Cresta Rosa are priced from approximately $2.83 million to $3.95 million. All homes are new construction by Taylor Morrison with desert-contemporary architecture."
  },
  {
    "q": "Is Cresta Rosa guard-gated?",
    "a": "Cresta Rosa itself is not separately guard-gated, but it is located within the MacDonald Highlands community which has controlled access and security infrastructure. The broader MacDonald Highlands community provides the security framework."
  },
  {
    "q": "Who builds homes in Cresta Rosa?",
    "a": "Taylor Morrison is the exclusive builder in Cresta Rosa. Floor plans range from approximately 4,000 to 6,500+ square feet with desert-contemporary architecture and designer-curated finishes."
  },
  {
    "q": "What is MacDonald Highlands?",
    "a": "MacDonald Highlands is one of Henderson's most prestigious luxury communities, anchored by DragonRidge Country Club. Cresta Rosa is a new-construction neighborhood within MacDonald Highlands."
  },
  {
    "q": "Is DragonRidge Country Club membership included?",
    "a": "DragonRidge Country Club membership is available but not required for Cresta Rosa homeownership. The club offers championship golf, tennis, fitness, spa, and dining facilities."
  },
  {
    "q": "What ZIP code is Cresta Rosa in?",
    "a": "Cresta Rosa is located in ZIP code 89012 in Henderson, Nevada, within the MacDonald Highlands community."
  },
  {
    "q": "What views do Cresta Rosa homes have?",
    "a": "Cresta Rosa offers elevated views of the Las Vegas Strip skyline, the Las Vegas Valley, and the McCullough Range. The night views of the Strip are particularly dramatic from the higher elevation lots."
  },
  {
    "q": "How does Cresta Rosa compare to Ascaya?",
    "a": "Ascaya ($3M–$20M+) offers fully custom builds on engineered lots. Cresta Rosa ($2.83M–$3.95M) delivers turnkey luxury from Taylor Morrison without the custom build timeline. Both offer dramatic views in the Henderson foothills."
  }
]

export default function CrestaRosaFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Cresta Rosa</h2>
          <p>The questions buyers ask most when exploring Cresta Rosa.</p>
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
