'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is Eagle Crest?",
    "a": "Eagle Crest is one of three golf courses within Sun City Summerlin, the valley's largest 55+ community. It is an 18-hole executive-length (par 60) course designed by Billy Casper and Greg Nash. Homes surrounding the course benefit from fairway views and open space."
  },
  {
    "q": "What is the price range for homes near Eagle Crest?",
    "a": "Homes along the Eagle Crest golf course corridor range from approximately $400,000 to $700,000. Golf course-front homes command premiums for their fairway views and setback from neighbors."
  },
  {
    "q": "Is Eagle Crest part of Sun City Summerlin?",
    "a": "Yes. Eagle Crest is one of three golf courses within the Sun City Summerlin 55+ community. Residents have full access to all Sun City Summerlin amenities including four recreation centers, pools, fitness, and 100+ clubs."
  },
  {
    "q": "What is the age requirement for Eagle Crest?",
    "a": "As part of Sun City Summerlin, Eagle Crest follows the 55+ age requirement — at least one resident must be 55 or older, and no permanent residents under 19 are permitted."
  },
  {
    "q": "How does Eagle Crest compare to Highland Falls and Palm Valley?",
    "a": "Eagle Crest is the executive-length course (par 60, shorter) while Highland Falls and Palm Valley are full championship-length courses (par 72). Eagle Crest is popular with walkers and daily golfers who prefer a quicker round. All three courses are available to Sun City Summerlin residents."
  },
  {
    "q": "What are HOA fees at Eagle Crest?",
    "a": "As part of Sun City Summerlin, HOA fees range from $180 to $350 per month. Fees cover access to all four recreation centers, pools, fitness facilities, common area maintenance, and community programming."
  },
  {
    "q": "What ZIP code is Eagle Crest in?",
    "a": "Eagle Crest is in ZIP code 89134 in Summerlin, Las Vegas."
  },
  {
    "q": "Can non-residents play Eagle Crest?",
    "a": "The Sun City Summerlin golf courses are open to the public, but residents receive preferred tee times and discounted rates. Eagle Crest is a particularly popular choice for senior golfers due to its walkable executive layout."
  }
]

export default function EagleCrestFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Eagle Crest</h2>
          <p>The questions buyers ask most when exploring Eagle Crest.</p>
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
