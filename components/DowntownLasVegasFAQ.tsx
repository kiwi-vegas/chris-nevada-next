'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for homes in Downtown Las Vegas?",
    "a": "Downtown Las Vegas offers an extraordinary range: loft condos and mid-rise units start around $200,000, while historic estates in the Scotch 80s can exceed $5 million. High-rise condos at buildings like Juhl and The Ogden range from $200K to $700K+."
  },
  {
    "q": "Is Downtown Las Vegas a good investment?",
    "a": "Downtown Las Vegas is one of the most compelling investment markets in the valley. It remains undervalued compared to comparable urban cores in other major cities. Ongoing development, cultural momentum, and proximity to the Strip support strong appreciation potential."
  },
  {
    "q": "What ZIP codes cover Downtown Las Vegas?",
    "a": "Downtown Las Vegas primarily falls within ZIP codes 89101, 89104, and 89106. The Arts District and Fremont East are in 89101."
  },
  {
    "q": "What is the Arts District?",
    "a": "The Arts District, also known as 18b, is an 18-block creative corridor south of Fremont Street featuring galleries, breweries, restaurants, murals, and a monthly First Friday arts walk that draws thousands of visitors. It is the epicenter of downtown's revitalization."
  },
  {
    "q": "Are there high-rise condos in Downtown Las Vegas?",
    "a": "Yes. Downtown high-rises include The Ogden (21 stories), Juhl (16 stories), Newport Lofts (22 stories), Soho Lofts (18 stories), Loft 5, and the newer Cello Tower. Prices range from approximately $200K to over $4.5M."
  },
  {
    "q": "What is the Scotch 80s?",
    "a": "The Scotch 80s is Las Vegas' most prestigious vintage neighborhood, named for its location in Section 8, Township 21 South, Range 61 East. It features guard-gated estate lots up to half an acre with mature landscaping and celebrity provenance. Homes range from $800K to $3M+."
  },
  {
    "q": "Is Downtown Las Vegas walkable?",
    "a": "Yes. Downtown Las Vegas is one of the few truly walkable neighborhoods in the valley. Residents can walk to restaurants, galleries, bars, fitness studios, grocery stores, and entertainment without needing a car — unique for Las Vegas."
  },
  {
    "q": "What schools serve Downtown Las Vegas?",
    "a": "Las Vegas Academy of the Arts (9/10 GreatSchools) is the standout public school option. Private options include The Meadows School (A+) and Bishop Gorman High School (A+). Several charter schools also serve the area."
  }
]

export default function DowntownLasVegasFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Downtown Las Vegas</h2>
          <p>The questions buyers ask most when exploring Downtown Las Vegas.</p>
        </div>
        <div className="faq-list">
          {FAQS.map((faq: any, i: number) => (
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
