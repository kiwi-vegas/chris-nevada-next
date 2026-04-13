'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for homes in Silverstone Ranch?",
    "a": "Homes in Silverstone Ranch range from approximately $400,000 for entry-level properties to $800,000 for premium golf course frontage homes with mountain views."
  },
  {
    "q": "Is Silverstone Ranch guard-gated?",
    "a": "Yes — Silverstone Ranch is a guard-gated community with 24-hour staffed security at the main entrance. It is one of the most affordable guard-gated communities in the Las Vegas Valley."
  },
  {
    "q": "What golf course is in Silverstone Ranch?",
    "a": "The Silverstone Golf Club is an 18-hole championship course that winds through the community. It is open for public play but offers preferred rates and tee times for residents."
  },
  {
    "q": "What ZIP code is Silverstone Ranch in?",
    "a": "Silverstone Ranch is located in ZIP code 89131 in northwest Las Vegas. Home prices range from $400K–$800K."
  },
  {
    "q": "What are HOA fees in Silverstone Ranch?",
    "a": "HOA fees typically range from $150 to $350 per month, covering guard gate staffing, security patrols, common area maintenance, and landscaping."
  },
  {
    "q": "How does Silverstone Ranch compare to Red Rock Country Club?",
    "a": "Both are guard-gated golf communities, but Red Rock Country Club is in a higher price tier ($1.2M+) with two Arnold Palmer courses. Silverstone Ranch offers similar guard-gated golf living at significantly more accessible price points starting in the $400s."
  },
  {
    "q": "What schools serve Silverstone Ranch?",
    "a": "Silverstone Ranch is served by CCSD schools including Marc & Eva Stern STEM Academy (8/10) and Arbor View High School (7/10). Bishop Gorman (A+) and Faith Lutheran (A) are nearby private options."
  },
  {
    "q": "Who developed Silverstone Ranch?",
    "a": "Silverstone Ranch was developed by Olympia Group beginning in 2001. The community spans approximately 800 acres with over 2,500 homes surrounding the Silverstone Golf Club."
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
    "a": "Most guard-gated communities include perimeter walls, security patrols, surveillance cameras at entry points, and emergency response coordination. Some communities also offer interior patrol routes and resident notification systems. Silverstone Ranch features a 24-hour staffed guard gate with controlled vehicle access, security patrols, and perimeter walls."
  }
]

export default function SilverstoneRanchFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Silverstone Ranch</h2>
          <p>The questions buyers ask most when exploring Silverstone Ranch.</p>
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
