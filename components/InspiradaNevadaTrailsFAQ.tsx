'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for homes in Nevada Trails at Inspirada?",
    "a": "Homes in Nevada Trails range from approximately $450,000 for smaller resale homes to $700,000 for larger trail-adjacent and plaza-walk properties."
  },
  {
    "q": "What makes Nevada Trails different from other Inspirada neighborhoods?",
    "a": "Nevada Trails is defined by its extensive trail connectivity — homes along dedicated walking and biking paths with direct connections to Inspirada's plazas, parks, and gathering spaces. It is also one of the most established sections with mature landscaping."
  },
  {
    "q": "Is Nevada Trails guard-gated?",
    "a": "No — Nevada Trails is part of the open Inspirada master plan with HOA governance. There are no guard gates in Nevada Trails at Inspirada."
  },
  {
    "q": "What ZIP code is Nevada Trails in?",
    "a": "Nevada Trails at Inspirada is located in ZIP code 89044 in southern Henderson. Home prices range from $450K–$700K."
  },
  {
    "q": "What are HOA fees in Nevada Trails?",
    "a": "HOA fees typically range from $100 to $225 per month, covering access to Inspirada's parks, pools, plazas, trail maintenance, and community programming."
  },
  {
    "q": "What schools serve Nevada Trails?",
    "a": "Nevada Trails is served by CCSD schools including Dean Allen Elementary (7/10) and Del E. Webb Middle School (7/10). Pinecrest Academy Inspirada (9/10) is a popular charter option within the community."
  },
  {
    "q": "Is Nevada Trails walkable?",
    "a": "Yes — the trail network connects Nevada Trails to parks, plazas, schools, and the commercial district along St. Rose Parkway. Many residents walk or bike to community amenities and events."
  },
  {
    "q": "How does Nevada Trails compare to Cadence?",
    "a": "Nevada Trails offers a more established neighborhood with mature landscaping, while Cadence has more active new construction. Both are excellent Henderson master-planned communities with strong amenity packages."
  },
  {
    "q": "What are the best sub-neighborhoods within Nevada Trails at Inspirada?",
    "a": "The best sub-neighborhood depends on your priorities — school zones, lot size, home age, and proximity to amenities all vary within the community. Nevada Real Estate Group agents who specialize in Nevada Trails at Inspirada can walk you through the specific blocks and streets that match your criteria."
  },
  {
    "q": "How is new construction availability in Nevada Trails at Inspirada?",
    "a": "New construction availability varies by season and builder phase. Some sections of Nevada Trails at Inspirada have active new home sales while others are fully built out with resale-only inventory. Contact Nevada Real Estate Group for the most current new construction options."
  }
]

export default function InspiradaNevadaTrailsFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Nevada Trails at Inspirada</h2>
          <p>The questions buyers ask most when exploring Nevada Trails at Inspirada.</p>
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
