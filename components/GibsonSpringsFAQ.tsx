'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for homes in Gibson Springs?",
    "a": "Homes in Gibson Springs range from approximately $350,000 for townhomes and smaller single-family homes to $550,000 for larger four- and five-bedroom single-family homes."
  },
  {
    "q": "Is Gibson Springs guard-gated?",
    "a": "No. Gibson Springs is not guard-gated. It is an open established community with HOA governance and the safety benefits of Henderson — one of America's safest large cities."
  },
  {
    "q": "What ZIP codes is Gibson Springs in?",
    "a": "Gibson Springs spans ZIP codes 89074 and 89014 in central Henderson, Nevada."
  },
  {
    "q": "What are HOA fees in Gibson Springs?",
    "a": "HOA fees in Gibson Springs typically range from $40 to $100 per month, making it one of the most affordable HOA communities in Henderson."
  },
  {
    "q": "What schools serve Gibson Springs?",
    "a": "Gibson Springs is served by CCSD schools including Fay Herron Elementary (7/10) and Green Valley High School (7/10). Charter and private school options are also available nearby."
  },
  {
    "q": "When were homes in Gibson Springs built?",
    "a": "Most homes in Gibson Springs were built between 1993 and the early 2000s. The community features solid construction from major national builders with practical floor plans."
  },
  {
    "q": "How does Gibson Springs compare to Whitney Ranch?",
    "a": "Gibson Springs and Whitney Ranch are both established Henderson communities at similar price points. Gibson Springs tends to have slightly lower entry prices and lower HOA fees, while Whitney Ranch offers a slightly larger community footprint."
  },
  {
    "q": "Is Gibson Springs good for first-time buyers?",
    "a": "Yes. Gibson Springs is one of the best first-time buyer communities in Henderson due to its affordable price points, low HOA fees, central location, good schools, and Henderson's high safety rankings."
  },
  {
    "q": "What are the best sub-neighborhoods within Gibson Springs?",
    "a": "The best sub-neighborhood depends on your priorities — school zones, lot size, home age, and proximity to amenities all vary within the community. Nevada Real Estate Group agents who specialize in Gibson Springs can walk you through the specific blocks and streets that match your criteria."
  },
  {
    "q": "How is new construction availability in Gibson Springs?",
    "a": "New construction availability varies by season and builder phase. Some sections of Gibson Springs have active new home sales while others are fully built out with resale-only inventory. Contact Nevada Real Estate Group for the most current new construction options."
  }
]

export default function GibsonSpringsFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Gibson Springs</h2>
          <p>The questions buyers ask most when exploring Gibson Springs.</p>
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
