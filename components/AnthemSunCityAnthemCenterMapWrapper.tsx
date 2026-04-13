'use client'
import dynamic from 'next/dynamic'

const AnthemSunCityAnthemCenterMap = dynamic(() => import('./AnthemSunCityAnthemCenterMap'), { ssr: false })

export default function AnthemSunCityAnthemCenterMapWrapper() {
  return <AnthemSunCityAnthemCenterMap />
}
