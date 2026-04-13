'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for homes in Peccole Ranch?",
    "a": "Peccole Ranch offers homes from approximately $400,000 for entry-level single-family homes to over $3 million in the guard-gated Queensridge enclave. The community's 22 neighborhoods span virtually every price point."
  },
  {
    "q": "How many neighborhoods are in Peccole Ranch?",
    "a": "Peccole Ranch includes 22 distinct neighborhoods across its 640 acres, ranging from starter homes to guard-gated luxury communities like Queensridge."
  },
  {
    "q": "Is Peccole Ranch guard-gated?",
    "a": "Peccole Ranch itself is not guard-gated, but it contains Queensridge, a 987-home guard-gated community within its boundaries. Some individual neighborhoods within Peccole Ranch also have gated entry."
  },
  {
    "q": "What ZIP codes cover Peccole Ranch?",
    "a": "Peccole Ranch spans ZIP codes 89117 and 89145, located in the western Las Vegas Valley. Home prices range from $400K–$3M+."
  },
  {
    "q": "Is Queensridge part of Peccole Ranch?",
    "a": "Yes. Queensridge is a guard-gated luxury community located within the Peccole Ranch master plan. It operates with its own HOA and guard gate but is geographically part of Peccole Ranch."
  },
  {
    "q": "What happened to the Badlands Golf Club?",
    "a": "The Badlands Golf Club was a 27-hole championship course within Peccole Ranch that ceased operations. The site has been the subject of extensive development proposals and legal proceedings regarding potential residential redevelopment."
  },
  {
    "q": "What schools serve Peccole Ranch?",
    "a": "Peccole Ranch is served by CCSD schools including Scherkenbach Elementary (7/10), Canarelli Middle School (7/10), and Palo Verde High School (8/10). The Meadows School (A+) is located adjacent to the community."
  },
  {
    "q": "How old is Peccole Ranch?",
    "a": "Development of Peccole Ranch began in 1989, making it one of the more established master-planned communities in Las Vegas. The mature landscaping and proven property values are among its key selling points."
  },
  {
    "q": "What are the best sub-neighborhoods within Peccole Ranch?",
    "a": "The best sub-neighborhood depends on your priorities — school zones, lot size, home age, and proximity to amenities all vary within the community. Nevada Real Estate Group agents who specialize in Peccole Ranch can walk you through the specific blocks and streets that match your criteria."
  },
  {
    "q": "How is new construction availability in Peccole Ranch?",
    "a": "New construction availability varies by season and builder phase. Some sections of Peccole Ranch have active new home sales while others are fully built out with resale-only inventory. Contact Nevada Real Estate Group for the most current new construction options."
  }
]

export default function PeccoleRanchFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Peccole Ranch</h2>
          <p>The questions buyers ask most when exploring Peccole Ranch.</p>
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
