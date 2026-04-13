'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for homes in The Lakes South?",
    "a": "Homes in The Lakes South range from approximately $350,000 for townhomes to $600,000 or more for larger single-family homes with lake views."
  },
  {
    "q": "Are there actual lakes in The Lakes?",
    "a": "Yes. The Lakes community features man-made lakes that serve as the centerpiece of the development. Walking trails and green space surround the water features."
  },
  {
    "q": "What ZIP codes cover The Lakes South?",
    "a": "The Lakes South primarily spans portions of ZIP codes 89117 and 89147 in the west-central Las Vegas Valley."
  },
  {
    "q": "Can you swim or boat in The Lakes?",
    "a": "The lakes are ornamental and designed for aesthetic purposes, walking, and wildlife. Swimming and boating are not permitted. Community pools are available for residents."
  },
  {
    "q": "What are HOA fees in The Lakes South?",
    "a": "HOA fees typically range from $75 to $200 per month, covering lake maintenance, common area upkeep, walking trails, and community amenities."
  },
  {
    "q": "How far is The Lakes South from the Strip?",
    "a": "The Lakes South is approximately 12 minutes from the Las Vegas Strip via Sahara Avenue heading east."
  },
  {
    "q": "Is The Lakes South a good investment?",
    "a": "The Lakes South offers a unique waterfront lifestyle at accessible prices, which supports consistent demand and appreciation. The mature community and central location add investment appeal."
  },
  {
    "q": "What schools serve The Lakes South?",
    "a": "The Lakes South is served by CCSD schools including Red Rock Elementary (7/10). Top private options include The Meadows School (A+) and Bishop Gorman (A+)."
  }
]

export default function LasVegasTheLakesSouthFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About The Lakes South</h2>
          <p>The questions buyers ask most when exploring The Lakes South.</p>
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
