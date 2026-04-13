'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for homes in Mesa Ridge?",
    "a": "Homes in Mesa Ridge range from approximately $1 million for resale homes in the Classic Collection to over $3 million for premium estate-style homes on view lots with Red Rock Canyon panoramas."
  },
  {
    "q": "Is Mesa Ridge guard-gated?",
    "a": "Yes. Mesa Ridge is a fully guard-gated community with a 24-hour staffed guard gate, private streets, and security patrols throughout the neighborhood."
  },
  {
    "q": "Who built homes in Mesa Ridge?",
    "a": "All homes in Mesa Ridge were built by Toll Brothers, nationally recognized as America's luxury homebuilder. Toll Brothers offers semi-custom options with premium finishes and design flexibility."
  },
  {
    "q": "What ZIP code is Mesa Ridge in?",
    "a": "Mesa Ridge is located in ZIP code 89135 in the Summerlin South area of Las Vegas."
  },
  {
    "q": "What are HOA fees in Mesa Ridge?",
    "a": "HOA fees in Mesa Ridge typically range from $350 to $700 per month, which includes the Summerlin master association fee plus the Mesa Ridge guard-gated sub-association fee covering guard gate staffing, security, and common area maintenance."
  },
  {
    "q": "How does Mesa Ridge compare to The Ridges?",
    "a": "Mesa Ridge offers guard-gated luxury in Summerlin at a more accessible price point than The Ridges. While The Ridges starts at $2 million and features custom estates, Mesa Ridge provides luxury living from $1 million with Toll Brothers semi-custom construction."
  },
  {
    "q": "What schools serve Mesa Ridge?",
    "a": "Mesa Ridge is served by CCSD schools including Bonner Elementary (9/10), Sig Rogich Middle School (10/10), and Palo Verde High School (8/10). Private options include The Meadows School (A+) and Bishop Gorman High School (A+)."
  },
  {
    "q": "Are there mountain views in Mesa Ridge?",
    "a": "Yes. Many homesites in Mesa Ridge offer views of Red Rock Canyon and the Spring Mountains, particularly lots along the western edge of the community. The community is approximately 10 minutes from the Red Rock Canyon scenic loop."
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

export default function MesaRidgeFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Mesa Ridge</h2>
          <p>The questions buyers ask most when exploring Mesa Ridge.</p>
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
