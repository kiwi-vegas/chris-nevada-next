import Image from 'next/image'
import Link from 'next/link'

const LV_COMMUNITIES = [
  { name: 'Summerlin', href: '/summerlin/' },
  { name: 'Centennial Hills', href: '/centennial-hills/' },
  { name: 'Henderson / Anthem', href: '/henderson/' },
  { name: 'Southern Highlands', href: '/southern-highlands/' },
  { name: 'Lake Las Vegas', href: '/lake-las-vegas/' },
  { name: 'MacDonald Highlands', href: '/macdonald-highlands/' },
  { name: 'Green Valley Ranch', href: '/green-valley-ranch/' },
  { name: 'Mountains Edge', href: '/mountains-edge/' },
  { name: 'The Lakes', href: '/the-lakes/' },
  { name: 'Desert Shores', href: '/desert-shores/' },
  { name: 'Red Rock Country Club', href: '/red-rock-country-club/' },
  { name: 'North Las Vegas', href: '/north-las-vegas/' },
]

const RENO_COMMUNITIES = [
  { name: 'Reno', href: '/reno/' },
  { name: 'Sparks', href: '/sparks/' },
  { name: 'Spanish Springs', href: '/spanish-springs/' },
  { name: 'Sun Valley', href: '/sun-valley/' },
  { name: 'Incline Village', href: '/incline-village/' },
]

