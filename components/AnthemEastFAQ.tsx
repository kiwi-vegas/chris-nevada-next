'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for homes in Anthem East?",
    "a": "Homes in Anthem East range from approximately $500,000 for single-story homes in established sections to $900,000 for larger homes on premium view lots backing to the Black Mountain wilderness."
  },
  {
    "q": "Is Anthem East guard-gated?",
    "a": "No. Anthem East is not guard-gated. It is the non-age-restricted section of the Anthem master plan, accessible to all ages. Anthem Country Club within Anthem is separately guard-gated."
  },
  {
    "q": "What is the difference between Anthem East and Sun City Anthem?",
    "a": "Sun City Anthem is a 55+ age-restricted Del Webb community within the Anthem master plan. Anthem East is the all-ages, family-friendly section with no age restrictions. Both share Anthem's amenities and Henderson location."
  },
  {
    "q": "What ZIP code is Anthem East in?",
    "a": "Anthem East is located in ZIP code 89052 in Henderson, Nevada. Home prices range from $500K–$900K."
  },
  {
    "q": "What schools serve Anthem East?",
    "a": "Anthem East is served by some of the highest-rated CCSD schools including Elise L. Wolff Elementary (9/10), Del E. Webb Middle School (7/10), and Coronado High School (7/10)."
  },
  {
    "q": "What are HOA fees in Anthem East?",
    "a": "HOA fees in Anthem East typically range from $75 to $200 per month, covering access to the Anthem Center recreation facility, community parks, trail system, and common area maintenance."
  },
  {
    "q": "Are there hiking trails near Anthem East?",
    "a": "Yes. Anthem East has an extensive connected trail system and is adjacent to the Sloan Canyon National Conservation Area, which offers over 48,000 acres of desert hiking, petroglyphs, and wildlife viewing."
  },
  {
    "q": "Is Anthem East good for families?",
    "a": "Yes. Anthem East is one of the most popular family communities in Henderson, with top-rated schools, community parks, the Anthem Center recreation facility, and Henderson's consistently high safety rankings."
  },
  {
    "q": "What are the best sub-neighborhoods within Anthem East?",
    "a": "The best sub-neighborhood depends on your priorities — school zones, lot size, home age, and proximity to amenities all vary within the community. Nevada Real Estate Group agents who specialize in Anthem East can walk you through the specific blocks and streets that match your criteria."
  },
  {
    "q": "How is new construction availability in Anthem East?",
    "a": "New construction availability varies by season and builder phase. Some sections of Anthem East have active new home sales while others are fully built out with resale-only inventory. Contact Nevada Real Estate Group for the most current new construction options."
  }
]

export default function AnthemEastFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Anthem East</h2>
          <p>The questions buyers ask most when exploring Anthem East.</p>
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
