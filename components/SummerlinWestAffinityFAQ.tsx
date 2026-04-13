'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for homes in Affinity by Taylor Morrison?",
    "a": "Homes in Affinity range from approximately $500,000 for single-story plans to $800,000 for premium two-story homes on the best lots with mountain views."
  },
  {
    "q": "Who is the builder for Affinity?",
    "a": "Affinity is built by Taylor Morrison, one of the top five national homebuilders. Taylor Morrison is known for quality construction, modern design, Energy Star ratings, and comprehensive new-home warranties."
  },
  {
    "q": "Is Affinity still selling new homes?",
    "a": "Affinity has active new-home sales with both build-to-order and quick move-in inventory available. Contact Nevada Real Estate Group for current availability and pricing."
  },
  {
    "q": "What ZIP code is Affinity in?",
    "a": "Affinity by Taylor Morrison is located in ZIP code 89138 in the Summerlin West section of Las Vegas."
  },
  {
    "q": "What are HOA fees in Affinity?",
    "a": "HOA fees typically range from $175 to $400 per month, covering the Summerlin master association fee plus the Affinity neighborhood sub-association fee."
  },
  {
    "q": "What schools serve Affinity?",
    "a": "Affinity is served by top-rated schools including Sig Rogich Middle School (10/10 GreatSchools) and Staton Elementary (8/10). The Meadows School (A+) and Bishop Gorman (A+) are nearby private options."
  },
  {
    "q": "How close is Affinity to Red Rock Canyon?",
    "a": "Red Rock Canyon National Conservation Area is approximately 10 minutes from Affinity via West Charleston Boulevard. Many Affinity homes have views of the canyon's formations."
  },
  {
    "q": "Is Affinity guard-gated?",
    "a": "Affinity is not guard-gated. It is part of the Summerlin West open community with HOA governance and well-maintained common areas. Guard-gated options in Summerlin West include nearby communities like Carlisle Peak and Glenrock."
  }
]

export default function SummerlinWestAffinityFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Affinity by Taylor Morrison</h2>
          <p>The questions buyers ask most when exploring Affinity by Taylor Morrison.</p>
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
