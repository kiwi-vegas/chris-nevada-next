'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for homes in Canyon Fairways?",
    "a": "Homes in Canyon Fairways range from approximately $800,000 for interior lots to $3 million for premium estates with direct TPC Summerlin course frontage."
  },
  {
    "q": "Is Canyon Fairways guard-gated?",
    "a": "Yes. Canyon Fairways is a guard-gated community with a 24-hour staffed guard gate. It is one of several guard-gated enclaves within The Canyons village of Summerlin North."
  },
  {
    "q": "What golf course is Canyon Fairways on?",
    "a": "Canyon Fairways homes sit along the fairways of TPC Summerlin, a PGA Tour championship course that hosts the annual Shriners Children's Open. TPC Summerlin is a private club with membership available independently."
  },
  {
    "q": "What ZIP code is Canyon Fairways in?",
    "a": "Canyon Fairways is located in ZIP code 89134 in the Summerlin North area of Las Vegas."
  },
  {
    "q": "What are HOA fees in Canyon Fairways?",
    "a": "HOA fees typically range from $350 to $850 per month, covering the Summerlin master association fee plus the Canyon Fairways sub-association fee for guard gate staffing, security, and enhanced community maintenance."
  },
  {
    "q": "What schools serve Canyon Fairways?",
    "a": "Canyon Fairways is zoned for CCSD schools including Sig Rogich Middle School (10/10 GreatSchools) and Palo Verde High School (8/10). The Meadows School (A+) and Bishop Gorman High School (A+) are nearby private options."
  },
  {
    "q": "Is TPC Summerlin membership required?",
    "a": "No. TPC Summerlin membership is not required for Canyon Fairways homeownership. Residents enjoy the aesthetic and lifestyle benefits of course-front living and can pursue membership independently."
  },
  {
    "q": "How does Canyon Fairways compare to Tournament Hills?",
    "a": "Both are guard-gated golf communities in Summerlin. Canyon Fairways is in The Canyons village (Summerlin North) while Tournament Hills is in The Hills South. Both sit along TPC Summerlin but on different sections of the course. Prices are comparable."
  },
  {
    "q": "How does the guard gate entry process work?",
    "a": "Residents receive transponders or access codes for automatic entry. Guests must be called in by the homeowner or added to a pre-approved list. Delivery drivers and service providers follow the community's vendor access policy. Most guard-gated communities staff the gate 24 hours a day, 7 days a week."
  },
  {
    "q": "Can non-residents access the community for viewings?",
    "a": "Yes. Prospective buyers can access the community with a licensed real estate agent who coordinates entry with the guard gate in advance. Nevada Real Estate Group handles all gate access arrangements for property showings."
  },
  {
    "q": "What security features are included beyond the guard gate?",
    "a": "Most guard-gated communities include perimeter walls, security patrols, surveillance cameras at entry points, and emergency response coordination. Some communities also offer interior patrol routes and resident notification systems."
  },
  {
    "q": "Are there custom home lot opportunities?",
    "a": "Some luxury communities offer vacant lots for custom home construction. Lot sizes, architectural guidelines, and approved builders vary by community. Nevada Real Estate Group can help identify available custom lot inventory and connect you with approved builders."
  },
  {
    "q": "What is the resale value trend for luxury homes in this area?",
    "a": "Luxury properties in guard-gated and premium communities have historically outperformed the broader market in terms of value retention during downturns and appreciation during growth periods. Limited supply in guard-gated communities creates structural price support."
  }
]

export default function CanyonFairwaysFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Canyon Fairways</h2>
          <p>The questions buyers ask most when exploring Canyon Fairways.</p>
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
