'use client'
import dynamic from 'next/dynamic'

const SummerlinTheRidgesMap = dynamic(() => import('./SummerlinTheRidgesMap'), { ssr: false })

export default function SummerlinTheRidgesMapWrapper() {
  return <SummerlinTheRidgesMap />
}
