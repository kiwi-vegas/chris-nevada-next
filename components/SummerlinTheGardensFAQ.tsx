'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range in The Gardens?",
    "a": "Homes in The Gardens range from approximately $450,000 for smaller homes and attached products to around $750,000 for larger, updated properties on premium lots."
  },
  {
    "q": "Is The Gardens guard-gated?",
    "a": "No — The Gardens is not guard-gated. Some neighborhoods within the village have gated entry with key-fob or code access, but there is no staffed guard gate."
  },
  {
    "q": "What ZIP code is The Gardens in?",
    "a": "The Gardens is located primarily in ZIP codes 89135 and 89134 in the Summerlin South area of Las Vegas."
  },
  {
    "q": "When was The Gardens built?",
    "a": "The Gardens was developed beginning in 1999. Most homes were built between 1999 and the mid-2000s as part of the Summerlin South expansion."
  },
  {
    "q": "What schools serve The Gardens?",
    "a": "The Gardens is served by CCSD schools including Lowman Elementary (8/10), Rogich Middle (10/10), and Palo Verde High School (8/10). Private options including The Meadows School (A+) are nearby."
  },
  {
    "q": "What are HOA fees in The Gardens?",
    "a": "HOA fees in The Gardens range from approximately $75 to $200 per month, including the Summerlin master association fee plus the village sub-association fee."
  },
  {
    "q": "What is Gardens Park?",
    "a": "Gardens Park is a major Summerlin community park located within The Gardens village. It features approximately 15 acres of playgrounds, basketball courts, walking trails, picnic areas, open fields, and a dog park."
  },
  {
    "q": "How does The Gardens compare to The Pueblo?",
    "a": "Both are established Summerlin South villages at accessible price points. The Gardens emphasizes park-centered design with extensive green spaces. The Pueblo tends to have slightly lower entry pricing. Both offer excellent Summerlin South value."
  }
]

export default function SummerlinTheGardensFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About The Gardens</h2>
          <p>The questions buyers ask most when exploring The Gardens.</p>
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
