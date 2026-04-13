'use client'
import dynamic from 'next/dynamic'

const SummerlinThePuebloMap = dynamic(() => import('./SummerlinThePuebloMap'), { ssr: false })

export default function SummerlinThePuebloMapWrapper() {
  return <SummerlinThePuebloMap />
}
