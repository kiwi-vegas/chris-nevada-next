import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Image src="/logo.png" alt="Nevada Real Estate Group" width={160} height={36} />
            <p>Nevada&apos;s #1 Real Estate Team. Serving Las Vegas and Reno with 5,500+ homes sold and 35+ years of local market expertise.</p>
            <div className="footer-social">
              <a href="https://www.facebook.com/NevadaRealEstateGroupINC/" target="_blank" rel="noreferrer">f</a>
              <a href="https://www.instagram.com/nreg_lasvegas/" target="_blank" rel="noreferrer">ig</a>
              <a href="https://www.linkedin.com/in/chrisnevada/" target="_blank" rel="noreferrer">in</a>
              <a href="https://www.zillow.com/profile/NevadaGroup" target="_blank" rel="noreferrer">z</a>
            </div>
          </div>
          <div className="footer-col">
            <h4>Communities</h4>
            <ul>
              <li><Link href="/summerlin/">Summerlin</Link></li>
              <li><a href="#">Henderson / Anthem</a></li>
              <li><a href="#">Lake Las Vegas</a></li>
              <li><a href="#">MacDonald Highlands</a></li>
              <li><a href="#">Southern Highlands</a></li>
              <li><a href="#">Caughlin Ranch, Reno</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Contact</h4>
            <div className="footer-contact-line">
              <a href="tel:+17252399950">725.239.9950</a>
            </div>
            <div className="footer-contact-line">
              8945 W Russell Rd #170<br />Las Vegas, NV 89148
            </div>
            <div className="footer-contact-line" style={{marginTop:'8px', fontSize:'12px'}}>
              Nevada Lic. #S.0181401.LLC
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="footer-bottom-left">
            <p>© 2025 Nevada Real Estate Group · lpt Realty. All rights reserved.</p>
            <p className="footer-mls">Information deemed reliable but not guaranteed. Equal Housing Opportunity. MLS data is for informational purposes only.</p>
          </div>
          <p style={{fontSize:'12px', color:'var(--white-40)'}}>NV Lic. #S.0181401.LLC</p>
        </div>
      </div>
    </footer>
  )
}
