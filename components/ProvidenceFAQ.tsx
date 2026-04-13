'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for homes in Providence?",
    "a": "Homes in Providence range from approximately $350,000 for established resale homes to $600,000 for newer construction and premium lots. Most homes fall in the $400K to $500K range."
  },
  {
    "q": "Is Providence a master-planned community?",
    "a": "Yes. Providence is a 1,200-acre master-planned community developed by Focus Property Group. It features connected trail systems, community parks, sports courts, and organized neighborhood design."
  },
  {
    "q": "What ZIP codes are in Providence?",
    "a": "Providence is located in ZIP codes 89166 and 89131 in northwest Las Vegas. Home prices range from $350K–$600K."
  },
  {
    "q": "Who developed Providence?",
    "a": "Providence was developed by Focus Property Group, the same developer behind Mountains Edge in southwest Las Vegas. The community broke ground in 2006 and has grown to over 4,000 homes."
  },
  {
    "q": "What schools serve Providence?",
    "a": "Providence is served by CCSD schools including Neal Shawn Petersen Elementary (7/10) and Shadow Ridge High School (6/10). Private options include Bishop Gorman (A+) and Faith Lutheran (A). Doral Academy (9/10) is a top charter."
  },
  {
    "q": "What are HOA fees in Providence?",
    "a": "HOA fees in Providence typically range from $50 to $150 per month, depending on the specific section. Fees cover community park maintenance, trail upkeep, common area landscaping, and community programming."
  },
  {
    "q": "How far is Providence from the Strip?",
    "a": "Providence is approximately 25 minutes from the Las Vegas Strip via US-95 South. Centennial Hills commercial areas are about 15 minutes away, and Skye Canyon is 10 minutes north."
  },
  {
    "q": "Is Providence good for families?",
    "a": "Providence is excellent for families. The connected trail system, multiple parks and playgrounds, community events, and attainable pricing make it one of the most popular family communities in the northwest valley."
  },
  {
    "q": "What are the best sub-neighborhoods within Providence?",
    "a": "The best sub-neighborhood depends on your priorities — school zones, lot size, home age, and proximity to amenities all vary within the community. Nevada Real Estate Group agents who specialize in Providence can walk you through the specific blocks and streets that match your criteria."
  },
  {
    "q": "How is new construction availability in Providence?",
    "a": "New construction availability varies by season and builder phase. Some sections of Providence have active new home sales while others are fully built out with resale-only inventory. Contact Nevada Real Estate Group for the most current new construction options."
  }
]

export default function ProvidenceFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Providence</h2>
          <p>The questions buyers ask most when exploring Providence.</p>
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
