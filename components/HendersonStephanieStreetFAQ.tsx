'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range along the Stephanie Street corridor?",
    "a": "Homes along the Stephanie Street corridor in Henderson range from approximately $350,000 for condos and townhomes to $600,000 for larger single-family homes. This represents some of the best value in Henderson for buyers seeking a central location."
  },
  {
    "q": "What ZIP codes are in the Stephanie Street corridor?",
    "a": "The Stephanie Street corridor spans ZIP codes 89014 and 89074 in Henderson, Nevada in Stephanie Street Corridor."
  },
  {
    "q": "Is the Stephanie Street area a good investment?",
    "a": "Yes. The Stephanie Street corridor has strong investment fundamentals including central Henderson location, low vacancy rates, solid rental demand, good schools, and proximity to major employers. Henderson consistently ranks as one of the best cities to live in Nevada."
  },
  {
    "q": "What schools serve the Stephanie Street area?",
    "a": "The area is served by CCSD schools including Green Valley High School (7/10). Private options include Henderson International School (A) and Pinecrest Academy (A). Somerset Academy Stephanie is a popular charter option."
  },
  {
    "q": "What shopping is near the Stephanie Street corridor?",
    "a": "The Galleria at Sunset is Henderson's largest mall, anchoring the northern end of the corridor. Multiple grocery stores, restaurants, and retail centers line Stephanie Street throughout. The District at Green Valley Ranch is approximately 10 minutes south."
  },
  {
    "q": "How far is the Stephanie Street area from the Strip?",
    "a": "The Stephanie Street corridor is approximately 15 minutes from the Las Vegas Strip via I-215 and I-15. Harry Reid International Airport is about 15 minutes away."
  },
  {
    "q": "What types of homes are available in the Stephanie Street corridor?",
    "a": "The corridor offers a diverse mix of single-family homes (1,500–3,000+ sq ft), townhomes, and condominiums. Most were built between 1990 and 2005. Both single-story and two-story options are available at various price points."
  },
  {
    "q": "What are HOA fees in the Stephanie Street corridor?",
    "a": "HOA fees vary by neighborhood and range from approximately $50 to $150 per month. Some standalone homes have no HOA. Gated condo communities may have fees up to $200/mo covering amenities and maintenance."
  },
  {
    "q": "What are the best sub-neighborhoods within Stephanie Street Corridor?",
    "a": "The best sub-neighborhood depends on your priorities — school zones, lot size, home age, and proximity to amenities all vary within the community. Nevada Real Estate Group agents who specialize in Stephanie Street Corridor can walk you through the specific blocks and streets that match your criteria."
  },
  {
    "q": "How is new construction availability in Stephanie Street Corridor?",
    "a": "New construction availability varies by season and builder phase. Some sections of Stephanie Street Corridor have active new home sales while others are fully built out with resale-only inventory. Contact Nevada Real Estate Group for the most current new construction options."
  }
]

export default function HendersonStephanieStreetFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Stephanie Street Corridor</h2>
          <p>The questions buyers ask most when exploring Stephanie Street Corridor.</p>
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
