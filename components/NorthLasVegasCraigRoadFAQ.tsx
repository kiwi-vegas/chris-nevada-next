'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range along the Craig Road corridor?",
    "a": "Homes along the Craig Road corridor in North Las Vegas range from approximately $300,000 to $500,000, representing some of the most affordable single-family housing in the Las Vegas metro."
  },
  {
    "q": "What ZIP codes are in the Craig Road corridor?",
    "a": "The Craig Road corridor spans ZIP codes 89032 and 89081 in North Las Vegas, Nevada."
  },
  {
    "q": "What is Craig Ranch Regional Park?",
    "a": "Craig Ranch Regional Park is a 170-acre facility along Craig Road featuring sports fields, a championship skate park, water play areas, a dog park, walking trails, and event spaces. It is one of the best parks in the Las Vegas Valley."
  },
  {
    "q": "How far is the Craig Road corridor from the Strip?",
    "a": "The Craig Road corridor is approximately 18 minutes from the Las Vegas Strip via I-15 South. Downtown Las Vegas is about 12 minutes away."
  },
  {
    "q": "Is the Craig Road corridor near Nellis AFB?",
    "a": "Yes. Nellis Air Force Base is approximately 8 minutes east of the corridor via Craig Road, making this area popular with military families and civilian employees."
  },
  {
    "q": "What schools serve the Craig Road corridor?",
    "a": "The area is served by CCSD schools including Cheyenne High School. Charter options like Somerset Academy NLV (8/10) and Doral Academy Fire Mesa (8/10) provide higher-rated alternatives."
  },
  {
    "q": "Is the Craig Road corridor a good investment?",
    "a": "Yes. The Craig Road corridor offers affordable entry with strong rental demand and growing infrastructure. North Las Vegas' population growth and commercial development are driving appreciation across the corridor."
  },
  {
    "q": "What are HOA fees along Craig Road?",
    "a": "HOA fees are among the lowest in the valley at $40–$125 per month. Some standalone homes have no HOA."
  },
  {
    "q": "What are the best sub-neighborhoods within Craig Road Corridor?",
    "a": "The best sub-neighborhood depends on your priorities — school zones, lot size, home age, and proximity to amenities all vary within the community. Nevada Real Estate Group agents who specialize in Craig Road Corridor can walk you through the specific blocks and streets that match your criteria."
  },
  {
    "q": "How is new construction availability in Craig Road Corridor?",
    "a": "New construction availability varies by season and builder phase. Some sections of Craig Road Corridor have active new home sales while others are fully built out with resale-only inventory. Contact Nevada Real Estate Group for the most current new construction options."
  }
]

export default function NorthLasVegasCraigRoadFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Craig Road Corridor</h2>
          <p>The questions buyers ask most when exploring Craig Road Corridor.</p>
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
