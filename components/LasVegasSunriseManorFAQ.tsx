'use client'
import { useState } from 'react'

const FAQS = [
  {
    "q": "What is the price range for homes in Sunrise Manor?",
    "a": "Homes in Sunrise Manor range from approximately $200,000 for older homes in the western sections to $400,000 or more for newer construction near Sunrise Mountain."
  },
  {
    "q": "Is Sunrise Manor part of Las Vegas?",
    "a": "Sunrise Manor is an unincorporated community in Clark County. While it uses Las Vegas mailing addresses, it is not part of the City of Las Vegas. County services are provided by Clark County."
  },
  {
    "q": "What ZIP codes are in Sunrise Manor?",
    "a": "Sunrise Manor spans multiple ZIP codes including 89110, 89115, 89156, and 89142 in the eastern Las Vegas Valley."
  },
  {
    "q": "Is Sunrise Manor near Nellis Air Force Base?",
    "a": "Yes. Sunrise Manor is adjacent to Nellis Air Force Base, which provides a steady demand for housing from military families and personnel."
  },
  {
    "q": "Is Sunrise Manor a good investment?",
    "a": "Sunrise Manor offers some of the highest cap rates in the Las Vegas Valley for rental investors. Affordable entry prices, steady military rental demand, and improving infrastructure create a compelling investment case."
  },
  {
    "q": "What schools serve Sunrise Manor?",
    "a": "Sunrise Manor is served by CCSD schools including Chaparral High School and several elementary and middle schools. Charter schools like Mater Academy (7/10) provide additional options."
  },
  {
    "q": "How far is Sunrise Manor from the Strip?",
    "a": "Sunrise Manor is approximately 15 minutes from the Las Vegas Strip via Lake Mead Boulevard and I-15, depending on which part of the community you're in."
  },
  {
    "q": "Is Sunrise Manor growing?",
    "a": "Yes. Clark County continues to invest in infrastructure improvements throughout Sunrise Manor, and newer developments in the eastern sections are attracting families and professionals seeking affordable housing."
  },
  {
    "q": "What are the best sub-neighborhoods within Sunrise Manor?",
    "a": "The best sub-neighborhood depends on your priorities — school zones, lot size, home age, and proximity to amenities all vary within the community. Nevada Real Estate Group agents who specialize in Sunrise Manor can walk you through the specific blocks and streets that match your criteria."
  },
  {
    "q": "How is new construction availability in Sunrise Manor?",
    "a": "New construction availability varies by season and builder phase. Some sections of Sunrise Manor have active new home sales while others are fully built out with resale-only inventory. Contact Nevada Real Estate Group for the most current new construction options."
  }
]

export default function LasVegasSunriseManorFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Frequently Asked Questions About Sunrise Manor</h2>
          <p>The questions buyers ask most when exploring Sunrise Manor.</p>
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
