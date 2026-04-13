'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range at The Martin?",
    "a": "Residences range from approximately $400,000 for one-bedroom units to over $3 million for penthouses with panoramic Strip and mountain views."
  },
  {
    "q": "How many units are in The Martin?",
    "a": "The Martin contains 372 residences across 45 stories with a range of one-, two-, and three-bedroom floor plans plus penthouses."
  },
  {
    "q": "What amenities does The Martin offer?",
    "a": "Amenities include a resort-style pool deck with cabanas, fitness center, 24-hour concierge and valet, private screening room, business center, resident lounge, and 24-hour security."
  },
  {
    "q": "Is The Martin gated?",
    "a": "Yes. The Martin has controlled vehicular and pedestrian access with 24-hour security, concierge services, and valet parking."
  },
  {
    "q": "How does The Martin compare to Panorama Towers?",
    "a": "Both are on Dean Martin Drive near the Strip. The Martin is a single 45-story tower with 372 units. Panorama Towers is a twin 33-story complex with ~650 units and two pool decks. The Martin is generally newer with slightly higher per-square-foot pricing."
  },
  {
    "q": "Can you rent out a unit at The Martin?",
    "a": "Yes. The Martin allows rentals. The Strip-adjacent location drives consistent demand from both long-term tenants and corporate clients."
  },
  {
    "q": "What are HOA fees at The Martin?",
    "a": "HOA fees typically range from $400 to $2,000 per month depending on unit size and floor level. Fees cover building operations, pool, fitness center, concierge, security, and common area maintenance."
  },
  {
    "q": "What views do Martin units have?",
    "a": "East-facing units offer views of CityCenter and the Strip. West-facing units capture the Spring Mountains and Red Rock Canyon. Upper floors provide sweeping 360-degree panoramas."
  }
]

export default function TheMartinFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About The Martin</h2>
          <p>The questions buyers ask most when exploring The Martin.</p>
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
