'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for homes at The District?",
    "a": "Condominiums and townhomes at The District range from approximately $300,000 for entry-level condos to $600,000 for premium top-floor penthouses and larger townhomes with upgraded finishes."
  },
  {
    "q": "Is The District guard-gated?",
    "a": "No. The District is not guard-gated. It is an open mixed-use community with walkable streets, ground-floor retail, and residential units above. The community benefits from Henderson's consistently low crime rates."
  },
  {
    "q": "What shopping and dining is at The District?",
    "a": "The District features a curated mix of boutiques, national retailers (REI, Williams-Sonoma, Pottery Barn), specialty food shops, and restaurants. The central green space hosts seasonal markets, live music, and community events."
  },
  {
    "q": "What ZIP code is The District in?",
    "a": "The District at Green Valley Ranch is located in ZIP code 89052 in Henderson, Nevada."
  },
  {
    "q": "What are HOA fees at The District?",
    "a": "HOA fees at The District typically range from $150 to $350 per month, depending on the unit type and size. Fees cover exterior maintenance, landscaping, common area upkeep, and community amenities."
  },
  {
    "q": "Is The District a good investment?",
    "a": "The District offers a unique walkable lifestyle in Henderson that commands consistent rental demand and appreciation. The combination of mixed-use amenities, I-215 access, and Henderson's safety rankings make it attractive to both owner-occupants and investors."
  },
  {
    "q": "Can you walk to restaurants from The District?",
    "a": "Yes. The District was designed as a walkable urban village. Restaurants, shops, and entertainment are at ground level and within walking distance of all residential units. It is one of the few truly walkable communities in the Las Vegas Valley."
  },
  {
    "q": "How close is The District to Green Valley Ranch Resort?",
    "a": "The District is approximately 5 minutes from Green Valley Ranch Resort & Spa, which offers casino gaming, dining, a spa, movie theater, and entertainment — all easily accessible via Green Valley Parkway."
  }
]

export default function TheDistrictFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About The District at Green Valley Ranch</h2>
          <p>The questions buyers ask most when exploring The District at Green Valley Ranch.</p>
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
