'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "Why is Henderson considered one of the best places to live in Nevada?",
    "a": "Henderson consistently ranks among the top 10 safest large cities in America, has its own city infrastructure (police, fire, hospital, parks), features world-class master-planned communities, and offers every lifestyle and price point from $300K to $28M+."
  },
  {
    "q": "What is the price range for homes in Henderson?",
    "a": "Henderson homes range from approximately $300,000 in established neighborhoods like Whitney Ranch and downtown Henderson to over $28 million in ultra-luxury communities like MacDonald Highlands and Ascaya."
  },
  {
    "q": "What are the best neighborhoods in Henderson?",
    "a": "The best Henderson neighborhoods depend on your lifestyle and budget. MacDonald Highlands and Ascaya lead the luxury segment. Anthem, Green Valley Ranch, and Seven Hills are premier master-planned communities. Inspirada and Cadence offer the best new construction. Lake Las Vegas provides resort-style living."
  },
  {
    "q": "Is Henderson safe?",
    "a": "Yes. Henderson is one of the safest large cities in the United States, consistently ranking in the top 10 nationally by the FBI's Uniform Crime Reporting data. The city operates its own police department with proactive community policing."
  },
  {
    "q": "How far is Henderson from the Las Vegas Strip?",
    "a": "Henderson is approximately 15–25 minutes from the Las Vegas Strip depending on which part of the city you're in. The I-215 beltway and I-15 provide direct commute corridors."
  },
  {
    "q": "What golf courses are in Henderson?",
    "a": "Henderson features world-class golf including DragonRidge Country Club (Tom Fazio), Rio Secco Golf Club, Reflection Bay (Jack Nicklaus), Anthem Country Club (Hale Irwin), Chimera Golf Club, SouthShore Country Club, and Revere Golf Club."
  },
  {
    "q": "Are there 55+ communities in Henderson?",
    "a": "Yes. Henderson has several excellent 55+ communities including Sun City Anthem (Del Webb, 7,200+ homes), Heritage at Cadence, Solera at Anthem, Del Webb at Lake Las Vegas, and Sun City MacDonald Ranch."
  },
  {
    "q": "What ZIP codes does Henderson cover?",
    "a": "Henderson spans multiple ZIP codes including 89002, 89011, 89012, 89014, 89015, 89044, 89052, and 89074. Each ZIP code corresponds to different areas and communities within the city."
  }
]

export default function HendersonFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Henderson</h2>
          <p>The questions buyers ask most when exploring Henderson.</p>
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
