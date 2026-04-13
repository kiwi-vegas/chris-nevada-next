'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for homes in Vistana at Lake Las Vegas?",
    "a": "Homes in Vistana range from approximately $500,000 to $1.2 million, depending on floor plan, builder, lot position, and selected upgrades."
  },
  {
    "q": "Is Vistana guard-gated?",
    "a": "Vistana is not guard-gated. It is part of the Lake Las Vegas resort community but does not have a separate guard gate like South Shore. Lake Las Vegas does have community-wide security."
  },
  {
    "q": "What builders are in Vistana?",
    "a": "Vistana features new construction from Toll Brothers and William Lyon Homes, offering contemporary desert architecture with modern floor plans and energy-efficient design."
  },
  {
    "q": "Do Vistana residents have lake access?",
    "a": "Yes. All Lake Las Vegas residents, including Vistana homeowners, have access to the 320-acre private lake for kayaking, paddleboarding, sailing, and electric boating."
  },
  {
    "q": "What golf courses are at Lake Las Vegas?",
    "a": "Lake Las Vegas has two Jack Nicklaus-designed championship courses: SouthShore Golf Club and Reflection Bay Golf Club. Both offer dramatic lake and mountain views. Memberships are available to residents."
  },
  {
    "q": "What ZIP code is Vistana in?",
    "a": "Vistana is in ZIP code 89011 in Henderson, Nevada, within the Lake Las Vegas resort community."
  },
  {
    "q": "What are HOA fees in Vistana?",
    "a": "HOA fees in Vistana typically range from $200 to $400 per month, covering the Lake Las Vegas master association, community amenities, lake access, and common area maintenance."
  },
  {
    "q": "How does Vistana compare to South Shore?",
    "a": "Vistana offers newer-construction contemporary homes at a more accessible price point than South Shore's guard-gated custom estates. Vistana provides the Lake Las Vegas lifestyle — lake, golf, dining — without the ultra-luxury premium."
  }
]

export default function LakeLasVegasVistanaFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Vistana</h2>
          <p>The questions buyers ask most when exploring Vistana.</p>
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
