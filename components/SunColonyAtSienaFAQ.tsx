'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the age requirement for Sun Colony at Siena?",
    "a": "Sun Colony at Siena is a 55+ community within the guard-gated Siena neighborhood. At least one resident in each home must be 55 or older, per HUD guidelines."
  },
  {
    "q": "What is the price range for homes in Sun Colony at Siena?",
    "a": "Homes in Sun Colony at Siena range from approximately $700,000 for established interior homes to over $1.3 million for golf course or mountain-view estate homes."
  },
  {
    "q": "Is Sun Colony at Siena guard-gated?",
    "a": "Yes. Sun Colony is within the guard-gated Siena community, which has a 24-hour staffed guard gate and security patrols covering the entire Siena neighborhood."
  },
  {
    "q": "Does Sun Colony have golf?",
    "a": "Sun Colony residents have access to the Siena Golf Club, an 18-hole Schmidt-Curley championship course with mountain views, a pro shop, driving range, and restaurant."
  },
  {
    "q": "What are HOA fees in Sun Colony at Siena?",
    "a": "HOA fees typically range from $300 to $600 per month, covering guard gate staffing, community center operations, pool maintenance, landscaping, and the Summerlin master association fee."
  },
  {
    "q": "How does Sun Colony compare to other 55+ communities in Summerlin?",
    "a": "Sun Colony at Siena is the most upscale 55+ community in Summerlin, with larger homes ($700K–$1.3M+) and golf course access. Regency, Trilogy, and Heritage at Stonebridge offer newer construction at lower price points but without golf."
  },
  {
    "q": "What ZIP code is Sun Colony at Siena in?",
    "a": "Sun Colony at Siena is located in ZIP code 89135 in the Summerlin South area of Las Vegas."
  },
  {
    "q": "What is Siena Golf Club?",
    "a": "Siena Golf Club is an 18-hole championship golf course designed by Schmidt-Curley Design, located within the guard-gated Siena community. The course features dramatic mountain views and is available to Siena residents."
  }
]

export default function SunColonyAtSienaFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Sun Colony at Siena</h2>
          <p>The questions buyers ask most when exploring Sun Colony at Siena.</p>
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
