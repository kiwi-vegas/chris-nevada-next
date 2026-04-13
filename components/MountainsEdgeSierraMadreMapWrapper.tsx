'use client'
import dynamic from 'next/dynamic'

const MountainsEdgeSierraMadreMap = dynamic(() => import('./MountainsEdgeSierraMadreMap'), { ssr: false })

export default function MountainsEdgeSierraMadreMapWrapper() {
  return <MountainsEdgeSierraMadreMap />
}
