'use client'
import dynamic from 'next/dynamic'

const LegacyGreenValleyMap = dynamic(() => import('./LegacyGreenValleyMap'), { ssr: false })

export default function LegacyGreenValleyMapWrapper() {
  return <LegacyGreenValleyMap />
}
