'use client'
import dynamic from 'next/dynamic'

const MountainsEdgeMap = dynamic(() => import('./MountainsEdgeMap'), { ssr: false })

export default function MountainsEdgeMapWrapper() {
  return <MountainsEdgeMap />
}
