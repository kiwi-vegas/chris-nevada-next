'use client'
import dynamic from 'next/dynamic'

const CorteBellaSummerlinMap = dynamic(() => import('./CorteBellaSummerlinMap'), { ssr: false })

export default function CorteBellaSummerlinMapWrapper() {
  return <CorteBellaSummerlinMap />
}
