'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for homes in Redpoint Square?",
    "a": "Homes in Redpoint Square range from approximately $450,000 for attached townhome-style residences to over $1.5 million for premium semi-custom homes by Toll Brothers. The majority of single-family homes fall in the $500,000 to $900,000 range."
  },
  {
    "q": "Is Redpoint Square guard-gated?",
    "a": "No. Redpoint Square is not guard-gated. It is an open-access village within the Summerlin master plan, but it benefits from Summerlin's community patrol and well-maintained standards."
  },
  {
    "q": "What builders are in Redpoint Square?",
    "a": "Redpoint Square features homes from Toll Brothers, Taylor Morrison, Woodside Homes, Shea Homes, and Tri Pointe Homes. Each builder offers different architectural styles and floor plan sizes."
  },
  {
    "q": "What ZIP code is Redpoint Square in?",
    "a": "Redpoint Square is located in ZIP code 89166 in the Summerlin West area of Las Vegas."
  },
  {
    "q": "What schools serve Redpoint Square?",
    "a": "Redpoint Square is served by CCSD schools including Bonner Elementary (9/10), Sig Rogich Middle School (10/10), and Arbor View High School (7/10). Private options include The Meadows School and Bishop Gorman High School."
  },
  {
    "q": "What are HOA fees in Redpoint Square?",
    "a": "HOA fees in Redpoint Square typically range from $150 to $350 per month, which includes the Summerlin master association fee. Fees cover common area maintenance, trail system upkeep, parks, and community amenities."
  },
  {
    "q": "Is Redpoint Square a good investment?",
    "a": "Redpoint Square is in the fastest-growing section of Summerlin, which has a 35+ year track record of strong appreciation. New-construction buyers typically benefit from early-phase pricing before the village is fully built out."
  },
  {
    "q": "How far is Redpoint Square from the Strip?",
    "a": "Redpoint Square is approximately 25 minutes from the Las Vegas Strip via Summerlin Parkway and I-15. Downtown Summerlin is about 8 minutes away."
  },
  {
    "q": "What are the best sub-neighborhoods within Redpoint Square?",
    "a": "The best sub-neighborhood depends on your priorities — school zones, lot size, home age, and proximity to amenities all vary within the community. Nevada Real Estate Group agents who specialize in Redpoint Square can walk you through the specific blocks and streets that match your criteria."
  },
  {
    "q": "How is new construction availability in Redpoint Square?",
    "a": "New construction availability varies by season and builder phase. Some sections of Redpoint Square have active new home sales while others are fully built out with resale-only inventory. Contact Nevada Real Estate Group for the most current new construction options."
  }
]

export default function SummerlinRedpointSquareFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Redpoint Square</h2>
          <p>The questions buyers ask most when exploring Redpoint Square.</p>
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
