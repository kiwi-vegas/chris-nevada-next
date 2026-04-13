'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for homes in The Fountains?",
    "a": "Homes in The Fountains range from approximately $800,000 for smaller semi-custom resales to $3 million for expansive custom estates on premium lots with resort-style outdoor living."
  },
  {
    "q": "Is The Fountains guard-gated?",
    "a": "Yes. The Fountains is a fully guard-gated community with a 24-hour staffed guard gate and security patrols. It has been one of Henderson's most prestigious guard-gated addresses for over 25 years."
  },
  {
    "q": "What ZIP code is The Fountains in?",
    "a": "The Fountains is located in ZIP code 89074 in Henderson, Nevada, within the Green Valley corridor."
  },
  {
    "q": "How large are lots in The Fountains?",
    "a": "The Fountains has some of the most generous lot sizes in Henderson's guard-gated communities, ranging from quarter-acre to half-acre parcels. This allows for resort-style pools, motor courts, guest casitas, and expansive outdoor living spaces."
  },
  {
    "q": "What are HOA fees in The Fountains?",
    "a": "HOA fees in The Fountains typically range from $250 to $600 per month, covering 24-hour guard gate staffing, security patrols, common area maintenance, and the community's signature landscaped entrance."
  },
  {
    "q": "How does The Fountains compare to Legacy at Green Valley?",
    "a": "Both are guard-gated luxury communities in Green Valley. Legacy at Green Valley is centered on the Legacy Golf Course and has a slightly lower price floor ($700K). The Fountains has larger lots, no golf course but more estate-style living, and a higher price ceiling reaching $3M."
  },
  {
    "q": "What schools serve The Fountains?",
    "a": "The Fountains is served by CCSD schools including Coronado High School (8/10), Del E. Webb Middle School (8/10), and Vanderburg Elementary (9/10). Private options include Henderson International School and Bishop Gorman."
  },
  {
    "q": "Is The Fountains a good investment?",
    "a": "The Fountains has been one of Henderson's most stable luxury addresses for over 25 years. Limited inventory (400+ homes), large lots, guard-gated prestige, and consistent executive-buyer demand support strong appreciation and resale values."
  }
]

export default function TheFountainsFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About The Fountains</h2>
          <p>The questions buyers ask most when exploring The Fountains.</p>
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
