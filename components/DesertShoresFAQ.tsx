'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for homes in Desert Shores?",
    "a": "Homes in Desert Shores range from approximately $350,000 for interior-lot single-family homes to $800,000 or more for lakefront properties with private docks and water views. Townhomes start around $325K."
  },
  {
    "q": "Does Desert Shores have real lakes?",
    "a": "Yes. Desert Shores features four man-made interconnected lakes covering approximately 50 acres. Residents enjoy fishing, kayaking, paddleboarding, private beaches, and lakeside walking paths — a true waterfront lifestyle in the desert."
  },
  {
    "q": "What are Desert Shores HOA fees?",
    "a": "HOA fees in Desert Shores typically range from $75 to $200 per month, depending on the specific section and whether the home is a single-family residence or townhome. Fees cover community center operations, lake maintenance, common area upkeep, and community events."
  },
  {
    "q": "What ZIP codes are in Desert Shores?",
    "a": "Desert Shores is located in ZIP codes 89128 and 89145 in northwest Las Vegas."
  },
  {
    "q": "Is Desert Shores close to Summerlin?",
    "a": "Yes. Desert Shores is approximately 10 minutes from Downtown Summerlin shopping and dining, and 15 minutes from Red Rock Canyon. It is adjacent to the Summerlin border and benefits from Summerlin's commercial amenities."
  },
  {
    "q": "Can you have a boat in Desert Shores?",
    "a": "The lakes are designed for non-motorized watercraft. Residents can use kayaks, paddleboards, canoes, and small sailboats. Motorized boats are not permitted, keeping the lakes quiet and peaceful."
  },
  {
    "q": "What schools serve Desert Shores?",
    "a": "Desert Shores is served by CCSD schools including Palo Verde High School (7/10) and Rogich Middle School (7/10). Private options include The Meadows School (A+) and Faith Lutheran (A). Doral Academy Red Rock (9/10) is a top charter."
  },
  {
    "q": "When was Desert Shores built?",
    "a": "Desert Shores was developed in the late 1980s, with most homes built between 1988 and the mid-1990s. The community features some of the most mature landscaping and tree canopy in the Las Vegas Valley."
  },
  {
    "q": "What are the best sub-neighborhoods within Desert Shores?",
    "a": "The best sub-neighborhood depends on your priorities — school zones, lot size, home age, and proximity to amenities all vary within the community. Nevada Real Estate Group agents who specialize in Desert Shores can walk you through the specific blocks and streets that match your criteria."
  },
  {
    "q": "How is new construction availability in Desert Shores?",
    "a": "New construction availability varies by season and builder phase. Some sections of Desert Shores have active new home sales while others are fully built out with resale-only inventory. Contact Nevada Real Estate Group for the most current new construction options."
  }
]

export default function DesertShoresFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Desert Shores</h2>
          <p>The questions buyers ask most when exploring Desert Shores.</p>
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
