'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for homes in Olympia Ridge?",
    "a": "Homes in Olympia Ridge range from approximately $1.5 million for resale semi-custom residences to over $5 million for newer custom estates on premium golf course lots with panoramic mountain and fairway views."
  },
  {
    "q": "Is Olympia Ridge guard-gated?",
    "a": "Yes — Olympia Ridge is double guard-gated. The community has its own 24-hour staffed guard gate within the larger Southern Highlands guard-gated master plan, providing two layers of security."
  },
  {
    "q": "What golf course is in Olympia Ridge?",
    "a": "Olympia Ridge sits along the Southern Highlands Golf Club, a private championship course redesigned by Jack Nicklaus. Many homes have direct fairway frontage. Membership is by application and not included with home purchase."
  },
  {
    "q": "How does Olympia Ridge compare to The Ridges?",
    "a": "Both are ultra-luxury guard-gated golf communities. The Ridges (Summerlin) backs against Red Rock Canyon and commands higher per-square-foot prices. Olympia Ridge offers comparable quality with larger lots and lower prices per square foot, plus a 15-minute airport commute versus 30+ minutes from The Ridges."
  },
  {
    "q": "What are HOA fees in Olympia Ridge?",
    "a": "HOA fees in Olympia Ridge typically range from $300 to $800 per month, which includes the Southern Highlands master association fee plus the Olympia Ridge sub-association fee. Fees cover guard gate staffing, security patrols, and common area maintenance."
  },
  {
    "q": "What ZIP code is Olympia Ridge in?",
    "a": "Olympia Ridge is located in ZIP code 89141 in the Southern Highlands area of Las Vegas, Nevada."
  },
  {
    "q": "Is Olympia Ridge a good investment?",
    "a": "Olympia Ridge benefits from the same fundamentals that make all of Southern Highlands attractive — guard-gated prestige, private golf club anchoring, limited lot inventory, and consistent demand from executives and high-net-worth buyers. The community has demonstrated strong appreciation and holds value well through market cycles."
  },
  {
    "q": "What is Olympia Ridge Estates?",
    "a": "Olympia Ridge Estates is the most exclusive section within Olympia Ridge, featuring the largest custom lots (half-acre+) with the most direct golf course views and the highest price points, typically starting above $3 million."
  }
]

export default function OlympiaRidgeFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Olympia Ridge</h2>
          <p>The questions buyers ask most when exploring Olympia Ridge.</p>
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
