'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range in Summerlin Centre?",
    "a": "Homes in Summerlin Centre range from approximately $450,000 for smaller homes to around $800,000 for larger, updated properties on premium lots."
  },
  {
    "q": "Is Summerlin Centre guard-gated?",
    "a": "No — Summerlin Centre is not guard-gated. Some neighborhoods have gated entry with key-fob or code access, but there is no staffed guard gate."
  },
  {
    "q": "What ZIP code is Summerlin Centre in?",
    "a": "Summerlin Centre is located primarily in ZIP codes 89135 and 89144 in the Summerlin South area of Las Vegas."
  },
  {
    "q": "When was Summerlin Centre built?",
    "a": "Summerlin Centre was developed beginning in 2001. Most homes were built between 2001 and the mid-2000s as part of the Summerlin South expansion."
  },
  {
    "q": "What schools serve Summerlin Centre?",
    "a": "Summerlin Centre is served by CCSD schools including Lowman Elementary (8/10), Rogich Middle (10/10), and Palo Verde High School (8/10). Private options including The Meadows School (A+) are nearby."
  },
  {
    "q": "What are HOA fees in Summerlin Centre?",
    "a": "HOA fees in Summerlin Centre range from approximately $100 to $225 per month, including the Summerlin master association fee plus the village sub-association fee."
  },
  {
    "q": "What makes Summerlin Centre unique?",
    "a": "Summerlin Centre's defining advantage is its central location — positioned at the heart of Summerlin South with the shortest distances to Downtown Summerlin, the 215 Beltway, and multiple commercial corridors. Everything is close."
  },
  {
    "q": "How does Summerlin Centre compare to The Gardens?",
    "a": "Both are established Summerlin South villages at similar price points. The Gardens emphasizes parks and green spaces. Summerlin Centre emphasizes central location and commercial convenience. Both are excellent mid-range Summerlin South values."
  }
]

export default function SummerlinCentreFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Summerlin Centre</h2>
          <p>The questions buyers ask most when exploring Summerlin Centre.</p>
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
