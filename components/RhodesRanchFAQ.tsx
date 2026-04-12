'use client'
import { useState } from 'react'

const FAQS = [
  {
    q: 'Is Rhodes Ranch a gated community?',
    a: "Yes \u2014 Rhodes Ranch is a fully gated community with controlled-access entry points. The gates are staffed and/or automated depending on the entrance. Within the community, some neighborhoods have additional gating for an extra layer of privacy and security.",
  },
  {
    q: 'What are HOA fees like in Rhodes Ranch?',
    a: "Rhodes Ranch HOA fees typically run $100\u2013$180 per month for single-family homes. Fees cover gate maintenance and security, community pools, parks, common area landscaping, and access to the Rhodes Ranch community center. Homes on the golf course may carry slightly higher dues. Townhomes and condos within the community have their own sub-association fees.",
  },
  {
    q: 'Is the Rhodes Ranch Golf Club open to the public?',
    a: "Yes \u2014 Rhodes Ranch Golf Club is a public 18-hole course, though residents enjoy preferred tee times and discounted rates. Designed by Ted Robinson Sr., it\u2019s known for its water features, mature landscaping, and mountain views. The course is well-maintained and remains one of the more affordable championship options in the valley.",
  },
  {
    q: 'How far is Rhodes Ranch from the Las Vegas Strip?',
    a: "Rhodes Ranch is about 10\u201315 miles from the Strip \u2014 roughly 15\u201320 minutes via I-215 and I-15. The I-215 beltway is directly accessible from the community, making commutes to the Strip, the airport, Henderson, and Summerlin all straightforward.",
  },
  {
    q: "What\u2019s the price range for homes in Rhodes Ranch?",
    a: "Rhodes Ranch offers solid value for a gated golf community. Condos and townhomes start around $250K\u2013$300K. Single-family homes typically range from $400K to $650K. Larger homes on or near the golf course can reach $750K+. The median sits around $475K \u2014 well below comparable gated golf communities like Southern Highlands or Red Rock Country Club.",
  },
  {
    q: 'What makes Rhodes Ranch different from other golf communities?',
    a: "Accessibility. Most gated golf communities in Las Vegas are priced above $600K for entry-level single-family homes. Rhodes Ranch delivers the gated golf lifestyle \u2014 Ted Robinson design, resort-style community amenities, mountain views \u2014 at price points that are realistic for a broader range of buyers. It\u2019s one of the best value propositions in the valley for golf community living.",
  },
  {
    q: 'Are there good schools near Rhodes Ranch?',
    a: "Yes. Rhodes Ranch is served by several well-regarded CCSD schools, and the community\u2019s southwest location puts it within reach of strong charter and private options as well. The area has seen newer school construction as the southwest corridor has grown. As always with CCSD, school assignments are address-specific \u2014 confirm zoning for any property you\u2019re considering.",
  },
]

export default function RhodesRanchFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Rhodes Ranch Home Buyer FAQ</h2>
          <p>The questions I hear most from buyers exploring Rhodes Ranch.</p>
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
