'use client'
import dynamic from 'next/dynamic'

const AnthemCountryClubMap = dynamic(() => import('./AnthemCountryClubMap'), { ssr: false })

export default function AnthemCountryClubMapWrapper() {
  return <AnthemCountryClubMap />
}
