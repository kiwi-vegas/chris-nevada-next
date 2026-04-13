'use client'
import dynamic from 'next/dynamic'

const EagleHillsSummerlinMap = dynamic(() => import('./EagleHillsSummerlinMap'), { ssr: false })

export default function EagleHillsSummerlinMapWrapper() {
  return <EagleHillsSummerlinMap />
}
