'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is Summerlin West?",
    "a": "Summerlin West is the newest section of the Summerlin master-planned community, developed by the Howard Hughes Corporation. It encompasses over 5,600 acres along the western edge of the Las Vegas Valley, adjacent to Red Rock Canyon, and features the most current architecture and amenities in Summerlin."
  },
  {
    "q": "What is the price range for homes in Summerlin West?",
    "a": "Homes in Summerlin West range from approximately $400,000 for newer single-family homes in villages like Kestrel to over $1 million for premium homes in Grand Park and Reverence. Custom estates in La Madre Peaks can exceed $5 million."
  },
  {
    "q": "What ZIP codes are in Summerlin West?",
    "a": "Summerlin West primarily spans ZIP codes 89138 and 89166 in the western Las Vegas Valley. Home prices range from $400K–$1M+."
  },
  {
    "q": "Is Summerlin West guard-gated?",
    "a": "Summerlin West as a whole is not guard-gated, but several neighborhoods within it are, including Carlisle Peak and Glenrock in Grand Park, and select enclaves in La Madre Peaks."
  },
  {
    "q": "What builders are in Summerlin West?",
    "a": "Major builders in Summerlin West include Toll Brothers, Lennar, Shea Homes, Pulte Homes, Taylor Morrison, Woodside Homes, and several others. The variety of builders offers a wide range of architectural styles and price points."
  },
  {
    "q": "What schools serve Summerlin West?",
    "a": "Summerlin West is served by CCSD schools including Staton Elementary, Sig Rogich Middle School (10/10 GreatSchools), and Arbor View High School. Top private options include The Meadows School and Bishop Gorman High School."
  },
  {
    "q": "How close is Summerlin West to Red Rock Canyon?",
    "a": "Summerlin West is approximately 10 minutes from the Red Rock Canyon National Conservation Area visitor center. Many homes in the western-most neighborhoods have direct views of the canyon's sandstone formations."
  },
  {
    "q": "What are HOA fees in Summerlin West?",
    "a": "HOA fees in Summerlin West typically range from $150 to $400 per month, covering the Summerlin master association fee plus individual neighborhood sub-association fees. Guard-gated communities may have higher fees."
  },
  {
    "q": "What are the best sub-neighborhoods within Summerlin West?",
    "a": "The best sub-neighborhood depends on your priorities — school zones, lot size, home age, and proximity to amenities all vary within the community. Nevada Real Estate Group agents who specialize in Summerlin West can walk you through the specific blocks and streets that match your criteria."
  },
  {
    "q": "How is new construction availability in Summerlin West?",
    "a": "New construction availability varies by season and builder phase. Some sections of Summerlin West have active new home sales while others are fully built out with resale-only inventory. Contact Nevada Real Estate Group for the most current new construction options."
  }
]

export default function SummerlinWestFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Summerlin West</h2>
          <p>The questions buyers ask most when exploring Summerlin West.</p>
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
