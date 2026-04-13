'use client'
import dynamic from 'next/dynamic'

const TheVineyardsSummerlinMap = dynamic(() => import('./TheVineyardsSummerlinMap'), { ssr: false })

export default function TheVineyardsSummerlinMapWrapper() {
  return <TheVineyardsSummerlinMap />
}
