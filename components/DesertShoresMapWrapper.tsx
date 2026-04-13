'use client'
import dynamic from 'next/dynamic'

const DesertShoresMap = dynamic(() => import('./DesertShoresMap'), { ssr: false })

export default function DesertShoresMapWrapper() {
  return <DesertShoresMap />
}
