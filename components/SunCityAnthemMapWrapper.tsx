'use client'
import dynamic from 'next/dynamic'

const SunCityAnthemMap = dynamic(() => import('./SunCityAnthemMap'), { ssr: false })

export default function SunCityAnthemMapWrapper() {
  return <SunCityAnthemMap />
}
