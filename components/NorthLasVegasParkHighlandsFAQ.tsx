'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for homes in Park Highlands?",
    "a": "Homes in Park Highlands range from approximately $350,000 for entry-level new construction to $600,000 for larger single-family homes with premium features and elevated lot positioning."
  },
  {
    "q": "Is Park Highlands still building new homes?",
    "a": "Yes. Park Highlands is actively developing with multiple national builders delivering new construction across ongoing phases. The community is entitled for over 10,000 homes at full build-out."
  },
  {
    "q": "What builders are in Park Highlands?",
    "a": "National builders in Park Highlands include Shea Homes, Lennar, KB Home, Richmond American, and Taylor Morrison. Multiple model homes are available for touring."
  },
  {
    "q": "What ZIP codes is Park Highlands in?",
    "a": "Park Highlands spans ZIP codes 89085 and 89086 in North Las Vegas, Nevada."
  },
  {
    "q": "Is Park Highlands guard-gated?",
    "a": "No. Park Highlands is not guard-gated. It is an open master-planned community with HOA governance, community parks, and trail systems."
  },
  {
    "q": "What are HOA fees in Park Highlands?",
    "a": "HOA fees in Park Highlands typically range from $60 to $150 per month, covering community parks, trail system, common area maintenance, and master plan governance."
  },
  {
    "q": "How does Park Highlands compare to Aliante?",
    "a": "Park Highlands is a newer community with active new construction, while Aliante is more established with a golf course and casino. Park Highlands offers the newest homes and floor plans; Aliante offers more mature amenities and community character."
  },
  {
    "q": "How far is Park Highlands from the Strip?",
    "a": "Park Highlands is approximately 25 minutes from the Las Vegas Strip via I-15 South. Downtown Las Vegas is approximately 15 minutes away."
  }
]

export default function NorthLasVegasParkHighlandsFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Park Highlands</h2>
          <p>The questions buyers ask most when exploring Park Highlands.</p>
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
