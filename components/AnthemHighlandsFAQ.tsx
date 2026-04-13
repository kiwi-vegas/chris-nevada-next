'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for homes in Anthem Highlands?",
    "a": "Homes in Anthem Highlands range from approximately $500,000 for smaller resale homes to $800,000 for larger updated properties on premium view lots with mountain and valley views."
  },
  {
    "q": "Is Anthem Highlands guard-gated?",
    "a": "No. Anthem Highlands is not guard-gated, though it benefits from the managed access and security patrols of the broader Anthem master-planned community. For guard-gated living within Anthem, see Anthem Country Club."
  },
  {
    "q": "What ZIP code is Anthem Highlands in?",
    "a": "Anthem Highlands is located in ZIP code 89052 in Henderson, Nevada."
  },
  {
    "q": "What schools serve Anthem Highlands?",
    "a": "Anthem Highlands is zoned for Vanderburg Elementary (9/10 GreatSchools), Del E. Webb Middle School (8/10), and Coronado High School (8/10) — one of the top school trifectas in Clark County."
  },
  {
    "q": "How does Anthem Highlands compare to Anthem Coventry?",
    "a": "Both are family-oriented villages within Anthem sharing the same amenities and school zoning. Highlands tends to have slightly newer construction and more elevated terrain with valley views. Coventry has more mature landscaping. Pricing is very similar between the two."
  },
  {
    "q": "What amenities does Anthem Highlands have?",
    "a": "Residents have full access to the Anthem Center with resort-style pools, fitness center, tennis courts, and community gathering spaces. The neighborhood also features its own parks, trails, and greenbelts."
  },
  {
    "q": "What are HOA fees in Anthem Highlands?",
    "a": "HOA fees in Anthem Highlands typically range from $80 to $180 per month, covering the Anthem master association fee. Fees fund the Anthem Center, trail maintenance, common area landscaping, and security patrols."
  },
  {
    "q": "Is Anthem Highlands a good area for families?",
    "a": "Yes. Anthem Highlands is one of the most popular family neighborhoods in Henderson, with top-rated schools, safe cul-de-sac street design, multiple parks, and a community center that serves as a social hub for families."
  },
  {
    "q": "What are the best sub-neighborhoods within Anthem Highlands?",
    "a": "The best sub-neighborhood depends on your priorities — school zones, lot size, home age, and proximity to amenities all vary within the community. Nevada Real Estate Group agents who specialize in Anthem Highlands can walk you through the specific blocks and streets that match your criteria."
  },
  {
    "q": "How is new construction availability in Anthem Highlands?",
    "a": "New construction availability varies by season and builder phase. Some sections of Anthem Highlands have active new home sales while others are fully built out with resale-only inventory. Contact Nevada Real Estate Group for the most current new construction options."
  }
]

export default function AnthemHighlandsFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Anthem Highlands</h2>
          <p>The questions buyers ask most when exploring Anthem Highlands.</p>
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
