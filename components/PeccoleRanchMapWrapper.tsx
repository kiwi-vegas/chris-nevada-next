'use client'
import dynamic from 'next/dynamic'

const PeccoleRanchMap = dynamic(() => import('./PeccoleRanchMap'), { ssr: false })

export default function PeccoleRanchMapWrapper() {
  return <PeccoleRanchMap />
}
