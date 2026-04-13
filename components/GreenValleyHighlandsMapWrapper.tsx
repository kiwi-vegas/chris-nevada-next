'use client'
import dynamic from 'next/dynamic'

const GreenValleyHighlandsMap = dynamic(() => import('./GreenValleyHighlandsMap'), { ssr: false })

export default function GreenValleyHighlandsMapWrapper() {
  return <GreenValleyHighlandsMap />
}
