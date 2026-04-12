'use client'
import { useState } from 'react'

const FAQS = [
  {
    q: 'Is Enterprise a city or part of Las Vegas?',
    a: "Enterprise is an unincorporated town within Clark County \u2014 it\u2019s not part of the City of Las Vegas. It\u2019s governed directly by the Clark County Commission, which means county zoning and services. For most practical purposes, residents use a Las Vegas mailing address, but it\u2019s a distinct community with its own identity, lower density, and a different development pattern than the city proper.",
  },
  {
    q: 'What are HOA fees like in Enterprise?',
    a: "HOA fees in Enterprise vary widely depending on the neighborhood. Newer master-planned subdivisions typically run $50\u2013$120 per month for single-family homes. Guard-gated communities like Southern Highlands (which overlaps into Enterprise) carry higher fees. Some older or non-HOA pockets exist too, which is increasingly rare in Las Vegas.",
  },
  {
    q: 'How far is Enterprise from the Las Vegas Strip?',
    a: "Enterprise literally borders the south end of the Strip. Depending on where you are in the community, you could be 5\u201315 minutes from the major resorts via Las Vegas Blvd or I-15. Harry Reid International Airport is also right in the northeast corner of Enterprise \u2014 10\u201315 minutes from most neighborhoods.",
  },
  {
    q: "What\u2019s the price range for homes in Enterprise?",
    a: "Enterprise covers a wide spectrum. Condos and townhomes start around $250K\u2013$300K. The bulk of single-family homes fall between $400K and $700K. Guard-gated and luxury properties in communities like Southern Highlands, Rhodes Ranch, and Coronado Ranch can reach $1M+. The median for the area sits around $475K.",
  },
  {
    q: 'What are the best neighborhoods within Enterprise?',
    a: "Southern Highlands is the premier address \u2014 a large master-planned community with a golf course, parks, and high-end homes. Rhodes Ranch offers golf course living at more accessible price points. Mountains Edge (which borders Enterprise) adds family-friendly neighborhoods. The corridor along Bermuda Road and Cactus Avenue has seen significant new development in recent years.",
  },
  {
    q: 'Is Enterprise good for commuters?',
    a: "Enterprise is one of the best-connected areas in the valley for commuters. I-15 runs through the east side, I-215 loops through the south and west, and Las Vegas Blvd provides a straight shot to the Strip. If you work on the Strip, at the airport, or anywhere along the I-15/I-215 corridor, Enterprise puts you 10\u201320 minutes from the office.",
  },
  {
    q: 'Are there good schools in Enterprise?',
    a: "Yes. Enterprise is served by several well-regarded CCSD schools, including newer campuses built to serve the area\u2019s growth. The area also has strong charter and private school options. Bishop Gorman High School \u2014 one of the top private schools in Nevada \u2014 is located in Enterprise. As always with CCSD, school assignments are address-specific.",
  },
]

export default function EnterpriseFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Enterprise Home Buyer FAQ</h2>
          <p>The questions I hear most from buyers exploring Enterprise.</p>
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
