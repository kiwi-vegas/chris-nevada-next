'use client'
import dynamic from 'next/dynamic'

const SilverstoneRanchMap = dynamic(() => import('./SilverstoneRanchMap'), { ssr: false })

export default function SilverstoneRanchMapWrapper() {
  return <SilverstoneRanchMap />
}
