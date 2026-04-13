'use client'
import dynamic from 'next/dynamic'

const SpringValleyRanchMap = dynamic(() => import('./SpringValleyRanchMap'), { ssr: false })

export default function SpringValleyRanchMapWrapper() {
  return <SpringValleyRanchMap />
}
