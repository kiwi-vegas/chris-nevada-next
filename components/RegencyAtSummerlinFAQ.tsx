'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the age requirement for Regency at Summerlin?",
    "a": "Regency at Summerlin is a 55+ community. At least one resident in each home must be 55 years of age or older. No residents under 19 are permitted as permanent residents, per HUD guidelines for age-restricted communities."
  },
  {
    "q": "What is the price range for homes in Regency at Summerlin?",
    "a": "Homes in Regency at Summerlin range from approximately $500,000 for attached villas to over $800,000 for larger single-family homes on premium lots with mountain views."
  },
  {
    "q": "Is Regency at Summerlin guard-gated?",
    "a": "Yes. Regency at Summerlin is a fully guard-gated community with a 24-hour staffed gate and private streets, providing security and privacy for residents."
  },
  {
    "q": "Who built homes in Regency at Summerlin?",
    "a": "All homes in Regency at Summerlin were built by Toll Brothers, nationally recognized as America's luxury homebuilder. Toll Brothers offers multiple floor plan collections with semi-custom options."
  },
  {
    "q": "What amenities does Regency at Summerlin have?",
    "a": "The private clubhouse features a resort-style pool and spa, fitness center, movement studio, demonstration kitchen, game rooms, bocce ball court, putting green, outdoor fire pit terraces, and community gardens."
  },
  {
    "q": "What are HOA fees in Regency at Summerlin?",
    "a": "HOA fees typically range from $250 to $500 per month, covering guard gate staffing, clubhouse operations, pool and fitness center maintenance, landscaping, and the Summerlin master association fee."
  },
  {
    "q": "How does Regency compare to Sun City Summerlin?",
    "a": "Regency at Summerlin is a smaller, guard-gated luxury 55+ community built by Toll Brothers, while Sun City Summerlin is a much larger Del Webb community with 7,000+ homes. Regency offers newer construction, higher-end finishes, and guard-gated security at a higher price point."
  },
  {
    "q": "What ZIP code is Regency at Summerlin in?",
    "a": "Regency at Summerlin is located in ZIP code 89135 in the Summerlin South area of Las Vegas. Home prices range from $500K–$800K+."
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
    "a": "Most guard-gated communities include perimeter walls, security patrols, surveillance cameras at entry points, and emergency response coordination. Some communities also offer interior patrol routes and resident notification systems. Regency at Summerlin features a 24-hour staffed guard gate with controlled vehicle access, security patrols, and perimeter walls."
  }
]

export default function RegencyAtSummerlinFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Regency at Summerlin</h2>
          <p>The questions buyers ask most when exploring Regency at Summerlin.</p>
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
