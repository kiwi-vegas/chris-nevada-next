'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for homes in Dover at Summerlin West?",
    "a": "Homes in Dover range from approximately $500,000 for attached and smaller products to $800,000 for the largest single-family homes with premium lots and designer finishes."
  },
  {
    "q": "What builders are in Dover?",
    "a": "Dover features homes by premier national builders including Toll Brothers, Taylor Morrison, Lennar, and Shea Homes. Floor plans range from 1,800 to 3,800 square feet."
  },
  {
    "q": "Is Dover part of Summerlin?",
    "a": "Yes. Dover is a village within the Summerlin West section of the Summerlin master-planned community, developed by the Howard Hughes Corporation. Residents enjoy full access to Summerlin's amenity network."
  },
  {
    "q": "What ZIP code is Dover in?",
    "a": "Dover at Summerlin West is located in ZIP code 89138 in the western Las Vegas area."
  },
  {
    "q": "What are HOA fees in Dover?",
    "a": "HOA fees range from $120 to $220 per month, covering the Summerlin master association fee and access to the community's extensive amenity network including trails, parks, and community programming."
  },
  {
    "q": "What schools serve Dover at Summerlin West?",
    "a": "Dover is zoned for some of the top-rated CCSD schools in Las Vegas including Bonner Elementary (9/10), Sig Rogich Middle (10/10), and Palo Verde High School (8/10). The Meadows School (A+) is nearby."
  },
  {
    "q": "How close is Dover to Red Rock Canyon?",
    "a": "Dover is the westernmost Summerlin village, making it approximately 10 minutes from the Red Rock Canyon scenic loop entrance via West Charleston Boulevard."
  },
  {
    "q": "Is Dover at Summerlin West still building?",
    "a": "Yes. Active new construction continues in Dover with multiple builders releasing new phases. The area represents one of Summerlin's most active new-home markets."
  },
  {
    "q": "What are the best sub-neighborhoods within Dover at Summerlin West?",
    "a": "The best sub-neighborhood depends on your priorities — school zones, lot size, home age, and proximity to amenities all vary within the community. Nevada Real Estate Group agents who specialize in Dover at Summerlin West can walk you through the specific blocks and streets that match your criteria."
  },
  {
    "q": "How is new construction availability in Dover at Summerlin West?",
    "a": "New construction availability varies by season and builder phase. Some sections of Dover at Summerlin West have active new home sales while others are fully built out with resale-only inventory. Contact Nevada Real Estate Group for the most current new construction options."
  }
]

export default function SummerlinWestDoverFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Dover at Summerlin West</h2>
          <p>The questions buyers ask most when exploring Dover at Summerlin West.</p>
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
