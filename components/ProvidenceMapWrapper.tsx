'use client'
import dynamic from 'next/dynamic'

const ProvidenceMap = dynamic(() => import('./ProvidenceMap'), { ssr: false })

export default function ProvidenceMapWrapper() {
  return <ProvidenceMap />
}
