'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for homes in Southwest Las Vegas?",
    "a": "Homes in Southwest Las Vegas range from approximately $300,000 for entry-level condos and townhomes to over $1 million for luxury homes in guard-gated communities like Southern Highlands and Spanish Trail."
  },
  {
    "q": "What ZIP codes are in Southwest Las Vegas?",
    "a": "Southwest Las Vegas spans several ZIP codes including 89113, 89139, 89141, 89148, 89178, and 89179. The area is large and covers multiple unincorporated Clark County census tracts."
  },
  {
    "q": "Is Southwest Las Vegas a good area to live?",
    "a": "Southwest Las Vegas is one of the fastest-growing and most desirable residential areas in the valley. Newer construction, above-average schools, strong retail infrastructure, and proximity to both the Strip and Red Rock Canyon make it popular with families and professionals."
  },
  {
    "q": "What schools serve Southwest Las Vegas?",
    "a": "The area is served by newer CCSD schools including Sierra Vista High School and Del E. Webb Middle School. Charter options like Pinecrest Academy and Doral Academy rate highly. Bishop Gorman High School (A+) is the top private option."
  },
  {
    "q": "How close is Southwest Las Vegas to the Strip?",
    "a": "Most of Southwest Las Vegas is 15–20 minutes from the Strip via I-15 North or Las Vegas Boulevard. The I-215 Beltway provides an alternate fast route."
  },
  {
    "q": "What communities are in Southwest Las Vegas?",
    "a": "Major communities include Southern Highlands (guard-gated golf), Mountains Edge (master-planned family), Rhodes Ranch (guard-gated golf), Coronado Ranch, Enterprise, and Silverado Ranch, among others."
  },
  {
    "q": "Is Southwest Las Vegas still growing?",
    "a": "Yes. Active new construction continues throughout Southwest Las Vegas with builders releasing new phases in Mountains Edge, Enterprise, and surrounding areas. Retail and commercial development follows the residential growth."
  },
  {
    "q": "Is Southwest Las Vegas good for investment?",
    "a": "Southwest Las Vegas offers strong investment fundamentals: newer construction, growing population, strong rental demand, and limited remaining developable land. Appreciation has been consistent across market cycles."
  }
]

export default function SouthwestLasVegasFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Southwest Las Vegas</h2>
          <p>The questions buyers ask most when exploring Southwest Las Vegas.</p>
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
