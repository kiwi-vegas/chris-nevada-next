'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for homes in Country Club Hills?",
    "a": "Homes in Country Club Hills range from approximately $900,000 for interior semi-custom homes to over $3 million for premium custom estates with direct TPC Summerlin golf course frontage."
  },
  {
    "q": "Is Country Club Hills guard-gated?",
    "a": "Yes. Country Club Hills is a guard-gated community with a 24-hour staffed guard gate. It is the most exclusive of the four guard-gated enclaves within The Hills South village."
  },
  {
    "q": "What golf course is near Country Club Hills?",
    "a": "Country Club Hills sits adjacent to TPC Summerlin, the PGA Tour championship course that hosts the annual Shriners Children's Open. Membership is separate from homeownership."
  },
  {
    "q": "What ZIP code is Country Club Hills in?",
    "a": "Country Club Hills is located in ZIP code 89135 in the Summerlin South area of Las Vegas. Home prices range from $900K–$3M+."
  },
  {
    "q": "What are HOA fees in Country Club Hills?",
    "a": "HOA fees typically range from $400 to $950 per month, covering the Summerlin master association fee plus the Country Club Hills sub-association fee for guard gate staffing, security, and enhanced maintenance."
  },
  {
    "q": "What schools serve Country Club Hills?",
    "a": "Country Club Hills is zoned for Sig Rogich Middle School (10/10 GreatSchools) and Palo Verde High School (8/10). The Meadows School (A+) and Bishop Gorman High School (A+) are nearby."
  },
  {
    "q": "How does Country Club Hills compare to Tournament Hills?",
    "a": "Both are guard-gated communities in The Hills South near TPC Summerlin. Country Club Hills tends to have larger estates and a higher price ceiling ($900K–$3M+ vs. $800K–$2M+). Tournament Hills offers more direct course frontage on different holes."
  },
  {
    "q": "How does Country Club Hills compare to Canyon Fairways?",
    "a": "Both are guard-gated golf communities near TPC Summerlin. Country Club Hills is in The Hills South (Summerlin South) while Canyon Fairways is in The Canyons (Summerlin North). Both offer course-adjacent living at similar price ranges."
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
    "a": "Most guard-gated communities include perimeter walls, security patrols, surveillance cameras at entry points, and emergency response coordination. Some communities also offer interior patrol routes and resident notification systems. Country Club Hills features a 24-hour staffed guard gate with controlled vehicle access, security patrols, and perimeter walls."
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

export default function CountryClubHillsSummerlinFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Country Club Hills</h2>
          <p>The questions buyers ask most when exploring Country Club Hills.</p>
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
