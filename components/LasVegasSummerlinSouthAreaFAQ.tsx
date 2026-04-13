'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range in the Summerlin South Area?",
    "a": "Homes range from approximately $500,000 for production homes in family villages to over $20 million for custom estates in The Ridges and Red Rock Country Club."
  },
  {
    "q": "What guard-gated communities are in Summerlin South?",
    "a": "The Ridges, Red Rock Country Club, Tournament Hills, Canyon Fairways, Eagle Hills, and portions of The Hills South are all guard-gated communities in the Summerlin South Area."
  },
  {
    "q": "What ZIP codes cover Summerlin South?",
    "a": "The Summerlin South Area primarily spans ZIP codes 89135 and 89138."
  },
  {
    "q": "What is Downtown Summerlin?",
    "a": "Downtown Summerlin is a 400-acre urban core with 125+ shops and restaurants, Las Vegas Ballpark (minor league baseball), an NHL practice facility, and Red Rock Resort & Casino."
  },
  {
    "q": "How close is Summerlin South to Red Rock Canyon?",
    "a": "The western edge of Summerlin South backs directly against Red Rock Canyon National Conservation Area. The scenic loop entrance is approximately 10 minutes via Charleston Boulevard."
  },
  {
    "q": "What schools serve Summerlin South?",
    "a": "The area is served by top-rated schools including Bonner Elementary (9/10), Rogich Middle (7/10), and Palo Verde High (8/10). Premier private schools include The Meadows (A+) and Bishop Gorman (A+)."
  },
  {
    "q": "What golf courses are in Summerlin South?",
    "a": "Bear's Best (Jack Nicklaus), Red Rock Country Club (two Arnold Palmer courses), TPC Las Vegas, and Angel Park are all within or adjacent to the area."
  },
  {
    "q": "How far is Summerlin South from the Strip?",
    "a": "Summerlin South is approximately 20 minutes from the Las Vegas Strip via Summerlin Parkway and I-15."
  }
]

export default function LasVegasSummerlinSouthAreaFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Summerlin South Area</h2>
          <p>The questions buyers ask most when exploring Summerlin South Area.</p>
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
