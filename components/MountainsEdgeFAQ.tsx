'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for homes in Mountains Edge?",
    "a": "Homes in Mountains Edge typically range from $350,000 for well-maintained resale homes to approximately $650,000 for newer construction with premium features. The sweet spot for most buyers is the $400K to $550K range."
  },
  {
    "q": "Is Mountains Edge a master-planned community?",
    "a": "Yes. Mountains Edge is a 3,500-acre master-planned community developed by Focus Property Group. It features over 12,000 homes, extensive trail networks, dedicated parks, and commercial corridors — one of the largest master plans in the Las Vegas Valley."
  },
  {
    "q": "What ZIP codes are in Mountains Edge?",
    "a": "Mountains Edge is primarily in ZIP codes 89178 and 89141 in southwest Las Vegas, within unincorporated Clark County."
  },
  {
    "q": "What schools serve Mountains Edge?",
    "a": "Mountains Edge is served by several CCSD schools including Carolyn S. Reedom Elementary (8/10), Lawrence & Heidi Canarelli Middle School (7/10), and Sierra Vista High School. Charter options like Doral Academy (9/10) are also nearby."
  },
  {
    "q": "How close is Mountains Edge to Red Rock Canyon?",
    "a": "Mountains Edge is approximately 10 minutes from the Red Rock Canyon scenic loop entrance via Blue Diamond Road. The community's elevated position also provides mountain views from many homes."
  },
  {
    "q": "What are HOA fees in Mountains Edge?",
    "a": "HOA fees in Mountains Edge are relatively low, typically ranging from $50 to $150 per month depending on the specific neighborhood. The master association fee covers common area maintenance, trails, and parks."
  },
  {
    "q": "Is Mountains Edge good for families?",
    "a": "Mountains Edge is one of the most family-friendly communities in the valley. The extensive trail system, multiple parks including the 100-acre Regional Park, top-rated elementary schools, and affordable pricing make it extremely popular with young families."
  },
  {
    "q": "Who built homes in Mountains Edge?",
    "a": "Multiple national builders have contributed to Mountains Edge, including Pulte Homes, KB Home, Pardee Homes, Richmond American, and Beazer Homes. The variety of builders means a wide range of floor plans and price points."
  }
]

export default function MountainsEdgeFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Mountains Edge</h2>
          <p>The questions buyers ask most when exploring Mountains Edge.</p>
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
