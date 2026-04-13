'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range at Allure Las Vegas?",
    "a": "Residences range from approximately $250,000 for one-bedroom units on lower floors to over $1 million for penthouses and premium units with Strip views."
  },
  {
    "q": "How many units are in Allure Las Vegas?",
    "a": "Allure Las Vegas contains 428 residences across 41 stories. Unit types include studios, one-bedrooms, two-bedrooms, three-bedrooms, and penthouses."
  },
  {
    "q": "What amenities does Allure offer?",
    "a": "Amenities include a resort-style pool deck with cabanas and Strip views, fitness center, 24-hour concierge and security, valet parking, media room, business center, and resident lounge areas."
  },
  {
    "q": "Is Allure Las Vegas gated?",
    "a": "Yes. Allure has a gated entry with 24-hour security, concierge services, and controlled building access. Valet parking is also available."
  },
  {
    "q": "Can you rent out a unit at Allure?",
    "a": "Yes. Allure allows rentals and the accessible price point combined with the location near the Strip makes it popular with investor-buyers seeking rental income."
  },
  {
    "q": "What views do Allure units have?",
    "a": "South-facing units offer views of the Las Vegas Strip skyline. West-facing units capture the Spring Mountains and Red Rock Canyon. Upper floors provide sweeping panoramic views in all directions."
  },
  {
    "q": "What are HOA fees at Allure?",
    "a": "HOA fees typically range from $300 to $1,200 per month depending on unit size and floor level. Fees cover building operations, concierge, pool, fitness center, security, and common area maintenance."
  },
  {
    "q": "How does Allure compare to Sky Las Vegas?",
    "a": "Both are luxury high-rise towers near the Strip. Sky has true Strip frontage on Las Vegas Boulevard and slightly newer finishes. Allure offers a lower entry price and is located on Sahara Avenue just north of the Strip."
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

export default function AllureLasVegasFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Allure Las Vegas</h2>
          <p>The questions buyers ask most when exploring Allure Las Vegas.</p>
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
