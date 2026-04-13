'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for homes in Henderson Hills?",
    "a": "Homes in Henderson Hills range from approximately $400,000 for established single-story homes to $700,000 for larger homes on premium view lots at higher elevations."
  },
  {
    "q": "What views do Henderson Hills homes have?",
    "a": "Many Henderson Hills homes have panoramic views of the Las Vegas Valley, the Strip skyline, and the surrounding mountain ranges. The elevated hillside terrain creates natural view corridors that are rare at these price points."
  },
  {
    "q": "Is Henderson Hills guard-gated?",
    "a": "No. Henderson Hills is not guard-gated. It consists of multiple established subdivisions with individual HOA governance within the City of Henderson."
  },
  {
    "q": "What ZIP codes are Henderson Hills in?",
    "a": "Henderson Hills spans ZIP codes 89015 and 89002 in the eastern foothills area of Henderson, Nevada. Home prices range from $400K–$700K."
  },
  {
    "q": "Are there hiking trails near Henderson Hills?",
    "a": "Yes. Henderson Hills provides direct access to Black Mountain hiking trails and the McCullough Range. Trails range from moderate to challenging with panoramic views from the summit."
  },
  {
    "q": "What are HOA fees in Henderson Hills?",
    "a": "HOA fees in Henderson Hills neighborhoods typically range from $50 to $150 per month, covering common area maintenance, landscaping, and neighborhood governance."
  },
  {
    "q": "How does Henderson Hills compare to Seven Hills?",
    "a": "Henderson Hills offers hillside views at significantly lower price points than Seven Hills. Seven Hills is guard-gated with golf course amenities; Henderson Hills is open with a more moderate, accessible character."
  },
  {
    "q": "When were homes in Henderson Hills built?",
    "a": "Most homes in Henderson Hills were built in the 1990s and early 2000s. The neighborhoods are established with mature landscaping and a settled residential character."
  },
  {
    "q": "What are the best sub-neighborhoods within Henderson Hills?",
    "a": "The best sub-neighborhood depends on your priorities — school zones, lot size, home age, and proximity to amenities all vary within the community. Nevada Real Estate Group agents who specialize in Henderson Hills can walk you through the specific blocks and streets that match your criteria."
  },
  {
    "q": "How is new construction availability in Henderson Hills?",
    "a": "New construction availability varies by season and builder phase. Some sections of Henderson Hills have active new home sales while others are fully built out with resale-only inventory. Contact Nevada Real Estate Group for the most current new construction options."
  }
]

export default function HendersonHillsFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Henderson Hills</h2>
          <p>The questions buyers ask most when exploring Henderson Hills.</p>
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
