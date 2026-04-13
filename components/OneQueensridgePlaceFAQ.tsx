'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for residences at One Queensridge Place?",
    "a": "Residences at One Queensridge Place range from approximately $500,000 for lower-floor units to over $5 million for penthouse and full-floor Sky Residences on the upper levels."
  },
  {
    "q": "Is One Queensridge Place guard-gated?",
    "a": "Yes. One Queensridge Place is within the guard-gated Queensridge community and has its own 24-hour security, concierge services, and valet parking."
  },
  {
    "q": "How large are the units at One Queensridge Place?",
    "a": "Residences range from approximately 2,800 square feet to over 10,000 square feet for full-floor Sky Residences. These are among the largest condominium units in any Las Vegas high-rise."
  },
  {
    "q": "What amenities does One Queensridge Place offer?",
    "a": "The building features a resort-style pool deck with cabanas, fitness center, concierge services, valet parking, business center, private wine storage, residents' lounge, and 24-hour security."
  },
  {
    "q": "What are HOA fees at One Queensridge Place?",
    "a": "HOA fees range from approximately $1,500 to $5,000 or more per month depending on unit size. Fees cover concierge, valet, security, pool, fitness center, common area maintenance, building insurance, and reserves."
  },
  {
    "q": "What ZIP code is One Queensridge Place in?",
    "a": "One Queensridge Place is located in ZIP code 89145 in the Queensridge area of western Las Vegas."
  },
  {
    "q": "Do units at One Queensridge Place have terraces?",
    "a": "Yes. Most residences feature expansive private terraces designed for outdoor entertaining with panoramic views of the Strip, mountains, and Badlands Golf Course."
  },
  {
    "q": "How does One Queensridge Place compare to other Las Vegas high-rises?",
    "a": "One Queensridge Place offers the largest unit sizes of any Las Vegas high-rise, the only guard-gated setting, and one of the few high-rises not located on the Strip. It is considered the definitive luxury high-rise for buyers seeking space, privacy, and views."
  }
]

export default function OneQueensridgePlaceFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About One Queensridge Place</h2>
          <p>The questions buyers ask most when exploring One Queensridge Place.</p>
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
