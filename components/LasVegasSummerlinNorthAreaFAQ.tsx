'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range in the Summerlin North area?",
    "a": "Homes in Summerlin North range from approximately $400,000 for established homes in the earlier villages to over $1.5 million for guard-gated properties in the Trails and Vistas."
  },
  {
    "q": "Is Summerlin North part of the Summerlin master plan?",
    "a": "Yes. Summerlin North is the original section of the Howard Hughes Corporation's Summerlin master plan, encompassing the earliest villages developed beginning in 1990."
  },
  {
    "q": "What ZIP codes are in Summerlin North?",
    "a": "Summerlin North spans ZIP codes 89134 and 89144 in Las Vegas, Nevada."
  },
  {
    "q": "What is TPC Las Vegas?",
    "a": "TPC Las Vegas is a PGA Tour venue located in the Summerlin North area. It hosts the annual Shriners Children's Open, a PGA Tour event that brings professional golf to the community."
  },
  {
    "q": "How does Summerlin North compare to Summerlin South and West?",
    "a": "Summerlin North is the most established section with mature landscaping and lower entry prices ($400K+). Summerlin South features luxury enclaves like The Ridges. Summerlin West is the newest with active new construction. All share Summerlin's amenities."
  },
  {
    "q": "What schools serve Summerlin North?",
    "a": "Summerlin North is served by top-rated CCSD schools including Sig Rogich Middle School (10/10) and Palo Verde High School (8/10). The Meadows School (A+) and Bishop Gorman (A+) are premier private options."
  },
  {
    "q": "What are HOA fees in Summerlin North?",
    "a": "HOA fees range from $75 to $350 per month depending on the specific village and neighborhood. The Summerlin master association fee is included, with sub-association fees varying by community."
  },
  {
    "q": "Is Downtown Summerlin near Summerlin North?",
    "a": "Yes. Downtown Summerlin is approximately 5 minutes from most Summerlin North neighborhoods, offering 125+ shops, restaurants, City National Arena, and the Las Vegas Ballpark."
  }
]

export default function LasVegasSummerlinNorthAreaFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Summerlin North Area</h2>
          <p>The questions buyers ask most when exploring Summerlin North Area.</p>
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
