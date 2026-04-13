'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the age requirement for Solera at Anthem?",
    "a": "Solera at Anthem is a 55+ community. At least one resident in each household must be 55 years of age or older. Some homes may allow a younger spouse, but all residents must comply with the community's age-restriction rules."
  },
  {
    "q": "Is Solera at Anthem guard-gated?",
    "a": "Yes. Solera at Anthem has a 24-hour staffed guard gate with controlled access. It is one of the few guard-gated 55+ communities in Henderson."
  },
  {
    "q": "What is the price range for homes in Solera at Anthem?",
    "a": "Homes in Solera at Anthem range from approximately $350,000 for attached patio homes to $650,000 for larger detached homes on premium lots with mountain views."
  },
  {
    "q": "How does Solera compare to Sun City Anthem?",
    "a": "Both are 55+ communities within Anthem. Sun City Anthem is much larger (7,000+ homes vs 900+), has its own golf course, and a bigger clubhouse. Solera is smaller, more intimate, and guard-gated — offering a tighter-knit community feel with controlled access that Sun City Anthem does not have."
  },
  {
    "q": "What are HOA fees in Solera at Anthem?",
    "a": "HOA fees typically range from $150 to $280 per month. Fees cover guard gate staffing, front yard landscaping, common area maintenance, clubhouse facilities, pool, and fitness center."
  },
  {
    "q": "Are homes in Solera single-story?",
    "a": "Yes. All homes in Solera at Anthem are single-story for accessibility, which is standard for 55+ communities. Homes range from approximately 1,200 to 2,400 square feet."
  },
  {
    "q": "What ZIP code is Solera at Anthem in?",
    "a": "Solera at Anthem is located in ZIP code 89044 in Henderson, Nevada."
  },
  {
    "q": "Does Solera at Anthem have a golf course?",
    "a": "No, Solera does not have its own golf course. However, the nearby Anthem Country Club (Hale Irwin-designed) and Sun City Anthem (two courses) are within a short drive. Several Henderson golf courses are easily accessible."
  }
]

export default function SoleraAtAnthemFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Solera at Anthem</h2>
          <p>The questions buyers ask most when exploring Solera at Anthem.</p>
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
