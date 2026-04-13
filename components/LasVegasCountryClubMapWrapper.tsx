'use client'
import dynamic from 'next/dynamic'

const LasVegasCountryClubMap = dynamic(() => import('./LasVegasCountryClubMap'), { ssr: false })

export default function LasVegasCountryClubMapWrapper() {
  return <LasVegasCountryClubMap />
}
