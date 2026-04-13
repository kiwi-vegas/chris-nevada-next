'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for homes along Tropical Parkway?",
    "a": "Homes along the Tropical Parkway corridor range from approximately $300,000 for townhomes and smaller single-family homes to $500,000 for larger newer-construction single-family homes."
  },
  {
    "q": "Is the Tropical Parkway area safe?",
    "a": "The Tropical Parkway corridor in North Las Vegas has seen significant improvements in recent years as new residential development and commercial amenities have matured. Newer subdivisions and the proximity to the Aliante master plan contribute to a family-friendly atmosphere."
  },
  {
    "q": "What ZIP codes are in the Tropical Parkway area?",
    "a": "The Tropical Parkway residential corridor spans ZIP codes 89084 and 89085 in North Las Vegas, Nevada."
  },
  {
    "q": "What shopping is near Tropical Parkway?",
    "a": "Shopping centers, grocery stores, and restaurants are concentrated at major intersections along Tropical Parkway. The Aliante Casino + Hotel + Spa and its associated dining are also nearby."
  },
  {
    "q": "How far is Tropical Parkway from the Strip?",
    "a": "The Tropical Parkway area is approximately 20 minutes from the Las Vegas Strip via I-15 South. Downtown Las Vegas is approximately 15 minutes away."
  },
  {
    "q": "Are there HOA fees in the Tropical Parkway area?",
    "a": "HOA fees vary by subdivision, typically ranging from $40 to $120 per month. Some older properties may not have an HOA."
  },
  {
    "q": "Is Tropical Parkway a good area for investment?",
    "a": "The Tropical Parkway corridor offers strong rental yields due to affordable purchase prices and steady rental demand. The area's ongoing commercial and residential development supports long-term appreciation potential."
  },
  {
    "q": "What are the newest homes near Tropical Parkway?",
    "a": "Recent construction by national builders has delivered homes with contemporary floor plans, energy efficiency, and modern finishes. Active new-construction communities are nearby in Park Highlands and Valley Vista."
  }
]

export default function TropicalParkwayFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Tropical Parkway Corridor</h2>
          <p>The questions buyers ask most when exploring Tropical Parkway Corridor.</p>
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
