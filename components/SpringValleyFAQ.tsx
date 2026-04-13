'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for homes in Spring Valley?",
    "a": "Homes in Spring Valley range from approximately $300,000 for condos and townhomes to $700,000 or more for larger single-family homes in premium sections. The median home price is typically in the $400K–$500K range."
  },
  {
    "q": "Is Spring Valley a city?",
    "a": "No. Spring Valley is an unincorporated community in Clark County, not a separately incorporated city. It is commonly referred to as a neighborhood or community of Las Vegas, though it has its own distinct identity and ZIP codes."
  },
  {
    "q": "What ZIP codes are in Spring Valley?",
    "a": "Spring Valley spans multiple ZIP codes including 89117, 89147, 89148, and 89113. The exact boundaries are fluid as Spring Valley is an unincorporated census-designated place."
  },
  {
    "q": "What schools serve Spring Valley?",
    "a": "Spring Valley is served by numerous CCSD schools including Spring Valley High School, Becker Middle School, and several elementary schools. Private options include The Meadows School (A+) and Bishop Gorman High School (A+). Doral Academy (9/10) is the top charter."
  },
  {
    "q": "Is Spring Valley a good area to live?",
    "a": "Spring Valley is one of the most popular residential areas in Las Vegas due to its central location, mature neighborhoods, strong commercial infrastructure, and relative affordability. It appeals to professionals, families, and investors alike."
  },
  {
    "q": "How close is Spring Valley to the Strip?",
    "a": "Spring Valley is approximately 10 minutes from the Las Vegas Strip via Flamingo Road or Spring Mountain Road. The central location provides easy access to the Strip, downtown, Summerlin, and Henderson."
  },
  {
    "q": "Are there guard-gated communities in Spring Valley?",
    "a": "Several guard-gated communities border or overlap with Spring Valley, including Canyon Gate Country Club, Spanish Trail, and The Lakes. These offer luxury living within the broader Spring Valley area."
  },
  {
    "q": "Is Spring Valley good for investment?",
    "a": "Spring Valley offers strong investment potential due to its central location, diverse tenant pool, and mature housing stock with renovation opportunities. Rental demand is consistently high given the proximity to the Strip and major employers."
  },
  {
    "q": "What are the best sub-neighborhoods within Spring Valley?",
    "a": "The best sub-neighborhood depends on your priorities — school zones, lot size, home age, and proximity to amenities all vary within the community. Nevada Real Estate Group agents who specialize in Spring Valley can walk you through the specific blocks and streets that match your criteria."
  },
  {
    "q": "How is new construction availability in Spring Valley?",
    "a": "New construction availability varies by season and builder phase. Some sections of Spring Valley have active new home sales while others are fully built out with resale-only inventory. Contact Nevada Real Estate Group for the most current new construction options."
  }
]

export default function SpringValleyFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Spring Valley</h2>
          <p>The questions buyers ask most when exploring Spring Valley.</p>
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
