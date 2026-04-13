'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range in Spring Valley South?",
    "a": "Homes in Spring Valley South range from approximately $350,000 for townhomes and smaller homes to $700,000 for larger family estates. The most common price range is $400K–$550K."
  },
  {
    "q": "What ZIP codes are in Spring Valley South?",
    "a": "Spring Valley South spans ZIP codes 89147 and 89148 in Las Vegas, Nevada. Home prices range from $350K–$700K."
  },
  {
    "q": "How far is Spring Valley South from the Strip?",
    "a": "Spring Valley South is approximately 12-15 minutes from the Las Vegas Strip via Flamingo Road East or I-215 to I-15. It is one of the closest affordable residential areas to the resort corridor."
  },
  {
    "q": "What is Desert Breeze Park?",
    "a": "Desert Breeze Park is a 20-acre community park within Spring Valley South featuring a lake, playground, tennis courts, walking trails, skate park, and community center. It is one of Las Vegas' most beloved parks."
  },
  {
    "q": "What schools serve Spring Valley South?",
    "a": "The area is served by CCSD schools including Mabel W. Hoggard Elementary (7/10) and Spring Valley High School. Doral Academy (9/10) is a strong charter option. Bishop Gorman (A+) is the premier private school."
  },
  {
    "q": "Is Spring Valley South a good investment?",
    "a": "Yes. Spring Valley South's central location, affordable pricing, and strong rental demand create solid investment fundamentals. The proximity to the Strip makes it attractive to hospitality workers seeking rentals."
  },
  {
    "q": "What are HOA fees in Spring Valley South?",
    "a": "HOA fees range from $50 to $175 per month depending on the neighborhood. Some standalone homes have no HOA. Townhome and condo communities have slightly higher fees."
  },
  {
    "q": "Is Spring Valley South a master-planned community?",
    "a": "No. Spring Valley South is a collection of individual neighborhoods and subdivisions, not a single master-planned community. Each neighborhood may have its own HOA with varying rules."
  },
  {
    "q": "What are the best sub-neighborhoods within Spring Valley South?",
    "a": "The best sub-neighborhood depends on your priorities — school zones, lot size, home age, and proximity to amenities all vary within the community. Nevada Real Estate Group agents who specialize in Spring Valley South can walk you through the specific blocks and streets that match your criteria."
  },
  {
    "q": "How is new construction availability in Spring Valley South?",
    "a": "New construction availability varies by season and builder phase. Some sections of Spring Valley South have active new home sales while others are fully built out with resale-only inventory. Contact Nevada Real Estate Group for the most current new construction options."
  }
]

export default function LasVegasSpringValleySouthFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Spring Valley South</h2>
          <p>The questions buyers ask most when exploring Spring Valley South.</p>
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
