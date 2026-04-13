'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for homes in Silverstone?",
    "a": "Homes in Silverstone range from approximately $400,000 for smaller single-family homes to $700,000 for larger residences on premium lots."
  },
  {
    "q": "What ZIP codes cover Silverstone?",
    "a": "Silverstone spans portions of ZIP codes 89074 and 89052 in Henderson, Nevada."
  },
  {
    "q": "What schools serve Silverstone?",
    "a": "Silverstone is served by well-regarded CCSD Henderson schools including Elise L. Wolff Elementary (8/10), Del E. Webb Middle School (8/10), and Coronado High School (7/10)."
  },
  {
    "q": "How far is Silverstone from the Strip?",
    "a": "Silverstone is approximately 20 minutes from the Las Vegas Strip via I-215 and I-15 North."
  },
  {
    "q": "Is Silverstone a good area for families?",
    "a": "Yes. Silverstone offers top-rated schools, community parks, safe neighborhoods, and Henderson's excellent municipal services — all at moderate pricing."
  },
  {
    "q": "What are HOA fees in Silverstone?",
    "a": "HOA fees in Silverstone typically range from $60 to $150 per month, covering common area maintenance, parks, and community amenities."
  },
  {
    "q": "Is there a golf course at Silverstone?",
    "a": "The original Silverstone Golf Club has been redeveloped. The area still benefits from proximity to multiple Henderson golf courses including Anthem and Revere."
  },
  {
    "q": "How does Silverstone compare to Seven Hills?",
    "a": "Silverstone offers similar Henderson quality at a lower price point. Seven Hills has a golf course and slightly more premium positioning, but Silverstone delivers excellent value."
  }
]

export default function HendersonSilverstoneFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Silverstone</h2>
          <p>The questions buyers ask most when exploring Silverstone.</p>
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
