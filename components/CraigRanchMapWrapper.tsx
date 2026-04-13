'use client'
import dynamic from 'next/dynamic'

const CraigRanchMap = dynamic(() => import('./CraigRanchMap'), { ssr: false })

export default function CraigRanchMapWrapper() {
  return <CraigRanchMap />
}
