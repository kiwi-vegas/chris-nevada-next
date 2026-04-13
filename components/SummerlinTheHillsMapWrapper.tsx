'use client'
import dynamic from 'next/dynamic'

const SummerlinTheHillsMap = dynamic(() => import('./SummerlinTheHillsMap'), { ssr: false })

export default function SummerlinTheHillsMapWrapper() {
  return <SummerlinTheHillsMap />
}
