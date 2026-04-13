'use client'
import dynamic from 'next/dynamic'

const SummerlinTheMesaMap = dynamic(() => import('./SummerlinTheMesaMap'), { ssr: false })

export default function SummerlinTheMesaMapWrapper() {
  return <SummerlinTheMesaMap />
}
