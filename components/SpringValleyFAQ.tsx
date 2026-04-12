'use client'
import { useState } from 'react'

const FAQS = [
  {
    q: 'Is Spring Valley a city or part of Las Vegas?',
    a: "Spring Valley is an unincorporated town within Clark County \u2014 not part of the City of Las Vegas. It uses a Las Vegas mailing address, but it\u2019s governed by the Clark County Commission with its own zoning and services. It\u2019s one of the largest unincorporated communities in Nevada with a population of roughly 190,000.",
  },
  {
    q: 'What are HOA fees like in Spring Valley?',
    a: "Spring Valley has a wide range. Many older neighborhoods have no HOA at all, which is increasingly rare in Las Vegas. Newer subdivisions and gated communities typically run $40\u2013$100 per month. Guard-gated communities and townhome complexes can run higher. The variety is part of Spring Valley\u2019s appeal \u2014 you can choose the level of structure and cost that fits your lifestyle.",
  },
  {
    q: 'How far is Spring Valley from the Las Vegas Strip?',
    a: "Spring Valley\u2019s eastern edge is essentially adjacent to the Strip corridor. Depending on your specific neighborhood, you\u2019re 5\u201320 minutes from the major resorts via Flamingo, Tropicana, or Spring Mountain Road. The I-215 beltway provides a fast bypass route to Henderson and the airport.",
  },
  {
    q: "What\u2019s the price range for homes in Spring Valley?",
    a: "Spring Valley offers some of the broadest price diversity in the valley. Condos start around $200K\u2013$250K. Single-family homes in established neighborhoods run $350K\u2013$550K. Newer construction and larger homes can reach $700K+. The median sits around $420K \u2014 making Spring Valley one of the better value plays in the southwest corridor.",
  },
  {
    q: 'What is the Chinatown district like?',
    a: "Las Vegas Chinatown, centered along Spring Mountain Road through Spring Valley, is one of the most vibrant dining corridors in the western United States. Hundreds of Asian restaurants, bakeries, tea houses, and specialty grocery stores spanning Chinese, Korean, Japanese, Vietnamese, Thai, and Filipino cuisines. It\u2019s a genuine culinary destination that draws people from across the valley.",
  },
  {
    q: 'Is Spring Valley good for families?',
    a: "Yes, particularly the western and southern sections of Spring Valley closer to the I-215 beltway. These areas tend to have newer construction, more parks, and proximity to well-regarded schools. The eastern sections closer to the Strip are more urban and tend to attract professionals and investors. Both zones have their strengths depending on what you\u2019re looking for.",
  },
  {
    q: 'Are there good schools in Spring Valley?',
    a: "Spring Valley has a large number of school options given its size. CCSD operates many schools in the area, and there are strong charter and private options. The western portion of Spring Valley is generally zoned for newer, higher-rated CCSD schools. As always, school assignments are address-specific \u2014 confirm zoning for any property you\u2019re considering.",
  },
]

export default function SpringValleyFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Spring Valley Home Buyer FAQ</h2>
          <p>The questions I hear most from buyers exploring Spring Valley.</p>
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
