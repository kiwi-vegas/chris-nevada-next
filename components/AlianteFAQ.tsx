'use client'
import { useState } from 'react'

const FAQS = [
  {
    q: 'What are HOA fees like in Aliante?',
    a: "Aliante has a master association fee that typically runs $50\u2013$70 per month, covering common areas, landscaping, trail maintenance, and access to community amenities. Sub-association fees vary by neighborhood but usually add another $20\u2013$50. Total monthly HOA for most single-family homes is $70\u2013$120 \u2014 one of the more affordable HOA structures in the valley given the level of amenities.",
  },
  {
    q: 'Which Aliante neighborhoods are best for families?',
    a: "Most of Aliante is family-oriented. Neighborhoods near the Nature Discovery Park and the community trail system are particularly popular with families \u2014 kids can walk to playgrounds and open green spaces safely. The neighborhoods along the golf course tend to attract empty nesters and retirees who want the views without the yard maintenance.",
  },
  {
    q: 'How far is Aliante from the Las Vegas Strip?',
    a: "Aliante is about 20\u201325 miles from the Strip \u2014 roughly 25\u201330 minutes via I-215 and I-15. You\u2019re closer to the Aliante Casino + Hotel + Spa (walking distance for many residents), downtown North Las Vegas, and the VA Medical Center.",
  },
  {
    q: "What\u2019s the price range for homes in Aliante?",
    a: "Aliante is one of the best values in the Las Vegas metro. Townhomes and smaller single-family homes start around $300K. The bulk of single-family homes fall between $350K and $550K. Larger homes on or near the golf course can reach $650K+. The median sits around $425K \u2014 significantly below comparable master-planned communities like Summerlin or Inspirada.",
  },
  {
    q: 'Is the Aliante Golf Club open to the public?',
    a: "Yes \u2014 Aliante Golf Club is a public 18-hole championship course designed by Gary Panks and Associates. It\u2019s consistently rated among the top public courses in Nevada. Residents don\u2019t get a private membership benefit, but the convenience of having a championship course in your backyard is a significant lifestyle perk.",
  },
  {
    q: 'What makes Aliante different from other North Las Vegas communities?',
    a: "Three things: the golf course (one of the best public courses in the state), the Nature Discovery Park (a 20-acre educational park with native desert habitats, walking trails, and wildlife viewing), and the Aliante Casino + Hotel + Spa right in the community. It\u2019s a fully self-contained neighborhood with resort-level entertainment that you can walk to.",
  },
  {
    q: 'Are there good schools near Aliante?',
    a: "Yes. Aliante is served by several CCSD schools in the North Las Vegas district, including newer elementary schools built to serve the community. The area also has convenient access to charter school options. As always with CCSD, school assignments are address-specific \u2014 confirm zoning for any property you\u2019re considering.",
  },
]

export default function AlianteFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Aliante Home Buyer FAQ</h2>
          <p>The questions I hear most from buyers exploring Aliante.</p>
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
