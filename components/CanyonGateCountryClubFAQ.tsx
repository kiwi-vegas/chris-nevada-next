'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for homes at Canyon Gate Country Club?",
    "a": "Homes at Canyon Gate range from approximately $700,000 for attached patio homes and well-maintained resale properties to over $2 million for premium golf course-front estates with updated interiors."
  },
  {
    "q": "Is Canyon Gate Country Club guard-gated?",
    "a": "Yes. Canyon Gate is a fully guard-gated community with a 24-hour staffed guard gate, controlled vehicular access, and security patrols throughout the 350-acre property."
  },
  {
    "q": "Who designed the golf course at Canyon Gate?",
    "a": "The 18-hole championship course at Canyon Gate was designed by Ted Robinson, known for his creative use of water features and strategic course layouts. The course features mature tree-lined fairways and multiple water hazards."
  },
  {
    "q": "Do I have to join the country club to live at Canyon Gate?",
    "a": "No. Country club membership is available but not required for homeownership. Canyon Gate Country Club offers golf membership, social membership, and dining membership tiers to accommodate different lifestyles and budgets."
  },
  {
    "q": "What are HOA fees at Canyon Gate Country Club?",
    "a": "HOA fees at Canyon Gate typically range from $250 to $600 per month depending on property type. Fees cover guard gate staffing, security, common area maintenance, and community infrastructure."
  },
  {
    "q": "What ZIP code is Canyon Gate Country Club in?",
    "a": "Canyon Gate Country Club is located in ZIP code 89117 in west Las Vegas."
  },
  {
    "q": "How does Canyon Gate compare to Spanish Trail?",
    "a": "Both are established guard-gated golf communities in west Las Vegas. Canyon Gate has an 18-hole course (vs. Spanish Trail's 27 holes), a slightly newer development era (1989 vs. 1984), and a comparable price range. Spanish Trail is larger (640 acres vs. 350 acres) with more homes."
  },
  {
    "q": "What schools serve Canyon Gate Country Club?",
    "a": "Canyon Gate is served by CCSD schools including Red Rock Elementary, Becker Middle School, and Cimarron-Memorial High School. Many families opt for highly rated private schools like The Meadows School (A+) and Bishop Gorman (A+)."
  }
]

export default function CanyonGateCountryClubFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Canyon Gate Country Club</h2>
          <p>The questions buyers ask most when exploring Canyon Gate Country Club.</p>
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
