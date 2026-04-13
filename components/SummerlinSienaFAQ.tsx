'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the age requirement for Siena?",
    "a": "Siena is a 55+ community. At least one resident in each household must be 55 years of age or older. Some homes may allow residents under 55 subject to community rules, but the primary occupant must meet the age requirement."
  },
  {
    "q": "Is Siena guard-gated?",
    "a": "Yes — Siena is a guard-gated community with a 24-hour staffed guard gate. Sun Colony at Siena, the premium section, has an additional secondary guard gate for added privacy."
  },
  {
    "q": "What amenities does Siena offer?",
    "a": "Siena features a 30,000-square-foot clubhouse with indoor and outdoor pools, fitness center, tennis and pickleball courts, card rooms, art studios, a demonstration kitchen, and a full calendar of social clubs and organized activities."
  },
  {
    "q": "What is the price range in Siena?",
    "a": "Homes in Siena range from approximately $400,000 for smaller patio homes to over $900,000 for the larger premium models in Sun Colony at Siena."
  },
  {
    "q": "How does Siena compare to Sun City Summerlin?",
    "a": "Sun City Summerlin is much larger (7,700+ homes vs. 1,200+) with its own golf courses but is not guard-gated. Siena is smaller, more intimate, and offers guard-gated security with a more upscale feel. Siena's homes are generally newer and more contemporary."
  },
  {
    "q": "What are HOA fees in Siena?",
    "a": "HOA fees in Siena range from approximately $200 to $450 per month depending on the section. Fees include guard gate staffing, front-yard landscaping, exterior painting, common area maintenance, and full clubhouse access."
  },
  {
    "q": "Does the HOA maintain the front yard?",
    "a": "Yes — Siena's HOA maintains all front-yard landscaping and handles exterior painting on a scheduled rotation. This is one of the community's most popular features for active adults."
  },
  {
    "q": "What is Sun Colony at Siena?",
    "a": "Sun Colony at Siena is the most upscale section of Siena, featuring larger floor plans (2,200–3,200+ sq ft), premium finishes, and its own secondary guard gate. It was the last phase developed and commands the highest prices in the community."
  },
  {
    "q": "How does the guard gate entry process work?",
    "a": "Residents receive transponders or access codes for automatic entry. Guests must be called in by the homeowner or added to a pre-approved list. Delivery drivers and service providers follow the community's vendor access policy. Most guard-gated communities staff the gate 24 hours a day, 7 days a week."
  },
  {
    "q": "Can non-residents access the community for viewings?",
    "a": "Yes. Prospective buyers can access the community with a licensed real estate agent who coordinates entry with the guard gate in advance. Nevada Real Estate Group handles all gate access arrangements for property showings."
  },
  {
    "q": "What security features are included beyond the guard gate?",
    "a": "Most guard-gated communities include perimeter walls, security patrols, surveillance cameras at entry points, and emergency response coordination. Some communities also offer interior patrol routes and resident notification systems."
  }
]

export default function SummerlinSienaFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Siena</h2>
          <p>The questions buyers ask most when exploring Siena.</p>
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
