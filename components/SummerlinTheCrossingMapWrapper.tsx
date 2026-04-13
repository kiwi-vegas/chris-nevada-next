'use client'
import dynamic from 'next/dynamic'

const SummerlinTheCrossingMap = dynamic(() => import('./SummerlinTheCrossingMap'), { ssr: false })

export default function SummerlinTheCrossingMapWrapper() {
  return <SummerlinTheCrossingMap />
}
