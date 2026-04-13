'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for homes near Nature Discovery at Aliante?",
    "a": "Homes in the Nature Discovery area range from approximately $350,000 for smaller homes to $500,000 for larger floor plans near the park."
  },
  {
    "q": "What is Nature Discovery Park?",
    "a": "Aliante Nature Discovery Park is a unique 20-acre nature park featuring walking trails through preserved Mojave Desert habitat, interpretive signs about native plants and wildlife, a playground complex, and picnic areas."
  },
  {
    "q": "Is Nature Discovery at Aliante in North Las Vegas?",
    "a": "Yes. Nature Discovery is part of the Aliante master-planned community in North Las Vegas — a separately incorporated city north of Las Vegas."
  },
  {
    "q": "What ZIP code is Nature Discovery at Aliante in?",
    "a": "Nature Discovery at Aliante is in ZIP code 89084 in North Las Vegas."
  },
  {
    "q": "What are HOA fees in the Nature Discovery area?",
    "a": "HOA fees typically range from $60 to $130 per month, covering Aliante master association amenities and common area maintenance."
  },
  {
    "q": "What schools serve Nature Discovery at Aliante?",
    "a": "The area is served by CCSD schools including Dorothy Eisenberg Elementary (7/10) and Legacy High School (5/10). Charter options like Doral Academy Fire Mesa (8/10) are nearby."
  },
  {
    "q": "Is there golf near Nature Discovery at Aliante?",
    "a": "Yes. The Aliante Golf Club is a Gary Panks-designed 18-hole course rated among the top public courses in Nevada, located within the Aliante master plan."
  },
  {
    "q": "Is Nature Discovery at Aliante good for families?",
    "a": "Yes. The nature park, community pools, walking trails, and affordable pricing make the Nature Discovery area one of the most family-friendly sections of Aliante."
  }
]

export default function AlianteNatureDiscoveryFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Nature Discovery at Aliante</h2>
          <p>The questions buyers ask most when exploring Nature Discovery at Aliante.</p>
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
