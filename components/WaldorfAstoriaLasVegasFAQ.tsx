'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range at Waldorf Astoria Las Vegas?",
    "a": "Residences range from approximately $500,000 for entry-level studios and one-bedrooms to over $10 million for penthouses and combined units with premium Strip views. Per-square-foot prices are among the highest on the Strip."
  },
  {
    "q": "What hotel services do residents receive?",
    "a": "Residential owners have access to full Waldorf Astoria hotel services including daily housekeeping, 24-hour concierge, room service, valet parking, spa and fitness center access, and priority dining reservations at the hotel's restaurants."
  },
  {
    "q": "Can you rent out a Waldorf Astoria residence?",
    "a": "Yes. Many owners participate in the hotel's rental program, which allows their unit to be rented as a hotel room when not in personal use. This generates income and offsets ownership costs. Contact our team for current program details."
  },
  {
    "q": "What is the history of the building?",
    "a": "The tower opened in 2010 as the Mandarin Oriental Las Vegas and was rebranded to Waldorf Astoria in 2018, elevating the property's brand prestige. The building retains its original refined design while benefiting from the Waldorf Astoria brand recognition."
  },
  {
    "q": "How many units are in the Waldorf Astoria?",
    "a": "The Waldorf Astoria Las Vegas contains approximately 225 privately owned residences across 47 stories. The relatively small unit count ensures exclusivity and personalized service."
  },
  {
    "q": "What are HOA fees at the Waldorf Astoria?",
    "a": "HOA fees at the Waldorf Astoria typically range from $800 to $5,000+ per month depending on unit size, floor, and services used. Fees cover building operations, hotel services, concierge, pool, spa, fitness center, and common area maintenance."
  },
  {
    "q": "What dining is available in the building?",
    "a": "The Waldorf Astoria Las Vegas features acclaimed dining venues within the hotel. Residents also enjoy in-residence dining from the hotel's culinary team and priority reservations."
  },
  {
    "q": "How does the Waldorf compare to Veer Towers?",
    "a": "The Waldorf Astoria offers five-star hotel services, branded prestige, and typically higher per-square-foot pricing. Veer Towers is a standalone residential building without hotel services but offers more unit diversity and a lower entry point. Both are located within CityCenter."
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
  },
  {
    "q": "Are there custom home lot opportunities?",
    "a": "Some luxury communities offer vacant lots for custom home construction. Lot sizes, architectural guidelines, and approved builders vary by community. Nevada Real Estate Group can help identify available custom lot inventory and connect you with approved builders."
  },
  {
    "q": "What is the resale value trend for luxury homes in this area?",
    "a": "Luxury properties in guard-gated and premium communities have historically outperformed the broader market in terms of value retention during downturns and appreciation during growth periods. Limited supply in guard-gated communities creates structural price support."
  }
]

export default function WaldorfAstoriaLasVegasFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Waldorf Astoria Las Vegas</h2>
          <p>The questions buyers ask most when exploring Waldorf Astoria Las Vegas.</p>
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
