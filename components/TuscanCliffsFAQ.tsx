'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for homes in Tuscan Cliffs?",
    "a": "Homes in Tuscan Cliffs range from approximately $800,000 for resale homes to over $3 million for premium golf course and ridgeline properties with panoramic views."
  },
  {
    "q": "Is Tuscan Cliffs guard-gated?",
    "a": "Yes — Tuscan Cliffs is double guard-gated within the Southern Highlands master plan. The community has its own staffed guard gate, and the broader Southern Highlands community also has guard-gated entry points."
  },
  {
    "q": "What style of homes are in Tuscan Cliffs?",
    "a": "Tuscan Cliffs features predominantly Mediterranean and Tuscan-inspired architecture — stucco exteriors, clay tile roofs, arched entryways, stone accents, and courtyard entries. Homes typically range from 3,000 to 7,000 square feet."
  },
  {
    "q": "What ZIP code is Tuscan Cliffs in?",
    "a": "Tuscan Cliffs is located in ZIP code 89141 in the Southern Highlands area of Las Vegas, Nevada."
  },
  {
    "q": "How does Tuscan Cliffs compare to Olympia Ridge?",
    "a": "Both are guard-gated enclaves within Southern Highlands. Olympia Ridge is more exclusive with higher price points ($1.5M–$5M+) and more direct golf course frontage. Tuscan Cliffs offers a more accessible entry at $800K with the same double guard-gated security and proximity to the golf club."
  },
  {
    "q": "What are HOA fees in Tuscan Cliffs?",
    "a": "HOA fees in Tuscan Cliffs typically range from $250 to $600 per month, which includes the Southern Highlands master association fee plus the Tuscan Cliffs sub-association fee covering guard gate staffing, security, and common area maintenance."
  },
  {
    "q": "Is there a golf course in Tuscan Cliffs?",
    "a": "Tuscan Cliffs is adjacent to the Southern Highlands Golf Club, a private championship course redesigned by Jack Nicklaus. Several Tuscan Cliffs homes have direct golf course views. Membership is available by application."
  },
  {
    "q": "Are there views from Tuscan Cliffs homes?",
    "a": "Yes — Tuscan Cliffs sits on elevated terrain within Southern Highlands. Many homes feature panoramic views of the Las Vegas Valley, the Strip skyline, the Spring Mountains, and the Southern Highlands Golf Club fairways."
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

export default function TuscanCliffsFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Tuscan Cliffs</h2>
          <p>The questions buyers ask most when exploring Tuscan Cliffs.</p>
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
