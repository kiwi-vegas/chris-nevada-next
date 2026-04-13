'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for homes in Boulder Hills at Skye Canyon?",
    "a": "Homes in Boulder Hills range from approximately $450,000 for townhomes to $700,000 for the largest single-family floor plans with premium lot positions."
  },
  {
    "q": "What builders are in Boulder Hills?",
    "a": "Boulder Hills features homes by Lennar and KB Home — national builders offering a range of floor plans from 1,600 to 3,400 square feet."
  },
  {
    "q": "Does Boulder Hills have access to the Skye Center?",
    "a": "Yes. All Boulder Hills residents have full access to the resort-style Skye Center including the pool complex, splash pad, fitness center, and community event programming."
  },
  {
    "q": "What ZIP code is Boulder Hills in?",
    "a": "Boulder Hills at Skye Canyon is located in ZIP code 89166 in northwest Las Vegas."
  },
  {
    "q": "What are HOA fees in Boulder Hills?",
    "a": "HOA fees range from $90 to $180 per month, covering Skye Canyon master association amenities including the Skye Center, trails, and common area maintenance."
  },
  {
    "q": "Is Boulder Hills guard-gated?",
    "a": "No. Boulder Hills is not guard-gated. It is a managed HOA community within the Skye Canyon master plan with shared amenities and community trails."
  },
  {
    "q": "How does Boulder Hills compare to Ridgeline at Skye Canyon?",
    "a": "Boulder Hills offers a more accessible price point than Ridgeline, with slightly smaller floor plans and lower-elevation positioning. Ridgeline provides the premium view lots and largest homes in Skye Canyon."
  },
  {
    "q": "What schools serve Boulder Hills?",
    "a": "The area is served by CCSD schools including Jydstrup Elementary (7/10) and Shadow Ridge High School (6/10). Doral Academy (9/10) and Coral Academy (8/10) are nearby charter options."
  }
]

export default function SkyeCanyonBoulderHillsFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Boulder Hills at Skye Canyon</h2>
          <p>The questions buyers ask most when exploring Boulder Hills at Skye Canyon.</p>
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
