'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for homes at South Shore Lake Las Vegas?",
    "a": "Homes at South Shore range from approximately $800,000 for Mediterranean villas to over $5 million for waterfront custom estates with private docks and direct lake access."
  },
  {
    "q": "Is South Shore guard-gated?",
    "a": "Yes. South Shore is the guard-gated luxury section of Lake Las Vegas with 24-hour staffed gate and comprehensive security. It is the most exclusive residential enclave within the Lake Las Vegas resort community."
  },
  {
    "q": "What golf course is at South Shore?",
    "a": "SouthShore Golf Club features a Jack Nicklaus-designed 18-hole championship course that wraps along the lake's southern shoreline. The club offers fine dining, spa, fitness, pool, and tennis amenities."
  },
  {
    "q": "Can you boat on Lake Las Vegas?",
    "a": "Yes. Lake Las Vegas is a 320-acre private lake open to residents and resort guests for kayaking, paddleboarding, sailing, and electric boat use. No motorized watercraft beyond electric boats are permitted."
  },
  {
    "q": "What ZIP code is South Shore in?",
    "a": "South Shore is in ZIP code 89011 in Henderson, Nevada, within the Lake Las Vegas resort community. Home prices range from $800K–$5M+."
  },
  {
    "q": "What are HOA fees at South Shore?",
    "a": "HOA fees at South Shore typically range from $400 to $1,000 per month, covering the guard gate, security patrols, Lake Las Vegas master association, and sub-association fees. Golf club membership is separate."
  },
  {
    "q": "Is South Shore a good full-time residence?",
    "a": "Absolutely. While South Shore has a resort feel, it is fully functional for year-round living. The Strip, airport, and Henderson's commercial corridor are all within 30 minutes. Many residents live at South Shore full-time."
  },
  {
    "q": "How far is South Shore from Lake Mead?",
    "a": "Lake Mead National Recreation Area is approximately 15 minutes east of South Shore. Residents enjoy easy access to boating, fishing, hiking, and scenic drives at one of America's largest reservoirs."
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
    "a": "Most guard-gated communities include perimeter walls, security patrols, surveillance cameras at entry points, and emergency response coordination. Some communities also offer interior patrol routes and resident notification systems. South Shore features a 24-hour staffed guard gate with controlled vehicle access, security patrols, and perimeter walls."
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

export default function LakeLasVegasSouthShoreFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About South Shore</h2>
          <p>The questions buyers ask most when exploring South Shore.</p>
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
