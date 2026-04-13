'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "Is North Las Vegas a good place to buy a home?",
    "a": "Yes. North Las Vegas offers the best value in the Las Vegas Valley with new-construction homes from the mid-$200s — typically $50K–$100K below comparable homes in Henderson or Summerlin. Major economic development and improving infrastructure support long-term appreciation."
  },
  {
    "q": "What is the price range for homes in North Las Vegas?",
    "a": "Homes in North Las Vegas range from approximately $250,000 in established neighborhoods to $600,000 for premium homes in newer master-planned communities like Skye Canyon and Aliante."
  },
  {
    "q": "What are the best neighborhoods in North Las Vegas?",
    "a": "Aliante is the most established master-planned community with golf and a casino resort. Skye Canyon offers premium new construction. Heartland at Tule Springs and The Villages deliver affordable new builds. Centennial Hills straddles the Las Vegas border."
  },
  {
    "q": "Is North Las Vegas safe?",
    "a": "Safety varies by neighborhood. Newer master-planned communities like Aliante, Skye Canyon, and Heartland at Tule Springs have low crime rates comparable to Henderson. The city's investment in policing and infrastructure continues to improve safety across all areas."
  },
  {
    "q": "How far is North Las Vegas from the Strip?",
    "a": "North Las Vegas is approximately 15–25 minutes from the Las Vegas Strip depending on which area you're in. The I-15 and US-95 corridors provide direct commute access."
  },
  {
    "q": "Is there new construction in North Las Vegas?",
    "a": "Yes. North Las Vegas is one of the most active new-construction markets in the Las Vegas Valley. Multiple national builders are delivering new homes in Skye Canyon, Heartland at Tule Springs, The Villages at Tule Springs, Craig Ranch, and other communities."
  },
  {
    "q": "What ZIP codes does North Las Vegas cover?",
    "a": "North Las Vegas spans multiple ZIP codes including 89030, 89031, 89032, 89081, 89084, 89085, and 89086. Newer communities tend to be in the 89084, 89085, and 89086 ZIP codes."
  },
  {
    "q": "Are there 55+ communities in North Las Vegas?",
    "a": "Yes. Sun City Aliante is a Del Webb 55+ community within the Aliante master plan. Ardiente and Del Webb at North Ranch offer additional active adult options."
  }
]

export default function NorthLasVegasFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About North Las Vegas</h2>
          <p>The questions buyers ask most when exploring North Las Vegas.</p>
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
