'use client'
import { useState } from 'react'

const FAQS = [
  {
    q: 'How old is Whitney Ranch?',
    a: "Whitney Ranch is one of Henderson\u2019s original master-planned communities, with development beginning in the late 1980s and continuing through the 1990s. That makes it one of the most established residential areas in the city \u2014 30+ years of mature landscaping, settled neighborhoods, and a community character that newer developments are still working toward.",
  },
  {
    q: 'What are HOA fees like in Whitney Ranch?',
    a: "Whitney Ranch HOA fees are generally modest compared to newer communities. Most single-family homes pay $40\u2013$80 per month for the master association, which covers common areas, parks, and community maintenance. Some neighborhoods have additional sub-association fees. The lower HOA costs reflect the community\u2019s established infrastructure and lower amenity overhead.",
  },
  {
    q: 'How far is Whitney Ranch from the Las Vegas Strip?',
    a: "Whitney Ranch is about 10\u201315 miles from the Strip \u2014 roughly 15\u201320 minutes via I-215 and I-15 or via Sunset Road. Harry Reid Airport is about 10\u201315 minutes away. The Galleria at Sunset mall is within walking distance of many Whitney Ranch neighborhoods.",
  },
  {
    q: "What\u2019s the price range for homes in Whitney Ranch?",
    a: "Whitney Ranch is one of Henderson\u2019s most accessible established communities. Condos and townhomes start around $250K\u2013$300K. Single-family homes typically range from $375K to $550K. Larger homes on premium lots can reach $650K+. The median sits around $425K \u2014 strong value for a mature Henderson address with this level of convenience.",
  },
  {
    q: 'What makes Whitney Ranch different from newer Henderson communities?',
    a: "Maturity and location. Whitney Ranch has 30+ years of established trees, settled landscaping, and neighborhood character that newer communities simply can\u2019t replicate. The location in central Henderson puts you within walking distance of Galleria at Sunset and minutes from I-215. And the price points are typically $75K\u2013$150K below comparable newer construction in communities like Inspirada or Cadence.",
  },
  {
    q: 'Is Whitney Ranch good for families?',
    a: "Yes \u2014 Whitney Ranch has been a family community since its founding. Community parks, established schools, walkable retail, and quiet residential streets make it a strong choice for families. The Whitney Ranch Recreation Center and aquatic complex provide year-round swimming, fitness, and youth programming.",
  },
  {
    q: 'Are there good schools near Whitney Ranch?',
    a: "Yes. Whitney Ranch is served by well-established CCSD schools that have been serving the community for decades. The area also has access to Henderson\u2019s strong charter and private school options. As always with CCSD, school assignments are address-specific \u2014 confirm zoning for any property you\u2019re considering.",
  },
]

export default function WhitneyRanchFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Whitney Ranch Home Buyer FAQ</h2>
          <p>The questions I hear most from buyers exploring Whitney Ranch.</p>
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
