'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for homes in Cadence Park?",
    "a": "Homes in Cadence Park range from approximately $400,000 for entry-level new construction to $650,000 for larger homes on premium park-adjacent lots."
  },
  {
    "q": "Is Cadence Park still building new homes?",
    "a": "Yes — Cadence Park has active new-home construction from multiple national builders including Lennar, Richmond American, and Century Communities. Both build-to-order and quick move-in options are available."
  },
  {
    "q": "What is Cadence Central Park?",
    "a": "Cadence Central Park is a 50-acre civic amenity featuring an amphitheater, sports fields, splash pad, playground, community garden, and walking trails. It hosts regular community events including concerts, movie nights, and farmers markets."
  },
  {
    "q": "What ZIP code is Cadence Park in?",
    "a": "Cadence Park is located in ZIP code 89011 in Henderson, Nevada."
  },
  {
    "q": "What are HOA fees in Cadence Park?",
    "a": "HOA fees typically range from $80 to $200 per month, covering common area maintenance, parks, trails, and community amenities."
  },
  {
    "q": "Is Cadence Park guard-gated?",
    "a": "No — Cadence Park is part of the open Cadence master-planned community with HOA governance. There are no guard gates."
  },
  {
    "q": "What schools serve Cadence Park?",
    "a": "Cadence Park is served by CCSD schools including Elise L. Wolff Elementary (8/10) and Jack Lund Schofield Middle School (7/10). Doral Academy (9/10) is a popular charter school nearby."
  },
  {
    "q": "How does Cadence compare to Inspirada?",
    "a": "Both are newer Henderson master-planned communities with strong amenity packages. Cadence offers slightly more accessible pricing and the 50-acre Central Park, while Inspirada emphasizes design-forward gathering spaces and plaza-style architecture. Both are excellent family choices."
  }
]

export default function HendersonCadenceParkFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Cadence Park</h2>
          <p>The questions buyers ask most when exploring Cadence Park.</p>
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
