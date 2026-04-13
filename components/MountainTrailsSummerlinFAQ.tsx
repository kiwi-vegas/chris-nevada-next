'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for homes in Mountain Trails?",
    "a": "Homes in Mountain Trails range from approximately $1 million for semi-custom homes to over $5 million for premium custom estates on the highest elevation lots with panoramic views."
  },
  {
    "q": "Is Mountain Trails guard-gated?",
    "a": "Yes. Mountain Trails is a guard-gated community with a 24-hour staffed guard gate. It is the only guard-gated enclave within The Hills village of Summerlin North."
  },
  {
    "q": "What village is Mountain Trails in?",
    "a": "Mountain Trails is located within The Hills village of the Summerlin North Association. It is the village's premier guard-gated enclave."
  },
  {
    "q": "What ZIP code is Mountain Trails in?",
    "a": "Mountain Trails is located in ZIP code 89134 in the Summerlin North area of Las Vegas."
  },
  {
    "q": "What views do Mountain Trails homes have?",
    "a": "Mountain Trails occupies elevated terrain with multi-directional views — Red Rock Canyon and the Spring Mountains to the west, the Las Vegas Strip and valley to the southeast, and the Sheep Range to the north."
  },
  {
    "q": "What are HOA fees in Mountain Trails?",
    "a": "HOA fees typically range from $400 to $1,000 per month, covering the Summerlin master association fee plus the Mountain Trails sub-association fee for guard gate staffing, security patrols, and community maintenance."
  },
  {
    "q": "What schools serve Mountain Trails?",
    "a": "Mountain Trails is zoned for top CCSD schools including Sig Rogich Middle School (10/10 GreatSchools) and Palo Verde High School (8/10). The Meadows School (A+) and Bishop Gorman High School (A+) are nearby."
  },
  {
    "q": "How does Mountain Trails compare to The Ridges?",
    "a": "The Ridges ($2M–$20M+) is Summerlin's ultra-luxury flagship with Bear's Best golf. Mountain Trails ($1M–$5M+) offers guard-gated luxury at a lower entry point with comparable views, established character, and strong Summerlin North school zoning."
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

export default function MountainTrailsSummerlinFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Mountain Trails</h2>
          <p>The questions buyers ask most when exploring Mountain Trails.</p>
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
