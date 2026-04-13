'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for homes in The Paseos?",
    "a": "Homes in The Paseos range from approximately $550,000 for established single-family homes to $1.2 million or more for larger estate-style homes on premium lots with mountain views."
  },
  {
    "q": "What schools serve The Paseos?",
    "a": "The Paseos feeds into some of the highest-rated CCSD schools, including John W. Bonner Elementary (9/10), Sig Rogich Middle School (10/10), and Palo Verde High School (8/10). Private options include The Meadows School (A+)."
  },
  {
    "q": "What is Fox Hill Park?",
    "a": "Fox Hill Park is Summerlin's signature adventure park located within The Paseos. It features zip lines, an adventure playground, disc golf, miles of trails, and picnic areas. It draws visitors from across the Las Vegas Valley."
  },
  {
    "q": "Is The Paseos guard-gated?",
    "a": "No. The Paseos is not guard-gated. It is an open-access village within Summerlin with public streets and parks. However, residents benefit from the Summerlin master association's community standards and maintenance."
  },
  {
    "q": "What ZIP code is The Paseos in?",
    "a": "The Paseos is located in ZIP code 89138 in the Summerlin area of Las Vegas. Home prices range from $550K–$1.2M."
  },
  {
    "q": "What builders built homes in The Paseos?",
    "a": "The Paseos features homes by Toll Brothers, Pulte Homes, KB Home, and Richmond American, among other national and local builders. The village was primarily built between 2004 and 2012."
  },
  {
    "q": "What are HOA fees in The Paseos?",
    "a": "HOA fees in The Paseos typically range from $150 to $350 per month, which includes the Summerlin master association fee plus any sub-association fees. Fees cover common area maintenance, parks, trails, and community amenities."
  },
  {
    "q": "How far is The Paseos from Downtown Summerlin?",
    "a": "The Paseos is approximately a 5-minute drive from Downtown Summerlin, which offers 125+ shops and restaurants, the Las Vegas Ballpark, and the Red Rock Resort Casino."
  },
  {
    "q": "What are the best sub-neighborhoods within The Paseos?",
    "a": "The best sub-neighborhood depends on your priorities — school zones, lot size, home age, and proximity to amenities all vary within the community. Nevada Real Estate Group agents who specialize in The Paseos can walk you through the specific blocks and streets that match your criteria."
  },
  {
    "q": "How is new construction availability in The Paseos?",
    "a": "New construction availability varies by season and builder phase. Some sections of The Paseos have active new home sales while others are fully built out with resale-only inventory. Contact Nevada Real Estate Group for the most current new construction options."
  }
]

export default function ThePaseosFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About The Paseos</h2>
          <p>The questions buyers ask most when exploring The Paseos.</p>
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
