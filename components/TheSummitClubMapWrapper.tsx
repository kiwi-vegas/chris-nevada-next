'use client'
import dynamic from 'next/dynamic'

const TheSummitClubMap = dynamic(() => import('./TheSummitClubMap'), { ssr: false })

export default function TheSummitClubMapWrapper() {
  return <TheSummitClubMap />
}
