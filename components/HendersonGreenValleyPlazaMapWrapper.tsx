'use client'
import dynamic from 'next/dynamic'

const HendersonGreenValleyPlazaMap = dynamic(() => import('./HendersonGreenValleyPlazaMap'), { ssr: false })

export default function HendersonGreenValleyPlazaMapWrapper() {
  return <HendersonGreenValleyPlazaMap />
}
