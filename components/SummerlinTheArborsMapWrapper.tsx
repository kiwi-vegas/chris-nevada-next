'use client'
import dynamic from 'next/dynamic'

const SummerlinTheArborsMap = dynamic(() => import('./SummerlinTheArborsMap'), { ssr: false })

export default function SummerlinTheArborsMapWrapper() {
  return <SummerlinTheArborsMap />
}
