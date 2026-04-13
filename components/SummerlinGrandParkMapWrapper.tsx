'use client'
import dynamic from 'next/dynamic'

const SummerlinGrandParkMap = dynamic(() => import('./SummerlinGrandParkMap'), { ssr: false })

export default function SummerlinGrandParkMapWrapper() {
  return <SummerlinGrandParkMap />
}
