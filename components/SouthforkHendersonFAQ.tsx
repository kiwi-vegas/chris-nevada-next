'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for homes in Southfork?",
    "a": "Homes in Southfork range from approximately $450,000 for smaller homes to $750,000 for larger homes on premium lots. It is one of the most affordable guard-gated communities in the Las Vegas Valley."
  },
  {
    "q": "Is Southfork guard-gated?",
    "a": "Yes. Southfork has a 24-hour staffed guard gate with controlled access. Despite its accessible pricing, residents enjoy the same guard-gated security as Henderson's luxury communities."
  },
  {
    "q": "What ZIP code is Southfork in?",
    "a": "Southfork is located in ZIP code 89074 in Henderson, Nevada, within the Green Valley corridor."
  },
  {
    "q": "What schools serve Southfork?",
    "a": "Southfork is served by top CCSD schools including Vanderburg Elementary (9/10), Del E. Webb Middle School (8/10), and Coronado High School (8/10). Private and charter school options are also nearby."
  },
  {
    "q": "How does Southfork compare to The Fountains?",
    "a": "Both are guard-gated communities in Green Valley. The Fountains is a luxury community with homes from $800K to $3M on large estate lots. Southfork is more accessible ($450K–$750K) with smaller but well-built homes. Both offer 24-hour guard gate security."
  },
  {
    "q": "What are HOA fees in Southfork?",
    "a": "HOA fees in Southfork typically range from $150 to $300 per month, covering guard gate staffing, security patrols, common area maintenance, and community landscaping."
  },
  {
    "q": "Is Southfork good for families?",
    "a": "Yes. Southfork is one of Henderson's most popular family-oriented guard-gated communities. The controlled access, quiet streets, and top-rated school zoning make it ideal for families with children."
  },
  {
    "q": "Is Southfork a good investment?",
    "a": "Southfork punches above its weight in appreciation because guard-gated communities consistently outperform non-gated alternatives. The combination of security, schools, and Henderson location supports strong long-term value."
  }
]

export default function SouthforkHendersonFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Southfork</h2>
          <p>The questions buyers ask most when exploring Southfork.</p>
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
