'use client'
import dynamic from 'next/dynamic'

const LosPradosMap = dynamic(() => import('./LosPradosMap'), { ssr: false })

export default function LosPradosMapWrapper() {
  return <LosPradosMap />
}
