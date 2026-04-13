'use client'
import dynamic from 'next/dynamic'

const AnthemParkMap = dynamic(() => import('./AnthemParkMap'), { ssr: false })

export default function AnthemParkMapWrapper() {
  return <AnthemParkMap />
}
