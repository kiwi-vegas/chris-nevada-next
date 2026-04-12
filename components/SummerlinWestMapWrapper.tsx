'use client'
import dynamic from 'next/dynamic'

const SummerlinWestMap = dynamic(() => import('./SummerlinWestMap'), { ssr: false })

export default function SummerlinWestMapWrapper() {
  return <SummerlinWestMap />
}
