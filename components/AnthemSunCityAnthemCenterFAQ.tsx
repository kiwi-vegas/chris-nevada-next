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
  },
  {
    "q": "What is the age requirement?",
    "a": "Under the Housing for Older Persons Act (HOPA), at least one resident in each household must be 55 years of age or older. Some communities apply an 80/20 rule where 80% of occupied units must have at least one resident 55+."
  },
  {
    "q": "What social activities and clubs are available?",
    "a": "Active adult communities typically offer dozens of organized clubs and activities including golf leagues, tennis groups, fitness classes, card and game groups, cultural excursions, seasonal events, and volunteer opportunities. Most have a dedicated activities director."
  },
  {
    "q": "Are grandchildren allowed to visit or stay?",
    "a": "Yes. Grandchildren and family members of any age can visit and stay temporarily. The age restriction applies to permanent residents, not guests. Each community has specific guest stay policies, typically allowing visits of 30-90 days."
  },
  {
    "q": "What recreational facilities are included?",
    "a": "Typical 55+ communities include fitness centers, swimming pools, spa facilities, tennis and pickleball courts, walking trails, and a main clubhouse with meeting rooms, a restaurant or cafe, and event spaces. Some include golf courses."
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
