'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range in the Warm Springs area?",
    "a": "Homes in the Warm Springs area range from approximately $350,000 for townhomes and smaller properties to $650,000 for larger single-family homes. The average single-family home sells between $400K and $500K."
  },
  {
    "q": "What ZIP codes are in the Warm Springs area?",
    "a": "The Warm Springs area spans ZIP codes 89148 and 89113 in southwest Las Vegas. Home prices range from $350K–$650K."
  },
  {
    "q": "Is Warm Springs a good location for commuters?",
    "a": "Yes. The Warm Springs area has excellent freeway access via I-215 and I-15, providing 15-minute commutes to the Strip and efficient routes to Summerlin, Henderson, and the airport. It is one of the best-connected corridors in the southwest valley."
  },
  {
    "q": "What schools serve the Warm Springs area?",
    "a": "The area is served by CCSD schools including Mabel W. Hoggard Elementary (7/10) and Lawrence & Heidi Canarelli Middle School (6/10). Doral Academy (9/10) is a strong charter option. Bishop Gorman High School (A+) is the top private option."
  },
  {
    "q": "Is Warm Springs a master-planned community?",
    "a": "No. The Warm Springs area is a collection of individual neighborhoods and subdivisions along the Warm Springs Road corridor, not a single master-planned community. Each neighborhood may have its own HOA."
  },
  {
    "q": "What are HOA fees in the Warm Springs area?",
    "a": "HOA fees vary by neighborhood and range from $50 to $175 per month. Some standalone homes have no HOA. Townhome and condo communities typically have higher fees covering shared amenities."
  },
  {
    "q": "What shopping is near Warm Springs?",
    "a": "The Warm Springs area is surrounded by commercial corridors along Durango Drive, Rainbow Boulevard, and the I-215 interchange areas. Multiple grocery stores, restaurants, and retail centers are within a few minutes' drive."
  },
  {
    "q": "Is Warm Springs a good area for investment?",
    "a": "Yes. Warm Springs offers strong investment fundamentals including affordable entry points, consistent rental demand, central location, and freeway access. The diverse housing stock allows investment at multiple price points."
  },
  {
    "q": "What are the best sub-neighborhoods within Warm Springs?",
    "a": "The best sub-neighborhood depends on your priorities — school zones, lot size, home age, and proximity to amenities all vary within the community. Nevada Real Estate Group agents who specialize in Warm Springs can walk you through the specific blocks and streets that match your criteria."
  },
  {
    "q": "How is new construction availability in Warm Springs?",
    "a": "New construction availability varies by season and builder phase. Some sections of Warm Springs have active new home sales while others are fully built out with resale-only inventory. Contact Nevada Real Estate Group for the most current new construction options."
  }
]

export default function LasVegasWarmspringsFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Warm Springs</h2>
          <p>The questions buyers ask most when exploring Warm Springs.</p>
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
