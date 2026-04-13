'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "Is Stonebridge new construction?",
    "a": "Yes — Stonebridge is Summerlin's most actively developing village with multiple national builders (Toll Brothers, Taylor Morrison, Lennar, Shea Homes) currently building new homes. Development began in 2017 and continues actively."
  },
  {
    "q": "What is Heritage at Stonebridge?",
    "a": "Heritage at Stonebridge is a Toll Brothers guard-gated 55+ active adult community within the Stonebridge village. It features single-story homes, a private clubhouse with resort pool, and organized social activities."
  },
  {
    "q": "What is the price range in Stonebridge?",
    "a": "Homes in Stonebridge range from approximately $550,000 for entry-level floor plans and Heritage at Stonebridge homes to over $1 million for Toll Brothers' premium collections with mountain views."
  },
  {
    "q": "Is Stonebridge guard-gated?",
    "a": "The broader Stonebridge village is gated (key-fob access) but not guard-gated. Heritage at Stonebridge, the 55+ section, is guard-gated with a 24-hour staffed guard gate."
  },
  {
    "q": "What views are available in Stonebridge?",
    "a": "Stonebridge offers dramatic Spring Mountain and Red Rock Canyon views from many homes, particularly those on the western edge of the village. Sunset views from Stonebridge are widely considered the best residential views in Las Vegas."
  },
  {
    "q": "How close is Stonebridge to Red Rock Canyon?",
    "a": "Red Rock Canyon National Conservation Area is approximately 5 minutes from Stonebridge. The Summerlin trail system connects Stonebridge directly to Red Rock Canyon hiking and biking routes."
  },
  {
    "q": "What are HOA fees in Stonebridge?",
    "a": "HOA fees in Stonebridge range from approximately $100 to $350 per month depending on the specific builder and neighborhood. Heritage at Stonebridge 55+ fees are higher due to guard gate staffing and enhanced amenities."
  },
  {
    "q": "What schools serve Stonebridge?",
    "a": "Stonebridge is zoned for strong CCSD schools including Bonner Elementary (9/10), Sig Rogich Middle School (10/10), and Palo Verde High School (8/10)."
  }
]

export default function SummerlinStonebridgeFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Stonebridge</h2>
          <p>The questions buyers ask most when exploring Stonebridge.</p>
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
