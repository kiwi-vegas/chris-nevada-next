'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What guard-gated communities are in The Hills South?",
    "a": "The Hills South contains four separate guard-gated enclaves: Country Club Hills, Eagle Hills, Corte Bella, and Tournament Hills. Each has its own 24-hour staffed guard gate and distinct architectural character."
  },
  {
    "q": "What is the price range in The Hills South?",
    "a": "Homes in The Hills South range from approximately $600,000 in non-gated neighborhoods and Corte Bella to over $3 million in Country Club Hills and Tournament Hills for premium golf course and estate properties."
  },
  {
    "q": "Is Tournament Hills near TPC Summerlin?",
    "a": "Yes — Tournament Hills is guard-gated and sits directly adjacent to TPC Summerlin, the PGA Tour championship course that hosts the annual Shriners Children's Open. Several homes have direct course frontage."
  },
  {
    "q": "What ZIP code is The Hills South in?",
    "a": "The Hills South is located primarily in ZIP code 89135 in the Summerlin South area of Las Vegas."
  },
  {
    "q": "How does The Hills South compare to The Ridges?",
    "a": "The Ridges is Summerlin's most exclusive community with prices from $2M to $20M+. The Hills South offers guard-gated luxury at significantly lower entry points (from $600K) while still providing excellent security, school zoning, and central Summerlin location."
  },
  {
    "q": "What schools serve The Hills South?",
    "a": "The Hills South is zoned for top-performing CCSD schools including Sig Rogich Middle (10/10 GreatSchools) and Palo Verde High School (8/10). Private options include The Meadows School (A+) and Bishop Gorman High School (A+) nearby."
  },
  {
    "q": "What are HOA fees in The Hills South?",
    "a": "HOA fees vary by neighborhood. Non-gated areas typically pay $200–$350/month. Guard-gated enclaves range from $400 to $800/month, which includes the master Summerlin association fee plus sub-association fees for guard gate staffing and enhanced maintenance."
  },
  {
    "q": "Is The Hills South in Summerlin North or South?",
    "a": "The Hills South is part of the Summerlin South Association, located in the central-southern portion of the Summerlin master plan. It is distinct from The Hills (Summerlin North) village."
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

export default function SummerlinTheHillsSouthFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About The Hills South</h2>
          <p>The questions buyers ask most when exploring The Hills South.</p>
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
