'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range along the Cheyenne Corridor?",
    "a": "Homes along the Cheyenne Corridor range from approximately $350,000 for established 1990s homes to $600,000 for newer or larger residences in premium western sections."
  },
  {
    "q": "What ZIP codes does the Cheyenne Corridor cover?",
    "a": "The Cheyenne Corridor spans portions of ZIP codes 89129, 89131, and 89149 in the northwest Las Vegas Valley."
  },
  {
    "q": "Is the Cheyenne Corridor near Summerlin?",
    "a": "Yes. The western end of the Cheyenne Corridor transitions into the Summerlin area, and residents benefit from proximity to Downtown Summerlin's shopping and dining."
  },
  {
    "q": "What schools serve the Cheyenne Corridor?",
    "a": "The corridor is served by CCSD schools including Cimarron-Memorial High School. Charter options like Doral Academy (9/10) and Somerset Academy (8/10) provide alternatives."
  },
  {
    "q": "How far is the Cheyenne Corridor from the Strip?",
    "a": "The Cheyenne Corridor is approximately 20 minutes from the Las Vegas Strip via US-95 South and I-15."
  },
  {
    "q": "Is the Cheyenne Corridor good for families?",
    "a": "Yes. The corridor offers family-friendly neighborhoods with community parks, school access, and a safe suburban environment. Multiple housing options accommodate growing families."
  },
  {
    "q": "What are HOA fees along the Cheyenne Corridor?",
    "a": "HOA fees range from $25 to $150 per month depending on the specific subdivision and its amenities."
  },
  {
    "q": "Is the Cheyenne Corridor a good investment?",
    "a": "The Cheyenne Corridor offers strong value with moderate pricing, good freeway access, and proximity to established commercial corridors. Consistent demand from families and professionals supports appreciation."
  }
]

export default function LasVegasCheyenneCorridorFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Cheyenne Corridor</h2>
          <p>The questions buyers ask most when exploring Cheyenne Corridor.</p>
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
