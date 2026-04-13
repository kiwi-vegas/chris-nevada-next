'use client'
import dynamic from 'next/dynamic'

const CountryRoseEstatesMap = dynamic(() => import('./CountryRoseEstatesMap'), { ssr: false })

export default function CountryRoseEstatesMapWrapper() {
  return <CountryRoseEstatesMap />
}
