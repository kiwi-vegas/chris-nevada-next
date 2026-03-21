'use client'
import { useState } from 'react'

const FAQS = [
  {
    q: "What's the difference between Henderson and Las Vegas?",
    a: "Henderson is its own incorporated city — Nevada's second largest — not a neighborhood of Las Vegas. It has its own city government, police department, water system, and tax base. In practice, the two cities are seamlessly connected, but Henderson consistently outranks Las Vegas on safety, school quality, and livability indexes. It tends to attract buyers who want the amenities of the Las Vegas metro without living in an unincorporated county pocket.",
  },
  {
    q: 'Is Anthem part of Henderson?',
    a: "Yes — Anthem is a master-planned community located within Henderson city limits, developed by Del Webb starting in the mid-1990s. It's one of the most successful planned communities in the Southwest, covering roughly 4,800 acres across the Black Mountain foothills. Anthem has its own homeowners association, parks, community center, and guard-gated neighborhoods like Anthem Country Club. It's separate from Sun City Anthem, which is the 55+ portion.",
  },
  {
    q: 'How safe is Henderson compared to Las Vegas?',
    a: "Henderson is consistently one of the safest large cities in the country — not just in Nevada. It routinely ranks in the top 10-15 nationally for cities over 200,000 residents. The crime rates per capita in Henderson run well below the national average and are dramatically lower than in unincorporated Clark County. That safety record is one of the primary drivers for families relocating from California.",
  },
  {
    q: "What's the price range for Henderson homes?",
    a: "Henderson covers a wide spectrum. Entry-level condos and townhomes start around $280K–$320K. Single-family homes in established neighborhoods like Green Valley typically start in the $400K–$550K range. Anthem homes run $500K–$1.5M depending on the neighborhood and views. MacDonald Highlands is Henderson's ultra-luxury tier — guard-gated estates with Strip views from $1.5M to well over $10M. The overall Henderson median currently sits around $485,000.",
  },
  {
    q: 'Which Henderson neighborhood is best for families?',
    a: "Anthem and Green Valley Ranch come up most consistently for families with school-age children. Anthem offers excellent community amenities, strong school zoning, and a genuine master-planned feel with parks and trails built into the design. Green Valley Ranch is one of Henderson's most established and walkable communities, anchored by the Green Valley Ranch Resort and Town Center. For newer construction with a community feel, Inspirada on the southwest side has been very well received.",
  },
  {
    q: 'Is Lake Las Vegas in Henderson?',
    a: "Yes — Lake Las Vegas is fully within Henderson city limits, located in the northeastern part of the city near the Lake Mead Recreation Area. It's a 320-acre man-made lake surrounded by resort hotels, two golf courses, and upscale residential communities. It has a distinctly different atmosphere from the rest of Henderson — almost Mediterranean in character — and attracts buyers looking for resort-style living with dramatic water and mountain views.",
  },
  {
    q: "What's Henderson's job market like for people relocating?",
    a: "Henderson has one of the most diversified employment bases in Southern Nevada. Major employers include Amazon (multiple fulfillment centers), Barclaycard, Ethel M Chocolates, St. Rose Dominican Hospitals, and a growing tech and healthcare corridor. The Titanium Way and Green Valley Parkway areas have become regional business hubs. Being adjacent to Las Vegas, Henderson residents also have access to the full Strip employment corridor — hospitality, entertainment, and conventions — without living in the thick of it.",
  },
]

export default function HendersonFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Henderson Home Buyer FAQ</h2>
          <p>The questions we hear most from buyers considering Henderson — answered straight.</p>
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
