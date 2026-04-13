'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for homes in Los Prados?",
    "a": "Homes in Los Prados range from approximately $300,000 for townhomes and patio homes to $600,000 for larger single-family homes on golf course lots. The most active price range is $350,000 to $500,000."
  },
  {
    "q": "Is Los Prados guard-gated?",
    "a": "Yes. Los Prados is a guard-gated community with controlled access. It provides security at one of the most affordable price points of any gated golf community in the Las Vegas Valley."
  },
  {
    "q": "What golf course is in Los Prados?",
    "a": "Los Prados features an 18-hole, par-70 golf course that winds through the community. The course has mature trees, water features, and a walkable layout. Affordable golf memberships are available to residents and the public."
  },
  {
    "q": "What are HOA fees at Los Prados?",
    "a": "HOA fees at Los Prados typically range from $150 to $350 per month, making it one of the most affordable guard-gated golf communities in the valley. Fees cover guard gate staffing, common area maintenance, and community infrastructure."
  },
  {
    "q": "Is Los Prados a 55+ community?",
    "a": "No. Los Prados is an all-ages community, though it does attract a significant number of active retirees due to the affordable golf course lifestyle. There are no age restrictions for residency."
  },
  {
    "q": "What ZIP code is Los Prados in?",
    "a": "Los Prados is located in ZIP code 89130 in northwest Las Vegas."
  },
  {
    "q": "How does Los Prados compare to Painted Desert?",
    "a": "Both are affordable guard-gated golf communities in northwest Las Vegas. Los Prados is slightly older (1983 vs. 1988) and has a lower entry price. Painted Desert has a Jay Morrish-designed course and slightly higher price points. Both offer excellent value for guard-gated golf living."
  },
  {
    "q": "What schools serve Los Prados?",
    "a": "Los Prados is served by CCSD schools including Zel & Mary Lowman Elementary, Lied Middle School, and Legacy High School. Private options include Bishop Gorman (A+) and Faith Lutheran (A)."
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

export default function LosPradosFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Los Prados</h2>
          <p>The questions buyers ask most when exploring Los Prados.</p>
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
