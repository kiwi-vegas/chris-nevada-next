'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range along the Fort Apache Corridor?",
    "a": "Homes range from approximately $400,000 in the southern sections near Enterprise to $800,000 or more in the northern sections near Summerlin and the foothills."
  },
  {
    "q": "What ZIP codes does the Fort Apache Corridor cover?",
    "a": "The corridor spans multiple ZIP codes including 89148, 89135, 89117, and 89129, running from south of I-215 to north of Cheyenne."
  },
  {
    "q": "Is the Fort Apache Corridor near Summerlin?",
    "a": "Yes. The western side of Fort Apache Road borders Summerlin in many sections. Downtown Summerlin is approximately 5 minutes from the Charleston intersection."
  },
  {
    "q": "What schools serve the Fort Apache Corridor?",
    "a": "The corridor is served by well-rated schools including Palo Verde High School (8/10) and Sig Rogich Middle School (7/10). Premier private schools The Meadows (A+) and Bishop Gorman (A+) are nearby."
  },
  {
    "q": "How far is the Fort Apache Corridor from the Strip?",
    "a": "The corridor is approximately 15 minutes from the Strip via Flamingo Road or Spring Mountain Road heading east."
  },
  {
    "q": "Is the Fort Apache Corridor good for families?",
    "a": "Yes. The corridor offers strong schools, community parks, safe neighborhoods, and proximity to family-friendly amenities in both Summerlin and the central valley."
  },
  {
    "q": "What are HOA fees along the Fort Apache Corridor?",
    "a": "HOA fees range from $50 to $250 per month depending on the specific community and its amenities."
  },
  {
    "q": "Is the Fort Apache Corridor a good investment?",
    "a": "Yes. The corridor benefits from Summerlin proximity, growing commercial development, and limited west-side land supply. Consistent demand supports steady appreciation."
  }
]

export default function LasVegasFortApacheCorridorFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Fort Apache Corridor</h2>
          <p>The questions buyers ask most when exploring Fort Apache Corridor.</p>
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
