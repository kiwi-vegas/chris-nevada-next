'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is Mountain Trails in The Hills?",
    "a": "Mountain Trails is The Hills' guard-gated enclave featuring larger semi-custom homes on elevated lots with Spring Mountain and Las Vegas Valley views. Homes typically range from 3,000 to 5,500 square feet, and the community has a 24-hour staffed guard gate."
  },
  {
    "q": "What is the price range in The Hills?",
    "a": "Homes in The Hills range from approximately $500,000 in the non-gated neighborhoods to over $900,000 in the Mountain Trails guard-gated enclave."
  },
  {
    "q": "Is The Hills the same as The Hills South?",
    "a": "No — The Hills and The Hills South are separate Summerlin villages. The Hills is in the Summerlin North Association and contains the Mountain Trails guard-gated enclave. The Hills South is in the Summerlin South Association and contains four guard-gated enclaves (Country Club Hills, Eagle Hills, Corte Bella, Tournament Hills)."
  },
  {
    "q": "Is The Hills guard-gated?",
    "a": "The broader Hills village is gated (key-fob access) but not guard-gated. Mountain Trails, the premium enclave within The Hills, is guard-gated with a 24-hour staffed guard gate."
  },
  {
    "q": "What schools serve The Hills?",
    "a": "The Hills is served by CCSD schools including Jydstrup Elementary (7/10), Mannion Middle (7/10), and Palo Verde High School (8/10). Private schools including The Meadows School (A+) are nearby."
  },
  {
    "q": "What are HOA fees in The Hills?",
    "a": "HOA fees in The Hills range from approximately $100 to $250/month for non-gated neighborhoods. Mountain Trails guard-gated fees are higher, approximately $400 to $600/month, covering guard gate staffing and enhanced maintenance."
  },
  {
    "q": "What ZIP code is The Hills in?",
    "a": "The Hills is located primarily in ZIP code 89134 in the Summerlin North area of Las Vegas."
  },
  {
    "q": "How does The Hills compare to The Canyons?",
    "a": "Both are established Summerlin North villages with guard-gated enclaves. The Canyons has five guard-gated options with a broader price range extending to $4M+. The Hills has one guard-gated enclave (Mountain Trails) with a more moderate price ceiling. Both offer strong schools and established character."
  }
]

export default function SummerlinTheHillsFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About The Hills</h2>
          <p>The questions buyers ask most when exploring The Hills.</p>
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
