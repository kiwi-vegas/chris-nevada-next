'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range in Aliante North?",
    "a": "Homes in Aliante North range from approximately $350,000 to $550,000 for single-family homes. The most common price range is $400K–$475K for homes between 1,800 and 2,800 square feet."
  },
  {
    "q": "Is Aliante North part of the Aliante master plan?",
    "a": "Yes. Aliante North is the northern portion of the Aliante master-planned community in North Las Vegas. Residents benefit from all Aliante community amenities including the golf club, parks, trails, and nature preserve."
  },
  {
    "q": "What ZIP code is Aliante North in?",
    "a": "Aliante North is located in ZIP code 89084 in North Las Vegas, Nevada. Home prices range from $350K–$550K."
  },
  {
    "q": "Is there a golf course in Aliante?",
    "a": "Yes. Aliante Golf Club is an 18-hole public golf course located within the Aliante master plan. The course adds green space and value to the community."
  },
  {
    "q": "What schools serve Aliante North?",
    "a": "Aliante North is served by CCSD schools including Elise L. Wolff Elementary (7/10) and William E. Orr Middle School (5/10). Private options include Faith Lutheran (A) and Bishop Gorman High School (A+) in Las Vegas."
  },
  {
    "q": "How far is Aliante North from the Strip?",
    "a": "Aliante North is approximately 22 minutes from the Las Vegas Strip via I-15 South. The 215 Northern Beltway provides alternative routes to Summerlin and the west side."
  },
  {
    "q": "What amenities does Aliante offer?",
    "a": "Aliante features an 18-hole golf club, the Aliante Casino + Hotel + Spa, Aliante Nature Discovery Park (20 acres), Aliante Library, multiple neighborhood parks, trails, and playgrounds. It is one of the most amenitized communities in North Las Vegas."
  },
  {
    "q": "What are HOA fees in Aliante North?",
    "a": "HOA fees in Aliante North range from approximately $75 to $175 per month, covering master community maintenance, parks, trails, and common areas."
  },
  {
    "q": "What are the best sub-neighborhoods within Aliante North?",
    "a": "The best sub-neighborhood depends on your priorities — school zones, lot size, home age, and proximity to amenities all vary within the community. Nevada Real Estate Group agents who specialize in Aliante North can walk you through the specific blocks and streets that match your criteria."
  },
  {
    "q": "How is new construction availability in Aliante North?",
    "a": "New construction availability varies by season and builder phase. Some sections of Aliante North have active new home sales while others are fully built out with resale-only inventory. Contact Nevada Real Estate Group for the most current new construction options."
  }
]

export default function NorthLasVegasAlianteNorthFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Aliante North</h2>
          <p>The questions buyers ask most when exploring Aliante North.</p>
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
