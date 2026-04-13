'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What guard-gated communities are in The Canyons?",
    "a": "The Canyons contains five guard-gated enclaves: Bellacere ($1.5M–$5M+), Eagle Rock ($1M–$4M+), The Palisades ($1M–$4M), Canyon Fairways ($800K–$3M), and Aventura ($800K–$3M+). Each has its own 24-hour staffed guard gate."
  },
  {
    "q": "What is the price range in The Canyons?",
    "a": "The Canyons spans from approximately $500,000 in non-gated neighborhoods to over $4 million in the guard-gated Bellacere enclave. The average home price in The Canyons is approximately $900K–$1.2M."
  },
  {
    "q": "What is Bellacere?",
    "a": "Bellacere is the most exclusive guard-gated enclave within The Canyons village. It features custom and semi-custom estates on large lots, many with Red Rock Canyon views, at price points typically ranging from $1.5 million to over $5 million."
  },
  {
    "q": "Is The Canyons near TPC Summerlin?",
    "a": "Yes — Canyon Fairways, one of The Canyons' guard-gated communities, sits adjacent to TPC Summerlin, the PGA Tour championship course that hosts the annual Shriners Children's Open."
  },
  {
    "q": "What schools serve The Canyons?",
    "a": "The Canyons is zoned for strong CCSD schools including Sig Rogich Middle (10/10) and Palo Verde High (8/10). Private schools including The Meadows School (A+) and Bishop Gorman (A+) are nearby."
  },
  {
    "q": "What are HOA fees in The Canyons?",
    "a": "HOA fees vary significantly across The Canyons. Non-gated neighborhoods pay approximately $100–$200/month. Guard-gated enclaves range from $400 to $800/month, covering guard gate staffing, enhanced security, and premium common area maintenance."
  },
  {
    "q": "Is The Canyons in Summerlin North or South?",
    "a": "The Canyons is part of the Summerlin North Association, located in the northern portion of the Summerlin master plan."
  },
  {
    "q": "Can I start in a non-gated area and move up?",
    "a": "Yes — The Canyons is one of the few Summerlin villages where you can enter in a non-gated neighborhood (from $500K) and later move up to a guard-gated enclave (from $800K–$1.5M+) without changing school zones, neighborhoods, or community familiarity."
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

export default function SummerlinTheCanyonsFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About The Canyons</h2>
          <p>The questions buyers ask most when exploring The Canyons.</p>
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
