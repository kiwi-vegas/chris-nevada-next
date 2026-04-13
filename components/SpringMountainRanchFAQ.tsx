'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for homes in Spring Mountain Ranch?",
    "a": "Homes in Spring Mountain Ranch range from approximately $500,000 for entry-level homes to $1.2 million for premium executive estates on mountain-view lots."
  },
  {
    "q": "Is Spring Mountain Ranch guard-gated?",
    "a": "No — Spring Mountain Ranch is not guard-gated. It is a well-maintained suburban community with HOA governance."
  },
  {
    "q": "What ZIP codes are in Spring Mountain Ranch?",
    "a": "Spring Mountain Ranch is located in ZIP codes 89148 and 89113 in southwest Las Vegas."
  },
  {
    "q": "Is Spring Mountain Ranch near hiking?",
    "a": "Yes — Spring Mountain Ranch State Park is a short drive away with hiking trails and scenic desert landscapes. Red Rock Canyon is approximately 10 minutes west via Blue Diamond Road."
  },
  {
    "q": "What are HOA fees in Spring Mountain Ranch?",
    "a": "HOA fees typically range from $75 to $200 per month, covering common area maintenance and community landscaping."
  },
  {
    "q": "What schools serve Spring Mountain Ranch?",
    "a": "The community is served by CCSD schools and quality charter options including Doral Academy (9/10). Bishop Gorman High School (A+) is a nearby private option."
  },
  {
    "q": "How does Spring Mountain Ranch compare to Southern Highlands?",
    "a": "Spring Mountain Ranch offers quality homes with mountain views at price points below Southern Highlands. The trade-off is that Spring Mountain Ranch doesn't have guard-gated enclaves or a private golf club."
  },
  {
    "q": "Who built homes in Spring Mountain Ranch?",
    "a": "Various respected builders contributed to Spring Mountain Ranch over the 2003–2015 build period. The diversity of builders means a wide range of floor plans and architectural styles."
  },
  {
    "q": "What are the best sub-neighborhoods within Spring Mountain Ranch?",
    "a": "The best sub-neighborhood depends on your priorities — school zones, lot size, home age, and proximity to amenities all vary within the community. Nevada Real Estate Group agents who specialize in Spring Mountain Ranch can walk you through the specific blocks and streets that match your criteria."
  },
  {
    "q": "How is new construction availability in Spring Mountain Ranch?",
    "a": "New construction availability varies by season and builder phase. Some sections of Spring Mountain Ranch have active new home sales while others are fully built out with resale-only inventory. Contact Nevada Real Estate Group for the most current new construction options."
  }
]

export default function SpringMountainRanchFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Spring Mountain Ranch</h2>
          <p>The questions buyers ask most when exploring Spring Mountain Ranch.</p>
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
