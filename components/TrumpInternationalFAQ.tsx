'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for units at Trump International Las Vegas?",
    "a": "Units at Trump International range from approximately $200,000 for studio suites to over $3 million for premium penthouses on the upper floors. One-bedroom suites, the most popular unit type, typically range from $300,000 to $600,000."
  },
  {
    "q": "Is Trump International a hotel or condos?",
    "a": "Trump International is a condo-hotel. Each unit is an individually owned condominium that can be placed into the hotel's rental management program when the owner is not in residence. Owners can use their unit as a primary or secondary residence, or generate rental income from Las Vegas tourism."
  },
  {
    "q": "What are HOA fees at Trump International?",
    "a": "HOA fees at Trump International typically range from $600 to $3,000 per month depending on unit size and floor level. Fees cover building amenities, common area maintenance, concierge services, valet, pool deck, and building infrastructure."
  },
  {
    "q": "Can I live full-time at Trump International?",
    "a": "Yes. While many owners use the hotel rental program, Trump International allows full-time residency. Full-time residents enjoy the same five-star amenities, concierge services, and housekeeping options available to hotel guests."
  },
  {
    "q": "Is there a casino at Trump International?",
    "a": "No. Trump International is a non-gaming, non-smoking property, which distinguishes it from most Strip-front towers. This creates a more residential atmosphere while still being steps from the Strip's casino resorts."
  },
  {
    "q": "What views are available at Trump International?",
    "a": "Units offer Strip views (south and east facing), mountain views of the Spring Mountains and Red Rock Canyon (west facing), and city views (north facing toward downtown). Strip-facing units command premium prices and stronger rental rates."
  },
  {
    "q": "How tall is Trump International Las Vegas?",
    "a": "Trump International stands 64 stories and 620 feet tall, making it one of the tallest residential towers in Las Vegas. The building's gold-tinted glass facade is an iconic element of the Strip skyline."
  },
  {
    "q": "What is the rental income potential at Trump International?",
    "a": "Rental income varies by unit size, floor level, view orientation, and season. Studio and one-bedroom units placed in the hotel rental program can generate meaningful income from Las Vegas tourism, particularly during conventions, holidays, and major events. Contact our team for current rental performance data."
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

export default function TrumpInternationalFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Trump International Hotel & Tower</h2>
          <p>The questions buyers ask most when exploring Trump International Hotel & Tower.</p>
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
