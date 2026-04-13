'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range in The Arbors?",
    "a": "Homes in The Arbors range from approximately $450,000 for smaller homes and townhomes to over $800,000 for larger, renovated properties on premium lots."
  },
  {
    "q": "Is The Arbors guard-gated?",
    "a": "No — The Arbors is not guard-gated. Most neighborhoods within The Arbors are gated with key-fob or access code entry but do not have a staffed guard gate."
  },
  {
    "q": "When was The Arbors built?",
    "a": "The Arbors was one of Summerlin's original villages, with development beginning in 1993. Most homes were built between 1993 and the early 2000s."
  },
  {
    "q": "What schools serve The Arbors?",
    "a": "The Arbors is served by CCSD schools including Jydstrup Elementary (7/10), Mannion Middle (7/10), and Palo Verde High School (8/10). Top private schools including The Meadows School (A+) are nearby."
  },
  {
    "q": "How does The Arbors compare to Stonebridge?",
    "a": "Stonebridge offers new construction with modern architecture and mountain views. The Arbors offers established neighborhoods with mature landscaping and lower price points. Both are excellent Summerlin villages — the choice depends on whether you prefer new construction or established character."
  },
  {
    "q": "What are HOA fees in The Arbors?",
    "a": "HOA fees in The Arbors are among the most affordable in Summerlin, ranging from approximately $75 to $200 per month. This includes the Summerlin master association fee plus the village sub-association fee."
  },
  {
    "q": "Is The Arbors a good value in Summerlin?",
    "a": "Yes — The Arbors is one of the most affordable villages in Summerlin while delivering the full Summerlin lifestyle: trail access, community amenities, strong schools, and proximity to Downtown Summerlin. It represents excellent value for buyers who prefer established neighborhoods."
  },
  {
    "q": "What ZIP code is The Arbors in?",
    "a": "The Arbors is located primarily in ZIP codes 89134 and 89144 in the Summerlin North area of Las Vegas."
  }
]

export default function SummerlinTheArborsFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About The Arbors</h2>
          <p>The questions buyers ask most when exploring The Arbors.</p>
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
