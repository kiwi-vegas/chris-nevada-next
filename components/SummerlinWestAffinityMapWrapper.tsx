'use client'
import dynamic from 'next/dynamic'

const SummerlinWestAffinityMap = dynamic(() => import('./SummerlinWestAffinityMap'), { ssr: false })

export default function SummerlinWestAffinityMapWrapper() {
  return <SummerlinWestAffinityMap />
}
