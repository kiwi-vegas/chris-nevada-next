'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for homes in Sunstone?",
    "a": "Homes in Sunstone range from approximately $350,000 for townhomes to $650,000 for larger single-family homes with premium finishes. Most single-family homes fall in the $380,000 to $550,000 range."
  },
  {
    "q": "What builders are active at Sunstone?",
    "a": "Sunstone features new construction from Lennar, KB Home, Century Communities, and Richmond American Homes. Each builder offers multiple floor plans and customization options."
  },
  {
    "q": "Is Sunstone in Las Vegas or North Las Vegas?",
    "a": "Sunstone is located in the City of North Las Vegas, in the upper northwest corridor near the I-15 and US-95 freeway interchange."
  },
  {
    "q": "What ZIP codes is Sunstone in?",
    "a": "Sunstone spans ZIP codes 89081 and 89086 in North Las Vegas. Home prices range from $380K–$650K."
  },
  {
    "q": "What are HOA fees at Sunstone?",
    "a": "HOA fees at Sunstone typically range from $80 to $180 per month, covering common area maintenance, parks, trails, and community infrastructure. This is significantly lower than HOA fees in Summerlin or Henderson master plans."
  },
  {
    "q": "How many homes will Sunstone have when complete?",
    "a": "Sunstone is planned for approximately 3,650 homes when fully built out. As of 2025, the community is actively building with multiple phases under construction."
  },
  {
    "q": "What schools serve Sunstone?",
    "a": "Sunstone is served by CCSD schools in the North Las Vegas zone. Charter options including Doral Academy (9/10) and Somerset Academy Sky Pointe (8/10) are popular alternatives for families seeking higher-rated options."
  },
  {
    "q": "Is Sunstone a good investment?",
    "a": "Sunstone offers new construction at significantly lower price points than comparable communities in Summerlin or Henderson, positioned in one of the fastest-growing corridors of the Las Vegas Valley. The value proposition is strong for buyers comfortable with the North Las Vegas location."
  },
  {
    "q": "What are the best sub-neighborhoods within Sunstone?",
    "a": "The best sub-neighborhood depends on your priorities — school zones, lot size, home age, and proximity to amenities all vary within the community. Nevada Real Estate Group agents who specialize in Sunstone can walk you through the specific blocks and streets that match your criteria."
  },
  {
    "q": "How is new construction availability in Sunstone?",
    "a": "New construction availability varies by season and builder phase. Some sections of Sunstone have active new home sales while others are fully built out with resale-only inventory. Contact Nevada Real Estate Group for the most current new construction options."
  }
]

export default function SunstoneFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Sunstone</h2>
          <p>The questions buyers ask most when exploring Sunstone.</p>
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
