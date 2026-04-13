'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for homes in Centennial Hills?",
    "a": "Homes in Centennial Hills range from approximately $350,000 for established single-family homes to $700,000 for premium properties in newer sections. Most homes fall in the $400K to $550K range."
  },
  {
    "q": "Is Centennial Hills a master-planned community?",
    "a": "Centennial Hills is not a single master-planned community but rather a broad geographic area in northwest Las Vegas that encompasses multiple planned developments and standalone neighborhoods. It includes communities like Providence and portions of the Tule Springs development."
  },
  {
    "q": "What ZIP codes are in Centennial Hills?",
    "a": "Centennial Hills spans ZIP codes 89131, 89149, and 89143 in northwest Las Vegas."
  },
  {
    "q": "What is Floyd Lamb Park?",
    "a": "Floyd Lamb Park at Tule Springs is a 680-acre historic park within the Centennial Hills area. It features fishing ponds, walking trails, peacock gardens, historic ranch buildings, and wildlife viewing. It is one of the most unique outdoor attractions in the Las Vegas Valley."
  },
  {
    "q": "What schools serve Centennial Hills?",
    "a": "Centennial Hills is served by CCSD schools including Lowman Elementary (8/10), Escobedo Middle (7/10), and Centennial High School (6/10). Private options include Bishop Gorman (A+) and Faith Lutheran (A)."
  },
  {
    "q": "Is Centennial Hills safe?",
    "a": "Centennial Hills is generally considered one of the safer areas in the northwest Las Vegas Valley. The newer neighborhoods, active HOAs, and family-oriented community character contribute to a positive safety profile."
  },
  {
    "q": "How far is Centennial Hills from the Strip?",
    "a": "Centennial Hills is approximately 20 minutes from the Las Vegas Strip via US-95 South to I-15. Downtown Summerlin is about 15 minutes away."
  },
  {
    "q": "Is there new construction in Centennial Hills?",
    "a": "Yes. Several areas within Centennial Hills have active new construction, particularly in the Tule Springs area and the western sections. National builders are developing new subdivisions with contemporary floor plans."
  }
]

export default function CentennialHillsFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Centennial Hills</h2>
          <p>The questions buyers ask most when exploring Centennial Hills.</p>
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
