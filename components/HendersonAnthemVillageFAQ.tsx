'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for homes in Anthem Village?",
    "a": "Homes in Anthem Village range from approximately $400,000 for attached homes and townhomes to $700,000 or more for larger single-family residences on premium lots with mountain or golf course views."
  },
  {
    "q": "Is Anthem Village the same as Sun City Anthem?",
    "a": "No. Anthem Village is the non-age-restricted family section of the Anthem master plan. Sun City Anthem is the 55+ active adult section. Both are part of the broader Anthem community in Henderson."
  },
  {
    "q": "What ZIP code is Anthem Village in?",
    "a": "Anthem Village is primarily in ZIP code 89052 in Henderson, Nevada. Home prices range from $400K–$700K."
  },
  {
    "q": "What schools serve Anthem Village?",
    "a": "Anthem Village is served by top-rated CCSD schools including Vanderburg Elementary (9/10), Del E. Webb Middle School (8/10), and Coronado High School (7/10). Charter options include Doral Academy (9/10)."
  },
  {
    "q": "Is Anthem Village guard-gated?",
    "a": "No. Anthem Village is not guard-gated, though the adjacent Anthem Country Club is a guard-gated community. Anthem Village has an active HOA that maintains community standards and amenities."
  },
  {
    "q": "How far is Anthem Village from the Strip?",
    "a": "Anthem Village is approximately 25 minutes from the Las Vegas Strip via I-215 and I-15. The 215 Beltway provides direct access to multiple corridors across the valley."
  },
  {
    "q": "What are HOA fees in Anthem Village?",
    "a": "HOA fees in Anthem Village typically range from $80 to $180 per month, covering community parks, pools, trail maintenance, and common area upkeep."
  },
  {
    "q": "Is Anthem Village good for families?",
    "a": "Yes. Anthem Village is one of the most popular family communities in Henderson, with top-rated schools, extensive parks and trails, community pools, and a safe, well-maintained environment."
  },
  {
    "q": "What are the best sub-neighborhoods within Anthem Village?",
    "a": "The best sub-neighborhood depends on your priorities — school zones, lot size, home age, and proximity to amenities all vary within the community. Nevada Real Estate Group agents who specialize in Anthem Village can walk you through the specific blocks and streets that match your criteria."
  },
  {
    "q": "How is new construction availability in Anthem Village?",
    "a": "New construction availability varies by season and builder phase. Some sections of Anthem Village have active new home sales while others are fully built out with resale-only inventory. Contact Nevada Real Estate Group for the most current new construction options."
  }
]

export default function HendersonAnthemVillageFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Anthem Village</h2>
          <p>The questions buyers ask most when exploring Anthem Village.</p>
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
