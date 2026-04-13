'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is Astra at La Madre Peaks?",
    "a": "Astra is the most exclusive section of La Madre Peaks, offering 167 custom home lots ranging from one-third acre to over one acre. Many lots back directly to the Red Rock Canyon National Conservation Area. Custom builders have full architectural freedom within community design guidelines. Lots and completed homes start at approximately $2 million."
  },
  {
    "q": "What is the price range in La Madre Peaks?",
    "a": "Homes in La Madre Peaks range from approximately $800,000 for production luxury homes by Taylor Morrison and Shea Homes to over $5 million for custom estates on premium Astra lots."
  },
  {
    "q": "Is La Madre Peaks guard-gated?",
    "a": "The broader La Madre Peaks village is gated but not guard-gated. Some individual neighborhoods within the village may have enhanced gating. Astra at La Madre Peaks has its own gated entry."
  },
  {
    "q": "Why is La Madre Peaks a good investment?",
    "a": "La Madre Peaks is the last major luxury village in Summerlin. Red Rock Canyon to the west prevents further expansion. Once lots are built out, there will be no new Summerlin luxury inventory at the canyon's edge — creating permanent scarcity that supports long-term appreciation."
  },
  {
    "q": "What builders are in La Madre Peaks?",
    "a": "Active builders include Toll Brothers, Taylor Morrison, Shea Homes, and multiple custom builders on Astra lots. Floor plans range from 2,500 to 8,000+ square feet across production and custom homes."
  },
  {
    "q": "How close is La Madre Peaks to Red Rock Canyon?",
    "a": "La Madre Peaks backs directly to the Red Rock Canyon National Conservation Area boundary. Some Astra lots are adjacent to the canyon. The Red Rock Canyon Scenic Loop is approximately 5 minutes away."
  },
  {
    "q": "What ZIP code is La Madre Peaks in?",
    "a": "La Madre Peaks is located in ZIP code 89138 in the Summerlin West area of Las Vegas. Home prices range from $800K–$5M+."
  },
  {
    "q": "Can I build a custom home in La Madre Peaks?",
    "a": "Yes — the Astra at La Madre Peaks section offers 167 custom home lots where buyers can work with their chosen builder and architect within community design guidelines. This is the primary custom-build opportunity in Summerlin's newest expansion."
  }
]

export default function SummerlinLaMadrePeaksFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About La Madre Peaks</h2>
          <p>The questions buyers ask most when exploring La Madre Peaks.</p>
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
