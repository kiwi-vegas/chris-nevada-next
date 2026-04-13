'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for homes in Mesa del Sol?",
    "a": "New-construction homes in Mesa del Sol range from approximately $500,000 to $800,000, depending on floor plan, lot position, and selected upgrades."
  },
  {
    "q": "What builders are in Mesa del Sol?",
    "a": "Mesa del Sol features new construction from Lennar and Toll Brothers, two of the nation's largest and most respected homebuilders. Both offer contemporary designs with modern standard finishes."
  },
  {
    "q": "Is Mesa del Sol part of Inspirada?",
    "a": "Yes. Mesa del Sol is a neighborhood within the Inspirada master-planned community in Henderson. Residents have full access to all Inspirada amenities including recreation centers, pools, parks, and the trail system."
  },
  {
    "q": "What amenities does Mesa del Sol have access to?",
    "a": "Mesa del Sol residents enjoy all Inspirada amenities: the Inspirada Club with resort pool and fitness center, Festival Park with amphitheater, sports courts, playgrounds, and miles of interconnected trails."
  },
  {
    "q": "What ZIP code is Mesa del Sol in?",
    "a": "Mesa del Sol is located in ZIP code 89044 in Henderson, Nevada, within the Inspirada master-planned community."
  },
  {
    "q": "What size are homes in Mesa del Sol?",
    "a": "Homes in Mesa del Sol range from approximately 1,800 to 3,800 square feet, with most floor plans offering 3 to 5 bedrooms, open-concept living areas, and two-car garages."
  },
  {
    "q": "What are HOA fees in Mesa del Sol?",
    "a": "HOA fees typically range from $130 to $250 per month, covering the Inspirada master association and access to all community amenities, parks, pools, and recreation facilities."
  },
  {
    "q": "What schools serve Mesa del Sol?",
    "a": "The area is served by CCSD schools including Elise L. Wolff Elementary (8/10) and Coronado High School. Charter options include Doral Academy (9/10) and Somerset Academy."
  }
]

export default function InspiradaMesaDelSolFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Mesa del Sol</h2>
          <p>The questions buyers ask most when exploring Mesa del Sol.</p>
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
