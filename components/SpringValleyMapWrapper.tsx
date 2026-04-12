'use client'
import dynamic from 'next/dynamic'

const SpringValleyMap = dynamic(() => import('./SpringValleyMap'), { ssr: false })

export default function SpringValleyMapWrapper() {
  return <SpringValleyMap />
}
