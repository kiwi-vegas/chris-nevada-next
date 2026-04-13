'use client'
import dynamic from 'next/dynamic'

const SummerlinKestrelCommonsMap = dynamic(() => import('./SummerlinKestrelCommonsMap'), { ssr: false })

export default function SummerlinKestrelCommonsMapWrapper() {
  return <SummerlinKestrelCommonsMap />
}
