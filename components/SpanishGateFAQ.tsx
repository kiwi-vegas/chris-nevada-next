'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range in Spanish Gate?",
    "a": "Homes in Spanish Gate range from approximately $500,000 for original-condition homes to around $900,000 for fully updated homes on premium lots."
  },
  {
    "q": "Is Spanish Gate guard-gated?",
    "a": "Yes. Spanish Gate has a 24-hour staffed guard gate with controlled access for resident security and privacy."
  },
  {
    "q": "What are HOA fees in Spanish Gate?",
    "a": "HOA fees typically range from $150 to $350 per month — among the lowest of any guard-gated community in the Las Vegas Valley. Fees cover guard gate staffing, security, common area maintenance, and community amenities."
  },
  {
    "q": "When was Spanish Gate built?",
    "a": "Spanish Gate was built primarily between 1997 and 2002. The community has mature landscaping and an established character."
  },
  {
    "q": "What type of homes are in Spanish Gate?",
    "a": "Spanish Gate features single-family homes in both one- and two-story configurations with traditional and Mediterranean-inspired architecture. Most homes range from approximately 2,000 to 4,000 square feet."
  },
  {
    "q": "Where is Spanish Gate located?",
    "a": "Spanish Gate is located in the southwest Las Vegas valley along South Rainbow Boulevard, with convenient access to the I-215 Beltway, the Strip, and the growing retail corridor along Blue Diamond Road."
  },
  {
    "q": "Is Spanish Gate good for families?",
    "a": "Yes. Spanish Gate's guard-gated security, community parks, walking paths, and quiet residential atmosphere make it a popular choice for families. Several well-rated schools serve the area."
  },
  {
    "q": "How does Spanish Gate compare to Southern Highlands?",
    "a": "Southern Highlands is a larger master-planned community with a Nicklaus-designed golf course, more amenities, and higher pricing. Spanish Gate is a smaller, more intimate guard-gated community with lower HOA fees and a more accessible price range. Both offer guard-gated security in the southwest valley."
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

export default function SpanishGateFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Spanish Gate</h2>
          <p>The questions buyers ask most when exploring Spanish Gate.</p>
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
