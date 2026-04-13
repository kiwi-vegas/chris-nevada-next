'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range in the Coronado Ranch area?",
    "a": "Homes in the Coronado Ranch area range from approximately $400,000 for non-gated homes to $600,000 for larger homes within the guard-gated Coronado Ranch or on premium lots."
  },
  {
    "q": "Is Coronado Ranch guard-gated?",
    "a": "The original Coronado Ranch subdivision is guard-gated. The broader Coronado Ranch area includes both gated and non-gated neighborhoods."
  },
  {
    "q": "What ZIP code is Coronado Ranch in?",
    "a": "The Coronado Ranch area is primarily in ZIP code 89052 in Henderson, Nevada in Coronado Ranch Area. Home prices range from $400K–$600K."
  },
  {
    "q": "What schools serve the Coronado Ranch area?",
    "a": "The area is served by Henderson CCSD schools including Del E. Webb Middle School (8/10) and Coronado High School (7/10). Charter options include Doral Academy (9/10)."
  },
  {
    "q": "How far is Coronado Ranch from the Strip?",
    "a": "The Coronado Ranch area is approximately 20 minutes from the Las Vegas Strip via St. Rose Parkway and I-15 in Coronado Ranch Area."
  },
  {
    "q": "What are HOA fees in Coronado Ranch?",
    "a": "HOA fees range from $60 to $150 per month depending on the specific subdivision. Guard-gated sections have higher fees covering gate staffing and enhanced amenities."
  },
  {
    "q": "Is the Coronado Ranch area good for families?",
    "a": "Yes. The area is very family-friendly with good schools, community parks, safe neighborhoods, and proximity to Henderson's extensive recreational and commercial amenities."
  },
  {
    "q": "What is near the Coronado Ranch area?",
    "a": "The area is near Seven Hills, Anthem, Galleria at Sunset, Henderson Hospital, and the I-215/St. Rose Parkway commercial corridor. Shopping, dining, and medical facilities are within minutes."
  },
  {
    "q": "What are the best sub-neighborhoods within Coronado Ranch Area?",
    "a": "The best sub-neighborhood depends on your priorities — school zones, lot size, home age, and proximity to amenities all vary within the community. Nevada Real Estate Group agents who specialize in Coronado Ranch Area can walk you through the specific blocks and streets that match your criteria."
  },
  {
    "q": "How is new construction availability in Coronado Ranch Area?",
    "a": "New construction availability varies by season and builder phase. Some sections of Coronado Ranch Area have active new home sales while others are fully built out with resale-only inventory. Contact Nevada Real Estate Group for the most current new construction options."
  }
]

export default function HendersonCoronadoRanchAreaFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Coronado Ranch Area</h2>
          <p>The questions buyers ask most when exploring Coronado Ranch Area.</p>
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
