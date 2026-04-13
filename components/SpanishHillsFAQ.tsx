'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for homes in Spanish Hills?",
    "a": "Homes in Spanish Hills range from approximately $1 million for resale properties to over $10 million for newer custom-build estates on premium view lots. The community's limited inventory of ~300 homes supports strong values across all price tiers."
  },
  {
    "q": "Is Spanish Hills guard-gated?",
    "a": "Yes. Spanish Hills is a fully guard-gated community with a 24-hour staffed guard gate and roving security patrols. It is one of the most private estate communities in the Las Vegas Valley."
  },
  {
    "q": "What ZIP code is Spanish Hills in?",
    "a": "Spanish Hills spans ZIP codes 89113 and 89148, located in the south-central Las Vegas Valley near the south Strip corridor."
  },
  {
    "q": "How close is Spanish Hills to the Las Vegas Strip?",
    "a": "Spanish Hills is approximately 10 minutes from the Las Vegas Strip via Dean Martin Drive or I-15, making it one of the closest luxury estate communities to the Strip's world-class dining, entertainment, and nightlife."
  },
  {
    "q": "What are HOA fees in Spanish Hills?",
    "a": "HOA fees in Spanish Hills typically range from $200 to $600 per month, covering guard gate staffing, security patrols, common area maintenance, and community infrastructure. Fees are relatively modest compared to other guard-gated luxury communities due to the low density."
  },
  {
    "q": "How large are lots in Spanish Hills?",
    "a": "Lots in Spanish Hills range from approximately half an acre to well over an acre, providing space for true estate living with motor courts, resort-style pools, guest houses, and expansive outdoor entertaining areas."
  },
  {
    "q": "What architectural styles are in Spanish Hills?",
    "a": "Spanish Hills features a range of architectural styles including Mediterranean, Tuscan, and contemporary desert modern. The community has evolved over two decades, and newer construction tends toward clean-lined modern design with indoor-outdoor living spaces."
  },
  {
    "q": "What celebrities have lived in Spanish Hills?",
    "a": "Spanish Hills has attracted numerous high-profile residents over the years, including entertainment industry figures, professional athletes, and business executives. The community's guard-gated privacy is a primary draw for public figures seeking discretion."
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
    "a": "Most guard-gated communities include perimeter walls, security patrols, surveillance cameras at entry points, and emergency response coordination. Some communities also offer interior patrol routes and resident notification systems. Spanish Hills features a 24-hour staffed guard gate with controlled vehicle access, security patrols, and perimeter walls."
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

export default function SpanishHillsFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Spanish Hills</h2>
          <p>The questions buyers ask most when exploring Spanish Hills.</p>
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
