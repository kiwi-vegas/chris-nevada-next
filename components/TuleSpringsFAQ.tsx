'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for homes in Tule Springs?",
    "a": "Homes in Tule Springs range from approximately $300,000 for established resale homes to $500,000 for newer construction in communities like Heartland at Tule Springs."
  },
  {
    "q": "Is Tule Springs in Las Vegas or North Las Vegas?",
    "a": "Tule Springs spans portions of both the City of North Las Vegas and unincorporated Clark County. The area is generally referenced as North Las Vegas for real estate purposes."
  },
  {
    "q": "What is Floyd Lamb Park?",
    "a": "Floyd Lamb Park at Tule Springs is a 680-acre park featuring fishing ponds, historic ranch buildings, mature shade trees, walking trails, and abundant wildlife. It is one of the most unique and beloved parks in the Las Vegas Valley."
  },
  {
    "q": "What are Tule Springs Fossil Beds?",
    "a": "Tule Springs Fossil Beds National Monument is a 22,650-acre site adjacent to the community that preserves Ice Age fossil sites, including remains of mammoths, camels, and other megafauna that roamed the area thousands of years ago."
  },
  {
    "q": "What ZIP codes are in Tule Springs?",
    "a": "Tule Springs spans ZIP codes 89131 and 89085 in the North Las Vegas / northwest Las Vegas area."
  },
  {
    "q": "Is there new construction in Tule Springs?",
    "a": "Yes. Heartland at Tule Springs and The Villages at Tule Springs are active new-construction communities adding modern homes to the area. Both offer homes from the mid-$300s to mid-$500s."
  },
  {
    "q": "What are HOA fees in Tule Springs?",
    "a": "HOA fees in Tule Springs are among the lowest in the valley, typically ranging from $50 to $150 per month. Some older neighborhoods have no HOA at all."
  },
  {
    "q": "What schools serve Tule Springs?",
    "a": "Tule Springs is served by CCSD schools including Carl A. Hanson Elementary and Legacy High School. Charter options include Coral Academy of Science and Doral Academy."
  }
]

export default function TuleSpringsFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Tule Springs</h2>
          <p>The questions buyers ask most when exploring Tule Springs.</p>
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
