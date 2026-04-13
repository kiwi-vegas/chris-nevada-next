'use client'
import dynamic from 'next/dynamic'

const TrilogyAtSummerlinMap = dynamic(() => import('./TrilogyAtSummerlinMap'), { ssr: false })

export default function TrilogyAtSummerlinMapWrapper() {
  return <TrilogyAtSummerlinMap />
}
