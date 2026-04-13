'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for homes in Charleston Heights?",
    "a": "Homes in Charleston Heights range from approximately $250,000 for smaller fixer-uppers to $500,000 for fully renovated or larger properties. The median home price is typically in the $300K–$350K range."
  },
  {
    "q": "Is Charleston Heights safe?",
    "a": "Charleston Heights is an urban neighborhood with typical city considerations. Crime statistics vary by block. Working with a knowledgeable agent helps identify the safest and most desirable sections of the community."
  },
  {
    "q": "What ZIP codes are in Charleston Heights?",
    "a": "Charleston Heights primarily spans ZIP codes 89107 and 89106 in the City of Las Vegas. Home prices range from $250K–$500K."
  },
  {
    "q": "Is Charleston Heights good for investment?",
    "a": "Yes. Charleston Heights offers strong investment potential due to affordable entry prices, central location, larger lots, and the ongoing revitalization of Las Vegas's urban core. Renovation ROI is among the highest in the valley."
  },
  {
    "q": "What is the Charleston Heights Arts Center?",
    "a": "The Charleston Heights Arts Center is a City of Las Vegas cultural facility that hosts visual art exhibitions, performances, classes, and community events. It serves as a cultural anchor for the neighborhood."
  },
  {
    "q": "How old are homes in Charleston Heights?",
    "a": "Most homes in Charleston Heights were built between the 1950s and 1970s. The predominant style is single-story ranch with block construction, detached garages, and generous lot sizes."
  },
  {
    "q": "How close is Charleston Heights to downtown?",
    "a": "Charleston Heights is approximately 10 minutes from downtown Las Vegas via Charleston Boulevard or Rancho Drive. The proximity to downtown is one of the neighborhood's strongest assets."
  },
  {
    "q": "Are there HOAs in Charleston Heights?",
    "a": "Most homes in Charleston Heights do not have HOA fees or have minimal association dues under $50 per month. This is a significant cost advantage compared to newer master-planned communities."
  },
  {
    "q": "What are the best sub-neighborhoods within Charleston Heights?",
    "a": "The best sub-neighborhood depends on your priorities — school zones, lot size, home age, and proximity to amenities all vary within the community. Nevada Real Estate Group agents who specialize in Charleston Heights can walk you through the specific blocks and streets that match your criteria."
  },
  {
    "q": "How is new construction availability in Charleston Heights?",
    "a": "New construction availability varies by season and builder phase. Some sections of Charleston Heights have active new home sales while others are fully built out with resale-only inventory. Contact Nevada Real Estate Group for the most current new construction options."
  }
]

export default function LasVegasCharlestonHeightsFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Charleston Heights</h2>
          <p>The questions buyers ask most when exploring Charleston Heights.</p>
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
