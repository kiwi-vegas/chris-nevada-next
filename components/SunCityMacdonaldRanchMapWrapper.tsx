'use client'
import dynamic from 'next/dynamic'

const SunCityMacdonaldRanchMap = dynamic(() => import('./SunCityMacdonaldRanchMap'), { ssr: false })

export default function SunCityMacdonaldRanchMapWrapper() {
  return <SunCityMacdonaldRanchMap />
}
