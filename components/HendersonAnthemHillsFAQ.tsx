'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range in Anthem Hills?",
    "a": "Homes in Anthem Hills range from approximately $600,000 to over $1 million. The elevated hillside positioning and valley views command a premium over the lower-elevation Anthem Center neighborhoods."
  },
  {
    "q": "Is Anthem Hills guard-gated?",
    "a": "No. Anthem Hills is not guard-gated, which keeps it more accessible than the neighboring Anthem Country Club. It is part of the broader Anthem master plan with access to all community amenities."
  },
  {
    "q": "What views do Anthem Hills homes have?",
    "a": "Anthem Hills homes enjoy panoramic views of the Las Vegas Valley, the Strip skyline, and the McCullough Range. Higher-elevation properties have the most dramatic views, particularly at sunset."
  },
  {
    "q": "What ZIP code is Anthem Hills in?",
    "a": "Anthem Hills is in ZIP code 89052 in Henderson, Nevada."
  },
  {
    "q": "How does Anthem Hills compare to Anthem Country Club?",
    "a": "Anthem Hills offers elevated views and premium homes at $600K–$1M without the guard gate or golf membership. Anthem Country Club is guard-gated with a golf course at $1.2M–$8M+. Both share Anthem's community amenities."
  },
  {
    "q": "What schools serve Anthem Hills?",
    "a": "Anthem Hills is served by CCSD schools including Elise L. Wolff Elementary (9/10) and Del E. Webb Middle School (7/10). Henderson International School (A) and Bishop Gorman (A+) are top private options."
  },
  {
    "q": "What are HOA fees in Anthem Hills?",
    "a": "HOA fees in Anthem Hills range from $125 to $275 per month, covering Anthem master community maintenance, parks, trails, and community amenities."
  },
  {
    "q": "Are there hiking trails near Anthem Hills?",
    "a": "Yes. The McCullough Hills Trail system provides direct access to desert hiking, mountain biking, and wildlife viewing from the edges of the community. Anthem's internal trail system also connects throughout the master plan."
  }
]

export default function HendersonAnthemHillsFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Anthem Hills</h2>
          <p>The questions buyers ask most when exploring Anthem Hills.</p>
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
