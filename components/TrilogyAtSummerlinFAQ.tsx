'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the age requirement for Trilogy at Summerlin?",
    "a": "Trilogy at Summerlin is a 55+ community. At least one resident in each home must be 55 years of age or older. No residents under 19 are permitted as permanent residents, per HUD guidelines."
  },
  {
    "q": "What is the price range for homes in Trilogy at Summerlin?",
    "a": "Homes in Trilogy at Summerlin range from approximately $500,000 for the Reflect Collection to around $800,000 for premium Pinnacle Collection homes on mountain-view lots."
  },
  {
    "q": "Does Trilogy at Summerlin have a restaurant?",
    "a": "Yes. The Outlook Club features a full-service restaurant and bar exclusively for residents and their guests. It is one of the few 55+ communities in Las Vegas with an on-site dining venue."
  },
  {
    "q": "Is Trilogy at Summerlin guard-gated?",
    "a": "Yes. Trilogy at Summerlin is a guard-gated community with a 24-hour staffed gate and private streets, providing security and controlled access for residents."
  },
  {
    "q": "Who builds homes in Trilogy at Summerlin?",
    "a": "All homes in Trilogy at Summerlin are built by Shea Homes under the nationally recognized Trilogy brand. Shea Homes' SheaXero and SheaConnect technology packages come standard."
  },
  {
    "q": "What are HOA fees in Trilogy at Summerlin?",
    "a": "HOA fees typically range from $250 to $500 per month, covering guard gate staffing, Outlook Club operations, restaurant, pool, fitness center, lifestyle programming, and the Summerlin master association fee."
  },
  {
    "q": "What is the Lifestyle Director at Trilogy?",
    "a": "Trilogy communities employ a full-time Lifestyle Director who plans and coordinates events, classes, excursions, and social activities year-round — from wine tastings and cooking classes to hiking groups and live entertainment."
  },
  {
    "q": "What ZIP code is Trilogy at Summerlin in?",
    "a": "Trilogy at Summerlin is located in ZIP code 89135 in the Summerlin South area of Las Vegas. Home prices range from $500K–$800K."
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
    "a": "Most guard-gated communities include perimeter walls, security patrols, surveillance cameras at entry points, and emergency response coordination. Some communities also offer interior patrol routes and resident notification systems. Trilogy at Summerlin features a 24-hour staffed guard gate with controlled vehicle access, security patrols, and perimeter walls."
  }
]

export default function TrilogyAtSummerlinFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Trilogy at Summerlin</h2>
          <p>The questions buyers ask most when exploring Trilogy at Summerlin.</p>
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
