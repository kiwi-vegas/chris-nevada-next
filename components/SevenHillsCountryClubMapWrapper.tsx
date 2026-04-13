'use client'
import dynamic from 'next/dynamic'

const SevenHillsCountryClubMap = dynamic(() => import('./SevenHillsCountryClubMap'), { ssr: false })

export default function SevenHillsCountryClubMapWrapper() {
  return <SevenHillsCountryClubMap />
}
