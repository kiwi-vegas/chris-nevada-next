'use client'
import { useState } from 'react'

const FAQS = [
  {
    q: 'What are HOA fees like in Cadence?',
    a: "Cadence has a master association fee that typically runs $55\u2013$75 per month, covering access to the Cadence Clubhouse, the central park, trail maintenance, and common areas. Sub-association fees vary by neighborhood but usually add $25\u2013$60. Total monthly HOA for most single-family homes is $80\u2013$135 \u2014 very competitive given the caliber of amenities.",
  },
  {
    q: 'Which Cadence neighborhoods are best for families?',
    a: "Cadence is exceptionally family-friendly across the board. Neighborhoods bordering the 50-acre central park are particularly popular \u2014 kids can walk to playgrounds, sports fields, and the splash pad. Lennar and Woodside Homes have built many of the family-oriented floor plans here, with 3\u20135 bedrooms typically in the $400K\u2013$650K range.",
  },
  {
    q: 'How far is Cadence from the Las Vegas Strip?',
    a: "Cadence is about 15\u201318 miles from the Strip \u2014 roughly 20\u201325 minutes via I-11 and I-515/US-93. You\u2019re closer to downtown Henderson and the Water Street District (about 10 minutes), and Lake Mead is just 20\u201325 minutes east.",
  },
  {
    q: "What\u2019s the price range for homes in Cadence?",
    a: "Cadence offers strong value for Henderson. Townhomes start around $350K. The majority of single-family homes fall between $400K and $650K. Larger premium homes from Toll Brothers and custom options can reach $800K+. The median currently sits around $500K \u2014 making Cadence one of the more accessible entry points into Henderson.",
  },
  {
    q: 'Is Cadence still being built?',
    a: "Yes \u2014 Cadence is actively developing with multiple builders constructing new homes. The community is planned for roughly 13,000 homes at full build-out, so there\u2019s significant inventory still coming. Buyers can purchase brand-new construction from national builders like Lennar, Toll Brothers, Richmond American, and Woodside Homes.",
  },
  {
    q: 'What makes Cadence different from other Henderson communities?',
    a: "The 50-acre central park is the standout \u2014 it\u2019s one of the largest community parks in the Las Vegas Valley, with sports fields, an amphitheater, splash pads, and event spaces. The Cadence Clubhouse adds resort-style pools, a fitness center, and community programming. The location near Lake Mead Parkway also gives you quick access to Lake Mead and the River Mountains Loop Trail.",
  },
  {
    q: 'Are there good schools near Cadence?',
    a: "Yes. Cadence is served by several CCSD schools, including newer campuses built specifically for this part of Henderson. The community has convenient access to both public and charter school options. As always with CCSD, school assignments are address-specific \u2014 confirm zoning for any property you\u2019re considering.",
  },
]

export default function CadenceFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Cadence Home Buyer FAQ</h2>
          <p>The questions I hear most from buyers exploring Cadence.</p>
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
