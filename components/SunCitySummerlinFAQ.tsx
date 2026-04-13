'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the age requirement for Sun City Summerlin?",
    "a": "Sun City Summerlin is a 55+ active adult community. At least one resident in the household must be 55 years of age or older. No permanent residents under the age of 19 are permitted."
  },
  {
    "q": "How many homes are in Sun City Summerlin?",
    "a": "Sun City Summerlin has 7,779 homes spread across approximately 2,400 acres. It is one of the largest 55+ active adult communities in the western United States."
  },
  {
    "q": "What is the price range for homes in Sun City Summerlin?",
    "a": "Homes range from approximately $300,000 for well-maintained two-bedroom villas to $700,000 or more for larger estate-style homes on premium lots with golf course or mountain views."
  },
  {
    "q": "How many golf courses are in Sun City Summerlin?",
    "a": "Sun City Summerlin has three golf courses: Highland Falls Golf Club, Palm Valley Golf Club, and Eagle Crest Golf Club, providing 54 holes of golf within the community."
  },
  {
    "q": "What are HOA fees at Sun City Summerlin?",
    "a": "HOA fees at Sun City Summerlin typically range from $150 to $300 per month, covering access to all four recreation centers, pools, fitness facilities, clubs, and common area maintenance. This is competitively priced compared to similar 55+ communities."
  },
  {
    "q": "Are all homes in Sun City Summerlin single-story?",
    "a": "Yes. All 7,779 homes in Sun City Summerlin are single-story, designed for comfort and accessibility. Floor plans range from approximately 1,100 square feet for smaller villas to 2,800+ square feet for estate-style homes."
  },
  {
    "q": "What recreation centers does Sun City Summerlin have?",
    "a": "Sun City Summerlin has four recreation centers: Mountain Shadows, Desert Vista, Sun Shadows, and Pinnacle. Together they provide over 120,000 square feet of pools, fitness, ballrooms, studios, and social spaces."
  },
  {
    "q": "What ZIP codes is Sun City Summerlin in?",
    "a": "Sun City Summerlin spans ZIP codes 89134 and 89144 in the Summerlin area of Las Vegas."
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

export default function SunCitySummerlinFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Sun City Summerlin</h2>
          <p>The questions buyers ask most when exploring Sun City Summerlin.</p>
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
