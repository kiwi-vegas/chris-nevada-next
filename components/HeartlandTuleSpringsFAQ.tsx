'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range in Heartland at Tule Springs?",
    "a": "New-construction homes in Heartland at Tule Springs range from approximately $350,000 for entry-level floor plans to around $550,000 for the largest premium homes with upgraded finishes."
  },
  {
    "q": "Is Heartland at Tule Springs in North Las Vegas?",
    "a": "Yes. Heartland is located in North Las Vegas, in the rapidly growing northern corridor of the Las Vegas Valley, near the Tule Springs Fossil Beds National Monument."
  },
  {
    "q": "What builders are in Heartland at Tule Springs?",
    "a": "The community features homes from multiple national builders including Lennar, KB Home, Century Communities, and Richmond American Homes, each offering distinct floor plans and design options."
  },
  {
    "q": "Why is Heartland nationally ranked?",
    "a": "Heartland at Tule Springs has been ranked among the top 50 best-selling master-planned communities nationally due to its strong sales pace, competitive pricing, and the quality of its new-construction offerings."
  },
  {
    "q": "What is the Tule Springs National Monument?",
    "a": "Tule Springs Fossil Beds National Monument is a 22,650-acre federal preserve adjacent to Heartland that protects Ice Age fossils and desert habitat. It provides hiking, wildlife viewing, and open space that no other Las Vegas community can match."
  },
  {
    "q": "What ZIP code is Heartland at Tule Springs in?",
    "a": "Heartland at Tule Springs spans ZIP codes 89166 and 89084 in North Las Vegas."
  },
  {
    "q": "What schools serve Heartland at Tule Springs?",
    "a": "The community is served by CCSD schools. New schools are being planned as the area grows. Charter options like Doral Academy Fire Mesa (8/10) are available nearby."
  },
  {
    "q": "Is Heartland at Tule Springs a good investment?",
    "a": "Heartland offers strong investment potential due to its below-market pricing for new construction, location in one of the fastest-growing corridors in the valley, and planned infrastructure improvements including the 215 northern beltway extension."
  }
]

export default function HeartlandTuleSpringsFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Heartland at Tule Springs</h2>
          <p>The questions buyers ask most when exploring Heartland at Tule Springs.</p>
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
