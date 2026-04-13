'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for Veer Towers?",
    "a": "Residences in Veer Towers range from approximately $400,000 for entry-level studios and one-bedrooms on lower floors to over $5 million for penthouses and combined units with premium Strip views."
  },
  {
    "q": "How many units are in Veer Towers?",
    "a": "Veer Towers contains approximately 670 residences across twin 37-story towers. Unit types range from studios to three-bedroom penthouses."
  },
  {
    "q": "What is the architecture of Veer Towers?",
    "a": "Veer Towers was designed by Helmut Jahn. The twin towers are famous for their five-degree lean away from each other, creating a dramatic architectural statement. The buildings feature all-glass curtain walls."
  },
  {
    "q": "What amenities does Veer Towers offer?",
    "a": "Residents enjoy a resort-style pool deck, fitness center, 24-hour concierge, valet parking, private residential lobbies, and direct access to CityCenter's amenities including ARIA, Crystals shopping, and world-class dining."
  },
  {
    "q": "Can you rent out a unit at Veer Towers?",
    "a": "Yes. Veer Towers allows owners to rent their units, making it a popular choice for investor-buyers. The CityCenter location and luxury amenities drive strong rental demand, particularly for short-term and furnished rentals."
  },
  {
    "q": "What is CityCenter?",
    "a": "CityCenter is a 67-acre mixed-use urban complex on the Las Vegas Strip that includes ARIA Resort & Casino, Crystals luxury shopping, Waldorf Astoria Las Vegas, Park MGM, and Veer Towers. It was developed by MGM Resorts International."
  },
  {
    "q": "What views do Veer Towers units have?",
    "a": "Depending on unit location and floor, views include the Bellagio Fountains, the Las Vegas Strip, the Spring Mountains, the Las Vegas Valley, and CityCenter's resort campus."
  },
  {
    "q": "What are HOA fees at Veer Towers?",
    "a": "HOA fees at Veer Towers typically range from $400 to $2,000 per month depending on unit size and floor level. Fees cover building maintenance, concierge services, pool, fitness center, security, and common area upkeep."
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

export default function VeerTowersFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Veer Towers</h2>
          <p>The questions buyers ask most when exploring Veer Towers.</p>
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
