'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range in South Square?",
    "a": "Homes in South Square range from approximately $400,000 for smaller homes and attached products to around $750,000 for larger, updated properties with premium finishes."
  },
  {
    "q": "Is South Square a 55+ community?",
    "a": "Yes — South Square is a 55+ age-restricted community. At least one resident in each home must be 55 or older, and no residents under 18 may be permanent occupants (some limited exceptions apply per federal fair housing law)."
  },
  {
    "q": "Is South Square guard-gated?",
    "a": "No — South Square is not guard-gated. Some neighborhoods have gated entry with key-fob or code access, but there is no staffed guard gate. For guard-gated 55+ living, Siena is nearby."
  },
  {
    "q": "What ZIP code is South Square in?",
    "a": "South Square is located in ZIP code 89135 in the Summerlin South area of Las Vegas. Home prices range from $400K–$750K."
  },
  {
    "q": "What amenities does South Square offer?",
    "a": "South Square features a community clubhouse, fitness center, community pool, social programming, and organized activities. The village is also connected to Summerlin's trail system for walking and cycling."
  },
  {
    "q": "What are HOA fees in South Square?",
    "a": "HOA fees in South Square range from approximately $150 to $350 per month, covering the Summerlin master association fee, village sub-association fee, clubhouse operations, and common area maintenance."
  },
  {
    "q": "How does South Square compare to Sun City Summerlin?",
    "a": "Sun City Summerlin is a much larger 55+ community (7,700+ homes) with golf courses and extensive amenities, starting around $300K. South Square is smaller and newer, integrated into the Summerlin South Association with access to the broader Summerlin amenity ecosystem."
  },
  {
    "q": "How does South Square compare to Siena?",
    "a": "Siena is a guard-gated 55+ village with higher price points and staffed security. South Square offers similar age-restricted living at more accessible price points without guard-gated security."
  },
  {
    "q": "What is the age requirement?",
    "a": "Under the Housing for Older Persons Act (HOPA), at least one resident in each household must be 55 years of age or older. Some communities apply an 80/20 rule where 80% of occupied units must have at least one resident 55+."
  },
  {
    "q": "What social activities and clubs are available?",
    "a": "Active adult communities typically offer dozens of organized clubs and activities including golf leagues, tennis groups, fitness classes, card and game groups, cultural excursions, seasonal events, and volunteer opportunities. Most have a dedicated activities director."
  },
  {
    "q": "Are grandchildren allowed to visit or stay?",
    "a": "Yes. Grandchildren and family members of any age can visit and stay temporarily. The age restriction applies to permanent residents, not guests. Each community has specific guest stay policies, typically allowing visits of 30-90 days."
  },
  {
    "q": "What recreational facilities are included?",
    "a": "Typical 55+ communities include fitness centers, swimming pools, spa facilities, tennis and pickleball courts, walking trails, and a main clubhouse with meeting rooms, a restaurant or cafe, and event spaces. Some include golf courses."
  }
]

export default function SummerlinSouthSquareFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About South Square</h2>
          <p>The questions buyers ask most when exploring South Square.</p>
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
