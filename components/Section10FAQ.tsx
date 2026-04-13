'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for homes in Section 10?",
    "a": "Homes in Section 10 range from approximately $800,000 for older resale properties to over $3 million for renovated or newly constructed custom estates. The wide price range reflects the diversity of home styles and conditions across the neighborhood."
  },
  {
    "q": "Is Section 10 guard-gated?",
    "a": "No. Section 10 is not guard-gated, which is part of its neighborhood-oriented, accessible character. However, it is within the Summerlin master-planned community and benefits from the overall Summerlin HOA and security infrastructure."
  },
  {
    "q": "What ZIP code is Section 10 in?",
    "a": "Section 10 spans ZIP codes 89134 and 89144 in the heart of Summerlin, Las Vegas. Home prices range from $800K–$3M+."
  },
  {
    "q": "What is TPC Summerlin?",
    "a": "TPC Summerlin is a championship golf course adjacent to Section 10, owned and operated by the PGA Tour. It hosts the annual Shriners Children's Open, a PGA Tour event. Several Section 10 homes back directly to the course."
  },
  {
    "q": "What are HOA fees in Section 10?",
    "a": "HOA fees in Section 10 typically range from $100 to $300 per month, which includes the Summerlin master association fee. Fees cover community maintenance, trail system upkeep, and access to Summerlin community amenities."
  },
  {
    "q": "Why is Section 10 called 'Section 10'?",
    "a": "The name refers to the original survey section number used by the Howard Hughes Corporation when planning the Summerlin master community. Section 10 was among the first sections developed in the early 1990s, and the name has stuck as a neighborhood identifier ever since."
  },
  {
    "q": "How large are lots in Section 10?",
    "a": "Lots in Section 10 range from approximately one-third of an acre to over half an acre, which is significantly larger than typical lots in newer Summerlin villages. The generous lot sizes contribute to the neighborhood's spacious, established character."
  },
  {
    "q": "Are there new homes in Section 10?",
    "a": "While Section 10 was originally developed in the early 1990s, some owners have demolished original homes and built new custom estates on the existing lots. Many other homes have been extensively renovated and modernized. The neighborhood offers both original charm and modern luxury."
  }
]

export default function Section10FAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Section 10</h2>
          <p>The questions buyers ask most when exploring Section 10.</p>
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
