'use client'
import dynamic from 'next/dynamic'

const SunridgeAtMacdonaldRanchMap = dynamic(() => import('./SunridgeAtMacdonaldRanchMap'), { ssr: false })

export default function SunridgeAtMacdonaldRanchMapWrapper() {
  return <SunridgeAtMacdonaldRanchMap />
}
