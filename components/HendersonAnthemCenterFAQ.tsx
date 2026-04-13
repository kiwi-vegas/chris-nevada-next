'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for homes in Anthem Center?",
    "a": "Homes in the Anthem Center area range from approximately $500,000 to $800,000. The core neighborhoods offer established single-family homes from 1,500 to 3,500 square feet, with pricing dependent on lot size, views, and upgrades."
  },
  {
    "q": "Is Anthem Center guard-gated?",
    "a": "No. The Anthem Center neighborhoods are not guard-gated. However, they are part of the broader Anthem master-planned community and benefit from all Anthem HOA amenities, parks, and trails. Guard-gated options within Anthem include Anthem Country Club and Sun City Anthem."
  },
  {
    "q": "What ZIP code is Anthem Center in?",
    "a": "Anthem Center is located in ZIP code 89052 in Henderson, Nevada."
  },
  {
    "q": "What schools serve Anthem Center?",
    "a": "Anthem Center is served by CCSD schools including Elise L. Wolff Elementary (9/10), Del E. Webb Middle School (7/10), and Coronado High School. Private options include Henderson International School and Bishop Gorman High School (A+)."
  },
  {
    "q": "What amenities are in Anthem Center?",
    "a": "Anthem Center Park is the community's recreational heart with a splash pad, playground, basketball courts, and walking trails. The Anthem Fitness Trail, Anthem Hills Park, and multiple pocket parks provide additional recreation. Shopping and dining are available along Eastern Avenue."
  },
  {
    "q": "What are HOA fees in Anthem Center?",
    "a": "HOA fees in the Anthem Center neighborhoods typically range from $100 to $250 per month, covering common area maintenance, parks, trails, and community amenities. This is significantly lower than the guard-gated Anthem enclaves."
  },
  {
    "q": "How does Anthem Center compare to Anthem Country Club?",
    "a": "Anthem Center offers the core Anthem lifestyle at a lower price point ($500K–$800K vs $1.2M–$8M+). Anthem Country Club is guard-gated with a private golf course, while Anthem Center is non-gated but shares the same parks, trails, schools, and community infrastructure."
  },
  {
    "q": "When was Anthem Center built?",
    "a": "Most homes in the Anthem Center area were built between 1998 and 2006 during the original phases of the Anthem master plan. Construction quality is typical of Del Webb and Pulte Group production homes from this era."
  },
  {
    "q": "What are the best sub-neighborhoods within Anthem Center?",
    "a": "The best sub-neighborhood depends on your priorities — school zones, lot size, home age, and proximity to amenities all vary within the community. Nevada Real Estate Group agents who specialize in Anthem Center can walk you through the specific blocks and streets that match your criteria."
  },
  {
    "q": "How is new construction availability in Anthem Center?",
    "a": "New construction availability varies by season and builder phase. Some sections of Anthem Center have active new home sales while others are fully built out with resale-only inventory. Contact Nevada Real Estate Group for the most current new construction options."
  }
]

export default function HendersonAnthemCenterFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Anthem Center</h2>
          <p>The questions buyers ask most when exploring Anthem Center.</p>
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
