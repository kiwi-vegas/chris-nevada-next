'use client'
import dynamic from 'next/dynamic'

const LakeLasVegasMap = dynamic(() => import('./LakeLasVegasMap'), { ssr: false })

export default function LakeLasVegasMapWrapper() {
  return <LakeLasVegasMap />
}
