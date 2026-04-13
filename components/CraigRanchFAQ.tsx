'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for homes in Craig Ranch?",
    "a": "Homes in Craig Ranch range from approximately $300,000 for smaller homes to $500,000 for premium properties near the park. Most sales fall in the $350K to $425K range."
  },
  {
    "q": "Is Craig Ranch in Las Vegas or North Las Vegas?",
    "a": "Craig Ranch is located in North Las Vegas, a separately incorporated city in the northern Las Vegas Valley."
  },
  {
    "q": "What is Craig Ranch Regional Park?",
    "a": "Craig Ranch Regional Park is a 170-acre public park featuring one of the largest skateparks in the western United States, championship sports fields, a dog park, playgrounds, and miles of walking and biking trails."
  },
  {
    "q": "What ZIP codes are in Craig Ranch?",
    "a": "Craig Ranch spans ZIP codes 89032 and 89081 in North Las Vegas."
  },
  {
    "q": "What are HOA fees in Craig Ranch?",
    "a": "HOA fees are very affordable, typically $40 to $120 per month, covering common area maintenance and basic community upkeep."
  },
  {
    "q": "Is Craig Ranch a good investment?",
    "a": "Craig Ranch's affordable pricing and proximity to the regional park create strong rental demand. North Las Vegas is the fastest-growing jurisdiction in the metro, and ongoing infrastructure investment supports long-term appreciation."
  },
  {
    "q": "What schools serve Craig Ranch?",
    "a": "Craig Ranch is served by CCSD schools. Charter options including Somerset Academy NLV (8/10) and Doral Academy (9/10) provide higher-rated alternatives. Bishop Gorman (A+) is a private option."
  },
  {
    "q": "How does Craig Ranch compare to Aliante?",
    "a": "Craig Ranch offers more affordable pricing ($300K–$500K vs. $300K–$650K) and the exceptional Regional Park. Aliante offers a more complete master-planned experience with a golf course, casino, and nature discovery park at slightly higher prices."
  },
  {
    "q": "What are the best sub-neighborhoods within Craig Ranch?",
    "a": "The best sub-neighborhood depends on your priorities — school zones, lot size, home age, and proximity to amenities all vary within the community. Nevada Real Estate Group agents who specialize in Craig Ranch can walk you through the specific blocks and streets that match your criteria."
  },
  {
    "q": "How is new construction availability in Craig Ranch?",
    "a": "New construction availability varies by season and builder phase. Some sections of Craig Ranch have active new home sales while others are fully built out with resale-only inventory. Contact Nevada Real Estate Group for the most current new construction options."
  }
]

export default function CraigRanchFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Craig Ranch</h2>
          <p>The questions buyers ask most when exploring Craig Ranch.</p>
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
