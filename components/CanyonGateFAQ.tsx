'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for homes in Canyon Gate?",
    "a": "Homes in Canyon Gate range from approximately $700,000 for entry-level resale homes to over $2 million for premium golf course estates and custom-renovated properties."
  },
  {
    "q": "Is Canyon Gate guard-gated?",
    "a": "Yes. Canyon Gate has been guard-gated since it was developed in 1989, with a 24-hour staffed guard gate and comprehensive security patrols throughout the community."
  },
  {
    "q": "What golf course is in Canyon Gate?",
    "a": "Canyon Gate Country Club features an 18-hole championship course designed by Ted Robinson Sr. The course is known for its water features, mature trees, and meticulously maintained playing surfaces."
  },
  {
    "q": "Is Canyon Gate Country Club membership required?",
    "a": "Country club membership is not required for homeownership in Canyon Gate. Many residents join for golf, dining, tennis, and social privileges, but it is optional."
  },
  {
    "q": "What ZIP code is Canyon Gate in?",
    "a": "Canyon Gate is located in ZIP code 89117, in the western Las Vegas Valley near the intersection of Sahara and Durango."
  },
  {
    "q": "How does Canyon Gate compare to other golf communities?",
    "a": "Canyon Gate is one of the most centrally located guard-gated golf communities in Las Vegas. It offers a more accessible price point than Summerlin's golf enclaves while delivering comparable guard-gated security and a mature country club lifestyle."
  },
  {
    "q": "What schools serve Canyon Gate?",
    "a": "Canyon Gate is served by CCSD schools including Palo Verde High School (8/10). The Meadows School (A+), one of Nevada's premier private schools, is located nearby."
  },
  {
    "q": "What are HOA fees in Canyon Gate?",
    "a": "HOA fees in Canyon Gate typically range from $200 to $500 per month, covering guard gate staffing, security patrols, common area maintenance, and community amenities. Country club membership fees are separate."
  }
]

export default function CanyonGateFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Canyon Gate</h2>
          <p>The questions buyers ask most when exploring Canyon Gate.</p>
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
