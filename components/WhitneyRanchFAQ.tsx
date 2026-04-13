'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for homes in Whitney Ranch?",
    "a": "Homes in Whitney Ranch range from approximately $350,000 for smaller homes and townhomes to $600,000 for larger single-family homes on premium lots with upgraded finishes."
  },
  {
    "q": "Is Whitney Ranch guard-gated?",
    "a": "No. Whitney Ranch is not a guard-gated community. It is an open master-planned community with HOA governance and the safety benefits of Henderson — one of America's safest large cities."
  },
  {
    "q": "What ZIP codes is Whitney Ranch in?",
    "a": "Whitney Ranch spans ZIP codes 89014 and 89074 in Henderson, Nevada."
  },
  {
    "q": "What are HOA fees in Whitney Ranch?",
    "a": "HOA fees in Whitney Ranch typically range from $50 to $120 per month, depending on the specific neighborhood. Fees cover common area maintenance, community landscaping, and HOA governance."
  },
  {
    "q": "What schools serve Whitney Ranch?",
    "a": "Whitney Ranch is served by CCSD schools including Nate Mack Elementary (8/10), Jack Lund Schofield Middle School (6/10), and Green Valley High School (7/10). Charter and private options are also available nearby."
  },
  {
    "q": "How close is Whitney Ranch to shopping?",
    "a": "Whitney Ranch is one of the most conveniently located communities in Henderson. The Galleria at Sunset mall is approximately a 5-minute drive. Water Street District, grocery stores, and dozens of restaurants are even closer."
  },
  {
    "q": "When were homes in Whitney Ranch built?",
    "a": "Whitney Ranch was developed from the early 1990s through the mid-2000s across multiple phases. The community features mature landscaping and a settled character with homes ranging from 1,200 to 3,000+ square feet."
  },
  {
    "q": "Is Whitney Ranch a good area for families?",
    "a": "Yes. Whitney Ranch is one of Henderson's most popular family communities due to its central location, well-regarded schools, multiple parks and playgrounds, walking paths, and easy access to youth sports leagues and activities throughout Henderson."
  }
]

export default function WhitneyRanchFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Whitney Ranch</h2>
          <p>The questions buyers ask most when exploring Whitney Ranch.</p>
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
