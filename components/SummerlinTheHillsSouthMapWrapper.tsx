'use client'
import dynamic from 'next/dynamic'

const SummerlinTheHillsSouthMap = dynamic(() => import('./SummerlinTheHillsSouthMap'), { ssr: false })

export default function SummerlinTheHillsSouthMapWrapper() {
  return <SummerlinTheHillsSouthMap />
}
