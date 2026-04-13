'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range at The Ogden?",
    "a": "Residences range from approximately $200,000 for studios and one-bedrooms to around $700,000 for penthouses and premium corner units with panoramic views."
  },
  {
    "q": "Where is The Ogden located?",
    "a": "The Ogden is located at the intersection of Ogden Avenue and Las Vegas Boulevard in Downtown Las Vegas, directly above the Fremont East entertainment district."
  },
  {
    "q": "What amenities does The Ogden offer?",
    "a": "Amenities include a rooftop pool deck and lounge with panoramic views, fitness center, 24-hour security, controlled building access, resident event spaces, and ground-floor retail."
  },
  {
    "q": "Is The Ogden walkable?",
    "a": "Yes. The Ogden is one of the most walkable addresses in Las Vegas. Fremont East, Container Park, the Mob Museum, the Arts District, and dozens of restaurants and bars are all within walking distance."
  },
  {
    "q": "Can you rent out a unit at The Ogden?",
    "a": "Yes. The Ogden allows rentals and the downtown location, affordable pricing, and walkable lifestyle drive consistent demand from young professionals and remote workers."
  },
  {
    "q": "What are HOA fees at The Ogden?",
    "a": "HOA fees typically range from $250 to $900 per month depending on unit size. Fees cover building maintenance, rooftop pool, fitness center, security, and common area upkeep."
  },
  {
    "q": "How does The Ogden compare to Juhl?",
    "a": "The Ogden is a traditional high-rise tower with conventional condo layouts. Juhl has a more deliberately loft-style, campus-oriented design. The Ogden has a more central Fremont East location, while Juhl is closer to the Arts District. Both are excellent downtown options."
  },
  {
    "q": "Was The Ogden renovated?",
    "a": "Yes. The Ogden underwent a significant renovation and modernization in the 2010s, updating common areas, amenities, and unit finishes to contemporary standards."
  },
  {
    "q": "What are the HOA/condo fees and what do they cover?",
    "a": "Monthly fees vary by building and unit size but typically range from  to ,000+ per month. Fees generally cover building insurance, common area maintenance, pools, fitness center, concierge, valet, and building reserves. Higher floors and larger units pay proportionally more."
  },
  {
    "q": "Can units be rented out?",
    "a": "Rental policies vary by building. Condo-hotel buildings like Trump International and Palms Place are designed for short-term rental income. Traditional residential high-rises may have minimum lease terms (typically 6-12 months). Check each building's CC&Rs for specific rental restrictions."
  },
  {
    "q": "What views are available?",
    "a": "Las Vegas high-rises offer Strip views, mountain views, golf course views, and city panoramas depending on the building location, floor level, and unit orientation. Premium floors and corner units command significant price premiums for unobstructed views."
  },
  {
    "q": "Is there concierge service?",
    "a": "Most luxury high-rises in Las Vegas offer concierge services ranging from basic package receiving and dry cleaning coordination to full-service concierge with restaurant reservations, event tickets, car service, and personal shopping assistance."
  }
]

export default function TheOgdenFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About The Ogden</h2>
          <p>The questions buyers ask most when exploring The Ogden.</p>
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
