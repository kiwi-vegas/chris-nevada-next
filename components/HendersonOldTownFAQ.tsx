'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for homes in Old Town Henderson?",
    "a": "Homes in Old Town Henderson range from approximately $300,000 for smaller original bungalows and ranch homes to $600,000 for fully renovated properties on larger lots near the Water Street District."
  },
  {
    "q": "What is the Water Street District?",
    "a": "The Water Street District is Henderson's revitalized historic commercial corridor featuring craft breweries, locally owned restaurants, boutique shops, a farmers' market, and community event spaces. It has undergone a dramatic revitalization in recent years."
  },
  {
    "q": "Is Old Town Henderson safe?",
    "a": "Yes. Henderson consistently ranks among the top 10 safest large cities in America. Old Town Henderson benefits from the city's low crime rates, responsive police and fire services, and strong civic investment."
  },
  {
    "q": "Are there HOA fees in Old Town Henderson?",
    "a": "Most of Old Town Henderson has no HOA, which means no monthly fees and considerable flexibility for renovations, expansions, and personal expression."
  },
  {
    "q": "What ZIP code is Old Town Henderson?",
    "a": "Old Town Henderson is located in ZIP code 89015 in Henderson, Nevada."
  },
  {
    "q": "Is Old Town Henderson walkable?",
    "a": "Yes. Old Town Henderson is one of the most walkable neighborhoods in the Las Vegas Valley. The Water Street District, Henderson civic campus, parks, and daily services are all within walking distance or a short bike ride."
  },
  {
    "q": "Is Old Town Henderson a good investment?",
    "a": "Old Town Henderson offers strong investment potential due to the Water Street District revitalization, accessible price points, no-HOA flexibility, and Henderson's strong city services and safety rankings."
  },
  {
    "q": "When were homes in Old Town Henderson built?",
    "a": "Most homes in Old Town Henderson were built between the 1940s and 1970s. The neighborhood dates to Henderson's origins as a World War II industrial town that has since grown into Nevada's second-largest city."
  }
]

export default function HendersonOldTownFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Old Town Henderson</h2>
          <p>The questions buyers ask most when exploring Old Town Henderson.</p>
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
