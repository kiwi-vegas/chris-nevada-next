'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for homes in Ridgeline at Skye Canyon?",
    "a": "Homes in Ridgeline range from approximately $500,000 to $800,000, depending on builder, floor plan size, lot position, and view orientation."
  },
  {
    "q": "What builders are in Ridgeline?",
    "a": "Ridgeline features homes by Toll Brothers and Taylor Morrison — two of the most respected national home builders. Floor plans range from 2,400 to 4,200 square feet."
  },
  {
    "q": "Is Ridgeline guard-gated?",
    "a": "No. Ridgeline is not guard-gated. It is a premium section within the Skye Canyon master plan with managed HOA and community amenities including the Skye Center."
  },
  {
    "q": "What is the Skye Center?",
    "a": "The Skye Center is Skye Canyon's resort-style community hub featuring a pool complex, splash pad, fitness center, event pavilion, and trailhead access. All Ridgeline residents have full access."
  },
  {
    "q": "What ZIP code is Ridgeline in?",
    "a": "Ridgeline at Skye Canyon is located in ZIP code 89166 in northwest Las Vegas."
  },
  {
    "q": "What are HOA fees in Ridgeline?",
    "a": "HOA fees range from $100 to $200 per month, covering Skye Canyon master association amenities including the Skye Center, trail system, and common area maintenance."
  },
  {
    "q": "How does Ridgeline compare to other Skye Canyon neighborhoods?",
    "a": "Ridgeline is the premium residential section of Skye Canyon with the largest lots, most upscale builders, and the most elevated positioning. It commands a price premium over standard Skye Canyon neighborhoods."
  },
  {
    "q": "Are there mountain views from Ridgeline?",
    "a": "Yes. Ridgeline occupies one of the highest positions in Skye Canyon. West-facing lots enjoy unobstructed Spring Mountain views, while east-facing lots provide Las Vegas Valley panoramas."
  }
]

export default function SkyeCanyonRidgelineFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Ridgeline at Skye Canyon</h2>
          <p>The questions buyers ask most when exploring Ridgeline at Skye Canyon.</p>
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
