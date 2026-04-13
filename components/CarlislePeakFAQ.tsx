'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for homes in Carlisle Peak?",
    "a": "Homes in Carlisle Peak start at approximately $1.55 million and extend beyond $2 million for premium lots with upgraded finishes. All homes are new construction by Tri Pointe Homes."
  },
  {
    "q": "Is Carlisle Peak guard-gated?",
    "a": "Yes — Carlisle Peak is a guard-gated community with a 24-hour staffed guard gate. It is one of the few guard-gated neighborhoods within Grand Park village in Summerlin West."
  },
  {
    "q": "Who builds homes in Carlisle Peak?",
    "a": "Tri Pointe Homes is the exclusive builder in Carlisle Peak. Floor plans range from approximately 3,500 to 5,200+ square feet with contemporary desert architecture and premium finishes."
  },
  {
    "q": "What village is Carlisle Peak in?",
    "a": "Carlisle Peak is located in Grand Park village, part of the Summerlin West Association — the newest and westernmost area of Summerlin's master plan."
  },
  {
    "q": "How close is Carlisle Peak to Red Rock Canyon?",
    "a": "Red Rock Canyon National Conservation Area is approximately 5–10 minutes from Carlisle Peak via W Charleston Blvd. The Summerlin trail system provides direct connectivity to hiking routes."
  },
  {
    "q": "What are HOA fees in Carlisle Peak?",
    "a": "HOA fees typically range from $300 to $700 per month, which includes the Summerlin master association fee plus the Carlisle Peak sub-association guard gate and community maintenance fees."
  },
  {
    "q": "Is Carlisle Peak a good investment?",
    "a": "Carlisle Peak benefits from extreme scarcity — guard-gated new construction in Summerlin is very rare. Combined with the Summerlin brand, Red Rock proximity, and Tri Pointe build quality, the long-term value proposition is strong."
  },
  {
    "q": "What ZIP code is Carlisle Peak in?",
    "a": "Carlisle Peak is located in ZIP code 89138 in the Summerlin West area of Las Vegas."
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

export default function CarlislePeakFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Carlisle Peak</h2>
          <p>The questions buyers ask most when exploring Carlisle Peak.</p>
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
