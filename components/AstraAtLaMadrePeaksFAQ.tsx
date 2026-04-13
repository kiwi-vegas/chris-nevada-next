'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for lots in Astra at La Madre Peaks?",
    "a": "Custom lots in Astra start at approximately $2 million for interior premium lots, with the most desirable summit view lots commanding $3 million or more. Finished custom homes are expected to range from $4 million to well over $10 million."
  },
  {
    "q": "Is Astra at La Madre Peaks guard-gated?",
    "a": "Yes. Astra features a guard-gated entry with 24-hour security staffing and comprehensive patrols, consistent with Summerlin's other ultra-luxury communities like The Ridges and The Summit Club."
  },
  {
    "q": "How many lots are in Astra?",
    "a": "Astra at La Madre Peaks includes 167 custom homesites. This limited inventory and custom-only format ensures exclusivity and a cohesive ultra-luxury community."
  },
  {
    "q": "Can I bring my own builder to Astra?",
    "a": "Astra has a roster of approved luxury builders, and buyers may also submit their own architect and builder for approval. All designs must comply with the community's architectural guidelines, which ensure a cohesive desert contemporary aesthetic."
  },
  {
    "q": "What is La Madre Peaks?",
    "a": "La Madre Peaks is one of Summerlin's West Association villages, located along the northwestern edge of the master plan at one of the highest elevations in Summerlin. Astra is the premier custom lot community within this village."
  },
  {
    "q": "Is Astra part of Summerlin?",
    "a": "Yes. Astra at La Madre Peaks is located within the Summerlin master-planned community. Residents have full access to all Summerlin amenities, trails, parks, and community facilities."
  },
  {
    "q": "What views are available from Astra?",
    "a": "Depending on lot position, views include Red Rock Canyon's sandstone formations, the Spring Mountains, the Las Vegas Strip, and the broader Las Vegas Valley. Summit view lots offer 360-degree panoramic perspectives."
  },
  {
    "q": "How does Astra compare to The Ridges?",
    "a": "Astra is exclusively custom lots (no production or semi-custom homes), whereas The Ridges includes both semi-custom and custom options. Astra is at a higher elevation within La Madre Peaks and offers a newer development with the latest infrastructure. Both are guard-gated Summerlin communities by the Howard Hughes Corporation."
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
    "a": "Most guard-gated communities include perimeter walls, security patrols, surveillance cameras at entry points, and emergency response coordination. Some communities also offer interior patrol routes and resident notification systems. Astra at La Madre Peaks features a 24-hour staffed guard gate with controlled vehicle access, security patrols, and perimeter walls."
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

export default function AstraAtLaMadrePeaksFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Astra at La Madre Peaks</h2>
          <p>The questions buyers ask most when exploring Astra at La Madre Peaks.</p>
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
