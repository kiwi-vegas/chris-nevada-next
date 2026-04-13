'use client'
import dynamic from 'next/dynamic'

const SummerlinWestStonebridgeAreaMap = dynamic(() => import('./SummerlinWestStonebridgeAreaMap'), { ssr: false })

export default function SummerlinWestStonebridgeAreaMapWrapper() {
  return <SummerlinWestStonebridgeAreaMap />
}
