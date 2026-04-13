'use client'
import dynamic from 'next/dynamic'

const LasVegasBuffaloRanchMap = dynamic(() => import('./LasVegasBuffaloRanchMap'), { ssr: false })

export default function LasVegasBuffaloRanchMapWrapper() {
  return <LasVegasBuffaloRanchMap />
}
