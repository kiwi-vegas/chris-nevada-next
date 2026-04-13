'use client'
import dynamic from 'next/dynamic'

const SummerlinRedpointMap = dynamic(() => import('./SummerlinRedpointMap'), { ssr: false })

export default function SummerlinRedpointMapWrapper() {
  return <SummerlinRedpointMap />
}
