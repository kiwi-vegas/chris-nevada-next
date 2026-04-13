'use client'
import dynamic from 'next/dynamic'

const SummerlinDiscoveryMap = dynamic(() => import('./SummerlinDiscoveryMap'), { ssr: false })

export default function SummerlinDiscoveryMapWrapper() {
  return <SummerlinDiscoveryMap />
}
