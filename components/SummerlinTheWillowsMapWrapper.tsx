'use client'
import dynamic from 'next/dynamic'

const SummerlinTheWillowsMap = dynamic(() => import('./SummerlinTheWillowsMap'), { ssr: false })

export default function SummerlinTheWillowsMapWrapper() {
  return <SummerlinTheWillowsMap />
}
