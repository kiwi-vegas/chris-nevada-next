'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for homes in North Valley?",
    "a": "Homes in North Valley range from approximately $300,000 for production homes to $500,000 for larger residences on premium lots. It is one of the most affordable new-construction markets in the valley."
  },
  {
    "q": "Is North Valley in North Las Vegas?",
    "a": "Yes. North Valley is part of the City of North Las Vegas and the surrounding unincorporated Clark County areas in the northern Las Vegas Valley."
  },
  {
    "q": "What ZIP codes are in North Valley?",
    "a": "North Valley spans ZIP codes 89084, 89085, and 89086 in the northern Las Vegas Valley."
  },
  {
    "q": "Is North Valley safe?",
    "a": "North Valley's newer subdivisions are generally safe residential communities. As with any area, conditions vary by neighborhood. Working with a local expert helps identify the most desirable sections."
  },
  {
    "q": "How far is North Valley from the Strip?",
    "a": "North Valley is approximately 20 minutes from the Las Vegas Strip via I-15 South."
  },
  {
    "q": "Is there new construction in North Valley?",
    "a": "Yes. North Valley has several active new-construction communities with national builders offering modern homes at competitive prices. It remains one of the most active building areas in the valley."
  },
  {
    "q": "What schools serve North Valley?",
    "a": "North Valley is served by CCSD schools including Legacy High School (5/10). Charter options like Somerset Academy Sky Pointe (8/10) and Doral Academy (9/10) provide alternatives."
  },
  {
    "q": "Is North Valley good for investment?",
    "a": "Yes. North Valley offers affordable entry prices, newer construction, and strong rental demand. It is one of the fastest-appreciating areas in the valley."
  },
  {
    "q": "What are the best sub-neighborhoods within North Valley?",
    "a": "The best sub-neighborhood depends on your priorities — school zones, lot size, home age, and proximity to amenities all vary within the community. Nevada Real Estate Group agents who specialize in North Valley can walk you through the specific blocks and streets that match your criteria."
  },
  {
    "q": "How is new construction availability in North Valley?",
    "a": "New construction availability varies by season and builder phase. Some sections of North Valley have active new home sales while others are fully built out with resale-only inventory. Contact Nevada Real Estate Group for the most current new construction options."
  }
]

export default function NorthLasVegasNorthValleyFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About North Valley</h2>
          <p>The questions buyers ask most when exploring North Valley.</p>
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
