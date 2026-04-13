'use client'
import dynamic from 'next/dynamic'

const SummerlinRidgebrookMap = dynamic(() => import('./SummerlinRidgebrookMap'), { ssr: false })

export default function SummerlinRidgebrookMapWrapper() {
  return <SummerlinRidgebrookMap />
}
