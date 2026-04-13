'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for homes in Village Park at Cadence?",
    "a": "Homes in Village Park range from approximately $400,000 to $600,000, depending on floor plan size, lot position, and selected upgrades."
  },
  {
    "q": "What builders are in Village Park?",
    "a": "Village Park features homes built primarily by Lennar and Richmond American Homes, two of the nation's largest homebuilders, offering contemporary designs with modern standard finishes."
  },
  {
    "q": "Is Village Park part of Cadence?",
    "a": "Yes. Village Park is a neighborhood within the Cadence master-planned community in Henderson. Residents enjoy full access to all Cadence amenities including Central Park, the Clubhouse, pools, and trails."
  },
  {
    "q": "What is Cadence Central Park?",
    "a": "Cadence Central Park is a 50-acre destination park featuring sports fields, playgrounds, splash pads, event lawns, and walking trails. It is one of the largest community parks in Henderson."
  },
  {
    "q": "What ZIP code is Village Park in?",
    "a": "Village Park is in ZIP code 89011 in Henderson, Nevada, within the Cadence master-planned community."
  },
  {
    "q": "What schools serve Village Park?",
    "a": "Village Park is served by CCSD schools including John C. Vanderburg Elementary (8/10) and Foothill High School. Charter options include Doral Academy (9/10) and Somerset Academy."
  },
  {
    "q": "What are HOA fees in Village Park?",
    "a": "HOA fees in Village Park typically range from $100 to $200 per month, covering access to all Cadence amenities, parks, pools, the Clubhouse, and common area maintenance."
  },
  {
    "q": "Is Village Park a good investment?",
    "a": "Cadence is Henderson's fastest-growing master plan with continued development of retail, dining, and community infrastructure. Early buyers in maturing master plans typically benefit from strong appreciation as the community builds out."
  }
]

export default function CadenceVillageParkFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Village Park</h2>
          <p>The questions buyers ask most when exploring Village Park.</p>
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
