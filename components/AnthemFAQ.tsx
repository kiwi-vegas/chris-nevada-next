'use client'
import { useState } from 'react'

const FAQS = [
  {
    q: 'What are HOA fees like in Anthem?',
    a: "Anthem has a master association fee that typically runs $60\u2013$90 per month, covering community parks, trails, common areas, and access to the Anthem Center. Sub-association fees vary by neighborhood and usually add $30\u2013$80. Total monthly HOA for most single-family homes is $100\u2013$170. Guard-gated neighborhoods like Anthem Country Club and Anthem Hills carry higher fees that include gate staffing and private amenities.",
  },
  {
    q: 'What is Anthem Country Club?',
    a: "Anthem Country Club is a private, guard-gated community within Anthem featuring an 18-hole Hale Irwin-designed championship golf course, a full-service clubhouse, resort pools, tennis courts, and dining facilities. Membership is available to homeowners within the gates. It\u2019s the premier address within Anthem and one of the top private clubs in Henderson.",
  },
  {
    q: 'How far is Anthem from the Las Vegas Strip?',
    a: "Anthem is about 15\u201320 miles from the Strip \u2014 roughly 20\u201325 minutes via I-215 and I-15. You\u2019re closer to the Galleria at Sunset and the Henderson dining and retail scene, both about 10 minutes away. Lake Mead is roughly 25\u201330 minutes east.",
  },
  {
    q: "What\u2019s the price range for homes in Anthem?",
    a: "Anthem has a wide range reflecting its variety of neighborhoods. Townhomes and smaller single-family homes start around $400K. The core of single-family homes in Anthem runs $500K\u2013$800K. Anthem Hills and Anthem Country Club properties can reach $1M\u2013$3M+ for larger estates and golf course homes. The median across all of Anthem sits around $625K.",
  },
  {
    q: 'What makes Anthem different from other Henderson communities?',
    a: "Elevation and topography. Anthem is built into the foothills of the McCullough Range, which gives most neighborhoods dramatic elevation changes and Strip views that are unique in Henderson. The combination of that setting with the Anthem Country Club, extensive trail system, and the Anthem Center creates a community that feels more like a mountain resort than a Las Vegas suburb.",
  },
  {
    q: 'Is Anthem good for families?',
    a: "Exceptional. Anthem was designed as a family community from the ground up. The Anthem Center has pools, sports courts, and year-round youth programming. The trail system is extensive and safe for kids to bike and walk. The schools serving Anthem \u2014 both public and private \u2014 are among the better options in Henderson. Several neighborhoods are specifically designed with family floor plans and cul-de-sac layouts.",
  },
  {
    q: 'Are there good schools near Anthem?',
    a: "Yes \u2014 Anthem is served by some of Henderson\u2019s strongest CCSD schools, including Del Webb Middle School and Coronado High School. The area also has access to well-regarded private and charter schools. The newer schools built to serve south Henderson are generally well-rated. As always with CCSD, school assignments are address-specific.",
  },
]

export default function AnthemFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Anthem Home Buyer FAQ</h2>
          <p>The questions I hear most from buyers exploring Anthem.</p>
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
