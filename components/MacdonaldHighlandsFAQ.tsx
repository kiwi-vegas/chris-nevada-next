'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for homes in MacDonald Highlands?",
    "a": "Homes in MacDonald Highlands range from approximately $800,000 in SkyVu to $28.95 million and beyond for the most exclusive estates in Dragon Rock and Four Seasons Private Residences. The community spans multiple luxury price tiers."
  },
  {
    "q": "Is MacDonald Highlands guard-gated?",
    "a": "Yes. MacDonald Highlands has a 24-hour staffed guard gate at the main entry. The Dragon Rock enclave adds a second guard gate for an additional level of security and privacy."
  },
  {
    "q": "What golf course is in MacDonald Highlands?",
    "a": "DragonRidge Country Club features a Tom Fazio-designed 18-hole championship course widely regarded as one of the finest private clubs in Nevada. Membership includes fine dining, resort pool, tennis, fitness, and spa."
  },
  {
    "q": "What ZIP code is MacDonald Highlands in?",
    "a": "MacDonald Highlands is located in ZIP code 89012 in Henderson, Nevada. Home prices range from $800K–$28.95M+."
  },
  {
    "q": "What is Dragon Rock?",
    "a": "Dragon Rock is the ultra-luxury double guard-gated enclave within MacDonald Highlands. Featuring Blue Heron-designed contemporary estates from $5 million to $15 million+, Dragon Rock offers the highest level of privacy and luxury in the community."
  },
  {
    "q": "What are HOA fees in MacDonald Highlands?",
    "a": "HOA fees in MacDonald Highlands range from $350 to $1,200 per month depending on the neighborhood and sub-association. Fees cover guard gate staffing, security, common area maintenance, and community infrastructure."
  },
  {
    "q": "What is the Four Seasons Private Residences?",
    "a": "Four Seasons Private Residences is a branded luxury development within MacDonald Highlands offering branded residences with Four Seasons service and amenities. Prices range from $3.67 million to $28.95 million+."
  },
  {
    "q": "What schools serve MacDonald Highlands?",
    "a": "MacDonald Highlands is served by CCSD schools including Vanderburg Elementary (8/10), Del E. Webb Middle (7/10), and Coronado High (6/10). Most families choose private education at Henderson International School (A), Bishop Gorman (A+), or Pinecrest Academy (A)."
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
    "a": "Most guard-gated communities include perimeter walls, security patrols, surveillance cameras at entry points, and emergency response coordination. Some communities also offer interior patrol routes and resident notification systems. MacDonald Highlands features a 24-hour staffed guard gate with controlled vehicle access, security patrols, and perimeter walls."
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

export default function MacdonaldHighlandsFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About MacDonald Highlands</h2>
          <p>The questions buyers ask most when exploring MacDonald Highlands.</p>
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
