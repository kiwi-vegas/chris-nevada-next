'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for homes in Spanish Trail?",
    "a": "Homes in Spanish Trail range from approximately $600,000 for updated condominiums and townhomes to over $3 million for custom estate homes on premium golf course lots. The most active price range is $800,000 to $1.5 million."
  },
  {
    "q": "Is Spanish Trail guard-gated?",
    "a": "Yes. Spanish Trail is a fully guard-gated community with a 24-hour staffed guard gate, controlled vehicular access, visitor management, and security patrols throughout the 640-acre property."
  },
  {
    "q": "What golf courses are in Spanish Trail?",
    "a": "Spanish Trail features 27 holes of championship golf across three 9-hole courses — Canyon, Sunrise, and Lakes — designed by Robert Trent Jones Jr. The courses play in rotating 18-hole combinations through the Spanish Trail Country Club."
  },
  {
    "q": "Do I have to join the country club to live in Spanish Trail?",
    "a": "No. Golf and country club membership is available but not required for homeownership. Many residents enjoy the guard-gated security and community without club membership. Social and dining memberships are also available."
  },
  {
    "q": "What are HOA fees in Spanish Trail?",
    "a": "HOA fees at Spanish Trail typically range from $350 to $800 per month depending on the property type (condo vs. single-family) and specific neighborhood. Fees cover guard gate staffing, security, common area maintenance, and community infrastructure."
  },
  {
    "q": "What ZIP code is Spanish Trail in?",
    "a": "Spanish Trail spans ZIP codes 89113 and 89148 in southwest Las Vegas."
  },
  {
    "q": "How does Spanish Trail compare to Southern Highlands?",
    "a": "Both are guard-gated golf communities in southwest Las Vegas. Spanish Trail is more established (1984 vs. 1999), has more mature landscaping, and offers a lower entry price. Southern Highlands is newer, has a Jack Nicklaus Signature course, and includes ultra-luxury estate sections with higher ceiling prices."
  },
  {
    "q": "What schools serve Spanish Trail?",
    "a": "Spanish Trail is served by CCSD schools including Helen Jydstrup Elementary, Walter Johnson Middle School, and Durango High School. Top private options include Bishop Gorman (A+), The Meadows School (A+), and Faith Lutheran (A)."
  }
]

export default function SpanishTrailFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Spanish Trail</h2>
          <p>The questions buyers ask most when exploring Spanish Trail.</p>
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
