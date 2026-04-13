'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range at Panorama Towers?",
    "a": "Residences at Panorama Towers range from approximately $300,000 for one-bedroom units on lower floors to over $2 million for penthouses and combined corner units with panoramic Strip and mountain views."
  },
  {
    "q": "How many towers and units are there?",
    "a": "Panorama Towers consists of twin 33-story towers containing approximately 650 total residences. The two towers were completed in phases between 2006 and 2008."
  },
  {
    "q": "What amenities does Panorama Towers offer?",
    "a": "Amenities include two resort-style pool decks, tennis courts, a fitness center, 24-hour concierge and security, valet parking, a business center, and private resident lounges."
  },
  {
    "q": "Is Panorama Towers gated?",
    "a": "Yes. Panorama Towers has a gated entry with 24-hour security and concierge services. Dedicated residential parking and controlled building access provide privacy for residents."
  },
  {
    "q": "Can you rent out a unit at Panorama Towers?",
    "a": "Yes. Panorama Towers allows owners to rent their units. The Strip-adjacent location and resort amenities drive consistent rental demand. Contact our team for current rental market conditions."
  },
  {
    "q": "How does Panorama compare to Veer Towers?",
    "a": "Panorama Towers generally offers larger floor plans at a lower per-square-foot price compared to Veer Towers. Veer is directly on-Strip at CityCenter with a more modern design. Panorama is Strip-adjacent with more established HOA reserves and two pool decks."
  },
  {
    "q": "What are HOA fees at Panorama Towers?",
    "a": "HOA fees at Panorama Towers typically range from $350 to $1,500 per month depending on unit size and floor level. Fees cover building maintenance, concierge, security, pool and fitness facilities, and common area upkeep."
  },
  {
    "q": "What views do Panorama Towers units have?",
    "a": "Depending on tower and unit position, views include the Las Vegas Strip, CityCenter, the Spring Mountains, the Las Vegas Valley, and Red Rock Canyon in the distance."
  }
]

export default function PanoramaTowersFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Panorama Towers</h2>
          <p>The questions buyers ask most when exploring Panorama Towers.</p>
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
