'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for units at Palms Place?",
    "a": "Units at Palms Place range from approximately $200,000 for studio suites to over $1.5 million for premium penthouses on the upper floors. One-bedroom suites, the most popular unit type, typically range from $300,000 to $500,000."
  },
  {
    "q": "Is Palms Place a hotel or condos?",
    "a": "Palms Place is a condo-hotel. Each unit is an individually owned condominium that can be placed into the hotel's rental management program. Owners can use their unit as a primary residence, vacation home, or rental investment property."
  },
  {
    "q": "What are HOA fees at Palms Place?",
    "a": "HOA fees at Palms Place typically range from $500 to $1,800 per month depending on unit size and floor level. Fees cover building amenities, common area maintenance, concierge services, valet parking, pool, spa, and building infrastructure."
  },
  {
    "q": "Can I use the Palms Casino Resort amenities?",
    "a": "Yes. Palms Place owners have direct indoor access to the Palms Casino Resort and all of its amenities, including restaurants, the pool complex, entertainment venues, the casino floor, and the spa. Palms Place also has its own private pool and spa separate from the resort."
  },
  {
    "q": "Can I live full-time at Palms Place?",
    "a": "Yes. While many owners use the hotel rental program, Palms Place allows full-time residency. Full-time residents enjoy the same amenities, concierge services, and resort access as other owners and hotel guests."
  },
  {
    "q": "What happened with the Palms renovation?",
    "a": "The Palms Casino Resort underwent a $690 million renovation completed in 2019, one of the most expensive resort renovations in Las Vegas history. The renovation included Damien Hirst artwork, new restaurants, a reimagined pool complex, and upgraded common areas that benefit all Palms Place owners."
  },
  {
    "q": "How close is Palms Place to the Strip?",
    "a": "Palms Place is located approximately one block west of the Las Vegas Strip on Flamingo Road. The central Strip corridor, including CityCenter, Bellagio, and Caesars Palace, is approximately a 5-minute drive or a short rideshare trip."
  },
  {
    "q": "What is the rental income potential at Palms Place?",
    "a": "Rental income varies by unit size, floor level, view, and season. The Palms brand recognition and resort amenities support solid nightly rates, particularly during conventions, holidays, and major Las Vegas events. Contact our team for current rental performance data."
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
    "a": "Most guard-gated communities include perimeter walls, security patrols, surveillance cameras at entry points, and emergency response coordination. Some communities also offer interior patrol routes and resident notification systems. Palms Place Hotel and Spa features a 24-hour staffed guard gate with controlled vehicle access, security patrols, and perimeter walls."
  }
]

export default function PalmsPlaceFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Palms Place Hotel and Spa</h2>
          <p>The questions buyers ask most when exploring Palms Place Hotel and Spa.</p>
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
