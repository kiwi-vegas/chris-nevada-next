'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range in Kestrel?",
    "a": "Homes in Kestrel range from approximately $500,000 for production homes to around $800,000 for larger floor plans on premium lots."
  },
  {
    "q": "Is Kestrel new construction?",
    "a": "Yes — Kestrel is one of the newest villages in the Summerlin West Association, actively building since 2020. New homes are available from multiple national builders."
  },
  {
    "q": "What builders are in Kestrel?",
    "a": "Active builders in Kestrel include Toll Brothers, Lennar, Taylor Morrison, and Woodside Homes, each offering multiple floor plans with design center customization."
  },
  {
    "q": "Is Kestrel guard-gated?",
    "a": "No — Kestrel is not guard-gated. For guard-gated options in Summerlin West, Grand Park is nearby with higher price points."
  },
  {
    "q": "What ZIP code is Kestrel in?",
    "a": "Kestrel is located in ZIP code 89138 in the Summerlin West area of Las Vegas."
  },
  {
    "q": "How close is Kestrel to Red Rock Canyon?",
    "a": "Kestrel is one of the closest Summerlin villages to Red Rock Canyon — approximately 8 minutes by car. The village's western position provides direct access to the outdoor recreation hub of the western Las Vegas Valley."
  },
  {
    "q": "What are HOA fees in Kestrel?",
    "a": "HOA fees in Kestrel range from approximately $150 to $300 per month, including the Summerlin master association fee plus the village sub-association fee."
  },
  {
    "q": "How does Kestrel compare to Kestrel Commons?",
    "a": "Both are new-construction Summerlin West villages. Kestrel focuses on single-family homes from the $500Ks. Kestrel Commons offers a broader product mix with some townhome and attached options at slightly lower and higher price points."
  }
]

export default function SummerlinKestrelFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Kestrel</h2>
          <p>The questions buyers ask most when exploring Kestrel.</p>
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
