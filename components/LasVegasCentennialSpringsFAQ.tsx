'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for homes in Centennial Springs?",
    "a": "Homes in Centennial Springs range from approximately $400,000 for production single-family homes to $650,000 for larger residences on premium lots."
  },
  {
    "q": "What ZIP codes cover Centennial Springs?",
    "a": "Centennial Springs spans portions of ZIP codes 89149 and 89131 in the northwest Las Vegas Valley. Home prices range from $400K–$650K."
  },
  {
    "q": "Is Centennial Springs part of Centennial Hills?",
    "a": "Centennial Springs is a distinct community adjacent to Centennial Hills. It benefits from Centennial Hills' established infrastructure while offering newer construction and a separate community identity."
  },
  {
    "q": "What schools serve Centennial Springs?",
    "a": "Centennial Springs is served by CCSD schools including Centennial High School (7/10) and newer elementary and middle schools. Doral Academy (9/10) is a popular charter option."
  },
  {
    "q": "How far is Centennial Springs from the Strip?",
    "a": "Centennial Springs is approximately 25 minutes from the Las Vegas Strip via US-95 South and I-15. Home prices range from $400K–$650K."
  },
  {
    "q": "Is there new construction in Centennial Springs?",
    "a": "Yes. Centennial Springs continues to have active new construction with national builders offering modern floor plans and energy-efficient features."
  },
  {
    "q": "What are HOA fees in Centennial Springs?",
    "a": "HOA fees in Centennial Springs typically range from $50 to $150 per month, covering common area maintenance, parks, and community amenities."
  },
  {
    "q": "Is Centennial Springs good for families?",
    "a": "Yes. Centennial Springs is very family-friendly with newer schools, modern parks, safe neighborhoods, and convenient access to shopping and dining."
  },
  {
    "q": "What are the best sub-neighborhoods within Centennial Springs?",
    "a": "The best sub-neighborhood depends on your priorities — school zones, lot size, home age, and proximity to amenities all vary within the community. Nevada Real Estate Group agents who specialize in Centennial Springs can walk you through the specific blocks and streets that match your criteria."
  },
  {
    "q": "How is new construction availability in Centennial Springs?",
    "a": "New construction availability varies by season and builder phase. Some sections of Centennial Springs have active new home sales while others are fully built out with resale-only inventory. Contact Nevada Real Estate Group for the most current new construction options."
  }
]

export default function LasVegasCentennialSpringsFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Centennial Springs</h2>
          <p>The questions buyers ask most when exploring Centennial Springs.</p>
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
