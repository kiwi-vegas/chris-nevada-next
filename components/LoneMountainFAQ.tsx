'use client'
import { useState } from 'react'

const FAQS = [
  {
    q: 'What makes Lone Mountain different from other northwest Las Vegas communities?',
    a: "Lot size and character. While most Las Vegas communities have standard subdivision lots of 5,000\u201310,000 sq ft, Lone Mountain has a significant number of half-acre, one-acre, and even multi-acre properties. The area has a semi-rural feel with equestrian properties, mature trees, and open space that you simply can\u2019t find in master-planned communities. The landmark Lone Mountain peak anchors the area and gives it a visual identity.",
  },
  {
    q: 'Are there equestrian properties in Lone Mountain?',
    a: "Yes \u2014 Lone Mountain is one of the few areas in the Las Vegas Valley where you can still find properties zoned for horses. Several neighborhoods have large lots with horse facilities, riding areas, and trail access. If you want to keep horses in Las Vegas without living in the far rural outskirts, Lone Mountain is one of your best options.",
  },
  {
    q: 'What are HOA fees like in Lone Mountain?',
    a: "Lone Mountain has a wide mix. Many of the older, larger-lot properties have no HOA \u2014 which is a major draw for buyers who want freedom with their land. Newer subdivisions within the area do have HOAs, typically $40\u2013$100 per month. The non-HOA pockets are increasingly rare in Las Vegas, making them a genuine selling point for the right buyer.",
  },
  {
    q: 'How far is Lone Mountain from the Las Vegas Strip?',
    a: "Lone Mountain is about 15\u201320 miles from the Strip \u2014 roughly 20\u201325 minutes via US-95 or the I-215 beltway. Downtown Summerlin is closer at about 10\u201315 minutes. The area has good freeway connectivity despite its semi-rural feel.",
  },
  {
    q: "What\u2019s the price range for homes in Lone Mountain?",
    a: "Lone Mountain covers a wide range depending on lot size. Smaller standard-lot homes in newer subdivisions start around $450K\u2013$550K. Half-acre to one-acre properties typically run $700K\u2013$1.2M. Multi-acre equestrian estates and custom builds can reach $2M+. The median sits around $650K, but lot size drives value more than square footage here.",
  },
  {
    q: 'What is Lone Mountain Regional Park?',
    a: "Lone Mountain Regional Park is a Clark County park centered around the Lone Mountain peak \u2014 a distinctive 300-foot volcanic butte that\u2019s visible from across the northwest valley. The park offers hiking trails to the summit, walking paths, picnic areas, and open desert terrain. It\u2019s the visual and recreational anchor of the area.",
  },
  {
    q: 'Are there good schools near Lone Mountain?',
    a: "Yes \u2014 Lone Mountain is served by several well-regarded CCSD schools in the northwest area, and the community\u2019s location between Summerlin and Centennial Hills puts it within reach of some of the valley\u2019s strongest private and charter school options. As always with CCSD, school assignments are address-specific.",
  },
]

export default function LoneMountainFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Lone Mountain Home Buyer FAQ</h2>
          <p>The questions I hear most from buyers exploring Lone Mountain.</p>
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
