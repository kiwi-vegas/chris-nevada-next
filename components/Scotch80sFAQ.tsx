'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range in Scotch 80s?",
    "a": "Homes in Scotch 80s range from approximately $800,000 for original-condition properties to well over $5 million for custom-remodeled or newly built estates on the neighborhood's largest lots."
  },
  {
    "q": "Is Scotch 80s guard-gated?",
    "a": "Yes. Scotch 80s has a guard-gated entry with 24-hour security, providing the privacy that has attracted Las Vegas' most prominent residents for over 60 years."
  },
  {
    "q": "How large are the lots in Scotch 80s?",
    "a": "Lots in Scotch 80s are exceptionally large by Las Vegas standards, with many properties sitting on half-acre to full-acre parcels. These lot sizes are impossible to find in modern master-planned communities."
  },
  {
    "q": "When was Scotch 80s built?",
    "a": "Scotch 80s was developed beginning in the early 1960s. The neighborhood takes its name from Section 80 of the Las Vegas city plat map. Many original midcentury homes remain, alongside stunning contemporary remodels."
  },
  {
    "q": "What celebrities have lived in Scotch 80s?",
    "a": "Scotch 80s has been home to casino executives, entertainers, professional athletes, and business leaders throughout its 60+ year history. The neighborhood's guard-gated privacy and Strip proximity have made it one of the most prestigious addresses in Las Vegas."
  },
  {
    "q": "Are people building new homes in Scotch 80s?",
    "a": "Yes. Scotch 80s is experiencing a renaissance with buyers acquiring original homes on premium lots and either completely remodeling them or building new contemporary estates. The trend is transforming the neighborhood while preserving its historic character."
  },
  {
    "q": "What are HOA fees in Scotch 80s?",
    "a": "HOA fees in Scotch 80s typically range from $200 to $500 per month, covering guard gate staffing, security patrols, and common area maintenance."
  },
  {
    "q": "How does Scotch 80s compare to Las Vegas Country Club?",
    "a": "Both are vintage Las Vegas neighborhoods near the Strip with guard-gated security. Las Vegas Country Club includes a private 18-hole golf course and has more homes (~1,400). Scotch 80s has larger lots, fewer homes (~300), and a more exclusive, estate-like character without a golf course."
  },
  {
    "q": "How does the guard gate entry process work?",
    "a": "Residents receive transponders or access codes for automatic entry. Guests must be called in by the homeowner or added to a pre-approved list. Delivery drivers and service providers follow the community's vendor access policy. Most guard-gated communities staff the gate 24 hours a day, 7 days a week."
  },
  {
    "q": "Can non-residents access the community for viewings?",
    "a": "Yes. Prospective buyers can access the community with a licensed real estate agent who coordinates entry with the guard gate in advance. Nevada Real Estate Group handles all gate access arrangements for property showings."
  },
  {
    "q": "What security features are included beyond the guard gate?",
    "a": "Most guard-gated communities include perimeter walls, security patrols, surveillance cameras at entry points, and emergency response coordination. Some communities also offer interior patrol routes and resident notification systems. Scotch 80s features a 24-hour staffed guard gate with controlled vehicle access, security patrols, and perimeter walls."
  },
  {
    "q": "Are there custom home lot opportunities?",
    "a": "Some luxury communities offer vacant lots for custom home construction. Lot sizes, architectural guidelines, and approved builders vary by community. Nevada Real Estate Group can help identify available custom lot inventory and connect you with approved builders."
  },
  {
    "q": "What is the resale value trend for luxury homes in this area?",
    "a": "Luxury properties in guard-gated and premium communities have historically outperformed the broader market in terms of value retention during downturns and appreciation during growth periods. Limited supply in guard-gated communities creates structural price support."
  }
]

export default function Scotch80sFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Scotch 80s</h2>
          <p>The questions buyers ask most when exploring Scotch 80s.</p>
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
