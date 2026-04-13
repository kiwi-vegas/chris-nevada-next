'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for homes in Meadows Village?",
    "a": "Homes in Meadows Village range from approximately $300,000 for smaller homes to $600,000 for larger or renovated properties. The median is typically in the $350K–$400K range."
  },
  {
    "q": "What ZIP codes cover Meadows Village?",
    "a": "Meadows Village spans portions of ZIP codes 89107 and 89146 in the City of Las Vegas. Home prices range from $300K–$600K."
  },
  {
    "q": "Is Meadows Village near The Meadows School?",
    "a": "Yes. The Meadows School, one of Nevada's most prestigious private schools (PreK-12, A+ rating), is located adjacent to the Meadows Village neighborhood."
  },
  {
    "q": "Is the Meadows Mall still open?",
    "a": "Yes. The Meadows Mall continues to operate as a retail center, though its tenant mix has evolved over the years. It remains a commercial anchor for the surrounding neighborhood."
  },
  {
    "q": "Is Meadows Village good for investment?",
    "a": "Yes. Meadows Village offers affordable entry prices in a central location with strong rental demand. The older housing stock provides renovation opportunities with good ROI potential."
  },
  {
    "q": "How close is Meadows Village to the Strip?",
    "a": "Meadows Village is approximately 10 minutes from the Las Vegas Strip via Flamingo Road or Spring Mountain Road. The central location provides easy access to all major corridors."
  },
  {
    "q": "Are there HOAs in Meadows Village?",
    "a": "Most homes in Meadows Village have no HOA or minimal association dues under $100 per month. Some newer townhome and condo developments have higher HOA fees."
  },
  {
    "q": "What schools serve Meadows Village?",
    "a": "Public schools include Bracken Elementary, Johnson Middle School, and Valley High School. The top private option is The Meadows School (A+), located within the neighborhood."
  },
  {
    "q": "What are the best sub-neighborhoods within Meadows Village?",
    "a": "The best sub-neighborhood depends on your priorities — school zones, lot size, home age, and proximity to amenities all vary within the community. Nevada Real Estate Group agents who specialize in Meadows Village can walk you through the specific blocks and streets that match your criteria."
  },
  {
    "q": "How is new construction availability in Meadows Village?",
    "a": "New construction availability varies by season and builder phase. Some sections of Meadows Village have active new home sales while others are fully built out with resale-only inventory. Contact Nevada Real Estate Group for the most current new construction options."
  }
]

export default function LasVegasMeadowsVillageFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Meadows Village</h2>
          <p>The questions buyers ask most when exploring Meadows Village.</p>
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
