'use client'
import dynamic from 'next/dynamic'

const AnthemCoventryMap = dynamic(() => import('./AnthemCoventryMap'), { ssr: false })

export default function AnthemCoventryMapWrapper() {
  return <AnthemCoventryMap />
}
