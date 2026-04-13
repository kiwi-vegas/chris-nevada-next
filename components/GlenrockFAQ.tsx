'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for homes in Glenrock?",
    "a": "Homes in Glenrock start at approximately $1.58 million and extend beyond $2 million for premium lots with upgraded finishes and mountain views. All homes are new construction by Toll Brothers."
  },
  {
    "q": "Is Glenrock guard-gated?",
    "a": "Yes. Glenrock is a guard-gated community with a 24-hour staffed guard gate. It is one of the few guard-gated neighborhoods within Grand Park village in Summerlin West."
  },
  {
    "q": "Who builds homes in Glenrock?",
    "a": "Toll Brothers is the exclusive builder in Glenrock. Floor plans range from approximately 3,800 to 5,500+ square feet with contemporary desert architecture and premium finishes."
  },
  {
    "q": "What village is Glenrock in?",
    "a": "Glenrock is located in Grand Park village, part of the Summerlin West Association — the newest and westernmost area of Summerlin's master plan."
  },
  {
    "q": "How close is Glenrock to Red Rock Canyon?",
    "a": "Red Rock Canyon National Conservation Area is approximately 5–10 minutes from Glenrock via W Charleston Blvd. The Summerlin trail system provides direct connectivity to hiking routes."
  },
  {
    "q": "What are HOA fees in Glenrock?",
    "a": "HOA fees typically range from $300 to $700 per month, covering the Summerlin master association fee plus the Glenrock sub-association guard gate and community maintenance fees."
  },
  {
    "q": "How does Glenrock compare to Carlisle Peak?",
    "a": "Both are guard-gated new construction communities in Grand Park. Glenrock is built by Toll Brothers while Carlisle Peak is built by Tri Pointe Homes. Prices and floor plan sizes are comparable. Buyers often compare both before deciding based on architecture, lot position, and builder preference."
  },
  {
    "q": "What ZIP code is Glenrock in?",
    "a": "Glenrock is located in ZIP code 89138 in the Summerlin West area of Las Vegas."
  }
]

export default function GlenrockFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Glenrock</h2>
          <p>The questions buyers ask most when exploring Glenrock.</p>
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
