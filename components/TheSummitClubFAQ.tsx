'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for homes at The Summit Club?",
    "a": "Finished homes at The Summit Club range from approximately $5 million for smaller custom builds to over $30 million for the largest estates on premium lots. Vacant homesites start at approximately $3 million."
  },
  {
    "q": "Is The Summit Club open to the public?",
    "a": "No. The Summit Club is an invitation-only private community developed by Discovery Land Company. Membership requires an invitation and carries one of the highest initiation fees of any private club in the country."
  },
  {
    "q": "Who designed The Summit Club golf course?",
    "a": "The Summit Club features an 18-hole championship course designed by Tom Fazio, widely regarded as one of America's premier golf course architects. The course plays through natural desert terrain with dramatic elevation changes."
  },
  {
    "q": "How many homes are at The Summit Club?",
    "a": "The Summit Club has only 146 homesites on 555 acres, creating an ultra-low-density residential environment. This is one of the smallest and most exclusive lot counts of any luxury community in Las Vegas."
  },
  {
    "q": "What amenities does The Summit Club offer?",
    "a": "The Summit Club features a full-service clubhouse with fine dining, a resort-style pool and cabana village, fitness and wellness center, indoor and outdoor tennis courts, a children's activity center, and personalized concierge services."
  },
  {
    "q": "What ZIP code is The Summit Club in?",
    "a": "The Summit Club is located in ZIP code 89135 within Summerlin, Las Vegas."
  },
  {
    "q": "Who developed The Summit Club?",
    "a": "The Summit Club was developed by Discovery Land Company, known for creating the world's most exclusive private communities including Yellowstone Club in Montana, Kukio in Hawaii, and Baker's Bay in the Bahamas."
  },
  {
    "q": "What are HOA fees at The Summit Club?",
    "a": "HOA fees at The Summit Club are approximately $2,000 to $5,000+ per month, covering security, common area maintenance, and community infrastructure. Club membership dues are separate and significantly higher."
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

export default function TheSummitClubFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About The Summit Club</h2>
          <p>The questions buyers ask most when exploring The Summit Club.</p>
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
