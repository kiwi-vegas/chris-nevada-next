'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for homes in Eagle Hills?",
    "a": "Homes in Eagle Hills range from approximately $800,000 for interior lots to $2.5 million for premium elevated homes with panoramic mountain views."
  },
  {
    "q": "Is Eagle Hills guard-gated?",
    "a": "Yes. Eagle Hills is a guard-gated community with a 24-hour staffed guard gate. It is one of four guard-gated enclaves within The Hills South village of Summerlin."
  },
  {
    "q": "What village is Eagle Hills in?",
    "a": "Eagle Hills is located within The Hills South village of the Summerlin South Association, alongside Country Club Hills, Corte Bella, and Tournament Hills."
  },
  {
    "q": "What ZIP code is Eagle Hills in?",
    "a": "Eagle Hills is located in ZIP code 89135 in the Summerlin South area of Las Vegas. Home prices range from $800K–$2.5M."
  },
  {
    "q": "What views do Eagle Hills homes have?",
    "a": "Eagle Hills sits on elevated terrain with views of Red Rock Canyon and the Spring Mountains to the west, and the Las Vegas Valley to the east. West-facing homes enjoy year-round sunset panoramas."
  },
  {
    "q": "What are HOA fees in Eagle Hills?",
    "a": "HOA fees typically range from $350 to $800 per month, covering the Summerlin master association fee plus the Eagle Hills sub-association fee for guard gate staffing, security, and community maintenance."
  },
  {
    "q": "How does Eagle Hills compare to Country Club Hills?",
    "a": "Country Club Hills ($900K–$3M+) is The Hills South's most exclusive enclave with larger estates and golf proximity. Eagle Hills ($800K–$2.5M) offers similar views and security at a slightly more accessible price point."
  },
  {
    "q": "What schools serve Eagle Hills?",
    "a": "Eagle Hills is zoned for Sig Rogich Middle School (10/10 GreatSchools) and Palo Verde High School (8/10). The Meadows School (A+) and Bishop Gorman (A+) are nearby private options."
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
    "a": "Most guard-gated communities include perimeter walls, security patrols, surveillance cameras at entry points, and emergency response coordination. Some communities also offer interior patrol routes and resident notification systems. Eagle Hills features a 24-hour staffed guard gate with controlled vehicle access, security patrols, and perimeter walls."
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

export default function EagleHillsSummerlinFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Eagle Hills</h2>
          <p>The questions buyers ask most when exploring Eagle Hills.</p>
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