export default function Footer() {
  return (
    <footer>
      <div className="container">

        {/* ── LOGO ROW ──────────────────────────────────────────── */}
        <div className="footer-logos-row">
          <Image src="/logo.png" alt="Nevada Real Estate Group" width={180} height={44} style={{ filter: 'brightness(0) invert(1)' }} />
          <div className="footer-logo-divider" />
          <span className="footer-lpt">lpt Realty</span>
        </div>

        {/* ── 4-COLUMN INFO ─────────────────────────────────────── */}
        <div className="footer-info-grid">
          <div className="footer-col">
            <h4>Our Company</h4>
            <p>Nevada Real Estate Group</p>
            <p>© All Rights Reserved 2026</p>
            <p className="footer-lic">NV Lic. #S.0181401.LLC</p>
          </div>
          <div className="footer-col">
            <h4>Visit Us</h4>
            <p>8945 West Russell Road #170</p>
            <p>Las Vegas, NV, 89148</p>
          </div>
          <div className="footer-col">
            <h4>Contact Us</h4>
            <p>Email: <a href="mailto:chris@reno775.com">chris@reno775.com</a></p>
            <p>Phone: <a href="tel:+17027476419">(702) 747-6419</a></p>
          </div>
          <div className="footer-col">
            <h4>Follow Us</h4>
            <div className="footer-social">
              <a href="https://www.facebook.com/NevadaRealEstateGroupINC/" target="_blank" rel="noreferrer" aria-label="Facebook" className="footer-social-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
              </a>
              <a href="https://www.instagram.com/nreg_lasvegas/" target="_blank" rel="noreferrer" aria-label="Instagram" className="footer-social-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>
              </a>
              <a href="https://www.youtube.com/@nevadarealestate" target="_blank" rel="noreferrer" aria-label="YouTube" className="footer-social-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/></svg>
              </a>
            </div>
          </div>
        </div>

        {/* ── NAV LINKS ─────────────────────────────────────────── */}
        <div className="footer-nav-grid">
          <div className="footer-nav-col">
            <h4>Buyers</h4>
            <ul>
              <li><a href="https://www.nevadarealestategroup.com/work-with-a-realtor/">Work With a Realtor</a></li>
              <li><a href="https://www.nevadarealestategroup.com/property-search/">Browse Homes for Sale</a></li>
              <li><a href="https://www.nevadarealestategroup.com/get-alerts/">Get Listing Alerts</a></li>
              <li><a href="https://www.nevadarealestategroup.com/first-time-home-buyers/">First Time Buyers</a></li>
              <li><a href="https://www.nevadarealestategroup.com/mortgage-calculator/">Mortgage Calculator</a></li>
              <li><a href="https://www.nevadarealestategroup.com/mortgage-pre-approval/">Mortgage Pre-Approval</a></li>
            </ul>
          </div>
          <div className="footer-nav-col">
            <h4>Sell Your Home</h4>
            <ul>
              <li><a href="https://www.nevadarealestategroup.com/free-market-analysis/">Free Market Analysis</a></li>
              <li><a href="https://www.nevadarealestategroup.com/7-day-listing-agreement/">7-Day Listing Agreement</a></li>
              <li><a href="https://www.nevadarealestategroup.com/resources-for-sellers/">Resources for Sellers</a></li>
            </ul>
            <h4 style={{ marginTop: '24px' }}>Company</h4>
            <ul>
              <li><a href="https://www.nevadarealestategroup.com/about/">About Us</a></li>
              <li><Link href="/blog">Blog</Link></li>
              <li><a href="tel:+17252399950">Call 725.239.9950</a></li>
            </ul>
          </div>
          <div className="footer-nav-col">
            <h4>Las Vegas Communities</h4>
            <ul>
              {LV_COMMUNITIES.map(c => (
                <li key={c.name}><Link href={c.href}>{c.name}</Link></li>
              ))}
            </ul>
          </div>
          <div className="footer-nav-col">
            <h4>Reno Communities</h4>
            <ul>
              {RENO_COMMUNITIES.map(c => (
                <li key={c.name}><Link href={c.href}>{c.name}</Link></li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── LEGAL ─────────────────────────────────────────────── */}
        <div className="footer-legal">

          {/* Legal links row */}
          <div className="footer-legal-links">
            <a href="https://search.nevadarealestategroup.net/privacy-policy" target="_blank" rel="noreferrer">Privacy Policy &amp; Terms &amp; Conditions</a>
            <span className="footer-legal-sep">·</span>
            <a href="https://search.nevadarealestategroup.net/privacy-policy" target="_blank" rel="noreferrer">DMCA</a>
          </div>

          {/* GLVAR block */}
          <div className="footer-mls-block">
            <Image src="/las-vegas-realtors.png" alt="Greater Las Vegas Association of REALTORS" width={60} height={32} className="footer-mls-logo" />
            <div>
              <p className="footer-mls-copy">Copyright © 2026 Greater Las Vegas Association of REALTORS®. All Rights Reserved.</p>
              <p className="footer-mls-copy">The information being provided is for personal, non-commercial use and may not be used for any purpose other than to identify prospective properties you may be interested in purchasing. The data related to Real Estate for sale on this website comes in part from the INTERNET DATA EXCHANGE (IDX) program of the Greater Las Vegas Association or REALTORS® MLS. Real Estate listings held by Brokerage firms other than this site owner are marked with the IDX logo. Information Deemed Reliable But Not Guaranteed.</p>
            </div>
          </div>

          {/* Incline Village MLS block */}
          <div className="footer-mls-block">
            <Image src="/reciprocity.gif" alt="Broker Reciprocity" width={60} height={32} className="footer-mls-logo" unoptimized />
            <div>
              <p className="footer-mls-copy">Information provided by Incline Village Multiple Listing Service. All information is deemed reliable but is not guaranteed accurate. This information is provided for consumers&apos; personal, non-commercial use and may not be used for any other purpose.</p>
            </div>
          </div>

          {/* Northern Nevada MLS block */}
          <div className="footer-mls-block">
            <Image src="/reciprocity.gif" alt="Broker Reciprocity" width={60} height={32} className="footer-mls-logo" unoptimized />
            <div>
              <p className="footer-mls-copy">© 2026 Northern Nevada Regional MLS, Inc. All Rights Reserved. The data relating to real estate for sale on this web site comes in part from the Broker Reciprocity Program of the Northern Nevada Regional MLS. Real estate listings held by brokerage firms other than owner of this page are marked with the Broker Reciprocity logo and detailed information about them includes the name of the listing brokers. Information deemed reliable but not guaranteed. The information being provided is for consumers&apos; personal, non-commercial use and may not be used for any other purpose other than to identify prospective properties consumers.</p>
            </div>
          </div>

          {/* SMS consent */}
          <div className="footer-sms">
            <p>By providing your telephone number, you are consenting to allow Nevada Real Estate Group to contact you with informational communications via voice call, AI voice call, and/or text message, or similar automated means for real estate services. To opt out you can reply &apos;stop&apos; at any time, or reply &apos;help&apos; for assistance. Message and data rates may apply. Message frequency may vary. For more information see our <a href="https://search.nevadarealestategroup.net/privacy-policy" target="_blank" rel="noreferrer">Privacy Policy</a>.</p>
          </div>

        </div>

      </div>
    </footer>
  )
}
