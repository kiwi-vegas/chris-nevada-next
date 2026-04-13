'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range in South Square?",
    "a": "Homes in South Square range from approximately $400,000 for smaller homes and attached products to around $750,000 for larger, updated properties with premium finishes."
  },
  {
    "q": "Is South Square a 55+ community?",
    "a": "Yes — South Square is a 55+ age-restricted community. At least one resident in each home must be 55 or older, and no residents under 18 may be permanent occupants (some limited exceptions apply per federal fair housing law)."
  },
  {
    "q": "Is South Square guard-gated?",
    "a": "No — South Square is not guard-gated. Some neighborhoods have gated entry with key-fob or code access, but there is no staffed guard gate. For guard-gated 55+ living, Siena is nearby."
  },
  {
    "q": "What ZIP code is South Square in?",
    "a": "South Square is located in ZIP code 89135 in the Summerlin South area of Las Vegas."
  },
  {
    "q": "What amenities does South Square offer?",
    "a": "South Square features a community clubhouse, fitness center, community pool, social programming, and organized activities. The village is also connected to Summerlin's trail system for walking and cycling."
  },
  {
    "q": "What are HOA fees in South Square?",
    "a": "HOA fees in South Square range from approximately $150 to $350 per month, covering the Summerlin master association fee, village sub-association fee, clubhouse operations, and common area maintenance."
  },
  {
    "q": "How does South Square compare to Sun City Summerlin?",
    "a": "Sun City Summerlin is a much larger 55+ community (7,700+ homes) with golf courses and extensive amenities, starting around $300K. South Square is smaller and newer, integrated into the Summerlin South Association with access to the broader Summerlin amenity ecosystem."
  },
  {
    "q": "How does South Square compare to Siena?",
    "a": "Siena is a guard-gated 55+ village with higher price points and staffed security. South Square offers similar age-restricted living at more accessible price points without guard-gated security."
  }
]

export default function SummerlinSouthSquareFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About South Square</h2>
          <p>The questions buyers ask most when exploring South Square.</p>
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
