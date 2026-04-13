'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for homes in Grand Park?",
    "a": "Grand Park offers a wide range of housing options from approximately $400,000 for entry-level new construction up to over $3 million in guard-gated luxury enclaves like Carlisle Peak and Glenrock."
  },
  {
    "q": "How many sub-communities are in Grand Park?",
    "a": "Grand Park encompasses 13 distinct sub-communities at full build-out, each with its own builder, architectural style, and price point. This makes it the largest and most diverse village in Summerlin."
  },
  {
    "q": "Is Grand Park part of Summerlin?",
    "a": "Yes. Grand Park is a village within Summerlin's West Association, the newest section of the master-planned community. Residents have full access to all Summerlin amenities, trails, parks, and community centers."
  },
  {
    "q": "Are there guard-gated neighborhoods in Grand Park?",
    "a": "Yes. Carlisle Peak and Glenrock are guard-gated luxury neighborhoods within Grand Park, offering semi-custom homes from approximately $1.5 million to over $2 million."
  },
  {
    "q": "What builders are in Grand Park?",
    "a": "Grand Park features homes from multiple national and regional builders including Toll Brothers, Lennar, Pulte Homes, KB Home, Taylor Morrison, and others. New builders and communities are added as the village expands."
  },
  {
    "q": "What ZIP code is Grand Park in?",
    "a": "Grand Park spans ZIP codes 89166 and 89138, located in the western portion of the Las Vegas Valley within Summerlin."
  },
  {
    "q": "What schools serve Grand Park?",
    "a": "Grand Park is served by top-rated CCSD schools including Bonner Elementary (9/10) and Sig Rogich Middle School (10/10). New schools are planned within the village as development continues. Private options include The Meadows School and Bishop Gorman."
  },
  {
    "q": "When will Grand Park be fully built out?",
    "a": "Grand Park is expected to continue active construction through the end of the decade. As Summerlin's primary growth area, new sub-communities, parks, and amenities are being added on an ongoing basis."
  }
]

export default function SummerlinGrandParkFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Grand Park</h2>
          <p>The questions buyers ask most when exploring Grand Park.</p>
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
