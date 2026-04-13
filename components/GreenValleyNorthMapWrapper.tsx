'use client'
import dynamic from 'next/dynamic'

const GreenValleyNorthMap = dynamic(() => import('./GreenValleyNorthMap'), { ssr: false })

export default function GreenValleyNorthMapWrapper() {
  return <GreenValleyNorthMap />
}
