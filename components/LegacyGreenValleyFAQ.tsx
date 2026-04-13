'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for homes in Legacy at Green Valley?",
    "a": "Homes in Legacy at Green Valley range from approximately $700,000 for smaller resale homes within the gates to $2.5 million for custom estates on premium golf course lots with mountain views."
  },
  {
    "q": "Is Legacy at Green Valley guard-gated?",
    "a": "Yes. Legacy at Green Valley is a fully guard-gated community with a 24-hour staffed guard gate. It is one of the most established guard-gated communities in Henderson."
  },
  {
    "q": "What golf course is in Legacy at Green Valley?",
    "a": "The Legacy Golf Course is a public championship 18-hole course that winds through the community. Residents enjoy golf course views and proximity without mandatory membership fees."
  },
  {
    "q": "What ZIP codes cover Legacy at Green Valley?",
    "a": "Legacy at Green Valley spans ZIP codes 89014 and 89074 in Henderson, Nevada."
  },
  {
    "q": "Do I need a golf membership to live in Legacy at Green Valley?",
    "a": "No. The Legacy Golf Course is a public course, not a private club. Residents enjoy golf course views and easy access without mandatory membership fees — a significant cost advantage over private club communities."
  },
  {
    "q": "What are HOA fees in Legacy at Green Valley?",
    "a": "HOA fees typically range from $200 to $500 per month, covering 24-hour guard gate staffing, security patrols, common area maintenance, and community landscaping."
  },
  {
    "q": "How does Legacy at Green Valley compare to Anthem Country Club?",
    "a": "Both are guard-gated golf communities in Henderson. Anthem Country Club is newer with a private Hale Irwin course and higher price points ($1.2M+). Legacy at Green Valley is more established with a public course and more accessible pricing starting at $700K."
  },
  {
    "q": "Is Legacy at Green Valley a good investment?",
    "a": "Legacy at Green Valley has been one of Henderson's most stable luxury addresses for over 30 years. The guard gate, golf course, central location, and limited inventory support consistent appreciation and strong resale values."
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

export default function LegacyGreenValleyFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Legacy at Green Valley</h2>
          <p>The questions buyers ask most when exploring Legacy at Green Valley.</p>
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
