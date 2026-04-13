'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for homes in Bellacere?",
    "a": "Homes in Bellacere range from approximately $1.5 million for semi-custom homes to over $5 million for premium custom estates on elevated lots with panoramic mountain views."
  },
  {
    "q": "Is Bellacere guard-gated?",
    "a": "Yes. Bellacere is a fully guard-gated community with a 24-hour staffed guard gate. With only approximately 120 homes across 85 acres, it is one of the most exclusive enclaves in Summerlin."
  },
  {
    "q": "What village is Bellacere in?",
    "a": "Bellacere is located within The Canyons village of the Summerlin North Association. The Canyons is known for its concentration of guard-gated luxury communities."
  },
  {
    "q": "What ZIP code is Bellacere in?",
    "a": "Bellacere is located in ZIP code 89144 in the Summerlin North area of Las Vegas. Home prices range from $1.5M–$5M+."
  },
  {
    "q": "How does Bellacere compare to The Ridges?",
    "a": "Both are guard-gated luxury communities in Summerlin. The Ridges offers prices from $2M to $20M+ with Bear's Best golf. Bellacere is more intimate (~120 homes vs. 800+) with a slightly lower entry point at $1.5M, but comparable quality at the top end."
  },
  {
    "q": "What are HOA fees in Bellacere?",
    "a": "HOA fees in Bellacere typically range from $500 to $1,000 per month, covering the Summerlin master association fee plus the Bellacere sub-association fee for guard gate staffing, security patrols, and community maintenance."
  },
  {
    "q": "How large are homes in Bellacere?",
    "a": "Custom and semi-custom estates in Bellacere range from approximately 4,000 to over 10,000 square feet, with 4–7 bedrooms, gourmet kitchens, wine rooms, home theaters, and resort-style outdoor living."
  },
  {
    "q": "What schools serve Bellacere?",
    "a": "Bellacere is zoned for CCSD schools including Sig Rogich Middle School (10/10 GreatSchools) and Palo Verde High School (8/10). Private options include The Meadows School (A+) and Bishop Gorman High School (A+)."
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
    "a": "Most guard-gated communities include perimeter walls, security patrols, surveillance cameras at entry points, and emergency response coordination. Some communities also offer interior patrol routes and resident notification systems. Bellacere features a 24-hour staffed guard gate with controlled vehicle access, security patrols, and perimeter walls."
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

export default function BellacereFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Bellacere</h2>
          <p>The questions buyers ask most when exploring Bellacere.</p>
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
