'use client'
import { useState } from 'react'

const FAQS = [
  {
    q: 'What is the difference between Summerlin and Summerlin West?',
    a: "Summerlin West is the newest expansion of the larger Summerlin master-planned community, developed by Howard Hughes Corporation. While central Summerlin was largely built out from the 1990s through the 2010s, Summerlin West represents the westernmost growth \u2014 the newest villages closest to Red Rock Canyon. Residents of Summerlin West are part of the Summerlin master association and have access to all of Summerlin\u2019s trail systems, events, and amenities.",
  },
  {
    q: 'What are HOA fees like in Summerlin West?',
    a: "Summerlin West carries the same two-layer HOA structure as the rest of Summerlin. The master association runs about $55\u2013$65 per month, and a village-level HOA typically adds another $50\u2013$150. For a typical single-family home, expect $100\u2013$215 total per month. Reverence, as a gated age-qualified community, carries higher fees that include its private clubhouse and amenities.",
  },
  {
    q: 'How close is Summerlin West to Red Rock Canyon?',
    a: "This is Summerlin West\u2019s defining advantage. Many homes are 5 minutes or less from the Red Rock Canyon National Conservation Area entrance. Some neighborhoods in Stonebridge and Redpoint back directly up to the canyon\u2019s boundary. The trail system connects community paths to actual Red Rock hiking trails \u2014 you can literally hike from your front door into 200,000 acres of protected desert.",
  },
  {
    q: "What\u2019s the price range for homes in Summerlin West?",
    a: "Summerlin West skews higher than central Summerlin because it\u2019s the newest construction. Townhomes and smaller single-family homes start around $500K\u2013$600K. The core of single-family homes runs $650K\u2013$900K. Custom and semi-custom homes in Reverence and premium Stonebridge neighborhoods can reach $1.5M+. The median sits around $750K.",
  },
  {
    q: 'What is Reverence in Summerlin West?',
    a: "Reverence is a gated, age-qualified (55+) community within Summerlin West developed by Pulte Homes. It features a private clubhouse, resort-style pool, fitness center, and social programming. Homes are single-story designs built specifically for active adult living. It\u2019s one of the most sought-after 55+ communities in the valley thanks to its location adjacent to Red Rock Canyon.",
  },
  {
    q: 'Is Summerlin West still being built?',
    a: "Yes \u2014 Summerlin West is actively developing with new neighborhoods, parks, and trails still under construction. This is the last major expansion area for Summerlin, which means new construction opportunities here are finite. Builders like Toll Brothers, Lennar, Shea Homes, and Taylor Morrison are actively building. Once Summerlin West is built out, there won\u2019t be new Summerlin homes to buy.",
  },
  {
    q: 'Are there good schools near Summerlin West?',
    a: "Yes \u2014 Summerlin West is served by several of Summerlin\u2019s well-regarded CCSD schools, as well as top private schools like The Meadows School, Bishop Gorman, and Faith Lutheran. Newer schools continue to be built to serve the westernmost neighborhoods. As always with CCSD, school assignments are address-specific.",
  },
]

export default function SummerlinWestFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Summerlin West Home Buyer FAQ</h2>
          <p>The questions I hear most from buyers exploring Summerlin West.</p>
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
