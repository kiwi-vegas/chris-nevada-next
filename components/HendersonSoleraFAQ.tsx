'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the age requirement for Solera Henderson?",
    "a": "Solera Henderson is a 55+ community. At least one resident in each home must be 55 years of age or older. No permanent residents under the age of 19 are permitted."
  },
  {
    "q": "What is the price range in Solera Henderson?",
    "a": "Homes in Solera Henderson range from approximately $350,000 for smaller floor plans to $550,000 for larger homes with premium lots and upgraded finishes."
  },
  {
    "q": "Is Solera Henderson guard-gated?",
    "a": "Yes. Solera Henderson is a guard-gated community with controlled access. All visitors must be registered and cleared through the gate."
  },
  {
    "q": "What amenities does Solera Henderson offer?",
    "a": "Solera Henderson features a community clubhouse with resort-style pool and spa, fitness center, ballroom, library, arts and crafts studios, card rooms, walking trails, and an active social calendar with clubs and events."
  },
  {
    "q": "Who built Solera Henderson?",
    "a": "Solera Henderson was built by Del Webb, the nation's leading active adult community developer. All homes are single-story construction designed for open living and accessibility."
  },
  {
    "q": "What are HOA fees in Solera Henderson?",
    "a": "HOA fees in Solera Henderson range from approximately $150 to $275 per month, covering guard gate staffing, clubhouse operations, pool maintenance, common area upkeep, and social programming."
  },
  {
    "q": "How does Solera compare to Sun City Anthem?",
    "a": "Solera Henderson is a smaller, more intimate community (~1,200 homes vs 7,000+) with a lower price point. Sun City Anthem offers more amenities including golf courses, but Solera delivers a more personal community experience with lower HOA fees."
  },
  {
    "q": "What ZIP code is Solera Henderson in?",
    "a": "Solera Henderson is in ZIP code 89052 in Henderson, Nevada."
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

export default function HendersonSoleraFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Solera Henderson</h2>
          <p>The questions buyers ask most when exploring Solera Henderson.</p>
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
