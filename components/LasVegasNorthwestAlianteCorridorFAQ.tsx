'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range in the Aliante Corridor?",
    "a": "Homes in the Aliante Corridor range from approximately $300,000 to $500,000. The average single-family home sells between $350K and $425K, offering outstanding value for the Las Vegas metro."
  },
  {
    "q": "What ZIP codes are in the Aliante Corridor?",
    "a": "The Aliante Corridor spans ZIP codes 89084 and 89085 in North Las Vegas, Nevada."
  },
  {
    "q": "Is the Aliante Corridor part of the Aliante master plan?",
    "a": "The Aliante Corridor encompasses neighborhoods surrounding the Aliante master plan. Some homes are within the master plan's HOA, while others are in adjacent independent subdivisions that benefit from proximity to Aliante's amenities."
  },
  {
    "q": "What schools serve the Aliante Corridor?",
    "a": "The area is served by CCSD schools including Legacy High School. Somerset Academy NLV (8/10) and Doral Academy Fire Mesa (8/10) are strong charter alternatives. Faith Lutheran (A) is the top private option in the area."
  },
  {
    "q": "How far is the Aliante Corridor from the Strip?",
    "a": "The Aliante Corridor is approximately 20 minutes from the Las Vegas Strip via I-15 South."
  },
  {
    "q": "Is North Las Vegas growing?",
    "a": "Yes. North Las Vegas is the fastest-growing city in Nevada, with significant investment in infrastructure, commercial development, and new housing. The Aliante Corridor is one of the primary beneficiaries of this growth."
  },
  {
    "q": "What are HOA fees in the Aliante Corridor?",
    "a": "HOA fees range from $50 to $150 per month in most neighborhoods. Some standalone homes have no HOA. Neighborhoods within the Aliante master plan may have slightly higher fees."
  },
  {
    "q": "Is the Aliante Corridor good for investment?",
    "a": "Yes. The Aliante Corridor offers affordable entry points with strong rental demand and appreciation potential driven by North Las Vegas' growth. The proximity to the Aliante master plan's amenities adds value."
  },
  {
    "q": "What are the best sub-neighborhoods within Aliante Corridor?",
    "a": "The best sub-neighborhood depends on your priorities — school zones, lot size, home age, and proximity to amenities all vary within the community. Nevada Real Estate Group agents who specialize in Aliante Corridor can walk you through the specific blocks and streets that match your criteria."
  },
  {
    "q": "How is new construction availability in Aliante Corridor?",
    "a": "New construction availability varies by season and builder phase. Some sections of Aliante Corridor have active new home sales while others are fully built out with resale-only inventory. Contact Nevada Real Estate Group for the most current new construction options."
  }
]

export default function LasVegasNorthwestAlianteCorridorFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Aliante Corridor</h2>
          <p>The questions buyers ask most when exploring Aliante Corridor.</p>
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
