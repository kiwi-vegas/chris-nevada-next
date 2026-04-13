'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for homes in Watermark?",
    "a": "Homes in Watermark range from approximately $400,000 for attached townhomes to $700,000 or more for larger single-family homes with premium lot positions and upgraded finishes."
  },
  {
    "q": "Is Watermark in Henderson or Las Vegas?",
    "a": "Watermark is located in the City of Henderson, Nevada — consistently ranked among America's safest cities. Henderson is a separately incorporated city southeast of Las Vegas."
  },
  {
    "q": "What ZIP code is Watermark in?",
    "a": "Watermark is located in ZIP code 89011 in eastern Henderson. Home prices range from $400K–$700K."
  },
  {
    "q": "What schools serve Watermark?",
    "a": "Watermark is zoned for CCSD schools including Vanderburg Elementary (8/10), Del E. Webb Middle (7/10), and Coronado High School (7/10). Charter and private options include Pinecrest Academy and Bishop Gorman."
  },
  {
    "q": "Is Watermark guard-gated?",
    "a": "No. Watermark is not guard-gated. It is a managed HOA community with maintained common areas, community pools, and walking paths. Guard-gated options nearby include Seven Hills and Anthem."
  },
  {
    "q": "What are HOA fees in Watermark?",
    "a": "HOA fees in Watermark typically range from $60 to $150 per month, covering common area maintenance, community pools, and amenity center upkeep."
  },
  {
    "q": "Who built homes in Watermark?",
    "a": "Watermark was primarily developed by Pulte Homes and other national builders starting in 2005. Homes feature modern floor plans with open layouts and energy-efficient construction."
  },
  {
    "q": "How does Watermark compare to other Henderson communities?",
    "a": "Watermark offers Henderson's quality of life at a lower price point than Seven Hills, Anthem, and MacDonald Highlands. It's ideal for families seeking modern construction and strong schools without guard-gate pricing."
  },
  {
    "q": "What are the best sub-neighborhoods within Watermark?",
    "a": "The best sub-neighborhood depends on your priorities — school zones, lot size, home age, and proximity to amenities all vary within the community. Nevada Real Estate Group agents who specialize in Watermark can walk you through the specific blocks and streets that match your criteria."
  },
  {
    "q": "How is new construction availability in Watermark?",
    "a": "New construction availability varies by season and builder phase. Some sections of Watermark have active new home sales while others are fully built out with resale-only inventory. Contact Nevada Real Estate Group for the most current new construction options."
  }
]

export default function HendersonWatermarkFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Watermark</h2>
          <p>The questions buyers ask most when exploring Watermark.</p>
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
