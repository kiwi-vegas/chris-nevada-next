'use client'
import dynamic from 'next/dynamic'

const SunCityAlianteMap = dynamic(() => import('./SunCityAlianteMap'), { ssr: false })

export default function SunCityAlianteMapWrapper() {
  return <SunCityAlianteMap />
}
