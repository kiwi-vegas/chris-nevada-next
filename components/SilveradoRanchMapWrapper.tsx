'use client'
import dynamic from 'next/dynamic'

const SilveradoRanchMap = dynamic(() => import('./SilveradoRanchMap'), { ssr: false })

export default function SilveradoRanchMapWrapper() {
  return <SilveradoRanchMap />
}
