'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for homes in Solitude at Seven Hills?",
    "a": "Homes in Solitude range from approximately $500,000 for resale homes to $900,000 or more for premium view lots with upgraded finishes and custom-quality construction."
  },
  {
    "q": "Is Solitude guard-gated?",
    "a": "Yes. Solitude is a fully guard-gated community within Seven Hills with a 24-hour staffed guard gate and security patrols. It is one of the most private neighborhoods in Henderson."
  },
  {
    "q": "What is the view like from Solitude?",
    "a": "Solitude sits on elevated terrain providing sweeping panoramic views of the Las Vegas Valley, the Strip skyline, and surrounding mountain ranges. View homes are a primary draw for buyers."
  },
  {
    "q": "What ZIP code is Solitude in?",
    "a": "Solitude at Seven Hills is located in ZIP code 89052 in Henderson."
  },
  {
    "q": "What are HOA fees in Solitude?",
    "a": "HOA fees typically range from $150 to $300 per month, which includes the Seven Hills master association fee plus the Solitude sub-association fee covering guard-gate staffing and private common area maintenance."
  },
  {
    "q": "What schools serve Solitude at Seven Hills?",
    "a": "Solitude is zoned for CCSD schools including Vanderburg Elementary (8/10) and Foothill High School (7/10). Private options include Henderson International School and Bishop Gorman High School (A+)."
  },
  {
    "q": "Who built homes in Solitude?",
    "a": "Solitude was developed primarily by American West Homes starting in 2003. Homes feature semi-custom floor plans from 2,200 to 4,200 square feet with design elements that maximize the elevated terrain."
  },
  {
    "q": "How does Solitude compare to MacDonald Highlands?",
    "a": "Solitude offers guard-gated privacy and valley views at 40–60% below MacDonald Highlands pricing. MacDonald Highlands provides a higher luxury tier with DragonRidge Country Club, but Solitude delivers significant guard-gated value."
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
  }
]

export default function HendersonSolitudeFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Solitude at Seven Hills</h2>
          <p>The questions buyers ask most when exploring Solitude at Seven Hills.</p>
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
