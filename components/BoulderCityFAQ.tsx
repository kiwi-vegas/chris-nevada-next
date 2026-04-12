'use client'
import { useState } from 'react'

const FAQS = [
  {
    q: 'Is gambling really illegal in Boulder City?',
    a: "Yes \u2014 Boulder City is one of only two cities in Nevada where gambling is prohibited. The city has maintained this ordinance since its founding in 1931. It\u2019s part of what gives Boulder City its quiet, small-town character that is completely different from the rest of the Las Vegas metro.",
  },
  {
    q: 'What are home prices like in Boulder City?',
    a: "Boulder City\u2019s limited housing supply due to strict growth control ordinances supports strong property values. Single-family homes generally range from $400K to $800K+, with a median around $525K. Custom homes on larger lots and properties with lake or mountain views can exceed $1M. The limited inventory means homes tend to hold value well.",
  },
  {
    q: 'How far is Boulder City from the Las Vegas Strip?',
    a: "About 25 miles southeast \u2014 roughly 25 minutes via the I-11 corridor and I-515. Henderson is about 20 minutes away, and Harry Reid International Airport is approximately 15 minutes via I-11. You\u2019re close enough to work in Las Vegas but far enough to enjoy genuine small-town living.",
  },
  {
    q: 'What is there to do in Boulder City?',
    a: "The historic downtown along Nevada Highway is the heart of the community \u2014 antique shops, art galleries, breweries, restaurants, and seasonal events like Art in the Park (one of the largest outdoor art festivals in the Southwest). Lake Mead is 10 minutes away for boating, kayaking, and fishing. The Hoover Dam is 15 minutes east. The River Mountains Loop Trail (34 miles of paved trail) runs right through town for cycling and running.",
  },
  {
    q: 'What are the growth control ordinances?',
    a: "Boulder City has some of the strictest growth control measures in Nevada. The city limits how much new development can be built each year, which keeps the population stable around 16,000 residents and preserves the small-town character. For buyers, this means limited new housing supply \u2014 which supports property values but also means inventory is tighter than in master-planned communities.",
  },
  {
    q: 'Are there good schools in Boulder City?',
    a: "Boulder City has its own dedicated CCSD schools including Andrew J. Mitchell Elementary, Elise L. Wolff Elementary, Garrett Junior High, and Boulder City High School. The smaller school populations and strong community involvement create an environment that many families prefer over the larger Las Vegas schools. Boulder City High School\u2019s athletics programs are well-regarded.",
  },
  {
    q: 'What makes Boulder City different from the rest of the Las Vegas metro?',
    a: "Everything. No casinos, no strip malls, no cookie-cutter subdivisions. Boulder City feels like a small Nevada town from another era \u2014 walkable downtown, established trees, historic architecture, and a tight-knit community of about 16,000 people. Add in the fact that Lake Mead and the Hoover Dam are essentially in your backyard, and you get a lifestyle that doesn\u2019t exist anywhere else in the valley.",
  },
]

export default function BoulderCityFAQ() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Common Questions</span>
          <h2>Boulder City Home Buyer FAQ</h2>
          <p>The questions I hear most from buyers exploring Boulder City.</p>
        </div>
        <div className="faq-list">
          {FAQS.map((faq, i) => (
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
