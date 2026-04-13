'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range in The Cliffs?",
    "a": "Homes in The Cliffs range from approximately $600,000 for well-maintained single-family homes to around $1.2 million for larger properties on premium lots with mountain views and upgraded finishes."
  },
  {
    "q": "Is The Cliffs guard-gated?",
    "a": "No — The Cliffs is not guard-gated. Some neighborhoods within the village have gated entry with key-fob or code access, but there is no staffed guard gate. For guard-gated options nearby, The Ridges and Red Rock Country Club are within minutes."
  },
  {
    "q": "What ZIP code is The Cliffs in?",
    "a": "The Cliffs is located in ZIP code 89135 in the Summerlin South area of Las Vegas. Home prices range from $600K–$1.2M."
  },
  {
    "q": "How close is The Cliffs to Red Rock Canyon?",
    "a": "The Cliffs is one of the closest Summerlin villages to Red Rock Canyon — approximately 10 minutes by car via West Charleston Boulevard. Direct trail access is also available through the Summerlin trail network."
  },
  {
    "q": "What schools serve The Cliffs?",
    "a": "The Cliffs is served by CCSD schools including Lowman Elementary (8/10), Rogich Middle (10/10), and Palo Verde High School (8/10). Private options including The Meadows School (A+) and Bishop Gorman (A+) are nearby."
  },
  {
    "q": "What are HOA fees in The Cliffs?",
    "a": "HOA fees in The Cliffs range from approximately $125 to $300 per month, including the Summerlin master association fee plus the village sub-association fee."
  },
  {
    "q": "How does The Cliffs compare to The Ridges?",
    "a": "The Ridges is Summerlin's ultra-luxury guard-gated community with homes starting at $2M. The Cliffs offers similar mountain proximity and views at significantly more accessible price points ($600K–$1.2M) without guard-gated security."
  },
  {
    "q": "When was The Cliffs built?",
    "a": "The Cliffs was developed beginning in 2003, with homes built through the late 2000s. The village features transitional architecture that bridges the Mediterranean style of earlier villages with more contemporary design."
  },
  {
    "q": "What are the best sub-neighborhoods within The Cliffs?",
    "a": "The best sub-neighborhood depends on your priorities — school zones, lot size, home age, and proximity to amenities all vary within the community. Nevada Real Estate Group agents who specialize in The Cliffs can walk you through the specific blocks and streets that match your criteria."
  },
  {
    "q": "How is new construction availability in The Cliffs?",
    "a": "New construction availability varies by season and builder phase. Some sections of The Cliffs have active new home sales while others are fully built out with resale-only inventory. Contact Nevada Real Estate Group for the most current new construction options."
  }
]

export default function SummerlinTheCliffsFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About The Cliffs</h2>
          <p>The questions buyers ask most when exploring The Cliffs.</p>
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
