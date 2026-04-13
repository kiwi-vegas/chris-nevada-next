'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the age requirement for Sun City Aliante?",
    "a": "Sun City Aliante is a 55+ age-restricted community. At least one resident in each household must be 55 or older, and no permanent residents may be under 19 years of age."
  },
  {
    "q": "What is the price range for homes in Sun City Aliante?",
    "a": "Homes in Sun City Aliante range from approximately $300,000 for smaller two-bedroom floor plans to $500,000 for larger three-bedroom homes with premium finishes and lot positioning."
  },
  {
    "q": "What amenities does Sun City Aliante have?",
    "a": "Sun City Aliante features a full recreation center with indoor and outdoor pools, fitness center, tennis and pickleball courts, ballroom, arts studios, card rooms, and a full-time activities director. Over 50 clubs and groups are active."
  },
  {
    "q": "Are all homes in Sun City Aliante single-story?",
    "a": "Yes. All homes in Sun City Aliante are single-story with accessible design, as is standard for Del Webb 55+ communities."
  },
  {
    "q": "What are HOA fees in Sun City Aliante?",
    "a": "HOA fees in Sun City Aliante typically range from $100 to $200 per month, covering access to the recreation center, pools, fitness facilities, activities programming, and common area maintenance."
  },
  {
    "q": "Is there golf at Sun City Aliante?",
    "a": "The Aliante Golf Club, an 18-hole Gary Panks-designed championship course, is adjacent to the community. It is a public course that offers preferred rates and tee times for Aliante residents."
  },
  {
    "q": "How does Sun City Aliante compare to Sun City Summerlin?",
    "a": "Both are Del Webb 55+ communities with similar lifestyle programming. Sun City Summerlin is in a premium Summerlin location with higher prices. Sun City Aliante offers comparable amenities at 30–40% lower price points in North Las Vegas."
  },
  {
    "q": "What ZIP code is Sun City Aliante in?",
    "a": "Sun City Aliante is located in ZIP code 89084 in North Las Vegas, Nevada."
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

export default function SunCityAlianteFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Sun City Aliante</h2>
          <p>The questions buyers ask most when exploring Sun City Aliante.</p>
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
