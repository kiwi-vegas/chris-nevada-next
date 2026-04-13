'use client'
import dynamic from 'next/dynamic'

const LasVegasArtsDistrictMap = dynamic(() => import('./LasVegasArtsDistrictMap'), { ssr: false })

export default function LasVegasArtsDistrictMapWrapper() {
  return <LasVegasArtsDistrictMap />
}
