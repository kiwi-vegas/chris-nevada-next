'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the age requirement for Sun City MacDonald Ranch?",
    "a": "Sun City MacDonald Ranch is a 55+ community. At least one resident in each household must be 55 years of age or older."
  },
  {
    "q": "Does Sun City MacDonald Ranch have a golf course?",
    "a": "Yes. The community has its own private 18-hole championship golf course exclusively for residents. The course features mountain views and is walking distance from most homes."
  },
  {
    "q": "What is the price range for homes in Sun City MacDonald Ranch?",
    "a": "Homes range from approximately $300,000 for smaller floor plans to $600,000 for premium golf course or mountain-view lots."
  },
  {
    "q": "Is Sun City MacDonald Ranch guard-gated?",
    "a": "No. Sun City MacDonald Ranch is not guard-gated. The community has managed access points and an active HOA but no staffed guard gate."
  },
  {
    "q": "What are HOA fees in Sun City MacDonald Ranch?",
    "a": "HOA fees typically range from $150 to $280 per month, covering the clubhouse, golf course, pool, fitness center, common area maintenance, and the community's extensive activities program."
  },
  {
    "q": "How does Sun City MacDonald Ranch compare to Sun City Anthem?",
    "a": "Both are Del Webb 55+ communities in Henderson. Sun City Anthem is larger (7,000+ homes) with two courses and a bigger clubhouse. Sun City MacDonald Ranch is more intimate (2,900+ homes) with a foothills location that provides better views. Pricing is similar."
  },
  {
    "q": "What ZIP code is Sun City MacDonald Ranch in?",
    "a": "Sun City MacDonald Ranch is located in ZIP code 89012 in Henderson, Nevada. Home prices range from $300K–$600K."
  },
  {
    "q": "Who built Sun City MacDonald Ranch?",
    "a": "Sun City MacDonald Ranch was built by Del Webb, America's most recognized builder of 55+ active adult communities. Del Webb is known for quality construction, open floor plans, and resort-style community amenities."
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

export default function SunCityMacdonaldRanchFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Sun City MacDonald Ranch</h2>
          <p>The questions buyers ask most when exploring Sun City MacDonald Ranch.</p>
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
