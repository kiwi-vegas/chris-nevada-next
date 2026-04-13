'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range in the Stonebridge area of Summerlin West?",
    "a": "Homes in the Stonebridge area of Summerlin West range from approximately $600,000 to over $1 million. New construction from national builders typically starts in the mid-$600s for standard production homes, with upgraded and larger floor plans reaching $900K to $1M+."
  },
  {
    "q": "Is the Stonebridge area part of Summerlin?",
    "a": "Yes. The Stonebridge area is located within Summerlin West, the newest association of the Howard Hughes Corporation's Summerlin master plan. Residents benefit from all Summerlin amenities, trails, parks, and community programming."
  },
  {
    "q": "What builders are active in the Stonebridge area?",
    "a": "Multiple national and regional builders are active in the Stonebridge area including Toll Brothers, Lennar, Pulte, Taylor Morrison, Woodside Homes, and Shea Homes. Several 55+ communities including Del Webb's Stonebridge and Trilogy at Summerlin are also in this area."
  },
  {
    "q": "What ZIP code is the Stonebridge area in?",
    "a": "The Stonebridge area of Summerlin West is primarily in ZIP code 89138 in the western portion of Las Vegas."
  },
  {
    "q": "Are there 55+ communities in the Stonebridge area?",
    "a": "Yes. The Stonebridge area includes several 55+ active adult communities including Del Webb's Stonebridge, Heritage at Stonebridge (guard-gated), Trilogy at Summerlin by Shea Homes, and Regency at Summerlin by Toll Brothers."
  },
  {
    "q": "What are HOA fees in the Stonebridge area?",
    "a": "HOA fees in the Stonebridge area typically range from $150 to $350 per month, which includes the Summerlin master association fee plus any sub-association fees. Guard-gated 55+ communities may have higher fees covering amenities and staffing."
  },
  {
    "q": "How far is the Stonebridge area from Downtown Summerlin?",
    "a": "The Stonebridge area is approximately 5 minutes from Downtown Summerlin, which offers 125+ shops, restaurants, and entertainment venues including City National Arena and the Las Vegas Ballpark."
  },
  {
    "q": "What schools serve the Stonebridge area?",
    "a": "The Stonebridge area is served by CCSD schools including Sig Rogich Middle School (10/10) and Palo Verde High School (8/10). Top private options include The Meadows School (A+) and Bishop Gorman High School (A+)."
  },
  {
    "q": "What are the best sub-neighborhoods within Stonebridge Area?",
    "a": "The best sub-neighborhood depends on your priorities — school zones, lot size, home age, and proximity to amenities all vary within the community. Nevada Real Estate Group agents who specialize in Stonebridge Area can walk you through the specific blocks and streets that match your criteria."
  },
  {
    "q": "How is new construction availability in Stonebridge Area?",
    "a": "New construction availability varies by season and builder phase. Some sections of Stonebridge Area have active new home sales while others are fully built out with resale-only inventory. Contact Nevada Real Estate Group for the most current new construction options."
  }
]

export default function SummerlinWestStonebridgeAreaFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Stonebridge Area</h2>
          <p>The questions buyers ask most when exploring Stonebridge Area.</p>
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
