'use client'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

// Module-level flag — true on the initial hard page load (direct URL, refresh, or
// post-reload). The browser re-executes JS from scratch on every hard load, so this
// resets automatically. It never resets on SPA navigations within the same session.
let isHardLoad = true

export default function YlopoInit() {
  const pathname = usePathname()

  useEffect(() => {
    // On a hard load the YLOPO script (strategy="afterInteractive" in root layout)
    // already ran and initialized any widget divs on the page — nothing to do.
    if (isHardLoad) {
      isHardLoad = false
      return
    }

    // SPA navigation: skip blog and info pages (no YLOPO widgets)
    if (pathname.startsWith('/blog') || pathname.startsWith('/buyers') || pathname.startsWith('/sellers')) return

    // SPA navigation to a community/listing page: the YLOPO script has already run
    // and won't re-scan the DOM for widget divs that weren't there on initial load.
    // A hard reload is the only reliable way to make it re-initialize. We skip the
    // DOM query (the new page may not have committed to the DOM yet at this point).
    window.location.reload()
  }, [pathname])

  return null
}
