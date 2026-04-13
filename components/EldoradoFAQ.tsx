'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for homes in Eldorado?",
    "a": "Homes in Eldorado range from approximately $300,000 for townhomes and smaller single-family homes to $500,000 for larger floor plans on premium lots."
  },
  {
    "q": "Is Eldorado in Las Vegas or North Las Vegas?",
    "a": "Eldorado is in the City of North Las Vegas, located in the central-northern section of the city along the North 5th Street and Decatur Boulevard corridors."
  },
  {
    "q": "Is Eldorado a good area?",
    "a": "Eldorado is a family-oriented community with affordable homes, access to Craig Ranch Regional Park, and improving infrastructure. North Las Vegas has invested significantly in the area's roads, parks, and commercial development."
  },
  {
    "q": "What ZIP codes are in Eldorado?",
    "a": "Eldorado spans ZIP codes 89032 and 89031 in North Las Vegas. Home prices range from $300K–$500K."
  },
  {
    "q": "What is Craig Ranch Regional Park?",
    "a": "Craig Ranch Regional Park is a 170-acre park featuring the world's largest skate park, an amphitheater for concerts and events, sports fields, playgrounds, and walking trails. It serves as the premier recreation destination for Eldorado residents."
  },
  {
    "q": "Are there good schools in Eldorado?",
    "a": "Eldorado is served by CCSD schools including Legacy High School and Tarkanian Middle School. Charter options like Coral Academy of Science (8/10) and Somerset Academy provide additional choices. Bishop Gorman High School (A+) is accessible by a 20-minute drive."
  },
  {
    "q": "What are HOA fees in Eldorado?",
    "a": "HOA fees in Eldorado are among the lowest in the valley, typically $40 to $120 per month. Some older neighborhoods have no HOA. Low fees are a significant value advantage."
  },
  {
    "q": "Is Eldorado a good investment?",
    "a": "Eldorado's affordable pricing, growing infrastructure, and strong rental demand make it attractive for investors. North Las Vegas' population growth and commercial development support continued property value appreciation."
  },
  {
    "q": "What are the best sub-neighborhoods within Eldorado?",
    "a": "The best sub-neighborhood depends on your priorities — school zones, lot size, home age, and proximity to amenities all vary within the community. Nevada Real Estate Group agents who specialize in Eldorado can walk you through the specific blocks and streets that match your criteria."
  },
  {
    "q": "How is new construction availability in Eldorado?",
    "a": "New construction availability varies by season and builder phase. Some sections of Eldorado have active new home sales while others are fully built out with resale-only inventory. Contact Nevada Real Estate Group for the most current new construction options."
  }
]

export default function EldoradoFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Eldorado</h2>
          <p>The questions buyers ask most when exploring Eldorado.</p>
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
