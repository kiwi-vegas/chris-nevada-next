'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for homes in Blue Diamond?",
    "a": "Properties in Blue Diamond range from approximately $500,000 for smaller ranch homes to over $2 million for custom estates on multi-acre parcels with horse facilities and mountain views."
  },
  {
    "q": "Can you have horses in Blue Diamond?",
    "a": "Yes. Blue Diamond is one of the premier equestrian communities near Las Vegas. Multi-acre parcels accommodate horses, arenas, barns, and corrals. There is no HOA to restrict livestock."
  },
  {
    "q": "Is Blue Diamond in Las Vegas?",
    "a": "Blue Diamond is an unincorporated community in Clark County, approximately 25 minutes southwest of the Las Vegas Strip via Blue Diamond Road (SR-159). It is not within the city limits of Las Vegas."
  },
  {
    "q": "Does Blue Diamond have an HOA?",
    "a": "No. Blue Diamond has no homeowners association. Property use is governed by county zoning regulations, giving owners significant freedom in how they use and develop their land."
  },
  {
    "q": "What is the history of Blue Diamond?",
    "a": "Blue Diamond was established in 1942 as a company town for the Blue Diamond Materials Company, which operated a gypsum mine and processing plant in the area. The community evolved into a residential enclave as mining operations wound down."
  },
  {
    "q": "How close is Blue Diamond to Red Rock Canyon?",
    "a": "Blue Diamond is located at the southern gateway to Red Rock Canyon National Conservation Area. The scenic loop entrance is approximately 5 minutes north via SR-159."
  },
  {
    "q": "Are there stores and restaurants in Blue Diamond?",
    "a": "Blue Diamond has a small general store and occasional food vendors. For full grocery, dining, and retail, residents drive 15–20 minutes to the Summerlin area or Southern Highlands."
  },
  {
    "q": "How many homes are in Blue Diamond?",
    "a": "Blue Diamond has approximately 300 homes and 150 households. The community is extremely small and inventory is very limited — only a handful of properties trade hands in any given year."
  }
]

export default function BlueDiamondFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Blue Diamond</h2>
          <p>The questions buyers ask most when exploring Blue Diamond.</p>
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
