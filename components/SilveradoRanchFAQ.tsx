'use client'
import { useState } from 'react'

const FAQS = [
  {
    q: 'Is Silverado Ranch part of Las Vegas or Henderson?',
    a: "Silverado Ranch is an unincorporated area within Clark County that sits right on the Las Vegas\u2013Henderson border. Most of Silverado Ranch uses a Las Vegas mailing address (89123 and 89183 zip codes), but the southern portions border and blend into Henderson. For practical purposes, residents have easy access to both cities\u2019 amenities, retail, and services.",
  },
  {
    q: 'What are HOA fees like in Silverado Ranch?',
    a: "Silverado Ranch has a mix of HOA and non-HOA neighborhoods. Newer subdivisions with HOAs typically run $40\u2013$100 per month for single-family homes. Gated sections carry slightly higher fees. Some of the older or more established neighborhoods have no HOA at all, which is a draw for buyers who want more flexibility.",
  },
  {
    q: 'How far is Silverado Ranch from the Las Vegas Strip?',
    a: "Silverado Ranch is about 8\u201312 miles from the Strip \u2014 roughly 10\u201315 minutes via I-15 or Las Vegas Blvd. Harry Reid International Airport is even closer, about 5\u201310 minutes away. It\u2019s one of the more convenient locations in the valley for Strip and airport commuters.",
  },
  {
    q: "What\u2019s the price range for homes in Silverado Ranch?",
    a: "Silverado Ranch is one of the strongest value plays in the southeast valley. Condos and townhomes start around $225K\u2013$275K. Single-family homes typically range from $350K to $550K. Larger or newer homes can reach $650K+. The median sits around $425K \u2014 offering strong value given the proximity to the airport, Strip, and Henderson.",
  },
  {
    q: 'What makes Silverado Ranch different from Henderson?',
    a: "Price and convenience. Silverado Ranch delivers many of the same advantages as Henderson \u2014 southeast valley location, I-215 access, proximity to retail and dining \u2014 at price points that are typically $50K\u2013$100K below comparable Henderson homes. You\u2019re also closer to the airport and Strip than most Henderson communities.",
  },
  {
    q: 'Is Silverado Ranch good for families?',
    a: "Yes. The area has a strong suburban character with parks, community pools in many subdivisions, and proximity to well-regarded schools. Silverado Ranch Park is a popular community green space. The neighborhoods south of Silverado Ranch Blvd tend to be newer and more family-oriented, with cul-de-sac layouts and wider streets.",
  },
  {
    q: 'Are there good schools near Silverado Ranch?',
    a: "Yes \u2014 Silverado Ranch is served by several CCSD schools, and the area benefits from its border position between Las Vegas and Henderson school zones. There are also charter and private school options nearby. As always with CCSD, school assignments are address-specific \u2014 confirm zoning for any property you\u2019re considering.",
  },
]

export default function SilveradoRanchFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Silverado Ranch Home Buyer FAQ</h2>
          <p>The questions I hear most from buyers exploring Silverado Ranch.</p>
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
