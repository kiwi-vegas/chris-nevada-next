'use client'
import dynamic from 'next/dynamic'

const ThePointeSummerlinMap = dynamic(() => import('./ThePointeSummerlinMap'), { ssr: false })

export default function ThePointeSummerlinMapWrapper() {
  return <ThePointeSummerlinMap />
}
