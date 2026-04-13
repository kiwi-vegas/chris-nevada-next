'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for homes in Tuscana?",
    "a": "Homes in Tuscana range from approximately $350,000 for attached patio homes to $600,000 or more for larger single-family homes with premium lot positions and upgraded finishes."
  },
  {
    "q": "Is Tuscana in Henderson?",
    "a": "Yes. Tuscana is located in the City of Henderson, Nevada — a separately incorporated city southeast of Las Vegas that consistently ranks among the safest cities in America."
  },
  {
    "q": "What ZIP code is Tuscana in?",
    "a": "Tuscana is located in ZIP code 89052 in southern Henderson."
  },
  {
    "q": "Is Tuscana guard-gated?",
    "a": "No. Tuscana is not guard-gated. It is a managed HOA community with community parks, walking paths, and an amenity center. Guard-gated options nearby include Seven Hills and Anthem Country Club."
  },
  {
    "q": "What are HOA fees in Tuscana?",
    "a": "HOA fees typically range from $50 to $130 per month, covering common area maintenance, community amenity center upkeep, and shared landscaping."
  },
  {
    "q": "What schools serve Tuscana?",
    "a": "Tuscana is zoned for CCSD schools including Elise L. Wolff Elementary (7/10), Del E. Webb Middle (7/10), and Coronado High School (7/10). Charter and private options include Pinecrest Academy and Bishop Gorman."
  },
  {
    "q": "How does Tuscana compare to Inspirada?",
    "a": "Tuscana offers similar Henderson quality of life at a lower price point than Inspirada. Tuscana has more established landscaping and lower HOA fees, while Inspirada has newer construction and more resort-style amenities."
  },
  {
    "q": "When was Tuscana built?",
    "a": "Tuscana was developed starting in 2003, with most homes built between 2003 and 2012. The community features established landscaping and a settled neighborhood character."
  },
  {
    "q": "What are the best sub-neighborhoods within Tuscana?",
    "a": "The best sub-neighborhood depends on your priorities — school zones, lot size, home age, and proximity to amenities all vary within the community. Nevada Real Estate Group agents who specialize in Tuscana can walk you through the specific blocks and streets that match your criteria."
  },
  {
    "q": "How is new construction availability in Tuscana?",
    "a": "New construction availability varies by season and builder phase. Some sections of Tuscana have active new home sales while others are fully built out with resale-only inventory. Contact Nevada Real Estate Group for the most current new construction options."
  }
]

export default function HendersonTuscanaFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Tuscana</h2>
          <p>The questions buyers ask most when exploring Tuscana.</p>
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
