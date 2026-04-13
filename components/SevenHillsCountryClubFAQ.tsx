'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for homes in Seven Hills Country Club?",
    "a": "Homes in Seven Hills Country Club range from approximately $1.2 million for golf-course residences to over $7 million for custom estates on premium lots with panoramic Strip and mountain views."
  },
  {
    "q": "Is Seven Hills Country Club guard-gated?",
    "a": "Yes. Seven Hills Country Club is fully guard-gated with 24-hour staffed gate and comprehensive security patrols. It is the premier guard-gated community within the Seven Hills master plan."
  },
  {
    "q": "What golf course is at Seven Hills Country Club?",
    "a": "Rio Secco Golf Club, a Rees Jones-designed 18-hole championship course, is the anchor of Seven Hills Country Club. The course features dramatic desert canyon terrain and is home to the world-renowned Butch Harmon School of Golf."
  },
  {
    "q": "What amenities does Rio Secco offer?",
    "a": "Rio Secco Golf Club offers championship golf, fine dining, a full-service spa, fitness center, resort-style pool complex, tennis and pickleball courts, and social event spaces. Both golf and social memberships are available."
  },
  {
    "q": "What ZIP code is Seven Hills Country Club in?",
    "a": "Seven Hills Country Club is in ZIP code 89052 in Henderson, Nevada. Home prices range from $1.2M–$7M+."
  },
  {
    "q": "What are HOA fees at Seven Hills Country Club?",
    "a": "HOA fees typically range from $400 to $900 per month, covering guard gate staffing, security patrols, the Seven Hills master association fee, and sub-association common area maintenance. Golf club membership is separate."
  },
  {
    "q": "Is golf membership required at Seven Hills Country Club?",
    "a": "Golf membership at Rio Secco is not required for homeownership. Both golf and social memberships are available, allowing residents to choose their level of club participation."
  },
  {
    "q": "How does Seven Hills Country Club compare to MacDonald Highlands?",
    "a": "Seven Hills Country Club offers guard-gated golf living at a generally lower price point than MacDonald Highlands. MacDonald Highlands offers higher elevation, DragonRidge Country Club, and a broader range of ultra-luxury options. Both are premier Henderson golf communities."
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
    "a": "Most guard-gated communities include perimeter walls, security patrols, surveillance cameras at entry points, and emergency response coordination. Some communities also offer interior patrol routes and resident notification systems. Seven Hills Country Club features a 24-hour staffed guard gate with controlled vehicle access, security patrols, and perimeter walls."
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

export default function SevenHillsCountryClubFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Seven Hills Country Club</h2>
          <p>The questions buyers ask most when exploring Seven Hills Country Club.</p>
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
