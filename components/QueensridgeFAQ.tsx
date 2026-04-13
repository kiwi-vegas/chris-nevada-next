'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for homes in Queensridge?",
    "a": "Homes in Queensridge range from approximately $800,000 for entry-level single-family homes and condominiums in One Queensridge Place to over $5 million for premium custom estates and penthouse residences."
  },
  {
    "q": "Is Queensridge guard-gated?",
    "a": "Yes. Queensridge is a fully guard-gated community with a 24-hour staffed guard gate and roving security patrols. It has been one of the Las Vegas Valley's premier guard-gated communities since 1997."
  },
  {
    "q": "What is One Queensridge Place?",
    "a": "One Queensridge Place consists of twin 18-story luxury condominium towers within the Queensridge community. The towers offer full-service concierge, resort-style pool, fitness center, and spa. Residences range from one-bedroom units to expansive penthouses with panoramic Strip and mountain views."
  },
  {
    "q": "Is Queensridge part of Peccole Ranch?",
    "a": "Yes. Queensridge is geographically located within the Peccole Ranch master plan but operates as a distinct guard-gated community with its own HOA, guard gate, and amenities."
  },
  {
    "q": "What ZIP codes cover Queensridge?",
    "a": "Queensridge is located in ZIP codes 89117 and 89145, in the western Las Vegas Valley."
  },
  {
    "q": "What are HOA fees in Queensridge?",
    "a": "HOA fees in Queensridge typically range from $250 to $700 per month for single-family homes. One Queensridge Place condominium fees are higher, reflecting full-service tower amenities including concierge, pool, fitness center, and security."
  },
  {
    "q": "What schools serve Queensridge?",
    "a": "Queensridge is served by CCSD schools including Palo Verde High School (8/10). The Meadows School (A+), one of Nevada's top private schools, is located adjacent to the community."
  },
  {
    "q": "How does Queensridge compare to Summerlin luxury communities?",
    "a": "Queensridge offers guard-gated luxury comparable to Summerlin's high-end enclaves but at a more central location — 15 minutes to the Strip versus 20-25 minutes from most Summerlin communities. The trade-off is that Queensridge is a more established community without new construction."
  }
]

export default function QueensridgeFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Queensridge</h2>
          <p>The questions buyers ask most when exploring Queensridge.</p>
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
