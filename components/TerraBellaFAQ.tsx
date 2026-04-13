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
    "a": "Terra Bella is located in ZIP code 89044 in Henderson, Nevada. Home prices range from $300K–$600K+."
  },
  {
    "q": "Does Terra Bella have a golf course?",
    "a": "No. Terra Bella does not have its own golf course. Nearby options include Sun City Anthem's two courses, Anthem Country Club (Hale Irwin-designed), and several Henderson-area public courses."
  },
  {
    "q": "What is the age requirement?",
    "a": "Under the Housing for Older Persons Act (HOPA), at least one resident in each household must be 55 years of age or older. Some communities apply an 80/20 rule where 80% of occupied units must have at least one resident 55+."
  },
  {
    "q": "What social activities and clubs are available?",
    "a": "Active adult communities typically offer dozens of organized clubs and activities including golf leagues, tennis groups, fitness classes, card and game groups, cultural excursions, seasonal events, and volunteer opportunities. Most have a dedicated activities director."
  },
  {
    "q": "Are grandchildren allowed to visit or stay?",
    "a": "Yes. Grandchildren and family members of any age can visit and stay temporarily. The age restriction applies to permanent residents, not guests. Each community has specific guest stay policies, typically allowing visits of 30-90 days."
  },
  {
    "q": "What recreational facilities are included?",
    "a": "Typical 55+ communities include fitness centers, swimming pools, spa facilities, tennis and pickleball courts, walking trails, and a main clubhouse with meeting rooms, a restaurant or cafe, and event spaces. Some include golf courses."
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
