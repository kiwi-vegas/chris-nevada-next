'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for Four Seasons Private Residences?",
    "a": "Residences range from approximately $3.67 million for entry-level units to over $28.95 million for the most exclusive sky residences and penthouses. This establishes a new pricing ceiling for the Las Vegas metro area."
  },
  {
    "q": "When will Four Seasons Private Residences be completed?",
    "a": "The development is expected to begin delivering residences in 2027. Pre-construction sales have been strong, with approximately 75% of the 171 units reported sold."
  },
  {
    "q": "What services are included with Four Seasons residences?",
    "a": "Residents receive full Four Seasons hospitality services including 24-hour concierge, valet parking, housekeeping, in-residence dining, spa services, fitness center access, and curated social programming."
  },
  {
    "q": "Is Four Seasons part of MacDonald Highlands?",
    "a": "Yes. Four Seasons Private Residences is located within the guard-gated MacDonald Highlands community in Henderson. Residents have access to MacDonald Highlands amenities including DragonRidge Country Club."
  },
  {
    "q": "How many units are in Four Seasons Private Residences?",
    "a": "The development includes 171 residences across multiple floor plan types, from garden-level units to full-floor penthouses and sky residences."
  },
  {
    "q": "What are HOA/service fees at Four Seasons?",
    "a": "Monthly fees at Four Seasons Private Residences are estimated between $2,000 and $5,000+ per month, reflecting the full-service Four Seasons hospitality model including concierge, security, housekeeping options, and resort amenities."
  },
  {
    "q": "Can I play golf at DragonRidge as a Four Seasons resident?",
    "a": "Four Seasons Private Residences is located within MacDonald Highlands, which is home to DragonRidge Country Club. Membership at DragonRidge is separate and available to residents on a fee basis."
  },
  {
    "q": "Is this a hotel or private residences?",
    "a": "Four Seasons Private Residences are privately owned homes — not hotel units. Owners receive Four Seasons-branded services and amenities, but the residences are full-time homes with private ownership, not timeshares or hotel-condo units."
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
    "a": "Most guard-gated communities include perimeter walls, security patrols, surveillance cameras at entry points, and emergency response coordination. Some communities also offer interior patrol routes and resident notification systems. Four Seasons Private Residences features a 24-hour staffed guard gate with controlled vehicle access, security patrols, and perimeter walls."
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

export default function FourSeasonsPrivateResidencesFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Four Seasons Private Residences</h2>
          <p>The questions buyers ask most when exploring Four Seasons Private Residences.</p>
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
