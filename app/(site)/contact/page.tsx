import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us | Nevada Real Estate Group | Las Vegas',
  description: 'Contact Nevada Real Estate Group for expert Las Vegas real estate guidance. Call 725.239.9950 or visit us at 8945 W Russell Rd, Suite 170, Las Vegas, NV 89148.',
}

export default function ContactPage() {
  return (
    <main>
      <div className="breadcrumb">
        <div className="breadcrumb-inner">
          <a href="/">Home</a>
          <span className="breadcrumb-sep">&rsaquo;</span>
          <span>Contact Us</span>
        </div>
      </div>

      <section className="contact-page">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-info">
              <span className="section-label">Get in Touch</span>
              <h1>Contact Nevada Real Estate Group</h1>
              <p className="contact-intro">Whether you&apos;re buying, selling, or investing in Las Vegas real estate, our team is here to help. Reach out and we&apos;ll connect you with the right specialist for your needs.</p>

              <div className="contact-details">
                <div className="contact-detail">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  <div>
                    <strong>Office</strong>
                    <p>8945 W Russell Rd<br />Suite 170<br />Las Vegas, NV 89148</p>
                  </div>
                </div>
                <div className="contact-detail">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 11.5 19.79 19.79 0 01.12 2.74 2 2 0 012.11 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.09a16 16 0 006 6l.46-.46a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92v2z"/></svg>
                  <div>
                    <strong>Phone</strong>
                    <p><a href="tel:+17252399950">725.239.9950</a></p>
                  </div>
                </div>
                <div className="contact-detail">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  <div>
                    <strong>Email</strong>
                    <p><a href="mailto:info@nevadagroup.com">info@nevadagroup.com</a></p>
                  </div>
                </div>
              </div>

              <div className="contact-agent">
                <p>Chris Nevada &middot; S.181401<br />Owner, Nevada Real Estate Group - LPT Realty</p>
              </div>
            </div>

            <div className="contact-form-card">
              <h2>Send Us a Message</h2>
              <form action="https://formsubmit.co/info@nevadagroup.com" method="POST">
                <input type="text" name="name" placeholder="Your Name" required className="contact-input" />
                <input type="email" name="email" placeholder="Email Address" required className="contact-input" />
                <input type="tel" name="phone" placeholder="Phone Number" className="contact-input" />
                <select name="interest" className="contact-input">
                  <option value="">I&apos;m interested in...</option>
                  <option value="buying">Buying a Home</option>
                  <option value="selling">Selling a Home</option>
                  <option value="cash-offer">Getting a Cash Offer</option>
                  <option value="investing">Real Estate Investing</option>
                  <option value="other">Something Else</option>
                </select>
                <textarea name="message" placeholder="Your Message" rows={4} className="contact-input contact-textarea" />
                <input type="hidden" name="_subject" value="New Contact from LasVegasHomeSearchExperts.com" />
                <input type="hidden" name="_captcha" value="false" />
                <button type="submit" className="btn-gold contact-submit">Send Message</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
