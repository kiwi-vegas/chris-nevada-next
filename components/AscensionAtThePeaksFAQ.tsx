'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for homes in Ascension at The Peaks?",
    "a": "Homes in Ascension at The Peaks range from approximately $1 million for entry-level new construction to over $4 million for premium lots with upgraded finishes and unobstructed Red Rock Canyon views."
  },
  {
    "q": "Is Ascension at The Peaks guard-gated?",
    "a": "Yes. Ascension at The Peaks is a fully guard-gated community with a 24-hour staffed guard gate and security patrols, located within Summerlin's Peaks village."
  },
  {
    "q": "Which builders are in Ascension at The Peaks?",
    "a": "Ascension features homes by several premier builders including Toll Brothers, Shea Homes, and Taylor Morrison. Each builder offers distinct floor plans and architectural styles within the community's contemporary desert design guidelines."
  },
  {
    "q": "What ZIP code is Ascension at The Peaks in?",
    "a": "Ascension at The Peaks is located in ZIP code 89138, within the Summerlin master-planned community in Las Vegas."
  },
  {
    "q": "How many homes are in Ascension at The Peaks?",
    "a": "At full build-out, Ascension at The Peaks will include approximately 561 homes across multiple builder collections and floor plan options."
  },
  {
    "q": "What schools serve Ascension at The Peaks?",
    "a": "The community is served by CCSD schools including Bonner Elementary (9/10), Sig Rogich Middle School (10/10), and Palo Verde High School (8/10). Top private schools like The Meadows School and Bishop Gorman are within a 15-minute drive."
  },
  {
    "q": "Is Ascension at The Peaks part of Summerlin?",
    "a": "Yes. Ascension is located within The Peaks village, one of Summerlin's South Association villages. Residents have full access to all Summerlin amenities, trails, parks, and community facilities."
  },
  {
    "q": "What are HOA fees in Ascension at The Peaks?",
    "a": "HOA fees typically range from $300 to $800 per month, which includes the master Summerlin association fee plus the sub-association fee for Ascension at The Peaks. Fees cover guard gate staffing, security, common area maintenance, and community amenities."
  }
]

export default function AscensionAtThePeaksFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Ascension at The Peaks</h2>
          <p>The questions buyers ask most when exploring Ascension at The Peaks.</p>
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
