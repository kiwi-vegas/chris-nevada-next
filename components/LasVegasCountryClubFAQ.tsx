'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range at Las Vegas Country Club?",
    "a": "Homes range from approximately $400,000 for original-era residences to over $3 million for custom-remodeled estates on premium golf course lots."
  },
  {
    "q": "Is Las Vegas Country Club guard-gated?",
    "a": "Yes. Las Vegas Country Club is a guard-gated community with 24-hour staffed gates, security patrols, and controlled access for resident privacy."
  },
  {
    "q": "When was Las Vegas Country Club established?",
    "a": "Las Vegas Country Club was founded in 1967, making it the oldest established country club community in the Las Vegas Valley."
  },
  {
    "q": "Is the golf course private?",
    "a": "Yes. The Las Vegas Country Club golf course is a private 18-hole championship layout. Membership is available separately from homeownership and includes golf, tennis, dining, and social event access."
  },
  {
    "q": "What celebrities have lived at Las Vegas Country Club?",
    "a": "Las Vegas Country Club has been home to many Las Vegas legends and celebrities over its 50+ year history. The community's Strip proximity and guard-gated privacy have made it a preferred address for entertainers, business leaders, and professional athletes."
  },
  {
    "q": "What are HOA fees at Las Vegas Country Club?",
    "a": "HOA fees typically range from $300 to $800 per month, covering guard gate staffing, security patrols, common area maintenance, and community infrastructure. Country club membership is a separate fee."
  },
  {
    "q": "How close is Las Vegas Country Club to the Strip?",
    "a": "Las Vegas Country Club is the closest guard-gated golf community to the Las Vegas Strip — approximately five minutes via Desert Inn Road. The Convention Center is even closer."
  },
  {
    "q": "Are the homes midcentury?",
    "a": "Many original homes date to the late 1960s and 1970s with midcentury architecture. Many have been fully remodeled with contemporary interiors while preserving the exterior character. The community offers renovation potential at every price point."
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
  }
]

export default function LasVegasCountryClubFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Las Vegas Country Club</h2>
          <p>The questions buyers ask most when exploring Las Vegas Country Club.</p>
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
