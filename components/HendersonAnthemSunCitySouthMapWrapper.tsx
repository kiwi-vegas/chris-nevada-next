'use client'
import dynamic from 'next/dynamic'

const HendersonAnthemSunCitySouthMap = dynamic(() => import('./HendersonAnthemSunCitySouthMap'), { ssr: false })

export default function HendersonAnthemSunCitySouthMapWrapper() {
  return <HendersonAnthemSunCitySouthMap />
}
