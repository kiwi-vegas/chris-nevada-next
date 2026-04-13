'use client'
import dynamic from 'next/dynamic'

const LasVegasSouthwestRanchMap = dynamic(() => import('./LasVegasSouthwestRanchMap'), { ssr: false })

export default function LasVegasSouthwestRanchMapWrapper() {
  return <LasVegasSouthwestRanchMap />
}
