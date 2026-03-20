import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'

export const metadata: Metadata = {
  title: 'Nevada Real Estate Group | Las Vegas & Reno Homes For Sale | Chris Nevada',
  description: 'Nevada Real Estate Group — Your premier Las Vegas and Reno real estate experts. Search homes for sale in Summerlin, Henderson, and all Nevada communities. Call 725.239.9950.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@700;800;900&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        {children}
        <Script id="ylopo-config" strategy="beforeInteractive">
          {`window.YLOPO_WIDGETS = {"domain": "search.nevadarealestategroup.net"}`}
        </Script>
        <Script
          src="https://search.nevadarealestategroup.net/build/js/widgets-1.0.0.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  )
}
