'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for homes in Mission Hills?",
    "a": "Homes in Mission Hills range from approximately $400,000 for single-story homes to $700,000 for larger two-story homes on premium lots with updated finishes."
  },
  {
    "q": "Is Mission Hills guard-gated?",
    "a": "No. Mission Hills is not guard-gated. It is an open established community with HOA governance within the City of Henderson."
  },
  {
    "q": "What ZIP codes is Mission Hills in?",
    "a": "Mission Hills spans ZIP codes 89002 and 89074 in Henderson, Nevada. Home prices range from $400K–$700K."
  },
  {
    "q": "What are HOA fees in Mission Hills?",
    "a": "HOA fees in Mission Hills typically range from $50 to $130 per month, covering common area maintenance, parks, and community governance."
  },
  {
    "q": "What schools serve Mission Hills?",
    "a": "Mission Hills is served by CCSD schools including Elise L. Wolff Elementary (9/10), Del E. Webb Middle School (7/10), and Coronado High School (7/10)."
  },
  {
    "q": "When were homes in Mission Hills built?",
    "a": "Most homes in Mission Hills were built between 1996 and the mid-2000s by national builders. Floor plans range from 1,400 to 3,200 square feet."
  },
  {
    "q": "Is Mission Hills a good family community?",
    "a": "Yes. Mission Hills is one of Henderson's most reliable family communities with well-regarded schools, community parks, walking paths, and Henderson's consistently high safety rankings."
  },
  {
    "q": "How does Mission Hills compare to Anthem?",
    "a": "Mission Hills offers established Henderson living at lower price points than Anthem, with less mountainous terrain but similarly good schools and family amenities. Anthem offers more trail access and mountain views at a premium."
  },
  {
    "q": "What are the best sub-neighborhoods within Mission Hills?",
    "a": "The best sub-neighborhood depends on your priorities — school zones, lot size, home age, and proximity to amenities all vary within the community. Nevada Real Estate Group agents who specialize in Mission Hills can walk you through the specific blocks and streets that match your criteria."
  },
  {
    "q": "How is new construction availability in Mission Hills?",
    "a": "New construction availability varies by season and builder phase. Some sections of Mission Hills have active new home sales while others are fully built out with resale-only inventory. Contact Nevada Real Estate Group for the most current new construction options."
  }
]

export default function MissionHillsFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Mission Hills</h2>
          <p>The questions buyers ask most when exploring Mission Hills.</p>
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
