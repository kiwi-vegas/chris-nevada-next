'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range at The Lake at Las Vegas?",
    "a": "Waterfront and lake-community properties at Lake Las Vegas range from approximately $500,000 for condos and townhomes to over $2 million for custom lakefront estates with private docks. The average single-family home on the lake sells between $800K and $1.5M."
  },
  {
    "q": "Is Lake Las Vegas guard-gated?",
    "a": "Portions of Lake Las Vegas are guard-gated, including the South Shore enclave and several newer developments. The MonteLago Village and some lakeside areas are accessible to the public for dining and recreation."
  },
  {
    "q": "Can you boat on the lake?",
    "a": "Yes. Lake Las Vegas allows electric boating, kayaking, paddleboarding, and other non-motorized watercraft. Select properties have private docks with direct lake access. Motorized boats with combustion engines are not permitted."
  },
  {
    "q": "What golf courses are at Lake Las Vegas?",
    "a": "Reflection Bay Golf Club is a Jack Nicklaus-designed championship course overlooking the lake, open to the public. It is consistently ranked among Nevada's best courses."
  },
  {
    "q": "How far is Lake Las Vegas from the Strip?",
    "a": "Lake Las Vegas is approximately 30 minutes from the Las Vegas Strip via Lake Mead Parkway and I-215/I-15. Harry Reid Airport is about 25 minutes away."
  },
  {
    "q": "What ZIP code is Lake Las Vegas in?",
    "a": "Lake Las Vegas is in ZIP code 89011 in Henderson, Nevada."
  },
  {
    "q": "Is Lake Las Vegas a good investment?",
    "a": "Lake Las Vegas offers unique waterfront living that cannot be replicated elsewhere in the Las Vegas Valley. The limited inventory, resort amenities, and growing demand for lakefront properties support long-term value. Many properties also perform well as vacation rentals."
  },
  {
    "q": "What are HOA fees at Lake Las Vegas?",
    "a": "HOA fees at Lake Las Vegas range from approximately $200 to $800 per month depending on the specific community. Fees cover lake maintenance, common areas, guard gate staffing (where applicable), and community amenities."
  }
]

export default function HendersonLakeAtLasVegasFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About The Lake at Las Vegas</h2>
          <p>The questions buyers ask most when exploring The Lake at Las Vegas.</p>
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
