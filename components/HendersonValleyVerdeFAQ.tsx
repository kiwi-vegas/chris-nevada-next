'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for homes in Valley Verde?",
    "a": "Homes in Valley Verde range from approximately $400,000 for smaller single-family homes to $700,000 for larger residences on premium lots with upgraded features."
  },
  {
    "q": "What ZIP codes cover Valley Verde?",
    "a": "Valley Verde spans portions of ZIP codes 89014 and 89074 in Henderson, Nevada."
  },
  {
    "q": "What schools serve Valley Verde?",
    "a": "Valley Verde is served by well-regarded CCSD schools including Vanderburg Elementary (8/10) and Green Valley High School (7/10). Charter options include Doral Academy (9/10)."
  },
  {
    "q": "How far is Valley Verde from the Strip?",
    "a": "Valley Verde is approximately 20 minutes from the Las Vegas Strip via I-215 and I-15 North."
  },
  {
    "q": "Is Valley Verde a good area for families?",
    "a": "Yes. Valley Verde is a popular family community with good schools, safe neighborhoods, community parks, and Henderson's excellent municipal services."
  },
  {
    "q": "What are HOA fees in Valley Verde?",
    "a": "HOA fees in Valley Verde typically range from $50 to $150 per month, covering common area maintenance, parks, and community amenities."
  },
  {
    "q": "How does Valley Verde compare to Green Valley?",
    "a": "Valley Verde offers similar Henderson quality to Green Valley at comparable prices. Both are established communities with good schools, parks, and central Henderson locations."
  },
  {
    "q": "Is Valley Verde near shopping?",
    "a": "Yes. Valley Verde is minutes from Galleria at Sunset, Green Valley Ranch Resort, and extensive shopping, dining, and medical services along Eastern Avenue and Warm Springs Road."
  },
  {
    "q": "What are the best sub-neighborhoods within Valley Verde?",
    "a": "The best sub-neighborhood depends on your priorities — school zones, lot size, home age, and proximity to amenities all vary within the community. Nevada Real Estate Group agents who specialize in Valley Verde can walk you through the specific blocks and streets that match your criteria."
  },
  {
    "q": "How is new construction availability in Valley Verde?",
    "a": "New construction availability varies by season and builder phase. Some sections of Valley Verde have active new home sales while others are fully built out with resale-only inventory. Contact Nevada Real Estate Group for the most current new construction options."
  }
]

export default function HendersonValleyVerdeFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Valley Verde</h2>
          <p>The questions buyers ask most when exploring Valley Verde.</p>
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
