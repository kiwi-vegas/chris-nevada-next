'use client'
import dynamic from 'next/dynamic'

const AscayaMap = dynamic(() => import('./AscayaMap'), { ssr: false })

export default function AscayaMapWrapper() {
  return <AscayaMap />
}
