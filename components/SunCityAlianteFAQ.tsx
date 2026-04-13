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
