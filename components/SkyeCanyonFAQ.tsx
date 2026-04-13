'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for homes in Skye Canyon?",
    "a": "Homes in Skye Canyon range from approximately $400,000 for resale homes to $800,000 for premium new construction on elevated lots with mountain views. Active new construction is available from multiple builders."
  },
  {
    "q": "Is Skye Canyon still building?",
    "a": "Yes. Skye Canyon is one of the few established master plans in the valley with active new-home construction. Multiple builders are selling new homes, and additional phases continue to be developed."
  },
  {
    "q": "What is the Skye Center?",
    "a": "The Skye Center is a 7,500-square-foot recreation facility featuring resort-style pools, a fitness center, sports courts, outdoor event lawns, and a commercial village with restaurants and shops. It is the social hub of the community."
  },
  {
    "q": "What ZIP code is Skye Canyon in?",
    "a": "Skye Canyon is in ZIP code 89166 in northwest Las Vegas."
  },
  {
    "q": "How close is Skye Canyon to the mountains?",
    "a": "Skye Canyon is approximately 15 minutes from Lee Canyon ski area and the Mount Charleston recreation corridor via US-95 and Kyle Canyon Road. It is the closest major master-planned community to mountain recreation."
  },
  {
    "q": "What schools serve Skye Canyon?",
    "a": "Skye Canyon is served by CCSD schools including Scherkenbach STEAM Academy (7/10) and Shadow Ridge High School (6/10). New schools are being built to serve the growing community. Bishop Gorman (A+) and Doral Academy (9/10) are nearby options."
  },
  {
    "q": "Who developed Skye Canyon?",
    "a": "Skye Canyon was developed by Olympia Companies, the same developer behind Southern Highlands. The 1,700-acre community broke ground in 2015 and continues to expand."
  },
  {
    "q": "What are HOA fees in Skye Canyon?",
    "a": "HOA fees in Skye Canyon typically range from $75 to $200 per month, depending on the specific builder section. Fees cover community amenity operations, Skye Center access, parks, trails, and common area maintenance."
  },
  {
    "q": "What are the best sub-neighborhoods within Skye Canyon?",
    "a": "The best sub-neighborhood depends on your priorities — school zones, lot size, home age, and proximity to amenities all vary within the community. Nevada Real Estate Group agents who specialize in Skye Canyon can walk you through the specific blocks and streets that match your criteria."
  },
  {
    "q": "How is new construction availability in Skye Canyon?",
    "a": "New construction availability varies by season and builder phase. Some sections of Skye Canyon have active new home sales while others are fully built out with resale-only inventory. Contact Nevada Real Estate Group for the most current new construction options."
  }
]

export default function SkyeCanyonFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Skye Canyon</h2>
          <p>The questions buyers ask most when exploring Skye Canyon.</p>
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
