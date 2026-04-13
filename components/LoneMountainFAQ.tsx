'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for homes in Lone Mountain?",
    "a": "Homes in the Lone Mountain area range from approximately $400,000 for standard-lot single-family homes to $900,000 or more for large-lot custom homes and equestrian estates with acreage."
  },
  {
    "q": "Can you keep horses in Lone Mountain?",
    "a": "Yes. Lone Mountain is one of the few areas in the Las Vegas Valley zoned for horse keeping. Many properties include stables, corrals, riding arenas, and access to riding trails."
  },
  {
    "q": "What is Lone Mountain?",
    "a": "Lone Mountain is a prominent geological formation rising approximately 600 feet above the surrounding desert in northwest Las Vegas. The residential area surrounding it features large-lot homes, equestrian properties, and mountain views."
  },
  {
    "q": "What ZIP codes are in the Lone Mountain area?",
    "a": "The Lone Mountain area spans portions of ZIP codes 89129, 89131, and 89149 in northwest Las Vegas."
  },
  {
    "q": "Do homes in Lone Mountain have an HOA?",
    "a": "Many Lone Mountain properties — particularly the larger-lot and equestrian properties — have no HOA. This gives owners maximum flexibility for land use. Some newer subdivisions on the community's periphery do have HOA associations."
  },
  {
    "q": "How far is Lone Mountain from the Strip?",
    "a": "Lone Mountain is approximately 20 minutes from the Las Vegas Strip via US-95 South. Downtown Summerlin is about 15 minutes south."
  },
  {
    "q": "Is Lone Mountain good for families?",
    "a": "Lone Mountain is excellent for families seeking space, privacy, and outdoor living. The large lots, mountain views, and proximity to parks and trails create a unique family environment. Schools include Lowman Elementary (8/10) and Escobedo Middle (7/10)."
  },
  {
    "q": "What schools serve Lone Mountain?",
    "a": "Lone Mountain is served by CCSD schools including Lowman Elementary (8/10) and Escobedo Middle (7/10). Private options include The Meadows School (A+) and Bishop Gorman (A+). Doral Academy Red Rock (9/10) is a top charter option."
  }
]

export default function LoneMountainFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Lone Mountain</h2>
          <p>The questions buyers ask most when exploring Lone Mountain.</p>
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
