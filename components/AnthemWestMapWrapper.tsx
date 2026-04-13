'use client'
import dynamic from 'next/dynamic'

const AnthemWestMap = dynamic(() => import('./AnthemWestMap'), { ssr: false })

export default function AnthemWestMapWrapper() {
  return <AnthemWestMap />
}
