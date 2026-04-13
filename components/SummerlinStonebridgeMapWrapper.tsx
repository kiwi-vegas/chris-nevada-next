'use client'
import dynamic from 'next/dynamic'

const SummerlinStonebridgeMap = dynamic(() => import('./SummerlinStonebridgeMap'), { ssr: false })

export default function SummerlinStonebridgeMapWrapper() {
  return <SummerlinStonebridgeMap />
}
