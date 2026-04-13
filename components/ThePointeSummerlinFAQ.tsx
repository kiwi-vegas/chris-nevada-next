'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for homes in The Pointe?",
    "a": "Custom estates in The Pointe range from approximately $1.5 million to well over $5 million, depending on lot size, elevation, view exposure, and the scope of the custom build."
  },
  {
    "q": "Is The Pointe guard-gated?",
    "a": "Yes — The Pointe is double guard-gated. It is an exclusive enclave within The Ridges, meaning residents pass through The Ridges' main guard gate and then The Pointe's own secondary gate. This provides one of the highest levels of residential security in Nevada."
  },
  {
    "q": "What is the relationship between The Pointe and The Ridges?",
    "a": "The Pointe is the most exclusive sub-community within The Ridges. It occupies the westernmost position of The Ridges with the most dramatic Red Rock Canyon views and its own secondary guard gate within the larger Ridges community."
  },
  {
    "q": "What ZIP code is The Pointe in?",
    "a": "The Pointe is located in ZIP code 89135 in the Summerlin South area of Las Vegas."
  },
  {
    "q": "What views do The Pointe homes have?",
    "a": "The Pointe offers the most dramatic and unobstructed views of Red Rock Canyon in the Las Vegas Valley. Homes back directly against the conservation area, and the views are permanently protected from future development."
  },
  {
    "q": "What are HOA fees in The Pointe?",
    "a": "HOA fees range from $600 to $1,200 per month, covering the Summerlin master association, The Ridges sub-association, and The Pointe sub-association. Fees cover dual guard gates, security, and premium common area maintenance."
  },
  {
    "q": "Who builds homes in The Pointe?",
    "a": "The Pointe features fully custom homes by Las Vegas's most respected luxury builders including Blue Heron, Sun West Custom Homes, and other approved architects and builders working within The Ridges' strict architectural guidelines."
  },
  {
    "q": "How many homes are in The Pointe?",
    "a": "The Pointe contains approximately 75 custom estate lots across 60 acres. The limited inventory and permanently protected canyon views make it one of the most exclusive residential enclaves in the American Southwest."
  }
]

export default function ThePointeSummerlinFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About The Pointe</h2>
          <p>The questions buyers ask most when exploring The Pointe.</p>
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
