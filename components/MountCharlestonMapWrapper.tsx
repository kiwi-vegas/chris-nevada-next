'use client'
import dynamic from 'next/dynamic'

const MountCharlestonMap = dynamic(() => import('./MountCharlestonMap'), { ssr: false })

export default function MountCharlestonMapWrapper() {
  return <MountCharlestonMap />
}
