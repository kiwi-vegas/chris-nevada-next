'use client'
import dynamic from 'next/dynamic'

const MountainsEdgeVistaVerdeMap = dynamic(() => import('./MountainsEdgeVistaVerdeMap'), { ssr: false })

export default function MountainsEdgeVistaVerdeMapWrapper() {
  return <MountainsEdgeVistaVerdeMap />
}
