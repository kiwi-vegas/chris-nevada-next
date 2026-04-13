'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for homes in Country Rose Estates?",
    "a": "Homes in Country Rose Estates start at approximately $800,000 and go up from there, with premium lots and larger custom homes commanding higher prices. The generous lot sizes and guard-gated address support strong values. Home prices in Country Rose Estates currently range from $800K+ depending on home size, lot position, and condition."
  },
  {
    "q": "Is Country Rose Estates guard-gated?",
    "a": "Yes. Country Rose Estates is a guard-gated community with a 24-hour staffed guard gate. Approximately 100 homes across 60 acres maintain a very low-density, private environment."
  },
  {
    "q": "What village is Country Rose Estates in?",
    "a": "Country Rose Estates is located within The Trails village of the Summerlin North Association. Home prices range from $800K+."
  },
  {
    "q": "What ZIP code is Country Rose Estates in?",
    "a": "Country Rose Estates is located in ZIP code 89134 in the Summerlin North area of Las Vegas. Home prices range from $800K+."
  },
  {
    "q": "How large are the lots in Country Rose Estates?",
    "a": "Country Rose Estates features some of the largest lots in Summerlin — many approaching or exceeding half an acre. These generous parcels provide exceptional privacy and room for custom landscaping."
  },
  {
    "q": "What are HOA fees in Country Rose Estates?",
    "a": "HOA fees typically range from $300 to $700 per month, covering the Summerlin master association fee plus the Country Rose sub-association fee for guard gate staffing and community maintenance."
  },
  {
    "q": "What schools serve Country Rose Estates?",
    "a": "Country Rose Estates is zoned for top CCSD schools including Sig Rogich Middle School (10/10 GreatSchools) and Palo Verde High School (8/10). Private options include The Meadows School (A+) nearby."
  },
  {
    "q": "How does Country Rose compare to other Summerlin guard-gated communities?",
    "a": "Country Rose Estates is unique for its large lots and traditional estate character. Most Summerlin guard-gated communities feature smaller lots with Mediterranean or contemporary homes. Country Rose appeals to buyers who want acreage and privacy over modern luxury design. Country Rose Estates features a 24-hour staffed guard gate with controlled vehicle access, security patrols, and perimeter walls."
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
    "a": "Most guard-gated communities include perimeter walls, security patrols, surveillance cameras at entry points, and emergency response coordination. Some communities also offer interior patrol routes and resident notification systems. Country Rose Estates features a 24-hour staffed guard gate with controlled vehicle access, security patrols, and perimeter walls."
  }
]

export default function CountryRoseEstatesFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Country Rose Estates</h2>
          <p>The questions buyers ask most when exploring Country Rose Estates.</p>
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
