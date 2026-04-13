'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for homes in Corte Bella?",
    "a": "Homes in Corte Bella range from approximately $600,000 to $1.5 million, making it the most accessible guard-gated community in The Hills South village of Summerlin."
  },
  {
    "q": "Is Corte Bella guard-gated?",
    "a": "Yes. Corte Bella is a guard-gated community with a 24-hour staffed guard gate. It is one of four guard-gated enclaves within The Hills South village."
  },
  {
    "q": "What village is Corte Bella in?",
    "a": "Corte Bella is located within The Hills South village of the Summerlin South Association, alongside Country Club Hills, Eagle Hills, and Tournament Hills."
  },
  {
    "q": "What ZIP code is Corte Bella in?",
    "a": "Corte Bella is located in ZIP code 89135 in the Summerlin South area of Las Vegas."
  },
  {
    "q": "What are HOA fees in Corte Bella?",
    "a": "HOA fees typically range from $250 to $600 per month, covering the Summerlin master association fee plus the Corte Bella sub-association fee for guard gate staffing and community maintenance."
  },
  {
    "q": "What schools serve Corte Bella?",
    "a": "Corte Bella is zoned for top CCSD schools including Sig Rogich Middle School (10/10 GreatSchools) and Palo Verde High School (8/10). The Meadows School (A+) and Bishop Gorman (A+) are nearby private options."
  },
  {
    "q": "How does Corte Bella compare to Country Club Hills?",
    "a": "Country Club Hills ($900K–$3M+) offers larger custom estates near TPC Summerlin's golf course. Corte Bella ($600K–$1.5M) provides the same guard-gated security and school zoning at a more accessible price point with smaller, family-focused homes."
  },
  {
    "q": "Is Corte Bella a good investment?",
    "a": "Corte Bella benefits from strong demand — guard-gated communities with top school zoning in Summerlin are limited, and the sub-$1M entry point attracts a broad buyer pool. Resale values have been consistently strong."
  }
]

export default function CorteBellaSummerlinFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Corte Bella</h2>
          <p>The questions buyers ask most when exploring Corte Bella.</p>
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
