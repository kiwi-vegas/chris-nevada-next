'use client'
import dynamic from 'next/dynamic'

const LakeLasVegasVistanaMap = dynamic(() => import('./LakeLasVegasVistanaMap'), { ssr: false })

export default function LakeLasVegasVistanaMapWrapper() {
  return <LakeLasVegasVistanaMap />
}
