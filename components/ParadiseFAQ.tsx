'use client'
import { useState } from 'react'

const FAQS = [
  {
    q: 'Is Paradise a city or part of Las Vegas?',
    a: "Paradise is an unincorporated town within Clark County \u2014 it\u2019s not part of the City of Las Vegas. Despite having a Las Vegas mailing address, Paradise is its own census-designated place governed by the Clark County Commission. The Las Vegas Strip, Harry Reid International Airport, UNLV, and the Las Vegas Convention Center are all technically in Paradise, not Las Vegas.",
  },
  {
    q: 'What are HOA fees like in Paradise?',
    a: "Paradise has enormous variety. Many older residential neighborhoods have no HOA at all. Newer condo and townhome developments near the Strip typically run $200\u2013$500+ per month with resort-style amenities. Mid-range subdivisions with HOAs run $50\u2013$120 per month. The range reflects Paradise\u2019s diversity \u2014 from historic neighborhoods to luxury high-rises.",
  },
  {
    q: 'How close is Paradise to the Las Vegas Strip?',
    a: "The Strip is in Paradise. Depending on your specific neighborhood, you could be walking distance to a major resort or 5\u201310 minutes by car. The entire eastern side of the Strip corridor from the Sahara to Mandalay Bay falls within Paradise\u2019s boundaries. For hospitality workers, this is the ultimate commute advantage.",
  },
  {
    q: "What\u2019s the price range for homes in Paradise?",
    a: "Paradise covers the widest price spectrum in the Las Vegas Valley. Condos start around $150K\u2013$200K. Single-family homes in established neighborhoods run $300K\u2013$600K. Luxury high-rise condos on or near the Strip can reach $1M\u2013$10M+. The median across all of Paradise sits around $375K, but that number masks enormous variety.",
  },
  {
    q: 'What neighborhoods are in Paradise?',
    a: "Paradise encompasses a huge area with distinct neighborhoods. The UNLV district is popular with students and faculty. The Hughes Center / Howard Hughes Parkway corridor is a business hub with upscale condos. Paradise Palms and Huntridge are mid-century neighborhoods with character. The Strip-adjacent areas cater to hospitality workers and investors. Each has its own feel and price point.",
  },
  {
    q: 'Is Paradise good for real estate investors?',
    a: "Paradise is one of the strongest investor markets in the valley. Proximity to the Strip, airport, Convention Center, and UNLV creates steady rental demand from hospitality workers, students, business travelers, and short-term vacation renters. Condos near the Strip and single-family homes in the UNLV area are particularly popular with investors.",
  },
  {
    q: 'Are there good schools in Paradise?',
    a: "Paradise has a wide range of school options given its size. CCSD operates many schools in the area. UNLV\u2019s campus provides educational and cultural resources. The area also has charter and private school options. School quality varies significantly by neighborhood \u2014 always confirm your assigned school with CCSD before purchasing.",
  },
]

export default function ParadiseFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Paradise Home Buyer FAQ</h2>
          <p>The questions I hear most from buyers exploring Paradise.</p>
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
