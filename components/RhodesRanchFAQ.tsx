'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for homes in Rhodes Ranch?",
    "a": "Homes in Rhodes Ranch range from approximately $350,000 for well-maintained resale properties to $700,000 for premium golf-course-frontage homes and larger estates. Most homes fall in the $400K to $550K range."
  },
  {
    "q": "Is Rhodes Ranch guard-gated?",
    "a": "Yes. Rhodes Ranch is a fully guard-gated community with 24-hour staffed guard gates and roving security patrols. All residents pass through the guard gate for entry."
  },
  {
    "q": "What golf course is in Rhodes Ranch?",
    "a": "Rhodes Ranch Golf Club features an 18-hole championship course designed by Ted Robinson. The course winds through the community, providing golf course views and frontage for many homes. It is open to residents and the public."
  },
  {
    "q": "What ZIP codes are in Rhodes Ranch?",
    "a": "Rhodes Ranch is located in ZIP codes 89148 and 89113 in southwest Las Vegas. Home prices range from $350K–$700K."
  },
  {
    "q": "What are HOA fees in Rhodes Ranch?",
    "a": "HOA fees in Rhodes Ranch typically range from $150 to $350 per month, covering guard gate staffing, security patrols, community center operations, pool and amenity maintenance, and common area upkeep."
  },
  {
    "q": "How does Rhodes Ranch compare to other golf communities?",
    "a": "Rhodes Ranch offers guard-gated golf community living at significantly lower price points than comparable communities like Red Rock Country Club, Southern Highlands, or Anthem Country Club. It is the best value for gated golf living in the valley."
  },
  {
    "q": "What schools serve Rhodes Ranch?",
    "a": "Rhodes Ranch is served by CCSD schools including Sandra L. Thompson Elementary (7/10) and Canarelli Middle (7/10). Bishop Gorman (A+) and Doral Academy (9/10) are nearby private and charter options."
  },
  {
    "q": "Who built Rhodes Ranch?",
    "a": "Rhodes Ranch was developed by Rhodes Homes beginning in 1997. The 1,350-acre community includes over 4,000 homes from multiple builders, with floor plans ranging from 1,500 to 4,000+ square feet."
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
    "a": "Most guard-gated communities include perimeter walls, security patrols, surveillance cameras at entry points, and emergency response coordination. Some communities also offer interior patrol routes and resident notification systems. Rhodes Ranch features a 24-hour staffed guard gate with controlled vehicle access, security patrols, and perimeter walls."
  }
]

export default function RhodesRanchFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Rhodes Ranch</h2>
          <p>The questions buyers ask most when exploring Rhodes Ranch.</p>
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
