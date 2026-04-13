'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for homes in Madeira Canyon?",
    "a": "Homes in Madeira Canyon range from approximately $400,000 for established single-family homes to over $1.5 million for custom estate homes on premium mountain-view lots."
  },
  {
    "q": "Is Madeira Canyon guard-gated?",
    "a": "Yes. Madeira Canyon is a guard-gated community with a 24-hour staffed gate and controlled access for the entire community."
  },
  {
    "q": "Does Madeira Canyon have a 55+ section?",
    "a": "Yes. Club M (The Club at Madeira Canyon) is a dedicated 55+ neighborhood within Madeira Canyon with its own clubhouse, pool, and age-restricted living within the broader guard-gated community."
  },
  {
    "q": "What ZIP codes is Madeira Canyon in?",
    "a": "Madeira Canyon spans ZIP codes 89052 and 89044 in the southern Henderson area. Home prices range from $400K–$1.5M+."
  },
  {
    "q": "What amenities does Madeira Canyon have?",
    "a": "The community features a recreation center with resort pool, spa, fitness center, tennis courts, basketball courts, and a community room. An extensive trail system connects to the surrounding McCullough Range foothills."
  },
  {
    "q": "What are HOA fees in Madeira Canyon?",
    "a": "HOA fees typically range from $150 to $400 per month depending on the specific neighborhood, covering guard gate staffing, recreation center operations, pool maintenance, trail system upkeep, and common area maintenance."
  },
  {
    "q": "Who built homes in Madeira Canyon?",
    "a": "Madeira Canyon was primarily developed by Toll Brothers and Focus Property Group. Multiple builders contributed homes across the community's various phases and neighborhoods."
  },
  {
    "q": "What schools serve Madeira Canyon?",
    "a": "Madeira Canyon is served by CCSD schools including Vanderburg Elementary (8/10), Del E. Webb Middle School (7/10), and Coronado High School (6/10). Private options include Henderson International School (A) and Bishop Gorman High School (A+)."
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
    "a": "Most guard-gated communities include perimeter walls, security patrols, surveillance cameras at entry points, and emergency response coordination. Some communities also offer interior patrol routes and resident notification systems. Madeira Canyon features a 24-hour staffed guard gate with controlled vehicle access, security patrols, and perimeter walls."
  }
]

export default function MadeiraCanyonFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Madeira Canyon</h2>
          <p>The questions buyers ask most when exploring Madeira Canyon.</p>
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
