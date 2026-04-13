'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range at Soho Lofts?",
    "a": "Residences range from approximately $200,000 for studios to around $600,000 for two-story loft units and premium penthouses."
  },
  {
    "q": "What is the design style at Soho Lofts?",
    "a": "Soho Lofts features an industrial-chic aesthetic with exposed concrete ceilings, warehouse-style oversized windows, open floor plans, soaring ceiling heights, and mezzanine sleeping lofts accessed by floating staircases."
  },
  {
    "q": "Is Soho Lofts in the Arts District?",
    "a": "Yes. Soho Lofts is located in the heart of the Las Vegas Arts District. Galleries, breweries, restaurants, and the monthly First Friday art walk are all within walking distance."
  },
  {
    "q": "What amenities does Soho Lofts offer?",
    "a": "Amenities include a rooftop pool deck with downtown and mountain views, fitness center, controlled building access, dedicated resident parking, and secure lobbies."
  },
  {
    "q": "Can you rent out a unit at Soho Lofts?",
    "a": "Yes. Soho Lofts allows rentals. The Arts District location and loft aesthetic attract creatives, young professionals, and remote workers."
  },
  {
    "q": "What are HOA fees at Soho Lofts?",
    "a": "HOA fees typically range from $250 to $750 per month depending on unit size. Fees cover building operations, rooftop pool, fitness center, security, and common area maintenance."
  },
  {
    "q": "How does Soho Lofts compare to Newport Lofts?",
    "a": "Both are downtown loft-style communities. Soho Lofts is more refined with a 15-story tower design and mezzanine configurations. Newport Lofts is a converted building with a rawer industrial character. Both offer authentic urban loft living."
  },
  {
    "q": "What is First Friday?",
    "a": "First Friday is a monthly arts and culture event in the Las Vegas Arts District where galleries open their doors, food trucks line the streets, and live music fills the neighborhood. It draws thousands of visitors and is one of the signature cultural events in Las Vegas."
  }
]

export default function SohoLoftsFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Soho Lofts</h2>
          <p>The questions buyers ask most when exploring Soho Lofts.</p>
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
