'use client'
import { useState } from 'react'

const FAQS = [
  {
    q: 'What gives Tuscany Village its Mediterranean feel?',
    a: "Tuscany Village was designed with a cohesive Mediterranean aesthetic \u2014 warm stucco exteriors, tile roofs, arched entries, courtyard layouts, and mature landscaping. The community\u2019s design guidelines maintain this consistency across neighborhoods, which gives it a resort-like character that stands out from typical Las Vegas subdivisions.",
  },
  {
    q: 'What are HOA fees like in Tuscany Village?',
    a: "Tuscany Village HOA fees typically run $60\u2013$120 per month for single-family homes, covering common area maintenance, landscaping, and community amenities. Some neighborhoods with additional gating or private amenities carry slightly higher fees. The HOA keeps the community\u2019s Mediterranean character well-maintained.",
  },
  {
    q: 'How far is Tuscany Village from the Las Vegas Strip?',
    a: "Tuscany Village is about 12\u201315 miles from the Strip \u2014 roughly 15\u201320 minutes via I-215 and I-15 or Eastern Avenue. You\u2019re closer to Henderson\u2019s retail and dining hubs, Galleria at Sunset, and the Water Street District, all within 10\u201315 minutes.",
  },
  {
    q: "What\u2019s the price range for homes in Tuscany Village?",
    a: "Tuscany Village offers solid Henderson value. Townhomes and smaller single-family homes start around $375K. The core of single-family homes runs $450K\u2013$650K. Larger homes with premium lots can reach $750K+. The median sits around $525K \u2014 competitive for Henderson given the community\u2019s character and amenities.",
  },
  {
    q: 'What makes Tuscany Village different from other Henderson communities?',
    a: "The cohesive architectural character is the standout. While most Henderson communities have a mix of architectural styles, Tuscany Village maintains a consistent Mediterranean aesthetic that gives the entire community a unified, resort-like feel. The mature landscaping and established trees add to the ambiance in a way that newer communities can\u2019t yet match.",
  },
  {
    q: 'Is Tuscany Village good for families?',
    a: "Yes. The community has a strong family presence with parks, walking paths, and proximity to well-regarded Henderson schools. The residential streets are generally quieter and more pedestrian-friendly than the surrounding arterials. The Horizon Ridge corridor nearby provides convenient access to shopping, dining, and services.",
  },
  {
    q: 'Are there good schools near Tuscany Village?',
    a: "Yes \u2014 Tuscany Village is served by several well-regarded CCSD schools in the Henderson district. The area also has access to strong charter and private school options. As always with CCSD, school assignments are address-specific \u2014 confirm zoning for any property you\u2019re considering.",
  },
]

export default function TuscanyVillageFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Tuscany Village Home Buyer FAQ</h2>
          <p>The questions I hear most from buyers exploring Tuscany Village.</p>
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
