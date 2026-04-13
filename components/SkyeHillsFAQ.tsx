'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for homes in Skye Hills?",
    "a": "Homes in Skye Hills range from approximately $450,000 to $750,000, depending on builder, floor plan, lot position, and upgrades."
  },
  {
    "q": "What builders are in Skye Hills?",
    "a": "Skye Hills features new construction from KB Home, Lennar, and Century Communities, offering a variety of contemporary floor plans and price points."
  },
  {
    "q": "How does Skye Hills compare to Skye Canyon?",
    "a": "Skye Hills and Skye Canyon are neighboring northwest communities. Skye Canyon is a larger master plan with the Skye Center amenity complex, while Skye Hills is newer with a more intimate community feel. Pricing is comparable, with Skye Hills often slightly more accessible."
  },
  {
    "q": "What ZIP code is Skye Hills in?",
    "a": "Skye Hills is located in ZIP code 89166 in northwest Las Vegas. Home prices range from $450K–$750K."
  },
  {
    "q": "Is Skye Hills guard-gated?",
    "a": "Skye Hills is not a guard-gated community. The open access design and lower HOA fees are part of its appeal for buyers seeking value without gate restrictions."
  },
  {
    "q": "What outdoor recreation is near Skye Hills?",
    "a": "Skye Hills provides close access to Red Rock Canyon (25 min), Floyd Lamb Park (10 min), Tule Springs Fossil Beds National Monument, and extensive BLM desert lands for hiking, biking, and outdoor adventures."
  },
  {
    "q": "What are HOA fees in Skye Hills?",
    "a": "HOA fees in Skye Hills typically range from $100 to $220 per month, covering community pool, parks, trail maintenance, and common area upkeep."
  },
  {
    "q": "What schools serve Skye Hills?",
    "a": "Skye Hills is served by CCSD schools including Scherkenbach Elementary and Centennial High School. Charter options include Coral Academy of Science and Doral Academy of Nevada."
  },
  {
    "q": "What are the best sub-neighborhoods within Skye Hills?",
    "a": "The best sub-neighborhood depends on your priorities — school zones, lot size, home age, and proximity to amenities all vary within the community. Nevada Real Estate Group agents who specialize in Skye Hills can walk you through the specific blocks and streets that match your criteria."
  },
  {
    "q": "How is new construction availability in Skye Hills?",
    "a": "New construction availability varies by season and builder phase. Some sections of Skye Hills have active new home sales while others are fully built out with resale-only inventory. Contact Nevada Real Estate Group for the most current new construction options."
  }
]

export default function SkyeHillsFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Skye Hills</h2>
          <p>The questions buyers ask most when exploring Skye Hills.</p>
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
