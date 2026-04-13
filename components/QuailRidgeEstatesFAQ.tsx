'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for homes in Quail Ridge Estates?",
    "a": "Homes in Quail Ridge Estates range from approximately $1 million for semi-custom resales to over $3 million for custom estates on premium lots."
  },
  {
    "q": "Is Quail Ridge Estates guard-gated?",
    "a": "Yes. Quail Ridge Estates has a 24-hour staffed guard gate with security patrols. With fewer than 200 homes, it is one of the most intimate and exclusive guard-gated communities in Henderson."
  },
  {
    "q": "What ZIP code is Quail Ridge Estates in?",
    "a": "Quail Ridge Estates is located in ZIP code 89014 in Henderson, Nevada, within the Green Valley corridor."
  },
  {
    "q": "How many homes are in Quail Ridge Estates?",
    "a": "Quail Ridge Estates has approximately 200 homes, making it one of the smallest and most exclusive guard-gated communities in Henderson. Listings are rare and often sell quickly."
  },
  {
    "q": "What are HOA fees in Quail Ridge Estates?",
    "a": "HOA fees typically range from $300 to $700 per month, covering 24-hour guard gate staffing, security patrols, common area maintenance, and the community's mature landscaping."
  },
  {
    "q": "How does Quail Ridge compare to The Fountains?",
    "a": "Both are guard-gated luxury communities in Green Valley. The Fountains has more homes (400+) and a wider price range ($800K–$3M). Quail Ridge is smaller (200 homes) and more exclusive, with a higher entry point ($1M) and more of a private, intimate feel."
  },
  {
    "q": "What schools serve Quail Ridge Estates?",
    "a": "Quail Ridge Estates is served by Green Valley High School (8/10), Greenspun Junior High (7/10), and C.T. Sewell Elementary (8/10). Private options include Henderson International School and Bishop Gorman."
  },
  {
    "q": "Is Quail Ridge Estates a good investment?",
    "a": "Quail Ridge Estates benefits from extreme scarcity — fewer than 200 homes means listings are rare. The combination of guard-gated prestige, large lots, and a proven location supports strong appreciation and resale values."
  },
  {
    "q": "How does the guard gate entry process work?",
    "a": "Residents receive transponders or access codes for automatic entry. Guests must be called in by the homeowner or added to a pre-approved list. Delivery drivers and service providers follow the community's vendor access policy. Most guard-gated communities staff the gate 24 hours a day, 7 days a week."
  },
  {
    "q": "Can non-residents access the community for viewings?",
    "a": "Yes. Prospective buyers can access the community with a licensed real estate agent who coordinates entry with the guard gate in advance. Nevada Real Estate Group handles all gate access arrangements for property showings."
  },
  {
    "q": "What security features are included beyond the guard gate?",
    "a": "Most guard-gated communities include perimeter walls, security patrols, surveillance cameras at entry points, and emergency response coordination. Some communities also offer interior patrol routes and resident notification systems."
  },
  {
    "q": "Are there custom home lot opportunities?",
    "a": "Some luxury communities offer vacant lots for custom home construction. Lot sizes, architectural guidelines, and approved builders vary by community. Nevada Real Estate Group can help identify available custom lot inventory and connect you with approved builders."
  },
  {
    "q": "What is the resale value trend for luxury homes in this area?",
    "a": "Luxury properties in guard-gated and premium communities have historically outperformed the broader market in terms of value retention during downturns and appreciation during growth periods. Limited supply in guard-gated communities creates structural price support."
  }
]

export default function QuailRidgeEstatesFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Quail Ridge Estates</h2>
          <p>The questions buyers ask most when exploring Quail Ridge Estates.</p>
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
