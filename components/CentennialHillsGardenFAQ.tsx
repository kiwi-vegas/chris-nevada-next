'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for homes in the Garden at Centennial Hills?",
    "a": "Homes range from approximately $400,000 for smaller residences to $650,000 or more for premium homes with upgraded finishes and larger lots."
  },
  {
    "q": "What makes the Garden area different from other Centennial Hills sections?",
    "a": "The Garden area is distinguished by its mature tree-lined streets, community garden spaces, and settled suburban character. It occupies the central, most established section of Centennial Hills with the best infrastructure access."
  },
  {
    "q": "What ZIP codes is the Garden area in?",
    "a": "The Garden at Centennial Hills spans portions of ZIP codes 89131 and 89149 in northwest Las Vegas."
  },
  {
    "q": "What schools serve the Garden at Centennial Hills?",
    "a": "The area is zoned for above-average CCSD schools including Myrtle Tate Elementary (7/10) and Arbor View High School (7/10). Charter options include Doral Academy (9/10) and Coral Academy (8/10)."
  },
  {
    "q": "What are HOA fees in the Garden area?",
    "a": "HOA fees typically range from $50 to $140 per month — lower than most newer master-planned communities while maintaining clean, well-kept common areas."
  },
  {
    "q": "Is the Garden area good for families?",
    "a": "Yes. The combination of mature landscaping, above-average schools, proximity to Centennial Hills Park, and established community character makes it one of the most popular family areas in northwest Las Vegas."
  },
  {
    "q": "How close is the Garden area to shopping?",
    "a": "The Garden area has excellent commercial access. The Centennial Parkway and Ann Road corridors, both within 5 minutes, offer comprehensive grocery, dining, medical, and retail services."
  },
  {
    "q": "When were homes in the Garden area built?",
    "a": "Most homes were built between 2003 and 2010 by national builders. The established construction era provides mature landscaping and proven neighborhood infrastructure."
  },
  {
    "q": "What are the best sub-neighborhoods within Garden at Centennial Hills?",
    "a": "The best sub-neighborhood depends on your priorities — school zones, lot size, home age, and proximity to amenities all vary within the community. Nevada Real Estate Group agents who specialize in Garden at Centennial Hills can walk you through the specific blocks and streets that match your criteria."
  },
  {
    "q": "How is new construction availability in Garden at Centennial Hills?",
    "a": "New construction availability varies by season and builder phase. Some sections of Garden at Centennial Hills have active new home sales while others are fully built out with resale-only inventory. Contact Nevada Real Estate Group for the most current new construction options."
  }
]

export default function CentennialHillsGardenFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Garden at Centennial Hills</h2>
          <p>The questions buyers ask most when exploring Garden at Centennial Hills.</p>
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
