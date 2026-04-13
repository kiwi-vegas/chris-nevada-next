'use client'
import dynamic from 'next/dynamic'

const RegencyAtSummerlinMap = dynamic(() => import('./RegencyAtSummerlinMap'), { ssr: false })

export default function RegencyAtSummerlinMapWrapper() {
  return <RegencyAtSummerlinMap />
}
