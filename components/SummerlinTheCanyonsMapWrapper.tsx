'use client'
import dynamic from 'next/dynamic'

const SummerlinTheCanyonsMap = dynamic(() => import('./SummerlinTheCanyonsMap'), { ssr: false })

export default function SummerlinTheCanyonsMapWrapper() {
  return <SummerlinTheCanyonsMap />
}
