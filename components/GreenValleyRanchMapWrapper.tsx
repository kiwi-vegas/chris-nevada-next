'use client'
import dynamic from 'next/dynamic'

const GreenValleyRanchMap = dynamic(() => import('./GreenValleyRanchMap'), { ssr: false })

export default function GreenValleyRanchMapWrapper() {
  return <GreenValleyRanchMap />
}
