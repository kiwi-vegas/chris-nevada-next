'use client'
import dynamic from 'next/dynamic'

const IronMountainRanchMap = dynamic(() => import('./IronMountainRanchMap'), { ssr: false })

export default function IronMountainRanchMapWrapper() {
  return <IronMountainRanchMap />
}
