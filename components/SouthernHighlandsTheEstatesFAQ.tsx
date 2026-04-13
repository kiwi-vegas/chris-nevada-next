'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for homes in The Estates at Southern Highlands?",
    "a": "Custom estates in The Estates range from approximately $2 million for older resale homes to over $10 million for new-build custom estates on premium golf course lots with panoramic mountain views."
  },
  {
    "q": "Is The Estates at Southern Highlands guard-gated?",
    "a": "Yes — The Estates is double guard-gated. Residents pass through the main Southern Highlands community guard gate and then a second private guard gate to enter The Estates. Both gates are staffed 24 hours a day."
  },
  {
    "q": "What ZIP code is The Estates at Southern Highlands in?",
    "a": "The Estates at Southern Highlands is located in ZIP code 89141 in the southernmost area of Las Vegas, Nevada."
  },
  {
    "q": "What golf course is near The Estates?",
    "a": "The Estates sits directly along the Southern Highlands Golf Club, a private championship course redesigned by Jack Nicklaus. Many estate lots have direct golf course frontage. Membership is by application and is not automatically included with home purchase."
  },
  {
    "q": "How does The Estates compare to The Ridges in Summerlin?",
    "a": "Both are ultra-luxury guard-gated communities with golf course frontage. The Ridges is anchored by Bear's Best (Nicklaus design) and backs against Red Rock Canyon, while The Estates fronts the Southern Highlands Golf Club and is 15 minutes from the airport. The Ridges typically commands higher per-square-foot prices, but The Estates offers larger lots and more competitive pricing for comparable square footage."
  },
  {
    "q": "What are HOA fees in The Estates?",
    "a": "HOA fees in The Estates typically range from $350 to $900 per month, which includes the Southern Highlands master association fee plus The Estates sub-association fee. Fees cover guard gate staffing, security patrols, common area maintenance, and landscaping of common areas."
  },
  {
    "q": "How close is The Estates to the airport?",
    "a": "Harry Reid International Airport is approximately 15 minutes from The Estates via I-15, making it the closest ultra-luxury community to the airport in Las Vegas. This proximity is a primary draw for executives and frequent travelers."
  },
  {
    "q": "Can I build a custom home in The Estates?",
    "a": "Yes — The Estates permits custom home construction on approved lots. Architectural plans must be reviewed and approved by the HOA architectural review committee to ensure compliance with community design standards. Several luxury builders, including Sun West Custom Homes, have built in The Estates."
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

export default function SouthernHighlandsTheEstatesFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About The Estates at Southern Highlands</h2>
          <p>The questions buyers ask most when exploring The Estates at Southern Highlands.</p>
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
