'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for homes near the Anthem Center?",
    "a": "Homes in the Anthem Center area range from approximately $400,000 for interior-lot single-story villas to $700,000 for larger estate homes on premium golf course or view lots."
  },
  {
    "q": "What is the Anthem Center?",
    "a": "The Anthem Center is Sun City Anthem's flagship 50,000-square-foot recreation facility featuring resort-style pools, a fitness center, tennis and pickleball courts, a grand ballroom, arts studios, and meeting rooms for 100+ chartered clubs and organizations."
  },
  {
    "q": "Is Sun City Anthem Center guard-gated?",
    "a": "Sun City Anthem is not guard-gated. The community has controlled access points and neighborhood watch programs, but does not have staffed guard gates."
  },
  {
    "q": "What is the minimum age to live in Sun City Anthem?",
    "a": "Sun City Anthem is a 55+ active adult community. At least one resident in each home must be 55 years of age or older. No permanent residents under 19 are permitted."
  },
  {
    "q": "What are HOA fees in Sun City Anthem Center area?",
    "a": "HOA fees typically range from $200 to $350 per month, which covers access to all three recreation centers, pools, fitness, common area maintenance, and community programming."
  },
  {
    "q": "What golf course is near the Anthem Center?",
    "a": "The Anthem Course is an 18-hole championship golf course that winds through the Sun City Anthem community. It offers preferred rates for residents and is accessible from the Anthem Center area."
  },
  {
    "q": "How many clubs and activities are available?",
    "a": "Sun City Anthem has 100+ chartered clubs and organizations covering everything from pickleball and tennis leagues to art guilds, book clubs, travel groups, card clubs, and community theater. The social calendar is one of the most active in any 55+ community nationwide."
  },
  {
    "q": "How close is the Anthem Center area to shopping?",
    "a": "The Anthem Center area is about 10 minutes from the Green Valley Ranch resort area and the Henderson shopping corridors along Eastern Avenue and St. Rose Parkway."
  }
]

export default function AnthemSunCityAnthemCenterFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Sun City Anthem Center</h2>
          <p>The questions buyers ask most when exploring Sun City Anthem Center.</p>
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
