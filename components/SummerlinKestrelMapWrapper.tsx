'use client'
import dynamic from 'next/dynamic'

const SummerlinKestrelMap = dynamic(() => import('./SummerlinKestrelMap'), { ssr: false })

export default function SummerlinKestrelMapWrapper() {
  return <SummerlinKestrelMap />
}
