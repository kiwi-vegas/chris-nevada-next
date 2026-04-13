'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for homes in Southwest Ranch?",
    "a": "Homes in Southwest Ranch range from approximately $600,000 for semi-custom homes to over $1.5 million for custom estates on large lots. The average price for a quality single-family home with a half-acre lot is typically $800K–$1M."
  },
  {
    "q": "How large are lots in Southwest Ranch?",
    "a": "Lots in Southwest Ranch are significantly larger than typical Las Vegas subdivisions, ranging from quarter-acre to over one acre. Half-acre lots are the most common, providing room for expanded outdoor living, RV storage, and in some cases equestrian facilities."
  },
  {
    "q": "Is Southwest Ranch guard-gated?",
    "a": "No. Southwest Ranch is not guard-gated, which is part of its appeal for buyers seeking a semi-rural atmosphere without the constraints of a heavily managed HOA. Some individual streets have private gating."
  },
  {
    "q": "What ZIP codes are in Southwest Ranch?",
    "a": "Southwest Ranch spans ZIP codes 89178 and 89139 in the southwestern portion of Las Vegas, within unincorporated Clark County."
  },
  {
    "q": "Can I keep horses in Southwest Ranch?",
    "a": "Some properties in Southwest Ranch are zoned for equestrian use, particularly those with larger lots near Blue Diamond Road. Buyers interested in equestrian properties should verify specific lot zoning and HOA restrictions with their agent."
  },
  {
    "q": "How far is Southwest Ranch from the Strip?",
    "a": "Southwest Ranch is approximately 18 minutes from the Las Vegas Strip via I-15 North. Harry Reid International Airport is about 20 minutes away."
  },
  {
    "q": "What are HOA fees in Southwest Ranch?",
    "a": "HOA fees in Southwest Ranch vary by neighborhood and range from $100 to $300 per month. Some properties have no HOA, offering complete autonomy over the property."
  },
  {
    "q": "What schools serve Southwest Ranch?",
    "a": "Southwest Ranch is served by CCSD schools including Lawrence & Heidi Canarelli Middle School (6/10). Top private options include Bishop Gorman High School (A+). Doral Academy (9/10) is the leading charter option in the area."
  },
  {
    "q": "What are the best sub-neighborhoods within Southwest Ranch?",
    "a": "The best sub-neighborhood depends on your priorities — school zones, lot size, home age, and proximity to amenities all vary within the community. Nevada Real Estate Group agents who specialize in Southwest Ranch can walk you through the specific blocks and streets that match your criteria."
  },
  {
    "q": "How is new construction availability in Southwest Ranch?",
    "a": "New construction availability varies by season and builder phase. Some sections of Southwest Ranch have active new home sales while others are fully built out with resale-only inventory. Contact Nevada Real Estate Group for the most current new construction options."
  }
]

export default function LasVegasSouthwestRanchFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Southwest Ranch</h2>
          <p>The questions buyers ask most when exploring Southwest Ranch.</p>
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
