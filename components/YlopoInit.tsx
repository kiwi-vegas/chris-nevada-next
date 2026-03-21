'use client'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

export default function YlopoInit() {
  const pathname = usePathname()

  useEffect(() => {
    // Give React a tick to finish rendering the widget divs
    const timer = setTimeout(() => {
      const win = window as any

      // Try YLOPO's native re-init method first
      if (win.YlopoWidgets?.init) {
        win.YlopoWidgets.init()
        return
      }
      if (win.YLOPO_WIDGETS?.init) {
        win.YLOPO_WIDGETS.init()
        return
      }

      // Fallback: remove and re-inject the script so it re-scans the DOM
      const existing = document.querySelector('script[src*="widgets-1.0.0"]')
      if (existing) existing.remove()

      const script = document.createElement('script')
      script.src = 'https://search.nevadarealestategroup.net/build/js/widgets-1.0.0.js'
      script.async = true
      document.body.appendChild(script)
    }, 150)

    return () => clearTimeout(timer)
  }, [pathname])

  return null
}
