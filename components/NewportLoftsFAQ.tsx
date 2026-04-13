'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range at Newport Lofts?",
    "a": "Residences range from approximately $200,000 for studios and one-bedrooms to around $500,000 for two-bedroom and penthouse-level units."
  },
  {
    "q": "What is the design style at Newport Lofts?",
    "a": "Newport Lofts features a raw industrial aesthetic with polished concrete floors, exposed ductwork, floor-to-ceiling windows, open floor plans, and soaring ceilings. It is the most authentically industrial loft experience in Las Vegas."
  },
  {
    "q": "What amenities does Newport Lofts offer?",
    "a": "Amenities include a pool deck, fitness center, controlled building access, and dedicated resident parking. The streamlined amenity package helps keep HOA fees among the lowest of any downtown tower."
  },
  {
    "q": "Can you rent out a unit at Newport Lofts?",
    "a": "Yes. Newport Lofts allows rentals. The accessible pricing and downtown location attract young professionals and remote workers."
  },
  {
    "q": "What are HOA fees at Newport Lofts?",
    "a": "HOA fees typically range from $200 to $600 per month depending on unit size — among the lowest of any condo tower in downtown Las Vegas."
  },
  {
    "q": "How does Newport Lofts compare to Soho Lofts?",
    "a": "Both are downtown loft-style communities. Newport has a rawer, more industrial character with polished concrete and exposed ductwork. Soho Lofts is a taller 15-story tower with a slightly more refined design and mezzanine configurations. Newport has lower HOA fees and a lower entry price."
  },
  {
    "q": "Where is Newport Lofts located?",
    "a": "Newport Lofts is located in Downtown Las Vegas between the Fremont East entertainment district and the Arts District, within walking distance of both neighborhoods' restaurants, bars, and cultural venues."
  },
  {
    "q": "How many units are in Newport Lofts?",
    "a": "Newport Lofts contains 168 residences across 23 stories, making it one of the more intimate tower communities in downtown Las Vegas."
  }
]

export default function NewportLoftsFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Newport Lofts</h2>
          <p>The questions buyers ask most when exploring Newport Lofts.</p>
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
