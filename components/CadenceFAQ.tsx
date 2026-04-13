'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for homes in Cadence?",
    "a": "Homes in Cadence range from approximately $350,000 for entry-level new construction to $800,000 for premium homes in luxury neighborhoods. New construction from multiple national builders is available across the community."
  },
  {
    "q": "Is Cadence guard-gated?",
    "a": "The broader Cadence community is not guard-gated, but Heritage at Cadence — the 55+ active adult section — features its own guard-gated entry. The overall community has controlled access and active HOA management."
  },
  {
    "q": "Is Cadence still building new homes?",
    "a": "Yes. Cadence is one of the most active new-construction communities in the Las Vegas Valley. Multiple builders including Lennar, Toll Brothers, Woodside Homes, Richmond American, and Taylor Morrison are delivering new homes across multiple neighborhoods."
  },
  {
    "q": "What ZIP codes is Cadence in?",
    "a": "Cadence spans ZIP codes 89011 and 89015 in Henderson, Nevada. Home prices range from $350K–$800K."
  },
  {
    "q": "What are HOA fees in Cadence?",
    "a": "HOA fees in Cadence typically range from $100 to $250 per month, covering access to Central Park, the trail system, community events, and common area maintenance. Heritage at Cadence (55+) has separate fees that include guard gate and recreation center access."
  },
  {
    "q": "Does Cadence have fiber internet?",
    "a": "Yes. Cadence was designed with fiber-optic internet infrastructure to every home — one of the few master-planned communities in the valley with this distinction. This supports high-speed remote work, streaming, and smart-home connectivity."
  },
  {
    "q": "What amenities does Cadence offer?",
    "a": "Cadence features a 50-acre Central Park with resort pool and splash pad, a 50-acre sports complex, amphitheater, dog park, sports courts, and miles of interconnected walking and biking trails linking neighborhoods to parks and schools."
  },
  {
    "q": "Is there a 55+ community in Cadence?",
    "a": "Yes. Heritage at Cadence is a guard-gated 55+ active adult community within the Cadence master plan, offering single-story homes, a private recreation center, and age-restricted living."
  },
  {
    "q": "What are the best sub-neighborhoods within Cadence?",
    "a": "The best sub-neighborhood depends on your priorities — school zones, lot size, home age, and proximity to amenities all vary within the community. Nevada Real Estate Group agents who specialize in Cadence can walk you through the specific blocks and streets that match your criteria."
  },
  {
    "q": "How is new construction availability in Cadence?",
    "a": "New construction availability varies by season and builder phase. Some sections of Cadence have active new home sales while others are fully built out with resale-only inventory. Contact Nevada Real Estate Group for the most current new construction options."
  }
]

export default function CadenceFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Cadence</h2>
          <p>The questions buyers ask most when exploring Cadence.</p>
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
