'use client'
import dynamic from 'next/dynamic'

const LasVegasSummerlinNorthAreaMap = dynamic(() => import('./LasVegasSummerlinNorthAreaMap'), { ssr: false })

export default function LasVegasSummerlinNorthAreaMapWrapper() {
  return <LasVegasSummerlinNorthAreaMap />
}
