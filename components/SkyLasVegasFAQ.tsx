'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range at Sky Las Vegas?",
    "a": "Residences range from approximately $300,000 for studios and one-bedrooms on lower floors to over $2 million for penthouses and combined units with premium Strip views."
  },
  {
    "q": "Is Sky Las Vegas on the Strip?",
    "a": "Yes. Sky Las Vegas is located directly on Las Vegas Boulevard, making it one of the few residential towers with true Strip frontage. East-facing units look directly down the Strip corridor."
  },
  {
    "q": "How many units are in Sky Las Vegas?",
    "a": "Sky Las Vegas contains 409 residences across 45 stories. Unit types include studios, one-bedrooms, two-bedrooms, and penthouses."
  },
  {
    "q": "What amenities does Sky Las Vegas offer?",
    "a": "Amenities include a rooftop pool deck with Strip views, fitness center, 24-hour concierge and security, valet parking, business center, and resident lounges."
  },
  {
    "q": "Can you rent out a unit at Sky Las Vegas?",
    "a": "Yes. Sky Las Vegas allows rentals and the Strip-front location drives strong demand. The accessible price point makes it popular with investor-buyers seeking rental income."
  },
  {
    "q": "What views do Sky Las Vegas units have?",
    "a": "East-facing units look directly down the Las Vegas Strip — one of the most iconic residential views in the world. West-facing units offer Spring Mountain and Red Rock Canyon sunset views. Upper floors provide 360-degree panoramas."
  },
  {
    "q": "What are HOA fees at Sky Las Vegas?",
    "a": "HOA fees typically range from $350 to $1,500 per month depending on unit size and floor level. Fees cover building operations, concierge, pool, fitness center, security, and common area maintenance."
  },
  {
    "q": "How does Sky Las Vegas compare to Veer Towers?",
    "a": "Sky is directly on the Strip with true boulevard frontage and a lower entry price. Veer is at CityCenter with newer construction and access to ARIA and Crystals amenities. Both offer excellent Strip lifestyle options."
  }
]

export default function SkyLasVegasFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Sky Las Vegas</h2>
          <p>The questions buyers ask most when exploring Sky Las Vegas.</p>
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
