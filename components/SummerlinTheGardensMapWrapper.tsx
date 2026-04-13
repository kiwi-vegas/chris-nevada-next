'use client'
import dynamic from 'next/dynamic'

const SummerlinTheGardensMap = dynamic(() => import('./SummerlinTheGardensMap'), { ssr: false })

export default function SummerlinTheGardensMapWrapper() {
  return <SummerlinTheGardensMap />
}
