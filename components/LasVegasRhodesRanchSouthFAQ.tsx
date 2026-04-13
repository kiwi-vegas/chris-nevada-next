'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range in Rhodes Ranch South?",
    "a": "Homes in Rhodes Ranch South range from approximately $350,000 for smaller floor plans to $600,000 for larger homes on premium lots. The most common price range is $400K–$500K."
  },
  {
    "q": "Is Rhodes Ranch South guard-gated?",
    "a": "Yes. All of Rhodes Ranch is a guard-gated community with 24-hour staffed gates and controlled access. It is one of the most affordable guard-gated communities in the Las Vegas Valley."
  },
  {
    "q": "What golf course is in Rhodes Ranch?",
    "a": "Rhodes Ranch Golf Club features an 18-hole championship course designed by Ted Robinson. The course winds through the community and is open to residents and the public."
  },
  {
    "q": "What ZIP code is Rhodes Ranch South in?",
    "a": "Rhodes Ranch South is in ZIP code 89148 in Las Vegas, Nevada."
  },
  {
    "q": "What amenities does Rhodes Ranch offer?",
    "a": "Rhodes Ranch offers resort-style community pools, a fitness center, tennis courts, basketball courts, walking trails, and the Ted Robinson golf club. The community also has a homeowners' clubhouse for events."
  },
  {
    "q": "What are HOA fees in Rhodes Ranch South?",
    "a": "HOA fees in Rhodes Ranch typically range from $125 to $250 per month, covering guard gate staffing, security, pool maintenance, fitness center, common area upkeep, and community amenities."
  },
  {
    "q": "What schools serve Rhodes Ranch South?",
    "a": "Rhodes Ranch South is served by CCSD schools including Lawrence & Heidi Canarelli Middle School (6/10). Top charter options include Doral Academy (9/10). Bishop Gorman High School (A+) is the premier private option."
  },
  {
    "q": "How far is Rhodes Ranch South from the Strip?",
    "a": "Rhodes Ranch South is approximately 15 minutes from the Las Vegas Strip via I-215 and I-15. Harry Reid International Airport is about 20 minutes away."
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

export default function LasVegasRhodesRanchSouthFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Rhodes Ranch South</h2>
          <p>The questions buyers ask most when exploring Rhodes Ranch South.</p>
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
