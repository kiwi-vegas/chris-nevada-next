'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for homes in Roma Hills?",
    "a": "Homes in Roma Hills range from approximately $600,000 for established homes in the lower sections to over $15 million for ultra-luxury custom estates in the Obsidian enclave."
  },
  {
    "q": "Is Roma Hills guard-gated?",
    "a": "Yes. Roma Hills is a guard-gated community with a 24-hour staffed gate. The Obsidian neighborhood within Roma Hills has an additional guard gate (double guard-gated)."
  },
  {
    "q": "What is Obsidian at Roma Hills?",
    "a": "Obsidian is an ultra-luxury enclave within Roma Hills featuring double guard-gated access and custom estates ranging from $5 million to over $15 million. It is the most exclusive neighborhood within Roma Hills."
  },
  {
    "q": "What ZIP code is Roma Hills in?",
    "a": "Roma Hills is located in ZIP code 89052 in Henderson, Nevada."
  },
  {
    "q": "What views do Roma Hills homes have?",
    "a": "Roma Hills' elevated hillside position provides panoramic views of the Las Vegas Strip, the entire Las Vegas Valley, and surrounding mountain ranges. Many homes have 180-degree or wider views."
  },
  {
    "q": "What are HOA fees in Roma Hills?",
    "a": "HOA fees range from approximately $200 to $800 per month depending on the specific neighborhood. Obsidian residents pay additional fees for the double guard-gated amenity."
  },
  {
    "q": "How does Roma Hills compare to MacDonald Highlands?",
    "a": "Both are guard-gated luxury communities in Henderson's foothills with panoramic views. MacDonald Highlands offers DragonRidge Country Club golf and newer ultra-luxury construction ($800K–$28M+), while Roma Hills provides a wider price range ($600K–$15M+) without a golf course."
  },
  {
    "q": "What schools serve Roma Hills?",
    "a": "Roma Hills is served by CCSD schools including Vanderburg Elementary (8/10), Del E. Webb Middle School (7/10), and Coronado High School (6/10). Private options include Henderson International School (A) and Bishop Gorman High School (A+)."
  }
]

export default function RomaHillsFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Roma Hills</h2>
          <p>The questions buyers ask most when exploring Roma Hills.</p>
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
