'use client'
import dynamic from 'next/dynamic'

const AnthemHighlandsMap = dynamic(() => import('./AnthemHighlandsMap'), { ssr: false })

export default function AnthemHighlandsMapWrapper() {
  return <AnthemHighlandsMap />
}
