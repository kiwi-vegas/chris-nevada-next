'use client'
import dynamic from 'next/dynamic'

const CanyonGateCountryClubMap = dynamic(() => import('./CanyonGateCountryClubMap'), { ssr: false })

export default function CanyonGateCountryClubMapWrapper() {
  return <CanyonGateCountryClubMap />
}
