'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the age requirement for Sun City Anthem?",
    "a": "Sun City Anthem is a 55+ active adult community. At least one resident in the household must be 55 years of age or older. No residents under the age of 19 are permitted as permanent residents."
  },
  {
    "q": "What is the price range for homes in Sun City Anthem?",
    "a": "Homes in Sun City Anthem range from approximately $350,000 for well-maintained single-story villas to $700,000 or more for larger estate-style homes on premium lots with golf course or mountain views."
  },
  {
    "q": "What are HOA fees at Sun City Anthem?",
    "a": "HOA fees at Sun City Anthem typically range from $180 to $350 per month, depending on the specific neighborhood and lot type. Fees cover access to all three recreation centers, pools, fitness facilities, clubs, and common area maintenance."
  },
  {
    "q": "What amenities does Sun City Anthem offer?",
    "a": "Sun City Anthem features three recreation centers totaling over 100,000 square feet, two championship golf courses, resort-style pools, fitness centers, tennis and pickleball courts, ballrooms, 100+ chartered clubs, an outdoor amphitheater, and miles of walking trails."
  },
  {
    "q": "What golf courses are at Sun City Anthem?",
    "a": "Sun City Anthem has two championship golf courses: the Anthem Course and the Revere Golf Club at Anthem. Both offer desert-target golf with views of the McCullough Range. Residents receive preferred rates and tee times."
  },
  {
    "q": "What ZIP codes is Sun City Anthem in?",
    "a": "Sun City Anthem spans ZIP codes 89052 and 89044 in Henderson, Nevada."
  },
  {
    "q": "Are homes in Sun City Anthem single-story?",
    "a": "Yes. Virtually every home in Sun City Anthem is single-story, designed for comfort and accessibility. Floor plans range from approximately 1,200 square feet for smaller villas to 3,500+ square feet for estate-style homes."
  },
  {
    "q": "Is Sun City Anthem in a safe area?",
    "a": "Yes. Sun City Anthem is located in Henderson, which consistently ranks among the top 10 safest large cities in America. The community also has its own active community association and neighborhood watch programs."
  }
]

export default function SunCityAnthemFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Sun City Anthem</h2>
          <p>The questions buyers ask most when exploring Sun City Anthem.</p>
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
