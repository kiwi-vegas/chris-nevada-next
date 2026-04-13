'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for homes in Tournament Hills?",
    "a": "Homes in Tournament Hills range from approximately $800,000 for interior lots to over $2 million for premium estates with direct TPC Summerlin course frontage."
  },
  {
    "q": "Is Tournament Hills guard-gated?",
    "a": "Yes. Tournament Hills is a guard-gated community with a 24-hour staffed guard gate. It is one of four guard-gated enclaves within The Hills South village of Summerlin."
  },
  {
    "q": "What golf course is Tournament Hills on?",
    "a": "Tournament Hills sits directly adjacent to TPC Summerlin, the PGA Tour championship course that hosts the annual Shriners Children's Open each fall."
  },
  {
    "q": "What ZIP code is Tournament Hills in?",
    "a": "Tournament Hills is located in ZIP code 89135 in the Summerlin South area of Las Vegas. Home prices range from $800K–$2M+."
  },
  {
    "q": "Can you watch the Shriners tournament from Tournament Hills?",
    "a": "Yes. Many homes in Tournament Hills, particularly those with direct course frontage, offer views of TPC Summerlin holes where PGA Tour action takes place during the annual Shriners Children's Open."
  },
  {
    "q": "What are HOA fees in Tournament Hills?",
    "a": "HOA fees typically range from $350 to $850 per month, covering the Summerlin master association fee plus the Tournament Hills sub-association fee for guard gate staffing, security, and community maintenance."
  },
  {
    "q": "What schools serve Tournament Hills?",
    "a": "Tournament Hills is zoned for Sig Rogich Middle School (10/10 GreatSchools) and Palo Verde High School (8/10). The Meadows School (A+) and Bishop Gorman (A+) are nearby private options."
  },
  {
    "q": "How does Tournament Hills compare to Canyon Fairways?",
    "a": "Both are guard-gated golf communities along TPC Summerlin. Tournament Hills is in The Hills South (Summerlin South) and Canyon Fairways is in The Canyons (Summerlin North). Both offer similar golf-front living at comparable price points in different Summerlin associations."
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
    "a": "Most guard-gated communities include perimeter walls, security patrols, surveillance cameras at entry points, and emergency response coordination. Some communities also offer interior patrol routes and resident notification systems. Tournament Hills features a 24-hour staffed guard gate with controlled vehicle access, security patrols, and perimeter walls."
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

export default function TournamentHillsFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Tournament Hills</h2>
          <p>The questions buyers ask most when exploring Tournament Hills.</p>
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
