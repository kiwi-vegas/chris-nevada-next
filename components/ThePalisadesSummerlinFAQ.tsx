'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for homes in The Palisades?",
    "a": "Homes in The Palisades range from approximately $1 million for semi-custom homes to $4 million for premium custom estates on elevated lots with panoramic Red Rock Canyon views."
  },
  {
    "q": "Is The Palisades guard-gated?",
    "a": "Yes. The Palisades is a guard-gated community with a 24-hour staffed guard gate. Approximately 160 homes across 90 acres create a low-density, private environment."
  },
  {
    "q": "What village is The Palisades in?",
    "a": "The Palisades is located within The Canyons village of the Summerlin North Association, alongside other guard-gated enclaves like Bellacere, Eagle Rock, and Aventura."
  },
  {
    "q": "What ZIP code is The Palisades in?",
    "a": "The Palisades is located in ZIP code 89144 in the Summerlin North area of Las Vegas."
  },
  {
    "q": "What views do homes in The Palisades have?",
    "a": "The Palisades features elevated, west-facing lots with sweeping views of Red Rock Canyon and the Spring Mountains. Northern lots also capture Las Vegas Valley views. The sunset views are among the best in Summerlin."
  },
  {
    "q": "What are HOA fees in The Palisades?",
    "a": "HOA fees typically range from $400 to $900 per month, covering the Summerlin master association fee plus the Palisades sub-association fee for guard gate staffing, security patrols, and community maintenance."
  },
  {
    "q": "What schools serve The Palisades?",
    "a": "The Palisades is zoned for CCSD schools including Sig Rogich Middle School (10/10 GreatSchools) and Palo Verde High School (8/10). Private options include The Meadows School (A+) and Bishop Gorman High School (A+)."
  },
  {
    "q": "How does The Palisades compare to Eagle Rock?",
    "a": "Both are guard-gated luxury communities in The Canyons with similar price ranges ($1M–$4M). The Palisades is known for its west-facing sunset views, while Eagle Rock offers a slightly different view orientation. Both deliver comparable quality and exclusivity."
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

export default function ThePalisadesSummerlinFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About The Palisades</h2>
          <p>The questions buyers ask most when exploring The Palisades.</p>
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
