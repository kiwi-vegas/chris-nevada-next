'use client'
import dynamic from 'next/dynamic'

const MountainsEdgeTuscanoMap = dynamic(() => import('./MountainsEdgeTuscanoMap'), { ssr: false })

export default function MountainsEdgeTuscanoMapWrapper() {
  return <MountainsEdgeTuscanoMap />
}
