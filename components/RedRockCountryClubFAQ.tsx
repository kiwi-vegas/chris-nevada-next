'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for homes at Red Rock Country Club?",
    "a": "Homes at Red Rock Country Club range from approximately $800,000 for resale homes in established neighborhoods to over $3 million for custom estates on premium golf course lots with unobstructed Red Rock Canyon views."
  },
  {
    "q": "Is Red Rock Country Club guard-gated?",
    "a": "Yes. Red Rock Country Club is a fully guard-gated community with a 24-hour staffed guard gate and comprehensive security patrols."
  },
  {
    "q": "What golf courses are at Red Rock Country Club?",
    "a": "Red Rock Country Club features two Arnold Palmer-designed championship courses: the Mountain Course and the Arroyo Course. Both offer desert-target golf with dramatic Red Rock Canyon views from elevated tee boxes."
  },
  {
    "q": "What ZIP code is Red Rock Country Club in?",
    "a": "Red Rock Country Club is located in ZIP code 89135 in the Summerlin South area of Las Vegas."
  },
  {
    "q": "What are HOA fees at Red Rock Country Club?",
    "a": "HOA fees at Red Rock Country Club typically range from $300 to $800 per month, which includes the Summerlin master association fee and the Red Rock sub-association fee. Fees cover guard gate staffing, security, and common area maintenance."
  },
  {
    "q": "Do you have to join the golf club to live at Red Rock Country Club?",
    "a": "No. Golf club membership is optional. Many residents enjoy the guard-gated security, Red Rock Canyon views, and community character without playing golf. Social and fitness memberships are also available."
  },
  {
    "q": "What schools serve Red Rock Country Club?",
    "a": "Red Rock Country Club is served by top-rated Summerlin schools including John W. Bonner Elementary (9/10), Sig Rogich Middle School (10/10), and Palo Verde High School (8/10). Private options include The Meadows School (A+) and Bishop Gorman (A+)."
  },
  {
    "q": "How does Red Rock Country Club compare to The Ridges?",
    "a": "Both are guard-gated Summerlin communities near Red Rock Canyon. The Ridges ($2M–$20M+) is ultra-luxury with Bear's Best golf. Red Rock Country Club ($800K–$3M+) offers two Arnold Palmer courses at a more accessible luxury price point, making it ideal for buyers who want guard-gated golf living without ultra-luxury pricing."
  }
]

export default function RedRockCountryClubFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Red Rock Country Club</h2>
          <p>The questions buyers ask most when exploring Red Rock Country Club.</p>
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
