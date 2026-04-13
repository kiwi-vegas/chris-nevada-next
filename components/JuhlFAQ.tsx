'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range at Juhl?",
    "a": "Residences at Juhl range from approximately $200,000 for studios and one-bedrooms to around $600,000 for two-story townhome lofts and premium corner units."
  },
  {
    "q": "What is the design style at Juhl?",
    "a": "Juhl features a loft-style design with open floor plans, soaring ceilings, exposed concrete elements, oversized windows, and a creative urban aesthetic. It is designed to evoke the loft living culture of cities like New York and San Francisco."
  },
  {
    "q": "What amenities does Juhl offer?",
    "a": "Amenities include a resort-style pool and spa, Sky Deck with Strip views, Sky Lounge, co-working studio, screening room, art gallery, dog park, fitness center, and ground-floor retail and restaurants."
  },
  {
    "q": "Is Juhl in the Arts District?",
    "a": "Juhl is located in Downtown Las Vegas adjacent to the Arts District. The Arts District's galleries, breweries, restaurants, and monthly First Friday events are within walking distance."
  },
  {
    "q": "Can you rent out a unit at Juhl?",
    "a": "Yes. Juhl allows rentals. The downtown location and loft-style aesthetic attract young professionals, creatives, and remote workers, driving consistent rental demand."
  },
  {
    "q": "Is there parking at Juhl?",
    "a": "Yes. Juhl includes covered parking for residents. The downtown location also offers convenient access to public transit and walkable amenities."
  },
  {
    "q": "What are HOA fees at Juhl?",
    "a": "HOA fees at Juhl typically range from $250 to $800 per month depending on unit size. Fees cover building maintenance, pool, Sky Deck, concierge, common area upkeep, and security."
  },
  {
    "q": "How does Juhl compare to The Ogden?",
    "a": "Both are downtown Las Vegas condo communities. Juhl has a more deliberately loft-style, creative design with a campus feel. The Ogden is a traditional high-rise tower with more conventional condo layouts. Both are excellent downtown options at similar price points."
  }
]

export default function JuhlFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Juhl</h2>
          <p>The questions buyers ask most when exploring Juhl.</p>
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
