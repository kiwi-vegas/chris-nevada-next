'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range in Redpoint?",
    "a": "Homes in Redpoint range from approximately $650,000 for production homes to over $2 million for larger semi-custom and custom homes on premium lots with mountain views."
  },
  {
    "q": "Is Redpoint new construction?",
    "a": "Yes — Redpoint is actively building with new homes available from premium national builders. Construction began in 2020 and the village continues to expand."
  },
  {
    "q": "Is Redpoint guard-gated?",
    "a": "No — Redpoint is not guard-gated. It delivers premium new construction and mountain views without the guard-gate premium. For guard-gated options nearby, Grand Park is within the Summerlin West Association."
  },
  {
    "q": "What ZIP code is Redpoint in?",
    "a": "Redpoint is located in ZIP code 89138 in the Summerlin West area of Las Vegas."
  },
  {
    "q": "How close is Redpoint to Red Rock Canyon?",
    "a": "Redpoint is approximately 7 minutes from Red Rock Canyon NCA — one of the closest residential communities to Red Rock in all of Las Vegas. Many homes enjoy direct views of the canyon."
  },
  {
    "q": "What schools serve Redpoint?",
    "a": "Redpoint is served by CCSD schools including Kesterson Elementary (8/10), Rogich Middle (10/10), and Arbor View High School (7/10). Private options including The Meadows School (A+) and Bishop Gorman (A+) are nearby."
  },
  {
    "q": "What are HOA fees in Redpoint?",
    "a": "HOA fees in Redpoint range from approximately $175 to $400 per month, including the Summerlin master association fee plus the village sub-association fee."
  },
  {
    "q": "How does Redpoint compare to La Madre Peaks?",
    "a": "Both are premium Summerlin West villages. La Madre Peaks offers luxury and ultra-luxury homes from $800K to $5M+. Redpoint offers premium new construction from $650K to $2M+. Redpoint provides exceptional value at the premium-but-not-ultra-luxury tier."
  }
]

export default function SummerlinRedpointFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Redpoint</h2>
          <p>The questions buyers ask most when exploring Redpoint.</p>
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
