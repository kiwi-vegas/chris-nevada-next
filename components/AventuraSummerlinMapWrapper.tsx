'use client'
import dynamic from 'next/dynamic'

const AventuraSummerlinMap = dynamic(() => import('./AventuraSummerlinMap'), { ssr: false })

export default function AventuraSummerlinMapWrapper() {
  return <AventuraSummerlinMap />
}
