'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range in the Arts District?",
    "a": "Homes in the Arts District range from approximately $200,000 for studio condos and lofts to $800,000+ for custom modern homes and premium conversions. The average unit sells between $300K and $500K."
  },
  {
    "q": "Where is the Arts District in Las Vegas?",
    "a": "The Arts District (18b) occupies 18 blocks in Downtown Las Vegas, bounded approximately by Las Vegas Boulevard, I-15, Charleston Boulevard, and Sahara Avenue. It is just south of Fremont Street."
  },
  {
    "q": "What is First Friday?",
    "a": "First Friday is a monthly arts walk held on the first Friday of every month in the Arts District. Galleries open their doors, food trucks line the streets, live music plays, and thousands of visitors explore the district's creative culture."
  },
  {
    "q": "Is the Arts District safe?",
    "a": "The Arts District has improved significantly in recent years with increased foot traffic, business investment, and residential development. As with any urban neighborhood, awareness is important. The active street life and growing resident base contribute to safety."
  },
  {
    "q": "What types of housing are in the Arts District?",
    "a": "The Arts District offers converted industrial lofts, modern townhomes, mid-century home renovations, new construction condos, and mixed-use live/work spaces. It is one of the most architecturally diverse neighborhoods in Las Vegas."
  },
  {
    "q": "Is the Arts District walkable?",
    "a": "Yes. The Arts District is one of the only truly walkable neighborhoods in Las Vegas. Residents can walk to galleries, restaurants, breweries, coffee shops, and nightlife destinations within the district."
  },
  {
    "q": "Is the Arts District a good investment?",
    "a": "The Arts District has seen some of the strongest appreciation in the Las Vegas metro as the neighborhood continues to develop. The unique character, downtown location, and limited inventory create favorable conditions for long-term value growth."
  },
  {
    "q": "What are HOA fees in the Arts District?",
    "a": "HOA fees vary widely from $100 to $400 per month depending on the building type. Condo and loft buildings typically have higher fees covering shared amenities. Standalone homes and townhomes may have lower or no HOA fees."
  }
]

export default function LasVegasArtsDistrictFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Arts District / 18b</h2>
          <p>The questions buyers ask most when exploring Arts District / 18b.</p>
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
