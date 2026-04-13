'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for homes in Paseo Verde?",
    "a": "Homes in Paseo Verde range from approximately $400,000 for well-maintained single-family homes to $700,000 or more for larger residences on premium lots with mountain views."
  },
  {
    "q": "What ZIP codes cover Paseo Verde?",
    "a": "Paseo Verde spans portions of ZIP codes 89012 and 89052 in Henderson, Nevada."
  },
  {
    "q": "What schools serve Paseo Verde?",
    "a": "Paseo Verde is served by top-rated CCSD schools including Elise L. Wolff Elementary (8/10), Del E. Webb Middle School (8/10), and Coronado High School (7/10). Charter and private schools are also nearby."
  },
  {
    "q": "Is Paseo Verde walkable?",
    "a": "Yes. Paseo Verde is one of the most walkable established neighborhoods in Henderson, with extensive sidewalks and trails connecting parks, schools, the library, and commercial areas."
  },
  {
    "q": "How far is Paseo Verde from the Strip?",
    "a": "Paseo Verde is approximately 20 minutes from the Las Vegas Strip via I-215 and I-15 North."
  },
  {
    "q": "Is Paseo Verde a good area for families?",
    "a": "Yes. Paseo Verde is one of Henderson's most popular family neighborhoods, with top-rated schools, excellent parks, walkable design, and a safe, well-maintained community environment."
  },
  {
    "q": "What are HOA fees in Paseo Verde?",
    "a": "HOA fees in Paseo Verde typically range from $50 to $150 per month, covering common area maintenance, community amenities, and neighborhood landscaping standards."
  },
  {
    "q": "What is near Paseo Verde?",
    "a": "Paseo Verde is near Green Valley Ranch Resort & Casino, Anthem Marketplace, Henderson Executive Airport, and the I-215 beltway. Shopping, dining, and medical facilities are within minutes."
  }
]

export default function HendersonPaseoVerdeFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Paseo Verde</h2>
          <p>The questions buyers ask most when exploring Paseo Verde.</p>
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
