'use client'
import dynamic from 'next/dynamic'

const SummerlinTheTrailsMap = dynamic(() => import('./SummerlinTheTrailsMap'), { ssr: false })

export default function SummerlinTheTrailsMapWrapper() {
  return <SummerlinTheTrailsMap />
}
