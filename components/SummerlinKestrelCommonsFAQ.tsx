'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range in Kestrel Commons?",
    "a": "Homes in Kestrel Commons range from approximately $450,000 for townhomes and attached products to around $900,000 for larger single-family homes on premium lots."
  },
  {
    "q": "Does Kestrel Commons have townhomes?",
    "a": "Yes — Kestrel Commons offers modern townhomes starting in the $450Ks alongside single-family homes, making it one of the most diverse product offerings in Summerlin West."
  },
  {
    "q": "Is Kestrel Commons guard-gated?",
    "a": "No — Kestrel Commons is not guard-gated. For guard-gated options in Summerlin West, Grand Park is nearby."
  },
  {
    "q": "What ZIP code is Kestrel Commons in?",
    "a": "Kestrel Commons is located in ZIP code 89138 in the Summerlin West area of Las Vegas."
  },
  {
    "q": "What schools serve Kestrel Commons?",
    "a": "Kestrel Commons is served by CCSD schools including Kesterson Elementary (8/10), Rogich Middle (10/10), and Arbor View High School (7/10). Private options including The Meadows School (A+) are nearby."
  },
  {
    "q": "What are HOA fees in Kestrel Commons?",
    "a": "HOA fees in Kestrel Commons range from approximately $150 to $325 per month, including the Summerlin master association fee plus the village sub-association fee."
  },
  {
    "q": "How does Kestrel Commons compare to Kestrel?",
    "a": "Both are new-construction Summerlin West villages. Kestrel focuses on single-family homes from $500K–$800K. Kestrel Commons offers a broader mix — townhomes from $450K and single-family homes up to $900K — providing more entry-level and move-up options."
  },
  {
    "q": "Is Kestrel Commons still building?",
    "a": "Yes — Kestrel Commons is an actively developing village with new construction available from multiple builders. Buyers can purchase new homes and customize finishes."
  }
]

export default function SummerlinKestrelCommonsFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Kestrel Commons</h2>
          <p>The questions buyers ask most when exploring Kestrel Commons.</p>
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
