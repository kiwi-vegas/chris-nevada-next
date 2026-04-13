'use client'
import dynamic from 'next/dynamic'

const EagleRockSummerlinMap = dynamic(() => import('./EagleRockSummerlinMap'), { ssr: false })

export default function EagleRockSummerlinMapWrapper() {
  return <EagleRockSummerlinMap />
}
