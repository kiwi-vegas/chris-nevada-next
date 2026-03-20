'use client'
import dynamic from 'next/dynamic'

const SummerlinMap = dynamic(() => import('./SummerlinMap'), { ssr: false })

export default function SummerlinMapWrapper() {
  return <SummerlinMap />
}
