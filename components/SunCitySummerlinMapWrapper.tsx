'use client'
import dynamic from 'next/dynamic'

const SunCitySummerlinMap = dynamic(() => import('./SunCitySummerlinMap'), { ssr: false })

export default function SunCitySummerlinMapWrapper() {
  return <SunCitySummerlinMap />
}
