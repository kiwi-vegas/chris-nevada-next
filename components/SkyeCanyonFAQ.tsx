'use client'
import { useState } from 'react'

const FAQS = [
  {
    q: 'What are HOA fees like in Skye Canyon?',
    a: "Skye Canyon has a master-planned community association that typically runs around $50–$70 per month, plus a sub-association fee that varies by neighborhood — usually another $30–$80. Total monthly HOA for most single-family homes falls in the $80–$150 range. These fees cover access to Skye Center, community parks, trail maintenance, and common area landscaping.",
  },
  {
    q: 'Which Skye Canyon neighborhoods are best for families?',
    a: "Most of Skye Canyon is family-oriented — that's one of its strongest selling points. Neighborhoods closer to Skye Canyon Park and the Skye Center tend to be particularly popular with families because of the playground access, splash pad, and youth programming. Builders like Lennar, KB Home, and Century Communities have all built family-focused floor plans here.",
  },
  {
    q: 'How far is Skye Canyon from the Las Vegas Strip?',
    a: 'Skye Canyon is about 25–30 miles from the Strip — roughly 30–35 minutes in normal traffic via US-95 South. The trade-off for the extra drive time is significantly more home for your money, newer construction, and a quieter suburban feel with mountain views.',
  },
  {
    q: "What's the price range for homes in Skye Canyon?",
    a: "Skye Canyon offers some of the best value in Las Vegas for newer construction. Townhomes and smaller single-family homes start in the mid-$300K range. Most single-family homes fall between $400K and $650K. Larger custom and semi-custom homes can reach $800K+. The overall median sits around $500K — substantially below Summerlin while offering comparable amenities.",
  },
  {
    q: 'Is Skye Canyon still being built out?',
    a: "Yes — Skye Canyon is an actively developing community with new neighborhoods and phases still under construction. This means buyers have the option of purchasing brand-new construction directly from builders, which is increasingly rare in established Las Vegas communities. The community is expected to include over 9,000 homes at full build-out.",
  },
  {
    q: 'What makes Skye Canyon different from other northwest Las Vegas communities?',
    a: "Three things stand out: the Skye Center (a 16,000 sq ft community center that rivals resort amenities), the proximity to Tule Springs Fossil Beds National Monument, and the fact that it's one of the few master-planned communities in Las Vegas still offering new construction at accessible price points. The desert mountain backdrop is also hard to beat.",
  },
  {
    q: 'Are there good schools near Skye Canyon?',
    a: "Yes. Skye Canyon is served by several newer CCSD schools built to accommodate the area's growth, including Bonner Elementary, Goolsby Elementary, and Tule Springs Elementary. The area also has access to Northwest Career & Technical Academy. As always with CCSD, school assignments are address-specific — confirm zoning for any property you're considering.",
  },
]

export default function SkyeCanyonFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Skye Canyon Home Buyer FAQ</h2>
          <p>The questions I hear most from buyers exploring Skye Canyon.</p>
        </div>
        <div className="faq-list">
          {FAQS.map((faq, i) => (
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
