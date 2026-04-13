'use client'
import dynamic from 'next/dynamic'

const AnthemEastMap = dynamic(() => import('./AnthemEastMap'), { ssr: false })

export default function AnthemEastMapWrapper() {
  return <AnthemEastMap />
}
