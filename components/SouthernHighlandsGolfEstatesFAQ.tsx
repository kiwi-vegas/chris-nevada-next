'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for homes in the Golf Estates at Southern Highlands?",
    "a": "Homes in the Golf Estates range from approximately $800,000 for semi-custom resale homes to over $3 million for custom estates on premium golf course frontage lots with mountain views."
  },
  {
    "q": "Are the Golf Estates guard-gated?",
    "a": "Yes — the Golf Estates are double guard-gated. Residents pass through the main Southern Highlands community guard gate and then a second dedicated Golf Estates gate. Both are staffed 24 hours a day."
  },
  {
    "q": "What golf course is in the Golf Estates?",
    "a": "The Golf Estates sit directly along the Southern Highlands Golf Club, an 18-hole Jack Nicklaus Signature championship course. The private club includes a Mediterranean clubhouse, dining, pools, tennis, spa, and fitness center."
  },
  {
    "q": "What ZIP code are the Golf Estates in?",
    "a": "The Golf Estates at Southern Highlands are located in ZIP code 89141 in southwest Las Vegas."
  },
  {
    "q": "What are HOA fees in the Golf Estates?",
    "a": "HOA fees typically range from $300 to $700 per month, covering the Southern Highlands master association fee plus the Golf Estates sub-association fee. Fees include guard gate staffing, security patrols, common area maintenance, and landscaping."
  },
  {
    "q": "Do I have to join the golf club?",
    "a": "Golf club membership is not mandatory with home ownership in the Golf Estates, but it is available by application. Many residents join for the dining, fitness, and social benefits as well as the golf."
  },
  {
    "q": "How does the Golf Estates compare to The Estates at Southern Highlands?",
    "a": "Both are double guard-gated enclaves within Southern Highlands. The Estates typically features larger custom homes on larger lots ($2M–$10M+), while the Golf Estates offers a broader range starting at $800K with a mix of semi-custom and custom homes, many with golf course frontage."
  },
  {
    "q": "What schools serve the Golf Estates?",
    "a": "The Golf Estates are served by CCSD schools including John R. Hummel Elementary (8/10), Del E. Webb Middle School (7/10), and Coronado High School. Bishop Gorman High School (A+) is the top private option nearby."
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
    "a": "Most guard-gated communities include perimeter walls, security patrols, surveillance cameras at entry points, and emergency response coordination. Some communities also offer interior patrol routes and resident notification systems."
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

export default function SouthernHighlandsGolfEstatesFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Golf Estates at Southern Highlands</h2>
          <p>The questions buyers ask most when exploring Golf Estates at Southern Highlands.</p>
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
