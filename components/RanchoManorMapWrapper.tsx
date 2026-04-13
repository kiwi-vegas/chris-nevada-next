'use client'
import dynamic from 'next/dynamic'

const RanchoManorMap = dynamic(() => import('./RanchoManorMap'), { ssr: false })

export default function RanchoManorMapWrapper() {
  return <RanchoManorMap />
}
