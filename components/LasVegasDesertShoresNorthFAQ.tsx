'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for homes in Desert Shores North?",
    "a": "Homes in Desert Shores North range from approximately $350,000 for condos and townhomes to $600,000 or more for lakefront single-family homes."
  },
  {
    "q": "Are there real lakes at Desert Shores?",
    "a": "Yes. Desert Shores features four man-made lakes with beaches, walking paths, and non-motorized boating. It is one of the only true waterfront communities in Las Vegas."
  },
  {
    "q": "What ZIP codes cover Desert Shores North?",
    "a": "Desert Shores North spans portions of ZIP codes 89128 and 89117 in the west-central Las Vegas Valley."
  },
  {
    "q": "Can you boat on the Desert Shores lakes?",
    "a": "Non-motorized watercraft such as kayaks and paddleboards are permitted on the lakes. Motorized boats are not allowed. The lakes also support catch-and-release fishing."
  },
  {
    "q": "What are HOA fees in Desert Shores North?",
    "a": "HOA fees range from $100 to $250 per month, covering lake maintenance, beaches, community center, walking paths, and common area upkeep."
  },
  {
    "q": "How far is Desert Shores North from the Strip?",
    "a": "Desert Shores North is approximately 15 minutes from the Las Vegas Strip via Sahara Avenue or US-95."
  },
  {
    "q": "Is Desert Shores North walkable?",
    "a": "Yes. The lakeside walking paths, community center, and neighborhood layout make Desert Shores North one of the most walkable established communities in Las Vegas."
  },
  {
    "q": "What schools serve Desert Shores North?",
    "a": "Desert Shores North is served by CCSD schools including Cimarron-Memorial High School. Private options include The Meadows School (A+) and Faith Lutheran (A)."
  }
]

export default function LasVegasDesertShoresNorthFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Desert Shores North</h2>
          <p>The questions buyers ask most when exploring Desert Shores North.</p>
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
