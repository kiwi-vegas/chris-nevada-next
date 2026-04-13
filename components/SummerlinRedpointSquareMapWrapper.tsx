'use client'
import dynamic from 'next/dynamic'

const SummerlinRedpointSquareMap = dynamic(() => import('./SummerlinRedpointSquareMap'), { ssr: false })

export default function SummerlinRedpointSquareMapWrapper() {
  return <SummerlinRedpointSquareMap />
}
