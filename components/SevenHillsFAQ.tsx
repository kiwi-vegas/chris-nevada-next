'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for homes in Seven Hills?",
    "a": "Homes in Seven Hills range from approximately $500,000 for entry-level homes to over $7 million for custom estates in the Terracina enclave. Golf course homes with Strip views typically start around $1.2 million."
  },
  {
    "q": "Is Seven Hills guard-gated?",
    "a": "Yes. Seven Hills is a fully guard-gated community with 24-hour staffed entry. The Terracina enclave is double guard-gated — guard-gated within the already guard-gated community."
  },
  {
    "q": "What golf course is in Seven Hills?",
    "a": "Rio Secco Golf Club is a Rees Jones-designed 18-hole championship course that has hosted PGA Tour and celebrity events. The Butch Harmon School of Golf — one of the world's most prestigious golf instruction facilities — is based at Rio Secco."
  },
  {
    "q": "What ZIP code is Seven Hills in?",
    "a": "Seven Hills is located in ZIP code 89052 in Henderson, Nevada. Home prices range from $500K–$7M+."
  },
  {
    "q": "What are HOA fees in Seven Hills?",
    "a": "HOA fees in Seven Hills typically range from $200 to $600 per month, depending on the neighborhood. Fees cover guard gate staffing, security patrols, common area maintenance, and community amenities. Terracina has additional sub-association fees."
  },
  {
    "q": "What is Terracina at Seven Hills?",
    "a": "Terracina is the ultra-luxury enclave within Seven Hills, featuring its own guard gate within the already guard-gated community. Custom estates range from $2 million to over $7 million on premium lots with the most dramatic views in the community."
  },
  {
    "q": "What schools serve Seven Hills?",
    "a": "Seven Hills is served by CCSD schools including John C. Vanderburg Elementary (8/10), Del E. Webb Middle School (7/10), and Coronado High School (6/10). Private options include Henderson International School and Bishop Gorman."
  },
  {
    "q": "How does Seven Hills compare to MacDonald Highlands?",
    "a": "Both are guard-gated Henderson communities with golf and Strip views. MacDonald Highlands ($800K–$28M+) is more ultra-luxury with Tom Fazio golf. Seven Hills ($500K–$7M+) offers a broader price range and Rees Jones' Rio Secco Golf Club, making it accessible to a wider range of luxury buyers."
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
    "a": "Most guard-gated communities include perimeter walls, security patrols, surveillance cameras at entry points, and emergency response coordination. Some communities also offer interior patrol routes and resident notification systems. Seven Hills features a 24-hour staffed guard gate with controlled vehicle access, security patrols, and perimeter walls."
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

export default function SevenHillsFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Seven Hills</h2>
          <p>The questions buyers ask most when exploring Seven Hills.</p>
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
