'use client'
import dynamic from 'next/dynamic'

const NeoMacdonaldHighlandsMap = dynamic(() => import('./NeoMacdonaldHighlandsMap'), { ssr: false })

export default function NeoMacdonaldHighlandsMapWrapper() {
  return <NeoMacdonaldHighlandsMap />
}
