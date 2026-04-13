'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for homes in Tuscany Village?",
    "a": "Homes in Tuscany Village range from approximately $400,000 for townhomes and smaller single-story homes to $700,000 for larger homes on premium golf course lots with mountain views."
  },
  {
    "q": "Is Tuscany Village guard-gated?",
    "a": "Yes. Tuscany Village is a fully guard-gated community with 24-hour staffed entry. It is one of the most affordable guard-gated communities in Henderson."
  },
  {
    "q": "What golf course is in Tuscany Village?",
    "a": "Chimera Golf Club (formerly Tuscany Golf Club) is an 18-hole, par-72 championship course that winds through the community. It is open for both membership and public play."
  },
  {
    "q": "What ZIP code is Tuscany Village in?",
    "a": "Tuscany Village is located in ZIP code 89074 in Henderson, Nevada."
  },
  {
    "q": "What are HOA fees in Tuscany Village?",
    "a": "HOA fees in Tuscany Village typically range from $150 to $350 per month, depending on the neighborhood. Fees cover guard gate staffing, common area maintenance, and community amenities."
  },
  {
    "q": "What schools serve Tuscany Village?",
    "a": "Tuscany Village is served by CCSD schools including Nate Mack Elementary (8/10), Del E. Webb Middle School (7/10), and Green Valley High School (7/10). Private and charter options are also available nearby."
  },
  {
    "q": "Do you have to join the golf club to live in Tuscany Village?",
    "a": "No. Golf club membership is entirely optional. Many Tuscany Village residents enjoy the guard-gated security, golf course views, and community character without playing golf."
  },
  {
    "q": "How does Tuscany Village compare to Seven Hills?",
    "a": "Both are guard-gated Henderson communities with golf. Seven Hills is larger and more upscale ($500K–$7M+) with Rio Secco Golf Club. Tuscany Village is more accessible ($400K–$700K) with Chimera Golf Club, making it ideal for buyers who want guard-gated golf living without luxury pricing."
  }
]

export default function TuscanyVillageFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Tuscany Village</h2>
          <p>The questions buyers ask most when exploring Tuscany Village.</p>
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
