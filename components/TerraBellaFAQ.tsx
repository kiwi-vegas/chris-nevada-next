'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the age requirement for Terra Bella?",
    "a": "Terra Bella is a 55+ community. At least one resident in each household must be 55 years of age or older, in accordance with federal housing age-restriction guidelines."
  },
  {
    "q": "Is Terra Bella guard-gated?",
    "a": "No. Terra Bella is not guard-gated. For guard-gated 55+ living in the Anthem area, see Solera at Anthem. Terra Bella does have managed access points and is within the broader Anthem master plan."
  },
  {
    "q": "What is the price range for homes in Terra Bella?",
    "a": "Homes in Terra Bella range from approximately $300,000 for smaller attached garden homes to over $600,000 for larger detached homes on premium lots with views."
  },
  {
    "q": "Who built Terra Bella?",
    "a": "Terra Bella was built by Shea Homes, a national builder known for its Trilogy brand of active adult communities. Shea Homes is recognized for quality construction, energy-efficient design, and thoughtful floor plans."
  },
  {
    "q": "How does Terra Bella compare to Sun City Anthem?",
    "a": "Sun City Anthem is much larger (7,000+ homes) with two golf courses and an expansive clubhouse. Terra Bella is smaller (550+ homes) with a more intimate community center. Terra Bella typically has lower price points and lower HOA fees, while Sun City Anthem offers more amenities."
  },
  {
    "q": "What are HOA fees in Terra Bella?",
    "a": "HOA fees in Terra Bella typically range from $120 to $220 per month, covering front yard landscaping, common area maintenance, the community center, pool, and fitness room."
  },
  {
    "q": "What ZIP code is Terra Bella in?",
    "a": "Terra Bella is located in ZIP code 89044 in Henderson, Nevada."
  },
  {
    "q": "Does Terra Bella have a golf course?",
    "a": "No. Terra Bella does not have its own golf course. Nearby options include Sun City Anthem's two courses, Anthem Country Club (Hale Irwin-designed), and several Henderson-area public courses."
  }
]

export default function TerraBellaFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Terra Bella</h2>
          <p>The questions buyers ask most when exploring Terra Bella.</p>
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
