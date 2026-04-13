'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for homes in Anthem Park?",
    "a": "Homes in Anthem Park range from approximately $500,000 for established single-story homes to $800,000 for larger two-story homes on premium park-adjacent lots."
  },
  {
    "q": "Is Anthem Park guard-gated?",
    "a": "No. Anthem Park is not guard-gated. It is part of the broader Anthem master-planned community in Henderson with HOA governance and community amenities."
  },
  {
    "q": "What amenities does Anthem Park have?",
    "a": "Anthem Park features playing fields, playgrounds, picnic pavilions, walking trails, and open green space. Residents also have access to the shared Anthem Center with pools, fitness center, and sports courts."
  },
  {
    "q": "What ZIP code is Anthem Park in?",
    "a": "Anthem Park is located in ZIP code 89052 in Henderson, Nevada."
  },
  {
    "q": "What schools serve Anthem Park?",
    "a": "Anthem Park is served by CCSD schools including Elise L. Wolff Elementary (9/10), Del E. Webb Middle School (7/10), and Coronado High School (7/10)."
  },
  {
    "q": "What are HOA fees in Anthem Park?",
    "a": "HOA fees in Anthem Park typically range from $75 to $180 per month, covering access to the Anthem Center, community parks, trail system, and common area maintenance."
  },
  {
    "q": "How does Anthem Park differ from Anthem East?",
    "a": "Anthem Park is specifically the section of Anthem designed around the central park and recreation areas. Anthem East refers to the broader non-age-restricted residential area. Anthem Park offers more immediate park adjacency."
  },
  {
    "q": "Are there trails near Anthem Park?",
    "a": "Yes. Anthem Park connects to the broader Anthem trail system, which links to the surrounding desert wilderness and the 48,000-acre Sloan Canyon National Conservation Area."
  }
]

export default function AnthemParkFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Anthem Park</h2>
          <p>The questions buyers ask most when exploring Anthem Park.</p>
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
