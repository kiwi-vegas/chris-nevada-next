'use client'
import { useState } from 'react'

const FAQS = [
  {
    q: 'What are HOA fees like in Summerlin?',
    a: "Summerlin has a two-layer HOA structure. There's a master association that runs about $55–$65 per month, and a neighborhood-level HOA that typically adds another $50–$150. For a typical single-family home you're looking at $100–$200 total per month. Guard-gated communities like The Ridges carry higher fees that also cover security staffing and private amenities.",
  },
  {
    q: 'Which Summerlin village is best for families with school-age children?',
    a: 'The Paseos and Stonebridge consistently come up as top choices for families. Both are close to Fox Hill Park and are zoned for some of Summerlin\'s stronger public schools. School assignments within CCSD are address specific, so always confirm the assigned school for any specific property before you buy.',
  },
  {
    q: 'How far is Summerlin from the Las Vegas Strip?',
    a: 'Most Summerlin addresses are 12–15 miles from the Strip — about 20 minutes in normal traffic via Summerlin Parkway to I-15. Going the other direction, Red Rock Canyon is 10–15 minutes from most neighborhoods.',
  },
  {
    q: 'Are there gated and guard-gated communities in Summerlin?',
    a: "Yes, several. The Ridges is the most well-known — 793 acres with staffed gates and some of the most impressive custom construction in Las Vegas. Red Rock Country Club is a private, gated golf community with two Arnold Palmer-designed courses. The Summit Club is the valley's most exclusive gated enclave.",
  },
  {
    q: "What's the price range for homes in Summerlin?",
    a: "Summerlin covers a wide range. Condos and townhomes start around $400K–$450K. Single-family homes in established villages typically start in the $550K–$700K range. The Ridges runs $1.5M to well over $5M. Current median for all of Summerlin is roughly $686,000.",
  },
  {
    q: 'Is Summerlin a good real estate investment?',
    a: "Based on thirty-five years of watching this market, Summerlin has one of the strongest track records in Southern Nevada for value retention and appreciation. It has ranked among the nation's top-selling master-planned communities for over three decades. In 2025, Summerlin South saw nearly 5.5% year-over-year appreciation.",
  },
  {
    q: "What are Downtown Summerlin's main attractions?",
    a: "Downtown Summerlin is a 400-acre outdoor lifestyle center with 125+ shops and restaurants — anchored by Whole Foods, Nordstrom Rack, and a PGA Tour Superstore. Las Vegas Ballpark and City National Arena (Golden Knights practice facility) are also there.",
  },
]

export default function FAQAccordion() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Summerlin Home Buyer FAQ</h2>
          <p>Thirty-five years of answering these questions — here are the ones that come up every time.</p>
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
