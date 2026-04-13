'use client'
import dynamic from 'next/dynamic'

const LakeLasVegasSouthShoreMap = dynamic(() => import('./LakeLasVegasSouthShoreMap'), { ssr: false })

export default function LakeLasVegasSouthShoreMapWrapper() {
  return <LakeLasVegasSouthShoreMap />
}
