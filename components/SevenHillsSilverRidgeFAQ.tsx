'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for homes in Silver Ridge at Seven Hills?",
    "a": "Homes in Silver Ridge range from approximately $800,000 for updated resale homes to over $2 million for larger estates on premium view lots with unobstructed Strip and mountain panoramas."
  },
  {
    "q": "Is Silver Ridge guard-gated?",
    "a": "Silver Ridge is not guard-gated. It is part of the Seven Hills master plan, which has a manned entry, but Silver Ridge itself does not have a separate guard gate. For guard-gated options within Seven Hills, see Terracina or the Country Club area."
  },
  {
    "q": "What views do Silver Ridge homes have?",
    "a": "Silver Ridge occupies an elevated ridgeline within Seven Hills. North-facing homes enjoy panoramic Las Vegas Strip views, while east and south-facing homes overlook the McCullough Range and Sloan Canyon."
  },
  {
    "q": "What ZIP code is Silver Ridge in?",
    "a": "Silver Ridge is located in ZIP code 89052 in Henderson, Nevada, within the Seven Hills master-planned community."
  },
  {
    "q": "How large are homes in Silver Ridge?",
    "a": "Homes in Silver Ridge range from approximately 3,000 to 5,500 square feet. Most are single-family detached homes on larger-than-average lots with generous yard space."
  },
  {
    "q": "What are HOA fees in Silver Ridge?",
    "a": "HOA fees in Silver Ridge typically range from $180 to $350 per month, covering the Seven Hills master association plus any sub-association fees for common area maintenance, parks, and trails."
  },
  {
    "q": "What schools serve Silver Ridge?",
    "a": "Silver Ridge is served by CCSD schools including Jim Thorpe Elementary (8/10) and Coronado High School. Private options include Henderson International School and Bishop Gorman High School (A+)."
  },
  {
    "q": "How does Silver Ridge compare to Terracina?",
    "a": "Silver Ridge offers comparable views and lot sizes to Terracina at a lower price point, but without Terracina's guard-gated security and custom-home architecture. Silver Ridge is ideal for buyers wanting Seven Hills views without the premium of a guard-gated address."
  }
]

export default function SevenHillsSilverRidgeFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Silver Ridge</h2>
          <p>The questions buyers ask most when exploring Silver Ridge.</p>
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
