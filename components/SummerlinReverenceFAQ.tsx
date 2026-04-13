'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for homes in Reverence?",
    "a": "Homes in Reverence range from approximately $600,000 for single-story ranch plans to $1.5 million for larger estate-style homes on premium lots with mountain views."
  },
  {
    "q": "Who builds homes in Reverence?",
    "a": "All homes in Reverence are built by Pulte Homes, a nationally recognized builder known for innovative floor plans and energy-efficient construction. Pulte offers multiple collections within the community."
  },
  {
    "q": "What amenities does Reverence have?",
    "a": "Reverence features a private residents' club with a resort-style pool, cabanas, fitness center, fire pit lounges, bocce ball courts, and event lawns. The community also has an extensive trail system connecting to Summerlin's broader network."
  },
  {
    "q": "Is Reverence guard-gated?",
    "a": "No. Reverence is not guard-gated. It is an open-access village within Summerlin West that relies on community design, Summerlin patrols, and a strong HOA for security and neighborhood standards."
  },
  {
    "q": "What ZIP code is Reverence in?",
    "a": "Reverence is located in ZIP code 89166 in the Summerlin West area of Las Vegas. Home prices range from $600K–$1.5M."
  },
  {
    "q": "What schools serve Reverence?",
    "a": "Reverence is served by CCSD schools including Bonner Elementary (9/10), Sig Rogich Middle School (10/10), and Arbor View High School (7/10). Private options include The Meadows School (A+) and Bishop Gorman High School (A+)."
  },
  {
    "q": "Does Reverence have mountain views?",
    "a": "Yes. Reverence's elevated position in Summerlin West provides views of the Spring Mountains and Red Rock Canyon from many homesites, community trails, and the residents' club. Western-facing premium lots have the best views."
  },
  {
    "q": "How far is Reverence from Red Rock Canyon?",
    "a": "Reverence is approximately 8 minutes from Red Rock Canyon's scenic loop entrance via West Charleston Boulevard. Hiking trails are accessible directly from the community's trail system."
  }
]

export default function SummerlinReverenceFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Reverence</h2>
          <p>The questions buyers ask most when exploring Reverence.</p>
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
