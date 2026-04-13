'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for homes in Rancho Manor?",
    "a": "Homes in Rancho Manor range from approximately $400,000 for original ranch-style homes to over $1 million for fully renovated or expanded properties on larger lots."
  },
  {
    "q": "Is Rancho Manor guard-gated?",
    "a": "No. Rancho Manor is not guard-gated and most of the neighborhood does not have an HOA. This gives homeowners flexibility for renovations and personal expression."
  },
  {
    "q": "What ZIP code is Rancho Manor in?",
    "a": "Rancho Manor is located in ZIP code 89107 in central-west Las Vegas, near the intersection of Rancho Drive and Charleston Boulevard."
  },
  {
    "q": "When were homes in Rancho Manor built?",
    "a": "Most homes in Rancho Manor were built in the 1950s and 1960s. The neighborhood features classic ranch-style architecture with generous lot sizes typical of that era."
  },
  {
    "q": "Is Rancho Manor a good area for renovation?",
    "a": "Yes. Rancho Manor is one of the best renovation opportunities in central Las Vegas. Large lots, flexible zoning (no HOA in most areas), and a prime location create significant upside for buyers willing to invest in updates."
  },
  {
    "q": "How close is Rancho Manor to shopping?",
    "a": "Rancho Manor is approximately 8 minutes from Downtown Summerlin's 125+ shops and restaurants, and within walking distance or a short drive of grocery stores, restaurants, and daily services along Charleston Boulevard and Rancho Drive."
  },
  {
    "q": "Are there HOA fees in Rancho Manor?",
    "a": "Most of Rancho Manor does not have an HOA, which means no monthly HOA fees. Some sections may have a minimal voluntary association with fees under $50 per month."
  },
  {
    "q": "How does Rancho Manor compare to nearby luxury communities?",
    "a": "Rancho Manor offers the same central-west Las Vegas location as neighboring Rancho Bel Air and Rancho Circle at significantly lower price points. You trade guard-gated security for no-HOA flexibility and entry prices that are 60–75% lower."
  }
]

export default function RanchoManorFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Rancho Manor</h2>
          <p>The questions buyers ask most when exploring Rancho Manor.</p>
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
