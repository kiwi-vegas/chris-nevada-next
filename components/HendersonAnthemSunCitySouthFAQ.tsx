'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for homes in Sun City Anthem South?",
    "a": "Homes range from approximately $350,000 for well-maintained single-story homes to $600,000 for larger floor plans on premium lots with golf course or mountain views."
  },
  {
    "q": "What is the age requirement for Sun City Anthem South?",
    "a": "Sun City Anthem is a 55+ community. At least one member of each household must be 55 years of age or older. Some homes may allow one occupant under 55."
  },
  {
    "q": "What are HOA fees in Sun City Anthem South?",
    "a": "HOA fees range from $180 to $350 per month, covering all three recreation centers, pools, fitness facilities, clubs, social programming, common area maintenance, and landscaping."
  },
  {
    "q": "What amenities are included?",
    "a": "Sun City Anthem South residents have full access to three recreation centers (100,000+ sq ft total), resort-style pools, fitness centers, tennis and pickleball courts, ballrooms, 100+ clubs, and an extensive trail system."
  },
  {
    "q": "Is there golf at Sun City Anthem?",
    "a": "Yes. The Anthem Course and Revere Golf Club at Anthem offer championship desert golf with mountain views. Residents enjoy preferred tee times and rates."
  },
  {
    "q": "What ZIP codes cover Sun City Anthem South?",
    "a": "Sun City Anthem South spans portions of ZIP codes 89044 and 89052 in Henderson, Nevada. Home prices range from $350K–$600K."
  },
  {
    "q": "How far is Sun City Anthem South from the Strip?",
    "a": "Sun City Anthem South is approximately 25 minutes from the Las Vegas Strip via I-215 and I-15 North."
  },
  {
    "q": "Is Sun City Anthem South a good investment?",
    "a": "Yes. Sun City Anthem consistently ranks among the most desirable 55+ communities in the US. Strong buyer demand, limited inventory, and excellent amenities support long-term property values."
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

export default function HendersonAnthemSunCitySouthFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Sun City Anthem South</h2>
          <p>The questions buyers ask most when exploring Sun City Anthem South.</p>
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
