'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for homes in Dragon Rock?",
    "a": "Homes in Dragon Rock range from approximately $5 million to over $15 million. These are fully custom Blue Heron-designed estates ranging from 6,000 to 12,000+ square feet."
  },
  {
    "q": "What does 'double guard-gated' mean?",
    "a": "Dragon Rock is located within MacDonald Highlands, which has its own guard gate. Dragon Rock then has a second, private guard gate. Residents pass through two layers of controlled access — the MacDonald Highlands gate and the Dragon Rock gate — for maximum security and privacy."
  },
  {
    "q": "Who builds the homes in Dragon Rock?",
    "a": "Blue Heron is the sole developer and builder at Dragon Rock. Every home is a fully custom Blue Heron design featuring the company's signature desert-contemporary aesthetic with disappearing glass walls, negative-edge pools, and museum-quality finishes."
  },
  {
    "q": "How many homes are in Dragon Rock?",
    "a": "Dragon Rock has approximately 30 homesites. This extreme exclusivity is by design — each lot was positioned for maximum views and privacy with minimal visual intrusion from neighboring properties."
  },
  {
    "q": "What is DragonRidge Country Club?",
    "a": "DragonRidge Country Club is a private club within MacDonald Highlands featuring a Jay Morrish and David Druzisky-designed 18-hole championship course, full-service clubhouse with dining and events, resort-style pools, tennis courts, and a fitness center."
  },
  {
    "q": "What ZIP code is Dragon Rock in?",
    "a": "Dragon Rock is located in ZIP code 89012 within MacDonald Highlands in Henderson, Nevada."
  },
  {
    "q": "What are HOA fees at Dragon Rock?",
    "a": "HOA fees at Dragon Rock typically range from $800 to $2,000+ per month, covering both the MacDonald Highlands master association and the Dragon Rock sub-association. Fees cover dual guard gate staffing, security, common area maintenance, and community infrastructure."
  },
  {
    "q": "What views do Dragon Rock homes have?",
    "a": "Dragon Rock's elevated position within MacDonald Highlands provides panoramic views of the Las Vegas Strip, the entire valley floor, the Spring Mountains to the west, and the McCullough Range to the south. The views are among the most dramatic of any residential community in Las Vegas."
  }
]

export default function DragonRockFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Dragon Rock</h2>
          <p>The questions buyers ask most when exploring Dragon Rock.</p>
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
