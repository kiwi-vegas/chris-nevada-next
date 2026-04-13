'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for homes in Rancho Bel Air?",
    "a": "Homes in Rancho Bel Air range from approximately $1 million for updated mid-century properties to over $5 million for fully renovated contemporary estates on premium full-acre lots."
  },
  {
    "q": "Is Rancho Bel Air guard-gated?",
    "a": "Yes. Rancho Bel Air is a guard-gated community with a 24-hour staffed entry gate. It is one of the original guard-gated residential enclaves in Las Vegas, established in the 1960s."
  },
  {
    "q": "What ZIP code is Rancho Bel Air in?",
    "a": "Rancho Bel Air is located in ZIP code 89107 in the central-west area of Las Vegas, near the intersection of Charleston Boulevard and Rancho Drive."
  },
  {
    "q": "How big are the lots in Rancho Bel Air?",
    "a": "Lots in Rancho Bel Air range from approximately half an acre to over a full acre, which is exceptionally large for a central Las Vegas location. Many lots have room for guest houses, pools, tennis courts, and extensive gardens."
  },
  {
    "q": "Can you build a new home in Rancho Bel Air?",
    "a": "Yes. Many buyers purchase existing homes in Rancho Bel Air and do complete ground-up rebuilds on the original lots. The community has seen a wave of contemporary desert-modern rebuilds in recent years, blending new construction with the mature landscaping of the original lots."
  },
  {
    "q": "How close is Rancho Bel Air to the Strip?",
    "a": "Rancho Bel Air is approximately 10 minutes from the Las Vegas Strip via Rancho Drive and I-15. It is one of the closest luxury estate communities to the entertainment corridor."
  },
  {
    "q": "What are HOA fees in Rancho Bel Air?",
    "a": "HOA fees in Rancho Bel Air typically range from $200 to $500 per month. Fees cover guard gate staffing, security patrols, common area maintenance, and community infrastructure."
  },
  {
    "q": "How does Rancho Bel Air compare to Rancho Circle?",
    "a": "Rancho Bel Air and Rancho Circle are both legacy Las Vegas estate communities, but Rancho Circle is the more exclusive of the two with larger lots and higher price points. Rancho Bel Air offers a similar guard-gated estate lifestyle at a more accessible price point."
  }
]

export default function RanchoBelAirFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Rancho Bel Air</h2>
          <p>The questions buyers ask most when exploring Rancho Bel Air.</p>
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
