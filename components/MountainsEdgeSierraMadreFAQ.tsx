'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for homes in Sierra Madre at Mountains Edge?",
    "a": "Homes in Sierra Madre range from approximately $450,000 for entry-level homes to $700,000 for premium homes on elevated view lots with mountain panoramas."
  },
  {
    "q": "Who built homes in Sierra Madre?",
    "a": "Sierra Madre was built primarily by Pulte Homes, known for Energy Star-rated construction, thoughtful floor plans, and quality finishes."
  },
  {
    "q": "What views do Sierra Madre homes have?",
    "a": "Sierra Madre's western-edge position provides many homes with views of Red Rock Canyon's sandstone formations and the Spring Mountains. The elevated lots on the community's west side have the most dramatic views."
  },
  {
    "q": "What ZIP code is Sierra Madre in?",
    "a": "Sierra Madre at Mountains Edge is located in ZIP code 89178 in southwest Las Vegas."
  },
  {
    "q": "What are HOA fees in Sierra Madre?",
    "a": "HOA fees are low, typically $65 to $150 per month, covering common area maintenance, trails, and community parks."
  },
  {
    "q": "Is Sierra Madre near hiking?",
    "a": "Yes — Exploration Peak Park, a 98-acre natural desert park with hiking trails and a mountain summit, is adjacent to Sierra Madre. Red Rock Canyon National Conservation Area is about 8 minutes away via Blue Diamond Road."
  },
  {
    "q": "What schools serve Sierra Madre?",
    "a": "Sierra Madre is served by CCSD schools including Carolyn S. Reedom Elementary (8/10) and Lawrence & Heidi Canarelli Middle School (7/10). Doral Academy (9/10) is a popular charter option."
  },
  {
    "q": "How does Sierra Madre compare to Summerlin?",
    "a": "Sierra Madre offers mountain views comparable to many Summerlin neighborhoods at price points typically 20–30% lower. The trade-off is that Mountains Edge doesn't have the same breadth of commercial amenities as Downtown Summerlin, though the Blue Diamond Road corridor is growing rapidly."
  }
]

export default function MountainsEdgeSierraMadreFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Sierra Madre at Mountains Edge</h2>
          <p>The questions buyers ask most when exploring Sierra Madre at Mountains Edge.</p>
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
