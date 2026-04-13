'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for homes in The Foothills at MacDonald Ranch?",
    "a": "Homes range from approximately $1 million for semi-custom resales to over $4 million for custom estates on premium view lots with panoramic Strip and valley views."
  },
  {
    "q": "Is The Foothills at MacDonald Ranch guard-gated?",
    "a": "Yes. The Foothills is a fully guard-gated community with a 24-hour staffed guard gate and comprehensive security presence."
  },
  {
    "q": "What golf course is near The Foothills?",
    "a": "DragonRidge Country Club, Henderson's premier private golf facility, is adjacent to The Foothills. It features a Jay Morrish-designed championship course. Membership is available by application — it is not mandatory for Foothills homeowners."
  },
  {
    "q": "What ZIP code is The Foothills at MacDonald Ranch in?",
    "a": "The Foothills at MacDonald Ranch is located in ZIP code 89012 in Henderson, Nevada. Home prices range from $1M–$4M+."
  },
  {
    "q": "How does The Foothills compare to MacDonald Highlands?",
    "a": "MacDonald Highlands is higher up the mountain with more dramatic views and higher prices ($2M–$15M+). The Foothills offers similar views and DragonRidge access at a more accessible price range ($1M–$4M), making it an excellent value play for Henderson luxury."
  },
  {
    "q": "What are HOA fees in The Foothills?",
    "a": "HOA fees typically range from $300 to $800 per month, covering 24-hour guard gate staffing, security patrols, common area maintenance, and the community's roads and infrastructure."
  },
  {
    "q": "What are the views like from The Foothills?",
    "a": "The Foothills' elevated position in the McCullough Range provides panoramic views of the Las Vegas Valley, the Strip skyline, and surrounding desert mountains. Virtually every home enjoys some form of elevated view."
  },
  {
    "q": "Is The Foothills at MacDonald Ranch a good investment?",
    "a": "The Foothills benefits from its guard-gated prestige, elevated views, DragonRidge proximity, and limited inventory. The community has shown strong appreciation and is increasingly recognized as a value alternative to the higher-priced MacDonald Highlands."
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
    "a": "Most guard-gated communities include perimeter walls, security patrols, surveillance cameras at entry points, and emergency response coordination. Some communities also offer interior patrol routes and resident notification systems. Foothills at MacDonald Ranch features a 24-hour staffed guard gate with controlled vehicle access, security patrols, and perimeter walls."
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

export default function FoothillsAtMacdonaldRanchFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Foothills at MacDonald Ranch</h2>
          <p>The questions buyers ask most when exploring Foothills at MacDonald Ranch.</p>
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
