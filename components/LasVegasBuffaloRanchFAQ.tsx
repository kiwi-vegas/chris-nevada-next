'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range in Buffalo Ranch?",
    "a": "Homes in the Buffalo Ranch area range from approximately $400,000 to $700,000. The majority of single-family homes sell between $425K and $575K, offering solid value for the northwest Las Vegas corridor."
  },
  {
    "q": "What ZIP codes are in Buffalo Ranch?",
    "a": "Buffalo Ranch spans ZIP codes 89149 and 89129 in northwest Las Vegas."
  },
  {
    "q": "Is Buffalo Ranch a master-planned community?",
    "a": "No. Buffalo Ranch is a collection of established residential neighborhoods along the Buffalo Drive corridor rather than a single master-planned community. Individual neighborhoods may have their own HOAs with varying rules and fees."
  },
  {
    "q": "What schools serve Buffalo Ranch?",
    "a": "Buffalo Ranch is served by CCSD schools including Centennial High School (6/10). Private options include Faith Lutheran (A) and Bishop Gorman High School (A+). Somerset Academy NW (8/10) is a popular charter option."
  },
  {
    "q": "How far is Buffalo Ranch from the Strip?",
    "a": "Buffalo Ranch is approximately 18 minutes from the Las Vegas Strip via US-95 South to I-15. Summerlin is about 12 minutes west via US-95."
  },
  {
    "q": "What are HOA fees in Buffalo Ranch?",
    "a": "HOA fees in Buffalo Ranch are generally modest, ranging from $50 to $150 per month depending on the specific neighborhood. Some standalone properties have no HOA."
  },
  {
    "q": "Is Buffalo Ranch a good area for families?",
    "a": "Yes. Buffalo Ranch offers established family-friendly neighborhoods with parks, sidewalks, and access to both public and private schools. The moderate pricing allows families to purchase larger homes with yards compared to newer master-planned communities."
  },
  {
    "q": "What is the commute from Buffalo Ranch?",
    "a": "Buffalo Ranch is well-positioned for commutes with US-95 providing 15-20 minute access to the Strip, Downtown, and Summerlin. The 215 Beltway is also nearby for access to Henderson and the south valley."
  },
  {
    "q": "What are the best sub-neighborhoods within Buffalo Ranch?",
    "a": "The best sub-neighborhood depends on your priorities — school zones, lot size, home age, and proximity to amenities all vary within the community. Nevada Real Estate Group agents who specialize in Buffalo Ranch can walk you through the specific blocks and streets that match your criteria."
  },
  {
    "q": "How is new construction availability in Buffalo Ranch?",
    "a": "New construction availability varies by season and builder phase. Some sections of Buffalo Ranch have active new home sales while others are fully built out with resale-only inventory. Contact Nevada Real Estate Group for the most current new construction options."
  }
]

export default function LasVegasBuffaloRanchFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Buffalo Ranch</h2>
          <p>The questions buyers ask most when exploring Buffalo Ranch.</p>
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
