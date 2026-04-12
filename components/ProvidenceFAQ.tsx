'use client'
import { useState } from 'react'

const FAQS = [
  {
    q: 'What are HOA fees like in Providence?',
    a: "Providence has a master association fee that typically runs $50\u2013$75 per month, covering community parks, trails, common area landscaping, and access to community amenities. Sub-association fees vary by builder and neighborhood but usually add $25\u2013$60. Total monthly HOA for most single-family homes is $75\u2013$135 \u2014 reasonable for a newer master-planned community with this level of amenities.",
  },
  {
    q: 'How does Providence compare to nearby Skye Canyon?',
    a: "Providence and Skye Canyon are neighbors in the northwest corridor and share a similar profile \u2014 newer construction, family-friendly design, and mountain views. Providence tends to be slightly more compact and intimate, while Skye Canyon has a larger footprint and the Skye Center as its anchor amenity. Price points are comparable, so the choice often comes down to specific builder options and neighborhood feel.",
  },
  {
    q: 'How far is Providence from the Las Vegas Strip?',
    a: "Providence is about 25\u201330 miles from the Strip \u2014 roughly 25\u201335 minutes via US-95 South. The trade-off for the extra drive time is newer construction at lower price points, mountain views, and a quieter suburban feel. Downtown Summerlin is closer at about 15\u201320 minutes via the I-215 beltway.",
  },
  {
    q: "What\u2019s the price range for homes in Providence?",
    a: "Providence offers strong value for new and newer construction. Townhomes start around $330K. Single-family homes typically range from $400K to $600K. Larger premium homes can reach $700K+. The median sits around $475K \u2014 competitive for the northwest corridor given the newer construction and community amenities.",
  },
  {
    q: 'Is Providence still being built out?',
    a: "Yes \u2014 Providence is an actively developing community with multiple builders still constructing new homes. This gives buyers the advantage of purchasing brand-new construction with modern floor plans, energy-efficient features, and builder warranties. The community continues to add parks, trails, and amenities as new phases are completed.",
  },
  {
    q: 'Is Providence good for families?',
    a: "Absolutely \u2014 Providence was designed with families in mind. The community features multiple parks, playgrounds, a trail system, and open green spaces. Neighborhoods are laid out with cul-de-sacs and low-traffic residential streets. The newer schools built to serve the northwest corridor are convenient, and the overall suburban character is very family-oriented.",
  },
  {
    q: 'Are there good schools near Providence?',
    a: "Yes. Providence is served by several newer CCSD schools built to accommodate the northwest corridor\u2019s growth. The area also has access to charter school options. As always with CCSD, school assignments are address-specific \u2014 confirm zoning for any property you\u2019re considering.",
  },
]

export default function ProvidenceFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Providence Home Buyer FAQ</h2>
          <p>The questions I hear most from buyers exploring Providence.</p>
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
