'use client'
import dynamic from 'next/dynamic'

const CarlislePeakMap = dynamic(() => import('./CarlislePeakMap'), { ssr: false })

export default function CarlislePeakMapWrapper() {
  return <CarlislePeakMap />
}
