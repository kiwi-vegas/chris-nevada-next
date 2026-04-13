'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for homes in Vista Verde at Mountains Edge?",
    "a": "Homes in Vista Verde range from approximately $350,000 for smaller floor plans to $550,000 for larger homes on premium lots. Most sales fall in the $400K to $500K range."
  },
  {
    "q": "Who built homes in Vista Verde?",
    "a": "Vista Verde was built primarily by KB Home during the early phases of the Mountains Edge master plan, beginning around 2005. Many homes have been updated by current owners."
  },
  {
    "q": "Is Vista Verde good for first-time buyers?",
    "a": "Yes — Vista Verde offers some of the most accessible pricing within the Mountains Edge master plan. First-time buyers get the full master-planned community experience — trails, parks, schools, and commercial access — at price points in the $350K range."
  },
  {
    "q": "What ZIP code is Vista Verde in?",
    "a": "Vista Verde at Mountains Edge is located in ZIP code 89178 in southwest Las Vegas. Home prices range from $350K–$550K."
  },
  {
    "q": "What are HOA fees in Vista Verde?",
    "a": "HOA fees are low, typically $55 to $130 per month, covering common area maintenance, trails, and community landscaping in Vista Verde at Mountains Edge."
  },
  {
    "q": "Is Vista Verde a good investment property area?",
    "a": "Vista Verde's accessible pricing, master-planned amenities, and family-friendly character create strong rental demand. Many investors own homes in Vista Verde for long-term rental income."
  },
  {
    "q": "What schools serve Vista Verde?",
    "a": "Vista Verde is served by CCSD schools including Carolyn S. Reedom Elementary (8/10) and Lawrence & Heidi Canarelli Middle School (7/10). Doral Academy (9/10) is a popular charter option."
  },
  {
    "q": "How does Vista Verde compare to other Mountains Edge neighborhoods?",
    "a": "Vista Verde is one of the original neighborhoods, offering mature landscaping and the most accessible pricing. Newer sections like Tuscano and Sierra Madre have more contemporary construction but at higher price points."
  }
]

export default function MountainsEdgeVistaVerdeFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Vista Verde at Mountains Edge</h2>
          <p>The questions buyers ask most when exploring Vista Verde at Mountains Edge.</p>
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
