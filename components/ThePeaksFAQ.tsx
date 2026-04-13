'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for homes in The Peaks?",
    "a": "Homes in The Peaks range from approximately $1 million for production luxury residences to over $4 million for custom estates on premium lots with Red Rock Canyon and Strip views."
  },
  {
    "q": "Is The Peaks guard-gated?",
    "a": "Yes. The Peaks is a guard-gated village within Summerlin with 24-hour staffed gates. It is one of only a few guard-gated villages in the master plan."
  },
  {
    "q": "What builders have built in The Peaks?",
    "a": "The Peaks features homes by Toll Brothers, William Lyon Homes (now Taylor Morrison), Shea Homes, and other premier builders. Both production luxury and semi-custom options are available."
  },
  {
    "q": "Is The Peaks new construction?",
    "a": "Yes. The Peaks is one of the newest villages in Summerlin, with construction beginning in 2018. Many neighborhoods still have new homes available or recently completed, offering modern construction, smart-home technology, and current building codes."
  },
  {
    "q": "What ZIP code is The Peaks in?",
    "a": "The Peaks is located in ZIP code 89135 in the Summerlin area of Las Vegas."
  },
  {
    "q": "What are HOA fees in The Peaks?",
    "a": "HOA fees in The Peaks typically range from $300 to $700 per month, which includes the Summerlin master association fee plus the guard-gate sub-association fee. Fees cover gate staffing, security, common area maintenance, and community amenities."
  },
  {
    "q": "What schools serve The Peaks?",
    "a": "The Peaks is served by CCSD schools including Sig Rogich Middle School (10/10 GreatSchools) and Palo Verde High School (8/10). Private options include The Meadows School (A+) and Bishop Gorman High School (A+)."
  },
  {
    "q": "How does The Peaks compare to The Ridges?",
    "a": "The Peaks and The Ridges are both guard-gated luxury villages in Summerlin, but they serve different segments. The Ridges ($2M-$20M+) is ultra-luxury with custom estates. The Peaks ($1M-$4M+) offers new-construction luxury at a more accessible price point with production and semi-custom options."
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

export default function ThePeaksFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About The Peaks</h2>
          <p>The questions buyers ask most when exploring The Peaks.</p>
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
