'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for homes in Green Valley?",
    "a": "Homes in Green Valley range from approximately $350,000 for condominiums and entry-level single-family homes to over $3 million for luxury estates in guard-gated enclaves like Green Valley Highlands and golf course communities."
  },
  {
    "q": "What ZIP codes is Green Valley in?",
    "a": "Green Valley spans multiple ZIP codes in Henderson: 89014, 89074, 89052, 89012, and 89015. The specific ZIP depends on which section of Green Valley the property is in."
  },
  {
    "q": "Are there good schools in Green Valley?",
    "a": "Yes. Green Valley is served by some of the highest-rated public schools in the Las Vegas Valley, including Nate Mack Elementary (9/10), Elise L. Wolff Elementary (9/10), Bob Miller Middle School (8/10), and Green Valley High School (7/10)."
  },
  {
    "q": "Is Green Valley the same as Green Valley Ranch?",
    "a": "Green Valley Ranch is a large section within the broader Green Valley community. Green Valley Ranch was developed later, primarily in the 1990s and 2000s, and has its own retail center, parks, and resort-casino."
  },
  {
    "q": "What is The District at Green Valley Ranch?",
    "a": "The District is an open-air shopping and dining center with 40+ shops and restaurants, fountains, outdoor seating, and regular community events. It serves as the primary retail hub for Green Valley Ranch and the surrounding neighborhoods."
  },
  {
    "q": "When was Green Valley established?",
    "a": "Green Valley was established in 1978 by the American Nevada Corporation. It was one of the first large-scale master-planned communities in the Las Vegas Valley and is credited with establishing Henderson as a premier residential city."
  },
  {
    "q": "Is Green Valley guard-gated?",
    "a": "Most of Green Valley is not guard-gated. However, several luxury sub-communities within Green Valley, including Green Valley Highlands and portions of Green Valley Ranch, are guard-gated with 24-hour security."
  },
  {
    "q": "What are HOA fees in Green Valley?",
    "a": "HOA fees in Green Valley range from approximately $30 to $300+ per month depending on the specific neighborhood and amenities. Guard-gated and golf communities have higher fees, while established neighborhoods may have minimal association fees."
  }
]

export default function GreenValleyFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Green Valley</h2>
          <p>The questions buyers ask most when exploring Green Valley.</p>
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
