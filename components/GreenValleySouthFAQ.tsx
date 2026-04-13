'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for homes in Green Valley South?",
    "a": "Green Valley South offers one of the widest price ranges in Henderson, from approximately $350,000 for condos and townhomes to over $3 million in guard-gated luxury enclaves like The Fountains and Legacy at Green Valley."
  },
  {
    "q": "Is Green Valley South guard-gated?",
    "a": "Green Valley South as a whole is not guard-gated, but it contains several guard-gated luxury enclaves including The Fountains, Legacy at Green Valley, Quail Ridge Estates, and Southfork."
  },
  {
    "q": "What ZIP codes cover Green Valley South?",
    "a": "Green Valley South spans ZIP codes 89012 and 89052 in Henderson, Nevada."
  },
  {
    "q": "How does Green Valley South compare to Green Valley North?",
    "a": "Green Valley South has newer construction, more luxury options, and a wider price range. Green Valley North is the original community with more mature trees and a more established character. Both share the Green Valley brand and Henderson location."
  },
  {
    "q": "What is the Green Valley Ranch Resort?",
    "a": "Green Valley Ranch Resort and Spa is a Station Casinos property within the community featuring fine dining, entertainment, a movie theater, a spa, and the Henderson Pavilion outdoor amphitheater. It's both a destination and a community landmark."
  },
  {
    "q": "What schools serve Green Valley South?",
    "a": "Green Valley South is served by multiple CCSD school zones. Key schools include Coronado High School (8/10), Del E. Webb Middle School (8/10), and Vanderburg Elementary (9/10). Private and charter options are also plentiful."
  },
  {
    "q": "What are HOA fees in Green Valley South?",
    "a": "HOA fees vary dramatically by community — from approximately $50/month in single-family neighborhoods to $350/month in guard-gated communities with extensive amenities."
  },
  {
    "q": "Is Green Valley South a good area for families?",
    "a": "Yes. Green Valley South is one of Henderson's most popular family areas, with highly rated schools, multiple parks, connected trails, and safe neighborhoods. The community amenities and central location make it practical for daily family life."
  }
]

export default function GreenValleySouthFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Green Valley South</h2>
          <p>The questions buyers ask most when exploring Green Valley South.</p>
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
