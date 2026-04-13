'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for homes in Aventura?",
    "a": "Homes in Aventura range from approximately $800,000 for well-maintained resale homes to over $3 million for premium estates on elevated lots with Red Rock Canyon views."
  },
  {
    "q": "Is Aventura guard-gated?",
    "a": "Yes. Aventura is a guard-gated community within The Canyons village of Summerlin North. A 24-hour staffed guard gate controls access, and security patrols monitor the community."
  },
  {
    "q": "What village is Aventura in?",
    "a": "Aventura is located within The Canyons village of the Summerlin North Association. The Canyons is known for its concentration of guard-gated luxury enclaves."
  },
  {
    "q": "What ZIP code is Aventura in?",
    "a": "Aventura is located in ZIP code 89144 in the Summerlin North area of Las Vegas. Home prices range from $800K–$3M+."
  },
  {
    "q": "What schools serve Aventura?",
    "a": "Aventura is zoned for CCSD schools including Sig Rogich Middle School (10/10 GreatSchools) and Palo Verde High School (8/10). Private options include The Meadows School (A+) and Bishop Gorman High School (A+)."
  },
  {
    "q": "What are HOA fees in Aventura?",
    "a": "HOA fees in Aventura typically range from $300 to $800 per month, covering the Summerlin master association fee plus the Aventura sub-association fee for guard gate staffing, security patrols, and community maintenance."
  },
  {
    "q": "How does Aventura compare to The Ridges?",
    "a": "The Ridges is Summerlin's ultra-luxury community with prices from $2M to $20M+. Aventura offers guard-gated luxury at a significantly lower entry point (from $800K) while sharing many of the same benefits — mountain views, privacy, and the Summerlin address."
  },
  {
    "q": "How large are homes in Aventura?",
    "a": "Homes in Aventura typically range from 2,800 to 6,000+ square feet, featuring 3–6 bedrooms, gourmet kitchens, resort-style backyards, and multi-car garages."
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
    "a": "Most guard-gated communities include perimeter walls, security patrols, surveillance cameras at entry points, and emergency response coordination. Some communities also offer interior patrol routes and resident notification systems. Aventura features a 24-hour staffed guard gate with controlled vehicle access, security patrols, and perimeter walls."
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

export default function AventuraSummerlinFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Aventura</h2>
          <p>The questions buyers ask most when exploring Aventura.</p>
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
