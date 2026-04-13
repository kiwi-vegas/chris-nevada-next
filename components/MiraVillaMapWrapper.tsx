'use client'
import dynamic from 'next/dynamic'

const MiraVillaMap = dynamic(() => import('./MiraVillaMap'), { ssr: false })

export default function MiraVillaMapWrapper() {
  return <MiraVillaMap />
}
