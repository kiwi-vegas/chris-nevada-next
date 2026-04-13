'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for homes in East Henderson?",
    "a": "Homes in East Henderson range from approximately $350,000 for townhomes and smaller single-family homes to $600,000 or more for larger residences on premium view lots."
  },
  {
    "q": "What ZIP codes cover East Henderson?",
    "a": "East Henderson spans ZIP codes 89011, 89015, and 89002, covering areas east of I-515/US-95 toward Boulder City."
  },
  {
    "q": "How close is East Henderson to Lake Mead?",
    "a": "East Henderson is approximately 15 minutes from Lake Mead National Recreation Area via Lake Mead Drive, making it the closest Henderson community to the lake."
  },
  {
    "q": "What schools serve East Henderson?",
    "a": "East Henderson is served by CCSD schools including Basic High School. Charter options include Coral Academy Henderson (8/10) and Somerset Academy (8/10)."
  },
  {
    "q": "Is East Henderson still growing?",
    "a": "Yes. East Henderson has several active new-construction communities with national builders expanding into the area. Commercial development is keeping pace with residential growth."
  },
  {
    "q": "How far is East Henderson from the Strip?",
    "a": "East Henderson is approximately 25 minutes from the Las Vegas Strip via I-515 and I-15 North."
  },
  {
    "q": "What are HOA fees in East Henderson?",
    "a": "HOA fees in East Henderson typically range from $50 to $150 per month, covering common area maintenance and community amenities."
  },
  {
    "q": "Is East Henderson good for outdoor enthusiasts?",
    "a": "Yes. East Henderson's proximity to Lake Mead, the River Mountains Trail, and the Bootleg Canyon trail system makes it one of the best communities in the valley for outdoor recreation."
  }
]

export default function HendersonEastHendersonFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About East Henderson</h2>
          <p>The questions buyers ask most when exploring East Henderson.</p>
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
