import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import YlopoInit from '@/components/YlopoInit'

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav />
      <YlopoInit />
      {children}
      <Footer />
    </>
  )
}
