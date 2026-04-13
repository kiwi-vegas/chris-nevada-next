'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for homes in Mira Villa?",
    "a": "Homes in Mira Villa range from approximately $1 million for the Signature Collection to $2.2 million or more for Grand Estate Collection homes on premium view lots."
  },
  {
    "q": "Is Mira Villa guard-gated?",
    "a": "Yes. Mira Villa is a guard-gated community with a 24-hour staffed gate and private streets within the Summerlin master plan."
  },
  {
    "q": "Who builds homes in Mira Villa?",
    "a": "Homes in Mira Villa are built by Taylor Morrison (which acquired William Lyon Homes). Taylor Morrison is a nationally recognized luxury homebuilder offering semi-custom options."
  },
  {
    "q": "What ZIP code is Mira Villa in?",
    "a": "Mira Villa is located in ZIP code 89135 in the Summerlin South area of Las Vegas. Home prices range from $1M–$2.2M."
  },
  {
    "q": "What are HOA fees in Mira Villa?",
    "a": "HOA fees typically range from $350 to $650 per month, covering guard gate staffing, security patrols, common area maintenance, and the Summerlin master association fee."
  },
  {
    "q": "How does Mira Villa compare to Mesa Ridge?",
    "a": "Both are guard-gated luxury communities in Summerlin. Mira Villa offers newer construction by Taylor Morrison in a similar price range ($1M–$2.2M). Mesa Ridge was built by Toll Brothers at $1M–$3M+ with slightly larger estate options."
  },
  {
    "q": "Do Mira Villa homes have casitas?",
    "a": "Yes. Many Mira Villa floor plans offer optional casitas, providing flexible space for guests, extended family, home offices, or creative studios."
  },
  {
    "q": "What schools serve Mira Villa?",
    "a": "Mira Villa is served by CCSD schools including Bonner Elementary (9/10), Sig Rogich Middle School (10/10), and Palo Verde High School (8/10). Private options include The Meadows School (A+) and Bishop Gorman High School (A+)."
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
    "a": "Most guard-gated communities include perimeter walls, security patrols, surveillance cameras at entry points, and emergency response coordination. Some communities also offer interior patrol routes and resident notification systems. Mira Villa features a 24-hour staffed guard gate with controlled vehicle access, security patrols, and perimeter walls."
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

export default function MiraVillaFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Mira Villa</h2>
          <p>The questions buyers ask most when exploring Mira Villa.</p>
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
