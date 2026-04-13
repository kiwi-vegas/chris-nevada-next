'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for homes in Anthem Country Club?",
    "a": "Homes in Anthem Country Club range from approximately $1.2 million for semi-custom homes in established neighborhoods to over $8 million for custom estates on premium lots with direct golf course and Las Vegas Strip views."
  },
  {
    "q": "Is Anthem Country Club guard-gated?",
    "a": "Yes. Anthem Country Club is a fully guard-gated community with a 24-hour staffed guard gate and comprehensive security infrastructure. It is one of the most secure luxury communities in Henderson."
  },
  {
    "q": "What golf course is at Anthem Country Club?",
    "a": "The Anthem Country Club features an 18-hole championship course designed by Hale Irwin and Keith Foster. It is a 72-par desert course playing through natural terrain at elevations up to 3,400 feet."
  },
  {
    "q": "Is club membership required to live in Anthem Country Club?",
    "a": "No. Club membership is separate from homeownership at Anthem Country Club. Membership is available in golf, social, and fitness tiers, but homeowners are not required to join the club."
  },
  {
    "q": "What are HOA fees at Anthem Country Club?",
    "a": "HOA fees at Anthem Country Club typically range from $350 to $800 per month, depending on the specific neighborhood and lot type. Fees cover guard gate staffing, security, common area maintenance, and community infrastructure. Club membership dues are separate."
  },
  {
    "q": "What ZIP code is Anthem Country Club in?",
    "a": "Anthem Country Club is located in ZIP code 89052 in Henderson, Nevada. Home prices range from $1.2M–$8M+."
  },
  {
    "q": "What builders have built in Anthem Country Club?",
    "a": "Anthem Country Club features homes by Toll Brothers and other production luxury builders, as well as semi-custom and full custom estates by private builders and architects."
  },
  {
    "q": "What views do Anthem Country Club homes offer?",
    "a": "The elevated foothills position provides panoramic views of the Las Vegas Strip skyline, the Spring Mountains, the McCullough Range, and the Las Vegas Valley. The highest-elevation lots offer 180-degree or greater panoramas."
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
    "a": "Most guard-gated communities include perimeter walls, security patrols, surveillance cameras at entry points, and emergency response coordination. Some communities also offer interior patrol routes and resident notification systems. Anthem Country Club features a 24-hour staffed guard gate with controlled vehicle access, security patrols, and perimeter walls."
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

export default function AnthemCountryClubFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Anthem Country Club</h2>
          <p>The questions buyers ask most when exploring Anthem Country Club.</p>
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
