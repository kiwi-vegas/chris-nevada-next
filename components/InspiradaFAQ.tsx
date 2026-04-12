'use client'
import { useState } from 'react'

const FAQS = [
  {
    q: 'What are HOA fees like in Inspirada?',
    a: "Inspirada has a master association fee that typically runs $60\u2013$80 per month, which covers access to the Inspirada Club, community parks, trail maintenance, and common areas. Most neighborhoods also have a sub-association fee of $30\u2013$70 on top of that. Total monthly HOA for a typical single-family home runs $90\u2013$150. The amenities you get for that fee are genuinely resort-level.",
  },
  {
    q: 'Which Inspirada neighborhoods are best for families?',
    a: "Inspirada is one of the most family-friendly communities in the entire Las Vegas Valley. Neighborhoods near the Inspirada Club and the central park system tend to be particularly popular \u2014 kids can walk or bike to the pools, playgrounds, and sports courts. Toll Brothers and Beazer Homes have both built family-oriented floor plans with 3\u20135 bedrooms in the $450K\u2013$700K range.",
  },
  {
    q: 'How far is Inspirada from the Las Vegas Strip?',
    a: "Inspirada is about 15\u201320 miles from the Strip \u2014 roughly 20\u201325 minutes via I-215 and I-15. You\u2019re actually closer to downtown Henderson, the Water Street District, and the Henderson Bird Viewing Preserve, all within 10\u201315 minutes.",
  },
  {
    q: "What\u2019s the price range for homes in Inspirada?",
    a: "Inspirada offers a solid range. Townhomes and smaller single-family homes start around $400K. The bulk of single-family homes fall in the $500K\u2013$750K range with modern floor plans and energy-efficient construction. Larger luxury homes from Toll Brothers and semi-custom builds can reach $900K+. The median sits around $575K.",
  },
  {
    q: 'Is Inspirada still being developed?',
    a: "Yes \u2014 Inspirada still has active construction with multiple builders offering new homes. The community is planned for approximately 8,000\u20139,000 homes at full build-out. This means buyers can still purchase brand-new construction, which is a significant advantage for those who want modern floor plans, energy efficiency, and builder warranties.",
  },
  {
    q: 'What makes Inspirada different from other Henderson communities?',
    a: "Three things stand out: the Mediterranean-inspired architecture that gives the community a cohesive, resort-like aesthetic; the park system with 30+ parks connected by trails; and the Inspirada Club, which rivals private country club amenities but is included with HOA dues. The Henderson Bird Viewing Preserve next door is also a unique amenity you won\u2019t find anywhere else in the valley.",
  },
  {
    q: 'Are there good schools near Inspirada?',
    a: "Yes. Inspirada is served by several highly rated CCSD schools, including Elise L. Wolff Elementary and John C. Vanderburg Elementary. The community also has convenient access to Coronado High School and Henderson International School. As always with CCSD, school assignments are address-specific \u2014 confirm zoning for any property you\u2019re considering.",
  },
]

export default function InspiradaFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Inspirada Home Buyer FAQ</h2>
          <p>The questions I hear most from buyers exploring Inspirada.</p>
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
