'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is Enterprise, Las Vegas?",
    "a": "Enterprise is an unincorporated town within Clark County, covering approximately 42 square miles in the southwest Las Vegas Valley. Established in 2003, it encompasses major communities like Southern Highlands, Mountains Edge, and Rhodes Ranch, along with many standalone neighborhoods."
  },
  {
    "q": "What is the price range for homes in Enterprise?",
    "a": "Homes in Enterprise typically range from $350,000 to $700,000, with the majority of single-family homes in the $400K–$550K range. Guard-gated communities within Enterprise like Southern Highlands extend well beyond this range."
  },
  {
    "q": "What ZIP codes are in Enterprise?",
    "a": "Enterprise spans multiple ZIP codes including 89113, 89139, 89141, 89178, and 89148. The boundaries overlap with several named communities."
  },
  {
    "q": "Is Enterprise a city?",
    "a": "No. Enterprise is an unincorporated town within Clark County, not a separate city. Residents receive county services rather than city services. This results in slightly different tax rates and service structures compared to incorporated cities like Henderson or North Las Vegas."
  },
  {
    "q": "What schools serve Enterprise?",
    "a": "Enterprise is served by CCSD schools including Carolyn S. Reedom Elementary (8/10), Canarelli Middle (7/10), and Sierra Vista High School. Bishop Gorman High School (A+) and Doral Academy (9/10) are nearby private and charter options."
  },
  {
    "q": "Is Enterprise a good area for families?",
    "a": "Enterprise is extremely popular with families due to newer construction, multiple master-planned communities with parks and trails, relatively affordable pricing, and good school options. Mountains Edge in particular is one of the valley's most family-oriented communities."
  },
  {
    "q": "How far is Enterprise from the Strip?",
    "a": "Enterprise is approximately 15 minutes from the Las Vegas Strip via I-15 North. Harry Reid International Airport is about 20 minutes away."
  },
  {
    "q": "Is there new construction in Enterprise?",
    "a": "Yes. Enterprise has some of the most active new construction in the Las Vegas Valley. National builders are developing new subdivisions throughout the southern portions of the area, with new homes typically priced from the high $300s to mid $600s."
  }
]

export default function EnterpriseFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Enterprise</h2>
          <p>The questions buyers ask most when exploring Enterprise.</p>
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
