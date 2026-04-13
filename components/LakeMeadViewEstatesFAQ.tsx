'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for homes in Lake Mead View Estates?",
    "a": "Homes in Lake Mead View Estates range from approximately $600,000 for updated resale homes to over $2 million for larger custom estates on premium lots with direct Lake Mead and mountain views."
  },
  {
    "q": "What views do Lake Mead View Estates homes have?",
    "a": "Many homes enjoy panoramic views of Lake Mead, the River Mountains, and the surrounding desert terrain. East-facing lots provide dramatic sunrise views over the lake."
  },
  {
    "q": "What ZIP code is Lake Mead View Estates in?",
    "a": "Lake Mead View Estates is located in ZIP code 89011 in Henderson, Nevada, in the Lake Las Vegas corridor."
  },
  {
    "q": "Is Lake Mead View Estates guard-gated?",
    "a": "Lake Mead View Estates is not a guard-gated community, though some individual neighborhoods or sections within the area may have controlled access. The nearby Lake Las Vegas community does have gated sections."
  },
  {
    "q": "How far is Lake Mead View Estates from the Strip?",
    "a": "Lake Mead View Estates is approximately 30 minutes from the Las Vegas Strip via Lake Mead Parkway and I-215/I-15. Henderson's shops and restaurants are closer at 15-20 minutes."
  },
  {
    "q": "What recreation is nearby?",
    "a": "Lake Mead National Recreation Area is minutes away for boating, fishing, and hiking. Lake Las Vegas provides kayaking, paddleboarding, lakefront dining, and two championship golf courses. Boulder City's historic downtown is a short drive south."
  }
]

export default function LakeMeadViewEstatesFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Lake Mead View Estates</h2>
          <p>The questions buyers ask most when exploring Lake Mead View Estates.</p>
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
