'use client'
import dynamic from 'next/dynamic'

const SummerlinSouthSquareMap = dynamic(() => import('./SummerlinSouthSquareMap'), { ssr: false })

export default function SummerlinSouthSquareMapWrapper() {
  return <SummerlinSouthSquareMap />
}
