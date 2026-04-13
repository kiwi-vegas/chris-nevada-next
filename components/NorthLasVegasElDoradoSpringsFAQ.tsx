'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range in El Dorado Springs?",
    "a": "Homes in El Dorado Springs range from approximately $300,000 for townhomes and smaller single-family homes to $500,000 for larger properties. The average single-family home sells between $350K and $425K."
  },
  {
    "q": "What ZIP codes are in El Dorado Springs?",
    "a": "El Dorado Springs spans ZIP codes 89031 and 89032 in North Las Vegas, Nevada."
  },
  {
    "q": "Is El Dorado Springs a good investment area?",
    "a": "Yes. El Dorado Springs offers some of the best rental yields in the Las Vegas metro due to affordable purchase prices and strong rental demand. North Las Vegas' growth and infrastructure improvements are driving appreciation."
  },
  {
    "q": "How far is El Dorado Springs from the Strip?",
    "a": "El Dorado Springs is approximately 20 minutes from the Las Vegas Strip via I-15 South. Downtown Las Vegas is about 15 minutes away."
  },
  {
    "q": "What schools serve El Dorado Springs?",
    "a": "The area is served by CCSD schools including Cheyenne High School. Charter options like Somerset Academy NLV (8/10) and Doral Academy Fire Mesa (8/10) provide higher-rated alternatives. Private schools include Faith Lutheran (A)."
  },
  {
    "q": "Is North Las Vegas safe?",
    "a": "North Las Vegas has invested significantly in public safety in recent years. The Aliante, El Dorado Springs, and Heartland at Tule Springs areas have lower crime rates than the city average. As with any metro area, neighborhood selection matters."
  },
  {
    "q": "What are HOA fees in El Dorado Springs?",
    "a": "HOA fees in El Dorado Springs are among the lowest in the valley, ranging from $40 to $120 per month. Some standalone homes have no HOA."
  },
  {
    "q": "Is El Dorado Springs near Nellis Air Force Base?",
    "a": "Yes. El Dorado Springs is approximately 10 minutes from Nellis Air Force Base via Craig Road East, making it a popular choice for military families and civilian employees."
  }
]

export default function NorthLasVegasElDoradoSpringsFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About El Dorado Springs</h2>
          <p>The questions buyers ask most when exploring El Dorado Springs.</p>
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
