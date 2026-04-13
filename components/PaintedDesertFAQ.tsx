'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for homes in Painted Desert?",
    "a": "Homes in Painted Desert range from approximately $400,000 for smaller homes on interior lots to $800,000 for premium golf course-front estates. The most active price range is $450,000 to $650,000."
  },
  {
    "q": "Is Painted Desert guard-gated?",
    "a": "Yes. Painted Desert is a guard-gated community with controlled access providing security for the approximately 1,200 homes across 320 acres. Painted Desert features a 24-hour staffed guard gate with controlled vehicle access, security patrols, and perimeter walls."
  },
  {
    "q": "Who designed the golf course at Painted Desert?",
    "a": "The Painted Desert Golf Club was designed by Jay Morrish, known for acclaimed desert courses including Troon North. It is an 18-hole, par-72 championship layout that has been ranked among the best public-access courses in Nevada."
  },
  {
    "q": "Is the Painted Desert golf course public or private?",
    "a": "The Painted Desert Golf Club is open to the public, though residents receive preferred tee times and discounted rates. It is not a private country club — no membership is required to play."
  },
  {
    "q": "What are HOA fees at Painted Desert?",
    "a": "HOA fees at Painted Desert typically range from $200 to $400 per month, covering guard gate staffing, security, common area maintenance, and community infrastructure."
  },
  {
    "q": "What ZIP code is Painted Desert in?",
    "a": "Painted Desert is located in ZIP code 89149 in northwest Las Vegas. Home prices range from $400K–$800K."
  },
  {
    "q": "How does Painted Desert compare to Los Prados?",
    "a": "Both are affordable guard-gated golf communities in northwest Las Vegas. Painted Desert has a Jay Morrish championship course (vs. Los Prados' executive-style course), slightly newer construction (1988 vs. 1983), and slightly higher price points. Both offer excellent value for guard-gated golf living."
  },
  {
    "q": "What schools serve Painted Desert?",
    "a": "Painted Desert is served by CCSD schools including Zel & Mary Lowman Elementary, Lied Middle School, and Legacy High School. Private options include Bishop Gorman (A+) and Faith Lutheran (A)."
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
    "a": "Most guard-gated communities include perimeter walls, security patrols, surveillance cameras at entry points, and emergency response coordination. Some communities also offer interior patrol routes and resident notification systems. Painted Desert features a 24-hour staffed guard gate with controlled vehicle access, security patrols, and perimeter walls."
  }
]

export default function PaintedDesertFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Painted Desert</h2>
          <p>The questions buyers ask most when exploring Painted Desert.</p>
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
