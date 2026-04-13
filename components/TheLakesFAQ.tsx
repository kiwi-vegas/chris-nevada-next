'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for homes in The Lakes?",
    "a": "Homes in The Lakes range from approximately $400,000 for townhomes and interior-lot single-family homes to $1.2 million or more for premium lakefront properties. Canyon Gate Country Club homes within the area can exceed this range."
  },
  {
    "q": "Does The Lakes have a real lake?",
    "a": "Yes. The Lakes features an approximately 30-acre man-made lake that serves as the community centerpiece. Residents enjoy waterfront walking trails, fishing, and scenic lake views — a rare amenity in the Las Vegas desert."
  },
  {
    "q": "What ZIP codes are in The Lakes?",
    "a": "The Lakes is located in ZIP codes 89117 and 89128 in central-west Las Vegas."
  },
  {
    "q": "What is Canyon Gate Country Club?",
    "a": "Canyon Gate is a guard-gated golf community within The Lakes area. It features a Ted Robinson-designed golf course, resort-style amenities, and luxury homes. It adds a premium tier to The Lakes' housing inventory."
  },
  {
    "q": "What are HOA fees in The Lakes?",
    "a": "HOA fees in The Lakes typically range from $75 to $250 per month, depending on the specific section. Canyon Gate Country Club homes have higher fees that include guard gate staffing and golf amenities."
  },
  {
    "q": "How far is The Lakes from the Strip?",
    "a": "The Lakes is approximately 15 minutes from the Las Vegas Strip via Flamingo Road or Sahara Avenue. Downtown Summerlin is just 10 minutes away."
  },
  {
    "q": "What schools serve The Lakes?",
    "a": "The Lakes is served by CCSD schools including Helen Jydstrup Elementary (7/10) and Palo Verde High School (7/10). Private options include The Meadows School (A+) and Bishop Gorman (A+). Doral Academy Red Rock (9/10) is a top charter."
  },
  {
    "q": "When was The Lakes built?",
    "a": "The Lakes was developed beginning in the late 1980s by the Collins Brothers. Most homes were built from the late 1980s through the early 2000s, giving the community mature landscaping and established neighborhood character."
  }
]

export default function TheLakesFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About The Lakes</h2>
          <p>The questions buyers ask most when exploring The Lakes.</p>
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
