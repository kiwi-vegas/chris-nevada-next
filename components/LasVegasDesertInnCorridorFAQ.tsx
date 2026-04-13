'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range along the Desert Inn Corridor?",
    "a": "Prices vary dramatically by location. Mid-corridor single-family homes start around $300,000, western sections near Summerlin range from $500K to $800K, and luxury condos near the Strip can exceed $1 million."
  },
  {
    "q": "What ZIP codes does the Desert Inn Corridor cover?",
    "a": "The corridor spans multiple ZIP codes including 89109, 89169, 89119, and 89146, stretching from eastern Summerlin through central Las Vegas to the Strip."
  },
  {
    "q": "Is the Desert Inn Corridor good for investment?",
    "a": "Yes. The corridor offers strong investment opportunities at multiple price points. Properties near the Strip benefit from short-term rental demand, while mid-corridor homes offer value-add renovation potential with central location appeal."
  },
  {
    "q": "What is the Wynn Golf Club?",
    "a": "The Wynn Golf Club occupies the former Desert Inn golf course, now a private course associated with the Wynn Resort. It provides a rare green corridor near the Strip and enhances property values in the surrounding area."
  },
  {
    "q": "How walkable is the Desert Inn Corridor?",
    "a": "Walkability varies by section. The eastern end near the Strip and Convention Center is highly walkable with transit options. Western sections are more car-dependent but benefit from extensive commercial corridors."
  },
  {
    "q": "What schools serve the Desert Inn Corridor?",
    "a": "Public schools along the corridor vary in rating. Top private options include Bishop Gorman High School (A+) and The Meadows School (A+). Charter schools like Coral Academy of Science (8/10) provide additional choices."
  },
  {
    "q": "Are there mid-century modern homes on the Desert Inn Corridor?",
    "a": "Yes. The Paradise Palms neighborhood near the corridor features some of the best preserved mid-century modern architecture in Las Vegas, attracting design enthusiasts and renovation buyers."
  },
  {
    "q": "How far is the Desert Inn Corridor from the airport?",
    "a": "The eastern end of the corridor is approximately 15 minutes from Harry Reid International Airport via I-15 South. Western sections are 20-25 minutes depending on traffic."
  }
]

export default function LasVegasDesertInnCorridorFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Desert Inn Corridor</h2>
          <p>The questions buyers ask most when exploring Desert Inn Corridor.</p>
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
