'use client'
import dynamic from 'next/dynamic'

const AnthemMap = dynamic(() => import('./AnthemMap'), { ssr: false })

export default function AnthemMapWrapper() {
  return <AnthemMap />
}
