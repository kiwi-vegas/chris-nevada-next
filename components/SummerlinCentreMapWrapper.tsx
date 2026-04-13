'use client'
import dynamic from 'next/dynamic'

const SummerlinCentreMap = dynamic(() => import('./SummerlinCentreMap'), { ssr: false })

export default function SummerlinCentreMapWrapper() {
  return <SummerlinCentreMap />
}
