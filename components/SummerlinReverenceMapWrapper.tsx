'use client'
import dynamic from 'next/dynamic'

const SummerlinReverenceMap = dynamic(() => import('./SummerlinReverenceMap'), { ssr: false })

export default function SummerlinReverenceMapWrapper() {
  return <SummerlinReverenceMap />
}
