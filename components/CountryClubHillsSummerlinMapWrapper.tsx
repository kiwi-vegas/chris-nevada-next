'use client'
import dynamic from 'next/dynamic'

const CountryClubHillsSummerlinMap = dynamic(() => import('./CountryClubHillsSummerlinMap'), { ssr: false })

export default function CountryClubHillsSummerlinMapWrapper() {
  return <CountryClubHillsSummerlinMap />
}
