'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for homes in Boulder City?",
    "a": "Homes in Boulder City range from approximately $400,000 for established homes in older neighborhoods to over $1 million for custom properties with mountain views or Lake Mead proximity."
  },
  {
    "q": "Is gambling legal in Boulder City?",
    "a": "No. Boulder City is the only city in Nevada where gambling is prohibited. This was established when the city was founded in 1931 and has been maintained ever since, creating a distinctly different atmosphere from the rest of the valley."
  },
  {
    "q": "Why are there so few new homes in Boulder City?",
    "a": "Boulder City maintains a controlled-growth ordinance that strictly limits new development. This preserves the small-town character and permanently constrains housing supply, which supports property values."
  },
  {
    "q": "What ZIP code is Boulder City in?",
    "a": "Boulder City is in ZIP code 89005. Home prices range from $400K–$1M+."
  },
  {
    "q": "How close is Boulder City to Lake Mead?",
    "a": "Boulder City is approximately 10 minutes from Lake Mead Marina and the Hemenway Harbor area. Lake Mead National Recreation Area — the largest reservoir in the United States — is immediately adjacent to the city."
  },
  {
    "q": "What outdoor recreation is near Boulder City?",
    "a": "Boulder City offers world-class outdoor recreation: Lake Mead (boating, fishing, kayaking), Bootleg Canyon (mountain biking, zip lines), River Mountains Loop Trail (34-mile paved trail), Historic Railroad Trail, and the Hoover Dam."
  },
  {
    "q": "What schools serve Boulder City?",
    "a": "Boulder City has its own CCSD schools including Andrew J. Mitchell Elementary (7/10), Garrett Middle School (7/10), and Boulder City High School (7/10). The compact town means short school commutes for all families."
  },
  {
    "q": "How far is Boulder City from the Strip?",
    "a": "Boulder City is approximately 30 minutes from the Las Vegas Strip via I-11 and I-215. Harry Reid International Airport is about 35 minutes away."
  },
  {
    "q": "What are the best sub-neighborhoods within Boulder City?",
    "a": "The best sub-neighborhood depends on your priorities — school zones, lot size, home age, and proximity to amenities all vary within the community. Nevada Real Estate Group agents who specialize in Boulder City can walk you through the specific blocks and streets that match your criteria."
  },
  {
    "q": "How is new construction availability in Boulder City?",
    "a": "New construction availability varies by season and builder phase. Some sections of Boulder City have active new home sales while others are fully built out with resale-only inventory. Contact Nevada Real Estate Group for the most current new construction options."
  }
]

export default function BoulderCityFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Boulder City</h2>
          <p>The questions buyers ask most when exploring Boulder City.</p>
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
