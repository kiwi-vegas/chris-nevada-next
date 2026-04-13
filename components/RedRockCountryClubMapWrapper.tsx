'use client'
import dynamic from 'next/dynamic'

const RedRockCountryClubMap = dynamic(() => import('./RedRockCountryClubMap'), { ssr: false })

export default function RedRockCountryClubMapWrapper() {
  return <RedRockCountryClubMap />
}
