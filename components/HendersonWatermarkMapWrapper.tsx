'use client'
import dynamic from 'next/dynamic'

const HendersonWatermarkMap = dynamic(() => import('./HendersonWatermarkMap'), { ssr: false })

export default function HendersonWatermarkMapWrapper() {
  return <HendersonWatermarkMap />
}
