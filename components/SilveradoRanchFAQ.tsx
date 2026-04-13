'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for homes in Silverado Ranch?",
    "a": "Homes in Silverado Ranch range from approximately $350,000 for smaller single-story homes to $600,000 for larger upgraded properties on premium lots. The community offers some of the best values in the southern Las Vegas Valley."
  },
  {
    "q": "Is Silverado Ranch in Henderson or Las Vegas?",
    "a": "Silverado Ranch straddles the border of Henderson and unincorporated Clark County (Las Vegas mailing address). Some homes have Henderson addresses while others have Las Vegas addresses, though the community is contiguous."
  },
  {
    "q": "Is Silverado Ranch guard-gated?",
    "a": "No. Silverado Ranch is not a guard-gated community. It is an open community with HOA governance and the convenience of being near both Henderson and Las Vegas police services."
  },
  {
    "q": "What ZIP codes is Silverado Ranch in?",
    "a": "Silverado Ranch spans ZIP codes 89123 and 89183 in the Henderson/Las Vegas area."
  },
  {
    "q": "What are HOA fees in Silverado Ranch?",
    "a": "HOA fees in Silverado Ranch are among the lowest in the valley, typically ranging from $40 to $120 per month. Fees cover common area maintenance and community landscaping."
  },
  {
    "q": "What schools serve Silverado Ranch?",
    "a": "Silverado Ranch is served by CCSD schools including Elise L. Wolff Elementary (6/10), Silvestri Junior High (5/10), and Silverado High School (5/10). Charter options include Doral Academy (9/10) and Somerset Academy (8/10)."
  },
  {
    "q": "Is there a hospital near Silverado Ranch?",
    "a": "Yes. St. Rose Dominican Hospital — Siena Campus is located within the Silverado Ranch community, providing immediate access to emergency care, surgery, and specialty medical services."
  },
  {
    "q": "How far is Silverado Ranch from the Strip?",
    "a": "Silverado Ranch is approximately 15 minutes from the Las Vegas Strip via I-15. Harry Reid International Airport is also about 15 minutes away. The community's central location makes it one of the most convenient in the valley."
  }
]

export default function SilveradoRanchFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Silverado Ranch</h2>
          <p>The questions buyers ask most when exploring Silverado Ranch.</p>
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
