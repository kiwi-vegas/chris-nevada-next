'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({})

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const toggleGroup = (key: string) =>
    setOpenGroups(prev => ({ ...prev, [key]: !prev[key] }))

  const closeMobile = () => {
    setMobileOpen(false)
    setOpenGroups({})
  }

  return (
    <>
      <nav id="nav" className={scrolled ? 'scrolled' : ''}>
        <div className="nav-inner">
          <Link href="/" className="nav-logo">
            <Image src="/logo.png" alt="Nevada Real Estate Group" width={160} height={40} priority />
          </Link>

          <ul className="nav-links">
            <li className="nav-item">
              <button className="nav-trigger">
                Buyers
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9l6 6 6-6"/></svg>
              </button>
              <div className="nav-dropdown">
                <a href="https://www.nevadarealestategroup.com/work-with-a-realtor/">Work With a Realtor</a>
                <a href="https://www.nevadarealestategroup.com/property-search/">Browse Homes for Sale</a>
                <a href="https://www.nevadarealestategroup.com/get-alerts/">Get Alerts</a>
                <hr />
                <a href="https://www.nevadarealestategroup.com/first-time-home-buyers/">First Time Home Buyers</a>
                <a href="https://www.nevadarealestategroup.com/mortgage-calculator/">Mortgage Calculator</a>
                <a href="https://www.nevadarealestategroup.com/mortgage-pre-approval/">Mortgage Pre-Approval</a>
              </div>
            </li>
            <li className="nav-item">
              <button className="nav-trigger">
                Sell Your Home
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9l6 6 6-6"/></svg>
              </button>
              <div className="nav-dropdown">
                <a href="https://www.nevadarealestategroup.com/free-market-analysis/">Free Market Analysis</a>
                <a href="https://www.nevadarealestategroup.com/7-day-listing-agreement/">7-Day Listing Agreement</a>
                <hr />
                <a href="https://www.nevadarealestategroup.com/resources-for-sellers/">Resources for Sellers</a>
              </div>
            </li>
            <li className="nav-item communities-trigger">
              <button className="nav-trigger">
                Communities
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9l6 6 6-6"/></svg>
              </button>
              <div className="communities-panel-nav">
                <div>
                  <div className="comm-col-label">Las Vegas</div>
                  <Link href="/summerlin/" style={{color:'var(--gold)'}}>Summerlin</Link>
                  <a href="#">Centennial Hills</a>
                  <a href="#">Henderson / Anthem</a>
                  <a href="#">Southern Highlands</a>
                  <a href="#">Lake Las Vegas</a>
                  <a href="#">MacDonald Highlands</a>
                  <a href="#">Green Valley Ranch</a>
                  <a href="#">Mountains Edge</a>
                </div>
                <div>
                  <div className="comm-col-label">Reno</div>
                  <a href="#">Damonte Ranch</a>
                  <a href="#">Double Diamond</a>
                  <a href="#">Somersett</a>
                  <a href="#">Caughlin Ranch</a>
                  <a href="#">ArrowCreek</a>
                  <a href="#">Spanish Springs</a>
                  <a href="#">Incline Village</a>
                  <a href="#">South Reno</a>
                </div>
              </div>
            </li>
            <li className="nav-item"><a href="https://www.nevadarealestategroup.com/blog/" className="nav-link">Blog</a></li>
            <li className="nav-item"><a href="https://www.nevadarealestategroup.com/about/" className="nav-link">About Us</a></li>
          </ul>

          <div className="nav-cta">
            <a href="tel:+17252399950" className="btn-nav">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 11.5 19.79 19.79 0 01.12 2.74 2 2 0 012.11 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.09a16 16 0 006 6l.46-.46a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92v2z"/></svg>
              725.239.9950
            </a>
          </div>

          <button className="nav-hamburger" onClick={() => setMobileOpen(!mobileOpen)}>
            <span></span><span></span><span></span>
          </button>
        </div>
      </nav>

      <div className={`nav-mobile${mobileOpen ? ' open' : ''}`}>
        {['Buyers','Sell Your Home','Communities'].map(group => (
          <div key={group}>
            <button className={`mob-group-toggle${openGroups[group] ? ' open' : ''}`} onClick={() => toggleGroup(group)}>
              {group}
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9l6 6 6-6"/></svg>
            </button>
            <div className={`mob-submenu${openGroups[group] ? ' open' : ''}`}>
              {group === 'Buyers' && <>
                <a href="https://www.nevadarealestategroup.com/work-with-a-realtor/" className="mobile-nav-link" onClick={closeMobile}>Work With a Realtor</a>
                <a href="https://www.nevadarealestategroup.com/property-search/" className="mobile-nav-link" onClick={closeMobile}>Browse Homes</a>
                <a href="https://www.nevadarealestategroup.com/mortgage-calculator/" className="mobile-nav-link" onClick={closeMobile}>Mortgage Calculator</a>
              </>}
              {group === 'Sell Your Home' && <>
                <a href="https://www.nevadarealestategroup.com/free-market-analysis/" className="mobile-nav-link" onClick={closeMobile}>Free Market Analysis</a>
                <a href="https://www.nevadarealestategroup.com/7-day-listing-agreement/" className="mobile-nav-link" onClick={closeMobile}>7-Day Listing</a>
              </>}
              {group === 'Communities' && <>
                <div className="mob-city-label">Las Vegas</div>
                <Link href="/summerlin/" className="mobile-nav-link" onClick={closeMobile}>Summerlin</Link>
                <a href="#" className="mobile-nav-link" onClick={closeMobile}>Centennial Hills</a>
                <a href="#" className="mobile-nav-link" onClick={closeMobile}>Henderson / Anthem</a>
                <div className="mob-city-label" style={{marginTop:'8px'}}>Reno</div>
                <a href="#" className="mobile-nav-link" onClick={closeMobile}>Damonte Ranch</a>
                <a href="#" className="mobile-nav-link" onClick={closeMobile}>Somersett</a>
              </>}
            </div>
          </div>
        ))}
        <a href="https://www.nevadarealestategroup.com/blog/" className="mobile-nav-link" onClick={closeMobile}>Blog</a>
        <a href="https://www.nevadarealestategroup.com/about/" className="mobile-nav-link" onClick={closeMobile}>About Us</a>
        <div className="mob-cta">
          <a href="tel:+17252399950" className="btn-nav">Call 725.239.9950</a>
        </div>
      </div>
    </>
  )
}
