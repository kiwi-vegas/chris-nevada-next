'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range at Turnberry Towers?",
    "a": "Residences range from approximately $400,000 for one-bedroom units on lower floors to over $2.5 million for penthouses and combined units with premium Strip views on upper floors."
  },
  {
    "q": "Do units at Turnberry Towers have balconies?",
    "a": "Yes. Most residences at Turnberry Towers include private balconies, which is a distinguishing feature compared to many other Las Vegas high-rise towers that do not offer outdoor living space."
  },
  {
    "q": "What amenities does Turnberry Towers offer?",
    "a": "Amenities include two resort-style pool decks with cabanas, a full-service spa, tennis courts, a state-of-the-art fitness center, 24-hour concierge and valet, a business center, private dining rooms, and lushly landscaped grounds."
  },
  {
    "q": "Is Turnberry Towers gated?",
    "a": "Yes. Turnberry Towers has a gated entry with 24-hour security, concierge services, and controlled building access for resident privacy."
  },
  {
    "q": "What is the difference between Turnberry Towers and Turnberry Place?",
    "a": "Turnberry Towers (2007-2008) and Turnberry Place (2001-2006) are separate high-rise communities developed by the same Turnberry Associates team. Turnberry Place is a four-tower complex located nearby on Paradise Road, while Turnberry Towers is a twin-tower complex on Karen Avenue. Both are luxury communities."
  },
  {
    "q": "Can you rent out a unit at Turnberry Towers?",
    "a": "Yes. Turnberry Towers allows owners to rent their units. The location near the Convention Center and the Strip drives consistent demand from both long-term tenants and corporate housing clients."
  },
  {
    "q": "What are HOA fees at Turnberry Towers?",
    "a": "HOA fees at Turnberry Towers typically range from $400 to $1,800 per month depending on unit size and floor level. Fees cover building maintenance, concierge, security, pool, spa, fitness center, and common area upkeep."
  },
  {
    "q": "How tall is Turnberry Towers?",
    "a": "Each of the twin towers rises 45 stories, making Turnberry Towers one of the tallest residential high-rise communities in the Las Vegas area."
  }
]

export default function TurnberryTowersFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Turnberry Towers</h2>
          <p>The questions buyers ask most when exploring Turnberry Towers.</p>
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
