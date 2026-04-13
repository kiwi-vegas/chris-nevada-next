'use client'
import dynamic from 'next/dynamic'

const SummerlinWestDoverMap = dynamic(() => import('./SummerlinWestDoverMap'), { ssr: false })

export default function SummerlinWestDoverMapWrapper() {
  return <SummerlinWestDoverMap />
}
