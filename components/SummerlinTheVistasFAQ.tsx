'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range in The Vistas?",
    "a": "Homes in The Vistas range from approximately $450,000 for single-family homes in the village's core neighborhoods to over $1.5 million for luxury estates in the guard-gated Vineyards enclave."
  },
  {
    "q": "Is The Vistas guard-gated?",
    "a": "The Vistas village as a whole is not guard-gated, but The Vineyards — the luxury enclave within The Vistas — features a 24-hour staffed guard gate and comprehensive security."
  },
  {
    "q": "What is The Vineyards?",
    "a": "The Vineyards is a guard-gated neighborhood within The Vistas featuring custom and semi-custom homes on large lots with mountain views. Homes typically range from $900K to $3M+, with staffed guard-gate security and extensive landscaping."
  },
  {
    "q": "What ZIP code is The Vistas in?",
    "a": "The Vistas is located primarily in ZIP codes 89134 and 89144 in the Summerlin North area of Las Vegas."
  },
  {
    "q": "What schools serve The Vistas?",
    "a": "The Vistas is served by CCSD schools including Bonner Elementary (9/10), Rogich Middle (10/10), and Palo Verde High School (8/10). Private options including The Meadows School (A+) and Bishop Gorman (A+) are nearby."
  },
  {
    "q": "What are HOA fees in The Vistas?",
    "a": "HOA fees in The Vistas range from approximately $100 to $500 per month depending on the neighborhood. The Vineyards has higher fees due to guard-gate staffing and enhanced amenities."
  },
  {
    "q": "Does The Vistas have mountain views?",
    "a": "Yes — The Vistas' western position in Summerlin North provides many homes with views of the Spring Mountains and Red Rock Canyon, particularly in the elevated neighborhoods and The Vineyards enclave."
  },
  {
    "q": "How does The Vistas compare to The Trails?",
    "a": "Both villages offer a wide price range and include guard-gated luxury enclaves. The Vistas features The Vineyards (guard-gated luxury); The Trails features Country Rose Estates (guard-gated custom). Both are excellent established Summerlin North villages."
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
    "a": "Most guard-gated communities include perimeter walls, security patrols, surveillance cameras at entry points, and emergency response coordination. Some communities also offer interior patrol routes and resident notification systems. The Vistas features a 24-hour staffed guard gate with controlled vehicle access, security patrols, and perimeter walls."
  }
]

export default function SummerlinTheVistasFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About The Vistas</h2>
          <p>The questions buyers ask most when exploring The Vistas.</p>
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
