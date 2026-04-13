'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for homes in Augusta Canyon?",
    "a": "Homes in Augusta Canyon range from approximately $1 million for semi-custom resale homes to over $4 million for custom estates on premium hilltop or golf course frontage lots."
  },
  {
    "q": "Is Augusta Canyon guard-gated?",
    "a": "Yes — Augusta Canyon is double guard-gated within Southern Highlands. Residents pass through two staffed guard gates to reach the enclave, providing exceptional security and privacy. Augusta Canyon at Southern Highlands features a 24-hour staffed guard gate with controlled vehicle access, security patrols, and perimeter walls."
  },
  {
    "q": "What ZIP code is Augusta Canyon in?",
    "a": "Augusta Canyon at Southern Highlands is in ZIP code 89141 in southwest Las Vegas. Home prices range from $1M–$4M+."
  },
  {
    "q": "Can I build a custom home in Augusta Canyon?",
    "a": "Custom home construction is available on approved lots. Architectural plans must be reviewed by the HOA architectural review committee to ensure compliance with the community's design standards."
  },
  {
    "q": "What are HOA fees in Augusta Canyon?",
    "a": "HOA fees typically range from $400 to $900 per month, covering the Southern Highlands master association fee plus the Augusta Canyon sub-association fee. Fees include guard gate staffing, security patrols, and common area maintenance."
  },
  {
    "q": "How does Augusta Canyon compare to The Ridges in Summerlin?",
    "a": "Both are ultra-luxury guard-gated communities with golf course proximity. The Ridges typically commands higher per-square-foot prices and backs against Red Rock Canyon. Augusta Canyon offers comparable lot sizes and custom building opportunities at price points that represent better relative value."
  },
  {
    "q": "What golf course is near Augusta Canyon?",
    "a": "The Southern Highlands Golf Club, a private 18-hole Jack Nicklaus Signature course, is the community's anchor. The Mediterranean clubhouse features dining, resort pools, tennis, spa, and fitness."
  },
  {
    "q": "What schools serve Augusta Canyon?",
    "a": "Augusta Canyon is served by CCSD schools including John R. Hummel Elementary (8/10) and Del E. Webb Middle School (7/10). Bishop Gorman High School (A+) is the premier private option."
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
    "a": "Most guard-gated communities include perimeter walls, security patrols, surveillance cameras at entry points, and emergency response coordination. Some communities also offer interior patrol routes and resident notification systems. Augusta Canyon at Southern Highlands features a 24-hour staffed guard gate with controlled vehicle access, security patrols, and perimeter walls."
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

export default function SouthernHighlandsAugustaCanyonFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Augusta Canyon at Southern Highlands</h2>
          <p>The questions buyers ask most when exploring Augusta Canyon at Southern Highlands.</p>
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
