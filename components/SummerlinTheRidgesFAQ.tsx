'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for homes in The Ridges?",
    "a": "Homes in The Ridges range from approximately $2 million for resale semi-custom homes to over $20 million for new-build custom estates on premium lots with unobstructed Red Rock Canyon views."
  },
  {
    "q": "Is The Ridges guard-gated?",
    "a": "Yes. The Ridges is a fully guard-gated community with a 24-hour staffed guard gate and comprehensive security patrols. It is one of the most secure residential communities in Nevada."
  },
  {
    "q": "What ZIP code is The Ridges in?",
    "a": "The Ridges is located in ZIP code 89135 in the Summerlin South area of Las Vegas. Home prices range from $2M–$20M+."
  },
  {
    "q": "What golf course is in The Ridges?",
    "a": "Bear's Best Las Vegas is a Jack Nicklaus-designed 18-hole championship course located within The Ridges. It features replicas of 18 of the greatest holes Nicklaus has ever designed."
  },
  {
    "q": "What are HOA fees in The Ridges?",
    "a": "HOA fees in The Ridges typically range from $500 to $1,200 per month, which includes the master Summerlin association fee plus The Ridges sub-association fee. Fees cover guard gate staffing, security patrols, common area maintenance, and community amenities."
  },
  {
    "q": "What schools serve The Ridges?",
    "a": "The Ridges is served by CCSD schools including Sig Rogich Middle School (10/10 GreatSchools) and Palo Verde High School (8/10). Private options include The Meadows School (A+) and Bishop Gorman High School (A+)."
  },
  {
    "q": "Is The Ridges in Las Vegas or Henderson?",
    "a": "The Ridges is located in Summerlin, which is part of the City of Las Vegas and unincorporated Clark County. It is not part of Henderson."
  },
  {
    "q": "Who built homes in The Ridges?",
    "a": "The Ridges was master-developed by the Howard Hughes Corporation. Homes include both semi-custom builds by national builders and full custom estates by private architects and luxury builders like Blue Heron, Sun West Custom Homes, and others."
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
    "a": "Most guard-gated communities include perimeter walls, security patrols, surveillance cameras at entry points, and emergency response coordination. Some communities also offer interior patrol routes and resident notification systems. The Ridges features a 24-hour staffed guard gate with controlled vehicle access, security patrols, and perimeter walls."
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

export default function SummerlinTheRidgesFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About The Ridges</h2>
          <p>The questions buyers ask most when exploring The Ridges.</p>
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
