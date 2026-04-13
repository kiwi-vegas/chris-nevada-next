'use client'
import dynamic from 'next/dynamic'

const GreenValleyMap = dynamic(() => import('./GreenValleyMap'), { ssr: false })

export default function GreenValleyMapWrapper() {
  return <GreenValleyMap />
}
