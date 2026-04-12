'use client'
import dynamic from 'next/dynamic'

const InspiradaMap = dynamic(() => import('./InspiradaMap'), { ssr: false })

export default function InspiradaMapWrapper() {
  return <InspiradaMap />
}
