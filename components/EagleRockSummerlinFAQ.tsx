'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for homes in Eagle Rock?",
    "a": "Homes in Eagle Rock range from approximately $1 million for semi-custom homes to over $4 million for premium custom estates on elevated lots with panoramic mountain and valley views."
  },
  {
    "q": "Is Eagle Rock guard-gated?",
    "a": "Yes. Eagle Rock is a guard-gated community with a 24-hour staffed guard gate. Approximately 180 homes across 95 acres provide an exclusive, low-density residential environment."
  },
  {
    "q": "What village is Eagle Rock in?",
    "a": "Eagle Rock is located within The Canyons village of the Summerlin North Association. The Canyons is home to several guard-gated luxury enclaves."
  },
  {
    "q": "What ZIP code is Eagle Rock in?",
    "a": "Eagle Rock is located in ZIP code 89144 in the Summerlin North area of Las Vegas."
  },
  {
    "q": "How does Eagle Rock compare to Bellacere?",
    "a": "Both are guard-gated luxury communities in The Canyons. Bellacere starts at $1.5M and reaches $5M+ with the largest custom estates. Eagle Rock starts at $1M and extends to $4M+, offering a slightly more accessible entry point with comparable views and security."
  },
  {
    "q": "What are HOA fees in Eagle Rock?",
    "a": "HOA fees typically range from $400 to $900 per month, covering the Summerlin master association fee plus the Eagle Rock sub-association fee for guard gate staffing, security patrols, and enhanced maintenance."
  },
  {
    "q": "What schools serve Eagle Rock?",
    "a": "Eagle Rock is zoned for CCSD schools including Sig Rogich Middle School (10/10 GreatSchools) and Palo Verde High School (8/10). The Meadows School (A+) and Bishop Gorman High School (A+) are nearby private options."
  },
  {
    "q": "How large are homes in Eagle Rock?",
    "a": "Custom and semi-custom homes in Eagle Rock range from 3,500 to over 8,000 square feet, with 4–6 bedrooms, gourmet kitchens, wine cellars, home theaters, and resort-style outdoor living areas."
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

export default function EagleRockSummerlinFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Eagle Rock</h2>
          <p>The questions buyers ask most when exploring Eagle Rock.</p>
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
