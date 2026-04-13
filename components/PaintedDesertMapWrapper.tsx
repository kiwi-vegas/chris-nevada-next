'use client'
import dynamic from 'next/dynamic'

const PaintedDesertMap = dynamic(() => import('./PaintedDesertMap'), { ssr: false })

export default function PaintedDesertMapWrapper() {
  return <PaintedDesertMap />
}
