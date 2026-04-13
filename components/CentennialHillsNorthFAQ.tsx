'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for homes in Centennial Hills North?",
    "a": "Homes in Centennial Hills North range from approximately $400,000 to $700,000, depending on builder, floor plan, lot size, and selected upgrades."
  },
  {
    "q": "What builders are in Centennial Hills North?",
    "a": "Multiple national and regional builders are active in Centennial Hills North including Lennar, Pulte Homes, Taylor Morrison, KB Home, and Century Communities."
  },
  {
    "q": "Is Centennial Hills North a good area for families?",
    "a": "Yes. Centennial Hills North features newer schools, the 120-acre Centennial Hills Park, walking trails, and a growing number of family-oriented retail and dining options. Henderson's safety ranking extends to this Las Vegas area as well."
  },
  {
    "q": "What ZIP codes are in Centennial Hills North?",
    "a": "Centennial Hills North primarily spans ZIP codes 89149 and 89166 in northwest Las Vegas."
  },
  {
    "q": "How does Centennial Hills North compare to Summerlin?",
    "a": "Centennial Hills North offers newer construction at significantly lower prices than comparable Summerlin homes. The tradeoff is that Summerlin has more established amenities, a stronger brand, and a wider range of luxury options."
  },
  {
    "q": "What are HOA fees in Centennial Hills North?",
    "a": "HOA fees typically range from $80 to $200 per month, depending on the specific neighborhood and its amenities. This is generally lower than comparable Summerlin communities."
  },
  {
    "q": "What schools serve Centennial Hills North?",
    "a": "The area is served by newer CCSD campuses including Scherkenbach Elementary and Centennial High School. Charter options include Doral Academy and Coral Academy of Science."
  },
  {
    "q": "Is Centennial Hills North still growing?",
    "a": "Yes. Active new-home construction continues in Centennial Hills North with multiple builders releasing new phases. The area continues to add retail, dining, and services to serve the growing population."
  },
  {
    "q": "What are the best sub-neighborhoods within Centennial Hills North?",
    "a": "The best sub-neighborhood depends on your priorities — school zones, lot size, home age, and proximity to amenities all vary within the community. Nevada Real Estate Group agents who specialize in Centennial Hills North can walk you through the specific blocks and streets that match your criteria."
  },
  {
    "q": "How is new construction availability in Centennial Hills North?",
    "a": "New construction availability varies by season and builder phase. Some sections of Centennial Hills North have active new home sales while others are fully built out with resale-only inventory. Contact Nevada Real Estate Group for the most current new construction options."
  }
]

export default function CentennialHillsNorthFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Centennial Hills North</h2>
          <p>The questions buyers ask most when exploring Centennial Hills North.</p>
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
